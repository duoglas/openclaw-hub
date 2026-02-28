---
title: "OpenClaw Telegram 409 Conflict Fix (terminated by other getUpdates request) — 2026 Checklist"
description: "A command-first troubleshooting guide for the most common OpenClaw Telegram error: 409 Conflict from competing getUpdates clients. Covers duplicate instances, stale webhooks, systemd/docker overlap, and stable deployment patterns."
pubDate: 2026-02-28
tags: ["openclaw", "telegram", "409 conflict", "getupdates", "troubleshooting"]
category: "guide"
lang: "en"
---

If your logs show this error, you’re dealing with a polling ownership conflict:

```text
409 Conflict: terminated by other getUpdates request
```

Meaning: **the same Bot Token is being polled by more than one client at the same time**.  
OpenClaw Telegram integration uses long polling, and Telegram allows only one active poller per bot token.

This guide gives you a practical flow: contain → find cause → stabilize.

---

## 1) Contain first: keep only one OpenClaw instance running

Check current state:

```bash
openclaw status
openclaw gateway status
openclaw logs --follow
```

If 409 errors keep looping, stop Gateway first:

```bash
openclaw gateway stop
```

Then verify no stale processes are still alive:

```bash
ps -ef | grep -i openclaw | grep -v grep
```

If any are still running, kill the extra PID(s):

```bash
kill <PID>
```

Start once, and only once:

```bash
openclaw gateway start
openclaw gateway status
```

---

## 2) Root cause A (most common): same bot token on multiple machines

Typical pattern:
- one OpenClaw on your laptop
- another OpenClaw on a VPS
- both use the same `channels.telegram.botToken`

Result: they keep kicking each other out.

### Quick verification
Run on each machine:

```bash
openclaw gateway status
openclaw logs | tail -n 50
```

Keep only one long-running node online. Stop and disable the other:

```bash
openclaw gateway stop
systemctl --user disable --now openclaw 2>/dev/null || true
```

---

## 3) Root cause B: stale webhook conflicts with polling

Even if you now use polling, an old webhook from another service can still break updates.

Check webhook status:

```bash
# replace TOKEN with your real bot token
curl "https://api.telegram.org/botTOKEN/getWebhookInfo"
```

If `url` is not empty, delete webhook:

```bash
curl "https://api.telegram.org/botTOKEN/deleteWebhook"
```

Then restart OpenClaw:

```bash
openclaw gateway restart
```

---

## 4) Root cause C: systemd + manual start = duplicate runtime

You may have installed OpenClaw as a service, then also started it manually.

Check service status:

```bash
systemctl --user status openclaw --no-pager
```

Check duplicate processes:

```bash
ps -ef | grep -E "openclaw|gateway" | grep -v grep
```

Use one model only:
- either service-managed (recommended)
- or manual foreground start (short-term only)

If moving to service-managed mode:

```bash
openclaw gateway install
systemctl --user enable --now openclaw
systemctl --user status openclaw --no-pager
```

---

## 5) Docker case: multiple replicas fighting for one token

If you deploy with Docker/Compose or orchestrators, verify replica count.

Rules:
- keep Telegram consumer as a single replica
- never reuse one token across prod + staging stacks

Force single replica during troubleshooting:

```bash
docker compose ps
docker compose up -d --scale openclaw=1
```

---

## 6) Post-fix verification checklist

```bash
openclaw status
openclaw gateway status --deep
openclaw channels list
openclaw doctor
```

Expected:
- Gateway is `running`
- Telegram channel is `enabled`
- no more `409 Conflict` in logs

---

## 7) For long-term stability: run OpenClaw on one always-on VPS

If you switch often between local machine and cloud, duplicate startup is easy to trigger. A cleaner pattern:

- keep Telegram polling on one 24/7 VPS
- use local machine for config edits/testing only

Practical baseline: 2 vCPU / 2GB RAM.

- [Tencent Cloud](https://curl.qcloud.com/1PS2iJEg): strong connectivity for Mainland China users
- [Vultr](https://www.vultr.com/?ref=7566454): broad region coverage
- [DigitalOcean](https://m.do.co/c/0090e7c2aec0): simple docs and onboarding

---

## 8) Copy-ready 409 conflict recovery pack

```bash
openclaw gateway stop
ps -ef | grep -i openclaw | grep -v grep
curl "https://api.telegram.org/botTOKEN/getWebhookInfo"
curl "https://api.telegram.org/botTOKEN/deleteWebhook"
openclaw gateway start
openclaw logs --follow
```

If conflict persists, a second runtime still exists somewhere else (another host/container/service). Clean up by following sections A/C/Docker.

---

## Related guides

- [OpenClaw Telegram Bot Not Working? Full Troubleshooting Guide (2026)](/en/blog/openclaw-telegram-troubleshooting-guide/)
- [OpenClaw Gateway Start Failed? 2026 Fix Checklist](/en/blog/openclaw-gateway-start-failed-fix-checklist-2026/)
- [OpenClaw Logs Debug Guide: From Error to Root Cause](/en/blog/openclaw-logs-debug-guide/)
