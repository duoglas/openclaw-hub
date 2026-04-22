#!/home/duoglas/.openclaw/workspace/.venv-gsc/bin/python3
"""
fetch-gsc-daily.py — Pull Google Search Console data for kuoo.uk into a CSV.

Why this exists
---------------
SEO work on openclaw-hub lives and dies by impression / CTR / position data
from Search Console. Clicking through the GSC UI every day is noise; a small,
boring CLI that drops a dated CSV into ``reports/`` lets the weekly roundup
and growth-queue scripts (see ``scripts/generate-seo-weekly-report.sh``) diff
week-over-week without anyone touching a browser.

Credentials
-----------
Expects two files under ``~/.openclaw/workspace`` (never checked in):

* ``.gsc-client-secret.json``  — OAuth client (installed-app type).
* ``.gsc-token.json``          — Authorised user token with a ``refresh_token``.

The script only passes those paths to ``google-auth``; it does not read or
print their contents. If ``.gsc-token.json`` has an expired access token the
library refreshes it in place using the stored refresh token.

Install / run
-------------
The venv under ``~/.openclaw/workspace/.venv-gsc`` already has
``google-api-python-client`` and ``google-auth-oauthlib`` installed; that venv
is baked into the shebang so ``./scripts/fetch-gsc-daily.py --help`` Just
Works without ``source``-ing anything.

Examples
--------
    # Last 28 days, top 500 queries, default CSV path
    ./scripts/fetch-gsc-daily.py

    # Custom window, query+page dimensions, write next to reports/
    ./scripts/fetch-gsc-daily.py --start 2026-03-01 --end 2026-03-31 \
        --dimensions query page --row-limit 1000

    # Show what would be requested but don't call the API
    ./scripts/fetch-gsc-daily.py --dry-run
"""
from __future__ import annotations

import argparse
import csv
import datetime as dt
import json
import os
import sys
from pathlib import Path
from typing import Iterable

# Default property. GSC has two property types: URL-prefix ("https://kuoo.uk/")
# and Domain ("sc-domain:kuoo.uk"). They are SEPARATE properties — the auth'd
# account must be verified on exactly the one we query. kuoo.uk is registered
# as a Domain Property (verified via DNS), so the API needs "sc-domain:" form.
# Confirmed via searchconsole.sites.list() on 2026-04-22.
DEFAULT_SITE_URL = "sc-domain:kuoo.uk"

# Credential paths. We never open these files ourselves — google-auth does.
WORKSPACE = Path.home() / ".openclaw" / "workspace"
CLIENT_SECRET = WORKSPACE / ".gsc-client-secret.json"
TOKEN_FILE = WORKSPACE / ".gsc-token.json"

# GSC API: all we need is read-only access to site data.
SCOPES = ["https://www.googleapis.com/auth/webmasters.readonly"]

# Report output lives at the repo root; derive it from this file so the script
# is equally happy being called from the repo or via an absolute path.
REPO_ROOT = Path(__file__).resolve().parent.parent
REPORTS_DIR = REPO_ROOT / "reports" / "gsc"


def _die(msg: str, code: int = 2) -> None:
    print(f"[fetch-gsc] {msg}", file=sys.stderr)
    sys.exit(code)


def parse_args(argv: list[str] | None = None) -> argparse.Namespace:
    today = dt.date.today()
    default_end = today - dt.timedelta(days=3)      # GSC lags ~2–3 days
    default_start = default_end - dt.timedelta(days=27)  # 28-day window

    p = argparse.ArgumentParser(
        description="Fetch Search Console stats for kuoo.uk into a CSV.",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__,
    )
    p.add_argument("--site-url", default=DEFAULT_SITE_URL,
                   help=f"GSC property URL (default: {DEFAULT_SITE_URL})")
    p.add_argument("--start", default=default_start.isoformat(),
                   help="Start date, YYYY-MM-DD (default: end-27d)")
    p.add_argument("--end", default=default_end.isoformat(),
                   help="End date, YYYY-MM-DD (default: today-3d)")
    p.add_argument("--dimensions", nargs="+", default=["query"],
                   choices=["query", "page", "country", "device",
                            "searchAppearance", "date"],
                   help="Group-by dimensions (default: query)")
    p.add_argument("--row-limit", type=int, default=500,
                   help="Max rows to return (GSC hard-caps at 25000)")
    p.add_argument("--type", default="web",
                   choices=["web", "image", "video", "news", "discover",
                            "googleNews"],
                   help="Search type (default: web)")
    p.add_argument("--output", type=Path, default=None,
                   help="CSV output path (default: reports/gsc/gsc-<dims>-<end>.csv)")
    p.add_argument("--dry-run", action="store_true",
                   help="Print the request body and exit (no API call)")
    return p.parse_args(argv)


