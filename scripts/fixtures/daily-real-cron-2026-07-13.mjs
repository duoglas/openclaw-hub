export const fixtureDate = '2026-07-13';

export const realCronFixture = `《AI、科技日报》
2026-07-13 早报

说明：本次搜索接口失败，改用可直抓的官方/权威页面核实。以下不写无法确认的传闻。

## 今日要闻（5条）

1. NVIDIA + LangChain：开源 Agent 栈打到闭源模型同级表现

发生了什么：
NVIDIA 称 Nemotron 3 Ultra 配合 LangChain Deep Agents harness，在公开 Deep Agents benchmark 中达到开源模型领先表现，并以约 1/10 推理成本接近头部闭源模型任务表现。

为什么重要：
这说明“模型本身”之外，Agent harness、工具描述、记忆、执行环境会成为企业 AI 的关键竞争点。

可能影响：
企业做 Agent 不一定只押闭源大模型，可能转向“开源模型 + 可控执行栈 + 私有部署”。

2. NVIDIA + Hugging Face：机器人开源工具链继续合流

发生了什么：
NVIDIA 将 Isaac GR00T 1.7、Isaac Teleop 接入 Hugging Face LeRobot，并计划把 Cosmos 3 接入该生态。

为什么重要：
机器人开发正在从封闭硬件/仿真系统，转向更开放的数据、模型、训练和验证流程。

可能影响：
中小团队做机器人原型的门槛下降；“物理 AI”会从概念更快进入开发者生态。

3. Anthropic 推出 Claude Science，面向科研工作流

发生了什么：
Anthropic 新闻页显示，Claude Science 已可用，定位为面向科学家的 AI workbench，可集成科研常用工具、生成可审计产物、访问计算资源。

为什么重要：
大模型正在从聊天工具，转向专业行业工作台。科研是高价值场景之一。

可能影响：
科研助理、实验记录、数据分析、论文复现会更自动化；但可审计性和数据权限会成为核心要求。

4. Anthropic 重新上线 Fable 5，并提出越狱严重性评分框架

发生了什么：
Anthropic 表示 Fable 5 于 7 月 1 日全球回归，同时与 Amazon、Microsoft、Google 等 Glasswing partners 提出行业级 jailbreak severity 评分框架。

为什么重要：
AI 安全评测正在从“有没有被攻破”，转向“漏洞严重程度如何量化”。

可能影响：
模型上线、企业采购、安全红队测试会更依赖标准化评分，而不是单点案例。

5. 中国航天：长征十号乙完成首飞并实现一子级可控回收

发生了什么：
新华社/新华网消息称，2026 年 7 月 10 日，长征十号乙运载火箭在海南商业航天发射场发射升空，一子级垂直返回，并在海上回收平台成功回收。

为什么重要：
这是中国可重复使用火箭技术的重要节点，属于硬科技基础能力突破。

可能影响：
若后续稳定复用，商业航天发射成本、发射频次和产业链成熟度都有望改善。

## 实战案例（2个）

1. 普通用户：OpenAI 简化 ChatGPT 模型选择器

OpenAI Help Center 显示，ChatGPT 模型选择器改为 Instant、Medium、High、Extra High、Pro Standard、Pro Extended 等更直观选项。

怎么用：
- 日常问答：Instant
- 写长文、代码、复杂分析：Medium / High
- 高价值复杂任务：Extra High 或 Pro 模式
- 不用纠结旧的 Thinking Light / Standard / Extended 命名

价值：
普通用户更容易按“速度 vs 推理强度”选模型。

2. 企业开发者：Agent 不只拼模型，开始拼系统工程

NVIDIA + LangChain 案例显示，不重新训练模型，仅通过调整 system prompt、工具描述、中间件和执行 harness，就能显著改善 Agent 表现。

怎么用：
- 先做任务评测集
- 看 Agent trace 找失败点
- 优化工具说明、调用顺序、记忆和权限边界
- 再考虑换模型或微调

价值：
企业 AI 成本可能从“买更贵模型”，转向“把执行系统调好”。
`;

export const expectedSignals = [
  { title: 'NVIDIA + LangChain：开源 Agent 栈打到闭源模型同级表现', sourceProjectionRuleMatches: ['nvidia-nemoclaw-industrial-agents'], enLabel: 'NVIDIA / Nemotron 3 Ultra / LangChain Deep Agents', zhEvidence: '来源条目 1：NVIDIA + LangChain：开源 Agent 栈打到闭源模型同级表现', requiredTokens: ['Nemotron 3 Ultra', 'LangChain Deep Agents harness', '1/10 推理成本'] },
  { title: 'NVIDIA + Hugging Face：机器人开源工具链继续合流', sourceProjectionRuleMatches: ['nvidia-cosmos-3-physical-ai-2026', 'nvidia-physical-ai-agent-skills-2026'], enLabel: 'NVIDIA / Hugging Face / LeRobot robotics ecosystem', zhEvidence: '来源条目 2：NVIDIA + Hugging Face：机器人开源工具链继续合流', requiredTokens: ['Isaac GR00T 1.7', 'Isaac Teleop', 'Hugging Face LeRobot', 'Cosmos 3'] },
  { title: 'Anthropic 推出 Claude Science，面向科研工作流', sourceProjectionRuleMatches: ['anthropic-claude-science-research-workbench-2026'], enLabel: 'Anthropic / Claude Science / research agent workflow', zhEvidence: '来源条目 3：Anthropic 推出 Claude Science，面向科研工作流', requiredTokens: ['Claude Science', 'AI workbench', '可审计产物', '计算资源'] },
  { title: 'Anthropic 重新上线 Fable 5，并提出越狱严重性评分框架', sourceProjectionRuleMatches: ['anthropic-claude-fable-jailbreak-severity-2026'], enLabel: 'Anthropic / Claude Fable / jailbreak severity framework', zhEvidence: '来源条目 4：Anthropic 重新上线 Fable 5，并提出越狱严重性评分框架', requiredTokens: ['Fable 5', '7 月 1 日全球回归', 'jailbreak severity'] },
  { title: '中国航天：长征十号乙完成首飞并实现一子级可控回收', sourceProjectionRuleMatches: ['xinhua-space-computing-commercial-space-2026'], enLabel: 'Xinhua / Long March 10B / reusable rocket recovery', zhEvidence: '来源条目 5：中国航天：长征十号乙完成首飞并实现一子级可控回收', requiredTokens: ['长征十号乙', '海南商业航天发射场', '一子级垂直返回', '海上回收平台'] },
];

