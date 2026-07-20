export const fixtureDate = '2026-07-14';

export const realCronFixture = `《AI、科技日报》  
截至 2026-07-14 07:30 CST

## 今日要闻（5条）

1. OpenAI 推出 GPT‑5.6 系列，并把 Sol 作为旗舰模型开放

发生了什么：OpenAI 官方称，GPT‑5.6 系列进入通用可用阶段，包括 Sol、Terra、Luna；Sol 主打编码、科研、网络安全、知识工作和多智能体协作，并引入更高强度的 ultra 工作模式。

为什么重要：大模型竞争继续从“单次回答质量”转向“复杂任务完成率 + 成本效率 + 多代理并行”。

可能影响：开发者和企业会更倾向把 AI 用在代码审查、文档/表格/演示生成、调研、流程自动化等高价值任务；同时高能力模型的安全访问、身份校验、风控会变得更常态化。

2. OpenAI 推出 GPT‑Live，升级 ChatGPT 语音交互

发生了什么：OpenAI 发布 GPT‑Live，采用 full-duplex 架构，可边听边说，支持更自然的打断、停顿、倾听，并能把复杂任务委托给后台前沿模型处理。

为什么重要：语音 AI 从“轮流说话”走向“实时协作”。这会让 AI 更像随身助理，而不只是聊天框。

可能影响：普通用户会更频繁用语音完成通勤查询、语言练习、日常问答；企业客服、销售、培训、无障碍场景会更快落地语音智能体。

3. 中国 2026 世界人工智能大会将于 7 月 17-20 日在上海举行

发生了什么：新华社报道，2026 世界人工智能大会暨人工智能全球治理高级别会议将在上海举行，主题为“智能伙伴 共创未来”，并强调 AI 全球治理、合作与安全有序发展。

为什么重要：这不是单纯产业展，而是把 AI 技术、产业和全球治理议题放到同一场域。

可能影响：中国 AI 政策方向、产业合作、国际治理表态，可能成为未来几天全球 AI 行业关注点。建议继续跟踪大会开幕式和治理倡议内容。

4. WAIC 将首发超 300 款 AI 新品，中国 AI 应用规模继续扩张

发生了什么：新华社报道称，本届 WAIC 展览面积首次突破 10 万平方米，1100 余家企业参展，超 300 款产品首发；大会披露中国 AI 相关产业规模 2025 年已破万亿元，2026 年预计仍有 30% 以上增速。

为什么重要：这说明中国 AI 进入“集中展示 + 场景落地 + 产业链竞争”的阶段，重点包括智算、具身智能、智能体、芯片和机器人。

可能影响：接下来一周，国产大模型、AI 手机、具身智能、人形机器人、近存计算芯片等方向可能密集发布，AIGC 以外的“AI+硬件/制造/政务/产业”会升温。

5. NVIDIA 与 LangChain 推出 Nemotron 3 Ultra 企业智能体开放栈方案

发生了什么：NVIDIA 官方称，LangChain 针对 NVIDIA Nemotron 3 Ultra 调优 Deep Agents harness，在开放模型中取得领先表现，并以更低推理成本完成企业智能体任务。

为什么重要：企业 AI 的关键不只是模型本身，而是模型、工具、记忆、运行时、安全执行环境的完整工程栈。

可能影响：更多企业会尝试“可控、可私有化、可评测”的开放智能体方案，而不是完全依赖闭源模型 API。

## 实战案例（1-2个）

1. 普通用户：GPT‑Live 更适合“边走边问”的语音助理

可用场景：通勤路上查路线、练英语口语、让 AI 边听边整理思路、做语音版搜索和问答。

建议：如果已经常用 ChatGPT Voice，可以优先试“语音 + 搜索 + 记忆”的组合；但涉及医疗、法律、投资等高风险建议，仍要二次核实。

2. 企业/开发者：NVIDIA + LangChain 的案例说明“调 harness”也能提效

可用场景：客服工单、内部知识库问答、代码仓库自动排查、数据分析流水线。

建议：不要只比较模型榜单。更该测试：工具调用稳定性、任务完成率、成本、日志可审计性、失败回滚机制。
`;

