---
title: "OpenClaw Security Hardening Guide: Protect Your AI Agent in 2026"
description: "40,000+ OpenClaw instances are exposed online. Learn how to secure your deployment with authentication, firewall rules, plugin allowlists, and best practices — based on real security research from CrowdStrike and SecurityScorecard."
pubDate: 2026-02-19
tags: ["openclaw", "security", "hardening", "guide"]
category: "guide"
lang: "en"
---

## Why This Matters Now

In the past week, multiple security reports have put OpenClaw deployments under the spotlight:

- **CrowdStrike** published "[What Security Teams Need to Know About OpenClaw](https://www.crowdstrike.com/en-us/blog/what-security-teams-need-to-know-about-openclaw-ai-super-agent/)", highlighting prompt injection and data leak risks.
- **SecurityScorecard** found **40,000+ exposed OpenClaw instances** on the public internet ([Infosecurity Magazine](https://www.infosecurity-magazine.com/news/researchers-40000-exposed-openclaw/)).
- **WIRED** reported that Meta and other tech firms have restricted OpenClaw usage internally due to security fears.
- **Fortune** detailed permission misconfiguration risks that could give agents more authority than intended.

If you self-host OpenClaw, this guide is for you.

## The Core Risks

| Risk | What Happens |
|------|-------------|
| **Exposed gateway** | Anyone on the internet can talk to your agent |
| **No auth / weak auth** | Attackers send commands, exfiltrate API keys |
| **Overly broad plugin permissions** | Agent can access tools it shouldn't |
| **Prompt injection** | Malicious input tricks agent into leaking data |
| **Stale versions** | Known bugs (e.g., `device token mismatch` in v2026.2.15) go unpatched |

## Step-by-Step Hardening

### 1. Never Expose the Gateway to the Internet

OpenClaw's gateway should **only** listen on `localhost` or a private network.

```bash
# Check what's listening
ss -tlnp | grep 18789
```

If you need remote access, use an SSH tunnel or VPN — never open port 18789 to the world.

In `openclaw.json`, ensure:
```json
{
  "gateway": {
    "host": "127.0.0.1"
  }
}
```

### 2. Enable Firewall Rules

```bash
# UFW example
sudo ufw default deny incoming
sudo ufw allow ssh
sudo ufw enable

# Verify OpenClaw port is NOT open
sudo ufw status | grep 18789
```

### 3. Use Plugin Allowlists

The `plugins.allow` configuration restricts which plugins (channels, tools) can run. This is critical — an unrestricted agent can access anything.

```json
{
  "plugins": {
    "allow": ["telegram", "exec", "browser"]
  }
}
```

Only list what you actually use. Review periodically.

### 4. Restrict Exec and File Access

The `exec` tool is powerful. Consider:
- Setting `security: "allowlist"` for exec policies
- Using workspace boundaries to limit file access
- Avoiding `elevated: true` unless absolutely necessary

### 5. Keep OpenClaw Updated

Recent issues on GitHub show real bugs:
- **v2026.2.15**: `device token mismatch` auth error ([#18590](https://github.com/openclaw/openclaw/issues/18590))
- **v2026.2.12**: Deprecated config keys cause silent failures ([#19992](https://github.com/openclaw/openclaw/issues/19992))
- **Reasoning item bug**: 400 errors with `rs_[...]` items ([#17019](https://github.com/openclaw/openclaw/issues/17019))

```bash
openclaw update
openclaw doctor  # Check for config issues
```

### 6. Audit Your Configuration

Run `openclaw doctor` after every update. The recent [#19992](https://github.com/openclaw/openclaw/issues/19992) feature request suggests auto-running this before restarts — until that ships, do it manually.

### 7. Review Agent Permissions

Your `AGENTS.md` and workspace files define what the agent can do. Ensure:
- External actions (email, messaging) require confirmation
- Destructive commands need approval
- Sensitive data paths are excluded

## For Cloud Deployments (Kimi Claw, VPS)

If you use **Kimi Claw** (Moonshot AI's hosted OpenClaw) or a VPS:

- Kimi Claw handles infrastructure security, but you still control skill permissions and data access
- On VPS: all the above applies, plus standard server hardening (SSH keys, fail2ban, unattended-upgrades)
- See our [VPS Deployment Guide](/en/blog/openclaw-vps-deployment-complete-guide) for setup details

## Quick Checklist

- [ ] Gateway bound to `127.0.0.1` only
- [ ] Firewall enabled, port 18789 not exposed
- [ ] `plugins.allow` whitelist configured
- [ ] Exec security set to `allowlist`
- [ ] Running latest stable version
- [ ] `openclaw doctor` passes clean
- [ ] Agent workspace has clear permission boundaries
- [ ] SSH access uses keys (no password auth)

## Further Reading

- [CVE-2026-25253 Deep Dive](/en/blog/openclaw-cve-2026-25253-one-click-rce-explained) — One-click RCE vulnerability explained
- [What is OpenClaw?](/en/blog/what-is-openclaw) — Platform overview
- [VPS Deployment Guide](/en/blog/openclaw-vps-deployment-complete-guide) — Setup from scratch
- [OpenClaw Official Docs](https://docs.openclaw.ai) — Configuration reference
- [CrowdStrike Report](https://www.crowdstrike.com/en-us/blog/what-security-teams-need-to-know-about-openclaw-ai-super-agent/) — Security analysis

---

*Stay safe out there. An AI agent with access to your life deserves the same security attention as any server you'd put on the internet.*
