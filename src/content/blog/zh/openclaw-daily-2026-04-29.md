---
title: "AI / 科技日报（2026-04-29）"
description: "1. Anthropic 发布 “Claude for Creative Work”；Anthropic 4 月 28 日发布面向创意工作的方案，新增一批连接器，让 Claude 可接入 Adobe、Autodesk Fusion、Ble。"
pubDate: 2026-04-29
tags: ["ai", "tech", "daily", "news"]
category: "news"
lang: "zh"
---

《AI、科技日报》｜2026-04-29

今日要闻（5条）

1. Anthropic 发布 “Claude for Creative Work”
发生了什么：
Anthropic 4 月 28 日发布面向创意工作的方案，新增一批连接器，让 Claude 可接入 Adobe、Autodesk Fusion、Blender、Ableton、SketchUp、Splice 等工具。

为什么重要：
这不是单纯“再发一个模型”，而是把 AI 往真实创作流程里塞。重点是接现有软件，而不是要求创作者换工作流。

可能影响：
设计、视频、3D、音乐行业会更快进入“AI 做重复劳动，人做审美和决策”的阶段。对普通创作者来说，门槛会继续下降；对软件厂商来说，谁先把 AI 接进主流程，谁就更占先手。

2. AWS 与 OpenAI 扩大合作，把 OpenAI 模型和 Codex 带进 Amazon Bedrock
发生了什么：
Amazon 官方宣布，最新 OpenAI 模型将以 limited preview 形式进入 Amazon Bedrock；Codex 也将登陆 Bedrock；同时推出由 OpenAI 驱动的 Bedrock Managed Agents。

为什么重要：
这意味着企业买 AI，不再只是“选模型”，而是直接选整套基础设施、权限、审计、治理能力。OpenAI 正在更深地嵌入 AWS 企业云生态。

可能影响：
企业落地 AI Agent 的速度会变快，尤其是本来就重度使用 AWS 的公司。中长期看，模型厂商和云厂商的绑定会更紧，企业侧的“多模型统一接入”会成主流。

3. AWS 发布桌面 AI 助手 Amazon Quick
发生了什么：
Amazon 同日发布 Amazon Quick 桌面应用。官方说法是，它能连本地文件、日历、邮件和多种企业应用，并逐步形成“长期记忆”，还能生成演示文稿、仪表盘和文档。

为什么重要：
这代表企业 AI 正从“聊天框助手”走向“常驻桌面、跨应用、持续感知上下文”的工作代理。

可能影响：
如果这类产品被企业接受，办公软件入口、浏览器入口、操作系统入口都会重新洗牌。普通上班族未来最常见的 AI，可能不是单独网页，而是驻留在工作环境里的助手。

4. NVIDIA 发布开源多模态模型 Nemotron 3 Nano Omni
发生了什么：
NVIDIA 4 月 28 日宣布推出 Nemotron 3 Nano Omni，主打把视觉、音频、文本统一到一个开放模型里，官方称可用于 GUI 操作、文档理解、音视频推理等 Agent 场景，并称吞吐效率最高可达同类开放 omni 模型的 9 倍。

为什么重要：
Agent 现在最大痛点之一，就是多模态任务链条太长、延迟太高。NVIDIA 这次不是只拼参数，而是直接打“效率+部署灵活性”。

可能影响：
企业做多模态 Agent 时，可能更愿意尝试开放模型路线，尤其是对数据本地化、成本和可控性要求高的团队。也会进一步推高“AI 基础设施+开源模型”这一组合的吸引力。

5. 中国科学院发布“磐石100”模型体系；国内监管继续加码 AI 生成内容标识
发生了什么：
新华社报道，中国科学院 4 月 28 日发布“磐石100”模型体系，以“磐石·科学基础大模型”为底座，面向 8 大学科建设领域模型集群。同日，新华社转载“网信中国”消息称，网信部门依法查处“剪映”“猫箱”App 及“即梦AI”网站等生成合成内容标识违法问题。

为什么重要：
前者说明中国 AI 正继续往“科研垂类大模型”深入，不只是拼通用聊天；后者说明监管重点已从“能不能做”转向“怎么标、怎么管、怎么追责”。

可能影响：
中国 AI 行业会继续呈现两条线并行：一条是科研/产业垂类深化，另一条是合规门槛抬高。对产品团队来说，生成内容标识、留痕、审计会越来越不能省。

实战案例（2个）

1. 创意团队可直接关注 Claude 新连接器
适合谁：
设计、视频、3D、音乐、品牌内容团队。

怎么用：
如果团队本来就在用 Adobe、Blender、SketchUp 这类工具，这类连接器的意义不是“替代设计师”，而是把批量改图、素材整理、脚本生成、跨工具搬运这类低价值重复活先自动化。

现实建议：
先挑一个最重复、最标准化的小流程试点，比如批量导出、素材重命名、脚本辅助，不要一上来就让 AI 接整条生产链。

2. 企业 IT/产品团队可盯紧 Bedrock + Codex / Quick 组合
适合谁：
已经在 AWS 上跑业务的公司。

怎么用：
一个偏“开发代理”（Codex on Bedrock），一个偏“办公代理”（Quick），再叠加 Managed Agents，Amaz…

## 下一步行动（CTA）

- 先读核心定位：[什么是 OpenClaw](/zh/blog/what-is-openclaw/)
- 需要落地部署：[OpenClaw VPS 部署完整指南](/zh/blog/openclaw-vps-deployment-complete-guide/)
- 保障稳定性：[OpenClaw 模型回退策略](/zh/blog/openclaw-model-fallback-strategy/)
