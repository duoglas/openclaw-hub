export const fixtureDate = '2026-07-17';

export const realCronFixture = `《AI、科技日报》  
2026-07-17 07:30｜聚焦 AI / 科技行业

## 今日要闻（5条）

1. Anthropic 向加拿大 AI 研究投入 1000 万加元
状态：已确认  
发生了什么：Anthropic 宣布向加拿大研究机构投入 1000 万加元，并与 Amii、Mila、Vector Institute 等合作。  
为什么重要：资金不只用于模型训练，也覆盖 AI 安全、医疗、机器人、多智能体和低资源语言研究。  
可能影响：AI 公司的竞争将从“模型能力”扩展到研究生态、人才和产业合作网络。

2. NVIDIA 发布 Jetson T3000、T2000，继续押注边缘 AI 和机器人
状态：已确认  
发生了什么：NVIDIA 发布基于 Thor 架构的新模块，面向人形机器人、工业机器人、智能交通和视觉 AI。T3000 提供最高 865 FP4 TFLOPS，T2000 提供 400 FP4 TFLOPS。  
为什么重要：更强模型可以直接运行在设备端，减少机器人、视觉 AI 与智能交通场景对云端推理的依赖。  
可能影响：机器人产品的响应速度、隐私、离线能力和单位部署成本会成为下一轮竞争重点。

3. AWS 计算与机器学习业务将更换负责人
状态：已确认  
发生了什么：Amazon 宣布 Dave Treadwell 将于 8 月 1 日起接任 AWS Compute and ML Services 负责人，原负责人 Dave Brown 将离职。  
为什么重要：该部门涉及 AWS 云计算、机器学习基础设施和 AI 算力服务，是 Amazon AI 战略的核心底座。  
可能影响：AWS 可能进一步强化 AI 基础设施、算力效率和企业级机器学习服务；短期重点是观察产品路线是否调整。

4. Together AI 完成 8 亿美元融资，英伟达参与投资
状态：待确认  
发生了什么：多家媒体报道称，Together AI 完成 8 亿美元 C 轮融资，投资方包括 NVIDIA、Aramco Ventures 等。  
为什么重要：Together AI 主打开源模型部署和推理基础设施，反映企业客户对低成本、可定制模型的需求。  
可能影响：AI 基础设施竞争可能从“谁拥有最大模型”转向“谁能以更低成本稳定运行模型”。

5. 中国 AI 行业继续从模型竞赛转向商业化和场景落地
状态：待确认  
发生了什么：国内媒体集中报道豆包、WorkBuddy 等产品探索收费，以及办公、物流、消费电子和人形机器人等行业加速接入 AI。  
为什么重要：模型能力趋于同质化后，付费用户、企业工作流和真实生产效率将成为新竞争点。  
可能影响：普通用户会逐步遇到更多按量计费、订阅制、嵌入式 AI；企业采购重点也会从参数规模转向 ROI、数据安全和部署成本。

## 实战案例（2个）

1. 机器人公司如何用 Jetson Thor 降低部署成本  
可借鉴点：先选一条低风险机器人或视觉 AI Agent 工作流，对比云端推理与本地 Jetson Thor 推理在延迟、功耗、热设计、网络中断和单位任务成本上的差异，再决定是否规模化替换。

2. Claude 被用于医疗和科研工作流  
可借鉴点：Anthropic 的加拿大合作项目中，CHEO 将探索儿童医疗中的 AI 应用；CAMH 将用于心理健康研究、治疗预测模型和精神健康 AI 公平性评估；Mila 将用于科学发现和多智能体研究。医疗场景仍需要严格的人类复核。
`;

export const expectedSignals = [
  { title: 'Anthropic 向加拿大 AI 研究投入 1000 万加元', sourceProjectionRuleMatches: ['anthropic-canada-ai-research-ecosystem-2026'], enLabel: 'Anthropic / Canada / AI research ecosystem', zhEvidence: '来源条目 1：Anthropic 向加拿大 AI 研究投入 1000 万加元', requiredTokens: ['1000 万加元', 'Amii', 'Mila', 'Vector Institute', 'AI 安全', '医疗', '机器人'] },
  { title: 'NVIDIA 发布 Jetson T3000、T2000，继续押注边缘 AI 和机器人', sourceProjectionRuleMatches: ['nvidia-physical-ai-agent-skills-2026'], enLabel: 'NVIDIA / Jetson Thor / edge robotics AI modules', zhEvidence: '来源条目 2：NVIDIA 发布 Jetson T3000、T2000，继续押注边缘 AI 和机器人', requiredTokens: ['Thor 架构', 'T3000', 'T2000', '865 FP4 TFLOPS', '400 FP4 TFLOPS'] },
  { title: 'AWS 计算与机器学习业务将更换负责人', sourceProjectionRuleMatches: ['aws-agent-continuum-enterprise-agentcore-2026'], enLabel: 'AWS / Compute and ML Services / AI infrastructure leadership', zhEvidence: '来源条目 3：AWS 计算与机器学习业务将更换负责人', requiredTokens: ['Dave Treadwell', 'AWS Compute and ML Services', 'Dave Brown', 'AI 算力服务'] },
  { title: 'Together AI 完成 8 亿美元融资，英伟达参与投资', sourceProjectionRuleMatches: ['anthropic-series-h'], enLabel: 'Together AI / NVIDIA / open model inference funding', zhEvidence: '来源条目 4：Together AI 完成 8 亿美元融资，英伟达参与投资', requiredTokens: ['Together AI', '8 亿美元', 'NVIDIA', 'Aramco Ventures', '推理基础设施'] },
  { title: '中国 AI 行业继续从模型竞赛转向商业化和场景落地', sourceProjectionRuleMatches: ['china-ai-commercialization-roi-2026'], enLabel: 'China / WorkBuddy / AI commercialization ROI', zhEvidence: '来源条目 5：中国 AI 行业继续从模型竞赛转向商业化和场景落地', requiredTokens: ['豆包', 'WorkBuddy', '收费', 'ROI', '数据安全'] },
];

