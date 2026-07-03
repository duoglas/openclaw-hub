---
title: "AI / 科技日报（2026-06-15）"
description: "截至 2026-06-15 07:30（北京时间）；Anthropic 称，美国政府以国家安全权限发出出口管制指令，要求暂停所有外国国民访问 Claude Fable 5 和 Mythos 5；为合规，Anthropic 已对所有客户禁用这两个模型。"
pubDate: 2026-06-15
tags: ["ai", "tech", "daily", "news"]
category: "news"
lang: "zh"
---

《AI、科技日报》  
截至 2026-06-15 07:30（北京时间）

## 今日要闻（5条）

1. Anthropic 的 Claude Fable 5 / Mythos 5 被美国政府要求暂停访问

发生了什么：Anthropic 称，美国政府以国家安全权限发出出口管制指令，要求暂停所有外国国民访问 Claude Fable 5 和 Mythos 5；为合规，Anthropic 已对所有客户禁用这两个模型。其他 Anthropic 模型不受影响。

为什么重要：这是前沿模型首次出现“已发布后被政府指令临时下架”的高强度监管事件。争议点在于：政府认为存在 jailbreak 风险，Anthropic 则称目前看到的证据不足以支持全面召回。

可能影响：  
- 前沿模型发布会更依赖政府预审、安全评估和留痕机制。  
- 企业客户会更重视“模型可用性风险”，不只看能力。  
- AWS 等云平台上的相关模型访问恢复时间：待确认。

2. AWS Graviton5 正式可用，云 CPU 开始明确面向 Agentic AI 优化

发生了什么：AWS 宣布 Graviton5 驱动的 EC2 M9g / M9gd 实例正式可用。官方称 Graviton5 相比上一代最高快 25%，机器学习推理快 35%，并强调其面向 agentic AI 的实时推理、多步任务编排和高并发环境。

为什么重要：AI 基础设施竞争不再只围绕 GPU。Agent 应用需要大量 CPU 侧调度、工具调用、沙箱运行、数据库访问和并发环境，CPU 性能会直接影响端到端体验。

可能影响：  
- 云厂商会把“Agent 工作负载”变成新硬件卖点。  
- 企业部署 AI Agent 时，成本优化会从 GPU 扩展到 CPU、网络、存储全栈。  
- 普通开发者可能更快看到低延迟、低成本的云端 Agent 服务。

3. NVIDIA Blackwell 在 Agentic AI 基准中强调“每兆瓦可跑更多 Agent”

发生了什么：NVIDIA 称 Blackwell Ultra NVL72 在 Artificial Analysis 的 AgentPerf 基准中领先；官方说 GB300 NVL72 可比 H200 每兆瓦运行最多 20 倍更多 Agent。

为什么重要：传统 AI 推理基准多看单次模型响应；Agent 任务会连续调用模型、工具、代码执行和检索，压力完全不同。NVIDIA 正在推动行业用“可同时跑多少 Agent / 每瓦产出多少任务”来衡量 AI 基础设施。

可能影响：  
- AI 数据中心采购指标会从“token 吞吐”转向“Agent 任务吞吐”。  
- Cursor、企业自动化、AI 员工平台这类产品会更依赖底层推理效率。  
- 电力约束下，能效会成为大模型商业化核心竞争点。

4. 中国工信部推进“人工智能+信息通信”，提出 2028 / 2030 阶段目标

发生了什么：新华网报道，工信部印发《“人工智能+信息通信”创新发展实施意见（2026—2028年）》。目标包括：到 2028 年形成 30 个以上高价值典型场景、打造一批典型应用和特色智能体；城域算力 1 毫秒时延圈覆盖率不低于 75%。

为什么重要：中国 AI 落地重点正在从“模型能力”转向“网络、算力、终端、行业智能体”的基础设施协同。信息通信网络将成为 AI 应用规模化的底座。

可能影响：  
- 运营商、设备商、云厂商会加速布局网络智能体、边缘推理、5G-A/6G 与 AI 融合。  
- 工业、交通、低空经济、制造等场景会更快获得边缘 AI 能力。  
- 中小企业可能获得更多“网络+AI”的套餐式服务。

