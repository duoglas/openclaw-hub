#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

ROLLING_DAILY_BODY_LIMIT="${ROLLING_DAILY_BODY_LIMIT:-4}"

latest_daily_files() {
  local lang="$1"
  find "src/content/blog/${lang}" -maxdepth 1 -type f -name 'openclaw-daily-*.md' -print0 \
    | xargs -0 grep -H '^pubDate:' \
    | sed -E 's#^(.*):pubDate:[[:space:]]*([0-9-]+).*#\2\t\1#' \
    | sort -r \
    | head -n "$ROLLING_DAILY_BODY_LIMIT" \
    | cut -f2-
}

section_between() {
  local file="$1"
  local heading_regex="$2"
  awk -v heading="$heading_regex" '
    $0 ~ heading { in_section=1; print; next }
    in_section && /^## / { exit }
    in_section { print }
  ' "$file"
}

check_file() {
  local lang="$1"
  local file="$2"
  local conclusion_heading label_pattern cta_heading

  if [ "$lang" = "en" ]; then
    conclusion_heading='^## Takeaways$'
    label_pattern='^\*\*(Most important signal|Second signal|Actionable implication):\*\*'
    cta_heading='^## Next-Step CTA$'
  else
    conclusion_heading='^## 今日结论$'
    label_pattern='^\*\*(最值得关注|第二个信号|可执行建议)：\*\*'
    cta_heading='^## 下一步行动（CTA）$'
  fi

  local truncated_lines
  truncated_lines=$(grep -nE '([[:alnum:][:punct:]一-龥])…[[:space:]]*$|([[:alnum:][:punct:]一-龥])\.\.\.[[:space:]]*$' "$file" || true)
  if [ -n "$truncated_lines" ]; then
    echo "Rolling daily body completeness check failed: found likely truncated body lines in $file"
    printf '%s\n' "$truncated_lines"
    return 1
  fi

  local conclusion
  conclusion=$(section_between "$file" "$conclusion_heading")
  if [ -z "$conclusion" ]; then
    echo "Rolling daily body completeness check failed: missing conclusion section in $file"
    return 1
  fi

  local label_count
  label_count=$(printf '%s\n' "$conclusion" | grep -Ec "$label_pattern" || true)
  if [ "$label_count" -lt 3 ]; then
    echo "Rolling daily body completeness check failed: conclusion must include 3 action labels in $file"
    return 1
  fi

  local plain_length
  plain_length=$(printf '%s\n' "$conclusion" | sed -E 's/\[[^]]+\]\([^)]+\)//g; s/[#*_`>\-]//g; s/[[:space:]]//g' | wc -m | tr -d ' ')
  if [ "$plain_length" -lt 180 ]; then
    echo "Rolling daily body completeness check failed: conclusion looks too thin (${plain_length} chars) in $file"
    return 1
  fi

  local pre_cta
  pre_cta=$(awk -v cta="$cta_heading" '$0 ~ cta { exit } { print }' "$file")
  local story_count
  story_count=$(printf '%s\n' "$pre_cta" | grep -Ec '^(### )?[0-9]+\.' || true)
  if [ "$story_count" -lt 4 ]; then
    echo "Rolling daily body completeness check failed: expected at least 4 numbered stories before CTA in $file"
    return 1
  fi
}

for lang in en zh; do
  mapfile -t files < <(latest_daily_files "$lang")
  if [ "${#files[@]}" -lt "$ROLLING_DAILY_BODY_LIMIT" ]; then
    echo "Rolling daily body completeness check failed: expected ${ROLLING_DAILY_BODY_LIMIT} ${lang} daily files, found ${#files[@]}"
    exit 1
  fi
  for file in "${files[@]}"; do
    check_file "$lang" "$file"
  done
done

echo "Rolling daily body completeness check passed for latest ${ROLLING_DAILY_BODY_LIMIT} EN/ZH daily posts"
