export const fixtureDate = '2026-06-29';

export const realCronFixture = `《AI、科技日报》  
2026-06-29 早报

说明：截至 07:30，今天可确认的新发布不多；本期以过去 72 小时内仍最值得跟踪的 AI/科技动态为主。  
说明：本次 web_search 连续报错，已改用官方页/原文直抓，校验降级为 fail。

## 今日要闻（5条）

1. OpenAI 更新 ChatGPT：个人财务、听写、Codex Remote、模型退役

发生了什么：  
OpenAI 6月26日更新 ChatGPT 版本说明：个人财务体验扩展到美国 Plus 用户和 Android；ChatGPT 听写模型升级；GPT-4.5 在 ChatGPT 中退役，旧会话转到 GPT-5.5。6月25日还宣布 Codex Remote 全量开放到所有 ChatGPT 计划。

为什么重要：  
ChatGPT 正从“聊天工具”继续变成个人工作/生活入口：财务、语音、远程编程都在进入主产品。

可能影响：  
普通用户会更依赖 ChatGPT 做个人数据分析；开发者要注意模型退役和 Codex Remote 的远程主机权限管理。

来源：OpenAI Help Center  
https://help.openai.com/zh-hans-cn/articles/6825453-chatgpt-%E5%8F%91%E5%B8%83%E8%AF%B4%E6%98%8E

---

2. Anthropic 发布 Claude Tag：AI 进入 Slack，变成“团队成员”

发生了什么：  
Anthropic 6月23日推出 Claude Tag，先在 Slack 上 beta，面向 Claude Enterprise 和 Team 客户。团队可在频道里 @Claude，让它读取授权频道、工具、数据和代码库，异步执行任务。Anthropic 称内部版 Claude Tag 已生成其产品团队 65% 的代码。

为什么重要：  
这不是单人聊天助手，而是“多人共享、带记忆、带权限、可异步执行”的企业 Agent 形态。

可能影响：  
企业 AI 落地会从“个人 Copilot”转向“团队协作 Agent”。但权限、审计、成本上限会变成核心管理项。

来源：Anthropic 官方  
https://www.anthropic.com/news/introducing-claude-tag

---

3. NVIDIA 与 AWS 加码生产级 AI 基础设施

发生了什么：  
NVIDIA 6月23日披露与 AWS 的新合作：Amazon EC2 G7 使用 NVIDIA RTX PRO 4500 Blackwell Server Edition GPU；Amazon OpenSearch Serverless 默认使用 NVIDIA cuVS 做 GPU 加速向量索引。NVIDIA 称向量索引最高快 10 倍、成本为 CPU 方案的四分之一。

为什么重要：  
RAG、语义搜索、Agent 记忆都依赖向量检索。云厂商把 GPU 向量索引做成默认能力，会降低企业部署生产 AI 的门槛。

可能影响：  
企业 AI 应用成本结构可能改变：以前贵在训练，现在贵在检索、推理、数据管线；基础设施厂商会继续吃到红利。

来源：NVIDIA 官方博客  
https://blogs.nvidia.com/blog/nvidia-aws-ai-production-scale/

---

4. NVIDIA 在 TOP500/Green500 超算榜继续扩大优势

发生了什么：  
NVIDIA 称最新 TOP500 中，超过 400 台系统使用 NVIDIA 技术，占 81%；新增上榜系统中约 90% 使用 NVIDIA 技术。Green500 能效榜前 8 名均运行 NVIDIA GPU，前 10 名中 9 个使用 NVIDIA 技术。

为什么重要：  
AI 和高性能计算正在合流。训练大模型、科学计算、工业仿真对同一类加速基础设施的依赖越来越强。

可能影响：  
全球 AI 算力竞争会继续向 GPU、网络、能效和数据中心工程集中；算力自主、能耗约束会成为各国科技政策重点。

来源：NVIDIA 官方博客  
https://blogs.nvidia.com/blog/top500-green500-supercomputers-isc-2026/

---

5. 中国 AI 应用主线：从试点走向垂直行业规模化

发生了什么：  
新华社报道，2026 夏季达沃斯论坛上，AI 成为高频议题。与会人士集中讨论 AI 在制造、医疗、能源、新材料、电池研发等垂直领域的规模化落地。报道提到，工业智能体可把工厂读图和工艺制定从半天缩短到几分钟，准确率约 97%

## 今日结论

- 最值得关注：企业级 AI 正在加速进入核心业务流程，AI 不再只是聊天工具，而是在进入税务、法务、制造、运维、推理服务等真实生产系统。
- 给普通用户建议：短期优先选择权限透明、可断开授权、有来源标注的 AI 产品，把它用于信息整理、学习复盘、日常文档和低风险决策辅助。
- 给团队建议：不要只比较模型榜单，先选一个高频流程做试点，并把权限、审计、成本和人工复核写进上线标准。

## 明日跟踪点

- 关注今日提到的模型、平台或硬件动态是否出现产品化细节。
- 关注企业案例是否披露真实使用场景、权限控制和成本变化。
- 关注政策、版权、数据安全或来源标注要求是否进一步收紧。

## 证据矩阵

- 来源条目 1：OpenAI 更新 ChatGPT：个人财务、听写、Codex Remote、模型退役 —— OpenAI 6月26日更新 ChatGPT 版本说明：个人财务体验扩展到美国 Plus 用户和 Android；ChatGPT 听写模型升级；GPT-4.5 在 ChatGPT 中退役，旧会话转到 GPT-5.5。6月25日还宣布 Codex Remote 全量开放到所有 ChatGPT 计划。
- 来源条目 2：Anthropic 发布 Claude Tag：AI 进入 Slack，变成“团队成员” —— Anthropic 6月23日推出 Claude Tag，先在 Slack 上 beta，面向 Claude Enterprise 和 Team 客户。团队可在频道里 @Claude，让它读取授权频道、工具、数据和代码库，异步执行任务。Anthropic 称内部版 Claude Tag 已生成其产品团队 65% 的代码。
- 来源条目 3：NVIDIA 与 AWS 加码生产级 AI 基础设施 —— NVIDIA 6月23日披露与 AWS 的新合作：Amazon EC2 G7 使用 NVIDIA RTX PRO 4500 Blackwell Server Edition GPU；Amazon OpenSearch Serverless 默认使用 NVIDIA cuVS 做 GPU 加速向量索引。NVIDIA 称向量索引最高快 10 倍、成本为 CPU 方案的四分之一。
- 来源条目 4：NVIDIA 在 TOP500/Green500 超算榜继续扩大优势 —— NVIDIA 称最新 TOP500 中，超过 400 台系统使用 NVIDIA 技术，占 81%；新增上榜系统中约 90% 使用 NVIDIA 技术。Green500 能效榜前 8 名均运行 NVIDIA GPU，前 10 名中 9 个使用 NVIDIA 技术。
- 来源条目 5：中国 AI 应用主线：从试点走向垂直行业规模化 —— 新华社报道，2026 夏季达沃斯论坛上，AI 成为高频议题。与会人士集中讨论 AI 在制造、医疗、能源、新材料、电池研发等垂直领域的规模化落地。报道提到，工业智能体可把工厂读图和工艺制定从半天缩短到几分钟，准确率约 97%
`;

