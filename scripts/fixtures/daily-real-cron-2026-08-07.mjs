export const fixtureDate = '2026-08-07';

export const realCronFixture = `《AI、科技日报》  
2026-08-07 早报

## 今日要闻（5条）

1. OpenAI 更新 ChatGPT：GPT‑5.6 Sol 更重“少错、聚焦”，免费用户将默认用 GPT‑5.6 Luna

发生了什么：OpenAI 宣布 Plus/Pro 用户的 GPT‑5.6 Sol 在 ChatGPT 中更新，强调更可靠事实、更聚焦回答；免费用户默认模型将升级为 GPT‑5.6 Luna，并增加 Think 按钮与不限量文本聊天。

为什么重要：AI 产品竞争从“模型能力”继续转向“日常可用性”：少犯错、少废话、可调推理强度。

可能影响：普通用户会更容易把 AI 当成日常助手；付费版和免费版差距会更多体现在工具、速度、额度，而不是基础可用性。

2. OpenAI 与美国心理学会合作，推进青少年 AI 使用安全

发生了什么：OpenAI 宣布与 APA 合作，围绕青少年心理健康、家庭指导、临床和学校心理从业者资源制定更负责任的 AI 使用框架。

为什么重要：青少年与 AI 依赖、情绪支持、心理健康边界，正在成为 AI 安全的核心议题。

可能影响：未来主流 AI 产品会更强调年龄识别、家长资源、心理风险干预和“AI 不能替代真实关系”的产品设计。

3. NVIDIA 强调开放世界模型是 Physical AI 的关键底座

发生了什么：NVIDIA 在官方博客中介绍 Cosmos 3、Omniverse、OpenUSD 等如何用于机器人、自动驾驶、视觉 AI 的训练、仿真和验证。

为什么重要：AI 竞争正在从文本/图片扩展到“物理世界”：机器人、自动驾驶、工业仿真需要能预测环境后果的世界模型。

可能影响：未来企业部署机器人和自动驾驶，会更依赖仿真数据、开放模型权重和可验证测试环境。

4. NVIDIA 参与 NSF 区域 AI 基础设施中心计划

发生了什么：NVIDIA 宣布参与美国 NSF State and Regional AI Infrastructure Hubs 项目，帮助高校和区域联盟获得 AI 计算、数据、软件和技术支持。

为什么重要：AI 基础设施不再只属于大厂和顶级实验室，区域高校和地方产业也在争取算力入口。

可能影响：美国 AI 人才培养、科研算力和地方产业结合会继续加速；也会强化“算力即公共科研基础设施”的趋势。

5. 中国发布自动驾驶系统安全强制性国家标准

发生了什么：据新华网，工信部组织制定的《智能网联汽车 自动驾驶系统安全要求》（GB 44721—2026）已获批发布，拟于 2027 年 7 月 1 日实施，适用于 L3/L4 自动驾驶系统车辆。

为什么重要：自动驾驶从示范测试走向规模化，安全标准和准入监管会成为产业化前置条件。

可能影响：车企需要补齐全生命周期安全、接管监测、人机交互、仿真/场地/道路测试等合规能力；L3/L4 上车节奏可能更规范但门槛更高。

## 实战案例（2个）

1. ChatGPT 使用从“问答案”转向“做任务”

OpenAI 发布国家/地区维度使用数据，称工作场景中用户更常用 ChatGPT 完成写作、编码、分析等任务，而不只是问问题。

启发：普通用户最值得练的是“交付型用法”：让 AI 直接产出文档、方案、代码、清单，而不是只把它当搜索框。

2. 中国 AI 终端和工业机器人需求继续扩张

新华网报道称，上半年中国工业机器人产量 53.8 万套，同比增长 28%；另有报道提到 AI 正推动 AI 电脑、AI 手机、AI 电视、AI 耳机等终端形态演进。

启发：AI 不只在 App 里，也在进入硬件、制造和家电。普通用户买设备时，可以开始关注“本地 AI 能力、隐私处理、是否真能离线/端侧运行”。
`;

