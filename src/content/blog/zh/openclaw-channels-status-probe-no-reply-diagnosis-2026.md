---
title: "OpenClaw `channels status --probe` 实战：机器人在线却不回复，5 分钟定位到具体渠道（2026）"
description: "当 OpenClaw 机器人显示在线但不回复时，很多人只看 gateway 状态。本文用 `openclaw channels status --probe` 给出可复制的分层排查流程，快速定位是网关、渠道凭据、群策略还是模型层问题。"
pubDate: 2026-03-06
tags: ["openclaw", "channels", "status", "probe", "telegram", "troubleshooting"]
category: "guide"
lang: "zh"
---

你遇到过这种情况吗：

- `openclaw gateway status` 显示正常
- Telegram 机器人也“在线”
- 但消息就是不回

高频误区是：只看服务层，不看渠道探针。

这篇给你一个可执行结论：**先看网关，再用 `channels status --probe` 定位渠道真因**。

## 一句话结论

- `openclaw gateway status`：回答“Gateway 服务活不活”
- `openclaw channels status --probe`：回答“具体渠道能不能收发、凭据是否可用”

当你怀疑“在线但不回复”，第二条命令通常更快命中根因。

---

## 1) 先做 60 秒基线检查（可复制）

```bash
openclaw gateway status --deep
openclaw status --deep --timeout 10000
```

如果 Gateway 异常，先恢复服务；如果 Gateway 正常但仍不回，进入下一步。

---

## 2) 核心命令：直接探针渠道

```bash
openclaw channels status --probe
```

需要可粘贴快照时，用 JSON：

```bash
openclaw channels status --probe --json
```

你可以再用 `jq` 快速筛异常（本地有 jq 时）：

```bash
openclaw channels status --probe --json | jq '.'
```

> 待确认：不同版本字段名称可能略有不同，但 `--probe` 语义与排障价值一致。建议先执行 `openclaw channels status --help` 查看本机版本说明。

---

## 3) 看到异常后，按“症状 → 动作”处理

### 场景 A：Gateway 可用，但某个渠道 probe 失败

**含义**：服务层正常，问题在渠道侧（凭据、权限、网络、策略）。

先补证据：

```bash
openclaw logs --follow
```

再结合渠道配置排查（以 Telegram 为例）：

- token 是否被运行时读取
- 是否存在 webhook/polling 冲突（典型 `409 Conflict`）
- 群聊是否被 `groupPolicy`/`groupAllowFrom` 策略拦截

### 场景 B：所有渠道都失败

**含义**：更可能是网关、网络、代理或系统级环境问题。

```bash
openclaw gateway status --deep
openclaw status --all
openclaw logs --follow
```

优先确认：

1. 服务是否真的在目标主机运行
2. 反代/隧道是否可达
3. 运行用户环境变量是否与交互式 shell 一致

### 场景 C：渠道 probe 正常，但用户仍反馈不回

**含义**：消息可能进入了渠道层，但在模型/API 层失败。

```bash
openclaw logs --follow
```

重点看：

- 模型 key 失效
- 额度耗尽
- 请求超时
- 无 fallback 导致全静默

---

## 4) 一键复位顺序（按这个做，最快收敛）

```bash
# 1) 重启网关
openclaw gateway restart

# 2) 验证服务层
openclaw gateway status --deep

# 3) 验证渠道层
openclaw channels status --probe

# 4) 观察实时链路
openclaw logs --follow
```

如果你要把问题交给同事/社区排查，建议同时附上：

```bash
openclaw status --all
openclaw channels status --probe --json
```

---

## 5) 可验证完成标准（Checklist）

- [ ] `openclaw gateway status --deep` 正常
- [ ] `openclaw channels status --probe` 目标渠道 probe 正常
- [ ] `openclaw logs --follow` 能看到测试消息完整入站与响应链路
- [ ] 群聊场景下，策略（如 `groupPolicy` / `groupAllowFrom`）与预期一致

满足以上 4 条后，再出现“在线但不回复”的概率会明显下降。

## 结语

`channels status --probe` 的价值，不是“替代 status”，而是把模糊问题压缩成可执行结论：

- 是网关层？
- 是渠道层？
- 还是模型层？

层级一旦分清，排障时间通常能从“半天”降到“几分钟”。

## 延伸阅读

- [OpenClaw `status` 和 `gateway status` 有什么区别？5 分钟定位“在线但不回消息”问题（2026）](/zh/blog/openclaw-status-vs-gateway-status-difference-and-debug-flow-2026/)
- [OpenClaw Telegram 集成成功但不回复：Webhook / 409 / 权限完整排查（2026）](/zh/blog/openclaw-telegram-integration-no-reply-fix-checklist-2026/)
- [OpenClaw 日志排查指南：从报错到根因定位](/zh/blog/openclaw-logs-debug-guide/)
