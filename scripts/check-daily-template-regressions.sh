#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

if command -v rg >/dev/null 2>&1 && rg --version 2>/dev/null | head -1 | grep -qi 'ripgrep'; then
  SEARCH_BIN="rg"
else
  SEARCH_BIN="grep"
fi

FILES=("src/content/blog/en/openclaw-daily-*.md" "src/content/blog/zh/openclaw-daily-*.md")

PLACEHOLDER_PATTERNS=(
  'Synced with the daily Telegram AI/tech brief'
  '与 Telegram 当日推送同步'
  'key updates, practical actions, and next-step watchpoints\.'
  '关键更新、可执行动作与后续观察点'
  '素材已足够，停止搜索。开始撰稿。'
  '开始撰稿'
  'web_search 服务不可用'
)

CTA_PATTERNS=(
  'CTA_VARIANT_A'
  'CTA_VARIANT_B'
  'Contact us for a tailored OpenClaw setup plan'
  'Subscribe to our daily brief for more operator-ready updates'
  '联系我们获取定制版 OpenClaw 部署方案'
  '订阅每日简报，持续获取可直接执行的更新'
)

latest_daily_file() {
  local lang="$1"
  find "src/content/blog/${lang}" -maxdepth 1 -type f -name 'openclaw-daily-*.md' | sort | tail -1
}

check_latest_conclusion_completeness() {
  local lang="$1"
  local heading_pattern="$2"
  local required_label_pattern="$3"
  local file
  file="$(latest_daily_file "$lang")"

  if [ -z "$file" ] || [ ! -f "$file" ]; then
    echo "Daily template regression check failed: missing latest ${lang} daily file"
    return 1
  fi

  local section
  section=$(awk -v heading="$heading_pattern" '
    $0 ~ heading { in_section=1; print; next }
    in_section && /^## / { exit }
    in_section { print }
  ' "$file")

  if [ -z "$section" ]; then
    echo "Daily template regression check failed: latest ${lang} daily is missing conclusion section: $file"
    return 1
  fi

  local plain_length
  plain_length=$(printf '%s\n' "$section" | sed -E 's/\[[^]]+\]\([^)]+\)//g; s/[#*_`>\-]//g; s/[[:space:]]//g' | wc -m | tr -d ' ')
  if [ "$plain_length" -lt 160 ]; then
    echo "Daily template regression check failed: latest ${lang} conclusion section looks too thin (${plain_length} chars): $file"
    return 1
  fi

  local label_count
  label_count=$(printf '%s\n' "$section" | grep -Ec "$required_label_pattern" || true)
  if [ "$label_count" -lt 3 ]; then
    echo "Daily template regression check failed: latest ${lang} conclusion section must include 3 actionable conclusion labels: $file"
    return 1
  fi

  local banned_output
  banned_output=$(printf '%s\n' "$section" | grep -En '(\.\.\.|……|待补充|待完善|TODO|TBD|placeholder|Placeholder|占位|未完|稍后补|to be added|coming soon)' || true)
  if [ -n "$banned_output" ]; then
    echo "Daily template regression check failed: latest ${lang} conclusion section contains unfinished placeholder/ellipsis residue: $file"
    printf '%s\n' "$banned_output"
    return 1
  fi
}

search_pattern() {
  local label="$1"
  local pattern="$2"
  local had_match=0
  local output=""

  if [ "$SEARCH_BIN" = "rg" ]; then
    output=$(rg -n --no-heading --glob 'openclaw-daily-*.md' -e "$pattern" src/content/blog/en src/content/blog/zh || true)
  else
    output=$(grep -RIn -E --include='openclaw-daily-*.md' -e "$pattern" src/content/blog/en src/content/blog/zh || true)
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

check_latest_conclusion_completeness "en" "^## Takeaways$" "^\*\*(Most important signal|Second signal|Actionable implication):\*\*"
check_latest_conclusion_completeness "zh" "^## 今日结论$" "^\*\*(最值得关注|第二个信号|可执行建议)：\*\*"

echo "Daily template regression check passed: no placeholder descriptions, generic CTA residue, or latest conclusion placeholders found in EN/ZH daily posts"
