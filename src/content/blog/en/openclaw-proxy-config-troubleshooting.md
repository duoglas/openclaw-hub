---
title: "OpenClaw + Proxychains Setup and Troubleshooting (Claude Access)"
description: "Hands-on guide: configure Proxychains for OpenClaw with systemd, then fix common post-proxy issues like timeouts, 429 confusion, browser instability, and localhost routing mistakes."
pubDate: 2026-02-14
tags: ["openclaw", "proxychains", "proxy", "claude", "troubleshooting", "guide"]
category: "guide"
lang: "en"
---

If you're running OpenClaw behind a proxy for Claude access and using **proxychains**, this is the practical playbook.

We'll do two things:
1. configure proxychains correctly
2. make it work with systemd (how most people run OpenClaw)
3. troubleshoot failures that appear after proxy is enabled

## 1) Configure Proxychains

### Install
```bash
sudo apt update
sudo apt install -y proxychains4
```

### Configure
Edit `/etc/proxychains4.conf` (or your user-level config).

Recommended baseline:
```conf
strict_chain
proxy_dns

[ProxyList]
socks5 127.0.0.1 7890
# or: http 127.0.0.1 7890
```

### Validate before touching OpenClaw
```bash
proxychains4 -q curl https://api.anthropic.com -I
```
If this fails, OpenClaw will fail too. Fix the proxy first.

---

## 2) Make it work with systemd (permanent setup)

Most users run OpenClaw as a systemd service. **Running `proxychains4 openclaw gateway start` manually is only for testing — it won't survive a reboot.** You need to modify the service file.

### Find your service file
```bash
systemctl cat openclaw
```
Usually at `/etc/systemd/system/openclaw.service` or `~/.config/systemd/user/openclaw.service`.

### Edit ExecStart to include proxychains
```bash
sudo nano /etc/systemd/system/openclaw.service
```

Change the `ExecStart` line:
```ini
[Service]
ExecStart=/usr/bin/proxychains4 -q /usr/bin/openclaw gateway start --foreground
```

> **Important:**  
> - Use **absolute paths** — systemd doesn't use your shell PATH  
> - `-q` = quiet mode, keeps proxy logs out of OpenClaw output  
> - `--foreground` keeps OpenClaw in foreground so systemd can manage the process lifecycle

### Confirm absolute paths
```bash
which proxychains4
# typically /usr/bin/proxychains4

which openclaw
# varies: /usr/bin/openclaw or /usr/local/bin/openclaw
```

### Reload and restart
```bash
sudo systemctl daemon-reload
sudo systemctl restart openclaw
```

### Verify proxy is working
```bash
# service status
systemctl status openclaw

# recent logs
journalctl -u openclaw --no-pager -n 50

# gateway check
openclaw status
openclaw gateway status
```

Check three signals:
1. gateway reachable
2. key channels OK
3. no persistent timeout/disconnect pattern

### Quick manual test (before editing service file)
```bash
proxychains4 -q openclaw gateway start
```
Confirm it works, then make the service file change permanent.

---

## 3) Top 5 issues after enabling proxy

### Issue 1: Claude calls are intermittent or timing out

**Causes:** unstable proxy egress, SOCKS/HTTP mismatch, DNS not going through proxy

**Fix:**
- keep one proxy protocol
- ensure `proxy_dns` is enabled
- validate with `proxychains4 curl` first

---

### Issue 2: localhost traffic gets proxied

**Symptoms:** `127.0.0.1` / `localhost` calls fail, browser control / local RPC gets flaky

**Fix:**
- use proxy for external model calls only
- keep local control path direct
- if your env uses global LD_PRELOAD injection, isolate browser process (Issue 3)

---

### Issue 3: Browser tool becomes unstable (especially Chrome)

**Symptoms:** pages open but actions fail, browser/relay startup errors

**Fix (field-proven):**

Chrome crashes its GPU process under proxychains' `LD_PRELOAD`. Create a wrapper script:

```bash
#!/bin/bash
# ~/.openclaw/browser/chrome-wrapper.sh
unset LD_PRELOAD
exec /usr/bin/google-chrome-stable \
  --proxy-server="socks5://127.0.0.1:7890" \
  --no-sandbox \
  "$@"
```

Then:
```bash
chmod +x ~/.openclaw/browser/chrome-wrapper.sh
```

In OpenClaw config, set:
- `browser.executablePath` → point to the wrapper
- `browser.noSandbox` → `true`

Browser gets proxy without inheriting dirty env vars.

---

### Issue 4: High 429 rates mistaken as proxy failure

429 is usually rate/quota pressure, not connectivity.

**Fix:** alternate providers in fallback chain, reduce burst concurrency, split heavy jobs.

---

### Issue 5: Changed service file but proxy still not working

**Causes:** forgot `daemon-reload`, used relative paths, proxychains config has wrong permissions

**Debug:**
```bash
# 1. reload
sudo systemctl daemon-reload

# 2. check actual ExecStart
systemctl show openclaw --property=ExecStart

# 3. check startup logs
journalctl -u openclaw -n 30 --no-pager

# 4. check config permissions
ls -la /etc/proxychains4.conf
```

---

## 4) Reliable baseline (copy this)

1. Validate proxy: `proxychains4 -q curl https://api.anthropic.com -I`
2. Quick test: `proxychains4 -q openclaw gateway start`
3. Confirm it works → edit systemd service `ExecStart`
4. `daemon-reload` + `restart`
5. Isolate browser with wrapper script
6. Weekly audit:

```bash
openclaw security audit --deep
```

## One-line takeaway

**Get proxychains working first, then make it permanent in systemd. Proxy external traffic, keep local control direct.**