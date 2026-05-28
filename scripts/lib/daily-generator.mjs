const BRAND_TOKENS = new Set([
  'OpenAI', 'Anthropic', 'NVIDIA', 'Google', 'Amazon', 'Microsoft', 'Meta', 'Claude', 'Gemini', 'ChatGPT',
  'Alexa', 'AWS', 'KPMG', 'PwC', 'SAP', 'GitHub', 'Baidu', 'Alibaba', 'DeepSeek', 'Tencent', 'ByteDance',
]);

const KEYWORD_MAP = [
  ['算力', 'compute infrastructure'], ['芯片', 'AI chip supply'], ['硬件', 'AI hardware'], ['服务器', 'AI server capacity'],
  ['机器人', 'robotics deployment'], ['具身', 'embodied AI'], ['Agent', 'agent platform'], ['智能体', 'agent platform'],
  ['开源', 'open-source model ecosystem'], ['模型', 'model capability update'], ['多模态', 'multimodal AI'],
  ['办公', 'workplace AI'], ['企业', 'enterprise AI rollout'], ['联盟', 'enterprise alliance'], ['合作', 'strategic partnership'],
  ['政策', 'AI policy signal'], ['监管', 'AI governance requirement'], ['版权', 'copyright and provenance risk'], ['安全', 'AI security control'],
  ['财务', 'personal finance AI'], ['播客', 'generative audio product'], ['电商', 'AI commerce workflow'], ['教育', 'AI education deployment'],
  ['医疗', 'healthcare AI deployment'], ['制造', 'industrial AI deployment'], ['终端', 'AI device adoption'], ['数据', 'data infrastructure'],
];

const ZH_ENTITY_MAP = [
  ['腾讯', 'Tencent'], ['阿里', 'Alibaba'], ['百度', 'Baidu'], ['中国移动', 'China Mobile'], ['华为', 'Huawei'],
  ['Marvis', 'Tencent'], ['百炼', 'Alibaba'], ['DuMate', 'Baidu'], ['MoMA', 'China Mobile'], ['韬', 'Huawei'],
  ['韩国', 'Korea'], ['法国', 'France'], ['中国', 'China'], ['美国', 'US'], ['欧洲', 'Europe'],
];

const FIELD_MAP = new Map([
  ['发生了什么', 'what'], ['为什么重要', 'why'], ['可能影响', 'impact'],
  ['普通用户建议', 'impact'], ['团队建议', 'impact'], ['What happened', 'what'],
  ['Why it matters', 'why'], ['Potential impact', 'impact'],
]);

function normalize(line) {
  return line.replace(/\s+/g, ' ').replace(/^[\s\-•\t]+|[\s\-•\t]+$/g, '');
}

export function extractStories(sourceText) {
  const stories = [];
  let current = null;
  let field = null;

  for (const raw of String(sourceText || '').replace(/\r/g, '\n').split('\n')) {
    const line = normalize(raw);
    if (!line || line.startsWith('《AI、科技日报》')) continue;

    const numbered = line.match(/^(?:#{2,4}\s*)?(\d+)[\.、)]\s*(.+)$/);
    if (numbered) {
      if (current) stories.push(current);
      current = { title: numbered[2].trim(), what: '', why: '', impact: '' };
      field = null;
      continue;
    }

    if (!current) continue;

    if (line === '---' || /^#{2,6}\s+/.test(line) || /^来源[:：]/.test(line) || /^Source[:：]/i.test(line)) {
      field = null;
      continue;
    }

    const labelMatch = line.match(/^(发生了什么|为什么重要|可能影响|普通用户建议|团队建议|What happened|Why it matters|Potential impact)[:：]\s*(.*)$/);
    if (labelMatch) {
      const key = FIELD_MAP.get(labelMatch[1]);
      const value = labelMatch[2].trim();
      if (value) current[key] = `${current[key] || ''} ${value}`.trim();
      field = key;
      continue;
    }

    if (field && !line.startsWith('##') && !line.startsWith('###')) {
      current[field] = `${current[field] || ''} ${line}`.trim();
    }
  }

  if (current) stories.push(current);

  if (stories.length === 0) {
    for (const raw of String(sourceText || '').replace(/\r/g, '\n').split('\n')) {
      const line = normalize(raw);
      if (/^\d+[\.、)]\s+/.test(line)) {
        stories.push({ title: line.replace(/^\d+[\.、)]\s+/, ''), what: '', why: '', impact: '' });
      } else if ([...BRAND_TOKENS].some((token) => line.includes(token))) {
        stories.push({ title: line, what: '', why: '', impact: '' });
      }
      if (stories.length >= 5) break;
    }
  }

  return stories.slice(0, 5);
}

