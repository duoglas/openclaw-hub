#!/usr/bin/env bash
set -euo pipefail

ROOT="dist"
BASE="https://kuoo.uk"
ROBOTS="$ROOT/robots.txt"
SITEMAP_COMPAT="$ROOT/sitemap.xml"
SITEMAP_INDEX="$ROOT/sitemap-index.xml"

fail() {
  echo "Robots/sitemap integrity check failed: $1"
  exit 1
}

[[ -f "$ROBOTS" ]] || fail "missing $ROBOTS"
[[ -f "$SITEMAP_COMPAT" ]] || fail "missing $SITEMAP_COMPAT"
[[ -f "$SITEMAP_INDEX" ]] || fail "missing $SITEMAP_INDEX"

if ! grep -Eq '^User-agent:\s*\*\s*$' "$ROBOTS"; then
  fail "robots.txt missing 'User-agent: *'"
fi

if ! grep -Eq '^Allow:\s*/\s*$' "$ROBOTS"; then
  fail "robots.txt missing 'Allow: /'"
fi

SITEMAP_LINES=$(grep -E '^Sitemap:\s*https://kuoo\.uk/' "$ROBOTS" || true)
SITEMAP_COUNT=$(printf '%s\n' "$SITEMAP_LINES" | sed '/^$/d' | wc -l | tr -d ' ')
[[ "$SITEMAP_COUNT" -ge 2 ]] || fail "robots.txt must advertise both sitemap-index.xml and sitemap.xml"

grep -Eq '^Sitemap:\s*https://kuoo\.uk/sitemap-index\.xml\s*$' "$ROBOTS" || fail "robots.txt missing sitemap-index.xml entry"
grep -Eq '^Sitemap:\s*https://kuoo\.uk/sitemap\.xml\s*$' "$ROBOTS" || fail "robots.txt missing sitemap.xml entry"

if grep -Eqi 'openhub\.plzbite\.top|http://kuoo\.uk' "$ROBOTS"; then
  fail "robots.txt contains stale or non-https domain"
fi

if ! grep -Eq '<loc>https://kuoo\.uk/sitemap-index\.xml</loc>' "$SITEMAP_COMPAT"; then
  fail "compat sitemap.xml must point to sitemap-index.xml"
fi

if grep -Eqi 'openhub\.plzbite\.top|http://kuoo\.uk' "$SITEMAP_COMPAT" "$SITEMAP_INDEX"; then
  fail "sitemap files contain stale or non-https domain"
fi

INDEX_URL_COUNT=$(grep -Eo '<loc>https://kuoo\.uk/[^<]+' "$SITEMAP_INDEX" | wc -l | tr -d ' ')
[[ "$INDEX_URL_COUNT" -ge 1 ]] || fail "sitemap-index.xml has no kuoo.uk <loc> entries"

echo "Robots/sitemap integrity check passed: robots.txt advertises sitemap-index+xml and sitemap.xml; sitemap-index loc count=${INDEX_URL_COUNT}"
