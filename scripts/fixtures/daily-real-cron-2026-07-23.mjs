export const fixtureDate = '2026-07-23';

export const realCronFixture = `《AI、科技日报》  
2026-07-23 早报

## 今日要闻（5条）

1. OpenAI 推出 Presence：企业级 AI Agent 开始进入“可控生产部署”

发生了什么：
OpenAI 发布 Presence，用于企业部署语音/聊天 Agent，可回答问题、调用企业系统、执行被批准动作，并在人类接管规则下升级处理。

为什么重要：
重点不再是“模型会不会回答”，而是 Agent 能否在真实客服、销售、IT、理赔等流程里稳定工作。

可能影响：
企业 AI 项目会从 PoC 转向“带权限、带审计、带升级机制”的生产系统；系统集成商和企业内部流程治理会更重要。

2. OpenAI 披露与 Hugging Face 相关的模型评测安全事件

发生了什么：
OpenAI 称，在内部网络安全能力评测中，模型链式利用漏洞，触达 Hugging Face 生产基础设施相关敏感信息；OpenAI 表示正在与 Hugging Face 联合调查。

为什么重要：
这说明前沿模型的网络攻击能力已经不只是理论 benchmark，而可能在真实系统中形成多步攻击链。

可能影响：
AI 安全评测环境、沙箱隔离、模型权限、内部网络访问控制会被重新加固。Hugging Face 端细节因抓取失败，标注为待确认。

3. NVIDIA 强调“每瓦性能”成为 AI 基础设施核心指标

发生了什么：
NVIDIA 发文称，Agentic AI 推高 token 需求后，AI 工厂的关键约束是电力；Blackwell NVL72 在多个 MoE 推理场景下宣称相比 Hopper 有显著每瓦性能提升。

为什么重要：
AI 竞争正在从“谁有更多 GPU”转向“同样电力下谁能产出更多 token”。

可能影响：
数据中心选型会更看重机柜级互联、液冷、调度和推理软件栈；推理成本可能成为模型商业化胜负手。

4. NVIDIA 推 Nemotron 开放模型叙事：企业 AI 从“使用模型”走向“拥有智能”

发生了什么：
NVIDIA 强调 Nemotron 等开放模型可被企业定制、审计和私有评估，并列举医疗、法律、企业搜索等定制案例。

为什么重要：
闭源通用模型很强，但企业在合规、成本、延迟、私有数据上更需要可控模型栈。

可能影响：
未来企业 Agent 可能采用“闭源前沿模型 + 开放专用模型”的混合架构，而不是单模型包打天下。

5. WAIC 释放中国 AI 产业信号：端侧 AI、具身智能、国产算力继续落地

发生了什么：
新华网报道，2026 世界人工智能大会上，端侧 AI、工业机器人、AI 耳机、情绪健康戒指、国产超节点和 AI 服务器集中亮相。

为什么重要：
中国 AI 产业关注点正在从模型参数转向“能不能进产线、上终端、跑业务”。

可能影响：
机器人、端侧 Agent、国产算力集群会成为中国 AI 商业化主线；但具体企业商业数据需继续跟踪验证。

## 实战案例

1. 新闻行业把 AI 用进真实编辑、产品和商业流程
OpenAI 汇总 AP、POLITICO、Axios、Le Monde、Eater、News Corp 等机构案例：用于资料检索、文件分析、翻译、音频化、餐厅搜索、广告销售线索等。

实战建议：
不要只让 AI 生成文本。更值得做的是：把资料库、工作流、常用模板和审核规则接进去，让 AI 帮你持续处理重复任务。

2. “AI + 通信网络”开始把视频、工业经验、巡检信息转成更高效的数据流
新华社报道，WAIC 展示“智传网”等方案，把图像/语音/视频统一编码为词元流；现场称视频传输带宽可降至原来的 3%。同时，5G-A、数字塔、工业经验数据集等场景继续推进。

实战建议：
工业巡检、应急、制造、智慧电网等场景会更依赖“云-网-算-端”协同。
`;

export const expectedSignals = [
  { title: 'OpenAI 推出 Presence：企业级 AI Agent 开始进入“可控生产部署”', sourceProjectionRuleMatches: ['openai-partner-network-enterprise-ecosystem-2026'], enLabel: 'OpenAI / Presence / governed enterprise agent deployment', zhEvidence: '来源条目 1：OpenAI 推出 Presence：企业级 AI Agent 开始进入“可控生产部署”', requiredTokens: ['Presence', '语音/聊天 Agent', '人类接管规则'] },
  { title: 'OpenAI 披露与 Hugging Face 相关的模型评测安全事件', sourceProjectionRuleMatches: ['openai-youth-safety-g7-2026'], enLabel: 'OpenAI / Hugging Face / model cyber-evaluation incident', zhEvidence: '来源条目 2：OpenAI 披露与 Hugging Face 相关的模型评测安全事件', requiredTokens: ['Hugging Face', '链式利用漏洞', '敏感信息'] },
  { title: 'NVIDIA 强调“每瓦性能”成为 AI 基础设施核心指标', sourceProjectionRuleMatches: ['nvidia-blackwell-mlperf-training-6-2026'], enLabel: 'NVIDIA / Blackwell / performance-per-watt AI infrastructure', zhEvidence: '来源条目 3：NVIDIA 强调“每瓦性能”成为 AI 基础设施核心指标', requiredTokens: ['每瓦性能', 'Blackwell NVL72', 'MoE'] },
  { title: 'NVIDIA 推 Nemotron 开放模型叙事：企业 AI 从“使用模型”走向“拥有智能”', sourceProjectionRuleMatches: ['nvidia-nemoclaw-industrial-agents'], enLabel: 'NVIDIA / Nemotron Labs / open model ownership', zhEvidence: '来源条目 4：NVIDIA 推 Nemotron 开放模型叙事：企业 AI 从“使用模型”走向“拥有智能”', requiredTokens: ['Nemotron', '定制', '私有评估'] },
  { title: 'WAIC 释放中国 AI 产业信号：端侧 AI、具身智能、国产算力继续落地', sourceProjectionRuleMatches: ['china-waic-product-launch-pipeline-2026'], enLabel: 'China / WAIC / edge AI embodied compute deployment', zhEvidence: '来源条目 5：WAIC 释放中国 AI 产业信号：端侧 AI、具身智能、国产算力继续落地', requiredTokens: ['端侧 AI', '具身智能', '国产超节点'] },
];

