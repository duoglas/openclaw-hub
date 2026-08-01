export const fixtureDate = '2026-08-01';

export const realCronFixture = `《AI、科技日报》  
2026-08-01 早报

## 今日要闻（5条）

1. OpenAI 强调“更便宜的智能”路线

发生了什么：OpenAI 7月31日发文称，AI 基础设施的价值不在“大”，而在于让更强智能以更低成本服务更多人。文中披露其模型已触达超过 10 亿活跃用户、超过 200 万家企业。

为什么重要：OpenAI 正把叙事从“模型能力竞赛”转向“单位智能成本”和“可规模化商业回报”。

可能影响：企业采购 AI 会更关注“完成一个任务的总成本”，而不是单看 token 单价或模型排名。

2. OpenAI 下调 GPT‑5.6 Luna / Terra API 价格

发生了什么：OpenAI 称，从 7月30日起，GPT‑5.6 Luna 输入/输出价格降至每百万 token 0.20 / 1.20 美元，降幅 80%；Terra 降至 2 / 12 美元，降幅 20%。Sol 推出 Fast mode，速度最高 2.5 倍，价格为标准模式 2 倍。

为什么重要：这会直接压低高频 AI 工作流成本，尤其是客服分类、文档处理、代码实现、批量分析等场景。

可能影响：普通开发者和小型团队能把更多任务交给较低价模型；大模型厂商价格战会继续。

3. NVIDIA 推动 Open Secure AI Alliance，主打开放式 AI 安全

发生了什么：NVIDIA 7月27日发布文章称，多家云、安全、软件、开源和 AI 公司加入 Open Secure AI Alliance，目标是用开放模型、开放工具和开放 agent harness 提升 AI 时代的网络防御能力。

为什么重要：AI 安全争论正在从“开源是否危险”转向“防御者是否需要可检查、可本地运行、可审计的 AI 工具”。

可能影响：企业安全产品会更重视 agent 身份、权限、日志、评测和隔离；监管层也可能重新评估对开放模型的一刀切限制。

4. 中国卫星互联网组网提速，但商业闭环仍待突破

发生了什么：新华网7月31日报道，千帆星座已有 238 颗卫星稳定在轨，GW 星座约 180 颗卫星运转，两大低轨星座均计划年内完成骨干网组网。文章同时指出，行业仍需要从“造星”转向“用星”。

为什么重要：卫星互联网不只是通信基础设施，也会影响低空经济、自动驾驶、应急通信、海洋监测和高精度位置服务。

可能影响：短期看制造、发射、地面设备继续受益；中长期关键在数据运营和大众场景，而不是单纯比拼卫星数量。

5. 国家数据局鼓励“词元交易”等 AI 数据商业模式

发生了什么：新华网7月29日报道，国家数据局称，截至2026年6月，全国已建成高质量数据集超 12 万个，数据总体量超过 1565PB，并鼓励基于词元应用的商业模式创新、探索词元交易。

为什么重要：高质量数据集被明确视为 AI 发展的关键燃料。中国正在从“算力建设”进一步走向“数据资产化、数据可交易”。

可能影响：工业、医疗、金融、具身智能、低空经济等行业可能出现更多“数据供给—模型迭代—应用落地”的闭环项目。

## 实战案例（2个）

1. 企业 AI 工作流：先用强模型定方案，再用便宜模型执行

OpenAI 给出的典型路径是：复杂环节用 GPT‑5.6 Sol 判断不确定性和制定计划；明确执行环节用 Luna 写代码、跑测试、做批量处理。

普通用户可借鉴：重要决策、复杂写作、代码架构用强模型；资料整理、格式转换、批量改写、初稿生成用便宜快速模型。核心不是“永远用最强”，而是按任务分层。

2. 卫星互联网：从“天上的网”走向“地上的生产力”

新华网报道提到，卫星互联网若要形成商业闭环，不能只靠发射卫星，还要把遥感、定位、通信数据加工成可购买、可复用的服务。

可落地场景包括：应急通信、无人机定位、低空经济调度、海洋监测、枢纽交通高精度定位。真正赚钱的可能不是“卫星本体”，而是数据产品和行业运营。
`;

