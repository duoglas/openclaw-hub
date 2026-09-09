#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

fail() {
  echo "[daily-related-posts] FAIL: $*" >&2
  exit 1
}

latest_slug_for_lang() {
  local lang="$1"
  find "src/content/blog/${lang}" -maxdepth 1 -type f -name 'openclaw-daily-*.md' \
    | sed -E 's#^.*/(openclaw-daily-[0-9]{4}-[0-9]{2}-[0-9]{2})\.md$#\1#' \
    | sort \
    | tail -1
}

for lang in en zh; do
  slug="$(latest_slug_for_lang "$lang")"
  [[ -n "$slug" ]] || fail "no daily posts found for ${lang}"

  page="dist/${lang}/blog/${slug}/index.html"
  [[ -f "$page" ]] || fail "missing built latest daily page: ${page}"

  grep -Fq 'data-growth-surface="related-posts"' "$page" || fail "${lang} latest daily missing related posts surface"
  grep -Fq 'blog_related_posts_render' "$page" || fail "${lang} latest daily missing related posts render event"

  related_count="$(grep -o 'data-growth-link="related-post"' "$page" | wc -l | tr -d ' ')"
  [[ "$related_count" -ge 3 ]] || fail "${lang} latest daily has ${related_count} related links, expected at least 3"

  mapfile -t related_hrefs < <(
    grep -oE 'href="/[^"]+" data-growth-link="related-post"' "$page" \
      | sed -E 's/^href="([^"]+)".*$/\1/'
  )

  unique_related_count="$(printf '%s\n' "${related_hrefs[@]}" | sort -u | wc -l | tr -d ' ')"
  [[ "$unique_related_count" -eq "$related_count" ]] || \
    fail "${lang} latest daily has duplicate related-post hrefs (${related_count} links, ${unique_related_count} unique)"

  for href in "${related_hrefs[@]}"; do
    [[ "$href" == "/${lang}/blog/"* ]] || \
      fail "${lang} related-post href is not a same-language blog route: ${href}"
  done

  if grep -oE '<a href="/[^"]+" data-growth-link="related-post"' "$page" | grep -Fq "/${lang}/blog/${slug}/"; then
    fail "${lang} related posts anchors link to itself: ${slug}"
  fi

  echo "[daily-related-posts] PASS ${lang}: latest=${slug} has ${related_count} related links and render event"
done

echo "[daily-related-posts] PASS: latest daily related posts are rendered and measurable."
