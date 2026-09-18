#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

fail() { echo "Weekly action-plan integrity check failed: $*" >&2; }

check_report() {
  local file="$1" expected_start="$2" expected_end="$3" prepared_date="$4"
  local in_plan=0 line action_count due owner due_date
  [ -f "$file" ] || { fail "missing report $file"; return 1; }

  while IFS= read -r line || [ -n "$line" ]; do
    if [ "$line" = "## 14) Action Plan (Next Week)" ]; then
      in_plan=1
      continue
    fi
    if [ "$in_plan" -eq 1 ] && [[ "$line" == "## "* ]]; then
      break
    fi
    [ "$in_plan" -eq 1 ] || continue
    [[ "$line" == "- ["* ]] || continue

    action_count=$((action_count + 1))
    owner=$(printf '%s\n' "$line" | sed -nE 's/.*\|[[:space:]]*owner:[[:space:]]*([^|]+).*/\1/p' | sed 's/[[:space:]]*$//')
    due=$(printf '%s\n' "$line" | sed -nE 's/.*\|[[:space:]]*due:[[:space:]]*([0-9]{4}-[0-9]{2}-[0-9]{2}).*/\1/p')
    [ -n "$owner" ] || { fail "action ${action_count} is missing owner"; return 1; }
    [ -n "$due" ] || { fail "action ${action_count} is missing due date"; return 1; }
    due_date=$(TZ=UTC date -d "$due" +%F 2>/dev/null) || { fail "action ${action_count} has invalid due date ${due}"; return 1; }
    [ "$due_date" = "$due" ] || { fail "action ${action_count} has invalid due date ${due}"; return 1; }
    if [[ "$due" < "$expected_start" || "$due" > "$expected_end" ]]; then
      fail "action ${action_count} due date ${due} is outside report week ${expected_start}..${expected_end}"
      return 1
    fi
    if [[ "$due" < "$prepared_date" ]]; then
      fail "action ${action_count} due date ${due} predates prepared date ${prepared_date}"
      return 1
    fi
  done < "$file"

  [ "$action_count" -gt 0 ] || { fail "Action Plan contains no executable checkbox items"; return 1; }
}

run_fixture_self_test() {
  local dir good missing_owner out_of_range stale
  dir=$(mktemp -d)
  good="$dir/good.md"
  cat > "$good" <<'EOF'
## 14) Action Plan (Next Week)
- [ ] P1: Backfill data | owner: hub-growth-worker | due: 2026-09-20

## 15) Data Sources
EOF
  check_report "$good" 2026-09-14 2026-09-20 2026-09-18

  missing_owner="$dir/missing-owner.md"
  sed 's/ | owner: hub-growth-worker//' "$good" > "$missing_owner"
  if check_report "$missing_owner" 2026-09-14 2026-09-20 2026-09-18 >/dev/null 2>&1; then fail "self-test accepted action without owner"; rm -rf "$dir"; return 1; fi

  out_of_range="$dir/out-of-range.md"
  sed 's/2026-09-20/2026-09-21/' "$good" > "$out_of_range"
  if check_report "$out_of_range" 2026-09-14 2026-09-20 2026-09-18 >/dev/null 2>&1; then fail "self-test accepted out-of-range due date"; rm -rf "$dir"; return 1; fi

  stale="$dir/stale.md"
  sed 's/2026-09-20/2026-09-17/' "$good" > "$stale"
  if check_report "$stale" 2026-09-14 2026-09-20 2026-09-18 >/dev/null 2>&1; then fail "self-test accepted due date before prepared date"; rm -rf "$dir"; return 1; fi

  rm -rf "$dir"
}

TODAY="${WEEKLY_REPORT_DATE:-$(TZ=Asia/Shanghai date +%F)}"
WEEKDAY=$(TZ=Asia/Shanghai date -d "$TODAY" +%u)
MONDAY=$(TZ=Asia/Shanghai date -d "$TODAY -$((WEEKDAY-1)) days" +%F)
SUNDAY=$(TZ=Asia/Shanghai date -d "$MONDAY +6 days" +%F)
REPORT="reports/seo-weekly/seo-weekly-${MONDAY}-to-${SUNDAY}.md"

run_fixture_self_test
check_report "$REPORT" "$MONDAY" "$SUNDAY" "$TODAY"
echo "Weekly action-plan integrity check passed: report=${REPORT}, actions=${action_count:-unknown}"
