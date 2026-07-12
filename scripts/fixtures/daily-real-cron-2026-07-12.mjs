export const fixtureDate = '2026-07-12';

export const realCronFixture = `《AI、科技日报》
2026-07-12 早报

## 今日要闻（5条）

1. NVIDIA：开放式企业 Agent 栈继续成型

发生了什么：NVIDIA 称 Nemotron 3 Ultra 在 LangChain Deep Agents harness 中达到开放模型领先表现，并可用更低推理成本完成企业任务。

为什么重要：企业 Agent 的竞争点正在从“只拼模型”转向“模型 + harness + 工具 + 安全运行时”。

可能影响：更多企业会优先考虑可控、可私有部署、可治理的开放 Agent 栈，而不是完全依赖闭源模型 API。

来源：NVIDIA Blog，L1，已确认。

---

2. NVIDIA + Hugging Face：开放机器人生态加速

发生了什么：NVIDIA 将 Isaac GR00T 1.7、Isaac Teleop 接入 Hugging Face LeRobot，并计划把 Cosmos 3 接入该生态。

为什么重要：机器人开发正在复用开源 AI 的路径：共享模型、数据、仿真、训练与部署流程。

可能影响：中小团队做机器人原型的门槛下降，具身智能竞争会更快从论文走向工程验证。

来源：NVIDIA Blog，L1，已确认。

---

3. NVIDIA：AI Agent 让数据中心 CPU 重新变重要

发生了什么：NVIDIA 强调 Vera 这类“高单线程性能、可规模化”的 CPU，面向 Agent 循环中的工具调用、代码执行、数据处理和结果分析。

为什么重要：过去 AI 基础设施关注 GPU；Agent 工作流会把 CPU 延迟也变成瓶颈。

可能影响：AI 数据中心采购会更重视 GPU 之外的整机架构，CPU、内存带宽、低延迟互连会重新进入核心指标。

来源：NVIDIA Blog，L1，已确认。

---

4. 中国团队包揽“AI 与太空计算挑战赛”三项金奖

发生了什么：新华社报道，全球首个太空计算主题国际赛事“AI 与太空计算挑战赛”在日内瓦公布结果，中国科研团队获得三个赛道金奖。

为什么重要：AI 正在从地面算力扩展到太空计算、遥感分析、粮食、水质、城市热岛等场景。

可能影响：中国在“AI + 空天基础设施 + 可持续发展”方向的话语权和工程验证机会增加。

来源：新华网，L2，已确认。

---

5. 中国长征十号乙首飞并实现一级可控回收

发生了什么：新华社报道，长征十号乙运载火箭在海南商业航天发射场发射升空，一子级垂直返回并在海上平台成功回收。

为什么重要：可回收火箭是降低航天发射成本、提升发射频次的关键技术。

可能影响：中国商业航天和低轨卫星网络建设有望获得更低成本、更高频次的发射能力。

来源：新华网，L2，已确认。

---

## 实战案例（2个）

1. 普通用户：ChatGPT 模型选择更“任务导向”

OpenAI 中文帮助中心显示，ChatGPT 模型选择器更新为 Instant、Medium、High、Extra High、Pro Standard、Pro Extended 等选项。

---

2. 企业团队：先优化 Agent 工程，不急着微调模型

NVIDIA / LangChain 案例显示，提升 Agent 表现不一定要重训模型，也可以通过 prompt、工具描述、中间件、运行时和评测 harness 优化。
`;

export const expectedSignals = [
  { title: 'NVIDIA：开放式企业 Agent 栈继续成型', sourceProjectionRuleMatches: ['nvidia-nemoclaw-industrial-agents'], enLabel: 'NVIDIA / Nemotron 3 Ultra / LangChain Deep Agents', zhEvidence: '来源条目 1：NVIDIA：开放式企业 Agent 栈继续成型', requiredTokens: ['Nemotron 3 Ultra', 'LangChain Deep Agents harness', '更低推理成本'] },
  { title: 'NVIDIA + Hugging Face：开放机器人生态加速', sourceProjectionRuleMatches: ['nvidia-cosmos-3-physical-ai-2026', 'nvidia-physical-ai-agent-skills-2026'], enLabel: 'NVIDIA / Hugging Face / LeRobot robotics ecosystem', zhEvidence: '来源条目 2：NVIDIA + Hugging Face：开放机器人生态加速', requiredTokens: ['Isaac GR00T 1.7', 'Isaac Teleop', 'Hugging Face LeRobot', 'Cosmos 3'] },
  { title: 'NVIDIA：AI Agent 让数据中心 CPU 重新变重要', sourceProjectionRuleMatches: ['nvidia-vera-agentic-cpu-infrastructure-2026'], enLabel: 'NVIDIA / Vera CPU / agentic AI infrastructure', zhEvidence: '来源条目 3：NVIDIA：AI Agent 让数据中心 CPU 重新变重要', requiredTokens: ['Vera', '高单线程性能', '工具调用', '代码执行', '数据处理'] },
  { title: '中国团队包揽“AI 与太空计算挑战赛”三项金奖', sourceProjectionRuleMatches: ['xinhua-space-computing-commercial-space-2026'], enLabel: 'Xinhua / AI and space computing challenge / China gold medals', zhEvidence: '来源条目 4：中国团队包揽“AI 与太空计算挑战赛”三项金奖', requiredTokens: ['AI 与太空计算挑战赛', '日内瓦', '三个赛道金奖'] },
  { title: '中国长征十号乙首飞并实现一级可控回收', sourceProjectionRuleMatches: ['xinhua-space-computing-commercial-space-2026'], enLabel: 'Xinhua / Long March 10B / reusable rocket recovery', zhEvidence: '来源条目 5：中国长征十号乙首飞并实现一级可控回收', requiredTokens: ['长征十号乙', '海南商业航天发射场', '一级可控回收'] },
];

