export const fixtureDate = '2026-08-20';

export const realCronFixture = `《AI、科技日报》  
2026-08-20 早报

## 今日要闻（5条）

1. NVIDIA 与 OpenAI 绑定俄亥俄 4.25GW AI 工厂
发生了什么：NVIDIA 官宣与 SB Energy 合作，锁定美国俄亥俄州朴茨茅斯的 PORTS-Pike 园区电力与场地，OpenAI 作为租户建设运营 AI 工厂并归类为全球事务布局，采用 NVIDIA 全栈 DSX 平台。
为什么重要：NVIDIA 首次为"地皮+电力+厂房"做长达 20 年担保，从卖芯片走向锁定基础设施，算力即收入模式正式确立。
可能影响：初始 4.25GW、每代约 150 万块 GPU，OpenAI 到 2030 年合计约 12GW（可扩至 16GW），对应约 6000 亿美元 NVIDIA 算力；AI 军备竞赛进入"圈地+圈电"阶段。
状态：已确认，NVIDIA 官方博客 8 月 17 日直抓全文。

2. Waymo 把 Gemini 装进自研 Ojai 无人车
发生了什么：Waymo 在定制 Ojai 车型中引入 Gemini，打造更个性化乘车体验，前沿模型首次系统性上车 robotaxi。
为什么重要：自动驾驶竞争从感知硬件转向座舱智能，打车体验差异化让 Uber/Lyft 与车企被迫跟进。
可能影响：robotaxi 平台需在座舱智能、个性化交互与安全合规之间平衡，Gemini 上车成为新一轮体验差异化的分水岭。
状态：已确认，Google 官方博客 8 月 19 日 RSS 直抓。

3. 全球大学生免费领一年 Google AI 计划
发生了什么：Google 面向全球高校在读生免费送 12 个月 Google AI 计划（含 Gemini），并推出新学习工具，直接对标 OpenAI 学生策略。
为什么重要：AI 订阅战烧到校园，付费转化漏斗前移，抢下一代用户入口。
可能影响：学生可在开学季先领免费 Gemini，配合内置 SAT 全真题练习与新学习工具，备考全程低成本起步。
状态：已确认，Google 官方博客 8 月 19 日 RSS 直抓。

4. Gemini 登陆安卓版 Chrome（美国全量）
发生了什么：Gemini in Chrome 正式向全美 Android 用户开放，AI 从独立 App 走进浏览器主入口。
为什么重要：改变"搜索-浏览"动线，移动端默认 AI 助手之争加速。
可能影响：美国安卓用户可在 Chrome 内直接唤起 Gemini，无需另装 App，边浏览边提问、页面总结。
状态：已确认，Google 官方博客 8 月 18 日 RSS 直抓。

5. Google 搜索推 5 项 AI 学习新功能
发生了什么：Search 新增 5 种学习场景工具，覆盖课程与标化考试备考（Add Notebook、Ask Google 等）。
为什么重要：AI 直接改造搜索主业的教育场景，而非只做聊天机器人，Quizlet 等学习工具承压。
可能影响：教育科技与学习工具赛道面临搜索入口的降维竞争，需关注其与课堂、备考场景的整合深度。
状态：已确认，Google 官方博客 8 月 19 日 RSS 直抓。

## 实战案例

1. 把日报信号转成一次可重复实验
普通用户不必追逐每一条 AI 新功能，先从信息整理、学习复盘、低风险决策辅助这类高频任务切入，用一次可重复实验验证收益再决定是否扩展。
实际价值：
- 先选一个高频流程做试点；
- 把权限、审计、成本和人工复核写进上线标准；
- 用一次可重复实验验证收益。

2. 企业侧：权限与审计是 agent 落地上限
AI agent 能调用工具、访问系统并执行任务，安全失败会变成权限、工作流与真实行动的失败。企业应要求身份检查、最小权限、行为日志、运行期异常监控与敏感操作人工确认。
实际价值：
- 定义数据边界与最小权限；
- 补审计日志与运行期异常监控；
- 敏感操作保留人工确认。
`;

