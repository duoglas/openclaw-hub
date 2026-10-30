#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."
TZ_NAME="Asia/Shanghai"

fail() { echo "Weekly report freshness check failed: $*"; }

check_report() {
  local file="$1" expected_start="$2" expected_end="$3" expected_today="$4" expected_elapsed="$5"
  local report_week prepared missing schema tomorrow
  [ "$(basename "$file")" = "seo-weekly-${expected_start}-to-${expected_end}.md" ] || { fail "report filename does not match ${expected_start}..${expected_end}"; return 1; }
  [ -f "$file" ] || { fail "missing report $file"; return 1; }

  report_week=$(awk -F': ' '/^- Report Week:/{gsub(/^[[:space:]]+|[[:space:]]+$/, "", $2); print $2; exit}' "$file")
  [ "$report_week" = "${expected_start} ~ ${expected_end}" ] || { fail "Report Week is '${report_week:-missing}', expected '${expected_start} ~ ${expected_end}'"; return 1; }

  prepared=$(awk -F': ' '/^- Prepared At:/{gsub(/^[[:space:]]+|[[:space:]]+$/, "", $2); print $2; exit}' "$file")
  [[ "$prepared" =~ ^${expected_today}[[:space:]][0-9]{2}:[0-9]{2}[[:space:]]\(Asia/Shanghai\)$ ]] || { fail "Prepared At is '${prepared:-missing}', expected Asia/Shanghai date ${expected_today}"; return 1; }
  [[ "${prepared%% *}" > "$expected_start" || "${prepared%% *}" = "$expected_start" ]] || { fail "Prepared At predates observation window"; return 1; }

  missing=$(awk -F'|' '/^\| Missing Days \(week\)/{gsub(/^[[:space:]]+|[[:space:]]+$/, "", $3); print $3; exit}' "$file")
  [[ "$missing" =~ ^[0-9]+/${expected_elapsed}$ ]] && (( 10#${missing%%/*} <= expected_elapsed )) || { fail "invalid GSC missing-day count '${missing:-missing}' for ${expected_elapsed} elapsed days"; return 1; }

  schema=$(awk -F'|' '/^\| Numeric Data Coverage/{gsub(/^[[:space:]]+|[[:space:]]+$/, "", $3); print $3; exit}' "$file")
  [[ "${schema%% elapsed days*}" =~ ^[0-9]+/${expected_elapsed}$ ]] && (( 10#${schema%%/*} <= expected_elapsed )) || { fail "invalid schema coverage '${schema:-missing}' for ${expected_elapsed} elapsed days"; return 1; }

  if [ "$expected_elapsed" -lt 7 ]; then
    tomorrow=$(TZ="$TZ_NAME" date -d "$expected_today +1 day" +%F)
    grep -Fq "| ${tomorrow} | ⚪ | future | N/A | not-observed |" "$file" || { fail "future date ${tomorrow} is not marked not-observed"; return 1; }
  fi
}

run_fixture_self_test() {
  local dir fixture
  dir=$(mktemp -d)
  fixture="$dir/seo-weekly-2026-09-14-to-2026-09-20.md"
  cat > "$fixture" <<'EOF'
# SEO Weekly Report
- Report Week: 2026-09-14 ~ 2026-09-20
- Prepared At: 2026-09-18 11:20 (Asia/Shanghai)
| Missing Days (week) | 5/5 |
| Numeric Data Coverage | 5/5 elapsed days (100%) |
| 2026-09-19 | ⚪ | future | N/A | not-observed |
EOF
  check_report "$fixture" 2026-09-14 2026-09-20 2026-09-18 5
  local name="$(basename "$fixture")" variant
  for variant in partial complete old cross-week future-denominator excess-missing excess-schema; do mkdir -p "$dir/$variant"; done
  sed 's/Missing Days (week) | 5\/5/Missing Days (week) | 1\/5/' "$fixture" > "$dir/partial/$name"
  check_report "$dir/partial/$name" 2026-09-14 2026-09-20 2026-09-18 5
  sed 's/Missing Days (week) | 5\/5/Missing Days (week) | 0\/5/' "$fixture" > "$dir/complete/$name"
  check_report "$dir/complete/$name" 2026-09-14 2026-09-20 2026-09-18 5
  sed 's/Prepared At: 2026-09-18/Prepared At: 2026-09-17/' "$fixture" > "$dir/old/$name"
  sed 's/Report Week: 2026-09-14 ~ 2026-09-20/Report Week: 2026-09-15 ~ 2026-09-21/' "$fixture" > "$dir/cross-week/$name"
  sed 's/Missing Days (week) | 5\/5/Missing Days (week) | 7\/7/' "$fixture" > "$dir/future-denominator/$name"
  sed 's/Missing Days (week) | 5\/5/Missing Days (week) | 6\/5/' "$fixture" > "$dir/excess-missing/$name"
  sed 's/Numeric Data Coverage | 5\/5/Numeric Data Coverage | 6\/5/' "$fixture" > "$dir/excess-schema/$name"
  for variant in old cross-week future-denominator excess-missing excess-schema; do
    if check_report "$dir/$variant/$name" 2026-09-14 2026-09-20 2026-09-18 5 >/dev/null 2>&1; then fail "self-test accepted $variant"; return 1; fi
  done
  cp "$fixture" "$dir/wrong-week.md"
  if check_report "$dir/wrong-week.md" 2026-09-14 2026-09-20 2026-09-18 5 >/dev/null 2>&1; then fail "self-test accepted wrong filename"; return 1; fi
  rm -rf "$dir"
}

TODAY="${WEEKLY_REPORT_DATE:-$(TZ="$TZ_NAME" date +%F)}"
WEEKDAY=$(TZ="$TZ_NAME" date -d "$TODAY" +%u)
MONDAY=$(TZ="$TZ_NAME" date -d "$TODAY -$((WEEKDAY-1)) days" +%F)
SUNDAY=$(TZ="$TZ_NAME" date -d "$MONDAY +6 days" +%F)
REPORT="reports/seo-weekly/seo-weekly-${MONDAY}-to-${SUNDAY}.md"
run_fixture_self_test
WEEKLY_REPORT_DATE="$TODAY" bash scripts/generate-seo-weekly-report.sh >/tmp/openclaw-hub-weekly-freshness.log
check_report "$REPORT" "$MONDAY" "$SUNDAY" "$TODAY" "$WEEKDAY"
echo "Weekly report freshness check passed: report=${REPORT}, prepared=${TODAY}, elapsed=${WEEKDAY}/7"
