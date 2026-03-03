#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

if [ ! -d dist/en ] || [ ! -d dist/zh ]; then
  echo "Social image absolute URL check requires built output. Run 'pnpm build' first."
  exit 1
fi

collect_meta_lines() {
  local file="$1"

  if command -v rg >/dev/null 2>&1; then
    rg -n -e '<meta[^>]+property="og:image"[^>]*>' -e '<meta[^>]+name="twitter:image"[^>]*>' "$file" || true
  else
    grep -nE '<meta[^>]+(property="og:image"|name="twitter:image")[^>]*>' "$file" || true
  fi
}

check_lang() {
  local lang="$1"
  local scanned=0
  local failed=0

  while IFS= read -r -d '' f; do
    scanned=$((scanned + 1))

    local meta
    meta="$(collect_meta_lines "$f")"

    if [ -z "$meta" ]; then
      echo "Social image check failed: missing og:image/twitter:image meta in $f"
      failed=1
      continue
    fi

    while IFS= read -r line; do
      [ -z "$line" ] && continue

      if [[ "$line" != *'content="https://kuoo.uk/'* ]]; then
        echo "Social image check failed: non-absolute or wrong-domain social image meta in $f"
        echo "  -> $line"
        failed=1
      fi
    done <<< "$meta"
  done < <(find "dist/$lang" -type f -name '*.html' -print0)

  if [ "$scanned" -eq 0 ]; then
    echo "Social image check failed: no html files found under dist/$lang"
    return 1
  fi

  if [ "$failed" -ne 0 ]; then
    return 1
  fi

  echo "Social image absolute URL check passed for $lang ($scanned pages)"
}

check_lang en
check_lang zh

echo "Social image absolute URL check passed"
