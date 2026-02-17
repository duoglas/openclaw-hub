---
title: "OpenClaw Install & First-Run Errors: Complete Troubleshooting Guide (2026)"
description: "Fix every common OpenClaw installation and first-run error — Node.js version mismatch, npm install failures, config validation errors, API key connection issues, systemd service setup, and port conflicts. Step-by-step commands included."
pubDate: 2026-02-17
tags: ["openclaw", "install", "troubleshooting", "node", "npm", "systemd", "guide"]
category: "guide"
lang: "en"
---

You followed the install guide, ran the commands, and... something broke. This guide covers every common error from `npm install` through your first successful gateway start — with exact commands to diagnose and fix each one.

> **Already running but gateway won't start?** See [Gateway & Browser Relay Troubleshooting](/blog/openclaw-gateway-browser-relay-troubleshooting) instead. This guide focuses on getting from zero to a working install.

## Step 0: The diagnostic ladder

Before diving into specific errors, run these commands in order. They'll tell you exactly where things stand:

```bash
node -v                          # Need v22+
npm -v                           # Should work if Node is installed
which openclaw                   # Is it installed?
openclaw --version               # What version?
openclaw doctor                  # Auto-diagnose common issues
openclaw status                  # Full system status
```

If `openclaw doctor` finds and fixes your issue — great, you're done. If not, find your error below.

---

## 1. Node.js version errors

### Symptom: `engine` compatibility error or syntax errors on startup

```
npm warn EBADENGINE Unsupported engine {
  required: { node: '>=22' },
  current:  { node: 'v18.19.0' }
}
```

Or you see unexpected token errors like:

```
SyntaxError: Unexpected token '??='
```

### Fix

OpenClaw requires **Node.js 22 or newer**. Check your version:

```bash
node -v
```

If it's below v22, install the latest LTS:

```bash
# Using nvm (recommended)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
source ~/.bashrc
nvm install 22
nvm use 22
nvm alias default 22

# Or using NodeSource (Ubuntu/Debian)
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs
```

Verify after install:

```bash
node -v   # Should show v22.x.x or higher
```

### Gotcha: multiple Node versions

If `node -v` shows the right version but OpenClaw still fails, you may have multiple Node installs. Check:

```bash
which node
which -a node
```

If there's a system Node at `/usr/bin/node` conflicting with nvm's version, make sure your shell profile loads nvm correctly and that systemd services use the right path (see Section 5).

---

## 2. npm install failures

### Symptom: permission denied (EACCES)

```
npm ERR! Error: EACCES: permission denied, mkdir '/usr/lib/node_modules/openclaw'
```

### Fix

Never use `sudo npm install -g`. Instead, fix npm's global directory:

```bash
mkdir -p ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
```

Then reinstall:

```bash
npm install -g openclaw
```

### Symptom: network timeout or registry errors

```
npm ERR! code ETIMEDOUT
npm ERR! network request to https://registry.npmjs.org/openclaw failed
```

### Fix

Check your network, then try switching registries:

```bash
# Test connectivity
curl -I https://registry.npmjs.org/

# If behind a corporate proxy
npm config set proxy http://your-proxy:port
npm config set https-proxy http://your-proxy:port

# For users in mainland China, use a mirror
npm config set registry https://registry.npmmirror.com
```

### Symptom: native module build failures

```
gyp ERR! build error
npm ERR! code 1
```

Install build essentials:

```bash
# Ubuntu/Debian
sudo apt-get install -y build-essential python3

# CentOS/RHEL
sudo yum groupinstall 'Development Tools'
sudo yum install python3
```

---

## 3. Config file errors

### Symptom: JSON parse error on startup

```
SyntaxError: Unexpected token } in JSON at position 423
```

Your `openclaw.json` has a syntax error — usually a trailing comma or missing quote.

### Fix

Validate your config:

```bash
# Check JSON syntax
python3 -m json.tool ~/.openclaw/openclaw.json

# Or use jq
jq . ~/.openclaw/openclaw.json
```

The error output will point to the exact line. Common mistakes:

```json
{
  "gateway": {
    "mode": "local",
    "port": 18789,     // ← trailing comma on last property
  }
}
```

JSON doesn't allow trailing commas or comments. Remove them.

### Symptom: config validation error

```
Config validation failed: "gateway.mode" must be one of [local, remote]
```

### Fix

Run the configuration wizard:

