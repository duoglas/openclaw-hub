---
title: "OpenClaw Telegram 机器人不工作？完整排查指南（2026）"
description: "解决所有常见的 OpenClaw + Telegram 问题：机器人无响应、401 错误、配对失败、群聊问题、轮询失效、DNS/网络故障。每一步都有可直接执行的命令。"
pubDate: 2026-02-16
tags: ["openclaw", "telegram", "troubleshooting", "bot", "guide"]
category: "guide"
lang: "zh"
---

Telegram 机器人显示在线但完全不回消息？出现 401 错误、配对码无效、群聊中机器人隐身？本文覆盖所有已知故障模式，每个问题都附带精确的诊断和修复命令。

## 开始之前：快速健康检查

先跑这三条命令，能解答 80% 的问题：

```bash
# OpenClaw 是否在运行？
openclaw status

# Telegram 频道是否激活？
openclaw channels list

# 实时查看日志（发一条消息给机器人，然后看这里）
openclaw logs --follow
```

如果 `openclaw status` 显示 gateway 没运行，先启动它：

```bash
openclaw gateway start
```

如果 gateway 启动了但 `channels list` 里没有 Telegram，说明配置有误。跳到**问题 1**。

---

## 问题 1：机器人完全无响应

**症状：** 机器人在 Telegram 里显示在线，你发消息过去，什么都不发生。没有日志、没有错误、没有配对提示。

这是社区报告最多的问题。机器人成功连接到 Telegram API（所以显示"在线"），但轮询循环根本没拉到消息。

### 第 1 步：验证 Bot Token

```bash
# 把 TOKEN 换成你的实际 token
curl "https://api.telegram.org/botTOKEN/getMe"
```

正常应该返回 `{"ok":true,"result":{"id":...,"username":"your_bot"}}`。

如果返回 `{"ok":false,"error_code":401}`，token 无效。重新生成：

1. 打开 Telegram → 找 `@BotFather`
2. 发送 `/revoke` → 选你的机器人
3. 复制新 token
4. 更新配置：

```bash
openclaw config set channels.telegram.botToken "新TOKEN"
openclaw gateway restart
```

### 第 2 步：检查 Webhook 冲突

Telegram 机器人只能用**一种**方式：长轮询或 Webhook。如果之前设过 Webhook（或其他服务设过），轮询就不工作。

```bash
curl "https://api.telegram.org/botTOKEN/getWebhookInfo"
```

如果 `"url"` 不为空，清除它：

```bash
curl "https://api.telegram.org/botTOKEN/deleteWebhook"
```

然后重启 gateway。

### 第 3 步：检查配置位置

OpenClaw 从 `~/.openclaw/openclaw.json`（或 `.json5`）读取配置。常见错误是把 Telegram 配置写在 `models.providers` 下面而不是 `channels`：

**错误写法：**
```json
{
  "models": {
    "providers": {
      "telegram": { "enabled": true }
    }
  }
}
```

**正确写法：**
```json
{
  "channels": {
    "telegram": {
      "enabled": true,
      "botToken": "123456:ABC-DEF..."
    }
  }
}
```

验证配置：

```bash
openclaw doctor
```

### 第 4 步：检查 dmPolicy 和配对

默认 `dmPolicy` 是 `"pairing"` — 机器人在你批准用户之前不会响应。

```bash
# 查看待处理的配对请求
openclaw pairing list telegram

# 批准请求
openclaw pairing approve telegram <CODE>
```

配对码 1 小时后过期。过期了就再给机器人发条消息重新生成。

如果只想快速允许自己：

```bash
# 从日志中找你的 Telegram 用户 ID
openclaw logs --follow
# 给机器人发条消息，在日志中找 "from.id"

# 然后加到白名单
openclaw config set channels.telegram.dmPolicy "allowlist"
openclaw config set channels.telegram.allowFrom '["你的数字ID"]'
openclaw gateway restart
```

> **重要：** `allowFrom` 必须用**数字 Telegram 用户 ID**，不能用 `@用户名`。如果配置里有 `@username`，运行 `openclaw doctor --fix` 自动转换。

---

## 问题 2：401 Unauthorized 错误

**症状：** 日志显示 `401 Unauthorized` 或 `Bot token is invalid`。

**原因：**
- Token 在 BotFather 中被撤销或重新生成了
- Token 有多余的空格或换行符
- Token 来自另一个机器人

**修复：**

```bash
# 直接测试 token
curl "https://api.telegram.org/botTOKEN/getMe"

# 如果失败，从 BotFather 获取新 token
openclaw config set channels.telegram.botToken "新TOKEN"
openclaw gateway restart
```

