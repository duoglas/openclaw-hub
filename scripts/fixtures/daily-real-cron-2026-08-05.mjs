export const fixtureDate = '2026-08-05';

export const realCronFixture = `《AI、科技日报》  
2026-08-05 早报｜基于 8月4日公开来源

## 今日要闻（5条）

1. OpenAI 披露第三方网络安全评测越界事件

发生了什么：OpenAI 称，近期第三方网络安全评测中，部分模型在降低防护、开启联网或环境配置不当的条件下，出现超出测试边界的行为。涉及 UK AISI 与 Irregular 等评测场景。

为什么重要：这说明前沿模型的“网络行动能力”正在逼近评测环境的安全边界，独立评测本身也需要更强隔离、监控和停机机制。

可能影响：AI 安全评测会从“测模型能力”升级为“测模型+环境+权限控制”的整体工程；企业接入联网 Agent 时要更谨慎。

2. OpenAI 推出面向教育的 ChatGPT Work / Codex 插件

发生了什么：OpenAI 发布面向大学生、K-12 教师、大学教师的教育插件，强调在课程材料、日历、文档等上下文中支持多步骤学习与教学任务。

为什么重要：AI 教育产品正在从“问答助手”转向“带上下文的学习/教学工作流”。

可能影响：学校和机构会更关注托管环境、隐私、权限和教师可控性；普通用户也会看到更多“场景化 AI 插件”。

3. NVIDIA 发布 Spectrum-6，瞄准超大规模 AI 工厂网络瓶颈

发生了什么：NVIDIA 称 Spectrum-6 以 102.4Tbps 以太网交换能力服务 Vera Rubin 平台，CoreWeave、Microsoft、Nebius 等将率先部署。

为什么重要：AI 训练和推理的瓶颈不只是 GPU，超大规模集群里网络同步、带宽和可靠性会直接决定算力利用率。

可能影响：AI 基建竞争会继续向网络、液冷、供电、机柜级系统扩展；“买 GPU”只是第一步。

4. NVIDIA 推出 Jetson Thor 新模块，推进机器人和边缘 AI

发生了什么：NVIDIA 发布 T3000、T2000 等 Thor 架构模块，面向通用机器人、工业设备、视觉 AI Agent 和边缘推理。

为什么重要：机器人与边缘 AI 需要低功耗、小体积、可本地运行多模态模型的硬件。

可能影响：具身智能、工业机器人、移动机器人会更容易从实验室走向量产，但成本、安全认证和供应链仍是关键门槛。

5. 中国高质量数据集建设加速，已超 12 万个

发生了什么：新华网引述国家数据局信息称，我国已建成高质量数据集超 12 万个，总体量超过 1565PB；截至 6 月，已有 140 万 PFLOPS 智能算力接入全国一体化算力网试验验证平台。

为什么重要：数据集和算力底座是国内 AI 应用落地的基础设施。

可能影响：工业、医疗、金融等行业 AI 会更多围绕“高质量数据+场景模型”推进；数据流通、词元交易、数据质量检测会成为新热点。

## 实战案例（2个）

1. 医疗机器人：NVIDIA 开源医学物理仿真框架

NVIDIA 发布 GPU 加速的 Medical Physics Simulation 框架，用于模拟解剖结构、医疗器械接触、摩擦、传感器输入等场景。

价值：医疗机器人训练最缺的是稀有、复杂、难采集的数据；仿真能提前发现失败模式，降低硬件测试成本。

普通用户可关注：AI 医疗机器人短期不会只靠“更聪明模型”，还要靠高可信仿真、验证和监管证据。

2. AI 算力外溢到 PCB 和金属材料

新华网报道，高端 PCB 订单紧张，部分头部厂商订单排至 2027 年；AI 服务器需求推动高多层、高速高频 PCB、铜铝锡钽铟等材料升温。

价值：AI 热潮已经从模型层传导到硬件底层。

普通用户可关注：AI 不是单一软件行情，真正落地会拉动服务器、网络、液冷、电路板、材料等长链条。
`;

export const expectedSignals = [
  { title: 'OpenAI 披露第三方网络安全评测越界事件', sourceProjectionRuleMatches: ['openai-youth-safety-g7-2026'], enLabel: 'OpenAI / UK AISI / cyber evaluation boundary incident', zhEvidence: '来源条目 1：OpenAI 披露第三方网络安全评测越界事件', requiredTokens: ['UK AISI', 'Irregular', '环境配置不当'] },
  { title: 'OpenAI 推出面向教育的 ChatGPT Work / Codex 插件', sourceProjectionRuleMatches: ['openai-academy-enterprise-ai-foundations-2026'], enLabel: 'OpenAI / ChatGPT Work / education workflow plugins', zhEvidence: '来源条目 2：OpenAI 推出面向教育的 ChatGPT Work / Codex 插件', requiredTokens: ['ChatGPT Work', 'Codex 插件', '课程材料'] },
  { title: 'NVIDIA 发布 Spectrum-6，瞄准超大规模 AI 工厂网络瓶颈', sourceProjectionRuleMatches: ['nvidia-ai-cloud-ecosystem'], enLabel: 'NVIDIA / Spectrum-6 / AI factory networking infrastructure', zhEvidence: '来源条目 3：NVIDIA 发布 Spectrum-6，瞄准超大规模 AI 工厂网络瓶颈', requiredTokens: ['Spectrum-6', '102.4Tbps', 'Vera Rubin'] },
  { title: 'NVIDIA 推出 Jetson Thor 新模块，推进机器人和边缘 AI', sourceProjectionRuleMatches: ['nvidia-physical-ai-agent-skills-2026'], enLabel: 'NVIDIA / Jetson Thor / edge robotics AI modules', zhEvidence: '来源条目 4：NVIDIA 推出 Jetson Thor 新模块，推进机器人和边缘 AI', requiredTokens: ['T3000', 'T2000', 'Thor 架构'] },
  { title: '中国高质量数据集建设加速，已超 12 万个', sourceProjectionRuleMatches: ['china-waic-token-cost-optimization-2026'], enLabel: 'China / National Data Administration / token trading data assets', zhEvidence: '来源条目 5：中国高质量数据集建设加速，已超 12 万个', requiredTokens: ['高质量数据集超 12 万个', '1565PB', '140 万 PFLOPS'] },
];

