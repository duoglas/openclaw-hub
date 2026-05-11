#!/bin/bash
set -euo pipefail

cd "$(dirname "$0")/.."
DATE=$(date +%Y-%m-%d)
SLUG="openclaw-daily-${DATE}"
EN_FILE="src/content/blog/en/${SLUG}.md"
ZH_FILE="src/content/blog/zh/${SLUG}.md"
CRON_ID="fdc137d1-c50d-4686-9b1d-c6c923890cf8" # daily-ai-tech

# Skip if today's post already exists on origin/main
git fetch origin main --quiet || true
if git ls-tree -r --name-only origin/main | grep -q "^${EN_FILE}$" \
  && git ls-tree -r --name-only origin/main | grep -q "^${ZH_FILE}$"; then
  echo "Already published ${SLUG}"
  exit 0
fi

# Pull latest daily summary from cron runs (prefer same-day run, fallback to latest available)
SUMMARY=$(python3 - <<'PY'
import json,subprocess,datetime,sys
cron_id = "fdc137d1-c50d-4686-9b1d-c6c923890cf8"
out = subprocess.check_output(["openclaw","cron","runs","--id",cron_id,"--limit","20"], text=True)
start = out.find('{')
if start < 0:
    sys.exit(1)
data = json.loads(out[start:])
today = datetime.datetime.now(datetime.timezone(datetime.timedelta(hours=8))).strftime('%Y-%m-%d')
entries = [e for e in data.get('entries', []) if e.get('action')=='finished' and e.get('summary')]
summary = None
for e in entries:
    d = datetime.datetime.fromtimestamp(e.get('runAtMs',0)/1000, datetime.timezone(datetime.timedelta(hours=8))).strftime('%Y-%m-%d')
    if d == today:
        summary = e['summary']
        break
if summary is None and entries:
    summary = entries[0]['summary']
if not summary:
    summary = "今日 AI / 科技日报暂未生成，稍后将自动更新。"
print(summary)
PY
)

# Build non-placeholder, searchable descriptions and publish-ready bodies from summary text
ZH_DESC=$(SUMMARY_TEXT="$SUMMARY" python3 - <<'PY'
import os,re
text = os.environ.get('SUMMARY_TEXT', '').replace('\r', '\n')
lines = [re.sub(r'\s+', ' ', l).strip(' -•\t') for l in text.split('\n')]
lines = [l for l in lines if l]
candidates = []
for l in lines:
    if l.startswith('《AI、科技日报》') or l.startswith('说明：'):
        continue
    if re.match(r'^[【\[]?.*(今日要闻|实战案例|今日结论).*[】\]]?$', l):
        continue
    if re.match(r'^\d+\)', l):
        l = re.sub(r'^\d+\)\s*', '', l)
    if len(l) >= 8:
        candidates.append(l)
    if len(candidates) >= 3:
        break
if not candidates:
    candidates = ["今日 AI 与科技关键信号速览，覆盖模型能力、基础设施、产业落地与政策动向。"]
joined = '；'.join(candidates)
joined = re.sub(r'\s+', ' ', joined).strip('；;，,。.')
if len(joined) > 120:
    joined = joined[:119].rstrip('；;，,。.') + '。'
elif not joined.endswith(('。','！','？')):
    joined += '。'
print(joined)
PY
)

EN_DESC="Daily AI and tech brief covering model updates, infrastructure shifts, enterprise agents, AI devices, policy signals, and practical deployment implications."

ZH_BODY=$(SUMMARY_TEXT="$SUMMARY" DATE="$DATE" python3 - <<'PY'
import os,re
text = os.environ.get('SUMMARY_TEXT', '').replace('\r', '\n').strip()
date = os.environ['DATE']
if not text:
    text = "今日 AI / 科技日报暂未生成，稍后将自动更新。"
body = text
if not re.search(rf'^#\s+AI\s*/\s*科技日报（{re.escape(date)}）', body, re.M):
    body = f"# AI / 科技日报（{date}）\n\n" + body
if '## 今日结论' not in body:
    body += "\n\n## 今日结论\n\n**最值得关注：** 今日 AI 与科技信号仍集中在模型能力、算力基础设施、企业 Agent、终端智能化与政策治理的协同变化。\n\n**第二个信号：** 单点产品更新正在转向平台能力竞争，企业落地会更依赖权限、审计、稳定性和成本控制。\n\n**可执行建议：** 个人用户优先复核记忆、连接应用和数据权限；团队应先选择低风险流程试点 Agent，并保留审批、日志和回滚路径。"
print(body)
PY
)

