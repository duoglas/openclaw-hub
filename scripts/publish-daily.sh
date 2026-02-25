#!/bin/bash
set -euo pipefail

cd "$(dirname "$0")/.."
DATE=$(date +%Y-%m-%d)
SLUG="openclaw-daily-${DATE}"
EN_FILE="src/content/blog/en/${SLUG}.md"
ZH_FILE="src/content/blog/zh/${SLUG}.md"
CRON_ID="fdc137d1-c50d-4686-9b1d-c6c923890cf8" # daily-ai-tech

# Pull latest daily summary from cron runs (prefer same-day run, fallback to latest available)
SUMMARY=$(python3 - <<'PY'
import json,subprocess,datetime,sys
cron_id = "fdc137d1-c50d-4686-9b1d-c6c923890cf8"
out = subprocess.check_output(["openclaw","cron","runs","--id",cron_id,"--limit","20"], text=True)
start = out.find('{')
if start < 0:
    sys.exit(1)
data = json.loads(out[start:])
today = datetime.datetime.now(datetime.timezone(datetime.timedelta(hours=8))).strftime('%Y-%m-%d')
entries = [e for e in data.get('entries', []) if e.get('action')=='finished' and e.get('summary')]
summary = None
for e in entries:
    d = datetime.datetime.fromtimestamp(e.get('runAtMs',0)/1000, datetime.timezone(datetime.timedelta(hours=8))).strftime('%Y-%m-%d')
    if d == today:
        summary = e['summary']
        break
if summary is None and entries:
    summary = entries[0]['summary']
if not summary:
    summary = "今日 AI / 科技日报暂未生成，稍后将自动更新。"
print(summary)
PY
)

# Always overwrite today's files with synced summary
cat > "$ZH_FILE" <<EOF
---
title: "AI / 科技日报（${DATE}）"
description: "与 Telegram 当日推送同步的 AI 与科技要点。"
pubDate: ${DATE}
tags: ["ai", "tech", "daily", "news"]
category: "news"
lang: "zh"
---

${SUMMARY}
EOF

cat > "$EN_FILE" <<EOF
---
title: "AI & Tech Daily Brief (${DATE})"
description: "Synced with the daily Telegram AI/tech brief."
pubDate: ${DATE}
tags: ["ai", "tech", "daily", "news"]
category: "news"
lang: "en"
---

${SUMMARY}
EOF

pnpm build >/dev/null 2>&1

git add "$EN_FILE" "$ZH_FILE" scripts/publish-daily.sh
git commit -m "content: sync daily site post with Telegram AI/tech brief (${DATE})" || true
git push origin main

echo "Published ${SLUG} (en+zh, synced from cron summary)"