---
title: "DeerFlow 2.0 深度解读：从 Deep Research 到 SuperAgent Harness"
description: "解析 DeerFlow 2.0 重写后的 Sub-agents、Sandbox、Memory、Skills、部署规格和长任务 Agent 架构。"
pubDate: 2026-06-09
tags: ["deerflow", "agent-harness", "deep-research", "bytedance", "multi-agent"]
category: "analysis"
lang: "zh"
---

DeerFlow 2.0 不是普通的大版本升级，而是一次重新定位。

官方 README 明确说，DeerFlow 2.0 是 ground-up rewrite，和 v1 不共享代码。原来的 1.x 分支仍保留为 Deep Research framework，但主线已经转向新的方向：**open-source super agent harness**。

这个变化很重要。它说明 DeerFlow 不再只是“查资料并写报告”的研究工具，而是在做一个可以支撑长任务的 Agent 执行系统。

## 从 Deep Research 到 Harness

Deep Research 的核心是信息获取、阅读、推理和报告生成。它解决的是“如何让模型更系统地研究一个问题”。

SuperAgent Harness 要解决的问题更大：

- 如何拆解长任务。
- 如何让多个子 Agent 协作。
- 如何在 sandbox 中执行代码和文件操作。
- 如何保存长期上下文。
- 如何复用 skills。
- 如何把研究、编码、生成、验证连成工作流。

所以 DeerFlow 2.0 的关键词不是“搜索”，而是“执行环境”。

## 核心架构

DeerFlow 2.0 的 README 把它描述为一个能 orchestrate sub-agents、memory、sandboxes，并由 extensible skills 驱动的 super agent harness。

几个核心组件是：

### Sub-agents

复杂任务不能只靠一个 Agent 从头做到尾。Sub-agents 负责把任务拆开，例如：研究一个主题、抓取信息、生成初稿、审校事实、运行代码、验证输出。

这让 DeerFlow 更适合长任务，而不是一次性问答。

### Sandbox 和文件系统

Sandbox 是执行型 Agent 的关键。没有隔离环境，Agent 做代码、文件、命令执行时风险很高。

DeerFlow 把 sandbox 和 file system 放在核心能力里，说明它面向的是“生成可验证产物”，而不是只生成文本回答。

### Memory

长任务需要记忆。Memory 不只是聊天历史，而是任务过程中的稳定上下文：目标、约束、已验证来源、失败尝试、产物状态、用户偏好。

没有 Memory，Agent 很容易在多步骤任务里重复、遗忘或偏离目标。

### Skills & Tools

Skills 是把能力封装成可复用模块的方式。相比把所有说明写进 prompt，skills 更适合长期维护，也更容易审计和复用。

这也是 OpenClaw、Hermes、DeerFlow 都在靠近的方向：Agent 能力应该模块化，而不是靠单次提示词硬塞。

## One-Line Agent Setup 的意义

DeerFlow README 里有一个很有意思的设计：给 Claude Code、Codex、Cursor、Windsurf 等 coding agent 的 one-line setup prompt。

意思是，你可以让另一个 coding agent 根据安装文档帮你 clone、bootstrap、选择 Docker 或本地开发方式，并在缺配置时停下来告诉你下一步。

这反映了一个趋势：Agent 框架开始默认“由另一个 Agent 安装和维护”。

也就是说，未来的复杂开源项目不只写给人读，也要写给 coding agent 执行。

## 部署和模型

DeerFlow 2.0 对部署规格给了明确建议。轻量本地评估可以较小配置启动，但长任务服务、多人使用、sandbox 工作负载需要更高 CPU、内存和磁盘空间。

它还支持 Docker、本地开发、MCP server、LangSmith / Langfuse tracing，以及多种模型/provider 配置方式，包括 OpenRouter、Responses API、vLLM、Codex CLI、Claude Code OAuth 等。

这说明 DeerFlow 的目标不是玩具项目，而是可部署、可观测、可集成的执行平台。

## 和其他 Deep Research 项目的区别

Alibaba DeepResearch、MiroThinker、Skywork DeepResearchAgent 等项目都在推进研究型 Agent。但 DeerFlow 2.0 的不同点在于它更强调 harness：

- 不只是研究结果。
- 更强调子 Agent 编排。
- 更强调 sandbox 执行。
- 更强调 skills 和文件产物。
- 更强调部署和运行环境。

这让它适合作为“后端执行层”，接入 OpenClaw 这样的入口型 Agent 系统。

## 对 OpenClaw 生态的意义

OpenClaw 擅长做个人入口和多渠道 Gateway。DeerFlow 擅长做长任务执行。

如果把两者组合起来，架构可以是：

- 用户通过 Telegram / Web / Slack 找 OpenClaw。
- OpenClaw 判断任务是否是长任务。
- 简单任务本地完成。
- 复杂研究、内容生产、代码生成交给 DeerFlow。
- DeerFlow 产出报告或文件后返回给 OpenClaw。
- OpenClaw 再交付给用户。

这就是 Agent 生态可能走向的分层：入口层、编排层、执行层、验证层。

## 结论

DeerFlow 2.0 的意义不在于“又一个 Deep Research 工具”，而在于它把 Deep Research 升级成了可执行、可部署、可扩展的 Agent Harness。

它代表了 2026 年 Agent 框架的一个核心方向：

**真正有用的 Agent 不只是回答问题，而是能在安全环境中拆任务、查资料、调用工具、生成文件、验证结果，并把长任务跑完。**
