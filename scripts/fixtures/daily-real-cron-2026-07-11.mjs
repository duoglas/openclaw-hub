export const fixtureDate = '2026-07-11';

export const realCronFixture = `《AI、科技日报》  
2026-07-11 早报

## 今日要闻（5条）

1. OpenAI 发布 GPT-5.6 系列

发生了什么：OpenAI 宣布 GPT-5.6 系列正式可用，包括旗舰模型 Sol、日常平衡模型 Terra、低成本模型 Luna，并引入 ultra 多智能体并行工作模式。

为什么重要：重点不只是“模型更强”，而是 OpenAI 明确把方向压到三件事：更低成本、更强代理能力、更适合专业工作流。

可能影响：开发、办公、数据分析、网络安全等场景会继续被 AI Agent 吃掉一部分流程。普通用户可能更快看到“自动完成复杂任务”的产品形态。

来源：OpenAI 官方  
https://openai.com/index/gpt-5-6/

---

2. Meta 上线 Muse Image，并紧急下线 Instagram 账号引用功能

发生了什么：Meta 推出 Muse Image，作为 Meta Superintelligence Labs 的首个图像生成模型，进入 Meta AI、Instagram Stories、WhatsApp 等场景。7 月 10 日更新显示，Meta 已取消“@提及公开 Instagram 账号来参考其内容生成图片”的功能，原因是用户反馈该功能“不合适”。

为什么重要：这是生成式 AI 和社交平台隐私边界的一次典型冲突：技术上可行，不代表社会接受。

可能影响：AI 图像生成会继续深入社交应用，但平台会更谨慎处理“用他人公开内容做生成参考”的默认权限。

来源：Meta 官方  
https://about.fb.com/news/2026/07/introducing-muse-image-meta-ai/

---

3. NVIDIA 推出面向企业 Agent 的 Nemotron + LangChain 深度代理方案

发生了什么：NVIDIA 称 Nemotron 3 Ultra 在 LangChain Deep Agents harness 中实现开放模型领先表现，并以更低推理成本完成企业任务。方案强调不是重新训练模型，而是优化代理运行环境、工具描述、中间件和执行框架。

为什么重要：这说明企业 AI Agent 的竞争点正在从“谁的模型最大”转向“模型 + 工具 + 运行时 + 安全沙箱 + 评测”的完整栈。

可能影响：企业部署 Agent 时，开源/开放栈会更有吸引力：可控、可审计、可私有化，也更适合高风险业务流程。

来源：NVIDIA 官方  
https://blogs.nvidia.com/blog/nemotron-langchain-agents-open-stack/

---

4. 阿里云发布 Qoder：面向真实软件工程的 Agentic Coding 平台

发生了什么：阿里云介绍 Qoder，定位为面向真实软件开发的智能编码平台，核心能力包括代码库理解、长期记忆、任务拆解、执行透明化，以及 Quest Mode 异步任务委托。

为什么重要：AI 编程正在从“补全代码”进入“接收规格说明、理解项目上下文、异步完成任务”的阶段。

可能影响：开发者的工作重心会更偏向写清需求、审查结果、维护架构，而不是逐行编码。团队也会更重视 Spec 和上下文工程。

来源：Alibaba Cloud 官方社区  
https://www.alibabacloud.com/blog/introducing-qoder-agentic-coding-platform-for-real-software_603349

---

5. 通义千问正在进入中国 AI 硬件生态

发生了什么：阿里云称，已有超过 15 万家中国智能硬件制造商接入 Qwen，覆盖机器人、手机、教育硬件、扫地机器人、AI 眼镜、无人机等场景。

为什么重要：中国 AI 落地的主线之一，正在从纯软件应用转向“模型 + 硬件 + 传感器 + 场景”的 Physical AI。

可能影响：未来一年，AI 眼镜、儿童学习硬件、家用机器人、智能车机等设备会更依赖本地/云端混合模型能力。普通消费者会更早感知到“能看、能听、能行动”的 AI。

来源：Alibaba Cloud 官方社区  
https://www.alibabacloud.com/blog/qwen-enables-rapidly-expanding-ai-hardware-ecosystem_603348

---

## 实战案例（2个）

1. 软件团队如何用 Qoder 做异步开发试点

Qoder 的案例说明，团队不应只把 AI 编程当成代码补全，而应从一个低风险任务开始：写清规格、限定代码目录、要求任务拆解、保留执行日志，并由工程师复核合并。

---

2. 消费硬件团队如何评估 Qwen 接入

15 万家硬件制造商接入 Qwen 的信号说明，AI 硬件试点要同时评估语音、视觉、传感器、本地/云端推理、隐私授权和离线兜底，而不是只比较模型参数。
`;

