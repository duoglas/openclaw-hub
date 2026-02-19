---
title: "OpenClaw config.yaml Explained: Structure, Common Errors & Fixes (2026)"
description: "A complete walkthrough of OpenClaw's config.yaml — core structure, required fields, model routing, plugin allowlists, and step-by-step fixes for schema validation failures, provider timeouts, and channel startup errors."
pubDate: 2026-02-19
tags: ["openclaw", "config", "yaml", "troubleshooting", "guide", "tutorial"]
category: "guide"
lang: "en"
---

Everything in OpenClaw runs off a single `config.yaml`. One wrong field and the gateway won't start. One missing key and every model call times out. This guide covers the **structure, gotchas, and fixes** — so you can stop guessing.

## Where is config.yaml?

```bash
# Default location
~/.openclaw/config.yaml

# View the currently loaded config
openclaw gateway config
```

## Minimal Working Config

```yaml
gateway:
  mode: local          # local | remote
  port: 18789

providers:
  - id: anthropic
    kind: anthropic
    apiKey: sk-ant-xxx

models:
  default: anthropic/claude-sonnet-4-5
  fallbacks:
    - anthropic/claude-sonnet-4-5

plugins:
  allow: []

channels: []
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

```yaml
providers:
  - id: anthropic
    kind: anthropic
    apiKey: sk-ant-api03-xxx

  - id: openai
    kind: openai
    apiKey: sk-xxx

  - id: google
    kind: google
    apiKey: AIzaSy-xxx
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

```yaml
models:
  default: anthropic/claude-opus-4-6
  fallbacks:
    - openai/gpt-5.3-codex
    - google/gemini-3-pro
```

OpenClaw automatically switches to the next available model when rate-limited.

---

## 3. Models — Routing & Fallbacks

```yaml
models:
  default: anthropic/claude-sonnet-4-5
  fallbacks:
    - openai/gpt-5.3-codex
    - google/gemini-3-flash
```

Format is always `provider-id/model-name`. The provider ID must match what you defined in `providers`.

```
Error: model "claude-sonnet-4-5" not found
```

You forgot the provider prefix. Use `anthropic/claude-sonnet-4-5`.

---

## 4. Plugins — Allowlist

```yaml
plugins:
  allow:
    - web_search
    - web_fetch
    - exec
    - browser
```

This is a **whitelist**. Only listed plugins can be used by the agent. Empty `[]` = no plugins available.

If the agent says "I don't have access to tool X" — check the allowlist:

```bash
openclaw gateway config | grep -A 20 plugins
```

---

## 5. Channels

### Telegram

```yaml
channels:
  - kind: telegram
    token: "123456:ABC-xxx"
    allowedUsers:
      - "your_telegram_user_id"
```

**`409 Conflict: terminated by other getUpdates request`** — Another process is polling with the same token. Kill duplicates:

```bash
ps aux | grep openclaw
```

**`401 Unauthorized`** — Invalid token. Regenerate via [@BotFather](https://t.me/BotFather).

### Discord

```yaml
channels:
  - kind: discord
    token: "MTxx.xxx"
    allowedGuilds:
      - "guild-id"
```

---

## 6. YAML Validation Errors

**Bad indentation:**
```
YAMLException: bad indentation of a mapping entry
```

YAML uses spaces only — **no tabs**. Find tabs with:

```bash
cat -A ~/.openclaw/config.yaml | grep -n $'\t'
```

**Typos:**
```
Error: unknown field "chanels" in config
```

It's `channels`. Schema validation tells you exactly which line.

**Type errors:**
```yaml
# ❌ Wrong
port: "18789"

# ✅ Right
port: 18789
```

---

## 7. Debugging Tips

```bash
# Run in foreground to see live logs
openclaw gateway start --foreground

# If using systemd
journalctl -u openclaw -f --no-pager

# Reload config without losing sessions
openclaw gateway restart
```

---

## Quick Checklist

Before filing a bug, verify:

- ✅ Valid YAML (spaces, no tabs)
- ✅ All API keys are valid and not expired
- ✅ Model names use `provider-id/model-name` format
- ✅ `plugins.allow` includes needed tools
- ✅ Channel tokens are correct, no duplicate polling
- ✅ Network connectivity to API endpoints (proxy or VPS if needed)

---

*Hit a problem not covered here? Ask in the [OpenClaw Discord](https://discord.com/invite/clawd) or open an issue on [GitHub](https://github.com/openclaw/openclaw).*
