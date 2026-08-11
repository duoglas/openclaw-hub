export const fixtureDate = '2026-08-11';

export const realCronFixture = `《AI、科技日报》  
2026-08-11 07:30｜截至发稿可核验信息

## 今日要闻（5条）

1. OpenAI 将给 ChatGPT Business 推出 Premium seats

发生了什么：  
OpenAI 宣布 ChatGPT Business 将新增 Premium 席位，价格为月付 125 美元/人，年付 100 美元/人；相比 Standard 席位，提供 5 倍用量，并取消 5 小时使用限制。

为什么重要：  
企业 AI 订阅开始从“统一套餐”转向“高频用户加价”。重度用户、开发者、数据分析岗位会更需要按岗位 ROI 分配模型访问能力。

可能影响：  
团队内部会更精细地分配 AI 预算；普通办公使用 Standard，高频写代码、分析数据、做运营方案的员工优先升级 Premium。

来源：OpenAI 官方说明 / ChatGPT Business 更新
https://openai.com/business/

---

2. OpenAI 扩大 Daybreak Cyber Partner 计划

发生了什么：  
OpenAI 宣布扩大 Daybreak Cyber Partner 计划，把前沿网络安全模型接入 Accenture、IBM、CrowdStrike、Cisco、Cloudflare 等安全服务和产品伙伴体系。

为什么重要：  
AI 安全能力不再只停留在模型评测，而是进入真实企业防御流程。漏洞发现、验证、修复会更自动化，但高风险能力需要身份验证、范围控制、日志和人工监督。

可能影响：  
企业安全团队可以先在授权资产、漏洞复核、告警解释和修复建议等低风险环节试点，同时把红队、渗透测试和自动化修复放进强审计流程。

来源：OpenAI Daybreak Cyber Partner Program
https://openai.com/

---

3. NVIDIA 支持 Firebird 在亚美尼亚建设大型 AI Factory

发生了什么：  
NVIDIA 官方博客称，Firebird 在亚美尼亚启动 CIS 区域最大 AI Factory，计划到 2027 年底部署超过 70,000 块 NVIDIA Rubin 和 Blackwell GPU、300MW AI 基础设施容量。

为什么重要：  
AI 算力建设正在从美国/西欧/中国等核心市场，外溢到更多“主权算力”和区域枢纽。能源、电力、冷却和服务器供应链继续成为 AI 产业约束。

可能影响：  
更多国家会把 AI 算力视作基础设施；云买家、模型公司和区域政策团队需要跟踪 Firebird 产能、GPU 交付、电力可用性和数据驻留要求。

来源：NVIDIA 官方博客  
https://blogs.nvidia.com/blog/firebird-ai-factory-armenia-blackwell-rubin-dsx/

---

4. 国产大模型在全球调用榜单上升（待确认）

发生了什么：  
新华网报道，OpenRouter 最新周度 Token 调用榜前五均为国产大模型，DeepSeek V4 Flash 位居榜首，小米 MiMo V2.5、腾讯 Hy3、DeepSeek V4 Pro、智谱 GLM5.2 跟随。

为什么重要：  
如果 OpenRouter 原始榜单可进一步确认，这说明低成本、高吞吐 API 正在改变全球开发者选型，中国模型厂商会从“模型能力竞争”进一步转向价格、稳定性、接口生态和合规交付竞争。

可能影响：  
开发者平台可以先核验 OpenRouter 原始榜单，再比较中国模型 API 的价格、吞吐、延迟、稳定性、接口兼容性和合规交付能力。

来源：新华网 / OpenRouter 排名线索  
https://www.news.cn/tech/

---

5. 中国人形机器人企业新增继续增长（待确认）

发生了什么：  
新华网报道称，市场监管总局数据显示，2026 年上半年人形机器人领域新设企业 11.6 万户，同比增长 9.5%。本次未抓到市场监管总局原始页面，按规则标为待确认。

为什么重要：  
人形机器人仍处在资本、供应链、场景试点共同推动期，但企业数量增长不等于商业闭环成熟。

可能影响：  
短期会带动传感器、关节模组、控制器、边缘算力需求；买方更需要关注可审计部署、售后能力、安全证据和重复付费客户。

来源：新华网 / 市场监管总局数据线索  
https://www.news.cn/tech/

## 实战案例

1. 企业 AI 订阅怎么配

适合场景：ChatGPT Business、内部开发团队、数据分析团队、运营策划团队、共享 AI 预算池。

建议打法：先按岗位分层：普通办公保留 Standard，高频写代码、分析数据、做运营方案的员工使用 Premium；每两周复盘用量、节省时间、业务产出和异常成本，避免按组织架构平均分配。

2. 网络安全团队怎么试点 Daybreak Cyber

适合场景：漏洞复核、告警解释、修复建议、授权资产扫描、SOC 一线分诊。

建议打法：先限定授权资产和低风险任务，记录 identity check、scope limit、audit log、human approval 和 rollback path；红队、渗透测试、自动化修复必须保留人工确认。
`;

