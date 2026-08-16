export const fixtureDate = '2026-08-16';

export const realCronFixture = `《AI、科技日报》  
2026-08-16 早报

## 今日要闻（5条）

1. NVIDIA 发布 Cosmos 3：首个全开源物理 AI 世界基础模型  
发生了什么：在 GTC Taipei，NVIDIA 发布 Cosmos 3，称其为开放的物理 AI 世界基础模型，可原生理解与生成文本、图像、视频、环境音与动作，用于机器人、自动驾驶与视觉 AI 的合成数据、仿真与策略训练，并成立 Cosmos 联盟，首批成员含 Black Forest Labs、Runway、Skild AI 等。  
为什么重要：开源世界基础模型是机器人、自动驾驶与视觉 AI 的底层引擎，物理 AI 训练与评估从数月缩到数天，正在从单一前端模型转向可复用的仿真与合成数据基础设施。  
可能影响：中小机器人、智驾与视觉 AI 团队能以更低成本接入顶尖世界模型，中国智驾与机器人厂商也有用武之地，但同时更依赖 NVIDIA 的算力与软件栈。  
状态：已确认，L1 官方直抓。

2. 中国开源大模型引爆全球：MiniMax H3 冲榜、Kimi K3 全量开源，累计下载量破 100 亿次  
发生了什么：新华网报道 MiniMax 开源 H3 三天冲上开源模型榜单榜首；月之暗面全量开源 Kimi K3，号称全球参数规模最大的开源模型，单模型 2.8 万亿参数、100 万 token 上下文；中国开源模型全球累计下载量突破 100 亿次，OpenRouter 7 月调用量前五全是中国产品。  
为什么重要：开源正在重塑 AI 竞争格局，中国开源模型从追赶者变成生态规则参与者，开发者与企业的默认选项正在变化。  
可能影响：全球每 10 次大模型下载约 6 次来自中国模型，企业与开发者会更频繁地比较中文推理、工具调用、长上下文编码与本地部署能力。  
状态：已确认，L2 权威媒体直抓。

3. NVIDIA CEO Jensen Huang 登顶 Glassdoor 2026 全球最佳 CEO  
发生了什么：8 月 12 日 Glassdoor 发布 2026 年榜单，NVIDIA CEO Jensen Huang 以 99% 员工认可度排名第一，科技行业有 9 位 CEO 入榜，是入榜最多的行业。  
为什么重要：AI 热潮下 NVIDIA 的人才与组织红利被员工认可度数据坐实，领导力、留任与组织健康成为 AI 人才竞争的前瞻信号。  
可能影响：招聘、组织与人才团队可把 CEO 认可度与员工情绪当作 AI 基建竞赛中招聘容量、留任风险与执行带宽的领先指标。  
状态：已确认，L2 权威媒体直抓。

4. 世界人形机器人运动会 8 月 22 日开赛：机器人数量翻两番  
发生了什么：第二届世界人形机器人运动会将于 8 月 22 日至 26 日在冰丝带举办，16 国 666 支队伍、2056 台机器人参赛，队伍数增长 138%，新增举重、拔河、乒乓球等极限对抗项目，并设灵巧手赛项。  
为什么重要：以赛定标、以标促产，比赛规则会演进成技术验收标准，人形机器人正从演示加速走向力量、平衡、操作与协调的可度量能力分级。  
可能影响：人形机器人团队应关注赛事表现能否转化为可验证的能力分级、可采购规格以及面向工业、家政、消防等真实场景的安全证据。  
状态：已确认，L2 权威媒体直抓。

5. NVIDIA 把物理 AI 工具开源给 Agent：智能体开始编排造机器人  
发生了什么：NVIDIA 发布一批开源的 Physical AI Agent Skills，让编码 Agent 直接调用 Omniverse、Cosmos、Isaac 等库完成数据生成、仿真、训练与部署；台积电、富士康、纬创等已在用，和硕靠合成数据把训练部署时间缩短 67%。  
为什么重要：AI Agent 从写代码进化到编排物理 AI 自动化，制造业视觉检测与智驾数据闭环的效率有望大幅提升。  
可能影响：工业软件与机器人团队可以把复杂流程封装为可复用的 Agent 技能，把差异化从拥有模型转向拥有可验证、可复现的工程工作流。  
状态：已确认，L1 官方直抓。

## 实战案例

1. 制造业合成数据补缺陷样本  
用合成缺陷数据训练视觉检测模型，是制造业 AI 的普遍破局点：缺缺陷样本时用合成数据补样本，可把训练与部署时间明显缩短。和硕用 Defect Image Generation skill 将训练+部署时间缩短 67%，纬创用同一 skill 造 Observation Agent 质检流程，富士康首件良率提升约 3%。  
实际价值：  
- 合成缺陷样本降低数据采集成本；  
- 视觉检测模型可在真实产线缺陷数据不足时提前闭环；  
- 质检流程可封装为可复用的 Agent 工作流。

2. 普通用户侧：把日报信号转成一次可重复实验  
普通用户不必追逐每一条 AI 新功能，先从信息整理、学习复盘、低风险决策辅助这类高频任务切入。  
实际价值：  
- 先选一个高频流程做试点；  
- 把权限、审计、成本和人工复核写进上线标准；  
- 用一次可重复实验验证收益，再决定是否扩展。  
备注：该条不是今日新闻，作为产品实战参考。
`;

