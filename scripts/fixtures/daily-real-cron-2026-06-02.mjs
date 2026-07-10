export const fixtureDate = '2026-06-02';

export const realCronFixture = `《AI、科技日报》
2026-06-02 早间版

## 今日要闻（5条）

### 1. Anthropic 已向 SEC 秘密提交 IPO 草案

发生了什么：
Anthropic 6 月 1 日宣布，已向美国 SEC 秘密提交 Form S-1 草案，为潜在 IPO 做准备。发行股数和价格未定。

为什么重要：
这意味着头部 AI 公司开始进入资本市场退出/融资新阶段。

可能影响：
AI 公司估值、云算力采购、模型竞赛会更受公开市场约束；投资者会更关注收入、亏损、算力成本和监管风险。

来源：
https://www.anthropic.com/news/confidential-draft-registration-statement

---

### 2. OpenAI 模型正式进入 Amazon Bedrock

发生了什么：
AWS 宣布 GPT-5.5、GPT-5.4 和 Codex 已在 Amazon Bedrock 上正式可用，价格匹配 OpenAI 一方价格，企业可用 AWS 身份、网络隔离、审计和加密体系接入。

为什么重要：
OpenAI 不再只靠自家 API/产品触达企业，开始深度进入主流云平台采购体系。

可能影响：
企业选型会更偏“多模型 + 云治理”；AWS、OpenAI、Anthropic、Google、Meta 的模型分发竞争会更直接。

来源：
https://aws.amazon.com/bedrock/

---

### 3. NVIDIA 扩大全球 AI Cloud 生态

发生了什么：
NVIDIA 5 月 31 日发布 AI Cloud 生态进展，称合作伙伴正在六大洲扩建 AI factory/AI cloud，用于训练、推理、智能体、物理 AI 和主权 AI。

为什么重要：
AI 竞争正在从“谁的模型强”转向“谁能稳定、低成本地产生 token”。

可能影响：
算力基础设施、区域 AI 云、主权 AI 会继续升温；企业未来买的可能不是 GPU，而是更接近“AI 产能”。

来源：
https://blogs.nvidia.com/blog/ai-cloud-ecosystem/

---

### 4. ChatGPT 增加求职与简历能力

发生了什么：
OpenAI 版本说明显示，ChatGPT 可帮助美国用户查找实时职位/自由职业机会，并支持全球英文简历格式化与下载。

为什么重要：
AI 正从通用问答进入更具体的生活/职业流程。

可能影响：
普通用户会更常把 AI 用在“找工作、改简历、匹配岗位”这类高频决策；招聘平台和职业服务工具会被重新分流。

来源：
https://help.openai.com/en/articles/6825453-chatgpt-release-notes

---

### 5. 中国 AI 产业报告称企业数超 6000 家、核心规模超 1.2 万亿元【待确认】

发生了什么：
二级来源称，2026 世界智能产业博览会期间发布《新一代人工智能科技产业发展报告2026》，提到中国 AI 企业超 6000 家、核心产业规模突破 1.2 万亿元。

为什么重要：
如果官方报告可核实，这会是观察中国 AI 产业规模、区域集群和具身智能落地的重要数据点。

可能影响：
政策、产业园区、算力、机器人、智能制造方向可能继续受关注。

说明：
本次未抓到官方原始报告链接，仅有 L3 来源，按规则标记为待确认。

---

## 实战案例

### 案例 1：企业接入 OpenAI，不一定再走单一 API
AWS Bedrock 已支持 OpenAI 模型和 Codex。
对企业的实际意义：
- 可以把 OpenAI、Anthropic、Meta、Mistral 等模型放在同一云治理体系下比较
- 权限、日志、加密、VPC、采购承诺更容易统一
- AI 应用团队会更像“模型调度 + 成本治理 + 安全治理”团队

## 今日结论

- 最值得关注：企业级 AI 正在加速进入核心业务流程。
- 给普通用户建议：优先选择权限透明、可断开授权、有来源标注的 AI 产品。
- 给团队建议：先选一个高频流程做试点，并把权限、审计、成本和人工复核写进上线标准。

## 证据矩阵

- 来源条目 1：Anthropic 已向 SEC 秘密提交 IPO 草案 —— Anthropic 6 月 1 日宣布，已向美国 SEC 秘密提交 Form S-1 草案，为潜在 IPO 做准备。发行股数和价格未定。
- 来源条目 2：OpenAI 模型正式进入 Amazon Bedrock —— AWS 宣布 GPT-5.5、GPT-5.4 和 Codex 已在 Amazon Bedrock 上正式可用，价格匹配 OpenAI 一方价格，企业可用 AWS 身份、网络隔离、审计和加密体系接入。
- 来源条目 3：NVIDIA 扩大全球 AI Cloud 生态 —— NVIDIA 5 月 31 日发布 AI Cloud 生态进展，称合作伙伴正在六大洲扩建 AI factory/AI cloud，用于训练、推理、智能体、物理 AI 和主权 AI。
- 来源条目 4：ChatGPT 增加求职与简历能力 —— OpenAI 版本说明显示，ChatGPT 可帮助美国用户查找实时职位/自由职业机会，并支持全球英文简历格式化与下载。
- 来源条目 5：中国 AI 产业报告称企业数超 6000 家、核心规模超 1.2 万亿元【待确认】 —— 二级来源称，2026 世界智能产业博览会期间发布《新一代人工智能科技产业发展报告2026》，提到中国 AI 企业超 6000 家、核心产业规模突破 1.2 万亿元。
`;

