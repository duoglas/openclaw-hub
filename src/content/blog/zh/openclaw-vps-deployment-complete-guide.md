---

title: "VPS 部署 OpenClaw 完全指南（2026）"
description: "从零开始在 VPS 上部署 OpenClaw 的实战指南。涵盖服务器配置、安装、Telegram 对接、多模型配置和生产环境加固。"
pubDate: 2026-02-13
updatedDate: 2026-02-16
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

# 交互式引导设置（API Key、渠道、模型）
openclaw onboard
```

这会引导你完成 API Key 配置、渠道设置和模型选择，并创建 `~/.openclaw/` 工作目录。

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
nano ~/.openclaw/openclaw.json
```

一份靠谱的起步配置：

```json
{
  "gateway": {
    "mode": "local",
    "bind": "127.0.0.1",
    "port": 18789
  },
  "agents": {
    "defaults": {
      "model": {
        "primary": "anthropic/claude-sonnet-4-5",
        "fallbacks": ["google/gemini-3-flash"]
      }
    }
  },
  "channels": {
    "telegram": {
      "enabled": true,
      "botToken": "你的-telegram-bot-token",
      "dmPolicy": "allowlist",
      "allowFrom": ["你的Telegram数字ID"]
    }
  }
}
```

> **注意：** `allowFrom` 必须用 **Telegram 数字用户 ID**，不是 @用户名。获取方法：给 `@userinfobot` 发消息，或启动 bot 后查看 `openclaw logs --follow` 中的 `from.id`。

API Key 放在环境文件中（不要写在配置里）：

```bash
cat >> ~/.openclaw/.env <<'EOF'
ANTHROPIC_API_KEY=sk-ant-你的密钥
GOOGLE_GENERATIVE_AI_API_KEY=你的-google-ai-密钥
EOF
```

### 多模型省钱配置

聪明的做法是主力模型 + 便宜备选：

```json
{
  "agents": {
    "defaults": {
      "model": {
        "primary": "anthropic/claude-sonnet-4-5",
        "fallbacks": [
          "google/gemini-3-flash",
          "google/gemini-3-pro"
        ]
      }
    }
  }
}
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

### Docker 暴露网关前的安全校验清单

如果你使用 Docker 部署并在容器外暴露 Gateway，从 v2026.2.22 开始需要额外配置 `allowedOrigins`：

- 检查是否有 `non-loopback Control UI requires allowedOrigins` 错误
- 配置允许的访问源：`openclaw config set gateway.controlUi.allowedOrigins "*"` 或指定域名
- 验证 Gateway 能正常启动：`openclaw gateway status`

> 详见：[Docker 暴露网关前的安全校验清单](/zh/blog/openclaw-docker-allowedorigins-fix-2026/)

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
- 运行 `openclaw gateway status` 检查 Gateway 是否在运行
- 运行 `openclaw channels list` 确认 Telegram 渠道已激活
- 确认 bot token 正确：`curl "https://api.telegram.org/bot你的TOKEN/getMe"`
- 检查配对状态：`openclaw pairing list`（默认需要配对批准）
- 详细排查参考：[Telegram 排查指南](/zh/blog/openclaw-telegram-troubleshooting-guide/)

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




## 推荐部署方案

| 提供商 | 价格 | 新用户福利 | 适合场景 |
|---|---|---|---|
| [Vultr](https://www.vultr.com/?ref=YOUR_ID) | 2.5美元/月起 | 5美元体验金 | 海外部署、按量计费 |
| [DigitalOcean](https://m.do.co/c/YOUR_ID) | 4美元/月起 | 200美元免费额度 | 稳定可靠、文档齐全 |
| [腾讯云](https://curl.qcloud.com/YOUR_ID) | 99元/年起 | 新用户1折 | 国内部署、中文支持 |

**选择建议：**
- **海外用户** → Vultr 或 DigitalOcean
- **国内用户** → 腾讯云或阿里云
- **预算优先** → Vultr $2.50/月起
- **稳定性优先** → DigitalOcean 99.9% SLA

---
## 延伸阅读（OpenClaw）

- [OpenClaw 是什么？一文看懂开源 AI Agent 平台（2026）](/zh/blog/what-is-openclaw/)
- [OpenClaw vs ChatGPT vs Claude：2026 年怎么选 AI 助手？](/zh/blog/openclaw-vs-chatgpt-vs-claude/)
- [OpenClaw 模型回退策略：稳定性、成本与质量如何平衡](/zh/blog/openclaw-model-fallback-strategy/)
- [OpenClaw Telegram 故障排查全指南](/zh/blog/openclaw-telegram-troubleshooting-guide/)
- [OpenClaw 日志排查指南：从报错到根因定位](/zh/blog/openclaw-logs-debug-guide/)

