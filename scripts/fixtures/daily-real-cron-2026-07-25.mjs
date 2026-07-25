export const fixtureDate = '2026-07-25';

export const realCronFixture = `《AI、科技日报》  
2026-07-25 早间版

## 今日要闻（5条）

1. OpenAI 推出 Health in ChatGPT

发生了什么：  
OpenAI 宣布向美国 18 岁以上登录用户推出 Health in ChatGPT，可连接 Apple Health 和支持的医疗记录，用于理解体检、睡眠、活动、用药、就诊记录等信息。

为什么重要：  
AI 正从“问答工具”进入高度敏感的个人健康数据场景。OpenAI 明确称，连接的医疗记录和 Apple Health 数据不用于训练基础模型或广告定向。

可能影响：  
普通用户会更容易用 AI 整理健康信息；医疗、保险、可穿戴设备生态会更重视“AI + 个人数据”的隐私边界。

2. NVIDIA 与韩国 KAIST 启动联合 AI 研究实验室

发生了什么：  
NVIDIA 在 AI Summit 期间披露，与韩国 KAIST 在首尔成立联合 AI 研究实验室，重点推进韩国的 agentic AI 研究。韩国总统、三星、现代、NAVER 等产业界代表也参与相关交流。

为什么重要：  
这不是单纯卖芯片，而是“国家 AI 能力 + 产业集团 + 高校 + NVIDIA 生态”的组合推进。

可能影响：  
韩国会加速把 AI 用到半导体、汽车、搜索、机器人等产业；亚洲国家级 AI 基础设施竞争继续升温。

3. NVIDIA 开源医疗物理仿真框架

发生了什么：  
NVIDIA 宣布在 Isaac for Healthcare 中开源 GPU 加速的 Medical Physics Simulation 框架，用于医疗机器人开发中的解剖结构、器械接触、传感器输入和训练环境仿真。

为什么重要：  
医疗机器人训练很难拿到足够真实、复杂、罕见场景数据。仿真可在进入真实硬件和临床前，先发现失败模式。

可能影响：  
手术机器人、导管导航、医疗数字孪生会更快迭代；但真正落地仍需要监管、临床验证和安全证据。

4. 2026 世界人工智能大会闭幕，中国 AI 产业签约规模扩大

发生了什么：  
新华社报道，2026 世界人工智能大会在上海闭幕，现场观众超 40 万人次，177 个采购团组预计达成意向采购金额约 203.6 亿元；上海 AI 重点项目集中签约 32 个，投资额超 409 亿元。

为什么重要：  
中国 AI 产业重点已从“模型发布”走向基础设施、智能体、具身智能、科学智能等落地项目。

可能影响：  
未来一年，国内 AI 竞争会更多体现在行业项目、算力供给、机器人和政企场景，而不只是聊天机器人。

5. OpenAI 推出面向小企业的 ChatGPT 计划

发生了什么：  
OpenAI 发布 ChatGPT for small businesses program，提供线上培训、线下 AI academy、上手指南，以及 Dropbox、Shopify、Intuit、Slack、Atlassian、Wix 等合作伙伴资源。

为什么重要：  
AI 公司开始把“企业级 agent 工作流”下沉到小企业。目标不是让用户会聊天，而是帮老板处理营销、电商、会计、客服、库存、协作等多步骤任务。

可能影响：  
小企业 SaaS 市场会被 AI agent 重新切分；传统工具厂商需要更紧密接入 AI 工作流。

## 实战案例（1-2个）

1. 医疗健康：ChatGPT Health

可怎么用：  
把体检报告、睡眠、运动、用药、就诊记录放在同一上下文里，让 AI 帮你整理变化、生成就诊前问题清单、解释术语。

注意：  
这类工具适合做“信息整理”和“提问准备”，不能替代医生诊断。涉及隐私时，要确认授权范围和数据训练政策。

2. 医疗机器人：NVIDIA Isaac for Healthcare 仿真

可怎么用：  
医疗机器人团队可先在虚拟环境中模拟导管、软组织、X 光成像、接触摩擦和异常场景，再训练或评估策略。

注意：  
这是研发效率工具，不等于临床安全已经被证明。真正商业化仍要看监管路径和真实世界验证。
`;

