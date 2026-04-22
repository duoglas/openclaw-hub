#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

if [ ! -d dist/en/blog ] || [ ! -d dist/zh/blog ]; then
  echo "Noindex leak check failed: dist/en/blog or dist/zh/blog not found. Run pnpm build first."
  exit 1
fi

status=0
checked_total=0
checked_en=0
checked_zh=0
leaks_en=0
leaks_zh=0

declare -a leak_samples_en=()
declare -a leak_samples_zh=()

if command -v rg >/dev/null 2>&1; then
  scanner="rg"
else
  scanner="grep"
  echo "[warn] rg not found, fallback to grep -RIn mode"
fi

has_noindex_meta() {
  local file="$1"
  if [ "$scanner" = "rg" ]; then
    rg -qi --pcre2 '(<meta[^>]+(?:name|http-equiv)=["'"'"'](?:robots|x-robots-tag)["'"'"'][^>]*content=["'"'"'][^"'"'"']*noindex[^"'"'"']*["'"'"'])|(<meta[^>]+content=["'"'"'][^"'"'"']*noindex[^"'"'"']*["'"'"'][^>]*(?:name|http-equiv)=["'"'"'](?:robots|x-robots-tag)["'"'"'])' "$file" >/dev/null
  else
    grep -Eiq '(<meta[^>]+(name|http-equiv)=["'"'"'](robots|x-robots-tag)["'"'"'][^>]*content=["'"'"'][^"'"'"']*noindex[^"'"'"']*["'"'"'])|(<meta[^>]+content=["'"'"'][^"'"'"']*noindex[^"'"'"']*["'"'"'][^>]*(name|http-equiv)=["'"'"'](robots|x-robots-tag)["'"'"'])' "$file"
  fi
}

# --- expected-noindex allowlist (B+D features) -----------------------------
# B) tag aggregation pages under /{lang}/blog/tag/** are intentionally noindex
# D) openclaw-daily-YYYY-MM-DD older than STALE_DAYS (default 60) are noindex
STALE_DAYS="${STALE_DAYS:-60}"
# today as epoch-days (UTC); GNU date only — matches repo environment
today_epoch_days=$(( $(date -u +%s) / 86400 ))

is_expected_noindex() {
  local file="$1"
  # tag pages
  case "$file" in
    dist/en/blog/tag/*|dist/zh/blog/tag/*) return 0 ;;
  esac
  # old daily posts: match file name component openclaw-daily-YYYY-MM-DD
  local slug
  slug=$(basename "$(dirname "$file")")
  if [[ "$slug" =~ ^openclaw-daily-([0-9]{4})-([0-9]{2})-([0-9]{2})$ ]]; then
    local y="${BASH_REMATCH[1]}" m="${BASH_REMATCH[2]}" d="${BASH_REMATCH[3]}"
    local post_epoch
    post_epoch=$(date -u -d "${y}-${m}-${d}" +%s 2>/dev/null) || return 1
    local post_epoch_days=$(( post_epoch / 86400 ))
    local age_days=$(( today_epoch_days - post_epoch_days ))
    # Day-floored age matches the source threshold (ms-based) as soon as we
    # cross the Nth UTC day boundary, so use -ge to avoid an off-by-one false
    # positive on the day of the boundary itself.
    if [ "$age_days" -ge "$STALE_DAYS" ]; then
      return 0
    fi
  fi
  return 1
}

while IFS= read -r f; do
  [ -f "$f" ] || continue
  checked_total=$((checked_total + 1))

  lang=""
  case "$f" in
    dist/en/*) lang="en"; checked_en=$((checked_en + 1)) ;;
    dist/zh/*) lang="zh"; checked_zh=$((checked_zh + 1)) ;;
  esac

  if has_noindex_meta "$f"; then
    if is_expected_noindex "$f"; then
      # allow-listed: tag page or stale daily — not a leak
      continue
    fi
    echo "Noindex leak detected in: $f"
    status=1

    if [ "$lang" = "en" ]; then
      leaks_en=$((leaks_en + 1))
      if [ "${#leak_samples_en[@]}" -lt 3 ]; then
        leak_samples_en+=("$f")
      fi
    elif [ "$lang" = "zh" ]; then
      leaks_zh=$((leaks_zh + 1))
      if [ "${#leak_samples_zh[@]}" -lt 3 ]; then
        leak_samples_zh+=("$f")
      fi
    fi
  fi
done < <(find dist/en/blog dist/zh/blog -type f -name index.html | sort)

if [ "$checked_total" -eq 0 ]; then
  echo "Noindex leak check failed: no blog index.html files found under dist/en/blog or dist/zh/blog"
  exit 1
fi

echo "Noindex leak report by language:"
echo "- EN: scanned=${checked_en}, leaks=${leaks_en}"
if [ "${#leak_samples_en[@]}" -gt 0 ]; then
  echo "  samples:"
  for f in "${leak_samples_en[@]}"; do
    echo "  - $f"
  done
fi

echo "- ZH: scanned=${checked_zh}, leaks=${leaks_zh}"
if [ "${#leak_samples_zh[@]}" -gt 0 ]; then
  echo "  samples:"
  for f in "${leak_samples_zh[@]}"; do
    echo "  - $f"
  done
fi

if [ "$status" -ne 0 ]; then
  exit 1
fi

echo "Noindex leak check passed: ${checked_total} blog pages scanned"
