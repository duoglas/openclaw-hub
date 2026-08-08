export const fixtureDate = '2026-08-08';

export const realCronFixture = `《AI、科技日报》  
2026-08-08 早间版

## 今日要闻（5条）

1. OpenAI 披露：新模型 Astra 可能触及“关键网络安全能力”门槛

发生了什么：OpenAI 称，内部评估显示即将推出的 Astra 在代理式编码和网络安全方面进展明显，暂不能排除其达到 Preparedness Framework 中的 Critical cybersecurity 能力级别。

为什么重要：这意味着前沿模型可能具备更强的漏洞发现、攻击链规划和自动化执行能力。AI 安全从“内容风险”进一步进入“真实网络攻防能力”阶段。

可能影响：企业用 AI 做安全测试会更强，但滥用风险也上升；政府、安全机构、第三方评测会更深介入模型发布流程。

2. ChatGPT 更新 GPT‑5.6 Sol，并扩大免费用户能力

发生了什么：OpenAI 宣布 Plus/Pro 用户的 GPT‑5.6 Sol 更注重事实可靠性和聚焦回答；免费用户默认模型升级为 GPT‑5.6 Luna，并将获得不限量文本聊天和 Think 按钮。

为什么重要：这不是单纯“模型更强”，而是把推理能力和普通聊天进一步产品化、平民化。

可能影响：免费用户可承担更多学习、写作、规划类任务；付费用户会更依赖“思考强度”调节，而不是频繁换模型。

3. NVIDIA 推进开放世界模型，强调 Physical AI

发生了什么：NVIDIA 介绍 Cosmos 3 开放物理 AI 基础模型，强调世界模型可用于机器人、自动驾驶、视觉 AI 的训练数据生成、仿真和策略测试。

为什么重要：AI 正从语言/图像生成，继续走向“理解并预测物理世界”。这会影响机器人、自动驾驶、工业仿真等高价值场景。

可能影响：机器人训练会更多依赖仿真和合成数据；企业部署 Physical AI 的门槛下降，但算力和数据闭环更重要。

4. NVIDIA 强化美国本土 AI 基础设施与制造叙事

发生了什么：NVIDIA 更新“Build in America”进展，提到参与 NSF 州和区域 AI 基础设施枢纽项目，以及 Wistron 在美国得州工厂生产 GB300、准备生产 Vera Rubin。

为什么重要：AI 竞争不只在模型，也在芯片、封装、整机、算力、电力和供应链。美国正在把 AI 基础设施建设上升到产业政策层面。

可能影响：AI 算力供应链本土化会继续加速；数据中心、电力、液冷、制造就业会成为科技投资重点。

5. 中国央企 AI 进入体系化落地阶段（非今日新增，作为国内主线跟踪）

发生了什么：国务院国资委在 2026 世界人工智能大会期间发布第二批央企人工智能战略性高价值场景和行业高质量数据集，上线 AI 开源“焕新社区”2.0，并启动国资央企智能软件工厂联合筑基工程。

为什么重要：中国 AI 产业重点正在从模型发布，转向央企场景、数据集、算力、开源生态和行业落地。

可能影响：能源、电网、通信、制造等央企场景会成为 AI 落地核心；行业数据集和高价值场景会影响国产大模型商业化路径。

## 实战案例

1. 普通用户：优先试“免费模型 + Think 按钮”

如果你只是日常问答、写文案、做旅行规划、整理资料，免费版 GPT‑5.6 Luna 加不限量文本聊天已经够用。遇到复杂问题，再点 Think。

2. 企业/开发者：关注 Bedrock 上的 OpenAI 模型

Amazon 已确认 GPT‑5.6 Sol、Terra、Luna 在 Amazon Bedrock GA。对企业来说，重点不是“又多一个模型入口”，而是可以把 OpenAI 模型纳入 AWS 现有权限、日志、合规、采购和成本体系。
`;

