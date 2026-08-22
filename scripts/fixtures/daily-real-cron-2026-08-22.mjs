export const fixtureDate = '2026-08-22';

export const realCronFixture = `《AI、科技日报》
2026-08-22 早报

## 今日要闻（5条）

1. DeepSeek 上线多模态视觉模型 V4-Flash-Vision-Exp
发生了什么：8/21 DeepSeek API 平台新增实验模型 deepseek-v4-flash-vision-exp，支持图文混合输入，同步上线免费 Files API；配套 DeepSeek Harness 0.1.1 当天发布。
为什么重要：这是 V4 系列首次开放视觉能力，官方称多模态 Agent 性能接近 Opus-4.8，图片按 384 token/张计费、沿用 Flash 定价。
可能影响：截图理解、图表分析类 Agent 工作流成本大幅下降，国产模型在多模态 Agent 赛道再进一步。
状态：已确认，DeepSeek 官方 API 平台直抓。

2. 智谱 GLM-5.3 API 正式上线，权重待开源
发生了什么：8/14 发布、8/19 API 上线，8/20 国家超算互联网平台同步开放调用；官方文档确认编码性能较 GLM-5.2 提升 50%，1M 上下文 + 128K 输出。
为什么重要：官方称其达到开源模型 SOTA（Terminal Bench 3.0 等），且 CyberGym 漏洞发现基准史上最强、漏洞利用分数超 GLM-5.2 两倍，权重预告下周五开源。
可能影响：开源阵营首次在"攻防级"网络安全能力上逼近闭源旗舰，Coding Plan 用户已可直接切换。
状态：已确认，智谱官方文档与 API 平台直抓。

3. NVIDIA × OpenAI 锁定俄亥俄 8GW 算力园区
发生了什么：NVIDIA 官方博客披露（8/17），与 SB Energy 合作锁定 PORTS-Pike 园区电力与土地，OpenAI 作为租户建设 4.25GW AI 工厂；OpenAI 对 NVIDIA 算力总承诺约 12GW（可扩至 16GW）。
为什么重要：官方口径"compute is revenue"——到 2030 年对应约 6000 亿美元 NVIDIA 算力收入，NVIDIA 为此提供 20 年期部分担保。
可能影响：算力基础设施正式金融资产化，训练算力向"电力+土地"瓶颈转移，行业资本开支竞赛继续加码。
状态：已确认，NVIDIA 官方博客直抓。

4. Anthropic 暂停最新模型两周 RL 训练
发生了什么：行业日报称（8/20）Anthropic 因 Astra 模型可能触及"关键网络安全能力阈值"，暂停最新模型两周强化学习训练。
为什么重要：若属实，这是头部实验室首次因网络安全阈值主动放缓训练节奏。
可能影响：模型发布时间线或推迟。目前仅有聚合媒体单一信源，未见 Anthropic 官方公告，待确认。
状态：待确认，单一聚合媒体信源。

5. 腾讯 Q2 资本开支 528 亿元、自由现金流转负
发生了什么：行业聚合页数据（8/14 更新）显示腾讯二季度资本开支 528 亿元，自由现金流转负。
为什么重要：头部大厂"以利润换 AI 空间"的信号，与 NVIDIA/OpenAI 万亿级算力布局互为印证。
可能影响：国内云厂商 AI 投入进入刚性阶段。此数据来自二级聚合页，未见财报原文直核，待确认。
状态：待确认，来自二级聚合页。

## 实战案例

1. DeepSeek Files API + 视觉模型组合
上传图片一次、按 file_id 复用，省去重复传图带宽；模型名切到 deepseek-v4-flash-vision-exp 即可用，走 Chat Completions / Messages / Responses 三种协议都行。适合做"截图→结构化数据"类自动化，Files API 免费。

2. GLM Coding Plan 用户升级路径
官方文档确认 GLM-5.3 已对全部 Coding Plan 用户开放（18 元/月起），建议在复杂编码任务把 reasoning_effort 设为 max；注意新模型不支持关闭思考，老代码里 thinking.type:"disabled" 要改成 enabled，否则请求会失败。
`;