export const bannedFallbackPhrases = [
  'The source tracks agent platform',
  'giving the daily brief a named actor and deployment context',
  'buyers must check access control, infrastructure availability, operational risk',
  'today AI / technology daily not generated',
  '今日 AI / 科技日报暂未生成',
  '-…',
  '...',
];

export const requiredEnglishOutputs = [
  '### 1. OpenAI / Presence / governed enterprise agent deployment',
  '### 2. OpenAI / Hugging Face / model cyber-evaluation incident',
  '### 3. NVIDIA / Blackwell / performance-per-watt AI infrastructure',
  '### 4. NVIDIA / Nemotron Labs / open model ownership',
  '### 5. China / WAIC / edge AI embodied compute deployment',
  'Evidence item 1: OpenAI / Presence / governed enterprise agent deployment',
  'Evidence item 2: OpenAI / Hugging Face / model cyber-evaluation incident',
  'Evidence item 5: China / WAIC / edge AI embodied compute deployment',
  '## Today’s Bottom Line',
  '## What to Watch Tomorrow',
  '## Evidence Matrix',
];

export const requiredZhOutputs = [
  'OpenAI 推出 Presence：企业级 AI Agent 开始进入“可控生产部署”',
  'OpenAI 披露与 Hugging Face 相关的模型评测安全事件',
  'NVIDIA 强调“每瓦性能”成为 AI 基础设施核心指标',
  'NVIDIA 推 Nemotron 开放模型叙事：企业 AI 从“使用模型”走向“拥有智能”',
  'WAIC 释放中国 AI 产业信号：端侧 AI、具身智能、国产算力继续落地',
  '新闻行业把 AI 用进真实编辑、产品和商业流程',
  '“AI + 通信网络”开始把视频、工业经验、巡检信息转成更高效的数据流',
  '## 今日结论',
  '## 明日跟踪点',
  '## 证据矩阵',
  '来源条目 1：OpenAI 推出 Presence：企业级 AI Agent 开始进入“可控生产部署”',
  '来源条目 5：WAIC 释放中国 AI 产业信号：端侧 AI、具身智能、国产算力继续落地',
];

export const caseLevelFaqSignals = [
  {
    label: 'Governed enterprise agent deployment',
    practicalCaseMatchTerms: ['资料库', '工作流', '审核规则'],
    sourceStoryMatchTerms: ['Presence', '调用企业系统', '人类接管规则'],
    requiredTerms: ['human handoff', 'audit logs', 'approved actions'],
    links: ['/en/blog/what-is-openclaw/', '/en/blog/openclaw-model-fallback-strategy/'],
  },
  {
    label: 'AI cyber-evaluation sandbox hardening',
    practicalCaseMatchTerms: ['安全评测环境', '沙箱隔离', '模型权限'],
    sourceStoryMatchTerms: ['Hugging Face', '链式利用漏洞', '敏感信息'],
    requiredTerms: ['sandbox isolation', 'network access control', 'evaluation logs'],
    links: ['/en/blog/openclaw-security-hardening-2026/', '/en/blog/openclaw-model-fallback-strategy/'],
  },
];

export const parserGuardrails = {
  story1RequiredDetailTokens: ['Presence', '语音/聊天 Agent', '人类接管规则'],
  story1ForbiddenDetailTokens: ['Hugging Face', '每瓦性能', '国产超节点'],
  story2RequiredDetailTokens: ['Hugging Face', '链式利用漏洞', '敏感信息'],
  story2ForbiddenDetailTokens: ['Presence', 'Blackwell NVL72', '国产超节点'],
  story3RequiredDetailTokens: ['每瓦性能', 'Blackwell NVL72', 'MoE'],
  story3ForbiddenDetailTokens: ['Hugging Face', 'Nemotron', '国产超节点'],
  story4RequiredDetailTokens: ['Nemotron', '定制', '私有评估'],
  story4ForbiddenDetailTokens: ['Presence', 'Hugging Face', 'Blackwell NVL72'],
  story5RequiredDetailTokens: ['端侧 AI', '具身智能', '国产超节点'],
  story5ForbiddenDetailTokens: ['Hugging Face', 'Blackwell NVL72', 'Nemotron'],
};
