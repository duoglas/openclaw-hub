---
title: "VPS 部署 OpenClaw 完全指南（2026）"
description: "从零开始在 VPS 上部署 OpenClaw 的实战指南。涵盖服务器配置、安装、Telegram 对接、多模型配置和生产环境加固。"
pubDate: 2026-02-13
tags: ["guide", "deployment", "vps", "telegram", "production"]
category: "guide"
lang: "zh"
---

# VPS 部署 OpenClaw 完全指南

想要一个 7×24 在线的 AI 助手，接 Telegram，能处理邮件、管日程、控制智能家居？这篇指南带你从一台空白 VPS 开始，部署一个完整可用的 OpenClaw。

**最终效果：** 一个永不下线的 Telegram AI 助手，能搜索网页、管理日历、读邮件、控制智能设备、执行定时任务——每月成本约 $6 起。

## 准备工作

- 一台 VPS：Ubuntu 22.04+，推荐 2核 2GB 以上
- 域名（可选但推荐）
- SSH 访问权限
- 至少一个 AI 厂商的 API Key（Anthropic / OpenAI / Google 任选）
- Telegram Bot Token（下面会教你创建）

## 第一步：服务器初始化（10 分钟）

SSH 连上你的 VPS：

```bash
# 更新系统
sudo apt update && sudo apt upgrade -y

# 安装基础依赖
sudo apt install -y curl git build-essential

# 安装 Node.js 22 (LTS)
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs

# 验证
node --version  # 应显示 v22.x
npm --version
```

### 创建专用用户（推荐）

不要用 root 跑 OpenClaw：

```bash
sudo adduser openclaw --disabled-password
sudo usermod -aG sudo openclaw
su - openclaw
```

## 第二步：安装 OpenClaw（5 分钟）

```bash
# 全局安装
npm install -g openclaw

# 验证
openclaw --version

# 初始化工作空间
openclaw init
```

这会创建 `~/.openclaw/` 目录，包含工作空间、配置和默认文件。

## 第三步：创建 Telegram Bot（5 分钟）

1. 打开 Telegram，搜索 **@BotFather**
2. 发送 `/newbot`
3. 起个名字（比如 "我的 AI 助手"）
4. 起个用户名（必须以 `bot` 结尾，比如 `my_ai_assistant_bot`）
5. 复制 **bot token**——下一步要用

**重要：** 还要给 BotFather 发 `/setprivacy`，选你的 bot，选 **Disable**。这样 bot 才能在群聊里读消息。

## 第四步：配置 OpenClaw（10 分钟）

编辑配置文件：

```bash
nano ~/.openclaw/config.yaml
```

一份靠谱的起步配置：

```yaml
gateway:
  host: 127.0.0.1
  port: 18789

agent:
  defaultModel: anthropic/claude-sonnet-4-5
  fallbackModels:
    - google/gemini-3-flash
  heartbeatIntervalMinutes: 30

providers:
  anthropic:
    apiKey: sk-ant-你的密钥
  google:
    apiKey: 你的-google-ai-密钥

channels:
  telegram:
    botToken: "你的-telegram-bot-token"
    allowedUsers:
      - 你的telegram用户名
```

### 多模型省钱配置

聪明的做法是主力模型 + 便宜备选：

```yaml
agent:
  defaultModel: anthropic/claude-sonnet-4-5  # 主力
  fallbackModels:
    - google/gemini-3-flash    # 快 + 免费额度
    - google/gemini-3-pro      # 能力不错的免费备选
```

Anthropic 限流了？OpenClaw 自动切到 Gemini——你不会掉线。

## 第五步：启动（2 分钟）

```bash
# 启动守护进程
openclaw gateway start

# 检查状态
openclaw gateway status
```

现在打开 Telegram，找到你的 bot，发一条消息。收到回复就成了！🎉

## 第六步：生产环境加固

### 设为系统服务

开机自启 + 崩溃自动重启：

```bash
sudo tee /etc/systemd/system/openclaw.service << 'EOF'
[Unit]
Description=OpenClaw AI Gateway
After=network.target

[Service]
Type=simple
User=openclaw
WorkingDirectory=/home/openclaw
ExecStart=/usr/bin/openclaw gateway start --foreground
Restart=always
RestartSec=10
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl enable openclaw
sudo systemctl start openclaw
```

### 基础防火墙

```bash
sudo ufw allow ssh
sudo ufw allow 443/tcp  # 如果用 webhook
sudo ufw enable
```

### 配置日志轮转

```bash
sudo tee /etc/logrotate.d/openclaw << 'EOF'
/home/openclaw/.openclaw/logs/*.log {
    daily
    rotate 7
    compress
    missingok
    notifempty
}
EOF
```

## 第七步：个性化你的智能体

真正的威力在工作空间文件。编辑 `~/.openclaw/workspace/` 下的文件：

**SOUL.md** — 智能体人格：
```markdown
你是一个直接高效的助手，废话少说。
别人让你做事就直接做，不要问来问去。
日常用中文，技术话题可以用英文。
```

**USER.md** — 关于你的信息：
```markdown
- 时区：GMT+8
- 首选 Telegram 沟通
- 不要自动发邮件
```

**HEARTBEAT.md** — 定期任务：
```markdown
## 每次心跳检查
- 有紧急未读邮件吗？
- 未来 2 小时有日程吗？
```

## 成本估算

- VPS（Vultr/DO $6 方案）：$6/月
- Anthropic API（中度使用）：$5-20/月
- Google Gemini（备选）：$0（免费额度）
- 域名（可选）：~$1/月
- **合计：$12-27/月**

对比 ChatGPT Pro 的 $20/月——你得到的是一个*可定制的、永不下线的智能体*，能连接你的真实工具。

## 常见问题

### Bot 不回消息
- 运行 `openclaw gateway status` 检查
- 确认 Telegram bot token 正确
- 确认你的用户名在 `allowedUsers` 列表里

### Anthropic 限流
- 加备选模型（Gemini 有免费额度）
- 日常任务用 Sonnet 而不是 Opus
- OpenClaw 自动处理模型切换

### 内存占用高
- 2GB 内存是甜点
- 如果跑其他服务，考虑 4GB
- 用 `openclaw status` 查看上下文窗口使用情况

## 下一步

智能体跑起来之后：

1. **装 Skills** — 去 [ClawHub](https://clawhub.com) 浏览现成的技能包（天气、智能家居、邮件等）
2. **设定时任务** — 日报、提醒、自动巡检
3. **接更多渠道** — Telegram 之外还可以加微信、Discord、WhatsApp
4. **开发自定义 Skill** — 针对你的工作流造工具

---

*遇到问题？查看 [OpenClaw 文档](https://docs.openclaw.ai) 或加入 [Discord 社区](https://discord.com/invite/clawd)。*
