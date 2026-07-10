export const fixtureDate = '2026-07-09';

export const realCronFixture = `《AI、科技日报》  
2026-07-09 早报

## 今日要闻（5条）

1. OpenAI 发布 GPT‑Live，语音 AI 进入“全双工”阶段

发生了什么：OpenAI 7月8日发布 GPT‑Live，支持边听边说，可在用户停顿、打断、背景噪声中继续维持对话；复杂问题可后台委托 GPT‑5.5 处理。GPT‑Live‑1 面向付费用户，mini 面向免费用户，并将逐步进入 API。

为什么重要：语音助手从“轮流说话”变成更像实时协作。核心变化不是单纯音色更自然，而是语音层和推理/搜索/任务层解耦。

可能影响：普通用户会更愿意用语音处理长任务；客服、陪练、车载、可穿戴设备会加速接入。隐私、情感依赖、青少年保护会成为监管重点。

---

2. OpenAI 同步发布 GPT‑Live 安全卡，重点处理语音场景风险

发生了什么：OpenAI 的 GPT‑Live System Card 说明，新模型加入实时安全检测：输出过程中也能被引导、中断、追加安全提示，严重风险下可结束语音会话；还覆盖自伤、情感依赖、诈骗操纵、冒充声音等语音特有风险。

为什么重要：语音 AI 比文字更容易产生“陪伴感”和误导性。安全机制从“事后过滤文本”变成“对话进行中干预”。

可能影响：后续语音模型发布会更依赖 system card 和实时监控能力。企业采购语音 AI 时，安全卡会变成必要材料。

---

3. OpenAI 撤回对 SWE‑Bench Pro 的推荐，称约 30% 任务可能有问题

发生了什么：OpenAI 审计 SWE‑Bench Pro 后称，公开 731 个任务中，自动流程标记 27.4% 有破损问题，人类标注认为 34.1% 有问题；主要包括测试过严、提示缺失、测试覆盖不足、提示误导等。OpenAI 因此撤回此前“建议采用 SWE‑Bench Pro”的推荐。

为什么重要：代码模型排行榜的可信度被进一步削弱。模型能力增长太快后，旧 benchmark 更容易失真。

可能影响：AI 编程工具的宣传会更难只靠单一榜单。企业评估代码 Agent，需要用自己的真实仓库任务做小规模验证。

---

4. NVIDIA 推出 Nemotron 3 Ultra + LangChain Deep Agents 企业 Agent 方案

发生了什么：NVIDIA 称，LangChain 为 Nemotron 3 Ultra 调整 Deep Agents harness 后，在开放模型中取得领先表现，并声称推理成本约为领先闭源模型的十分之一；相关 NemoClaw for LangChain Deep Agents 蓝图已可用。

为什么重要：重点从“训练更大模型”转向“调好 Agent 运行环境”：记忆、工具、提示、中间件、安全运行时一起优化。

可能影响：企业可能更愿意尝试可控、可私有部署的开放 Agent 栈。闭源模型的成本优势会继续被开源/开放栈挤压。

---

5. 中国机器人产业继续升温：工信部披露 1—5月规上机器人企业营收超900亿元

发生了什么：工信部官网消息，2026世界机器人大会新闻发布会在北京召开。大会将于8月19日至23日在北京经开区举行，预计参展企业300余家、展品超2000件、首发新品150余件。工信部相关负责人表示，今年1—5月我国机器人规上企业营业收入突破900亿元，同比增长26.9%。

为什么重要：AI 从软件模型继续向“具身智能/机器人”落地。中国机器人产业规模、展会密度、首发产品数量都在上升。

可能影响：人形机器人、工业机器人、智能制造链条会继续成为资本和政策关注点。普通用户短期更可能先看到商用服务机器人，而不是家庭通用机器人。

---

## 实战案例（2个）

1. 普通用户如何用 GPT‑Live 类语音 AI

适合场景：通勤口述待办、语言练习、边走边问路线/天气/资料、做饭时查询步骤、陪孩子讲故事。

建议用法：先把任务说清楚：“帮我边听边整理，最后给三条行动项。” 如果涉及复杂问题，让它后台查证，不要只听即时回答。

注意：涉及医疗、法律、金融建议，仍要看文字结果和来源。语音更自然，不等于更可靠。

---

2. 企业评估 AI 编程工具，不要只看 SWE‑Bench 排名

更稳的做法：选 20—50 个公司真实历史 issue。让工具在隔离分支里修复。用现有 CI、人工 review、回归测试打分。记录“能否读懂项目约定”“是否引入副作用”“是否会编造接口”。

结论：榜单只能做初筛，不能做采购依据。
`;

