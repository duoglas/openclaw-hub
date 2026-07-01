export const fixtureDate = '2026-07-01';

export const realCronFixture = `《AI、科技日报》  
2026-07-01 早间版

## 今日要闻（5条）

1. Anthropic 推出 Claude Science 科研 AI 工作台

发生了什么：Anthropic 发布 Claude Science beta，面向 Pro、Max、Team、Enterprise 用户，支持 macOS/Linux，可接入科研数据库、Jupyter/R/HPC/SSH、GPU 计算，并生成可审计科研产物。

为什么重要：AI 从“聊天/写代码”进入科研流程本体，覆盖文献、数据分析、图表、手稿、计算资源调度。

可能影响：生命科学、药物研发、组学分析等团队会更快把 AI agent 嵌进真实科研流程；同时“可复现、可审计”会成为科研 AI 产品的核心卖点。

---

2. NVIDIA 把 BioNeMo Agent Toolkit 接入 Claude Science

发生了什么：NVIDIA 官方称，BioNeMo Agent Toolkit 已作为 Claude Science 的资源接入，提供 Evo 2、Boltz-2、OpenFold3、Parabricks、RAPIDS-singlecell、nvMolKit、BioNeMo NIM 等能力。

为什么重要：这说明科研 AI agent 不是只靠大模型推理，而是开始调用专业模型、GPU 加速库和行业工具链。

可能影响：药企、科研机构会更关注“模型 + 工具 + 算力 + 可验证流程”的组合，而不是单一大模型能力。

---

3. NVIDIA 发布/介绍 AI for Science 新软件栈

发生了什么：NVIDIA 在 ISC 相关场景介绍 DAQIRI、ALCHEMI NIM、cuPhoton 等，用于材料模拟、化学、天文观测数据处理、暗物质研究等。

为什么重要：AI 基础设施继续向科学计算扩展，GPU 加速从训练/推理进入实验数据采集、仿真、分析流水线。

可能影响：科研机构和企业研发会更依赖 GPU-native 工作流；高性能计算、AI、实验设备之间的边界会继续变薄。

---

4. AWS 投入 10 亿美元组建 Forward Deployed AI Engineering

发生了什么：AWS 宣布投入 10 亿美元建立 Forward Deployed Engineering 组织，把 AI 工程师嵌入客户团队，帮助客户在数天内共建、部署 agentic AI 系统。

为什么重要：云厂商竞争从“卖模型/算力”升级到“直接帮客户把 AI 落进业务流程”。

可能影响：企业 AI 项目会更偏向生产系统、知识图谱、治理、安全和内部能力迁移；传统咨询与云服务边界会被重塑。

---

5. AWS Summit D.C. 聚焦公共部门 AI 和机密云

发生了什么：AWS 在 Summit D.C. 公布公共部门相关 AI/云投资，包括 Secret Cloud for Industry、情报机构云迁移激励、FDE、能源科研、英国政府 AI 规模化等。

为什么重要：AI 正加速进入政府、国防、能源、情报等高安全要求场景。

可能影响：AI 基础设施的竞争会更看重合规、隔离、安全、主权和机密数据处理能力；公共部门可能成为下一轮大规模 AI 落地场景。

---

## 实战案例（2个）

1. 科研综述写作：Claude Science + 多 agent 审稿流程

Anthropic 提到，Allen Institute 研究者用 Claude Science 搭建约 20 个自定义技能的“计算综述模板”：子 agent 阅读论文、抽取核心主张和量化发现，再由 reviewer agent 检查准确性和引用。

价值：适合长综述、系统性文献回顾、跨论文证据整理。  
注意：不能跳过专家复核；AI 适合做“证据组织和初稿”，不适合直接替代学术判断。

---

2. 企业 AI 落地：AWS FDE 模式

AWS 称，FDE 会把工程师嵌入客户团队，用 agentic AI 和客户数据/治理体系共建生产系统，并留下知识图谱、runbook、架构文档和内部 champion。

价值：适合已经过了 PoC、想把 AI 放进真实业务流程的企业。  
注意：普通团队可借鉴的是“先选具体流程 + 明确业务指标 + 留下可复用流程资产”，不要只买工具。

## 今日结论

- 最值得关注：企业级 AI 正在加速进入核心业务流程，AI 不再只是聊天工具，而是在进入税务、法务、制造、运维、推理服务等真实生产系统。
- 给普通用户建议：短期优先选择权限透明、可断开授权、有来源标注的 AI 产品，把它用于信息整理、学习复盘、日常文档和低风险决策辅助。
- 给团队建议：不要只比较模型榜单，先选一个高频流程做试点，并把权限、审计、成本和人工复核写进上线标准。

## 明日跟踪点

- 关注今日提到的模型、平台或硬件动态是否出现产品化细节。
- 关注企业案例是否披露真实使用场景、权限控制和成本变化。
- 关注政策、版权、数据安全或来源标注要求是否进一步收紧。

## 证据矩阵

- 来源条目 1：Anthropic 推出 Claude Science 科研 AI 工作台 —— Anthropic 发布 Claude Science beta，面向 Pro、Max、Team、Enterprise 用户，支持 macOS/Linux，可接入科研数据库、Jupyter/R/HPC/SSH、GPU 计算，并生成可审计科研产物。
- 来源条目 2：NVIDIA 把 BioNeMo Agent Toolkit 接入 Claude Science —— NVIDIA 官方称，BioNeMo Agent Toolkit 已作为 Claude Science 的资源接入，提供 Evo 2、Boltz-2、OpenFold3、Parabricks、RAPIDS-singlecell、nvMolKit、BioNeMo NIM 等能力。
- 来源条目 3：NVIDIA 发布/介绍 AI for Science 新软件栈 —— NVIDIA 在 ISC 相关场景介绍 DAQIRI、ALCHEMI NIM、cuPhoton 等，用于材料模拟、化学、天文观测数据处理、暗物质研究等。
- 来源条目 4：AWS 投入 10 亿美元组建 Forward Deployed AI Engineering —— AWS 宣布投入 10 亿美元建立 Forward Deployed Engineering 组织，把 AI 工程师嵌入客户团队，帮助客户在数天内共建、部署 agentic AI 系统。
- 来源条目 5：AWS Summit D.C. 聚焦公共部门 AI 和机密云 —— AWS 在 Summit D.C. 公布公共部门相关 AI/云投资，包括 Secret Cloud for Industry、情报机构云迁移激励、FDE、能源科研、英国政府 AI 规模化等。
`;