export const expectedSignals = [
  { title: 'OpenAI 更新 ChatGPT：个人财务、听写、Codex Remote、模型退役', sourceProjectionRuleMatches: ['openai-chatgpt-finance-dictation-gpt45-retirement-2026'], enLabel: 'OpenAI / ChatGPT / finance and dictation controls', zhEvidence: '来源条目 1：OpenAI 更新 ChatGPT：个人财务、听写、Codex Remote、模型退役', requiredTokens: ['个人财务体验', '听写模型升级', 'GPT-4.5 在 ChatGPT 中退役', 'Codex Remote'] },
  { title: 'Anthropic 发布 Claude Tag：AI 进入 Slack，变成“团队成员”', sourceProjectionRuleMatches: ['anthropic-claude-tag-slack-collaboration-2026'], enLabel: 'Anthropic / Claude Tag / team agent workflow', zhEvidence: '来源条目 2：Anthropic 发布 Claude Tag：AI 进入 Slack，变成“团队成员”', requiredTokens: ['Claude Tag', 'Claude Enterprise', 'Slack'] },
  { title: 'NVIDIA 与 AWS 加码生产级 AI 基础设施', sourceProjectionRuleMatches: ['nvidia-aws-ec2-g7-opensearch-vector-2026'], enLabel: 'NVIDIA / AWS / vector retrieval infrastructure', zhEvidence: '来源条目 3：NVIDIA 与 AWS 加码生产级 AI 基础设施', requiredTokens: ['Amazon EC2 G7', 'NVIDIA RTX PRO 4500', 'OpenSearch Serverless', 'NVIDIA cuVS'] },
  { title: 'NVIDIA 在 TOP500/Green500 超算榜继续扩大优势', sourceProjectionRuleMatches: ['nvidia-top500-green500-supercomputing-2026'], enLabel: 'NVIDIA / TOP500 / Green500 / compute infrastructure', zhEvidence: '来源条目 4：NVIDIA 在 TOP500/Green500 超算榜继续扩大优势', requiredTokens: ['TOP500', '超过 400 台', 'Green500 能效榜前 8 名'] },
  { title: '中国 AI 应用主线：从试点走向垂直行业规模化', sourceProjectionRuleMatches: ['china-vertical-industry-ai-scale-deployment-2026'], enLabel: 'China / vertical AI / industrial deployment', zhEvidence: '来源条目 5：中国 AI 应用主线：从试点走向垂直行业规模化', requiredTokens: ['夏季达沃斯论坛', '垂直领域', '工厂读图'] },
];