export const bannedFallbackPhrases = [
  'The source tracks model capability update, data infrastructure around Anthropic, Claude, Science',
  'The source tracks compute infrastructure around Xinhua, China',
  'giving the daily brief a named actor and deployment context',
  'buyers must check access control, infrastructure availability, operational risk',
  'today AI / technology daily not generated',
  '今日 AI / 科技日报暂未生成',
  '-…',
  '...',
];

export const requiredEnglishOutputs = [
  '### 1. NVIDIA / Nemotron 3 Ultra / LangChain Deep Agents',
  '### 2. NVIDIA / Hugging Face / LeRobot robotics ecosystem',
  '### 3. Anthropic / Claude Science / research agent workflow',
  '### 4. Anthropic / Claude Fable / jailbreak severity framework',
  '### 5. Xinhua / Long March 10B / reusable rocket recovery',
  'Evidence item 3: Anthropic / Claude Science / research agent workflow',
  'Research teams can pilot AI workbenches on experiment notes, data analysis, literature review, and reproducible outputs while treating auditability, data permissions, and compute access as launch requirements.',
  'Evidence item 4: Anthropic / Claude Fable / jailbreak severity framework',
  'Evidence item 5: Xinhua / Long March 10B / reusable rocket recovery',
  '## Today’s Bottom Line',
  '## What to Watch Tomorrow',
  '## Evidence Matrix',
];

export const requiredZhOutputs = [
  'NVIDIA + LangChain：开源 Agent 栈打到闭源模型同级表现',
  'NVIDIA + Hugging Face：机器人开源工具链继续合流',
  'Anthropic 推出 Claude Science，面向科研工作流',
  'Anthropic 重新上线 Fable 5，并提出越狱严重性评分框架',
  '中国航天：长征十号乙完成首飞并实现一子级可控回收',
  '普通用户：OpenAI 简化 ChatGPT 模型选择器',
  '企业开发者：Agent 不只拼模型，开始拼系统工程',
  '## 今日结论',
  '## 明日跟踪点',
  '## 证据矩阵',
  '来源条目 5：中国航天：长征十号乙完成首飞并实现一子级可控回收',
];

export const caseLevelFaqSignals = [
  {
    label: 'ChatGPT task-based model picker',
    practicalCaseMatchTerms: ['ChatGPT 模型选择器'],
    sourceStoryMatchTerms: ['Instant', 'Medium', 'High'],
    requiredTerms: ['task-based model picker', 'escalate only when needed'],
    links: ['/en/blog/what-is-openclaw/', '/en/blog/openclaw-model-fallback-strategy/'],
  },
  {
    label: 'enterprise agent engineering harness',
    practicalCaseMatchTerms: ['Agent 不只拼模型', '系统工程'],
    sourceStoryMatchTerms: ['LangChain Deep Agents', '执行 harness', '权限边界'],
    requiredTerms: ['enterprise agent engineering harness', 'evaluation traces', 'tool descriptions'],
    links: ['/en/blog/agentic-engineering-guide/', '/en/blog/openclaw-model-fallback-strategy/'],
  },
];

export const parserGuardrails = {
  story1RequiredDetailTokens: ['Nemotron 3 Ultra', 'LangChain Deep Agents harness', '1/10 推理成本'],
  story1ForbiddenDetailTokens: ['Isaac GR00T', '长征十号乙'],
  story2RequiredDetailTokens: ['Isaac GR00T 1.7', 'Isaac Teleop', 'Hugging Face LeRobot', 'Cosmos 3'],
  story2ForbiddenDetailTokens: ['Claude Science', '长征十号乙'],
  story3RequiredDetailTokens: ['Claude Science', 'AI workbench', '可审计产物', '计算资源'],
  story3ForbiddenDetailTokens: ['LangChain Deep Agents', 'Fable 5', '长征十号乙'],
  story4RequiredDetailTokens: ['Fable 5', '7 月 1 日', 'jailbreak severity'],
  story4ForbiddenDetailTokens: ['Claude Science', '长征十号乙'],
  story5RequiredDetailTokens: ['长征十号乙', '海南商业航天发射场', '一子级垂直返回'],
  story5ForbiddenDetailTokens: ['Claude Science', 'Hugging Face LeRobot'],
};