export const expectedSignals = [
  { title: 'OpenAI 将给 ChatGPT Business 推出 Premium seats', sourceProjectionRuleMatches: ['openai-partner-network-enterprise-ecosystem-2026'], enLabel: 'OpenAI / ChatGPT Business / Premium seats', zhEvidence: '来源条目 1：OpenAI 将给 ChatGPT Business 推出 Premium seats', requiredTokens: ['ChatGPT Business', 'Premium 席位', '125 美元', '5 倍用量'] },
  { title: 'OpenAI 扩大 Daybreak Cyber Partner 计划', sourceProjectionRuleMatches: ['openai-partner-network-enterprise-ecosystem-2026'], enLabel: 'OpenAI / Daybreak / cyber partner program', zhEvidence: '来源条目 2：OpenAI 扩大 Daybreak Cyber Partner 计划', requiredTokens: ['Daybreak Cyber Partner', 'Accenture', 'CrowdStrike', 'Cloudflare'] },
  { title: 'NVIDIA 支持 Firebird 在亚美尼亚建设大型 AI Factory', sourceProjectionRuleMatches: ['nvidia-ai-cloud-ecosystem'], enLabel: 'Armenia / Firebird / NVIDIA AI factory capacity', zhEvidence: '来源条目 3：NVIDIA 支持 Firebird 在亚美尼亚建设大型 AI Factory', requiredTokens: ['Firebird', '亚美尼亚', 'Rubin', 'Blackwell', '300MW'] },
  { title: '国产大模型在全球调用榜单上升（待确认）', sourceProjectionRuleMatches: ['china-waic-token-cost-optimization-2026'], enLabel: 'Tencent / China / OpenRouter token ranking', zhEvidence: '来源条目 4：国产大模型在全球调用榜单上升（待确认）', requiredTokens: ['OpenRouter', 'Token 调用榜', 'DeepSeek V4 Flash', 'MiMo V2.5', '腾讯 Hy3'] },
  { title: '中国人形机器人企业新增继续增长（待确认）', sourceProjectionRuleMatches: ['china-humanoid-embodied-training-2026'], enLabel: 'SAMR / China / humanoid robotics company growth', zhEvidence: '来源条目 5：中国人形机器人企业新增继续增长（待确认）', requiredTokens: ['市场监管总局', '人形机器人领域新设企业', '11.6 万户', '9.5%'] },
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
  '### 1. OpenAI / ChatGPT Business / Premium seats',
  '### 2. OpenAI / Daybreak / cyber partner program',
  '### 3. Armenia / Firebird / NVIDIA AI factory capacity',
  '### 4. Tencent / China / OpenRouter token ranking',
  '### 5. SAMR / China / humanoid robotics company growth',
  'Evidence item 1: OpenAI / ChatGPT Business / Premium seats',
  'Evidence item 5: SAMR / China / humanoid robotics company growth',
  '## Case-Level FAQ',
  '## Today’s Bottom Line',
  '## What to Watch Tomorrow',
  '## Evidence Matrix',
];