export const bannedFallbackPhrases = [
  'The source tracks model capability update',
  'buyers must check access control, infrastructure availability, operational risk',
  'China / vertical AI / industrial deployment signal 5 changes the evaluation path',
  'Teams can turn China / vertical AI / industrial deployment signal 5 into a scoped rollout test',
  'giving the daily brief a named actor and deployment context',
  'today AI / technology daily not generated',
  '今日 AI / 科技日报暂未生成',
  '-…',
  '...',
];

export const requiredEnglishOutputs = [
  '### 1. OpenAI / ChatGPT / finance and dictation controls',
  '### 2. Anthropic / Claude Tag / team agent workflow',
  '### 3. NVIDIA / AWS / vector retrieval infrastructure',
  '### 4. NVIDIA / TOP500 / Green500 / compute infrastructure',
  '### 5. China / vertical AI / industrial deployment',
  'Codex Remote is now available across ChatGPT plans',
  'NVIDIA said vector indexing can be up to 10 times faster',
  'China’s AI application agenda is shifting from general model excitement toward measurable productivity gains',
  '## Today’s Bottom Line',
  '## What to Watch Tomorrow',
  '## Evidence Matrix',
];

export const requiredZhOutputs = [
  'OpenAI 更新 ChatGPT：个人财务、听写、Codex Remote、模型退役',
  'Anthropic 发布 Claude Tag：AI 进入 Slack，变成“团队成员”',
  'NVIDIA 与 AWS 加码生产级 AI 基础设施',
  'NVIDIA 在 TOP500/Green500 超算榜继续扩大优势',
  '中国 AI 应用主线：从试点走向垂直行业规模化',
  '## 今日结论',
  '## 明日跟踪点',
  '## 证据矩阵',
  '来源条目 1：OpenAI 更新 ChatGPT：个人财务、听写、Codex Remote、模型退役',
  '来源条目 5：中国 AI 应用主线：从试点走向垂直行业规模化',
];

export const caseLevelFaqSignals = [
  {
    label: 'ChatGPT personal finance',
    practicalCaseMatchTerms: ['personal productivity', '个人数据', '个人财务'],
    sourceStoryMatchTerms: ['个人财务', 'personal finance', 'US Plus users'],
    requiredTerms: ['personal finance', 'US Plus users', 'data boundary'],
    links: ['/en/blog/what-is-openclaw/', '/en/blog/openclaw-vps-deployment-complete-guide/'],
  },
  {
    label: 'ChatGPT dictation',
    practicalCaseMatchTerms: ['personal productivity', '听写', 'dictation', 'voice input'],
    sourceStoryMatchTerms: ['听写', 'dictation model', 'voice input'],
    requiredTerms: ['ChatGPT dictation', 'dictation model', 'voice input'],
    links: ['/en/blog/openclaw-model-fallback-strategy/'],
  },
  {
    label: 'Claude Tag',
    practicalCaseMatchTerms: ['deployment checklist', 'Claude Tag', '团队成员'],
    sourceStoryMatchTerms: ['Claude Tag', 'Slack', 'channel context'],
    requiredTerms: ['Claude Tag', 'Slack-based', 'channel memory scope'],
    links: ['/en/blog/openclaw-model-fallback-strategy/', '/en/blog/openclaw-vps-deployment-complete-guide/'],
  },
];