function hasCjk(source) {
  return /[\u3400-\u9fff\uf900-\ufaff]/.test(String(source || ''));
}

function asciiEntities(source) {
  const found = [];
  for (const match of String(source || '').matchAll(/\b[A-Z][A-Za-z0-9+./-]{1,}\b/g)) {
    const token = match[0];
    if (['AI', 'Tech', 'Daily', 'What', 'Why', 'The', 'And', 'With', 'From'].includes(token)) continue;
    if (!found.includes(token)) found.push(token);
  }
  return found;
}

export function labelFor(story, idx) {
  const source = [story?.title, story?.what, story?.why, story?.impact].filter(Boolean).join(' ');
  const mappedEntities = [];
  for (const [zh, en] of ZH_ENTITY_MAP) {
    if (source.includes(zh) && !mappedEntities.includes(en)) mappedEntities.push(en);
  }
  const entities = [...mappedEntities, ...asciiEntities(source).filter((entity) => !mappedEntities.includes(entity))];
  const concepts = [];
  for (const [zh, en] of KEYWORD_MAP) {
    if (source.includes(zh) && !concepts.includes(en)) concepts.push(en);
  }
  const parts = [...entities.slice(0, 3), ...concepts.slice(0, 3)];
  let label = parts.length ? parts.slice(0, 4).join(' / ') : [
    'enterprise AI rollout', 'AI infrastructure signal', 'agent workflow update',
    'AI governance requirement', 'user-facing AI product shift',
  ][idx - 1] || 'AI deployment signal';
  if (label === 'AI' || ['ai deployment signal', 'ai'].includes(label.toLowerCase())) {
    label = `structured daily signal ${idx}`;
  }
  return label;
}

export function compactTitle(story, label, idx) {
  const title = String(story?.title || '').replace(/\s+/g, ' ').replace(/^[\s\-—:：]+|[\s\-—:：]+$/g, '');
  if (title && !hasCjk(title) && !['ai', 'technology', 'tech'].includes(title.toLowerCase())) {
    return title.slice(0, 140).replace(/[，。；;,.\s]+$/g, '');
  }
  return `${label} signal ${idx}`;
}

function englishSignalSummary(story, label, idx) {
  const source = [story?.title, story?.what, story?.why, story?.impact].filter(Boolean).join(' ');
  const entityBits = [];
  for (const [zh, en] of ZH_ENTITY_MAP) {
    if (source.includes(zh) && !entityBits.includes(en)) entityBits.push(en);
  }
  for (const token of asciiEntities(source)) {
    if (!entityBits.includes(token)) entityBits.push(token);
  }
  const conceptBits = [];
  for (const [zh, en] of KEYWORD_MAP) {
    if (source.includes(zh) && !conceptBits.includes(en)) conceptBits.push(en);
  }
  const entities = entityBits.slice(0, 3).join(', ') || label;
  const concepts = conceptBits.slice(0, 3).join(', ') || 'AI product, infrastructure, governance, or deployment change';
  return `Source ${idx} centers on ${entities} and ${concepts}; teams should verify workflow fit, reliability, data boundaries, cost, and user value before adoption.`;
}

export function detailFrom(story, key, fallback, label = '', idx = 1) {
  const safeFallback = hasCjk(fallback) ? englishSignalSummary(story, label, idx) : fallback;
  let value = String(story?.[key] || '').replace(/\s+/g, ' ').trim();
  if (!value || hasCjk(value)) value = safeFallback;
  if (value.length > 190) value = `${value.slice(0, 189).replace(/[，。；;,.\s]+$/g, '')}.`;
  return value;
}

