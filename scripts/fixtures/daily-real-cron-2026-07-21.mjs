export const fixtureDate = '2026-07-21';

export const realCronFixture = `《AI、科技日报》  
2026-07-21 07:30

## 今日要闻（5条）

1. NVIDIA + Hugging Face 把机器人基础模型接入 LeRobot

发生了什么：
NVIDIA 宣布与 Hugging Face 合作，把 Isaac GR00T 1.7、Isaac Teleop 接入开源机器人库 LeRobot，并计划后续接入 Cosmos 3。

为什么重要：
机器人开发正在走向“开源模型 + 数据 + 仿真 + 部署流程”一体化，门槛会明显下降。

可能影响：
开发者和中小团队更容易做机器人原型；具身智能会从大厂实验室进一步外溢到开源社区。

2. NVIDIA 强调 Agentic AI 需要新型数据中心 CPU

发生了什么：
NVIDIA 发布文章，提出 Vera 这类“高单线程性能、可规模化”的 CPU，更适合智能体工作负载。AI 智能体不只是调用大模型，还要执行工具、跑代码、处理数据、管理缓存。

为什么重要：
CPU 会成为推理链路瓶颈，智能体基础设施不能只看 GPU 吞吐。

可能影响：
未来 AI 数据中心采购不只看 GPU，CPU、内存带宽、低延迟调度会变得更关键。

3. Claude 在 Microsoft Foundry / Azure 上进入可用阶段

发生了什么：
NVIDIA 官方文章称，Anthropic Claude 模型已在 Microsoft Foundry 上一般可用，并运行在 Azure 的 NVIDIA GB300 Blackwell Ultra GPU 上。

为什么重要：
企业客户可以在 Azure 原生环境中使用 Claude 构建智能体和垂直业务应用。

可能影响：
Claude 的企业分发渠道变强；微软、NVIDIA、Anthropic 的企业 AI 生态绑定更深。

4. 中国 AI 产业链开始集中讨论“词元降本”

发生了什么：
新华网报道，WAIC 2026 上，从芯片、算电协同、大模型、缓存计费到模型路由，产业链都在围绕降低 token 成本发力。报道提到 TPU、算电协同、缓存 token 免费、智能模型路由等方向。

为什么重要：
AI 商业化的瓶颈正在从“能不能用”转向“能不能低成本规模化用”。

可能影响：
企业选型会更看重单位任务成本，而不是单纯看模型榜单；模型路由、缓存、算力调度会成为 AI 应用基础设施。

5. 智能体安全成为 WAIC 重点议题

发生了什么：
新华网报道，WAIC 2026 上多位专家讨论智能体安全，关注点从“模型输出什么”转向“AI 会做什么”。报道提到前沿 AI 风险监测平台、测评基准、运行期审计和响应能力。

为什么重要：
智能体会调用工具、访问系统、执行任务，风险不再只是幻觉答案，而是权限、流程和真实行动失控。

可能影响：
企业部署智能体时，会更重视身份识别、权限控制、行为审计、异常监测和实时响应。

## 实战案例（1-2个）

1. 企业智能体成本优化：模型路由 + 缓存 + 预算护栏

可借鉴点：
简单任务走轻量模型；高风险步骤多模型交叉验证；高频上下文用缓存，减少重复 token；给每类任务设置预算上限和失败回退。

适合谁：
客服、运营、数据分析、内部知识库问答、代码辅助团队。

2. 企业部署 Claude 类模型：优先选已有云环境集成

可借鉴点：
如果企业已在 Azure 上，Claude 进入 Foundry 后可降低采购和合规接入成本。重点不是“换一个聊天机器人”，而是把模型接入身份、权限、日志、数据和工具系统。

适合谁：
已有云基础设施、需要合规审计、想做内部智能体的企业。
`;

export const expectedSignals = [
  { title: 'NVIDIA + Hugging Face 把机器人基础模型接入 LeRobot', sourceProjectionRuleMatches: ['nvidia-cosmos-3-physical-ai-2026', 'nvidia-physical-ai-agent-skills-2026'], enLabel: 'NVIDIA / Hugging Face / LeRobot robotics ecosystem', zhEvidence: '来源条目 1：NVIDIA + Hugging Face 把机器人基础模型接入 LeRobot', requiredTokens: ['Isaac GR00T 1.7', 'Isaac Teleop', 'Hugging Face', 'Cosmos 3'] },
  { title: 'NVIDIA 强调 Agentic AI 需要新型数据中心 CPU', sourceProjectionRuleMatches: ['nvidia-vera-agentic-cpu-infrastructure-2026'], enLabel: 'NVIDIA / Vera CPU / agentic AI infrastructure', zhEvidence: '来源条目 2：NVIDIA 强调 Agentic AI 需要新型数据中心 CPU', requiredTokens: ['Vera', '高单线程性能', '工具', '代码', '缓存'] },
  { title: 'Claude 在 Microsoft Foundry / Azure 上进入可用阶段', sourceProjectionRuleMatches: ['anthropic-claude-azure-gb300-foundry-2026'], enLabel: 'Anthropic / Claude / Azure GB300 deployment', zhEvidence: '来源条目 3：Claude 在 Microsoft Foundry / Azure 上进入可用阶段', requiredTokens: ['Microsoft Foundry', 'Azure', 'GB300 Blackwell Ultra'] },
  { title: '中国 AI 产业链开始集中讨论“词元降本”', sourceProjectionRuleMatches: ['china-waic-token-cost-optimization-2026'], enLabel: 'China / WAIC / token cost optimization', zhEvidence: '来源条目 4：中国 AI 产业链开始集中讨论“词元降本”', requiredTokens: ['词元降本', '缓存 token 免费', '智能模型路由'] },
  { title: '智能体安全成为 WAIC 重点议题', sourceProjectionRuleMatches: ['china-waic-agent-safety-evaluation-2026'], enLabel: 'China / WAIC / agent safety evaluation', zhEvidence: '来源条目 5：智能体安全成为 WAIC 重点议题', requiredTokens: ['智能体安全', '前沿 AI 风险监测平台', '运行期审计'] },
];