export const expectedSignals = [
  { title: 'OpenAI 推出 GPT‑5.6 系列，并把 Sol 作为旗舰模型开放', sourceProjectionRuleMatches: ['openai-chatgpt-model-picker-2026'], enLabel: 'OpenAI / GPT-5.6 / Sol-Terra-Luna agent platform', zhEvidence: '来源条目 1：OpenAI 推出 GPT‑5.6 系列，并把 Sol 作为旗舰模型开放', requiredTokens: ['GPT‑5.6', 'Sol', 'Terra', 'Luna', 'ultra 工作模式'] },
  { title: 'OpenAI 推出 GPT‑Live，升级 ChatGPT 语音交互', sourceProjectionRuleMatches: ['openai-gpt55-instant-decision-shopping-2026'], enLabel: 'OpenAI / GPT-Live / full-duplex voice AI', zhEvidence: '来源条目 2：OpenAI 推出 GPT‑Live，升级 ChatGPT 语音交互', requiredTokens: ['GPT‑Live', 'full-duplex', '边听边说', '后台前沿模型'] },
  { title: '中国 2026 世界人工智能大会将于 7 月 17-20 日在上海举行', sourceProjectionRuleMatches: ['china-world-ai-cooperation-organization-2026'], enLabel: 'China / WAIC / AI governance conference', zhEvidence: '来源条目 3：中国 2026 世界人工智能大会将于 7 月 17-20 日在上海举行', requiredTokens: ['2026 世界人工智能大会', '7 月 17-20 日', '智能伙伴 共创未来', '全球治理'] },
  { title: 'WAIC 将首发超 300 款 AI 新品，中国 AI 应用规模继续扩张', sourceProjectionRuleMatches: ['china-waic-product-launch-pipeline-2026'], enLabel: 'China / WAIC / AI product launch pipeline', zhEvidence: '来源条目 4：WAIC 将首发超 300 款 AI 新品，中国 AI 应用规模继续扩张', requiredTokens: ['10 万平方米', '1100 余家', '超 300 款', '2025 年已破万亿元'] },
  { title: 'NVIDIA 与 LangChain 推出 Nemotron 3 Ultra 企业智能体开放栈方案', sourceProjectionRuleMatches: ['nvidia-nemoclaw-industrial-agents'], enLabel: 'NVIDIA / Nemotron 3 Ultra / LangChain Deep Agents', zhEvidence: '来源条目 5：NVIDIA 与 LangChain 推出 Nemotron 3 Ultra 企业智能体开放栈方案', requiredTokens: ['Nemotron 3 Ultra', 'LangChain', 'Deep Agents harness', '开放模型'] },
];

export const bannedFallbackPhrases = [
  'The source tracks agent platform, model capability update, enterprise AI rollout, AI security control around OpenAI',
  'OpenAI updated GPT-5.5 Instant on June 24',
  'The source tracks strategic partnership, AI policy signal, AI security control around Xinhua',
  'The source tracks AI chip supply, AI hardware, robotics deployment, embodied AI around Xinhua',
  'NVIDIA said Cadence, Dassault Systèmes, Siemens, Synopsys',
  'giving the daily brief a named actor and deployment context',
  'buyers must check access control, infrastructure availability, operational risk',
  'today AI / technology daily not generated',
  '今日 AI / 科技日报暂未生成',
  '-…',
  '...',
];

