---
title: "OpenClaw Chrome Relay 连不上？浏览器控制失败完整排查指南"
description: "解决 OpenClaw Browser Relay 扩展无法连接、浏览器操作超时、快照失败、GPU 崩溃等常见问题。每一步都有可直接执行的诊断命令和修复方案。"
pubDate: 2026-02-20
tags: ["openclaw", "chrome", "browser-relay", "troubleshooting", "guide"]
category: "guide"
lang: "zh"
---

OpenClaw 的 Browser Relay 功能让 AI 助手可以直接操控你的 Chrome 浏览器——读取页面内容、点击按钮、填写表单。但连接失败是最常见的抱怨之一。本文覆盖所有已知故障模式，帮你快速恢复。

## 🩺 快速诊断：先跑这两条

```bash
# 检查 OpenClaw 状态，确认 browser 模块是否加载
openclaw status

# 查看 gateway 日志中的 browser 相关错误
openclaw gateway logs | grep -i browser | tail -20
```

如果 `openclaw status` 显示 browser 模块正常但仍然连不上，继续往下看。

---

## 问题 1：Chrome 扩展已安装但显示「未连接」

### 症状

- 扩展图标灰色，badge 显示 OFF
- 点击工具栏图标无反应或显示 "Not connected"

### 排查步骤

**1. 确认 Gateway 正在运行**

```bash
openclaw gateway status
```

如果返回 `stopped`，启动它：

```bash
openclaw gateway start
```

**2. 检查扩展连接地址**

打开 Chrome 扩展管理页 `chrome://extensions/`，找到 OpenClaw Browser Relay，点击「详情」→「扩展选项」。确认 Gateway URL 设置正确：

- 本地部署：`http://localhost:18789`
- 远程 VPS：`http://你的服务器IP:18789`（需要确保端口可达）

**3. 确认 Gateway Token**

扩展需要配置正确的 Gateway Token 才能认证。在服务器上查看：

```bash
openclaw gateway config | grep token
```

将输出的 token 粘贴到扩展设置中。

**4. 重新激活 Tab**

在你想控制的标签页上，**点击 OpenClaw Browser Relay 工具栏图标**，确保 badge 变为 ON。每个标签页需要单独激活。

---

## 问题 2：浏览器操作超时 / 快照失败

### 症状

- AI 尝试截图或操作页面时返回 timeout
- 日志中出现 `browser snapshot timeout` 或 `page not responding`

### 排查步骤

**1. 检查页面是否完全加载**

重型页面（如 Google Sheets、大型 SPA）加载时间可能超过默认超时。等页面完全加载后再触发操作。

**2. 检查 Chrome 是否假死**

打开 Chrome 任务管理器（Shift+Esc），看看目标标签页的 CPU/内存占用是否异常。如果某个标签页吃掉了几 GB 内存，关掉它重新打开。

**3. 增加超时时间**

在 OpenClaw 配置中调大浏览器操作超时：

```yaml
# openclaw.yaml
browser:
  timeoutMs: 30000  # 默认可能是 10000，改为 30 秒
```

修改后重启：

```bash
openclaw gateway restart
```

---

## 问题 3：GPU 进程崩溃（Linux / VM 环境）

### 症状

- Chrome 启动后立即崩溃或页面全白
- 日志出现 `GPU process isn't usable` 或 `crashed with signal`
- 特别常见于 **VMware 虚拟机** 或使用 **proxychains** 的环境

### 根因

Linux 虚拟机通常没有 GPU 直通，Chrome 的 GPU 加速会崩溃。如果你用了 proxychains，它注入的 `LD_PRELOAD` 还会干扰 Chrome 的沙箱。

### 修复方案

**方案 A：创建 Chrome Wrapper 脚本（推荐）**

```bash
mkdir -p ~/.openclaw/browser
cat > ~/.openclaw/browser/chrome-wrapper.sh << 'EOF'
#!/bin/bash
# 清除 proxychains 的 LD_PRELOAD，避免 Chrome 崩溃
unset LD_PRELOAD

# 启动 Chrome，禁用 GPU + 沙箱
exec /usr/bin/google-chrome-stable \
  --disable-gpu \
  --disable-software-rasterizer \
  --no-sandbox \
  --proxy-server="socks5://127.0.0.1:1080" \
  "$@"
EOF
chmod +x ~/.openclaw/browser/chrome-wrapper.sh
```

然后在 OpenClaw 配置中指定：

```yaml
browser:
  executablePath: /home/你的用户名/.openclaw/browser/chrome-wrapper.sh
  noSandbox: true
```

**方案 B：禁用 GPU 加速（全局）**

在 Chrome 地址栏输入 `chrome://flags/#disable-accelerated-2d-canvas`，设为 Disabled。或者启动时加参数：

```bash
google-chrome --disable-gpu --disable-software-rasterizer
```

