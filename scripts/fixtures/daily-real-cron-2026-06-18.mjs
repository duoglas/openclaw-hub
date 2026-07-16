export const fixtureDate = '2026-06-18';

export const realCronFixture = `《AI、科技日报》  
2026-06-18 早报｜截至 07:30

## 今日要闻（5条）

### 1. AWS 推出一组面向企业 AI Agent 的新能力
**发生了什么：**  
AWS 在纽约峰会发布 AWS Continuum、AWS Context，以及 Amazon Quick、Kiro、AWS DevOps Agent、AWS Transform、Bedrock AgentCore 等更新，重点是让企业 Agent 能做安全、数据检索、研发和流程自动化。

**为什么重要：**  
AI Agent 正从“演示工具”进入企业生产系统。AWS 把重点放在安全、知识图谱、DevOps 和可审计执行上，说明云厂商竞争已从“模型 API”转向“企业级 Agent 基础设施”。

**可能影响：**  
企业会更容易把 Agent 接入代码、安全、数据和业务流程；同时，安全审计、权限控制、回滚能力会成为 Agent 落地的核心门槛。

---

### 2. Anthropic 在首尔开设办公室，并扩大韩国 AI 生态合作
**发生了什么：**  
Anthropic 宣布首尔办公室正式开放，并披露 NAVER、Nexon、LG CNS、Hanwha Solutions、Samsung SDS、Channel Corp、韩国高校研究联合体等使用或合作案例。

**为什么重要：**  
韩国是半导体、云、游戏、消费电子和企业 IT 的关键市场。Anthropic 进入韩国，说明头部模型公司正在从“在线产品竞争”转向“区域生态和行业客户竞争”。

**可能影响：**  
韩国企业的软件开发、客服、知识工作、AI 安全研究会更快接入 Claude；亚洲企业级大模型市场竞争会继续升温。

---

### 3. OpenAI 更新 ChatGPT Scheduled Tasks，并淡出 Pulse
**发生了什么：**  
OpenAI 在 ChatGPT 版本说明中更新 Scheduled Tasks：新增统一 Scheduled 页面，可查看、暂停、恢复、编辑和删除任务；任务更快更可靠；监控任务可搜索网页和连接应用。Pulse 将逐步退出，主动更新能力迁移到 Scheduled Tasks。

**为什么重要：**  
这是 AI 产品从“被动聊天”向“定时执行、持续监控、主动提醒”演进的明显信号。

**可能影响：**  
普通用户可以用 ChatGPT 做提醒、日报、价格/网页变化监控；企业用户会更关注无人值守任务的频率限制、可靠性和隐私边界。

---

### 4. 中国发布“人工智能+信息通信”创新发展实施意见
**发生了什么：**  
据新华社转载科技日报报道，工信部近日发布《“人工智能+信息通信”创新发展实施意见（2026—2028年）》。目标包括：到 2028 年形成 30 个以上高价值典型场景，城域算力 1 毫秒时延圈覆盖率不低于 75%；到 2030 年形成更完整的融合创新和产业生态。

**为什么重要：**  
这把 AI 与通信网络、算力网络、5G-A/6G、工业互联网、天基计算网络、智能体互联网等放在同一条产业主线里。

**可能影响：**  
运营商、通信设备商、算力基础设施、工业互联网公司会获得更明确的政策方向；“网络自智”“智算网络”“行业智能体”可能成为中国 AI 基建重点。

---

### 5. NVIDIA Blackwell 在 MLPerf Training 6.0 中全面领先
**发生了什么：**  
NVIDIA 官方博客称，Blackwell 平台在 MLPerf Training 6.0 的 7 项训练基准中均取得最快训练时间，并完成 8192 GPU 的 Blackwell NVL72 大规模训练提交。

**为什么重要：**  
大模型训练竞争仍然高度依赖基础设施。MoE、低精度训练、超大规模互联能力，是下一阶段模型训练成本和速度的关键。

**可能影响：**  
云厂商和大模型公司会继续加码 Blackwell/GB 系列集群；训练成本、集群可靠性和网络互联会继续决定前沿模型迭代速度。

---

## 实战案例（2个）

### 案例 1：AI Agent 进入企业安全和研发链路
AWS Continuum 的方向很清楚：不是让 Agent 只“建议修漏洞”，而是让它持续发现、验证、排序、修复，并提供可解释、可审计、可回滚的过程。

**可借鉴点：**  
企业落地 Agent，不应先追求“全自动”，而应先建立三件事：  
- 明确权限边界  
- 所有操作可审计  
- 支持人工确认和回滚  

这比单纯接一个大模型更重要。

---

### 案例 2：ChatGPT Scheduled Tasks 适合做低风险持续监控
ChatGPT Scheduled Tasks 更适合从网页变化、价格提醒、例行日报、资料更新提醒这类低风险任务开始，而不是直接接管高风险业务动作。

**可借鉴点：**  
先把任务限定在“提醒和草稿”，再逐步加入确认、权限、频率限制和日志。

## 今日结论

- 最值得关注：企业级 AI 正在加速进入核心业务流程，AI 不再只是聊天工具，而是在进入税务、法务、制造、运维、推理服务等真实生产系统。
- 给普通用户建议：短期优先选择权限透明、可断开授权、有来源标注的 AI 产品，把它用于信息整理、学习复盘、日常文档和低风险决策辅助。
- 给团队建议：不要只比较模型榜单，先选一个高频流程做试点，并把权限、审计、成本和人工复核写进上线标准。

## 明日跟踪点

- 关注今日提到的模型、平台或硬件动态是否出现产品化细节。
- 关注企业案例是否披露真实使用场景、权限控制和成本变化。
- 关注政策、版权、数据安全或来源标注要求是否进一步收紧。

## 证据矩阵

- 来源条目 1：AWS 推出一组面向企业 AI Agent 的新能力 —— AWS 在纽约峰会发布 AWS Continuum、AWS Context，以及 Amazon Quick、Kiro、AWS DevOps Agent、AWS Transform、Bedrock AgentCore 等更新，重点是让企业 Agent 能做安全、数据检索、研发和流程自动化。
- 来源条目 2：Anthropic 在首尔开设办公室，并扩大韩国 AI 生态合作 —— Anthropic 宣布首尔办公室正式开放，并披露 NAVER、Nexon、LG CNS、Hanwha Solutions、Samsung SDS、Channel Corp、韩国高校研究联合体等使用或合作案例。
- 来源条目 3：OpenAI 更新 ChatGPT Scheduled Tasks，并淡出 Pulse —— OpenAI 在 ChatGPT 版本说明中更新 Scheduled Tasks：新增统一 Scheduled 页面，可查看、暂停、恢复、编辑和删除任务；任务更快更可靠；监控任务可搜索网页和连接应用。Pulse 将逐步退出，主动更新能力迁移到 Scheduled Tasks。
- 来源条目 4：中国发布“人工智能+信息通信”创新发展实施意见 —— 据新华社转载科技日报报道，工信部近日发布《“人工智能+信息通信”创新发展实施意见（2026—2028年）》。目标包括：到 2028 年形成 30 个以上高价值典型场景，城域算力 1 毫秒时延圈覆盖率不低于 75%；到 2030 年形成更完整的融合创新和产业生态。
- 来源条目 5：NVIDIA Blackwell 在 MLPerf Training 6.0 中全面领先 —— NVIDIA 官方博客称，Blackwell 平台在 MLPerf Training 6.0 的 7 项训练基准中均取得最快训练时间，并完成 8192 GPU 的 Blackwell NVL72 大规模训练提交。
`;

