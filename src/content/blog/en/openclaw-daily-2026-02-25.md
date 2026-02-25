---
title: "OpenClaw Daily: Practical Agent Automation Tips (2026-02-25)"
description: "Daily practical tips for running OpenClaw agents, channels, and model fallbacks efficiently."
pubDate: 2026-02-25
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
│ OS              │ linux 6.17.0-14-generic (x64) · node 25.5.0                                                       │
│ Tailscale       │ off                                                                                               │
│ Channel         │ stable (v2026.2.23)                                                                               │
│ Git             │ main · tag v2026.2.23 · @ b8176005                                                                │
│ Update          │ git main · ↔ origin/main · up to date · fetch failed · npm latest 2026.2.23 · deps ok             │
│ Gateway         │ local · ws://127.0.0.1:18789 (local loopback) · reachable 21ms · auth token · duoglas-VMware-     │
│                 │ Virtual-Platform (192.168.136.128) app 2026.2.2-3 linux 6.17.0-14-generic                         │
│ Gateway service │ systemd installed · enabled · running (pid 5877, state active)                                    │
│ Node service    │ systemd not installed                                                                             │
│ Agents          │ 1 · no bootstrap files · sessions 14 · default main active 1m ago                                 │
│ Memory          │ 0 files · 0 chunks · dirty · sources memory · plugin memory-core · vector ready · fts ready ·     │
│                 │ cache on (0)                                                                                      │
│ Probes          │ enabled                                                                                           │
│ Events          │ none                                                                                              │
│ Heartbeat       │ 1h (main)                                                                                         │
│ Last heartbeat  │ ok-token · 26m ago ago · telegram                                                                 │
│ Sessions        │ 14 active · default claude-opus-4-6 (200k ctx) · ~/.openclaw/agents/main/sessions/sessions.json   │
└─────────────────┴───────────────────────────────────────────────────────────────────────────────────────────────────┘

Security audit
Summary: 0 critical · 4 warn · 1 info
  WARN Reverse proxy headers are not trusted
    gateway.bind is loopback and gateway.trustedProxies is empty. If you expose the Control UI through a reverse proxy, configure trusted proxies so local-client c…
    Fix: Set gateway.trustedProxies to your proxy IPs or keep the Control UI local-only.
  WARN Extension plugin tools may be reachable under permissive tool policy
    Enabled extension plugins: qqbot, wecom. Permissive tool policy contexts: - default
    Fix: Use restrictive profiles (`minimal`/`coding`) or explicit tool allowlists that exclude plugin tools for agents handling untrusted input.
  WARN Plugin installs include unpinned npm specs
    Unpinned plugin install records: - wecom-app (@openclaw-china/wecom-app) - wecom (@yanhaidao/wecom)
    Fix: Pin install specs to exact versions (for example, `@scope/pkg@1.2.3`) for higher supply-chain stability.
  WARN Plugin installs are missing integrity metadata
    Plugin install records missing integrity: - wecom-app - wecom - qqbot
    Fix: Reinstall or update plugins to refresh install metadata with resolved integrity hashes.
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
┌─────────────────────────────────────────────┬────────┬─────────┬─────────────────┬──────────────────────────────────┐
│ Key                                         │ Kind   │ Age     │ Model           │ Tokens                           │
├─────────────────────────────────────────────┼────────┼─────────┼─────────────────┼──────────────────────────────────┤
│ agent:main:cron:6c56f30e-31bf-4…            │ direct │ 1m ago  │ claude-opus-4-6 │ 11k/200k (6%) · 🗄️ 183% cached   │
│ agent:main:cron:6c56f30e-31bf-4…            │ direct │ 1m ago  │ claude-opus-4-6 │ 11k/200k (6%) · 🗄️ 183% cached   │
│ agent:main:main                             │ direct │ 26m ago │ gpt-5.3-codex   │ 17k/272k (6%) · 🗄️ 97% cached    │
│ agent:main:cron:fdc137d1-c50d-4…            │ direct │ 1h ago  │ gpt-5.3-codex   │ 23k/272k (8%) · 🗄️ 745% cached   │
│ agent:main:cron:fdc137d1-c50d-4…            │ direct │ 1h ago  │ gpt-5.3-codex   │ 23k/272k (8%) · 🗄️ 745% cached   │
│ agent:main:cron:fca49f61-c345-4…            │ direct │ 23h ago │ claude-opus-4-6 │ 37k/200k (18%) · 🗄️ 1396% cached │
│ agent:main:cron:fca49f61-c345-4…            │ direct │ 23h ago │ claude-opus-4-6 │ 37k/200k (18%) · 🗄️ 1396% cached │
│ agent:main:cron:413049b3-4e80-4…            │ direct │ 23h ago │ claude-opus-4-6 │ 20k/200k (10%) · 🗄️ 857% cached  │
│ agent:main:cron:413049b3-4e80-4…            │ direct │ 23h ago │ claude-opus-4-6 │ 20k/200k (10%) · 🗄️ 857% cached  │
│ agent:main:cron:6c56f30e-31bf-4…            │ direct │ 24h ago │ claude-opus-4-6 │ 11k/200k (6%) · 🗄️ 183% cached   │
└─────────────────────────────────────────────┴────────┴─────────┴─────────────────┴──────────────────────────────────┘

Health
┌──────────┬───────────┬──────────────────────────────────────────────────────────────────────────────────────────────┐
│ Item     │ Status    │ Detail                                                                                       │
├──────────┼───────────┼──────────────────────────────────────────────────────────────────────────────────────────────┤
│ Gateway  │ reachable │ 3742ms                                                                                       │
│ Telegram │ OK        │ ok (@djclawd_bot:default:2664ms)                                                             │
│ Slack    │ OK        │ ok (default:default:1078ms)                                                                  │
│ QQ Bot   │ OK        │ configured                                                                                   │
│ WeCom    │ OK        │ ok (default:default:ok)                                                                      │
└──────────┴───────────┴──────────────────────────────────────────────────────────────────────────────────────────────┘

FAQ: https://docs.openclaw.ai/faq
Troubleshooting: https://docs.openclaw.ai/troubleshooting

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
Summary: 2 critical · 5 warn · 1 info
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
plugins.installs_unpinned_npm_specs Plugin installs include unpinned npm specs
  Unpinned plugin install records:
- wecom-app (@openclaw-china/wecom-app)
- wecom (@yanhaidao/wecom)
  Fix: Pin install specs to exact versions (for example, `@scope/pkg@1.2.3`) for higher supply-chain stability.
plugins.installs_missing_integrity Plugin installs are missing integrity metadata
  Plugin install records missing integrity:
- wecom-app
- wecom
- qqbot
  Fix: Reinstall or update plugins to refresh install metadata with resolved integrity hashes.
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
