---
title: "OpenClaw Telegram Bot Not Working? Complete Troubleshooting Guide (2026)"
description: "Fix every common OpenClaw + Telegram issue: silent bot, 401 errors, pairing failures, group chat problems, polling not working, and DNS/network issues. Step-by-step commands included."
pubDate: 2026-02-16
tags: ["openclaw", "telegram", "troubleshooting", "bot", "guide"]
category: "guide"
lang: "en"
---

Your OpenClaw Telegram bot shows online but ignores messages? You're getting 401 errors, pairing codes that do nothing, or group chats where the bot is invisible? This guide covers every known failure mode — with exact commands to diagnose and fix each one.

## Before You Start: Quick Health Check

Run these three commands first. They answer 80% of questions:

```bash
# Is OpenClaw running?
openclaw status

# Is Telegram channel active?
openclaw channels list

# Watch live events (send a message to your bot, then check here)
openclaw logs --follow
```

If `openclaw status` shows the gateway is not running, start there:

```bash
openclaw gateway start
```

If the gateway starts but Telegram isn't listed in `channels list`, your config is wrong. Jump to **Issue 1**.

---

## Issue 1: Bot Is Silent — No Response to Any Message

**Symptom:** Bot appears online on Telegram. You send messages. Nothing happens. No logs, no errors, no pairing prompt.

This is the #1 reported issue. The bot connects to the Telegram API successfully (so it looks "online"), but the polling loop never picks up messages.

### Step 1: Verify the bot token

```bash
# Replace TOKEN with your actual token
curl "https://api.telegram.org/botTOKEN/getMe"
```

You should see `{"ok":true,"result":{"id":...,"first_name":"...","username":"your_bot"}}`.

If you get `{"ok":false,"error_code":401}`, your token is invalid. Regenerate it:

1. Open Telegram → chat with `@BotFather`
2. Send `/revoke` → select your bot
3. Copy the new token
4. Update config:

```bash
openclaw config set channels.telegram.botToken "NEW_TOKEN_HERE"
openclaw gateway restart
```

### Step 2: Check for webhook conflicts

Telegram bots can only use **one** method: long polling OR webhooks. If a webhook URL is set (from a previous setup or another service), polling won't work.

```bash
curl "https://api.telegram.org/botTOKEN/getWebhookInfo"
```

If `"url"` is not empty, clear it:

```bash
curl "https://api.telegram.org/botTOKEN/deleteWebhook"
```

Then restart the gateway.

### Step 3: Check config location

OpenClaw reads config from `~/.openclaw/openclaw.json` (or `.json5`). A common mistake is editing the wrong file or putting Telegram config under `models.providers` instead of `channels`:

**Wrong:**
```json
{
  "models": {
    "providers": {
      "telegram": { "enabled": true }
    }
  }
}
```

**Correct:**
```json
{
  "channels": {
    "telegram": {
      "enabled": true,
      "botToken": "123456:ABC-DEF..."
    }
  }
}
```

Validate your config:

```bash
openclaw doctor
```

### Step 4: Check dmPolicy and pairing

Default `dmPolicy` is `"pairing"` — the bot won't respond until you approve the user.

```bash
# List pending pairing requests
openclaw pairing list telegram

# Approve a request
openclaw pairing approve telegram <CODE>
```

Pairing codes expire after 1 hour. If yours expired, send another message to the bot to generate a new one.

If you just want to allow yourself immediately:

```bash
# Find your Telegram user ID from logs
openclaw logs --follow
# Send a message to the bot, look for "from.id" in the log

# Then add yourself to allowlist
openclaw config set channels.telegram.dmPolicy "allowlist"
openclaw config set channels.telegram.allowFrom '["YOUR_NUMERIC_ID"]'
openclaw gateway restart
```

> **Important:** `allowFrom` requires **numeric Telegram user IDs**, not `@usernames`. If your config has `@username` entries, run `openclaw doctor --fix` to resolve them.

---

## Issue 2: 401 Unauthorized Error

**Symptom:** Logs show `401 Unauthorized` or `Bot token is invalid`.

**Causes:**
- Token was revoked or regenerated in BotFather
- Token has extra whitespace or newline characters
- Token is from a different bot than expected

**Fix:**