export const expectedSignals = [
  { title: 'AWS 推出一组面向企业 AI Agent 的新能力', sourceProjectionRuleMatches: ['aws-agent-continuum-enterprise-agentcore-2026'], enLabel: 'AWS / AgentCore / managed agent runtime', zhEvidence: '来源条目 1：AWS 推出一组面向企业 AI Agent 的新能力', requiredTokens: ['AWS Continuum', 'AWS Context', 'Amazon Quick', 'Bedrock AgentCore'] },
  { title: 'Anthropic 在首尔开设办公室，并扩大韩国 AI 生态合作', sourceProjectionRuleMatches: ['anthropic-korea-seoul-office-ecosystem-2026'], enLabel: 'Anthropic / Korea / regional AI ecosystem', zhEvidence: '来源条目 2：Anthropic 在首尔开设办公室，并扩大韩国 AI 生态合作', requiredTokens: ['Anthropic', 'Seoul office', 'NAVER', 'Nexon'] },
  { title: 'OpenAI 更新 ChatGPT Scheduled Tasks，并淡出 Pulse', sourceProjectionRuleMatches: ['openai-chatgpt-scheduled-tasks-pulse-2026'], enLabel: 'OpenAI / ChatGPT / Scheduled / enterprise AI rollout', zhEvidence: '来源条目 3：OpenAI 更新 ChatGPT Scheduled Tasks，并淡出 Pulse', requiredTokens: ['ChatGPT Scheduled Tasks', 'Pulse', 'web search', 'connected apps'] },
  { title: '中国发布“人工智能+信息通信”创新发展实施意见', sourceProjectionRuleMatches: ['china-ai-ict-innovation-plan-2026'], enLabel: 'Science and Technology Daily / Xinhua / MIIT / compute infrastructure', zhEvidence: '来源条目 4：中国发布“人工智能+信息通信”创新发展实施意见', requiredTokens: ['MIIT', '2026–2028', '30 high-value', '75% coverage'] },
  { title: 'NVIDIA Blackwell 在 MLPerf Training 6.0 中全面领先', sourceProjectionRuleMatches: ['nvidia-blackwell-mlperf-training-6-2026'], enLabel: 'NVIDIA / Blackwell / MLPerf / model capability update', zhEvidence: '来源条目 5：NVIDIA Blackwell 在 MLPerf Training 6.0 中全面领先', requiredTokens: ['NVIDIA', 'Blackwell', 'MLPerf Training 6.0', '8192 GPU'] },
];

