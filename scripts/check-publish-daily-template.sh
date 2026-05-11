#!/bin/bash
set -euo pipefail

cd "$(dirname "$0")/.."
SCRIPT="scripts/publish-daily.sh"

fail() {
  echo "Publish daily template gate failed: $1" >&2
  exit 1
}

[[ -f "$SCRIPT" ]] || fail "missing $SCRIPT"

grep -q 'EN_BODY=' "$SCRIPT" || fail "missing EN_BODY generator"
grep -q 'ZH_BODY=' "$SCRIPT" || fail "missing ZH_BODY generator"
grep -q 'pnpm check:latest-daily-en-language' "$SCRIPT" || fail "missing EN language preflight"
grep -q 'pnpm check:daily-template' "$SCRIPT" || fail "missing daily template preflight"
grep -q 'pnpm check:rolling-daily-body' "$SCRIPT" || fail "missing rolling body preflight"
grep -q 'pnpm check:build-duplicate-id-warning' "$SCRIPT" || fail "missing strict build warning preflight"

if awk '/cat > "\$EN_FILE" <<EOF/{in_en=1; next} in_en && /^EOF$/{in_en=0} in_en {print}' "$SCRIPT" | grep -q '\${SUMMARY}'; then
  fail "EN output still publishes raw cron SUMMARY"
fi

awk '/cat > "\$EN_FILE" <<EOF/{in_en=1; next} in_en && /^EOF$/{in_en=0} in_en {print}' "$SCRIPT" | grep -q '\${EN_BODY}' \
  || fail "EN output does not use generated EN_BODY"
awk '/cat > "\$ZH_FILE" <<EOF/{in_zh=1; next} in_zh && /^EOF$/{in_zh=0} in_zh {print}' "$SCRIPT" | grep -q '\${ZH_BODY}' \
  || fail "ZH output does not use generated ZH_BODY"

grep -q 'Most important signal' "$SCRIPT" || fail "EN takeaways labels missing"
grep -q '最值得关注' "$SCRIPT" || fail "ZH conclusion labels missing"

echo "Publish daily template gate passed"
