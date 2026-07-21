export const fixtureDate = '2026-07-18';

export const realCronFixture = `《AI、科技日报》  
2026-07-18 07:30｜聚焦 AI / 科技行业

## 今日要闻（5条）

1. OpenAI 开始有限预览 GPT‑5.6 系列
状态：已确认  
发生了什么：OpenAI 称开始有限预览 GPT‑5.6 Sol / Terra / Luna。Sol 是旗舰模型，主打更强 coding、生物、网络安全与多智能体“ultra mode”。  
为什么重要：这不是普通小版本更新，而是“能力分层 + 更强安全栈 + 分阶段开放”的新发布方式。  
可能影响：开发者短期只能等灰度，API 初期面向可信伙伴；安全、代码、科研类工具会最先受益；普通用户可能要等 ChatGPT / Codex 后续开放。

2. Kimi 发布 K3：2.8 万亿参数、百万 token 上下文
状态：已确认  
发生了什么：Moonshot / Kimi 发布 Kimi K3，称其为 2.8T 参数、原生多模态、100 万 token 上下文的开放 3T 级模型；目前可在 Kimi.com、Kimi Work、Kimi Code、API 使用，完整权重计划 2026-07-27 前发布。  
为什么重要：中国大模型继续往“超大参数 + 长上下文 + Agent 工程能力”推进，不只拼聊天能力，而是拼长程编码、研究、知识工作。  
可能影响：国内开源/开放模型竞争继续升温；长文档、代码库、研究型任务会更适合直接交给模型跑；但完整权重尚未发布，实际开源生态效果还要看 7 月底落地。

3. NVIDIA 把“后训练”推成 Agentic AI 的核心算力战场
状态：已确认  
发生了什么：NVIDIA 发布文章强调，Agentic AI 时代模型需要持续后训练，不再是“一次训练完就上线”。NVIDIA 用 Nemotron、NeMo RL、Vera Rubin 等体系，主推“intelligence per dollar”。  
为什么重要：行业焦点正在从“训练一个大模型”转向“持续让模型在真实任务里变聪明”。这会让 RL、评测、沙盒、推理-训练闭环变成基础设施。  
可能影响：算力需求会更持续，不只集中在预训练；企业做 AI Agent，成本会越来越取决于后训练效率；NVIDIA 继续把硬件、软件、模型、生态绑定在一起。

4. WAIC 2026 开幕：产业发展、人才生态、算力成为高频主题
状态：已确认  
发生了什么：新华社报道，2026 世界人工智能大会 7 月 17-20 日在上海举行，约 172 场会议、论坛及活动中，“产业发展”“人才生态”“算力”是出现最多的主题。  
为什么重要：这说明中国 AI 议题已经明显从“大模型发布”转向“产业落地、人才供给、算力成本”。  
可能影响：工业、交通、金融会继续成为 AI 应用重点；国产算力和超节点会被更密集展示；AI 人才能力要求会从会用工具，升级为“AI + 专业领域”的 π 型能力。

5. 工信部将继续推动中小企业数智化转型，并强化 AI 赋能
状态：已确认  
发生了什么：新华社报道，工信部副部长在中小企业数智化转型培训班上表示，下一步将优化市场生态、开发“小快轻准”产品和解决方案，并推动 AI 在研发设计、生产制造、经营管理等场景深化应用。  
为什么重要：中小企业是 AI 落地的真实大市场，但它们通常缺预算、缺人才、缺系统集成能力。  
可能影响：面向中小企业的轻量 AI 工具、行业模板、低成本改造服务会更有机会；“AI + 制造业”会继续是政策和产业共同推动方向；普通企业主更该关注能直接降本增效的小工具，而不是追大模型参数。

## 实战案例（2个）

1. Kimi K3 做长程研究与代码任务  
可借鉴点：Kimi 官方案例称，K3 可处理长程代码、GPU kernel 优化、研究复现、交互式报告生成等任务。普通用户可把任务改成“完整资料 + 明确目标 + 分步骤产出”，用长上下文处理复杂材料，而不是只问一句话。

2. NVIDIA 的后训练逻辑适合企业 Agent  
可借鉴点：Agent 上线后会遇到新工具、新边界条件、新业务规则，所以需要持续后训练和评测闭环。团队可先为一个低风险流程建立评测集、人工复核、回滚标准和成本指标。
`;

export const expectedSignals = [
  { title: 'OpenAI 开始有限预览 GPT‑5.6 系列', sourceProjectionRuleMatches: ['openai-chatgpt-model-picker-2026'], enLabel: 'OpenAI / GPT-5.6 / Sol-Terra-Luna agent platform', zhEvidence: '来源条目 1：OpenAI 开始有限预览 GPT‑5.6 系列', requiredTokens: ['GPT‑5.6 Sol', 'Terra', 'Luna', 'ultra mode', '可信伙伴'] },
  { title: 'Kimi 发布 K3：2.8 万亿参数、百万 token 上下文', sourceProjectionRuleMatches: ['moonshot-kimi-k3-long-context-open-model-2026'], enLabel: 'China / Kimi K3 / long-context open model', zhEvidence: '来源条目 2：Kimi 发布 K3：2.8 万亿参数、百万 token 上下文', requiredTokens: ['Kimi K3', '2.8T', '100 万 token', 'Kimi Code', '2026-07-27'] },
  { title: 'NVIDIA 把“后训练”推成 Agentic AI 的核心算力战场', sourceProjectionRuleMatches: ['nvidia-nemoclaw-industrial-agents'], enLabel: 'NVIDIA / post-training / agentic AI infrastructure', zhEvidence: '来源条目 3：NVIDIA 把“后训练”推成 Agentic AI 的核心算力战场', requiredTokens: ['后训练', 'Nemotron', 'NeMo RL', 'Vera Rubin', 'intelligence per dollar'] },
  { title: 'WAIC 2026 开幕：产业发展、人才生态、算力成为高频主题', sourceProjectionRuleMatches: ['china-waic-industry-talent-compute-agenda-2026'], enLabel: 'China / WAIC / industry talent compute agenda', zhEvidence: '来源条目 4：WAIC 2026 开幕：产业发展、人才生态、算力成为高频主题', requiredTokens: ['2026 世界人工智能大会', '172 场会议', '产业发展', '人才生态', '算力'] },
  { title: '工信部将继续推动中小企业数智化转型，并强化 AI 赋能', sourceProjectionRuleMatches: ['china-vertical-industry-ai-scale-deployment-2026'], enLabel: 'China / MIIT / SME digital AI enablement', zhEvidence: '来源条目 5：工信部将继续推动中小企业数智化转型，并强化 AI 赋能', requiredTokens: ['中小企业数智化转型培训班', '小快轻准', '研发设计', '生产制造', '经营管理'] },
];

