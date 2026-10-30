"""Deterministic public weekly snapshot; not a substitute for an editorial review.

Only public receipts and declared daily GSC evidence are counted. Private rolling
exports are deliberately not copied into this repository. Missing data is unknown,
not zero. This command never writes WEEKLY_REVIEW.md or calls a model/network API.
"""
from __future__ import annotations
import datetime as dt
import hashlib
import json
import math
import os
from pathlib import Path
import re
import subprocess

TZ = dt.timezone(dt.timedelta(hours=8))
ROOT = Path(__file__).resolve().parents[1]


def week(date):
    monday = date - dt.timedelta(days=date.weekday())
    return monday, monday + dt.timedelta(days=6)


def public_file(root, path):
    candidate = root / path
    ancestors = [candidate, *candidate.parents]
    within = ancestors[:ancestors.index(root)] if root in ancestors else ancestors
    if any(p.is_symlink() for p in within) or not candidate.resolve().is_relative_to(root.resolve()):
        raise ValueError('weekly evidence path/symlink escape')
    return candidate


def receipt_rows(root, date):
    monday, _ = week(date)
    rows = []
    for path in sorted((root / 'editorial/receipts').glob('*.json')):
        public_file(root, path.relative_to(root))
        r = json.loads(path.read_text())
        stamp = dt.datetime.fromisoformat(r['created_at'])
        if stamp.tzinfo is None:
            raise ValueError('receipt timestamp has no timezone')
        if not monday <= stamp.astimezone(TZ).date() <= date:
            continue
        slug = r['slug']
        operation = r.get('operation', 'create')
        if not re.fullmatch(r'[a-z0-9]+(?:-[a-z0-9]+)*', slug) or operation not in ('create', 'revise'):
            raise ValueError('invalid weekly receipt identity')
        expected = {f'src/content/blog/{lang}/{slug}.md' for lang in ('en', 'zh')}
        if set(r['files']) != expected:
            raise ValueError('weekly receipt is not a bilingual pair')
        # Full receipt and latest-file integrity remains check:editorial's job.
        dt.date.fromisoformat(r['date'])
        rows.append({'slug': slug, 'operation': operation, 'date': r['date'],
                     'created': stamp.astimezone(TZ).isoformat(),
                     'backfill': r.get('backfill') is True,
                     'receipt': path.relative_to(root).as_posix()})
    return rows


def daily_metrics(root, date):
    """Optional explicit PUBLIC daily export, never an implicit private snapshot.

    Contract: reports/seo/verified-daily/YYYY-MM-DD.json contains site/window,
    fetched_at, a raw_file below that directory, and its sha256. The raw GSC JSON
    must contain exactly one date-dimension row matching the requested day.
    Producers must obtain authorization before publishing any export. This reader
    verifies the archive binding and shape, not Google's authenticity or consent.
    """
    base = Path('reports/seo/verified-daily')
    path = public_file(root, base / (date.isoformat() + '.json'))
    if not path.exists():
        return None
    record = json.loads(path.read_text())
    if record.get('site') != 'https://kuoo.uk/' or record.get('window') != {'start': date.isoformat(), 'end': date.isoformat()}:
        raise ValueError('daily metrics must use an exact one-day site window')
    stamp = dt.datetime.fromisoformat(record['fetched_at'])
    if stamp.tzinfo is None or stamp.astimezone(TZ).date() <= date or stamp > dt.datetime.now(TZ) + dt.timedelta(minutes=5):
        raise ValueError('daily metrics fetched before the day was complete')
    relative = Path(record['raw_file'])
    if relative.is_absolute() or '..' in relative.parts or not relative.is_relative_to(base):
        raise ValueError('daily metrics raw path is outside the public evidence directory')
    raw = public_file(root, relative).read_bytes()
    if hashlib.sha256(raw).hexdigest() != record['sha256']:
        raise ValueError('daily metrics raw hash differs')
    rows = json.loads(raw).get('rows')
    if not isinstance(rows, list) or len(rows) != 1 or rows[0].get('keys') != [date.isoformat()]:
        raise ValueError('daily metrics must have one matching date-dimension row')
    values = {k: rows[0].get(k) for k in ('clicks', 'impressions', 'ctr', 'position')}
    if any(type(v) not in (int, float) or not math.isfinite(v) or v < 0 for v in values.values()):
        raise ValueError('daily metrics contain missing or invalid values')
    clicks, impressions = values['clicks'], values['impressions']
    if not float(clicks).is_integer() or not float(impressions).is_integer() or clicks > impressions or values['ctr'] > 1:
        raise ValueError('daily metrics counts are inconsistent')
    expected_ctr = clicks / impressions if impressions else 0
    if not math.isclose(values['ctr'], expected_ctr, abs_tol=1e-7):
        raise ValueError('daily metrics CTR differs from counts')
    return values


