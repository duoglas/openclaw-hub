export const fixtureDate = '2026-07-31';

export const realCronFixture = `《AI、科技日报》  
2026-07-31 早报

## 今日要闻（5条）

1. NVIDIA 推出开源 GPU 加速医疗物理仿真框架

发生了什么：  
NVIDIA 宣布在 Isaac for Healthcare 中开源 Medical Physics Simulation，用于医疗机器人训练、测试和仿真。

为什么重要：  
医疗机器人最大瓶颈之一是高质量训练数据少、真实测试成本高。仿真能提前覆盖罕见场景、器械接触、组织变形、影像噪声等复杂情况。

可能影响：  
医疗机器人、手术辅助、医疗 AI 研发会更依赖“先仿真、后实测”。但后续仍要面对监管、临床验证和数据合规。

2. WAIC 专家强调智能体安全评估与运行期审计

发生了什么：  
新华社报道，WAIC 2026 专家把智能体安全作为重点，从关注“AI 说什么”转向关注“AI 会做什么”，并提到前沿 AI 风险监测平台、测评基准、运行期审计和实时响应能力。

为什么重要：  
智能体可以调用工具、访问系统并执行任务，安全失败会变成权限、流程和真实世界动作失败，而不只是回答错误。

可能影响：  
企业部署智能体时，需要身份校验、权限范围、行为日志、运行期异常监测、事件响应和敏感动作人工确认。

3. NVIDIA Jetson 继续推进边缘 AI / 机器人开发生态

发生了什么：  
NVIDIA 官方介绍 Jetson 平台在边缘 AI、机器人、教学和研究场景中的应用，强调 Jetson Orin Nano Super 等开发套件可支持视觉、智能体和机器人原型。

为什么重要：  
AI 不只在云端。机器人、无人设备、工业视觉、实验室项目都需要本地低延迟推理能力。

可能影响：  
边缘 AI 开发门槛继续下降。普通开发者、小团队和学校更容易做真实世界机器人原型，但算力、功耗和软件栈仍是落地关键。

4. 中国 AI 剧集登上电视“大屏”，AIGC 内容进入主流媒介试验期

发生了什么：  
新华网报道，继多部 AI 短剧后，安徽卫视开播全 AI 非遗题材剧《桃花潭记》，并明确标注“AI 制作”“AIGC 导演”。

为什么重要：  
AI 视频从短视频平台走向电视台，说明 AIGC 内容正在被主流媒介试水。但报道也指出，剧情、画面、表演、版权和演员权益仍有明显争议。

可能影响：  
文旅宣传、低成本短剧、地方文化内容可能率先拥抱 AIGC。真正替代传统影视还早，短期更像“人机协同制作工具”。

5. 工信部推动“小快轻准”数字化产品，强调 AI 赋能中小企业

发生了什么：  
新华网报道，工信部近日印发《“小快轻准”数字化产品和服务培育指引（2026年版）》，提出小型化、快速化、轻量化、精准化、数智化等方向。

为什么重要：  
这类政策核心不是大模型炫技，而是让中小企业用得起、上手快、能量化收益的数字化 / AI 工具。

可能影响：  
面向中小企业的 AI SaaS、行业知识库、智能客服、生产管理、数据分析产品会获得更多政策空间。产品如果部署重、价格高、效果难量化，会更难进入这个市场。

## 实战案例（2个）

1. 医疗机器人研发用仿真替代部分真实试错

可怎么用：  
先在虚拟环境里模拟导管、组织、影像和机器人策略，再进入硬件和临床前测试。

注意：  
仿真是研发效率工具，不等于临床安全已经被证明，仍要监管、临床验证和人工复核。

2. AI 剧集上电视，证明 AIGC 内容开始被严肃渠道测试

可怎么用：  
地方文旅短片、非遗传播、低成本宣传片和教育内容可以先用 AIGC 做草稿、分镜和版本测试。

注意：  
需要保留人工编辑、版权清理、来源标注和演员权益审查。
`;

export const expectedSignals = [
  { title: 'NVIDIA 推出开源 GPU 加速医疗物理仿真框架', sourceProjectionRuleMatches: ['nvidia-icra-sim-to-real'], enLabel: 'NVIDIA / Isaac for Healthcare / medical robotics simulation', zhEvidence: '来源条目 1：NVIDIA 推出开源 GPU 加速医疗物理仿真框架', requiredTokens: ['Isaac for Healthcare', 'Medical Physics Simulation', '医疗机器人'] },
  { title: 'WAIC 专家强调智能体安全评估与运行期审计', sourceProjectionRuleMatches: ['china-waic-agent-safety-evaluation-2026'], enLabel: 'China / WAIC / agent safety evaluation', zhEvidence: '来源条目 2：WAIC 专家强调智能体安全评估与运行期审计', requiredTokens: ['智能体安全', '测评基准', '运行期审计'] },
  { title: 'NVIDIA Jetson 继续推进边缘 AI / 机器人开发生态', sourceProjectionRuleMatches: ['nvidia-physical-ai-agent-skills-2026'], enLabel: 'NVIDIA / Jetson / Orin / edge AI robotics developer kit', zhEvidence: '来源条目 3：NVIDIA Jetson 继续推进边缘 AI / 机器人开发生态', requiredTokens: ['Jetson Orin Nano Super', '边缘 AI', '机器人原型'] },
  { title: '中国 AI 剧集登上电视“大屏”，AIGC 内容进入主流媒介试验期', sourceProjectionRuleMatches: ['xinhua-ai-fiction-character-conservatism-2026'], enLabel: 'China / AIGC TV drama / copyright and provenance risk', zhEvidence: '来源条目 4：中国 AI 剧集登上电视“大屏”，AIGC 内容进入主流媒介试验期', requiredTokens: ['桃花潭记', 'AI 制作', 'AIGC 导演'] },
  { title: '工信部推动“小快轻准”数字化产品，强调 AI 赋能中小企业', sourceProjectionRuleMatches: ['china-vertical-industry-ai-scale-deployment-2026'], enLabel: 'China / MIIT / SME digital AI enablement', zhEvidence: '来源条目 5：工信部推动“小快轻准”数字化产品，强调 AI 赋能中小企业', requiredTokens: ['小快轻准', '数智化', '中小企业'] },
];

