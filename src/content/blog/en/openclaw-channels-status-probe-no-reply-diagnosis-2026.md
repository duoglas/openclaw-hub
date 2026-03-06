---
title: "OpenClaw `channels status --probe`: 5-Minute Diagnosis for Bots That Are Online but Not Replying (2026)"
description: "If your OpenClaw bot is online but silent, checking gateway status alone is not enough. Use `openclaw channels status --probe` to pinpoint whether the root cause is channel credentials, group policy, networking, or model-layer failures."
pubDate: 2026-03-06
tags: ["openclaw", "channels", "status", "probe", "telegram", "troubleshooting"]
category: "guide"
lang: "en"
---

Have you seen this pattern?

- `openclaw gateway status` looks healthy
- Your Telegram bot appears online
- But messages still get no reply

The common mistake is checking only the service layer, not channel probes.

This guide gives you the practical workflow: **validate gateway first, then use `channels status --probe` to isolate the real channel issue**.

## One-line takeaway

- `openclaw gateway status`: answers “Is Gateway alive?”
- `openclaw channels status --probe`: answers “Is this specific channel actually usable with current credentials/policy?”

For “online but no reply,” the second command often finds the root cause faster.

---

## 1) 60-second baseline checks (copy/paste)

```bash
openclaw gateway status --deep
openclaw status --deep --timeout 10000
```

If gateway is unhealthy, fix that first. If gateway is healthy but replies still fail, continue.

---

## 2) Core command: probe channel health directly

```bash
openclaw channels status --probe
```

Need shareable output?

```bash
openclaw channels status --probe --json
```

Optional quick parse (if jq is installed):

```bash
openclaw channels status --probe --json | jq '.'
```

> Pending confirmation: exact field names may differ across versions, but `--probe` behavior is consistent for diagnostics. Run `openclaw channels status --help` on your host for version-specific output.

---

## 3) Interpret results with symptom → action mapping

### Scenario A: Gateway healthy, one channel probe fails

**Meaning**: service layer is fine; problem is channel-side (credentials, permissions, routing, policy).

Collect runtime evidence:

```bash
openclaw logs --follow
```

Then verify channel specifics (Telegram example):

- token loaded by runtime user
- webhook/polling conflict (classic `409 Conflict`)
- group gating blocks (`groupPolicy`/`groupAllowFrom`)

### Scenario B: All channels fail probe

**Meaning**: likely gateway/network/proxy/runtime environment issue.

```bash
openclaw gateway status --deep
openclaw status --all
openclaw logs --follow
```

Prioritize checks:

1. Service is running on the expected host
2. Reverse proxy/tunnel is reachable
3. Runtime env vars match what your daemon sees

### Scenario C: Channel probe passes, users still get silence

**Meaning**: messages may enter channel path but fail at model/API layer.

```bash
openclaw logs --follow
```

Look for:

- invalid model key
- quota exhaustion
- upstream timeout
- no fallback model configured

---

## 4) Fast recovery sequence

```bash
# 1) Restart gateway
openclaw gateway restart

# 2) Verify service layer
openclaw gateway status --deep

# 3) Verify channel layer
openclaw channels status --probe

# 4) Observe message path
openclaw logs --follow
```

If handing off to teammates/community, include this evidence pack:

```bash
openclaw status --all
openclaw channels status --probe --json
```

---

## 5) Verifiable done criteria

- [ ] `openclaw gateway status --deep` is healthy
- [ ] `openclaw channels status --probe` passes for target channel
- [ ] `openclaw logs --follow` shows complete inbound + response chain for a test message
- [ ] For group chats, policy (`groupPolicy` / `groupAllowFrom`) matches your intended access model

When all four are true, “online but no reply” incidents drop significantly.

## Final note

`channels status --probe` does not replace `status`; it removes ambiguity:

- gateway-layer issue?
- channel-layer issue?
- model-layer issue?

Once the layer is identified, resolution usually takes minutes instead of hours.

## Related guides

- [OpenClaw `status` vs `gateway status`: 5-Minute Debug Flow for “Online but No Reply” (2026)](/en/blog/openclaw-status-vs-gateway-status-difference-and-debug-flow-2026/)
- [OpenClaw Telegram Bot Online but Not Replying: Webhook, 409 Conflict, and Permission Fix Checklist (2026)](/en/blog/openclaw-telegram-integration-no-reply-fix-checklist-2026/)
- [OpenClaw Log Troubleshooting Guide: From Error to Root Cause](/en/blog/openclaw-logs-debug-guide/)
