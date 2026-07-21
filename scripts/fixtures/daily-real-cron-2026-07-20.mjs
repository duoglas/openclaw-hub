export const fixtureDate = '2026-07-20';

export const realCronFixture = `《AI、科技日报》  
2026-07-20 07:30

## 今日要闻（5条）

1. 中国在上海推动 AI 全球治理框架与国际组织建设

发生了什么：  
2026 世界人工智能大会暨人工智能全球治理高级别会议 7 月 17 日至 20 日在上海举行。官方消息称，会议期间签署《关于成立世界人工智能合作组织的协定》，总部将设在上海。

为什么重要：  
这是 AI 治理从“各国各管”走向“多边协调”的明显信号。中国把重点放在全球南方、能力建设、开源开放、标准协同和安全治理上。

可能影响：  
后续可能影响跨境 AI 标准、数据流动、模型安全评估、国际合作项目，以及中国 AI 企业出海的规则环境。

2. WAIC 主席声明明确提到“智能体”治理

发生了什么：  
主席声明提出，智能体是 AI 产品和服务的新形态，应明确决策权限和行为边界，建立行为追溯和风险提示机制，提升智能体内生安全能力。

为什么重要：  
这说明监管视角已经不只盯“大模型内容生成”，而是开始盯“能执行任务的 AI Agent”。

可能影响：  
企业做智能体产品时，后续可能需要补齐日志追踪、权限控制、风险提示、可审计链路。普通用户会看到更多“授权确认”“操作边界”“敏感动作拦截”。

3. NVIDIA 把“后训练”定义为 Agentic AI 的核心算力负载

发生了什么：  
NVIDIA 7 月 17 日发文称，智能体模型需要持续后训练，因为工具、环境、边界条件会不断变化。文章强调“intelligence per dollar”将成为衡量 AI 基础设施的新指标。

为什么重要：  
过去行业更关注预训练和推理成本，现在 NVIDIA 明确把强化学习、持续后训练、生产反馈循环推到前台。

可能影响：  
AI 算力需求不会只来自“训练一个大模型”，而会来自长期、反复、自动化的后训练循环。对 GPU、网络、数据中心、企业 AI 平台都是利好，但也会推高算力预算压力。

4. Google Gemini Interactions API 转向 Agent-first

发生了什么：  
Google 官方称 Interactions API 已成为 Gemini 模型和智能体的主要接口，并支持服务端状态、后台执行、工具组合、Managed Agents、Deep Research 升级等能力。

为什么重要：  
这代表大模型 API 正从“输入 prompt、返回文本”转向“长期任务、工具调用、状态管理、远程沙箱”。

可能影响：  
开发者以后构建 AI 应用，会更多围绕 Agent 工作流设计，而不是单次聊天接口。传统 RPA、数据分析、研究助手、代码生成工具都会被重构。

5. Apple 加码美国芯片供应链，与 Broadcom 扩大合作

发生了什么：  
Apple 7 月 8 日宣布与 Broadcom 达成新的多年承诺，预计金额超过 300 亿美元，将生产超过 150 亿颗美国制造芯片，覆盖定制硅组件和无线连接技术。

为什么重要：  
虽然不是纯 AI 模型新闻，但这是科技产业链的重要信号：核心芯片、无线连接、定制硅继续向本土化和长期供应链绑定移动。

可能影响：  
对 Apple 设备生态、美国半导体制造、本土供应链都有支撑。中长期看，AI 终端能力也依赖这类定制芯片和连接技术升级。

## 实战案例（1-2个）

1. 用 Google Interactions API 做长任务 Agent

可落地场景：  
让 Agent 在远程环境里跑长时间任务，比如分析代码仓库、生成报告、调用搜索、运行代码、连接远程 MCP 服务。

价值：  
不用一直保持 HTTP 连接。任务可以后台跑，应用只需要拿 ID 查询状态或恢复进度。

适合谁：  
开发者、数据分析团队、内部自动化团队。

2. NVIDIA 提到的持续后训练工作流

可落地场景：  
企业把生产环境中的失败案例、边界问题、工具变更反馈回模型，持续做强化学习或偏好优化。

价值：  
智能体不是“一次训练完就结束”，而是像软件一样持续迭代。

适合谁：  
有大量真实任务数据的 AI 公司、客服/代码/金融/工业智能体团队。
`;

export const expectedSignals = [
  { title: '中国在上海推动 AI 全球治理框架与国际组织建设', sourceProjectionRuleMatches: ['china-world-ai-cooperation-organization-2026'], enLabel: 'China / WAICO / AI governance coordination', zhEvidence: '来源条目 1：中国在上海推动 AI 全球治理框架与国际组织建设', requiredTokens: ['世界人工智能合作组织', '总部将设在上海', '全球南方'] },
  { title: 'WAIC 主席声明明确提到“智能体”治理', sourceProjectionRuleMatches: ['china-world-ai-cooperation-organization-2026'], enLabel: 'China / WAIC / agent governance boundaries', zhEvidence: '来源条目 2：WAIC 主席声明明确提到“智能体”治理', requiredTokens: ['智能体是 AI 产品和服务的新形态', '决策权限和行为边界', '行为追溯和风险提示机制'] },
  { title: 'NVIDIA 把“后训练”定义为 Agentic AI 的核心算力负载', sourceProjectionRuleMatches: ['nvidia-agentic-post-training-infrastructure-2026'], enLabel: 'NVIDIA / post-training / agentic AI infrastructure', zhEvidence: '来源条目 3：NVIDIA 把“后训练”定义为 Agentic AI 的核心算力负载', requiredTokens: ['后训练', 'intelligence per dollar', '生产反馈循环'] },
  { title: 'Google Gemini Interactions API 转向 Agent-first', sourceProjectionRuleMatches: ['google-gemini-interactions-api-agent-runtime-2026'], enLabel: 'Google / Gemini Interactions API / agent-first runtime', zhEvidence: '来源条目 4：Google Gemini Interactions API 转向 Agent-first', requiredTokens: ['Interactions API', '服务端状态', 'Managed Agents'] },
  { title: 'Apple 加码美国芯片供应链，与 Broadcom 扩大合作', sourceProjectionRuleMatches: ['apple-broadcom-us-chip-supply-chain-2026'], enLabel: 'Apple / Broadcom / US chip supply chain', zhEvidence: '来源条目 5：Apple 加码美国芯片供应链，与 Broadcom 扩大合作', requiredTokens: ['Broadcom', '超过 300 亿美元', '超过 150 亿颗美国制造芯片'] },
];