export const expectedSignals = [
  { title: 'OpenAI 披露：新模型 Astra 可能触及“关键网络安全能力”门槛', sourceProjectionRuleMatches: ['openai-youth-safety-g7-2026'], enLabel: 'OpenAI / Astra / critical cyber capability evaluation', zhEvidence: '来源条目 1：OpenAI 披露：新模型 Astra 可能触及“关键网络安全能力”门槛', requiredTokens: ['Astra', 'Preparedness Framework', 'Critical cybersecurity'] },
  { title: 'ChatGPT 更新 GPT‑5.6 Sol，并扩大免费用户能力', sourceProjectionRuleMatches: ['openai-chatgpt-model-picker-2026'], enLabel: 'OpenAI / GPT-5.6 / Sol-Luna ChatGPT update', zhEvidence: '来源条目 2：ChatGPT 更新 GPT‑5.6 Sol，并扩大免费用户能力', requiredTokens: ['GPT‑5.6 Sol', 'GPT‑5.6 Luna', 'Think 按钮'] },
  { title: 'NVIDIA 推进开放世界模型，强调 Physical AI', sourceProjectionRuleMatches: ['nvidia-cosmos-3-physical-ai-2026'], enLabel: 'NVIDIA / Cosmos / GTC / compute infrastructure', zhEvidence: '来源条目 3：NVIDIA 推进开放世界模型，强调 Physical AI', requiredTokens: ['Cosmos 3', '开放物理 AI 基础模型', '仿真'] },
  { title: 'NVIDIA 强化美国本土 AI 基础设施与制造叙事', sourceProjectionRuleMatches: ['nvidia-ai-cloud-ecosystem'], enLabel: 'US / NVIDIA / Build in America AI infrastructure', zhEvidence: '来源条目 4：NVIDIA 强化美国本土 AI 基础设施与制造叙事', requiredTokens: ['Build in America', 'NSF', 'Wistron', 'GB300'] },
  { title: '中国央企 AI 进入体系化落地阶段（非今日新增，作为国内主线跟踪）', sourceProjectionRuleMatches: ['china-national-data-administration-embodied-ai'], enLabel: 'China / SASAC / central enterprise AI deployment', zhEvidence: '来源条目 5：中国央企 AI 进入体系化落地阶段（非今日新增，作为国内主线跟踪）', requiredTokens: ['国务院国资委', '第二批央企人工智能战略性高价值场景', '焕新社区', '智能软件工厂'] },
];

export const bannedFallbackPhrases = [
  'The source tracks model capability update',
  'The source tracks compute infrastructure',
  'giving the daily brief a named actor and deployment context',
  'buyers must check access control, infrastructure availability, operational risk',
  'today AI / technology daily not generated',
  '今日 AI / 科技日报暂未生成',
  '-…',
  '...',
];

export const requiredEnglishOutputs = [
  '### 1. OpenAI / Astra / critical cyber capability evaluation',
  '### 2. OpenAI / GPT-5.6 / Sol-Luna ChatGPT update',
  '### 3. NVIDIA / Cosmos / GTC / compute infrastructure',
  '### 4. US / NVIDIA / Build in America AI infrastructure',
  '### 5. China / SASAC / central enterprise AI deployment',
  'Evidence item 1: OpenAI / Astra / critical cyber capability evaluation',
  'Evidence item 5: China / SASAC / central enterprise AI deployment',
  '## Today’s Bottom Line',
  '## What to Watch Tomorrow',
  '## Evidence Matrix',
];

