export const fixtureDate = '2026-07-19';

export const realCronFixture = `《AI、科技日报》  
2026-07-19 07:30｜聚焦 AI / 科技行业

## 今日要闻（5条）

1. 上海 WAIC 释放全球 AI 治理信号
状态：已确认
发生了什么：2026 世界人工智能大会暨人工智能全球治理高级别会议 7 月 17-20 日在上海举行，主题为“智能伙伴 共创未来”。主席声明提出 AI 向善普惠、开源开放、数据安全、绿色算力、智能体边界、全球治理协作等议题；并提到《关于成立世界人工智能合作组织的协定》在上海签署。  
为什么重要：这不是单纯行业展会，而是把 AI 治理、产业链、标准、全球南方能力建设放到同一框架里。  
可能影响：国内 AI 政策重点会继续落在“应用落地 + 安全治理 + 国际合作”；企业侧要更重视合规、可追溯、智能体权限边界。

2. NVIDIA 把“智能/美元”推成 Agentic AI 新指标
状态：已确认  
发生了什么：NVIDIA 7月17日发文称，智能体时代的核心成本不只是一百万 token 的推理成本，还包括 Nemotron、NeMo RL、Vera Rubin 等体系支持的持续后训练，以及“intelligence per dollar”。  
为什么重要：行业成本竞争正在从“模型训练一次”转向“上线后持续强化、持续评测、持续适配工具环境”。  
可能影响：AI 基建采购会更看重后训练、RL、评测、推理一体化能力；企业自建 Agent 时，成本账会更复杂。

3. NVIDIA 推出 Jetson Thor 新模块，押注机器人和端侧 AI
状态：已确认  
发生了什么：NVIDIA 发布基于 Thor 架构的 Jetson / IGX T3000 和 Jetson T2000 模块，面向机器人、边缘 AI、视觉智能体等场景；T3000 可达 865 FP4 TFLOPS，T2000 可达 400 FP4 TFLOPS，提供更低门槛入口。  
为什么重要：机器人和端侧 AI 正从实验室走向规模部署，算力、功耗、成本是落地门槛。  
可能影响：人形机器人、工业机械臂、移动机器人、边缘视觉设备会更快进入“可量产硬件平台”竞争。

4. Anthropic 公开模型访问恢复与安全框架路线
状态：已确认  
发生了什么：Anthropic 公告称 Claude Fable 5 已恢复全球访问，并说明此前因出口管制、安全绕过评估而短暂停用；同时提出与 Amazon、Microsoft、Google 等推动行业级 jailbreak 严重度评分框架。  
为什么重要：前沿模型的发布不再只是产品问题，也会受到出口管制、安全评估、政府协作影响。  
可能影响：高能力模型未来可能出现更频繁的分级开放、区域限制、用途限制和预发布测试。

5. OpenAI 简化 ChatGPT 模型选择器
状态：已确认  
发生了什么：OpenAI 中文帮助中心显示，ChatGPT 模型选择器改为 Instant、Medium、High、Extra High、Pro Standard、Pro Extended 等更直观档位，并移除 Thinking Light。  
为什么重要：普通用户不再需要理解复杂模型名，而是按速度、推理强度和 Pro 档位选择。  
可能影响：AI 产品交互会继续从“选模型”转向“选任务强度”；普通用户更容易用到推理能力，但也更需要关注费用和速度。

## 实战案例（2个）

1. 普通用户怎么用新版模型选择  
可借鉴点：简单任务用 Instant；复杂写作、代码、分析用 Medium / High；非常难的规划、推理、多文件工作再考虑 Extra High 或 Pro 档位。默认别盲目开最高档，先用 Medium，高价值任务再升档。

2. 企业做 Agent 的成本账要重算  
可借鉴点：以前主要算 API token 成本，现在还要算后训练、评测、工具调用、失败重试、权限控制、日志追溯。团队可先选一个高频流程小范围上线，建立成功率、人工接管率、单次任务成本三项指标，再扩。
`;

export const expectedSignals = [
  { title: '上海 WAIC 释放全球 AI 治理信号', sourceProjectionRuleMatches: ['china-world-ai-cooperation-organization-2026'], enLabel: 'China / WAIC / AI governance conference', zhEvidence: '来源条目 1：上海 WAIC 释放全球 AI 治理信号', requiredTokens: ['2026 世界人工智能大会', '7 月 17-20 日', '智能伙伴 共创未来', '世界人工智能合作组织', '智能体边界'] },
  { title: 'NVIDIA 把“智能/美元”推成 Agentic AI 新指标', sourceProjectionRuleMatches: ['nvidia-nemoclaw-industrial-agents'], enLabel: 'NVIDIA / post-training / agentic AI infrastructure', zhEvidence: '来源条目 2：NVIDIA 把“智能/美元”推成 Agentic AI 新指标', requiredTokens: ['Nemotron', 'NeMo RL', 'Vera Rubin', '后训练', 'intelligence per dollar'] },
  { title: 'NVIDIA 推出 Jetson Thor 新模块，押注机器人和端侧 AI', sourceProjectionRuleMatches: ['nvidia-physical-ai-agent-skills-2026'], enLabel: 'NVIDIA / Jetson Thor / edge robotics AI modules', zhEvidence: '来源条目 3：NVIDIA 推出 Jetson Thor 新模块，押注机器人和端侧 AI', requiredTokens: ['Jetson / IGX T3000', 'Jetson T2000', '865 FP4 TFLOPS', '400 FP4 TFLOPS', '视觉智能体'] },
  { title: 'Anthropic 公开模型访问恢复与安全框架路线', sourceProjectionRuleMatches: ['anthropic-fable-jailbreak-severity-framework-2026'], enLabel: 'Anthropic / Claude Fable / jailbreak severity framework', zhEvidence: '来源条目 4：Anthropic 公开模型访问恢复与安全框架路线', requiredTokens: ['Claude Fable 5 已恢复全球访问', '出口管制', '安全绕过评估', 'jailbreak 严重度评分框架', 'Amazon'] },
  { title: 'OpenAI 简化 ChatGPT 模型选择器', sourceProjectionRuleMatches: ['openai-chatgpt-model-picker-2026'], enLabel: 'OpenAI / ChatGPT / Instant / model capability update', zhEvidence: '来源条目 5：OpenAI 简化 ChatGPT 模型选择器', requiredTokens: ['Instant、Medium、High', 'Extra High', 'Pro Standard', 'Pro Extended', 'Thinking Light'] },
];

