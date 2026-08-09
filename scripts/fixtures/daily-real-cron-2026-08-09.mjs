export const fixtureDate = '2026-08-09';

export const realCronFixture = `《AI、科技日报》  
2026-08-09 早报

## 今日要闻（5条）

1. OpenAI 警告：下一代模型可能接近“关键网络安全能力”

发生了什么：OpenAI 称，内部评估显示其即将推出的 Astra 模型在智能体编程和网络安全能力上明显提升，已“不能排除”达到其 Preparedness Framework 中的 Critical cybersecurity 能力门槛。

为什么重要：这意味着前沿模型可能不只是辅助写代码，而是接近自动发现、开发并执行高风险漏洞利用的能力边界。

可能影响：AI 安全评估、模型发布节奏、政府测试、企业红队流程都会更严格。网络安全行业会更快进入“AI 防守对 AI 攻击”的阶段。

2. OpenAI 更新 ChatGPT：提升 GPT‑5.6 Sol，并扩大免费用户能力

发生了什么：OpenAI 宣布 Plus/Pro 用户的 GPT‑5.6 Sol 更强调事实可靠性、回答聚焦度，并加入“思考量”滑杆；免费用户默认模型将升级到 GPT‑5.6 Luna，并开放无限文本聊天和 Think 按钮。

为什么重要：这是一次明显的“能力下放”。高级模型不再只服务付费用户，免费层也开始获得更强推理入口。

可能影响：普通用户使用 AI 的门槛继续下降。知识问答、写作、轻量研究、学习辅导会更依赖通用聊天入口，而不是单独工具。

3. NVIDIA 支持的 Firebird 在亚美尼亚启动 CIS 区域最大 AI Factory

发生了什么：NVIDIA 博客称，Firebird 在亚美尼亚启动 CIS 区域最大 AI Factory，使用 NVIDIA 加速计算和 Dell 高性能 AI 基础设施。Firebird 计划到 2027 年底在亚美尼亚部署超过 7 万颗 NVIDIA Rubin 和 Blackwell GPU、300MW AI 基础设施容量。

为什么重要：AI 基础设施正在从美国、中国、中东等核心市场继续外溢到更多区域。算力主权和本地 AI 产业能力成为国家级竞争点。

可能影响：更多国家会把 AI Factory 视为基础设施投资。GPU、供电、制冷、数据中心建设仍是 AI 行业最硬的瓶颈。

4. 中国 6G 推进组成立星地融合工作组

发生了什么：新华网报道，在工信部信息通信发展司指导下，IMT-2030（6G）推进组星地融合 NTN 工作组在北京成立，方向包括卫星空口接入、卫星终端、星地融合网络、运维与应用技术。

为什么重要：6G 的核心不只是更快手机网速，而是地面网络和卫星通信融合，补齐偏远地区、海洋、航空、应急场景的连接能力。

可能影响：通信设备、卫星互联网、运营商、终端芯片和低空经济相关企业会进入更明确的标准协同阶段。

5. 中国 AI 视频大模型进入融资与商业化竞速

发生了什么：新华网报道，近三个月可灵 AI、生数科技、爱诗科技、演语科技披露新增融资合计接近 300 亿元人民币。报道还提到，可灵 AI 全球用户数突破 1 亿，AI 短剧、广告、电商内容等场景正在加速落地。

为什么重要：AI 视频正在从“演示效果”进入“商业闭环”验证期。资本关注点开始从模型参数转向收入、留存、版权和算力成本。

可能影响：短剧、广告、游戏、影视预演、社媒内容生产会最先被重构。但版权合规、用户留存和算力成本会决定谁能留下。

## 实战案例

1. 普通用户：ChatGPT 的“思考量滑杆 / Think 按钮”值得用起来

适合场景：写周报、做旅行计划、比价、整理资料、写代码、做重要决策。

用法建议：简单问题用普通模式。涉及日期、数字、来源、法律/医疗/财务边界、复杂计划时，主动开 Think 或提高思考量。

2. 内容团队：AI 视频已适合做“低成本试错”，但不要直接押全部产能

适合场景：短剧分镜、广告样片、直播切片、商品展示、脚本视觉化。

建议打法：先用 AI 视频做 10-20 条小样，测点击率和转化，再决定是否加预算。暂时不要把核心 IP、长剧集、强版权素材完全交给 AI 生成。
`;

export const expectedSignals = [
  { title: 'OpenAI 警告：下一代模型可能接近“关键网络安全能力”', sourceProjectionRuleMatches: ['openai-youth-safety-g7-2026'], enLabel: 'OpenAI / Astra / critical cyber capability evaluation', zhEvidence: '来源条目 1：OpenAI 警告：下一代模型可能接近“关键网络安全能力”', requiredTokens: ['Astra', 'Preparedness Framework', 'Critical cybersecurity'] },
  { title: 'OpenAI 更新 ChatGPT：提升 GPT‑5.6 Sol，并扩大免费用户能力', sourceProjectionRuleMatches: ['openai-chatgpt-model-picker-2026'], enLabel: 'OpenAI / GPT-5.6 / Sol-Luna ChatGPT update', zhEvidence: '来源条目 2：OpenAI 更新 ChatGPT：提升 GPT‑5.6 Sol，并扩大免费用户能力', requiredTokens: ['GPT‑5.6 Sol', 'GPT‑5.6 Luna', 'Think 按钮'] },
  { title: 'NVIDIA 支持的 Firebird 在亚美尼亚启动 CIS 区域最大 AI Factory', sourceProjectionRuleMatches: ['nvidia-ai-cloud-ecosystem'], enLabel: 'Armenia / Firebird / NVIDIA AI factory capacity', zhEvidence: '来源条目 3：NVIDIA 支持的 Firebird 在亚美尼亚启动 CIS 区域最大 AI Factory', requiredTokens: ['Firebird', '亚美尼亚', 'Rubin', 'Blackwell', '300MW'] },
  { title: '中国 6G 推进组成立星地融合工作组', sourceProjectionRuleMatches: ['china-mwc-shanghai-6g-mobile-ai-satellite-2026'], enLabel: 'China / IMT-2030 / satellite-terrestrial 6G NTN', zhEvidence: '来源条目 4：中国 6G 推进组成立星地融合工作组', requiredTokens: ['IMT-2030', '星地融合 NTN 工作组', '卫星空口接入'] },
  { title: '中国 AI 视频大模型进入融资与商业化竞速', sourceProjectionRuleMatches: ['china-ai-commercialization-roi-2026'], enLabel: 'China / AI video / financing and commercialization race', zhEvidence: '来源条目 5：中国 AI 视频大模型进入融资与商业化竞速', requiredTokens: ['可灵 AI', '生数科技', '爱诗科技', '演语科技', '300 亿元', '1 亿'] },
];