export const expectedSignals = [
  { title: 'OpenAI 推出 Health in ChatGPT', sourceProjectionRuleMatches: ['openai-chatgpt-memory-lockdown-2026'], enLabel: 'OpenAI / Health in ChatGPT / personal health data controls', zhEvidence: '来源条目 1：OpenAI 推出 Health in ChatGPT', requiredTokens: ['Health in ChatGPT', 'Apple Health', '不用于训练基础模型'] },
  { title: 'NVIDIA 与韩国 KAIST 启动联合 AI 研究实验室', sourceProjectionRuleMatches: ['nvidia-korea-ecosystem-2026'], enLabel: 'Korea / NVIDIA / KAIST / agentic AI research lab', zhEvidence: '来源条目 2：NVIDIA 与韩国 KAIST 启动联合 AI 研究实验室', requiredTokens: ['KAIST', '联合 AI 研究实验室', 'AI Summit'] },
  { title: 'NVIDIA 开源医疗物理仿真框架', sourceProjectionRuleMatches: ['nvidia-icra-sim-to-real'], enLabel: 'NVIDIA / Isaac for Healthcare / medical robotics simulation', zhEvidence: '来源条目 3：NVIDIA 开源医疗物理仿真框架', requiredTokens: ['Isaac for Healthcare', 'Medical Physics Simulation', '医疗机器人'] },
  { title: '2026 世界人工智能大会闭幕，中国 AI 产业签约规模扩大', sourceProjectionRuleMatches: ['china-waic-product-launch-pipeline-2026'], enLabel: 'China / WAIC / AI industry procurement and project pipeline', zhEvidence: '来源条目 4：2026 世界人工智能大会闭幕，中国 AI 产业签约规模扩大', requiredTokens: ['超 40 万人次', '203.6 亿元', '409 亿元'] },
  { title: 'OpenAI 推出面向小企业的 ChatGPT 计划', sourceProjectionRuleMatches: ['openai-academy-enterprise-ai-foundations-2026'], enLabel: 'OpenAI / ChatGPT / small business AI enablement', zhEvidence: '来源条目 5：OpenAI 推出面向小企业的 ChatGPT 计划', requiredTokens: ['small businesses program', 'Dropbox', 'Shopify', 'Intuit'] },
];

export const bannedFallbackPhrases = [
  'The source tracks model capability update',
  'The source tracks AI chip supply',
  'The source tracks AI hardware',
  'giving the daily brief a named actor and deployment context',
  'buyers must check access control, infrastructure availability, operational risk',
  'today AI / technology daily not generated',
  '今日 AI / 科技日报暂未生成',
  '-…',
  '...',
];

export const requiredEnglishOutputs = [
  '### 1. OpenAI / Health in ChatGPT / personal health data controls',
  '### 2. Korea / NVIDIA / KAIST / agentic AI research lab',
  '### 3. NVIDIA / Isaac for Healthcare / medical robotics simulation',
  '### 4. China / WAIC / AI industry procurement and project pipeline',
  '### 5. OpenAI / ChatGPT / small business AI enablement',
  'Evidence item 1: OpenAI / Health in ChatGPT / personal health data controls',
  'Evidence item 5: OpenAI / ChatGPT / small business AI enablement',
  '## Today’s Bottom Line',
  '## What to Watch Tomorrow',
  '## Evidence Matrix',
];

export const requiredZhOutputs = [
  'OpenAI 推出 Health in ChatGPT',
  'NVIDIA 与韩国 KAIST 启动联合 AI 研究实验室',
  'NVIDIA 开源医疗物理仿真框架',
  '2026 世界人工智能大会闭幕，中国 AI 产业签约规模扩大',
  'OpenAI 推出面向小企业的 ChatGPT 计划',
  '医疗健康：ChatGPT Health',
  '医疗机器人：NVIDIA Isaac for Healthcare 仿真',
  '## 今日结论',
  '## 明日跟踪点',
  '## 证据矩阵',
  '来源条目 1：OpenAI 推出 Health in ChatGPT',
  '来源条目 5：OpenAI 推出面向小企业的 ChatGPT 计划',
];

export const caseLevelFaqSignals = [
  {
    label: 'Health in ChatGPT personal data controls',
    practicalCaseMatchTerms: ['医疗健康', 'ChatGPT Health', '体检报告', '睡眠', '就诊记录', '隐私'],
    sourceStoryMatchTerms: ['Health in ChatGPT', 'Apple Health', '医疗记录'],
    requiredTerms: ['personal health data', 'authorization scope', 'doctor review'],
    links: ['/en/blog/openclaw-security-hardening-2026/', '/en/blog/what-is-openclaw/'],
  },
  {
    label: 'Medical robotics simulation validation',
    practicalCaseMatchTerms: ['医疗机器人', '虚拟环境', '导管', '临床安全'],
    sourceStoryMatchTerms: ['Isaac for Healthcare', 'Medical Physics Simulation', '医疗机器人'],
    requiredTerms: ['simulation fidelity', 'clinical validation', 'human review'],
    links: ['/en/blog/openclaw-model-fallback-strategy/', '/en/blog/openclaw-security-hardening-2026/'],
  },
];

export const parserGuardrails = {
  story1RequiredDetailTokens: ['Health in ChatGPT', 'Apple Health', '不用于训练基础模型'],
  story1ForbiddenDetailTokens: ['KAIST', 'Medical Physics Simulation', '203.6 亿元'],
  story2RequiredDetailTokens: ['KAIST', '联合 AI 研究实验室', 'AI Summit'],
  story2ForbiddenDetailTokens: ['Apple Health', 'Medical Physics Simulation', 'small businesses program'],
  story3RequiredDetailTokens: ['Isaac for Healthcare', 'Medical Physics Simulation', '医疗机器人'],
  story3ForbiddenDetailTokens: ['KAIST', '203.6 亿元', 'small businesses program'],
  story4RequiredDetailTokens: ['超 40 万人次', '203.6 亿元', '409 亿元'],
  story4ForbiddenDetailTokens: ['Apple Health', 'KAIST', 'Medical Physics Simulation'],
  story5RequiredDetailTokens: ['small businesses program', 'Dropbox', 'Shopify'],
  story5ForbiddenDetailTokens: ['Apple Health', 'KAIST', 'Medical Physics Simulation'],
};
