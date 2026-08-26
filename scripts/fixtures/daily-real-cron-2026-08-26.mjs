export const fixtureDate = '2026-08-26';

export const realCronFixture = `《AI、科技日报》  
2026-08-26 早报

## 今日要闻（5条）

1. OpenAI 公布自研推理芯片 Jalapeño 首批测试结果  
发生了什么：OpenAI 称 Jalapeño 在 GPT‑OSS 120B、DeepSeek R1、Kimi K2.5 等模型上，相比对照系统实现更高单位功耗吞吐、更低端到端延迟。  
为什么重要：大模型竞争从“模型能力”进一步下沉到芯片、软件、网络、数据中心的全栈效率。  
可能影响：未来 ChatGPT / Codex / API 的响应速度、成本和供给稳定性，可能更依赖 OpenAI 自有硬件路线。

2. NVIDIA 推出面向 Agentic AI 的 Groq 3 LPX 推理加速方案  
发生了什么：NVIDIA 宣布 Groq 3 LPX 进入量产，作为 Vera Rubin 平台扩展，主打低延迟、高 token 生成速度。官方称在 Gemma 4 31B、10万 token 长上下文场景下达到 3,400 output tokens/s。  
为什么重要：AI Agent 的瓶颈正在从“能不能推理”转向“能不能多步、低延迟、低成本地执行”。  
可能影响：云厂商和企业 AI 基础设施会更重视推理成本，而不只是训练算力。

3. OpenAI 披露并封禁一起俄源隐蔽影响力行动  
发生了什么：OpenAI 称封禁了一批源自俄罗斯的 ChatGPT 账户，用于生成社交媒体内容，推广所谓 International Burke Institute，并在多个平台传播。  
为什么重要：生成式 AI 被用于影响力行动已进入“跨平台、伪智库、伪学术包装”阶段。  
可能影响：平台治理会更强调 AI 生成内容溯源、账号风控和跨平台协同。

4. 北京经开区发布 AI4Chip 行动计划政策解读  
发生了什么：北京经开区官网发布《“AI4Chip”人工智能赋能集成电路产业跨越式发展行动计划（2026-2028）》的一图读懂政策解读。  
为什么重要：中国地方产业政策开始把 AI 明确嵌入芯片设计、制造、封测、设备材料等环节。  
可能影响：EDA、芯片设计自动化、制造良率优化、封测智能化等方向可能获得更多政策和产业资源。

5. 小米“三芯齐发”，端侧 AI 与智能驾驶芯片成为重点  
发生了什么：新华社报道，小米发布玄戒 O3、O100、D100 三款自研芯片，分别面向个人终端、端侧 AI 加速和智能驾驶。  
为什么重要：AI 竞争正在向“端侧算力 + 自研芯片 + 车端场景”扩散。  
可能影响：手机、汽车、家庭设备会更强调本地大模型能力；中国消费电子厂商的芯片自研路径继续升温。

## 实战案例

1. OpenAI Admin plugin：企业 AI 管理开始“对话化”  
OpenAI 发布 ChatGPT Work / Codex 的 Admin plugin。管理员可在对话里查看使用量、管理成员、调整权限和额度，并做授权变更。  
实战价值：企业内部 AI 工具不再只是“问答助手”，而是开始接管 IT 管理、预算控制、权限诊断等后台流程。  
普通团队可借鉴：先从“查询 + 审批 + 记录”类低风险流程试点，不要一上来就让 AI 自动改核心权限。

2. 端侧 AI 芯片路线：小米 O100 / D100 的信号  
新华社报道提到，O100 面向大模型加速，D100 面向智能驾驶和本地大模型部署。  
实战价值：未来 AI 产品会更看重“本地可用、低延迟、隐私更强”，而不是所有请求都上云。  
普通用户可关注：下一代手机、PC、汽车是否真的支持本地模型能力，而不只是宣传“AI”。
`;