**提示：** 如果用 `tokenFile` 而不是直接写 `botToken`，检查文件有没有尾部换行：

```bash
cat -A ~/.openclaw/telegram-token
```

---

## 问题 3：群聊中机器人看不到消息

**症状：** 私聊正常但群聊完全无反应。

### 检查 1：隐私模式

Telegram 机器人默认开启**隐私模式**。在这个模式下，机器人只能看到：
- 以 `/` 开头的命令
- 回复机器人消息的消息
- 机器人是管理员的群的所有消息

修复：

1. 找 `@BotFather`
2. 发送 `/setprivacy`
3. 选你的机器人
4. 选择 **Disable**

**关键：** 改完隐私模式后，必须在每个群里**先移除再重新添加机器人**。Telegram 不会回溯生效。

### 检查 2：groups 配置

如果配置中有 `channels.telegram.groups`，它充当白名单。群必须被列出：

```json5
{
  "channels": {
    "telegram": {
      "groups": {
        "*": { "requireMention": true }  // 允许所有群
      }
    }
  }
}
```

或者指定某个群：

```json5
{
  "channels": {
    "telegram": {
      "groups": {
        "-1001234567890": { "requireMention": false }
      }
    }
  }
}
```

### 检查 3：群策略和发送者白名单

`groupPolicy` 默认是 `"allowlist"`。如果没设 `groupAllowFrom`，会回退到 `allowFrom`。

允许群里所有人发消息：

```json5
{
  "channels": {
    "telegram": {
      "groups": {
        "-1001234567890": {
          "groupPolicy": "open",
          "requireMention": true
        }
      }
    }
  }
}
```

### 获取群聊 ID

- 转发群消息给 `@userinfobot` 或 `@getidsbot`
- 或在 `openclaw logs --follow` 中查看 `chat.id`
- 群 ID 是负数（如 `-1001234567890`）

---

## 问题 4：DNS 和网络故障

**症状：** 间歇性超时、连接中断，或日志中出现 `ETIMEOUT` 错误。

### IPv6 解析问题

部分服务器会先解析 `api.telegram.org` 的 IPv6 地址。如果 IPv6 出口不通，Telegram API 调用会超时后才回退到 IPv4。

```bash
# 检查 DNS 解析
dig +short api.telegram.org A
dig +short api.telegram.org AAAA

# 测试连通性
curl -4 "https://api.telegram.org/botTOKEN/getMe"
curl -6 "https://api.telegram.org/botTOKEN/getMe"
```

如果 IPv6 不通，在 OpenClaw 中禁用 Happy Eyeballs：

```json5
{
  "channels": {
    "telegram": {
      "network": {
        "autoSelectFamily": false
      }
    }
  }
}
```

### 代理配置

如果服务器需要代理才能访问 Telegram（中国大陆常见），直接在配置中设置：

```json5
{
  "channels": {
    "telegram": {
      "proxy": "socks5://127.0.0.1:1080"
    }
  }
}
```

这比用 `proxychains` 更稳定。支持 SOCKS5 和 HTTP 代理。

