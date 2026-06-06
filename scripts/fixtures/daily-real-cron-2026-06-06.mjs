export const fixtureDate = '2026-06-06';

export const realCronFixture = `《AI、科技日报》
截至：2026-06-06 07:30

## 今日要闻（5条）

### 1. OpenAI 更新 ChatGPT 记忆，并向所有登录用户开放 Lockdown Mode
发生了什么：OpenAI 6月4日发布说明：ChatGPT 记忆会更自动地更新上下文，减少过期/矛盾记忆；Lockdown Mode 向所有登录用户开放，可限制联网、深度研究、Agent、文件下载等能力，降低提示注入导致的数据外泄风险。
为什么重要：AI 产品开始把“长期记忆”和“安全隔离”同时推到主功能区。
可能影响：普通用户会得到更个性化的回答；企业和高敏感用户会更重视“何时关联网能力”。
来源：OpenAI Help Center，L1，直抓已确认。

---

### 2. NVIDIA 在韩国强调下半年 AI 基建与物理 AI
发生了什么：NVIDIA CEO 黄仁勋到访首尔，称 Grace Blackwell 表现良好，Vera Rubin 已进入 full production；下半年 AI 基础设施建设会很忙，并点名韩国在机器人、物理 AI、存储制造等方向的机会。
为什么重要：AI 竞争继续从“模型发布”转向“算力供应链+主权 AI+机器人落地”。
可能影响：韩国半导体、存储、机器人产业链可能成为 NVIDIA 下一阶段重点合作对象。
来源：NVIDIA Blog，L1，直抓已确认。

---

### 3. NVIDIA 发布 CVPR 物理 AI 研究：抓取、自动驾驶、虚拟智能体训练
发生了什么：NVIDIA Research 在 CVPR 展示三项研究：GraspGen-X 用20亿次模拟抓取训练通用抓取基础模型；LCDrive 用潜在表示降低自动驾驶推理 token 成本；NitroGen 用1000+游戏、4万小时交互训练 embodied agent。
为什么重要：机器人和自动驾驶的瓶颈正在从“能不能看懂”转向“能不能泛化、低延迟、低成本执行”。
可能影响：机器人抓取、车端推理、游戏/仿真训练会更快工程化。
来源：NVIDIA Blog，L1，直抓已确认。

---

### 4. 中国各省“十五五”规划中，AI 和算力成为最大共识
发生了什么：新华社报道，各省级“十五五”规划纲要密集发布，所有省市均提及“人工智能”和“算力”，30个省市提及“大模型”；北京、浙江、上海、广东被描述为第一梯队。
为什么重要：中国 AI 产业进入区域分工阶段，不再只是单点模型竞赛。
可能影响：北京偏模型与原始创新，长三角偏算力/芯片/产业链，珠三角偏应用落地，中西部偏算力支撑。
来源：新华网，L2，直抓已确认。

---

### 5. 中国启动 6G 创新发展部省协同试点
发生了什么：新华社报道，工信部组织开展 6G 创新发展部省协同试点专项行动，目标到2029年形成一批自主创新 6G 技术方案、业务场景和终端产品，支撑商用落地。
为什么重要：6G 被明确与 AI、卫星互联网、无线感知、具身智能、低空经济等融合。
可能影响：通信设备、芯片器件、操作系统、新型终端、工业制造和低空经济会提前进入试点窗口。
来源：新华网，L2，直抓已确认。

## 实战案例（2个）

1. 高敏感工作可考虑开启 Lockdown Mode
发生了什么：处理合同、源代码、财务、客户资料、公司内部文档时，默认限制联网和外部能力。
为什么重要：提示注入、恶意网页、外部文件都可能诱导 AI 泄露信息。
可能影响：需要查网页或跑 Agent 时再临时打开联网能力，编辑、总结、分析阶段尽量限制外部服务。

2. 机器人/自动驾驶团队应关注“仿真数据+低 token 推理”
发生了什么：NVIDIA 的 GraspGen-X、LCDrive、NitroGen 都指向大规模仿真训练和低成本部署。
为什么重要：机器人与车端 AI 的工程重点不只是最大模型，而是端侧延迟、任务成功率与仿真数据闭环。
可能影响：创业团队应把仿真数据、低 token 推理、任务成功率和人工复核做成可量化上线标准。
`;