export const expectedSignals = [
  { title: 'DeepSeek 上线多模态视觉模型 V4-Flash-Vision-Exp', sourceProjectionRuleMatches: ['moonshot-kimi-k3-long-context-open-model-2026'], enLabel: 'China / DeepSeek / V4-Flash-Vision-Exp multimodal API', zhEvidence: '来源条目 1：DeepSeek 上线多模态视觉模型 V4-Flash-Vision-Exp', requiredTokens: ['DeepSeek', 'V4-Flash-Vision-Exp', 'Files API', '384 token'] },
  { title: '智谱 GLM-5.3 API 正式上线，权重待开源', sourceProjectionRuleMatches: ['moonshot-kimi-k3-long-context-open-model-2026'], enLabel: 'China / Z.ai / GLM-5.3 open-source model SOTA', zhEvidence: '来源条目 2：智谱 GLM-5.3 API 正式上线，权重待开源', requiredTokens: ['GLM-5.3', 'CyberGym', '开源', 'Coding Plan'] },
  { title: 'NVIDIA × OpenAI 锁定俄亥俄 8GW 算力园区', sourceProjectionRuleMatches: ['china-world-ai-cooperation-organization-2026'], enLabel: 'OpenAI / PORTS-Pike / global affairs infrastructure', zhEvidence: '来源条目 3：NVIDIA × OpenAI 锁定俄亥俄 8GW 算力园区', requiredTokens: ['NVIDIA', 'SB Energy', 'PORTS-Pike', '4.25GW'] },
  { title: 'Anthropic 暂停最新模型两周 RL 训练', sourceProjectionRuleMatches: ['anthropic-fable-jailbreak-severity-framework-2026'], enLabel: 'Anthropic / Astra / cybersecurity threshold RL pause', zhEvidence: '来源条目 4：Anthropic 暂停最新模型两周 RL 训练', requiredTokens: ['Anthropic', 'Astra', '网络安全', '强化学习'] },
  { title: '腾讯 Q2 资本开支 528 亿元、自由现金流转负', sourceProjectionRuleMatches: ['china-ai-commercialization-roi-2026'], enLabel: 'Tencent / China / Q2 capex AI spend', zhEvidence: '来源条目 5：腾讯 Q2 资本开支 528 亿元、自由现金流转负', requiredTokens: ['腾讯', '资本开支', '528 亿元', '自由现金流'] },
];

export const bannedFallbackPhrases = [
  'The source tracks model capability update',
  'giving the daily brief a named actor and deployment context',
  'buyers must check access control, infrastructure availability, operational risk',
  'validation=fail',
  'tool_errors=',
  'web_search 连续报错',
  "Now I'll compose the full report",
  '用于补齐日报来源核验矩阵',
  '素材已足够',
  '按 runbook 立即收口出稿',
  '直接输出日报正文',
  'fetch failed',
  '-…',
  '...',
];

export const requiredEnglishOutputs = [
  '### 1. China / DeepSeek / V4-Flash-Vision-Exp multimodal API',
  '### 2. China / Z.ai / GLM-5.3 open-source model SOTA',
  '### 3. OpenAI / PORTS-Pike / global affairs infrastructure',
  '### 4. Anthropic / Astra / cybersecurity threshold RL pause',
  '### 5. Tencent / China / Q2 capex AI spend',
  'Evidence item 1: China / DeepSeek / V4-Flash-Vision-Exp multimodal API',
  'Evidence item 5: Tencent / China / Q2 capex AI spend',
  '## Case-Level FAQ',
  '## Today’s Bottom Line',
  '## What to Watch Tomorrow',
  '## Evidence Matrix',
];

export const requiredZhOutputs = [
  'DeepSeek 上线多模态视觉模型 V4-Flash-Vision-Exp',
  '智谱 GLM-5.3 API 正式上线，权重待开源',
  'NVIDIA × OpenAI 锁定俄亥俄 8GW 算力园区',
  'Anthropic 暂停最新模型两周 RL 训练',
  '腾讯 Q2 资本开支 528 亿元、自由现金流转负',
  'DeepSeek Files API + 视觉模型组合',
  'GLM Coding Plan 用户升级路径',
  '## 今日结论',
  '## 明日跟踪点',
  '## 证据矩阵',
  '来源条目 1：DeepSeek 上线多模态视觉模型 V4-Flash-Vision-Exp',
  '来源条目 5：腾讯 Q2 资本开支 528 亿元、自由现金流转负',
];

