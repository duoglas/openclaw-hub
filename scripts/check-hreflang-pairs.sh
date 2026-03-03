#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

if [[ ! -d dist/en/blog || ! -d dist/zh/blog ]]; then
  echo "[hreflang] dist output missing. Run pnpm build first."
  exit 1
fi

errors=0
checked=0

check_pair() {
  local slug="$1"
  local en_file="dist/en/blog/${slug}/index.html"
  local zh_file="dist/zh/blog/${slug}/index.html"

  [[ -f "$en_file" && -f "$zh_file" ]] || return 0

  checked=$((checked + 1))

  if ! grep -q "hreflang=\"zh\"" "$en_file"; then
    echo "❌ missing hreflang=\"zh\" in $en_file"
    errors=$((errors + 1))
  fi
  if ! grep -q "href=\"/zh/blog/${slug}/\"" "$en_file"; then
    echo "❌ missing zh alternate href in $en_file"
    errors=$((errors + 1))
  fi
  if ! grep -q "hreflang=\"x-default\"" "$en_file"; then
    echo "❌ missing hreflang=\"x-default\" in $en_file"
    errors=$((errors + 1))
  fi

  if ! grep -q "hreflang=\"en\"" "$zh_file"; then
    echo "❌ missing hreflang=\"en\" in $zh_file"
    errors=$((errors + 1))
  fi
  if ! grep -q "href=\"/en/blog/${slug}/\"" "$zh_file"; then
    echo "❌ missing en alternate href in $zh_file"
    errors=$((errors + 1))
  fi
  if ! grep -q "hreflang=\"x-default\"" "$zh_file"; then
    echo "❌ missing hreflang=\"x-default\" in $zh_file"
    errors=$((errors + 1))
  fi
}

for en_post in dist/en/blog/*/index.html; do
  [[ -e "$en_post" ]] || continue
  slug="$(basename "$(dirname "$en_post")")"
  check_pair "$slug"
done

if [[ "$checked" -eq 0 ]]; then
  echo "[hreflang] no EN/ZH blog post pairs found to validate"
  exit 1
fi

if [[ "$errors" -gt 0 ]]; then
  echo "[hreflang] failed: $errors issue(s) across $checked pair(s)"
  exit 1
fi

echo "[hreflang] passed: $checked EN/ZH blog pair(s) validated"
