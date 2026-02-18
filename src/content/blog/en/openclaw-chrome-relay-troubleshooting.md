---
title: "OpenClaw Chrome Relay Not Connecting? Complete Troubleshooting Guide (2026)"
description: "Fix Chrome Extension Relay connection failures: badge showing exclamation mark, tab won't attach, Snap Chromium incompatibility, GPU crashes with proxychains, remote Gateway setup. Step-by-step diagnostic commands included."
pubDate: 2026-02-18
tags: ["openclaw", "chrome", "browser-relay", "troubleshooting", "tutorial", "browser-automation"]
category: "tutorial"
lang: "en"
---

OpenClaw's Chrome Extension Relay lets AI agents control your actual browser tabs — but connection issues are one of the most common support questions. This guide walks you from a `!` badge all the way to a working relay.

> **Haven't installed OpenClaw yet?** See the [installation troubleshooting guide](/blog/openclaw-install-first-run-error-troubleshooting) first. This article assumes your Gateway is already running.

## 🔍 Step 0: Quick Diagnostics

Run these commands to get the full picture:

```bash
openclaw status
openclaw gateway status
openclaw browser --browser-profile chrome status
openclaw logs --tail 20
```

Healthy state should show:
- Gateway `Runtime: running`
- Browser control service listening
- Relay server reachable

## ❗ Issue 1: Badge Shows `!` (Most Common)

The exclamation mark on the extension icon means **the extension can't reach the local Relay server**.

### Troubleshooting Steps

**1. Confirm Gateway is running**

```bash
openclaw gateway status
# If not running:
openclaw gateway start
```

**2. Check if the Relay port is listening**

Default Relay port is `18792` (Gateway port + 3):

```bash
ss -tlnp | grep 18792
```

No output? The Relay isn't started. Check logs:

```bash
openclaw logs --tail 50 | grep -i relay
```

**3. Port conflict**

If something else is using `18792`:

```bash
ss -tlnp | grep 18792
```

Fix: stop the conflicting process, or change the Gateway port (Relay port follows):

```json5
// ~/.openclaw/openclaw.json
{
  "gateway": {
    "port": 18800  // Relay becomes 18803
  }
}
```

Update the Relay address in the extension Options page after changing.

**4. Check extension Options page**

Right-click extension icon → Options to verify Relay connection status and address.

## 🖥️ Issue 2: Clicking Extension Icon Does Nothing / Badge Stuck on `…`

The `…` badge means the extension is trying to connect. If it stays there:

```bash
# Verify Relay is reachable
curl -s http://127.0.0.1:18792/ | head
```

If it returns JSON, the Relay is fine. The problem might be:

- **Chrome version too old**: needs Manifest V3 support (Chrome 88+)
- **Extension needs updating** after an OpenClaw upgrade:

```bash
openclaw browser extension install
# Then go to chrome://extensions and click Reload
```

## 🐧 Issue 3: Chrome Fails to Start on Linux

### Snap Chromium Incompatibility

Ubuntu's default Chromium is a Snap package with AppArmor confinement that blocks OpenClaw:

```
Error: Failed to start Chrome CDP on port 18800
```

**Fix: Install Google Chrome**

```bash
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
sudo dpkg -i google-chrome-stable_current_amd64.deb
sudo apt --fix-broken install -y
```

Point OpenClaw to it:

```json5
// ~/.openclaw/openclaw.json
{
  "browser": {
    "enabled": true,
    "executablePath": "/usr/bin/google-chrome-stable",
    "headless": true,
    "noSandbox": true
  }
}
```

### GPU Crash (Proxy Environments)

If you use proxychains or similar proxy tools, Chrome may crash due to GPU process failure:

```
GPU process isn't usable. Goodbye.
```

**Fix: Create a wrapper script**

```bash
cat > ~/.openclaw/browser/chrome-wrapper.sh << 'EOF'
#!/bin/bash
unset LD_PRELOAD
exec /usr/bin/google-chrome-stable \
  --proxy-server="socks5://127.0.0.1:1080" \
  "$@"
EOF
chmod +x ~/.openclaw/browser/chrome-wrapper.sh
```

Use the wrapper in config:

```json5
{
  "browser": {
    "executablePath": "~/.openclaw/browser/chrome-wrapper.sh",
    "noSandbox": true
  }
}
```

This bypasses the `LD_PRELOAD` injection from proxychains while still routing traffic through the proxy via Chrome's `--proxy-server` flag.

## 🌐 Issue 4: Remote Gateway + Local Browser

Gateway running on a remote server but you want to control your local browser? You need a **Node Host** on your local machine.

### Setup

**1. Pair your local machine as a Node**

```bash
openclaw node pair --gateway https://your-gateway:18789
```

**2. Configure browser proxy on the Gateway**

```json5
// Remote Gateway's openclaw.json
{
  "gateway": {
    "nodes": {
      "browser": {
        "mode": "node"
      }
    }
  }
}
```

**3. Verify connection**

```bash
# On the Gateway machine
openclaw node list
```

> **Tip**: Use [Tailscale](https://tailscale.com) for secure networking without exposing ports. For a reliable remote Gateway server, consider [Tencent Cloud](https://curl.qcloud.com/1PS2iJEg) (great for Asia-Pacific), [Vultr](https://www.vultr.com/?ref=7566454) (global coverage), or [DigitalOcean](https://m.do.co/c/0090e7c2aec0) (excellent community docs).

## 🔒 Issue 5: Browser Unavailable in Sandbox Mode

If your Agent runs sandboxed, it defaults to the sandbox browser, not host Chrome Relay.

**Allow sandbox access to host browser**:

```json5
{
  "agents": {
    "defaults": {
      "sandbox": {
        "browser": {
          "allowHostControl": true
        }
      }
    }
  }
}
```

Then use `target="host"` when calling the browser tool from the Agent.

## 📋 Quick Reference

| Symptom | Likely Cause | Quick Fix |
|---------|-------------|-----------|
| Badge `!` | Relay not running | `openclaw gateway start` |
| Badge stuck `…` | Old extension | `openclaw browser extension install` + Reload |
| CDP start fails | Snap Chromium | Install Google Chrome |
| GPU crash | proxychains LD_PRELOAD | Use wrapper script |
| Can't control remotely | No Node Host | Run `openclaw node pair` locally |
| Unavailable in sandbox | Default isolation | Set `allowHostControl` |

## 🔗 Related Resources

- [OpenClaw Docs - Browser Control](https://docs.openclaw.ai/tools/browser)
- [Chrome Extension Docs](https://docs.openclaw.ai/tools/chrome-extension)
- [Linux Browser Troubleshooting](https://docs.openclaw.ai/tools/browser-linux-troubleshooting)
- [OpenClaw VPS Deployment Guide](/blog/openclaw-vps-deployment-complete-guide)

---

Hit an issue not covered here? Join the [OpenClaw Discord](https://discord.com/invite/clawd) or file an issue on [GitHub](https://github.com/openclaw/openclaw).
