export const fixtureDate = '2026-08-14';

export const realCronFixture = `《AI、科技日报》  
2026-08-14 早报

## 今日要闻（5条）

1. NVIDIA 开放 Alpamayo 2 Super，用于 Robotaxi / 自动驾驶商业开发  
发生了什么：NVIDIA 发布 Alpamayo 2 Super，面向自动驾驶推理，已可商用，并放到 Hugging Face；它能输出轨迹、因果推理链、元动作、自动标注和视觉问答。  
为什么重要：自动驾驶从“感知模型”进一步走向“可解释推理模型”，车企和供应商可以基于开放模型做私有数据微调。  
可能影响：Robotaxi、L4 卡车、自动驾驶数据标注会更快降本；但安全验证和真实道路责任仍是关键门槛。  
状态：已确认，L1 官方直抓。

2. NVIDIA 推出 Spectrum-6，以网络能力支撑超大规模 AI 工厂  
发生了什么：NVIDIA 称 Spectrum-6 以 102.4Tbps 交换能力进入全球 gigascale AI factory 场景，CoreWeave、Microsoft、Nebius、OCI、Tesla 等将率先采用。  
为什么重要：大模型训练和推理瓶颈不只在 GPU，也在 GPU 集群之间的网络同步。  
可能影响：云厂商会继续围绕“AI 工厂”竞争，未来算力成本会更多取决于整机柜、网络、散热和调度效率，而不是单卡性能。  
状态：已确认，L1 官方直抓。

3. NVIDIA 强调 Robotaxi 安全体系：安全 OS、接口、AI 护栏、规模化验证  
发生了什么：NVIDIA 在 Halos OS 文章中提出，Robotaxi 安全不能只看模型能力，还要有可认证 OS、标准化接口、AI 安全护栏和仿真验证框架。  
为什么重要：自动驾驶商业化进入监管深水区，“能跑”不够，必须能证明系统在故障下可靠。  
可能影响：Robotaxi 平台会更重视全栈安全认证；单纯模型能力强但缺少工程安全体系的方案会更难进入规模部署。  
状态：已确认，L1 官方直抓。

4. 中国智驾进入“标准化、安全化”阶段，L2 渗透率已破七成  
发生了什么：新华网报道，《智能网联汽车 自动驾驶系统安全要求》（GB 44721—2026）已发布，拟于 2027 年 7 月 1 日实施；报道同时提到 L2 级组合驾驶辅助乘用车渗透率达到 70.5%，NOA 渗透率 34.2%。  
为什么重要：中国智能驾驶正在从“有没有功能”转向“好不好用、敢不敢用、谁负责”。  
可能影响：L3/L4 准入、责任认定、保险产品和 Robotaxi 商业化会成为下一阶段重点。  
状态：已确认，L2 权威媒体直抓。

5. 中国多地加速“AI + 制造 / 机器人 / 光电”产业落地  
发生了什么：新华网报道浙江数控机床、宁波精密光学、苏州光子产业、合肥具身智能机器人训练场等案例，显示中国智造正在从单点技术突破转向产业链协同。  
为什么重要：AI 产业化不只在大模型 App，也在工业母机、机器人训练、光电芯片、智能制造。  
可能影响：地方产业集群和专精特新企业会继续吃到“AI + 实体制造”的政策与订单红利。  
状态：已确认，L2 权威媒体直抓。

## 实战案例

1. 自动驾驶训练：从“人工标注”走向“模型自动生成推理数据”  
NVIDIA Alpamayo 2 Super 可作为自动标注器，把车队采集的视频转成因果推理链、视觉问答和轨迹训练数据。  
实际价值：  
- 标注周期可能从月级压缩到天级；  
- 车企能用自有车队数据训练专属模型；  
- 自动驾驶研发更像“数据闭环 + 模型蒸馏 + 安全验证”的系统工程。

2. 普通用户侧：ChatGPT 模型选择器继续简化  
OpenAI 帮助中心显示，ChatGPT 模型选择器已调整为 Instant、Medium、High、Extra High、Pro Standard、Pro Extended 等更直观选项。  
实际价值：  
- 普通用户不用记模型名，按“速度 / 推理强度”选即可；  
- 写作、总结、翻译用 Instant / Medium；  
- 复杂规划、代码审查、长推理任务再切 High 以上。  
备注：该条不是今日新闻，作为产品实战参考。
`;

