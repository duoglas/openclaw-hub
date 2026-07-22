export const fixtureDate = '2026-07-22';

export const realCronFixture = `《AI、科技日报》  
2026-07-22 07:30｜中文简版

说明：本次检索中 web_search 连续失败，Google/Meta 官方页抓取也失败；以下只写已直抓到的官方来源。当天中国官方新消息未能稳定核到，相关判断不硬写。

## 今日要闻（5条）

1. OpenAI GPT-5.6 系列已在 Amazon Bedrock 上 GA

发生了什么：
AWS 官方称，OpenAI GPT-5.6 Sol、Terra、Luna 已在 Amazon Bedrock 上一般可用，支持企业安全、区域内数据处理、90% 缓存输入折扣，并与 OpenAI 一方价格匹配。

为什么重要：
OpenAI 模型进入 AWS 标准企业 AI 平台，说明“大模型分发”正在从单一官网/API 转向云厂商统一入口。

可能影响：
企业采购、合规、日志、权限和成本管理会更简单；普通开发者可在 AWS 生态里同时比较 OpenAI、Anthropic、Meta、Mistral 等模型。

2. Claude Fable 5 重新上线，AI 安全与出口管制成为行业主线

发生了什么：
Anthropic 官方称，Claude Fable 5 和 Mythos 5 此前因美国出口管制暂停访问，后续 Fable 5 自 7 月 1 日起恢复全球可用；Anthropic 同时强化网络安全分类器，并与 Amazon、Microsoft、Google 等推进 jailbreak 严重性评估框架。

为什么重要：
前沿模型不再只是“能力竞赛”，而是进入“能力、安全、监管、可用性”并行阶段。

可能影响：
高能力模型的访问权限、地区可用性、网络安全用法限制会更频繁变化；企业需要准备多模型备份方案。

3. Claude Fable 5 已回到 Amazon Bedrock

发生了什么：
Amazon 官方确认 Claude Fable 5 已重新可在 Amazon Bedrock 使用，可处理复杂编码、知识工作、视觉任务，并支持 Claude Platform on AWS。

为什么重要：
这补齐了 AWS 上的高端模型选择，也说明云厂商正在成为前沿模型恢复分发的关键渠道。

可能影响：
依赖 Claude 的企业项目可以逐步恢复部署；但涉及安全策略的任务仍可能出现更严格拦截。

4. AWS 投入 10 亿美元做“前置 AI 工程师”

发生了什么：
AWS 宣布投入 10 亿美元，建立 Forward Deployed Engineering 组织，把 AI 工程师嵌入客户团队，用 agentic AI 把部署周期从“数月”压缩到“数天”。

为什么重要：
AI 落地瓶颈已经从“有没有模型”转向“能不能改造业务流程”。云厂商开始直接下场做交付。

可能影响：
咨询公司、系统集成商、企业内部 IT 团队都会被迫升级；AI 项目会更强调业务结果，而不是单纯试用工具。

5. NVIDIA 强调 AI 基础设施进入“每瓦性能”竞争

发生了什么：
NVIDIA 官方文章称，AI 工厂的核心指标正在变成 performance per watt；GB300 NVL72 在 DeepSeek V4 Pro、GLM5.1、Kimi K2.6 等模型上相较 Hopper 有显著每瓦性能提升。

为什么重要：
大模型推理成本受电力、机房、互联限制越来越明显。芯片竞争不只是算力峰值，而是单位电力能产出多少 token。

可能影响：
中国与全球模型厂商都会更关注推理成本、MoE 架构、长上下文 agent 任务的能耗效率；普通用户端的价格战也会受底层成本影响。

## 实战案例

1. 企业 AI 部署：从“买模型”变成“选云平台 + 选模型组合”
OpenAI、Claude 都进入或回到 Bedrock 后，企业可以在同一套 IAM、日志、合规、账单体系下切换模型。

实战建议：
- 普通团队不要只绑定单一模型。
- 核心业务至少准备 2 个供应商：一个主力，一个备用。
- 评测重点放在：价格、延迟、上下文、工具调用、数据合规，而不是只看排行榜。

2. AI 编程与知识工作：安全拦截会更常见
Anthropic 的 Fable 5 事件说明，模型越强，安全策略越细；一些正常调试、漏洞分析、代码解释，也可能被更严格的分类器误拦。

实战建议：
- 做安全、运维、代码审计时，提示词要写清“防御性目的”。
- 关键任务保留人工复核和替代模型。
- 不要把生产流程设计成“某一个模型不可用就全停”。
`;