export const bannedFallbackPhrases = [
  'The source tracks agent platform, coding agent workflow, data infrastructure around NVIDIA, Agent, CPU, Vera',
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
  '### 3. NVIDIA / Vera CPU / agentic AI infrastructure',
  '### 4. Xinhua / AI and space computing challenge / China gold medals',
  '### 5. Xinhua / Long March 10B / reusable rocket recovery',
  'Evidence item 2: NVIDIA / Hugging Face / LeRobot robotics ecosystem',
  'Evidence item 4: Xinhua / AI and space computing challenge / China gold medals',
  'Evidence item 5: Xinhua / Long March 10B / reusable rocket recovery',
  '## Today’s Bottom Line',
  '## What to Watch Tomorrow',
  '## Evidence Matrix',
];

export const requiredZhOutputs = [
  'NVIDIA：开放式企业 Agent 栈继续成型',
  'NVIDIA + Hugging Face：开放机器人生态加速',
  'NVIDIA：AI Agent 让数据中心 CPU 重新变重要',
  '中国团队包揽“AI 与太空计算挑战赛”三项金奖',
  '中国长征十号乙首飞并实现一级可控回收',
  '普通用户：ChatGPT 模型选择更“任务导向”',
  '企业团队：先优化 Agent 工程，不急着微调模型',
  '## 今日结论',
  '## 明日跟踪点',
  '## 证据矩阵',
  '来源条目 5：中国长征十号乙首飞并实现一级可控回收',
];

export const caseLevelFaqSignals = [
  {
    label: 'ChatGPT task-based model picker',
    practicalCaseMatchTerms: ['ChatGPT 模型选择'],
    sourceStoryMatchTerms: ['Instant', 'Medium', 'High'],
    requiredTerms: ['task-based model picker', 'escalate only when needed'],
    links: ['/en/blog/what-is-openclaw/', '/en/blog/openclaw-model-fallback-strategy/'],
  },
  {
    label: 'enterprise agent engineering harness',
    practicalCaseMatchTerms: ['先优化 Agent 工程'],
    sourceStoryMatchTerms: ['LangChain Deep Agents', '中间件', '评测 harness'],
    requiredTerms: ['enterprise agent engineering harness', 'evaluation traces', 'tool descriptions'],
    links: ['/en/blog/agentic-engineering-guide/', '/en/blog/openclaw-model-fallback-strategy/'],
  },
];

export const parserGuardrails = {
  story1RequiredDetailTokens: ['Nemotron 3 Ultra', 'LangChain Deep Agents harness', '更低推理成本'],
  story1ForbiddenDetailTokens: ['Isaac GR00T', '长征十号乙'],
  story2RequiredDetailTokens: ['Isaac GR00T 1.7', 'Isaac Teleop', 'Hugging Face LeRobot', 'Cosmos 3'],
  story2ForbiddenDetailTokens: ['Vera', '长征十号乙'],
  story3RequiredDetailTokens: ['Vera', '高单线程性能', '工具调用', '代码执行'],
  story3ForbiddenDetailTokens: ['Hugging Face LeRobot', '长征十号乙'],
  story4RequiredDetailTokens: ['AI 与太空计算挑战赛', '日内瓦', '三个赛道金奖'],
  story4ForbiddenDetailTokens: ['长征十号乙', 'Hugging Face LeRobot'],
  story5RequiredDetailTokens: ['长征十号乙', '海南商业航天发射场', '一级可控回收'],
  story5ForbiddenDetailTokens: ['AI 与太空计算挑战赛', 'Hugging Face LeRobot'],
};
