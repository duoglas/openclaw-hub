---
title: "Health Monitoring for Three-Node AI Pipelines: Design and Practice"
description: "Documenting the health monitoring system design for a three-node AI infrastructure. From node probing, status aggregation to alert notification, learn how to maintain service continuity in multi-node environments."
pubDate: 2026-11-10
updatedDate: 2026-11-10
tags: ["monitoring", "health-check", "fleet", "infrastructure", "automation"]
category: "tutorial"
lang: "en"
---

## Background

When maintaining a three-node AI infrastructure, node health is one of the most basic yet easily overlooked aspects. Nodes may become unavailable due to network issues, service crashes, resource exhaustion, and manual checking is too inefficient.

We needed an **automated health monitoring system** that could:
1. Regularly check the status of each node
2. Detect anomalies and alert
3. Provide historical trend data

## Architecture Design

```
Monitoring Center -> SSH Probing -> Node A/B/C
                ↓
           Status Aggregation -> Alert Notification
```

### Node Roles

| Node | Role | Key Services |
|---|---|---|
| Node A (Local) | Execution | Hermes Gateway, Local Models |
| Node B (Control) | Control | Hermes Gateway, Scheduled Tasks |
| Node C (Channel) | Channel | OpenClaw Gateway, Channel Bots |

### Monitoring Frequency

- **High Frequency** (every 10 minutes): Node reachability, SSH connection
- **Medium Frequency** (every hour): Process status, Port listening
- **Low Frequency** (daily): Disk space, Memory usage

## Core Components

### 1. Node Probing

Each node is probed via SSH:

```bash
#!/bin/bash
# Node health check script

NODES=("node-a" "node-b" "node-c")
TIMEOUT=25
MAX_RETRIES=3

check_node() {
    local node=$1
    local retries=0
    
    while [ $retries -lt $MAX_RETRIES ]; do
        if ssh -o ConnectTimeout=$TIMEOUT -o StrictHostKeyChecking=no "$node" "echo OK" 2>/dev/null; then
            echo "$node: UP"
            return 0
        fi
        retries=$((retries + 1))
        sleep 2
    done
    
    echo "$node: DOWN"
    return 1
}

for node in "${NODES[@]}"; do
    check_node "$node"
done
```

### 2. Status Aggregation

Collect status from all nodes and generate reports:

```python
import json
from datetime import datetime
from pathlib import Path

def aggregate_health(node_statuses):
    """Aggregate node health status"""
    report = {
        "timestamp": datetime.now().isoformat(),
        "nodes": node_statuses,
        "overall": "healthy" if all(s["status"] == "up" for s in node_statuses) else "degraded",
    }
    
    # Check if any node is abnormal
    down_nodes = [n["name"] for n in node_statuses if n["status"] == "down"]
    if down_nodes:
        report["alerts"] = [
            {
                "type": "node_down",
                "nodes": down_nodes,
                "severity": "critical",
            }
        ]
    
    return report
```

### 3. Alert Notification

Send alert notifications when anomalies are detected:

```python
import requests

def send_alert(report):
    """Send alert notification"""
    if not report.get("alerts"):
        return
    
    for alert in report["alerts"]:
        message = f"🚨 Fleet Alert\\n\\n"
        message += f"Type: {alert[type]}\\n"
        message += f"Nodes: {, .join(alert[nodes])}\\n"
        message += f"Severity: {alert[severity]}\\n"
        message += f"Time: {report[timestamp]}"
        
        # Send to Telegram
        telegram_url = f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage"
        requests.post(telegram_url, json={
            "chat_id": CHAT_ID,
            "text": message,
        })
```

## Practical Experience

### Experience 1: SSH Timeout Settings

SSH timeout set to 25 seconds is an empirical value:
- Too short (5 seconds): Easy false positives
- Too long (60 seconds): Check cycle too long

```bash
ssh -o ConnectTimeout=25 node-a "echo OK"
```

### Experience 2: Retry Mechanism

Network may temporarily interrupt, retries are needed:

```bash
for retry in 1 2 3; do
    if ssh -o ConnectTimeout=25 node-a "echo OK" 2>/dev/null; then
        break
    fi
    sleep 2
done
```

### Experience 3: Maintenance Mode

When a node is under maintenance, skip health checks:

```bash
if [ -f ~/.fleet-maintenance-until ]; then
    MINTIME=$(cat ~/.fleet-maintenance-until)
    NOW=$(date +%s)
    if [ $NOW -lt $MINTIME ]; then
        echo "Node in maintenance until $(date -d @$MINTIME)"
        exit 0
    fi
    rm ~/.fleet-maintenance-until
fi
```

### Experience 4: Historical Data Tracking

Save historical data for trend analysis:

```python
# Save daily statistics
daily_stats = {
    "date": "2026-11-10",
    "checks": 144,  # 24h * 6 checks/h
    "failures": 2,
    "uptime": "99.3%",
}
```

## Core Lessons

### 1. Layered checks are more reliable than single checks

- Physical layer: Ping/SSH reachability
- Network layer: Port listening
- Application layer: Process status

### 2. Alerts should not be excessive

Only alert on real problems to avoid alert fatigue.

### 3. Maintenance mode is essential

When nodes are under maintenance, health checks should be skippable.

### 4. Historical data is important

Historical data helps identify problem trends and optimize monitoring strategies.

## Future Improvements

1. **Automatic recovery**: Automatically restart services when node anomalies are detected
2. **Performance monitoring**: Track API response times and error rates
3. **Capacity planning**: Predict resource needs based on historical data

---

*AI-assisted drafting with a separate model review. Data from actual production environment monitoring records.*
