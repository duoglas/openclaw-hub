#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

extract_heading_date() {
  local file="$1"
  awk '
    /AI & Tech Daily Brief|《AI、科技日报》/ { seen=1 }
    seen {
      if (match($0, /[0-9]{4}-[0-9]{2}-[0-9]{2}/)) {
        print substr($0, RSTART, RLENGTH)
        exit
      }
    }
  ' "$file"
}

# Guard the multiline formats emitted by both EN and ZH generators.
for sample in \
  $'AI & Tech Daily Brief\n2026-08-27 Morning Brief' \
  $'《AI、科技日报》\n2026-08-27 早报' \
  $'《AI、科技日报》｜2026-08-27'; do
  detected=$(printf '%s\n' "$sample" | awk '/AI & Tech Daily Brief|《AI、科技日报》/ { seen=1 } seen && match($0, /[0-9]{4}-[0-9]{2}-[0-9]{2}/) { print substr($0, RSTART, RLENGTH); exit }')
  if [ "$detected" != "2026-08-27" ]; then
    echo "Daily heading date synthetic self-test failed"
    exit 1
  fi
done

status=0

while IFS= read -r f; do
  pub_date=$(awk -F': *' '/^pubDate:/{print $2; exit}' "$f" | tr -d '"')
  file_date=$(basename "$f" | sed -E 's/^openclaw-daily-([0-9]{4}-[0-9]{2}-[0-9]{2})\.md$/\1/')
  heading_date=$(extract_heading_date "$f")

  if [ -z "${pub_date:-}" ] || [ "$pub_date" != "$file_date" ]; then
    echo "Daily file/frontmatter date check failed: $f"
    echo "  filename: $file_date"
    echo "  pubDate:  ${pub_date:-missing}"
    status=1
  fi

  if [ -n "${heading_date:-}" ] && [ "$pub_date" != "$heading_date" ]; then
    echo "Daily heading date check failed: $f"
    echo "  pubDate:  $pub_date"
    echo "  heading:  $heading_date"
    status=1
  fi
done < <(find src/content/blog -type f -name 'openclaw-daily-*.md' | sort | tail -n 28)

if [ "$status" -ne 0 ]; then
  exit 1
fi

echo "Daily heading date check passed"
