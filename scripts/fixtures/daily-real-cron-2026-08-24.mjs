export const fixtureDate = '2026-08-24';

export const realCronFixture = `《AI、科技日报》
2026-08-24 早报

## 今日要闻（5条）

1. 月之暗面发布 Kimi K3 长上下文多模态模型
发生了什么：Moonshot / Kimi 发布 Kimi K3，定位为 2.8T 参数原生多模态模型，支持 100 万 token 上下文，可通过 Kimi.com、Kimi Work、Kimi Code 与 API 使用，并计划在 2026 年 7 月 27 日前开放完整权重。
为什么重要：中国模型竞争继续向超长上下文、开源权重、代码仓库理解、研究复现和 agent 工程能力转移，而不是只比聊天体验。
可能影响：团队可以用 Kimi K3 测试长文档阅读、repository 分析、研究资料复盘和交互式报告，同时观察完整权重开放后是否形成稳定开发者生态。
状态：已确认，来自当日内容建设摘要的 Kimi K3 结构化条目。

2. Google Gemma 系列下载量突破 10 亿
发生了什么：Google 官方博客称 Gemma 开放模型家族下载量突破 10 亿，并继续面向开发者、研究人员和本地/边缘部署场景扩展生态。
为什么重要：开放模型的增长指标正在从单次发布声量转向下载、复用、微调、边缘部署和开发者生态规模，Gemma 成为衡量开源模型采用率的重要样本。
可能影响：开发团队可把 Gemma 纳入本地推理、教育、研究复现、轻量 agent 和边缘设备评估，但仍要检查许可证、模型版本、硬件成本和任务质量。
状态：已确认，Google 官方博客直抓。

3. 中国筹备世界人工智能合作组织 WAICO
发生了什么：中国官方媒体称，中国正在筹备世界人工智能合作组织（WAICO），并计划围绕上海世界人工智能大会推进全球 AI 治理合作。
为什么重要：AI 治理正在从企业承诺和单国监管扩展到国际组织、标准竞争、跨境协作和多边议程设置。
可能影响：中国 AI 出海企业、开源模型社区和标准参与者应跟踪组织章程、成员范围、项目清单以及与国际治理论坛的衔接。
状态：已确认，中国官方媒体信号。

4. OpenAI 开源 Codex Harness 评测框架
发生了什么：OpenAI 开源 Codex Harness，用于运行 coding agent 任务、复现模型行为和评估软件工程任务表现；上游直抓遇到 403，但 L1 snippet 与多源二级报道一致。
为什么重要：coding agent 竞争正在从 IDE 插件体验转向可复现评测、任务轨迹、沙箱执行、权限控制和跨模型比较。
可能影响：开发团队可用 Harness 类工具沉淀内部 SWE 任务集，要求命令日志、测试结果、权限边界和人工 review，避免只凭演示选择 coding agent。
状态：已确认，L1 snippet + 多源二级交叉验证，官方页面直抓失败。

5. Anthropic 将 computer use、Skills 与 Files API 推向 GA
发生了什么：Anthropic 发布 computer use、Skills 与 Files API GA 相关更新，使 Claude API 更适合文件处理、工具调用和可复用任务技能；上游直抓失败，但 L1 snippet 与多源二级报道一致。
为什么重要：模型平台正在把 agent 能力产品化为可授权、可复用、可审计的文件与工具工作流，而不是只提供单轮文本生成。
可能影响：企业可优先在低风险文件整理、报表生成、代码库辅助和内部知识处理场景试点，同时设定权限、审计、撤销和人工复核边界。
状态：已确认，L1 snippet + 多源二级交叉验证，Claude 官方页面直抓失败。

## 实战案例

1. Gemma 本地/边缘模型评估清单
先选一个离线摘要、课堂练习、轻量客服或本地 RAG 任务，记录模型版本、许可证、硬件、延迟、准确率和隐私边界，再决定是否替换云端模型。

2. Codex Harness 内部 coding-agent 评测
把最近 20 个真实 issue 改写成可重复任务，固定依赖、测试命令、允许写入目录和回滚脚本，用 Harness 记录每个 agent 的补丁、日志、测试通过率和人工 review 成本。

3. Claude Skills/Files API 文件工作流试点
从低风险文件夹开始，把上传、摘要、抽取字段、生成报告和人工确认拆成独立步骤，确保每一步都有权限边界、审计记录和撤销路径。
`;

