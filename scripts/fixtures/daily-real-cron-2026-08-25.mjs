export const fixtureDate = '2026-08-25';

export const realCronFixture = `《AI、科技日报》
2026-08-25 早报

## 今日要闻（5条）

1. NVIDIA 把 AI Agent 算力竞争推向“每瓦产出”
发生了什么：NVIDIA 称 Vera Rubin NVL72 在真实 agentic coding 工作负载上，相比 GB300 NVL72 可实现最高 30 倍每兆瓦吞吐、最高 35 倍 token 成本下降，并把 AI 工厂竞争定义为每瓦性能和每任务成本竞争。
为什么重要：AI Agent 的长上下文、工具调用和子代理会放大 token 消耗，数据中心瓶颈正从 GPU 数量转向固定电力下的有效 agent 吞吐。
可能影响：云厂商和模型服务商会更重视推理能效、机柜功率、网络与缓存设计，AI 服务定价也会更受每瓦性能和 token 成本影响。
状态：已确认，来自当日内容建设摘要的 NVIDIA Vera Rubin / GB300 结构化条目。

2. NVIDIA 推 NVLink Fusion 争夺 AI 工厂底座
发生了什么：NVIDIA 介绍 NVLink Fusion 如何把定制 XPU 接入 NVIDIA AI 基础设施，强调 72-XPU scale-up、低延迟、高包处理能力和系统级网络互联。
为什么重要：大厂自研芯片不等于能独立建成 AI 工厂，网络、机柜、软件栈、供应链和运维能力共同决定可用吞吐。
可能影响：自研芯片厂商可能继续依赖 NVIDIA 生态做系统级拼装，AI 基础设施竞争会从单卡性能转向整厂效率和互操作性。
状态：已确认，NVIDIA NVLink Fusion 产品与架构信号。

3. Thomson Reuters 发布自研专业大模型 Thomson
发生了什么：Thomson Reuters 宣布推出首个自研大语言模型 Thomson，称其基于开源基础模型与自有法律、税务、新闻内容训练，投入约 4000 万美元，并面向 CoCounsel 等专业工作流。
为什么重要：这是“行业数据 + 专业工作流 + 可控模型”的典型路线，企业模型竞争不再只围绕通用参数规模。
可能影响：法律、税务、审计和新闻等高风险场景会更重视专业数据、专家评估、可审计输出和工作流嵌入。
状态：已确认，Thomson Reuters 专业模型发布信号。

4. 阿里 Wan3.0 视频模型进入新一轮产品化
发生了什么：阿里云官网列出 Wan3.0-Video，描述其支持四模态参考、编辑、复刻和驱动，可生成 30 秒视频，并通过云平台、千问和万相等入口推进产品化。
为什么重要：中国视频生成模型正在从能力演示走向平台分发、工作流集成和商业使用验证。
可能影响：营销、电商、短视频和教育内容制作会更快采用 AI 视频，但版权、素材一致性、审核和推理成本仍是关键门槛。
状态：已确认，阿里云产品页与多源报道交叉验证。

5. 中国 AI 智能消费进入财报和真实场景兑现
发生了什么：新华网报道 AI 手机、AI 眼镜、可穿戴、外骨骼和机器人等智能消费在上市公司半年报与消费数据中表现明显；国家统计局数据显示 1-7 月规模以上可穿戴智能设备零售额增长超过 1 倍。
为什么重要：AI 正从模型层进入端侧硬件、零售、养老、医疗、导购和消费机器人等可量化场景。
可能影响：用户会更早接触端侧 AI 与智能硬件，产业机会也会从算力上游扩散到终端、渠道、服务和售后体系。
状态：已确认，新华网与国家统计局数据口径。

## 实战案例

1. Thomson Reuters 专业模型评估清单
选择一个法律检索、税务核验或审计摘要流程，记录数据来源、专家评估、引用可追溯性、权限、错误成本和人工复核，再决定是否接入核心业务。

2. Wan3.0 商用视频工作流试点
从一个低风险营销素材开始，固定参考素材、镜头要求、生成时长、版权审核、人工编辑和成本指标，比较 AI 视频与传统制作的周期和转化表现。

3. 智能消费硬件场景验证
对 AI 眼镜、可穿戴或外骨骼产品，优先验证离线能力、隐私授权、续航、准确率、售后和真实使用频率，不只看发布演示。
`;