export const bannedFallbackPhrases = [
  'The source tracks agent platform, model capability update',
  'giving the daily brief a named actor and deployment context',
  'buyers must check access control, infrastructure availability, operational risk',
  'NVIDIA said Cadence, Dassault Systèmes, Siemens, Synopsys',
  'NemoClaw / OpenShell',
  'today AI / technology daily not generated',
  '今日 AI / 科技日报暂未生成',
  '-…',
  '...',
];

export const requiredEnglishOutputs = [
  '### 1. China / WAICO / AI governance coordination',
  '### 2. China / WAIC / agent governance boundaries',
  '### 3. NVIDIA / post-training / agentic AI infrastructure',
  '### 4. Google / Gemini Interactions API / agent-first runtime',
  '### 5. Apple / Broadcom / US chip supply chain',
  'plans to advance global AI governance cooperation',
  'calling for clear decision authority, behavior boundaries, traceability, risk prompts',
  'agentic AI requires continuous post-training rather than a one-time train-and-serve cycle',
  'server-side state, background execution, tool composition, Managed Agents',
  'more than 30 billion USD and more than 15 billion US-made chips',
  'Evidence item 1: China / WAICO / AI governance coordination',
  'Evidence item 5: Apple / Broadcom / US chip supply chain',
  '## Today’s Bottom Line',
  '## What to Watch Tomorrow',
  '## Evidence Matrix',
];

export const requiredZhOutputs = [
  '中国在上海推动 AI 全球治理框架与国际组织建设',
  'WAIC 主席声明明确提到“智能体”治理',
  'NVIDIA 把“后训练”定义为 Agentic AI 的核心算力负载',
  'Google Gemini Interactions API 转向 Agent-first',
  'Apple 加码美国芯片供应链，与 Broadcom 扩大合作',
  '用 Google Interactions API 做长任务 Agent',
  'NVIDIA 提到的持续后训练工作流',
  '## 今日结论',
  '## 明日跟踪点',
  '## 证据矩阵',
  '来源条目 1：中国在上海推动 AI 全球治理框架与国际组织建设',
  '来源条目 5：Apple 加码美国芯片供应链，与 Broadcom 扩大合作',
];

export const caseLevelFaqSignals = [
  {
    label: 'Gemini Interactions API agent runtime',
    practicalCaseMatchTerms: ['Google Interactions API', '长任务 Agent', '远程 MCP'],
    sourceStoryMatchTerms: ['Interactions API', '服务端状态', 'Managed Agents'],
    requiredTerms: ['Interactions API', 'background execution', 'state recovery'],
    links: ['/en/blog/what-is-openclaw/', '/en/blog/openclaw-vps-deployment-complete-guide/'],
  },
  {
    label: 'agentic post-training loop',
    practicalCaseMatchTerms: ['持续后训练', '生产环境', '反馈回模型'],
    sourceStoryMatchTerms: ['后训练', 'intelligence per dollar', '生产反馈循环'],
    requiredTerms: ['post-training', 'production feedback', 'intelligence per dollar'],
    links: ['/en/blog/openclaw-model-fallback-strategy/', '/en/blog/what-is-openclaw/'],
  },
];

export const parserGuardrails = {
  story1RequiredDetailTokens: ['世界人工智能合作组织', '总部将设在上海', '全球南方'],
  story1ForbiddenDetailTokens: ['决策权限和行为边界', 'Interactions API', 'Broadcom'],
  story2RequiredDetailTokens: ['智能体是 AI 产品和服务的新形态', '决策权限和行为边界', '行为追溯和风险提示机制'],
  story2ForbiddenDetailTokens: ['Broadcom', 'intelligence per dollar', 'Managed Agents'],
  story3RequiredDetailTokens: ['后训练', 'intelligence per dollar', '生产反馈循环'],
  story3ForbiddenDetailTokens: ['Broadcom', '总部将设在上海', 'Interactions API'],
  story4RequiredDetailTokens: ['Interactions API', '服务端状态', 'Managed Agents'],
  story4ForbiddenDetailTokens: ['Broadcom', '世界人工智能合作组织', '后训练'],
  story5RequiredDetailTokens: ['Broadcom', '超过 300 亿美元', '超过 150 亿颗美国制造芯片'],
  story5ForbiddenDetailTokens: ['Managed Agents', '行为追溯', 'intelligence per dollar'],
};