export const expectedSignals = [
  { title: 'OpenAI GPT-5.6 系列已在 Amazon Bedrock 上 GA', sourceProjectionRuleMatches: ['openai-amazon-bedrock-models'], enLabel: 'OpenAI / GPT-5.6 / Bedrock enterprise distribution', zhEvidence: '来源条目 1：OpenAI GPT-5.6 系列已在 Amazon Bedrock 上 GA', requiredTokens: ['GPT-5.6 Sol', 'Terra', 'Luna', '90% 缓存输入折扣'] },
  { title: 'Claude Fable 5 重新上线，AI 安全与出口管制成为行业主线', sourceProjectionRuleMatches: ['anthropic-fable-jailbreak-severity-framework-2026'], enLabel: 'Anthropic / Claude Fable / export-control safety availability', zhEvidence: '来源条目 2：Claude Fable 5 重新上线，AI 安全与出口管制成为行业主线', requiredTokens: ['Claude Fable 5 和 Mythos 5', '美国出口管制', '网络安全分类器'] },
  { title: 'Claude Fable 5 已回到 Amazon Bedrock', sourceProjectionRuleMatches: ['anthropic-fable-jailbreak-severity-framework-2026'], enLabel: 'Anthropic / Claude Fable / Bedrock enterprise distribution', zhEvidence: '来源条目 3：Claude Fable 5 已回到 Amazon Bedrock', requiredTokens: ['Amazon Bedrock', '复杂编码', 'Claude Platform on AWS'] },
  { title: 'AWS 投入 10 亿美元做“前置 AI 工程师”', sourceProjectionRuleMatches: ['aws-forward-deployed-ai-engineering-2026'], enLabel: 'AWS / FDE / enterprise agent deployment', zhEvidence: '来源条目 4：AWS 投入 10 亿美元做“前置 AI 工程师”', requiredTokens: ['10 亿美元', 'Forward Deployed Engineering', 'agentic AI'] },
  { title: 'NVIDIA 强调 AI 基础设施进入“每瓦性能”竞争', sourceProjectionRuleMatches: ['nvidia-blackwell-mlperf-training-6-2026'], enLabel: 'NVIDIA / Blackwell / performance-per-watt AI infrastructure', zhEvidence: '来源条目 5：NVIDIA 强调 AI 基础设施进入“每瓦性能”竞争', requiredTokens: ['performance per watt', 'GB300 NVL72', 'Kimi K2.6'] },
];

export const bannedFallbackPhrases = [
  'The source tracks model capability update',
  'giving the daily brief a named actor and deployment context',
  'buyers must check access control, infrastructure availability, operational risk',
  'AWS made GPT-5.5, GPT-5.4, and Codex available',
  'Artificial Analysis AgentPerf results show',
  'today AI / technology daily not generated',
  '今日 AI / 科技日报暂未生成',
  '-…',
  '...',
];