export const expectedSignals = [
  { title: 'NVIDIA 把 AI Agent 算力竞争推向“每瓦产出”', sourceProjectionRuleMatches: ['nvidia-blackwell-mlperf-training-6-2026'], enLabel: 'NVIDIA / Blackwell / performance-per-watt AI infrastructure', zhEvidence: '来源条目 1：NVIDIA 把 AI Agent 算力竞争推向“每瓦产出”', requiredTokens: ['Vera Rubin NVL72', 'GB300 NVL72', '30 倍', '35 倍'] },
  { title: 'NVIDIA 推 NVLink Fusion 争夺 AI 工厂底座', sourceProjectionRuleMatches: ['nvidia-ai-cloud-ecosystem'], enLabel: 'NVIDIA / NVLink Fusion / AI factory interconnect', zhEvidence: '来源条目 2：NVIDIA 推 NVLink Fusion 争夺 AI 工厂底座', requiredTokens: ['NVLink Fusion', '定制 XPU', '72-XPU', '低延迟'] },
  { title: 'Thomson Reuters 发布自研专业大模型 Thomson', sourceProjectionRuleMatches: ['nvidia-nemoclaw-industrial-agents'], enLabel: 'Thomson Reuters / Thomson / professional domain model', zhEvidence: '来源条目 3：Thomson Reuters 发布自研专业大模型 Thomson', requiredTokens: ['Thomson Reuters', 'Thomson', '4000 万美元', 'CoCounsel'] },
  { title: '阿里 Wan3.0 视频模型进入新一轮产品化', sourceProjectionRuleMatches: ['china-ai-commercialization-roi-2026'], enLabel: 'Alibaba / Wan3.0 / commercial video generation', zhEvidence: '来源条目 4：阿里 Wan3.0 视频模型进入新一轮产品化', requiredTokens: ['Wan3.0-Video', '四模态', '30 秒', '万相'] },
  { title: '中国 AI 智能消费进入财报和真实场景兑现', sourceProjectionRuleMatches: ['xinhua-shenzhen-robotics-consumer-deployment-2026'], enLabel: 'Xinhua / China / AI smart consumer adoption', zhEvidence: '来源条目 5：中国 AI 智能消费进入财报和真实场景兑现', requiredTokens: ['AI 眼镜', '可穿戴', '外骨骼', '增长超过 1 倍'] },
];

export const bannedFallbackPhrases = [
  'The source tracks AI chip supply',
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
  '### 1. NVIDIA / Blackwell / performance-per-watt AI infrastructure',
  '### 2. NVIDIA / NVLink Fusion / AI factory interconnect',
  '### 3. Thomson Reuters / Thomson / professional domain model',
  '### 4. Alibaba / Wan3.0 / commercial video generation',
  '### 5. Xinhua / China / AI smart consumer adoption',
  'Evidence item 1: NVIDIA / Blackwell / performance-per-watt AI infrastructure',
  'Evidence item 5: Xinhua / China / AI smart consumer adoption',
  '## Case-Level FAQ',
  '## Today’s Bottom Line',
  '## What to Watch Tomorrow',
  '## Evidence Matrix',
];

export const requiredZhOutputs = [
  'NVIDIA 把 AI Agent 算力竞争推向“每瓦产出”',
  'NVIDIA 推 NVLink Fusion 争夺 AI 工厂底座',
  'Thomson Reuters 发布自研专业大模型 Thomson',
  '阿里 Wan3.0 视频模型进入新一轮产品化',
  '中国 AI 智能消费进入财报和真实场景兑现',
  'Thomson Reuters 专业模型评估清单',
  'Wan3.0 商用视频工作流试点',
  '智能消费硬件场景验证',
  '## 今日结论',
  '## 明日跟踪点',
  '## 证据矩阵',
  '来源条目 1：NVIDIA 把 AI Agent 算力竞争推向“每瓦产出”',
  '来源条目 5：中国 AI 智能消费进入财报和真实场景兑现',
];