> **用海外 VPS 就不需要折腾代理了。** 推荐用于 OpenClaw 的服务商：
> - [腾讯云](https://curl.qcloud.com/1PS2iJEg) — 亚洲延迟优秀，中文控制台
> - [Vultr](https://www.vultr.com/?ref=7566454) — $5/月起，东京/新加坡节点，按小时计费
> - [DigitalOcean](https://m.do.co/c/0090e7c2aec0) — $4/月起，文档完善

---

## 问题 5：运行几小时后轮询停止

**症状：** 机器人刚开始正常工作，运行一段时间后停止响应。日志显示进程仍在运行。

### 检查 1：内存不足 (OOM)

```bash
# 检查进程是否被 kill
dmesg | grep -i "oom\|killed" | tail -5

# 检查 gateway 进程状态
openclaw gateway status
```

如果被 OOM kill，说明 VPS 内存不够。OpenClaw + Telegram 轮询通常占用 150–300MB。1GB 内存的 VPS 可以跑但比较紧张。

> 要稳定 24/7 运行，推荐 2GB+ 内存的 VPS：
> - [Vultr](https://www.vultr.com/?ref=7566454) — 2GB 起 $12/月
> - [DigitalOcean](https://m.do.co/c/0090e7c2aec0) — 2GB 起 $12/月
> - [腾讯云](https://curl.qcloud.com/1PS2iJEg) — 亚洲区域性价比高

### 检查 2：Systemd 服务配置

如果 OpenClaw 作为 systemd 服务运行，确保配置了自动重启：

```bash
# 检查服务状态
systemctl --user status openclaw

# 如果还没设置：
openclaw gateway install
```

安装器默认配置 `Restart=on-failure`，可以处理临时崩溃。

### 检查 3：网络超时

长轮询维持一个持久连接到 Telegram 服务器。网络波动可能悄悄断开连接。

```bash
# 查看日志中的超时模式
openclaw logs | grep -i "timeout\|ECONNRESET\|ENOTFOUND" | tail -10
```

如果频繁断连，设一个显式超时：

```json5
{
  "channels": {
    "telegram": {
      "timeoutSeconds": 60
    }
  }
}
```

---

## 问题 6：命令不工作 (`setMyCommands failed`)

**症状：** Telegram 命令菜单不出现，或日志显示 `setMyCommands failed`。

通常意味着到 `api.telegram.org` 的 HTTPS 出站被阻止或不稳定。

```bash
# 测试直接 API 访问
curl -v "https://api.telegram.org/botTOKEN/getMe"

# 检查 DNS 解析
nslookup api.telegram.org
```

如果是 DNS 问题，尝试设置明确的 DNS 解析器：

```bash
# /etc/resolv.conf
nameserver 8.8.8.8
nameserver 1.1.1.1
```

---

## 问题 7：论坛话题 / 线程路由问题

**症状：** 机器人在错误的话题中回复，或某些话题的消息被忽略。

论坛超级群使用线程 ID 路由。OpenClaw 在会话 key 后追加 `:topic:<threadId>`。

### 按话题配置行为：

```json5
{
  "channels": {
    "telegram": {
      "groups": {
        "-1001234567890": {
          "requireMention": true,
          "topics": {
            "42": {
              "requireMention": false,
              "systemPrompt": "你是这个话题的客服助手。"
            }
          }
        }
      }
    }
  }
}
```

**注意：** "General" 话题的 `threadId=1`。OpenClaw 特殊处理这个情况 — 发送消息时不带 `message_thread_id`（Telegram 会拒绝 `thread_id=1`），但输入状态指示器会带上。

---

## 排查流程图

```
机器人不响应？
├── openclaw status → 没运行？ → openclaw gateway start
├── openclaw channels list → 没有 telegram？ → 检查配置格式
├── openclaw logs --follow → 发消息 → 完全没日志？
│   ├── 检查 token：curl getMe
│   ├── 检查 webhook：curl getWebhookInfo → 有就删除
│   └── 检查配置路径：channels.telegram（不是 models.providers）
├── 日志显示 "pairing request"？ → openclaw pairing approve telegram <CODE>
├── 私聊正常但群聊不行？
│   ├── /setprivacy → Disable → 移除再重新添加机器人
│   ├── 检查 groups 配置（必须包含群 ID 或 "*"）
│   └── 检查 groupPolicy（默认：allowlist）
└── 间歇性故障？
    ├── 检查 IPv6：dig AAAA → 禁用 autoSelectFamily
    ├── 检查内存：dmesg | grep oom
    └── 检查代理/DNS 连通性
```

---

## 还是不行？

1. 运行 `openclaw doctor` — 它能自动发现大多数配置错误
2. 去 [OpenClaw Discord](https://discord.com/invite/clawd) 的 `#support` 频道提问
3. 在 [GitHub Issues](https://github.com/openclaw/openclaw/issues) 搜索你的错误信息
4. 阅读 [官方 Telegram 频道文档](https://docs.openclaw.ai)

Telegram 集成已经是生产就绪状态，社区每天处理成千上万的消息。大多数问题归结于 token 配置、配对流程或网络路由 — 用上面的命令，5 分钟内就能修好。

## 延伸阅读

- [消息静默丢失与重复投递排查（2026）](/zh/blog/openclaw-delivery-reliability-silent-loss-replay-fix-2026/)
（OpenClaw）

- [OpenClaw 是什么？一文看懂开源 AI Agent 平台（2026）](/zh/blog/what-is-openclaw/)
- [OpenClaw vs ChatGPT vs Claude：2026 年怎么选 AI 助手？](/zh/blog/openclaw-vs-chatgpt-vs-claude/)
- [OpenClaw 模型回退策略：稳定性、成本与质量如何平衡](/zh/blog/openclaw-model-fallback-strategy/)
- [OpenClaw Telegram 故障排查全指南](/zh/blog/openclaw-telegram-troubleshooting-guide/)
- [OpenClaw 日志排查指南：从报错到根因定位](/zh/blog/openclaw-logs-debug-guide/)

