---
title: "OpenClaw Chrome Relay Not Connecting? Complete Browser Control Troubleshooting Guide"
description: "Fix OpenClaw Browser Relay extension connection failures, browser operation timeouts, snapshot errors, and GPU crashes. Step-by-step diagnostic commands and solutions for every known issue."
pubDate: 2026-02-20
tags: ["openclaw", "chrome", "browser-relay", "troubleshooting", "guide"]
category: "guide"
lang: "en"
---

OpenClaw's Browser Relay lets your AI assistant directly control Chrome — reading pages, clicking buttons, filling forms. But connection failures are the most common complaint. This guide covers every known failure mode.

## 🩺 Quick Diagnosis: Run These First

```bash
# Check OpenClaw status, confirm browser module loaded
openclaw status

# Check gateway logs for browser errors
openclaw gateway logs | grep -i browser | tail -20
```

If `openclaw status` shows the browser module is fine but you still can't connect, keep reading.

---

## Issue 1: Chrome Extension Installed but Shows "Not Connected"

### Symptoms

- Extension icon is gray, badge shows OFF
- Clicking the toolbar icon does nothing or shows "Not connected"

### Steps

**1. Confirm the Gateway Is Running**

```bash
openclaw gateway status
```

If it returns `stopped`:

```bash
openclaw gateway start
```

**2. Check the Extension's Gateway URL**

Open `chrome://extensions/`, find OpenClaw Browser Relay, click "Details" → "Extension options". Verify the Gateway URL:

- Local deployment: `http://localhost:18789`
- Remote VPS: `http://your-server-ip:18789` (port must be reachable)

**3. Verify the Gateway Token**

The extension needs the correct token to authenticate:

```bash
openclaw gateway config | grep token
```

Paste the token into the extension settings.

**4. Activate the Tab**

On the tab you want to control, **click the OpenClaw Browser Relay toolbar icon** so the badge turns ON. Each tab must be activated individually.

---

## Issue 2: Browser Operations Timeout / Snapshot Fails

### Symptoms

- AI attempts to screenshot or interact with the page but gets a timeout
- Logs show `browser snapshot timeout` or `page not responding`

### Steps

**1. Wait for Full Page Load**

Heavy pages (Google Sheets, large SPAs) may exceed the default timeout. Wait for the page to fully load before triggering operations.

**2. Check for Frozen Tabs**

Open Chrome Task Manager (Shift+Esc) and look for tabs with abnormal CPU/memory usage. Kill and reopen problem tabs.

**3. Increase Timeout**

```yaml
# openclaw.yaml
browser:
  timeoutMs: 30000  # Default may be 10000; increase to 30s
```

Then restart:

```bash
openclaw gateway restart
```

---

## Issue 3: GPU Process Crash (Linux / VM Environments)

### Symptoms

- Chrome crashes immediately after launch or shows blank pages
- Logs contain `GPU process isn't usable` or `crashed with signal`
- Especially common in **VMware VMs** or **proxychains** environments

### Root Cause

Linux VMs typically lack GPU passthrough, causing Chrome's GPU acceleration to crash. If you're using proxychains, its `LD_PRELOAD` injection also interferes with Chrome's sandbox.

### Fix

**Option A: Create a Chrome Wrapper Script (Recommended)**

```bash
mkdir -p ~/.openclaw/browser
cat > ~/.openclaw/browser/chrome-wrapper.sh << 'EOF'
#!/bin/bash
# Clear proxychains LD_PRELOAD to prevent Chrome crashes
unset LD_PRELOAD

exec /usr/bin/google-chrome-stable \
  --disable-gpu \
  --disable-software-rasterizer \
  --no-sandbox \
  --proxy-server="socks5://127.0.0.1:1080" \
  "$@"
EOF
chmod +x ~/.openclaw/browser/chrome-wrapper.sh
```

Then configure OpenClaw:

```yaml
browser:
  executablePath: /home/youruser/.openclaw/browser/chrome-wrapper.sh
  noSandbox: true
```

**Option B: Disable GPU Acceleration Globally**

