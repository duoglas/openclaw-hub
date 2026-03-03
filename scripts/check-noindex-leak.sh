#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

if [ ! -d dist/en/blog ] || [ ! -d dist/zh/blog ]; then
  echo "Noindex leak check failed: dist/en/blog or dist/zh/blog not found. Run pnpm build first."
  exit 1
fi

status=0
checked=0

while IFS= read -r f; do
  [ -f "$f" ] || continue
  checked=$((checked+1))

  if rg -qi --pcre2 '(<meta[^>]+(?:name|http-equiv)=["'"'"'](?:robots|x-robots-tag)["'"'"'][^>]*content=["'"'"'][^"'"'"']*noindex[^"'"'"']*["'"'"'])|(<meta[^>]+content=["'"'"'][^"'"'"']*noindex[^"'"'"']*["'"'"'][^>]*(?:name|http-equiv)=["'"'"'](?:robots|x-robots-tag)["'"'"'])' "$f"; then
    echo "Noindex leak detected in: $f"
    status=1
  fi
done < <(find dist/en/blog dist/zh/blog -type f -name index.html | sort)

if [ "$checked" -eq 0 ]; then
  echo "Noindex leak check failed: no blog index.html files found under dist/en/blog or dist/zh/blog"
  exit 1
fi

if [ "$status" -ne 0 ]; then
  exit 1
fi

echo "Noindex leak check passed: ${checked} blog pages scanned"