def aggregate(rows):
    if not rows or any(row is None for row in rows):
        return None
    clicks = sum(r['clicks'] for r in rows)
    impressions = sum(r['impressions'] for r in rows)
    return {'clicks': clicks, 'impressions': impressions,
            'ctr': clicks / impressions if impressions else None,
            'position': sum(r['position'] * r['impressions'] for r in rows) / impressions if impressions else None}


def display(metrics, key):
    value = metrics.get(key) if metrics else None
    if value is None:
        return 'N/A'
    if key == 'ctr':
        return f'{value:.2%}'
    return f'{value:.2f}' if key == 'position' else str(int(value))


def render(root, date, prepared, domain_status):
    monday, sunday = week(date)
    receipts = receipt_rows(root, date)
    created = {r['slug'] for r in receipts if r['operation'] == 'create'}
    revised = {r['slug'] for r in receipts if r['operation'] == 'revise'}
    elapsed = date.weekday() + 1
    days = [monday + dt.timedelta(days=i) for i in range(elapsed)]
    daily = [daily_metrics(root, d) for d in days]
    current = aggregate(daily)
    # Comparable elapsed-day windows, never a partial current week vs a full week.
    previous = aggregate([daily_metrics(root, d - dt.timedelta(days=7)) for d in days])
    missing = sum(r is None for r in daily)
    streak = peak = 0
    for row in daily:
        streak = streak + 1 if row is None else 0
        peak = max(peak, streak)
    inventory = '\n'.join(
        f"| {r['slug']} | {r['operation']} | {r['created'][:10]} | {r['date']} | {'yes' if r['backfill'] else 'no'} | [{Path(r['receipt']).name}](../../{r['receipt']}) |"
        for r in receipts) or '| none in the public receipt set | N/A | N/A | N/A | N/A | N/A |'
    kpis = '\n'.join(f'| {label} | {display(previous,key)} | {display(current,key)} | N/A | Complete matching elapsed-day evidence required |'
                     for key,label in [('impressions','Impressions'),('clicks','Clicks'),('ctr','CTR'),('position','Avg Position')])
    schema = '\n'.join(f"| {monday+dt.timedelta(days=i)} | {'⚪' if i>=elapsed else 'unknown'} | {'future' if i>=elapsed else 'unverified'} | N/A | {'not-observed' if i>=elapsed else 'no-verified-schema-snapshot'} | N/A | N/A |" for i in range(7))
    return f'''# SEO Weekly Report

> Project: Kuoo (https://kuoo.uk)
> Deterministic evidence snapshot. Not an independently completed editorial review.

## 1) Week Meta
- Report Week: {monday} ~ {sunday}
- Prepared At: {prepared} (Asia/Shanghai)
- As of: {date}; current calendar day may be incomplete.
- Scope: public editorial receipts and explicitly archived daily metrics only.

## 2) KPI Snapshot (WoW)

Last-period and current-period windows cover the same first {elapsed} calendar days.
Missing, partial, malformed or overlapping exports are not converted into zero.
Private rolling-window exports are not imported or disclosed by this command.

| KPI | Previous aligned window | Current aligned window | WoW | Notes |
|---|---:|---:|---:|---|
{kpis}
| Indexed Pages | N/A | N/A | N/A | No verified indexing export |
| Receipt-backed new bilingual editions | N/A | {len(created)} | N/A | One EN/ZH pair is one edition; not a whole-site historical total |
| Receipt-backed revised bilingual editions | N/A | {len(revised)} | N/A | Revisions are not new articles |

## 3) Top Pages (This Week)
N/A — no verified current-week page-dimension export is ingested. Aggregate site metrics cannot identify winning pages.

## 4) Low-CTR Query Opportunities (auto, This Week)
N/A — query/page evidence is not available in this snapshot. Complete the 7-day GSC query backfill before proposing changes; do not infer a landing page from a query-only row.

## 5) High Impression Low-CTR Queries Top10 (auto, by language)
N/A — no language-specific query/page export. No rankings are manufactured.

## 6) 标题改写优先级队列（auto, 高展现低CTR）
N/A — no executable rewrite queue without verified page-level evidence and search intent review.

## 7) Engagement Evidence
N/A — no verified engagement or bounce-rate export. Search CTR is not bounce rate.

## 8) Content Execution This Week

Count by receipt creation time in Asia/Shanghai, not filename or article publication date.
A committed receipt records evidence and review; it does not establish deployment, delivery, readership or uninterrupted scheduling.

| Slug | Operation | Receipt date | Article/revision date | Backfill | Receipt |
|---|---|---|---|---|---|
{inventory}

## 9) Daily Snapshot Rollup (auto)
- Valid archived daily performance observations: {elapsed-missing}/{elapsed} calendar dates.
- Partial daily evidence is not presented as a complete weekly total.
- Legacy Markdown KPI placeholders and private rolling-window totals are excluded.

## 10) GSC Data Gap Alert (auto)

| Metric | Value |
|---|---|
| Alert Status | {'missing-public-evidence' if missing else 'complete-public-evidence'} |
| Max Consecutive Missing Days | {peak} |
| Missing Days (week) | {missing}/{elapsed} |
| Note | Counts absent validated public daily exports, not zero traffic or missing Google index entries |

## 11) Schema Risk Trend (7d)

| Date | Risk Level | Schema Status | Issue Count | Data Source | Weekly Avg Issues | Weekly Peak (Issues@Date) |
|---|---|---|---:|---|---:|---|
{schema}

| Aggregated Metric | Value |
|---|---|
| Weekly Avg Issues | N/A |
| Weekly Peak Issues | N/A |
| Numeric Data Coverage | 0/{elapsed} elapsed days (0%) |

Current build checks and unarchived spot checks are not a daily schema-risk time series.

## 12) Domain Hygiene Guardrail (auto)
- Stale domain scanner status: {domain_status}
- Alert file: reports/seo-weekly/stale-domain-alert-{monday}-to-{sunday}.md

The linked scanner output is the evidence; no network or Google crawl is inferred.

## 13) Wins / Problems
- The public receipt set contains {len(created)} new and {len(revised)} revised bilingual editions this week through {date}.
- This snapshot does not measure growth, SEO causality, deployment, model connectivity or schedule health.
- Data gaps constrain editorial decisions; no automatic title rewrites or engagement claims are justified by missing metrics.

## 14) Action Plan (Next Week)

Legacy section title retained for the validator. The following are outstanding actions due by the current review week's end, not completed work or future-week deadlines.

- [ ] P0: Verify the next native news run through collection, selection and its actual outcome; do not fill publication quotas | owner: site-editor | due: {sunday}
- [ ] P1: Obtain same-window GSC evidence in private operations records; obtain approval before publishing metric exports | owner: site-editor | due: {sunday}
- [ ] P1: Review public source readiness and update WEEKLY_REVIEW.md with real decisions; generated snapshots do not complete that review | owner: site-editor | due: {sunday}

## 15) Data Sources
- Public version-2 editorial receipts under editorial/receipts/; run check:editorial separately to verify their latest-file bindings.
- Optional public single-day GSC archives under reports/seo/verified-daily/; exact date, numeric values and raw SHA-256 are checked. Archive binding does not independently authenticate Google's response or authorize disclosure.
- Current stale-domain scanner output linked above.
- No private notes, historical chats, account credentials or raw private analytics are consumed.
'''