export const caseLevelFaqSignals = [
  { label: 'NVIDIA_PERFORMANCE_PER_WATT', sourceStoryMatchTerms: ['Vera Rubin NVL72', 'GB300 NVL72'], requiredTerms: ['performance per watt', 'agentic coding', 'power', 'token cost', 'throughput'], links: ['/en/blog/openclaw-model-fallback-strategy/', '/en/blog/openclaw-vps-deployment-complete-guide/'] },
  { label: 'NVIDIA_NVLINK_FUSION', sourceStoryMatchTerms: ['NVLink Fusion', '72-XPU'], requiredTerms: ['NVLink Fusion', 'XPU', 'interconnect', 'latency', 'AI factory'], links: ['/en/blog/openclaw-vps-deployment-complete-guide/', '/en/blog/openclaw-model-fallback-strategy/'] },
  { label: 'THOMSON_PROFESSIONAL_MODEL', sourceStoryMatchTerms: ['Thomson Reuters', 'CoCounsel'], requiredTerms: ['professional model', 'legal', 'tax', 'audit', 'domain data'], links: ['/en/blog/what-is-openclaw/', '/en/blog/openclaw-security-hardening-2026/'] },
  { label: 'ALIBABA_WAN3_VIDEO', sourceStoryMatchTerms: ['Wan3.0-Video', '30 秒'], requiredTerms: ['video generation', 'multimodal', 'copyright', 'review', 'commercial use'], links: ['/en/blog/what-is-openclaw/', '/en/blog/openclaw-model-fallback-strategy/'] },
  { label: 'CHINA_SMART_CONSUMER_ADOPTION', sourceStoryMatchTerms: ['AI 眼镜', '增长超过 1 倍'], requiredTerms: ['wearables', 'edge AI', 'privacy', 'offline', 'adoption'], links: ['/en/blog/what-is-openclaw/', '/en/blog/openclaw-vps-deployment-complete-guide/'] },
  { label: 'THOMSON_DOMAIN_MODEL_EVAL', practicalCaseMatchTerms: ['Thomson Reuters 专业模型评估清单'], requiredTerms: ['sources', 'expert evaluation', 'citations', 'permissions', 'human review'], links: ['/en/blog/openclaw-security-hardening-2026/', '/en/blog/openclaw-model-fallback-strategy/'] },
  { label: 'WAN3_COMMERCIAL_VIDEO_PILOT', practicalCaseMatchTerms: ['Wan3.0 商用视频工作流试点'], requiredTerms: ['reference assets', 'copyright', 'human editing', 'cost', 'conversion'], links: ['/en/blog/what-is-openclaw/', '/en/blog/openclaw-model-fallback-strategy/'] },
  { label: 'SMART_HARDWARE_SCENARIO_TEST', practicalCaseMatchTerms: ['智能消费硬件场景验证'], requiredTerms: ['offline', 'privacy', 'battery', 'accuracy', 'after-sales'], links: ['/en/blog/what-is-openclaw/', '/en/blog/openclaw-security-hardening-2026/'] },
];

export const parserGuardrails = {
  story1RequiredDetailTokens: ['Vera Rubin NVL72', 'GB300 NVL72', '30 倍', '35 倍'],
  story1ForbiddenDetailTokens: ['NVLink Fusion', 'Thomson Reuters', 'Wan3.0-Video', 'AI 眼镜'],
  story2RequiredDetailTokens: ['NVLink Fusion', '定制 XPU', '72-XPU', '低延迟'],
  story2ForbiddenDetailTokens: ['GB300 NVL72', 'Thomson Reuters', 'Wan3.0-Video', 'AI 眼镜'],
  story3RequiredDetailTokens: ['Thomson Reuters', 'Thomson', '4000 万美元', 'CoCounsel'],
  story3ForbiddenDetailTokens: ['NVLink Fusion', 'Vera Rubin NVL72', 'Wan3.0-Video', 'AI 眼镜'],
  story4RequiredDetailTokens: ['Wan3.0-Video', '四模态', '30 秒', '万相'],
  story4ForbiddenDetailTokens: ['NVLink Fusion', 'Thomson Reuters', 'Vera Rubin NVL72', 'AI 眼镜'],
  story5RequiredDetailTokens: ['AI 眼镜', '可穿戴', '外骨骼', '增长超过 1 倍'],
  story5ForbiddenDetailTokens: ['NVLink Fusion', 'Thomson Reuters', 'Wan3.0-Video', 'Vera Rubin NVL72'],
  story5ForbiddenEvidenceTokens: ['NVLink Fusion', 'Thomson Reuters', 'Wan3.0-Video', 'Vera Rubin NVL72'],
  story5ForbiddenZhEvidenceTokens: ['NVLink Fusion', 'Thomson Reuters', 'Wan3.0-Video', 'Vera Rubin NVL72'],
};