export const bannedFallbackPhrases = [
  'The source tracks model capability update',
  'The source tracks compute infrastructure',
  'giving the daily brief a named actor and deployment context',
  'buyers must check access control, infrastructure availability, operational risk',
  'today AI / technology daily not generated',
  '今日 AI / 科技日报暂未生成',
  '-…',
  '...',
];

export const requiredEnglishOutputs = [
  '### 1. OpenAI / Astra / critical cyber capability evaluation',
  '### 2. OpenAI / GPT-5.6 / Sol-Luna ChatGPT update',
  '### 3. Armenia / Firebird / NVIDIA AI factory capacity',
  '### 4. China / IMT-2030 / satellite-terrestrial 6G NTN',
  '### 5. China / AI video / financing and commercialization race',
  'Evidence item 3: Armenia / Firebird / NVIDIA AI factory capacity',
  'Evidence item 5: China / AI video / financing and commercialization race',
  '## Case-Level FAQ',
  '## Today’s Bottom Line',
  '## What to Watch Tomorrow',
  '## Evidence Matrix',
];

export const requiredZhOutputs = [
  'OpenAI 警告：下一代模型可能接近“关键网络安全能力”',
  'OpenAI 更新 ChatGPT：提升 GPT‑5.6 Sol，并扩大免费用户能力',
  'NVIDIA 支持的 Firebird 在亚美尼亚启动 CIS 区域最大 AI Factory',
  '中国 6G 推进组成立星地融合工作组',
  '中国 AI 视频大模型进入融资与商业化竞速',
  'ChatGPT 的“思考量滑杆 / Think 按钮”值得用起来',
  'AI 视频已适合做“低成本试错”',
  '## 今日结论',
  '## 明日跟踪点',
  '## 证据矩阵',
  '来源条目 3：NVIDIA 支持的 Firebird 在亚美尼亚启动 CIS 区域最大 AI Factory',
  '来源条目 5：中国 AI 视频大模型进入融资与商业化竞速',
];

export const caseLevelFaqSignals = [
  {
    label: 'ChatGPT Think button workflow triage',
    practicalCaseMatchTerms: ['Think 按钮', '思考量滑杆'],
    sourceStoryMatchTerms: ['GPT‑5.6 Sol', 'GPT‑5.6 Luna', 'Think 按钮'],
    requiredTerms: ['think-button escalation', 'free-tier triage', 'source check'],
    links: ['/en/blog/what-is-openclaw/', '/en/blog/openclaw-model-fallback-strategy/'],
  },
  {
    label: 'AI video low-cost creative testing',
    practicalCaseMatchTerms: ['AI 视频', '低成本试错'],
    sourceStoryMatchTerms: ['可灵 AI', 'AI video', 'commercialization race'],
    requiredTerms: ['rights review', 'retention check', 'compute-cost guardrail'],
    links: ['/en/blog/what-is-openclaw/', '/en/blog/openclaw-vps-cost-comparison-2026/'],
  },
  {
    label: 'Firebird regional AI factory capacity watch',
    practicalCaseMatchTerms: ['AI Factory', '算力'],
    sourceStoryMatchTerms: ['Firebird', '300MW', 'AI factory capacity'],
    requiredTerms: ['regional compute reservation', 'power availability', 'GPU delivery timing'],
    links: ['/en/blog/openclaw-vps-cost-comparison-2026/', '/en/blog/openclaw-vps-deployment-complete-guide/'],
  },
];

export const parserGuardrails = {
  story1RequiredDetailTokens: ['Astra', 'Preparedness Framework', 'Critical cybersecurity'],
  story1ForbiddenDetailTokens: ['GPT‑5.6 Sol', 'Firebird', 'IMT-2030', '可灵 AI'],
  story2RequiredDetailTokens: ['GPT‑5.6 Sol', 'GPT‑5.6 Luna', 'Think 按钮'],
  story2ForbiddenDetailTokens: ['Astra', 'Firebird', 'IMT-2030', '可灵 AI'],
  story3RequiredDetailTokens: ['Firebird', '亚美尼亚', '300MW'],
  story3ForbiddenDetailTokens: ['Astra', 'GPT‑5.6 Sol', 'IMT-2030', '可灵 AI'],
  story4RequiredDetailTokens: ['IMT-2030', '星地融合 NTN 工作组', '卫星空口接入'],
  story4ForbiddenDetailTokens: ['Astra', 'GPT‑5.6 Sol', 'Firebird', '可灵 AI'],
  story5RequiredDetailTokens: ['可灵 AI', '生数科技', '爱诗科技', '演语科技'],
  story5ForbiddenDetailTokens: ['Astra', 'GPT‑5.6 Sol', 'Firebird', 'IMT-2030'],
};
