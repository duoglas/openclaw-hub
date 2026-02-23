---
title: "OpenClaw Discord Bot Complete Setup Guide (2026)"
description: "Build a Discord AI bot from scratch! Complete walkthrough of creating Discord Application, configuring Bot Token, OpenClaw integration, permission setup, channel management, and multi-server usage tips."
pubDate: 2026-02-21
tags: ["openclaw", "discord", "bot", "ai-bot", "guide", "chatbot"]
category: "guide"
lang: "en"
---

Want OpenClaw in your Discord server as a 24/7 AI assistant? This guide walks you through:

- ✅ Creating a Discord bot application
- ✅ Getting Bot Token and configuring permissions
- ✅ OpenClaw integration and testing
- ✅ Multi-server management and privacy controls
- ✅ Troubleshooting common issues

For Discord server admins and developers.

---

## I. Create Discord Application

### 1. Access Developer Portal

Open [Discord Developer Portal](https://discord.com/developers/applications) and log in.

### 2. Create New Application

1. Click **"New Application"** (top-right)
2. Enter application name (e.g., `OpenClaw Bot`)
3. Agree to terms, click **"Create"**

### 3. Configure Basic Info

In **General Information**:

- **Name**: Bot display name (editable)
- **Description**: Bot functionality description
- **Avatar**: Upload profile picture (optional)
- **Tags**: Add search tags (optional)

Save changes.

---

## II. Create Bot and Get Token

### 1. Go to Bot Settings

Left menu → **"Bot"** → **"Add Bot"** → Confirm **"Yes, do it!"**

### 2. Configure Bot Options

On the Bot page, configure:

#### Required Settings

| Option | Recommended | Description |
|--------|------------|-------------|
| **PUBLIC BOT** | ❌ Off | Prevent unauthorized additions to other servers |
| **REQUIRES OAUTH2 CODE GRANT** | ❌ Off | OAuth2 flow not needed |
| **PRESENCE INTENT** | ✅ On | Allow reading online status |
| **SERVER MEMBERS INTENT** | ✅ On | Allow reading member list |
| **MESSAGE CONTENT INTENT** | ✅ On | **Must enable** or bot can't read messages |

> ⚠️ **Important:** `MESSAGE CONTENT INTENT` must be enabled or the bot won't receive messages!

### 3. Get Bot Token

1. Find **"TOKEN"** section on Bot page
2. Click **"Reset Token"** (first time) or **"Copy"** (already generated)
3. Copy token (format like `MTxxNDY4xxx.GxxxxQ.yyyzzz`)

> 🔐 **Security:** Token = password. **Never share**, don't commit to Git!

---

## III. Generate Invite Link and Add to Server

### 1. Go to OAuth2 Settings

Left menu → **"OAuth2"** → **"URL Generator"**

### 2. Select Scopes

Check:

- ✅ `bot`
- ✅ `applications.commands` (if using Slash Commands)

### 3. Select Bot Permissions

In **BOT PERMISSIONS**, select:

#### Minimum Permissions (Recommended)

- ✅ `Read Messages/View Channels` — Read channels
- ✅ `Send Messages` — Send messages
- ✅ `Send Messages in Threads` — Reply in threads
- ✅ `Embed Links` — Send embeds
- ✅ `Attach Files` — Send files
- ✅ `Read Message History` — Read history
- ✅ `Add Reactions` — Add emoji reactions

#### Optional Permissions

- `Manage Messages` — Delete messages (cleanup)
- `Manage Threads` — Manage threads
- `Use Slash Commands` — Use slash commands

### 4. Copy Invite Link

Bottom **GENERATED URL** will show a link like:

```
https://discord.com/api/oauth2/authorize?client_id=1234567890&permissions=274877958144&scope=bot%20applications.commands
```

Copy this link, open in browser, select server, click **"Authorize"**.

---

## IV. OpenClaw Configuration

### 1. Edit Config File

```bash
vim ~/.openclaw/openclaw.json
```

### 2. Add Discord Channel

In `channels` section:

```yaml
channels:
  - kind: discord
    token: "Your Bot Token"          # Token from step II
    allowedGuilds:                   # Allowed server IDs (optional)
      - "987654321098765432"         # Your Discord server ID
    allowedChannels: []              # Empty = all channels allowed
    allowedUsers: []                 # Empty = all users allowed
```

### 3. Get Server ID (Guild ID)

In Discord client:

1. Enable developer mode: **User Settings** → **Advanced** → **Developer Mode**
2. Right-click server name → **Copy ID**
3. Paste into `allowedGuilds` list

### 4. Complete Config Example

```yaml
gateway:
  mode: local
  port: 18789

providers:
  - id: anthropic
    kind: anthropic
    apiKey: sk-ant-xxx

models:
  default: anthropic/claude-sonnet-4-5
  fallbacks:
    - anthropic/claude-opus-4-6

plugins:
  allow:
    - web_search
    - web_fetch
    - exec
    - browser

channels:
  - kind: discord
    token: "MTxxNDY4xxx.GxxxxQ.yyyzzz"
    allowedGuilds:
      - "123456789012345678"
```

### 5. Restart OpenClaw

```bash
openclaw gateway restart

# Check logs to confirm connection
openclaw gateway logs | grep discord
```

Success logs should show:

```
[Discord] Connected as OpenClaw Bot#1234
[Discord] Serving 1 guild(s)
```

---

## V. Usage & Testing

### 1. Basic Conversation

In any Discord channel:

```
@OpenClaw Bot Hello, introduce yourself
```

Bot should reply.

### 2. Thread Mode (Recommended)

To avoid spam, use threads:

1. Send message mentioning bot
2. After bot replies, click reply to create thread
3. Continue conversation in thread (no need to @Bot every time)

### 3. Direct Message Mode

Send DM directly to bot:

```
Help me write a Python web scraper
```

> ⚠️ Note: DM requires user and bot to share a server, and bot config must allow it.

---

## VI. Advanced Configuration

### 1. Restrict to Specific Channels

Only allow in #ai-chat and #dev-talk:

```yaml
channels:
  - kind: discord
    token: "xxx"
    allowedGuilds:
      - "123456789012345678"
    allowedChannels:
      - "111111111111111111"  # #ai-chat channel ID
      - "222222222222222222"  # #dev-talk channel ID
```

Get channel ID: Developer mode → right-click channel → Copy ID

### 2. Restrict to Specific Users

Only allow admins:

```yaml
channels:
  - kind: discord
    token: "xxx"
    allowedUsers:
      - "333333333333333333"  # Admin A
      - "444444444444444444"  # Admin B
```

### 3. Multi-Server Support

One bot serving multiple Discord servers:

```yaml
channels:
  - kind: discord
    token: "xxx"
    allowedGuilds:
      - "123456789012345678"  # Server A
      - "987654321098765432"  # Server B
```

### 4. Custom Trigger Words

By default requires @Bot to reply, configure keywords:

```yaml
channels:
  - kind: discord
    token: "xxx"
    triggerWords:
      - "ai"
      - "assistant"
      - "openclaw"
```

Now messages containing these words trigger replies (no @ needed).

---

## VII. Troubleshooting

### 1. `Error: Privileged intent provided is not enabled or whitelisted`

**Cause:** Forgot to enable `MESSAGE CONTENT INTENT`.

**Fix:**

1. Return to [Discord Developer Portal](https://discord.com/developers/applications)
2. Go to your app → Bot → **Privileged Gateway Intents**
3. Enable **MESSAGE CONTENT INTENT**
4. Save and restart OpenClaw

### 2. Bot Online but Not Replying

**Debug steps:**

```bash
# Check logs
openclaw gateway logs | tail -50

# Verify config loaded
openclaw config get | grep discord
```

**Possible causes:**

- Wrong `allowedGuilds` or `allowedChannels` config
- Didn't @Bot (and no trigger words configured)
- Insufficient bot permissions (check channel permission overrides)

### 3. `Invalid Token`

**Cause:** Token incorrect or expired.

**Fix:**

1. Return to developer portal → Bot → **Reset Token**
2. Copy new token and update `openclaw.json`
3. Restart OpenClaw

### 4. Bot Not Online

**Debug:**

```bash
# Confirm OpenClaw running
ps aux | grep openclaw

# Check Discord connection status
curl http://localhost:18789/api/health
```

### 5. Message Send Fails `Missing Permissions`

**Cause:** Bot doesn't have send message permission in that channel.

**Fix:**

1. Go to Discord server settings → Roles
2. Find bot role, ensure it has `Send Messages` permission
3. Check channel-specific permission overrides (right-click channel → Edit Channel → Permissions)

---

## VIII. Best Practices

### 1. Security Recommendations

- ✅ Disable `PUBLIC BOT` to prevent unauthorized additions
- ✅ Use environment variables for token, don't hardcode
- ✅ Rotate token periodically
- ✅ Use `allowedGuilds` to limit servers

### 2. Performance Optimization

For large servers (1000+ members):

```yaml
channels:
  - kind: discord
    token: "xxx"
    rateLimit:
      messagesPerMinute: 20    # Limit messages per minute
    cacheSize: 1000             # Message cache size
```

### 3. Logging & Monitoring

```bash
# Real-time Discord events
openclaw gateway logs --follow | grep '\[Discord\]'

# Count messages
openclaw gateway logs | grep 'Message received' | wc -l
```

---

## IX. Deploy to Cloud Server

After local testing, deploy to cloud for 24/7 uptime:

- 🔥 **[Tencent Cloud](https://curl.qcloud.com/1PS2iJEg)** — 2C2G sufficient, Hong Kong low latency
- 🌍 **[Vultr](https://www.vultr.com/?ref=7566454)** — Global datacenters, hourly billing
- 💧 **[DigitalOcean](https://m.do.co/c/0090e7c2aec0)** — $200 free credit, stable

Deployment steps:

```bash
# SSH to server
ssh user@your-server-ip

# Install OpenClaw
curl -fsSL https://openclaw.com/install.sh | sh

# Configure openclaw.json (see above)
vim ~/.openclaw/openclaw.json

# Use systemd daemon
sudo systemctl enable openclaw
sudo systemctl start openclaw

# Check status
sudo systemctl status openclaw
```

---

## X. Slash Commands (Optional)

Discord Slash Commands provide a friendlier interface.

### Register Commands

In developer portal → your app → Bot → **Slash Commands**:

1. Click **"Create Command"**
2. Configure:

| Field | Example |
|-------|---------|
| Name | `ask` |
| Description | `Ask OpenClaw AI a question` |
| Options | `question` (String, Required) |

### OpenClaw Config

```yaml
channels:
  - kind: discord
    token: "xxx"
    slashCommands:
      - name: ask
        description: "Ask AI"
      - name: search
        description: "Web search"
```

### Usage

In Discord, type `/ask question: What is AI?` to trigger.

---

## Summary Checklist

Before deployment, confirm:

- ✅ Discord Application created
- ✅ Bot Token obtained and secured
- ✅ MESSAGE CONTENT INTENT enabled
- ✅ Bot added to server with correct permissions
- ✅ OpenClaw openclaw.json configured correctly
- ✅ allowedGuilds includes target server ID
- ✅ Logs show Discord connection success
- ✅ Test messages receive replies

---

**Related Guides:**
- [OpenClaw + Ollama Local Deployment](/en/blog/openclaw-ollama-local-deployment)
- [OpenClaw MCP Server Guide](/en/blog/openclaw-mcp-server-guide)
- [OpenClaw Config Explained](/en/blog/openclaw-config-yaml-errors-and-fixes)

*Questions? Join the [OpenClaw Discord community](https://discord.gg/clawd) for help.*
