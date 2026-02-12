---
title: "OpenClaw Daily: Practical Agent Automation Tips (2026-02-12)"
description: "Daily practical tips for running OpenClaw agents, channels, and model fallbacks efficiently."
pubDate: 2026-02-12
tags: ["openclaw", "daily", "automation"]
category: "guide"
lang: "en"
---

## Today's OpenClaw Focus

### 1) Keep channel reliability high
- Verify channel status with OpenClaw status

Overview
┌─────────────────┬───────────────────────────────────────────────────────────────────────────────────────────────────┐
│ Item            │ Value                                                                                             │
├─────────────────┼───────────────────────────────────────────────────────────────────────────────────────────────────┤
│ Dashboard       │ http://127.0.0.1:18789/                                                                           │
│ OS              │ linux 6.14.0-37-generic (x64) · node 25.5.0                                                       │
│ Tailscale       │ off                                                                                               │
│ Channel         │ dev (main)                                                                                        │
│ Git             │ main · @ e7f0769c                                                                                 │
│ Update          │ available · git main · ↔ origin/main · behind 16 · fetch failed · npm latest 2026.2.9 · deps ok   │
│ Gateway         │ local · ws://127.0.0.1:18789 (local loopback) · reachable 54ms · auth token · duoglas-VMware-     │
│                 │ Virtual-Platform (192.168.136.128) app unknown linux 6.14.0-37-generic                            │
│ Gateway service │ systemd installed · enabled · running (pid 703849, state active)                                  │
│ Node service    │ systemd not installed                                                                             │
│ Agents          │ 1 · no bootstraps · sessions 8 · default main active just now                                     │
│ Memory          │ 0 files · 0 chunks · dirty · sources memory · plugin memory-core · vector ready · fts ready ·     │
│                 │ cache on (0)                                                                                      │
│ Probes          │ enabled                                                                                           │
│ Events          │ none                                                                                              │
│ Heartbeat       │ 1h (main)                                                                                         │
│ Last heartbeat  │ ok-token · 14m ago ago · unknown                                                                  │
│ Sessions        │ 8 active · default claude-opus-4-6 (200k ctx) · ~/.openclaw/agents/main/sessions/sessions.json    │
└─────────────────┴───────────────────────────────────────────────────────────────────────────────────────────────────┘

Security audit
Summary: 0 critical · 1 warn · 1 info
  WARN Reverse proxy headers are not trusted
    gateway.bind is loopback and gateway.trustedProxies is empty. If you expose the Control UI through a reverse proxy, configure trusted proxies so local-client c…
    Fix: Set gateway.trustedProxies to your proxy IPs or keep the Control UI local-only.
Full report: openclaw security audit
Deep probe: openclaw security audit --deep

Channels
┌──────────┬─────────┬────────┬───────────────────────────────────────────────────────────────────────────────────────┐
│ Channel  │ Enabled │ State  │ Detail                                                                                │
├──────────┼─────────┼────────┼───────────────────────────────────────────────────────────────────────────────────────┤
│ Telegram │ ON      │ OK     │ token config (8594…p4NU · len 46) · accounts 1/1                                      │
│ Slack    │ ON      │ OK     │ tokens ok (bot config, app config) (bot xoxb…AziC · len 59, app xapp…b857 · len 98)   │
│          │         │        │ · accounts 1/1                                                                        │
│ QQ Bot   │ ON      │ OK     │ configured                                                                            │
│ WeCom    │ ON      │ OK     │ configured                                                                            │
└──────────┴─────────┴────────┴───────────────────────────────────────────────────────────────────────────────────────┘

