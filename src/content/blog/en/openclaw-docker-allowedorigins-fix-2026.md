---
title: "OpenClaw Docker Startup Failure: Root Cause and Fix for non-loopback Control UI / allowedOrigins (2026)"
description: "Based on recent GitHub issues and release changes, this guide explains why OpenClaw fails to start with allowedOrigins errors in Docker/remote setups, and how to fix it safely."
pubDate: 2026-02-26
tags: ["openclaw", "docker", "gateway", "troubleshooting", "security"]
category: "guide"
lang: "en"
---

If your Docker or remote OpenClaw deployment fails with:

```text
Gateway failed to start: Error: non-loopback Control UI requires gateway.controlUi.allowedOrigins ...
```

here is the short answer: **your container is usually fine; Gateway is rejecting an unsafe remote-control surface configuration.**

This article gives a practical path: recover service first, then keep it secure.

## Why this error appears more often now

Signals from the last 7 days:

- GitHub Issue #25009 (2026-02-24) reports this exact startup failure in Docker.
- Release v2026.2.22 (2026-02-23) includes extensive Gateway/Auth/Security tightening.

So the pattern is clear: defaults are getting safer, while many older setup guides still reflect looser assumptions.

## What is actually misconfigured

The conflict is simple:

- Gateway is bound to a non-loopback address (for example `0.0.0.0` or LAN IP),
- but Control UI origins are not explicitly allowed (`allowedOrigins`) and/or auth policy is incomplete.

OpenClaw blocks startup to prevent accidental exposure.

## 5-minute fix path (recommended order)

### Path A: Local-only admin access (most stable)

Bind Gateway to loopback:

```bash
openclaw config set gateway.bind "127.0.0.1"
openclaw gateway restart
openclaw gateway status
```

Best for single-host setups, SSH tunnel workflows, and quick recovery.

---

### Path B: You need remote Control UI access

Do both:

1. Define explicit allowed origins (`allowedOrigins`)
2. Keep authentication enabled (token/password/device auth at minimum)

In Docker, make sure you edit the config file actually mounted into the running gateway container.

> Treat dangerous fallback options as emergency-only, not steady-state architecture.

---

### Path C: Suspect a package regression, not config

Another recent failure pattern is package-level breakage in `v2026.2.21-2` (Issue #22841), with `SyntaxError ... timeoutSeconds` at gateway boot.

If you see parse errors, do this first:

1. Check version
2. Upgrade to a fixed release (`v2026.2.22+`)
3. Then continue config diagnostics

Do not spend hours tuning config on a broken build.

## Post-fix verification checklist

```bash
openclaw gateway status --deep
openclaw status
openclaw doctor
```

Confirm at least:

- Runtime is `running`
- Control UI is reachable only from intended origins
- No unauthenticated remote exposure warning remains

## Deployment takeaway: move from “it runs” to “it survives”

For VPS/Docker production-ish usage, standardize three things:

1. Explicit Gateway policy (bind + auth + allowedOrigins)
2. Upgrade discipline (read release notes before rollout)
3. A rollback path for bad versions

That is the difference between 10-minute incident recovery and half-day guesswork.

## Sources (verifiable)

- Issue #25009  
  https://github.com/openclaw/openclaw/issues/25009
- Issue #22841  
  https://github.com/openclaw/openclaw/issues/22841
- Release v2026.2.22  
  https://github.com/openclaw/openclaw/releases/tag/v2026.2.22
- Docker docs  
  https://docs.openclaw.ai/install/docker

## Related guides

- [OpenClaw Gateway Start Failed? 2026 Fix Checklist](/en/blog/openclaw-gateway-start-failed-fix-checklist-2026/)
- [OpenClaw Logs Debug Guide: From Error to Root Cause](/en/blog/openclaw-logs-debug-guide/)
- [OpenClaw VPS Deployment Complete Guide](/en/blog/openclaw-vps-deployment-complete-guide/)
