#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

fail=0

# Rule 1: guide index should not be polluted by daily/weekly slugs (enforced in page code, here we lint source taxonomy)
for f in src/content/blog/{en,zh}/openclaw-daily-*.md src/content/blog/{en,zh}/openclaw-weekly-*.md; do
  [ -f "$f" ] || continue
  if ! grep -q '"daily"\|"weekly"' "$f"; then
    echo "[taxonomy] Missing daily/weekly tag in $f"
    fail=1
  fi
done

# Rule 2: Telegram troubleshooting posts must not be tagged as deployment
while IFS= read -r f; do
  [ -f "$f" ] || continue
  if grep -qi '^tags:.*telegram' "$f" && grep -qi '^tags:.*deployment' "$f"; then
    echo "[taxonomy] Telegram post incorrectly tagged as deployment: $f"
    fail=1
  fi
done < <(find src/content/blog -type f -name '*telegram*.md')

if [ "$fail" -ne 0 ]; then
  echo "[taxonomy] FAILED"
  exit 1
fi

echo "[taxonomy] passed"
