#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

if [[ ! -d dist/en || ! -d dist/zh ]]; then
  echo "[website-schema] dist/en or dist/zh not found. Run pnpm build first."
  exit 1
fi

if command -v rg >/dev/null 2>&1; then
  LIST_CMD="rg --files dist/en dist/zh -g '*.html'"
else
  echo "[website-schema] [warn] rg not found, fallback to grep -RIn mode"
  LIST_CMD="grep -RIn --include='*.html' '.' dist/en dist/zh | cut -d: -f1 | sort -u"
fi

mapfile -t FILES < <(eval "$LIST_CMD")

if [[ "${#FILES[@]}" -eq 0 ]]; then
  echo "[website-schema] No HTML files found under dist/en or dist/zh"
  exit 1
fi

python3 - "${FILES[@]}" <<'PY'
import json
import re
import sys
from pathlib import Path

files = [f for f in sys.argv[1:] if f]
if not files:
    print("[website-schema] No input files received")
    sys.exit(1)

script_re = re.compile(
    r'<script[^>]*type=["\']application/ld\+json["\'][^>]*>(.*?)</script>',
    re.I | re.S,
)

issues = []
checked = 0

def is_abs_https(v):
    return isinstance(v, str) and v.startswith("https://")

for fp in files:
    path = Path(fp)
    if not path.exists():
        issues.append(f"[website-schema] Missing file from list: {fp}")
        continue

    text = path.read_text(encoding="utf-8", errors="ignore")
    path_str = str(path)
    lang = "en" if "/dist/en/" in path_str or path_str.startswith("dist/en/") else "zh"

    scripts = script_re.findall(text)
    website_nodes = []

    for raw in scripts:
        payload = raw.strip()
        if not payload:
            continue
        try:
            data = json.loads(payload)
        except Exception as e:
            issues.append(f"[website-schema] Invalid JSON-LD in {fp}: {e}")
            continue

        nodes = []
        if isinstance(data, list):
            nodes.extend(data)
        elif isinstance(data, dict):
            if isinstance(data.get("@graph"), list):
                nodes.extend(data["@graph"])
            nodes.append(data)

        for node in nodes:
            if isinstance(node, dict) and node.get("@type") == "WebSite":
                website_nodes.append(node)

    if not website_nodes:
        issues.append(f"[website-schema] Missing WebSite JSON-LD: {fp}")
        continue

    checked += 1

    if len(website_nodes) != 1:
        issues.append(f"[website-schema] Expected exactly 1 WebSite node in {fp}, found {len(website_nodes)}")

    ws = website_nodes[0]

    name = ws.get("name")
    url = ws.get("url")
    in_lang = ws.get("inLanguage")
    publisher = ws.get("publisher")

    if not isinstance(name, str) or not name.strip():
        issues.append(f"[website-schema] Missing/empty name in {fp}")

    if not is_abs_https(url):
        issues.append(f"[website-schema] url must be absolute https in {fp}: {url}")
    else:
        if not url.startswith("https://kuoo.uk/"):
            issues.append(f"[website-schema] url host must be kuoo.uk in {fp}: {url}")
        expected_prefix = "https://kuoo.uk/en/" if lang == "en" else "https://kuoo.uk/zh/"
        if not url.startswith(expected_prefix):
            issues.append(
                f"[website-schema] url language path mismatch in {fp}: expected prefix {expected_prefix}, actual {url}"
            )

    expected_lang = "en" if lang == "en" else "zh"
    if in_lang != expected_lang:
        issues.append(
            f"[website-schema] inLanguage mismatch in {fp}: expected {expected_lang}, actual {in_lang}"
        )

    if not isinstance(publisher, dict):
        issues.append(f"[website-schema] publisher must be object in {fp}")
        continue

    pub_name = publisher.get("name")
    pub_url = publisher.get("url")
    pub_logo = publisher.get("logo")

    if not isinstance(pub_name, str) or not pub_name.strip():
        issues.append(f"[website-schema] publisher.name missing/empty in {fp}")

    if not is_abs_https(pub_url):
        issues.append(f"[website-schema] publisher.url must be absolute https in {fp}: {pub_url}")
    elif not pub_url.startswith("https://kuoo.uk"):
        issues.append(f"[website-schema] publisher.url host must be kuoo.uk in {fp}: {pub_url}")

    if not is_abs_https(pub_logo):
        issues.append(f"[website-schema] publisher.logo must be absolute https in {fp}: {pub_logo}")
    elif not pub_logo.startswith("https://kuoo.uk/"):
        issues.append(f"[website-schema] publisher.logo host must be kuoo.uk in {fp}: {pub_logo}")

if issues:
    for i in issues:
        print(i)
    print(f"[website-schema] Found {len(issues)} issue(s) across {len(files)} HTML files.")
    sys.exit(1)

print(f"[website-schema] PASS: WebSite JSON-LD strict integrity validated on {checked} EN/ZH HTML pages.")
PY