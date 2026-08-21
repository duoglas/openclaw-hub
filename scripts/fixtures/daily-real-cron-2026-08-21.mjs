export const fixtureDate = '2026-08-21';

export const realCronFixture = `《AI、科技日报》  
2026-08-21 早报

## 今日要闻（5条）

1. NVIDIA 把“AI 工厂”推向电力与土地层面
发生了什么：NVIDIA 官方披露，将与 SB Energy 合作，锁定美国俄亥俄 PORTS-Pike Technology Campus 的大规模土地、电力和机房容量，用于部署 NVIDIA AI compute，OpenAI 将作为租户。初始规划约 4.25GW AI 工厂容量。
为什么重要：AI 竞争正在从“谁模型更强”升级为“谁能拿到电力、土地、GPU、网络和长期机房容量”。
可能影响：未来大模型公司会更依赖超大规模算力协议；NVIDIA 也不只是卖 GPU，而是在参与 AI 基础设施金融化和长期资产布局。
状态：已确认，NVIDIA 官方博客直抓。

2. OpenAI Daybreak 网络安全模型进入 Amazon Bedrock
发生了什么：Amazon 官方页面显示，OpenAI Daybreak Red / Daybreak Blue 已面向符合条件客户在 Amazon Bedrock 上提供，分别面向漏洞发现、红队研究和防御性网络安全工作。
为什么重要：大模型正在进入高风险、高价值的企业安全场景。相比通用聊天机器人，安全专用模型更接近企业可付费的生产力工具。
可能影响：企业安全团队会更快把 AI 用到漏洞复现、缓解方案生成和攻防演练，同时推动云厂商强化模型访问控制、数据隔离和审计能力。
状态：已确认，Amazon 官方页面直抓。

3. 中国上半年机器人产业规上企业营收达 1655 亿元
发生了什么：新华网报道，2026 世界机器人大会在北京开幕。报道引用大会信息称，2025 年中国机器人产业规上企业营收突破 3000 亿元，今年上半年达到 1655 亿元，同比增长 24.5%。工信部将推动智能机器人标志性产品落地。
为什么重要：机器人正在成为 AI 从数字世界进入物理世界的核心载体，尤其是具身智能、世界模型、工业、养老、医疗和应急等场景。
可能影响：中国机器人产业会从展示样机转向场景交付；产业链机会不只在整机，也包括传感器、灵巧手、控制系统、软件平台和集成服务。
状态：已确认，新华网直抓。

4. 中国“人工智能+”应用继续向产业、政务、民生扩散
发生了什么：新华网文章称，2025 年中国 AI 相关产业规模超过万亿元，2026 年预计增速超 30%，并在生产、服务、民生、政务四类场景形成初步商业化应用。
为什么重要：AI 落地重点正在从“模型能力”转向“场景改造”。制造、药房、机场配餐、职称评审、工伤经办等都被列为应用样本。
可能影响：普通企业接下来更需要找具体场景，而不是盲目采购大模型；数据流通、芯片、EDA、高端人才仍是制约因素。
状态：已确认，新华网直抓。

5. NVIDIA GeForce NOW 支持 Firefox 浏览器
发生了什么：NVIDIA 官方博客称，GeForce NOW 云游戏开始支持 Firefox 浏览器，用户可在浏览器中直接玩支持的 PC 游戏，无需下载专用客户端；Ultimate 会员最高可到 1440p、120fps。
为什么重要：这是云端 GPU 服务继续浏览器化的信号。虽然它是游戏产品，但背后是低延迟云渲染、跨设备计算和订阅式 GPU 访问能力。
可能影响：云游戏、云工作站、云端 AI 应用会继续靠浏览器降低使用门槛；端侧设备性能的重要性会被部分削弱。
状态：已确认，NVIDIA 官方博客直抓。

## 实战案例

1. AWS 用学生奖励计划扩大云与 AI 开发者入口
AWS 官方页面显示，AWS Builder Center 面向大学生推出 Student Rewards，包含云积分、Skill Builder 高级课程、认证券等资源，官方称资源投入超过 5 亿美元。
实际价值：学生和转行者可优先使用免费云资源、认证体系和项目社区，把学习路线转成可展示的云与 AI 项目。

2. Firefox + GeForce NOW 展示“浏览器即算力入口”
NVIDIA 把 GeForce NOW 扩展到 Firefox，说明高性能图形计算正在进一步网页化。
实际价值：未来很多重计算任务不一定依赖本机配置，设备选择可更重视网络、屏幕、续航和浏览器兼容。
`;

