#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

status=0

while IFS= read -r f; do
  pub_date=$(awk -F': *' '/^pubDate:/{print $2; exit}' "$f" | tr -d '"')
  heading_date=$(grep -oE '《AI、科技日报》｜[0-9]{4}-[0-9]{2}-[0-9]{2}' "$f" | head -n1 | sed 's/.*｜//' || true)

  if [ -z "${pub_date:-}" ] || [ -z "${heading_date:-}" ]; then
    continue
  fi

  if [ "$pub_date" != "$heading_date" ]; then
    echo "Daily heading date check failed: $f"
    echo "  pubDate:  $pub_date"
    echo "  heading:  $heading_date"
    status=1
  fi
done < <(find src/content/blog -type f -name 'openclaw-daily-*.md' | sort)

if [ "$status" -ne 0 ]; then
  exit 1
fi

echo "Daily heading date check passed"
