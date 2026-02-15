---
title: "OpenClaw Gateway Won't Start / Browser Relay Not Connecting: Complete Fix Guide (2026)"
description: "Step-by-step troubleshooting for the two most common OpenClaw issues: gateway fails to start (EADDRINUSE, mode errors, service crashes) and Chrome Browser Relay showing red exclamation mark or timing out. Every fix includes exact commands."
pubDate: 2026-02-15
tags: ["openclaw", "gateway", "browser-relay", "chrome", "troubleshooting", "guide"]
category: "guide"
lang: "en"
---

Two issues dominate OpenClaw support channels: **gateway won't start** and **browser relay won't connect**. This guide gives you exact commands to diagnose and fix both — no guesswork.

## Part 1: Gateway Won't Start

### Quick triage (run these first)

```bash
openclaw status
openclaw gateway status
openclaw logs --follow
openclaw doctor
```

If `openclaw gateway status` shows `Runtime: running` and `RPC probe: ok`, your gateway is fine — skip to Part 2.

### Problem A: "Gateway start blocked: set gateway.mode=local"

**What happened:** OpenClaw requires explicit mode declaration for local gateways.

**Fix:**
```bash
# Option 1: Set in config directly
openclaw config set gateway.mode local

# Option 2: Run the setup wizard (interactive)
openclaw configure
```

If running OpenClaw via Podman with a dedicated `openclaw` user, the config lives at `~openclaw/.openclaw/openclaw.json`.

After setting the mode:
```bash
openclaw gateway restart
openclaw gateway status
```

### Problem B: "EADDRINUSE" / port conflict

**What happened:** Another process (or a stale OpenClaw instance) is already using port 18789.

**Fix:**
```bash
# 1. Find what's using the port
sudo lsof -i :18789
# or
sudo ss -tlnp | grep 18789

# 2. If it's a stale OpenClaw process, kill it
openclaw gateway stop
# If that doesn't work:
kill <PID_FROM_ABOVE>

# 3. Restart
openclaw gateway start
```

**Alternative:** change the gateway port in config:
```json
{
  "gateway": {
    "port": 18790
  }
}
```

### Problem C: "refusing to bind gateway ... without auth"

**What happened:** You set `gateway.bind` to a non-loopback address (like `0.0.0.0`) without setting an auth token. OpenClaw blocks this to prevent unauthenticated remote access.

**Fix — either:**

1. **Keep it local** (recommended for single-machine setups):
```bash
openclaw config set gateway.bind "127.0.0.1"
```

2. **Or set an auth token** (needed for remote access):
```bash
openclaw config set gateway.auth.token "YOUR_SECURE_TOKEN"
# Then restart
openclaw gateway restart
```

### Problem D: "tailscale serve/funnel requires gateway bind=loopback"

**What happened:** Tailscale serve mode requires the gateway to bind to 127.0.0.1.

**Fix:**
```bash
openclaw config set gateway.bind "127.0.0.1"
openclaw gateway restart
```

### Problem E: Service installed but keeps crashing

**Symptoms:** `systemctl status openclaw` shows the service loaded but `inactive` or `failed`.

**Debug:**
```bash
# Check service logs
journalctl -u openclaw --no-pager -n 50

# Check if config differs between CLI and service
openclaw gateway status --deep

# Run doctor for comprehensive check
openclaw doctor --deep
```

**Common causes:**
- **Wrong Node.js version:** OpenClaw needs Node 22+
- **Missing env vars:** API keys not in `~/.openclaw/.env`
- **Permission issues:** service user can't read config/data dirs
- **Version manager paths:** nvm/fnm paths not available in systemd context

**Fix for env vars:**
```bash
# Put your API keys where the daemon can find them
cat >> ~/.openclaw/.env <<'EOF'
ANTHROPIC_API_KEY=sk-ant-...
EOF

# Restart service
sudo systemctl restart openclaw
```

**Fix for Node path in systemd:**
```bash
# Find your actual node path
which node
# e.g., /home/user/.nvm/versions/node/v22.22.0/bin/node

# Edit service file to use absolute path
sudo systemctl edit openclaw
# Add:
# [Service]
# Environment="PATH=/home/user/.nvm/versions/node/v22.22.0/bin:/usr/bin:/bin"

sudo systemctl daemon-reload
sudo systemctl restart openclaw
```

### Problem F: Windows gateway goes offline periodically

**Symptoms:** Bot appears offline in Telegram every few hours, needs manual restart.

**Fix:**
- Don't rely solely on Windows Scheduled Tasks for keeping the gateway alive
- Use a process supervisor or run in a Windows Service wrapper
- Consider deploying to a VPS for 24/7 reliability (see VPS options below)

### Nuclear option: full reset

If nothing works:
```bash
openclaw doctor --repair --force
openclaw gateway restart
```

This rewrites supervisor configs and applies aggressive repairs.

---

## Part 2: Browser Relay Not Connecting

The Chrome Browser Relay lets OpenClaw control your browser tabs. When it fails, you typically see:

- Red exclamation mark (❗) on the extension icon
- "Can't reach the openclaw browser control service (timed out after 20000ms)"
- "Chrome extension relay is running, but no tab is attached"

