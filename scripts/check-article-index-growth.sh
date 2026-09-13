#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

declare -A expected_categories=(
  [guide]=1
  [comparison]=1
  [tutorial]=1
  [news]=1
  [review]=1
  [analysis]=1
)

check_lang() {
  local lang="$1"
  local file="dist/${lang}/blog/index.html"

  if [ ! -s "$file" ]; then
    echo "[article-index-growth] missing built index: ${file}. Run pnpm build first."
    return 1
  fi

  local cards
  cards="$(grep -o 'data-growth-link="article-index-card"' "$file" | wc -l | tr -d ' ')"
  local dates
  dates="$(grep -o '<time datetime="[^"]*"' "$file" | wc -l | tr -d ' ')"
  local categories
  categories="$(grep -o 'data-growth-category="[^"]*"' "$file" | wc -l | tr -d ' ')"
  local card_hrefs
  card_hrefs="$(grep -o 'href="/[^\"]*"[^>]*data-growth-link="article-index-card"' "$file" | sed -E 's/^href="([^"]*)".*/\1/' || true)"
  local href_count
  href_count="$(printf '%s\n' "$card_hrefs" | sed '/^$/d' | wc -l | tr -d ' ')"

  if [ "$cards" -lt 1 ] || [ "$dates" -ne "$cards" ] || [ "$categories" -ne "$cards" ]; then
    echo "[article-index-growth] ${lang}: cards=${cards}, dates=${dates}, categories=${categories}; expected one date/category per card"
    return 1
  fi

  if [ "$href_count" -ne "$cards" ]; then
    echo "[article-index-growth] ${lang}: card href count=${href_count}, cards=${cards}; expected one internal href per card"
    return 1
  fi

  local duplicate_hrefs
  duplicate_hrefs="$(printf '%s\n' "$card_hrefs" | sed '/^$/d' | sort | uniq -d || true)"
  if [ -n "$duplicate_hrefs" ]; then
    echo "[article-index-growth] ${lang}: duplicate article-index-card hrefs: ${duplicate_hrefs//$'\n'/, }"
    return 1
  fi

  if printf '%s\n' "$card_hrefs" | sed '/^$/d' | grep -Ev '^/'"$lang"'/blog/[^/]+/$' >/dev/null; then
    echo "[article-index-growth] ${lang}: article-index-card href escaped the ${lang}/blog route"
    return 1
  fi

  for category in "${!expected_categories[@]}"; do
    if ! grep -Fq "data-growth-category=\"${category}\"" "$file"; then
      echo "[article-index-growth] ${lang}: no rendered card for category=${category}"
      return 1
    fi
  done

  if grep -Eq 'data-growth-category="(daily|weekly)"' "$file" || grep -Eq 'href="/'"$lang"'/blog/openclaw-(daily|weekly)-' "$file"; then
    echo "[article-index-growth] ${lang}: daily/weekly content leaked into article index"
    return 1
  fi

  echo "[article-index-growth] PASS ${lang}: ${cards} unique same-language cards with machine-readable date/category metadata"
}

check_lang en
check_lang zh
echo "[article-index-growth] PASS: bilingual article index metadata and exclusion guard validated."
