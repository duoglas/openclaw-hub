---
title: "OpenClaw `status` 和 `gateway status` 有什么区别？5 分钟定位“在线但不回消息”问题（2026）"
description: "很多人把 `openclaw status` 和 `openclaw gateway status` 混用，导致排障方向跑偏。本文给出可复制命令、判断标准和 5 分钟决策流，快速定位“网关问题”还是“渠道问题”。"
pubDate: 2026-03-05
tags: ["openclaw", "status", "gateway", "troubleshooting", "telegram"]
category: "guide"
lang: "zh"
---

你看到“机器人在线，但不回消息”时，第一步常常就走错：

- 只看了 `openclaw status`，误以为 Gateway 没问题
- 或只看了 `openclaw gateway status`，误以为渠道一定正常

这两条命令**不是同一层**。用错层，就会误判。

## 一句话结论

- `openclaw gateway status`：看 **Gateway 服务本身**（进程、连通性、RPC 探针）
- `openclaw status`：看 **渠道健康 + 会话摘要**（Telegram/Discord/Slack/Signal 等）

先判“网关活不活”，再判“渠道通不通”。

---

## 1) 先分清职责：一张表看懂

| 命令 | 关注层级 | 典型用途 | 常见误区 |
|---|---|---|---|
| `openclaw gateway status` | Gateway 服务层 | 判断网关是否运行、是否可探测 | 把它当成渠道连通性总览 |
| `openclaw status` | 渠道与会话层 | 看渠道健康、最近会话、全量诊断 | 用它替代网关进程排查 |

可直接查看官方 CLI 帮助（本地可验证）：

```bash
openclaw status --help
openclaw gateway status --help
```

> 待确认：不同版本输出字段名可能略有差异；本文命令已基于 OpenClaw 2026.3.3 本地帮助验证。

---

## 2) 5 分钟排障流程（可复制）

### 第一步：确认 Gateway 是否活着（30 秒）

```bash
openclaw gateway status
```

如果异常，再看深度状态：

```bash
openclaw gateway status --deep
```

若确实未运行，直接恢复：

```bash
openclaw gateway restart
openclaw gateway status
```

**判断标准**：
- 若 gateway 明确异常：先修网关，别急着查 Telegram token
- 若 gateway 正常：进入第二步查渠道

### 第二步：检查渠道健康（1-2 分钟）

```bash
openclaw status
openclaw status --deep --timeout 10000
```

需要可粘贴的完整快照时：

```bash
openclaw status --all
```

**判断标准**：
- gateway 正常 + channel 异常 => 渠道配置/权限/网络问题
- gateway 正常 + channel 正常但仍无回复 => 继续看日志链路

### 第三步：看日志确认“消息是否进了网关”

```bash
openclaw logs --follow
```

并在另一个终端重发一条测试消息，观察是否有入站/路由/发送记录。

---

## 3) 常见场景：为什么会误判？

### 场景 A：`openclaw status` 看起来“还行”，但其实网关刚崩
- 你看到的是渠道摘要，不等于 Gateway 进程稳定
- 应先跑 `openclaw gateway status --deep`

### 场景 B：`openclaw gateway status` 正常，但 Telegram 无回复
- 说明“服务活着”≠“渠道可用”
- 重点转向 `openclaw status --deep` + 渠道鉴权/冲突排查

### 场景 C：只截图一条命令输出，排障信息不够
建议一次性提供以下“最小证据包”：

```bash
openclaw gateway status --deep
openclaw status --all
openclaw logs --follow
```

---

## 4) 结论可验证清单（你可以逐条打勾）

- [ ] `openclaw gateway status` 可确认 Gateway 运行状态
- [ ] `openclaw status --deep` 可确认渠道探测结果
- [ ] `openclaw status --all` 可导出可粘贴诊断快照
- [ ] `openclaw logs --follow` 可观察实时链路事件

满足以上 4 条后，再决定是修“网关层”还是“渠道层”，排障效率会明显提升。

---

## 延伸阅读（内链）

- [OpenClaw Telegram 故障排查全指南](/zh/blog/openclaw-telegram-troubleshooting-guide/)
- [OpenClaw Gateway 启动失败怎么修？2026 可执行排查清单](/zh/blog/openclaw-gateway-start-failed-fix-checklist-2026/)
- [OpenClaw 日志排查指南：从报错到根因定位](/zh/blog/openclaw-logs-debug-guide/)
