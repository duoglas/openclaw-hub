#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

BASE="https://kuoo.uk"
status=0
checked=0

extract_canonical() {
  local file="$1"
  local tag
  tag=$(grep -Eoi "<link[^>]+rel=[\"']canonical[\"'][^>]*>" "$file" | head -n 1 || true)
  if [ -z "$tag" ]; then
    echo ""
    return 0
  fi
  printf "%s" "$tag" | sed -E "s/.*href=[\"']([^\"']+)[\"'].*/\1/I"
}

while IFS= read -r -d '' file; do
  checked=$((checked + 1))

  rel="${file#dist}"
  raw_path="${rel%index.html}"
  encoded_path="$(python3 - "$raw_path" <<'PY'
import sys
from urllib.parse import quote
print(quote(sys.argv[1], safe='/'))
PY
)"
  expected="${BASE}${encoded_path}"
  canonical="$(extract_canonical "$file")"

  if [ -z "$canonical" ]; then
    echo "Canonical integrity check failed: missing canonical in $file"
    status=1
    continue
  fi

  if [[ "$canonical" == *"openhub.plzbite.top"* ]]; then
    echo "Canonical integrity check failed: stale domain in canonical ($canonical) at $file"
    status=1
  fi

  if [ "$canonical" != "$expected" ]; then
    echo "Canonical integrity check failed: canonical mismatch in $file"
    echo "  expected: $expected"
    echo "  actual:   $canonical"
    status=1
  fi
done < <(find dist/en/blog dist/zh/blog -type f -name 'index.html' -print0)

if [ "$checked" -eq 0 ]; then
  echo "Canonical integrity check failed: no blog index.html files found under dist/en/blog or dist/zh/blog"
  exit 1
fi

if [ "$status" -ne 0 ]; then
  exit 1
fi

echo "Canonical integrity check passed: ${checked} blog pages validated"
