#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

status=0

is_valid_date() {
  local d="$1"
  if [[ ! "$d" =~ ^[0-9]{4}-[0-9]{2}-[0-9]{2}$ ]]; then
    return 1
  fi
  date -d "$d" +%F >/dev/null 2>&1
}

while IFS= read -r f; do
  pub=$(awk -F': *' '/^pubDate:/{print $2; exit}' "$f" | tr -d '"')
  upd=$(awk -F': *' '/^updatedDate:/{print $2; exit}' "$f" | tr -d '"')

  if [ -z "${pub:-}" ]; then
    echo "Frontmatter date check failed: missing pubDate in $f"
    status=1
    continue
  fi

  if ! is_valid_date "$pub"; then
    echo "Frontmatter date check failed: invalid pubDate '$pub' in $f"
    status=1
    continue
  fi

  if [ -n "${upd:-}" ]; then
    if ! is_valid_date "$upd"; then
      echo "Frontmatter date check failed: invalid updatedDate '$upd' in $f"
      status=1
      continue
    fi

    if [[ "$upd" < "$pub" ]]; then
      echo "Frontmatter date check failed: updatedDate '$upd' is earlier than pubDate '$pub' in $f"
      status=1
      continue
    fi
  fi
done < <(find src/content/blog -type f -name '*.md' | sort)

if [ "$status" -ne 0 ]; then
  exit 1
fi

echo "Frontmatter date check passed"