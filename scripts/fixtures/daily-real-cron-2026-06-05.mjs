export const fixtureDate = '2026-06-05';

export const realCronFixture = `《AI、科技日报》
截至：2026-06-05 07:30

## 今日要闻（5条）

### 1. OpenAI 给 ChatGPT 上线更实时的 Memory，并把 Lockdown Mode 开放给所有登录用户
发生了什么：OpenAI 6月4日更新 ChatGPT 版本说明：Memory 会自动保持更新，减少过时或矛盾记忆；Plus/Pro 美国用户先用，后续扩展。Lockdown Mode 也开放给所有登录用户，用来限制联网、深度研究、Agent、文件下载等高风险外部能力。

为什么重要：这是“个性化”和“安全隔离”同时推进。AI 助手越来越像长期工作伙伴，但也必须降低提示注入和数据外泄风险。

可能影响：普通用户会明显感到 ChatGPT 更懂上下文；企业和重度用户应关注 Lockdown Mode，尤其是处理敏感文件、网页资料时。

来源：OpenAI Help Center，L1，直抓已确认。

---

### 2. NVIDIA 发布 Cosmos 3，把“物理 AI”从模型能力推向机器人/自动驾驶训练平台
发生了什么：NVIDIA 在 GTC Taipei 发布 Cosmos 3，称其为开放的物理 AI 世界基础模型，支持视觉推理、世界生成、动作预测，并用于机器人、自动驾驶、视觉 AI 的合成数据和策略模型开发。

为什么重要：AI 竞争正在从“会聊天/会写代码”转向“能理解和模拟物理世界”。这直接关系机器人、自动驾驶、工业检测的训练成本和迭代速度。

可能影响：机器人和自动驾驶公司会更依赖世界模型+仿真数据；实体产业 AI 的门槛可能下降，但也会进一步绑定算力和工具链生态。

来源：NVIDIA Newsroom，L1，直抓已确认。

---

### 3. NVIDIA 开源一批 Physical AI Agent Skills，让智能体接管机器人/工厂/自动驾驶开发流程
发生了什么：NVIDIA 发布面向物理 AI 的开源 Agent 工具和 Skills，覆盖 Omniverse、Cosmos、Isaac、Metropolis、Alpamayo、Jetson 等，用来把数据生成、仿真、训练、评估、部署变成可由智能体执行的流程。

为什么重要：这不是单个模型更新，而是把“AI 编程助手”扩展到现实世界工程流程。机器人、自动驾驶、工业数字孪生的研发可能进入 agent workflow 阶段。

可能影响：工业软件、机器人公司会开始把复杂流程拆成可复用 agent 技能；未来竞争点会从“谁有模型”变成“谁有可验证、可复现的工程流程”。

来源：NVIDIA Newsroom，L1，直抓已确认。

---

### 4. 中国推动高质量数据集建设，重点支撑具身智能、AI for Science、先进制造
发生了什么：新华社报道，国家数据局局长刘烈宏表示，高质量数据集是具身智能“感知-决策-执行”的重要基础；国家数据局将推进六大行动，服务人工智能赋能产业发展。报道还提到，截至一季度，全国已建成高质量数据集超过11.6万个，总体量超过960PB。

为什么重要：中国 AI 下一阶段重点不只是大模型参数，而是行业数据、数据治理、数据集平台和场景闭环。

可能影响：工业、交通、文旅、科研等行业的数据集建设会加速；数据标注、合成数据、隐私保护、行业知识库等细分服务可能受益。

来源：新华网，L2，直抓已确认。

---

### 5. 宇树科技科创板 IPO 过会，具身智能进入资本市场主线
发生了什么：新华社报道，宇树科技科创板 IPO 申请通过上交所上市委审议。公司计划募资42.02亿元，用于智能机器人模型研发、机器人本体研发、新型产品开发和制造基地建设等。

为什么重要：人形机器人、四足机器人、具身智能从技术展示进入规模化融资和产业化验证阶段。

可能影响：国内机器人产业链关注度会继续升温，包括关节模组、传感器、控制系统、边缘算力、具身模型和制造能力。

来源：新华网，L2，直抓已确认。

## 实战案例（2个）

1. 普通用户：今天最值得打开的是 ChatGPT 的安全设置
发生了什么：Lockdown Mode 已开放给所有登录用户。
为什么重要：如果你经常让 AI 读网页、处理文件、做深度研究，外部内容可能带来提示注入风险。
可能影响：处理合同、财务、账号、代码、客户资料时，建议优先开启 Lockdown Mode 或至少减少联网能力。

2. 企业/开发者：物理 AI 正在变成“模型+仿真+Agent流程”的组合
发生了什么：NVIDIA 同时推 Cosmos 3 和 Physical AI Agent Skills。
为什么重要：机器人/自动驾驶/工业 AI 的核心不只是模型本身，而是数据生成、仿真验证、训练评估和部署闭环。
可能影响：如果团队在做机器人、工业视觉、自动驾驶仿真，应开始评估：哪些流程能交给 agent 自动执行，哪些节点必须保留人工复核，哪些指标能证明闭环安全可重复。
`;

