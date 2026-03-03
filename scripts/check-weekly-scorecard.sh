#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

latest_weekly_file() {
  local lang="$1"
  ls -1 "src/content/blog/${lang}/"openclaw-weekly-*.md 2>/dev/null | sort | tail -n 1
}

section_block() {
  local file="$1"
  local start_heading="$2"
  awk -v start="$start_heading" '
    $0 == start { in_block=1; next }
    in_block && /^## / { exit }
    in_block { print }
  ' "$file"
}

count_internal_links() {
  local file="$1"
  grep -Eo '\]\(/(en|zh)/blog/[^)]*\)' "$file" | wc -l | tr -d ' '
}

count_all_links() {
  local file="$1"
  grep -Eo '\]\((/|https?://)[^)]*\)' "$file" | wc -l | tr -d ' '
}

score_file() {
  local file="$1"
  local lang="$2"

  local industry_h problem_h action_h
  local action_block action_items
  local all_links internal_links
  local h2_count
  local differentiation=0

  if [ "$lang" = "en" ]; then
    industry_h="## Industry Dynamics This Week"
    problem_h="## Problem Insights (What Broke / Why It Matters)"
    action_h="## Actionable Recommendations (Next 7 Days)"
  else
    industry_h="## 本周行业动态"
    problem_h="## 问题洞察（哪里出问题了，为什么重要）"
    action_h="## 可执行建议（未来 7 天）"
  fi

  local intent=0
  grep -Fq "$industry_h" "$file" && intent=$((intent+2))
  grep -Fq "$problem_h" "$file" && intent=$((intent+2))
  grep -Fq "$action_h" "$file" && intent=$((intent+1))

  action_block=$(section_block "$file" "$action_h" || true)
  action_items=$(printf "%s\n" "$action_block" | grep -Ec '^[[:space:]]*[0-9]+[.)]') || true
  local actionability=0
  if [ "$action_items" -ge 3 ]; then
    actionability=5
  elif [ "$action_items" -eq 2 ]; then
    actionability=4
  elif [ "$action_items" -eq 1 ]; then
    actionability=2
  fi

  all_links=$(count_all_links "$file")
  local evidence=0
  if [ "$all_links" -ge 6 ]; then
    evidence=5
  elif [ "$all_links" -ge 4 ]; then
    evidence=4
  elif [ "$all_links" -ge 2 ]; then
    evidence=3
  elif [ "$all_links" -ge 1 ]; then
    evidence=1
  fi

  h2_count=$(grep -Ec '^## ' "$file")
  local structure=0
  if [ "$h2_count" -ge 7 ]; then
    structure=5
  elif [ "$h2_count" -ge 6 ]; then
    structure=4
  elif [ "$h2_count" -ge 5 ]; then
    structure=3
  elif [ "$h2_count" -ge 4 ]; then
    structure=2
  fi

  internal_links=$(count_internal_links "$file")
  local internal_value=0
  if [ "$internal_links" -ge 6 ]; then
    internal_value=5
  elif [ "$internal_links" -ge 4 ]; then
    internal_value=4
  elif [ "$internal_links" -ge 2 ]; then
    internal_value=3
  elif [ "$internal_links" -ge 1 ]; then
    internal_value=1
  fi

  if [ "$lang" = "en" ]; then
    grep -Fqi "root cause" "$file" && differentiation=$((differentiation+2))
    grep -Fqi "business impact" "$file" && differentiation=$((differentiation+2))
    grep -Fqi "final takeaway" "$file" && differentiation=$((differentiation+1))
  else
    grep -Fq "根因" "$file" && differentiation=$((differentiation+2))
    grep -Fq "业务影响" "$file" && differentiation=$((differentiation+2))
    grep -Fq "最终结论" "$file" && differentiation=$((differentiation+1))
  fi

  local total=$((intent + actionability + evidence + structure + internal_value + differentiation))

  echo "FILE=$file"
  echo "intent=$intent"
  echo "actionability=$actionability"
  echo "evidence=$evidence"
  echo "structure=$structure"
  echo "internal_links=$internal_value"
  echo "differentiation=$differentiation"
  echo "total=$total"
}

EN_FILE=$(latest_weekly_file en)
ZH_FILE=$(latest_weekly_file zh)

if [ -z "${EN_FILE:-}" ] || [ -z "${ZH_FILE:-}" ]; then
  echo "Weekly scorecard check failed: missing EN/ZH weekly files"
  exit 1
fi

EN_SCORE=$(score_file "$EN_FILE" en)
ZH_SCORE=$(score_file "$ZH_FILE" zh)

EN_TOTAL=$(printf "%s\n" "$EN_SCORE" | awk -F= '/^total=/{print $2}')
ZH_TOTAL=$(printf "%s\n" "$ZH_SCORE" | awk -F= '/^total=/{print $2}')

echo "Weekly scorecard (EN):"
printf "%s\n" "$EN_SCORE"
echo ""
echo "Weekly scorecard (ZH):"
printf "%s\n" "$ZH_SCORE"

if [ "$EN_TOTAL" -lt 20 ] || [ "$ZH_TOTAL" -lt 20 ]; then
  echo "Weekly scorecard check failed: EN=${EN_TOTAL}, ZH=${ZH_TOTAL} (threshold: 20)"
  exit 1
fi

echo "Weekly scorecard check passed: EN=${EN_TOTAL}, ZH=${ZH_TOTAL}"