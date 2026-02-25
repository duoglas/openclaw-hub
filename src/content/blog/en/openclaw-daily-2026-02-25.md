---
title: "AI & Tech Daily Brief (2026-02-25)"
description: "Synced with Telegram daily brief."
pubDate: 2026-02-25
tags: ["ai", "tech", "daily", "news"]
category: "news"
lang: "en"
---

OpenClaw 日报｜2026-02-25（周三）

1) 今日新鲜资讯（4条）

- 资讯1：OpenClaw 发布 v2026.2.23（GitHub Release，2026-02-24）
- 发生了什么：新增 `kilocode` 一等 provider、`web_search provider=kimi`、Moonshot 视频能力；并强化 sessions/cron 维护。
- 为什么重要：模型与搜索供应商更灵活，且会话维护从“手工清理”升级到“可策略化清理”。
- 可能影响：多模型团队可直接降切换成本；长跑 agent/cron 场景的磁盘与日志膨胀风险下降。

- 资讯2：Browser SSRF 配置发生 breaking 变更（同版 release）
- 发生了什么：配置键从 `browser.ssrfPolicy.allowPrivateNetwork` 迁移到 `browser.ssrfPolicy.dangerouslyAllowPrivateNetwork`；默认策略调整为 trusted-network 模式。
- 为什么重要：这是“兼容+安全”双重变更，老配置若不迁移，容易出现行为偏差。
- 可能影响：内网自动化（本地服务抓取、私网站点测试）需要复核；建议跑一次 `openclaw doctor --fix`。

- 资讯3：`openclaw sessions cleanup` 成为官方维护入口（CLI 2026.2.23）
- 发生了什么：可 `--dry-run / --enforce / --all-agents / --active-key` 做会话存储治理。
- 为什么重要：对高频 cron、长期会话、多人多 agent 协作非常关键。
- 可能影响：可把“手动删历史”改成“定期维护任务”，减少磁盘打满和上下文污染。

- 资讯4：Browser profile 路由问题（Issue #4841）已关闭（2026-02-13）
- 发生了什么：此前“忽略 profile、误路由到 chrome relay”的问题已关闭。
- 为什么重要：浏览器自动化现在更依赖“明确 profile + 正确 attach tab”流程。
- 可能影响：排障方式更清晰：先看 `browser status/profiles/tabs`，再区分是 Relay attach 问题还是网关问题。

2) 实战案例（2个）

- 案例A：网关故障恢复（常见报错：browser control service unreachable）
- 背景：浏览器工具/消息转发突然失败，报“无法连接 gateway/browser control service”。
- 做法：
1) 快速体检：`openclaw gateway status`
2) 自动修复：`openclaw doctor --fix`
3) 强制重启网关：`openclaw gateway restart`
4) 二次探测：`openclaw gateway probe`
- 结果：大多数“服务挂起/端口占用/状态漂移”可在 1-3 分钟内恢复。
- 可复制命令：
- `openclaw gateway status`
- `openclaw doctor --fix`
- `openclaw gateway restart`
- `openclaw gateway probe`

- 案例B：Relay 连接修复 + Telegram 自动发布流水线
- 背景：Chrome 扩展 Relay 模式下，任务报“relay running but no tab connected”；且希望日报自动推送到 Telegram。
- 做法：
1) 修 Relay：在目标标签页点击 OpenClaw Browser Relay 图标（badge 亮起）。
2) 校验状态：`openclaw browser status`、`openclaw browser tabs`
3) 建日报 cron：定时跑“生成日报”任务并 announce。
4) 手动补发（兜底）：用 message send 发到 Telegram 指定目标。
- 结果：浏览器任务恢复；日报可定时产出，失败时可人工一键补发。
- 可复制命令：
- `openclaw browser status`
- `openclaw browser tabs`
- `openclaw cron add --name daily-news --cron "30 7 * * *" --tz "Asia/Shanghai" --message "产出OpenClaw日报..." --announce`
- `o…
