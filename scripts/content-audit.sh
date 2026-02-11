#!/usr/bin/env bash
# content-audit.sh — Blog content quality audit
# Usage: ./scripts/content-audit.sh
# Exit code: 0 = clean, 1 = issues found

set -euo pipefail

CONTENT_DIR="src/content/blog"
ERRORS=0
WARNINGS=0

# cd to project root
cd "$(dirname "$0")/.."

echo "═══════════════════════════════════════════"
echo "  OpenClaw Hub — Content Audit Report"
echo "  $(date '+%Y-%m-%d %H:%M:%S')"
echo "═══════════════════════════════════════════"
echo ""

# ── 1. Frontmatter completeness ──
echo "📋 Frontmatter Check"
echo "────────────────────"
REQUIRED_FIELDS="title description pubDate tags lang"

for f in "$CONTENT_DIR"/{en,zh}/*.md; do
  [ -f "$f" ] || continue
  FM=$(sed -n '/^---$/,/^---$/p' "$f" | head -n -1 | tail -n +2)

  for field in $REQUIRED_FIELDS; do
    if ! echo "$FM" | grep -qE "^${field}:"; then
      echo "  ❌ Missing '$field' in $f"
      ERRORS=$((ERRORS + 1))
    fi
  done
done
echo "  Done."
echo ""

# ── 2. Article length check ──
echo "📏 Article Length Check"
echo "──────────────────────"

for f in "$CONTENT_DIR"/{en,zh}/*.md; do
  [ -f "$f" ] || continue

  # Get content after second ---
  BODY=$(sed '1,/^---$/d; 1,/^---$/d' "$f")

  if echo "$f" | grep -q "/zh/"; then
    # Chinese: count characters (excluding whitespace/punctuation roughly)
    CHARS=$(echo "$BODY" | tr -d '[:space:]' | wc -m)
    if [ "$CHARS" -lt 500 ]; then
      echo "  ⚠️  $f — only ${CHARS} chars (min 500 for zh)"
      WARNINGS=$((WARNINGS + 1))
    fi
  else
    # English: count words
    WORDS=$(echo "$BODY" | wc -w)
    if [ "$WORDS" -lt 400 ]; then
      echo "  ⚠️  $f — only ${WORDS} words (min 400 for en)"
      WARNINGS=$((WARNINGS + 1))
    fi
  fi
done
echo "  Done."
echo ""

# ── 3. Translation pairing ──
echo "🌐 Translation Pairing"
echo "──────────────────────"

for f in "$CONTENT_DIR"/en/*.md; do
  [ -f "$f" ] || continue
  BASENAME=$(basename "$f")
  ZH_FILE="$CONTENT_DIR/zh/$BASENAME"
  if [ ! -f "$ZH_FILE" ]; then
    echo "  ❌ Missing zh translation: $ZH_FILE"
    ERRORS=$((ERRORS + 1))
  fi
done

for f in "$CONTENT_DIR"/zh/*.md; do
  [ -f "$f" ] || continue
  BASENAME=$(basename "$f")
  EN_FILE="$CONTENT_DIR/en/$BASENAME"
  if [ ! -f "$EN_FILE" ]; then
    echo "  ❌ Missing en translation: $EN_FILE"
    ERRORS=$((ERRORS + 1))
  fi
done
echo "  Done."
echo ""

# ── 4. Publish date sanity ──
echo "📅 Publish Date Check"
echo "─────────────────────"

TODAY=$(date '+%Y-%m-%d')

for f in "$CONTENT_DIR"/{en,zh}/*.md; do
  [ -f "$f" ] || continue
  PUB_DATE=$(sed -n '/^---$/,/^---$/p' "$f" | grep -E "^pubDate:" | head -1 | sed 's/pubDate:\s*//' | tr -d '"' | tr -d "'" | xargs)

  if [ -z "$PUB_DATE" ]; then
    continue  # already caught by frontmatter check
  fi

  # Check if date is far in the future (> 7 days)
  if command -v date >/dev/null 2>&1; then
    PUB_EPOCH=$(date -d "$PUB_DATE" '+%s' 2>/dev/null || echo 0)
    FUTURE_EPOCH=$(date -d "$TODAY + 7 days" '+%s' 2>/dev/null || echo 0)
    PAST_EPOCH=$(date -d "2024-01-01" '+%s' 2>/dev/null || echo 0)

    if [ "$PUB_EPOCH" -gt "$FUTURE_EPOCH" ] 2>/dev/null; then
      echo "  ⚠️  $f — pubDate $PUB_DATE is more than 7 days in the future"
      WARNINGS=$((WARNINGS + 1))
    fi
    if [ "$PUB_EPOCH" -lt "$PAST_EPOCH" ] 2>/dev/null; then
      echo "  ⚠️  $f — pubDate $PUB_DATE seems unreasonably old"
      WARNINGS=$((WARNINGS + 1))
    fi
  fi
done
echo "  Done."
echo ""

# ── Summary ──
echo "═══════════════════════════════════════════"
echo "  Summary: ${ERRORS} errors, ${WARNINGS} warnings"
echo "═══════════════════════════════════════════"

if [ "$ERRORS" -gt 0 ]; then
  exit 1
fi
exit 0
