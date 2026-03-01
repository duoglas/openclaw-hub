---
title: "OpenClaw Deployment Troubleshooting Checklist (2026): Gateway Fails, Telegram Bot Silent, Chrome Relay Not Connecting"
description: "A practical, command-first guide to fix the three most common OpenClaw deployment failures: gateway startup errors, Telegram bot not replying, and Chrome Browser Relay connection timeouts."
pubDate: 2026-03-01
tags: ["openclaw", "deployment", "gateway", "telegram", "chrome relay", "troubleshooting"]
category: "guide"
lang: "en"
---

If you just deployed OpenClaw, most incidents fall into three buckets:

1. `openclaw gateway start` fails
2. Telegram bot is online but does not reply
3. Chrome Browser Relay shows red ❗ or times out

This is a **command-first** troubleshooting runbook: stop the bleeding, locate the root cause, then stabilize.

---

## 0) Run a unified health check first

```bash
openclaw status
openclaw gateway status
openclaw channels list
openclaw doctor
openclaw logs --follow
```

What to verify:
- `gateway status` is `running`
- `channels list` includes `telegram` and it is enabled
- Logs show a consistent error pattern (409 / EADDRINUSE / timeout)

---

## 1) Gateway fails to start: fix by error signature

### A. Error: `Gateway start blocked: set gateway.mode=local`

```bash
openclaw config set gateway.mode local
openclaw gateway restart
openclaw gateway status
```

### B. Error: `EADDRINUSE` (port conflict)

```bash
sudo lsof -i :18789
# or
sudo ss -tlnp | grep 18789

openclaw gateway stop
kill <PID_USING_18789>
openclaw gateway start
```

### C. Error: `refusing to bind gateway ... without auth`

You bound `gateway.bind` to a non-loopback address without auth.

```bash
# Recommended for single-host deployment
openclaw config set gateway.bind "127.0.0.1"
openclaw gateway restart
```

If you need remote exposure:

```bash
openclaw config set gateway.auth.token "YOUR_STRONG_TOKEN"
openclaw gateway restart
```

### D. Service keeps crashing under systemd

```bash
journalctl -u openclaw --no-pager -n 80
which node
```

Check these first:
- Node version meets OpenClaw requirement (typically Node 22+)
- `~/.openclaw/.env` has required API keys
- Service user can read/write OpenClaw config/data paths

---

## 2) Telegram bot silent: resolve 409 first, then token/webhook

### A. Error: `409 Conflict: terminated by other getUpdates request`

This means **the same bot token is being polled by multiple instances**.

```bash
openclaw gateway stop
ps -ef | grep -i openclaw | grep -v grep
# after cleanup, run exactly one instance
openclaw gateway start
```

If you run OpenClaw on both laptop and VPS with the same token, keep only one online.

### B. Verify bot token validity

```bash
curl "https://api.telegram.org/botTOKEN/getMe"
```

If you get 401, regenerate token in BotFather, update config, restart gateway.

### C. Remove leftover webhook (required for polling mode)

```bash
curl "https://api.telegram.org/botTOKEN/getWebhookInfo"
curl "https://api.telegram.org/botTOKEN/deleteWebhook"
openclaw gateway restart
```

### D. Pairing policy blocks replies (`dmPolicy=pairing`)

```bash
openclaw pairing list telegram
openclaw pairing approve telegram <CODE>
```

---

## 3) Chrome Relay not connecting: check service → port → tab attach

### A. Confirm browser control service is reachable

```bash
openclaw gateway status
curl http://localhost:18792/health
ss -tlnp | grep 18792
```

### B. Extension red ❗ or timeout

Typical causes:
- Gateway not running
- Port 18792 not reachable
- Local browser trying to connect to remote gateway without tunnel

For remote hosts, create local SSH tunnel:

```bash
ssh -L 18792:localhost:18792 user@your-server
```

### C. Error: `no tab attached`

This is not a crash — it means **you did not attach a tab**:

1. Open the page you want to control
2. Click OpenClaw Relay icon in Chrome toolbar
3. Confirm badge is ON

---

## 4) One-pass convergence command pack

If you want a fast full sweep, run:

```bash
openclaw status
openclaw gateway status --deep
openclaw channels list
openclaw doctor --deep
openclaw gateway restart
openclaw logs --follow
```

Then send one Telegram message to your bot and click Relay once in Chrome. In most cases, logs will immediately reveal the exact failure point.

---

## 5) Stability recommendation: run OpenClaw on one 24/7 host

Many “random” outages are environment instability (laptop sleep, network switching, duplicate launches).

Production pattern:
- Run OpenClaw on exactly one always-on host
- Keep Telegram polling single-instance
- Use systemd with restart policy

Suggested deployment providers (2 vCPU / 2GB is enough to start):

- [Tencent Cloud](https://curl.qcloud.com/1PS2iJEg): strong connectivity for China users
- [Vultr](https://www.vultr.com/?ref=7566454): broad global regions, flexible pricing
- [DigitalOcean](https://m.do.co/c/0090e7c2aec0): straightforward docs, beginner-friendly ops

---

## 6) Bottom line

Most OpenClaw deployment failures are one of these:

- **Conflict**: multiple instances competing for token or port
- **Connectivity**: gateway/relay endpoint unreachable
- **Configuration**: token, webhook, pairing, bind/auth mismatch

Run this checklist end-to-end and you can usually restore service in 10–20 minutes.