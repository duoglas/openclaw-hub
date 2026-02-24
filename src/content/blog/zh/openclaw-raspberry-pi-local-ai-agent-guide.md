---
title: "树莓派 + OpenClaw：本地 AI 助手完全搭建指南（2026）"
description: "在树莓派 5 上运行 OpenClaw + Ollama，搭建私密、永不下线的本地 AI 助手。涵盖硬件选型、安装配置、Home Assistant 集成和远程访问。"
pubDate: 2026-02-24
tags: ["guide", "raspberry-pi", "local-ai", "ollama", "home-assistant", "deployment"]
category: "guide"
lang: "zh"
---

# 树莓派 + OpenClaw：本地 AI 助手完全搭建指南

一台 500 元的树莓派，就能 7×24 运行你自己的 AI 助手——数据全在本地，不依赖云端。本文从硬件选购到 Telegram 接入、Home Assistant 智能家居联动，手把手带你完成全部配置。

**最终效果：** 一个运行在树莓派上的本地 AI 助手，通过 Telegram 随时随地访问，可选 Ollama 本地推理（完全脱离云 API）和智能家居控制。

## 为什么选树莓派？

| 对比项 | 树莓派 | VPS |
|--------|--------|-----|
| 月成本 | ~¥20 电费 | ¥40–150/月 |
| 数据隐私 | 全部本地 | 第三方服务器 |
| 本地延迟 | <10ms | 50–200ms |
| API 依赖 | 可选（Ollama） | 必须 |
| 全天在线 | 是（功耗 ~5W） | 是 |

如果更看重云端稳定性，参考我们的 [VPS 部署指南](/zh/blog/openclaw-vps-deployment-complete-guide)。

## 硬件需求

### 推荐：树莓派 5（8GB）

- **主板：** Raspberry Pi 5，8GB 内存——运行本地大模型的最低门槛
- **存储：** 64GB+ microSD（A2 级）或 NVMe SSD（通过 HAT 扩展，强烈推荐）
- **电源：** 官方 27W USB-C 电源
- **散热：** 主动散热器或带风扇的外壳（AI 推理持续发热）
- **网络：** 建议有线，Wi-Fi 也可

### 最低：树莓派 4（8GB）

可以用但本地推理明显慢。4GB 版**不建议**——Ollama 单独就需要 4GB 以上。

### 不支持的型号