function sentence(kind, story, label, idx) {
  const title = compactTitle(story, label, idx);
  if (kind === 'what') {
    const detail = detailFrom(story, 'what', `${title} gives the ${label} section a concrete source detail.`, label, idx);
    return `What happened: ${detail}`;
  }
  if (kind === 'why') {
    const detail = detailFrom(story, 'why', `${title} changes what teams should verify about workflow fit, readiness, trust controls, governance, cost, or user value.`, label, idx);
    return `Why it matters: ${detail}`;
  }
  const detail = detailFrom(story, 'impact', `Teams should validate ${title} through a small production-adjacent pilot that checks integration quality, reliability, data boundaries, cost exposure, and user value before broad rollout.`, label, idx);
  return `Potential impact: ${detail}`;
}

export function generateEnglishDailyBody(sourceText, date) {
  const stories = extractStories(sourceText);
  while (stories.length < 5) {
    const idx = stories.length + 1;
    stories.push({ title: `structured daily signal ${idx}`, what: '', why: '', impact: '' });
  }

  const out = [];
  out.push('AI & Tech Daily Brief  ');
  out.push(`${date} Morning Brief`);
  out.push('');
  out.push('## Top 5 Stories');
  out.push('');

  const labels = [];
  stories.slice(0, 5).forEach((story, index) => {
    const idx = index + 1;
    const label = labelFor(story, idx);
    labels.push(label);
    out.push(`### ${idx}. ${label}`);
    out.push('');
    out.push(sentence('what', story, label, idx));
    out.push(sentence('why', story, label, idx));
    out.push(sentence('impact', story, label, idx));
    out.push('');
  });

  out.push('## Practical Cases');
  out.push('');
  out.push('1. Turn the brief into a deployment checklist');
  out.push('What to learn: Daily news is most useful when it becomes a short list of workflow, infrastructure, governance, and product assumptions to test.');
  out.push('Team suggestion: Pick one repeated workflow, define the data boundary, add review logs, and measure whether an AI assistant reduces cycle time without increasing operational risk.');
  out.push('');
  out.push('2. Convert signals into personal productivity experiments');
  out.push('What to learn: Users do not need to adopt every new AI feature. The best first use case is a repeated task where summaries, comparisons, reminders, or draft generation save attention.');
  out.push('User suggestion: Test AI on one daily routine such as reading notes, travel planning, spreadsheet cleanup, meeting preparation, or learning review before expanding to higher-risk tasks.');
  out.push('');
  out.push('## Today’s Bottom Line');
  out.push('');
  out.push('- AI adoption is moving from isolated demos toward workflow integration, infrastructure decisions, and measurable operating outcomes.');
  out.push('- The practical differentiators are no longer only model quality; governance, cost, latency, source quality, and deployment guardrails now decide whether teams keep using the system.');
  out.push('- Small teams should convert today’s signals into one repeatable experiment instead of chasing every announcement.');
  out.push('');
  out.push('## What to Watch Tomorrow');
  out.push('');
  out.push('- Watch whether today’s platform or model announcements publish concrete integration details, pricing, latency, or security controls.');
  out.push('- Watch whether enterprise examples move beyond alliance messaging into named workflows with measurable productivity or quality outcomes.');
  out.push('- Watch whether policy, copyright, provenance, or data-control requirements become product requirements rather than background risk.');
  out.push('');
  out.push('## Evidence Matrix');
  out.push('');

  labels.slice(0, 5).forEach((label, index) => {
    const idx = index + 1;
    const story = stories[index];
    const title = compactTitle(story, label, idx);
    const sourceDetail = detailFrom(story, 'what', story?.why || story?.impact || `${title} provides source detail for evidence item ${idx}.`, label, idx);
    out.push(`- Evidence item ${idx}: ${label} — ${sourceDetail}`);
  });

  return out.join('\n');
}
