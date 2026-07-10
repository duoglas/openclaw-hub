export const fixtureDate = '2026-07-10';

export const realCronFixture = `《AI、科技日报》  
2026-07-10 早报

## 今日要闻（5条）

1. NVIDIA：开源模型 + LangChain Agent 栈开始冲企业落地

发生了什么：NVIDIA 称 Nemotron 3 Ultra 通过 LangChain Deep Agents harness 调优，在开放模型中取得领先表现，并宣称推理成本可低至头部闭源模型的 1/10。

为什么重要：重点不只是模型本身，而是“模型 + 工具 + 运行环境 + 评测”的 Agent 工程化。

可能影响：企业会更愿意尝试可私有化、可治理的开放 Agent 栈，降低长期依赖闭源模型的风险。

---

2. Anthropic：Claude Fable 5 恢复全球可用，并推动 jailbreak 严重性框架

发生了什么：Anthropic 表示 Fable 5 已恢复全球访问，同时与 Amazon、Microsoft、Google 等合作方推动行业级 jailbreak 严重性评估框架。

为什么重要：高能力模型的发布，正在被出口管制、安全评估、红队测试共同约束。

可能影响：未来大模型发布节奏可能更慢，但安全分级、政府协作、预发布测试会更制度化。

---

3. 中国：科技强国路线继续强调 AI、量子、生命科学等原创突破

发生了什么：新华社报道，国家科学技术奖励大会、两院院士大会、中国科协第十一次全国代表大会召开，讲话中提到人工智能、量子科技、生命科学等领域原创成果。

为什么重要：中国科技政策主线继续指向高水平科技自立自强，以及科技创新和产业创新深度融合。

可能影响：AI、机器人、先进制造、生命科学等方向仍会获得政策和产业资源倾斜。

---

4. AI 正在重塑存储产业：HBM 抢产能，消费电子也被传导涨价

发生了什么：新华社分析称，AI 训练带动 HBM、高端 SSD、企业级存储需求，存储厂商将更多资源投向高利润 AI 存储产品，传统存储供应趋紧。

为什么重要：AI 成本不只体现在 GPU，也在重塑内存、封装、晶圆、数据中心供应链。

可能影响：手机、电脑、SSD、内存条等消费品仍可能承压；普通用户近期买电脑可重点关注内存/硬盘价格波动。

---

5. 中国人形机器人进入落地窗口期

发生了什么：新华网报道，荣耀终端机器人首席技术架构师严斌表示，未来几年将是人形机器人技术落地的重要时期。

为什么重要：机器人从展示样机走向生产生活场景，关键不再只是“会走会跑”，而是稳定性、成本、供应链和真实任务闭环。

可能影响：工业巡检、仓储物流、养老辅助、消费电子生态可能先出现可落地产品，但大规模家用仍需观察成本和安全性。

---

## 实战案例（2个）

1. 企业 Agent 的现实路径

NVIDIA + LangChain 的案例说明：企业 Agent 不一定靠重新训练大模型。更现实的做法是固定模型、调工具描述、系统提示词、中间件，加评测闭环，并用安全运行时限制 Agent 动作范围。

---

2. AI 落地不只聊天，正在进入物理世界

新华社“大湾区 AI 落地”报道提到：电助力自行车、外骨骼机器人、无人车、无人机配送等场景。这类案例的核心不是生成内容，而是让 AI 接入设备、传感器和真实作业流程。
`;

export const expectedSignals = [
  { title: 'NVIDIA：开源模型 + LangChain Agent 栈开始冲企业落地', sourceProjectionRuleMatches: ['nvidia-nemoclaw-industrial-agents'], enLabel: 'NVIDIA / Nemotron 3 Ultra / LangChain Deep Agents', zhEvidence: '来源条目 1：NVIDIA：开源模型 + LangChain Agent 栈开始冲企业落地', requiredTokens: ['Nemotron 3 Ultra', 'LangChain Deep Agents harness', '1/10'] },
  { title: 'Anthropic：Claude Fable 5 恢复全球可用，并推动 jailbreak 严重性框架', sourceProjectionRuleMatches: ['anthropic-fable-jailbreak-severity-framework-2026'], enLabel: 'Anthropic / Claude Fable / jailbreak severity framework', zhEvidence: '来源条目 2：Anthropic：Claude Fable 5 恢复全球可用，并推动 jailbreak 严重性框架', requiredTokens: ['Fable 5 已恢复全球访问', 'Amazon、Microsoft、Google', 'jailbreak 严重性评估框架'] },
  { title: '中国：科技强国路线继续强调 AI、量子、生命科学等原创突破', sourceProjectionRuleMatches: ['china-national-data-administration-embodied-ai'], enLabel: 'Xinhua / China / science self-reliance policy', zhEvidence: '来源条目 3：中国：科技强国路线继续强调 AI、量子、生命科学等原创突破', requiredTokens: ['国家科学技术奖励大会', '两院院士大会', '中国科协第十一次全国代表大会'] },
  { title: 'AI 正在重塑存储产业：HBM 抢产能，消费电子也被传导涨价', sourceProjectionRuleMatches: ['xinhua-ai-memory-price-consumer-electronics-2026'], enLabel: 'Xinhua / AI memory demand / consumer electronics cost pressure', zhEvidence: '来源条目 4：AI 正在重塑存储产业：HBM 抢产能，消费电子也被传导涨价', requiredTokens: ['HBM', '高端 SSD', '传统存储供应趋紧'] },
  { title: '中国人形机器人进入落地窗口期', sourceProjectionRuleMatches: ['china-humanoid-embodied-training-2026'], enLabel: 'Xinhua / Honor / humanoid robotics landing window', zhEvidence: '来源条目 5：中国人形机器人进入落地窗口期', requiredTokens: ['荣耀终端机器人首席技术架构师严斌', '人形机器人技术落地的重要时期'] },
];

