export const fixtureDate = '2026-07-16';

export const realCronFixture = `《AI、科技日报》  
2026-07-16 07:30｜聚焦 AI / 科技行业

## 今日要闻（5条）

1. NVIDIA 推出 Jetson Thor 新模块 T3000 / T2000，押注机器人与边缘 AI
状态：已确认  
发生了什么：NVIDIA 发布基于 Thor 架构的新 Jetson / IGX T3000、Jetson T2000 模块，面向人形机器人、工业机器人、视觉 AI Agent、自动移动机器人等边缘场景。T3000 提供 865 FP4 TFLOPS，T2000 提供 400 FP4 TFLOPS。  
为什么重要：AI 正从云端大模型，继续下沉到机器人、工厂、交通、零售等“物理世界”。这类模块降低了在设备端运行多模态模型、世界模型和机器人策略的门槛。  
可能影响：机器人公司会更容易做本地推理，减少云端依赖；边缘 AI 硬件竞争会加速；机器人产品成本、功耗、部署周期可能继续下降。

2. NVIDIA 日本 AI 生态更新：医疗、制药、CT、手术机器人全面接入 AI
状态：已确认  
发生了什么：NVIDIA 披露日本合作伙伴在医疗与生命科学中的 AI 落地：药企使用 BioNeMo / RAPIDS / Boltz 等工具做药物发现；Canon、Fujifilm 推出 NVIDIA 加速的 CT 系统；Kawasaki Heavy Industries 等推进医院机器人和手术辅助能力。  
为什么重要：这不是“AI 演示”，而是进入药物研发、医学影像、医院机器人这些高价值行业流程。医疗 AI 正从单点算法变成完整工具链。  
可能影响：医药研发会更依赖 AI 工作流；医疗设备厂商会把 GPU / AI 加速变成产品卖点；“物理 AI + 医疗机器人”会成为接下来几年重点赛道。

3. NVIDIA 强调开放模型路线：企业 AI 竞争从“选模型”转向“定制系统”
状态：已确认  
发生了什么：NVIDIA 发布 Nemotron Labs 文章，强调开放模型可让企业和国家拥有更高的可控性、可审计性和可定制性，企业可通过私有评测、后训练和成本优化形成定制系统，并列举医疗、企业搜索、法律等场景的模型定制案例。  
为什么重要：行业焦点正在从“谁的大模型最强”，转向“谁能把模型改造成稳定、便宜、合规、贴业务的系统”。开放模型与闭源前沿模型会更多以组合方式出现。  
可能影响：企业会更重视私有评测、微调、强化学习环境；开源 / 开放权重模型会继续吃掉一部分企业场景；AI 成本优化会从 token 单价，转向系统级架构设计。

4. Anthropic 近期更新：Claude Science 与 Fable 5 回归，AI 科研工作台继续升温
状态：已确认，但非今日新事件  
发生了什么：Anthropic 新闻页显示，Claude Science 已推出；Fable 5 于 7 月 1 日全球回归。页面还提到 Anthropic 与 Amazon、Microsoft、Google 等伙伴提出 jailbreak 严重性评分框架。  
为什么重要：科研场景正在成为大模型公司的重点垂直方向。与此同时，模型安全评测不再只是公司内部指标，正在走向行业框架化。  
可能影响：科研工作流会更快从“聊天助手”升级为“可审计工作台”；AI 安全评测标准可能更影响企业采购与监管沟通。

5. OpenAI ChatGPT 近期产品调整：模型选择器简化为 Instant / Medium / High 等档位
状态：已确认，但非今日新事件  
发生了什么：OpenAI Help Center 显示，ChatGPT 模型选择器改为更易理解的速度与推理投入档位，包括 Instant、Medium、High、Extra High、Pro Standard、Pro Extended 等。  
为什么重要：普通用户不需要理解复杂模型名，只需要按任务强度选择。AI 产品正在从“模型参数导向”，转向“任务体验导向”。  
可能影响：普通用户更容易判断什么时候该用更强推理；订阅产品会继续围绕“推理深度 / 速度 / 成本”分层。

## 实战案例（2个）

1. 机器人公司如何用 Jetson Thor 降低部署成本  
可借鉴点：先选一条低风险机器人或视觉 AI Agent 工作流，对比云端推理与本地 Jetson Thor 推理在延迟、功耗、热设计、网络中断和单位任务成本上的差异，再决定是否规模化替换。

2. 医疗 AI 团队如何评估 NVIDIA 日本生态信号  
可借鉴点：不要只看 GPU 加速指标，要把药物发现、CT 影像、医院机器人和手术辅助拆成不同合规路径，分别定义数据权限、临床验证、人工复核、审计记录和故障回退。
`;

