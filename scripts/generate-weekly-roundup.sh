#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

# Week range (Mon-Sun) in local timezone
TODAY=$(date +%F)
WEEKDAY=$(date +%u) # 1=Mon..7=Sun
MONDAY=$(date -d "$TODAY -$((WEEKDAY-1)) days" +%F)
SUNDAY=$(date -d "$MONDAY +6 days" +%F)
WEEK_SLUG="openclaw-weekly-${MONDAY}-to-${SUNDAY}"

EN_FILE="src/content/blog/en/${WEEK_SLUG}.md"
ZH_FILE="src/content/blog/zh/${WEEK_SLUG}.md"

collect_daily_links() {
  local lang="$1"
  local dir="src/content/blog/${lang}"
  local out=""

  for f in "$dir"/openclaw-daily-*.md; do
    [ -f "$f" ] || continue
    local d
    d=$(basename "$f" .md | sed 's/^openclaw-daily-//')
    if [[ "$d" < "$MONDAY" || "$d" > "$SUNDAY" ]]; then
      continue
    fi
    out+="- [${d}](/${lang}/blog/openclaw-daily-${d}/)\n"
  done

  if [ -z "$out" ]; then
    out="- (No daily posts found for this week yet)\n"
  fi

  printf "%b" "$out"
}

EN_LINKS=$(collect_daily_links "en")
ZH_LINKS=$(collect_daily_links "zh")

if [ ! -f "$EN_FILE" ]; then
  cat > "$EN_FILE" <<EOF
---
title: "OpenClaw Weekly Roundup (${MONDAY} to ${SUNDAY})"
description: "Weekly roundup of OpenClaw updates, tutorials, and troubleshooting insights."
pubDate: ${SUNDAY}
tags: ["openclaw", "weekly", "roundup", "ai", "automation"]
category: "news"
lang: "en"
---

## Industry Dynamics This Week

- AI infra / agent ecosystem changes that matter to operators:
- Distribution/search changes affecting independent sites:
- Cost/monetization signal shifts (hosting, API pricing, conversion):

## Problem Insights (What Broke / Why It Matters)

1)
- What happened:
- Root cause pattern:
- Business impact:

2)
- What happened:
- Root cause pattern:
- Business impact:

## Actionable Recommendations (Next 7 Days)

1.
2.
3.

## Daily Briefs This Week

${EN_LINKS}

## Next Week Focus

- 
EOF
  echo "Created $EN_FILE"
else
  echo "Skip existing $EN_FILE"
fi

if [ ! -f "$ZH_FILE" ]; then
  cat > "$ZH_FILE" <<EOF
---
title: "OpenClaw 每周回顾（${MONDAY} 至 ${SUNDAY}）"
description: "汇总本周 OpenClaw 更新、教程与排障重点。"
pubDate: ${SUNDAY}
tags: ["openclaw", "weekly", "roundup", "ai", "automation"]
category: "news"
lang: "zh"
---

## 本周行业动态

- 对独立站运营有影响的 AI/Agent 生态变化：
- 对流量获取有影响的平台/搜索变化：
- 对变现有影响的成本与转化信号变化：

## 问题洞察（哪里出问题了，为什么重要）

1）
- 现象：
- 根因模式：
- 业务影响：

2）
- 现象：
- 根因模式：
- 业务影响：

## 可执行建议（未来 7 天）

1.
2.
3.

## 本周日报索引

${ZH_LINKS}

## 下周关注

- 
EOF
  echo "Created $ZH_FILE"
else
  echo "Skip existing $ZH_FILE"
fi

echo "Weekly roundup template ready: ${WEEK_SLUG}"