#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

BASE="https://kuoo.uk"

if [[ ! -d dist/en/blog || ! -d dist/zh/blog ]]; then
  echo "[hreflang] dist output missing. Run pnpm build first."
  exit 1
fi

errors=0
checked=0

check_alternate_link() {
  local file="$1"
  local expected_lang="$2"
  local expected_href="$3"

  python3 - "$file" "$expected_lang" "$expected_href" <<'PY'
import re
import sys

file_path, expected_lang, expected_href = sys.argv[1], sys.argv[2], sys.argv[3]
html = open(file_path, 'r', encoding='utf-8', errors='ignore').read()

link_tags = re.findall(r'<link[^>]+rel=["\']alternate["\'][^>]*>', html, flags=re.IGNORECASE)
for tag in link_tags:
    has_lang = re.search(r'hreflang=["\']' + re.escape(expected_lang) + r'["\']', tag, flags=re.IGNORECASE)
    has_href = re.search(r'href=["\']' + re.escape(expected_href) + r'["\']', tag, flags=re.IGNORECASE)
    if has_lang and has_href:
        sys.exit(0)

sys.exit(1)
PY
}

check_pair() {
  local slug="$1"
  local en_file="dist/en/blog/${slug}/index.html"
  local zh_file="dist/zh/blog/${slug}/index.html"

  [[ -f "$en_file" && -f "$zh_file" ]] || return 0

  checked=$((checked + 1))

  local en_expected_zh_href="${BASE}/zh/blog/${slug}/"
  local zh_expected_en_href="${BASE}/en/blog/${slug}/"
  local expected_x_default="${BASE}/en/blog/${slug}/"

  if ! check_alternate_link "$en_file" "zh" "$en_expected_zh_href"; then
    echo "❌ missing/invalid hreflang=\"zh\" alternate link in $en_file"
    echo "   expected href: $en_expected_zh_href"
    errors=$((errors + 1))
  fi

  if ! check_alternate_link "$en_file" "x-default" "$expected_x_default"; then
    echo "❌ missing/invalid hreflang=\"x-default\" alternate link in $en_file"
    echo "   expected href: $expected_x_default"
    errors=$((errors + 1))
  fi

  if ! check_alternate_link "$zh_file" "en" "$zh_expected_en_href"; then
    echo "❌ missing/invalid hreflang=\"en\" alternate link in $zh_file"
    echo "   expected href: $zh_expected_en_href"
    errors=$((errors + 1))
  fi

  if ! check_alternate_link "$zh_file" "x-default" "$expected_x_default"; then
    echo "❌ missing/invalid hreflang=\"x-default\" alternate link in $zh_file"
    echo "   expected href: $expected_x_default"
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

echo "[hreflang] passed: $checked EN/ZH blog pair(s) validated with absolute alternate URLs"