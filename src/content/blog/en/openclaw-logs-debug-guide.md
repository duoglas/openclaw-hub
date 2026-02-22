---
title: "OpenClaw Logs Explained: How to Read Error Logs & Debug Any Issue (2026)"
description: "Learn to read OpenClaw logs like a pro. Covers log levels, common error patterns (ECONNREFUSED, EADDRINUSE, 401/403 API errors, timeout crashes), and step-by-step debug workflows with exact commands."
pubDate: 2026-02-22
tags: ["openclaw", "logs", "debugging", "troubleshooting", "guide"]
category: "guide"
lang: "en"
---

When something breaks in OpenClaw, the logs tell you exactly what happened — if you know where to look. This guide teaches you to read OpenClaw logs, recognize common error patterns, and fix issues fast.

## How to access OpenClaw logs

```bash
# Live tail (most useful for active debugging)
openclaw logs --follow

# Last 100 lines
openclaw logs --lines 100

# Filter by level
openclaw logs --level error

# Gateway-specific logs
openclaw gateway logs

# System journal (if running as systemd service)
journalctl -u openclaw -n 50 --no-pager
```

> **Tip:** Always start with `openclaw logs --follow` in one terminal while reproducing the issue in another.

## Understanding log levels

| Level | Meaning | Action needed? |
|-------|---------|---------------|
| `DEBUG` | Internal state, verbose | No — useful for deep dives |
| `INFO` | Normal operations | No — confirms things work |
| `WARN` | Non-fatal issues | Maybe — often precedes errors |
| `ERROR` | Something failed | Yes — investigate |
| `FATAL` | Process will exit | Yes — immediate fix needed |

## The 8 most common error patterns

### 1. ECONNREFUSED — Can't reach a service

```
ERROR gateway: ECONNREFUSED 127.0.0.1:3000
```

**What it means:** OpenClaw tried to connect to a service (API, local server, or its own gateway) and nothing was listening.

**Debug steps:**
```bash
# Check if the gateway is actually running
openclaw gateway status

# Check what's listening on that port
ss -tlnp | grep 3000

# Restart the gateway
openclaw gateway restart
```

**Common causes:**
- Gateway crashed silently — restart it
- Port number changed in config but gateway wasn't restarted
- Firewall blocking localhost (rare but happens on hardened VPS)

### 2. EADDRINUSE — Port already taken

```
FATAL gateway: listen EADDRINUSE :::3000
```

**What it means:** Another process is already using the port OpenClaw needs.

**Fix:**
```bash
# Find what's using the port
sudo lsof -i :3000
# or
sudo ss -tlnp | grep 3000

# Kill the old process (replace PID)
kill <PID>

# Or just pick a different port in config
openclaw config set gateway.port 3001
openclaw gateway restart
```

### 3. 401 / 403 API errors — Authentication failed

```
ERROR model: API returned 401 Unauthorized (provider=anthropic)
ERROR model: API returned 403 Forbidden (provider=openai)
```

**What it means:** Your API key is wrong, expired, or lacks permissions.

**Debug steps:**
```bash
# Verify your key is set
openclaw config get providers

# Test the key directly
curl -s https://api.anthropic.com/v1/messages \
  -H "x-api-key: YOUR_KEY" \
  -H "content-type: application/json" \
  -H "anthropic-version: 2023-06-01" \
  -d '{"model":"claude-sonnet-4-20250514","max_tokens":10,"messages":[{"role":"user","content":"hi"}]}'
```

**Common causes:**
- Key has a trailing space or newline (copy-paste issue)
- Free-tier key hitting paid-only models
- Key revoked on provider dashboard
- Using an Anthropic key in the OpenAI provider slot (or vice versa)

### 4. 429 Rate limit / overloaded

```
WARN model: 429 Too Many Requests (provider=anthropic, retry_after=30)
ERROR model: 529 API Overloaded
```

**What it means:** You're sending too many requests or the provider is at capacity.

**What to do:**
- OpenClaw auto-retries with backoff — usually resolves itself
- If persistent: configure a [model fallback strategy](/blog/openclaw-model-fallback-strategy) so requests route to a backup provider
- Check your provider dashboard for rate limit tier

### 5. Timeout errors — Slow responses

```
ERROR session: Request timed out after 120000ms (model=claude-opus-4-20250514)
WARN gateway: RPC timeout - agent did not respond within 30s
```

**What it means:** The model or a tool took too long to respond.