```bash
openclaw configure
```

Or check the valid options:

```bash
openclaw config schema
```

Then edit manually:

```bash
nano ~/.openclaw/openclaw.json
```

### Symptom: "set gateway.mode=local"

```
Gateway start blocked: set gateway.mode=local
```

OpenClaw requires you to explicitly declare the gateway mode. Fix:

```bash
openclaw configure
# Or manually add to openclaw.json:
# "gateway": { "mode": "local" }
```

---

## 4. API key and provider errors

### Symptom: 401 Unauthorized from AI provider

```
Error: 401 Unauthorized — invalid x-api-key
```

### Fix

Check your API key is set and valid:

```bash
# View current config (keys are masked)
openclaw config get providers

# Re-enter your key
openclaw configure
```

Make sure the key is in the right config field. For Anthropic:

```json
{
  "providers": {
    "anthropic": {
      "apiKey": "sk-ant-api03-..."
    }
  }
}
```

### Symptom: 429 Too Many Requests / rate limiting

```
Error: 429 — rate limit exceeded
```

This means you're hitting the provider's rate limit. Solutions:

1. **Configure fallback models** so OpenClaw auto-switches when one provider throttles:

```json
{
  "models": {
    "default": "anthropic/claude-sonnet-4-5",
    "fallbacks": ["openai/gpt-4.1", "google/gemini-3-pro"]
  }
}
```

2. **Upgrade your API tier** with the provider (Anthropic tier upgrades reduce rate limits significantly).

See our [Model Fallback Strategy Guide](/blog/openclaw-model-fallback-strategy) for details.

### Symptom: connection timeout to provider API

```
Error: ETIMEDOUT connecting to api.anthropic.com
```

If you're in a region where direct API access is restricted:

```bash
# Test connectivity
curl -I https://api.anthropic.com/v1/messages

# If blocked, set up a proxy
# See our proxy guide: /blog/openclaw-proxy-config-troubleshooting
```

For users in mainland China, you'll likely need a proxy for Anthropic and OpenAI APIs. Check our [Proxy Configuration Guide](/blog/openclaw-proxy-config-troubleshooting) and [Claude API Access Strategy](/blog/claude-api-access-strategy-mainland-china).

---

## 5. Systemd service issues

### Symptom: service fails to start

```bash
sudo systemctl status openclaw-gateway
# Shows: Active: failed (Result: exit-code)
```

### Fix: check the logs first

```bash
journalctl -u openclaw-gateway -n 50 --no-pager
```

### Common cause: wrong ExecStart path

The service file must point to the correct `openclaw` binary:

```bash
# Find the actual path
which openclaw

# Check what the service uses
cat /etc/systemd/system/openclaw-gateway.service | grep ExecStart
```

If they don't match (common with nvm installs), update the service:

```bash
sudo nano /etc/systemd/system/openclaw-gateway.service
```

Set the correct path:

```ini
[Service]
ExecStart=/home/youruser/.nvm/versions/node/v22.22.0/bin/openclaw gateway start --foreground
```

Then reload:

```bash
sudo systemctl daemon-reload
sudo systemctl restart openclaw-gateway
```

### Common cause: environment not loaded

Systemd services don't load your shell profile, so `nvm`, `PATH`, and environment variables may be missing.

Fix by adding environment to the service file:

```ini
[Service]
Environment=PATH=/home/youruser/.nvm/versions/node/v22.22.0/bin:/usr/local/bin:/usr/bin:/bin
Environment=HOME=/home/youruser
Environment=NODE_ENV=production
```

### Common cause: wrong user

If you run OpenClaw as a dedicated user (e.g., `openclaw`), make sure the service runs as that user:

```ini
[Service]
User=openclaw
Group=openclaw
WorkingDirectory=/home/openclaw
```

And the config is in the right place:

```bash
# Config should be at:
ls -la ~openclaw/.openclaw/openclaw.json
```

### Reinstall the service cleanly

If all else fails, let OpenClaw set up the service itself:

```bash
openclaw gateway install
sudo systemctl daemon-reload
sudo systemctl enable openclaw-gateway
sudo systemctl start openclaw-gateway
```

---

## 6. Port conflicts (EADDRINUSE)

### Symptom

```
Error: listen EADDRINUSE: address already in use :::18789
```

### Fix

Find what's using the port:

```bash
sudo lsof -i :18789
# or
sudo ss -tlnp | grep 18789
```

Options:

1. **Kill the conflicting process:**

```bash
# If it's an old OpenClaw instance
openclaw gateway stop
# Or force kill
sudo kill $(sudo lsof -t -i :18789)
```

2. **Change OpenClaw's port:**

```json
{
  "gateway": {
    "port": 18790
  }
}
```

3. **If it's a stale lock file:**

```bash
openclaw doctor --repair
```

---

## 7. First channel connection failures

### Telegram bot won't connect

**Symptom:** Bot is created but OpenClaw doesn't receive messages.

**Checklist:**

```bash
# 1. Verify token is set
openclaw config get channels.telegram

# 2. Check channel status
openclaw channels status --probe

# 3. Watch logs for errors
openclaw logs --follow
```

**Common fixes:**

- **Invalid token:** Re-create the bot via [@BotFather](https://t.me/BotFather) and update the token in config.
- **Privacy mode:** Disable privacy mode in BotFather (`/setprivacy` → Disable) if the bot needs to see group messages.
- **Webhook conflict:** If you previously set a webhook, clear it:

```bash
curl "https://api.telegram.org/bot<YOUR_TOKEN>/deleteWebhook"
```

- **Network issues:** If your server can't reach `api.telegram.org`, configure a proxy or check your firewall.

For in-depth Telegram troubleshooting, see our [Telegram Troubleshooting Guide](/blog/openclaw-telegram-troubleshooting-guide).

---

## 8. The nuclear option: clean reinstall

If nothing works and you want a fresh start:

```bash
# 1. Stop everything
openclaw gateway stop

# 2. Back up your config
cp ~/.openclaw/openclaw.json ~/openclaw-config-backup.json

# 3. Uninstall
npm uninstall -g openclaw

# 4. Clean install
npm install -g openclaw

# 5. Run doctor
openclaw doctor

# 6. Restore config
cp ~/openclaw-config-backup.json ~/.openclaw/openclaw.json

# 7. Start
openclaw gateway start
```

---

## Quick reference: error → fix table

| Error | Section | Quick fix |
|-------|---------|-----------|
| `EBADENGINE` / syntax error | [Node.js](#1-nodejs-version-errors) | Install Node 22+ |
| `EACCES` on npm install | [npm](#2-npm-install-failures) | Fix npm global dir |
| `ETIMEDOUT` npm | [npm](#2-npm-install-failures) | Check network/proxy |
| JSON parse error | [Config](#3-config-file-errors) | Fix JSON syntax |
| `set gateway.mode=local` | [Config](#3-config-file-errors) | Run `openclaw configure` |
| 401 Unauthorized | [API keys](#4-api-key-and-provider-errors) | Check/re-enter API key |
| 429 rate limit | [API keys](#4-api-key-and-provider-errors) | Add fallback models |
| systemd service failed | [Systemd](#5-systemd-service-issues) | Check ExecStart path + env |
| EADDRINUSE | [Port conflicts](#6-port-conflicts-eaddrinuse) | Kill process or change port |
| Telegram no messages | [Channels](#7-first-channel-connection-failures) | Check token + privacy mode |

---

## Where to deploy

Need a server to run OpenClaw 24/7? These providers work well for self-hosted AI agents:

- **[Vultr](https://www.vultr.com/?ref=7566454)** — Starts at $6/mo, global locations, fast SSD. Great for getting started quickly.
- **[DigitalOcean](https://m.do.co/c/0090e7c2aec0)** — $6/mo droplets with excellent documentation. One-click Node.js setup available.
- **[Tencent Cloud](https://curl.qcloud.com/1PS2iJEg)** — Best latency for mainland China users. Lightweight instances from ¥38/mo.

A 2 vCPU / 2GB RAM instance is plenty for OpenClaw. See our [VPS Deployment Guide](/blog/openclaw-vps-deployment-complete-guide) for the full setup walkthrough, or [Deployment Pricing Comparison](/blog/openclaw-deployment-service-pricing-guide) to find the best value.

---

## Still stuck?

- Run `openclaw doctor --deep` for thorough diagnostics
- Check [OpenClaw docs](https://docs.openclaw.ai) for the latest reference
- Join the [OpenClaw Discord](https://discord.com/invite/clawd) community for real-time help
- Browse [ClawHub](https://clawhub.com) for skills and community solutions
