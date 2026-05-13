#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

if [ ! -d dist/en/daily ] || [ ! -d dist/zh/daily ]; then
  echo "[daily-index-growth] built daily index pages missing. Run pnpm build first."
  exit 1
fi

check_lang() {
  local lang="$1"
  local file="dist/${lang}/daily/index.html"
  local latest=""

  latest="$(find "src/content/blog/${lang}" -maxdepth 1 -type f -name 'openclaw-daily-*.md' -printf '%f\n' | sort | tail -1 | sed 's/\.md$//')"

  if [ -z "$latest" ]; then
    echo "[daily-index-growth] no daily source files found for ${lang}"
    return 1
  fi

  if [ ! -f "$file" ]; then
    echo "[daily-index-growth] missing ${file}"
    return 1
  fi

  if ! grep -Fq "daily_index_latest_render" "$file"; then
    echo "[daily-index-growth] missing render event on ${file}"
    return 1
  fi

  if ! grep -Fq "daily_index_click" "$file"; then
    echo "[daily-index-growth] missing click event on ${file}"
    return 1
  fi

  if ! grep -Fq "data-daily-index-growth=\"latest\"" "$file"; then
    echo "[daily-index-growth] missing latest CTA marker on ${file}"
    return 1
  fi

  if ! grep -Fq "data-daily-index-growth=\"rss\"" "$file"; then
    echo "[daily-index-growth] missing RSS CTA marker on ${file}"
    return 1
  fi

  if ! grep -Fq "\"@type\":\"ItemList\"" "$file"; then
    echo "[daily-index-growth] missing ItemList JSON-LD on ${file}"
    return 1
  fi

  if ! grep -Fq "/${lang}/blog/${latest}/" "$file"; then
    echo "[daily-index-growth] latest source ${latest} is not linked from ${file}"
    return 1
  fi

  echo "[daily-index-growth] PASS ${lang}: latest=${latest}"
}

check_lang en
check_lang zh

echo "[daily-index-growth] PASS: daily index latest CTA, RSS CTA, events, and ItemList schema validated."
