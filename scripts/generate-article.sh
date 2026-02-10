#!/bin/bash
# OpenClaw Hub - Automated article generator
# Usage: ./generate-article.sh "keyword" "category"
# Categories: guide, comparison, tutorial, news, review

KEYWORD="$1"
CATEGORY="${2:-guide}"
DATE=$(date +%Y-%m-%d)
SLUG=$(echo "$KEYWORD" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/-/g' | sed 's/--*/-/g' | sed 's/^-//' | sed 's/-$//')
FILE="src/content/blog/${SLUG}.md"

if [ -f "$FILE" ]; then
  echo "Article already exists: $FILE"
  exit 0
fi

echo "Generating: $KEYWORD → $FILE"
echo "Category: $CATEGORY"
echo "Date: $DATE"

# This will be called by OpenClaw cron to generate content
# The actual AI generation happens via the cron job's agentTurn
cat > "$FILE" << FRONTMATTER
---
title: "${KEYWORD}"
description: "PLACEHOLDER"
pubDate: ${DATE}
tags: ["openclaw", "${CATEGORY}"]
category: "${CATEGORY}"
---

PLACEHOLDER_CONTENT
FRONTMATTER

echo "Created: $FILE (needs AI content fill)"
