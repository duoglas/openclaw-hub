---
title: "OpenClaw Chrome Relay 连接失败？完整排查指南（2026）"
description: "Chrome 扩展 Relay 连不上、Badge 显示感叹号、tab 无法 attach？本文提供系统化排查步骤，覆盖 Relay 服务未启动、端口冲突、Snap Chromium 不兼容、远程 Gateway 代理、GPU 崩溃等常见问题，附可直接执行的诊断命令。"
pubDate: 2026-02-18
tags: ["openclaw", "chrome", "browser-relay", "排查", "教程", "浏览器自动化"]
category: "tutorial"
lang: "zh"
---

OpenClaw 的 Chrome Extension Relay 让 AI 智能体直接操控你的浏览器标签页——但连接问题也是社区最常见的求助之一。这篇指南帮你从 Badge 上的 `!` 一路排查到完全正常运行。

> **还没装好 OpenClaw？** 先看 [安装与首次启动排查](/blog/openclaw-install-first-run-error-troubleshooting)。本文假设 Gateway 已经能正常运行。

## 🔍 第 0 步：快速诊断

先运行这组命令，拿到全局状态：

```bash
openclaw status
openclaw gateway status
openclaw browser --browser-profile chrome status
openclaw logs --tail 20
```

正常状态应该看到：
- Gateway `Runtime: running`
- Browser control service 监听中
- Relay server 可达

## ❗ 问题 1：Badge 显示 `!`（最常见）

Extension 图标上显示感叹号，意味着**扩展无法连接到本地 Relay 服务器**。

### 排查步骤

**1. 确认 Gateway 正在运行**

```bash
openclaw gateway status
```

如果没跑，启动它：

```bash
openclaw gateway start
```

**2. 检查 Relay 端口是否在监听**

默认 Relay 端口是 `18792`（Gateway 端口 + 3）：

```bash
ss -tlnp | grep 18792
```

如果没有输出，说明 Relay 没启动。检查日志：

```bash
openclaw logs --tail 50 | grep -i relay
```

**3. 端口冲突**

如果其他程序占了 `18792`：

```bash
ss -tlnp | grep 18792
# 看是哪个进程占了端口
```

解决方案：关掉占端口的程序，或者修改 Gateway 端口（Relay 端口会跟着变）：

```json5
// ~/.openclaw/openclaw.json
{
  "gateway": {
    "port": 18800  // Relay 会变成 18803
  }
}
```

修改后别忘了在扩展 Options 页面更新 Relay 地址。

**4. 打开扩展 Options 页面**

右键扩展图标 → Options，查看 Relay 连接状态和地址配置是否正确。

## 🖥️ 问题 2：点击扩展图标无反应 / Badge 卡在 `…`

Badge 显示 `…` 表示正在尝试连接。如果一直停在这里：

```bash
# 确认 Relay 可达
curl -s http://127.0.0.1:18792/ | head
```

如果返回 JSON，说明 Relay 正常，问题可能出在：

- **Chrome 版本过旧**：需要 Manifest V3 支持（Chrome 88+）
- **扩展需要更新**：升级 OpenClaw 后需要刷新扩展

```bash
openclaw browser extension install
# 然后去 chrome://extensions 点 Reload
```

## 🐧 问题 3：Linux 上 Chrome 启动失败

### Snap Chromium 不兼容

Ubuntu 默认的 Chromium 是 Snap 版本，受 AppArmor 限制，OpenClaw 无法正常控制：

```
Error: Failed to start Chrome CDP on port 18800
```

**解决方案：安装 Google Chrome**

```bash
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
sudo dpkg -i google-chrome-stable_current_amd64.deb
sudo apt --fix-broken install -y
```

配置指向 Chrome：

```json5
// ~/.openclaw/openclaw.json
{
  "browser": {
    "enabled": true,
    "executablePath": "/usr/bin/google-chrome-stable",
    "headless": true,
    "noSandbox": true
  }
}
```