export const expectedSignals = [
  { title: 'NVIDIA 推出 Jetson Thor 新模块 T3000 / T2000，押注机器人与边缘 AI', sourceProjectionRuleMatches: ['nvidia-physical-ai-agent-skills-2026'], enLabel: 'NVIDIA / Jetson Thor / edge robotics AI modules', zhEvidence: '来源条目 1：NVIDIA 推出 Jetson Thor 新模块 T3000 / T2000，押注机器人与边缘 AI', requiredTokens: ['Jetson / IGX T3000', 'Jetson T2000', '865 FP4 TFLOPS', '400 FP4 TFLOPS'] },
  { title: 'NVIDIA 日本 AI 生态更新：医疗、制药、CT、手术机器人全面接入 AI', sourceProjectionRuleMatches: ['nvidia-bionemo-agent-toolkit-claude-science-2026'], enLabel: 'NVIDIA Japan / healthcare AI / CT and robotics deployment', zhEvidence: '来源条目 2：NVIDIA 日本 AI 生态更新：医疗、制药、CT、手术机器人全面接入 AI', requiredTokens: ['BioNeMo', 'RAPIDS', 'Boltz', 'Canon', 'Fujifilm', 'Kawasaki Heavy Industries'] },
  { title: 'NVIDIA 强调开放模型路线：企业 AI 竞争从“选模型”转向“定制系统”', sourceProjectionRuleMatches: ['nvidia-nemoclaw-industrial-agents'], enLabel: 'NVIDIA / Nemotron Labs / open model ownership', zhEvidence: '来源条目 3：NVIDIA 强调开放模型路线：企业 AI 竞争从“选模型”转向“定制系统”', requiredTokens: ['Nemotron Labs', '开放模型', '可审计性', '可定制性'] },
  { title: 'Anthropic 近期更新：Claude Science 与 Fable 5 回归，AI 科研工作台继续升温', sourceProjectionRuleMatches: ['anthropic-claude-science-research-workbench-2026', 'anthropic-fable-jailbreak-severity-2026'], enLabel: 'Anthropic / Claude Science / research agent workflow', zhEvidence: '来源条目 4：Anthropic 近期更新：Claude Science 与 Fable 5 回归，AI 科研工作台继续升温', requiredTokens: ['Claude Science 已推出', 'Fable 5 于 7 月 1 日全球回归', 'jailbreak 严重性评分框架'] },
  { title: 'OpenAI ChatGPT 近期产品调整：模型选择器简化为 Instant / Medium / High 等档位', sourceProjectionRuleMatches: ['openai-chatgpt-model-picker-2026'], enLabel: 'OpenAI / ChatGPT / Instant / model capability update', zhEvidence: '来源条目 5：OpenAI ChatGPT 近期产品调整：模型选择器简化为 Instant / Medium / High 等档位', requiredTokens: ['Instant', 'Medium', 'High', 'Pro Extended'] },
];

export const bannedFallbackPhrases = [
  'The source tracks AI hardware, robotics deployment, agent platform, model capability update',
  'The source tracks robotics deployment, strategic partnership, healthcare AI deployment',
  'giving the daily brief a named actor and deployment context',
  'buyers must check access control, infrastructure availability, operational risk',
  'NVIDIA said Cadence, Dassault Systèmes, Siemens, Synopsys',
  'NVIDIA NemoClaw / OpenShell',
  'today AI / technology daily not generated',
  '今日 AI / 科技日报暂未生成',
  '\nN\n',
  '-…',
  '...',
];