export const expectedSignals = [
  { title: 'NVIDIA 与 OpenAI 绑定俄亥俄 4.25GW AI 工厂', sourceProjectionRuleMatches: ['china-world-ai-cooperation-organization-2026'], enLabel: 'OpenAI / PORTS-Pike / global affairs infrastructure', zhEvidence: '来源条目 1：NVIDIA 与 OpenAI 绑定俄亥俄 4.25GW AI 工厂', requiredTokens: ['PORTS-Pike', 'SB Energy', '4.25GW', 'DSX'] },
  { title: 'Waymo 把 Gemini 装进自研 Ojai 无人车', sourceProjectionRuleMatches: ['nvidia-drive-hyperion-robotaxi-2026'], enLabel: 'Waymo / Gemini / Ojai / robotaxi personalization', zhEvidence: '来源条目 2：Waymo 把 Gemini 装进自研 Ojai 无人车', requiredTokens: ['Waymo', 'Gemini', 'Ojai', 'robotaxi'] },
  { title: '全球大学生免费领一年 Google AI 计划', sourceProjectionRuleMatches: ['google-gemini-interactions-api-agent-runtime-2026'], enLabel: 'Google / Gemini / student AI plan', zhEvidence: '来源条目 3：全球大学生免费领一年 Google AI 计划', requiredTokens: ['Google AI 计划', '大学生', 'Gemini', '学生'] },
  { title: 'Gemini 登陆安卓版 Chrome（美国全量）', sourceProjectionRuleMatches: ['google-gemini-interactions-api-agent-runtime-2026'], enLabel: 'Google / Gemini / Chrome Android assistant', zhEvidence: '来源条目 4：Gemini 登陆安卓版 Chrome（美国全量）', requiredTokens: ['Gemini', 'Chrome', 'Android', '美国'] },
  { title: 'Google 搜索推 5 项 AI 学习新功能', sourceProjectionRuleMatches: ['google-gemini-interactions-api-agent-runtime-2026'], enLabel: 'Google / Search / AI learning features', zhEvidence: '来源条目 5：Google 搜索推 5 项 AI 学习新功能', requiredTokens: ['Search', '5 项', '学习', 'Ask Google'] },
];

export const bannedFallbackPhrases = [
  'The source tracks model capability update',
  'The source tracks compute infrastructure',
  'The source tracks data infrastructure',
  'giving the daily brief a named actor and deployment context',
  'buyers must check access control, infrastructure availability, operational risk',
  '素材已足够',
  '无需再用浏览器',
  '直接输出日报正文',
  '今日 AI / 科技日报暂未生成',
  '用于补齐日报来源核验矩阵',
  'Now I\'ll compose the full report',
  'web_search 双重故障',
  '按 runbook 直接收口出稿',
  '中国板块暂缺',
  'fetch failed',
  '-…',
  '...',
];

export const requiredEnglishOutputs = [
  '### 1. OpenAI / PORTS-Pike / global affairs infrastructure',
  '### 2. Waymo / Gemini / Ojai / robotaxi personalization',
  '### 3. Google / Gemini / student AI plan',
  '### 4. Google / Gemini / Chrome Android assistant',
  '### 5. Google / Search / AI learning features',
  'Evidence item 1: OpenAI / PORTS-Pike / global affairs infrastructure',
  'Evidence item 5: Google / Search / AI learning features',
  '## Case-Level FAQ',
  '## Today’s Bottom Line',
  '## What to Watch Tomorrow',
  '## Evidence Matrix',
];

export const requiredZhOutputs = [
  'NVIDIA 与 OpenAI 绑定俄亥俄 4.25GW AI 工厂',
  'Waymo 把 Gemini 装进自研 Ojai 无人车',
  '全球大学生免费领一年 Google AI 计划',
  'Gemini 登陆安卓版 Chrome（美国全量）',
  'Google 搜索推 5 项 AI 学习新功能',
  '把日报信号转成一次可重复实验',
  '企业侧：权限与审计是 agent 落地上限',
  '## 今日结论',
  '## 明日跟踪点',
  '## 证据矩阵',
  '来源条目 1：NVIDIA 与 OpenAI 绑定俄亥俄 4.25GW AI 工厂',
  '来源条目 5：Google 搜索推 5 项 AI 学习新功能',
];