export const bannedFallbackPhrases = [
  'The source tracks compute infrastructure, AI chip supply',
  'The source tracks agent platform, model capability update',
  'giving the daily brief a named actor and deployment context',
  'buyers must check access control, infrastructure availability, operational risk',
  'today AI / technology daily not generated',
  '今日 AI / 科技日报暂未生成',
  '-…',
  '...',
];

export const requiredEnglishOutputs = [
  '### 1. NVIDIA / Hugging Face / LeRobot robotics ecosystem',
  '### 2. NVIDIA / Vera CPU / agentic AI infrastructure',
  '### 3. Anthropic / Claude / Azure GB300 deployment',
  '### 4. China / WAIC / token cost optimization',
  '### 5. China / WAIC / agent safety evaluation',
  'reduce token costs across chips, compute-power coordination, large models, cache pricing',
  'risk-monitoring platforms, evaluation benchmarks, runtime audit',
  'model routing, cached-token policy, lightweight-model fallback',
  'identity checks, scoped permissions, behavior logs',
  'Evidence item 4: China / WAIC / token cost optimization',
  'Evidence item 5: China / WAIC / agent safety evaluation',
  '## Today’s Bottom Line',
  '## What to Watch Tomorrow',
  '## Evidence Matrix',
];

export const requiredZhOutputs = [
  'NVIDIA + Hugging Face 把机器人基础模型接入 LeRobot',
  'NVIDIA 强调 Agentic AI 需要新型数据中心 CPU',
  'Claude 在 Microsoft Foundry / Azure 上进入可用阶段',
  '中国 AI 产业链开始集中讨论“词元降本”',
  '智能体安全成为 WAIC 重点议题',
  '企业智能体成本优化：模型路由 + 缓存 + 预算护栏',
  '企业部署 Claude 类模型：优先选已有云环境集成',
  '## 今日结论',
  '## 明日跟踪点',
  '## 证据矩阵',
  '来源条目 4：中国 AI 产业链开始集中讨论“词元降本”',
  '来源条目 5：智能体安全成为 WAIC 重点议题',
];

export const caseLevelFaqSignals = [
  {
    label: 'WAIC token cost optimization',
    practicalCaseMatchTerms: ['模型路由', '缓存', '预算护栏'],
    sourceStoryMatchTerms: ['词元降本', '缓存 token 免费', '智能模型路由'],
    requiredTerms: ['token cost', 'model routing', 'cached-token policy'],
    links: ['/en/blog/openclaw-model-fallback-strategy/', '/en/blog/what-is-openclaw/'],
  },
  {
    label: 'WAIC agent safety evaluation',
    practicalCaseMatchTerms: ['权限', '日志', '工具系统'],
    sourceStoryMatchTerms: ['智能体安全', '前沿 AI 风险监测平台', '运行期审计'],
    requiredTerms: ['agent safety', 'runtime audit', 'scoped permissions'],
    links: ['/en/blog/openclaw-vps-deployment-complete-guide/', '/en/blog/what-is-openclaw/'],
  },
  {
    label: 'Claude cloud governance deployment',
    practicalCaseMatchTerms: ['Claude 类模型', '已有云环境集成', 'Azure'],
    sourceStoryMatchTerms: ['Microsoft Foundry', 'Azure', 'GB300 Blackwell Ultra'],
    requiredTerms: ['Microsoft Foundry', 'cloud governance', 'auditability'],
    links: ['/en/blog/openclaw-vps-deployment-complete-guide/', '/en/blog/what-is-openclaw/'],
  },
];

export const parserGuardrails = {
  story1RequiredDetailTokens: ['Isaac GR00T 1.7', 'Isaac Teleop', 'Cosmos 3'],
  story1ForbiddenDetailTokens: ['词元降本', '运行期审计', 'GB300'],
  story2RequiredDetailTokens: ['Vera', '高单线程性能', '缓存'],
  story2ForbiddenDetailTokens: ['LeRobot', '词元降本', '智能体安全'],
  story3RequiredDetailTokens: ['Microsoft Foundry', 'Azure', 'GB300 Blackwell Ultra'],
  story3ForbiddenDetailTokens: ['模型路由', '运行期审计', 'LeRobot'],
  story4RequiredDetailTokens: ['词元降本', '缓存 token 免费', '智能模型路由'],
  story4ForbiddenDetailTokens: ['GB300', '运行期审计', 'LeRobot'],
  story5RequiredDetailTokens: ['智能体安全', '前沿 AI 风险监测平台', '运行期审计'],
  story5ForbiddenDetailTokens: ['缓存 token 免费', 'GB300', 'Isaac Teleop'],
};