export const requiredZhOutputs = [
  'OpenAI 披露：新模型 Astra 可能触及“关键网络安全能力”门槛',
  'ChatGPT 更新 GPT‑5.6 Sol，并扩大免费用户能力',
  'NVIDIA 推进开放世界模型，强调 Physical AI',
  'NVIDIA 强化美国本土 AI 基础设施与制造叙事',
  '中国央企 AI 进入体系化落地阶段（非今日新增，作为国内主线跟踪）',
  '普通用户：优先试“免费模型 + Think 按钮”',
  '企业/开发者：关注 Bedrock 上的 OpenAI 模型',
  '## 今日结论',
  '## 明日跟踪点',
  '## 证据矩阵',
  '来源条目 1：OpenAI 披露：新模型 Astra 可能触及“关键网络安全能力”门槛',
  '来源条目 5：中国央企 AI 进入体系化落地阶段（非今日新增，作为国内主线跟踪）',
];

export const caseLevelFaqSignals = [
  {
    label: 'Astra critical cyber evaluation release gate',
    practicalCaseMatchTerms: ['网络安全', '第三方评测', '模型发布'],
    sourceStoryMatchTerms: ['Astra', 'Preparedness Framework', 'Critical cybersecurity'],
    requiredTerms: ['cyber-evaluation sandbox', 'tool access scope', 'release gate'],
    links: ['/en/blog/openclaw-security-hardening-2026/', '/en/blog/openclaw-model-fallback-strategy/'],
  },
  {
    label: 'ChatGPT free-tier Think workflow triage',
    practicalCaseMatchTerms: ['免费模型', 'Think 按钮', '日常问答'],
    sourceStoryMatchTerms: ['GPT‑5.6 Sol', 'GPT‑5.6 Luna', 'Think 按钮'],
    requiredTerms: ['free-tier triage', 'think-button escalation', 'quality review'],
    links: ['/en/blog/what-is-openclaw/', '/en/blog/openclaw-model-fallback-strategy/'],
  },
  {
    label: 'NVIDIA Build in America capacity watch',
    practicalCaseMatchTerms: ['Bedrock', '权限', '合规'],
    sourceStoryMatchTerms: ['Build in America', 'Wistron', 'GB300'],
    requiredTerms: ['regional compute access', 'manufacturing capacity', 'procurement timing'],
    links: ['/en/blog/openclaw-vps-cost-comparison-2026/', '/en/blog/openclaw-vps-deployment-complete-guide/'],
  },
  {
    label: 'Central enterprise AI dataset deployment watch',
    practicalCaseMatchTerms: ['央企', '数据集', '智能软件工厂'],
    sourceStoryMatchTerms: ['国务院国资委', '高价值场景', '焕新社区'],
    requiredTerms: ['scenario dataset', 'software-factory standard', 'procurement path'],
    links: ['/en/blog/what-is-openclaw/', '/en/blog/openclaw-security-hardening-2026/'],
  },
];

export const parserGuardrails = {
  story1RequiredDetailTokens: ['Astra', 'Preparedness Framework', 'Critical cybersecurity'],
  story1ForbiddenDetailTokens: ['GPT‑5.6 Sol', 'Cosmos 3', 'Wistron', '国务院国资委'],
  story2RequiredDetailTokens: ['GPT‑5.6 Sol', 'GPT‑5.6 Luna', 'Think 按钮'],
  story2ForbiddenDetailTokens: ['Astra', 'Cosmos 3', 'Wistron', '国务院国资委'],
  story3RequiredDetailTokens: ['Cosmos 3', '开放物理 AI 基础模型', '仿真'],
  story3ForbiddenDetailTokens: ['Astra', 'GPT‑5.6 Sol', 'Wistron', '国务院国资委'],
  story4RequiredDetailTokens: ['Build in America', 'NSF', 'Wistron', 'GB300'],
  story4ForbiddenDetailTokens: ['Astra', 'GPT‑5.6 Sol', 'Cosmos 3', '国务院国资委'],
  story5RequiredDetailTokens: ['国务院国资委', '第二批央企人工智能战略性高价值场景', '焕新社区'],
  story5ForbiddenDetailTokens: ['Astra', 'GPT‑5.6 Sol', 'Cosmos 3', 'Wistron'],
};
