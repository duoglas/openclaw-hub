#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

EN_REQUIRED=(
  "## Industry Dynamics This Week"
  "## Problem Insights (What Broke / Why It Matters)"
  "## Actionable Recommendations (Next 7 Days)"
)

ZH_REQUIRED=(
  "## 本周行业动态"
  "## 问题洞察（什么出了问题 / 为什么重要）"
  "## 可执行建议（未来 7 天）"
)

BANNED_PATTERNS=(
  "This Week in OpenClaw"
  "本周 OpenClaw 速览"
  "This week was about"
  "本周主要做了"
  "我做了什么"
)

check_file() {
  local file="$1"
  shift
  local -a required=("$@")

  for h in "${required[@]}"; do
    if ! grep -Fq "$h" "$file"; then
      echo "Weekly quality check failed: missing section '$h' in $file"
      return 1
    fi
  done

  for pat in "${BANNED_PATTERNS[@]}"; do
    if grep -Fq "$pat" "$file"; then
      echo "Weekly quality check failed: found banned progress-log wording '$pat' in $file"
      return 1
    fi
  done
}

status=0

for f in src/content/blog/en/openclaw-weekly-*.md; do
  [ -f "$f" ] || continue
  check_file "$f" "${EN_REQUIRED[@]}" || status=1
done

for f in src/content/blog/zh/openclaw-weekly-*.md; do
  [ -f "$f" ] || continue
  check_file "$f" "${ZH_REQUIRED[@]}" || status=1
done

if [ "$status" -ne 0 ]; then
  exit 1
fi

echo "Weekly content quality check passed"
