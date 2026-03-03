#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

TZ="Asia/Shanghai"
TODAY=$(TZ="$TZ" date +%F)
WEEKDAY=$(TZ="$TZ" date +%u) # 1=Mon..7=Sun
MONDAY=$(TZ="$TZ" date -d "$TODAY -$((WEEKDAY-1)) days" +%F)
SUNDAY=$(TZ="$TZ" date -d "$MONDAY +6 days" +%F)
NOW=$(TZ="$TZ" date '+%F %H:%M')

STALE_DOMAIN="openhub.plzbite.top"
OUT_DIR="reports/seo-weekly"
OUT_FILE="${OUT_DIR}/stale-domain-alert-${MONDAY}-to-${SUNDAY}.md"

mkdir -p "$OUT_DIR"

SEARCH_PATHS=(
  "src"
  "public"
  "astro.config.mjs"
)

ALLOW_PATTERNS=(
  '^public/_redirects:'
)

RAW_MATCHES=""
if grep -RIn --binary-files=without-match --exclude-dir=.git --exclude-dir=node_modules --exclude-dir=dist -- "$STALE_DOMAIN" "${SEARCH_PATHS[@]}" >/tmp/stale_domain_scan_raw.txt 2>/dev/null; then
  RAW_MATCHES=$(cat /tmp/stale_domain_scan_raw.txt)
else
  RAW_MATCHES=""
fi

VIOLATIONS=()
ALLOWED=()

declare -A VIOLATION_GROUP_COUNT
VIOLATION_GROUP_COUNT["__init__"]=0
declare -A ALLOWED_GROUP_COUNT
ALLOWED_GROUP_COUNT["__init__"]=0
declare -A VIOLATION_GROUP_SAMPLES
VIOLATION_GROUP_SAMPLES["__init__"]=""
declare -A ALLOWED_GROUP_SAMPLES
ALLOWED_GROUP_SAMPLES["__init__"]=""

append_group_sample() {
  local bucket="$1"
  local key="$2"
  local line="$3"
  local existing=""

  if [ "$bucket" = "violation" ]; then
    existing="${VIOLATION_GROUP_SAMPLES[$key]-}"
    if [ -z "$existing" ]; then
      VIOLATION_GROUP_SAMPLES[$key]="$line"
    else
      local sample_count
      sample_count=$(printf "%s\n" "$existing" | wc -l | tr -d ' ')
      if [ "$sample_count" -lt 3 ]; then
        VIOLATION_GROUP_SAMPLES[$key]="${existing}\n${line}"
      fi
    fi
  else
    existing="${ALLOWED_GROUP_SAMPLES[$key]-}"
    if [ -z "$existing" ]; then
      ALLOWED_GROUP_SAMPLES[$key]="$line"
    else
      local sample_count
      sample_count=$(printf "%s\n" "$existing" | wc -l | tr -d ' ')
      if [ "$sample_count" -lt 3 ]; then
        ALLOWED_GROUP_SAMPLES[$key]="${existing}\n${line}"
      fi
    fi
  fi
}

get_group_key() {
  local line="$1"
  local file_path dir
  file_path="${line%%:*}"
  dir=$(dirname "$file_path")
  if [ "$dir" = "." ]; then
    echo "(root)"
  else
    echo "$dir"
  fi
}

unset 'VIOLATION_GROUP_COUNT[__init__]'
unset 'ALLOWED_GROUP_COUNT[__init__]'
unset 'VIOLATION_GROUP_SAMPLES[__init__]'
unset 'ALLOWED_GROUP_SAMPLES[__init__]'

if [ -n "$RAW_MATCHES" ]; then
  while IFS= read -r line; do
    [ -n "$line" ] || continue
    is_allowed=0
    for p in "${ALLOW_PATTERNS[@]}"; do
      if [[ "$line" =~ $p ]]; then
        is_allowed=1
        break
      fi
    done

    group_key=$(get_group_key "$line")

    if [ "$is_allowed" -eq 1 ]; then
      ALLOWED+=("$line")
      ALLOWED_GROUP_COUNT["$group_key"]=$(( ${ALLOWED_GROUP_COUNT["$group_key"]-0} + 1 ))
      append_group_sample "allowed" "$group_key" "$line"
    else
      VIOLATIONS+=("$line")
      VIOLATION_GROUP_COUNT["$group_key"]=$(( ${VIOLATION_GROUP_COUNT["$group_key"]-0} + 1 ))
      append_group_sample "violation" "$group_key" "$line"
    fi
  done <<< "$RAW_MATCHES"
fi

