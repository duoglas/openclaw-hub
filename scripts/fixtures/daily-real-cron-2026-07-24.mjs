export const fixtureDate = '2026-07-24';

export const realCronFixture = `《AI、科技日报》
2026-07-24 早报

## 今日要闻（5条）

1. NVIDIA 把“后训练”定义为 Agentic AI 的核心算力战场

发生了什么：
NVIDIA 官方博客强调，Agentic AI 不再只是一次性训练后上线，而是需要持续后训练：模型要不断学习工具变化、生产环境异常、复杂任务反馈。NVIDIA 将关键指标从“每 token 成本”扩展到“每美元智能”。

为什么重要：
这等于把 AI 基建竞争从“推理便宜”推进到“持续改进模型能力是否划算”。

可能影响：
AI 公司和企业私有模型会更重视 RL、评测、环境模拟、自动化后训练流水线；GPU / AI 工厂需求会继续向训练+推理混合负载倾斜。

2. Google I/O 2026 主线明确：Gemini 进入 Agentic 产品化阶段

发生了什么：
Google 官方文章称，Gemini App 月活超过 9 亿；AI Overviews 月活超过 25 亿；AI Mode 一年内超过 10 亿月活。Google 还提到 Ask YouTube、Docs Live、语音驱动文档等产品方向。

为什么重要：
Google 正在把 AI 从“单点聊天工具”塞进搜索、YouTube、Docs、Maps 等高频入口。

可能影响：
普通用户会越来越少“打开一个 AI 应用”，而是在搜索、视频、办公里直接用 AI。开发者侧，Google 生态的模型 API 和 TPU 基建会继续放大。

3. Anthropic：Claude Science 上线，科研工作流成为 AI 产品新战场

发生了什么：
Anthropic 新闻页显示，Claude Science 已可用，定位为科学家的 AI workbench，可集成科研常用工具和包，生成可审计 artifacts，并提供灵活计算资源访问。

为什么重要：
AI 产品正在从通用聊天，走向垂直专业工作台。科研、药物、材料、工程等高价值场景会成为模型能力落地的重要方向。

可能影响：
研究人员可能更快完成数据分析、实验记录、代码复现和论文辅助；但也会带来可审计性、引用可靠性和研究责任边界问题。

4. OpenAI 简化 ChatGPT 模型选择器，降低普通用户选择成本

发生了什么：
OpenAI 中文帮助中心显示，ChatGPT 模型选择器更新为 Instant、Medium、High、Extra High、Pro Standard、Pro Extended 等更直观选项。

为什么重要：
模型越来越多后，普通用户很难判断“该选哪个”。OpenAI 把模型命名从技术导向改成任务体验导向。

可能影响：
用户会更少纠结模型名，更多按速度/推理强度选择；但高级用户仍需要理解不同档位的成本、速度和准确率差异。

5. 中国 AI 动向：美团 LongCat / AIGC / 论文进展信息活跃，但需官方源二次确认

发生了什么：
二级 AI 聚合页显示，美团技术团队在 7 月 23 日集中出现多条 AI 进展：ACL / ICML 论文、AIGC 海报生成系统、LongCat-2.0 等。

为什么重要：
如果属实，说明中国本地生活平台正在把 AI 投入搜索推荐、营销内容生成、Agentic Coding 和大模型基础设施。

可能影响：
本地生活、电商、广告生成、推荐系统可能进一步 AI 化；但目前只抓到 L3 二级来源，未抓到美团官方原始公告，不能按“已确认”处理。

## 实战案例

1. 普通用户：ChatGPT / Gemini 的选择逻辑可以更简单
快速问答、改写、翻译可选 Instant / 快速档；复杂规划、代码、长文分析可选 Medium / High；重要决策、复杂推理、长链路任务再上 Extra High / Pro 档。

2. 企业 / 团队：开始补“后训练”和评测闭环
不要只接一个大模型 API；建一个小型任务评测集，覆盖客服、销售、研发、数据分析等高频流程；记录人工复核、失败样本、成本和响应时延。
`;

export const expectedSignals = [
  { title: 'NVIDIA 把“后训练”定义为 Agentic AI 的核心算力战场', sourceProjectionRuleMatches: ['nvidia-agentic-post-training-infrastructure-2026'], enLabel: 'NVIDIA / post-training / agentic AI infrastructure', zhEvidence: '来源条目 1：NVIDIA 把“后训练”定义为 Agentic AI 的核心算力战场', requiredTokens: ['持续后训练', '每美元智能', 'RL'] },
  { title: 'Google I/O 2026 主线明确：Gemini 进入 Agentic 产品化阶段', sourceProjectionRuleMatches: ['google-gemini-interactions-api-agent-runtime-2026'], enLabel: 'Google / Gemini / agentic product surface', zhEvidence: '来源条目 2：Google I/O 2026 主线明确：Gemini 进入 Agentic 产品化阶段', requiredTokens: ['Gemini App 月活超过 9 亿', 'AI Overviews 月活超过 25 亿', 'AI Mode 一年内超过 10 亿月活'] },
  { title: 'Anthropic：Claude Science 上线，科研工作流成为 AI 产品新战场', sourceProjectionRuleMatches: ['anthropic-claude-science-research-workbench-2026'], enLabel: 'Anthropic / Claude Science / research agent workflow', zhEvidence: '来源条目 3：Anthropic：Claude Science 上线，科研工作流成为 AI 产品新战场', requiredTokens: ['Claude Science 已可用', 'AI workbench', '可审计 artifacts'] },
  { title: 'OpenAI 简化 ChatGPT 模型选择器，降低普通用户选择成本', sourceProjectionRuleMatches: ['openai-chatgpt-model-picker-2026'], enLabel: 'OpenAI / ChatGPT / Instant / model capability update', zhEvidence: '来源条目 4：OpenAI 简化 ChatGPT 模型选择器，降低普通用户选择成本', requiredTokens: ['Instant、Medium、High', 'Pro Standard', 'Pro Extended'] },
  { title: '中国 AI 动向：美团 LongCat / AIGC / 论文进展信息活跃，但需官方源二次确认', sourceProjectionRuleMatches: ['china-meituan-local-commerce-ai-workflow-2026'], enLabel: 'China / Meituan / LongCat AI commerce workflow', zhEvidence: '来源条目 5：中国 AI 动向：美团 LongCat / AIGC / 论文进展信息活跃，但需官方源二次确认', requiredTokens: ['美团', 'LongCat-2.0', 'AIGC 海报生成系统'] },
];

