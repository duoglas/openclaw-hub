export const fixtureDate = '2026-08-10';

export const realCronFixture = `《AI、科技日报》  
2026-08-10 07:30｜截至发稿可核验信息

## 今日要闻（5条）

1. NVIDIA 支持的 Firebird 在亚美尼亚启动 CIS 区域最大 AI Factory

发生了什么：  
Firebird 在亚美尼亚启用大型 AI 工厂，采用 NVIDIA 加速计算与 Dell AI 基础设施。计划到 2027 年底部署超过 70,000 块 NVIDIA Rubin / Blackwell GPU，并建设 300MW AI 基础设施容量。

为什么重要：  
AI 算力正在从美国、中国等核心市场，扩散到更多“区域性算力枢纽”。国家和地区开始把 AI 算力视为本地语言、产业和公共机构的基础设施。

可能影响：  
未来大模型竞争不只看模型能力，也看谁能更快、更便宜、更稳定地拿到本地化算力。中小国家可能通过 AI Factory 参与全球 AI 产业链。

来源：NVIDIA 官方博客  
https://blogs.nvidia.com/blog/firebird-ai-factory-armenia-blackwell-rubin-dsx/

---

2. Open Secure AI Alliance 推出 SAFE 草案，聚焦 AI 安全事件共享

发生了什么：  
Open Secure AI Alliance 成员提出 Shared AI Findings Exchange（SAFE）工作组草案，希望建立 AI 安全事件、近失事件的保密共享与复盘机制。Linux Foundation 已开放 RFC。

为什么重要：  
AI Agent 开始接入企业系统、代码仓库、权限和工具链，安全风险不再只是“模型会不会乱答”，而是“Agent 会不会错误行动、越权调用、泄露数据”。

可能影响：  
企业部署 AI Agent 时，安全评估会从模型测评扩展到身份、权限、日志、运行时、供应链和事故复盘。AI 安全会更像传统网络安全：需要共享情报和行业标准。

来源：NVIDIA / Linux Foundation / GitHub RFC  
https://blogs.nvidia.com/blog/open-secure-ai-alliance-contributions/  
https://www.linuxfoundation.org/blog/proposing-the-safe-working-group-an-open-community-effort-to-improve-ai-security  
https://github.com/OpenSecureAIAlliance/RFCs

---

3. OpenAI GPT-5.6 系列已在 Amazon Bedrock 上进入 GA

发生了什么：  
Amazon 公告称，OpenAI GPT-5.6 Sol、Terra、Luna 已在 Amazon Bedrock 上正式可用。主打企业安全、区域内数据处理、硬件级隔离，以及 Prompt 缓存 90% 缓存输入折扣。

为什么重要：  
OpenAI 模型进入 AWS Bedrock，意味着企业可以在原有云治理、权限、审计、采购体系里直接使用 OpenAI 模型，而不是单独接入一套新平台。

可能影响：  
企业 AI 采购会更偏向“模型超市 + 云上治理”。模型厂商之间的竞争，会越来越依赖云平台分发、合规能力和成本控制。

来源：Amazon 官方新闻  
https://www.aboutamazon.com/news/aws/bedrock-openai-models

---

4. Anthropic 恢复 Claude Fable 5 全球访问，并强化网络安全防护

发生了什么：  
Anthropic 公告称 Claude Fable 5 和 Mythos 5 此前曾因美国出口管制与网络安全绕过问题被暂停或限制，Claude Fable 5 于 7 月 1 日全球回归。Anthropic 表示已训练新的网络安全分类器，并围绕 jailbreak 严重度评分框架强化拦截。

为什么重要：  
前沿模型的发布已经和出口管制、网络安全测试、政府协作深度绑定。高能力模型不再只是产品问题，也是安全和监管问题。

可能影响：  
后续大模型发布节奏可能更谨慎。模型公司会投入更多资源在预发布测试、安全分类器、政府沟通和行业安全框架上。

来源：Anthropic 官方公告  
https://www.anthropic.com/news/redeploying-fable-5

---

5. 中国 AI 视频大模型融资和商业化继续升温

发生了什么：  
新华网报道，近三个月，可灵 AI、生数科技、爱诗科技、演语科技等中国 AI 视频公司披露新增融资合计接近 300 亿元人民币。报道还提到，可灵 AI 全球用户数突破 1 亿，AI 短剧、广告、电商内容等场景正在加速落地。

为什么重要：  
AI 视频正在从“演示效果”进入“商业闭环”验证期。资本关注点开始从模型参数转向收入、留存、版权和算力成本。

可能影响：  
短剧、广告、游戏、影视预演、社媒内容生产会最先被重构。但版权合规、用户留存和算力成本会决定谁能留下。

来源：新华网  
https://www.news.cn/tech/20260810/ai-video-commercialization.html

## 实战案例

1. 企业团队：把 SAFE 事件共享理念提前写进 Agent 上线清单

适合场景：代码仓库助手、运维 Agent、客服工作流、数据分析助手、自动化审批。

建议打法：上线前定义 incident-note 模板、runtime log 字段、tool-call boundary、human escalation 规则，并把近失事件复盘加入每周安全会。

2. 内容团队：AI 视频已适合做“低成本试错”，但不要直接押全部产能

适合场景：短剧分镜、广告样片、直播切片、商品展示、脚本视觉化。

建议打法：先用 AI 视频做 10-20 条小样，测点击率和转化，再决定是否加预算。暂时不要把核心 IP、长剧集、强版权素材完全交给 AI 生成。
`;