export const requiredEnglishOutputs = [
  '### 1. NVIDIA / Jetson Thor / edge robotics AI modules',
  '### 2. NVIDIA Japan / healthcare AI / CT and robotics deployment',
  '### 3. NVIDIA / Nemotron Labs / open model ownership',
  '### 4. Anthropic / Claude Science / research agent workflow',
  '### 5. OpenAI / ChatGPT / Instant / model capability update',
  'Evidence item 1: NVIDIA / Jetson Thor / edge robotics AI modules',
  'T3000 at 865 FP4 TFLOPS',
  'Jetson T2000',
  'Evidence item 2: NVIDIA Japan / healthcare AI / CT and robotics deployment',
  'Canon and Fujifilm shipping NVIDIA-accelerated CT systems',
  'Kawasaki Heavy Industries advancing hospital robotics',
  'Evidence item 3: NVIDIA / Nemotron Labs / open model ownership',
  'Evidence item 4: Anthropic / Claude Science / research agent workflow',
  'Evidence item 5: OpenAI / ChatGPT / Instant / model capability update',
  '## Today’s Bottom Line',
  '## What to Watch Tomorrow',
  '## Evidence Matrix',
];

export const requiredZhOutputs = [
  'NVIDIA 推出 Jetson Thor 新模块 T3000 / T2000，押注机器人与边缘 AI',
  'NVIDIA 日本 AI 生态更新：医疗、制药、CT、手术机器人全面接入 AI',
  'NVIDIA 强调开放模型路线：企业 AI 竞争从“选模型”转向“定制系统”',
  'Anthropic 近期更新：Claude Science 与 Fable 5 回归，AI 科研工作台继续升温',
  'OpenAI ChatGPT 近期产品调整：模型选择器简化为 Instant / Medium / High 等档位',
  '机器人公司如何用 Jetson Thor 降低部署成本',
  '医疗 AI 团队如何评估 NVIDIA 日本生态信号',
  '## 今日结论',
  '## 明日跟踪点',
  '## 证据矩阵',
  '来源条目 2：NVIDIA 日本 AI 生态更新：医疗、制药、CT、手术机器人全面接入 AI',
];

export const caseLevelFaqSignals = [
  {
    label: 'Jetson Thor edge robotics deployment loop',
    practicalCaseMatchTerms: ['机器人公司如何用 Jetson Thor 降低部署成本', '云端推理与本地 Jetson Thor 推理'],
    sourceStoryMatchTerms: ['Jetson / IGX T3000', 'Jetson T2000', '865 FP4 TFLOPS'],
    requiredTerms: ['Jetson Thor edge robotics deployment loop', 'local inference', 'rollback'],
    links: ['/en/blog/agentic-engineering-guide/', '/en/blog/openclaw-model-fallback-strategy/'],
  },
  {
    label: 'healthcare AI validation workflow',
    practicalCaseMatchTerms: ['医疗 AI 团队如何评估 NVIDIA 日本生态信号', '临床验证'],
    sourceStoryMatchTerms: ['BioNeMo', 'Canon', 'Fujifilm', 'Kawasaki Heavy Industries'],
    requiredTerms: ['healthcare AI validation workflow', 'clinical review', 'audit logs'],
    links: ['/en/blog/openclaw-security-hardening-2026/', '/en/blog/openclaw-model-fallback-strategy/'],
  },
];

export const parserGuardrails = {
  story1RequiredDetailTokens: ['Jetson / IGX T3000', 'Jetson T2000', '865 FP4 TFLOPS', '400 FP4 TFLOPS'],
  story1ForbiddenDetailTokens: ['giving the daily brief a named actor', 'buyers must check access control'],
  story2RequiredDetailTokens: ['BioNeMo', 'RAPIDS', 'Boltz', 'Canon', 'Fujifilm', 'Kawasaki Heavy Industries'],
  story2ForbiddenDetailTokens: ['strategic partnership around NVIDIA, CT', 'named actor and deployment context'],
  story3RequiredDetailTokens: ['Nemotron Labs', '开放模型', '私有评测', '后训练'],
  story3ForbiddenDetailTokens: ['Cadence', 'Dassault', 'NemoClaw', 'LangChain Deep Agents'],
  story4RequiredDetailTokens: ['Claude Science', '科研工作台', 'jailbreak 严重性评分框架'],
  story4ForbiddenDetailTokens: ['Claude Science beta for Pro, Max'],
  story5RequiredDetailTokens: ['Instant', 'Medium', 'High', 'Pro Extended'],
  story5ForbiddenDetailTokens: ['GPT-5.6 Sol', 'Amazon Bedrock'],
};