```bash
# Test token directly
curl "https://api.telegram.org/botTOKEN/getMe"

# If it fails, get a fresh token from BotFather
# Then update:
openclaw config set channels.telegram.botToken "FRESH_TOKEN"
openclaw gateway restart
```

**Pro tip:** If you use `tokenFile` instead of inline `botToken`, check the file for trailing newlines:

```bash
cat -A ~/.openclaw/telegram-token
# If you see a trailing $, the file has a newline — some setups handle this, but verify
```

---

## Issue 3: Group Chat — Bot Doesn't See Messages

**Symptom:** Bot works in DMs but ignores group messages entirely.

### Check 1: Privacy mode

Telegram bots have **Privacy Mode** enabled by default. In this mode, bots only see:
- Messages starting with `/`
- Replies to the bot's own messages
- Messages in groups where the bot is admin

Fix:

1. Chat with `@BotFather`
2. Send `/setprivacy`
3. Select your bot
4. Choose **Disable**

**Critical:** After changing privacy mode, you must **remove and re-add the bot** to every group. Telegram doesn't retroactively apply the change.

### Check 2: Groups config

If you have `channels.telegram.groups` in your config, it acts as an allowlist. The group must be listed:

```json5
{
  "channels": {
    "telegram": {
      "groups": {
        "*": { "requireMention": true }  // Allow all groups
      }
    }
  }
}
```

Or for a specific group:

```json5
{
  "channels": {
    "telegram": {
      "groups": {
        "-1001234567890": { "requireMention": false }
      }
    }
  }
}
```

### Check 3: Group policy and sender allowlist

`groupPolicy` defaults to `"allowlist"`. If `groupAllowFrom` isn't set, it falls back to `allowFrom`.

To allow all senders in a group:

```json5
{
  "channels": {
    "telegram": {
      "groups": {
        "-1001234567890": {
          "groupPolicy": "open",
          "requireMention": true
        }
      }
    }
  }
}
```

### Finding your group chat ID

- Forward a group message to `@userinfobot` or `@getidsbot`
- Or read `chat.id` from `openclaw logs --follow`
- Group IDs are negative numbers (e.g., `-1001234567890`)

---

## Issue 4: DNS and Network Failures

**Symptom:** Intermittent timeouts, connection drops, or `ETIMEOUT` errors in logs.

### IPv6 resolution issues

Some hosts resolve `api.telegram.org` to IPv6 first. If your server has broken IPv6 egress, Telegram API calls will timeout before falling back to IPv4.

```bash
# Check DNS resolution
dig +short api.telegram.org A
dig +short api.telegram.org AAAA

# Test connectivity
curl -4 "https://api.telegram.org/botTOKEN/getMe"
curl -6 "https://api.telegram.org/botTOKEN/getMe"
```

If IPv6 fails, disable Happy Eyeballs in OpenClaw:

```json5
{
  "channels": {
    "telegram": {
      "network": {
        "autoSelectFamily": false
      }
    }
  }
}
```

This is already disabled by default on Node 22+, but explicitly setting it doesn't hurt.

### Proxy configuration

If your server needs a proxy to reach Telegram (common in mainland China), configure it directly:

```json5
{
  "channels": {
    "telegram": {
      "proxy": "socks5://127.0.0.1:1080"
    }
  }
}
```

This is cleaner than relying on `proxychains` for Telegram traffic. The `proxy` field supports SOCKS5 and HTTP proxies.

