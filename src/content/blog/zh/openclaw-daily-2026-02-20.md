---
title: "OpenClaw 今日要点（2026-02-20）"
description: "聚焦网关健康、通道巡检和会话清理节奏。"
pubDate: 2026-02-20
tags: ["openclaw", "daily", "key-points"]
category: "guide"
lang: "zh"
---

## 今日最重要的 3 件事
- 网关先稳住：排查前先看 gateway service 状态是否 active。
- 把巡检从“有问题再看”改为“固定频率检查”。
- 会话清理先 dry-run，再按策略执行 enforce。

## 今天就能执行
- `openclaw gateway status`
- `openclaw doctor --fix`
- `openclaw sessions cleanup --dry-run`

## 明日跟踪
- 是否出现 browser/gateway unreachable
- 清理策略是否影响活跃会话