export const expectedSignals = [
  { title: 'NVIDIA 发布 Cosmos 3：首个全开源物理 AI 世界基础模型', sourceProjectionRuleMatches: ['nvidia-cosmos-3-physical-ai-2026'], enLabel: 'NVIDIA / Cosmos / GTC / compute infrastructure', zhEvidence: '来源条目 1：NVIDIA 发布 Cosmos 3：首个全开源物理 AI 世界基础模型', requiredTokens: ['Cosmos 3', 'GTC Taipei', '物理 AI 世界基础模型', 'Cosmos 联盟'] },
  { title: '中国开源大模型引爆全球：MiniMax H3 冲榜、Kimi K3 全量开源，累计下载量破 100 亿次', sourceProjectionRuleMatches: ['moonshot-kimi-k3-long-context-open-model-2026'], enLabel: 'China / Kimi K3 / long-context open model', zhEvidence: '来源条目 2：中国开源大模型引爆全球：MiniMax H3 冲榜、Kimi K3 全量开源，累计下载量破 100 亿次', requiredTokens: ['MiniMax', 'Kimi K3', '2.8 万亿参数', '100 万 token', '100 亿次'] },
  { title: 'NVIDIA CEO Jensen Huang 登顶 Glassdoor 2026 全球最佳 CEO', sourceProjectionRuleMatches: ['nvidia-glassdoor-best-ceo-2026'], enLabel: 'NVIDIA / Glassdoor / CEO / company leadership', zhEvidence: '来源条目 3：NVIDIA CEO Jensen Huang 登顶 Glassdoor 2026 全球最佳 CEO', requiredTokens: ['Glassdoor 2026', '99% 员工认可度', '全球最佳 CEO', '科技行业'] },
  { title: '世界人形机器人运动会 8 月 22 日开赛：机器人数量翻两番', sourceProjectionRuleMatches: ['world-humanoid-robot-games-2026'], enLabel: 'China / humanoid robot games / robotics standard', zhEvidence: '来源条目 4：世界人形机器人运动会 8 月 22 日开赛：机器人数量翻两番', requiredTokens: ['世界人形机器人运动会', '冰丝带', '16 国', '2056 台', '灵巧手'] },
  { title: 'NVIDIA 把物理 AI 工具开源给 Agent：智能体开始编排造机器人', sourceProjectionRuleMatches: ['nvidia-physical-ai-agent-skills-2026'], enLabel: 'NVIDIA / Physical / Agent / robotics deployment', zhEvidence: '来源条目 5：NVIDIA 把物理 AI 工具开源给 Agent：智能体开始编排造机器人', requiredTokens: ['Physical AI Agent Skills', 'Omniverse', '合成数据', '数据生成'] },
];

export const bannedFallbackPhrases = [
  'The source tracks model capability update',
  'The source tracks compute infrastructure',
  'The source tracks data infrastructure',
  'giving the daily brief a named actor and deployment context',
  'buyers must check access control, infrastructure availability, operational risk',
  '素材已足够',
  '无需再用浏览器',
  '直接输出日报正文',
  '今日 AI / 科技日报暂未生成',
  '-…',
  '...',
];

export const requiredEnglishOutputs = [
  '### 1. NVIDIA / Cosmos / GTC / compute infrastructure',
  '### 2. China / Kimi K3 / long-context open model',
  '### 3. NVIDIA / Glassdoor / CEO / company leadership',
  '### 4. China / humanoid robot games / robotics standard',
  '### 5. NVIDIA / Physical / Agent / robotics deployment',
  'Evidence item 1: NVIDIA / Cosmos / GTC / compute infrastructure',
  'Evidence item 5: NVIDIA / Physical / Agent / robotics deployment',
  '## Case-Level FAQ',
  '## Today’s Bottom Line',
  '## What to Watch Tomorrow',
  '## Evidence Matrix',
];