export const requiredEnglishOutputs = [
  '### 1. OpenAI / GPT-5.6 / Bedrock enterprise distribution',
  '### 2. Anthropic / Claude Fable / export-control safety availability',
  '### 3. Anthropic / Claude Fable / Bedrock enterprise distribution',
  '### 4. AWS / FDE / enterprise agent deployment',
  '### 5. NVIDIA / Blackwell / performance-per-watt AI infrastructure',
  'Evidence item 1: OpenAI / GPT-5.6 / Bedrock enterprise distribution',
  'Evidence item 2: Anthropic / Claude Fable / export-control safety availability',
  'Evidence item 3: Anthropic / Claude Fable / Bedrock enterprise distribution',
  'Evidence item 5: NVIDIA / Blackwell / performance-per-watt AI infrastructure',
  '## Today’s Bottom Line',
  '## What to Watch Tomorrow',
  '## Evidence Matrix',
];

export const requiredZhOutputs = [
  'OpenAI GPT-5.6 系列已在 Amazon Bedrock 上 GA',
  'Claude Fable 5 重新上线，AI 安全与出口管制成为行业主线',
  'Claude Fable 5 已回到 Amazon Bedrock',
  'AWS 投入 10 亿美元做“前置 AI 工程师”',
  'NVIDIA 强调 AI 基础设施进入“每瓦性能”竞争',
  '企业 AI 部署：从“买模型”变成“选云平台 + 选模型组合”',
  'AI 编程与知识工作：安全拦截会更常见',
  '## 今日结论',
  '## 明日跟踪点',
  '## 证据矩阵',
  '来源条目 1：OpenAI GPT-5.6 系列已在 Amazon Bedrock 上 GA',
  '来源条目 5：NVIDIA 强调 AI 基础设施进入“每瓦性能”竞争',
];

export const caseLevelFaqSignals = [
  {
    label: 'Bedrock model portfolio governance',
    practicalCaseMatchTerms: ['选云平台', '选模型组合', 'IAM'],
    sourceStoryMatchTerms: ['OpenAI GPT-5.6', 'Amazon Bedrock', 'Claude Fable 5 已重新可在 Amazon Bedrock'],
    requiredTerms: ['Bedrock', 'model fallback', 'audit logs'],
    links: ['/en/blog/openclaw-model-fallback-strategy/', '/en/blog/openclaw-vps-deployment-complete-guide/'],
  },
  {
    label: 'Claude safety fallback planning',
    practicalCaseMatchTerms: ['安全拦截', '防御性目的', '替代模型'],
    sourceStoryMatchTerms: ['美国出口管制', '网络安全分类器', 'jailbreak 严重性评估框架'],
    requiredTerms: ['defensive-use wording', 'fallback model', 'jailbreak severity'],
    links: ['/en/blog/openclaw-model-fallback-strategy/', '/en/blog/what-is-openclaw/'],
  },
];

export const parserGuardrails = {
  story1RequiredDetailTokens: ['GPT-5.6 Sol', 'Terra', 'Luna', '90% 缓存输入折扣'],
  story1ForbiddenDetailTokens: ['美国出口管制', 'Forward Deployed Engineering', 'Kimi K2.6'],
  story2RequiredDetailTokens: ['Claude Fable 5 和 Mythos 5', '美国出口管制', '网络安全分类器'],
  story2ForbiddenDetailTokens: ['Claude Platform on AWS', 'Forward Deployed Engineering', '每瓦性能'],
  story3RequiredDetailTokens: ['Amazon Bedrock', '复杂编码', 'Claude Platform on AWS'],
  story3ForbiddenDetailTokens: ['OpenAI GPT-5.6', 'Forward Deployed Engineering', '每瓦性能'],
  story4RequiredDetailTokens: ['10 亿美元', 'Forward Deployed Engineering', 'agentic AI'],
  story4ForbiddenDetailTokens: ['Claude Fable 5', '90% 缓存输入折扣', 'Kimi K2.6'],
  story5RequiredDetailTokens: ['performance per watt', 'GB300 NVL72', 'Kimi K2.6'],
  story5ForbiddenDetailTokens: ['Forward Deployed Engineering', 'Claude Platform on AWS', '美国出口管制'],
};