### Step 1: Is the gateway actually running?

```bash
openclaw gateway status
```

If it's not running, fix that first (see Part 1).

### Step 2: Is the browser control service listening?

The relay listens on port 18792 by default.

```bash
curl http://localhost:18792/health
# or
ss -tlnp | grep 18792
```

If nothing is listening:
- Restart the gateway: `openclaw gateway restart`
- Check if browser tools are enabled in your config

### Step 3: Extension shows red ❗ (not connected)

**Cause 1: Gateway not reachable from browser**

The extension connects to `ws://localhost:18792`. If your gateway runs on a remote server (VPS, EC2), the extension on your local machine can't reach it directly.

**Fix for remote setups:**
```bash
# SSH tunnel from your local machine to the server
ssh -L 18792:localhost:18792 user@your-server-ip

# Now the extension can connect via localhost:18792
```

**Cause 2: Port blocked by firewall**
```bash
# On the gateway machine, check if port is open
sudo ufw status
# If needed:
sudo ufw allow 18792/tcp
```

**Cause 3: Extension needs reinstall**

1. Remove the extension from Chrome
2. Reinstall from the [Chrome Web Store](https://chrome.google.com/webstore) or load unpacked from OpenClaw's extension directory
3. Restart Chrome completely (all windows)

### Step 4: Extension connected but "no tab attached"

**This is the most common confusion.** The extension is connected to the gateway, but you haven't told it which tab to control.

**Fix:**
1. Navigate to the tab you want OpenClaw to control
2. Click the OpenClaw Browser Relay icon in Chrome's toolbar
3. The icon should change from gray/red to active (badge ON)
4. Now OpenClaw can interact with that tab

> Each tab must be explicitly attached. Opening a new tab doesn't auto-attach it.

### Step 5: Extension connected but actions fail

**Cause: Playwright not installed**

For ARIA snapshots and screenshots, OpenClaw needs the full Playwright package.

```bash
# Check if Playwright is available
openclaw status

# Install if missing
npm install playwright
# or reinstall OpenClaw with browser support
```

**Cause: Proxy interference (proxychains + Chrome)**

If you run OpenClaw under proxychains, Chrome's GPU process crashes due to `LD_PRELOAD` injection.

**Fix:** Use a wrapper script to isolate Chrome:
```bash
#!/bin/bash
# ~/.openclaw/browser/chrome-wrapper.sh
unset LD_PRELOAD
exec /usr/bin/google-chrome-stable \
  --proxy-server="socks5://127.0.0.1:7890" \
  --no-sandbox \
  "$@"
```

```bash
chmod +x ~/.openclaw/browser/chrome-wrapper.sh
```

Set in OpenClaw config:
```json
{
  "browser": {
    "executablePath": "~/.openclaw/browser/chrome-wrapper.sh",
    "noSandbox": true
  }
}
```

### Step 6: Profile routing issues

**Symptom:** You specify `profile="desktop"` but the request goes to the Chrome extension relay instead.

This is a known issue ([#4841](https://github.com/openclaw/openclaw/issues/4841)). Workaround:

```bash
# Start Chromium with remote debugging explicitly
DISPLAY=:99 chromium-browser --remote-debugging-port=9222 --no-sandbox &

# Verify it's listening
curl http://localhost:9222/json
```

Make sure your config specifies the correct profile and port for each browser instance.

---

## Diagnostic cheat sheet

| Symptom | First command | Likely cause |
|---------|--------------|-------------|
| Gateway won't start | `openclaw doctor` | Config error / port conflict |
| "mode=local" error | `openclaw config set gateway.mode local` | Missing mode declaration |
| Service keeps dying | `journalctl -u openclaw -n 50` | Env vars / Node path |
| Extension red ❗ | `curl localhost:18792/health` | Gateway not running / port blocked |
| "No tab attached" | Click extension icon on tab | Tab not explicitly attached |
| Actions fail after proxy | Create chrome-wrapper.sh | LD_PRELOAD interference |

## When to consider a VPS

If you're fighting with local network configs, firewalls, or Windows reliability — a cheap VPS simplifies everything. The gateway runs 24/7, Telegram works instantly, and you skip all the local networking headaches.

Good options for OpenClaw (2 vCPU / 2GB+ RAM is plenty):

- [Tencent Cloud Lightweight](https://curl.qcloud.com/1PS2iJEg) — best value for China-based users, starts around ¥50/month
- [Vultr](https://www.vultr.com/?ref=7566454) — global locations, $6/month for a capable instance
- [DigitalOcean](https://m.do.co/c/0090e7c2aec0) — solid reliability, $6/month droplets with good documentation

Any of these can run OpenClaw + Telegram + scheduled tasks without the reliability issues you get on a laptop or home server that sleeps.

## Still stuck?

```bash
# The full diagnostic suite
openclaw status
openclaw gateway status --deep
openclaw doctor --deep
openclaw logs --follow
```

Share the output in the [OpenClaw Discord](https://discord.com/invite/clawd) — the community is active and these logs give enough context for fast help.