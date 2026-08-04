export const fixtureDate = '2026-08-04';

export const realCronFixture = `《AI、科技日报》  
2026-08-04 早间版

## 今日要闻（5条）

1. NVIDIA 推动 Open Secure AI Alliance：AI 安全从“闭源防御”转向“开放防御栈”

发生了什么：NVIDIA 官方博客称，Open Secure AI Alliance 将围绕开放模型、开放 agent harness、安全工具、漏洞披露与修复协作，建设 AI 时代的网络防御与开放防御技术栈。

为什么重要：AI agent 不只是模型，还包括身份、权限、日志、评测、隔离和执行环境。行业开始把“agent 安全栈”当成基础设施，而不是单点模型能力。

可能影响：企业部署 AI agent 时，安全采购会从“买模型”转向“买可审计、可追踪、可控的 agent 平台”。开源安全组件的重要性会上升。

2. NVIDIA 把医疗机器人仿真框架开源：医疗 AI 更重视“先模拟、再上真机”

发生了什么：NVIDIA 宣布开源 GPU 加速的 Medical Physics Simulation 医疗物理仿真框架，属于 Isaac for Healthcare，用于模拟解剖结构、器械接触、传感器输入和机器人学习场景。

为什么重要：医疗机器人训练难点是现实数据稀缺、风险高、边缘案例难收集。仿真可提前发现失败模式，降低硬件测试和临床前验证成本。

可能影响：医疗机器人、手术机器人、导管导航等方向会更依赖合成数据和数字孪生。监管证据链也可能更多纳入仿真结果。

3. NVIDIA Jetson 继续强化边缘 AI：机器人能力向本地端下沉

发生了什么：NVIDIA 官方介绍 Jetson 平台用于边缘 AI 和机器人开发，包括 Jetson Orin Nano Super、AGX Orin、AGX Thor，并强调本地运行视觉、语音、VLM、机器人任务的能力。

为什么重要：AI 不只在云端。机器人、摄像头、工业设备、实验室设备需要低延迟、本地推理和离线可用能力。

可能影响：普通开发者和学校实验室会更容易做物理 AI 原型。边缘设备会成为 AI 应用落地的重要入口。

4. Anthropic 近期恢复 Fable 5，并推动 jailbreak 严重度评分框架

发生了什么：Anthropic 新闻页显示，Fable 5 于 7 月 1 日全球恢复；同时 Anthropic 与 Amazon、Microsoft、Google 等合作方提出 jailbreak 严重度评分框架。

为什么重要：模型发布不只看能力，也看安全评估标准。jailbreak 风险如果能被统一分级，企业和监管更容易比较不同模型的实际风险。

可能影响：未来模型厂商发布新模型时，安全评测可能变得更标准化。企业选型会更关注“可量化安全分数”。

5. 中国应用侧：豆包、WorkBuddy 等 AI 产品继续测试商业化 ROI

发生了什么：中国媒体覆盖显示，豆包、WorkBuddy 等 AI 产品继续测试付费计划，同时办公、物流、消费电子和人形机器人等工作流更直接地接入 AI。

为什么重要：中国 AI 竞争正在从模型发布转向付费用户、嵌入式工作流、可衡量生产率和企业 ROI，模型能力本身的差异不再是唯一卖点。

可能影响：用户会看到更多订阅、使用量计费和嵌入式 AI 功能；企业买家会更重视工作流适配、数据安全、部署成本和可量化产出。

## 实战案例（2个）

1. 用 Jetson 做本地语音 + 视觉助手

NVIDIA 官方案例提到 Reachy Mini Jetson Assistant：在 Jetson Orin Nano Super 上运行低延迟、本地端语音和视觉能力。适合把语音命令、摄像头识别和简单机器人动作放在离线或低带宽环境里测试。

2. 把 agent 安全写成上线清单

Open Secure AI Alliance 与 WAIC agent safety 都指向同一个实践：上线 agent 前先定义身份、权限、日志、隔离、回滚和人工确认。不要只看模型回答质量，要看它能不能安全执行动作。
`;