export const expectedSignals = [
  {
    title: 'Anthropic 已向 SEC 秘密提交 IPO 草案',
    sourceProjectionRuleMatches: ['anthropic-sec-ipo-s1'],
    enLabel: 'US / Anthropic / SEC / compute infrastructure',
    zhEvidence: '来源条目 1：Anthropic 已向 SEC 秘密提交 IPO 草案',
    requiredTokens: ['Anthropic', 'SEC', 'Form S-1'],
  },
  {
    title: 'OpenAI 模型正式进入 Amazon Bedrock',
    sourceProjectionRuleMatches: ['openai-amazon-bedrock-models'],
    enLabel: 'OpenAI / Amazon / Bedrock / model capability update',
    zhEvidence: '来源条目 2：OpenAI 模型正式进入 Amazon Bedrock',
    requiredTokens: ['OpenAI', 'Amazon Bedrock', 'GPT-5.5'],
  },
  {
    title: 'NVIDIA 扩大全球 AI Cloud 生态',
    sourceProjectionRuleMatches: ['nvidia-ai-cloud-ecosystem'],
    enLabel: 'NVIDIA / Cloud / GPU / compute infrastructure',
    zhEvidence: '来源条目 3：NVIDIA 扩大全球 AI Cloud 生态',
    requiredTokens: ['NVIDIA', 'AI Cloud', '六大洲'],
  },
  {
    title: 'ChatGPT 增加求职与简历能力',
    sourceProjectionRuleMatches: ['chatgpt-jobs-resume-tools'],
    enLabel: 'US / ChatGPT / OpenAI / model release management',
    zhEvidence: '来源条目 4：ChatGPT 增加求职与简历能力',
    requiredTokens: ['ChatGPT', 'jobs', 'resume'],
  },
  {
    title: '中国 AI 产业报告称企业数超 6000 家、核心规模超 1.2 万亿元【待确认】',
    sourceProjectionRuleMatches: ['china-ai-industry-report-l3'],
    enLabel: 'China / L3 / compute infrastructure / robotics deployment',
    zhEvidence: '来源条目 5：中国 AI 产业报告称企业数超 6000 家、核心规模超 1.2 万亿元【待确认】',
    requiredTokens: ['China', '6,000', '1.2 trillion yuan'],
  },
];

export const bannedFallbackPhrases = [
  'Source 1 reports a compute infrastructure',
  'Source 2 reports a model capability update',
  'Source 3 reports a compute infrastructure',
  'Source 4 reports a model release management',
  'Source 5 reports a compute infrastructure',
  'This matters because US, Anthropic, SEC, IPO links',
  'The likely impact is a more specific evaluation path for US, Anthropic, SEC, IPO',
  'adoption timing, infrastructure capacity, compliance exposure, or enterprise workflow readiness',
  'migration timing, partner dependency, governance review, cost exposure, and measurable rollout criteria',
  'today AI / technology daily not generated',
  '今日 AI / 科技日报暂未生成',
  '-…',
  '...',
];

export const requiredEnglishOutputs = [
  '### 1. US / Anthropic / SEC / compute infrastructure',
  '### 2. OpenAI / Amazon / Bedrock / model capability update',
  '### 3. NVIDIA / Cloud / GPU / compute infrastructure',
  '### 4. US / ChatGPT / OpenAI / model release management',
  '### 5. China / L3 / compute infrastructure / robotics deployment',
  'Anthropic said on June 1 that it confidentially submitted a draft Form S-1 registration statement to the US SEC',
  'AWS made GPT-5.5, GPT-5.4, and Codex available in Amazon Bedrock',
  'NVIDIA said partners are expanding AI factories and AI clouds across six continents',
  'ChatGPT can help US users find real-time jobs and freelance opportunities',
  'A secondary L3 source says China has more than 6,000 AI companies',
  'Evidence item 5: China / L3 / compute infrastructure / robotics deployment',
  '## Today’s Bottom Line',
  '## What to Watch Tomorrow',
  '## Evidence Matrix',
];

export const requiredZhOutputs = [
  'Anthropic 已向 SEC 秘密提交 IPO 草案',
  'OpenAI 模型正式进入 Amazon Bedrock',
  'NVIDIA 扩大全球 AI Cloud 生态',
  'ChatGPT 增加求职与简历能力',
  '中国 AI 产业报告称企业数超 6000 家',
  '## 今日结论',
  '## 明日跟踪点',
  '## 证据矩阵',
  '来源条目 1：Anthropic 已向 SEC 秘密提交 IPO 草案',
  '来源条目 5：中国 AI 产业报告称企业数超 6000 家',
];

export const parserGuardrails = {
  story5RequiredEnLabelTokens: ['China', 'L3'],
  story5ForbiddenEnLabelTokens: ['OpenAI', 'Amazon', 'Bedrock', 'ChatGPT'],
  story5RequiredDetailTokens: ['6000 家', '1.2 万亿元', '待确认'],
  story5ForbiddenDetailTokens: ['AWS Bedrock 已支持 OpenAI', '权限、日志、加密', 'OpenAI、Anthropic、Meta'],
  story5ForbiddenEvidenceTokens: ['AWS Bedrock', 'OpenAI models', 'ChatGPT jobs'],
  story5ForbiddenZhEvidenceTokens: ['AWS Bedrock 已支持 OpenAI', '权限、日志、加密'],
};
