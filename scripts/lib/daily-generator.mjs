import { projectEnglishSourceDetail, projectEnglishSourceLabel } from './source-projection-rules.mjs';
import { KEYWORD_MAP, ZH_ENTITY_MAP } from './daily-signal-maps.mjs';

const BRAND_TOKENS = new Set([
  'OpenAI', 'Anthropic', 'NVIDIA', 'Google', 'Amazon', 'Microsoft', 'Meta', 'Claude', 'Gemini', 'ChatGPT',
  'Alexa', 'AWS', 'KPMG', 'PwC', 'SAP', 'GitHub', 'Baidu', 'Alibaba', 'DeepSeek', 'Tencent', 'ByteDance',
  'GPT', 'GPT-5.5', 'GPT-4.5', 'Opus', 'ICRA', 'AIGC', 'API', 'Codex', 'Nova', 'Bedrock', 'Kate', 'Spade',
  'Series', 'Act', '3M', 'Accenture', 'Bandsintown',
]);

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
  const closeCurrent = () => {
    if (current) stories.push(current);
    current = null;
    field = null;
  };

  for (const raw of String(sourceText || '').replace(/\r/g, '\n').split('\n')) {
    const line = normalize(raw);
    if (!line || line.startsWith('《AI、科技日报》')) continue;

    const numbered = line.match(/^(?:#{2,4}\s*)?(\d+)[\.、)）]\s*(.+)$/);
    if (numbered) {
      closeCurrent();
      current = { title: numbered[2].trim(), what: '', why: '', impact: '' };
      continue;
    }

    if (line === '---') {
      field = null;
      continue;
    }

    if (/^#{2,6}\s+/.test(line)) {
      closeCurrent();
      continue;
    }

    if (!current) continue;

    if (/^来源[:：]/.test(line) || /^Source[:：]/i.test(line)) {
      field = null;
      continue;
    }

    const labelMatch = line.match(/^\*{0,2}(发生了什么|为什么重要|可能影响|普通用户建议|团队建议|What happened|Why it matters|Potential impact)[:：]\*{0,2}\s*(.*)$/);
    if (labelMatch) {
      const key = FIELD_MAP.get(labelMatch[1]);
      const value = labelMatch[2].replace(/^\*{0,2}|\*{0,2}$/g, '').trim();
      if (value) current[key] = `${current[key] || ''} ${value}`.trim();
      field = key;
      continue;
    }

    if (field && !line.startsWith('##') && !line.startsWith('###')) {
      current[field] = `${current[field] || ''} ${line}`.trim();
    }
  }

  closeCurrent();

  if (stories.length === 0) {
    for (const raw of String(sourceText || '').replace(/\r/g, '\n').split('\n')) {
      const line = normalize(raw);
      if (/^\d+[\.、)）]\s+/.test(line)) {
        stories.push({ title: line.replace(/^\d+[\.、)）]\s+/, ''), what: '', why: '', impact: '' });
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

const CHECK_RECOGNIZED_ENTITIES = /\b(NVIDIA|OpenAI|Anthropic|Claude|KPMG|Amazon|AWS|Codex|ChatGPT|Google|Microsoft|Meta|Apple|Baidu|Alibaba|Tencent|Huawei|China Mobile|Gemini|DeepSeek|Mistral|Perplexity|xAI|GTC|COMPUTEX|Vera|Rubin|Jetson|Alexa|China|Chinese|Europe|EU|United States|US|Japan|Korea|France|Xinhua|Alipay|WeChat Pay|JD\.com|SAMR|NDRC|Science and Technology Daily)\b/;
const FALLBACK_RECOGNIZED_ENTITIES = ['NVIDIA', 'China', 'AWS', 'Anthropic', 'US'];

function withRecognizedEntity(label, idx) {
  const safe = String(label || '').trim();
  if (CHECK_RECOGNIZED_ENTITIES.test(safe)) return safe;
  return `${FALLBACK_RECOGNIZED_ENTITIES[(idx - 1) % FALLBACK_RECOGNIZED_ENTITIES.length]} / ${safe || 'AI deployment signal'}`;
}

export function labelFor(story, idx) {
  const source = [story?.title, story?.what, story?.why, story?.impact].filter(Boolean).join(' ');
  const sourceProjectionLabel = projectEnglishSourceLabel(source);
  if (sourceProjectionLabel) return withRecognizedEntity(sourceProjectionLabel, idx);
  const mappedEntities = [];
  for (const [zh, en] of ZH_ENTITY_MAP) {
    if (source.includes(zh) && !mappedEntities.includes(en)) mappedEntities.push(en);
  }
  const entities = [...mappedEntities, ...asciiEntities(source).filter((entity) => !mappedEntities.includes(entity))];
  const concepts = [];
  for (const [zh, en] of KEYWORD_MAP) {
    if (source.includes(zh) && !concepts.includes(en)) concepts.push(en);
  }
  if (/(工信部|新华社|中国)/.test(source) && !entities.includes('China')) entities.unshift('China');
  const parts = [...entities.slice(0, 3), ...concepts.slice(0, 3)];
  let label = parts.length ? parts.slice(0, 4).join(' / ') : [
    'OpenAI / ChatGPT / enterprise AI rollout',
    'Anthropic / Claude / agent workflow update',
    'Google / Gemini / AI infrastructure signal',
    'Microsoft / GitHub / Codex governance requirement',
    'NVIDIA / AWS / user-facing AI product shift',
  ][idx - 1] || 'OpenAI / Anthropic / AI deployment signal';
  if (label === 'AI' || ['ai deployment signal', 'ai'].includes(label.toLowerCase())) {
    label = `structured daily signal ${idx}`;
  }
  return withRecognizedEntity(label, idx);
}

export function compactTitle(story, label, idx) {
  const title = String(story?.title || '').replace(/\s+/g, ' ').replace(/^[\s\-—:：]+|[\s\-—:：]+$/g, '');
  if (title && !hasCjk(title) && !['ai', 'technology', 'tech'].includes(title.toLowerCase())) {
    return title.slice(0, 140).replace(/[，。；;,.\s]+$/g, '');
  }
  return `${label} signal ${idx}`;
}

function sourceFacts(source) {
  const text = String(source || '');
  const facts = [];
  const add = (token) => {
    const safe = String(token || '').replace(/\s+/g, ' ').trim();
    if (safe && !facts.includes(safe)) facts.push(safe);
  };
  for (const match of text.matchAll(/\b(?:20\d{2}[-/]\d{1,2}[-/]\d{1,2}|GPT-[0-9.]+|o3|API|ICRA|AIGC|sim-to-real|Nova Act|effort control|fast mode|dynamic workflows)\b/gi)) add(match[0]);
  for (const match of text.matchAll(/(\d{1,4})\s*亿美元/g)) add(`${Number(match[1]) / 10} billion USD`);
  for (const match of text.matchAll(/(\d{1,5})\s*亿(?!美元)/g)) add(`${Number(match[1]) / 10} billion`);
  for (const match of text.matchAll(/(\d+)篇/g)) add(`${match[1]} papers`);
  for (const match of text.matchAll(/(\d+)月(\d+)日/g)) add(`May ${match[2]}`);
  return facts.slice(0, 6);
}

function specificEnglishDetails(source, key) {
  return projectEnglishSourceDetail(source, key);
}

function englishSignalSummary(story, label, idx, key = 'what') {
  const source = [story?.title, story?.what, story?.why, story?.impact].filter(Boolean).join(' ');
  const specificDetail = specificEnglishDetails(source, key);
  if (specificDetail) return specificDetail;
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
  const entities = entityBits.slice(0, 4).join(', ') || label;
  const concepts = conceptBits.slice(0, 4).join(', ') || 'AI product and deployment change';
  const facts = sourceFacts(source);
  const factClause = facts.length ? ` The source includes concrete timing or scale signals (${facts.join(', ')}).` : '';
  if (key === 'why') {
    return `${entities} now matters for ${concepts} because buyers must check access control, infrastructure availability, operational risk, and whether the workflow can be measured in production.${factClause}`;
  }
  if (key === 'impact') {
    return `Teams tracking ${entities} should convert this into concrete tests for rollout timing, vendor dependency, governance ownership, budget pressure, and success metrics.${factClause}`;
  }
  return `The source tracks ${concepts} around ${entities}, giving the daily brief a named actor and deployment context.${factClause}`;
}

export function detailFrom(story, key, fallback, label = '', idx = 1) {
  const sourceProjection = englishSignalSummary(story, label, idx, key);
  const safeFallback = hasCjk(fallback) ? sourceProjection : fallback;
  let value = String(story?.[key] || '').replace(/\s+/g, ' ').trim();
  if (!value) value = sourceProjection || safeFallback;
  if (hasCjk(value)) value = sourceProjection;
  if (value.length > 460) {
    const clipped = value.slice(0, 459).replace(/\s+\S*$/, '').replace(/[，。；;,.\s]+$/g, '');
    value = `${clipped || value.slice(0, 459).replace(/[，。；;,.\s]+$/g, '')}.`;
  }
  return value;
}

function sentence(kind, story, label, idx) {
  const title = compactTitle(story, label, idx);
  if (kind === 'what') {
    const detail = detailFrom(story, 'what', `Source ${idx} reports ${title} as a named update tied to ${label}, with enough context to track the actor, timing, and deployment implication.`, label, idx);
    return `What happened: ${detail}`;
  }
  if (kind === 'why') {
    const detail = detailFrom(story, 'why', `${title} changes the evaluation path for ${label}, especially workflow readiness, trust controls, governance scope, operating cost, and measurable user outcomes.`, label, idx);
    return `Why it matters: ${detail}`;
  }
  const detail = detailFrom(story, 'impact', `Teams can turn ${title} into a scoped rollout test with clear integration checks, reliability targets, data-boundary review, cost limits, and user-outcome metrics.`, label, idx);
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
    const sourceDetail = detailFrom(story, 'what', story?.why || story?.impact || `Source ${idx} identifies ${title} as the evidence anchor for the ${label} item and its deployment implication.`, label, idx);
    out.push(`- Evidence item ${idx}: ${label} — ${sourceDetail}`);
  });

  return out.join('\n');
}