export const expectedSignals = [
  { title: 'OpenAI 强调“更便宜的智能”路线', sourceProjectionRuleMatches: ['openai-chatgpt-model-picker-2026'], enLabel: 'OpenAI / cheaper intelligence / enterprise scale economics', zhEvidence: '来源条目 1：OpenAI 强调“更便宜的智能”路线', requiredTokens: ['更便宜的智能', '10 亿活跃用户', '200 万家企业'] },
  { title: 'OpenAI 下调 GPT‑5.6 Luna / Terra API 价格', sourceProjectionRuleMatches: ['openai-chatgpt-model-picker-2026'], enLabel: 'OpenAI / GPT-5.6 / Luna-Terra API price cuts', zhEvidence: '来源条目 2：OpenAI 下调 GPT‑5.6 Luna / Terra API 价格', requiredTokens: ['GPT‑5.6 Luna', '0.20 / 1.20 美元', 'Sol 推出 Fast mode'] },
  { title: 'NVIDIA 推动 Open Secure AI Alliance，主打开放式 AI 安全', sourceProjectionRuleMatches: ['china-waic-agent-safety-evaluation-2026'], enLabel: 'NVIDIA / Open Secure AI Alliance / open AI security', zhEvidence: '来源条目 3：NVIDIA 推动 Open Secure AI Alliance，主打开放式 AI 安全', requiredTokens: ['Open Secure AI Alliance', '开放 agent harness', '网络防御'] },
  { title: '中国卫星互联网组网提速，但商业闭环仍待突破', sourceProjectionRuleMatches: ['xinhua-space-computing-commercial-space-2026'], enLabel: 'China / satellite internet / commercial space data services', zhEvidence: '来源条目 4：中国卫星互联网组网提速，但商业闭环仍待突破', requiredTokens: ['千帆星座', '238 颗卫星', '用星'] },
  { title: '国家数据局鼓励“词元交易”等 AI 数据商业模式', sourceProjectionRuleMatches: ['china-waic-token-cost-optimization-2026'], enLabel: 'China / National Data Administration / token trading data assets', zhEvidence: '来源条目 5：国家数据局鼓励“词元交易”等 AI 数据商业模式', requiredTokens: ['高质量数据集超 12 万个', '1565PB', '词元交易'] },
];

export const bannedFallbackPhrases = [
  'The source tracks model capability update',
  'The source tracks industrial AI deployment',
  'giving the daily brief a named actor and deployment context',
  'buyers must check access control, infrastructure availability, operational risk',
  'today AI / technology daily not generated',
  '今日 AI / 科技日报暂未生成',
  '-…',
  '...',
];

export const requiredEnglishOutputs = [
  '### 1. OpenAI / cheaper intelligence / enterprise scale economics',
  '### 2. OpenAI / GPT-5.6 / Luna-Terra API price cuts',
  '### 3. NVIDIA / Open Secure AI Alliance / open AI security',
  '### 4. China / satellite internet / commercial space data services',
  '### 5. China / National Data Administration / token trading data assets',
  'Evidence item 1: OpenAI / cheaper intelligence / enterprise scale economics',
  'Evidence item 5: China / National Data Administration / token trading data assets',
  '## Today’s Bottom Line',
  '## What to Watch Tomorrow',
  '## Evidence Matrix',
];

export const requiredZhOutputs = [
  'OpenAI 强调“更便宜的智能”路线',
  'OpenAI 下调 GPT‑5.6 Luna / Terra API 价格',
  'NVIDIA 推动 Open Secure AI Alliance，主打开放式 AI 安全',
  '中国卫星互联网组网提速，但商业闭环仍待突破',
  '国家数据局鼓励“词元交易”等 AI 数据商业模式',
  '企业 AI 工作流：先用强模型定方案，再用便宜模型执行',
  '卫星互联网：从“天上的网”走向“地上的生产力”',
  '## 今日结论',
  '## 明日跟踪点',
  '## 证据矩阵',
  '来源条目 1：OpenAI 强调“更便宜的智能”路线',
  '来源条目 5：国家数据局鼓励“词元交易”等 AI 数据商业模式',
];

export const caseLevelFaqSignals = [
  {
    label: 'Model routing cost-per-task workflow',
    practicalCaseMatchTerms: ['强模型', '便宜模型', '按任务分层'],
    sourceStoryMatchTerms: ['GPT‑5.6 Sol', 'Luna', 'Fast mode'],
    requiredTerms: ['cost per task', 'routing policy', 'quality review'],
    links: ['/en/blog/openclaw-model-fallback-strategy/', '/en/blog/what-is-openclaw/'],
  },
  {
    label: 'Satellite data service commercialization',
    practicalCaseMatchTerms: ['卫星互联网', '数据产品', '行业运营'],
    sourceStoryMatchTerms: ['千帆星座', 'GW 星座', '用星'],
    requiredTerms: ['data product', 'service-level agreement', 'industry workflow'],
    links: ['/en/blog/openclaw-vps-deployment-complete-guide/', '/en/blog/openclaw-security-hardening-2026/'],
  },
];

export const parserGuardrails = {
  story1RequiredDetailTokens: ['更便宜的智能', '10 亿活跃用户', '200 万家企业'],
  story1ForbiddenDetailTokens: ['0.20 / 1.20 美元', 'Open Secure AI Alliance', '千帆星座'],
  story2RequiredDetailTokens: ['GPT‑5.6 Luna', 'Terra', 'Fast mode'],
  story2ForbiddenDetailTokens: ['10 亿活跃用户', 'Open Secure AI Alliance', '词元交易'],
  story3RequiredDetailTokens: ['Open Secure AI Alliance', '开放 agent harness', '网络防御'],
  story3ForbiddenDetailTokens: ['GPT‑5.6 Luna', '千帆星座', '词元交易'],
  story4RequiredDetailTokens: ['千帆星座', '238 颗卫星', '用星'],
  story4ForbiddenDetailTokens: ['Open Secure AI Alliance', 'GPT‑5.6 Luna', '词元交易'],
  story5RequiredDetailTokens: ['高质量数据集超 12 万个', '1565PB', '词元交易'],
  story5ForbiddenDetailTokens: ['Open Secure AI Alliance', '千帆星座', 'GPT‑5.6 Luna'],
};
