---
title: "OpenClaw Telegram Bot Online but Not Replying: 10-Minute Fix Guide (2026)"
description: "Fix the most common OpenClaw + Telegram issue (bot appears online but never replies) with step-by-step commands: token checks, webhook conflicts, pairing/allowlist, group privacy mode, and deployment stability tips."
pubDate: 2026-02-25
tags: ["openclaw", "telegram", "troubleshooting", "bot", "deployment"]
category: "guide"
lang: "en"
---

This is one of the highest-frequency OpenClaw support issues: **your Telegram bot shows online, but it does not reply**.

This guide is optimized for speed: verify facts first, then fix the root cause.

---

## 0) Run these 4 commands first

```bash
openclaw status
openclaw gateway status
openclaw channels list
openclaw logs --follow
```

Then send a message to your bot and watch logs.

- **Inbound logs exist, but no reply** → check pairing / allowlist / group policy
- **No inbound logs at all** → check token / webhook / network reachability

---

## 1) Validate your bot token (always first)

```bash
# Replace TOKEN with your real bot token
curl "https://api.telegram.org/botTOKEN/getMe"
```

- `"ok":true` → token is valid
- `401 Unauthorized` → token is invalid (regenerate in @BotFather)

After updating token:

```bash
openclaw config set channels.telegram.botToken "NEW_TOKEN"
openclaw gateway restart
```

---

## 2) Remove webhook conflicts (common polling blocker)

OpenClaw typically uses long polling. If Telegram still has a webhook URL set from an older setup, polling may not receive updates.

```bash
curl "https://api.telegram.org/botTOKEN/getWebhookInfo"
```

If `url` is not empty:

```bash
curl "https://api.telegram.org/botTOKEN/deleteWebhook"
openclaw gateway restart
```

---

## 3) Verify config location (frequent misconfiguration)

Telegram config must be under `channels.telegram`, not `models.providers`.

Correct example:

```json
{
  "channels": {
    "telegram": {
      "enabled": true,
      "botToken": "123456:ABC..."
    }
  }
}
```

Run config diagnostics:

```bash
openclaw doctor
```

---

## 4) Pairing / allowlist is blocking DM replies

Default policy may require approval before the bot replies in DM.

```bash
openclaw pairing list telegram
openclaw pairing approve telegram <CODE>
```

If you intentionally want direct allow behavior (for your own account):

```bash
openclaw config set channels.telegram.dmPolicy "allowlist"
openclaw config set channels.telegram.allowFrom '["YOUR_NUMERIC_ID"]'
openclaw gateway restart
```

> `allowFrom` expects **numeric Telegram user IDs**, not `@username`.

---

## 5) Works in DM, fails in groups: check privacy mode

If DM works but group messages are ignored:

1. In `@BotFather`, run `/setprivacy`
2. Select your bot and choose `Disable`
3. Remove and re-add the bot to the group (important)
4. Re-check group policy settings (`requireMention`, sender policy)

You can capture `chat.id` from logs and apply explicit group rules.

---

## 6) Network checks: can the host reach Telegram API?

```bash
curl -v "https://api.telegram.org/botTOKEN/getMe"
nslookup api.telegram.org
```

If you deploy from mainland China, a stable VPS is usually more reliable than local network + proxy stacking.

Practical options:

- [Tencent Cloud](https://curl.qcloud.com/1PS2iJEg): easier CN purchase/ops flow
- [Vultr](https://www.vultr.com/?ref=7566454): many global regions, fast provisioning
- [DigitalOcean](https://m.do.co/c/0090e7c2aec0): excellent docs, strong baseline stability

---

## 7) Final verification checklist

```bash
openclaw status
openclaw gateway status --deep
openclaw doctor --deep
openclaw logs --follow
```

You should confirm:

- Gateway is `running`
- Telegram channel is enabled
- Inbound events appear when you send messages
- Bot replies (or logs an explicit policy decision, not silent failure)

---

## 8) 10-minute decision tree

- **Online bot + no logs** → token + webhook first
- **Logs but no replies** → pairing / allowlist / group policy
- **DM works, group fails** → disable privacy mode + re-add bot
- **Random timeouts** → network quality first, then move to stable VPS

If still unresolved, share these outputs in support:

```bash
openclaw status
openclaw gateway status --deep
openclaw doctor --deep
```

That gives enough signal for fast diagnosis instead of guesswork.