export const bannedFallbackPhrases = [
  'The source tracks model capability update',
  'The source tracks AI chip supply',
  'The source tracks AI hardware',
  'giving the daily brief a named actor and deployment context',
  'buyers must check access control, infrastructure availability, operational risk',
  'today AI / technology daily not generated',
  '今日 AI / 科技日报暂未生成',
  '-…',
  '...',
];

export const requiredEnglishOutputs = [
  '### 1. NVIDIA / Isaac for Healthcare / medical robotics simulation',
  '### 2. China / WAIC / agent safety evaluation',
  '### 3. NVIDIA / Jetson / Orin / edge AI robotics developer kit',
  '### 4. China / AIGC TV drama / copyright and provenance risk',
  '### 5. China / MIIT / SME digital AI enablement',
  'Evidence item 1: NVIDIA / Isaac for Healthcare / medical robotics simulation',
  'Evidence item 5: China / MIIT / SME digital AI enablement',
  '## Today’s Bottom Line',
  '## What to Watch Tomorrow',
  '## Evidence Matrix',
];

export const requiredZhOutputs = [
  'NVIDIA 推出开源 GPU 加速医疗物理仿真框架',
  'WAIC 专家强调智能体安全评估与运行期审计',
  'NVIDIA Jetson 继续推进边缘 AI / 机器人开发生态',
  '中国 AI 剧集登上电视“大屏”，AIGC 内容进入主流媒介试验期',
  '工信部推动“小快轻准”数字化产品，强调 AI 赋能中小企业',
  '医疗机器人研发用仿真替代部分真实试错',
  'AI 剧集上电视，证明 AIGC 内容开始被严肃渠道测试',
  '## 今日结论',
  '## 明日跟踪点',
  '## 证据矩阵',
  '来源条目 1：NVIDIA 推出开源 GPU 加速医疗物理仿真框架',
  '来源条目 5：工信部推动“小快轻准”数字化产品，强调 AI 赋能中小企业',
];

export const caseLevelFaqSignals = [
  {
    label: 'Medical robotics simulation validation',
    practicalCaseMatchTerms: ['医疗机器人', '虚拟环境', '导管', '临床安全'],
    sourceStoryMatchTerms: ['Isaac for Healthcare', 'Medical Physics Simulation', '医疗机器人'],
    requiredTerms: ['simulation fidelity', 'clinical validation', 'human review'],
    links: ['/en/blog/openclaw-model-fallback-strategy/', '/en/blog/openclaw-security-hardening-2026/'],
  },
  {
    label: 'AIGC TV drama provenance and rights review',
    practicalCaseMatchTerms: ['AI 剧集', '文旅', '版权', '演员权益'],
    sourceStoryMatchTerms: ['Peach Blossom Pond', 'AI-made', 'AIGC-directed'],
    requiredTerms: ['provenance labels', 'rights clearance', 'human editorial review'],
    links: ['/en/blog/openclaw-security-hardening-2026/', '/en/blog/what-is-openclaw/'],
  },
];

export const parserGuardrails = {
  story1RequiredDetailTokens: ['Isaac for Healthcare', 'Medical Physics Simulation', '医疗机器人'],
  story1ForbiddenDetailTokens: ['运行期审计', 'Jetson Orin Nano Super', '桃花潭记'],
  story2RequiredDetailTokens: ['智能体安全', '测评基准', '运行期审计'],
  story2ForbiddenDetailTokens: ['Medical Physics Simulation', 'Jetson Orin Nano Super', '桃花潭记'],
  story3RequiredDetailTokens: ['Jetson Orin Nano Super', '边缘 AI', '机器人原型'],
  story3ForbiddenDetailTokens: ['Medical Physics Simulation', '运行期审计', '桃花潭记'],
  story4RequiredDetailTokens: ['桃花潭记', 'AI 制作', 'AIGC 导演'],
  story4ForbiddenDetailTokens: ['Medical Physics Simulation', '运行期审计', 'Jetson Orin Nano Super'],
  story5RequiredDetailTokens: ['小快轻准', '数智化', '中小企业'],
  story5ForbiddenDetailTokens: ['Medical Physics Simulation', '运行期审计', '桃花潭记'],
};
