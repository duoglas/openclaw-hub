#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

FILE="WEEKLY_REVIEW.md"
TZ="Asia/Shanghai"
TODAY=$(TZ="$TZ" date +%F)
WEEKDAY=$(TZ="$TZ" date +%u) # 1=Mon..7=Sun
MONDAY=$(TZ="$TZ" date -d "$TODAY -$((WEEKDAY-1)) days" +%F)
SUNDAY=$(TZ="$TZ" date -d "$MONDAY +6 days" +%F)
EXPECTED_LINE="- Week: ${MONDAY} to ${SUNDAY}"

if [ ! -f "$FILE" ]; then
  echo "ERROR: ${FILE} is missing. Generate a snapshot with pnpm weekly:seo, then write an evidence-informed editorial review."
  exit 1
fi

if grep -Fqx -- "$EXPECTED_LINE" "$FILE"; then
  echo "Weekly review cadence OK (${MONDAY} to ${SUNDAY})"
  exit 0
fi

echo "ERROR: ${FILE} is stale for current week."
echo "Expected line: ${EXPECTED_LINE}"
echo "Fix: generate the evidence snapshot with pnpm weekly:seo, review the actual evidence and decisions, then commit ${FILE}; do not change its date alone."
exit 1
