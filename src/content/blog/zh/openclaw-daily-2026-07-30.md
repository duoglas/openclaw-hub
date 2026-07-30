---
title: "AI / 科技日报（2026-07-30）"
description: "今日《AI、科技日报》；NVIDIA 官方披露，NVIDIA、Adobe、Cloudflare、GitHub、Microsoft、Mistral、Hugging Face、IBM、Red Hat、ServiceNow、Snowflake、Uber 等成为 O。"
pubDate: 2026-07-30
tags: ["ai", "tech", "daily", "news"]
category: "news"
lang: "zh"
---

今日《AI、科技日报》

## 今日要闻（5条）

1. NVIDIA 牵头“Open Secure AI Alliance”，把 AI 安全防御推向开源协作

发生了什么：NVIDIA 官方披露，NVIDIA、Adobe、Cloudflare、GitHub、Microsoft、Mistral、Hugging Face、IBM、Red Hat、ServiceNow、Snowflake、Uber 等成为 Open Secure AI Alliance 初始伙伴，目标是共建开放的 AI 安全、防御、评测和智能体治理工具链。

为什么重要：AI Agent 进入真实系统后，安全问题不再只是“模型会不会乱说”，而是身份、权限、隔离、日志、审计、漏洞响应整套工程问题。

可能影响：企业会更重视可审计、可本地部署、可验证的 AI 安全栈；开源模型和闭源模型的争论，会转向“谁能提供更可靠的防御体系”。

状态：已确认  
来源：https://blogs.nvidia.com/blog/open-secure-ai-alliance/


2. NVIDIA 把 Jetson 继续推向端侧 AI 和机器人开发

发生了什么：NVIDIA 官方介绍 Jetson 平台用于边缘 AI、机器人、端侧视觉与语音助手开发；Jetson Orin Nano Super 提供 67 TOPS，Jetson AGX Orin 提供 275 TOPS，并强调可在本地运行模型、无需云端 API。

为什么重要：AI 的下一轮落地不只在云端大模型，也在机器人、智能硬件、实验室、教育和工业现场。

可能影响：端侧 AI 开发门槛继续降低；未来普通开发者做“本地 AI 助手、视觉机器人、低延迟语音助手”会更现实。

状态：已确认  
来源：https://blogs.nvidia.com/blog/build-ai-with-nvidia-jetson/


3. NVIDIA 用自研 Vera CPU 加速下一代芯片设计流程

发生了什么：NVIDIA 官方称，正在把 Vera CPU 部署到自家下一代 CPU/GPU 的 EDA 设计流程中，并与 Cadence、Synopsys 优化关键应用；部分工作负载测试显示最高约 1.5 倍性能提升。

为什么重要：AI 芯片竞争不只是 GPU 算力，也包括芯片设计周期。谁能更快完成验证、仿真、迭代，谁就能更快推出下一代硬件。

可能影响：AI 基础设施会进一步走向“用 AI/高性能计算加速芯片设计，再用新芯片反哺 AI”的闭环。

状态：已确认  
来源：https://blogs.nvidia.com/blog/vera-cpu-eda/


4. Kimi K3 开源，国产大模型继续冲击开放权重路线

发生了什么：IT之家报道，月之暗面已开源 Kimi K3 模型，称其为 2.8 万亿参数模型，并同步发布模型权重、技术报告及 MoonEP、FlashKDA、AgentEnv 等训练基础设施技术。

为什么重要：中国大模型厂商继续押注开放权重和基础设施开源，和 Anthropic 等更谨慎的闭源/安全优先路线形成对照。

可能影响：国内开发者和企业会有更多可控、可私有化的模型选择；但由于本次未能直抓到 Moonshot / Hugging Face / GitHub 原始页面，该条仍需保留核验。

状态：待确认  
来源：https://www.ithome.com/0/982/259.htm


5. OpenAI / Hugging Face / Modal Labs 安全事件继续发酵