def _load_credentials():
    """Return an authorised Credentials object, refreshing on disk if needed.

    The historic ``.gsc-token.json`` in this workspace was written by an older
    bootstrap script and stores *only* ``refresh_token``/``scopes`` — it does
    not embed ``client_id``/``client_secret`` the way ``creds.to_json()``
    would today. That makes ``Credentials.from_authorized_user_file`` refuse
    it with "missing fields client_secret, client_id".

    Rather than force a re-auth, we stitch the token file together with the
    matching ``.gsc-client-secret.json`` ourselves. Both files are kept out of
    VCS; we only keep the assembled credential in memory and write the
    refreshed access-token back to ``.gsc-token.json`` on success.
    """
    # Imports deferred so ``--help`` works even if the venv ever breaks.
    from google.auth.transport.requests import Request
    from google.oauth2.credentials import Credentials

    for path in (CLIENT_SECRET, TOKEN_FILE):
        if not path.exists():
            _die(
                f"missing credential file: {path}\n"
                f"See gcp_oauth_sop (memory/gcp_oauth_sop.md) for how to mint one."
            )

    with CLIENT_SECRET.open("r", encoding="utf-8") as f:
        secret_raw = json.load(f)
    # client_secret.json is either {"installed": {...}} or {"web": {...}}.
    secret = secret_raw.get("installed") or secret_raw.get("web") or secret_raw
    try:
        client_id = secret["client_id"]
        client_secret = secret["client_secret"]
    except KeyError as e:
        _die(f".gsc-client-secret.json missing field: {e}")
    token_uri = secret.get("token_uri", "https://oauth2.googleapis.com/token")

    with TOKEN_FILE.open("r", encoding="utf-8") as f:
        token_raw = json.load(f)
    refresh_token = token_raw.get("refresh_token")
    if not refresh_token:
        _die(".gsc-token.json has no refresh_token; re-run OAuth bootstrap")

    creds = Credentials(
        token=token_raw.get("token") or token_raw.get("access_token"),
        refresh_token=refresh_token,
        token_uri=token_raw.get("token_uri", token_uri),
        client_id=client_id,
        client_secret=client_secret,
        scopes=token_raw.get("scopes", SCOPES),
    )

    if not creds.valid:
        creds.refresh(Request())
        # Persist the refreshed access-token; keep the file schema
        # backward-compatible with whatever the original bootstrap wrote.
        token_raw["token"] = creds.token
        if creds.expiry is not None:
            token_raw["expiry"] = creds.expiry.isoformat() + "Z"
        TOKEN_FILE.write_text(json.dumps(token_raw, indent=2), encoding="utf-8")
        os.chmod(TOKEN_FILE, 0o600)

    return creds


