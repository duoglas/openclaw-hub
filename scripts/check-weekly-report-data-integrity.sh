#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

REPORT="${WEEKLY_REPORT_FILE:-}"
if [ -z "$REPORT" ]; then
  REPORT=$(find reports/seo-weekly -maxdepth 1 -type f -name 'seo-weekly-*.md' -print | sort | tail -n 1)
fi

if [ -z "$REPORT" ] || [ ! -f "$REPORT" ]; then
  echo "Weekly report data-integrity check failed: no SEO weekly report found"
  exit 1
fi

validate_report() {
  local file="$1"
  local has_placeholder has_backfill has_false_claim has_execute_action
  has_placeholder=$(grep -Ec '^\|[[:space:]]*-[[:space:]]*\|[[:space:]]*0[[:space:]]*\|' "$file" || true)
  has_backfill=$(grep -Ec '7-day GSC query backfill|7 天 GSC query 回填' "$file" || true)
  has_false_claim=$(grep -Ec 'Several low-CTR opportunities are still|Low-CTR opportunities are in the detected queue' "$file" || true)
  has_execute_action=$(grep -Ec 'Execute title/meta rewrites for top 3 items' "$file" || true)

  if [ "$has_placeholder" -gt 0 ] && { [ "$has_backfill" -eq 0 ] || [ "$has_false_claim" -gt 0 ] || [ "$has_execute_action" -gt 0 ]; }; then
    echo "Weekly report data-integrity check failed: placeholder GSC rows must produce backfill-only guidance ($file)"
    return 1
  fi
}

validate_report "$REPORT"

# Synthetic self-test: a placeholder-only report must fail closed, while a real-data report may recommend rewrites.
tmp_dir=$(mktemp -d)
trap 'rm -rf "$tmp_dir"' EXIT
cat > "$tmp_dir/placeholder.md" <<'EOF'
| Query | Impressions | CTR |
| - | 0 | 0.00% |
- No computable low-CTR query opportunities are available; complete the 7-day GSC query backfill before making title/meta rewrite decisions.
EOF
cat > "$tmp_dir/real-data.md" <<'EOF'
| Query | Impressions | CTR |
| agent workflow | 120 | 1.20% |
- Low-CTR opportunities are in the detected queue; execute title/meta rewrites after validating the top-ranked rows.
- [ ] P1: Execute title/meta rewrites for top 3 items from Section 6 and publish EN/ZH updates
EOF
validate_report "$tmp_dir/placeholder.md"
if validate_report "$tmp_dir/real-data.md"; then
  echo "Weekly report data-integrity synthetic self-test passed"
else
  echo "Weekly report data-integrity synthetic self-test failed: real-data guidance was rejected"
  exit 1
fi

echo "Weekly report data-integrity check passed: $REPORT"
