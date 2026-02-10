#!/bin/bash
set -e

cd "$(dirname "$0")/.."
DATE=$(date +%Y-%m-%d)
SLUG="openclaw-daily-${DATE}"
EN_FILE="src/content/blog/en/${SLUG}.md"
ZH_FILE="src/content/blog/zh/${SLUG}.md"

if [ -f "$EN_FILE" ] && [ -f "$ZH_FILE" ]; then
  echo "Already published today: $SLUG"
  exit 0
fi

if [ ! -f "$EN_FILE" ]; then
cat > "$EN_FILE" <<EOF
---
title: "OpenClaw Daily: Practical Agent Automation Tips (${DATE})"
description: "Daily practical tips for running OpenClaw agents, channels, and model fallbacks efficiently."
pubDate: ${DATE}
tags: ["openclaw", "daily", "automation"]
category: "guide"
lang: "en"
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
fi

if [ ! -f "$ZH_FILE" ]; then
cat > "$ZH_FILE" <<EOF
---
title: "OpenClaw 日报：实用自动化技巧（${DATE}）"
description: "每天一条可落地的 OpenClaw 运行建议：渠道、模型回退、上下文和安全巡检。"
pubDate: ${DATE}
tags: ["openclaw", "daily", "automation"]
category: "guide"
lang: "zh"
---

## 今日关注点

### 1）先保渠道稳定
- 每天看一次渠道健康状态。

### 2）回退链按供应商交错
- 避免连续同供应商，减少限流连锁。

### 3）控制上下文膨胀
- 短提示词 + 定期压缩。

### 4）做一轮安全快检
- 每周至少一次深度审计。

---

更多内容见 OpenClaw Hub。
EOF
fi

npx astro build >/dev/null 2>&1

git add "$EN_FILE" "$ZH_FILE"
git commit -m "content: add daily bilingual posts ${DATE}" || true
git push origin main

echo "Published ${SLUG} (en+zh)"