export const caseLevelFaqSignals = [
  { label: 'DEEPSEEK_V4_FLASH_VISION_EXP', sourceStoryMatchTerms: ['DeepSeek', 'V4-Flash-Vision-Exp'], requiredTerms: ['vision', 'multimodal', 'API', 'Files', 'pricing'], links: ['/en/blog/what-is-openclaw/', '/en/blog/openclaw-vps-deployment-complete-guide/'] },
  { label: 'GLM_5_3_OPEN_SOURCE_SOTA', sourceStoryMatchTerms: ['GLM-5.3', 'CyberGym'], requiredTerms: ['open source', 'coding', 'cybersecurity', 'SOTA', 'Coding Plan'], links: ['/en/blog/openclaw-model-fallback-strategy/', '/en/blog/openclaw-vps-deployment-complete-guide/'] },
  { label: 'PORTS_PIKE_8GW_AI_FACTORY', sourceStoryMatchTerms: ['PORTS-Pike', '4.25GW'], requiredTerms: ['energy', 'land', 'data center', 'capacity', 'procurement'], links: ['/en/blog/what-is-openclaw/', '/en/blog/openclaw-vps-deployment-complete-guide/'] },
  { label: 'ANTHROPIC_ASTRA_RL_PAUSE', sourceStoryMatchTerms: ['Anthropic', 'Astra'], requiredTerms: ['cybersecurity', 'reinforcement learning', 'safety', 'threshold', 'training'], links: ['/en/blog/openclaw-model-fallback-strategy/', '/en/blog/openclaw-vps-deployment-complete-guide/'] },
  { label: 'TENCENT_Q2_CAPEX_AI_SPEND', sourceStoryMatchTerms: ['腾讯', '资本开支'], requiredTerms: ['capex', 'free cash flow', 'AI spend', 'infrastructure', 'investment'], links: ['/en/blog/what-is-openclaw/', '/en/blog/openclaw-model-fallback-strategy/'] },
  { label: 'DEEPSEEK_FILES_API_COMBO', practicalCaseMatchTerms: ['DeepSeek Files API + 视觉模型组合', 'file_id 复用'], requiredTerms: ['Files API', 'file reuse', 'vision', 'automation', 'structured data'], links: ['/en/blog/what-is-openclaw/', '/en/blog/openclaw-vps-deployment-complete-guide/'] },
  { label: 'GLM_CODING_PLAN_UPGRADE', practicalCaseMatchTerms: ['GLM Coding Plan 用户升级路径', 'reasoning_effort'], requiredTerms: ['Coding Plan', 'reasoning', 'thinking', 'compatibility', 'pricing'], links: ['/en/blog/openclaw-model-fallback-strategy/', '/en/blog/openclaw-vps-deployment-complete-guide/'] },
];

export const parserGuardrails = {
  story1RequiredDetailTokens: ['DeepSeek', 'V4-Flash-Vision-Exp', 'Files API', '384 token'],
  story1ForbiddenDetailTokens: ['GLM-5.3', 'PORTS-Pike', 'Astra 模型', '528 亿元'],
  story2RequiredDetailTokens: ['GLM-5.3', 'CyberGym', '开源', 'Coding Plan'],
  story2ForbiddenDetailTokens: ['V4-Flash-Vision-Exp', 'PORTS-Pike', 'Astra 模型', '528 亿元'],
  story3RequiredDetailTokens: ['NVIDIA', 'SB Energy', 'PORTS-Pike', '4.25GW'],
  story3ForbiddenDetailTokens: ['V4-Flash-Vision-Exp', 'GLM-5.3', 'Astra 模型', '528 亿元'],
  story4RequiredDetailTokens: ['Anthropic', 'Astra', '网络安全', '强化学习'],
  story4ForbiddenDetailTokens: ['V4-Flash-Vision-Exp', 'GLM-5.3', 'PORTS-Pike', '528 亿元'],
  story5RequiredDetailTokens: ['腾讯', '528 亿元', '自由现金流'],
  story5ForbiddenDetailTokens: ['V4-Flash-Vision-Exp', 'GLM-5.3', 'PORTS-Pike', 'Astra 模型'],
  story5ForbiddenEvidenceTokens: ['V4-Flash-Vision-Exp', 'GLM-5.3', 'PORTS-Pike', 'Astra 模型'],
  story5ForbiddenZhEvidenceTokens: ['V4-Flash-Vision-Exp', 'GLM-5.3', 'PORTS-Pike', 'Astra 模型'],
};
