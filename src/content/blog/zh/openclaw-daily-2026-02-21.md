---
title: "OpenClaw 今日要点（2026-02-21）"
description: "安全警告与插件治理的当日重点。"
pubDate: 2026-02-21
tags: ["openclaw", "daily", "key-points"]
category: "guide"
lang: "zh"
---

## 今日最重要的 3 件事
- 对审计里的 warn 项做优先级分层：先处理暴露面，再处理供应链项。
- 插件安装建议固定版本，减少“今天好好的明天坏了”。
- 只给不可信输入最小工具权限，降低误触风险。

## 今天就能执行
- `openclaw security audit`
- `openclaw security audit --deep`
- `openclaw status`

## 明日跟踪
- trustedProxies 配置是否符合当前部署
- 插件版本与完整性元数据是否齐全