export const expectedSignals = [
  { title: 'NVIDIA 开放 Alpamayo 2 Super，用于 Robotaxi / 自动驾驶商业开发', sourceProjectionRuleMatches: ['nvidia-physical-ai-agent-skills-2026'], enLabel: 'NVIDIA / Alpamayo 2 Super / autonomous driving model', zhEvidence: '来源条目 1：NVIDIA 开放 Alpamayo 2 Super，用于 Robotaxi / 自动驾驶商业开发', requiredTokens: ['Alpamayo 2 Super', 'Robotaxi', '自动驾驶', 'Hugging Face', '轨迹', '因果推理链', '视觉问答'] },
  { title: 'NVIDIA 推出 Spectrum-6，以网络能力支撑超大规模 AI 工厂', sourceProjectionRuleMatches: ['nvidia-ai-cloud-ecosystem'], enLabel: 'NVIDIA / Spectrum-6 / AI factory networking infrastructure', zhEvidence: '来源条目 2：NVIDIA 推出 Spectrum-6，以网络能力支撑超大规模 AI 工厂', requiredTokens: ['Spectrum-6', '102.4Tbps', 'AI factory', 'CoreWeave', 'Microsoft', 'Nebius', 'OCI', 'Tesla'] },
  { title: 'NVIDIA 强调 Robotaxi 安全体系：安全 OS、接口、AI 护栏、规模化验证', sourceProjectionRuleMatches: ['nvidia-drive-hyperion-robotaxi-2026'], enLabel: 'NVIDIA / Halos OS / robotaxi safety stack', zhEvidence: '来源条目 3：NVIDIA 强调 Robotaxi 安全体系：安全 OS、接口、AI 护栏、规模化验证', requiredTokens: ['Robotaxi', 'Halos OS', '安全 OS', '标准化接口', 'AI 安全护栏', '仿真验证'] },
  { title: '中国智驾进入“标准化、安全化”阶段，L2 渗透率已破七成', sourceProjectionRuleMatches: ['china-ai-metrology-guide'], enLabel: 'China / MIIT / GB 44721 autonomous driving safety standard', zhEvidence: '来源条目 4：中国智驾进入“标准化、安全化”阶段，L2 渗透率已破七成', requiredTokens: ['GB 44721—2026', '2027 年 7 月 1 日', 'L2', '70.5%', 'NOA', '34.2%'] },
  { title: '中国多地加速“AI + 制造 / 机器人 / 光电”产业落地', sourceProjectionRuleMatches: ['china-vertical-industry-ai-scale-deployment-2026'], enLabel: 'China / Xinhua / AI manufacturing robotics photonics deployment', zhEvidence: '来源条目 5：中国多地加速“AI + 制造 / 机器人 / 光电”产业落地', requiredTokens: ['浙江数控机床', '宁波精密光学', '苏州光子产业', '合肥具身智能机器人训练场', '智能制造'] },
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
  '### 1. NVIDIA / Alpamayo 2 Super / autonomous driving model',
  '### 2. NVIDIA / Spectrum-6 / AI factory networking infrastructure',
  '### 3. NVIDIA / Halos OS / robotaxi safety stack',
  '### 4. China / MIIT / GB 44721 autonomous driving safety standard',
  '### 5. China / Xinhua / AI manufacturing robotics photonics deployment',
  'Evidence item 1: NVIDIA / Alpamayo 2 Super / autonomous driving model',
  'Evidence item 5: China / Xinhua / AI manufacturing robotics photonics deployment',
  '## Case-Level FAQ',
  '## Today’s Bottom Line',
  '## What to Watch Tomorrow',
  '## Evidence Matrix',
];