export const expectedSignals = [
  { title: 'OpenAI 更新 ChatGPT：GPT‑5.6 Sol 更重“少错、聚焦”，免费用户将默认用 GPT‑5.6 Luna', sourceProjectionRuleMatches: ['openai-chatgpt-model-picker-2026'], enLabel: 'OpenAI / GPT-5.6 / Sol-Luna ChatGPT update', zhEvidence: '来源条目 1：OpenAI 更新 ChatGPT：GPT‑5.6 Sol 更重“少错、聚焦”，免费用户将默认用 GPT‑5.6 Luna', requiredTokens: ['GPT‑5.6 Sol', 'GPT‑5.6 Luna', 'Think 按钮'] },
  { title: 'OpenAI 与美国心理学会合作，推进青少年 AI 使用安全', sourceProjectionRuleMatches: ['openai-youth-safety-g7-2026'], enLabel: 'OpenAI / APA / youth AI mental health safety', zhEvidence: '来源条目 2：OpenAI 与美国心理学会合作，推进青少年 AI 使用安全', requiredTokens: ['美国心理学会', 'APA', '青少年心理健康'] },
  { title: 'NVIDIA 强调开放世界模型是 Physical AI 的关键底座', sourceProjectionRuleMatches: ['nvidia-cosmos-3-physical-ai-2026'], enLabel: 'NVIDIA / Cosmos / GTC / compute infrastructure', zhEvidence: '来源条目 3：NVIDIA 强调开放世界模型是 Physical AI 的关键底座', requiredTokens: ['Cosmos 3', 'Omniverse', 'OpenUSD'] },
  { title: 'NVIDIA 参与 NSF 区域 AI 基础设施中心计划', sourceProjectionRuleMatches: ['nvidia-ai-cloud-ecosystem'], enLabel: 'US / NVIDIA / NSF / regional AI infrastructure hubs', zhEvidence: '来源条目 4：NVIDIA 参与 NSF 区域 AI 基础设施中心计划', requiredTokens: ['NSF', 'State and Regional AI Infrastructure Hubs', '高校和区域联盟'] },
  { title: '中国发布自动驾驶系统安全强制性国家标准', sourceProjectionRuleMatches: ['china-ai-metrology-guide'], enLabel: 'China / MIIT / GB 44721 autonomous driving safety standard', zhEvidence: '来源条目 5：中国发布自动驾驶系统安全强制性国家标准', requiredTokens: ['GB 44721—2026', 'L3/L4', '自动驾驶系统安全要求'] },
];

export const bannedFallbackPhrases = [
  'The source tracks compute infrastructure',
  'The source tracks AI governance requirement',
  'giving the daily brief a named actor and deployment context',
  'buyers must check access control, infrastructure availability, operational risk',
  'today AI / technology daily not generated',
  '今日 AI / 科技日报暂未生成',
  '-…',
  '...',
];

export const requiredEnglishOutputs = [
  '### 1. OpenAI / GPT-5.6 / Sol-Luna ChatGPT update',
  '### 2. OpenAI / APA / youth AI mental health safety',
  '### 3. NVIDIA / Cosmos / GTC / compute infrastructure',
  '### 4. US / NVIDIA / NSF / regional AI infrastructure hubs',
  '### 5. China / MIIT / GB 44721 autonomous driving safety standard',
  'Evidence item 1: OpenAI / GPT-5.6 / Sol-Luna ChatGPT update',
  'Evidence item 5: China / MIIT / GB 44721 autonomous driving safety standard',
  '## Today’s Bottom Line',
  '## What to Watch Tomorrow',
  '## Evidence Matrix',
];

