---
title: "OpenClaw Telegram 机器人在线但不回复：10 分钟排查与修复（2026）"
description: "针对高频问题“机器人在线但不回消息”，给出可直接执行的 OpenClaw + Telegram 排查命令：token、webhook 冲突、pairing、群组权限、网络代理与长期稳定部署。"
pubDate: 2026-02-25
tags: ["openclaw", "telegram", "troubleshooting", "bot", "deployment"]
category: "guide"
lang: "zh"
---

这是 OpenClaw 社区最常见的问题之一：**Telegram 里机器人显示在线，但你发消息它不回复**。

这篇只做一件事：用最短路径把问题定位清楚，然后修好。

---

## 0）先跑 4 条命令（先看事实，再猜原因）

```bash
openclaw status
openclaw gateway status
openclaw channels list
openclaw logs --follow
```

然后给机器人发一条消息，看 `openclaw logs --follow` 是否出现入站事件。

- **有入站日志但不回消息**：重点查 pairing / allowlist / 群组策略
- **完全没有入站日志**：重点查 token / webhook / 网络连通

---

## 1）Token 是否有效（最先查）

```bash
# 把 TOKEN 换成你真实的 bot token
curl "https://api.telegram.org/botTOKEN/getMe"
```

- 返回 `"ok":true`：token 有效，继续下一步
- 返回 `401 Unauthorized`：token 无效，去 @BotFather 重新生成

更新后重启 Gateway：

```bash
openclaw config set channels.telegram.botToken "NEW_TOKEN"
openclaw gateway restart
```

---

## 2）Webhook 冲突（轮询模式最容易被这个卡住）

OpenClaw 常见部署是 long polling。只要 Telegram 端还残留 webhook，轮询就可能收不到更新。

```bash
curl "https://api.telegram.org/botTOKEN/getWebhookInfo"
```

如果返回里 `url` 非空，先清掉：

```bash
curl "https://api.telegram.org/botTOKEN/deleteWebhook"
openclaw gateway restart
```

---

## 3）配置路径是否写对（高频低级错误）

Telegram 配置应在 `channels.telegram` 下，而不是 `models.providers`。

正确示例：

```json
{
  "channels": {
    "telegram": {
      "enabled": true,
      "botToken": "123456:ABC..."
    }
  }
}
```

运行诊断：

```bash
openclaw doctor
```

---

## 4）Pairing / Allowlist 拦住了（DM 最常见）

默认策略下，陌生私聊可能需要先配对授权。

```bash
openclaw pairing list telegram
openclaw pairing approve telegram <CODE>
```

如果你明确要直接放行（仅建议自己的账号）：

```bash
openclaw config set channels.telegram.dmPolicy "allowlist"
openclaw config set channels.telegram.allowFrom '["你的数字ID"]'
openclaw gateway restart
```

> `allowFrom` 要填 **数字 ID**，不是 `@username`。

---

## 5）群里不回复：先看 BotFather 隐私模式

现象：私聊正常，群聊没反应。

排查顺序：

1. `@BotFather` → `/setprivacy` → 选择你的 bot → `Disable`
2. 退出群并重新拉 bot 进群（关键）
3. 检查群策略配置（是否要求 @mention、是否限制发言人）

你也可以先在日志里抓 `chat.id` 再配置群规则。

---

## 6）网络问题：服务器能否访问 Telegram API

```bash
curl -v "https://api.telegram.org/botTOKEN/getMe"
nslookup api.telegram.org
```

如果你在中国大陆环境部署，建议优先使用**可稳定出网的 VPS**，通常比本地网络 + 代理更省心。

可选（按常见场景）：

- [腾讯云](https://curl.qcloud.com/1PS2iJEg)：国内购买和运维更方便
- [Vultr](https://www.vultr.com/?ref=7566454)：海外节点多，开机快
- [DigitalOcean](https://m.do.co/c/0090e7c2aec0)：文档完善，稳定性好

---

## 7）一键复查（修完后必须跑）

```bash
openclaw status
openclaw gateway status --deep
openclaw doctor --deep
openclaw logs --follow
```

确认点：

- Gateway `running`
- Telegram channel 已启用
- 发送消息时能看到入站日志
- 有正常回复或明确的策略日志（而不是静默）

---

## 8）10 分钟决策树（速查）

- **机器人在线但完全无日志** → 先查 token + webhook
- **有日志但不回复** → 查 pairing / allowlist / 群策略
- **私聊好，群里不行** → 关隐私模式 + 重新拉群
- **偶发超时/掉线** → 先排网络，再考虑迁到稳定 VPS

如果你按上面做完仍未恢复，直接把以下输出贴到社区：

```bash
openclaw status
openclaw gateway status --deep
openclaw doctor --deep
```

这样别人才能快速定位，而不是来回猜配置。