> **VPS 部署提示：** 如果你在云服务器上运行 OpenClaw，推荐使用带有至少 2 核 CPU 和 4GB 内存的实例。[腾讯云轻量服务器](https://curl.qcloud.com/1PS2iJEg) 和 [Vultr](https://www.vultr.com/?ref=7566454) 都提供性价比不错的方案，用来跑 OpenClaw + Headless Chrome 绰绰有余。

---

## 问题 4：远程服务器上无法启动 Chrome

### 症状

- VPS/远程服务器上 `openclaw` 启动浏览器失败
- 错误信息包含 `No usable sandbox` 或 `Failed to launch browser`

### 排查步骤

**1. 安装 Chrome 和依赖**

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install -y google-chrome-stable

# 如果没有 Google 源，先添加：
wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | sudo gpg --dearmor -o /usr/share/keyrings/google-chrome.gpg
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/google-chrome.gpg] http://dl.google.com/linux/chrome/deb/ stable main" | sudo tee /etc/apt/sources.list.d/google-chrome.list
sudo apt update && sudo apt install -y google-chrome-stable
```

**2. 安装缺失的共享库**

Headless Chrome 需要一堆系统库，缺一个就启动不了：

```bash
# 一键安装所有 Chrome 依赖
sudo apt install -y \
  libnss3 libatk1.0-0 libatk-bridge2.0-0 \
  libcups2 libdrm2 libxkbcommon0 \
  libxcomposite1 libxdamage1 libxrandr2 \
  libgbm1 libpango-1.0-0 libasound2
```

**3. 配置 noSandbox**

在没有用户命名空间的服务器上（大部分 VPS），必须禁用沙箱：

```yaml
browser:
  noSandbox: true
```

> **选 VPS 的建议：** [DigitalOcean](https://m.do.co/c/0090e7c2aec0) 的 Droplet 默认支持用户命名空间，沙箱问题较少。[Vultr](https://www.vultr.com/?ref=7566454) 的高频计算实例跑 Chrome 也很流畅。

---

## 问题 5：扩展可用但 AI 无法控制页面

### 症状

- 扩展连接正常（badge ON）
- 但 AI 发出的 browser 操作返回错误或无效果

### 排查步骤

**1. 检查页面权限**

某些页面不允许扩展注入脚本：

- `chrome://` 开头的系统页面
- Chrome Web Store 页面
- 部分银行/支付页面（CSP 限制）

这是 Chrome 的安全策略，无法绕过。换个普通页面测试。

**2. 确认扩展权限**

进入 `chrome://extensions/`，确认 OpenClaw Browser Relay 的权限：

- 「在所有网站上」应该启用
- 「允许访问文件网址」建议启用

**3. 重新注入**

有时页面在扩展安装之前就打开了，导致 content script 没有注入。解决方法：

```
刷新页面（F5）→ 重新点击扩展图标激活
```

---

## 问题 6：WebSocket 连接频繁断开

### 症状

- 扩展反复在 ON/OFF 之间切换
- 日志出现 `WebSocket connection closed` 或 `reconnecting`

### 排查步骤

**1. 检查网络稳定性**

如果 Gateway 在远程服务器上，不稳定的网络会导致 WebSocket 断连。测试延迟：

```bash
ping -c 10 你的服务器IP
```

如果丢包率 >5% 或延迟 >200ms，浏览器控制体验会很差。

**2. 检查反向代理配置**

如果你在 Nginx/Caddy 后面跑 OpenClaw，需要正确配置 WebSocket 转发：

```nginx
# Nginx 示例
location / {
    proxy_pass http://127.0.0.1:18789;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_read_timeout 86400;  # 24 小时，防止空闲断连
}
```

**3. 检查防火墙**

确保 Gateway 端口没有被防火墙拦截：

```bash
# 检查 UFW
sudo ufw status | grep 18789

# 如果没有放行：
sudo ufw allow 18789/tcp
```

---

## 📋 完整排查清单

| 步骤 | 命令/操作 | 预期结果 |
|------|----------|---------|
| Gateway 运行中 | `openclaw gateway status` | `running` |
| 扩展已安装 | `chrome://extensions/` | Browser Relay 可见 |
| Token 匹配 | 对比扩展设置和 gateway config | 一致 |
| Tab 已激活 | 点击扩展图标 | Badge ON |
| 端口可达 | `curl localhost:18789` | 有响应 |
| Chrome 依赖完整 | `ldd $(which google-chrome)` | 无 missing |

---

## 还是不行？

1. **收集完整日志：**

```bash
openclaw gateway logs --lines 100 > /tmp/openclaw-debug.log
```

2. **加入社区提问：** [OpenClaw Discord](https://discord.com/invite/clawd) 的 #support 频道有人帮忙

3. **提 Issue：** [GitHub Issues](https://github.com/openclaw/openclaw/issues)，附上日志和系统信息

> **部署环境推荐：** 如果你还在纠结用什么服务器跑 OpenClaw，[腾讯云轻量应用服务器](https://curl.qcloud.com/1PS2iJEg) 国内访问快、价格友好，适合 Telegram Bot 场景（需配合代理）。海外直连推荐 [Vultr](https://www.vultr.com/?ref=7566454) 或 [DigitalOcean](https://m.do.co/c/0090e7c2aec0)，免代理直接用。