export const requiredZhOutputs = [
  'OpenAI 更新 ChatGPT：GPT‑5.6 Sol 更重“少错、聚焦”，免费用户将默认用 GPT‑5.6 Luna',
  'OpenAI 与美国心理学会合作，推进青少年 AI 使用安全',
  'NVIDIA 强调开放世界模型是 Physical AI 的关键底座',
  'NVIDIA 参与 NSF 区域 AI 基础设施中心计划',
  '中国发布自动驾驶系统安全强制性国家标准',
  'ChatGPT 使用从“问答案”转向“做任务”',
  '中国 AI 终端和工业机器人需求继续扩张',
  '## 今日结论',
  '## 明日跟踪点',
  '## 证据矩阵',
  '来源条目 1：OpenAI 更新 ChatGPT：GPT‑5.6 Sol 更重“少错、聚焦”，免费用户将默认用 GPT‑5.6 Luna',
  '来源条目 5：中国发布自动驾驶系统安全强制性国家标准',
];

export const caseLevelFaqSignals = [
  {
    label: 'ChatGPT task-tier workflow remap',
    practicalCaseMatchTerms: ['做任务', '写作', '编码', '分析'],
    sourceStoryMatchTerms: ['GPT‑5.6 Sol', 'GPT‑5.6 Luna', 'Think 按钮'],
    requiredTerms: ['task-tier mapping', 'latency budget', 'quality review'],
    links: ['/en/blog/openclaw-model-fallback-strategy/', '/en/blog/what-is-openclaw/'],
  },
  {
    label: 'Youth AI mental health safety rollout',
    practicalCaseMatchTerms: ['青少年', '心理健康', 'AI 使用安全'],
    sourceStoryMatchTerms: ['APA', '青少年心理健康'],
    requiredTerms: ['age-aware controls', 'guardian resources', 'crisis escalation'],
    links: ['/en/blog/openclaw-security-hardening-2026/', '/en/blog/openclaw-vps-deployment-complete-guide/'],
  },
  {
    label: 'Autonomous-driving GB 44721 compliance checklist',
    practicalCaseMatchTerms: ['自动驾驶', 'L3/L4', '安全标准'],
    sourceStoryMatchTerms: ['GB 44721—2026', 'L3/L4'],
    requiredTerms: ['takeover monitoring', 'simulation evidence', 'road-test audit trail'],
    links: ['/en/blog/openclaw-security-hardening-2026/', '/en/blog/openclaw-model-fallback-strategy/'],
  },
  {
    label: 'China AI terminal and industrial robot demand watch',
    practicalCaseMatchTerms: ['AI 终端', '工业机器人', '需求继续扩张'],
    sourceStoryMatchTerms: ['Cosmos 3', 'NSF', 'GB 44721—2026'],
    requiredTerms: ['local AI capability', 'industrial robot demand', 'privacy boundary'],
    links: ['/en/blog/what-is-openclaw/', '/en/blog/openclaw-vps-cost-comparison-2026/'],
  },
];

export const parserGuardrails = {
  story1RequiredDetailTokens: ['GPT‑5.6 Sol', 'GPT‑5.6 Luna', 'Think 按钮'],
  story1ForbiddenDetailTokens: ['APA', 'Cosmos 3', 'NSF', 'GB 44721'],
  story2RequiredDetailTokens: ['美国心理学会', 'APA', '青少年心理健康'],
  story2ForbiddenDetailTokens: ['GPT‑5.6 Sol', 'Cosmos 3', 'NSF', 'GB 44721'],
  story3RequiredDetailTokens: ['Cosmos 3', 'Omniverse', 'OpenUSD'],
  story3ForbiddenDetailTokens: ['APA', 'NSF', 'GB 44721'],
  story4RequiredDetailTokens: ['NSF', 'State and Regional AI Infrastructure Hubs', '高校和区域联盟'],
  story4ForbiddenDetailTokens: ['GPT‑5.6 Sol', 'APA', 'GB 44721'],
  story5RequiredDetailTokens: ['GB 44721—2026', 'L3/L4', '自动驾驶系统安全要求'],
  story5ForbiddenDetailTokens: ['GPT‑5.6 Sol', 'APA', 'NSF'],
};