print_group_table() {
  local bucket="$1"
  local has_rows=0
  echo "| Directory | Count |"
  echo "|---|---:|"

  if [ "$bucket" = "violation" ]; then
    if [ "${#VIOLATION_GROUP_COUNT[@]}" -eq 0 ]; then
      echo "| (none) | 0 |"
      return
    fi
    while IFS=$'\t' read -r count key; do
      [ -n "$key" ] || continue
      echo "| ${key} | ${count} |"
      has_rows=1
    done < <(
      for key in "${!VIOLATION_GROUP_COUNT[@]}"; do
        echo -e "${VIOLATION_GROUP_COUNT[$key]}\t${key}"
      done | sort -nr
    )
  else
    if [ "${#ALLOWED_GROUP_COUNT[@]}" -eq 0 ]; then
      echo "| (none) | 0 |"
      return
    fi
    while IFS=$'\t' read -r count key; do
      [ -n "$key" ] || continue
      echo "| ${key} | ${count} |"
      has_rows=1
    done < <(
      for key in "${!ALLOWED_GROUP_COUNT[@]}"; do
        echo -e "${ALLOWED_GROUP_COUNT[$key]}\t${key}"
      done | sort -nr
    )
  fi

  if [ "$has_rows" -eq 0 ]; then
    echo "| (none) | 0 |"
  fi
}

print_group_samples() {
  local bucket="$1"

  if [ "$bucket" = "violation" ]; then
    if [ "${#VIOLATION_GROUP_SAMPLES[@]}" -eq 0 ]; then
      echo "- (none)"
      return
    fi

    while IFS=$'\t' read -r count key; do
      [ -n "$key" ] || continue
      echo "- ${key} (top samples)"
      while IFS= read -r sample_line; do
        [ -n "$sample_line" ] || continue
        echo "  - ${sample_line}"
      done <<< "$(printf "%b" "${VIOLATION_GROUP_SAMPLES[$key]}")"
    done < <(
      for key in "${!VIOLATION_GROUP_COUNT[@]}"; do
        echo -e "${VIOLATION_GROUP_COUNT[$key]}\t${key}"
      done | sort -nr
    )
  else
    if [ "${#ALLOWED_GROUP_SAMPLES[@]}" -eq 0 ]; then
      echo "- (none)"
      return
    fi

    while IFS=$'\t' read -r count key; do
      [ -n "$key" ] || continue
      echo "- ${key} (top samples)"
      while IFS= read -r sample_line; do
        [ -n "$sample_line" ] || continue
        echo "  - ${sample_line}"
      done <<< "$(printf "%b" "${ALLOWED_GROUP_SAMPLES[$key]}")"
    done < <(
      for key in "${!ALLOWED_GROUP_COUNT[@]}"; do
        echo -e "${ALLOWED_GROUP_COUNT[$key]}\t${key}"
      done | sort -nr
    )
  fi
}

{
  echo "# Stale Domain Weekly Alert"
  echo
  echo "- Week: ${MONDAY} ~ ${SUNDAY}"
  echo "- Generated at: ${NOW} (Asia/Shanghai)"
  echo "- Scanner: scripts/scan-stale-domain.sh"
  echo "- Target stale domain: \`${STALE_DOMAIN}\`"
  echo

  if [ "${#VIOLATIONS[@]}" -gt 0 ]; then
    echo "## Status: ALERT"
    echo
    echo "Found stale-domain references in SEO-sensitive files:"
    echo
    for line in "${VIOLATIONS[@]}"; do
      echo "- ${line}"
    done
  else
    echo "## Status: OK"
    echo
    echo "No stale-domain references found in SEO-sensitive files."
  fi

  echo
  echo "## Violations by directory"
  print_group_table "violation"

  echo
  echo "## Violation samples by directory (Top3 each)"
  print_group_samples "violation"

  echo
  echo "## Allowed references"
  if [ "${#ALLOWED[@]}" -gt 0 ]; then
    for line in "${ALLOWED[@]}"; do
      echo "- ${line}"
    done
  else
    echo "- (none)"
  fi

  echo
  echo "## Allowed references by directory"
  print_group_table "allowed"

  echo
  echo "## Allowed samples by directory (Top3 each)"
  print_group_samples "allowed"

  echo
  echo "## Next action"
  if [ "${#VIOLATIONS[@]}" -gt 0 ]; then
    echo "- Replace stale domain references with \`kuoo.uk\` and rerun \`pnpm check:stale-domain\`."
  else
    echo "- Keep this scan in weekly routine for domain hygiene guardrail."
  fi
} > "$OUT_FILE"

echo "Generated: ${OUT_FILE}"

if [ "${#VIOLATIONS[@]}" -gt 0 ]; then
  echo "Stale-domain violations: ${#VIOLATIONS[@]}"
  exit 1
fi

echo "Stale-domain check passed."