export const requiredZhOutputs = [
  'NVIDIA 发布 Cosmos 3：首个全开源物理 AI 世界基础模型',
  '中国开源大模型引爆全球：MiniMax H3 冲榜、Kimi K3 全量开源，累计下载量破 100 亿次',
  'NVIDIA CEO Jensen Huang 登顶 Glassdoor 2026 全球最佳 CEO',
  '世界人形机器人运动会 8 月 22 日开赛：机器人数量翻两番',
  'NVIDIA 把物理 AI 工具开源给 Agent：智能体开始编排造机器人',
  '制造业合成数据补缺陷样本',
  '普通用户侧：把日报信号转成一次可重复实验',
  '## 今日结论',
  '## 明日跟踪点',
  '## 证据矩阵',
  '来源条目 1：NVIDIA 发布 Cosmos 3：首个全开源物理 AI 世界基础模型',
  '来源条目 5：NVIDIA 把物理 AI 工具开源给 Agent：智能体开始编排造机器人',
];

export const caseLevelFaqSignals = [
  {
    label: 'Cosmos 3 physical AI world model validation',
    sourceStoryMatchTerms: ['Cosmos 3', '物理 AI 世界基础模型'],
    requiredTerms: ['world foundation model', 'synthetic data', 'simulation', 'policy training', 'visual reasoning'],
    links: ['/en/blog/openclaw-model-fallback-strategy/', '/en/blog/openclaw-vps-deployment-complete-guide/'],
  },
  {
    label: 'Kimi K3 open-model long-context verification',
    sourceStoryMatchTerms: ['Kimi K3', '100 万 token', '2.8 万亿参数'],
    requiredTerms: ['open weights', 'long-context', 'research', 'coding', 'local deployment'],
    links: ['/en/blog/openclaw-ai-writing-workflow/', '/en/blog/openclaw-model-fallback-strategy/'],
  },
  {
    label: 'Physical AI Agent Skills reproducibility checklist',
    sourceStoryMatchTerms: ['Physical AI Agent Skills', 'Omniverse', '合成数据'],
    requiredTerms: ['reusable agent skill', 'verifiable', 'reproducible', 'engineering workflow', 'data generation'],
    links: ['/en/blog/openclaw-vps-cost-comparison-2026/', '/en/blog/openclaw-systemd-service-crash-recovery-monitoring/'],
  },
  {
    label: 'Manufacturing synthetic data defect sample reference',
    practicalCaseMatchTerms: ['制造业合成数据补缺陷样本', '合成缺陷数据'],
    sourceStoryMatchTerms: ['Physical AI Agent Skills'],
    requiredTerms: ['synthetic defect', 'visual inspection', 'training data', 'quality inspection', 'cycle time'],
    links: ['/en/blog/openclaw-vps-deployment-complete-guide/'],
  },
  {
    label: 'Personal productivity repeated experiment reference',
    practicalCaseMatchTerms: ['普通用户侧：把日报信号转成一次可重复实验', '一次可重复实验'],
    sourceStoryMatchTerms: ['Cosmos 3'],
    requiredTerms: ['repeatable experiment', 'information organization', 'learning review', 'low-risk decision', 'review log'],
    links: ['/en/blog/what-is-openclaw/', '/en/blog/openclaw-vps-deployment-complete-guide/'],
  },
];

export const parserGuardrails = {
  story1RequiredDetailTokens: ['Cosmos 3', 'GTC Taipei', '物理 AI 世界基础模型', 'Cosmos 联盟'],
  story1ForbiddenDetailTokens: ['Kimi K3', 'Glassdoor', '冰丝带', 'Physical AI Agent Skills'],
  story2RequiredDetailTokens: ['MiniMax', 'Kimi K3', '2.8 万亿参数', '100 万 token', '100 亿次'],
  story2ForbiddenDetailTokens: ['Cosmos 3', 'Glassdoor', '冰丝带', 'Physical AI Agent Skills'],
  story3RequiredDetailTokens: ['Glassdoor 2026', '99% 员工认可度', '全球最佳 CEO', '科技行业'],
  story3ForbiddenDetailTokens: ['Cosmos 3', 'Kimi K3', '冰丝带', 'Physical AI Agent Skills'],
  story4RequiredDetailTokens: ['世界人形机器人运动会', '冰丝带', '16 国', '2056 台', '灵巧手'],
  story4ForbiddenDetailTokens: ['Cosmos 3', 'Kimi K3', 'Glassdoor', 'Physical AI Agent Skills'],
  story5RequiredDetailTokens: ['Physical AI Agent Skills', 'Omniverse', '合成数据', '数据生成'],
  story5ForbiddenDetailTokens: ['Cosmos 3', 'Kimi K3', 'Glassdoor', '冰丝带'],
};
