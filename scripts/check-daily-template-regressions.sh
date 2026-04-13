#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

if command -v rg >/dev/null 2>&1; then
  SEARCH_BIN="rg"
else
  SEARCH_BIN="grep"
fi

FILES=(src/content/blog/en/openclaw-daily-*.md src/content/blog/zh/openclaw-daily-*.md)

PLACEHOLDER_PATTERNS=(
  'Synced with the daily Telegram AI/tech brief'
  '与 Telegram 当日推送同步'
  'key updates, practical actions, and next-step watchpoints\.'
  '关键更新、可执行动作与后续观察点'
)

CTA_PATTERNS=(
  'CTA_VARIANT_A'
  'CTA_VARIANT_B'
  'Contact us for a tailored OpenClaw setup plan'
  'Subscribe to our daily brief for more operator-ready updates'
  '联系我们获取定制版 OpenClaw 部署方案'
  '订阅每日简报，持续获取可直接执行的更新'
)

search_pattern() {
  local label="$1"
  local pattern="$2"
  local had_match=0
  local output=""

  if [ "$SEARCH_BIN" = "rg" ]; then
    output=$(rg -n --no-heading --glob 'openclaw-daily-*.md' -e "$pattern" src/content/blog/en src/content/blog/zh || true)
  else
    output=$(grep -RIn -E --include='openclaw-daily-*.md' -- "$pattern" src/content/blog/en src/content/blog/zh || true)
  fi

  if [ -n "$output" ]; then
    if [ "$had_match" -eq 0 ]; then
      echo "Daily template regression check failed: found ${label} residue"
      had_match=1
    fi
    echo "$output"
    return 1
  fi

  return 0
}

for file in "${FILES[@]}"; do
  if compgen -G "$file" >/dev/null; then
    :
  else
    echo "Daily template regression check failed: missing daily files for pattern $file"
    exit 1
  fi
done

for pattern in "${PLACEHOLDER_PATTERNS[@]}"; do
  search_pattern "placeholder description" "$pattern"
done

for pattern in "${CTA_PATTERNS[@]}"; do
  search_pattern "generic CTA" "$pattern"
done

echo "Daily template regression check passed: no placeholder descriptions or generic CTA residue found in EN/ZH daily posts"
