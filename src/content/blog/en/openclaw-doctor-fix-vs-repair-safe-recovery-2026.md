---
title: "OpenClaw `doctor --fix` vs `--repair`: Safe Recovery Guide (2026, With Rollback Mindset)"
description: "Running `openclaw doctor --fix --force` blindly can overwrite custom service config. This guide explains `--fix`/`--repair`/`--force` differences and gives a copy-paste safe recovery workflow."
pubDate: 2026-03-07
tags: ["openclaw", "doctor", "repair", "fix", "troubleshooting", "gateway"]
category: "tutorial"
lang: "en"
---

When OpenClaw breaks, many users jump straight to:

```bash
openclaw doctor --fix --force
```

That can recover a broken service — but `--force` may also overwrite custom service config.

This guide focuses on one goal: **recover safely first, escalate only when necessary**.

> Command semantics in this article are verifiable from local CLI help output (`openclaw doctor --help`, OpenClaw 2026.3.3).

## One-line takeaway

- `--fix` and `--repair` are equivalent (`--fix` is an alias)
- `--repair` is the default safe recovery path
- `--force` is for confirmed, last-mile service repair only

---

## 1) Confirm flag semantics in 30 seconds

```bash
openclaw doctor --help
```

You should see these key lines:

- `--fix`: Apply recommended repairs (alias for --repair)
- `--repair`: Apply recommended repairs without prompting
- `--force`: Apply aggressive repairs (overwrites custom service config)

This is the decision boundary for whether you should use `--force`.

---

## 2) Safe recovery flow (copy/paste)

### Step 1: Capture baseline evidence first

```bash
openclaw status --all
openclaw gateway status --deep
openclaw logs --follow
```

Save key error lines before changing anything.

### Step 2: Start with conservative repair

```bash
openclaw doctor --repair
```

For non-interactive environments (CI/remote automation):

```bash
openclaw doctor --repair --non-interactive --yes
```

### Step 3: Re-validate service + channel health

```bash
openclaw gateway status --deep
openclaw channels status --probe
openclaw status --deep --timeout 10000
```

Decision:
- Gateway healthy + target channel probe passes: stop here
- Still broken: proceed to Step 4 only if justified

### Step 4: Use `--force` only when overwrite-level repair is justified

```bash
openclaw doctor --repair --force
```

Before running this, confirm:
- you understand overwrite risk
- you have a rollback path (service/config snapshot)

---

## 3) FAQ

### Q1: Is `--fix` stronger than `--repair`?
No. `--fix` is an alias for `--repair`.

### Q2: Should I include `--force` by default?
No. Use conservative repair first; escalate only when repeated failures indicate service-level config corruption or mismatch.

### Q3: How do I know the issue is channel/model layer, not doctor-level?
- Channel path: `openclaw channels status --probe`
- Model/API path: `openclaw logs --follow` (timeouts, quota, auth errors)

---

## 4) Verifiable done checklist

- [ ] `openclaw doctor --help` confirms `--fix` = `--repair`
- [ ] `openclaw doctor --repair` completed before any `--force`
- [ ] `openclaw gateway status --deep` reports healthy runtime
- [ ] `openclaw channels status --probe` passes for target channel
- [ ] `openclaw logs --follow` shows a full inbound → response path for a test message

---

## 5) Shareable minimum debug pack

```bash
openclaw doctor --help
openclaw doctor --repair --non-interactive --yes
openclaw gateway status --deep
openclaw channels status --probe --json
openclaw status --all
```

---

## Related guides

- [OpenClaw `status` vs `gateway status`: 5-Minute Debug Flow for “Online but No Reply” (2026)](/en/blog/openclaw-status-vs-gateway-status-difference-and-debug-flow-2026/)
- [OpenClaw `channels status --probe`: 5-Minute Diagnosis for Bots That Are Online but Not Replying (2026)](/en/blog/openclaw-channels-status-probe-no-reply-diagnosis-2026/)
- [OpenClaw Gateway Start Failed? 2026 Fix Checklist (mode=local, EADDRINUSE, auth bind)](/en/blog/openclaw-gateway-start-failed-fix-checklist-2026/)
- [OpenClaw Logs Debug Guide: From Error to Root Cause](/en/blog/openclaw-logs-debug-guide/)