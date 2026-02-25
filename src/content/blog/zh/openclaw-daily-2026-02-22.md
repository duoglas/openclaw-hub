---
title: "OpenClaw 今日要点（2026-02-22）"
description: "浏览器自动化稳定性与排障路径优化。"
pubDate: 2026-02-22
tags: ["openclaw", "daily", "key-points"]
category: "guide"
lang: "zh"
---

## 今日最重要的 3 件事
- 浏览器任务失败先看 profile/tabs，再判断是不是 relay attach。
- 排障步骤保持固定顺序，避免来回试错。
- 把常用诊断命令写进运行手册，减少临场记忆成本。

## 今天就能执行
- `openclaw browser status`
- `openclaw browser tabs`
- `openclaw logs --follow`

## 明日跟踪
- relay 是否经常出现未 attach
- 多标签切换时任务命中率