export const caseLevelFaqSignals = [
  {
    label: 'OPENAI_PORTS_PIKE_INFRASTRUCTURE',
    sourceStoryMatchTerms: ['PORTS-Pike', '4.25GW'],
    requiredTerms: ['infrastructure', 'energy', 'data center', 'capacity', 'procurement'],
    links: ['/en/blog/what-is-openclaw/', '/en/blog/openclaw-vps-deployment-complete-guide/'],
  },
  {
    label: 'WAYMO_GEMINI_ROBOTAXI',
    sourceStoryMatchTerms: ['Waymo', 'Gemini', 'Ojai'],
    requiredTerms: ['robotaxi', 'in-cabin', 'driverless', 'safety', 'personalization'],
    links: ['/en/blog/openclaw-model-fallback-strategy/', '/en/blog/openclaw-vps-deployment-complete-guide/'],
  },
  {
    label: 'STUDENT_GOOGLE_AI_PLAN',
    sourceStoryMatchTerms: ['Google AI 计划', '大学生'],
    requiredTerms: ['students', 'education', 'subscription', 'free tier', 'consumer'],
    links: ['/en/blog/what-is-openclaw/', '/en/blog/openclaw-vps-deployment-complete-guide/'],
  },
  {
    label: 'GEMINI_CHROME_ANDROID',
    sourceStoryMatchTerms: ['Gemini', 'Chrome', 'Android'],
    requiredTerms: ['browser', 'assistant', 'search', 'mobile', 'Android'],
    links: ['/en/blog/openclaw-model-fallback-strategy/', '/en/blog/openclaw-vps-deployment-complete-guide/'],
  },
  {
    label: 'GOOGLE_SEARCH_LEARNING',
    sourceStoryMatchTerms: ['Ask Google', '学习新功能'],
    requiredTerms: ['search', 'learning', 'education', 'assessment', 'Gemini'],
    links: ['/en/blog/what-is-openclaw/', '/en/blog/openclaw-vps-deployment-complete-guide/'],
  },
  {
    label: 'PERSONAL_PRODUCTIVITY_REPEATED_EXPERIMENT',
    practicalCaseMatchTerms: ['把日报信号转成一次可重复实验', '一次可重复实验'],
    requiredTerms: ['repeatable experiment', 'information organization', 'learning review', 'low-risk decision'],
    links: ['/en/blog/what-is-openclaw/', '/en/blog/openclaw-vps-deployment-complete-guide/'],
  },
  {
    label: 'ENTERPRISE_AGENT_PERMISSION_AUDIT',
    practicalCaseMatchTerms: ['企业侧：权限与审计是 agent 落地上限', '权限与审计'],
    requiredTerms: ['open models', 'audit', 'evaluate', 'isolate', 'incident response'],
    links: ['/en/blog/openclaw-model-fallback-strategy/', '/en/blog/openclaw-vps-deployment-complete-guide/'],
  },
];

export const parserGuardrails = {
  story1RequiredDetailTokens: ['PORTS-Pike', 'SB Energy', '4.25GW', 'DSX'],
  story1ForbiddenDetailTokens: ['Waymo', 'Ojai', 'Chrome', '学习新功能', '大学生'],
  story2RequiredDetailTokens: ['Waymo', 'Gemini', 'Ojai', 'robotaxi'],
  story2ForbiddenDetailTokens: ['PORTS-Pike', '4.25GW', 'Chrome', '学习新功能', '大学生'],
  story3RequiredDetailTokens: ['Google AI 计划', '大学生', 'Gemini', '学生'],
  story3ForbiddenDetailTokens: ['PORTS-Pike', 'Waymo', 'Ojai', 'Chrome', '学习新功能'],
  story4RequiredDetailTokens: ['Gemini', 'Chrome', 'Android', '美国'],
  story4ForbiddenDetailTokens: ['PORTS-Pike', 'Waymo', '4.25GW', '学习新功能', '大学生'],
  story5RequiredDetailTokens: ['Search', '5 项', '学习', 'Ask Google'],
  story5ForbiddenDetailTokens: ['PORTS-Pike', 'Waymo', '4.25GW', 'Gemini in Chrome', '大学生'],
  story5ForbiddenEvidenceTokens: ['PORTS-Pike', 'Waymo', '4.25GW', 'Chrome'],
  story5ForbiddenZhEvidenceTokens: ['PORTS-Pike', 'Waymo', '4.25GW', 'Chrome'],
};