export const bannedFallbackPhrases = [
  'A secondary L3 source says China has more than 6,000 AI companies',
  'NVIDIA said Cadence, Dassault Systèmes, Siemens, Synopsys',
  'The source tracks compute infrastructure, AI hardware, robotics deployment',
  'The source tracks model capability update, AI security control',
  'giving the daily brief a named actor and deployment context',
  'buyers must check access control, infrastructure availability, operational risk',
  'original official report link was not captured',
  'today AI / technology daily not generated',
  '今日 AI / 科技日报暂未生成',
  '-…',
  '...'
];

export const requiredEnglishOutputs = [
  '### 1. China / WAIC / AI governance conference',
  'Xinhua reported that the 2026 World Artificial Intelligence Conference and High-Level Meeting on Global AI Governance will be held in Shanghai from July 17 to 20',
  '### 2. NVIDIA / post-training / agentic AI infrastructure',
  'continuous post-training rather than a one-time train-and-serve cycle',
  '### 3. NVIDIA / Jetson Thor / edge robotics AI modules',
  '865 FP4 TFLOPS',
  '### 4. Anthropic / Claude Fable / jailbreak severity framework',
  'jailbreak severity scoring framework',
  '### 5. OpenAI / ChatGPT / Instant / model capability update',
  'Thinking Light removal',
  'Evidence item 1: China / WAIC / AI governance conference',
  'Evidence item 2: NVIDIA / post-training / agentic AI infrastructure',
  'Evidence item 3: NVIDIA / Jetson Thor / edge robotics AI modules',
  'Evidence item 4: Anthropic / Claude Fable / jailbreak severity framework',
  'Evidence item 5: OpenAI / ChatGPT / Instant / model capability update',
  '## Today’s Bottom Line',
  '## What to Watch Tomorrow',
  '## Evidence Matrix'
];

export const requiredZhOutputs = [
  '上海 WAIC 释放全球 AI 治理信号',
  'NVIDIA 把“智能/美元”推成 Agentic AI 新指标',
  'NVIDIA 推出 Jetson Thor 新模块，押注机器人和端侧 AI',
  'Anthropic 公开模型访问恢复与安全框架路线',
  'OpenAI 简化 ChatGPT 模型选择器',
  '普通用户怎么用新版模型选择',
  '企业做 Agent 的成本账要重算',
  '## 今日结论',
  '## 明日跟踪点',
  '## 证据矩阵',
  '来源条目 5：OpenAI 简化 ChatGPT 模型选择器'
];

export const caseLevelFaqSignals = [
  {
    label: 'ChatGPT task-based model picker',
    practicalCaseMatchTerms: ['普通用户怎么用新版模型选择', 'Medium / High', 'Pro 档位'],
    sourceStoryMatchTerms: ['Instant、Medium、High', 'Pro Extended', 'Thinking Light'],
    requiredTerms: ['ChatGPT task-based model picker', 'latency', 'cost'],
    links: ['/en/blog/openclaw-model-fallback-strategy/', '/en/blog/what-is-openclaw/'],
  },
  {
    label: 'Agent post-training cost loop',
    practicalCaseMatchTerms: ['企业做 Agent 的成本账要重算', '成功率', '人工接管率', '单次任务成本'],
    sourceStoryMatchTerms: ['后训练', 'NeMo RL', 'intelligence per dollar'],
    requiredTerms: ['Agent post-training cost loop', 'evaluation', 'cost per successful task'],
    links: ['/en/blog/agentic-engineering-guide/', '/en/blog/openclaw-model-fallback-strategy/'],
  },
];

export const parserGuardrails = {
  story1RequiredDetailTokens: ['2026 世界人工智能大会', '7 月 17-20 日', '智能伙伴 共创未来', '世界人工智能合作组织'],
  story1ForbiddenDetailTokens: ['6,000 AI companies', 'original official report link was not captured'],
  story2RequiredDetailTokens: ['Nemotron', 'NeMo RL', 'Vera Rubin', 'intelligence per dollar'],
  story2ForbiddenDetailTokens: ['Qoder', 'NemoClaw / OpenShell', 'Cadence'],
  story3RequiredDetailTokens: ['Jetson / IGX T3000', 'Jetson T2000', '865 FP4 TFLOPS'],
  story3ForbiddenDetailTokens: ['named actor and deployment context', 'buyers must check access control'],
  story4RequiredDetailTokens: ['Claude Fable 5 已恢复全球访问', 'jailbreak 严重度评分框架'],
  story4ForbiddenDetailTokens: ['named actor and deployment context', 'buyers must check access control'],
  story5RequiredDetailTokens: ['Instant、Medium、High', 'Pro Extended', 'Thinking Light'],
  story5ForbiddenDetailTokens: ['GPT-5.6 Sol', 'Terra', 'Luna'],
};
