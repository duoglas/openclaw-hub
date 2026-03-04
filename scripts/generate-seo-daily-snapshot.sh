#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
REPORT_DIR="$ROOT_DIR/reports/seo/daily"
TODAY="${1:-$(TZ=Asia/Shanghai date +%F)}"
REPORT_FILE="$REPORT_DIR/$TODAY.md"

mkdir -p "$REPORT_DIR"

read_existing_field() {
  local label="$1"
  if [ ! -f "$REPORT_FILE" ]; then
    echo ""
    return
  fi

  awk -F': *' -v key="$label" '$0 ~ "^- "key":" {print substr($0, index($0,":")+2); exit}' "$REPORT_FILE" | tr -d '\r'
}

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

calculate_gsc_completeness() {
  local clicks="$1"
  local impressions="$2"
  local ctr="$3"
  local position="$4"
  local filled=0
  local missing=()

  if [ -n "${clicks// /}" ]; then
    filled=$((filled + 1))
  else
    missing+=("Clicks")
  fi

  if [ -n "${impressions// /}" ]; then
    filled=$((filled + 1))
  else
    missing+=("Impressions")
  fi

  if [ -n "${ctr// /}" ]; then
    filled=$((filled + 1))
  else
    missing+=("CTR")
  fi

  if [ -n "${position// /}" ]; then
    filled=$((filled + 1))
  else
    missing+=("Avg Position")
  fi

  local status
  if [ "$filled" -eq 4 ]; then
    status="complete"
  elif [ "$filled" -eq 0 ]; then
    status="missing"
  else
    status="partial"
  fi

  local missing_str="None"
  if [ ${#missing[@]} -gt 0 ]; then
    missing_str=$(IFS=', '; echo "${missing[*]}")
  fi

  printf "%s|||%s|||%s" "$filled" "$status" "$missing_str"
}

schema_readiness_hint() {
  local status="$1"
  local source="$2"

  if [ "$source" != "website-schema-gate" ]; then
    echo "blocked (run pnpm build first)"
    return
  fi

  if [ "$status" = "pass" ] || [ "$status" = "fail" ]; then
    echo "ready"
  else
    echo "pending"
  fi
}

en_count=$(find "$ROOT_DIR/src/content/blog" -type f -name '*.md' | grep -c '/en/')
zh_count=$(find "$ROOT_DIR/src/content/blog" -type f -name '*.md' | grep -c '/zh/')
total_count=$((en_count + zh_count))
last_pub=$(find "$ROOT_DIR/src/content/blog" -type f -name '*.md' -printf '%TY-%Tm-%Td\n' | sort -r | head -n1)

existing_clicks=$(read_existing_field "Clicks")
existing_impressions=$(read_existing_field "Impressions")
existing_ctr=$(read_existing_field "CTR")
existing_position=$(read_existing_field "Avg Position")

SCHEMA_RAW=$(collect_schema_risk_auto)
SCHEMA_STATUS=${SCHEMA_RAW%%|||*}
SCHEMA_RAW=${SCHEMA_RAW#*|||}
SCHEMA_ISSUES=${SCHEMA_RAW%%|||*}
SCHEMA_SOURCE=${SCHEMA_RAW##*|||}

GSC_RAW=$(calculate_gsc_completeness "$existing_clicks" "$existing_impressions" "$existing_ctr" "$existing_position")
GSC_FILLED=${GSC_RAW%%|||*}
GSC_RAW=${GSC_RAW#*|||}
GSC_STATUS=${GSC_RAW%%|||*}
GSC_MISSING_FIELDS=${GSC_RAW##*|||}

SCHEMA_READINESS=$(schema_readiness_hint "$SCHEMA_STATUS" "$SCHEMA_SOURCE")
WEEKLY_INPUT_QUALITY="WARN"
if [ "$GSC_STATUS" = "complete" ] && [ "$SCHEMA_READINESS" = "ready" ]; then
  WEEKLY_INPUT_QUALITY="PASS"
fi

cat > "$REPORT_FILE" <<EOF2
# SEO Daily Snapshot — $TODAY

## Manual GSC Input
- Clicks: $existing_clicks
- Impressions: $existing_impressions
- CTR: $existing_ctr
- Avg Position: $existing_position
- Schema Risk Status: $SCHEMA_STATUS
- Schema Risk Issues: $SCHEMA_ISSUES
- Schema Risk Source: $SCHEMA_SOURCE

## Snapshot Data Completeness (auto)
- GSC Required Fields Filled: ${GSC_FILLED}/4 ($GSC_STATUS)
- Missing GSC Fields: $GSC_MISSING_FIELDS
- Schema Data Readiness: $SCHEMA_READINESS
- Weekly Input Quality Flag: $WEEKLY_INPUT_QUALITY

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
EOF2

echo "Generated $REPORT_FILE"
