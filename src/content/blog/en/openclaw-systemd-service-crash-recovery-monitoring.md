---
title: "OpenClaw systemd Service: Auto-Start, Crash Recovery & Health Monitoring (2026)"
description: "Set up OpenClaw as a bulletproof systemd service with auto-restart on crash, boot-time startup, health checks, and log rotation. Includes exact commands and config files you can copy-paste."
pubDate: 2026-02-23
tags: ["openclaw", "systemd", "deployment", "monitoring", "vps", "guide"]
category: "guide"
lang: "en"
---

# OpenClaw systemd Service: Auto-Start, Crash Recovery & Health Monitoring

You've deployed OpenClaw on a VPS — great. But what happens when the process crashes at 3 AM? Or when the server reboots after a kernel update? If you're still running OpenClaw in a `tmux` session, this guide is for you.

We'll set up OpenClaw as a proper **systemd service** with automatic restart, boot-time startup, health monitoring, and log management. Total setup time: ~10 minutes.

## Prerequisites

- A Linux VPS (Ubuntu 22.04/24.04, Debian 12, or similar) — [Vultr](https://www.vultr.com/?ref=7566454) and [DigitalOcean](https://m.do.co/c/0090e7c2aec0) both work great for this
- OpenClaw already installed and working manually
- Root or sudo access

## Step 1: Create the systemd Service File

```bash
sudo nano /etc/systemd/system/openclaw.service
```

Paste this config (adjust `User` and paths to match your setup):

```ini
[Unit]
Description=OpenClaw AI Agent Gateway
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
User=your-username
Group=your-username
WorkingDirectory=/home/your-username
ExecStart=/usr/local/bin/openclaw gateway start --foreground
Restart=always
RestartSec=5
StartLimitIntervalSec=300
StartLimitBurst=10

# Environment
Environment=NODE_ENV=production
Environment=HOME=/home/your-username

# Security hardening
NoNewPrivileges=true
ProtectSystem=strict
ReadWritePaths=/home/your-username

# Resource limits
MemoryMax=2G
TasksMax=100

# Logging
StandardOutput=journal
StandardError=journal
SyslogIdentifier=openclaw

[Install]
WantedBy=multi-user.target
```

### Key Settings Explained

| Setting | What It Does |
|---------|-------------|
| `Restart=always` | Restart no matter how it exits (crash, OOM, signal) |
| `RestartSec=5` | Wait 5 seconds before restarting (prevents CPU spin) |
| `StartLimitBurst=10` | Allow up to 10 restarts within 5 minutes |
| `MemoryMax=2G` | Kill the process if it exceeds 2 GB RAM (prevents OOM killing other services) |
| `After=network-online.target` | Don't start until network is ready (critical for API connections) |

## Step 2: Enable and Start

```bash
# Reload systemd to pick up the new service
sudo systemctl daemon-reload

# Enable auto-start on boot
sudo systemctl enable openclaw

# Start the service now
sudo systemctl start openclaw

# Check it's running
sudo systemctl status openclaw
```

You should see `Active: active (running)`. If not, check the logs:

```bash
journalctl -u openclaw -n 50 --no-pager
```

## Step 3: Common Management Commands

```bash
# Stop the service
sudo systemctl stop openclaw

# Restart (e.g., after config changes)
sudo systemctl restart openclaw

# View live logs (like tail -f)
journalctl -u openclaw -f

# View logs from last hour
journalctl -u openclaw --since "1 hour ago"

# View logs from last boot
journalctl -u openclaw -b

# Check if auto-start is enabled
systemctl is-enabled openclaw
```

## Step 4: Health Check Script

Create a simple health check that alerts you if OpenClaw is down:

```bash
nano ~/openclaw-health-check.sh
```

```bash
#!/bin/bash
# OpenClaw Health Check
# Add to crontab: */5 * * * * /home/your-username/openclaw-health-check.sh

SERVICE="openclaw"
LOG_FILE="/home/your-username/openclaw-health.log"

if ! systemctl is-active --quiet "$SERVICE"; then
    TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
    echo "[$TIMESTAMP] OpenClaw is DOWN — systemd should auto-restart" >> "$LOG_FILE"
    
    # Optional: send alert via curl to your webhook
    # curl -s -X POST "https://your-webhook-url" \
    #   -H "Content-Type: application/json" \
    #   -d "{\"text\": \"⚠️ OpenClaw service is down on $(hostname). Auto-restart triggered.\"}"
fi
```

```bash
chmod +x ~/openclaw-health-check.sh

# Add to crontab (runs every 5 minutes)
(crontab -l 2>/dev/null; echo "*/5 * * * * /home/your-username/openclaw-health-check.sh") | crontab -
```

## Step 5: Log Rotation

Prevent logs from eating all your disk space:

```bash
sudo nano /etc/logrotate.d/openclaw
```

```
/var/log/journal/*openclaw* {
    daily
    rotate 7
    compress
    missingok
    notifempty
}
```

Or limit journal size globally:

```bash
sudo journalctl --vacuum-size=500M
```

To make the limit permanent:

```bash
sudo nano /etc/systemd/journald.conf
# Add or uncomment:
# SystemMaxUse=500M
sudo systemctl restart systemd-journald
```

## Step 6: Automatic Updates (Optional)

If you want OpenClaw to auto-update on a schedule:

```bash
nano ~/openclaw-update.sh
```

```bash
#!/bin/bash
# Weekly OpenClaw update
LOG="/home/your-username/openclaw-update.log"
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

echo "[$TIMESTAMP] Starting update..." >> "$LOG"

# Update OpenClaw
npm update -g openclaw 2>&1 >> "$LOG"

# Restart service to pick up new version
sudo systemctl restart openclaw

echo "[$TIMESTAMP] Update complete" >> "$LOG"
```

```bash
chmod +x ~/openclaw-update.sh

# Run weekly on Sunday at 4 AM
(crontab -l 2>/dev/null; echo "0 4 * * 0 /home/your-username/openclaw-update.sh") | crontab -
```

## Troubleshooting

### Service fails to start immediately

```bash
# Check the exact error
journalctl -u openclaw -n 30 --no-pager

# Common issues:
# - Wrong User/Group in service file
# - Wrong path in ExecStart
# - Port already in use (another OpenClaw instance running)
```

If the port is in use:

```bash
# Find what's using the port
sudo lsof -i :3000
# Kill it
sudo kill -9 <PID>
# Then restart
sudo systemctl restart openclaw
```

### Service keeps restarting (crash loop)

```bash
# Check restart count
systemctl show openclaw --property=NRestarts

# If hitting StartLimitBurst, reset the counter
sudo systemctl reset-failed openclaw
sudo systemctl start openclaw
```

### Service started but gateway not responding

```bash
# Verify the gateway is actually listening
openclaw gateway status

# Check if the foreground flag is needed for your version
openclaw gateway start --help
```

### Permission errors

```bash
# Ensure the user owns the workspace
sudo chown -R your-username:your-username /home/your-username/.openclaw
```

## Recommended VPS Providers

For a reliable 24/7 OpenClaw deployment, you need a VPS with good uptime and network connectivity:

- **[Vultr](https://www.vultr.com/?ref=7566454)** — From $6/mo, fast SSD, 17 global locations. Great for latency-sensitive setups.
- **[DigitalOcean](https://m.do.co/c/0090e7c2aec0)** — From $6/mo, excellent monitoring dashboard, easy snapshots for backup.
- **[Tencent Cloud](https://curl.qcloud.com/1PS2iJEg)** — Best choice if you're in mainland China or need low-latency Asia coverage. Competitive pricing on lightweight instances.

A 1 vCPU / 1 GB RAM instance handles a single-user OpenClaw deployment comfortably. Upgrade to 2 GB if you plan to run multiple agents or heavy browser automation.

## Summary

| What | How |
|------|-----|
| Start on boot | `systemctl enable openclaw` |
| Auto-restart on crash | `Restart=always` in service file |
| View logs | `journalctl -u openclaw -f` |
| Health monitoring | Cron script + optional webhook |
| Log rotation | journald size limit |

Your OpenClaw agent now survives crashes, reboots, and updates automatically. No more babysitting `tmux` sessions.

---

*Need help deploying OpenClaw from scratch? Check our [VPS Deployment Guide](/blog/openclaw-vps-deployment-complete-guide) for the full walkthrough.*


## Related Reading

- [Silent Message Loss / Replay Troubleshooting (2026)](/en/blog/openclaw-delivery-reliability-silent-loss-replay-fix-2026/)
