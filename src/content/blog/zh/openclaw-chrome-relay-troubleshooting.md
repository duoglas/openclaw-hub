---
title: "解决：OpenClaw Chrome 浏览器中继连接失败（完整排查指南）"
description: "Chrome Browser Relay 显示「No tab connected」或无法附加标签页？本文逐步排查每个常见原因——扩展安装、防火墙、WebSocket 错误、GPU 崩溃——附带可直接运行的诊断命令。"
pubDate: 2026-02-21
tags: ["openclaw", "chrome", "browser-relay", "troubleshooting", "浏览器自动化"]
category: "tutorial"
lang: "zh"
---

## 问题现象

安装了 OpenClaw 和 Chrome Browser Relay 扩展后，点击工具栏图标没有反应，或者出现以下错误：

- OpenClaw 日志显示 **"No tab connected"**
- 扩展图标徽章始终为 **OFF**
- 浏览器操作失败，报 **"target closed"** 或 **"WebSocket disconnected"**
- Chrome 启动后立即崩溃

本文覆盖所有已知原因和解决方案，从最简单到最复杂。

---

## 第 1 步：确认扩展已安装并启用

打开 `chrome://extensions/`，确认：

1. **OpenClaw Browser Relay** 在列表中且**已启用**（开关为蓝色）
2. 记下扩展版本号，确保与你的 OpenClaw 版本匹配

如果扩展未安装，请参考 [OpenClaw 文档](https://docs.openclaw.ai) 获取安装方式。

---

## 第 2 步：附加标签页

中继需要你**手动附加**一个标签页：

1. 在浏览器中打开你要控制的页面
2. 点击工具栏上的 **OpenClaw Browser Relay** 图标（拼图图标 → 建议固定到工具栏）
3. 徽章应变为 **ON** 状态（显示彩色指示器）

**常见错误：** 在 `chrome://` 页面或扩展页面点击图标——这些受限页面无法附加。

---

## 第 3 步：检查 Gateway 连通性

扩展通过 WebSocket 连接到 OpenClaw Gateway。先确认 Gateway 正在运行：

```bash
openclaw status
# 或者
curl -s http://localhost:18789/health
```

如果 Gateway 未运行：

```bash
openclaw gateway start
```

### 防火墙检查

如果 Gateway 运行在远程服务器上（比如 [Vultr](https://www.vultr.com/?ref=7566454) 或 [DigitalOcean](https://m.do.co/c/0090e7c2aec0) 的 VPS），需要确保 WebSocket 端口可访问：

```bash
# 在服务器上
sudo ufw status
sudo ufw allow 18789/tcp  # 如果需要
```

使用[腾讯云](https://curl.qcloud.com/1PS2iJEg)等云服务商时，还需要在 Web 控制台检查**安全组规则**——仅配置 UFW 是不够的。

---

## 第 4 步：WebSocket 连接错误

如果在浏览器控制台（`F12` → Console）看到 WebSocket 错误：

### 错误："WebSocket connection to 'ws://...' failed"

**原因：** Gateway URL 不匹配或网络阻断。

**解决：** 检查 OpenClaw 配置中的浏览器相关设置：

```bash
openclaw config get | grep -A5 browser
```

确保扩展设置中的 URL 与 Gateway 地址一致。

### 错误："Mixed Content"（HTTPS 页面 → WS 连接）

如果 Gateway 使用 `ws://`（非 `wss://`），而你正在浏览 HTTPS 页面：

**解决：**
- 使用 `wss://` + TLS 反向代理（nginx/Caddy）
- 或在测试时通过 `http://` 访问 Gateway 页面

---

## 第 5 步：Chrome GPU 崩溃（Linux / 代理环境）

**症状：** Chrome 启动后立即崩溃或显示灰屏，尤其在使用 `proxychains` 等工具时。

**根本原因：** `proxychains-ng` 注入的 `LD_PRELOAD` 与 Chrome GPU 沙箱冲突。

**解决：** 创建一个清除预加载的 wrapper 脚本：

```bash
mkdir -p ~/.openclaw/browser
cat > ~/.openclaw/browser/chrome-wrapper.sh << 'EOF'
#!/bin/bash
unset LD_PRELOAD
exec /usr/bin/google-chrome-stable \
  --proxy-server="socks5://127.0.0.1:1080" \
  --no-sandbox \
  "$@"
EOF
chmod +x ~/.openclaw/browser/chrome-wrapper.sh
```

然后更新 OpenClaw 配置：

```yaml
browser:
  executablePath: /home/youruser/.openclaw/browser/chrome-wrapper.sh
  noSandbox: true
```

修改配置后重启 Gateway：

```bash
openclaw gateway restart
```

---

## 第 6 步：扩展权限问题

Chrome 可能会静默阻止扩展在某些页面运行。检查：

1. `chrome://extensions/` → OpenClaw Browser Relay → **详情**
2. 在"网站访问权限"下，确保设置为**"在所有网站上"**
3. 如果在无痕模式下使用，启用**"在无痕模式下允许"**

---

## 第 7 步：多浏览器配置文件

如果你使用多个 Chrome 配置文件（Profile），扩展是**按配置文件安装**的。确保你在正确的配置文件窗口中点击中继图标。

---

## 第 8 步：查看 OpenClaw 日志

当其他方法都不奏效时，日志是最终答案：

```bash
# 查看最近的 Gateway 日志
journalctl -u openclaw-gateway --since "10 min ago" --no-pager

# 或者如果手动运行
tail -f ~/.openclaw/logs/gateway.log
```

关注以下关键词：
- `browser connected` — 中继正常工作
- `browser disconnected` — 中继断开
- `target closed` — 标签页被关闭或导航离开
- `timeout` — Gateway 无法及时连接浏览器

---

## 快速排查清单

- ✅ Gateway 在运行？→ `openclaw status`
- ✅ 扩展已启用？→ `chrome://extensions/`
- ✅ 标签页已附加？→ 点击工具栏图标，查看徽章
- ✅ 端口可达？→ `curl -s http://localhost:18789/health`
- ✅ 防火墙放行？→ `sudo ufw status`
- ✅ 代理冲突？→ 使用 wrapper 脚本（第 5 步）
- ✅ 查看日志？→ `journalctl -u openclaw-gateway --since "10 min ago"`

---

## 还是无法解决？

- 查阅 [OpenClaw 文档](https://docs.openclaw.ai) 获取最新浏览器配置说明
- 加入 [OpenClaw Discord](https://discord.com/invite/clawd) 社区寻求帮助
- 在 [GitHub](https://github.com/openclaw/openclaw) 提交 Issue

---

## 推荐的 OpenClaw 部署环境

在 VPS 上运行 OpenClaw 可以获得 24/7 稳定运行和浏览器自动化支持：

- **[腾讯云](https://curl.qcloud.com/1PS2iJEg)** — 国内访问快，性价比高
- **[Vultr](https://www.vultr.com/?ref=7566454)** — 全球节点覆盖，按小时计费，SSD 高速
- **[DigitalOcean](https://m.do.co/c/0090e7c2aec0)** — 界面简洁，价格透明，文档完善

2 核 / 4GB 内存的实例足以运行带浏览器中继的 OpenClaw。
