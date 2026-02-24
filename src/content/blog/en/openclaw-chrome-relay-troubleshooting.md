---
title: "OpenClaw Chrome Browser Relay Not Connecting? Complete Fix Guide (2026)"
description: "Fix OpenClaw Chrome extension relay issues: tab not attaching, badge not turning on, WebSocket disconnects, browser actions failing. Step-by-step troubleshooting with exact commands."
pubDate: 2026-02-24
tags: ["openclaw", "chrome", "browser-relay", "troubleshooting", "guide"]
category: "guide"
lang: "en"
---

# OpenClaw Chrome Browser Relay Not Connecting? Complete Fix Guide

OpenClaw's Chrome Browser Relay lets your AI agent see and interact with your browser tabs in real time. When it works, it's magic — your agent can fill forms, extract data, and automate web tasks. When it doesn't, you're staring at "no tab connected" errors.

This guide covers every known Chrome Relay failure and how to fix it.

## How Browser Relay Works (30-Second Overview)

1. The **OpenClaw Chrome extension** runs in your browser
2. You click the toolbar icon on a tab to **attach** it (badge turns ON)
3. The extension opens a **WebSocket connection** to your OpenClaw gateway
4. Your agent can now see snapshots and perform actions on that tab

If any link in this chain breaks, the relay fails silently.

## Quick Diagnosis

```bash
# Check if gateway is running
openclaw gateway status

# Check gateway logs for WebSocket errors
journalctl -u openclaw-gateway --since "10 min ago" | grep -i "relay\|websocket\|browser"

# Verify the gateway port is accessible
ss -tlnp | grep 3100
```

## Problem 1: Extension Badge Won't Turn ON

**Symptom:** You click the OpenClaw Browser Relay toolbar icon, but the badge doesn't activate. Nothing happens.

### Fix: Check Extension Installation

1. Go to `chrome://extensions/`
2. Find **OpenClaw Browser Relay**
3. Make sure it's **enabled** (toggle is blue)
4. Click **Details → Extension options** and verify the gateway URL is correct:
   - Local: `ws://localhost:3100`
   - Remote VPS: `wss://your-domain.com:3100`

### Fix: Reload the Extension

```
chrome://extensions/ → OpenClaw Browser Relay → Click the refresh ↻ icon
```

Then close and reopen the tab you want to attach.

### Fix: Check for Restricted Pages

Chrome extensions **cannot** attach to:
- `chrome://` pages (settings, extensions, etc.)
- `chrome-extension://` pages
- The Chrome Web Store (`chromewebstore.google.com`)
- PDF viewer tabs (sometimes)

Navigate to a regular webpage first, then click the relay icon.

## Problem 2: Badge is ON But Agent Says "No Tab Connected"

**Symptom:** The toolbar badge shows active, but your agent still can't see the tab.

### Fix: Check Gateway WebSocket Endpoint

The most common cause is a **gateway URL mismatch**. The extension must connect to the exact address your gateway listens on.

```bash
# Check what address the gateway is listening on
openclaw gateway status

# Look for the WebSocket port in config
cat ~/.openclaw/config.yaml | grep -A5 "gateway"
```

Make sure the extension's configured URL matches. If your gateway is on a VPS, you need `wss://` (not `ws://`) and the correct port.

### Fix: Firewall Blocking WebSocket

If you're connecting from your local browser to a remote VPS:

```bash
# On your VPS, check if the port is open
sudo ufw status | grep 3100

# If not listed, allow it
sudo ufw allow 3100/tcp

# For iptables users
sudo iptables -L -n | grep 3100
```