export const expectedSignals = [
  { title: 'Anthropic 推出 Claude Science 科研 AI 工作台', sourceProjectionRuleMatches: ['anthropic-claude-science-research-workbench-2026'], enLabel: 'Anthropic / Claude Science / research agent workflow', zhEvidence: '来源条目 1：Anthropic 推出 Claude Science 科研 AI 工作台', requiredTokens: ['Claude Science beta', 'Jupyter/R/HPC/SSH', '可审计科研产物'] },
  { title: 'NVIDIA 把 BioNeMo Agent Toolkit 接入 Claude Science', sourceProjectionRuleMatches: ['nvidia-bionemo-agent-toolkit-claude-science-2026'], enLabel: 'NVIDIA / BioNeMo / scientific agent toolkit', zhEvidence: '来源条目 2：NVIDIA 把 BioNeMo Agent Toolkit 接入 Claude Science', requiredTokens: ['BioNeMo Agent Toolkit', 'Evo 2', 'BioNeMo NIM'] },
  { title: 'NVIDIA 发布/介绍 AI for Science 新软件栈', sourceProjectionRuleMatches: ['nvidia-ai-for-science-isc-software-stack-2026'], enLabel: 'NVIDIA / AI for Science / HPC software stack', zhEvidence: '来源条目 3：NVIDIA 发布/介绍 AI for Science 新软件栈', requiredTokens: ['ISC', 'DAQIRI', 'ALCHEMI NIM', 'cuPhoton'] },
  { title: 'AWS 投入 10 亿美元组建 Forward Deployed AI Engineering', sourceProjectionRuleMatches: ['aws-forward-deployed-ai-engineering-2026'], enLabel: 'AWS / FDE / enterprise agent deployment', zhEvidence: '来源条目 4：AWS 投入 10 亿美元组建 Forward Deployed AI Engineering', requiredTokens: ['10 亿美元', 'Forward Deployed Engineering', 'agentic AI 系统'] },
  { title: 'AWS Summit D.C. 聚焦公共部门 AI 和机密云', sourceProjectionRuleMatches: ['aws-summit-dc-public-sector-secret-cloud-2026'], enLabel: 'AWS / public sector / secret cloud AI', zhEvidence: '来源条目 5：AWS Summit D.C. 聚焦公共部门 AI 和机密云', requiredTokens: ['Secret Cloud for Industry', '情报机构云迁移激励', '公共部门'] },
];

export const bannedFallbackPhrases = [
  'The source tracks coding agent workflow, data infrastructure around Anthropic, Claude, Science, Pro',
  'The source tracks compute infrastructure, agent platform, model capability update around NVIDIA, BioNeMo, Agent, Toolkit',
  'The source tracks enterprise AI rollout, data infrastructure, simulation training around NVIDIA, Science, ISC, DAQIRI',
  'The source tracks compute infrastructure, model capability update, enterprise AI rollout, AI security control around AWS, Forward, Deployed, Engineering',
  'The source tracks AI security control, data infrastructure, compliance automation around AWS, Summit, D.C, Secret',
  'giving the daily brief a named actor and deployment context',
  'buyers must check access control, infrastructure availability, operational risk',
  'today AI / technology daily not generated',
  '今日 AI / 科技日报暂未生成',
  '-…',
  '...',
];