def _build_service(creds):
    """Build the Search Console discovery client, routed through a proxy if set.

    google-api-python-client talks to Google via **httplib2**, which — unlike
    ``requests`` — does NOT honour ``HTTPS_PROXY`` / ``HTTP_PROXY`` env vars.
    On networks where ``*.googleapis.com`` requires an egress proxy (see
    memory/global_mem.txt §NETWORK), the client would silently hang for 120s
    on every ``.execute()`` call.

    We therefore read ``HTTPS_PROXY`` / ``HTTP_PROXY`` ourselves and wire an
    explicit ``httplib2.ProxyInfo`` into the transport. When no proxy env var
    is set, we fall back to the library default (direct connection), so this
    stays a no-op in proxy-less environments like CI.
    """
    from urllib.parse import urlparse
    from googleapiclient.discovery import build

    proxy_url = (os.environ.get("HTTPS_PROXY") or os.environ.get("https_proxy")
                 or os.environ.get("HTTP_PROXY") or os.environ.get("http_proxy"))
    if proxy_url:
        import httplib2
        import socks  # PySocks; required by httplib2 ProxyInfo even for HTTP.
        from google_auth_httplib2 import AuthorizedHttp
        u = urlparse(proxy_url)
        scheme = (u.scheme or "http").lower()
        proxy_type = socks.PROXY_TYPE_SOCKS5 if scheme.startswith("socks") else socks.PROXY_TYPE_HTTP
        proxy_info = httplib2.ProxyInfo(
            proxy_type=proxy_type,
            proxy_host=u.hostname,
            proxy_port=u.port or (1080 if proxy_type == socks.PROXY_TYPE_SOCKS5 else 8080),
        )
        http = AuthorizedHttp(creds, http=httplib2.Http(timeout=60, proxy_info=proxy_info))
        # ``http=`` and ``credentials=`` are mutually exclusive in build().
        return build("searchconsole", "v1", http=http, cache_discovery=False)

    # cache_discovery=False avoids a noisy warning on newer oauth stacks.
    return build("searchconsole", "v1", credentials=creds, cache_discovery=False)


def _query_gsc(service, *, site_url: str, start: str, end: str,
               dimensions: list[str], row_limit: int, search_type: str) -> Iterable[dict]:
    """Page through searchanalytics.query until we hit ``row_limit``.

    GSC caps any single page at 25000 rows; we window with ``startRow`` so
    callers can ask for e.g. 50000 rows without thinking about pagination.
    """
    PAGE = 25000
    fetched: list[dict] = []
    start_row = 0
    while len(fetched) < row_limit:
        batch_size = min(PAGE, row_limit - len(fetched))
        body = {
            "startDate": start,
            "endDate": end,
            "dimensions": dimensions,
            "rowLimit": batch_size,
            "startRow": start_row,
            "type": search_type,
        }
        resp = service.searchanalytics().query(siteUrl=site_url, body=body).execute()
        rows = resp.get("rows", [])
        if not rows:
            break
        fetched.extend(rows)
        if len(rows) < batch_size:
            break  # Last page.
        start_row += batch_size
    return fetched


def _write_csv(rows: Iterable[dict], dimensions: list[str], path: Path) -> int:
    path.parent.mkdir(parents=True, exist_ok=True)
    columns = list(dimensions) + ["clicks", "impressions", "ctr", "position"]
    count = 0
    with path.open("w", newline="", encoding="utf-8") as f:
        w = csv.writer(f)
        w.writerow(columns)
        for r in rows:
            keys = r.get("keys", [])
            # Pad keys so short rows don't shift columns.
            keys = (keys + [""] * len(dimensions))[: len(dimensions)]
            w.writerow([
                *keys,
                r.get("clicks", 0),
                r.get("impressions", 0),
                f"{r.get('ctr', 0):.6f}",
                f"{r.get('position', 0):.2f}",
            ])
            count += 1
    return count


def main(argv: list[str] | None = None) -> int:
    args = parse_args(argv)

    # Validate date window early so dry-run still catches the typo.
    try:
        dt.date.fromisoformat(args.start)
        dt.date.fromisoformat(args.end)
    except ValueError as e:
        _die(f"bad date: {e}")

    output = args.output or (
        REPORTS_DIR / f"gsc-{'-'.join(args.dimensions)}-{args.end}.csv"
    )

    request_preview = {
        "siteUrl": args.site_url,
        "startDate": args.start,
        "endDate": args.end,
        "dimensions": args.dimensions,
        "rowLimit": args.row_limit,
        "type": args.type,
        "output": str(output),
    }

    if args.dry_run:
        print(json.dumps(request_preview, indent=2))
        return 0

    try:
        creds = _load_credentials()
        service = _build_service(creds)
        rows = _query_gsc(
            service,
            site_url=args.site_url,
            start=args.start,
            end=args.end,
            dimensions=args.dimensions,
            row_limit=args.row_limit,
            search_type=args.type,
        )
    except Exception as e:  # noqa: BLE001 — surface whatever Google returns
        _die(f"GSC request failed: {e}", code=1)

    written = _write_csv(rows, args.dimensions, output)
    print(f"[fetch-gsc] wrote {written} rows → {output}")
    return 0


if __name__ == "__main__":
    sys.exit(main())