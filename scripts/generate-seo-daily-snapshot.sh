#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
REPORT_DIR="$ROOT_DIR/reports/seo/daily"
TODAY="${1:-$(TZ=Asia/Shanghai date +%F)}"
REPORT_FILE="$REPORT_DIR/$TODAY.md"

mkdir -p "$REPORT_DIR"

collect_schema_risk_auto() {
  local status="pending-build"
  local issues="N/A"
  local source="pending-build"

  if [ -d "$ROOT_DIR/dist/en" ] && [ -d "$ROOT_DIR/dist/zh" ]; then
    source="website-schema-gate"
    local check_output

    if check_output=$(bash "$ROOT_DIR/scripts/check-website-schema-integrity.sh" 2>&1); then
      status="pass"
      issues="0"
    else
      status="fail"
      issues=$(printf "%s\n" "$check_output" | sed -n 's/.*Found \([0-9][0-9]*\) issue(s).*/\1/p' | tail -n1)
      [ -n "$issues" ] || issues="unknown"
    fi
  fi

  printf "%s|||%s|||%s" "$status" "$issues" "$source"
}

en_count=$(find "$ROOT_DIR/src/content/blog" -type f -name '*.md' | grep -c '/en/')
zh_count=$(find "$ROOT_DIR/src/content/blog" -type f -name '*.md' | grep -c '/zh/')
total_count=$((en_count + zh_count))
last_pub=$(find "$ROOT_DIR/src/content/blog" -type f -name '*.md' -printf '%TY-%Tm-%Td\n' | sort -r | head -n1)

SCHEMA_RAW=$(collect_schema_risk_auto)
SCHEMA_STATUS=${SCHEMA_RAW%%|||*}
SCHEMA_RAW=${SCHEMA_RAW#*|||}
SCHEMA_ISSUES=${SCHEMA_RAW%%|||*}
SCHEMA_SOURCE=${SCHEMA_RAW##*|||}

cat > "$REPORT_FILE" <<EOF
# SEO Daily Snapshot — $TODAY

## Manual GSC Input
- Clicks:
- Impressions:
- CTR:
- Avg Position:
- Schema Risk Status: $SCHEMA_STATUS
- Schema Risk Issues: $SCHEMA_ISSUES
- Schema Risk Source: $SCHEMA_SOURCE

## Top 3 Queries (manual)
> Format: \`query | clicks=12 | impressions=400 | ctr=3.00% | pos=8.4 | page=/en/blog/.../\`
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