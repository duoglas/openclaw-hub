#!/usr/bin/env bash
set -euo pipefail

# Check only freshest daily posts (last N per language) to avoid legacy noise.
LATEST_COUNT="${LATEST_COUNT:-2}"

collect_latest() {
  local lang="$1"
  ls "src/content/blog/${lang}"/openclaw-daily-*.md 2>/dev/null | sort | tail -n "$LATEST_COUNT"
}

check_file() {
  local file="$1"
  local failed=0

  # 1) Dangling section bullets like "- 可能影响：" or "- **可能影响**："
  if grep -nE '^-\s*(\*\*)?可能影响(\*\*)?：\s*$' "$file" >/tmp/daily_fresh_issue.$$; then
    echo "[FAIL] Dangling impact bullet in $file"
    cat /tmp/daily_fresh_issue.$$
    failed=1
  fi

  # 2) Hard truncation tails commonly caused by cut-off generation
  if grep -nE '(最关键信\.\.\.|可能影\.\.\.|发生\.\.\.|同\.\.\.|全能\s*\.\.\.|^.*\s…$)' "$file" >/tmp/daily_fresh_issue.$$; then
    echo "[FAIL] Potential truncation tail in $file"
    cat /tmp/daily_fresh_issue.$$
    failed=1
  fi

  rm -f /tmp/daily_fresh_issue.$$
  return $failed
}

fail=0
for lang in en zh; do
  while IFS= read -r f; do
    [[ -z "$f" ]] && continue
    check_file "$f" || fail=1
  done < <(collect_latest "$lang")
done

if [[ "$fail" -ne 0 ]]; then
  echo "Fresh daily completeness check failed"
  exit 1
fi

echo "Fresh daily completeness check passed (latest ${LATEST_COUNT} EN/ZH daily posts)"