5. OpenAI 简化 ChatGPT 模型选择器，把“推理强度”变成用户可见选项

发生了什么：OpenAI Help Center 显示，ChatGPT 正在把模型选择器简化为 Instant、Medium、High、Extra High、Pro Standard、Pro Extended 等选项，并向 Plus / Pro 用户在 Web、iOS、Android 全球推出。

为什么重要：大模型产品正在从“让用户记模型名”转向“让用户选择速度与推理强度”。这说明模型能力已经产品化为可调档位，而不是单一模型入口。

可能影响：  
- 普通用户更容易按任务选择：快问快答用 Instant，复杂分析用 High。  
- 付费订阅会围绕“更高推理强度、更长任务、更稳定结果”分层。  
- 竞品也可能跟进“抽象模型名、突出任务档位”的交互方式。

## 实战案例（2个）

1. 企业 Agent 部署：不要只盯模型，先算基础设施账
…

## 今日结论

- 最值得关注：企业级 AI 正在加速进入核心业务流程，AI 不再只是聊天工具，而是在进入税务、法务、制造、运维、推理服务等真实生产系统。
- 给普通用户建议：短期优先选择权限透明、可断开授权、有来源标注的 AI 产品，把它用于信息整理、学习复盘、日常文档和低风险决策辅助。
- 给团队建议：不要只比较模型榜单，先选一个高频流程做试点，并把权限、审计、成本和人工复核写进上线标准。

## 明日跟踪点

- 关注今日提到的模型、平台或硬件动态是否出现产品化细节。
- 关注企业案例是否披露真实使用场景、权限控制和成本变化。
- 关注政策、版权、数据安全或来源标注要求是否进一步收紧。

## 证据矩阵

- 来源条目 1：Anthropic 的 Claude Fable 5 / Mythos 5 被美国政府要求暂停访问 —— Anthropic 称，美国政府以国家安全权限发出出口管制指令，要求暂停所有外国国民访问 Claude Fable 5 和 Mythos 5；为合规，Anthropic 已对所有客户禁用这两个模型。其他 Anthropic 模型不受影响。
- 来源条目 2：AWS Graviton5 正式可用，云 CPU 开始明确面向 Agentic AI 优化 —— AWS 宣布 Graviton5 驱动的 EC2 M9g / M9gd 实例正式可用。官方称 Graviton5 相比上一代最高快 25%，机器学习推理快 35%，并强调其面向 agentic AI 的实时推理、多步任务编排和高并发环境。
- 来源条目 3：NVIDIA Blackwell 在 Agentic AI 基准中强调“每兆瓦可跑更多 Agent” —— NVIDIA 称 Blackwell Ultra NVL72 在 Artificial Analysis 的 AgentPerf 基准中领先；官方说 GB300 NVL72 可比 H200 每兆瓦运行最多 20 倍更多 Agent。
- 来源条目 4：中国工信部推进“人工智能+信息通信”，提出 2028 / 2030 阶段目标 —— 新华网报道，工信部印发《“人工智能+信息通信”创新发展实施意见（2026—2028年）》。目标包括：到 2028 年形成 30 个以上高价值典型场景、打造一批典型应用和特色智能体；城域算力 1 毫秒时延圈覆盖率不低于 75%。
- 来源条目 5：OpenAI 简化 ChatGPT 模型选择器，把“推理强度”变成用户可见选项 —— OpenAI Help Center 显示，ChatGPT 正在把模型选择器简化为 Instant、Medium、High、Extra High、Pro Standard、Pro Extended 等选项，并向 Plus / Pro 用户在 Web、iOS、Android 全球推出。

## 下一步行动（CTA）

- 先读核心定位：[什么是 OpenClaw](/zh/blog/what-is-openclaw/)
- 需要落地部署：[OpenClaw VPS 部署完整指南](/zh/blog/openclaw-vps-deployment-complete-guide/)
- 保障稳定性：[OpenClaw 模型回退策略](/zh/blog/openclaw-model-fallback-strategy/)
