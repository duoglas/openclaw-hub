export const fixtureDate = '2026-06-11';

export const realCronFixture = `《AI、科技日报》
2026-06-11 早报

## 今日要闻（5条）

### 1. Google DeepMind 发布 DiffusionGemma，NVIDIA 同步做本地加速适配

发生了什么：  
Google DeepMind 发布实验性开放模型 DiffusionGemma。它不是传统逐 token 生成，而是用“扩散式文本生成”一次并行生成文本块。官方称在专用 GPU 上最高可实现约 4 倍更快推理。NVIDIA 同步宣布对 RTX、RTX PRO、DGX Spark、H100 等硬件做优化。

为什么重要：  
这不是单纯“又一个开源模型”，而是在探索 LLM 推理范式变化：从顺序生成，转向更适合本地低延迟交互的并行生成。

可能影响：  
本地 AI 助手、代码补全、交互式编辑、低并发个人智能体可能更快。  
但 Google 也明确说它是实验模型，质量不适合替代标准 Gemma 4 生产部署。

---

### 2. NVIDIA 扩大 DRIVE Hyperion 机器人出租车生态

发生了什么：  
NVIDIA 宣布 DRIVE Hyperion 机器人出租车平台生态扩展。涉及 Uber/Autobrains 在慕尼黑推进 robotaxi 项目，Foxconn 在台湾推进 L4-ready 车队，VinFast 面向东南亚，HUMAIN 面向沙特/中东。

为什么重要：  
自动驾驶从“技术展示”继续走向“平台化量产”。NVIDIA 试图把车端计算、传感器、安全 OS、仿真验证打包成统一底座。

可能影响：  
Robotaxi 的竞争焦点会从单车算法，转向“车厂 + 算力平台 + 出行网络 + 安全认证”的生态组合。普通用户短期不会立刻大规模坐上，但城市试点会继续增加。

---

### 3. OpenAI 简化 ChatGPT 模型选择器

发生了什么：  
OpenAI 在 ChatGPT 版本说明中更新模型选择方式：把模型选项简化成 Instant、Medium、High、Extra High、Pro Standard、Pro Extended 等，并在全球 Plus / Pro 用户的 Web、iOS、Android 推出。

为什么重要：  
普通用户不再需要理解复杂模型命名，而是按“速度 / 推理强度”选择。  
这说明 AI 产品正在从“模型炫技”转向“任务体验分层”。

可能影响：  
对普通用户：选择成本降低。  
对重度用户：不同推理档位会更清楚，但原有 Thinking Light 被移除，低成本轻推理选项减少。

---

### 4. 中国启动 2026 年度人形机器人与具身智能实景实训专项行动

发生了什么：  
据新华社报道，工信部、国务院国资委联合启动 2026 年度人形机器人与具身智能实景实训专项行动。目标是在真实生产生活环境中常态化部署、工程化验证、规模化落地。行动提出到 2026 年底，形成百个以上高价值应用场景，带动万台级规模落地能力。

为什么重要：  
中国人形机器人正在从“演示视频”转向“真实场景训练”。实景数据、场景适配、标准化实训空间，会成为产业落地关键。

可能影响：  
工业、仓储物流、医疗康养、应急救援、餐饮零售等场景会先试点。  
短期看，机器人公司会更重视真实客户场景，而不是只做发布会 Demo。

---

### 5. 工信部要求规范 App 信息窗口跳转，严禁诱导点击和“摇一摇”误跳

发生了什么：  
据新华社报道，工信部信息通信管理局召开专题会议，要求互联网平台和智能终端企业规范 App 信息窗口呈现方式，严禁违规弹窗、诱导点击、高灵敏度“摇一摇”触发跳转等行为。后续将开展常态化检测监测。

为什么重要：  
这直接针对电商促销季常见的弹窗广告、误触跳转和强干扰体验。

可能影响：  
普通用户手机体验可能改善。  
平台和 App 厂商需要重新审核开屏、弹窗、跳转链路；违规可能面临约谈、通报、下架等处置。

---

## 实战案例（1-2个）

### 案例 1：本地 AI 开发者可以关注 DiffusionGemma，但别急着替换主力模型

适合尝试：  
本地低延迟文本生成、交互式编辑、代码补全、实验性 Agent loop。

不适合：  
正式客服、严肃写作、质量要求高的生产系统。

建议：  
如果你有 RTX 4090 / 5090 或云端 H100，可以把它当成“速度型实验模型”测试。  
如果目标是稳定质量，继续用成熟自回归模型。

---

### 案例 2：人形机器人落地会先发生在“可标准化场景”

更可能先落地：  
仓储、巡检、检测、维修、安防、应急、康养辅助。

不太可能马上普及：  
家庭通用陪伴、完全开放环境中的复杂体力劳动，以及缺少明确 ROI 的消费级场景。

## 今日结论

- 最值得关注：企业级 AI 正在加速进入核心业务流程，AI 不再只是聊天工具，而是在进入税务、法务、制造、运维、推理服务等真实生产系统。
- 给普通用户建议：短期优先选择权限透明、可断开授权、有来源标注的 AI 产品，把它用于信息整理、学习复盘、日常文档和低风险决策辅助。
- 给团队建议：不要只比较模型榜单，先选一个高频流程做试点，并把权限、审计、成本和人工复核写进上线标准。

## 明日跟踪点

- 关注今日提到的模型、平台或硬件动态是否出现产品化细节。
- 关注企业案例是否披露真实使用场景、权限控制和成本变化。
- 关注政策、版权、数据安全或来源标注要求是否进一步收紧。

## 证据矩阵

- 来源条目 1：Google DeepMind 发布 DiffusionGemma，NVIDIA 同步做本地加速适配 —— Google DeepMind 发布实验性开放模型 DiffusionGemma。它不是传统逐 token 生成，而是用“扩散式文本生成”一次并行生成文本块。官方称在专用 GPU 上最高可实现约 4 倍更快推理。NVIDIA 同步宣布对 RTX、RTX PRO、DGX Spark、H100 等硬件做优化。
- 来源条目 2：NVIDIA 扩大 DRIVE Hyperion 机器人出租车生态 —— NVIDIA 宣布 DRIVE Hyperion 机器人出租车平台生态扩展。涉及 Uber/Autobrains 在慕尼黑推进 robotaxi 项目，Foxconn 在台湾推进 L4-ready 车队，VinFast 面向东南亚，HUMAIN 面向沙特/中东。
- 来源条目 3：OpenAI 简化 ChatGPT 模型选择器 —— OpenAI 在 ChatGPT 版本说明中更新模型选择方式：把模型选项简化成 Instant、Medium、High、Extra High、Pro Standard、Pro Extended 等，并在全球 Plus / Pro 用户的 Web、iOS、Android 推出。
- 来源条目 4：中国启动 2026 年度人形机器人与具身智能实景实训专项行动 —— 据新华社报道，工信部、国务院国资委联合启动 2026 年度人形机器人与具身智能实景实训专项行动。目标是在真实生产生活环境中常态化部署、工程化验证、规模化落地。行动提出到 2026 年底，形成百个以上高价值应用场景，带动万台级规模落地能力。
- 来源条目 5：工信部要求规范 App 信息窗口跳转，严禁诱导点击和“摇一摇”误跳 —— 据新华社报道，工信部信息通信管理局召开专题会议，要求互联网平台和智能终端企业规范 App 信息窗口呈现方式，严禁违规弹窗、诱导点击、高灵敏度“摇一摇”触发跳转等行为。后续将开展常态化检测监测。
`;

