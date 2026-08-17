export const fixtureDate = '2026-08-17';

export const realCronFixture = `《AI、科技日报》  
2026-08-17 早报

## 今日要闻（5条）

1. NVIDIA 主导 Open Secure AI Alliance 成立：100+ 家公司共建开放 AI 安全
发生了什么：NVIDIA 联合亚马逊、微软、Google、Adobe、Cisco 等超百家公司成立 Open Secure AI Alliance，共建开源 AI 安全工具、开放模型与开放 agent harness，用开放模型与工具改善网络防御，主张开放模型是防御资产而非风险。
为什么重要：在闭源 vs 开源的 AI 安全争论中，联盟明确站队开放路线，认为防守方需要能本地运行、审计、评估与隔离的 AI 工具，呼吁监管不要一刀切限制开源前沿模型。
可能影响：开源模型的制度合法性与生态位增强，安全团队应要求身份控制、最小权限、运行期审计与事故响应，才在生产环境部署防御型 AI agent。
状态：已确认，L1 官方直抓。

2. NVIDIA Spectrum-6 落地千兆级 AI 工厂：首批超大规模客户交付
发生了什么：NVIDIA 新一代 102.4Tbps 以太网交换机 Spectrum-6 开始交付，CoreWeave、微软、OCI 等为首批部署方，配套 Vera Rubin 平台，宣称 1.6 倍性能、10 万卡集群 95% 效率。
为什么重要：AI 算力进入千兆时代，瓶颈从单卡算力转向网络互联，端到端带宽、拥塞控制、机柜级设计与功耗散热决定训练与推理集群规模。
可能影响：云厂商与自建集群的军备竞赛升级，基础设施团队应按端到端网络带宽、液冷、功耗包络与利用率规划 AI 容量，而非只看 GPU 采购。
状态：已确认，L1 官方直抓。

3. NVIDIA Nations AI：各国主权 AI 战略走向本地算力与本地数据
发生了什么：NVIDIA 提出 Nations AI 主权 AI 战略，各国围绕本地算力、本地数据、基础模型、人才体系与 AI 工厂构建国家 AI 能力，把敏感工作负载与战略能力留在国境内。
为什么重要：主权 AI 让模型与算力采购变成国家基础设施决策，数据驻留、本地能源、人才管线与供应链掌控开始与原始 GPU 性能同等重要。
可能影响：国家与企业应按本地算力获取、数据边界、能源可得性、伙伴地理与区域合规规划主权 AI，而不是默认只有前沿模型一条路。
状态：已确认，L1 官方直抓。

4. 新华社：中国开源模型改写 AI 竞争规则，累计下载破 100 亿次
发生了什么：新华社确认 MiniMax H3 开源三天冲上开源模型榜单榜首，月之暗面全量开源 Kimi K3（2.8 万亿参数、100 万 token 上下文），中国开源模型全球累计下载突破 100 亿次，OpenRouter 7 月调用量前五全是中国产品。
为什么重要：开源正在重塑 AI 竞争格局，中国开源模型从追赶者变成生态规则参与者，开发者与企业的默认选项正在变化。
可能影响：企业与开发者会更频繁地比较中文推理、工具调用、长上下文编码与本地部署能力，同时观察全量权重发布能否造就可持久的开发者生态。
状态：已确认，L2 权威媒体直抓。

5. 第二届世界人形机器人运动会 8 月 22 日开赛：16 国 2056 台参赛
发生了什么：第二届世界人形机器人运动会将于 8 月 22 日至 26 日在北京国家速滑馆冰丝带举办，16 国 666 支队伍、2056 台机器人参赛，队伍数增长 138%，新增举重、拔河、乒乓球等极限对抗项目，并设灵巧手赛项。
为什么重要：以赛定标、以标促产，比赛规则演进成技术验收标准，人形机器人正从演示走向力量、平衡、操作与协调的可度量能力分级。
可能影响：人形机器人团队应关注赛事表现能否转化为可验证的能力分级、可采购规格以及面向工业、家政、消防等真实场景的安全证据。
状态：已确认，L2 权威媒体直抓。

## 实战案例

1. 把日报信号转成一次可重复实验
普通用户不必追逐每一条 AI 新功能，先从信息整理、学习复盘、低风险决策辅助这类高频任务切入，用一次可重复实验验证收益再决定是否扩展。
实际价值：
- 先选一个高频流程做试点；
- 把权限、审计、成本和人工复核写进上线标准；
- 用一次可重复实验验证收益。

2. 企业侧：权限与审计是 agent 落地上限
AI agent 能调用工具、访问系统并执行任务，安全失败会变成权限、工作流与真实行动的失败。企业应要求身份检查、最小权限、行为日志、运行期异常监控与敏感操作人工确认。
实际价值：
- 定义数据边界与最小权限；
- 补审计日志与运行期异常监控；
- 敏感操作保留人工确认。
`;