export const expectedSignals = [
  {
    title: 'OpenAI 更新 ChatGPT 记忆，并向所有登录用户开放 Lockdown Mode',
    sourceProjectionRuleMatches: ['openai-chatgpt-memory-lockdown-2026'],
    enLabel: 'OpenAI / ChatGPT / Lockdown / agent platform',
    zhEvidence: '来源条目 1：OpenAI 更新 ChatGPT 记忆，并向所有登录用户开放 Lockdown Mode',
    requiredTokens: ['OpenAI', 'ChatGPT', 'Lockdown Mode', 'file downloads'],
  },
  {
    title: 'NVIDIA 在韩国强调下半年 AI 基建与物理 AI',
    sourceProjectionRuleMatches: ['nvidia-korea-ecosystem-2026'],
    enLabel: 'Korea / NVIDIA / CEO / compute infrastructure',
    zhEvidence: '来源条目 2：NVIDIA 在韩国强调下半年 AI 基建与物理 AI',
    requiredTokens: ['NVIDIA', 'Grace Blackwell', 'Vera Rubin', 'Korea'],
  },
  {
    title: 'NVIDIA 发布 CVPR 物理 AI 研究：抓取、自动驾驶、虚拟智能体训练',
    sourceProjectionRuleMatches: ['nvidia-cvpr-physical-ai-2026'],
    enLabel: 'NVIDIA / CVPR / Research / robotics deployment',
    zhEvidence: '来源条目 3：NVIDIA 发布 CVPR 物理 AI 研究：抓取、自动驾驶、虚拟智能体训练',
    requiredTokens: ['NVIDIA', 'GraspGen-X', 'LCDrive', 'NitroGen'],
  },
  {
    title: '中国各省“十五五”规划中，AI 和算力成为最大共识',
    sourceProjectionRuleMatches: ['china-provincial-ai-compute-plans-2026'],
    enLabel: 'Xinhua / China / compute infrastructure / AI chip supply',
    zhEvidence: '来源条目 4：中国各省“十五五”规划中，AI 和算力成为最大共识',
    requiredTokens: ['Xinhua', '30', 'Beijing', 'Zhejiang'],
  },
  {
    title: '中国启动 6G 创新发展部省协同试点',
    sourceProjectionRuleMatches: ['china-6g-province-ministry-pilot-2026'],
    enLabel: 'Xinhua / MIIT / China / AI chip supply',
    zhEvidence: '来源条目 5：中国启动 6G 创新发展部省协同试点',
    requiredTokens: ['Xinhua', 'MIIT', '6G', '2029'],
  },
];

export const bannedFallbackPhrases = [
  'Source 1 reports a agent platform',
  'Source 2 reports a compute infrastructure',
  'Source 3 reports a robotics deployment',
  'Source 4 reports a compute infrastructure',
  'Source 5 reports a AI chip supply',
  'This matters because OpenAI, ChatGPT',
  'The likely impact is a more specific evaluation path for NVIDIA',
  'adoption timing, infrastructure capacity, compliance exposure, or enterprise workflow readiness',
  'migration timing, partner dependency, governance review, cost exposure, and measurable rollout criteria',
  'today AI / technology daily not generated',
  '今日 AI / 科技日报暂未生成',
  '...',
];

export const requiredEnglishOutputs = [
  '### 1. OpenAI / ChatGPT / Lockdown / agent platform',
  '### 2. Korea / NVIDIA / CEO / compute infrastructure',
  '### 3. NVIDIA / CVPR / Research / robotics deployment',
  '### 4. Xinhua / China / compute infrastructure / AI chip supply',
  '### 5. Xinhua / MIIT / China / AI chip supply',
  'OpenAI’s June 4 ChatGPT release notes say Memory can stay more up to date',
  'NVIDIA CEO Jensen Huang visited Seoul and said Grace Blackwell is performing well',
  'NVIDIA Research highlighted three CVPR papers: GraspGen-X',
  'provincial 15th Five-Year Plan outlines are being published',
  'province-ministry coordinated 6G innovation pilots',
  'Evidence item 5: Xinhua / MIIT / China / AI chip supply',
  '## Today’s Bottom Line',
  '## What to Watch Tomorrow',
  '## Evidence Matrix',
];

export const requiredZhOutputs = [
  'OpenAI 更新 ChatGPT 记忆，并向所有登录用户开放 Lockdown Mode',
  'NVIDIA 在韩国强调下半年 AI 基建与物理 AI',
  'NVIDIA 发布 CVPR 物理 AI 研究：抓取、自动驾驶、虚拟智能体训练',
  '中国各省“十五五”规划中，AI 和算力成为最大共识',
  '中国启动 6G 创新发展部省协同试点',
  '## 今日结论',
  '## 明日跟踪点',
  '## 证据矩阵',
  '来源条目 1：OpenAI 更新 ChatGPT 记忆，并向所有登录用户开放 Lockdown Mode',
  '来源条目 5：中国启动 6G 创新发展部省协同试点',
];

export const parserGuardrails = {
  story5RequiredEnLabelTokens: ['Xinhua', 'MIIT'],
  story5ForbiddenEnLabelTokens: ['OpenAI', 'NVIDIA', 'Korea'],
  story5RequiredDetailTokens: ['6G', '2029年', '工信部'],
  story5ForbiddenDetailTokens: ['Lockdown Mode', 'Grace Blackwell', 'GraspGen-X'],
  story5ForbiddenEvidenceTokens: ['Lockdown Mode', 'Grace Blackwell', 'GraspGen-X'],
  story5ForbiddenZhEvidenceTokens: ['Lockdown Mode', 'Grace Blackwell', 'GraspGen-X'],
};