export const requiredEnglishOutputs = [
  '### 1. OpenAI / GPT-5.6 / Sol-Terra-Luna agent platform',
  '### 2. OpenAI / GPT-Live / full-duplex voice AI',
  '### 3. China / WAIC / AI governance conference',
  '### 4. China / WAIC / AI product launch pipeline',
  '### 5. NVIDIA / Nemotron 3 Ultra / LangChain Deep Agents',
  'Evidence item 1: OpenAI / GPT-5.6 / Sol-Terra-Luna agent platform',
  'Evidence item 2: OpenAI / GPT-Live / full-duplex voice AI',
  'Evidence item 3: China / WAIC / AI governance conference',
  'Evidence item 4: China / WAIC / AI product launch pipeline',
  'Evidence item 5: NVIDIA / Nemotron 3 Ultra / LangChain Deep Agents',
  '## Today’s Bottom Line',
  '## What to Watch Tomorrow',
  '## Evidence Matrix',
];

export const requiredZhOutputs = [
  'OpenAI 推出 GPT‑5.6 系列，并把 Sol 作为旗舰模型开放',
  'OpenAI 推出 GPT‑Live，升级 ChatGPT 语音交互',
  '中国 2026 世界人工智能大会将于 7 月 17-20 日在上海举行',
  'WAIC 将首发超 300 款 AI 新品，中国 AI 应用规模继续扩张',
  'NVIDIA 与 LangChain 推出 Nemotron 3 Ultra 企业智能体开放栈方案',
  '普通用户：GPT‑Live 更适合“边走边问”的语音助理',
  '企业/开发者：NVIDIA + LangChain 的案例说明“调 harness”也能提效',
  '## 今日结论',
  '## 明日跟踪点',
  '## 证据矩阵',
  '来源条目 5：NVIDIA 与 LangChain 推出 Nemotron 3 Ultra 企业智能体开放栈方案',
];

export const caseLevelFaqSignals = [
  {
    label: 'GPT-Live full-duplex voice assistant',
    practicalCaseMatchTerms: ['GPT‑Live 更适合', '语音助理'],
    sourceStoryMatchTerms: ['GPT‑Live', 'full-duplex', '边听边说'],
    requiredTerms: ['GPT-Live full-duplex voice assistant', 'interruptions', 'high-risk advice'],
    links: ['/en/blog/what-is-openclaw/', '/en/blog/openclaw-model-fallback-strategy/'],
  },
  {
    label: 'enterprise agent engineering harness',
    practicalCaseMatchTerms: ['调 harness', 'NVIDIA + LangChain'],
    sourceStoryMatchTerms: ['Nemotron 3 Ultra', 'Deep Agents harness', '日志可审计'],
    requiredTerms: ['enterprise agent engineering harness', 'evaluation traces', 'tool descriptions'],
    links: ['/en/blog/agentic-engineering-guide/', '/en/blog/openclaw-model-fallback-strategy/'],
  },
];

export const parserGuardrails = {
  story1RequiredDetailTokens: ['GPT‑5.6', 'Sol', 'Terra', 'Luna', 'ultra 工作模式'],
  story1ForbiddenDetailTokens: ['GPT‑Live', 'WAIC', 'Nemotron'],
  story2RequiredDetailTokens: ['GPT‑Live', 'full-duplex', '边听边说'],
  story2ForbiddenDetailTokens: ['GPT-5.5 Instant', 'Sol', 'WAIC'],
  story3RequiredDetailTokens: ['2026 世界人工智能大会', '7 月 17-20 日', '智能伙伴 共创未来'],
  story3ForbiddenDetailTokens: ['超 300 款', 'Nemotron 3 Ultra'],
  story4RequiredDetailTokens: ['10 万平方米', '1100 余家', '超 300 款', '2025 年已破万亿元'],
  story4ForbiddenDetailTokens: ['7 月 17-20 日', 'GPT‑Live'],
  story5RequiredDetailTokens: ['Nemotron 3 Ultra', 'LangChain', 'Deep Agents harness'],
  story5ForbiddenDetailTokens: ['Cadence', 'Dassault', 'WAIC'],
};
