---
title: "Telegram Bot API 409 Conflict: Fix 'terminated by other getUpdates request' (2026)"
description: "Fix Telegram Bot API error 409: terminated by another getUpdates request. Find duplicate polling processes across OpenClaw, Python, Node.js, systemd, Docker, and VPS deployments."
pubDate: 2026-02-28
updatedDate: 2026-07-27
tags: ["telegram bot api", "openclaw", "telegram", "409 conflict", "getupdates", "troubleshooting"]
category: "guide"
lang: "en"
faq:
  - question: "What does '409 Conflict: terminated by other getUpdates request' mean?"
    answer: "It means two or more processes are calling Telegram Bot API getUpdates with the same bot token. Telegram long polling supports only one active poller per bot, so a newer request terminates the previous one."
  - question: "How many getUpdates processes can a Telegram bot run?"
    answer: "Only one long-polling getUpdates process should run for a bot token. If you need multiple application replicas, use one dedicated update consumer and distribute work internally, or switch to a webhook architecture."
  - question: "Can an old webhook cause this exact 409 error?"
    answer: "Not usually. An active webhook produces a different conflict saying getUpdates cannot be used while a webhook is active. The exact 'terminated by other getUpdates request' message points to another polling client."
  - question: "How do I fix Telegram 409 in OpenClaw?"
    answer: "Stop every OpenClaw instance using the token, including local, VPS, systemd, Docker, staging, and old test processes. Then start one gateway and confirm the 409 message no longer appears in the logs."
  - question: "Will rotating the Telegram bot token fix a 409 conflict?"
    answer: "It can disconnect an unknown old poller, but it should be a last resort. First locate duplicate runtimes. If you rotate the token, update the one intended deployment and revoke or stop every old configuration."
---

If your Telegram bot logs show this exact error, you have a polling ownership conflict:

```text
409 Conflict: terminated by other getUpdates request
```

## Quick answer

**The same Telegram bot token is being used by two or more `getUpdates` clients.** Stop every duplicate bot process, container, service, VPS instance, development session, or automation that uses that token. Then start exactly one polling process.

For OpenClaw, the shortest safe recovery flow is:

```bash
openclaw gateway stop
ps -ef | grep -Ei "openclaw|telegram" | grep -v grep
# Stop any duplicate process or deployment you find.
openclaw gateway start
openclaw logs --follow
```

This error is defined by Telegram Bot API long polling behavior: [`getUpdates`](https://core.telegram.org/bots/api#getupdates) must not be called concurrently for the same bot. The fix applies to OpenClaw, Python libraries such as python-telegram-bot or aiogram, Node.js bots, Docker, systemd, PM2, Kubernetes, and custom polling scripts.

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

## 3) Check for a webhook conflict — a different 409 message

An active webhook can also block polling, but it normally produces a different error similar to:

```text
Conflict: can't use getUpdates method while webhook is active
```

That is not the same as `terminated by other getUpdates request`. Check it separately if your logs mention a webhook.

Check webhook status:

```bash
export TELEGRAM_BOT_TOKEN='replace-with-your-token'
curl "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getWebhookInfo"
```

If `url` is not empty, delete the webhook:

```bash
curl "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/deleteWebhook?drop_pending_updates=false"
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

For Kubernetes, PM2, or another process manager, apply the same rule: one Telegram polling replica per token. Scaling the web application is fine, but the update consumer must remain a singleton unless you move to [Telegram webhooks](https://core.telegram.org/bots/api#setwebhook).

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
export TELEGRAM_BOT_TOKEN='replace-with-your-token'
curl "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getWebhookInfo"
openclaw gateway start
openclaw logs --follow
```

If the exact `terminated by other getUpdates request` conflict persists, a second runtime still exists somewhere else. Check another host, container, service manager, staging deployment, development machine, or forgotten script.

Do not repeatedly call `deleteWebhook` for this exact error unless `getWebhookInfo` actually shows an active webhook. A competing `getUpdates` poller is the root cause.

---

## Official Telegram Bot API references

- [`getUpdates` — long polling](https://core.telegram.org/bots/api#getupdates)
- [`getWebhookInfo` — inspect webhook state](https://core.telegram.org/bots/api#getwebhookinfo)
- [`setWebhook` — webhook delivery](https://core.telegram.org/bots/api#setwebhook)
- [`deleteWebhook` — return from webhook to polling](https://core.telegram.org/bots/api#deletewebhook)

---

## Related guides

- [OpenClaw Telegram Bot Not Working? Full Troubleshooting Guide (2026)](/en/blog/openclaw-telegram-troubleshooting-guide/)
- [OpenClaw Gateway Start Failed? 2026 Fix Checklist](/en/blog/openclaw-gateway-start-failed-fix-checklist-2026/)
- [OpenClaw Logs Debug Guide: From Error to Root Cause](/en/blog/openclaw-logs-debug-guide/)
