---
title: "OpenClaw 模型回退链配置指南：限流、故障切换与成本优化实战"
description: "如何在 OpenClaw 中设计跨供应商的模型回退链，解决 429 限流、单供应商宕机和成本失控，附完整配置示例。"
pubDate: 2026-02-10
updatedDate: 2026-02-16
tags: ["openclaw", "models", "guide", "fallback", "429", "rate-limit"]
category: "guide"
lang: "zh"
---

模型回退链是 OpenClaw 可用性的核心架构。一条设计合理的链可以让你的智能体在 Anthropic 限流、OpenAI 宕机时无缝切换，用户无感知。

## 核心原则

回退链优先级应该是：**可用性 > 成本 > 风格一致性**。

## 实战链路设计

建议按"跨供应商交错"排列：
1. 主力高质量模型（如 Claude Opus）
2. 不同供应商的同档模型（如 GPT Codex）
3. 高性价比模型（如 MiniMax M2.1）
4. 快速响应模型（如 Gemini Flash）
5. 兜底备份（如 GLM）

这样能避免单供应商故障导致整条链路瘫痪。

### 完整配置示例

在 `~/.openclaw/openclaw.json` 中：

```json
{
  "agents": {
    "defaults": {
      "model": {
        "primary": "anthropic/claude-opus-4-6",
        "fallbacks": [
          "openai-codex/gpt-5.3-codex",
          "minimax-portal/MiniMax-M2.1",
          "google/gemini-3-pro-high",
          "google/gemini-3-flash",
          "zai/glm-4.7"
        ]
      }
    }
  }
}
```

**为什么这么排？** Opus → Codex 切换供应商避免限流撞车，MiniMax 提供低成本兜底，Gemini 系列保障可用性，GLM 作为最后的安全网。

## 运维规则

- **不要把同供应商模型连续放在一起**（Anthropic 429 时连续两个 Claude 模型都会失败）
- 定期用小任务探活所有模型
- 把"模型故障"和"提示词问题"分开记录
- 末尾保留一个"稳定但普通"的兜底模型

## 按场景覆盖模型

OpenClaw 支持按会话或 cron 任务指定不同模型：

- **主对话**：用顶级模型（Opus / GPT Codex）
- **定时任务**：用 Flash 或便宜模型（节省成本，自动化不需要最强推理）
- **群聊**：用 Sonnet 级别（响应快，成本可控）

## 提示词兼容建议

- system prompt 尽量简短、跨模型中立
- 非必要别绑定某家特有格式（如 Claude 的 `<thinking>` 标签）
- 提前验证各模型的 tool-call 行为

## 常见问题 FAQ

**Q：429 限流了怎么判断是限流还是网络断？**
A：429 返回 HTTP 状态码，日志里会明确显示 `429 Too Many Requests`。网络断会显示 `ETIMEOUT` 或 `ECONNREFUSED`。

**Q：回退到弱模型会不会影响体验？**
A：短暂的回退通常用户无感——大多数日常对话，Sonnet 和 Flash 够用。只有复杂推理和长链工具调用会有差异。

**Q：怎么知道当前用的哪个模型？**
A：运行 `openclaw status` 查看当前会话使用的模型，或检查日志中的模型选择记录。

## 总结

回退链不是省钱技巧，而是你的**可用性架构**。一条好的回退链，比任何单一顶级模型都更可靠。
