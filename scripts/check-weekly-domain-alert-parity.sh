#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

fail() { echo "Weekly domain-alert parity check failed: $*" >&2; }

check_report() {
  local report="$1" expected_start="$2" expected_end="$3"
  local alert_path report_status alert_week alert_status
  [ -f "$report" ] || { fail "missing weekly report $report"; return 1; }

  alert_path=$(awk -F': ' '/^- Alert file:/{print $2; exit}' "$report" | tr -d '\r')
  [ "$alert_path" = "reports/seo-weekly/stale-domain-alert-${expected_start}-to-${expected_end}.md" ] || { fail "report alert path is not the current week: ${alert_path:-missing}"; return 1; }
  [ -f "$alert_path" ] || { fail "missing alert file $alert_path"; return 1; }

  report_status=$(awk -F': ' '/^- Stale domain scanner status:/{print $2; exit}' "$report" | tr -d '\r' | xargs)
  alert_week=$(awk -F': ' '/^- Week:/{print $2; exit}' "$alert_path" | tr -d '\r' | xargs)
  alert_status=$(awk '/^## Status:/{print $3; exit}' "$alert_path" | tr -d '\r' | tr '[:upper:]' '[:lower:]')

  [ "$alert_week" = "${expected_start} ~ ${expected_end}" ] || { fail "alert week ${alert_week:-missing} does not match ${expected_start} ~ ${expected_end}"; return 1; }
  case "$report_status:$alert_status" in
    ok:ok|alert:alert) ;;
    *) fail "report status ${report_status:-missing} disagrees with alert status ${alert_status:-missing}"; return 1 ;;
  esac
}

run_fixture_self_test() {
  local dir report alert
  dir=$(mktemp -d)
  mkdir -p "$dir/reports/seo-weekly"
  report="$dir/reports/seo-weekly/seo-weekly-2026-09-14-to-2026-09-20.md"
  alert="$dir/reports/seo-weekly/stale-domain-alert-2026-09-14-to-2026-09-20.md"
  cat > "$report" <<'FIXTURE_REPORT'
## 12) Domain Hygiene Guardrail (auto)
- Stale domain scanner status: ok
- Alert file: reports/seo-weekly/stale-domain-alert-2026-09-14-to-2026-09-20.md
FIXTURE_REPORT
  cat > "$alert" <<'FIXTURE_ALERT'
- Week: 2026-09-14 ~ 2026-09-20
## Status: OK
FIXTURE_ALERT
  (cd "$dir" && check_report "$report" 2026-09-14 2026-09-20)

  sed 's/Status: OK/Status: ALERT/' "$alert" > "$dir/alert.tmp"
  mv "$dir/alert.tmp" "$alert"
  if (cd "$dir" && check_report "$report" 2026-09-14 2026-09-20 >/dev/null 2>&1); then
    fail "self-test accepted report/alert status mismatch"
    rm -rf "$dir"
    return 1
  fi
  rm -rf "$dir"
}

TODAY="${WEEKLY_REPORT_DATE:-$(TZ=Asia/Shanghai date +%F)}"
WEEKDAY=$(TZ=Asia/Shanghai date +%u)
MONDAY=$(TZ=Asia/Shanghai date -d "$TODAY -$((WEEKDAY-1)) days" +%F)
SUNDAY=$(TZ=Asia/Shanghai date -d "$MONDAY +6 days" +%F)
REPORT="reports/seo-weekly/seo-weekly-${MONDAY}-to-${SUNDAY}.md"

run_fixture_self_test
check_report "$REPORT" "$MONDAY" "$SUNDAY"
echo "Weekly domain-alert parity check passed: report=${REPORT}"
