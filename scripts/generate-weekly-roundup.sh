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

## This Week in OpenClaw

- Key launch / product update:
- Most-read troubleshooting topic:
- Most practical workflow tip:

## Highlights

### 1) Tools & Integrations
- 

### 2) Deployment & Reliability
- 

### 3) Agent Workflow & Productivity
- 

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

## 本周 OpenClaw 速览

- 关键发布 / 更新：
- 阅读量最高的排障话题：
- 最实用的效率技巧：

## 重点内容

### 1）工具与集成
- 

### 2）部署与稳定性
- 

### 3）Agent 工作流与效率
- 

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