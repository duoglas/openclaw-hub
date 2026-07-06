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

# The CI content gate requires WEEKLY_REVIEW.md to match the current
# Asia/Shanghai week. Daily publishing is the most frequent automation path,
# so refresh the weekly artifact here before any early exit. This prevents the
# recurring Monday/week-rollover failure where daily content is pushed while the
# weekly review file is still from an older week.
refresh_weekly_review_if_needed() {
  local log_file="/tmp/openclaw-hub-weekly-review-check.log"

  if pnpm check:weekly-review >"$log_file" 2>&1; then
    cat "$log_file"
    return 0
  fi

  cat "$log_file"
  echo "Refreshing stale weekly SEO review..."
  pnpm weekly:seo
  pnpm check:weekly-review
}

commit_weekly_review_if_changed() {
  if [ -z "$(git status --porcelain -- WEEKLY_REVIEW.md reports/seo-weekly)" ]; then
    return 0
  fi

  local week_line
  week_line=$(grep -m1 '^- Week:' WEEKLY_REVIEW.md | sed 's/^- Week: //')
  git add WEEKLY_REVIEW.md reports/seo-weekly
  git commit -m "chore: refresh weekly review (${week_line})" || true
  git push origin main
}

refresh_weekly_review_if_needed

if git ls-tree -r --name-only origin/main | grep -q "^${EN_FILE}$" \
  && git ls-tree -r --name-only origin/main | grep -q "^${ZH_FILE}$"; then
  commit_weekly_review_if_changed
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
def usable(e):
    if e.get('action') != 'finished' or e.get('status') != 'ok' or not e.get('summary'):
        return False
    summary = str(e.get('summary') or '')
    failure_markers = ('Apply Patch failed', 'Cron job', 'failed:', '⚠️')
    return not any(marker in summary for marker in failure_markers)

entries = [e for e in data.get('entries', []) if usable(e)]
summary = None
for e in entries:
    d = datetime.datetime.fromtimestamp(e.get('runAtMs',0)/1000, datetime.timezone(datetime.timedelta(hours=8))).strftime('%Y-%m-%d')
    if d == today:
        summary = e['summary']
        break
if summary is None and entries:
    summary = entries[0]['summary']
if not summary:
    sys.stderr.write('No usable successful daily-ai-tech cron summary found; refusing to publish fallback placeholder.\n')
    sys.exit(2)
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

git add "$EN_FILE" "$ZH_FILE" WEEKLY_REVIEW.md reports/seo-weekly scripts/publish-daily.sh scripts/lib/daily-generator.mjs scripts/lib/daily-zh-generator.mjs
git commit -m "content: sync daily site post with Telegram AI/tech brief (${DATE})" || true
git push origin main

echo "Published ${SLUG} (en+zh, structured from cron summary after quality gates)"