export const bannedFallbackPhrases = [
  'The source tracks agent platform, model capability update, enterprise AI rollout, AI security control around AWS, Agent, Continuum, Context',
  'The source tracks model capability update, workplace AI, enterprise AI rollout, strategic partnership around Korea, Anthropic, NAVER, Nexon',
  'The source tracks enterprise AI rollout, model release management, reliable agent execution around OpenAI, ChatGPT, Scheduled, Tasks',
  'The source tracks model capability update, compute infrastructure, reliable agent execution around NVIDIA, Blackwell, MLPerf, Training',
  'giving the daily brief a named actor and deployment context',
  'buyers must check access control, infrastructure availability, operational risk',
  'today AI / technology daily not generated',
  '今日 AI / 科技日报暂未生成',
  '-…',
  '...',
];

export const requiredEnglishOutputs = [
  '### 1. AWS / AgentCore / managed agent runtime',
  '### 2. Anthropic / Korea / regional AI ecosystem',
  '### 3. OpenAI / ChatGPT / Scheduled / enterprise AI rollout',
  '### 4. Science and Technology Daily / Xinhua / MIIT / compute infrastructure',
  '### 5. NVIDIA / Blackwell / MLPerf / model capability update',
  'AWS introduced AWS Continuum, AWS Context, Amazon Quick, Kiro, AWS DevOps Agent, AWS Transform, and Bedrock AgentCore',
  'Anthropic opened its Seoul office and named NAVER, Nexon, LG CNS, Hanwha Solutions, Samsung SDS, Channel Corp',
  'OpenAI updated ChatGPT Scheduled Tasks with a unified Scheduled page',
  'China’s MIIT issued an AI + information and communications implementation plan for 2026–2028',
  'NVIDIA said Blackwell delivered the fastest training time across all seven MLPerf Training 6.0 benchmarks',
  'Evidence item 1: AWS / AgentCore / managed agent runtime',
  'Evidence item 2: Anthropic / Korea / regional AI ecosystem',
  'Evidence item 3: OpenAI / ChatGPT / Scheduled / enterprise AI rollout',
  'Evidence item 4: Science and Technology Daily / Xinhua / MIIT / compute infrastructure',
  'Evidence item 5: NVIDIA / Blackwell / MLPerf / model capability update',
  '## Today’s Bottom Line',
  '## What to Watch Tomorrow',
  '## Evidence Matrix',
];

export const requiredZhOutputs = [
  'AWS 推出一组面向企业 AI Agent 的新能力',
  'Anthropic 在首尔开设办公室，并扩大韩国 AI 生态合作',
  'OpenAI 更新 ChatGPT Scheduled Tasks，并淡出 Pulse',
  '中国发布“人工智能+信息通信”创新发展实施意见',
  'NVIDIA Blackwell 在 MLPerf Training 6.0 中全面领先',
  '案例 2：ChatGPT Scheduled Tasks 适合做低风险持续监控',
  '## 今日结论',
  '## 明日跟踪点',
  '## 证据矩阵',
  '来源条目 1：AWS 推出一组面向企业 AI Agent 的新能力',
  '来源条目 5：NVIDIA Blackwell 在 MLPerf Training 6.0 中全面领先',
];

export const parserGuardrails = {
  story1RequiredDetailTokens: ['AWS Continuum', 'AWS Context', 'Bedrock AgentCore'],
  story1ForbiddenDetailTokens: ['Scheduled Tasks', 'MLPerf', '首尔办公室'],
  story1ForbiddenEvidenceTokens: ['Scheduled Tasks', 'MLPerf', 'Seoul office'],
  story1ForbiddenZhEvidenceTokens: ['Scheduled Tasks', 'MLPerf', '首尔办公室'],
  story3RequiredDetailTokens: ['Scheduled Tasks', '统一 Scheduled 页面', 'Pulse'],
  story3ForbiddenDetailTokens: ['AWS Continuum', 'MLPerf Training', '首尔办公室'],
  story3ForbiddenEvidenceTokens: ['AWS Continuum', 'MLPerf Training', 'Seoul office'],
  story3ForbiddenZhEvidenceTokens: ['AWS Continuum', 'MLPerf Training', '首尔办公室'],
  story5RequiredDetailTokens: ['MLPerf Training 6.0', '8192 GPU', 'Blackwell NVL72'],
  story5ForbiddenDetailTokens: ['Scheduled Tasks', 'AWS Continuum', 'ChatGPT'],
  story5ForbiddenEvidenceTokens: ['Scheduled Tasks', 'AWS Continuum', 'ChatGPT'],
  story5ForbiddenZhEvidenceTokens: ['Scheduled Tasks', 'AWS Continuum', 'ChatGPT'],
};
