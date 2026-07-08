export const fixtureDate = '2026-07-08';

export const realCronFixture = `《AI、科技日报》  
2026-07-08 早报

## 今日要闻（5条）

1. NVIDIA 把“Agentic AI 的瓶颈”指向 CPU

发生了什么：NVIDIA 7月7日发文称，AI Agent 不只是跑模型，还要频繁执行工具调用、代码、数据处理、验证等 CPU 侧任务；其 Vera CPU 面向“高单线程性能 + 大规模并发”设计。

为什么重要：行业过去更关注 GPU，但 Agent 真正落地后，CPU 延迟会直接拖慢“思考—执行—反馈”循环。

可能影响：AI 数据中心采购会从“只看 GPU”转向“GPU+CPU+内存带宽+系统架构”一起算账；Agent 平台、代码沙箱、数据查询类应用受益更明显。

---

2. 中国具身智能进入“训练场/考证”阶段

发生了什么：新华网报道，杭州机器人学校已开学，首批 30 台机器人来自工业、服务、安保、文娱等领域，将接受真实工况训练并考取技能证书。

为什么重要：这说明机器人产业的关键问题正在从“能不能演示”转向“能不能稳定上岗”。真实物理环境、干扰数据、能力分级会变成核心基础设施。

可能影响：机器人落地会更依赖第三方测试、数据采集、场景训练；采购方未来可能会看“机器人证书/能力等级”。

---

3. AI 算力需求继续推高存储芯片价格，消费电子承压

发生了什么：新华网报道，AI 基础设施扩张推高 HBM 等高端存储需求，挤压消费级 DRAM/NAND 供给，消费电子产业链面临成本重构。

为什么重要：AI 热潮的成本正在传导到普通用户的电脑、平板、游戏主机等终端。

可能影响：未来一段时间，电子产品可能更贵，或出现“同价低配”；普通用户买电脑、手机时要更关注内存/存储配置，不宜只看芯片型号。

---

4. 大湾区 AI+硬科技产业化继续加速

发生了什么：新华网调研大湾区，提到消费级外骨骼、具身机器人、脑机接口、AI 设计、低空物流、AI 数据中心材料等项目正在从实验室走向产业化。

为什么重要：中国 AI 产业的重点不只在大模型，也在“AI + 制造 + 硬件 + 场景”的组合能力。

可能影响：具身智能、低空经济、智能影像、医疗器械等方向会继续吸引资本和地方政策资源；深圳/大湾区仍是重点观察区域。

---

5. AI 创作仍有“套路化”短板

发生了什么：新华网报道，美国北卡罗来纳大学教堂山分校研究认为，AI 生成小说角色更倾向保守和封闭式结局，缺少人类作品常见的复杂性和神秘感。

为什么重要：这提醒我们，模型变强不等于创作自动变好；“可读、可控、完整”与“有余味、有复杂性”不是一回事。

可能影响：AI 写作工具更适合做初稿、结构、改写；真正有辨识度的故事仍需要人类设定冲突、留白和审美判断。

---

## 实战案例（2个）

1. 机器人学校：把“真实世界数据”变成产业资产

做法：用真实工况训练机器人，采集物理交互数据，并尝试建立能力分级和证书。

价值：做机器人/具身智能，不能只靠仿真和演示视频；真实环境数据、失败案例、抗干扰能力，可能比单个模型参数更值钱。

---

2. NVIDIA Vera：Agent 应用要重新看系统瓶颈

做法：NVIDIA 强调 Agent 工作流中的 CPU 侧任务，包括工具调用、代码执行、数据处理、KV-cache、结果分析。

价值：企业部署 Agent，不要只问“用什么大模型”，还要看沙箱启动速度、数据库查询、工具调用延迟、并发下稳定性。
`;

export const expectedSignals = [
  { title: 'NVIDIA 把“Agentic AI 的瓶颈”指向 CPU', sourceProjectionRuleMatches: ['nvidia-vera-agentic-cpu-infrastructure-2026'], enLabel: 'NVIDIA / Vera CPU / agentic AI infrastructure', zhEvidence: '来源条目 1：NVIDIA 把“Agentic AI 的瓶颈”指向 CPU', requiredTokens: ['Vera CPU', '高单线程性能 + 大规模并发', 'CPU 侧任务'] },
  { title: '中国具身智能进入“训练场/考证”阶段', sourceProjectionRuleMatches: ['china-humanoid-embodied-training-2026'], enLabel: 'Xinhua / Hangzhou / robot training certification', zhEvidence: '来源条目 2：中国具身智能进入“训练场/考证”阶段', requiredTokens: ['杭州机器人学校', '30 台机器人', '技能证书'] },
  { title: 'AI 算力需求继续推高存储芯片价格，消费电子承压', sourceProjectionRuleMatches: ['xinhua-ai-memory-price-consumer-electronics-2026'], enLabel: 'Xinhua / AI memory demand / consumer electronics cost pressure', zhEvidence: '来源条目 3：AI 算力需求继续推高存储芯片价格，消费电子承压', requiredTokens: ['HBM', 'DRAM/NAND', '消费电子产业链面临成本重构'] },
  { title: '大湾区 AI+硬科技产业化继续加速', sourceProjectionRuleMatches: ['xinhua-shenzhen-robotics-consumer-deployment-2026'], enLabel: 'Xinhua / Greater Bay Area / AI hard-tech commercialization', zhEvidence: '来源条目 4：大湾区 AI+硬科技产业化继续加速', requiredTokens: ['消费级外骨骼', '脑机接口', '低空物流'] },
  { title: 'AI 创作仍有“套路化”短板', sourceProjectionRuleMatches: ['xinhua-ai-fiction-character-conservatism-2026'], enLabel: 'Xinhua / AI fiction / creative quality limits', zhEvidence: '来源条目 5：AI 创作仍有“套路化”短板', requiredTokens: ['AI 生成小说角色', '保守和封闭式结局', '复杂性和神秘感'] },
];