export const expectedSignals = [
  { title: 'NVIDIA 支持的 Firebird 在亚美尼亚启动 CIS 区域最大 AI Factory', sourceProjectionRuleMatches: ['nvidia-ai-cloud-ecosystem'], enLabel: 'Armenia / Firebird / NVIDIA AI factory capacity', zhEvidence: '来源条目 1：NVIDIA 支持的 Firebird 在亚美尼亚启动 CIS 区域最大 AI Factory', requiredTokens: ['Firebird', '亚美尼亚', 'Rubin', 'Blackwell', '300MW'] },
  { title: 'Open Secure AI Alliance 推出 SAFE 草案，聚焦 AI 安全事件共享', sourceProjectionRuleMatches: ['china-waic-agent-safety-evaluation-2026'], enLabel: 'NVIDIA / Open Secure AI Alliance / SAFE / shared AI findings exchange', zhEvidence: '来源条目 2：Open Secure AI Alliance 推出 SAFE 草案，聚焦 AI 安全事件共享', requiredTokens: ['SAFE', 'Shared AI Findings Exchange', 'Linux Foundation'] },
  { title: 'OpenAI GPT-5.6 系列已在 Amazon Bedrock 上进入 GA', sourceProjectionRuleMatches: ['openai-amazon-bedrock-models'], enLabel: 'OpenAI / GPT-5.6 / Bedrock enterprise distribution', zhEvidence: '来源条目 3：OpenAI GPT-5.6 系列已在 Amazon Bedrock 上进入 GA', requiredTokens: ['OpenAI GPT-5.6 系列', 'Amazon Bedrock', 'Prompt 缓存'] },
  { title: 'Anthropic 恢复 Claude Fable 5 全球访问，并强化网络安全防护', sourceProjectionRuleMatches: ['anthropic-fable-jailbreak-severity-framework-2026'], enLabel: 'Anthropic / Claude Fable / export-control safety availability', zhEvidence: '来源条目 4：Anthropic 恢复 Claude Fable 5 全球访问，并强化网络安全防护', requiredTokens: ['Claude Fable 5 和 Mythos 5', '美国出口管制', '网络安全分类器'] },
  { title: '中国 AI 视频大模型融资和商业化继续升温', sourceProjectionRuleMatches: ['china-ai-commercialization-roi-2026'], enLabel: 'China / AI video / financing and commercialization race', zhEvidence: '来源条目 5：中国 AI 视频大模型融资和商业化继续升温', requiredTokens: ['可灵 AI', '生数科技', '爱诗科技', '演语科技', '300 亿元', '1 亿'] },
];

export const bannedFallbackPhrases = [
  'The source tracks model capability update',
  'The source tracks compute infrastructure',
  'giving the daily brief a named actor and deployment context',
  'buyers must check access control, infrastructure availability, operational risk',
  'today AI / technology daily not generated',
  '今日 AI / 科技日报暂未生成',
  '-…',
  '...',
];