export const expectedSignals = [
  { title: 'NVIDIA 把“AI 工厂”推向电力与土地层面', sourceProjectionRuleMatches: ['china-world-ai-cooperation-organization-2026'], enLabel: 'OpenAI / PORTS-Pike / global affairs infrastructure', zhEvidence: '来源条目 1：NVIDIA 把“AI 工厂”推向电力与土地层面', requiredTokens: ['NVIDIA', 'SB Energy', 'PORTS-Pike', '4.25GW'] },
  { title: 'OpenAI Daybreak 网络安全模型进入 Amazon Bedrock', sourceProjectionRuleMatches: ['openai-partner-network-enterprise-ecosystem-2026'], enLabel: 'OpenAI / Daybreak / Bedrock cyber partner ecosystem', zhEvidence: '来源条目 2：OpenAI Daybreak 网络安全模型进入 Amazon Bedrock', requiredTokens: ['OpenAI Daybreak', 'Bedrock', '网络安全', 'Red'] },
  { title: '中国上半年机器人产业规上企业营收达 1655 亿元', sourceProjectionRuleMatches: ['china-humanoid-embodied-training-2026'], enLabel: 'MIIT / China / robot industry revenue', zhEvidence: '来源条目 3：中国上半年机器人产业规上企业营收达 1655 亿元', requiredTokens: ['世界机器人大会', '1655 亿元', '24.5%', '标志性产品'] },
  { title: '中国“人工智能+”应用继续向产业、政务、民生扩散', sourceProjectionRuleMatches: ['china-vertical-industry-ai-scale-deployment-2026'], enLabel: 'China / AI Plus / vertical deployment', zhEvidence: '来源条目 4：中国“人工智能+”应用继续向产业、政务、民生扩散', requiredTokens: ['人工智能+', '万亿元', '30%', '政务'] },
  { title: 'NVIDIA GeForce NOW 支持 Firefox 浏览器', sourceProjectionRuleMatches: ['nvidia-microsoft-agentic-windows-azure'], enLabel: 'NVIDIA / GeForce NOW / Firefox cloud GPU access', zhEvidence: '来源条目 5：NVIDIA GeForce NOW 支持 Firefox 浏览器', requiredTokens: ['GeForce NOW', 'Firefox', '1440p', '120fps'] },
];

export const bannedFallbackPhrases = [
  'The source tracks model capability update',
  'giving the daily brief a named actor and deployment context',
  'buyers must check access control, infrastructure availability, operational risk',
  'validation=fail',
  'tool_errors=',
  'web_search 连续报错',
  'Now I\'ll compose the full report',
  '用于补齐日报来源核验矩阵',
  '素材已足够',
  '直接输出日报正文',
  'fetch failed',
  '-…',
  '...',
];

export const requiredEnglishOutputs = [
  '### 1. OpenAI / PORTS-Pike / global affairs infrastructure',
  '### 2. OpenAI / Daybreak / Bedrock cyber partner ecosystem',
  '### 3. MIIT / China / robot industry revenue',
  '### 4. China / AI Plus / vertical deployment',
  '### 5. NVIDIA / GeForce NOW / Firefox cloud GPU access',
  'Evidence item 1: OpenAI / PORTS-Pike / global affairs infrastructure',
  'Evidence item 5: NVIDIA / GeForce NOW / Firefox cloud GPU access',
  '## Case-Level FAQ',
  '## Today’s Bottom Line',
  '## What to Watch Tomorrow',
  '## Evidence Matrix',
];

export const requiredZhOutputs = [
  'NVIDIA 把“AI 工厂”推向电力与土地层面',
  'OpenAI Daybreak 网络安全模型进入 Amazon Bedrock',
  '中国上半年机器人产业规上企业营收达 1655 亿元',
  '中国“人工智能+”应用继续向产业、政务、民生扩散',
  'NVIDIA GeForce NOW 支持 Firefox 浏览器',
  'AWS 用学生奖励计划扩大云与 AI 开发者入口',
  'Firefox + GeForce NOW 展示“浏览器即算力入口”',
  '## 今日结论',
  '## 明日跟踪点',
  '## 证据矩阵',
  '来源条目 1：NVIDIA 把“AI 工厂”推向电力与土地层面',
  '来源条目 5：NVIDIA GeForce NOW 支持 Firefox 浏览器',
];

