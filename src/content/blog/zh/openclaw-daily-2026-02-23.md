---
title: "OpenClaw 今日要点（2026-02-23）"
description: "长跑任务的资源治理与稳定性。"
pubDate: 2026-02-23
tags: ["openclaw", "daily", "key-points"]
category: "guide"
lang: "zh"
---

## 今日最重要的 3 件事
- cron/长期会话重点看磁盘增长曲线，不只看当下可用空间。
- 对高频任务做“生成内容”和“发送内容”解耦，失败可重试。
- 维持统一告警口径，避免同一问题多通道重复打扰。

## 今天就能执行
- `df -h /`
- `openclaw sessions cleanup --dry-run`
- `openclaw status --deep`

## 明日跟踪
- 磁盘使用率是否持续逼近阈值
- 定时任务失败是否可自动恢复
