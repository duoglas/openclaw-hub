---
title: "OpenClaw Proxy Series (2): `web_search` keeps saying fetch failed? I blamed Node, not your API key (and fixed it)"
description: "A real-world incident write-up: why Python requests worked on the same machine while OpenClaw web_search/web_fetch kept failing. Includes symptoms, investigation path, root cause, fix (NODE_USE_ENV_PROXY=1), and browser fallback design."
pubDate: 2026-03-02
tags: ["openclaw", "proxy", "web_search", "fetch failed", "troubleshooting", "systemd"]
category: "guide"
lang: "en"
---

> Series context:
> - Part 1 covered proxy setup in systemd so OpenClaw can reach Claude / OpenAI / Google.
> - Part 2 (this post) answers: **"Why does `web_search` still fail with `fetch failed` even though proxy is configured?"**

This bug was sneaky:

- Error message: `fetch failed`
- First instinct: bad API key or external outage
- Actual cause: neither

Final outcome:

✅ Adding `NODE_USE_ENV_PROXY=1` to the OpenClaw gateway systemd environment fixed it.  
✅ We also added a fallback rule: if `web_search` fails, switch to browser-based search instead of surfacing raw errors.

---

## 1) Symptoms in production

- Multiple tasks started failing with `fetch failed`
- Both `web_search` and `web_fetch` were affected
- Messaging channels (Telegram/QQ) were mostly still online
- Cron jobs looked random: some runs passed, others failed

Easy misdiagnoses:

1. Brave API key expired
2. DNS issue
3. General internet outage

None of those were true.

---

## 2) Investigation path (real order)

### Step A: Verify the target API first

On the same host:

- Python `requests` to Brave API: **200 OK**
- OpenClaw `web_search`: **fetch failed**

This strongly suggested a runtime/client-path mismatch, not a provider outage.

### Step B: Minimal repro with Node fetch

Testing Node `fetch` against Brave/Telegram/Google produced:

- `ETIMEDOUT`
- `ECONNRESET`
- `UND_ERR_CONNECT_TIMEOUT`

Now the problem was clearly in **Node fetch/undici + proxy behavior**.

### Step C: Inspect systemd service env

The gateway drop-in already had:

- `HTTP_PROXY`
- `HTTPS_PROXY`
- `ALL_PROXY`

So "proxy is configured" was technically true — but still insufficient.

### Step D: Decisive experiment

With one extra env var:

```bash
NODE_USE_ENV_PROXY=1 node -e 'fetch("https://api.search.brave.com/res/v1/web/search?q=OpenClaw&count=1", {headers:{"X-Subscription-Token":"..."}}).then(r=>console.log(r.status)).catch(console.error)'
```

Result: **200**.

Root cause confirmed.

---

## 3) Root cause

Not API key. Not DNS. Not provider downtime.

Root cause:

> OpenClaw Gateway tools (`web_search` / `web_fetch`) use Node `fetch` (undici). In this runtime, setting proxy env vars alone was not enough; `NODE_USE_ENV_PROXY=1` was required so Node fetch consistently honored env proxy routing.

Without that, requests intermittently failed and surfaced as `fetch failed`.

---

## 4) Fix (copy/paste)

Edit:

`~/.config/systemd/user/openclaw-gateway.service.d/proxy.conf`

```ini
[Service]
Environment="HTTP_PROXY=http://192.168.136.1:8016"
Environment="HTTPS_PROXY=http://192.168.136.1:8016"
Environment="ALL_PROXY=http://192.168.136.1:8016"
Environment="NO_PROXY=127.0.0.1,localhost,::1"
Environment="NODE_USE_ENV_PROXY=1"
```

Reload + restart:

```bash
systemctl --user daemon-reload
systemctl --user restart openclaw-gateway.service
```

Validate:

```bash
openclaw status
# then run a real web_search request
```

Success criteria: `web_search` returns results consistently; no repeated `fetch failed` bursts.

---

## 5) Reliability upgrade: fallback search path

Even after fixing the root cause, keep a fallback to avoid user-facing dead ends.

Recommended behavior:

1. Try `web_search`
2. If it fails, switch to browser-based search
3. Return structured output (title / URL / snippet)
4. Only ask for manual intervention if both paths fail

So:

❌ Don’t surface raw `fetch failed`  
✅ Report "auto-retried + diagnosis + recovered path + whether human action is required"

---

## 6) Three engineering lessons

### 1) "Works on this machine" is not enough

Python path working does not guarantee Node path works. Interactive shell success does not guarantee systemd runtime success.

### 2) Minimal repro beats guessing

A tiny `node fetch` test narrowed hours of speculation into minutes.

### 3) Critical features need fallback by design

Search/publish/notification paths should degrade gracefully, not fail loudly.

---

## 7) 30-second checklist

- [ ] Are `web_search` failures recurring?
- [ ] Does gateway service env include `NODE_USE_ENV_PROXY=1`?
- [ ] Did you run `daemon-reload` + restart?
- [ ] Do you have a browser fallback path for search?

---

If you run OpenClaw behind proxies with multiple models/channels, this one setting can save you a lot of debugging time.

Next in Part 3:

**Why "channel online" ≠ "model path healthy", and how to design quality-first scheduling (GLM for heartbeat, high-tier models for execution, delay instead of quality downgrade).**
