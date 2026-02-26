---
title: "OpenClaw Gateway 启动失败怎么修？2026 可执行排查清单（mode=local / EADDRINUSE / auth）"
description: "针对 OpenClaw Gateway 启动失败的高频报错，提供可直接执行的排查命令与修复步骤，覆盖 gateway.mode、端口冲突、bind/auth、安全配置与 systemd 服务异常。"
pubDate: 2026-02-26
tags: ["openclaw", "gateway", "troubleshooting", "deployment", "systemd"]
category: "guide"
lang: "zh"
---

如果你看到以下报错之一，这篇就是给你的：

- `Gateway start blocked: set gateway.mode=local`
- `EADDRINUSE: address already in use ...:18789`
- `refusing to bind gateway ... without auth`
- `openclaw gateway status` 一直不是 `running`

目标很简单：**先恢复可用，再做长期稳定。**

## 0) 先做 60 秒快检（不要跳过）

```bash
openclaw status
openclaw gateway status
openclaw logs --follow
openclaw doctor
```

判断标准：
- `gateway status` 显示 `Runtime: running` 且探针正常 => Gateway 本体没问题
- 否则按下面分症状修复

---

## 1) 报错：`set gateway.mode=local`

### 原因
OpenClaw 要求显式声明 Gateway 运行模式。

### 修复
```bash
openclaw config set gateway.mode local
openclaw gateway restart
openclaw gateway status
```

如果你在容器/专用用户下运行，确认改的是**实际运行用户**的配置目录（如 `~/.openclaw/`）。

---

## 2) 报错：`EADDRINUSE`（端口 18789 被占用）

### 原因
另一个进程或残留实例占了 Gateway 端口。

### 修复
```bash
# 查占用
sudo lsof -i :18789
# 或
sudo ss -tlnp | grep 18789

# 先优雅停止
openclaw gateway stop

# 仍占用再结束对应 PID
kill <PID>

# 重启
openclaw gateway start
openclaw gateway status
```

如果你必须换端口，改配置后重启（并同步防火墙规则）。

---

## 3) 报错：`refusing to bind ... without auth`

### 原因
你把 Gateway 暴露到非本地地址（比如 `0.0.0.0`），但没有配置认证。

### 两种安全做法

**做法 A（推荐）：仅本机绑定**
```bash
openclaw config set gateway.bind "127.0.0.1"
openclaw gateway restart
```

**做法 B：确实要远程访问时，开启 token 认证**
```bash
openclaw config set gateway.auth.token "替换成高强度随机字符串"
openclaw gateway restart
```

> 不要在公网暴露无认证网关。

---

## 3.5) 报错：`non-loopback Control UI requires gateway.controlUi.allowedOrigins`

### 原因
从 v2026.2.22 开始，OpenClaw 对远程访问 Control UI 强制要求配置 `allowedOrigins` 白名单，这是安全默认值收紧导致的 Docker 部署中常见问题。

### 修复
```bash
# 添加允许访问的源（可以是单个域名或 * 用于全部开放）
openclaw config set gateway.controlUi.allowedOrigins "*"

# 或指定域名（更安全）
openclaw config set gateway.controlUi.allowedOrigins "https://yourdomain.com"

# 重启 Gateway
openclaw gateway restart
```

> 详见：[non-loopback Control UI / allowedOrigins 报错专项修复](/zh/blog/openclaw-docker-allowedorigins-fix-2026/)

---

## 4) systemd 服务起不来 / 反复崩溃

### 先看日志
```bash
journalctl -u openclaw --no-pager -n 80
openclaw gateway status --deep
openclaw doctor --deep
```

### 高频根因
1. Node 版本不符（建议 Node 22+）
2. 服务环境读不到 API key
3. nvm/fnm 路径在 systemd 下失效
4. 配置文件权限不对

### 常用修复
```bash
# 确认 Node
node -v

# 写入 daemon 可读取的环境变量
cat >> ~/.openclaw/.env <<'EOF'
ANTHROPIC_API_KEY=sk-ant-...
EOF

# 重启服务
sudo systemctl restart openclaw
sudo systemctl status openclaw --no-pager
```

如是 PATH 问题，用 `systemctl edit openclaw` 添加可用 Node 路径后 `daemon-reload`。

---

## 5) 修好后做“稳定化”

### 最小稳定基线
```bash
openclaw gateway status
openclaw status
openclaw doctor
```

建议再做两件事：
- 给服务配置自动拉起（systemd restart policy）
- 保留日志与告警，避免“挂了才知道”

---

## 6) 本机经常掉线？直接迁移到 VPS

如果你是笔记本运行、网络经常变化、系统睡眠导致掉线，迁到云主机通常比反复救火更省时间。

可用的 OpenClaw 运行环境（2 vCPU / 2GB 起步即可）：

- [腾讯云](https://curl.qcloud.com/1PS2iJEg)：国内链路友好，延迟低
- [Vultr](https://www.vultr.com/?ref=7566454)：全球机房选择多
- [DigitalOcean](https://m.do.co/c/0090e7c2aec0)：文档完善，入门顺手

---

## 7) 一键复制：网关故障排查命令包

```bash
openclaw status
openclaw gateway status --deep
openclaw doctor --deep
openclaw logs --follow
journalctl -u openclaw --no-pager -n 120
```

把输出整理后再提问，定位速度会快很多。

---

## 延伸阅读

- [OpenClaw Gateway 启动失败 / 浏览器 Relay 连不上：完整排查指南（2026）](/zh/blog/openclaw-gateway-browser-relay-troubleshooting/)
- [OpenClaw Telegram 故障排查全指南](/zh/blog/openclaw-telegram-troubleshooting-guide/)
- [OpenClaw 日志排查指南：从报错到根因定位](/zh/blog/openclaw-logs-debug-guide/)
