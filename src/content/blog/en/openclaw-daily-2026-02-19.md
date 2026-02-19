---
title: "OpenClaw Daily: Practical Agent Automation Tips (2026-02-19)"
description: "Daily practical tips for running OpenClaw agents, channels, and model fallbacks efficiently."
pubDate: 2026-02-19
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
│ Git             │ main · @ dec68597                                                                                 │
│ Update          │ available · git main · ↔ origin/main · dirty · behind 68 · fetch failed · npm update 2026.2.17 ·  │
│                 │ deps ok                                                                                           │
│ Gateway         │ local · ws://127.0.0.1:18789 (local loopback) · reachable 48ms · auth token · duoglas-VMware-     │
│                 │ Virtual-Platform (192.168.136.128) app unknown linux 6.14.0-37-generic                            │
│ Gateway service │ systemd installed · enabled · running (pid 1468721, state active)                                 │
│ Node service    │ systemd not installed                                                                             │
│ Agents          │ 1 · no bootstraps · sessions 13 · default main active just now                                    │
│ Memory          │ 0 files · 0 chunks · dirty · sources memory · plugin memory-core · vector ready · fts ready ·     │
│                 │ cache on (0)                                                                                      │
│ Probes          │ enabled                                                                                           │
│ Events          │ none                                                                                              │
│ Heartbeat       │ 1h (main)                                                                                         │
│ Last heartbeat  │ ok-token · 14m ago ago · unknown                                                                  │
│ Sessions        │ 13 active · default claude-opus-4-6 (200k ctx) · ~/.openclaw/agents/main/sessions/sessions.json   │
└─────────────────┴───────────────────────────────────────────────────────────────────────────────────────────────────┘

Security audit
Summary: 0 critical · 2 warn · 1 info
  WARN Reverse proxy headers are not trusted
    gateway.bind is loopback and gateway.trustedProxies is empty. If you expose the Control UI through a reverse proxy, configure trusted proxies so local-client c…
    Fix: Set gateway.trustedProxies to your proxy IPs or keep the Control UI local-only.
  WARN Extension plugin tools may be reachable under permissive tool policy
    Enabled extension plugins: qqbot, wecom. Permissive tool policy contexts: - default
    Fix: Use restrictive profiles (`minimal`/`coding`) or explicit tool allowlists that exclude plugin tools for agents handling untrusted input.
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
┌───────────────────────────────────────────────────────────┬────────┬──────────┬─────────────────┬───────────────────┐
│ Key                                                       │ Kind   │ Age      │ Model           │ Tokens            │
├───────────────────────────────────────────────────────────┼────────┼──────────┼─────────────────┼───────────────────┤
│ agent:main:cron:6c56f30e-31bf-4…                          │ direct │ just now │ claude-opus-4-6 │ unknown/200k (?%) │
│ agent:main:cron:6c56f30e-31bf-4…                          │ direct │ just now │ claude-opus-4-6 │ unknown/200k (?%) │
│ agent:main:main                                           │ direct │ 14m ago  │ claude-opus-4-6 │ 21k/200k (10%)    │
│ agent:main:cron:fdc137d1-c50d-4…                          │ direct │ 1h ago   │ claude-opus-4-6 │ 25k/200k (12%)    │
│ agent:main:cron:fdc137d1-c50d-4…                          │ direct │ 1h ago   │ claude-opus-4-6 │ 25k/200k (12%)    │
│ agent:main:cron:413049b3-4e80-4…                          │ direct │ 23h ago  │ claude-opus-4-6 │ 31k/200k (15%)    │
│ agent:main:cron:413049b3-4e80-4…                          │ direct │ 23h ago  │ claude-opus-4-6 │ 31k/200k (15%)    │
│ agent:main:cron:6c56f30e-31bf-4…                          │ direct │ 24h ago  │ claude-opus-4-6 │ 18k/200k (9%)     │
│ agent:main:cron:fca49f61-c345-4…                          │ direct │ 47h ago  │ claude-opus-4-6 │ 45k/200k (23%)    │
│ agent:main:cron:f06c70da-2bdc-4…                          │ direct │ 2d ago   │ claude-opus-4-6 │ 17k/200k (8%)     │
└───────────────────────────────────────────────────────────┴────────┴──────────┴─────────────────┴───────────────────┘

Health
┌──────────┬───────────┬──────────────────────────────────────────────────────────────────────────────────────────────┐
│ Item     │ Status    │ Detail                                                                                       │
├──────────┼───────────┼──────────────────────────────────────────────────────────────────────────────────────────────┤
│ Gateway  │ reachable │ 3962ms                                                                                       │
│ Telegram │ OK        │ ok (@djclawd_bot:default:2914ms)                                                             │
│ Slack    │ OK        │ ok (default:default:1046ms)                                                                  │
│ QQ Bot   │ OK        │ configured                                                                                   │
│ WeCom    │ OK        │ ok (default:default:ok)                                                                      │
└──────────┴───────────┴──────────────────────────────────────────────────────────────────────────────────────────────┘

FAQ: https://docs.openclaw.ai/faq
Troubleshooting: https://docs.openclaw.ai/troubleshooting

Update available (git behind 68 · npm 2026.2.17). Run: openclaw update

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
Summary: 2 critical · 3 warn · 1 info
Run deeper: openclaw security audit --deep

CRITICAL
plugins.code_safety Plugin "qqbot" contains dangerous code patterns
  Found 1 critical issue(s) in 47 scanned file(s):
  - [dangerous-exec] Shell command execution detected (child_process) (bin/qqbot-cli.js:109)
  Fix: Review the plugin source code carefully before use. If untrusted, remove the plugin from your OpenClaw extensions state directory.
plugins.code_safety Plugin "wecom-app" contains dangerous code patterns
  Found 2 critical issue(s) in 2 scanned file(s):
  - [dangerous-exec] Shell command execution detected (child_process) (dist/index.js:5668)
  - [env-harvesting] Environment variable access combined with network send — possible credential harvesting (dist/index.js:4205)
  Fix: Review the plugin source code carefully before use. If untrusted, remove the plugin from your OpenClaw extensions state directory.

WARN
gateway.trusted_proxies_missing Reverse proxy headers are not trusted
  gateway.bind is loopback and gateway.trustedProxies is empty. If you expose the Control UI through a reverse proxy, configure trusted proxies so local-client checks cannot be spoofed.
  Fix: Set gateway.trustedProxies to your proxy IPs or keep the Control UI local-only.
plugins.tools_reachable_permissive_policy Extension plugin tools may be reachable under permissive tool policy
  Enabled extension plugins: qqbot, wecom.
Permissive tool policy contexts:
- default
  Fix: Use restrictive profiles (`minimal`/`coding`) or explicit tool allowlists that exclude plugin tools for agents handling untrusted input.
plugins.code_safety Plugin "wecom" contains suspicious code patterns
  Found 2 warning(s) in 47 scanned file(s):
  - [potential-exfiltration] File read combined with network send — possible data exfiltration (src/monitor.ts:377)
  - [potential-exfiltration] File read combined with network send — possible data exfiltration (src/outbound.ts:141)
  Fix: Review the flagged code to ensure it is intentional and safe.

INFO
summary.attack_surface Attack surface summary
  groups: open=0, allowlist=3
tools.elevated: enabled
hooks.webhooks: disabled
hooks.internal: disabled
browser control: enabled weekly.

---

More guides at OpenClaw Hub.