export const requiredEnglishOutputs = [
  '### 1. Anthropic / Claude Science / research agent workflow',
  '### 2. NVIDIA / BioNeMo / scientific agent toolkit',
  '### 3. NVIDIA / AI for Science / HPC software stack',
  '### 4. AWS / FDE / enterprise agent deployment',
  '### 5. AWS / public sector / secret cloud AI',
  'Anthropic released Claude Science beta for Pro, Max, Team, and Enterprise users',
  'NVIDIA said BioNeMo Agent Toolkit is available as a Claude Science resource',
  'NVIDIA described an AI for Science software stack around DAQIRI, ALCHEMI NIM, and cuPhoton',
  'AWS committed 1 billion USD to a Forward Deployed Engineering organization',
  'AWS Summit D.C. highlighted public-sector AI and cloud investments',
  'Evidence item 1: Anthropic / Claude Science / research agent workflow',
  'Evidence item 5: AWS / public sector / secret cloud AI',
  '## Today’s Bottom Line',
  '## What to Watch Tomorrow',
  '## Evidence Matrix',
];

export const requiredZhOutputs = [
  'Anthropic 推出 Claude Science 科研 AI 工作台',
  'NVIDIA 把 BioNeMo Agent Toolkit 接入 Claude Science',
  'NVIDIA 发布/介绍 AI for Science 新软件栈',
  'AWS 投入 10 亿美元组建 Forward Deployed AI Engineering',
  'AWS Summit D.C. 聚焦公共部门 AI 和机密云',
  '科研综述写作：Claude Science + 多 agent 审稿流程',
  '企业 AI 落地：AWS FDE 模式',
  '## 今日结论',
  '## 明日跟踪点',
  '## 证据矩阵',
  '来源条目 1：Anthropic 推出 Claude Science 科研 AI 工作台',
  '来源条目 5：AWS Summit D.C. 聚焦公共部门 AI 和机密云',
];

export const caseLevelFaqSignals = [
  {
    label: 'Claude Science research workflow',
    practicalCaseMatchTerms: ['Claude Science', '科研综述', 'reviewer agent'],
    sourceStoryMatchTerms: ['Claude Science', 'Jupyter/R/HPC/SSH', '可审计科研产物'],
    requiredTerms: ['Claude Science', 'reviewer agent', 'audit trail'],
    links: ['/en/blog/openclaw-model-fallback-strategy/', '/en/blog/openclaw-vps-deployment-complete-guide/'],
  },
  {
    label: 'AWS FDE enterprise deployment',
    practicalCaseMatchTerms: ['AWS FDE', 'Forward Deployed', '企业 AI 落地'],
    sourceStoryMatchTerms: ['Forward Deployed Engineering', 'agentic AI 系统', '10 亿美元'],
    requiredTerms: ['AWS FDE', 'production workflow', 'runbook'],
    links: ['/en/blog/openclaw-vps-deployment-complete-guide/', '/en/blog/what-is-openclaw/'],
  },
];

export const parserGuardrails = {
  story1RequiredDetailTokens: ['Claude Science beta', 'Jupyter/R/HPC/SSH', '可审计科研产物'],
  story1ForbiddenDetailTokens: ['BioNeMo Agent Toolkit', 'DAQIRI', 'Forward Deployed Engineering', 'Secret Cloud'],
  story1ForbiddenEvidenceTokens: ['BioNeMo Agent Toolkit', 'DAQIRI', 'Forward Deployed Engineering', 'Secret Cloud'],
  story2RequiredDetailTokens: ['BioNeMo Agent Toolkit', 'Evo 2', 'BioNeMo NIM'],
  story2ForbiddenDetailTokens: ['Forward Deployed Engineering', 'Secret Cloud for Industry'],
  story3RequiredDetailTokens: ['ISC', 'DAQIRI', 'ALCHEMI NIM', 'cuPhoton'],
  story3ForbiddenDetailTokens: ['BioNeMo Agent Toolkit', 'Forward Deployed Engineering', 'Secret Cloud'],
  story4RequiredDetailTokens: ['10 亿美元', 'Forward Deployed Engineering', 'agentic AI 系统'],
  story4ForbiddenDetailTokens: ['Claude Science beta', 'Secret Cloud for Industry'],
  story5RequiredDetailTokens: ['Secret Cloud for Industry', '情报机构云迁移激励', '公共部门'],
  story5ForbiddenDetailTokens: ['Claude Science beta', 'BioNeMo Agent Toolkit', 'DAQIRI'],
};