export const expectedSignals = [
  { title: 'NVIDIA 推动 Open Secure AI Alliance：AI 安全从“闭源防御”转向“开放防御栈”', sourceProjectionRuleMatches: ['china-waic-agent-safety-evaluation-2026'], enLabel: 'NVIDIA / Open Secure AI Alliance / open AI security', zhEvidence: '来源条目 1：NVIDIA 推动 Open Secure AI Alliance：AI 安全从“闭源防御”转向“开放防御栈”', requiredTokens: ['Open Secure AI Alliance', '开放 agent harness', '网络防御'] },
  { title: 'NVIDIA 把医疗机器人仿真框架开源：医疗 AI 更重视“先模拟、再上真机”', sourceProjectionRuleMatches: ['nvidia-icra-sim-to-real'], enLabel: 'NVIDIA / Isaac for Healthcare / medical robotics simulation', zhEvidence: '来源条目 2：NVIDIA 把医疗机器人仿真框架开源：医疗 AI 更重视“先模拟、再上真机”', requiredTokens: ['Medical Physics Simulation', 'Isaac for Healthcare', '医疗机器人'] },
  { title: 'NVIDIA Jetson 继续强化边缘 AI：机器人能力向本地端下沉', sourceProjectionRuleMatches: ['nvidia-physical-ai-agent-skills-2026'], enLabel: 'NVIDIA / Jetson / Orin / edge AI robotics developer kit', zhEvidence: '来源条目 3：NVIDIA Jetson 继续强化边缘 AI：机器人能力向本地端下沉', requiredTokens: ['Jetson Orin Nano Super', 'AGX Orin', '本地推理'] },
  { title: 'Anthropic 近期恢复 Fable 5，并推动 jailbreak 严重度评分框架', sourceProjectionRuleMatches: ['anthropic-fable-jailbreak-severity-framework-2026'], enLabel: 'Anthropic / Claude Fable / jailbreak severity framework', zhEvidence: '来源条目 4：Anthropic 近期恢复 Fable 5，并推动 jailbreak 严重度评分框架', requiredTokens: ['Fable 5', 'jailbreak 严重度评分框架', 'Amazon'] },
  { title: '中国应用侧：豆包、WorkBuddy 等 AI 产品继续测试商业化 ROI', sourceProjectionRuleMatches: ['china-ai-commercialization-roi-2026'], enLabel: 'China / WorkBuddy / AI commercialization ROI', zhEvidence: '来源条目 5：中国应用侧：豆包、WorkBuddy 等 AI 产品继续测试商业化 ROI', requiredTokens: ['豆包', 'WorkBuddy', '付费计划'] },
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
  '### 1. NVIDIA / Open Secure AI Alliance / open AI security',
  '### 2. NVIDIA / Isaac for Healthcare / medical robotics simulation',
  '### 3. NVIDIA / Jetson / Orin / edge AI robotics developer kit',
  '### 4. Anthropic / Claude Fable / jailbreak severity framework',
  '### 5. China / WorkBuddy / AI commercialization ROI',
  'Evidence item 1: NVIDIA / Open Secure AI Alliance / open AI security',
  'Evidence item 5: China / WorkBuddy / AI commercialization ROI',
  '## Today’s Bottom Line',
  '## What to Watch Tomorrow',
  '## Evidence Matrix',
];

export const requiredZhOutputs = [
  'NVIDIA 推动 Open Secure AI Alliance：AI 安全从“闭源防御”转向“开放防御栈”',
  'NVIDIA 把医疗机器人仿真框架开源：医疗 AI 更重视“先模拟、再上真机”',
  'NVIDIA Jetson 继续强化边缘 AI：机器人能力向本地端下沉',
  'Anthropic 近期恢复 Fable 5，并推动 jailbreak 严重度评分框架',
  '中国应用侧：豆包、WorkBuddy 等 AI 产品继续测试商业化 ROI',
  '用 Jetson 做本地语音 + 视觉助手',
  '把 agent 安全写成上线清单',
  '## 今日结论',
  '## 明日跟踪点',
  '## 证据矩阵',
  '来源条目 1：NVIDIA 推动 Open Secure AI Alliance：AI 安全从“闭源防御”转向“开放防御栈”',
  '来源条目 5：中国应用侧：豆包、WorkBuddy 等 AI 产品继续测试商业化 ROI',
];

export const caseLevelFaqSignals = [
  {
    label: 'Edge robotics local assistant workflow',
    practicalCaseMatchTerms: ['用 Jetson', '本地语音', '视觉助手', 'Jetson Orin Nano Super', '本地端语音', '视觉能力'],
    sourceStoryMatchTerms: ['Jetson', 'AGX Orin', '本地推理'],
    requiredTerms: ['local inference', 'latency budget', 'safety fallback'],
    links: ['/en/blog/openclaw-vps-deployment-complete-guide/', '/en/blog/openclaw-security-hardening-2026/'],
  },
  {
    label: 'Agent safety launch checklist',
    practicalCaseMatchTerms: ['agent 安全', '上线清单', '身份', '权限', '日志', '人工确认'],
    sourceStoryMatchTerms: ['Open Secure AI Alliance', '开放 agent harness', '运行期审计'],
    requiredTerms: ['permission scope', 'audit log', 'human approval'],
    links: ['/en/blog/openclaw-security-hardening-2026/', '/en/blog/what-is-openclaw/'],
  },
];

export const parserGuardrails = {
  story1RequiredDetailTokens: ['Open Secure AI Alliance', '开放 agent harness', '网络防御'],
  story1ForbiddenDetailTokens: ['Medical Physics Simulation', 'Jetson Orin Nano Super', 'jailbreak 严重度评分框架', 'WorkBuddy'],
  story2RequiredDetailTokens: ['Medical Physics Simulation', 'Isaac for Healthcare', '医疗机器人'],
  story2ForbiddenDetailTokens: ['Open Secure AI Alliance', 'Jetson Orin Nano Super', 'Fable 5', 'WorkBuddy'],
  story3RequiredDetailTokens: ['Jetson Orin Nano Super', 'AGX Orin', '本地推理'],
  story3ForbiddenDetailTokens: ['Open Secure AI Alliance', 'Medical Physics Simulation', 'jailbreak 严重度评分框架', 'WorkBuddy'],
  story4RequiredDetailTokens: ['Fable 5', 'jailbreak 严重度评分框架', 'Amazon'],
  story4ForbiddenDetailTokens: ['Open Secure AI Alliance', 'Medical Physics Simulation', 'Jetson Orin Nano Super', 'WorkBuddy'],
  story5RequiredDetailTokens: ['豆包', 'WorkBuddy', '付费计划'],
  story5ForbiddenDetailTokens: ['Open Secure AI Alliance', 'Medical Physics Simulation', 'Jetson Orin Nano Super', 'Fable 5'],
};
