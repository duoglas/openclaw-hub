---
title: "OpenClaw Gateway 启动失败 / 浏览器 Relay 连不上：完整排查指南（2026）"
description: "逐步排查 OpenClaw 两大高频问题：Gateway 启动失败（EADDRINUSE、mode 报错、服务崩溃）和 Chrome 浏览器 Relay 红色感叹号或超时。每个修复都有可直接执行的命令。"
pubDate: 2026-02-15
tags: ["openclaw", "gateway", "browser-relay", "chrome", "troubleshooting", "guide"]
category: "guide"
lang: "zh"
---

OpenClaw 社区里被问最多的两个问题：**Gateway 起不来** 和 **浏览器 Relay 连不上**。这篇给你精确的排查步骤和命令——不猜，直接定位。

## 第一部分：Gateway 启动失败

### 先跑诊断四连

```bash
openclaw status
openclaw gateway status
openclaw logs --follow
openclaw doctor
```

如果 `openclaw gateway status` 显示 `Runtime: running` + `RPC probe: ok`，说明 Gateway 正常——直接跳到第二部分。

### 问题 A："Gateway start blocked: set gateway.mode=local"

**原因：** OpenClaw 要求显式声明本地 Gateway 模式。

**修复：**
```bash
# 方法 1：直接改配置
openclaw config set gateway.mode local

# 方法 2：走交互式设置
openclaw configure
```

如果你用 Podman 跑 OpenClaw（专用 `openclaw` 用户），配置在 `~openclaw/.openclaw/openclaw.json`。

改完之后：
```bash
openclaw gateway restart
openclaw gateway status
```

### 问题 B："EADDRINUSE" / 端口冲突

**原因：** 另一个进程（或残留的 OpenClaw 实例）占了 18789 端口。

**修复：**
```bash
# 1. 查谁占了端口
sudo lsof -i :18789
# 或
sudo ss -tlnp | grep 18789

# 2. 如果是残留的 OpenClaw 进程，杀掉
openclaw gateway stop
# 不行的话：
kill <上面查到的PID>

# 3. 重启
openclaw gateway start
```

**备选方案：** 改配置换端口：
```json
{
  "gateway": {
    "port": 18790
  }
}
```

### 问题 C："refusing to bind gateway ... without auth"

**原因：** 你把 `gateway.bind` 设成了非本地地址（比如 `0.0.0.0`），但没设认证 token。OpenClaw 不允许无认证的远程暴露。

**修复（二选一）：**

1. **保持本地绑定**（单机推荐）：
```bash
openclaw config set gateway.bind "127.0.0.1"
```

2. **设认证 token**（需要远程访问时）：
```bash
openclaw config set gateway.auth.token "你的安全TOKEN"
openclaw gateway restart
```

### 问题 D："tailscale serve/funnel requires gateway bind=loopback"

**原因：** Tailscale serve 模式要求 Gateway 绑定到 127.0.0.1。

**修复：**
```bash
openclaw config set gateway.bind "127.0.0.1"
openclaw gateway restart
```

### 问题 E：systemd 服务装了但一直崩

**症状：** `systemctl status openclaw` 显示 loaded 但 `inactive` 或 `failed`。

**排查：**
```bash
# 查服务日志
journalctl -u openclaw --no-pager -n 50

# 检查 CLI 和 service 配置是否一致
openclaw gateway status --deep

# 全面诊断
openclaw doctor --deep
```

**常见原因：**
- **Node.js 版本不对：** OpenClaw 需要 Node 22+
- **环境变量缺失：** API key 没放到 `~/.openclaw/.env`
- **权限问题：** 服务用户读不了配置/数据目录
- **版本管理器路径：** nvm/fnm 路径在 systemd 上下文中不可用

**修环境变量：**
```bash
# 把 API key 放到 daemon 能读到的地方
cat >> ~/.openclaw/.env <<'EOF'
ANTHROPIC_API_KEY=sk-ant-...
EOF

sudo systemctl restart openclaw
```

**修 Node 路径（systemd 找不到 node）：**
```bash
# 找到实际 node 路径
which node
# 比如 /home/user/.nvm/versions/node/v22.22.0/bin/node

# 编辑 service 文件
sudo systemctl edit openclaw
# 加入：
# [Service]
# Environment="PATH=/home/user/.nvm/versions/node/v22.22.0/bin:/usr/bin:/bin"

sudo systemctl daemon-reload
sudo systemctl restart openclaw
```

### 问题 F：Windows 上 Gateway 周期性掉线

**症状：** Telegram 机器人每隔几小时就显示离线，需要手动重启。

**建议：**
- 不要只依赖 Windows 计划任务保活
- 考虑用进程守护工具或 Windows Service 封装
- 最稳方案：部署到 VPS，7×24 不间断运行（后面有推荐）

### 终极手段：全量修复

什么都试了还不行：
```bash
openclaw doctor --repair --force
openclaw gateway restart
```

这会重写 supervisor 配置并执行激进修复。

---

## 第二部分：浏览器 Relay 连不上

Chrome 浏览器 Relay 让 OpenClaw 能控制你的浏览器标签页。连不上时，你通常会看到：

- 扩展图标上出现红色感叹号 ❗
- "Can't reach the openclaw browser control service (timed out after 20000ms)"
- "Chrome extension relay is running, but no tab is attached"

### 第 1 步：Gateway 跑起来了吗？

```bash
openclaw gateway status
```

没跑起来？先回第一部分解决。

### 第 2 步：浏览器控制服务在监听吗？

Relay 默认监听 18792 端口。

```bash
curl http://localhost:18792/health
# 或
ss -tlnp | grep 18792
```