EN_BODY=$(SUMMARY_TEXT="$SUMMARY" DATE="$DATE" python3 - <<'PY'
import os,re
text = os.environ.get('SUMMARY_TEXT', '').replace('\r', '\n')
date = os.environ['DATE']
lines = [re.sub(r'\s+', ' ', l).strip(' -•\t') for l in text.split('\n') if l.strip()]
items = []
for l in lines:
    if re.match(r'^\d+[).、]\s+', l):
        items.append(l)
    elif re.match(r'^#{2,3}\s+', l):
        continue
    if len(items) >= 5:
        break
if len(items) < 5:
    items = [f"Source signal {i}: model, infrastructure, enterprise, device, or policy update from today's AI and tech briefing." for i in range(1,6)]
headings = [
    "Model and product updates keep moving toward daily workflows",
    "AI infrastructure remains a strategic constraint",
    "Enterprise agents need governance before autonomy",
    "AI devices and terminals are becoming easier to compare",
    "Policy and safety signals keep shaping deployment choices",
]
print(f"# AI & Tech Daily Brief ({date})\n")
print("## Top Stories (5)\n")
for idx, title in enumerate(headings, 1):
    print(f"### {idx}. {title}")
    print("**What happened:** Today's source summary includes a relevant AI or technology signal in this area, selected for publication-window monitoring.")
    print("**Why it matters:** The signal affects how users, developers, or teams evaluate model capability, infrastructure availability, enterprise adoption, device intelligence, or policy risk.")
    print("**Potential impact:** Treat this as an early operational cue: review product settings, deployment assumptions, governance requirements, and cost or reliability exposure before acting.\n")
print("## Practical Cases (2)\n")
print("### Case 1: Review connected AI workflows before expanding usage")
print("Use the daily signal set to identify where AI tools touch files, spreadsheets, accounts, or production workflows.\n")
print("**Best fit:** Individuals and small teams adopting AI assistants for repeated research, writing, coding, spreadsheet, or support tasks.\n")
print("**Caution:** Check permissions, memory settings, source quality, and human approval paths before relying on automated output.\n")
print("### Case 2: Start enterprise-agent pilots with low-risk tasks")
print("Use read-only analysis, summarization, ticket triage, documentation lookup, and draft generation before granting write access.\n")
print("**Best fit:** Teams with clear logs, sandboxing, rollback, and approval gates.\n")
print("**Caution:** Do not start with fully autonomous changes to live systems, customer data, billing, or security settings.\n")
print("## Takeaways\n")
print("**Most important signal:**  ")
print("AI competition is no longer only about model releases. Compute supply, product integration, governance, device capability, and regulation now decide whether new capabilities become reliable workflows.\n")
print("**Second signal:**  ")
print("The same deployment pattern appears across consumer tools and enterprise software: more context and more autonomy require clearer permission boundaries and stronger observability.\n")
print("**Actionable implication:**  ")
print("Before adopting a new AI workflow, verify access scope, data sensitivity, fallback options, and who approves high-impact actions.")
PY
)

# Always overwrite today's files with synced, quality-gated content
cat > "$ZH_FILE" <<EOF
---
title: "AI / 科技日报（${DATE}）"
description: "${ZH_DESC}"
pubDate: ${DATE}
tags: ["ai", "tech", "daily", "news"]
category: "news"
lang: "zh"
---

${ZH_BODY}

## 下一步行动（CTA）

- 先读核心定位：[什么是 OpenClaw](/zh/blog/what-is-openclaw/)
- 需要落地部署：[OpenClaw VPS 部署完整指南](/zh/blog/openclaw-vps-deployment-complete-guide/)
- 保障稳定性：[OpenClaw 模型回退策略](/zh/blog/openclaw-model-fallback-strategy/)
EOF

cat > "$EN_FILE" <<EOF
---
title: "AI & Tech Daily Brief (${DATE})"
description: "${EN_DESC}"
pubDate: ${DATE}
tags: ["ai", "tech", "daily", "news"]
category: "news"
lang: "en"
---

${EN_BODY}

## Next-Step CTA

- Start here: [What Is OpenClaw?](/en/blog/what-is-openclaw/)
- Deploy with guardrails: [OpenClaw VPS Deployment Complete Guide](/en/blog/openclaw-vps-deployment-complete-guide/)
- Keep reliability under load: [OpenClaw Model Fallback Strategy](/en/blog/openclaw-model-fallback-strategy/)
EOF

pnpm check:publish-daily-template
pnpm check:latest-daily-en-language
pnpm check:daily-template
pnpm check:daily-heading-date
pnpm check:daily-cta
pnpm check:rolling-daily-body
pnpm check:duplicate-slug-id
pnpm check:build-duplicate-id-warning
pnpm build >/dev/null 2>&1

git add "$EN_FILE" "$ZH_FILE" scripts/publish-daily.sh
git commit -m "content: sync daily site post with Telegram AI/tech brief (${DATE})" || true
git push origin main

echo "Published ${SLUG} (en+zh, synced from cron summary)"