export const expectedSignals = [
  { title: 'NVIDIA 主导 Open Secure AI Alliance 成立：100+ 家公司共建开放 AI 安全', sourceProjectionRuleMatches: ['china-waic-agent-safety-evaluation-2026'], enLabel: 'NVIDIA / Open Secure AI Alliance / open AI security', zhEvidence: '来源条目 1：NVIDIA 主导 Open Secure AI Alliance 成立：100+ 家公司共建开放 AI 安全', requiredTokens: ['Open Secure AI Alliance', '100+', '开放 agent harness', '开源 AI 安全'] },
  { title: 'NVIDIA Spectrum-6 落地千兆级 AI 工厂：首批超大规模客户交付', sourceProjectionRuleMatches: ['nvidia-ai-cloud-ecosystem'], enLabel: 'NVIDIA / Spectrum-6 / AI factory networking infrastructure', zhEvidence: '来源条目 2：NVIDIA Spectrum-6 落地千兆级 AI 工厂：首批超大规模客户交付', requiredTokens: ['Spectrum-6', '102.4Tbps', 'Vera Rubin', 'CoreWeave'] },
  { title: 'NVIDIA Nations AI：各国主权 AI 战略走向本地算力与本地数据', sourceProjectionRuleMatches: ['nvidia-ai-cloud-ecosystem'], enLabel: 'NVIDIA / Nations AI / sovereign AI strategy', zhEvidence: '来源条目 3：NVIDIA Nations AI：各国主权 AI 战略走向本地算力与本地数据', requiredTokens: ['Nations AI', '主权 AI', '本地算力', '本地数据'] },
  { title: '新华社：中国开源模型改写 AI 竞争规则，累计下载破 100 亿次', sourceProjectionRuleMatches: ['moonshot-kimi-k3-long-context-open-model-2026'], enLabel: 'China / Kimi K3 / long-context open model', zhEvidence: '来源条目 4：新华社：中国开源模型改写 AI 竞争规则，累计下载破 100 亿次', requiredTokens: ['MiniMax', 'Kimi K3', '2.8 万亿参数', '100 万 token', '100 亿次'] },
  { title: '第二届世界人形机器人运动会 8 月 22 日开赛：16 国 2056 台参赛', sourceProjectionRuleMatches: ['world-humanoid-robot-games-2026'], enLabel: 'China / humanoid robot games / robotics standard', zhEvidence: '来源条目 5：第二届世界人形机器人运动会 8 月 22 日开赛：16 国 2056 台参赛', requiredTokens: ['世界人形机器人运动会', '冰丝带', '16 国', '2056 台', '灵巧手'] },
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
  '### 1. NVIDIA / Open Secure AI Alliance / open AI security',
  '### 2. NVIDIA / Spectrum-6 / AI factory networking infrastructure',
  '### 3. NVIDIA / Nations AI / sovereign AI strategy',
  '### 4. China / Kimi K3 / long-context open model',
  '### 5. China / humanoid robot games / robotics standard',
  'Evidence item 1: NVIDIA / Open Secure AI Alliance / open AI security',
  'Evidence item 5: China / humanoid robot games / robotics standard',
  '## Case-Level FAQ',
  '## Today’s Bottom Line',
  '## What to Watch Tomorrow',
  '## Evidence Matrix',
];