Sessions
┌────────────────────────────────────────────────────────────┬────────┬──────────┬─────────────────┬──────────────────┐
│ Key                                                        │ Kind   │ Age      │ Model           │ Tokens           │
├────────────────────────────────────────────────────────────┼────────┼──────────┼─────────────────┼──────────────────┤
│ agent:main:cron:6c56f30e-31bf-4…                           │ direct │ just now │ claude-opus-4-6 │ 0.0k/200k (0%)   │
│ agent:main:cron:6c56f30e-31bf-4…                           │ direct │ just now │ claude-opus-4-6 │ 0.0k/200k (0%)   │
│ agent:main:main                                            │ direct │ 14m ago  │ claude-opus-4-6 │ 20k/200k (10%)   │
│ agent:main:cron:fdc137d1-c50d-4…                           │ direct │ 1h ago   │ claude-opus-4-6 │ 200k/200k (100%) │
│ agent:main:cron:fdc137d1-c50d-4…                           │ direct │ 1h ago   │ claude-opus-4-6 │ 200k/200k (100%) │
│ agent:main:cron:6c56f30e-31bf-4…                           │ direct │ 24h ago  │ claude-opus-4-6 │ 119k/200k (60%)  │
│ agent:main:subagent:63fd7e14-61…                           │ direct │ 43h ago  │ gpt-5.3-codex   │ 6.1k/272k (2%)   │
│ agent:main:wecom:group:wr071dya…                           │ group  │ 7d ago   │ MiniMax-M2.1    │ 13k/200k (7%)    │
└────────────────────────────────────────────────────────────┴────────┴──────────┴─────────────────┴──────────────────┘

Health
┌──────────┬───────────┬──────────────────────────────────────────────────────────────────────────────────────────────┐
│ Item     │ Status    │ Detail                                                                                       │
├──────────┼───────────┼──────────────────────────────────────────────────────────────────────────────────────────────┤
│ Gateway  │ reachable │ 4986ms                                                                                       │
│ Telegram │ OK        │ ok (@djclawd_bot:default:3512ms)                                                             │
│ Slack    │ OK        │ ok (default:default:1474ms)                                                                  │
│ QQ Bot   │ OK        │ configured                                                                                   │
│ WeCom    │ OK        │ ok (default:default:ok)                                                                      │
└──────────┴───────────┴──────────────────────────────────────────────────────────────────────────────────────────────┘

FAQ: https://docs.openclaw.ai/faq
Troubleshooting: https://docs.openclaw.ai/troubleshooting

Update available (git behind 16). Run: openclaw update

Next steps:
  Need to share?      openclaw status --all
  Need to debug live? openclaw logs --follow
  Need to test channels? openclaw status --deep.

### 2) Use model fallbacks by provider
- Avoid same-provider consecutive fallbacks during rate limits.

### 3) Keep context healthy
- Prefer short-turn prompts and periodic compaction.

### 4) Security quick check
- Run OpenClaw security audit
Summary: 2 critical · 2 warn · 1 info
Run deeper: openclaw security audit --deep

CRITICAL
plugins.code_safety Plugin "qqbot" contains dangerous code patterns
  Found 1 critical issue(s) in 47 scanned file(s):
  - [dangerous-exec] Shell command execution detected (child_process) (bin/qqbot-cli.js:109)
  Fix: Review the plugin source code carefully before use. If untrusted, remove the plugin from your OpenClaw extensions state directory.
plugins.code_safety Plugin "wecom-app" contains dangerous code patterns
  Found 2 critical issue(s) in 2 scanned file(s):
  - [dangerous-exec] Shell command execution detected (child_process) (dist/index.js:5648)
  - [env-harvesting] Environment variable access combined with network send — possible credential harvesting (dist/index.js:4202)
  Fix: Review the plugin source code carefully before use. If untrusted, remove the plugin from your OpenClaw extensions state directory.

WARN
gateway.trusted_proxies_missing Reverse proxy headers are not trusted
  gateway.bind is loopback and gateway.trustedProxies is empty. If you expose the Control UI through a reverse proxy, configure trusted proxies so local-client checks cannot be spoofed.
  Fix: Set gateway.trustedProxies to your proxy IPs or keep the Control UI local-only.
plugins.code_safety Plugin "wecom" contains suspicious code patterns
  Found 2 warning(s) in 47 scanned file(s):
  - [potential-exfiltration] File read combined with network send — possible data exfiltration (src/monitor.ts:377)
  - [potential-exfiltration] File read combined with network send — possible data exfiltration (src/outbound.ts:141)
  Fix: Review the flagged code to ensure it is intentional and safe.

INFO
summary.attack_surface Attack surface summary
  groups: open=0, allowlist=3
tools.elevated: enabled
hooks: disabled
browser control: enabled weekly.

---

More guides at OpenClaw Hub.