> **💡 VPS Tip:** Need a reliable VPS for OpenClaw? [Vultr](https://www.vultr.com/?ref=7566454) starts at $6/mo with global locations and fast SSD. [DigitalOcean](https://m.do.co/c/0090e7c2aec0) is another solid choice with $200 free credit for new users.

### Fix: SSL/TLS Certificate Issues (Remote Setup)

For `wss://` connections, you need valid TLS. Self-signed certs will cause silent WebSocket failures.

```bash
# Check if your cert is valid
openssl s_client -connect your-domain.com:3100 -servername your-domain.com </dev/null 2>&1 | grep "Verify return code"

# If using Let's Encrypt, renew if expired
sudo certbot renew
sudo systemctl restart openclaw-gateway
```

### Fix: Reverse Proxy Misconfiguration (Nginx/Caddy)

If you're proxying through Nginx, WebSocket upgrade headers must be set:

```nginx
location /relay {
    proxy_pass http://127.0.0.1:3100;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header Host $host;
    proxy_read_timeout 86400;
}
```

For Caddy (handles WebSocket automatically):

```
your-domain.com {
    reverse_proxy localhost:3100
}
```

## Problem 3: Relay Connects Then Disconnects

**Symptom:** The relay works for a few seconds or minutes, then drops.

### Fix: Increase Proxy Timeouts

Nginx kills idle WebSocket connections after 60 seconds by default:

```nginx
proxy_read_timeout 86400;  # 24 hours
proxy_send_timeout 86400;
```

Reload Nginx:

```bash
sudo nginx -t && sudo systemctl reload nginx
```

### Fix: Check Gateway Memory/CPU

If the gateway is running out of resources, WebSocket connections get dropped:

```bash
# Check gateway resource usage
systemctl status openclaw-gateway
free -h
top -p $(pgrep -f openclaw)
```

> **💡 Performance Tip:** For stable relay connections, 2GB+ RAM is recommended. [Tencent Cloud](https://curl.qcloud.com/1PS2iJEg) offers competitive pricing on lightweight VPS instances ideal for OpenClaw. [Vultr](https://www.vultr.com/?ref=7566454) High Frequency plans also work great.

### Fix: Browser Sleeping the Tab

Chrome aggressively suspends background tabs. If you switch away from the attached tab for too long, the extension may lose its connection.

- **Workaround:** Keep the attached tab visible or pinned
- **Better:** Use the `openclaw` profile browser (isolated, always active) instead of Chrome relay for long-running automations

## Problem 4: Agent Actions Fail on the Tab

**Symptom:** The relay is connected, snapshots work, but clicks/typing don't do anything.

### Fix: Check for iframes and Shadow DOM

Some websites use iframes or Shadow DOM that the relay can't interact with by default. Try:

1. Use `snapshot` with `depth` parameter to see nested frames
2. Specify the `frame` parameter in your action commands
3. For complex SPAs, try using `act` with `evaluate` kind for direct JS execution

### Fix: Page Has Overlay/Modal Blocking

If a cookie banner, modal, or overlay is covering the target element:

```
# In your agent conversation, ask it to:
1. Take a snapshot first
2. Dismiss any overlays
3. Then perform the intended action
```

### Fix: Content Security Policy (CSP) Blocking

Some websites block extension interactions via CSP. Check the browser console (`F12 → Console`) for CSP violation errors. Unfortunately, there's no workaround for strict CSP — use the isolated OpenClaw browser profile instead.

## Problem 5: "Profile Not Found" or "Browser Not Started" Errors

**Symptom:** Agent says the browser profile doesn't exist or isn't started.

### Fix: Understand the Two Profiles

OpenClaw has two browser profiles:

| Profile | What It Is | When to Use |
|---------|-----------|-------------|
| `chrome` | Your existing Chrome via relay extension | When you need your logged-in sessions, cookies, etc. |
| `openclaw` | Isolated Chromium managed by OpenClaw | For automations, scraping, tasks that don't need your logins |

For the `chrome` profile to work, you need the Chrome extension installed and a tab attached.

For the `openclaw` profile:

```bash
# Start the isolated browser
openclaw gateway restart
```

The managed browser launches automatically with the gateway.

## Prevention: Stable Relay Setup Checklist

✅ Gateway running and healthy (`openclaw gateway status`)
✅ Extension installed, enabled, and configured with correct URL
✅ Firewall allows the gateway port
✅ If remote: valid TLS cert + proper WebSocket proxy config
✅ Nginx/Caddy timeout set to 86400+ for WebSocket
✅ Tab is a regular webpage (not `chrome://` or restricted page)
✅ Tab is pinned or visible (not sleeping)

## Still Stuck?

1. **Check gateway logs in real-time:**
   ```bash
   journalctl -u openclaw-gateway -f
   ```
2. **Check Chrome extension console:**
   Right-click extension icon → "Inspect popup" → Console tab
3. **Test WebSocket manually:**
   ```bash
   # Install wscat if needed
   npm i -g wscat
   wscat -c ws://localhost:3100
   ```

> **🚀 Deploying Fresh?** Check our [complete VPS deployment guide](/blog/en/openclaw-vps-deployment-complete-guide) for a battle-tested setup. We recommend [DigitalOcean](https://m.do.co/c/0090e7c2aec0) ($200 free credit) or [Vultr](https://www.vultr.com/?ref=7566454) for new deployments.

---

*Last updated: February 24, 2026. Found an issue? Open a PR or ping us on Telegram.*
