#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

if [ ! -d dist/en ] || [ ! -d dist/zh ]; then
  echo "RSS autodiscovery check requires built output. Run 'pnpm build' first."
  exit 1
fi

check_lang() {
  local lang="$1"
  local expected_href="https://kuoo.uk/${lang}/daily/rss.xml"
  local expected_title

  if [ "$lang" = "en" ]; then
    expected_title="AI Tech Daily RSS"
  else
    expected_title="AI 科技日报 RSS"
  fi

  local count=0
  local failed=0

  while IFS= read -r -d '' f; do
    count=$((count + 1))

    if ! grep -Fq 'rel="alternate"' "$f"; then
      echo "RSS autodiscovery check failed: missing rel=alternate in $f"
      failed=1
      continue
    fi

    if ! grep -Fq 'type="application/rss+xml"' "$f"; then
      echo "RSS autodiscovery check failed: missing rss type in $f"
      failed=1
      continue
    fi

    if ! grep -Fq "href=\"$expected_href\"" "$f"; then
      echo "RSS autodiscovery check failed: missing expected href '$expected_href' in $f"
      failed=1
      continue
    fi

    if ! grep -Fq "title=\"$expected_title\"" "$f"; then
      echo "RSS autodiscovery check failed: missing expected title '$expected_title' in $f"
      failed=1
      continue
    fi
  done < <(find "dist/$lang" -type f -name '*.html' -print0)

  if [ "$count" -eq 0 ]; then
    echo "RSS autodiscovery check failed: no html files found under dist/$lang"
    return 1
  fi

  if [ "$failed" -ne 0 ]; then
    return 1
  fi

  echo "RSS autodiscovery check passed for $lang ($count pages)"
}

check_lang en
check_lang zh

echo "RSS autodiscovery check passed"
