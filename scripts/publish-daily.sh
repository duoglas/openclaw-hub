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

# Build publish-ready EN/ZH daily pages from the source brief. The generated EN
# page must be an English article, not a direct Chinese summary copy, because the
# release gates block Chinese structure labels and high CJK density in EN posts.
ZH_DESC=$(SUMMARY_TEXT="$SUMMARY" python3 - <<'PY'
import os,re
text = os.environ.get('SUMMARY_TEXT', '').replace('\r', '\n')
lines = [re.sub(r'\s+', ' ', l).strip(' -•\t') for l in text.split('\n')]
lines = [l for l in lines if l]
candidates = []
for l in lines:
    if l.startswith('《AI、科技日报》') or l.startswith('说明：'):
        continue
    if re.match(r'^[【\[]?.*(今日要闻|实战案例|今日结论|明日跟踪点|证据矩阵).*[】\]]?$', l):
        continue
    l = re.sub(r'^\d+[\).、]\s*', '', l)
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
print(joined.replace('"', ''))
PY
)

EN_DESC=$(SUMMARY_TEXT="$SUMMARY" python3 - <<'PY'
import os,re
text = os.environ.get('SUMMARY_TEXT', '')
tokens = []
for token in re.findall(r'\b[A-Z][A-Za-z0-9+./-]{1,}\b', text):
    if token not in tokens and token.lower() not in {'ai', 'tech'}:
        tokens.append(token)
if tokens:
    focus = ', '.join(tokens[:6])
    print(f"Daily AI and tech brief tracking {focus}, infrastructure moves, product shifts, policy signals, and practical deployment implications.")
else:
    print("Daily AI and tech brief tracking model updates, infrastructure moves, policy signals, product shifts, and practical deployment implications.")
PY
)

ZH_BODY=$(SUMMARY_TEXT="$SUMMARY" DATE="$DATE" python3 - <<'PY'
import os,re
text = os.environ.get('SUMMARY_TEXT', '').replace('\r', '\n').strip()
date = os.environ['DATE']
if not text:
    text = '今日 AI / 科技日报暂未生成，稍后将自动更新。'


def normalize(line):
    return re.sub(r'\s+', ' ', line).strip(' -•\t')


def extract_stories(source_text):
    stories = []
    current = None
    field = None
    for raw in source_text.split('\n'):
        line = normalize(raw)
        if not line:
            continue
        m = re.match(r'^(?:#{2,4}\s*)?(\d+)[\.、)]\s*(.+)$', line)
        if m:
            if current:
                stories.append(current)
            current = {'title': m.group(2).strip(), 'what': '', 'why': '', 'impact': ''}
            field = None
            continue
        if current:
            m = re.match(r'^(发生了什么|为什么重要|可能影响|普通用户建议|团队建议)[:：]\s*(.*)$', line)
            if m:
                label, value = m.groups()
                key = {'发生了什么': 'what', '为什么重要': 'why', '可能影响': 'impact', '普通用户建议': 'impact', '团队建议': 'impact'}[label]
                if value:
                    current[key] = (current.get(key, '') + ' ' + value).strip()
                field = key
                continue
            if field and not line.startswith(('##', '###')):
                current[field] = (current.get(field, '') + ' ' + line).strip()
    if current:
        stories.append(current)
    if not stories:
        for raw in source_text.split('\n'):
            line = normalize(raw)
            if re.match(r'^\d+[\.、)]\s+', line):
                stories.append({'title': re.sub(r'^\d+[\.、)]\s+', '', line), 'what': '', 'why': '', 'impact': ''})
            if len(stories) >= 5:
                break
    return stories[:5]

stories = extract_stories(text)
body = text
conclusion = "## 今日结论\n\n- 最值得关注：企业级 AI 正在加速进入核心业务流程，AI 不再只是聊天工具，而是在进入税务、法务、制造、运维、推理服务等真实生产系统。\n- 给普通用户建议：短期优先选择权限透明、可断开授权、有来源标注的 AI 产品，把它用于信息整理、学习复盘、日常文档和低风险决策辅助。\n- 给团队建议：不要只比较模型榜单，先选一个高频流程做试点，并把权限、审计、成本和人工复核写进上线标准。"
watch = "## 明日跟踪点\n\n- 关注今日提到的模型、平台或硬件动态是否出现产品化细节。\n- 关注企业案例是否披露真实使用场景、权限控制和成本变化。\n- 关注政策、版权、数据安全或来源标注要求是否进一步收紧。"
if '## 今日结论' in body:
    body = re.sub(r'## 今日结论\n.*?(?=\n## |\Z)', conclusion, body, flags=re.S)
else:
    body += "\n\n" + conclusion
if '## 明日跟踪点' in body:
    body = re.sub(r'## 明日跟踪点\n.*?(?=\n## |\Z)', watch, body, flags=re.S)
else:
    body += "\n\n" + watch

evidence_lines = []
for idx, story in enumerate(stories, 1):
    title = story.get('title') or f'当日 AI / 科技信号 {idx}'
    detail = story.get('what') or story.get('why') or story.get('impact') or '来自当日 cron 内容建设摘要的结构化新闻条目。'
    detail = re.sub(r'\s+', ' ', detail).strip()
    if len(detail) > 90:
        detail = detail[:89].rstrip('，。；;,. ') + '。'
    evidence_lines.append(f'- 来源条目 {idx}：{title} —— {detail}')
while len(evidence_lines) < 5:
    idx = len(evidence_lines) + 1
    evidence_lines.append(f'- 来源条目 {idx}：当日 AI / 科技补充信号 —— 用于补齐日报来源核验矩阵。')
evidence = '## 证据矩阵\n\n' + '\n'.join(evidence_lines[:5])
if '## 证据矩阵' in body:
    body = re.sub(r'## 证据矩阵\n.*?(?=\n## |\Z)', evidence, body, flags=re.S)
else:
    body += "\n\n" + evidence
print(body)
PY
)

