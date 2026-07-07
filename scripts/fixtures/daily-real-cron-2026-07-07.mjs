export const fixtureDate = '2026-07-07';

export const realCronFixture = `《AI、科技日报》  
2026-07-07 早报

## 今日要闻（5条）

1. NVIDIA：开放模型正在成为 AI 研究基础设施

发生了什么：NVIDIA 称，ICML 2026 中其有 74 篇论文被接收，约 2000 篇论文引用 NVIDIA GPU，145 篇引用 Nemotron；Cosmos、GR00T、BioNeMo 等开放模型也被用于机器人、自动驾驶、生命科学等方向。

为什么重要：AI 研究不再只拼单个大模型，而是在拼“开放模型 + 数据集 + 工具链 + 推理基础设施”。

可能影响：开源/开放权重模型会继续挤压闭源模型的研究壁垒，机器人、药物发现、自动驾驶会更依赖可复现的开放 AI 栈。

---

2. NVIDIA：主权 AI / 国家 AI 基础设施继续升温

发生了什么：NVIDIA 发布文章，强调各国正在建设本地 AI 能力，包括本地算力、本地数据、基础模型、人才体系和 AI 工厂。

为什么重要：AI 正从“企业工具”变成“国家级基础设施”。算力、数据、模型治理会越来越本地化。

可能影响：中国、欧洲、印度、中东等市场会继续推动本地 AI 云、行业模型、政务 AI；普通企业未来可能面对更多区域合规和数据驻留要求。

---

3. AWS：前沿模型上云的重点转向“安全发布”

发生了什么：AWS 官方博客称，Amazon Bedrock 会在提供最新模型的同时强调企业级安全、隐私和防滥用机制，并提到 Anthropic Claude Fable 5 模型重新可用于 Bedrock 客户，同时企业访问依赖 AWS 身份、网络隔离、审计和加密控制。

为什么重要：大模型平台竞争不只是“谁模型强”，还包括谁能让企业安全、快速、合规地上线模型。

可能影响：企业采购 AI 服务时，会更关注模型权重保护、访问控制、滥用防护和上线流程，而不只是榜单分数。

---

4. Anthropic：Claude Fable 5 全球回归，并推动越狱严重度评分框架

发生了什么：Anthropic 新闻页显示，Fable 5 于 7 月 1 日全球回归；同时 Anthropic 与 Amazon、Microsoft、Google 等伙伴提出行业级 jailbreak 严重度评分框架。

为什么重要：模型安全正在从“各家自说自话”走向更标准化的风险分级。越狱攻击如果能统一评分，企业评估模型会更可比较。

可能影响：未来模型上线、安全评测、合规审查可能会引入类似 CVSS 的 AI 安全评分体系。

---

5. 中国：深圳机器人产业加速走向消费级和场景化

发生了什么：新华社报道，深圳南山区“机器人谷”正在形成产业集聚；消费级外骨骼企业极壳科技已在全球 70 多个国家拥有数万名用户。报道还称，2025 年深圳机器人产业总产值达 2426 亿元。

为什么重要：机器人不再只停留在工业产线，正在进入养老、户外、康复、消费辅助等真实场景。

可能影响：中国具身智能和机器人产业会继续沿着“供应链完整 + 场景开放 + 消费化产品”路线加速落地。

---

## 实战案例（2个）

1. OpenAI 简化 ChatGPT 模型选择器

发生了什么：OpenAI 版本说明显示，ChatGPT 模型选择器被简化为 Instant、Medium、High、Extra High、Pro Standard、Pro Extended 等选项，并向 Plus / Pro 用户推出。

价值：普通用户不需要理解复杂模型名，只需要按速度、推理深度和成本选择。

---

2. 深圳外骨骼机器人从实验室走向大众市场

发生了什么：新华社报道，深圳消费级外骨骼产品已用于户外作业、户外运动和银发人群辅助。

价值：具身智能最现实的落地方向之一，不一定先做全能人形机器人，而是先做能增强人体能力的单点产品。
`;

export const expectedSignals = [
  { title: 'NVIDIA：开放模型正在成为 AI 研究基础设施', sourceProjectionRuleMatches: ['nvidia-icml-open-models-robotics-research-2026'], enLabel: 'NVIDIA / ICML / open model research infrastructure', zhEvidence: '来源条目 1：NVIDIA：开放模型正在成为 AI 研究基础设施', requiredTokens: ['ICML 2026', '约 2000 篇论文引用 NVIDIA GPU', '145 篇引用 Nemotron'] },
  { title: 'NVIDIA：主权 AI / 国家 AI 基础设施继续升温', sourceProjectionRuleMatches: ['nvidia-ai-cloud-ecosystem'], enLabel: 'NVIDIA / sovereign AI / national AI infrastructure', zhEvidence: '来源条目 2：NVIDIA：主权 AI / 国家 AI 基础设施继续升温', requiredTokens: ['本地 AI 能力', '本地算力', 'AI 工厂'] },
  { title: 'AWS：前沿模型上云的重点转向“安全发布”', sourceProjectionRuleMatches: ['openai-amazon-bedrock-models'], enLabel: 'AWS / Amazon / Bedrock / model capability update', zhEvidence: '来源条目 3：AWS：前沿模型上云的重点转向“安全发布”', requiredTokens: ['Amazon Bedrock', 'AWS 身份', '网络隔离'] },
  { title: 'Anthropic：Claude Fable 5 全球回归，并推动越狱严重度评分框架', sourceProjectionRuleMatches: ['anthropic-fable-jailbreak-severity-framework-2026'], enLabel: 'Anthropic / Claude Fable / jailbreak severity framework', zhEvidence: '来源条目 4：Anthropic：Claude Fable 5 全球回归，并推动越狱严重度评分框架', requiredTokens: ['Fable 5 于 7 月 1 日全球回归', 'jailbreak 严重度评分框架'] },
  { title: '中国：深圳机器人产业加速走向消费级和场景化', sourceProjectionRuleMatches: ['xinhua-shenzhen-robotics-consumer-deployment-2026'], enLabel: 'Xinhua / Shenzhen / consumer robotics deployment', zhEvidence: '来源条目 5：中国：深圳机器人产业加速走向消费级和场景化', requiredTokens: ['深圳南山区“机器人谷”', '极壳科技', '2426 亿元'] },
];

