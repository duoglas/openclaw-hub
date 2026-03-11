---
title: "OpenClaw Skill Installed but Not Working? 3-Step Allowlist Fix (2026)"
description: "Skill installed but no response? Use a 3-step flow: verify install → allowlist → restart and validate."
pubDate: 2026-03-10
tags: ["openclaw", "skills", "clawhub", "troubleshooting", "allowlist"]
category: "tutorial"
lang: "en"
faq:
  - question: "Why does a skill install but not respond?"
    answer: "Most cases are allowlist or config issues: the skill is installed but not present in plugins.allow, or the config change wasn’t applied and the gateway wasn’t restarted. Fix those three points and validate."
  - question: "Where do I set plugins.allow?"
    answer: "Edit ~/.openclaw/openclaw.json and add the skill under plugins.allow, or check current values with: openclaw config get plugins.allow."
  - question: "Do I have to restart the gateway after allowlisting?"
    answer: "Yes. OpenClaw loads plugins on startup. Run openclaw gateway restart, then verify the skill appears in logs or responds to a test command."
---

## What this article solves

You ran `openclaw skill install <name>` but the skill never triggers. In most cases the skill is fine — **it is blocked by allowlist, config wasn’t applied, or the gateway wasn’t restarted**.

Here is a **3-step, verifiable** flow with copyable commands.

## 3-step fix (copy/paste ready)

### Step 1: Confirm the skill is installed

```bash
ls ~/.openclaw/skills/
```

If you see the directory (e.g., `home-assistant`), installation succeeded. If not, reinstall:

```bash
openclaw skill install <skill-name>
```

> If the name is not found, double-check spelling and see the [ClawHub Skill Security Guide](/en/blog/openclaw-clawhub-skill-security-guide) for naming conventions.

### Step 2: Check the plugin allowlist (`plugins.allow`)

OpenClaw does **not** load skills that are not explicitly allowed. Check:

```bash
openclaw config get plugins.allow
```

If your skill is missing, edit the config file:

```bash
# default config path
~/.openclaw/openclaw.json
```

Example:

```json
{
  "plugins": {
    "allow": ["home-assistant", "github", "weather"]
  }
}
```

> If you are unsure about config structure, see: [OpenClaw Config Guide & Common Fixes](/en/blog/openclaw-config-yaml-errors-and-fixes).

### Step 3: Restart the gateway and validate

Apply the change:

```bash
openclaw gateway restart
openclaw gateway status
```

**Validation:**
- Re-run a clear command (e.g., “turn off the living room light”).
- Or confirm the skill is listed in logs after restart.

> If there is still no response, check channel status: `openclaw channels status` (see [Channel No-Reply Diagnosis](/en/blog/openclaw-channels-status-probe-no-reply-diagnosis-2026/)).

## Common mistakes (1-minute check)

- **Installed but not allowlisted** → skill never loads
- **Config edited but not restarted** → old config still active
- **Wrong skill name** → install failed silently

## Minimum evidence pack (for quick escalation)

- `ls ~/.openclaw/skills/` shows the target skill
- `openclaw config get plugins.allow` includes the skill name
- `openclaw gateway status` shows running

## Final takeaway

**If you follow “install check → allowlist → restart + validate”, most skill issues are fixed in under 5 minutes.**

If it still fails, use the evidence pack to debug config or channel layer (linked below).

---

### Further reading

- [OpenClaw Config Guide & Common Fixes](/en/blog/openclaw-config-yaml-errors-and-fixes)
- [ClawHub Skill Security Guide](/en/blog/openclaw-clawhub-skill-security-guide)
- [Raspberry Pi Local Deployment Guide (with skill install example)](/en/blog/openclaw-raspberry-pi-local-ai-agent-guide)