> **Running on a VPS outside China?** You skip the proxy hassle entirely. Recommended providers for OpenClaw:
> - [Tencent Cloud](https://curl.qcloud.com/1PS2iJEg) — excellent Asia latency, Chinese dashboard
> - [Vultr](https://www.vultr.com/?ref=7566454) — $5/mo Tokyo/Singapore nodes, hourly billing
> - [DigitalOcean](https://m.do.co/c/0090e7c2aec0) — $4/mo droplets, solid documentation

---

## Issue 5: Polling Stops After Running for Hours

**Symptom:** Bot works initially but stops responding after some time. Gateway logs show the process is still running.

### Check 1: Memory or OOM kill

```bash
# Check if the process was killed
dmesg | grep -i "oom\|killed" | tail -5

# Check gateway process health
openclaw gateway status
```

If OOM is the issue, your VPS needs more RAM. OpenClaw with Telegram polling typically uses 150–300MB. A 1GB VPS can work but is tight if you're running other services.

> For reliable 24/7 operation, a 2GB+ VPS is recommended. Budget options:
> - [Vultr](https://www.vultr.com/?ref=7566454) — 2GB from $12/mo
> - [DigitalOcean](https://m.do.co/c/0090e7c2aec0) — 2GB from $12/mo
> - [Tencent Cloud](https://curl.qcloud.com/1PS2iJEg) — competitive pricing in Asia

### Check 2: Systemd service configuration

If OpenClaw runs as a systemd service, ensure auto-restart is configured:

```bash
# Check service status
systemctl --user status openclaw

# If not set up yet:
openclaw gateway install
```

The installer configures `Restart=on-failure` by default, which handles transient crashes.

### Check 3: Network timeouts

Long polling keeps a persistent connection to Telegram's servers. Network hiccups can silently break the connection.

```bash
# Check for timeout patterns in logs
openclaw logs | grep -i "timeout\|ECONNRESET\|ENOTFOUND" | tail -10
```

If you see frequent disconnects, set an explicit timeout:

```json5
{
  "channels": {
    "telegram": {
      "timeoutSeconds": 60
    }
  }
}
```

---

## Issue 6: Commands Don't Work (`setMyCommands failed`)

**Symptom:** Telegram command menu doesn't appear, or logs show `setMyCommands failed`.

This usually means outbound HTTPS to `api.telegram.org` is blocked or unreliable.

```bash
# Test direct API access
curl -v "https://api.telegram.org/botTOKEN/getMe"

# Check DNS resolution
nslookup api.telegram.org
```

If DNS is the issue, try setting an explicit DNS resolver:

```bash
# /etc/resolv.conf
nameserver 8.8.8.8
nameserver 1.1.1.1
```

For proxy environments, ensure the proxy supports HTTPS traffic to Telegram.

---

## Issue 7: Forum Topics / Thread Routing Issues

**Symptom:** Bot responds in the wrong topic, or messages in specific topics are ignored.

Forum supergroups use thread IDs for routing. OpenClaw appends `:topic:<threadId>` to session keys.

### Configure per-topic behavior:

```json5
{
  "channels": {
    "telegram": {
      "groups": {
        "-1001234567890": {
          "requireMention": true,
          "topics": {
            "42": {
              "requireMention": false,
              "systemPrompt": "You are a support assistant in this topic."
            }
          }
        }
      }
    }
  }
}
```

**Note:** The "General" topic has `threadId=1`. OpenClaw handles this specially — it omits `message_thread_id` in sends (Telegram rejects `thread_id=1`), but includes it for typing indicators.

---

## Decision Flowchart

```
Bot not responding?
├── openclaw status → not running? → openclaw gateway start
├── openclaw channels list → telegram not listed? → check config format
├── openclaw logs --follow → send message → no logs at all?
│   ├── Check token: curl getMe
│   ├── Check webhook: curl getWebhookInfo → delete if set
│   └── Check config path: channels.telegram (not models.providers)
├── Logs show "pairing request"? → openclaw pairing approve telegram <CODE>
├── Works in DMs but not groups?
│   ├── /setprivacy → Disable → remove + re-add bot
│   ├── Check groups config (must include group ID or "*")
│   └── Check groupPolicy (default: allowlist)
└── Intermittent failures?
    ├── Check IPv6: dig AAAA → disable autoSelectFamily
    ├── Check memory: dmesg | grep oom
    └── Check proxy/DNS connectivity
```

---

## Still Stuck?

1. Run `openclaw doctor` — it catches most config errors automatically
2. Check [OpenClaw Discord](https://discord.com/invite/clawd) — the `#support` channel is active
3. Search [GitHub Issues](https://github.com/openclaw/openclaw/issues) for your error message
4. Read the [official Telegram channel docs](https://docs.openclaw.ai)

The Telegram integration is production-ready and handles thousands of messages daily across the community. Most issues come down to token configuration, pairing flow, or network routing — all fixable in under 5 minutes with the commands above.


## Related Reading

- [Silent Message Loss / Replay Troubleshooting (2026)](/en/blog/openclaw-delivery-reliability-silent-loss-replay-fix-2026/)
