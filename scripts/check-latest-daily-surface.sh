#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

fail() {
  echo "[latest-daily-surface] FAIL: $*" >&2
  exit 1
}

latest_slug_for_lang() {
  local lang="$1"
  find "src/content/blog/${lang}" -maxdepth 1 -type f -name 'openclaw-daily-*.md' \
    | sed -E 's#^.*/(openclaw-daily-[0-9]{4}-[0-9]{2}-[0-9]{2})\.md$#\1#' \
    | sort \
    | tail -1
}

check_file_contains() {
  local file="$1"
  local needle="$2"
  local label="$3"
  [[ -f "$file" ]] || fail "missing ${label}: ${file}"
  grep -Fq "$needle" "$file" || fail "${label} does not contain ${needle}"
}

for lang in en zh; do
  slug="$(latest_slug_for_lang "$lang")"
  [[ -n "$slug" ]] || fail "no daily posts found for ${lang}"
  url="/${lang}/blog/${slug}/"

  check_file_contains "dist/${lang}/index.html" "$url" "${lang} homepage latest daily spotlight"
  check_file_contains "dist/${lang}/index.html" "home_latest_daily_click" "${lang} homepage latest daily event"
  check_file_contains "dist/${lang}/daily/index.html" "$url" "${lang} daily index latest hero"
  check_file_contains "dist/${lang}/daily/index.html" "daily_index_click" "${lang} daily index event"
  check_file_contains "dist/${lang}/daily/rss.xml" "$url" "${lang} daily RSS"
  check_file_contains "dist/sitemap-0.xml" "$url" "sitemap latest daily URL"

  first_rss_daily="$(grep -oE "/${lang}/blog/openclaw-daily-[0-9]{4}-[0-9]{2}-[0-9]{2}/" "dist/${lang}/daily/rss.xml" | head -1 || true)"
  [[ "$first_rss_daily" == "$url" ]] || fail "${lang} RSS first daily item is ${first_rss_daily:-missing}, expected ${url}"

  echo "[latest-daily-surface] PASS ${lang}: latest=${slug} surfaces on homepage, daily index, RSS, and sitemap"
done

echo "[latest-daily-surface] PASS: latest daily discovery surfaces are aligned."
