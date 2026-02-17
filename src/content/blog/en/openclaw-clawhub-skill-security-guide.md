---
title: "OpenClaw ClawHub Security Guide: Identifying and Defending Against Malicious Skills"
description: "230+ malicious skills found on ClawHub involving credential theft and supply chain attacks. This guide breaks down the risks and provides actionable allowlist configs, audit methods, and upgrade steps."
pubDate: 2026-02-17
tags: ["openclaw", "security", "clawhub", "skills", "supply-chain"]
category: "guide"
lang: "en"
---

In February 2026, the OpenClaw ecosystem faced a serious security test: researchers discovered **230 to 341 malicious skills** on ClawHub (OpenClaw's official skill marketplace), involving credential theft, cryptocurrency wallet stealing, and malware deployment on macOS and Windows. Multiple security firms (Bitdefender, Cisco, NordVPN) published technical reports, and independent research on Reddit scanned approximately 18,000 exposed OpenClaw instances.

This isn't about panic — it's about taking concrete action. The good news: the defenses are already available if you configure them.

## What Happened

### Attack Vectors

Malicious skills operate through three primary attack patterns:

1. **Credential theft**: Embedded scripts read environment variables (API keys, tokens) or browser credential files, then exfiltrate silently
2. **Prompt injection**: Hidden instructions in SKILL.md that manipulate the agent into performing unintended actions (sending emails, accessing internal URLs)
3. **Malware delivery**: Install scripts download and execute Atomic Stealer (macOS) or similar payloads

### Who's Behind It

Bitdefender's report showed attackers using automated scripts to submit new malicious skills every few minutes, using **typosquatting** (similar-looking usernames) to impersonate trusted publishers. Some accounts were compromised legitimate GitHub accounts.

### Official Response

OpenClaw has partnered with VirusTotal to automatically scan skills uploaded to ClawHub:
- ✅ "Benign" verdict → Auto-approved
- ⚠️ "Suspicious" verdict → Warning displayed
- 🚫 "Malicious" verdict → Download blocked

Additionally, v2026.2.12 includes 40+ security patches (see below).

## What You Should Do Now

### Step 1: Upgrade to v2026.2.12+

This version is the security watershed. Key fixes include:

- **SSRF protection**: Gateway and OpenResponses default to deny policies with hostname allowlists
- **Browser control mandatory auth**: Blocks unauthorized loopback RCE
- **Prompt injection mitigation**: Browser and web tool outputs auto-tagged as untrusted and sanitized
- **Webhook security**: Constant-time secret checks + rate limiting

How to upgrade:

```bash
# Standard install
openclaw update

# Docker
docker pull openclaw/openclaw:latest
docker restart openclaw-2026
```

### Step 2: Enable the Skill Allowlist

This is **the single most important defense**. In `openclaw.json`:

```json
{
  "plugins": {
    "allow": [
      "github",
      "weather",
      "gog",
      "himalaya"
    ]
  }
}
```

Only allowlisted skills will be loaded. **If you don't use a skill, don't allow it.**

### Step 3: Audit Installed Skills

```bash
# List all installed skills
ls ~/.openclaw/skills/

# Inspect each skill's SKILL.md and scripts
# Watch for:
# - curl/wget external requests
# - Reading ~/.ssh, ~/.aws, or environment variables
# - Suspicious downloads in install.sh
```

If you've installed unfamiliar skills from ClawHub, **remove them immediately and rotate your API keys**.

### Step 4: Configure URL Allowlists

v2026.2.12 added URL allowlist functionality to prevent agents from being tricked into accessing internal addresses:

```json
{
  "files": {
    "urlAllowlist": ["https://*.github.com", "https://*.googleapis.com"]
  },
  "images": {
    "urlAllowlist": ["https://*.githubusercontent.com"]
  }
}
```

### Step 5: Run Regular Security Checks

Run this weekly:

```bash
openclaw doctor security
```

Key checks:
- Whether ports 18789/18790 are exposed to the public internet
- Whether `plugins.allow` is configured
- Whether gateway auth tokens are enabled
- Whether audit logs are active

## How to Tell if a Skill Is Safe

| Signal | Safe ✅ | Suspicious ⚠️ |
|--------|---------|---------------|
| Source | Official built-in or well-known developer | New account, no history |
| Code | Pure SKILL.md + simple CLI calls | Contains install scripts, binaries |
| Permissions | Read-only files, network queries | Requires exec, file write, credential access |
| History | Stable version history | Sudden large code changes |

**Rule of thumb**: If a skill requests permissions beyond its stated function, don't install it.

## For Skill Developers

If you're developing and publishing skills to ClawHub:

1. **Least privilege**: Only request necessary permissions
2. **Transparent code**: No obfuscated scripts; keep everything auditable
3. **Signed publishing**: Use your long-term GitHub account with consistent history
4. **Clear documentation**: Explain in SKILL.md what the skill executes and what data it accesses

## Summary

ClawHub's security issues reflect a broader pattern in the AI agent ecosystem — when agents have execution capabilities, supply chain security becomes critical. The OpenClaw team has responded quickly (VirusTotal integration, v2026.2.12 patches), but the final line of defense is in your hands:

1. **Upgrade** → v2026.2.12+
2. **Allowlist** → `plugins.allow` with only what you use
3. **Audit** → Check installed skill code
4. **Minimize exposure** → Don't expose ports to the public internet
5. **Rotate credentials** → If you ever installed suspicious skills

Security isn't a one-time configuration — it's an ongoing habit.

---

📎 **Related reading**:
- [OpenClaw Install & First-Run Error Troubleshooting](/en/blog/openclaw-install-first-run-error-troubleshooting)
- [OpenClaw VPS Deployment Complete Guide](/en/blog/openclaw-vps-deployment-complete-guide)
- [OpenClaw Model Fallback Strategy](/en/blog/openclaw-model-fallback-strategy)