export const expectedSignals = [
  { title: '月之暗面发布 Kimi K3 长上下文多模态模型', sourceProjectionRuleMatches: ['moonshot-kimi-k3-long-context-open-model-2026'], enLabel: 'China / Kimi K3 / long-context open model', zhEvidence: '来源条目 1：月之暗面发布 Kimi K3 长上下文多模态模型', requiredTokens: ['Kimi K3', '2.8T', '100 万 token', 'Kimi Code'] },
  { title: 'Google Gemma 系列下载量突破 10 亿', sourceProjectionRuleMatches: ['google-deepmind-diffusiongemma-2026'], enLabel: 'Google / Gemma / open model ecosystem', zhEvidence: '来源条目 2：Google Gemma 系列下载量突破 10 亿', requiredTokens: ['Google', 'Gemma', '10 亿', '开放模型'] },
  { title: '中国筹备世界人工智能合作组织 WAICO', sourceProjectionRuleMatches: ['china-world-ai-cooperation-organization-2026'], enLabel: 'China / WAICO / AI governance coordination', zhEvidence: '来源条目 3：中国筹备世界人工智能合作组织 WAICO', requiredTokens: ['世界人工智能合作组织', 'WAICO', '全球 AI 治理', '上海'] },
  { title: 'OpenAI 开源 Codex Harness 评测框架', sourceProjectionRuleMatches: ['openai-codex-record-replay-2026'], enLabel: 'OpenAI / Codex Harness / coding-agent evaluation', zhEvidence: '来源条目 4：OpenAI 开源 Codex Harness 评测框架', requiredTokens: ['OpenAI', 'Codex Harness', 'coding agent', '评测'] },
  { title: 'Anthropic 将 computer use、Skills 与 Files API 推向 GA', sourceProjectionRuleMatches: ['anthropic-claude-tag-slack-collaboration-2026'], enLabel: 'Anthropic / Claude / Skills Files API agent workflow', zhEvidence: '来源条目 5：Anthropic 将 computer use、Skills 与 Files API 推向 GA', requiredTokens: ['Anthropic', 'computer use', 'Skills', 'Files API'] },
];

export const bannedFallbackPhrases = [
  'The source tracks AI product and deployment change',
  'The source tracks open-source model ecosystem',
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
  '### 1. China / Kimi K3 / long-context open model',
  '### 2. Google / Gemma / open model ecosystem',
  '### 3. China / WAICO / AI governance coordination',
  '### 4. OpenAI / Codex Harness / coding-agent evaluation',
  '### 5. Anthropic / Claude / Skills Files API agent workflow',
  'Evidence item 1: China / Kimi K3 / long-context open model',
  'Evidence item 5: Anthropic / Claude / Skills Files API agent workflow',
  '## Case-Level FAQ',
  '## Today’s Bottom Line',
  '## What to Watch Tomorrow',
  '## Evidence Matrix',
];

export const requiredZhOutputs = [
  '月之暗面发布 Kimi K3 长上下文多模态模型',
  'Google Gemma 系列下载量突破 10 亿',
  '中国筹备世界人工智能合作组织 WAICO',
  'OpenAI 开源 Codex Harness 评测框架',
  'Anthropic 将 computer use、Skills 与 Files API 推向 GA',
  'Gemma 本地/边缘模型评估清单',
  'Codex Harness 内部 coding-agent 评测',
  'Claude Skills/Files API 文件工作流试点',
  '## 今日结论',
  '## 明日跟踪点',
  '## 证据矩阵',
  '来源条目 1：月之暗面发布 Kimi K3 长上下文多模态模型',
  '来源条目 5：Anthropic 将 computer use、Skills 与 Files API 推向 GA',
];