如果没有在监听：
- 重启 Gateway：`openclaw gateway restart`
- 检查配置里 browser tools 是否已启用

### 第 3 步：扩展显示红色 ❗（未连接）

**原因 1：Gateway 从浏览器端不可达**

扩展连接的是 `ws://localhost:18792`。如果你的 Gateway 跑在远程服务器（VPS、EC2），本地浏览器直接连不上。

**远程场景的修复：**
```bash
# 从本地机器建 SSH 隧道到服务器
ssh -L 18792:localhost:18792 user@你的服务器IP

# 现在扩展可以通过 localhost:18792 连接了
```

**原因 2：防火墙拦了端口**
```bash
# 检查端口是否开放
sudo ufw status
# 需要的话：
sudo ufw allow 18792/tcp
```

**原因 3：扩展需要重装**

1. 从 Chrome 移除扩展
2. 从 Chrome Web Store 或 OpenClaw 扩展目录重新安装
3. 完全重启 Chrome（关掉所有窗口）

### 第 4 步：扩展已连接但 "no tab attached"

**这是最常见的困惑。** 扩展已经连上了 Gateway，但你没告诉它控制哪个标签页。

**修复：**
1. 打开你想让 OpenClaw 控制的标签页
2. 点击 Chrome 工具栏上的 OpenClaw Browser Relay 图标
3. 图标应该从灰色/红色变成激活状态（badge ON）
4. 现在 OpenClaw 可以操作这个标签页了

> 每个标签页需要手动附加。新开标签页不会自动附加。

### 第 5 步：扩展连上了但操作失败

**原因：Playwright 没装**

ARIA 快照和截图需要完整版 Playwright 包。

```bash
# 检查可用性
openclaw status

# 安装
npm install playwright
# 或重新安装带浏览器支持的 OpenClaw
```

**原因：代理干扰（proxychains + Chrome）**

在 proxychains 下跑 OpenClaw 时，Chrome 的 GPU 进程会因 `LD_PRELOAD` 注入崩溃。

**修复：** 用 wrapper 脚本隔离 Chrome：
```bash
#!/bin/bash
# ~/.openclaw/browser/chrome-wrapper.sh
unset LD_PRELOAD
exec /usr/bin/google-chrome-stable \
  --proxy-server="socks5://127.0.0.1:7890" \
  --no-sandbox \
  "$@"
```

```bash
chmod +x ~/.openclaw/browser/chrome-wrapper.sh
```

OpenClaw 配置：
```json
{
  "browser": {
    "executablePath": "~/.openclaw/browser/chrome-wrapper.sh",
    "noSandbox": true
  }
}
```

### 第 6 步：Profile 路由错误

**症状：** 指定了 `profile="desktop"` 但请求被路由到 Chrome 扩展 Relay。

这是已知问题 ([#4841](https://github.com/openclaw/openclaw/issues/4841))。临时方案：

```bash
# 用 remote debugging 显式启动 Chromium
DISPLAY=:99 chromium-browser --remote-debugging-port=9222 --no-sandbox &

# 验证
curl http://localhost:9222/json
```

确保配置里每个浏览器实例的 profile 和端口正确。

---

## 速查表

| 症状 | 第一步 | 可能原因 |
|------|--------|---------|
| Gateway 起不来 | `openclaw doctor` | 配置错误 / 端口冲突 |
| "mode=local" 报错 | `openclaw config set gateway.mode local` | 没声明模式 |
| 服务一直崩 | `journalctl -u openclaw -n 50` | 环境变量 / Node 路径 |
| 扩展红色 ❗ | `curl localhost:18792/health` | Gateway 没运行 / 端口被拦 |
| "No tab attached" | 点扩展图标附加标签页 | 没手动附加标签页 |
| 代理后操作失败 | 创建 chrome-wrapper.sh | LD_PRELOAD 干扰 |

## 什么时候该考虑用 VPS

如果你在本地折腾网络配置、防火墙、Windows 掉线——一台便宜 VPS 能省掉大部分麻烦。Gateway 7×24 跑，Telegram 秒回，不用管本地网络。

OpenClaw 推荐配置：2 vCPU / 2GB+ RAM 就够用。

- [腾讯云轻量应用服务器](https://curl.qcloud.com/1PS2iJEg) — 国内用户首选，约 ¥50/月起
- [Vultr](https://www.vultr.com/?ref=7566454) — 全球节点，$6/月可用
- [DigitalOcean](https://m.do.co/c/0090e7c2aec0) — 稳定可靠，$6/月起，文档完善

任意一家都能跑 OpenClaw + Telegram + 定时任务，不会有笔记本睡眠或家用路由掉线的问题。

## 还是解决不了？

```bash
# 完整诊断套装
openclaw status
openclaw gateway status --deep
openclaw doctor --deep
openclaw logs --follow
```

把输出贴到 [OpenClaw Discord](https://discord.com/invite/clawd)，社区活跃，这些日志够定位问题了。

## 延伸阅读（OpenClaw）

- [OpenClaw 是什么？一文看懂开源 AI Agent 平台（2026）](/zh/blog/what-is-openclaw/)
- [OpenClaw vs ChatGPT vs Claude：2026 年怎么选 AI 助手？](/zh/blog/openclaw-vs-chatgpt-vs-claude/)
- [OpenClaw 模型回退策略：稳定性、成本与质量如何平衡](/zh/blog/openclaw-model-fallback-strategy/)
- [OpenClaw Telegram 故障排查全指南](/zh/blog/openclaw-telegram-troubleshooting-guide/)
- [OpenClaw 日志排查指南：从报错到根因定位](/zh/blog/openclaw-logs-debug-guide/)