def main():
    now = dt.datetime.now(TZ)
    date = dt.date.fromisoformat(os.environ.get('WEEKLY_REPORT_DATE', now.date().isoformat()))
    prepared = os.environ.get('WEEKLY_REPORT_NOW', now.strftime('%Y-%m-%d %H:%M'))
    parsed = dt.datetime.strptime(prepared, '%Y-%m-%d %H:%M')
    if parsed.date() != date or date > now.date():
        raise ValueError('weekly snapshot observation and preparation dates differ or are future')
    # Validate receipt bindings before describing the inventory.
    import editorial_pipeline as e
    e.validate_published(ROOT)
    scanner = subprocess.run(['bash', 'scripts/scan-stale-domain.sh'], cwd=ROOT, capture_output=True, text=True, timeout=90)
    if scanner.returncode not in (0, 1):
        raise ValueError('domain scanner failed to execute')
    monday, sunday = week(date)
    alert = ROOT / f'reports/seo-weekly/stale-domain-alert-{monday}-to-{sunday}.md'
    if not alert.is_file() or f'- Week: {monday} ~ {sunday}' not in alert.read_text():
        raise ValueError('domain scan does not match the requested observation week')
    status = 'ok' if scanner.returncode == 0 else 'alert'
    if f'## Status: {status.upper()}' not in alert.read_text():
        raise ValueError('domain scanner exit and report disagree')
    out = public_file(ROOT, f'reports/seo-weekly/seo-weekly-{monday}-to-{sunday}.md')
    text = render(ROOT, date, prepared, status)
    e.save(out, text)
    print(f'Generated: {out.relative_to(ROOT)}; WEEKLY_REVIEW.md was not modified')


if __name__ == '__main__':
    main()