export const requiredZhOutputs = [
  'NVIDIA 开放 Alpamayo 2 Super，用于 Robotaxi / 自动驾驶商业开发',
  'NVIDIA 推出 Spectrum-6，以网络能力支撑超大规模 AI 工厂',
  'NVIDIA 强调 Robotaxi 安全体系：安全 OS、接口、AI 护栏、规模化验证',
  '中国智驾进入“标准化、安全化”阶段，L2 渗透率已破七成',
  '中国多地加速“AI + 制造 / 机器人 / 光电”产业落地',
  '自动驾驶训练：从“人工标注”走向“模型自动生成推理数据”',
  '普通用户侧：ChatGPT 模型选择器继续简化',
  '## 今日结论',
  '## 明日跟踪点',
  '## 证据矩阵',
  '来源条目 1：NVIDIA 开放 Alpamayo 2 Super，用于 Robotaxi / 自动驾驶商业开发',
  '来源条目 5：中国多地加速“AI + 制造 / 机器人 / 光电”产业落地',
];

export const caseLevelFaqSignals = [
  {
    label: 'Alpamayo autonomous-driving reasoning validation',
    practicalCaseMatchTerms: ['自动驾驶训练', '模型自动生成推理数据'],
    sourceStoryMatchTerms: ['Alpamayo 2 Super', 'Robotaxi', 'Hugging Face'],
    requiredTerms: ['commercial license', 'reasoning trace', 'distillation', 'safety case', 'edge deployment'],
    links: ['/en/blog/openclaw-model-fallback-strategy/', '/en/blog/openclaw-security-hardening-2026/'],
  },
  {
    label: 'Spectrum-6 AI factory network capacity planning',
    sourceStoryMatchTerms: ['Spectrum-6', '102.4Tbps', 'CoreWeave'],
    requiredTerms: ['network bandwidth', 'congestion control', 'power envelope', 'rack-scale', 'utilization'],
    links: ['/en/blog/openclaw-vps-cost-comparison-2026/', '/en/blog/openclaw-systemd-service-crash-recovery-monitoring/'],
  },
  {
    label: 'Robotaxi safety stack rollout checklist',
    sourceStoryMatchTerms: ['Halos OS', 'Robotaxi', 'AI 安全护栏'],
    requiredTerms: ['certified OS', 'standard interface', 'simulation validation', 'audit trail', 'failure mode'],
    links: ['/en/blog/openclaw-security-hardening-2026/'],
  },
  {
    label: 'ChatGPT model picker simplification reference',
    practicalCaseMatchTerms: ['普通用户侧：ChatGPT 模型选择器继续简化', 'ChatGPT 模型选择器'],
    sourceStoryMatchTerms: ['Alpamayo 2 Super'],
    requiredTerms: ['Instant', 'Medium', 'High', 'cost', 'latency'],
    links: ['/en/blog/openclaw-ai-writing-workflow/', '/en/blog/openclaw-model-fallback-strategy/'],
  },
];

export const parserGuardrails = {
  story1RequiredDetailTokens: ['Alpamayo 2 Super', 'Robotaxi', '自动驾驶', 'Hugging Face', '轨迹', '因果推理链', '视觉问答'],
  story1ForbiddenDetailTokens: ['Spectrum-6', 'Halos OS', 'GB 44721', '浙江数控机床'],
  story2RequiredDetailTokens: ['Spectrum-6', '102.4Tbps', 'AI factory', 'CoreWeave', 'Microsoft', 'Nebius', 'OCI', 'Tesla'],
  story2ForbiddenDetailTokens: ['Alpamayo 2 Super', 'Halos OS', 'GB 44721', '浙江数控机床'],
  story3RequiredDetailTokens: ['Robotaxi', 'Halos OS', '安全 OS', '标准化接口', 'AI 安全护栏', '仿真验证'],
  story3ForbiddenDetailTokens: ['Alpamayo 2 Super', 'Spectrum-6', 'GB 44721', '浙江数控机床'],
  story4RequiredDetailTokens: ['GB 44721—2026', '2027 年 7 月 1 日', 'L2', '70.5%', 'NOA', '34.2%'],
  story4ForbiddenDetailTokens: ['Alpamayo 2 Super', 'Spectrum-6', 'Halos OS', '浙江数控机床'],
  story5RequiredDetailTokens: ['浙江数控机床', '宁波精密光学', '苏州光子产业', '合肥具身智能机器人训练场', '智能制造'],
  story5ForbiddenDetailTokens: ['Alpamayo 2 Super', 'Spectrum-6', 'Halos OS', 'GB 44721'],
};
