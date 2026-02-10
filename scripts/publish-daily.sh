#!/bin/bash
set -e

cd "$(dirname "$0")/.."
DATE=$(date +%Y-%m-%d)
SLUG="openclaw-daily-${DATE}"
FILE="src/content/blog/${SLUG}.md"

if [ -f "$FILE" ]; then
  echo "Already published today: $FILE"
  exit 0
fi

cat > "$FILE" <<EOF
---
title: "OpenClaw Daily: Practical Agent Automation Tips (${DATE})"
description: "Daily practical tips for running OpenClaw agents, channels, and model fallbacks efficiently."
pubDate: ${DATE}
tags: ["openclaw", "daily", "automation"]
category: "guide"
---

## Today's OpenClaw Focus

### 1) Keep channel reliability high
- Verify channel status with `openclaw status --deep`.

### 2) Use model fallbacks by provider
- Avoid same-provider consecutive fallbacks during rate limits.

### 3) Keep context healthy
- Prefer short-turn prompts and periodic compaction.

### 4) Security quick check
- Run `openclaw security audit --deep` weekly.

---

More guides at OpenClaw Hub.
EOF

npx astro build >/dev/null 2>&1

git add "$FILE"
git commit -m "content: add daily post ${DATE}"
git push origin main

echo "Published ${FILE}"
