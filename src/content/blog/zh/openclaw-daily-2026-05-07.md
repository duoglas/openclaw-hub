---
title: "AI / 科技日报（2026-05-07）"
description: "2026-05-07 早报；1. OpenAI 将 GPT-5.5 Instant 作为 ChatGPT 默认模型推出；OpenAI 发布 GPT-5.5 Instant，并称其开始替代 GPT-5.3 Instant，面向所有 Chat。"
pubDate: 2026-05-07
tags: ["ai", "tech", "daily", "news"]
category: "news"
lang: "zh"
---

《AI、科技日报》  
2026-05-07 早报

## 今日要闻（5条）

1. OpenAI 将 GPT-5.5 Instant 作为 ChatGPT 默认模型推出

发生了什么：  
OpenAI 发布 GPT-5.5 Instant，并称其开始替代 GPT-5.3 Instant，面向所有 ChatGPT 用户滚动上线；同时加强个性化记忆、文件/Gmail 上下文使用，并提供 memory sources 可见性。

为什么重要：  
默认模型升级影响面最大。OpenAI 称新模型在高风险提示中幻觉声明减少 52.5%，在用户标记过事实错误的复杂对话中不准确声明减少 37.3%。

可能影响：  
普通用户会感到回答更短、更准、更少追问。企业用户会更重视“记忆来源可解释”和隐私控制，AI 助手从“聊天工具”继续向“长期上下文工作台”靠近。

来源：OpenAI 官方，L1，已直抓。


2. OpenAI 发布 B2B Signals：企业 AI 差距从“有没有用”转向“用得多深”

发生了什么：  
OpenAI 发布 B2B Signals，基于去标识、聚合后的企业使用信号，衡量 AI 在企业内扩散情况。报告称，前沿企业的人均“智能使用量”已达到普通企业的 3.5 倍，一年前约为 2 倍；Codex 使用差距尤其明显，前沿企业人均 Codex 消息量为普通企业 16 倍。

为什么重要：  
企业 AI 竞争不再只是买多少 seat，而是能否把 AI 嵌进真实流程、代码、研究、客服、风控和内部系统。

可能影响：  
企业会从“员工会不会用 ChatGPT”转向考核“哪些流程被 AI 重构”。AI agent、Codex、Deep Research 这类深度工具会成为企业成熟度指标。

来源：OpenAI 官方，L1，已直抓。


3. OpenAI、NVIDIA、AMD 等推动 MRC 成为大规模 AI 训练网络开放规范

发生了什么：  
OpenAI 宣布与 AMD、Broadcom、Intel、Microsoft、NVIDIA 等共同开发 MRC（Multipath Reliable Connection），并通过 Open Compute Project 发布规范。NVIDIA、AMD 也分别发布文章，说明 MRC 用于提升超大规模 AI 训练网络的吞吐、可靠性和故障绕行能力。

为什么重要：  
前沿模型训练的瓶颈不只在 GPU，也在网络。OpenAI 称 MRC 已部署在其最大的 NVIDIA GB200 超算集群中，包括 OCI Abilene 和 Microsoft Fairwater，用于训练多个模型。

可能影响：  
AI 基础设施竞争会从“谁有更多 GPU”升级到“谁能让十万级 GPU 更稳定地协同”。开放网络协议可能降低部分厂商锁定，也会加速云厂商、芯片厂商围绕 AI factory 的标准竞争。

来源：OpenAI / NVIDIA / AMD 官方，L1，已直抓。


4. GitHub 讨论 agentic software 的验证难题：AI agent 测试不能再只靠固定脚本

发生了什么：  
GitHub 官方博客发布文章，讨论 Copilot Coding Agent / Agent Mode 等非确定性 agent 的验证问题。文章认为，传统测试假设“正确行为可重复”，但 agent 在 UI、浏览器、IDE 中可能通过多条路径完成同一目标，因此需要新的“Trust Layer”。

为什么重要：  
AI 编程 agent 进入真实开发流程后，最大问题不是“能不能写代码”，而是“如何证明它真的完成了任务”。固定录制脚本、截图比对、单一路径断言都容易误判。

可能影响：  
未来 CI/CD 会增加面向 agent 的验证层：检查关键结果，而不是死盯每一步动作。开发团队会更重视可解释、可审计、可容错的 agent 测试框架。

来源：GitHub 官方，L1，已直抓。


5. 中国具身智能热度上升，安全问题被集中讨论

发生了什么：  
新华网报道，五一期间机器人、机器狗等具身智能设备频繁出现在景区和商场，但安全隐患也被放大。报道提到商用机器狗被远程劫持演示、摄像头静默开启、攻击假人模型等风险，并引用行业观点称具身智能安全可能从“数据安全”升级为“生产安全”和“生命安全”。

为什么重要：  
具身智能把 AI 从屏幕带到现实世界。一旦机器人、机器狗、工业智能体失控，风险不再只是错误回答，而可能造成物理伤害。

可能影响：  
具身智能行业会更快进入标准、评测、安全准入阶段。企业采购机器人时，安全测试、远程控制权限、日志审计、供应链安全会成为刚需。

来源：新华网，…

## 下一步行动（CTA）

- 先读核心定位：[什么是 OpenClaw](/zh/blog/what-is-openclaw/)
- 需要落地部署：[OpenClaw VPS 部署完整指南](/zh/blog/openclaw-vps-deployment-complete-guide/)
- 保障稳定性：[OpenClaw 模型回退策略](/zh/blog/openclaw-model-fallback-strategy/)