export const expectedSignals = [
  {
    title: 'Google DeepMind 发布 DiffusionGemma，NVIDIA 同步做本地加速适配',
    sourceProjectionRuleMatches: ['google-deepmind-diffusiongemma-2026'],
    enLabel: 'Google / DeepMind / DiffusionGemma / AI hardware',
    zhEvidence: '来源条目 1：Google DeepMind 发布 DiffusionGemma，NVIDIA 同步做本地加速适配',
    requiredTokens: ['Google', 'DeepMind', 'DiffusionGemma', 'RTX PRO'],
  },
  {
    title: 'NVIDIA 扩大 DRIVE Hyperion 机器人出租车生态',
    sourceProjectionRuleMatches: ['nvidia-drive-hyperion-robotaxi-2026'],
    enLabel: 'NVIDIA / DRIVE / Hyperion / compute infrastructure',
    zhEvidence: '来源条目 2：NVIDIA 扩大 DRIVE Hyperion 机器人出租车生态',
    requiredTokens: ['NVIDIA', 'DRIVE Hyperion', 'Uber/Autobrains', 'HUMAIN'],
  },
  {
    title: 'OpenAI 简化 ChatGPT 模型选择器',
    sourceProjectionRuleMatches: ['openai-chatgpt-model-picker-2026'],
    enLabel: 'OpenAI / ChatGPT / Instant / model capability update',
    zhEvidence: '来源条目 3：OpenAI 简化 ChatGPT 模型选择器',
    requiredTokens: ['OpenAI', 'Instant', 'Pro Extended', 'Thinking Light'],
  },
  {
    title: '中国启动 2026 年度人形机器人与具身智能实景实训专项行动',
    sourceProjectionRuleMatches: ['china-humanoid-embodied-training-2026'],
    enLabel: 'Xinhua / MIIT / China / robotics deployment',
    zhEvidence: '来源条目 4：中国启动 2026 年度人形机器人与具身智能实景实训专项行动',
    requiredTokens: ['Xinhua', 'MIIT', '100 high-value', '10,000-unit'],
  },
  {
    title: '工信部要求规范 App 信息窗口跳转，严禁诱导点击和“摇一摇”误跳',
    sourceProjectionRuleMatches: ['china-app-popup-jump-regulation-2026'],
    enLabel: 'China / Xinhua / MIIT / enterprise AI rollout',
    zhEvidence: '来源条目 5：工信部要求规范 App 信息窗口跳转，严禁诱导点击和“摇一摇”误跳',
    requiredTokens: ['MIIT', 'pop-ups', 'shake-to-jump', 'monitoring'],
  },
];

