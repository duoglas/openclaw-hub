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

# Auto-generate FAQ content from weekly report structure
generate_weekly_faq() {
  local lang="$1"
  local isZh="$([ "$lang" = "zh" ] && echo "true" || echo "false")"
  
  if [ "$isZh" = "true" ]; then
    cat <<'FAQEOF'
  - question: 本周行业动态有哪些亮点？
    answer: 本周汇总了 AI 基础设施和 Agent 生态的重要变化，以及影响独立站流量获取和变现的平台与搜索算法调整。
  - question: 出现了哪些关键问题或故障模式？
    answer: 本周记录了核心问题的根因模式和业务影响，帮助团队避免重复踩坑，提升系统稳定性。
  - question: 未来 7 天有哪些可执行建议？
    answer: 基于本周洞察，给出了具体的技术和运营改进建议，可直接落地到下周工作中。
  - question: 如何快速定位本周日报？
    answer: 文末提供了本周所有日报的直接链接，按时间倒序排列，方便快速回顾。
FAQEOF
  else
    cat <<'FAQEOF'
  - question: What are the highlights from this week's industry dynamics?
    answer: This week summarizes key changes in AI infrastructure and the agent ecosystem, as well as platform and search algorithm updates affecting independent site traffic and monetization.
  - question: What critical issues or failure patterns emerged?
    answer: This week documents root cause patterns and business impact of core issues, helping teams avoid repeat failures and improve system stability.
  - question: What actionable recommendations are available for the next 7 days?
    answer: Based on weekly insights, specific technical and operational improvements are provided that can be directly implemented in the upcoming week.
  - question: How do I quickly access this week's daily briefs?
    answer: The article provides direct links to all daily posts from this week, ordered chronologically, for quick review.
FAQEOF
  fi
}

EN_FAQ=$(generate_weekly_faq "en")
ZH_FAQ=$(generate_weekly_faq "zh")

if [ ! -f "$EN_FILE" ]; then
  cat > "$EN_FILE" <<EOF
---
title: "OpenClaw Weekly Roundup (${MONDAY} to ${SUNDAY})"
description: "Weekly roundup of OpenClaw updates, tutorials, and troubleshooting insights."
pubDate: ${SUNDAY}
tags: ["openclaw", "weekly", "roundup", "ai", "automation"]
category: "news"
lang: "en"
faq:
${EN_FAQ}
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

## Monetization Signals (Conversion / Referral / Consulting)

- Top 3 pages with referral clicks:
- Top 3 pages with ad/affiliate impressions:
- Consulting inquiries received: [count]
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
faq:
${ZH_FAQ}
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

## 变现信号（转化 / 推荐 / 咨询）

- 前 3 个产生推荐点击的页面：
- 前 3 个产生广告/联盟曝光的页面：
- 收到咨询数量：[数量]
EOF
  echo "Created $ZH_FILE"
else
  echo "Skip existing $ZH_FILE"
fi

echo "Weekly roundup template ready: ${WEEK_SLUG}"