Navigate to `chrome://flags/#disable-accelerated-2d-canvas` and set to Disabled, or launch with:

```bash
google-chrome --disable-gpu --disable-software-rasterizer
```

> **VPS Tip:** If you're running OpenClaw on a cloud server, use an instance with at least 2 CPU cores and 4GB RAM. [Vultr](https://www.vultr.com/?ref=7566454) high-frequency compute instances and [Tencent Cloud Lighthouse](https://curl.qcloud.com/1PS2iJEg) both offer great value for running OpenClaw + Headless Chrome.

---

## Issue 4: Cannot Launch Chrome on Remote Server

### Symptoms

- `openclaw` fails to start the browser on a VPS
- Error messages include `No usable sandbox` or `Failed to launch browser`

### Steps

**1. Install Chrome and Dependencies**

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install -y google-chrome-stable

# If you don't have the Google repo:
wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | sudo gpg --dearmor -o /usr/share/keyrings/google-chrome.gpg
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/google-chrome.gpg] http://dl.google.com/linux/chrome/deb/ stable main" | sudo tee /etc/apt/sources.list.d/google-chrome.list
sudo apt update && sudo apt install -y google-chrome-stable
```

**2. Install Missing Shared Libraries**

```bash
sudo apt install -y \
  libnss3 libatk1.0-0 libatk-bridge2.0-0 \
  libcups2 libdrm2 libxkbcommon0 \
  libxcomposite1 libxdamage1 libxrandr2 \
  libgbm1 libpango-1.0-0 libasound2
```

**3. Enable noSandbox**

On servers without user namespaces (most VPS providers):

```yaml
browser:
  noSandbox: true
```

> **VPS Recommendations:** [DigitalOcean](https://m.do.co/c/0090e7c2aec0) Droplets support user namespaces by default, reducing sandbox issues. [Vultr](https://www.vultr.com/?ref=7566454) high-frequency instances run Chrome smoothly too.

---

## Issue 5: Extension Connected but AI Can't Control Pages

### Symptoms

- Extension connected (badge ON)
- AI browser commands return errors or have no effect

### Steps

**1. Check Page Permissions**

Some pages block extension script injection:

- `chrome://` system pages
- Chrome Web Store pages
- Banking/payment pages (CSP restrictions)

This is Chrome's security policy — it cannot be bypassed. Test on a regular page.

**2. Verify Extension Permissions**

In `chrome://extensions/`, confirm OpenClaw Browser Relay has:

- "On all sites" enabled
- "Allow access to file URLs" enabled (recommended)

**3. Re-inject**

If the page was open before the extension was installed, the content script may not be injected:

```
Refresh the page (F5) → Click the extension icon to re-activate
```

---

## Issue 6: WebSocket Connection Keeps Dropping

### Symptoms

- Extension toggles between ON/OFF repeatedly
- Logs show `WebSocket connection closed` or `reconnecting`

### Steps

**1. Check Network Stability**

```bash
ping -c 10 your-server-ip
```

If packet loss >5% or latency >200ms, browser control will be unreliable.

**2. Configure Reverse Proxy for WebSocket**

If you're behind Nginx/Caddy:

```nginx
location / {
    proxy_pass http://127.0.0.1:18789;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_read_timeout 86400;
}
```

**3. Check Firewall**

```bash
sudo ufw status | grep 18789
# If not allowed:
sudo ufw allow 18789/tcp
```

---

## Still Not Working?

1. **Collect full logs:**

```bash
openclaw gateway logs --lines 100 > /tmp/openclaw-debug.log
```

2. **Ask the community:** [OpenClaw Discord](https://discord.com/invite/clawd) #support channel

3. **File an issue:** [GitHub Issues](https://github.com/openclaw/openclaw/issues) with logs and system info

> **Deployment Recommendations:** For overseas servers with direct connectivity, [Vultr](https://www.vultr.com/?ref=7566454) and [DigitalOcean](https://m.do.co/c/0090e7c2aec0) are solid choices. For users in China, [Tencent Cloud Lighthouse](https://curl.qcloud.com/1PS2iJEg) offers great domestic speeds (pair with a proxy for Telegram).