export const requiredZhOutputs = [
  'OpenAI 将给 ChatGPT Business 推出 Premium seats',
  'OpenAI 扩大 Daybreak Cyber Partner 计划',
  'NVIDIA 支持 Firebird 在亚美尼亚建设大型 AI Factory',
  '国产大模型在全球调用榜单上升（待确认）',
  '中国人形机器人企业新增继续增长（待确认）',
  '企业 AI 订阅怎么配',
  '网络安全团队怎么试点 Daybreak Cyber',
  '## 今日结论',
  '## 明日跟踪点',
  '## 证据矩阵',
  '来源条目 1：OpenAI 将给 ChatGPT Business 推出 Premium seats',
  '来源条目 5：中国人形机器人企业新增继续增长（待确认）',
];

export const caseLevelFaqSignals = [
  {
    label: 'ChatGPT Business Premium seat allocation',
    practicalCaseMatchTerms: ['企业 AI 订阅怎么配', 'ChatGPT Business'],
    sourceStoryMatchTerms: ['ChatGPT Business', 'Premium seats'],
    requiredTerms: ['role-based allocation', 'usage review', 'budget owner'],
    links: ['/en/blog/what-is-openclaw/', '/en/blog/openclaw-vps-cost-comparison-2026/'],
  },
  {
    label: 'Daybreak Cyber bounded security pilot',
    practicalCaseMatchTerms: ['Daybreak Cyber', '网络安全团队'],
    sourceStoryMatchTerms: ['Daybreak Cyber Partner', 'CrowdStrike'],
    requiredTerms: ['identity check', 'scope limit', 'audit log', 'human approval', 'rollback path'],
    links: ['/en/blog/openclaw-security-hardening-2026/', '/en/blog/openclaw-model-fallback-strategy/'],
  },
  {
    label: 'OpenRouter ranking verification workflow',
    sourceStoryMatchTerms: ['OpenRouter', 'DeepSeek V4 Flash'],
    requiredTerms: ['primary ranking', 'price', 'throughput', 'latency', 'compliance delivery'],
    links: ['/en/blog/openclaw-model-fallback-strategy/'],
  },
];

export const parserGuardrails = {
  story1RequiredDetailTokens: ['ChatGPT Business', 'Premium 席位', '125 美元', '5 倍用量'],
  story1ForbiddenDetailTokens: ['Daybreak Cyber', 'Firebird', 'OpenRouter', '市场监管总局'],
  story2RequiredDetailTokens: ['Daybreak Cyber Partner', 'Accenture', 'CrowdStrike', 'Cloudflare'],
  story2ForbiddenDetailTokens: ['ChatGPT Business', 'Firebird', 'OpenRouter', '市场监管总局'],
  story3RequiredDetailTokens: ['Firebird', '亚美尼亚', 'Rubin', 'Blackwell', '300MW'],
  story3ForbiddenDetailTokens: ['ChatGPT Business', 'Daybreak Cyber', 'OpenRouter', '市场监管总局'],
  story4RequiredDetailTokens: ['OpenRouter', 'Token 调用榜', 'DeepSeek V4 Flash', 'MiMo V2.5', '腾讯 Hy3'],
  story4ForbiddenDetailTokens: ['ChatGPT Business', 'Daybreak Cyber', 'Firebird', '市场监管总局'],
  story5RequiredDetailTokens: ['市场监管总局', '人形机器人领域新设企业', '11.6 万户', '9.5%'],
  story5ForbiddenDetailTokens: ['ChatGPT Business', 'Daybreak Cyber', 'Firebird', 'OpenRouter'],
};