export const bannedFallbackPhrases = [
  'The source tracks agent platform, model capability update, coding agent workflow, data infrastructure around NVIDIA, Agentic, CPU, Agent',
  'The source tracks robotics deployment, embodied AI, data infrastructure around China',
  'The source tracks compute infrastructure, AI chip supply, AI device adoption around HBM, DRAM/NAND',
  'giving the daily brief a named actor and deployment context',
  'buyers must check access control, infrastructure availability, operational risk',
  'today AI / technology daily not generated',
  '今日 AI / 科技日报暂未生成',
  '-…',
  '...',
];

export const requiredEnglishOutputs = [
  '### 1. NVIDIA / Vera CPU / agentic AI infrastructure',
  '### 2. Xinhua / Hangzhou / robot training certification',
  '### 3. Xinhua / AI memory demand / consumer electronics cost pressure',
  '### 4. Xinhua / Greater Bay Area / AI hard-tech commercialization',
  '### 5. Xinhua / AI fiction / creative quality limits',
  'NVIDIA said agentic AI workloads spend substantial time on CPU-side tasks',
  'Hangzhou Robot School training industrial, service, security, and entertainment robots',
  'AI infrastructure expansion is pushing up high-end memory demand such as HBM',
  'Greater Bay Area are moving AI hard-tech projects from labs into commercialization',
  'AI-generated fiction characters tend to be more conservative and closed-ended',
  'Evidence item 1: NVIDIA / Vera CPU / agentic AI infrastructure',
  'Evidence item 5: Xinhua / AI fiction / creative quality limits',
  '## Today’s Bottom Line',
  '## What to Watch Tomorrow',
  '## Evidence Matrix',
];

export const requiredZhOutputs = [
  'NVIDIA 把“Agentic AI 的瓶颈”指向 CPU',
  '中国具身智能进入“训练场/考证”阶段',
  'AI 算力需求继续推高存储芯片价格，消费电子承压',
  '大湾区 AI+硬科技产业化继续加速',
  'AI 创作仍有“套路化”短板',
  '机器人学校：把“真实世界数据”变成产业资产',
  'NVIDIA Vera：Agent 应用要重新看系统瓶颈',
  '## 今日结论',
  '## 明日跟踪点',
  '## 证据矩阵',
  '来源条目 1：NVIDIA 把“Agentic AI 的瓶颈”指向 CPU',
  '来源条目 5：AI 创作仍有“套路化”短板',
];

export const caseLevelFaqSignals = [
  {
    label: 'robot training certification',
    practicalCaseMatchTerms: ['机器人学校', '真实世界数据', '技能证书'],
    sourceStoryMatchTerms: ['杭州机器人学校', '30 台机器人', '技能证书'],
    requiredTerms: ['robot training certification', 'real-world data', 'third-party validation'],
    links: ['/en/blog/what-is-openclaw/', '/en/blog/openclaw-vps-deployment-complete-guide/'],
  },
  {
    label: 'agentic CPU infrastructure',
    practicalCaseMatchTerms: ['NVIDIA Vera', '系统瓶颈', 'CPU 侧任务'],
    sourceStoryMatchTerms: ['Vera CPU', '工具调用', '代码执行'],
    requiredTerms: ['Vera CPU', 'agent workflow latency', 'tool-call latency'],
    links: ['/en/blog/openclaw-model-fallback-strategy/', '/en/blog/what-is-openclaw/'],
  },
];

export const parserGuardrails = {
  story1RequiredDetailTokens: ['Vera CPU', '高单线程性能 + 大规模并发', 'CPU 侧任务'],
  story1ForbiddenDetailTokens: ['杭州机器人学校', 'HBM', '大湾区', 'AI 生成小说角色'],
  story2RequiredDetailTokens: ['杭州机器人学校', '30 台机器人', '技能证书'],
  story2ForbiddenDetailTokens: ['Vera CPU', 'HBM', '低空物流', 'AI 生成小说角色'],
  story3RequiredDetailTokens: ['HBM', 'DRAM/NAND', '消费电子产业链面临成本重构'],
  story3ForbiddenDetailTokens: ['杭州机器人学校', 'Vera CPU', '低空物流', 'AI 生成小说角色'],
  story4RequiredDetailTokens: ['消费级外骨骼', '脑机接口', '低空物流'],
  story4ForbiddenDetailTokens: ['杭州机器人学校', 'DRAM/NAND', '保守和封闭式结局'],
  story5RequiredDetailTokens: ['AI 生成小说角色', '保守和封闭式结局', '复杂性和神秘感'],
  story5ForbiddenDetailTokens: ['Vera CPU', '杭州机器人学校', 'HBM', '低空物流'],
};
