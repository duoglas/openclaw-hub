#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

TZ="Asia/Shanghai"
TODAY=$(TZ="$TZ" date +%F)
WEEKDAY=$(TZ="$TZ" date +%u)
MONDAY=$(TZ="$TZ" date -d "$TODAY -$((WEEKDAY-1)) days" +%F)
SUNDAY=$(TZ="$TZ" date -d "$MONDAY +6 days" +%F)
REPORT="reports/seo-weekly/seo-weekly-${MONDAY}-to-${SUNDAY}.md"

WEEKLY_REPORT_DATE="$TODAY" bash scripts/generate-seo-weekly-report.sh >/tmp/openclaw-hub-weekly-observation-window.log

if [ ! -f "$REPORT" ]; then
  echo "Weekly observation-window check failed: missing $REPORT"
  exit 1
fi

if ! grep -Eq "^\| Missing Days \(week\) \| [0-9]+/${WEEKDAY} \|$" "$REPORT"; then
  echo "Weekly observation-window check failed: GSC denominator must equal ${WEEKDAY} elapsed day(s)"
  grep -F "| Missing Days (week) |" "$REPORT" || true
  exit 1
fi

if ! grep -Eq "^\| Numeric Data Coverage \| [0-9]+/${WEEKDAY} elapsed days \([0-9]+%\) \|$" "$REPORT"; then
  echo "Weekly observation-window check failed: schema denominator must equal ${WEEKDAY} elapsed day(s)"
  grep -F "| Numeric Data Coverage |" "$REPORT" || true
  exit 1
fi

if [ "$WEEKDAY" -lt 7 ]; then
  TOMORROW=$(TZ="$TZ" date -d "$TODAY +1 day" +%F)
  if ! grep -Fq "| ${TOMORROW} | ⚪ | future | N/A | not-observed |" "$REPORT"; then
    echo "Weekly observation-window check failed: next future date is not marked not-observed"
    exit 1
  fi
fi

echo "Weekly observation-window check passed: as-of=${TODAY}, elapsed=${WEEKDAY}/7"
