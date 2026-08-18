export const fixtureDate = '2026-08-18';

export const realCronFixture = `《AI、科技日报》  
2026-08-18 早报

## 今日要闻（5条）

1. NVIDIA 发布 Cosmos 3：全球首个开源“全模态”物理 AI 基础模型
发生了什么：在 GTC Taipei，NVIDIA 发布 Cosmos 3，作为开放的物理 AI 世界基础模型，把视觉推理、世界生成、动作预测整合进一个混合 Transformer 架构，可原生理解并生成文本/图像/视频/环境音/动作。
为什么重要：这是物理 AI（机器人、自动驾驶、视觉 AI）领域的旗舰开源模型，官方称在多个物理 AI 基准排名第一，把训练评估周期从“数月”缩到“数天”。
可能影响：Cosmos 3 提供 Super/Nano 两档，已对接 Hugging Face、GitHub 与多家云伙伴，机器人/自动驾驶开发者可低成本起步，并依赖 NVIDIA 算力与软件栈扩展物理 AI 工作流。
状态：已确认，L1 官方直抓。

2. NVIDIA Spectrum-6 以太网交换机落地“千兆级 AI 工厂”
发生了什么：102.4Tbps 的 Spectrum-6 交换机（Vera Rubin 平台配套）开始进入全球超大规模 AI 工厂，带宽是上一代 2 倍，宣称支持超 10 万 GPU 时仍保持 95% 网络效率。
为什么重要：当单个 AI 工厂接入数十万 GPU 时，网络成为算力瓶颈，端到端带宽、拥塞控制、机柜级设计与功耗散热决定训练与推理集群规模。
可能影响：首批客户含 CoreWeave、Microsoft、Nebius、OCI 等，基础设施团队应按端到端网络带宽、液冷、功耗包络与利用率规划 AI 容量，而非只看 GPU 采购。
状态：已确认，L1 官方直抓。

3. “Open Secure AI Alliance” 成立：150+ 巨头抱团建开源 AI 安全防线
发生了什么：以 NVIDIA、Linux 基金会 Akrites/OpenSSF 为基础，约 150 家机构共同成立 Open Secure AI Alliance，开发和共享网络防御技术、开放模型与开放 agent harness。
为什么重要：回应 7 月某开源模型平台安全事件中闭源 AI 无法区分攻击者与防御者的痛点，联盟主张“开放模型+开放 harness”是防御资产而非风险。
可能影响：NVIDIA 已开源 NOOA 智能体框架，安全团队应要求身份控制、最小权限、运行期审计与事故响应，才在生产环境部署防御型 AI agent。
状态：已确认，L1 官方直抓。

4. NVIDIA Nations AI：主权 AI 走向本地算力与本地数据
发生了什么：NVIDIA 案例库显示，印度 Sarvam 完全跑在印度本土基础设施上，用本地 GPU 为 22 种官方语言提供多语模型与语音智能体，数据、算力、治理全部留在国境内，NVIDIA 将其归入 Nations AI 主权 AI 战略。
为什么重要：主权 AI 让模型与算力采购变成国家基础设施决策，本地语言、数据驻留、本地能源、人才管线与供应链掌控开始与原始 GPU 性能同等重要。
可能影响：国家与企业应按本地算力获取、数据边界、能源可得性、伙伴地理与区域合规规划主权 AI，而不是默认只有前沿模型一条路。
状态：已确认，L2 权威案例直抓。

5. OpenAI 加入 PORTS-Pike 项目：全球事务布局再进一步
发生了什么：OpenAI 官网新闻列表显示其加入 PORTS-Pike 项目，归类为“全球事务”（Global Affairs），延续其近期在基础设施、能源与公共事务合作上的扩张布局。
为什么重要：前沿大厂的全球事务动作正从模型与产品发布，转向基础设施、能源与跨区域合作信号，决定主权 AI 与企业算力在哪里落地。
可能影响：具体项目内容、参与角色与资金规模待官方深层页面确认；企业应把 PORTS-Pike 视作布局信号而非确定的产能或采购催化剂。
状态：待确认（仅官网列表标题佐证）。

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
  { title: 'NVIDIA 发布 Cosmos 3：全球首个开源“全模态”物理 AI 基础模型', sourceProjectionRuleMatches: ['nvidia-cosmos-3-physical-ai-2026'], enLabel: 'NVIDIA / Cosmos / GTC / compute infrastructure', zhEvidence: '来源条目 1：NVIDIA 发布 Cosmos 3：全球首个开源“全模态”物理 AI 基础模型', requiredTokens: ['Cosmos 3', '物理 AI 世界基础模型', 'GTC Taipei', '混合 Transformer'] },
  { title: 'NVIDIA Spectrum-6 以太网交换机落地“千兆级 AI 工厂”', sourceProjectionRuleMatches: ['nvidia-ai-cloud-ecosystem'], enLabel: 'NVIDIA / Spectrum-6 / AI factory networking infrastructure', zhEvidence: '来源条目 2：NVIDIA Spectrum-6 以太网交换机落地“千兆级 AI 工厂”', requiredTokens: ['Spectrum-6', '102.4Tbps', 'Vera Rubin', 'CoreWeave'] },
  { title: '“Open Secure AI Alliance” 成立：150+ 巨头抱团建开源 AI 安全防线', sourceProjectionRuleMatches: ['china-waic-agent-safety-evaluation-2026'], enLabel: 'NVIDIA / Open Secure AI Alliance / open AI security', zhEvidence: '来源条目 3：“Open Secure AI Alliance” 成立：150+ 巨头抱团建开源 AI 安全防线', requiredTokens: ['Open Secure AI Alliance', '150+', '开放 agent harness', '开源 AI 安全'] },
  { title: 'NVIDIA Nations AI：主权 AI 走向本地算力与本地数据', sourceProjectionRuleMatches: ['nvidia-ai-cloud-ecosystem'], enLabel: 'NVIDIA / Nations AI / sovereign AI strategy', zhEvidence: '来源条目 4：NVIDIA Nations AI：主权 AI 走向本地算力与本地数据', requiredTokens: ['Nations AI', '主权 AI', 'Sarvam', '22 种官方语言', '本地算力'] },
  { title: 'OpenAI 加入 PORTS-Pike 项目：全球事务布局再进一步', sourceProjectionRuleMatches: ['china-world-ai-cooperation-organization-2026'], enLabel: 'OpenAI / PORTS-Pike / global affairs infrastructure', zhEvidence: '来源条目 5：OpenAI 加入 PORTS-Pike 项目：全球事务布局再进一步', requiredTokens: ['PORTS-Pike', 'Global Affairs', '全球事务'] },
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
  '用于补齐日报来源核验矩阵',
  '-…',
  '...',
];

export const requiredEnglishOutputs = [
  '### 1. NVIDIA / Cosmos / GTC / compute infrastructure',
  '### 2. NVIDIA / Spectrum-6 / AI factory networking infrastructure',
  '### 3. NVIDIA / Open Secure AI Alliance / open AI security',
  '### 4. NVIDIA / Nations AI / sovereign AI strategy',
  '### 5. OpenAI / PORTS-Pike / global affairs infrastructure',
  'Evidence item 1: NVIDIA / Cosmos / GTC / compute infrastructure',
  'Evidence item 5: OpenAI / PORTS-Pike / global affairs infrastructure',
  '## Case-Level FAQ',
  '## Today’s Bottom Line',
  '## What to Watch Tomorrow',
  '## Evidence Matrix',
];

export const requiredZhOutputs = [
  'NVIDIA 发布 Cosmos 3：全球首个开源“全模态”物理 AI 基础模型',
  'NVIDIA Spectrum-6 以太网交换机落地“千兆级 AI 工厂”',
  '“Open Secure AI Alliance” 成立：150+ 巨头抱团建开源 AI 安全防线',
  'NVIDIA Nations AI：主权 AI 走向本地算力与本地数据',
  'OpenAI 加入 PORTS-Pike 项目：全球事务布局再进一步',
  '把日报信号转成一次可重复实验',
  '企业侧：权限与审计是 agent 落地上限',
  '## 今日结论',
  '## 明日跟踪点',
  '## 证据矩阵',
  '来源条目 1：NVIDIA 发布 Cosmos 3：全球首个开源“全模态”物理 AI 基础模型',
  '来源条目 5：OpenAI 加入 PORTS-Pike 项目：全球事务布局再进一步',
];

export const caseLevelFaqSignals = [
  {
    label: 'Cosmos 3 physical AI world model validation',
    sourceStoryMatchTerms: ['Cosmos 3', '物理 AI 世界基础模型'],
    requiredTerms: ['world model', 'simulation', 'synthetic data', 'robotics', 'autonomous systems'],
    links: ['/en/blog/what-is-openclaw/', '/en/blog/openclaw-vps-deployment-complete-guide/'],
  },
  {
    label: 'Spectrum-6 AI factory networking verification',
    sourceStoryMatchTerms: ['Spectrum-6', '102.4Tbps', 'Vera Rubin'],
    requiredTerms: ['network bandwidth', 'congestion control', 'liquid cooling', 'power envelopes', 'utilization'],
    links: ['/en/blog/openclaw-model-fallback-strategy/', '/en/blog/openclaw-vps-deployment-complete-guide/'],
  },
  {
    label: 'Open Secure AI Alliance defensive agent validation',
    practicalCaseMatchTerms: ['企业侧：权限与审计是 agent 落地上限', '权限与审计'],
    sourceStoryMatchTerms: ['Open Secure AI Alliance', '开放 agent harness'],
    requiredTerms: ['open models', 'audit', 'evaluate', 'isolate', 'incident response'],
    links: ['/en/blog/openclaw-model-fallback-strategy/', '/en/blog/openclaw-vps-deployment-complete-guide/'],
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
    sourceStoryMatchTerms: ['Cosmos 3'],
    requiredTerms: ['repeatable experiment', 'information organization', 'learning review', 'low-risk decision'],
    links: ['/en/blog/what-is-openclaw/', '/en/blog/openclaw-vps-deployment-complete-guide/'],
  },
];

export const parserGuardrails = {
  story1RequiredDetailTokens: ['Cosmos 3', '物理 AI 世界基础模型', 'GTC Taipei', '混合 Transformer'],
  story1ForbiddenDetailTokens: ['Spectrum-6', 'Open Secure', 'Nations AI', 'PORTS-Pike'],
  story2RequiredDetailTokens: ['Spectrum-6', '102.4Tbps', 'Vera Rubin', 'CoreWeave'],
  story2ForbiddenDetailTokens: ['Cosmos 3', 'Open Secure', 'Nations AI', 'PORTS-Pike'],
  story3RequiredDetailTokens: ['Open Secure AI Alliance', '150+', '开放 agent harness', '开源 AI 安全'],
  story3ForbiddenDetailTokens: ['Cosmos 3', 'Spectrum-6', 'Nations AI', 'PORTS-Pike'],
  story4RequiredDetailTokens: ['Nations AI', '主权 AI', 'Sarvam', '22 种官方语言'],
  story4ForbiddenDetailTokens: ['Cosmos 3', 'Spectrum-6', 'Open Secure', 'PORTS-Pike'],
  story5RequiredDetailTokens: ['PORTS-Pike', 'Global Affairs', '全球事务'],
  story5ForbiddenDetailTokens: ['Cosmos 3', 'Spectrum-6', 'Open Secure', 'Nations AI'],
  story5ForbiddenEvidenceTokens: ['Cosmos 3', 'Spectrum-6', 'Open Secure', 'Nations AI'],
  story5ForbiddenZhEvidenceTokens: ['Cosmos 3', 'Spectrum-6', 'Open Secure', 'Nations AI'],
};
