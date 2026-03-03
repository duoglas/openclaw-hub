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

while IFS= read -r f; do
  [ -f "$f" ] || continue
  checked_total=$((checked_total + 1))

  lang=""
  case "$f" in
    dist/en/*) lang="en"; checked_en=$((checked_en + 1)) ;;
    dist/zh/*) lang="zh"; checked_zh=$((checked_zh + 1)) ;;
  esac

  if has_noindex_meta "$f"; then
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