export const caseLevelFaqSignals = [
  { label: 'PORTS_PIKE_AI_FACTORY', sourceStoryMatchTerms: ['PORTS-Pike', '4.25GW'], requiredTerms: ['energy', 'land', 'data center', 'capacity', 'procurement'], links: ['/en/blog/what-is-openclaw/', '/en/blog/openclaw-vps-deployment-complete-guide/'] },
  { label: 'DAYBREAK_BEDROCK_CYBERSECURITY', sourceStoryMatchTerms: ['OpenAI Daybreak', 'Bedrock'], requiredTerms: ['cybersecurity', 'red team', 'vulnerability', 'audit', 'access control'], links: ['/en/blog/openclaw-model-fallback-strategy/', '/en/blog/openclaw-vps-deployment-complete-guide/'] },
  { label: 'CHINA_ROBOT_INDUSTRY_REVENUE', sourceStoryMatchTerms: ['世界机器人大会', '1655 亿元'], requiredTerms: ['robotics', 'revenue', 'embodied intelligence', 'deployment', 'supply chain'], links: ['/en/blog/what-is-openclaw/', '/en/blog/openclaw-vps-deployment-complete-guide/'] },
  { label: 'CHINA_AI_PLUS_VERTICAL_DEPLOYMENT', sourceStoryMatchTerms: ['人工智能+', '政务'], requiredTerms: ['vertical workflow', 'manufacturing', 'public services', 'governance', 'metrics'], links: ['/en/blog/what-is-openclaw/', '/en/blog/openclaw-model-fallback-strategy/'] },
  { label: 'GEFORCE_NOW_FIREFOX_CLOUD_GPU', sourceStoryMatchTerms: ['GeForce NOW', 'Firefox'], requiredTerms: ['browser', 'cloud GPU', 'latency', 'streaming', 'cross-device'], links: ['/en/blog/openclaw-vps-deployment-complete-guide/', '/en/blog/openclaw-model-fallback-strategy/'] },
  { label: 'AWS_STUDENT_REWARDS_DEVELOPER_ENTRY', practicalCaseMatchTerms: ['AWS 用学生奖励计划扩大云与 AI 开发者入口', 'Student Rewards'], requiredTerms: ['students', 'credits', 'training', 'certification', 'project portfolio'], links: ['/en/blog/what-is-openclaw/', '/en/blog/openclaw-vps-deployment-complete-guide/'] },
  { label: 'BROWSER_AS_COMPUTE_ENTRY', practicalCaseMatchTerms: ['浏览器即算力入口', 'Firefox + GeForce NOW'], requiredTerms: ['browser', 'cloud compute', 'device choice', 'network', 'compatibility'], links: ['/en/blog/openclaw-model-fallback-strategy/', '/en/blog/openclaw-vps-deployment-complete-guide/'] },
];

export const parserGuardrails = {
  story1RequiredDetailTokens: ['NVIDIA', 'SB Energy', 'PORTS-Pike', '4.25GW'],
  story1ForbiddenDetailTokens: ['Daybreak', '1655 亿元', 'GeForce NOW', 'Firefox'],
  story2RequiredDetailTokens: ['OpenAI Daybreak', 'Bedrock', '网络安全', 'Red'],
  story2ForbiddenDetailTokens: ['PORTS-Pike', '1655 亿元', 'GeForce NOW', 'Firefox'],
  story3RequiredDetailTokens: ['世界机器人大会', '1655 亿元', '24.5%', '标志性产品'],
  story3ForbiddenDetailTokens: ['PORTS-Pike', 'Daybreak', 'GeForce NOW', 'Firefox'],
  story4RequiredDetailTokens: ['人工智能+', '万亿元', '30%', '政务'],
  story4ForbiddenDetailTokens: ['PORTS-Pike', 'Daybreak', 'GeForce NOW', 'Firefox'],
  story5RequiredDetailTokens: ['GeForce NOW', 'Firefox', '1440p', '120fps'],
  story5ForbiddenDetailTokens: ['PORTS-Pike', 'Daybreak', '1655 亿元', '人工智能+'],
  story5ForbiddenEvidenceTokens: ['PORTS-Pike', 'Daybreak', '1655 亿元', '人工智能+'],
  story5ForbiddenZhEvidenceTokens: ['PORTS-Pike', 'Daybreak', '1655 亿元', '人工智能+'],
};
