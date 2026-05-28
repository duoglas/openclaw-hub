export const fixtureDate = '2026-05-27';

export const realCronFixture = `《AI、科技日报》  
2026-05-27 早报

## 今日要闻（5条）

### 1. Anthropic 任命韩国负责人，首尔办公室即将正式开业

发生了什么：Anthropic 5月26日宣布，任命 KiYoung Choi 为韩国代表董事，准备正式开放首尔办公室。

为什么重要：韩国被 Anthropic 称为 Claude 使用非常活跃的市场，用户使用率超过按人口规模预期的 3.5 倍，技术和创意工作占比较高。

可能影响：Claude 在亚太的企业销售、政府与研究合作、开发者生态会继续加速。韩国可能成为 Anthropic 亚洲业务的重要支点。

来源：https://www.anthropic.com/news/kiyoung-choi-representative-director-anthropic-korea

---

### 2. Amazon Alexa+ 进入法国，生成式 AI 助手继续国际化

发生了什么：Amazon 5月26日宣布，Alexa+ 在法国上线 Early Access。法国成为 Alexa+ 国际扩张的一站，已覆盖美国、英国、加拿大、墨西哥、意大利、西班牙、德国、奥地利等市场。

为什么重要：Alexa+ 不只是聊天助手，而是强调“能执行任务”的环境智能助手，接入音乐、智能家居、本地媒体和生活服务。

可能影响：AI 助手竞争会从“App 里的聊天框”转向“设备 + 服务 + 本地文化适配”。智能音箱、电视、浏览器、手机之间的跨端体验会更关键。

来源：https://www.aboutamazon.com/news/devices/alexa-plus-international-launch

---

### 3. NVIDIA Vera CPU 基准结果公布，瞄准 Agentic AI 数据中心

发生了什么：NVIDIA 5月26日发布 Vera CPU 相关基准结果，称其面向 AI 工厂中的智能体工作负载，具备 88 个自研 Olympus 核心、1.2TB/s 内存带宽，并在 Phoronix 测试中展示出较强 CPU 和内存表现。

为什么重要：AI Agent 不只消耗 GPU，也需要大量 CPU 做代码执行、沙箱、编译、数据库查询、任务编排和工具调用。NVIDIA 正在把 AI 基础设施从 GPU 扩展到 CPU、网络与系统级平台。

可能影响：未来 AI 数据中心采购会更关注每 token 成本、端到端吞吐、沙箱并发和整机效率，而不是只看 GPU 峰值算力。Intel / AMD 在服务器 CPU 上会面对更直接的 AI 场景竞争。

来源：https://blogs.nvidia.com/blog/vera-cpu-phoronix/

---

### 4. 中国头部互联网企业加速争夺 AI 入口

发生了什么：新华网/经济参考报报道，腾讯上线系统级 AI 助手 Marvis，阿里云百炼平台聚合多家大模型，百度推出通用智能体 DuMate，中国移动 MoMA 接入 300 多款模型。

为什么重要：AI 入口正在从“单个应用”升级为“任务调度层”。谁掌握用户和 AI 交互的第一界面，谁就可能掌握分发、数据和商业化入口。

可能影响：超级 App、操作系统、云模型平台、智能体应用会继续融合。普通用户会看到更多“一个入口完成搜索、写作、代码、下单、数据分析”的产品。

来源：https://www.news.cn/tech/20260526/02042bf2690e4f25acadd23488c1ee23/c.html

---

### 5. 华为发表“韬(τ)定律”，指向半导体演进新路径

发生了什么：新华网报道，华为5月25日正式发表韬(τ)定律，称这是中国企业首次在芯片领域提出全球产业发展的新原则。

为什么重要：在先进制程受限、算力需求持续增长的背景下，中国半导体产业会更重视系统工程、架构创新和产业协同，而不是只追逐单点制程突破。

可能影响：短期更像产业话语权和技术路线表达；中长期要看它是否能落到芯片设计、封装、系统互联、EDA、制造协同等具体指标上。

来源：https://www.news.cn/tech/20260526/dc8f2d1de9e246cba125bee865ccb5e2/c.html

## 实战案例（2个）

### 案例1：Alexa+ 在法国的本地化

Amazon 明确强调，Alexa+ 不只是翻译成法语，而是要理解法国文化、生活服务和本地内容源。

### 案例2：Agentic AI 数据中心的容量规划

NVIDIA Vera CPU 提醒团队，AI Agent 的成本不只来自模型推理，还来自代码执行、沙箱、数据库查询、检索、任务编排和审计日志。

## 今日结论

- 最值得关注：AI 正在从单点模型能力，进入办公入口、本地生活入口、数据中心系统和芯片产业叙事。
- 给普通用户建议：短期优先选择权限透明、可断开授权、有来源标注的 AI 产品。
- 给团队建议：不要只比较模型榜单，先选一个高频流程做试点。

## 证据矩阵

- 来源条目 1：Anthropic 韩国 / KiYoung Choi —— Anthropic 宣布 KiYoung Choi 出任韩国代表董事。
- 来源条目 2：Amazon Alexa+ 法国 —— Amazon 宣布 Alexa+ 在法国上线 Early Access。
- 来源条目 3：NVIDIA Vera CPU —— NVIDIA 发布 Vera CPU 基准信息。
- 来源条目 4：腾讯 / 阿里 / 百度 / 中国移动智能体入口 —— 新华网/经济参考报报道 Marvis、百炼、DuMate、MoMA 等产品。
- 来源条目 5：华为韬(τ)定律 —— 新华网报道华为正式发表韬(τ)定律。`;

