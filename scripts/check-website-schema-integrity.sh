#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

if [[ ! -d dist/en || ! -d dist/zh ]]; then
  echo "[website-schema] dist/en or dist/zh not found. Run pnpm build first."
  exit 1
fi

if command -v rg >/dev/null 2>&1; then
  LIST_CMD="rg --files dist/en dist/zh -g '*.html'"
else
  LIST_CMD="grep -RIn --include='*.html' '@type' dist/en dist/zh | cut -d: -f1 | sort -u"
fi

failures=0

while IFS= read -r file; do
  [[ -z "$file" ]] && continue

  if ! grep -q '"@type":"WebSite"' "$file"; then
    echo "[website-schema] Missing WebSite JSON-LD: $file"
    failures=$((failures + 1))
    continue
  fi

  compact="$(tr -d '\n\r\t ' < "$file")"

  for required in '"name":' '"url":' '"inLanguage":' '"publisher":' '"logo":'; do
    if [[ "$compact" != *$required* ]]; then
      echo "[website-schema] Missing field ${required} in $file"
      failures=$((failures + 1))
      break
    fi
  done
done < <(eval "$LIST_CMD")

if [[ "$failures" -gt 0 ]]; then
  echo "[website-schema] Found $failures issue(s)."
  exit 1
fi

echo "[website-schema] PASS: WebSite JSON-LD fields (name/url/inLanguage/publisher/logo) present on all EN/ZH HTML pages."