export const bannedFallbackPhrases = [
  'The source tracks agent platform',
  'giving the daily brief a named actor and deployment context',
  'buyers must check access control, infrastructure availability, operational risk',
  'The source includes concrete timing or scale signals',
  'today AI / technology daily not generated',
  '今日 AI / 科技日报暂未生成',
  '-…',
  '...',
];

export const requiredEnglishOutputs = [
  '### 1. NVIDIA / post-training / agentic AI infrastructure',
  '### 2. Google / Gemini / agentic product surface',
  '### 3. Anthropic / Claude Science / research agent workflow',
  '### 4. OpenAI / ChatGPT / Instant / model capability update',
  '### 5. China / Meituan / LongCat AI commerce workflow',
  'Evidence item 2: Google / Gemini / agentic product surface',
  'Evidence item 5: China / Meituan / LongCat AI commerce workflow',
  '## Today’s Bottom Line',
  '## What to Watch Tomorrow',
  '## Evidence Matrix',
];

export const requiredZhOutputs = [
  'NVIDIA 把“后训练”定义为 Agentic AI 的核心算力战场',
  'Google I/O 2026 主线明确：Gemini 进入 Agentic 产品化阶段',
  'Anthropic：Claude Science 上线，科研工作流成为 AI 产品新战场',
  'OpenAI 简化 ChatGPT 模型选择器，降低普通用户选择成本',
  '中国 AI 动向：美团 LongCat / AIGC / 论文进展信息活跃，但需官方源二次确认',
  '普通用户：ChatGPT / Gemini 的选择逻辑可以更简单',
  '企业 / 团队：开始补“后训练”和评测闭环',
  '## 今日结论',
  '## 明日跟踪点',
  '## 证据矩阵',
  '来源条目 2：Google I/O 2026 主线明确：Gemini 进入 Agentic 产品化阶段',
  '来源条目 5：中国 AI 动向：美团 LongCat / AIGC / 论文进展信息活跃，但需官方源二次确认',
];

export const caseLevelFaqSignals = [
  {
    label: 'Google Gemini embedded AI surfaces',
    practicalCaseMatchTerms: ['ChatGPT / Gemini', 'Instant / 快速档', 'Medium / High'],
    sourceStoryMatchTerms: ['Gemini App', 'AI Overviews', 'AI Mode'],
    requiredTerms: ['embedded AI surfaces', 'model tier selection', 'workflow fit'],
    links: ['/en/blog/what-is-openclaw/', '/en/blog/openclaw-model-fallback-strategy/'],
  },
  {
    label: 'Post-training evaluation loop',
    practicalCaseMatchTerms: ['任务评测集', '人工复核', '失败样本', '后训练', '评测闭环'],
    sourceStoryMatchTerms: ['持续后训练', '每美元智能', 'RL'],
    requiredTerms: ['evaluation loop', 'post-training jobs', 'cost per successful task'],
    links: ['/en/blog/openclaw-model-fallback-strategy/', '/en/blog/openclaw-security-hardening-2026/'],
  },
];

export const parserGuardrails = {
  story1RequiredDetailTokens: ['持续后训练', '每美元智能', 'RL'],
  story1ForbiddenDetailTokens: ['Gemini App', 'Claude Science', 'LongCat-2.0'],
  story2RequiredDetailTokens: ['Gemini App 月活超过 9 亿', 'AI Overviews 月活超过 25 亿', 'AI Mode 一年内超过 10 亿月活'],
  story2ForbiddenDetailTokens: ['持续后训练', 'Claude Science', 'LongCat-2.0'],
  story3RequiredDetailTokens: ['Claude Science 已可用', 'AI workbench', '可审计 artifacts'],
  story3ForbiddenDetailTokens: ['Gemini App', 'Instant、Medium、High', 'LongCat-2.0'],
  story4RequiredDetailTokens: ['Instant、Medium、High', 'Pro Standard', 'Pro Extended'],
  story4ForbiddenDetailTokens: ['Gemini App', 'Claude Science', 'LongCat-2.0'],
  story5RequiredDetailTokens: ['美团', 'LongCat-2.0', 'AIGC 海报生成系统'],
  story5ForbiddenDetailTokens: ['Gemini App', 'Claude Science', 'Instant、Medium、High'],
};
