#!/usr/bin/env bash
set -euo pipefail

# Guard the freshest daily posts against missing action-oriented closeout sections.
# Recent manual fixes repeatedly added Bottom Line / Watch sections after publish;
# this check makes those sections a release baseline instead of a cleanup task.
LATEST_COUNT="${LATEST_COUNT:-1}"

collect_latest() {
  local lang="$1"
  ls "src/content/blog/${lang}"/openclaw-daily-*.md 2>/dev/null | sort | tail -n "$LATEST_COUNT"
}

section_body() {
  local file="$1"
  local heading="$2"
  awk -v heading="$heading" '
    $0 == heading { in_section=1; next }
    in_section && /^## / { exit }
    in_section { print }
  ' "$file"
}

check_section() {
  local file="$1"
  local heading="$2"
  local min_bullets="$3"
  local label="$4"
  local body
  body="$(section_body "$file" "$heading")"

  if [[ -z "${body//[[:space:]]/}" ]]; then
    echo "[FAIL] Missing or empty ${label} section (${heading}) in ${file}"
    return 1
  fi

  local bullet_count
  bullet_count="$(printf '%s\n' "$body" | grep -cE '^-\s+[^[:space:]]' || true)"
  if (( bullet_count < min_bullets )); then
    echo "[FAIL] ${label} section in ${file} has ${bullet_count} bullets; expected at least ${min_bullets}"
    return 1
  fi

  if printf '%s\n' "$body" | grep -nE '(^-\s*(\.\.\.|…)$|\.\.\.$|…$)' >/tmp/daily_action_issue.$$; then
    echo "[FAIL] Truncated bullet in ${label} section of ${file}"
    cat /tmp/daily_action_issue.$$
    rm -f /tmp/daily_action_issue.$$
    return 1
  fi

  rm -f /tmp/daily_action_issue.$$
}

check_file() {
  local lang="$1"
  local file="$2"
  local fail=0

  if [[ "$lang" == "en" ]]; then
    check_section "$file" "## Today’s Bottom Line" 3 "bottom line" || fail=1
    check_section "$file" "## What to Watch Tomorrow" 3 "watch list" || fail=1
  else
    check_section "$file" "## 今日结论" 3 "今日结论" || fail=1
    check_section "$file" "## 明日跟踪点" 3 "明日跟踪点" || fail=1
  fi

  return "$fail"
}

fail=0
for lang in en zh; do
  while IFS= read -r file; do
    [[ -z "$file" ]] && continue
    check_file "$lang" "$file" || fail=1
  done < <(collect_latest "$lang")
done

if [[ "$fail" -ne 0 ]]; then
  echo "Daily action sections check failed"
  exit 1
fi

echo "Daily action sections check passed (latest ${LATEST_COUNT} EN/ZH daily posts)"