export const caseLevelFaqSignals = [
  { label: 'KIMI_K3_LONG_CONTEXT_MODEL', sourceStoryMatchTerms: ['Kimi K3', '100 万 token'], requiredTerms: ['long context', 'open model', 'coding', 'repository', 'weights'], links: ['/en/blog/what-is-openclaw/', '/en/blog/openclaw-model-fallback-strategy/'] },
  { label: 'GOOGLE_GEMMA_1B_DOWNLOADS', sourceStoryMatchTerms: ['Gemma', '10 亿'], requiredTerms: ['open model', 'downloads', 'local inference', 'license', 'edge'], links: ['/en/blog/what-is-openclaw/', '/en/blog/openclaw-vps-deployment-complete-guide/'] },
  { label: 'CHINA_WAICO_AI_GOVERNANCE', sourceStoryMatchTerms: ['WAICO', '全球 AI 治理'], requiredTerms: ['governance', 'standards', 'international', 'membership', 'coordination'], links: ['/en/blog/what-is-openclaw/', '/en/blog/openclaw-vps-deployment-complete-guide/'] },
  { label: 'OPENAI_CODEX_HARNESS_EVAL', sourceStoryMatchTerms: ['Codex Harness', '评测'], requiredTerms: ['coding agent', 'benchmark', 'reproducible', 'sandbox', 'logs'], links: ['/en/blog/openclaw-model-fallback-strategy/', '/en/blog/openclaw-vps-deployment-complete-guide/'] },
  { label: 'ANTHROPIC_SKILLS_FILES_API_GA', sourceStoryMatchTerms: ['Skills', 'Files API'], requiredTerms: ['Files API', 'skills', 'computer use', 'permissions', 'audit'], links: ['/en/blog/what-is-openclaw/', '/en/blog/openclaw-model-fallback-strategy/'] },
  { label: 'GEMMA_EDGE_EVAL_CHECKLIST', practicalCaseMatchTerms: ['Gemma 本地/边缘模型评估清单'], requiredTerms: ['local inference', 'edge', 'license', 'latency', 'privacy'], links: ['/en/blog/openclaw-vps-deployment-complete-guide/', '/en/blog/openclaw-model-fallback-strategy/'] },
  { label: 'CODEX_HARNESS_INTERNAL_EVAL', practicalCaseMatchTerms: ['Codex Harness 内部 coding-agent 评测'], requiredTerms: ['issues', 'tests', 'patches', 'review', 'rollback'], links: ['/en/blog/openclaw-model-fallback-strategy/', '/en/blog/openclaw-vps-deployment-complete-guide/'] },
  { label: 'CLAUDE_FILES_WORKFLOW_PILOT', practicalCaseMatchTerms: ['Claude Skills/Files API 文件工作流试点'], requiredTerms: ['upload', 'summary', 'permissions', 'audit', 'human confirmation'], links: ['/en/blog/what-is-openclaw/', '/en/blog/openclaw-model-fallback-strategy/'] },
];

export const parserGuardrails = {
  story1RequiredDetailTokens: ['Kimi K3', '2.8T', '100 万 token', 'Kimi Code'],
  story1ForbiddenDetailTokens: ['Gemma', 'WAICO', 'Codex Harness', 'Files API'],
  story2RequiredDetailTokens: ['Google', 'Gemma', '10 亿', '开放模型'],
  story2ForbiddenDetailTokens: ['Kimi K3', 'WAICO', 'Codex Harness', 'Files API'],
  story3RequiredDetailTokens: ['世界人工智能合作组织', 'WAICO', '全球 AI 治理', '上海'],
  story3ForbiddenDetailTokens: ['Kimi K3', 'Gemma', 'Codex Harness', 'Files API'],
  story4RequiredDetailTokens: ['OpenAI', 'Codex Harness', 'coding agent', '评测'],
  story4ForbiddenDetailTokens: ['Kimi K3', 'Gemma', 'WAICO', 'Files API'],
  story5RequiredDetailTokens: ['Anthropic', 'computer use', 'Skills', 'Files API'],
  story5ForbiddenDetailTokens: ['Kimi K3', 'Gemma', 'WAICO', 'Codex Harness'],
  story5ForbiddenEvidenceTokens: ['Kimi K3', 'Gemma', 'WAICO', 'Codex Harness'],
  story5ForbiddenZhEvidenceTokens: ['Kimi K3', 'Gemma', 'WAICO', 'Codex Harness'],
};