export const expectedSignals = [
  { title: 'OpenAI 公布自研推理芯片 Jalapeño 首批测试结果', sourceProjectionRuleMatches: ['nvidia-blackwell-mlperf-training-6-2026'], enLabel: 'OpenAI / Jalapeño / inference chip efficiency', zhEvidence: '来源条目 1：OpenAI 公布自研推理芯片 Jalapeño 首批测试结果', requiredTokens: ['Jalapeño', 'GPT‑OSS 120B', 'DeepSeek R1', 'Kimi K2.5'] },
  { title: 'NVIDIA 推出面向 Agentic AI 的 Groq 3 LPX 推理加速方案', sourceProjectionRuleMatches: ['nvidia-blackwell-mlperf-training-6-2026'], enLabel: 'NVIDIA / Groq 3 LPX / agentic inference acceleration', zhEvidence: '来源条目 2：NVIDIA 推出面向 Agentic AI 的 Groq 3 LPX 推理加速方案', requiredTokens: ['Groq 3 LPX', 'Vera Rubin', 'Gemma 4 31B', '3,400 output tokens/s'] },
  { title: 'OpenAI 披露并封禁一起俄源隐蔽影响力行动', sourceProjectionRuleMatches: ['openai-chatgpt-memory-lockdown-2026'], enLabel: 'OpenAI / ChatGPT / covert influence account enforcement', zhEvidence: '来源条目 3：OpenAI 披露并封禁一起俄源隐蔽影响力行动', requiredTokens: ['OpenAI', '俄罗斯', 'ChatGPT', 'International Burke Institute'] },
  { title: '北京经开区发布 AI4Chip 行动计划政策解读', sourceProjectionRuleMatches: ['china-provincial-ai-compute-plans-2026'], enLabel: 'China / Beijing / AI4Chip industrial policy', zhEvidence: '来源条目 4：北京经开区发布 AI4Chip 行动计划政策解读', requiredTokens: ['AI4Chip', '集成电路产业跨越式发展行动计划', '2026-2028', 'EDA'] },
  { title: '小米“三芯齐发”，端侧 AI 与智能驾驶芯片成为重点', sourceProjectionRuleMatches: ['apple-broadcom-us-chip-supply-chain-2026'], enLabel: 'Xinhua / Xiaomi / edge AI chip supply', zhEvidence: '来源条目 5：小米“三芯齐发”，端侧 AI 与智能驾驶芯片成为重点', requiredTokens: ['新华社', '玄戒 O3', 'O100', 'D100'] },
];

export const bannedFallbackPhrases = [
  'The source tracks AI chip supply',
  'The source tracks AI product and deployment change',
  'giving the daily brief a named actor and deployment context',
  'buyers must check access control, infrastructure availability, operational risk',
  'validation=fail',
  'tool_errors=',
  "Now I'll compose the full report",
  '用于补齐日报来源核验矩阵',
  '素材已足够',
  'Let me finalize',
  'direct_sources =',
  'tool_errors =',
  '-…',
  '...',
];

export const requiredEnglishOutputs = [
  '### 1. OpenAI / Jalapeño / inference chip efficiency',
  '### 2. NVIDIA / Groq 3 LPX / agentic inference acceleration',
  '### 3. OpenAI / ChatGPT / covert influence account enforcement',
  '### 4. China / Beijing / AI4Chip industrial policy',
  '### 5. Xinhua / Xiaomi / edge AI chip supply',
  'Evidence item 1: OpenAI / Jalapeño / inference chip efficiency',
  'Evidence item 5: Xinhua / Xiaomi / edge AI chip supply',
  '## Case-Level FAQ',
  '## Today’s Bottom Line',
  '## What to Watch Tomorrow',
  '## Evidence Matrix',
];

export const requiredZhOutputs = [
  'OpenAI 公布自研推理芯片 Jalapeño 首批测试结果',
  'NVIDIA 推出面向 Agentic AI 的 Groq 3 LPX 推理加速方案',
  'OpenAI 披露并封禁一起俄源隐蔽影响力行动',
  '北京经开区发布 AI4Chip 行动计划政策解读',
  '小米“三芯齐发”，端侧 AI 与智能驾驶芯片成为重点',
  'OpenAI Admin plugin：企业 AI 管理开始“对话化”',
  '端侧 AI 芯片路线：小米 O100 / D100 的信号',
  '## 今日结论',
  '## 明日跟踪点',
  '## 证据矩阵',
  '来源条目 1：OpenAI 公布自研推理芯片 Jalapeño 首批测试结果',
  '来源条目 5：小米“三芯齐发”，端侧 AI 与智能驾驶芯片成为重点',
];