export const bannedFallbackPhrases = [
  'The source tracks robotics deployment, agent platform, model capability update, strategic partnership',
  'The source tracks compute infrastructure, enterprise AI rollout around AWS, Amazon, Dave, Treadwell',
  'giving the daily brief a named actor and deployment context',
  'buyers must check access control, infrastructure availability, operational risk',
  'today AI / technology daily not generated',
  '今日 AI / 科技日报暂未生成',
  '-…',
  '...'
];

export const requiredEnglishOutputs = [
  '### 1. Anthropic / Canada / AI research ecosystem',
  '### 2. NVIDIA / Jetson Thor / edge robotics AI modules',
  '### 3. AWS / Compute and ML Services / AI infrastructure leadership',
  '### 4. Together AI / NVIDIA / open model inference funding',
  '### 5. China / WorkBuddy / AI commercialization ROI',
  'Evidence item 1: Anthropic / Canada / AI research ecosystem',
  'Amii, Mila, and the Vector Institute',
  'Evidence item 2: NVIDIA / Jetson Thor / edge robotics AI modules',
  'T3000 at 865 FP4 TFLOPS',
  'Evidence item 3: AWS / Compute and ML Services / AI infrastructure leadership',
  'Dave Treadwell',
  'Evidence item 4: Together AI / NVIDIA / open model inference funding',
  '800 million USD Series C',
  'Evidence item 5: China / WorkBuddy / AI commercialization ROI',
  'Doubao and WorkBuddy',
  '## Today’s Bottom Line',
  '## What to Watch Tomorrow',
  '## Evidence Matrix'
];

export const requiredZhOutputs = [
  'Anthropic 向加拿大 AI 研究投入 1000 万加元',
  'NVIDIA 发布 Jetson T3000、T2000，继续押注边缘 AI 和机器人',
  'AWS 计算与机器学习业务将更换负责人',
  'Together AI 完成 8 亿美元融资，英伟达参与投资',
  '中国 AI 行业继续从模型竞赛转向商业化和场景落地',
  '机器人公司如何用 Jetson Thor 降低部署成本',
  'Claude 被用于医疗和科研工作流',
  '## 今日结论',
  '## 明日跟踪点',
  '## 证据矩阵',
  '来源条目 5：中国 AI 行业继续从模型竞赛转向商业化和场景落地'
];

export const caseLevelFaqSignals = [
  {
    label: 'Canada AI research workflow validation',
    practicalCaseMatchTerms: ['Claude 被用于医疗和科研工作流', 'CHEO', 'CAMH', 'Mila'],
    sourceStoryMatchTerms: ['1000 万加元', 'Amii', 'Mila', 'Vector Institute'],
    requiredTerms: ['Canada AI research workflow validation', 'clinical review', 'audit logs'],
    links: ['/en/blog/openclaw-security-hardening-2026/', '/en/blog/openclaw-model-fallback-strategy/'],
  },
  {
    label: 'Jetson Thor edge robotics deployment loop',
    practicalCaseMatchTerms: ['机器人公司如何用 Jetson Thor 降低部署成本', '本地 Jetson Thor 推理'],
    sourceStoryMatchTerms: ['T3000', 'T2000', '865 FP4 TFLOPS'],
    requiredTerms: ['Jetson Thor edge robotics deployment loop', 'local inference', 'rollback'],
    links: ['/en/blog/agentic-engineering-guide/', '/en/blog/openclaw-model-fallback-strategy/'],
  },
];

export const parserGuardrails = {
  story1RequiredDetailTokens: ['1000 万加元', 'Amii', 'Mila', 'Vector Institute'],
  story1ForbiddenDetailTokens: ['named actor and deployment context', 'buyers must check access control'],
  story2RequiredDetailTokens: ['T3000', 'T2000', '865 FP4 TFLOPS', '400 FP4 TFLOPS'],
  story2ForbiddenDetailTokens: ['Hugging Face', 'LeRobot', 'Physical AI Agent Skills'],
  story3RequiredDetailTokens: ['Dave Treadwell', 'AWS Compute and ML Services', 'Dave Brown'],
  story3ForbiddenDetailTokens: ['AWS Continuum', 'Bedrock AgentCore'],
  story4RequiredDetailTokens: ['Together AI', '8 亿美元', 'NVIDIA', 'Aramco Ventures'],
  story4ForbiddenDetailTokens: ['Series H', 'Anthropic announced a Series H'],
  story5RequiredDetailTokens: ['豆包', 'WorkBuddy', '收费', 'ROI'],
  story5ForbiddenDetailTokens: ['generic China industry scale fallback'],
};