export const bannedFallbackPhrases = [
  'The source tracks model capability update, strategic partnership, AI security control around Anthropic, Claude, Fable, Amazon',
  'The source tracks robotics deployment, AI policy signal, industrial AI deployment around Xinhua, China',
  'The source tracks robotics deployment, AI security control, AI device adoption around China',
  'giving the daily brief a named actor and deployment context',
  'buyers must check access control, infrastructure availability, operational risk',
  'today AI / technology daily not generated',
  '今日 AI / 科技日报暂未生成',
  '-…',
  '...',
];

export const requiredEnglishOutputs = [
  '### 1. NVIDIA / Nemotron 3 Ultra / LangChain Deep Agents',
  '### 2. Anthropic / Claude Fable / jailbreak severity framework',
  '### 3. Xinhua / China / science self-reliance policy',
  '### 4. Xinhua / AI memory demand / consumer electronics cost pressure',
  '### 5. Xinhua / Honor / humanoid robotics landing window',
  'NVIDIA said Cadence, Dassault Systèmes, Siemens, Synopsys, and other industrial software vendors are using NVIDIA NemoClaw / OpenShell',
  'Anthropic said Claude Fable 5 returned globally',
  'Xinhua reported China’s national science and technology awards conference',
  'Xinhua reported that AI infrastructure expansion is pushing up high-end memory demand such as HBM',
  'Xinhuanet also reported Honor robotics architect Yan Bin',
  'Evidence item 1: NVIDIA / Nemotron 3 Ultra / LangChain Deep Agents',
  'Evidence item 5: Xinhua / Honor / humanoid robotics landing window',
  'enterprise Agent stack',
  'humanoid robotics landing window',
  '## Today’s Bottom Line',
  '## What to Watch Tomorrow',
  '## Evidence Matrix',
];

export const requiredZhOutputs = [
  'NVIDIA：开源模型 + LangChain Agent 栈开始冲企业落地',
  'Anthropic：Claude Fable 5 恢复全球可用，并推动 jailbreak 严重性框架',
  '中国：科技强国路线继续强调 AI、量子、生命科学等原创突破',
  'AI 正在重塑存储产业：HBM 抢产能，消费电子也被传导涨价',
  '中国人形机器人进入落地窗口期',
  '企业 Agent 的现实路径',
  'AI 落地不只聊天，正在进入物理世界',
  '## 今日结论',
  '## 明日跟踪点',
  '## 证据矩阵',
  '来源条目 1：NVIDIA：开源模型 + LangChain Agent 栈开始冲企业落地',
  '来源条目 5：中国人形机器人进入落地窗口期',
];

export const caseLevelFaqSignals = [
  {
    label: 'enterprise Agent stack',
    practicalCaseMatchTerms: ['企业 Agent 的现实路径'],
    sourceStoryMatchTerms: ['Nemotron 3 Ultra', 'LangChain Deep Agents'],
    requiredTerms: ['enterprise Agent stack', 'tool permissions', 'evaluation loop'],
    links: ['/en/blog/agentic-engineering-guide/', '/en/blog/openclaw-model-fallback-strategy/'],
  },
  {
    label: 'humanoid robotics landing window',
    practicalCaseMatchTerms: ['AI 落地不只聊天'],
    sourceStoryMatchTerms: ['人形机器人技术落地的重要时期', '荣耀终端机器人首席技术架构师严斌'],
    requiredTerms: ['humanoid robotics landing window', 'supply chain', 'safety evidence'],
    links: ['/en/blog/what-is-openclaw/', '/en/blog/agentic-engineering-guide/'],
  },
];

export const parserGuardrails = {
  story1RequiredDetailTokens: ['Nemotron 3 Ultra', 'LangChain Deep Agents harness', '1/10'],
  story1ForbiddenDetailTokens: ['Fable 5', '国家科学技术奖励大会', 'HBM', '人形机器人技术落地'],
  story2RequiredDetailTokens: ['Fable 5 已恢复全球访问', 'jailbreak 严重性评估框架'],
  story2ForbiddenDetailTokens: ['Nemotron 3 Ultra', '国家科学技术奖励大会', 'HBM', '荣耀终端'],
  story3RequiredDetailTokens: ['国家科学技术奖励大会', '两院院士大会', '中国科协第十一次全国代表大会'],
  story3ForbiddenDetailTokens: ['Fable 5', 'HBM', '荣耀终端'],
  story4RequiredDetailTokens: ['HBM', '高端 SSD', '传统存储供应趋紧'],
  story4ForbiddenDetailTokens: ['Fable 5', '国家科学技术奖励大会', '荣耀终端'],
  story5RequiredDetailTokens: ['荣耀终端机器人首席技术架构师严斌', '人形机器人技术落地的重要时期'],
  story5ForbiddenDetailTokens: ['Fable 5', '国家科学技术奖励大会', 'HBM'],
};