export const requiredEnglishOutputs = [
  '### 1. Armenia / Firebird / NVIDIA AI factory capacity',
  '### 2. NVIDIA / Open Secure AI Alliance / SAFE / shared AI findings exchange',
  '### 3. OpenAI / GPT-5.6 / Bedrock enterprise distribution',
  '### 4. Anthropic / Claude Fable / export-control safety availability',
  '### 5. China / AI video / financing and commercialization race',
  'Evidence item 1: Armenia / Firebird / NVIDIA AI factory capacity',
  'Evidence item 5: China / AI video / financing and commercialization race',
  '## Case-Level FAQ',
  '## Today’s Bottom Line',
  '## What to Watch Tomorrow',
  '## Evidence Matrix',
];

export const requiredZhOutputs = [
  'NVIDIA 支持的 Firebird 在亚美尼亚启动 CIS 区域最大 AI Factory',
  'Open Secure AI Alliance 推出 SAFE 草案，聚焦 AI 安全事件共享',
  'OpenAI GPT-5.6 系列已在 Amazon Bedrock 上进入 GA',
  'Anthropic 恢复 Claude Fable 5 全球访问，并强化网络安全防护',
  '中国 AI 视频大模型融资和商业化继续升温',
  '把 SAFE 事件共享理念提前写进 Agent 上线清单',
  'AI 视频已适合做“低成本试错”',
  '## 今日结论',
  '## 明日跟踪点',
  '## 证据矩阵',
  '来源条目 1：NVIDIA 支持的 Firebird 在亚美尼亚启动 CIS 区域最大 AI Factory',
  '来源条目 5：中国 AI 视频大模型融资和商业化继续升温',
];

export const caseLevelFaqSignals = [
  {
    label: 'SAFE agent incident-sharing launch checklist',
    practicalCaseMatchTerms: ['SAFE 事件共享', 'Agent 上线清单'],
    sourceStoryMatchTerms: ['SAFE', 'Shared AI Findings Exchange', 'Open Secure AI Alliance'],
    requiredTerms: ['incident-note template', 'runtime log', 'tool-call boundary', 'human escalation'],
    links: ['/en/blog/openclaw-security-hardening-2026/', '/en/blog/openclaw-model-fallback-strategy/'],
  },
  {
    label: 'AI video low-cost creative testing',
    practicalCaseMatchTerms: ['AI 视频', '低成本试错'],
    sourceStoryMatchTerms: ['可灵 AI', 'AI video', 'commercialization race'],
    requiredTerms: ['rights review', 'retention check', 'compute-cost guardrail'],
    links: ['/en/blog/what-is-openclaw/', '/en/blog/openclaw-vps-cost-comparison-2026/'],
  },
  {
    label: 'Bedrock model distribution procurement check',
    sourceStoryMatchTerms: ['Amazon Bedrock', 'GPT-5.6', 'Prompt 缓存'],
    requiredTerms: ['in-region processing', 'prompt-cache economics', 'audit log'],
    links: ['/en/blog/openclaw-vps-deployment-complete-guide/', '/en/blog/openclaw-model-fallback-strategy/'],
  },
];

export const parserGuardrails = {
  story1RequiredDetailTokens: ['Firebird', '亚美尼亚', '300MW'],
  story1ForbiddenDetailTokens: ['SAFE', 'Amazon Bedrock', 'Claude Fable', '可灵 AI'],
  story2RequiredDetailTokens: ['SAFE', 'Shared AI Findings Exchange', 'Linux Foundation'],
  story2ForbiddenDetailTokens: ['Firebird', 'Amazon Bedrock', 'Claude Fable', '可灵 AI'],
  story3RequiredDetailTokens: ['OpenAI GPT-5.6 系列', 'Amazon Bedrock', 'Prompt 缓存'],
  story3ForbiddenDetailTokens: ['Firebird', 'SAFE', 'Claude Fable', '可灵 AI'],
  story4RequiredDetailTokens: ['Claude Fable 5 和 Mythos 5', '美国出口管制', '网络安全分类器'],
  story4ForbiddenDetailTokens: ['Firebird', 'SAFE', 'Amazon Bedrock', '可灵 AI'],
  story5RequiredDetailTokens: ['可灵 AI', '生数科技', '爱诗科技', '演语科技'],
  story5ForbiddenDetailTokens: ['Firebird', 'SAFE', 'Amazon Bedrock', 'Claude Fable'],
};
