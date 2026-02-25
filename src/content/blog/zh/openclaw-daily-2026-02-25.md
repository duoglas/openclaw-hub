---
title: "OpenClaw 今日要点（2026-02-25）"
description: "围绕 v2026.2.23 的发布重点与立即行动建议。"
pubDate: 2026-02-25
tags: ["openclaw", "daily", "key-points"]
category: "guide"
lang: "zh"
---

## 今日最重要的 3 件事
- v2026.2.23 增强了 provider/search 能力，同时强化 sessions/cron 维护入口。
- SSRF 配置键迁移（allowPrivateNetwork → dangerouslyAllowPrivateNetwork）需尽快复核。
- 浏览器自动化排障统一为“profile 明确化 + relay attach 可视化”。

## 今天就能执行
- `openclaw doctor --fix`
- `openclaw sessions cleanup --dry-run`
- `openclaw browser status`

## 明日跟踪
- kimi 搜索在现有链路的稳定性与成本
- cleanup 执行后磁盘与会话命中率变化
