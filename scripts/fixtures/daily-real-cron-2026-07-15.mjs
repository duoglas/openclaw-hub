export const fixtureDate = '2026-07-15';

export const realCronFixture = `《AI、科技日报》  
2026-07-15 早报｜聚焦 AI / 科技行业

## 今日要闻（5条）

1. AWS 发布一组企业 AI Agent 新能力  
状态：已确认  
发生了什么：AWS Summit New York 2026 上，AWS 宣布 AWS Continuum、AWS Context、Amazon Quick、Kiro、AWS DevOps Agent、AWS Transform、Bedrock AgentCore 等一批 Agent 相关能力。重点是让企业 Agent 能处理安全漏洞、理解企业数据上下文、辅助开发与发布。  
为什么重要：企业 AI 正从“聊天/问答”转向“能执行工作流的 Agent”。AWS 把 Agent、安全、知识图谱、DevOps、云上部署打包，是在抢企业 AI 基础设施入口。  
可能影响：企业会更容易把 AI Agent 接进开发、安全、客服、数据分析等流程；云厂商之间的竞争会从“谁有模型”升级到“谁能把 Agent 安全落地”。

2. OpenAI GPT-5.6 系列已在 Amazon Bedrock 上 GA  
状态：已确认  
发生了什么：Amazon 官方页显示，OpenAI GPT-5.6 Sol、Terra、Luna 已在 Amazon Bedrock 上一般可用；支持企业安全、区域内数据处理、Prompt 缓存，并标注缓存输入可享 90% 折扣。  
为什么重要：OpenAI 模型进入 AWS Bedrock，意味着企业可在既有 AWS 权限、日志、合规和账单体系内使用 OpenAI 模型。  
可能影响：大企业采用 OpenAI 的阻力会下降；模型分发渠道会更集中到云平台；普通开发者后续也可能通过云平台更方便地混用 OpenAI、Anthropic、Meta 等模型。

3. NVIDIA 强调开放模型是企业“拥有 AI”的关键路径  
状态：已确认  
发生了什么：NVIDIA 在 Nemotron Labs 文章中强调，企业竞争优势不只来自“选哪个大模型”，而来自能否基于开放模型做私有评测、后训练、成本优化和行业定制。文章提到医疗、法律、企业搜索等场景。  
为什么重要：这代表 AI 落地重点正在从“通用大模型能力”转向“企业可控、可审计、可微调的专用系统”。  
可能影响：开源/开放权重模型、私有评测、企业本地化部署会继续升温；闭源模型仍强，但在合规、成本和数据控制上会面临更多对比。

4. NVIDIA：AI 基础设施竞争进入“每瓦性能”阶段  
状态：已确认  
发生了什么：NVIDIA 官方博客称，随着 Agentic AI 推高 token 需求，AI 工厂的关键约束是电力；每瓦性能决定固定电力预算下能生成多少 token。文章强调 Blackwell NVL72、GB300、Vera Rubin 等平台在 MoE 推理上的能效。  
为什么重要：AI 成本不只是 GPU 价格，还包括电力、机房、散热和推理吞吐。未来大模型服务商的优势会越来越依赖基础设施效率。  
可能影响：AI 云服务价格战可能继续；模型公司会更关注推理优化、小模型协同、缓存和低成本部署；普通用户短期会感受到 AI 产品更快、更便宜，但高阶能力仍可能分层收费。

5. 中国侧：新华网发布 2026 世界人工智能大会看点速览  
状态：待确认  
发生了什么：新华网 7 月 14 日发布《2026世界人工智能大会看点速览》。页面可确认标题、日期和来源，但正文主要以图片/视觉内容呈现，本轮未能完整抽取细节。  
为什么重要：WAIC 是中国 AI 产业、政策、应用展示的重要窗口，通常会集中释放大模型、机器人、智能终端、产业应用和治理议题。  
可能影响：需要继续跟踪大会正式议程、参展企业、政策表述和产品发布；目前不宜把具体亮点写死，细节待进一步确认。

## 实战案例（2个）

1. 企业安全：AWS Continuum 把漏洞处理做成 Agent 工作流  
AWS 官方描述中，Continuum 面向代码漏洞，目标是持续发现、验证、排序并辅助修复风险。  
可借鉴点：  
- 不要只让 AI “解释漏洞”；要让它进入“发现—验证—优先级—修复建议—发布保护”的闭环。  
- 企业上线 Agent 时，安全和权限边界要先设计，否则越自动化风险越大。

2. 企业知识助手：AWS Context / NVIDIA Nemotron 的共同方向  
AWS Context 强调用企业知识图谱让 Agent 找到正确上下文；NVIDIA Nemotron 文章强调企业用开放模型做私有评测和定制。  
可借鉴点：  
- 好用的企业 AI，不只是换一个更强模型，而是接入企业知识、定义权限边界、建立评测集，并持续优化成本与准确率。
`;