**Possible fixes:**
```bash
# Increase timeout in config
openclaw config set gateway.rpcTimeout 60000

# For model timeouts, switch to a faster model for routine tasks
# or check your network latency to the API endpoint
curl -o /dev/null -s -w "Time: %{time_total}s\n" https://api.anthropic.com/v1/messages
```

**In China or high-latency regions?** Use a proxy or deploy on a VPS closer to the API provider. Recommended VPS providers with good global routing:
- [Vultr](https://www.vultr.com/?ref=7566454) — Tokyo/Singapore nodes with low latency to US APIs
- [DigitalOcean](https://m.do.co/c/0090e7c2aec0) — reliable and affordable, good for beginners

### 6. Chrome Relay connection errors

```
ERROR browser: Chrome relay handshake failed — no tab attached
WARN browser: WebSocket to relay closed unexpectedly (code=1006)
```

**What it means:** The Chrome Browser Relay extension isn't connected or lost connection.

**Fix checklist:**
1. Open Chrome and click the OpenClaw Browser Relay toolbar icon (badge should show ON)
2. Check that the relay WebSocket URL in extension settings matches your gateway
3. If behind NAT/firewall, ensure the WebSocket port is reachable
4. Try disabling other extensions that modify network requests

See the full [Chrome Relay Troubleshooting Guide](/blog/openclaw-chrome-relay-troubleshooting) for detailed steps.

### 7. Telegram webhook / polling errors

```
ERROR telegram: 409 Conflict: terminated by other getUpdates
ERROR telegram: 401 Unauthorized — bot token invalid
WARN telegram: webhook failed: SSL certificate problem
```

**Pattern A — 409 Conflict:**
Another instance of your bot is running (maybe a previous process didn't stop cleanly).
```bash
# Stop all OpenClaw instances
openclaw gateway stop
# Check for zombies
ps aux | grep openclaw
# Kill any remaining
pkill -f openclaw
# Restart fresh
openclaw gateway start
```

**Pattern B — 401 Unauthorized:**
Your bot token is wrong. Get a fresh one from [@BotFather](https://t.me/BotFather) and update config.

**Pattern C — SSL/webhook errors:**
If you're using webhook mode, your server needs a valid SSL certificate. Polling mode is simpler for VPS deployments:
```bash
openclaw config set telegram.mode polling
openclaw gateway restart
```

### 8. Node.js / npm errors during startup

```
FATAL Error: Cannot find module 'xyz'
SyntaxError: Unexpected token '??='
```

**What it means:** Wrong Node.js version or corrupted install.

```bash
# Check Node version (need 18+)
node --version

# If too old, update via nvm
nvm install 22
nvm use 22

# Reinstall dependencies
cd ~/.openclaw
rm -rf node_modules
npm install
```

See our [Install Troubleshooting Guide](/blog/openclaw-install-first-run-error-troubleshooting) for more install-specific issues.

## Pro debugging workflow

When you hit an unknown error, follow this sequence:

```
1. openclaw logs --level error --lines 20    ← What's the error?
2. openclaw doctor                            ← Automated health check
3. openclaw gateway status                    ← Is gateway alive?
4. openclaw config validate                   ← Config syntax OK?
5. Reproduce with --follow                    ← Watch it happen live
```

## Log location on disk

```bash
# Default log directory
ls ~/.openclaw/logs/

# Rotate logs to save disk space
openclaw logs --rotate
```

On a VPS, set up log rotation to avoid filling your disk:
```bash
cat > /etc/logrotate.d/openclaw << 'EOF'
/home/*/.openclaw/logs/*.log {
    daily
    rotate 7
    compress
    missingok
    notifempty
}
EOF
```

## Where to deploy for best reliability

A stable VPS with good connectivity makes debugging much easier — fewer network-related errors, lower latency to API providers, and reliable uptime.

**Recommended for OpenClaw hosting:**
- [Tencent Cloud](https://curl.qcloud.com/1PS2iJEg) — great for China-based users, competitive pricing on lightweight VPS
- [Vultr](https://www.vultr.com/?ref=7566454) — global locations, hourly billing, easy snapshots for quick recovery
- [DigitalOcean](https://m.do.co/c/0090e7c2aec0) — excellent documentation and community, $4/mo starter droplets

## Still stuck?

- Check the [OpenClaw GitHub Issues](https://github.com/nicepkg/openclaw) for similar reports
- Join the community on [Discord](https://discord.gg/openclaw) or [Telegram](https://t.me/openclaw)
- Run `openclaw doctor --verbose` and share the output when asking for help