export const caseLevelFaqSignals = [
  { label: 'OPENAI_JALAPENO_INFERENCE_CHIP', sourceStoryMatchTerms: ['Jalapeño', 'GPT‑OSS 120B'], requiredTerms: ['inference chip', 'throughput per watt', 'latency', 'DeepSeek R1', 'Kimi K2.5'], links: ['/en/blog/openclaw-model-fallback-strategy/', '/en/blog/openclaw-vps-deployment-complete-guide/'] },
  { label: 'NVIDIA_GROQ_3_LPX_AGENTIC_INFERENCE', sourceStoryMatchTerms: ['Groq 3 LPX', '3,400 output tokens/s'], requiredTerms: ['agentic AI', 'low latency', 'token throughput', 'Vera Rubin', 'long context'], links: ['/en/blog/openclaw-model-fallback-strategy/', '/en/blog/openclaw-vps-deployment-complete-guide/'] },
  { label: 'OPENAI_COVERT_INFLUENCE_ENFORCEMENT', sourceStoryMatchTerms: ['International Burke Institute', '俄罗斯'], requiredTerms: ['covert influence', 'account enforcement', 'provenance', 'cross-platform', 'risk scoring'], links: ['/en/blog/openclaw-security-hardening-2026/', '/en/blog/openclaw-model-fallback-strategy/'] },
  { label: 'CHINA_AI4CHIP_POLICY', sourceStoryMatchTerms: ['AI4Chip', '2026-2028'], requiredTerms: ['AI4Chip', 'EDA', 'chip design', 'manufacturing', 'yield'], links: ['/en/blog/openclaw-vps-deployment-complete-guide/', '/en/blog/openclaw-model-fallback-strategy/'] },
  { label: 'XIAOMI_EDGE_AI_CHIPS', sourceStoryMatchTerms: ['玄戒 O3', 'O100', 'D100'], requiredTerms: ['edge AI', 'local model', 'intelligent driving', 'device-side compute', 'privacy'], links: ['/en/blog/what-is-openclaw/', '/en/blog/openclaw-vps-deployment-complete-guide/'] },
  { label: 'OPENAI_ADMIN_PLUGIN_WORKFLOW', practicalCaseMatchTerms: ['OpenAI Admin plugin'], requiredTerms: ['admin', 'permissions', 'usage', 'approval', 'audit'], links: ['/en/blog/openclaw-security-hardening-2026/', '/en/blog/openclaw-model-fallback-strategy/'] },
  { label: 'XIAOMI_DEVICE_SIDE_AI_PILOT', practicalCaseMatchTerms: ['端侧 AI 芯片路线'], requiredTerms: ['O100', 'D100', 'local model', 'latency', 'offline'], links: ['/en/blog/what-is-openclaw/', '/en/blog/openclaw-vps-deployment-complete-guide/'] },
];

export const parserGuardrails = {
  story1RequiredDetailTokens: ['Jalapeño', 'GPT‑OSS 120B', 'DeepSeek R1', 'Kimi K2.5'],
  story1ForbiddenDetailTokens: ['Groq 3 LPX', 'International Burke Institute', 'AI4Chip', '玄戒 O3'],
  story2RequiredDetailTokens: ['Groq 3 LPX', 'Vera Rubin', 'Gemma 4 31B', '3,400 output tokens/s'],
  story2ForbiddenDetailTokens: ['Jalapeño', 'International Burke Institute', 'AI4Chip', 'O100'],
  story3RequiredDetailTokens: ['OpenAI', '俄罗斯', 'ChatGPT', 'International Burke Institute'],
  story3ForbiddenDetailTokens: ['Jalapeño', 'Groq 3 LPX', 'AI4Chip', 'O100'],
  story4RequiredDetailTokens: ['AI4Chip', '集成电路产业跨越式发展行动计划', '2026-2028', 'EDA'],
  story4ForbiddenDetailTokens: ['Jalapeño', 'Groq 3 LPX', 'International Burke Institute', 'O100'],
  story5RequiredDetailTokens: ['新华社', '玄戒 O3', 'O100', 'D100'],
  story5ForbiddenDetailTokens: ['Jalapeño', 'Groq 3 LPX', 'International Burke Institute', 'AI4Chip'],
  story5ForbiddenEvidenceTokens: ['Jalapeño', 'Groq 3 LPX', 'International Burke Institute', 'AI4Chip'],
  story5ForbiddenZhEvidenceTokens: ['Jalapeño', 'Groq 3 LPX', 'International Burke Institute', 'AI4Chip'],
};