### GPU 崩溃（代理环境）

如果你使用 proxychains 或类似代理工具，Chrome 可能因 GPU 进程崩溃而无法启动：

```
GPU process isn't usable. Goodbye.
```

**解决方案：创建 wrapper 脚本**

```bash
cat > ~/.openclaw/browser/chrome-wrapper.sh << 'EOF'
#!/bin/bash
unset LD_PRELOAD
exec /usr/bin/google-chrome-stable \
  --proxy-server="socks5://127.0.0.1:1080" \
  "$@"
EOF
chmod +x ~/.openclaw/browser/chrome-wrapper.sh
```

然后在配置中使用 wrapper：

```json5
{
  "browser": {
    "executablePath": "~/.openclaw/browser/chrome-wrapper.sh",
    "noSandbox": true
  }
}
```

这样 Chrome 绕过 `LD_PRELOAD`（proxychains 注入的库），同时通过 `--proxy-server` 参数走代理。

## 🌐 问题 4：远程 Gateway + 本地浏览器

Gateway 在远程服务器上运行，但你想控制本地浏览器？需要在本地机器运行 **Node Host**。

### 配置步骤

**1. 本地机器配对为 Node**

```bash
openclaw node pair --gateway https://your-gateway:18789
```

**2. Gateway 端配置浏览器代理**

```json5
// 远程 Gateway 的 openclaw.json
{
  "gateway": {
    "nodes": {
      "browser": {
        "mode": "node"  // 或指定 node 名
      }
    }
  }
}
```

**3. 确认连接**

```bash
# 在 Gateway 机器上
openclaw node list
```

> **推荐**：使用 [Tailscale](https://tailscale.com) 组网，避免暴露端口到公网。如果你需要一台稳定的远程 Gateway 服务器，推荐 [腾讯云轻量应用服务器](https://curl.qcloud.com/1PS2iJEg)（国内访问快）、[Vultr](https://www.vultr.com/?ref=7566454)（全球节点丰富）或 [DigitalOcean](https://m.do.co/c/0090e7c2aec0)（社区文档完善）。

## 🔒 问题 5：沙箱模式下浏览器不可用

如果你的 Agent 运行在沙箱中，默认会使用沙箱内的浏览器，而非主机的 Chrome Relay。

**允许沙箱访问主机浏览器**：

```json5
{
  "agents": {
    "defaults": {
      "sandbox": {
        "browser": {
          "allowHostControl": true
        }
      }
    }
  }
}
```

然后在 Agent 中使用 `target="host"` 调用浏览器工具。

## 📋 问题速查表

| 症状 | 最可能原因 | 快速修复 |
|------|-----------|---------|
| Badge `!` | Relay 未启动 | `openclaw gateway start` |
| Badge 卡 `…` | 扩展版本旧 | `openclaw browser extension install` + Reload |
| CDP 启动失败 | Snap Chromium | 安装 Google Chrome |
| GPU 崩溃 | proxychains LD_PRELOAD | 用 wrapper 脚本 |
| 远程控制不了 | 没配 Node Host | 本地跑 `openclaw node pair` |
| 沙箱内不可用 | 默认隔离 | 配置 `allowHostControl` |

## 🔗 相关资源

- [OpenClaw 官方文档 - 浏览器控制](https://docs.openclaw.ai/tools/browser)
- [Chrome Extension 文档](https://docs.openclaw.ai/tools/chrome-extension)
- [Linux 浏览器排查](https://docs.openclaw.ai/tools/browser-linux-troubleshooting)
- [OpenClaw VPS 部署完全指南](/blog/openclaw-vps-deployment-complete-guide)

---

遇到本文没覆盖的问题？加入 [OpenClaw Discord 社区](https://discord.com/invite/clawd) 提问，或到 [GitHub](https://github.com/openclaw/openclaw) 提 Issue。
