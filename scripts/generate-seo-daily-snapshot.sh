#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
REPORT_DIR="$ROOT_DIR/reports/seo/daily"
TODAY="${1:-$(TZ=Asia/Shanghai date +%F)}"
REPORT_FILE="$REPORT_DIR/$TODAY.md"

mkdir -p "$REPORT_DIR"

en_count=$(find "$ROOT_DIR/src/content/blog" -type f -name '*.md' | grep -c '/en/')
zh_count=$(find "$ROOT_DIR/src/content/blog" -type f -name '*.md' | grep -c '/zh/')
total_count=$((en_count + zh_count))
last_pub=$(find "$ROOT_DIR/src/content/blog" -type f -name '*.md' -printf '%TY-%Tm-%Td\n' | sort -r | head -n1)

cat > "$REPORT_FILE" <<EOF
# SEO Daily Snapshot — $TODAY

## Manual GSC Input
- Clicks:
- Impressions:
- CTR:
- Avg Position:

## Top 3 Queries (manual)
> Format: `query | clicks=12 | impressions=400 | ctr=3.00% | pos=8.4 | page=/en/blog/.../`
1.
2.
3.

## Top 3 Pages (manual)
1.
2.
3.

## Site Content Snapshot (auto)
- Total posts: $total_count
- EN posts: $en_count
- ZH posts: $zh_count
- Latest content date in repo: $last_pub

## Notes / Actions
- 
EOF

echo "Generated $REPORT_FILE"