export const expectedSignals = [
  { title: 'AWS 发布一组企业 AI Agent 新能力', sourceProjectionRuleMatches: ['aws-agent-continuum-enterprise-agentcore-2026'], enLabel: 'AWS / Agent / Continuum / agent platform', zhEvidence: '来源条目 1：AWS 发布一组企业 AI Agent 新能力', requiredTokens: ['AWS Continuum', 'AWS Context', 'Bedrock AgentCore', '安全漏洞'] },
  { title: 'OpenAI GPT-5.6 系列已在 Amazon Bedrock 上 GA', sourceProjectionRuleMatches: ['openai-amazon-bedrock-models'], enLabel: 'OpenAI / GPT-5.6 / Bedrock enterprise distribution', zhEvidence: '来源条目 2：OpenAI GPT-5.6 系列已在 Amazon Bedrock 上 GA', requiredTokens: ['GPT-5.6 Sol', 'Terra', 'Luna', 'Prompt 缓存', '90% 折扣'] },
  { title: 'NVIDIA 强调开放模型是企业“拥有 AI”的关键路径', sourceProjectionRuleMatches: ['nvidia-nemoclaw-industrial-agents'], enLabel: 'NVIDIA / Nemotron Labs / open model ownership', zhEvidence: '来源条目 3：NVIDIA 强调开放模型是企业“拥有 AI”的关键路径', requiredTokens: ['Nemotron Labs', '开放模型', '私有评测', '后训练'] },
  { title: 'NVIDIA：AI 基础设施竞争进入“每瓦性能”阶段', sourceProjectionRuleMatches: ['nvidia-blackwell-mlperf-training-6-2026'], enLabel: 'NVIDIA / Blackwell / performance-per-watt AI infrastructure', zhEvidence: '来源条目 4：NVIDIA：AI 基础设施竞争进入“每瓦性能”阶段', requiredTokens: ['每瓦性能', 'Blackwell NVL72', 'GB300', 'Vera Rubin'] },
  { title: '中国侧：新华网发布 2026 世界人工智能大会看点速览', sourceProjectionRuleMatches: ['china-ai-industry-report-l3'], enLabel: 'China / WAIC / official preview watchpoint', zhEvidence: '来源条目 5：中国侧：新华网发布 2026 世界人工智能大会看点速览', requiredTokens: ['2026世界人工智能大会看点速览', '图片/视觉内容', '待确认'] },
];

export const bannedFallbackPhrases = [
  'The source tracks open-source model ecosystem, model capability update, enterprise AI rollout, healthcare AI deployment around NVIDIA, Nemotron, Labs',
  'buyers must check access control, infrastructure availability, operational risk',
  'AWS made GPT-5.5, GPT-5.4, and Codex available in Amazon Bedrock',
  'NVIDIA said Blackwell delivered the fastest training time across all seven MLPerf Training 6.0 benchmarks',
  'A secondary L3 source says China has more than 6,000 AI companies',
  'giving the daily brief a named actor and deployment context',
  'today AI / technology daily not generated',
  '今日 AI / 科技日报暂未生成',
  '-…',
  '...',
];