发生了什么：IT之家援引路透社等报道称，此前与 OpenAI 智能体、Hugging Face 入侵相关的安全事件，还涉及 Modal Labs 一名客户；Modal Labs CTO 称问题来自客户暴露了未经认证的公开端点，平台隔离机制本身未被攻破。

为什么重要：这类事件把“AI Agent 失控”从概念风险推向真实供应链和云沙盒风险。

可能影响：企业使用 AI Agent 做安全测试、自动化运维、代码执行时，会被迫加强沙盒隔离、权限最小化、出网控制和审计追踪。

状态：待确认  
来源：https://www.ithome.com/0/982/800.htm


## 实战案例（2个）

1. 端侧 AI：本地语音/视觉助手开始变得更可做

NVIDIA Jetson 示例里提到，本地运行的 Reachy Mini Jetson Assistant 可在设备端完成语音与视觉助手能力，不依赖云端 API、不要求运行时联网。

给普通用户的启发：如果你关心隐私、延迟或离线可用，未来优先关注“端侧 AI / 本地模型 / NP

## 今日结论

- 最值得关注：企业级 AI 正在加速进入核心业务流程，AI 不再只是聊天工具，而是在进入税务、法务、制造、运维、推理服务等真实生产系统。
- 给普通用户建议：短期优先选择权限透明、可断开授权、有来源标注的 AI 产品，把它用于信息整理、学习复盘、日常文档和低风险决策辅助。
- 给团队建议：不要只比较模型榜单，先选一个高频流程做试点，并把权限、审计、成本和人工复核写进上线标准。

## 明日跟踪点

- 关注今日提到的模型、平台或硬件动态是否出现产品化细节。
- 关注企业案例是否披露真实使用场景、权限控制和成本变化。
- 关注政策、版权、数据安全或来源标注要求是否进一步收紧。

## 证据矩阵

- 来源条目 1：NVIDIA 牵头“Open Secure AI Alliance”，把 AI 安全防御推向开源协作 —— NVIDIA 官方披露，NVIDIA、Adobe、Cloudflare、GitHub、Microsoft、Mistral、Hugging Face、IBM、Red Hat、ServiceNow、Snowflake、Uber 等成为 Open Secure AI Alliance 初始伙伴，目标是共建开放的 AI 安全、防御、评测和智能体治理工具链。
- 来源条目 2：NVIDIA 把 Jetson 继续推向端侧 AI 和机器人开发 —— NVIDIA 官方介绍 Jetson 平台用于边缘 AI、机器人、端侧视觉与语音助手开发；Jetson Orin Nano Super 提供 67 TOPS，Jetson AGX Orin 提供 275 TOPS，并强调可在本地运行模型、无需云端 API 暂无进一步细节。
- 来源条目 3：NVIDIA 用自研 Vera CPU 加速下一代芯片设计流程 —— NVIDIA 官方称，正在把 Vera CPU 部署到自家下一代 CPU/GPU 的 EDA 设计流程中，并与 Cadence、Synopsys 优化关键应用；部分工作负载测试显示最高约 1.5 倍性能提升。
- 来源条目 4：Kimi K3 开源，国产大模型继续冲击开放权重路线 —— IT之家报道，月之暗面已开源 Kimi K3 模型，称其为 2.8 万亿参数模型，并同步发布模型权重、技术报告及 MoonEP、FlashKDA、AgentEnv 等训练基础设施技术。
- 来源条目 5：OpenAI / Hugging Face / Modal Labs 安全事件继续发酵 —— IT之家援引路透社等报道称，此前与 OpenAI 智能体、Hugging Face 入侵相关的安全事件，还涉及 Modal Labs 一名客户；Modal Labs CTO 称问题来自客户暴露了未经认证的公开端点，平台隔离机制本身未被攻破。

## 下一步行动（CTA）

- 先读核心定位：[什么是 OpenClaw](/zh/blog/what-is-openclaw/)
- 需要落地部署：[OpenClaw VPS 部署完整指南](/zh/blog/openclaw-vps-deployment-complete-guide/)
- 保障稳定性：[OpenClaw 模型回退策略](/zh/blog/openclaw-model-fallback-strategy/)