export const bannedFallbackPhrases = [
  'The source tracks agent platform, open-source model ecosystem',
  'The source tracks model capability update, enterprise AI rollout',
  'giving the daily brief a named actor and deployment context',
  'buyers must check access control, infrastructure availability, operational risk',
  'NVIDIA said Cadence, Dassault Systèmes, Siemens, Synopsys',
  'A secondary L3 source says China has more than 6,000 AI companies',
  'today AI / technology daily not generated',
  '今日 AI / 科技日报暂未生成',
  '-…',
  '...'
];

export const requiredEnglishOutputs = [
  '### 1. OpenAI / GPT-5.6 / Sol-Terra-Luna agent platform',
  '### 2. China / Kimi K3 / long-context open model',
  '2.8T-parameter native multimodal model',
  '1 million token context window',
  '### 3. NVIDIA / post-training / agentic AI infrastructure',
  'continuous post-training rather than a one-time train-and-serve cycle',
  '### 4. China / WAIC / industry talent compute agenda',
  'about 172 meetings, forums, and events',
  '### 5. China / MIIT / SME digital AI enablement',
  'small, fast, lightweight, and accurate products',
  'Evidence item 2: China / Kimi K3 / long-context open model',
  'Evidence item 3: NVIDIA / post-training / agentic AI infrastructure',
  'Evidence item 4: China / WAIC / industry talent compute agenda',
  'Evidence item 5: China / MIIT / SME digital AI enablement',
  '## Today’s Bottom Line',
  '## What to Watch Tomorrow',
  '## Evidence Matrix'
];

export const requiredZhOutputs = [
  'OpenAI 开始有限预览 GPT‑5.6 系列',
  'Kimi 发布 K3：2.8 万亿参数、百万 token 上下文',
  'NVIDIA 把“后训练”推成 Agentic AI 的核心算力战场',
  'WAIC 2026 开幕：产业发展、人才生态、算力成为高频主题',
  '工信部将继续推动中小企业数智化转型，并强化 AI 赋能',
  'Kimi K3 做长程研究与代码任务',
  'NVIDIA 的后训练逻辑适合企业 Agent',
  '## 今日结论',
  '## 明日跟踪点',
  '## 证据矩阵',
  '来源条目 5：工信部将继续推动中小企业数智化转型，并强化 AI 赋能'
];

export const caseLevelFaqSignals = [
  {
    label: 'Kimi K3 long-context research workflow',
    practicalCaseMatchTerms: ['Kimi K3 做长程研究与代码任务', '研究复现', '交互式报告'],
    sourceStoryMatchTerms: ['Kimi K3', '2.8T', '100 万 token'],
    requiredTerms: ['Kimi K3 long-context research workflow', 'source boundaries', 'review checkpoints'],
    links: ['/en/blog/openclaw-model-fallback-strategy/', '/en/blog/openclaw-logs-debug-guide/'],
  },
  {
    label: 'Agent post-training evaluation loop',
    practicalCaseMatchTerms: ['NVIDIA 的后训练逻辑适合企业 Agent', '评测闭环', '回滚标准'],
    sourceStoryMatchTerms: ['后训练', 'NeMo RL', 'intelligence per dollar'],
    requiredTerms: ['Agent post-training evaluation loop', 'evaluation set', 'rollback'],
    links: ['/en/blog/agentic-engineering-guide/', '/en/blog/openclaw-model-fallback-strategy/'],
  },
];

export const parserGuardrails = {
  story1RequiredDetailTokens: ['GPT‑5.6 Sol', 'Terra', 'Luna', 'ultra mode'],
  story1ForbiddenDetailTokens: ['GPT-5.5 Instant', 'local or shopping-style queries'],
  story2RequiredDetailTokens: ['Kimi K3', '2.8T', '100 万 token', 'Kimi Code'],
  story2ForbiddenDetailTokens: ['named actor and deployment context', 'buyers must check access control'],
  story3RequiredDetailTokens: ['后训练', 'NeMo RL', 'Vera Rubin', 'intelligence per dollar'],
  story3ForbiddenDetailTokens: ['Cadence', 'Dassault', 'NemoClaw / OpenShell'],
  story4RequiredDetailTokens: ['172 场会议', '产业发展', '人才生态', '算力'],
  story4ForbiddenDetailTokens: ['6,000 AI companies', '1.2 trillion yuan', 'original official report link was not captured'],
  story5RequiredDetailTokens: ['中小企业数智化转型培训班', '小快轻准', '研发设计', '生产制造', '经营管理'],
  story5ForbiddenDetailTokens: ['illegal pop-ups', 'shake-to-jump redirects'],
};
