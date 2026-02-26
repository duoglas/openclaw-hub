---
title: "Deploy OpenClaw on a VPS: Complete Step-by-Step Guide (2026)"
description: "A practical, battle-tested guide to deploying OpenClaw on a VPS from scratch. Covers server setup, installation, Telegram integration, multi-model configuration, and production hardening."
pubDate: 2026-02-13
updatedDate: 2026-02-16
tags: ["guide", "deployment", "vps", "telegram", "production"]
category: "guide"
lang: "en"
---

# Deploy OpenClaw on a VPS: Complete Step-by-Step Guide

So you want your own AI agent that's always online, connected to Telegram, and can handle everything from email to home automation? This guide walks you through deploying OpenClaw on a fresh VPS — from zero to a fully functional AI assistant.

**What you'll have at the end:** A 24/7 AI agent on Telegram that can search the web, manage your calendar, read emails, control smart home devices, and run scheduled tasks — all for about $6/month in hosting.

## Prerequisites

- A VPS with Ubuntu 22.04+ (2 vCPU, 2GB+ RAM recommended)
- A domain name (optional but recommended)
- SSH access to your server
- API key from at least one AI provider (Anthropic, OpenAI, or Google)
- A Telegram bot token (we'll create this)

## Step 1: Server Setup (10 minutes)

SSH into your fresh VPS and run initial setup:

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install essential packages
sudo apt install -y curl git build-essential

# Install Node.js 22 (LTS)
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs

# Verify
node --version  # Should show v22.x
npm --version
```

### Create a dedicated user (recommended)

Don't run OpenClaw as root:

```bash
sudo adduser openclaw --disabled-password
sudo usermod -aG sudo openclaw
su - openclaw
```

## Step 2: Install OpenClaw (5 minutes)

```bash
# Install OpenClaw globally
npm install -g openclaw

# Verify installation
openclaw --version

# Interactive onboarding (API keys, channels, models)
openclaw onboard
```

This walks you through API key setup, channel configuration, and model selection, creating `~/.openclaw/` with your workspace and config.

## Step 3: Create a Telegram Bot (5 minutes)

1. Open Telegram and search for **@BotFather**
2. Send `/newbot`
3. Choose a name (e.g., "My AI Assistant")
4. Choose a username (must end in `bot`, e.g., `my_ai_assistant_bot`)
5. Copy the **bot token** — you'll need it next

**Important:** Also send `/setprivacy` to BotFather, select your bot, and choose **Disable**. This lets the bot read messages in group chats if you want that later.

## Step 4: Configure OpenClaw (10 minutes)

Edit the config file:

```bash
nano ~/.openclaw/openclaw.json
```

Here's a solid starting configuration:

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
      "botToken": "your-telegram-bot-token",
      "dmPolicy": "allowlist",
      "allowFrom": ["your-numeric-telegram-id"]
    }
  }
}
```

> **Note:** `allowFrom` requires your **numeric Telegram user ID**, not @username. Get it by messaging `@userinfobot`, or check `openclaw logs --follow` for `from.id` after sending your bot a message.

Put API keys in a separate env file (don't embed them in config):

```bash
cat >> ~/.openclaw/.env <<'EOF'
ANTHROPIC_API_KEY=sk-ant-your-key-here
GOOGLE_GENERATIVE_AI_API_KEY=your-google-ai-key
EOF
```

### Multi-model setup (save money)

The smart move is to use a capable model as primary and cheaper ones as fallbacks:

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

This way, if your Anthropic quota hits rate limits, OpenClaw automatically falls back to Gemini — and you stay online.

## Step 5: Start OpenClaw (2 minutes)

```bash
# Start the gateway daemon
openclaw gateway start

# Check status
openclaw gateway status
```

Now open Telegram, find your bot, and send it a message. You should get a response! 🎉

## Step 6: Production Hardening

### Run as a systemd service

Create a service file so OpenClaw starts on boot and restarts on crashes:

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

### Pre-exposure Gateway security checklist

If you're using Docker and exposing Gateway outside the container, from v2026.2.22 you need to configure `allowedOrigins`:

- Check for `non-loopback Control UI requires allowedOrigins` errors
- Configure allowed access sources: `openclaw config set gateway.controlUi.allowedOrigins "*"` or specify a domain
- Verify Gateway starts correctly: `openclaw gateway status`

> See: [Pre-exposure Gateway security checklist](/en/blog/openclaw-docker-allowedorigins-fix-2026/)

### Basic firewall

```bash
sudo ufw allow ssh
sudo ufw allow 443/tcp  # If using webhooks
sudo ufw enable
```

### Set up log rotation

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

## Step 7: Customize Your Agent

The real power is in the workspace files. Edit these in `~/.openclaw/workspace/`:

**SOUL.md** — Your agent's personality:
```markdown
You're a direct, no-nonsense assistant. Skip pleasantries.
When I ask for something, just do it.
Use Chinese for casual chat, English for technical topics.
```

**USER.md** — Context about you:
```markdown
- Timezone: GMT+8
- I prefer Telegram for everything
- Don't send emails without asking
```

**HEARTBEAT.md** — Periodic tasks:
```markdown
## Check every heartbeat
- Any urgent unread emails?
- Calendar events in next 2 hours?
```

## Cost Breakdown

| Component | Monthly Cost |
|-----------|-------------|
| VPS (Vultr/DO $6 plan) | $6 |
| Anthropic API (moderate use) | $5-20 |
| Google Gemini (fallback) | $0 (free tier) |
| Domain (optional) | ~$1 |
| **Total** | **$12-27/month** |

Compare that to $20/month for ChatGPT Pro — and this gives you a *customizable, always-on agent* that connects to your real tools.

## Common Issues

### "Bot not responding"
- Run `openclaw gateway status` to check if the Gateway is running
- Run `openclaw channels list` to confirm Telegram is active
- Verify your bot token: `curl "https://api.telegram.org/botYOUR_TOKEN/getMe"`
- Check pairing status: `openclaw pairing list` (default requires pairing approval)
- See our [Telegram troubleshooting guide](/en/blog/openclaw-telegram-troubleshooting-guide/) for detailed steps

### "Rate limited by Anthropic"
- Add fallback models (Gemini is free)
- Consider using Sonnet instead of Opus for daily tasks
- OpenClaw handles fallback automatically

### "High memory usage"
- 2GB RAM is the sweet spot
- If running other services, consider 4GB
- Check with `openclaw status` for context window usage

## What's Next?

Once your agent is running:

1. **Add skills** — Browse [ClawHub](https://clawhub.com) for ready-made skills (weather, smart home, email, etc.)
2. **Set up cron jobs** — Schedule daily briefings, reminders, and automated checks
3. **Connect more channels** — Add WhatsApp, Discord, or WeChat alongside Telegram
4. **Build custom skills** — Create your own tools for specific workflows

---

*Running into issues? Check the [OpenClaw docs](https://docs.openclaw.ai) or join the [Discord community](https://discord.com/invite/clawd).*

## Further Reading (OpenClaw)

- [What Is OpenClaw? Complete Guide to the Open-Source AI Agent Platform (2026)](/en/blog/what-is-openclaw/)
- [OpenClaw vs ChatGPT vs Claude: How to Choose in 2026](/en/blog/openclaw-vs-chatgpt-vs-claude/)
- [OpenClaw Model Fallback Strategy: Balance Stability, Cost, and Quality](/en/blog/openclaw-model-fallback-strategy/)
- [OpenClaw Telegram Troubleshooting Guide](/en/blog/openclaw-telegram-troubleshooting-guide/)
- [OpenClaw Logs Debug Guide: From Error to Root Cause](/en/blog/openclaw-logs-debug-guide/)