export const expectedSignals = [
  {
    title: 'Anthropic 任命韩国负责人，首尔办公室即将正式开业',
    enLabel: 'Korea / Anthropic / KiYoung / workplace AI',
    zhEvidence: '来源条目 1：Anthropic 任命韩国负责人，首尔办公室即将正式开业',
    requiredTokens: ['Anthropic', 'KiYoung Choi'],
  },
  {
    title: 'Amazon Alexa+ 进入法国，生成式 AI 助手继续国际化',
    enLabel: 'France / US / Amazon',
    zhEvidence: '来源条目 2：Amazon Alexa+ 进入法国，生成式 AI 助手继续国际化',
    requiredTokens: ['Amazon', 'Alexa'],
  },
  {
    title: 'NVIDIA Vera CPU 基准结果公布，瞄准 Agentic AI 数据中心',
    enLabel: 'NVIDIA / Vera / CPU / compute infrastructure',
    zhEvidence: '来源条目 3：NVIDIA Vera CPU 基准结果公布，瞄准 Agentic AI 数据中心',
    requiredTokens: ['NVIDIA', 'Vera CPU'],
  },
  {
    title: '中国头部互联网企业加速争夺 AI 入口',
    enLabel: 'Tencent / Alibaba / Baidu / agent platform',
    zhEvidence: '来源条目 4：中国头部互联网企业加速争夺 AI 入口',
    requiredTokens: ['Tencent', '中国移动'],
  },
  {
    title: '华为发表“韬(τ)定律”，指向半导体演进新路径',
    enLabel: 'Huawei / China / EDA / compute infrastructure',
    zhEvidence: '来源条目 5：华为发表“韬(τ)定律”，指向半导体演进新路径',
    requiredTokens: ['Huawei', '韬'],
  },
];

export const bannedFallbackPhrases = [
  'primary named signal',
  'The item affects workflow fit',
  'named signal for story',
  'daily story',
  'source story behind',
  'anchors story',
  'This item provides a named source signal',
  'same-day brief section',
  'concrete AI and technology development',
  'mapped to the publish-ready story',
  '今日 AI / 科技日报暂未生成',
  '用于补齐日报来源核验矩阵',
  '-…',
  '...',
];

export const requiredEnglishOutputs = [
  ...expectedSignals.map((signal, index) => `### ${index + 1}. ${signal.enLabel}`),
  ...expectedSignals.map((signal, index) => `Evidence item ${index + 1}: ${signal.enLabel}`),
  '## Today’s Bottom Line',
  '## What to Watch Tomorrow',
  '## Evidence Matrix',
];

export const requiredZhOutputs = [
  ...expectedSignals.map((signal) => signal.title),
  '## 今日结论',
  '## 明日跟踪点',
  '## 证据矩阵',
  expectedSignals[0].zhEvidence,
  expectedSignals.at(-1).zhEvidence,
];

export const parserGuardrails = {
  story5ForbiddenEnLabelTokens: ['Tencent', 'Alibaba', 'Baidu', 'China Mobile', 'Marvis', 'MoMA'],
  story5RequiredEnLabelTokens: ['Huawei', 'China', 'EDA', 'compute infrastructure'],
};
