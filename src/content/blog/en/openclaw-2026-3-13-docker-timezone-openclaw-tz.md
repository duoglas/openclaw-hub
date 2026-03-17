---
title: "Fix OpenClaw Docker timezone drift with OPENCLAW_TZ (2026.3.13+)"
description: "OpenClaw 2026.3.13 added OPENCLAW_TZ so docker-setup can pin gateway/CLI containers to an explicit IANA timezone. Here’s why it matters for cron, logs, and reliability—and how to verify it."
pubDate: 2026-03-17
tags: ["openclaw", "2026.3.13", "docker", "timezone", "cron", "deployment"]
category: "guide"
lang: "en"
---

Timezone bugs are the worst kind of ops bug: nothing crashes, but everything becomes harder to trust.

In container deployments, "what time is it" impacts at least three things OpenClaw operators care about:

- scheduled jobs (cron / reminders / maintenance tasks)
- log timestamps and incident timelines
- cross-region collaboration (humans reading the same timeline)

OpenClaw **2026.3.13** introduced an explicit fix for this class of drift.

## The verifiable change in 2026.3.13

The official release notes for `openclaw/openclaw` state:

> Docker/timezone override: add `OPENCLAW_TZ` so `docker-setup.sh` can pin gateway and CLI containers to a chosen IANA timezone instead of inheriting the daemon default.

Source (official):
https://github.com/openclaw/openclaw/releases

This matters because it replaces accidental timezone inheritance (daemon defaults, base image quirks, host settings) with **an explicit configuration knob**.

## When timezone drift shows up in real OpenClaw deployments

You usually discover this indirectly:

1) A cron job appears to trigger at the “wrong hour”
- The job is fine; the timezone context is not.

2) Logs don’t line up with your host / monitoring
- You waste time correlating events across systems.

3) Schedules/reminders feel unreliable
- Especially when the gateway runs in one environment and operators read logs in another.

Even if you intentionally standardize on UTC, drift still hurts if humans expect local time while reading and debugging.

## How to use OPENCLAW_TZ

### Step 1: pick an IANA timezone name

Use a full IANA timezone name, for example:

- `Asia/Shanghai`
- `Europe/Berlin`
- `America/Los_Angeles`

Avoid ambiguous abbreviations like `CST` or `EST`.

### Step 2: pass OPENCLAW_TZ into your OpenClaw containers

`OPENCLAW_TZ` is designed for the `docker-setup.sh` flow, but the core idea is simple: **the gateway/CLI container should receive this environment variable**.

Compose-style example (illustrative):

```yaml
services:
  openclaw-gateway:
    environment:
      - OPENCLAW_TZ=Asia/Shanghai
```

If you deploy with raw `docker run`, the equivalent is:

```bash
docker run -e OPENCLAW_TZ=Asia/Shanghai ...
```

(Exact commands depend on your OpenClaw docker setup; the release note guarantees the variable is now understood by the setup path.)

## How to verify it works (don’t guess)

Verification should be evidence-based:

- Compare timestamps in OpenClaw logs before/after setting `OPENCLAW_TZ`.
- Trigger a predictable schedule (e.g., an hourly cron) and confirm the observed trigger time matches your intended timezone.
- In multi-container stacks, confirm gateway and any companion CLI container agree on timezone semantics.

If you are debugging scheduling issues, take one extra step: record a short timeline with **(host time, container time, OpenClaw log time)** so you can share the evidence in an issue without back-and-forth.

## Common pitfalls

- **Assuming the host timezone automatically applies to containers.** It often does not, and it can change across hosts.
- **Mixing UTC operations with local-time expectations.** UTC is fine—just ensure your humans and dashboards are aligned.
- **Using timezone abbreviations.** They are not stable across regions and daylight saving rules.

## Where this fits in a deployment checklist

If your OpenClaw instance is expected to run 24/7, timezone correctness is a “first-layer invariant,” similar to:

- stable networking / port binding
- persistent storage
- reliable restart policy

`OPENCLAW_TZ` is small, but it reduces a surprising amount of operational ambiguity.

---

### Related reading (internal)

If you maintain a site-wide deployment guide, link this article from:

- Docker deployment / docker-setup pages
- Cron & scheduling guides
- Troubleshooting index ("Scheduling / time" section)
