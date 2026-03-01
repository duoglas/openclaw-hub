---
title: "OpenClaw 部署报错排查清单（2026）：Gateway 启动失败、Telegram 不回、Chrome Relay 连接失败"
description: "一篇解决 OpenClaw 三大高频部署问题的实战教程：Gateway 启动失败、Telegram 机器人不回复、Chrome Browser Relay 连不上。附可直接执行命令与稳定化建议。"
pubDate: 2026-03-01
tags: ["openclaw", "deployment", "gateway", "telegram", "chrome relay", "troubleshooting"]
category: "guide"
lang: "zh"
---

如果你刚部署 OpenClaw，最常见的卡点通常就 3 个：

1. `openclaw gateway start` 启动失败  
2. Telegram 机器人在线但不回消息  
3. Chrome Browser Relay 红色 ❗ 或提示超时

这篇给你一份**可执行、可复现**的排查清单：先止血，再定位，再稳定运行。

---

## 0) 先做统一体检（不要跳过）

```bash
openclaw status
openclaw gateway status
openclaw channels list
openclaw doctor
openclaw logs --follow
```

看点：
- `gateway status` 是否 `running`
- `channels list` 是否有 `telegram` 且已启用
- 日志是否持续报同类错误（409 / EADDRINUSE / timeout）

---

## 1) Gateway 启动失败：按错误类型直接修

### A. 报错：`Gateway start blocked: set gateway.mode=local`

```bash
openclaw config set gateway.mode local
openclaw gateway restart
openclaw gateway status
```

### B. 报错：`EADDRINUSE`（端口冲突）

```bash
sudo lsof -i :18789
# 或
sudo ss -tlnp | grep 18789

openclaw gateway stop
kill <占用端口的PID>
openclaw gateway start
```

### C. 报错：`refusing to bind gateway ... without auth`

你把 `gateway.bind` 设成了非本地地址但没加认证。

```bash
# 单机部署建议：回到本地绑定
openclaw config set gateway.bind "127.0.0.1"
openclaw gateway restart
```

如果确实要远程暴露：

```bash
openclaw config set gateway.auth.token "YOUR_STRONG_TOKEN"
openclaw gateway restart
```

### D. 服务反复崩溃（systemd）

```bash
journalctl -u openclaw --no-pager -n 80
which node
```

重点检查：
- Node 版本是否满足 OpenClaw 要求（通常 Node 22+）
- `~/.openclaw/.env` 是否包含所需 API Key
- service 用户是否有配置目录读写权限

---

## 2) Telegram 机器人不回：先查 409 冲突，再查 token/webhook

### A. 报错：`409 Conflict: terminated by other getUpdates request`

这是**同一个 token 被多个实例同时轮询**。

```bash
openclaw gateway stop
ps -ef | grep -i openclaw | grep -v grep
# 清理残留后只启动一个实例
openclaw gateway start
```

如果你同时在本地 + VPS 跑了 OpenClaw，必须二选一保留在线实例。

### B. 验证 Bot Token 是否有效

```bash
curl "https://api.telegram.org/botTOKEN/getMe"
```

返回 401 就去 BotFather 重发 token，然后更新配置并重启 gateway。

### C. 清理 webhook 残留（轮询模式必须做）

```bash
curl "https://api.telegram.org/botTOKEN/getWebhookInfo"
curl "https://api.telegram.org/botTOKEN/deleteWebhook"
openclaw gateway restart
```

### D. 配对策略卡住（dmPolicy=pairing）

```bash
openclaw pairing list telegram
openclaw pairing approve telegram <CODE>
```

---

## 3) Chrome Relay 连不上：按“服务→端口→标签页附加”顺序排

### A. 先确认浏览器控制服务是否可达

```bash
openclaw gateway status
curl http://localhost:18792/health
ss -tlnp | grep 18792
```

### B. 扩展红色 ❗ 或超时

常见原因：
- Gateway 没运行
- 18792 端口不可达
- 你在本地浏览器连接远端 Gateway（需隧道）

远端机器时，用本地 SSH 隧道：

```bash
ssh -L 18792:localhost:18792 user@your-server
```

### C. 日志提示 `no tab attached`

这不是崩溃，是**没附加标签页**：

1. 打开要控制的网页
2. 点击 Chrome 工具栏 OpenClaw Relay 图标
3. 确认 badge 为 ON

---

## 4) 一次性“收敛排查”命令包

如果你想快速复现完整流程，直接按顺序执行：

```bash
openclaw status
openclaw gateway status --deep
openclaw channels list
openclaw doctor --deep
openclaw gateway restart
openclaw logs --follow
```

然后在 Telegram 给机器人发一条消息、在 Chrome 点击一次 Relay 图标，观察日志即可定位大多数问题。

---

## 5) 稳定运行建议：把 OpenClaw 固定在一台 24/7 机器

很多“间歇性故障”本质是运行环境不稳定（笔记本休眠、网络波动、多机重复启动）。生产实践建议：

- 只保留一台常驻机器跑 OpenClaw
- Telegram 轮询只允许单实例
- 用 systemd 托管并开启自动重启

可选部署平台（2 vCPU / 2GB 起步即可）：

- [腾讯云](https://curl.qcloud.com/1PS2iJEg)：国内访问链路稳定，适合中文用户
- [Vultr](https://www.vultr.com/?ref=7566454)：全球机房覆盖好，部署灵活
- [DigitalOcean](https://m.do.co/c/0090e7c2aec0)：文档完善，新手部署友好

---

## 6) 结论：先消冲突，再看连通性，最后做稳定化

按经验，OpenClaw 部署问题 80% 都能归到这三类：

- **冲突**：多实例抢 token / 抢端口
- **连通性**：gateway 或 relay 端口不可达
- **配置**：token、webhook、pairing、bind/auth 设置不一致

把上面的排查链路跑完，基本都能在 10~20 分钟内恢复可用。