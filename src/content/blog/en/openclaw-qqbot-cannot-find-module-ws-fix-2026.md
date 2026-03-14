---
title: "OpenClaw QQ Bot: Fix \"Cannot find module 'ws'\" (Extension Load Failure, 2026)"
description: "Your OpenClaw QQ Bot extension fails to load because Node can't find the 'ws' module? This guide shows how to confirm the failing plugin path, reinstall dependencies safely (npm/pnpm), and verify the fix via OpenClaw status + logs."
pubDate: 2026-03-14
tags: ["openclaw", "qqbot", "nodejs", "ws", "troubleshooting", "extensions"]
category: "guide"
lang: "en"
---

If your OpenClaw QQ Bot extension fails to load and you see an error like:

```text
Cannot find module 'ws'
```

…it means the QQ Bot extension’s Node.js dependencies are missing or were installed in the wrong place.

This is a high-frequency “works on my machine” failure mode when:

- you copied the extension folder without running install
- `node_modules/` was deleted/ignored
- Node/pnpm versions changed
- you’re running OpenClaw under a different OS user than the one that installed deps

## One-line takeaway

**Go to the QQ Bot extension directory and reinstall dependencies, then restart the gateway and verify the channel/extension state.**

---

## What you should see (symptoms)

- OpenClaw loads, but QQ Bot plugin/extension shows **load failure**
- Logs contain Node resolution errors
- A common stack line:

```text
Error: Cannot find module 'ws'
```

> Evidence note: exact plugin names/paths can differ by OpenClaw version and your local extension layout. The steps below are written to be verifiable on your host.

---

## Step 0) Confirm OpenClaw is reading the same runtime user you’re debugging

Dependency installs are per-folder, but **what matters is which user runs the OpenClaw gateway**.

```bash
whoami
openclaw status --deep
```

If your gateway is managed as a service, also check the service user (systemd/supervisor/etc.). Install deps as the same user that owns the extension directory.

---

## Step 1) Locate the QQ Bot extension directory

In many setups, OpenClaw extensions live under:

- `~/.openclaw/extensions/<extension-name>/`

If you already know your path, use it. Otherwise, search:

```bash
ls -la ~/.openclaw/extensions || true
find ~/.openclaw -maxdepth 4 -type d -name '*qq*' -o -name '*qqbot*' 2>/dev/null
```

You’re looking for a folder that contains a `package.json` (Node project):

```bash
cd ~/.openclaw/extensions/qqbot
ls -la
cat package.json
```

If this directory doesn’t exist, your extension may be installed elsewhere (pending confirmation). In that case, search the OpenClaw install root or your project checkout.

---

## Step 2) Verify the missing module is truly absent

From the extension directory:

```bash
node -p "require.resolve('ws')" 
```

If you still get `Cannot find module 'ws'`, proceed to reinstall.

---

## Step 3) Reinstall dependencies (safe default)

### Option A (recommended): use the lockfile’s package manager

If you see `pnpm-lock.yaml`, use pnpm:

```bash
pnpm install
```

If you see `package-lock.json`, use npm:

```bash
npm ci
```

If neither lockfile exists, fall back to:

```bash
npm install
```

### Option B: force a clean reinstall (when the folder is inconsistent)

This is safe but slower:

```bash
rm -rf node_modules
npm install
```

> If you’re on a production host: prefer `npm ci` or `pnpm install` first. Only wipe `node_modules/` if necessary.

---

## Step 4) Restart OpenClaw gateway and verify the fix

Restart the gateway:

```bash
openclaw gateway restart
```

Then verify status:

```bash
openclaw status --deep
openclaw channels status --probe
```

Finally, watch logs while performing a real test message/event:

```bash
openclaw logs --follow
```

### Verifiable done criteria

- [ ] No more `Cannot find module 'ws'` in `openclaw logs`
- [ ] `openclaw status --deep` shows QQ Bot extension/channel is **OK** (or at least “configured” without load errors)
- [ ] A test message/event flows through end-to-end (inbound → agent → outbound)

---

## Common root causes (so it doesn’t come back)

1. **Copied extension without installing deps**
   - Fix: run `pnpm install`/`npm ci` after copying.
2. **Wrong user installs deps**
   - Fix: install as the same user that runs gateway.
3. **Node version changed**
   - Fix: reinstall deps after major Node upgrade.
4. **`node_modules` cleaned by “disk cleanup” scripts**
   - Fix: exclude extension folders from cleanup.

---

## Related guides (internal)

- [OpenClaw install & first-run errors: full troubleshooting map](/en/blog/openclaw-install-first-run-error-troubleshooting/)
- [OpenClaw `channels status --probe`: diagnose “online but not replying”](/en/blog/openclaw-channels-status-probe-no-reply-diagnosis-2026/)
