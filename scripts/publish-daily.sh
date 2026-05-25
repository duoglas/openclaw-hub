#!/bin/bash
set -euo pipefail

cd "$(dirname "$0")/.."
DATE=$(date +%Y-%m-%d)
SLUG="openclaw-daily-${DATE}"
EN_FILE="src/content/blog/en/${SLUG}.md"
ZH_FILE="src/content/blog/zh/${SLUG}.md"
CRON_ID="fdc137d1-c50d-4686-9b1d-c6c923890cf8" # daily-ai-tech

# Skip if today's post already exists on origin/main
git fetch origin main --quiet || true
if git ls-tree -r --name-only origin/main | grep -q "^${EN_FILE}$" \
  && git ls-tree -r --name-only origin/main | grep -q "^${ZH_FILE}$"; then
  echo "Already published ${SLUG}"
  exit 0
fi

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

# Build publish-ready EN/ZH daily pages from the source brief. The generated EN
# page must be an English article, not a direct Chinese summary copy, because the
# release gates block Chinese structure labels and high CJK density in EN posts.
ZH_DESC=$(SUMMARY_TEXT="$SUMMARY" node --input-type=module - <<'JS'
import { buildZhDescription } from './scripts/lib/daily-zh-generator.mjs';
process.stdout.write(buildZhDescription(process.env.SUMMARY_TEXT || ''));
JS
)

EN_DESC=$(SUMMARY_TEXT="$SUMMARY" python3 - <<'PY'
import os,re
text = os.environ.get('SUMMARY_TEXT', '')
tokens = []
for token in re.findall(r'\b[A-Z][A-Za-z0-9+./-]{1,}\b', text):
    if token not in tokens and token.lower() not in {'ai', 'tech'}:
        tokens.append(token)
if tokens:
    focus = ', '.join(tokens[:6])
    print(f"Daily AI and tech brief tracking {focus}, infrastructure moves, product shifts, policy signals, and practical deployment implications.")
else:
    print("Daily AI and tech brief tracking model updates, infrastructure moves, policy signals, product shifts, and practical deployment implications.")
PY
)

ZH_BODY=$(SUMMARY_TEXT="$SUMMARY" DATE="$DATE" node --input-type=module - <<'JS'
import { generateZhDailyBody } from './scripts/lib/daily-zh-generator.mjs';
process.stdout.write(generateZhDailyBody(process.env.SUMMARY_TEXT || '', process.env.DATE));
JS
)

EN_BODY=$(SUMMARY_TEXT="$SUMMARY" DATE="$DATE" node --input-type=module - <<'JS'
import { generateEnglishDailyBody } from './scripts/lib/daily-generator.mjs';

const summary = process.env.SUMMARY_TEXT || '';
const date = process.env.DATE;
process.stdout.write(generateEnglishDailyBody(summary, date));
JS
)
# Always overwrite today's files with quality-gated, publish-ready pages.
cat > "$ZH_FILE" <<EOF
---
title: "AI / 科技日报（${DATE}）"
description: "${ZH_DESC}"
pubDate: ${DATE}
tags: ["ai", "tech", "daily", "news"]
category: "news"
lang: "zh"
---

${ZH_BODY}

## 下一步行动（CTA）

- 先读核心定位：[什么是 OpenClaw](/zh/blog/what-is-openclaw/)
- 需要落地部署：[OpenClaw VPS 部署完整指南](/zh/blog/openclaw-vps-deployment-complete-guide/)
- 保障稳定性：[OpenClaw 模型回退策略](/zh/blog/openclaw-model-fallback-strategy/)
EOF

cat > "$EN_FILE" <<EOF
---
title: "AI & Tech Daily Brief (${DATE})"
description: "${EN_DESC}"
pubDate: ${DATE}
tags: ["ai", "tech", "daily", "news"]
category: "news"
lang: "en"
---

${EN_BODY}

## Next-Step CTA

- Start here: [What Is OpenClaw?](/en/blog/what-is-openclaw/)
- Deploy with guardrails: [OpenClaw VPS Deployment Complete Guide](/en/blog/openclaw-vps-deployment-complete-guide/)
- Keep reliability under load: [OpenClaw Model Fallback Strategy](/en/blog/openclaw-model-fallback-strategy/)
EOF

echo "Running daily quality gates for ${SLUG}..."
pnpm build

DAILY_QUALITY_CHECKS=(
  "check:daily-template"
  "check:daily-heading-date"
  "check:daily-cta"
  "check:daily-fresh-completeness"
  "check:latest-daily-surface"
  "check:daily-related-posts"
  "check:daily-evidence-matrix"
  "check:daily-en-language"
  "check:daily-action-sections"
  "check:daily-brief-specificity"
  "check:duplicate-slug-id"
)

for check in "${DAILY_QUALITY_CHECKS[@]}"; do
  echo "Running pnpm ${check}..."
  pnpm "${check}"
done

git add "$EN_FILE" "$ZH_FILE" scripts/publish-daily.sh scripts/lib/daily-generator.mjs scripts/lib/daily-zh-generator.mjs
git commit -m "content: sync daily site post with Telegram AI/tech brief (${DATE})" || true
git push origin main

echo "Published ${SLUG} (en+zh, structured from cron summary after quality gates)"