export const expectedSignals = [
  { title: 'OpenAI 发布 GPT-5.6 系列', sourceProjectionRuleMatches: ['openai-chatgpt-model-picker-2026'], enLabel: 'OpenAI / GPT-5.6 / Sol-Terra-Luna agent platform', zhEvidence: '来源条目 1：OpenAI 发布 GPT-5.6 系列', requiredTokens: ['GPT-5.6', 'Sol', 'Terra', 'Luna', 'ultra 多智能体并行工作模式'] },
  { title: 'Meta 上线 Muse Image，并紧急下线 Instagram 账号引用功能', sourceProjectionRuleMatches: ['meta-facebook-ai-tools-2026'], enLabel: 'Meta / Muse Image / Instagram reference rollback', zhEvidence: '来源条目 2：Meta 上线 Muse Image，并紧急下线 Instagram 账号引用功能', requiredTokens: ['Muse Image', 'Meta Superintelligence Labs', 'Instagram Stories', '不合适'] },
  { title: 'NVIDIA 推出面向企业 Agent 的 Nemotron + LangChain 深度代理方案', sourceProjectionRuleMatches: ['nvidia-nemoclaw-industrial-agents'], enLabel: 'NVIDIA / Nemotron 3 Ultra / LangChain Deep Agents', zhEvidence: '来源条目 3：NVIDIA 推出面向企业 Agent 的 Nemotron + LangChain 深度代理方案', requiredTokens: ['Nemotron 3 Ultra', 'LangChain Deep Agents harness', '中间件', '执行框架'] },
  { title: '阿里云发布 Qoder：面向真实软件工程的 Agentic Coding 平台', sourceProjectionRuleMatches: ['alibaba-qoder-agentic-coding-platform-2026'], enLabel: 'Alibaba Cloud / Qoder / agentic coding platform', zhEvidence: '来源条目 4：阿里云发布 Qoder：面向真实软件工程的 Agentic Coding 平台', requiredTokens: ['Qoder', '代码库理解', '长期记忆', 'Quest Mode'] },
  { title: '通义千问正在进入中国 AI 硬件生态', sourceProjectionRuleMatches: ['xinhua-china-ai-education-service-robotics'], enLabel: 'Alibaba Cloud / Qwen / China AI hardware ecosystem', zhEvidence: '来源条目 5：通义千问正在进入中国 AI 硬件生态', requiredTokens: ['15 万家', 'Qwen', '机器人', 'AI 眼镜', '无人机'] },
];

export const bannedFallbackPhrases = [
  'The source tracks agent platform, model capability update, workplace AI, AI security control around OpenAI',
  'The source tracks model capability update around Meta, Muse, Image, Instagram',
  'The source tracks agent platform, coding agent workflow around Alibaba, Qoder',
  'The source tracks AI hardware, robotics deployment, model capability update, AI education deployment around Alibaba',
  'giving the daily brief a named actor and deployment context',
  'buyers must check access control, infrastructure availability, operational risk',
  'today AI / technology daily not generated',
  '今日 AI / 科技日报暂未生成',
  '-…',
  '...',
];