export const expectedSignals = [
  {
    title: 'OpenAI 给 ChatGPT 上线更实时的 Memory，并把 Lockdown Mode 开放给所有登录用户',
    sourceProjectionRuleMatches: ['openai-chatgpt-memory-lockdown-2026'],
    enLabel: 'US / OpenAI / ChatGPT / agent platform',
    zhEvidence: '来源条目 1：OpenAI 给 ChatGPT 上线更实时的 Memory，并把 Lockdown Mode 开放给所有登录用户',
    requiredTokens: ['OpenAI', 'Memory', 'Lockdown Mode', 'file downloads'],
  },
  {
    title: 'NVIDIA 发布 Cosmos 3，把“物理 AI”从模型能力推向机器人/自动驾驶训练平台',
    sourceProjectionRuleMatches: ['nvidia-cosmos-3-physical-ai-2026'],
    enLabel: 'NVIDIA / Cosmos / GTC / compute infrastructure',
    zhEvidence: '来源条目 2：NVIDIA 发布 Cosmos 3，把“物理 AI”从模型能力推向机器人/自动驾驶训练平台',
    requiredTokens: ['NVIDIA', 'Cosmos 3', 'GTC Taipei', 'world foundation model'],
  },
  {
    title: 'NVIDIA 开源一批 Physical AI Agent Skills，让智能体接管机器人/工厂/自动驾驶开发流程',
    sourceProjectionRuleMatches: ['nvidia-physical-ai-agent-skills-2026'],
    enLabel: 'NVIDIA / Physical / Agent / robotics deployment',
    zhEvidence: '来源条目 3：NVIDIA 开源一批 Physical AI Agent Skills，让智能体接管机器人/工厂/自动驾驶开发流程',
    requiredTokens: ['NVIDIA', 'Physical AI Agent Skills', 'Omniverse', 'Isaac'],
  },
  {
    title: '中国推动高质量数据集建设，重点支撑具身智能、AI for Science、先进制造',
    sourceProjectionRuleMatches: ['china-national-data-administration-embodied-ai'],
    enLabel: 'Xinhua / China / Science / embodied AI',
    zhEvidence: '来源条目 4：中国推动高质量数据集建设，重点支撑具身智能、AI for Science、先进制造',
    requiredTokens: ['China', 'National Data Administration', '11.6万个', '960PB'],
  },
  {
    title: '宇树科技科创板 IPO 过会，具身智能进入资本市场主线',
    sourceProjectionRuleMatches: ['unitree-star-market-ipo-2026'],
    enLabel: 'Xinhua / IPO / compute infrastructure / robotics deployment',
    zhEvidence: '来源条目 5：宇树科技科创板 IPO 过会，具身智能进入资本市场主线',
    requiredTokens: ['Unitree Robotics', 'STAR Market', '4.202 billion yuan', 'robot hardware'],
  },
];

export const bannedFallbackPhrases = [
  'Source 1 reports a model release management',
  'Source 2 reports a robotics deployment',
  'Source 3 reports a agent platform',
  'Source 4 reports a embodied AI',
  'Source 5 reports a robotics deployment',
  'This matters because OpenAI, ChatGPT',
  'The likely impact is a more specific evaluation path for NVIDIA',
  'adoption timing, infrastructure capacity, compliance exposure, or enterprise workflow readiness',
  'migration timing, partner dependency, governance review, cost exposure, and measurable rollout criteria',
  'today AI / technology daily not generated',
  '今日 AI / 科技日报暂未生成',
  '...',
];

export const requiredEnglishOutputs = [
  '### 1. US / OpenAI / ChatGPT / agent platform',
  '### 2. NVIDIA / Cosmos / GTC / compute infrastructure',
  '### 3. NVIDIA / Physical / Agent / robotics deployment',
  '### 4. Xinhua / China / Science / embodied AI',
  '### 5. Xinhua / IPO / compute infrastructure / robotics deployment',
  'OpenAI’s June 4 ChatGPT release notes say Memory can stay more up to date',
  'NVIDIA announced Cosmos 3 at GTC Taipei as an open physical AI world foundation model',
  'NVIDIA published open-source Physical AI Agent tools and skills for Omniverse',
  'more than 116,000 high-quality datasets by the first quarter, totaling over 960 PB',
  'Unitree Robotics’ STAR Market IPO application passed review',
  'Evidence item 5: Xinhua / IPO / compute infrastructure / robotics deployment',
  '## Today’s Bottom Line',
  '## What to Watch Tomorrow',
  '## Evidence Matrix',
];

export const requiredZhOutputs = [
  'OpenAI 给 ChatGPT 上线更实时的 Memory，并把 Lockdown Mode 开放给所有登录用户',
  'NVIDIA 发布 Cosmos 3，把“物理 AI”从模型能力推向机器人/自动驾驶训练平台',
  'NVIDIA 开源一批 Physical AI Agent Skills，让智能体接管机器人/工厂/自动驾驶开发流程',
  '中国推动高质量数据集建设，重点支撑具身智能、AI for Science、先进制造',
  '宇树科技科创板 IPO 过会，具身智能进入资本市场主线',
  '## 今日结论',
  '## 明日跟踪点',
  '## 证据矩阵',
  '来源条目 1：OpenAI 给 ChatGPT 上线更实时的 Memory，并把 Lockdown Mode 开放给所有登录用户',
  '来源条目 5：宇树科技科创板 IPO 过会，具身智能进入资本市场主线',
];

export const parserGuardrails = {
  story5RequiredEnLabelTokens: ['Xinhua', 'IPO'],
  story5ForbiddenEnLabelTokens: ['OpenAI', 'NVIDIA', 'Cosmos'],
  story5RequiredDetailTokens: ['宇树科技', '科创板', '42.02亿元'],
  story5ForbiddenDetailTokens: ['Lockdown Mode', 'Cosmos 3', 'Physical AI Agent Skills'],
  story5ForbiddenEvidenceTokens: ['Lockdown Mode', 'Cosmos 3', 'Physical AI Agent Skills'],
  story5ForbiddenZhEvidenceTokens: ['Lockdown Mode', 'Cosmos 3', 'Physical AI Agent Skills'],
};
