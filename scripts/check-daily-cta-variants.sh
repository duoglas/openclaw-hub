#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

latest_daily_file() {
  local lang="$1"
  ls -1 "src/content/blog/${lang}/"openclaw-daily-*.md 2>/dev/null | sort | tail -n 1
}

check_file() {
  local file="$1"
  local lang="$2"

  if [ -z "$file" ] || [ ! -f "$file" ]; then
    echo "Daily CTA check failed: missing latest ${lang} daily file"
    return 1
  fi

  if ! grep -Eq "## (Next-Step CTA|下一步行动（CTA）)" "$file"; then
    echo "Daily CTA check failed: CTA heading missing in $file"
    return 1
  fi

  if grep -Fq "CTA_VARIANT_A" "$file" && grep -Fq "CTA_VARIANT_B" "$file"; then
    return 0
  fi

  local required_links=0
  grep -Fq "what-is-openclaw" "$file" && required_links=$((required_links + 1))
  grep -Fq "openclaw-vps-deployment-complete-guide" "$file" && required_links=$((required_links + 1))
  grep -Fq "openclaw-model-fallback-strategy" "$file" && required_links=$((required_links + 1))

  if [ "$required_links" -lt 3 ]; then
    echo "Daily CTA check failed: expected CTA variants or 3 strong internal links in $file"
    return 1
  fi
}

EN_FILE=$(latest_daily_file en)
ZH_FILE=$(latest_daily_file zh)

check_file "$EN_FILE" "en"
check_file "$ZH_FILE" "zh"

echo "Daily CTA variant check passed: ${EN_FILE}, ${ZH_FILE}"