export const bannedFallbackPhrases = [
  'The source tracks robotics deployment, open-source model ecosystem, model capability update, data infrastructure around NVIDIA, ICML, GPU, Nemotron',
  'The source tracks compute infrastructure, model capability update, enterprise AI rollout, data infrastructure around China, Europe, NVIDIA',
  'The source tracks robotics deployment, embodied AI, enterprise AI rollout around Xinhua, China',
  'giving the daily brief a named actor and deployment context',
  'buyers must check access control, infrastructure availability, operational risk',
  'today AI / technology daily not generated',
  '今日 AI / 科技日报暂未生成',
  '-…',
  '...',
];

export const requiredEnglishOutputs = [
  '### 1. NVIDIA / ICML / open model research infrastructure',
  '### 2. NVIDIA / sovereign AI / national AI infrastructure',
  '### 3. AWS / Amazon / Bedrock / model capability update',
  '### 4. Anthropic / Claude Fable / jailbreak severity framework',
  '### 5. Xinhua / Shenzhen / consumer robotics deployment',
  'NVIDIA said ICML 2026 accepted 74 NVIDIA papers',
  'NVIDIA said sovereign AI infrastructure is expanding around local compute, local data, foundation models, talent systems, AI factories, and regional AI cloud capacity',
  'AWS made GPT-5.5, GPT-5.4, and Codex available in Amazon Bedrock',
  'Anthropic said Claude Fable 5 returned globally on July 1',
  'Xinhua reported that Shenzhen Nanshan Robotics Valley is forming a robotics cluster',
  'Evidence item 1: NVIDIA / ICML / open model research infrastructure',
  'Evidence item 5: Xinhua / Shenzhen / consumer robotics deployment',
  '## Today’s Bottom Line',
  '## What to Watch Tomorrow',
  '## Evidence Matrix',
];

export const requiredZhOutputs = [
  'NVIDIA：开放模型正在成为 AI 研究基础设施',
  'NVIDIA：主权 AI / 国家 AI 基础设施继续升温',
  'AWS：前沿模型上云的重点转向“安全发布”',
  'Anthropic：Claude Fable 5 全球回归，并推动越狱严重度评分框架',
  '中国：深圳机器人产业加速走向消费级和场景化',
  'OpenAI 简化 ChatGPT 模型选择器',
  '深圳外骨骼机器人从实验室走向大众市场',
  '## 今日结论',
  '## 明日跟踪点',
  '## 证据矩阵',
  '来源条目 1：NVIDIA：开放模型正在成为 AI 研究基础设施',
  '来源条目 5：中国：深圳机器人产业加速走向消费级和场景化',
];

export const caseLevelFaqSignals = [
  {
    label: 'ChatGPT model selector',
    practicalCaseMatchTerms: ['OpenAI 简化 ChatGPT 模型选择器', 'ChatGPT 模型选择器'],
    sourceStoryMatchTerms: ['Instant', 'Pro Extended'],
    requiredTerms: ['ChatGPT model selector', 'Instant', 'Pro Extended'],
    links: ['/en/blog/openclaw-model-fallback-strategy/', '/en/blog/what-is-openclaw/'],
  },
  {
    label: 'Shenzhen consumer robotics deployment',
    practicalCaseMatchTerms: ['深圳外骨骼机器人', '大众市场', '银发人群辅助'],
    sourceStoryMatchTerms: ['极壳科技', '70 多个国家', '2426 亿元'],
    requiredTerms: ['consumer robotics', 'exoskeleton', 'safety validation'],
    links: ['/en/blog/what-is-openclaw/', '/en/blog/openclaw-vps-deployment-complete-guide/'],
  },
];

export const parserGuardrails = {
  story1RequiredDetailTokens: ['ICML 2026', '约 2000 篇论文引用 NVIDIA GPU', '145 篇引用 Nemotron'],
  story1ForbiddenDetailTokens: ['AI 工厂', 'Amazon Bedrock', 'Fable 5', '机器人谷'],
  story2RequiredDetailTokens: ['本地 AI 能力', '本地算力', 'AI 工厂'],
  story2ForbiddenDetailTokens: ['ICML 2026', 'Amazon Bedrock', 'Fable 5', '机器人谷'],
  story3RequiredDetailTokens: ['Amazon Bedrock', 'AWS 身份', '网络隔离'],
  story3ForbiddenDetailTokens: ['ICML 2026', 'jailbreak 严重度', '机器人谷'],
  story4RequiredDetailTokens: ['Fable 5 于 7 月 1 日全球回归', 'jailbreak 严重度评分框架'],
  story4ForbiddenDetailTokens: ['Amazon Bedrock', 'ICML 2026', '机器人谷'],
  story5RequiredDetailTokens: ['深圳南山区“机器人谷”', '70 多个国家', '2426 亿元'],
  story5ForbiddenDetailTokens: ['ICML 2026', 'Amazon Bedrock', 'Claude Fable 5'],
};
