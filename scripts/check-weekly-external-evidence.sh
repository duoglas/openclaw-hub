#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

MIN_EXTERNAL_LINKS=2

latest_weekly_file() {
  local lang="$1"
  ls -1 "src/content/blog/${lang}/"openclaw-weekly-*.md 2>/dev/null | sort | tail -n 1
}

count_external_links() {
  local file="$1"
  grep -Eo '\]\(https?://[^)]*\)' "$file" | wc -l | tr -d ' '
}

EN_FILE=$(latest_weekly_file en)
ZH_FILE=$(latest_weekly_file zh)

if [ -z "${EN_FILE:-}" ] || [ -z "${ZH_FILE:-}" ]; then
  echo "Weekly external evidence check failed: missing EN/ZH weekly files"
  exit 1
fi

EN_EXTERNAL=$(count_external_links "$EN_FILE")
ZH_EXTERNAL=$(count_external_links "$ZH_FILE")

echo "Weekly external evidence links: EN=${EN_EXTERNAL}, ZH=${ZH_EXTERNAL} (threshold: ${MIN_EXTERNAL_LINKS})"

if [ "$EN_EXTERNAL" -lt "$MIN_EXTERNAL_LINKS" ] || [ "$ZH_EXTERNAL" -lt "$MIN_EXTERNAL_LINKS" ]; then
  echo "Weekly external evidence check failed: require >=${MIN_EXTERNAL_LINKS} external links in both EN/ZH latest weekly posts"
  exit 1
fi

echo "Weekly external evidence check passed"
