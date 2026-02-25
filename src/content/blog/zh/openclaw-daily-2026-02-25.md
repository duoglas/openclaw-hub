---
title: "AI / 科技日报（2026-02-25）"
description: "v2026.2.23 关键更新、SSRF 配置迁移与会话治理建议。"
pubDate: 2026-02-25
tags: ["ai", "tech", "daily", "news"]
category: "news"
lang: "zh"
---

📰 **AI / 科技日报 · 2026-02-25（周三）**

## 今日要闻（4条）

### 1) OpenClaw 发布 v2026.2.23
- **发生了什么**：新增 `kilocode` provider、`web_search` 的 kimi 支持、Moonshot 视频能力，并强化 sessions/cron 维护。
- **为什么重要**：多模型与多搜索源切换更灵活，运维工具链更完整。
- **可能影响**：长周期 agent/cron 场景的磁盘与日志膨胀风险下降。

### 2) Browser SSRF 配置有 breaking 变更
- **发生了什么**：配置键从 `browser.ssrfPolicy.allowPrivateNetwork` 迁移为 `browser.ssrfPolicy.dangerouslyAllowPrivateNetwork`，默认策略更偏安全。
- **为什么重要**：兼容与安全同时变化，旧配置可能出现行为偏差。
- **可能影响**：内网抓取/私网站点自动化需要复核，建议跑一次 `openclaw doctor --fix`。

### 3) `openclaw sessions cleanup` 成为官方维护入口
- **发生了什么**：支持 `--dry-run / --enforce / --all-agents / --active-key` 等会话治理参数。
- **为什么重要**：高频 cron、多人协作、长期会话更容易做容量治理。
- **可能影响**：可从“手动删历史”转向“策略化清理”，减少磁盘打满与上下文污染。

### 4) Browser profile 路由问题（#4841）已关闭
- **发生了什么**：此前“忽略 profile、误路由到 chrome relay”的问题已关闭。
- **为什么重要**：浏览器自动化排障路径更清晰。
- **可能影响**：可按 `status/profiles/tabs` → attach/网关分层定位问题。

## 实战案例（2个）

### 案例 A：网关故障 1-3 分钟恢复
**背景**：浏览器工具报 `browser control service unreachable`。  
**步骤**：
```bash
openclaw gateway status
openclaw doctor --fix
openclaw gateway restart
openclaw gateway probe
```
**结果**：常见“服务挂起/状态漂移/端口异常”可快速恢复。

### 案例 B：Relay attach 修复 + 日报自动发布
**背景**：Chrome Relay 报 `no tab connected`，并希望日报自动推送。  
**步骤**：
```bash
openclaw browser status
openclaw browser tabs
# 在目标标签页点击 OpenClaw Browser Relay 图标（badge ON）
```
**结果**：浏览器任务恢复；内容生成与发送可拆分，提高失败可重试性。

## 今日结论

### 最值得关注
1. v2026.2.23 的“能力扩展 + 运维增强”是关键更新。  
2. SSRF 配置迁移必须尽快复核。

### 给普通用户/创业者的建议
1. 先跑一次 `openclaw doctor --fix`。  
2. 再跑一次 `openclaw sessions cleanup --dry-run`，评估后再决定是否 enforce。

### 明日跟踪点
- kimi 搜索在现有链路的稳定性与成本表现。  
- cleanup 执行后的磁盘占用与会话命中率变化。  
- Browser Relay 在多标签/多 profile 下的 attach 成功率与恢复时延。