export const expectedSignals = [
  { title: 'OpenAI 发布 GPT‑Live，语音 AI 进入“全双工”阶段', sourceProjectionRuleMatches: ['openai-gpt55-instant-decision-shopping-2026'], enLabel: 'OpenAI / GPT-Live / full-duplex voice AI', zhEvidence: '来源条目 1：OpenAI 发布 GPT‑Live，语音 AI 进入“全双工”阶段', requiredTokens: ['GPT‑Live', '边听边说', '后台委托 GPT‑5.5'] },
  { title: 'OpenAI 同步发布 GPT‑Live 安全卡，重点处理语音场景风险', sourceProjectionRuleMatches: ['openai-youth-safety-g7-2026'], enLabel: 'OpenAI / GPT-Live System Card / voice safety controls', zhEvidence: '来源条目 2：OpenAI 同步发布 GPT‑Live 安全卡，重点处理语音场景风险', requiredTokens: ['GPT‑Live System Card', '实时安全检测', '严重风险下可结束语音会话'] },
  { title: 'OpenAI 撤回对 SWE‑Bench Pro 的推荐，称约 30% 任务可能有问题', sourceProjectionRuleMatches: ['openai-codex-record-replay-2026'], enLabel: 'OpenAI / SWE-Bench Pro / benchmark reliability', zhEvidence: '来源条目 3：OpenAI 撤回对 SWE‑Bench Pro 的推荐，称约 30% 任务可能有问题', requiredTokens: ['SWE‑Bench Pro', '公开 731 个任务', '34.1% 有问题'] },
  { title: 'NVIDIA 推出 Nemotron 3 Ultra + LangChain Deep Agents 企业 Agent 方案', sourceProjectionRuleMatches: ['nvidia-nemoclaw-industrial-agents'], enLabel: 'NVIDIA / Nemotron 3 Ultra / LangChain Deep Agents', zhEvidence: '来源条目 4：NVIDIA 推出 Nemotron 3 Ultra + LangChain Deep Agents 企业 Agent 方案', requiredTokens: ['Nemotron 3 Ultra', 'LangChain', 'NemoClaw for LangChain Deep Agents'] },
  { title: '中国机器人产业继续升温：工信部披露 1—5月规上机器人企业营收超900亿元', sourceProjectionRuleMatches: ['china-humanoid-embodied-training-2026'], enLabel: 'MIIT / China / robot industry revenue', zhEvidence: '来源条目 5：中国机器人产业继续升温：工信部披露 1—5月规上机器人企业营收超900亿元', requiredTokens: ['世界机器人大会', '规上机器人企业', '营收超900亿元'] },
];

export const bannedFallbackPhrases = [
  'The source tracks AI governance requirement around OpenAI, GPT, Live, API',
  'The source tracks model capability update, enterprise AI rollout, AI security control around OpenAI, GPT, Live, System',
  'The source tracks agent platform, model capability update, enterprise AI rollout, coding agent workflow around OpenAI, SWE, Bench, Pro',
  'The source tracks robotics deployment, embodied AI, model capability update, enterprise AI rollout around MIIT, China',
  'giving the daily brief a named actor and deployment context',
  'buyers must check access control, infrastructure availability, operational risk',
  'today AI / technology daily not generated',
  '今日 AI / 科技日报暂未生成',
  '-…',
  '...',
];

