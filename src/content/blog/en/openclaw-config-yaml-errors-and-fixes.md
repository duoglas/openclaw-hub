---
title: "OpenClaw Configuration File Explained: Structure, Common Errors & Fixes (2026)"
description: "A complete walkthrough of OpenClaw's openclaw.json config — core structure, required fields, model routing, plugin allowlists, and step-by-step fixes for schema validation failures, provider timeouts, and channel startup errors."
pubDate: 2026-02-19
updatedDate: 2026-02-23
tags: ["openclaw", "config", "troubleshooting", "guide", "tutorial"]
category: "guide"
lang: "en"
---

Everything in OpenClaw runs off a single `openclaw.json`. One wrong field and the gateway won't start. One missing key and every model call times out. This guide covers the **structure, gotchas, and fixes** — so you can stop guessing.

## Where is the config file?

```bash
# Default location
~/.openclaw/openclaw.json

# View a specific config value
openclaw config get gateway
openclaw config get providers
```

> **Note:** OpenClaw uses JSON format for configuration, not YAML. JSON does not allow comments or trailing commas.

## Minimal Working Config

```json
{
  "gateway": {
    "mode": "local",
    "port": 18789
  },
  "providers": {
    "anthropic": {
      "apiKey": "sk-ant-api03-xxx"
    }
  },
  "models": {
    "default": "anthropic/claude-sonnet-4-5",
    "fallbacks": ["anthropic/claude-sonnet-4-5"]
  },
  "plugins": {
    "allow": []
  },
  "channels": {}
}
```

---

## 1. Gateway Section

**Common errors:**

```
Error: invalid gateway.mode "Local"
```

Mode is case-sensitive — use lowercase `local` or `remote`.

```
Error: EADDRINUSE :::18789
```

Port already in use:

```bash
sudo lsof -i :18789
kill -9 <PID>
```

---

## 2. Providers — Model API Configuration

```json
{
  "providers": {
    "anthropic": {
      "apiKey": "sk-ant-api03-xxx"
    },
    "openai": {
      "apiKey": "sk-xxx"
    },
    "google": {
      "apiKey": "AIzaSy-xxx"
    }
  }
}
```

### Frequent Errors

**`Provider authentication failed`** — Verify your key:

```bash
curl -s https://api.anthropic.com/v1/messages \
  -H "x-api-key: $YOUR_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -H "content-type: application/json" \
  -d '{"model":"claude-sonnet-4-5-20250514","max_tokens":10,"messages":[{"role":"user","content":"hi"}]}'
```

**`connect ETIMEDOUT`** — Can't reach the API. If you're in a restricted network region, use a proxy or deploy on a VPS with direct access. Good options:

- [Vultr](https://www.vultr.com/?ref=7566454) — hourly billing, 30+ locations worldwide
- [DigitalOcean](https://m.do.co/c/0090e7c2aec0) — $200 free credits for new accounts
- [Tencent Cloud](https://curl.qcloud.com/1PS2iJEg) — Hong Kong/Singapore nodes with low latency to API providers

**`429 Too Many Requests`** — Configure fallback models:

```json
{
  "models": {
    "default": "anthropic/claude-opus-4-6",
    "fallbacks": [
      "openai/gpt-5.3-codex",
      "google/gemini-3-pro"
    ]
  }
}
```

OpenClaw automatically switches to the next available model when rate-limited.

---

## 3. Models — Routing & Fallbacks

```json
{
  "models": {
    "default": "anthropic/claude-sonnet-4-5",
    "fallbacks": [
      "openai/gpt-5.3-codex",
      "google/gemini-3-flash"
    ]
  }
}
```

Format is always `provider-id/model-name`. The provider ID must match what you defined in `providers`.

```
Error: model "claude-sonnet-4-5" not found
```

You forgot the provider prefix. Use `anthropic/claude-sonnet-4-5`.

---

## 4. Plugins — Allowlist

```json
{
  "plugins": {
    "allow": [
      "web_search",
      "web_fetch",
      "exec",
      "browser"
    ]
  }
}
```

This is a **whitelist**. Only listed plugins can be used by the agent. Empty `[]` = no plugins available.

If the agent says "I don't have access to tool X" — check the allowlist:

```bash
openclaw config get plugins
```

---

## 5. Channels

### Telegram

Configure via `openclaw configure` (interactive) or edit `openclaw.json` directly.

**`409 Conflict: terminated by other getUpdates request`** — Another process is polling with the same token. Kill duplicates:

```bash
ps aux | grep openclaw
```

**`401 Unauthorized`** — Invalid token. Regenerate via [@BotFather](https://t.me/BotFather).

---

## 6. JSON Validation Errors

**Trailing comma:**
```
SyntaxError: Unexpected token } in JSON at position 423
```

JSON does not allow trailing commas. The last property in an object must not end with `,`.

**Validate your JSON:**
```bash
python3 -m json.tool ~/.openclaw/openclaw.json
```

**Typos:**
```
Error: unknown field "chanels" in config
```

It's `channels`. Schema validation tells you exactly which field.

**Type errors:**
```json
// ❌ Wrong
"port": "18789"

// ✅ Right
"port": 18789
```

---

## 7. Debugging Tips

```bash
# Watch logs in real time
openclaw logs --follow

# Run automated diagnostics
openclaw doctor

# If using systemd
journalctl -u openclaw -f --no-pager

# Reload config without losing sessions
openclaw gateway restart
```

---

## Quick Checklist

Before filing a bug, verify:

- ✅ Valid JSON (no trailing commas, no comments)
- ✅ All API keys are valid and not expired
- ✅ Model names use `provider-id/model-name` format
- ✅ `plugins.allow` includes needed tools
- ✅ Channel tokens are correct, no duplicate polling
- ✅ Network connectivity to API endpoints (proxy or VPS if needed)

---

*Hit a problem not covered here? Ask in the [OpenClaw Discord](https://discord.com/invite/clawd) or open an issue on [GitHub](https://github.com/openclaw/openclaw).*