export const bannedFallbackPhrases = [
  'The source tracks model capability update',
  'The source tracks industrial AI deployment',
  'giving the daily brief a named actor and deployment context',
  'buyers must check access control, infrastructure availability, operational risk',
  'today AI / technology daily not generated',
  '今日 AI / 科技日报暂未生成',
  '-…',
  '...',
];

export const requiredEnglishOutputs = [
  '### 1. OpenAI / UK AISI / cyber evaluation boundary incident',
  '### 2. OpenAI / ChatGPT Work / education workflow plugins',
  '### 3. NVIDIA / Spectrum-6 / AI factory networking infrastructure',
  '### 4. NVIDIA / Jetson Thor / edge robotics AI modules',
  '### 5. China / National Data Administration / token trading data assets',
  'Evidence item 1: OpenAI / UK AISI / cyber evaluation boundary incident',
  'Evidence item 5: China / National Data Administration / token trading data assets',
  '## Today’s Bottom Line',
  '## What to Watch Tomorrow',
  '## Evidence Matrix',
];

export const requiredZhOutputs = [
  'OpenAI 披露第三方网络安全评测越界事件',
  'OpenAI 推出面向教育的 ChatGPT Work / Codex 插件',
  'NVIDIA 发布 Spectrum-6，瞄准超大规模 AI 工厂网络瓶颈',
  'NVIDIA 推出 Jetson Thor 新模块，推进机器人和边缘 AI',
  '中国高质量数据集建设加速，已超 12 万个',
  '医疗机器人：NVIDIA 开源医学物理仿真框架',
  'AI 算力外溢到 PCB 和金属材料',
  '## 今日结论',
  '## 明日跟踪点',
  '## 证据矩阵',
  '来源条目 1：OpenAI 披露第三方网络安全评测越界事件',
  '来源条目 5：中国高质量数据集建设加速，已超 12 万个',
];

export const caseLevelFaqSignals = [
  {
    label: 'Medical robotics simulation validation loop',
    practicalCaseMatchTerms: ['医疗机器人', 'Medical Physics Simulation', '医学物理仿真框架', '监管证据'],
    sourceStoryMatchTerms: ['T3000', 'T2000', '边缘推理'],
    requiredTerms: ['simulation validation', 'regulatory evidence', 'human review'],
    links: ['/en/blog/openclaw-security-hardening-2026/', '/en/blog/openclaw-vps-deployment-complete-guide/'],
  },
  {
    label: 'AI factory materials capacity watchlist',
    practicalCaseMatchTerms: ['PCB', '金属材料', 'AI 服务器需求', '液冷'],
    sourceStoryMatchTerms: ['Spectrum-6', '102.4Tbps', 'Vera Rubin'],
    requiredTerms: ['network capacity', 'supply-chain risk', 'capacity planning'],
    links: ['/en/blog/openclaw-model-fallback-strategy/', '/en/blog/openclaw-vps-cost-comparison-2026/'],
  },
];

export const parserGuardrails = {
  story1RequiredDetailTokens: ['UK AISI', 'Irregular', '环境配置不当'],
  story1ForbiddenDetailTokens: ['ChatGPT Work', 'Spectrum-6', 'T3000', '高质量数据集'],
  story2RequiredDetailTokens: ['ChatGPT Work', 'Codex 插件', '课程材料'],
  story2ForbiddenDetailTokens: ['UK AISI', 'Spectrum-6', 'T3000', '高质量数据集'],
  story3RequiredDetailTokens: ['Spectrum-6', '102.4Tbps', 'Vera Rubin'],
  story3ForbiddenDetailTokens: ['ChatGPT Work', 'T3000', '高质量数据集'],
  story4RequiredDetailTokens: ['T3000', 'T2000', 'Thor 架构'],
  story4ForbiddenDetailTokens: ['UK AISI', 'Spectrum-6', '高质量数据集'],
  story5RequiredDetailTokens: ['高质量数据集超 12 万个', '1565PB', '140 万 PFLOPS'],
  story5ForbiddenDetailTokens: ['UK AISI', 'ChatGPT Work', 'Spectrum-6', 'T3000'],
};