export const bannedFallbackPhrases = [
  'The source tracks AI hardware, agent platform, open-source model ecosystem',
  'The source tracks compute infrastructure, robotics deployment, AI security control',
  'The source tracks model capability update, model release management around OpenAI',
  'The source tracks robotics deployment, embodied AI, healthcare AI deployment',
  'The source tracks enterprise AI rollout, AI commerce workflow, AI device adoption',
  'buyers must check access control, infrastructure availability, operational risk',
  'giving the daily brief a named actor and deployment context',
  'today AI / technology daily not generated',
  '今日 AI / 科技日报暂未生成',
  '-…',
  '...',
];

export const requiredEnglishOutputs = [
  '### 1. Google / DeepMind / DiffusionGemma / AI hardware',
  '### 2. NVIDIA / DRIVE / Hyperion / compute infrastructure',
  '### 3. OpenAI / ChatGPT / Instant / model capability update',
  '### 4. Xinhua / MIIT / China / robotics deployment',
  '### 5. China / Xinhua / MIIT / enterprise AI rollout',
  'Google DeepMind released the experimental open DiffusionGemma model',
  'NVIDIA expanded the DRIVE Hyperion robotaxi ecosystem',
  'OpenAI simplified ChatGPT model selection into task-oriented options',
  'China’s MIIT and SASAC launched a 2026 humanoid robotics',
  'China’s MIIT required internet platforms and smart-terminal companies',
  'Evidence item 1: Google / DeepMind / DiffusionGemma / AI hardware',
  'Evidence item 2: NVIDIA / DRIVE / Hyperion / compute infrastructure',
  'Evidence item 3: OpenAI / ChatGPT / Instant / model capability update',
  'Evidence item 4: Xinhua / MIIT / China / robotics deployment',
  'Evidence item 5: China / Xinhua / MIIT / enterprise AI rollout',
  '## Today’s Bottom Line',
  '## What to Watch Tomorrow',
  '## Evidence Matrix',
];

export const requiredZhOutputs = [
  'Google DeepMind 发布 DiffusionGemma',
  'NVIDIA 扩大 DRIVE Hyperion',
  'OpenAI 简化 ChatGPT 模型选择器',
  '中国启动 2026 年度人形机器人',
  '工信部要求规范 App 信息窗口跳转',
  '## 今日结论',
  '## 明日跟踪点',
  '## 证据矩阵',
  '来源条目 1：Google DeepMind 发布 DiffusionGemma',
  '来源条目 5：工信部要求规范 App 信息窗口跳转',
];

export const parserGuardrails = {
  story5RequiredEnLabelTokens: ['China', 'Xinhua', 'MIIT'],
  story5ForbiddenEnLabelTokens: ['Google', 'NVIDIA', 'OpenAI'],
  story5RequiredDetailTokens: ['信息窗口跳转', '摇一摇', '常态化检测监测'],
  story5ForbiddenDetailTokens: ['DiffusionGemma', 'DRIVE Hyperion', 'Thinking Light', '实景实训'],
  story5ForbiddenEvidenceTokens: ['DiffusionGemma', 'DRIVE Hyperion', 'Thinking Light', 'real-world training initiative'],
  story5ForbiddenZhEvidenceTokens: ['DiffusionGemma', 'DRIVE Hyperion', 'Thinking Light', '实景实训'],
};
