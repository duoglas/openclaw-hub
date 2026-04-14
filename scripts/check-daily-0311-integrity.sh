#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

TARGET_SLUG="openclaw-daily-2026-03-11"
EN_FILE="src/content/blog/en/${TARGET_SLUG}.md"
ZH_FILE="src/content/blog/zh/${TARGET_SLUG}.md"

for f in "$EN_FILE" "$ZH_FILE"; do
  if [ ! -f "$f" ]; then
    echo "Daily 03-11 integrity check failed: missing required file $f"
    exit 1
  fi
done

# Ensure there are no extra files that can collide with the same daily slug key.
COLLIDING_FILES=$(find src/content/blog -type f -name "*2026*03*11*.md" | sort)
if [ "$(printf "%s\n" "$COLLIDING_FILES" | sed '/^$/d' | wc -l)" -ne 2 ]; then
  echo "Daily 03-11 integrity check failed: expected exactly 2 source files for 2026-03-11 (en+zh), got:"
  printf '%s\n' "$COLLIDING_FILES"
  exit 1
fi

if printf '%s\n' "$COLLIDING_FILES" | grep -qvE "${TARGET_SLUG}\.md$"; then
  echo "Daily 03-11 integrity check failed: found potential conflicting source file names"
  printf '%s\n' "$COLLIDING_FILES"
  exit 1
fi

# If explicit slugs exist, they must be unique and match target slug.
EXPLICIT_SLUG_OWNERS=$(grep -RIn "^slug:\s*['\"]?${TARGET_SLUG}['\"]?$" src/content/blog --include='*.md' || true)
if [ -n "$EXPLICIT_SLUG_OWNERS" ]; then
  OWNER_COUNT=$(printf '%s\n' "$EXPLICIT_SLUG_OWNERS" | wc -l)
  if [ "$OWNER_COUNT" -gt 2 ]; then
    echo "Daily 03-11 integrity check failed: explicit slug appears in too many files"
    printf '%s\n' "$EXPLICIT_SLUG_OWNERS"
    exit 1
  fi
fi

# Build outputs must resolve to exactly one EN and one ZH route.
EN_DIST="dist/en/blog/${TARGET_SLUG}/index.html"
ZH_DIST="dist/zh/blog/${TARGET_SLUG}/index.html"
for f in "$EN_DIST" "$ZH_DIST"; do
  if [ ! -f "$f" ]; then
    echo "Daily 03-11 integrity check failed: missing built route $f (run pnpm build first)"
    exit 1
  fi
done

# RSS must contain exactly one item per language for this slug.
EN_RSS_COUNT=$(grep -F "https://kuoo.uk/en/blog/${TARGET_SLUG}/" dist/en/daily/rss.xml | wc -l || true)
ZH_RSS_COUNT=$(grep -F "https://kuoo.uk/zh/blog/${TARGET_SLUG}/" dist/zh/daily/rss.xml | wc -l || true)
if [ "$EN_RSS_COUNT" -ne 1 ] || [ "$ZH_RSS_COUNT" -ne 1 ]; then
  echo "Daily 03-11 integrity check failed: rss item count mismatch (en=$EN_RSS_COUNT zh=$ZH_RSS_COUNT)"
  exit 1
fi

echo "Daily 03-11 integrity check passed: unique source + route + rss entries verified"
