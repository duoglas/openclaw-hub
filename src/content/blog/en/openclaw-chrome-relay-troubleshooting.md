---
title: "Fix: OpenClaw Chrome Browser Relay Not Connecting (Complete Troubleshooting Guide)"
description: "Chrome Browser Relay showing 'No tab connected' or failing to attach? This step-by-step guide covers every common cause — extension install, firewall, WebSocket errors, GPU crashes — with exact commands to diagnose and fix each one."
pubDate: 2026-02-21
tags: ["openclaw", "chrome", "browser-relay", "troubleshooting", "browser-automation"]
category: "tutorial"
lang: "en"
---

## The Problem

You installed OpenClaw and the Chrome Browser Relay extension, but when you click the toolbar icon, nothing happens — or you see errors like:

- **"No tab connected"** in OpenClaw logs
- Extension badge stays **OFF**
- Browser actions fail with **"target closed"** or **"WebSocket disconnected"**
- Chrome crashes immediately after launch

This guide walks through every known cause and fix, from the simplest to the most obscure.

---

## Step 1: Verify the Extension Is Installed and Enabled

Open `chrome://extensions/` in your browser and confirm:

1. **OpenClaw Browser Relay** is listed and **enabled** (toggle is blue)
2. Note the extension version — make sure it matches your OpenClaw version

If the extension isn't installed, get it from the [OpenClaw docs](https://docs.openclaw.ai).

---

## Step 2: Attach the Tab

The relay requires you to **manually attach** a tab:

1. Navigate to the page you want to control
2. Click the **OpenClaw Browser Relay** toolbar icon (puzzle piece → pin it for easy access)
3. The badge should turn **ON** (usually shows a colored indicator)

**Common mistake:** Clicking the icon on `chrome://` pages or the extensions page — these are restricted and cannot be attached.

---

## Step 3: Check Gateway Connectivity

The extension connects to your OpenClaw gateway via WebSocket. Verify the gateway is running:

```bash
openclaw status
# or
curl -s http://localhost:18789/health
```

If the gateway isn't running:

```bash
openclaw gateway start
```

### Firewall Check

If your gateway runs on a remote server (e.g., a [VPS on Vultr](https://www.vultr.com/?ref=7566454) or [DigitalOcean](https://m.do.co/c/0090e7c2aec0)), ensure the WebSocket port is accessible:

```bash
# On the server
sudo ufw status
sudo ufw allow 18789/tcp  # if needed
```

For cloud providers like [Tencent Cloud](https://curl.qcloud.com/1PS2iJEg), also check the **security group rules** in the web console — UFW alone isn't enough.

---

## Step 4: WebSocket Connection Errors

If you see WebSocket errors in the browser console (`F12` → Console tab):

### Error: "WebSocket connection to 'ws://...' failed"

**Cause:** Gateway URL mismatch or network block.

**Fix:** Check your OpenClaw config for the correct `browser.wsEndpoint` or relay URL:

```bash
openclaw gateway config.get | grep -A5 browser
```

Ensure the URL in the extension settings matches your gateway address.

### Error: "Mixed Content" (HTTPS page → WS connection)

If your gateway uses `ws://` (not `wss://`) and you're browsing an HTTPS page:

**Fix:** Either:
- Use `wss://` with a TLS-terminating reverse proxy (nginx/Caddy)
- Or access the gateway page via `http://` for testing

---

## Step 5: Chrome GPU Crashes (Linux / Proxy Environments)

**Symptom:** Chrome launches but immediately crashes or shows a gray screen, especially when using `proxychains` or similar tools.

**Root cause:** `proxychains-ng` injects `LD_PRELOAD`, which conflicts with Chrome's GPU sandbox.

**Fix:** Create a wrapper script that strips the preload:

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

Then update your OpenClaw config:

```yaml
browser:
  executablePath: /home/youruser/.openclaw/browser/chrome-wrapper.sh
  noSandbox: true
```

Restart the gateway after changing config:

```bash
openclaw gateway restart
```

---

## Step 6: Extension Permission Issues

Chrome may silently block the extension on certain pages. Check:

1. `chrome://extensions/` → OpenClaw Browser Relay → **Details**
2. Under "Site access", ensure it's set to **"On all sites"** or at least the sites you need
3. If running in Incognito, enable **"Allow in Incognito"**

---

## Step 7: Multiple Browser Profiles

If you use multiple Chrome profiles, the extension is installed **per-profile**. Make sure you're clicking the relay icon in the correct profile window.

---

## Step 8: Check OpenClaw Logs

When all else fails, the logs tell the truth:

```bash
# View recent gateway logs
journalctl -u openclaw-gateway --since "10 min ago" --no-pager

# Or if running manually
tail -f ~/.openclaw/logs/gateway.log
```

Look for:
- `browser connected` — relay is working
- `browser disconnected` — relay dropped
- `target closed` — tab was closed or navigated away
- `timeout` — gateway couldn't reach the browser in time

---

## Quick Diagnostic Checklist

| Check | Command |
|-------|---------|
| Gateway running? | `openclaw status` |
| Extension enabled? | `chrome://extensions/` |
| Tab attached? | Click toolbar icon, check badge |
| Port open? | `curl -s http://localhost:18789/health` |
| Firewall? | `sudo ufw status` |
| Proxy conflict? | Use wrapper script (Step 5) |
| Logs? | `journalctl -u openclaw-gateway --since "10 min ago"` |

---

## Still Stuck?

- Check the [OpenClaw docs](https://docs.openclaw.ai) for the latest browser setup instructions
- Join the [OpenClaw Discord](https://discord.com/invite/clawd) community for help
- File an issue on [GitHub](https://github.com/openclaw/openclaw)

---

## Recommended Hosting for OpenClaw

Running OpenClaw on a VPS gives you 24/7 uptime and a stable environment for browser automation:

- **[Tencent Cloud](https://curl.qcloud.com/1PS2iJEg)** — great for users in China, competitive pricing
- **[Vultr](https://www.vultr.com/?ref=7566454)** — global coverage, hourly billing, fast SSD
- **[DigitalOcean](https://m.do.co/c/0090e7c2aec0)** — simple UI, predictable pricing, solid docs

A 2-core / 4GB RAM instance is plenty for OpenClaw with browser relay enabled.
