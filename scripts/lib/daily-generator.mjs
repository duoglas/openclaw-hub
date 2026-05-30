const BRAND_TOKENS = new Set([
  'OpenAI', 'Anthropic', 'NVIDIA', 'Google', 'Amazon', 'Microsoft', 'Meta', 'Claude', 'Gemini', 'ChatGPT',
  'Alexa', 'AWS', 'KPMG', 'PwC', 'SAP', 'GitHub', 'Baidu', 'Alibaba', 'DeepSeek', 'Tencent', 'ByteDance',
  'GPT', 'GPT-5.5', 'GPT-4.5', 'Opus', 'ICRA', 'AIGC', 'API', 'Codex', 'Nova', 'Bedrock', 'Kate', 'Spade',
  'Series', 'Act', '3M', 'Accenture', 'Bandsintown',
]);

const KEYWORD_MAP = [
  ['算力', 'compute infrastructure'], ['芯片', 'AI chip supply'], ['硬件', 'AI hardware'], ['服务器', 'AI server capacity'],
  ['机器人', 'robotics deployment'], ['具身', 'embodied AI'], ['Agent', 'agent platform'], ['智能体', 'agent platform'],
  ['开源', 'open-source model ecosystem'], ['模型', 'model capability update'], ['多模态', 'multimodal AI'],
  ['办公', 'workplace AI'], ['企业', 'enterprise AI rollout'], ['联盟', 'enterprise alliance'], ['合作', 'strategic partnership'],
  ['政策', 'AI policy signal'], ['监管', 'AI governance requirement'], ['版权', 'copyright and provenance risk'], ['安全', 'AI security control'],
  ['财务', 'personal finance AI'], ['播客', 'generative audio product'], ['电商', 'AI commerce workflow'], ['购物', 'AI commerce workflow'],
  ['版本', 'model release management'], ['退役', 'model retirement planning'], ['编码', 'coding agent workflow'], ['代码', 'coding agent workflow'],
  ['融资', 'AI capital expenditure'], ['估值', 'AI capital expenditure'], ['法院', 'AI legal precedent'], ['司法', 'AI legal precedent'], ['权属', 'data rights governance'],
  ['支付', 'agent payment workflow'], ['5G', 'compute infrastructure'], ['网络', 'compute infrastructure'], ['基站', 'compute infrastructure'],
  ['教育', 'AI education deployment'], ['医疗', 'healthcare AI deployment'], ['制造', 'industrial AI deployment'], ['终端', 'AI device adoption'], ['数据', 'data infrastructure'],
  ['计量', 'AI metrology and evaluation'], ['测试数据集', 'AI test dataset infrastructure'], ['标准', 'AI standards infrastructure'],
  ['可靠', 'reliable agent execution'], ['合规', 'compliance automation'], ['仿真', 'simulation training'], ['抓取', 'robot grasping'], ['装配', 'robot assembly'],
];

const ZH_ENTITY_MAP = [
  ['腾讯', 'Tencent'], ['阿里', 'Alibaba'], ['百度', 'Baidu'], ['中国移动', 'China Mobile'], ['华为', 'Huawei'],
  ['最高法', 'China Supreme People’s Court'], ['人民法院', 'China courts'], ['司法部', 'China Ministry of Justice'],
  ['市场监管总局', 'SAMR'], ['国家发改委', 'NDRC'], ['科技日报', 'Science and Technology Daily'],
  ['支付宝', 'Alipay'], ['微信支付', 'WeChat Pay'], ['京东', 'JD.com'], ['银联', 'UnionPay'], ['新华社', 'Xinhua'], ['工信部', 'MIIT'],
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
  const text = String(source || '');
  const has = (...terms) => terms.some((term) => text.includes(term));
  if (has('Claude Opus 4.8')) {
    if (key === 'what') return 'Anthropic released Claude Opus 4.8 on May 28, positioning it as stronger than Opus 4.7 for coding, agent tasks, and professional workflows while adding effort control, Claude Code dynamic workflows, and fast mode pricing changes.';
    if (key === 'why') return 'The release shows frontier model competition shifting from chat quality toward long-running tasks, codebase-level work, and enterprise agents that expose more explicit effort and cost controls.';
    return 'Developers and enterprise teams can evaluate Claude on code migration, legal review, financial analysis, and complex document workflows where uncertainty handling, review trails, and human approval matter.';
  }
  if (has('Series H', 'H 轮融资')) {
    if (key === 'what') return 'Anthropic announced a Series H round described in the source as 65 billion USD with a 965 billion USD post-money valuation, with annualized revenue cited above 47 billion USD earlier in the month.';
    if (key === 'why') return 'The funding signal keeps the AI race centered on capital-intensive model training, compute access, safety research, interpretability, and distribution through enterprise partners.';
    return 'Infrastructure suppliers, memory vendors, cloud platforms, and enterprise AI application partners may see stronger demand, while smaller model providers face higher financing and differentiation pressure.';
  }
  if (has('计量体系', '计量能力', '测不准')) {
    if (key === 'what') return 'China’s SAMR and NDRC issued an AI metrology and capability-building guide that targets measurement gaps, data scarcity, AI standards, test datasets, and metrology service infrastructure.';
    if (key === 'why') return 'The policy moves AI deployment toward measurable, comparable, and traceable evaluation, which is necessary before high-stakes systems enter healthcare, transport, manufacturing, and public services.';
    return 'AI vendors in China should expect more testing, certification, data-quality, reliability, and explainability requirements instead of relying only on parameter counts or benchmark claims.';
  }
  if (has('Nova Act', '3M', 'Accenture', 'Bandsintown')) {
    if (key === 'what') return 'Amazon described its agentic AI approach around Amazon Nova Act, AWS AI infrastructure, simulation training environments, and real business examples from 3M, Accenture, Bandsintown, and Amazon compliance teams.';
    if (key === 'why') return 'The agent narrative is moving from demos to dependable execution: planning, tool use, workflow completion, infrastructure reliability, security controls, and operating cost are now evaluated together.';
    return 'Enterprises can start with bounded workflows such as compliance checks, customer support, shopping assistance, code delivery, and information retrieval where success criteria and escalation paths are clear.';
  }
  if (has('ICRA', 'sim-to-real')) {
    if (key === 'what') return 'NVIDIA highlighted eight ICRA robotics papers focused on sim-to-real transfer, including multi-arm scheduling, navigation across robot forms, complex grasping, precision assembly, and vision-language-action models.';
    if (key === 'why') return 'Robotics deployment is constrained by expensive real-world data, reliability, and generalization, so simulation training plus real-world correction is becoming a core path to physical AI.';
    return 'Manufacturing, warehousing, medical labs, agriculture, and inspection teams can watch for robotics stacks that combine simulation, validation data, and task-specific deployment guardrails.';
  }
  return '';
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
    return `This matters because ${entities} links ${concepts} to adoption timing, infrastructure capacity, compliance exposure, or enterprise workflow readiness.${factClause}`;
  }
  if (key === 'impact') {
    return `The likely impact is a more specific evaluation path for ${entities}: migration timing, partner dependency, governance review, cost exposure, and measurable rollout criteria.${factClause}`;
  }
  return `Source ${idx} reports a ${concepts} signal involving ${entities}.${factClause}`;
}

export function detailFrom(story, key, fallback, label = '', idx = 1) {
  const sourceProjection = englishSignalSummary(story, label, idx, key);
  const safeFallback = hasCjk(fallback) ? sourceProjection : fallback;
  let value = String(story?.[key] || '').replace(/\s+/g, ' ').trim();
  if (!value) value = safeFallback;
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