- 树莓派 3 及更早：内存和 CPU 不足
- 树莓派 4（2GB/4GB）：Ollama + OpenClaw 同时运行太紧张
- Pi Zero 2W：适合做[语音前端](https://www.reddit.com/r/raspberry_pi/comments/1rc3gj1/personal_assistant_device_using_openclaw_and_pi/)，但无法本地运行 Ollama

## 步骤 1：系统安装（15 分钟）

用 Raspberry Pi Imager 烧录 **Raspberry Pi OS Lite（64 位）**，无桌面版本省内存。

Imager 中预配置：
- 主机名：`openclaw`
- SSH：启用
- Wi-Fi：按需配置
- 时区：Asia/Shanghai

启动后 SSH 连接：

```bash
ssh pi@openclaw.local
sudo apt update && sudo apt upgrade -y
```

## 步骤 2：安装 Node.js（5 分钟）

```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
node --version  # 应显示 v22.x
```

## 步骤 3：安装 OpenClaw（10 分钟）

```bash
sudo npm install -g openclaw
openclaw init
```

编辑 `~/.openclaw/config.yaml`：

**方案 A：云端 API（最简单）**
```yaml
providers:
  anthropic:
    apiKey: "sk-ant-..."
```

**方案 B：本地 Ollama（完全私密，见步骤 5）**
```yaml
providers:
  ollama:
    baseUrl: "http://localhost:11434"
    defaultModel: "llama3.1:8b"
```

**方案 C：混合模式（推荐）**
日常任务用 Ollama，复杂推理切云端：
```yaml
providers:
  ollama:
    baseUrl: "http://localhost:11434"
  anthropic:
    apiKey: "sk-ant-..."

models:
  default: "ollama/llama3.1:8b"
  thinking: "anthropic/claude-sonnet-4-6"
```

## 步骤 4：接入 Telegram（10 分钟）

1. Telegram 中找 [@BotFather](https://t.me/BotFather)，`/newbot` 创建机器人
2. 获取 Token，加入配置：

```yaml
channels:
  telegram:
    token: "YOUR_BOT_TOKEN"
    allowedUsers:
      - your_telegram_id
```

启动：`openclaw gateway start`，给机器人发消息测试。

## 步骤 5：安装 Ollama 本地推理（15 分钟）

这是树莓派方案的核心优势：**完全本地、完全私密的 AI 推理**。

```bash
curl -fsSL https://ollama.com/install.sh | sh

# 推荐模型（8GB 内存可用）
ollama pull llama3.1:8b      # 质量与速度的平衡点
ollama pull phi3:mini         # 更快的响应
```

**Pi 5（8GB）性能参考：**
- `llama3.1:8b`：约 5–8 tokens/秒（聊天可用）
- `phi3:mini`：约 10–15 tokens/秒（更流畅）
- 首次响应有 5–10 秒冷启动延迟

> **提示：** 如果有 NVMe SSD，把模型存储在 SSD 上，microSD 加载模型极慢。

## 步骤 6：设为系统服务（5 分钟）

开机自启：

```bash
sudo tee /etc/systemd/system/openclaw.service << 'EOF'
[Unit]
Description=OpenClaw AI Agent
After=network-online.target ollama.service
Wants=network-online.target

[Service]
Type=simple
User=pi
ExecStart=/usr/bin/openclaw gateway start --foreground
Restart=always
RestartSec=10
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl enable --now openclaw
```

更多服务管理细节参考 [systemd 服务指南](/zh/blog/openclaw-systemd-service-crash-recovery-monitoring)。

## 步骤 7：Tailscale 远程访问（10 分钟）

无需端口转发，从任何地方访问你的树莓派：

```bash
curl -fsSL https://tailscale.com/install.sh | sh
sudo tailscale up
```

Telegram 机器人本身不需要 Tailscale（它主动连接 Telegram 服务器），Tailscale 主要用于 SSH 远程管理。

## 步骤 8：Home Assistant 集成（可选，20 分钟）

如果你在同一网络运行 Home Assistant，OpenClaw 可以控制你的智能家居。

```bash
openclaw skill install home-assistant
```

配置：
```yaml
skills:
  home-assistant:
    url: "http://homeassistant.local:8123"
    token: "YOUR_LONG_LIVED_ACCESS_TOKEN"
```

连接后可以这样对话：
- "关掉客厅的灯"
- "卧室现在多少度？"
- "说晚安的时候把空调设到 26°C"

**最佳实践：** 确定性规则用 HA 原生自动化，自然语言控制和 AI 决策用 OpenClaw。

## 安全注意事项

本地部署不等于可以忽略安全。近期披露的 CVE（包括 [CVE-2026-25253](/zh/blog/openclaw-cve-2026-25253-one-click-rce-explained) 和 Endor Labs 新批次漏洞）影响所有部署方式。

**必做：**

1. **保持更新**：`sudo npm update -g openclaw`，确保 ≥2026.2.21
2. **运行安全审计**：`openclaw security --audit`（v2026.2.21 新增）
3. **限制 `allowedUsers`**：只填你的 Telegram ID
4. **审计已安装 Skills**：参考 [ClawHub Skill 安全指南](/zh/blog/openclaw-clawhub-skill-security-guide)——市场上 12% 的 Skills 被发现有恶意行为
5. **开启防火墙**：`sudo ufw enable && sudo ufw allow ssh`

完整安全清单参考 [安全加固指南](/zh/blog/openclaw-security-hardening-2026)。

## 常见问题

### 内存不足 / 代理崩溃
- `free -h` 检查——Ollama + OpenClaw 需要约 6GB
- 换小模型（`phi3:mini`）或重任务切云 API
- 添加 swap：`sudo fallocate -l 2G /swapfile && sudo chmod 600 /swapfile && sudo mkswap /swapfile && sudo swapon /swapfile`

### 首次响应很慢
- 正常：Ollama 首次请求需加载模型到内存（5–10 秒）
- 保持 Ollama 服务运行以避免冷启动

### Telegram 连不上
- 检查网络：`ping -c 3 api.telegram.org`
- 检查日志：`journalctl -u openclaw -f`
- 参考 [Telegram 排障指南](/zh/blog/openclaw-telegram-troubleshooting-guide)

## 年度成本对比

| 方案 | 硬件 | 月费 | 年度总计 |
|------|------|------|----------|
| Pi 5 + 纯 Ollama | ~¥700 | ~¥20（电费） | ~¥940 |
| Pi 5 + 云 API | ~¥700 | ~¥35–100 | ~¥1120–1900 |
| VPS + 云 API | ¥0 | ~¥85–180 | ~¥1020–2160 |

树莓派 6–12 个月即可回本，而且数据完全在你手里。

## 参考来源

- [Turn your Raspberry Pi into an AI agent with OpenClaw](https://www.raspberrypi.com/news/turn-your-raspberry-pi-into-an-ai-agent-with-openclaw/) — 树莓派官方博客
- [OpenClaw Raspberry Pi Setup for Always-On AI](https://zenvanriel.nl/ai-engineer-blog/openclaw-raspberry-pi-setup-hardware-guide/) — Zen van Riel
- [DIY Home Assistant with RPi 5, OpenClaw & Ollama](https://www.reddit.com/r/LocalLLM/comments/1r84jou/) — r/LocalLLM
- [Set Up OpenClaw with Home Assistant in 20 Minutes](https://markaicode.com/openclaw-home-assistant-integration-guide/) — Markaicode
