---
title: "OpenClaw Telegram Bot Online but Not Replying: Webhook, 409 Conflict, and Permission Fix Checklist (2026)"
description: "Telegram bot shows online but doesn't reply? Follow this OpenClaw troubleshooting checklist step by step: gateway health, 409 conflicts, webhook routing, group permissions, model/API failures, and repair commands."
pubDate: 2026-03-02
tags: ["openclaw", "telegram", "troubleshooting", "webhook", "409", "guide"]
category: "guide"
lang: "en"
---

If your Telegram bot is "online" but silent, the root cause is usually one of a few repeat offenders:

- Bot appears online, but no response to messages
- Works intermittently, then goes silent again
- Logs contain `409 Conflict`, `getUpdates`, or `webhook` errors

This guide gives you a practical **first-to-last troubleshooting order**. In most cases, you'll find the issue in 10–20 minutes.

## 0) First identify your mode: webhook or polling

Do not mix both. The #1 production issue is one instance using webhook while another still uses polling (or vice versa).

Run:

```bash
openclaw status
openclaw gateway status
openclaw logs --follow
```

If managed by systemd:

```bash
openclaw gateway status
journalctl --user -u openclaw-gateway --no-pager -n 100
```

---

## 1) Eliminate 409 Conflict first (highest-frequency issue)

### Typical errors

- `409 Conflict: terminated by other getUpdates request`
- `can't use getUpdates while webhook is active`

### Root cause

Multiple processes are consuming updates for the same Telegram bot token (common: stale process, second server still running, local test script polling updates).

### Fix steps

```bash
# 1) Stop OpenClaw on this node
openclaw gateway stop

# 2) Check remaining processes (if needed)
ps aux | grep -E "openclaw|node" | grep -v grep

# 3) Keep only one production instance, then restart
openclaw gateway start
openclaw gateway status
```

If you run multiple hosts, ensure only one active production consumer for that token.

---

## 2) Verify Telegram token/env vars are visible to the service process

Working in your interactive shell does not mean systemd sees the same environment.

```bash
# Check for token/auth errors in service logs
journalctl --user -u openclaw-gateway --no-pager -n 100

# Common location for daemon env
cat ~/.openclaw/.env
```

If missing, add and restart:

```bash
# Example; replace with your real token
cat >> ~/.openclaw/.env <<'EOF'
TELEGRAM_BOT_TOKEN=123456:xxxxxx
EOF

openclaw gateway restart
openclaw gateway status
```

---

## 3) Validate webhook reachability (critical for public deployments)

With webhook mode, Telegram must be able to reach your OpenClaw webhook URL.

### Checklist

1. DNS resolves correctly
2. Port 443 is reachable
3. Reverse proxy (Nginx/Caddy/Cloudflare Tunnel) is not blocking requests
4. TLS certificate is valid

### Quick checks

```bash
# Gateway runtime and probes
openclaw gateway status --deep

# Local listeners (adjust ports to your setup)
ss -tlnp | grep -E "18789|443|80"

# Reverse proxy logs (Nginx example)
sudo tail -n 100 /var/log/nginx/access.log
sudo tail -n 100 /var/log/nginx/error.log
```

If you're tired of home-network NAT, unstable broadband, or machine sleep issues, a small VPS is often the fastest path to reliability (2 vCPU / 2GB is enough):

- Tencent Cloud Lightweight: <https://curl.qcloud.com/1PS2iJEg>
- Vultr: <https://www.vultr.com/?ref=7566454>
- DigitalOcean: <https://m.do.co/c/0090e7c2aec0>

---

## 4) Works in DM but not in groups: check bot permissions + privacy mode

A common pattern: private chat works, group chat appears broken.

### Verify

- Bot is actually in the group
- Bot has permission to read relevant messages
- Telegram Privacy Mode is configured appropriately (it may only receive command messages)
- You mention the bot or use clear trigger patterns where required

### Practical setup advice

- Review bot settings in BotFather
- Grant least privilege first, then add only what you need
- Validate in a small test group before rolling out to production groups

---

## 5) Message ingestion works but still no reply: inspect model/API layer

After Telegram ingestion, OpenClaw still depends on model providers. Upstream failures can look like Telegram issues.

```bash
openclaw status
openclaw logs --follow
```

Focus on:

- Invalid model API key
- Quota/credits exhausted
- Request timeouts or proxy failures
- Missing fallback model configuration

In unstable network regions, fallback models prevent full silence during provider incidents.

---

## 6) Copy-paste recovery sequence

```bash
# A. Stop service
openclaw gateway stop

# B. Remove conflicting duplicate instances (keep one)
ps aux | grep -E "openclaw|node" | grep -v grep

# C. Validate config and env
openclaw status
cat ~/.openclaw/.env

# D. Start and observe
openclaw gateway start
openclaw gateway status --deep
openclaw logs --follow
```

If still failing:

```bash
openclaw doctor --deep
openclaw doctor --repair --force
openclaw gateway restart
```

---

## FAQ

### Q1) Which mode should I use: polling or webhook?
For single-host setups, polling is usually simpler and more stable. Use webhook only when you need strict inbound control and can guarantee public HTTPS reachability.

### Q2) Why does it work in DM but not in group chats?
Most often it's Telegram privacy mode or missing group policy allowlist. Re-check bot privacy settings, group permissions, and `channels.telegram.groupPolicy`/`groupAllowFrom`.

### Q3) I fixed token/webhook but still no reply. What next?
Check model-layer failures immediately (`openclaw logs --follow`). Invalid provider keys, quota exhaustion, and upstream timeout errors can all look like Telegram failures.

## Bottom line: 90% of Telegram "no reply" cases are these 3

1. **Duplicate consumer conflict (409)**
2. **Webhook reachability/routing failure**
3. **Service env mismatch (token/config not loaded by runtime)**

Fix these first, then inspect model-layer logs. That order saves the most time.

## Related guides

- [OpenClaw Telegram Troubleshooting Guide](/en/blog/openclaw-telegram-troubleshooting-guide/)
- [OpenClaw Gateway Won't Start / Browser Relay Not Connecting: Complete Fix Guide (2026)](/en/blog/openclaw-gateway-browser-relay-troubleshooting/)
- [OpenClaw Log Troubleshooting Guide: From Error to Root Cause](/en/blog/openclaw-logs-debug-guide/)
- [OpenClaw Deployment Troubleshooting: Gateway, Telegram, and Chrome Fixes (2026)](/en/blog/openclaw-deployment-troubleshooting-gateway-telegram-chrome-2026/)