export const requiredEnglishOutputs = [
  '### 1. OpenAI / GPT-Live / full-duplex voice AI',
  '### 2. OpenAI / GPT-Live System Card / voice safety controls',
  '### 3. OpenAI / SWE-Bench Pro / benchmark reliability',
  '### 4. NVIDIA / Nemotron 3 Ultra / LangChain Deep Agents',
  '### 5. MIIT / China / robot industry revenue',
  'OpenAI released GPT-Live on July 8 as a full-duplex voice AI experience',
  'OpenAI published safety documentation for GPT-Live voice interactions',
  'OpenAI withdrew its earlier recommendation for SWE-Bench Pro after auditing 731 public tasks',
  'NVIDIA said Cadence, Dassault Systèmes, Siemens, Synopsys, and other industrial software vendors are using NVIDIA NemoClaw / OpenShell',
  'MIIT said the 2026 World Robot Conference will run in Beijing from August 19 to 23',
  'Evidence item 1: OpenAI / GPT-Live / full-duplex voice AI',
  'Evidence item 5: MIIT / China / robot industry revenue',
  'GPT-Live voice AI',
  'SWE-Bench Pro',
  '## Today’s Bottom Line',
  '## What to Watch Tomorrow',
  '## Evidence Matrix',
];

export const requiredZhOutputs = [
  'OpenAI 发布 GPT‑Live，语音 AI 进入“全双工”阶段',
  'OpenAI 同步发布 GPT‑Live 安全卡，重点处理语音场景风险',
  'OpenAI 撤回对 SWE‑Bench Pro 的推荐，称约 30% 任务可能有问题',
  'NVIDIA 推出 Nemotron 3 Ultra + LangChain Deep Agents 企业 Agent 方案',
  '中国机器人产业继续升温：工信部披露 1—5月规上机器人企业营收超900亿元',
  '普通用户如何用 GPT‑Live 类语音 AI',
  '企业评估 AI 编程工具，不要只看 SWE‑Bench 排名',
  '## 今日结论',
  '## 明日跟踪点',
  '## 证据矩阵',
  '来源条目 1：OpenAI 发布 GPT‑Live，语音 AI 进入“全双工”阶段',
  '来源条目 5：中国机器人产业继续升温：工信部披露 1—5月规上机器人企业营收超900亿元',
];

export const caseLevelFaqSignals = [
  {
    label: 'GPT-Live voice AI',
    practicalCaseMatchTerms: ['GPT‑Live 类语音 AI'],
    sourceStoryMatchTerms: ['GPT‑Live', '边听边说'],
    requiredTerms: ['GPT-Live voice AI', 'full-duplex voice', 'source verification'],
    links: ['/en/blog/what-is-openclaw/', '/en/blog/openclaw-model-fallback-strategy/'],
  },
  {
    label: 'SWE-Bench Pro benchmark reliability',
    practicalCaseMatchTerms: ['SWE‑Bench 排名'],
    sourceStoryMatchTerms: ['SWE‑Bench Pro', '34.1% 有问题'],
    requiredTerms: ['SWE-Bench Pro', 'historical issues', 'CI and regression tests'],
    links: ['/en/blog/agentic-engineering-guide/', '/en/blog/openclaw-model-fallback-strategy/'],
  },
];

export const parserGuardrails = {
  story1RequiredDetailTokens: ['GPT‑Live', '边听边说', '后台委托 GPT‑5.5'],
  story1ForbiddenDetailTokens: ['System Card', 'SWE‑Bench Pro', 'Nemotron 3 Ultra', '规上机器人企业'],
  story2RequiredDetailTokens: ['GPT‑Live System Card', '实时安全检测', '严重风险下可结束语音会话'],
  story2ForbiddenDetailTokens: ['边听边说', 'SWE‑Bench Pro', 'Nemotron 3 Ultra', '规上机器人企业'],
  story3RequiredDetailTokens: ['SWE‑Bench Pro', '公开 731 个任务', '34.1% 有问题'],
  story3ForbiddenDetailTokens: ['GPT‑Live System Card', '边听边说', 'Nemotron 3 Ultra', '规上机器人企业'],
  story4RequiredDetailTokens: ['Nemotron 3 Ultra', 'LangChain', 'NemoClaw for LangChain Deep Agents'],
  story4ForbiddenDetailTokens: ['GPT‑Live', 'SWE‑Bench Pro', '规上机器人企业'],
  story5RequiredDetailTokens: ['世界机器人大会', '规上机器人企业', '营收超900亿元'],
  story5ForbiddenDetailTokens: ['GPT‑Live', 'SWE‑Bench Pro', 'Nemotron 3 Ultra'],
};