export const requiredEnglishOutputs = [
  '### 1. OpenAI / GPT-5.6 / Sol-Terra-Luna agent platform',
  '### 2. Meta / Muse Image / Instagram reference rollback',
  '### 3. NVIDIA / Nemotron 3 Ultra / LangChain Deep Agents',
  '### 4. Alibaba Cloud / Qoder / agentic coding platform',
  '### 5. Alibaba Cloud / Qwen / China AI hardware ecosystem',
  'Evidence item 1: OpenAI / GPT-5.6 / Sol-Terra-Luna agent platform',
  'Evidence item 5: Alibaba Cloud / Qwen / China AI hardware ecosystem',
  '## Today’s Bottom Line',
  '## What to Watch Tomorrow',
  '## Evidence Matrix',
];

export const requiredZhOutputs = [
  'OpenAI 发布 GPT-5.6 系列',
  'Meta 上线 Muse Image，并紧急下线 Instagram 账号引用功能',
  'NVIDIA 推出面向企业 Agent 的 Nemotron + LangChain 深度代理方案',
  '阿里云发布 Qoder：面向真实软件工程的 Agentic Coding 平台',
  '通义千问正在进入中国 AI 硬件生态',
  '软件团队如何用 Qoder 做异步开发试点',
  '消费硬件团队如何评估 Qwen 接入',
  '## 今日结论',
  '## 明日跟踪点',
  '## 证据矩阵',
  '来源条目 1：OpenAI 发布 GPT-5.6 系列',
  '来源条目 5：通义千问正在进入中国 AI 硬件生态',
];

export const caseLevelFaqSignals = [
  {
    label: 'Qoder agentic coding platform',
    practicalCaseMatchTerms: ['软件团队如何用 Qoder'],
    sourceStoryMatchTerms: ['Qoder', 'Quest Mode', '长期记忆'],
    requiredTerms: ['Qoder agentic coding platform', 'task log', 'human review'],
    links: ['/en/blog/agentic-engineering-guide/', '/en/blog/openclaw-model-fallback-strategy/'],
  },
  {
    label: 'Qwen AI hardware ecosystem',
    practicalCaseMatchTerms: ['消费硬件团队如何评估 Qwen'],
    sourceStoryMatchTerms: ['15 万家', '智能硬件制造商', 'Qwen'],
    requiredTerms: ['Qwen AI hardware ecosystem', 'sensor data', 'offline fallback'],
    links: ['/en/blog/what-is-openclaw/', '/en/blog/agentic-engineering-guide/'],
  },
];

export const parserGuardrails = {
  story1RequiredDetailTokens: ['GPT-5.6', 'Sol', 'Terra', 'Luna', 'ultra 多智能体并行工作模式'],
  story1ForbiddenDetailTokens: ['Muse Image', 'Nemotron 3 Ultra', 'Qoder', '15 万家'],
  story2RequiredDetailTokens: ['Muse Image', 'Meta Superintelligence Labs', 'Instagram Stories', '不合适'],
  story2ForbiddenDetailTokens: ['GPT-5.6', 'Nemotron 3 Ultra', 'Qoder', '15 万家'],
  story3RequiredDetailTokens: ['Nemotron 3 Ultra', 'LangChain Deep Agents harness', '中间件', '执行框架'],
  story3ForbiddenDetailTokens: ['Muse Image', 'Quest Mode', '15 万家'],
  story4RequiredDetailTokens: ['Qoder', '代码库理解', '长期记忆', 'Quest Mode'],
  story4ForbiddenDetailTokens: ['Muse Image', 'Nemotron 3 Ultra', '15 万家'],
  story5RequiredDetailTokens: ['15 万家', 'Qwen', 'AI 眼镜', '无人机'],
  story5ForbiddenDetailTokens: ['Muse Image', 'Nemotron 3 Ultra', 'Quest Mode'],
};
