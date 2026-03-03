#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

FILE="public/_redirects"

if [ ! -f "$FILE" ]; then
  echo "Redirect rules check failed: $FILE not found"
  exit 1
fi

required_rules=(
  "https://openhub.plzbite.top/* https://kuoo.uk/:splat 301!"
  "http://openhub.plzbite.top/* https://kuoo.uk/:splat 301!"
  "/blog /en/blog/ 301"
  "/blog/ /en/blog/ 301"
  "/blog/:slug.md /en/blog/:slug/ 301"
  "/blog/:slug.md/ /en/blog/:slug/ 301"
  "/blog/:slug /en/blog/:slug/ 301"
  "/blog/:slug/ /en/blog/:slug/ 301"
  "https://coding.kuoo.uk/* https://kuoo.uk/coding/:splat 200"
)

status=0

for rule in "${required_rules[@]}"; do
  if ! grep -Fqx "$rule" "$FILE"; then
    echo "Redirect rules check failed: missing rule -> $rule"
    status=1
  fi
done

if grep -E '^[^#[:space:]].* 302(!)?$' "$FILE" >/dev/null; then
  echo "Redirect rules check failed: found temporary redirect (302) in $FILE"
  status=1
fi

if [ "$status" -ne 0 ]; then
  exit 1
fi

echo "Redirect rules check passed ($FILE)"