export const requiredZhOutputs = [
  'NVIDIA 主导 Open Secure AI Alliance 成立：100+ 家公司共建开放 AI 安全',
  'NVIDIA Spectrum-6 落地千兆级 AI 工厂：首批超大规模客户交付',
  'NVIDIA Nations AI：各国主权 AI 战略走向本地算力与本地数据',
  '新华社：中国开源模型改写 AI 竞争规则，累计下载破 100 亿次',
  '第二届世界人形机器人运动会 8 月 22 日开赛：16 国 2056 台参赛',
  '把日报信号转成一次可重复实验',
  '企业侧：权限与审计是 agent 落地上限',
  '## 今日结论',
  '## 明日跟踪点',
  '## 证据矩阵',
  '来源条目 1：NVIDIA 主导 Open Secure AI Alliance 成立：100+ 家公司共建开放 AI 安全',
  '来源条目 5：第二届世界人形机器人运动会 8 月 22 日开赛：16 国 2056 台参赛',
];

export const caseLevelFaqSignals = [
  {
    label: 'Open Secure AI Alliance defensive agent validation',
    sourceStoryMatchTerms: ['Open Secure AI Alliance', '开放 agent harness'],
    practicalCaseMatchTerms: ['企业侧：权限与审计是 agent 落地上限'],
    requiredTerms: ['open models', 'audit', 'evaluate', 'isolate', 'incident response'],
    links: ['/en/blog/openclaw-model-fallback-strategy/', '/en/blog/openclaw-vps-deployment-complete-guide/'],
  },
  {
    label: 'Spectrum-6 AI factory networking verification',
    sourceStoryMatchTerms: ['Spectrum-6', '102.4Tbps', 'Vera Rubin'],
    requiredTerms: ['network bandwidth', 'congestion control', 'liquid cooling', 'power envelopes', 'utilization'],
    links: ['/en/blog/openclaw-vps-cost-comparison-2026/', '/en/blog/openclaw-vps-deployment-complete-guide/'],
  },
  {
    label: 'Nations AI sovereign infrastructure checklist',
    sourceStoryMatchTerms: ['Nations AI', '主权 AI', '本地算力'],
    requiredTerms: ['local compute', 'data residency', 'energy', 'partner geography', 'regional compliance'],
    links: ['/en/blog/openclaw-vps-deployment-complete-guide/', '/en/blog/openclaw-model-fallback-strategy/'],
  },
  {
    label: 'Personal productivity repeated experiment reference',
    practicalCaseMatchTerms: ['把日报信号转成一次可重复实验', '一次可重复实验'],
    sourceStoryMatchTerms: ['Open Secure AI Alliance'],
    requiredTerms: ['repeatable experiment', 'information organization', 'learning review', 'low-risk decision', 'review log'],
    links: ['/en/blog/what-is-openclaw/', '/en/blog/openclaw-vps-deployment-complete-guide/'],
  },
];

export const parserGuardrails = {
  story1RequiredDetailTokens: ['Open Secure AI Alliance', '100+', '开放 agent harness', '开源 AI 安全'],
  story1ForbiddenDetailTokens: ['Spectrum-6', 'Nations AI', 'Kimi K3', '冰丝带'],
  story2RequiredDetailTokens: ['Spectrum-6', '102.4Tbps', 'Vera Rubin', 'CoreWeave'],
  story2ForbiddenDetailTokens: ['Open Secure', 'Nations AI', 'Kimi K3', '冰丝带'],
  story3RequiredDetailTokens: ['Nations AI', '主权 AI', '本地算力', '本地数据'],
  story3ForbiddenDetailTokens: ['Open Secure', 'Spectrum-6', 'Kimi K3', '冰丝带'],
  story4RequiredDetailTokens: ['MiniMax', 'Kimi K3', '2.8 万亿参数', '100 万 token', '100 亿次'],
  story4ForbiddenDetailTokens: ['Open Secure', 'Spectrum-6', 'Nations AI', '冰丝带'],
  story5RequiredDetailTokens: ['世界人形机器人运动会', '冰丝带', '16 国', '2056 台', '灵巧手'],
  story5ForbiddenDetailTokens: ['Open Secure', 'Spectrum-6', 'Nations AI', 'Kimi K3'],
};