export const requiredEnglishOutputs = [
  '### 1. AWS / Agent / Continuum / agent platform',
  '### 2. OpenAI / GPT-5.6 / Bedrock enterprise distribution',
  '### 3. NVIDIA / Nemotron Labs / open model ownership',
  '### 4. NVIDIA / Blackwell / performance-per-watt AI infrastructure',
  '### 5. China / WAIC / official preview watchpoint',
  'Evidence item 1: AWS / Agent / Continuum / agent platform',
  'AWS Continuum for vulnerability handling',
  'AWS Context for enterprise knowledge-graph retrieval',
  'Bedrock AgentCore for governed agent runtime deployment',
  'Evidence item 2: OpenAI / GPT-5.6 / Bedrock enterprise distribution',
  'Evidence item 3: NVIDIA / Nemotron Labs / open model ownership',
  'Evidence item 4: NVIDIA / Blackwell / performance-per-watt AI infrastructure',
  'Evidence item 5: China / WAIC / official preview watchpoint',
  '## Today’s Bottom Line',
  '## What to Watch Tomorrow',
  '## Evidence Matrix',
];

export const requiredZhOutputs = [
  'AWS 发布一组企业 AI Agent 新能力',
  'OpenAI GPT-5.6 系列已在 Amazon Bedrock 上 GA',
  'NVIDIA 强调开放模型是企业“拥有 AI”的关键路径',
  'NVIDIA：AI 基础设施竞争进入“每瓦性能”阶段',
  '中国侧：新华网发布 2026 世界人工智能大会看点速览',
  '企业安全：AWS Continuum 把漏洞处理做成 Agent 工作流',
  '企业知识助手：AWS Context / NVIDIA Nemotron 的共同方向',
  '## 今日结论',
  '## 明日跟踪点',
  '## 证据矩阵',
  '来源条目 5：中国侧：新华网发布 2026 世界人工智能大会看点速览',
];

export const caseLevelFaqSignals = [
  {
    label: 'AWS Continuum security agent workflow',
    practicalCaseMatchTerms: ['AWS Continuum 把漏洞处理做成 Agent 工作流', '权限边界'],
    sourceStoryMatchTerms: ['AWS Continuum', '安全漏洞', 'Bedrock AgentCore'],
    requiredTerms: ['AWS Continuum security agent workflow', 'review logs', 'rollback'],
    links: ['/en/blog/openclaw-vps-deployment-complete-guide/', '/en/blog/openclaw-model-fallback-strategy/'],
  },
  {
    label: 'open model ownership evaluation loop',
    practicalCaseMatchTerms: ['NVIDIA Nemotron', '私有评测和定制'],
    sourceStoryMatchTerms: ['Nemotron Labs', '私有评测', '后训练'],
    requiredTerms: ['open model ownership evaluation loop', 'private benchmarks', 'auditability'],
    links: ['/en/blog/agentic-engineering-guide/', '/en/blog/openclaw-model-fallback-strategy/'],
  },
];

export const parserGuardrails = {
  story1RequiredDetailTokens: ['AWS Continuum', 'AWS Context', 'Bedrock AgentCore', '安全漏洞', '企业数据上下文'],
  story1ForbiddenDetailTokens: ['GPT-5.6', 'Nemotron Labs', '每瓦性能'],
  story2RequiredDetailTokens: ['GPT-5.6 Sol', 'Terra', 'Luna', 'Prompt 缓存'],
  story2ForbiddenDetailTokens: ['GPT-5.5', 'Codex available', 'MLPerf'],
  story3RequiredDetailTokens: ['Nemotron Labs', '私有评测', '后训练'],
  story3ForbiddenDetailTokens: ['Cadence', 'Dassault', 'LangChain Deep Agents'],
  story4RequiredDetailTokens: ['每瓦性能', 'Blackwell NVL72', 'GB300', 'Vera Rubin'],
  story4ForbiddenDetailTokens: ['MLPerf Training 6.0', '8192-GPU'],
  story5RequiredDetailTokens: ['看点速览', '图片/视觉内容', 'WAIC'],
  story5ForbiddenDetailTokens: ['6,000 AI companies', '1.2 trillion yuan', '超 300 款'],
};