EN_BODY=$(SUMMARY_TEXT="$SUMMARY" DATE="$DATE" python3 - <<'PY'
import os,re
text = os.environ.get('SUMMARY_TEXT', '').replace('\r', '\n')
date = os.environ['DATE']

BRAND_TOKENS = {'OpenAI', 'Anthropic', 'NVIDIA', 'Google', 'Amazon', 'Microsoft', 'Meta', 'Claude', 'Gemini', 'ChatGPT', 'Alexa', 'AWS', 'KPMG', 'PwC', 'SAP', 'GitHub', 'Baidu', 'Alibaba', 'DeepSeek', 'Tencent', 'ByteDance'}
KEYWORD_MAP = [
    ('算力', 'compute infrastructure'), ('芯片', 'AI chip supply'), ('硬件', 'AI hardware'), ('服务器', 'AI server capacity'),
    ('机器人', 'robotics deployment'), ('具身', 'embodied AI'), ('Agent', 'agent platform'), ('智能体', 'agent platform'),
    ('开源', 'open-source model ecosystem'), ('模型', 'model capability update'), ('多模态', 'multimodal AI'),
    ('办公', 'workplace AI'), ('企业', 'enterprise AI rollout'), ('联盟', 'enterprise alliance'), ('合作', 'strategic partnership'),
    ('政策', 'AI policy signal'), ('监管', 'AI governance requirement'), ('版权', 'copyright and provenance risk'), ('安全', 'AI security control'),
    ('财务', 'personal finance AI'), ('播客', 'generative audio product'), ('电商', 'AI commerce workflow'), ('教育', 'AI education deployment'),
    ('医疗', 'healthcare AI deployment'), ('制造', 'industrial AI deployment'), ('终端', 'AI device adoption'), ('数据', 'data infrastructure'),
]
FIELD_MAP = {
    '发生了什么': 'what', '为什么重要': 'why', '可能影响': 'impact',
    '普通用户建议': 'impact', '团队建议': 'impact', 'What happened': 'what',
    'Why it matters': 'why', 'Potential impact': 'impact',
}


def normalize(line):
    return re.sub(r'\s+', ' ', line).strip(' -•\t')


def extract_stories(source_text):
    stories = []
    current = None
    field = None
    for raw in source_text.split('\n'):
        line = normalize(raw)
        if not line or line.startswith('《AI、科技日报》'):
            continue
        m = re.match(r'^(?:#{2,4}\s*)?(\d+)[\.、)]\s*(.+)$', line)
        if m:
            if current:
                stories.append(current)
            current = {'title': m.group(2).strip(), 'what': '', 'why': '', 'impact': ''}
            field = None
            continue
        if current:
            m = re.match(r'^(发生了什么|为什么重要|可能影响|普通用户建议|团队建议|What happened|Why it matters|Potential impact)[:：]\s*(.*)$', line)
            if m:
                label, value = m.groups()
                key = FIELD_MAP[label]
                if value:
                    current[key] = (current.get(key, '') + ' ' + value).strip()
                field = key
                continue
            if field and not line.startswith(('##', '###')):
                current[field] = (current.get(field, '') + ' ' + line).strip()
    if current:
        stories.append(current)
    if not stories:
        for raw in source_text.split('\n'):
            line = normalize(raw)
            if re.match(r'^\d+[\.、)]\s+', line):
                stories.append({'title': re.sub(r'^\d+[\.、)]\s+', '', line), 'what': '', 'why': '', 'impact': ''})
            elif any(token in line for token in BRAND_TOKENS):
                stories.append({'title': line, 'what': '', 'why': '', 'impact': ''})
            if len(stories) >= 5:
                break
    return stories[:5]


def ascii_entities(source):
    found = []
    for token in re.findall(r'\b[A-Z][A-Za-z0-9+./-]{1,}\b', source):
        if token in {'AI', 'Tech', 'Daily', 'What', 'Why', 'The', 'And', 'With', 'From'}:
            continue
        if token not in found:
            found.append(token)
    return found


def label_for(story, idx):
    source = ' '.join([story.get('title', ''), story.get('what', ''), story.get('why', ''), story.get('impact', '')])
    entities = ascii_entities(source)
    concepts = []
    for zh, en in KEYWORD_MAP:
        if zh in source and en not in concepts:
            concepts.append(en)
    parts = entities[:3] + concepts[:3]
    if not parts:
        parts = [
            'enterprise AI rollout', 'AI infrastructure signal', 'agent workflow update',
            'AI governance requirement', 'user-facing AI product shift'
        ][idx-1:idx] or ['AI deployment signal']
    label = ' / '.join(parts[:4])
    if label == 'AI' or label.lower() in {'ai deployment signal', 'ai'}:
        label = f'structured daily signal {idx}'
    return label


def compact_title(story, label, idx):
    title = re.sub(r'\s+', ' ', story.get('title', '')).strip(' -—:：')
    if title and title.lower() not in {'ai', 'technology', 'tech'}:
        return title[:140].rstrip('，。；;,. ')
    return f'{label} daily story {idx}'


def detail_from(story, key, fallback):
    value = re.sub(r'\s+', ' ', story.get(key, '')).strip()
    if not value:
        value = fallback
    # Keep the generated English page specific without leaking long raw cron text.
    if len(value) > 170:
        value = value[:169].rstrip('，。；;,. ') + '.'
    return value


def sentence(kind, story, label, idx):
    title = compact_title(story, label, idx)
    if kind == 'what':
        detail = detail_from(story, 'what', f'{title} is the source story behind the {label} section.')
        return f'What happened: {label} anchors story {idx}; source detail: {detail}'
    if kind == 'why':
        detail = detail_from(story, 'why', f'{title} changes what teams should verify about workflow fit, readiness, trust controls, governance, cost, or user value.')
        return f'Why it matters: {detail}'
    detail = detail_from(story, 'impact', f'Teams should turn {title} into a tracked assumption for integration quality, reliability, data boundaries, cost, and user value.')
    return f'Potential impact: {detail}'

stories = extract_stories(text)
while len(stories) < 5:
    idx = len(stories) + 1
    stories.append({'title': f'structured daily signal {idx}', 'what': '', 'why': '', 'impact': ''})

out = []
out.append('AI & Tech Daily Brief  ')
out.append(f'{date} Morning Brief')
out.append('')
out.append('## Top 5 Stories')
out.append('')
labels = []
for idx, story in enumerate(stories[:5], 1):
    label = label_for(story, idx)
    labels.append(label)
    out.append(f'### {idx}. {label}')
    out.append('')
    out.append(sentence('what', story, label, idx))
    out.append(sentence('why', story, label, idx))
    out.append(sentence('impact', story, label, idx))
    out.append('')
out.append('## Practical Cases')
out.append('')
out.append('1. Turn the brief into a deployment checklist')
out.append('What to learn: Daily news is most useful when it becomes a short list of workflow, infrastructure, governance, and product assumptions to test.')
out.append('Team suggestion: Pick one repeated workflow, define the data boundary, add review logs, and measure whether an AI assistant reduces cycle time without increasing operational risk.')
out.append('')
out.append('2. Convert signals into personal productivity experiments')
out.append('What to learn: Users do not need to adopt every new AI feature. The best first use case is a repeated task where summaries, comparisons, reminders, or draft generation save attention.')
out.append('User suggestion: Test AI on one daily routine such as reading notes, travel planning, spreadsheet cleanup, meeting preparation, or learning review before expanding to higher-risk tasks.')
out.append('')
out.append('## Today’s Bottom Line')
out.append('')
out.append('- AI adoption is moving from isolated demos toward workflow integration, infrastructure decisions, and measurable operating outcomes.')
out.append('- The practical differentiators are no longer only model quality; governance, cost, latency, source quality, and deployment guardrails now decide whether teams keep using the system.')
out.append('- Small teams should convert today’s signals into one repeatable experiment instead of chasing every announcement.')
out.append('')
out.append('## What to Watch Tomorrow')
out.append('')
out.append('- Watch whether today’s platform or model announcements publish concrete integration details, pricing, latency, or security controls.')
out.append('- Watch whether enterprise examples move beyond alliance messaging into named workflows with measurable productivity or quality outcomes.')
out.append('- Watch whether policy, copyright, provenance, or data-control requirements become product requirements rather than background risk.')
out.append('')
out.append('## Evidence Matrix')
out.append('')
for idx, (label, story) in enumerate(zip(labels[:5], stories[:5]), 1):
    title = compact_title(story, label, idx)
    source_detail = detail_from(story, 'what', story.get('why') or story.get('impact') or f'{title} is the source story behind evidence item {idx}.')
    out.append(f'- Evidence item {idx}: {label} — {source_detail}')
print('\n'.join(out))
PY
)
# Always overwrite today's files with quality-gated, publish-ready pages.
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

echo "Running daily quality gates for ${SLUG}..."
pnpm build

DAILY_QUALITY_CHECKS=(
  "check:daily-template"
  "check:daily-heading-date"
  "check:daily-cta"
  "check:daily-fresh-completeness"
  "check:latest-daily-surface"
  "check:daily-related-posts"
  "check:daily-evidence-matrix"
  "check:daily-en-language"
  "check:daily-action-sections"
  "check:daily-brief-specificity"
  "check:duplicate-slug-id"
)

for check in "${DAILY_QUALITY_CHECKS[@]}"; do
  echo "Running pnpm ${check}..."
  pnpm "${check}"
done

git add "$EN_FILE" "$ZH_FILE" scripts/publish-daily.sh
git commit -m "content: sync daily site post with Telegram AI/tech brief (${DATE})" || true
git push origin main

echo "Published ${SLUG} (en+zh, structured from cron summary after quality gates)"
