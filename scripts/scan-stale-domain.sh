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

    if [ "$is_allowed" -eq 1 ]; then
      ALLOWED+=("$line")
    else
      VIOLATIONS+=("$line")
    fi
  done <<< "$RAW_MATCHES"
fi

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
  echo "## Allowed references"
  if [ "${#ALLOWED[@]}" -gt 0 ]; then
    for line in "${ALLOWED[@]}"; do
      echo "- ${line}"
    done
  else
    echo "- (none)"
  fi

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
