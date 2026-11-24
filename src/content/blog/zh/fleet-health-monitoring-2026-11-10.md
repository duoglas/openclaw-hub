---
title: "三节点 AI 管线的健康监测：设计思路与实战"
description: "记录三节点 AI 基础设施的健康监控系统设计。从节点探测、状态聚合到告警通知，分享如何在多节点环境下保持服务连续性。"
pubDate: 2026-11-10
updatedDate: 2026-11-10
tags: ["monitoring", "health-check", "fleet", "infrastructure", "automation"]
category: "tutorial"
lang: "zh"
---

## 背景

维护一套三节点的 AI 基础设施时，节点健康是最基础也最容易忽视的环节。节点可能因为网络问题、服务崩溃、资源耗尽等原因不可用，而手动检查又太低效。

我们需要一个**自动化的健康监测系统**，能够：
1. 定期检查每个节点的状态
2. 检测异常并告警
3. 提供历史趋势数据

## 架构设计

```
监控中心 → SSH 探测 → 节点 A/B/C
                ↓
           状态聚合 → 告警通知
```

### 节点角色

| 节点 | 角色 | 关键服务 |
|---|---|---|
| 节点 A（本机） | 执行面 | Hermes 网关、本地模型 |
| 节点 B（控制面） | 控制面 | Hermes 网关、定时任务 |
| 节点 C（渠道面） | 渠道面 | OpenClaw 网关、渠道机器人 |

### 监控频率

- **高频检查**（每 10 分钟）：节点可达性、SSH 连接
- **中频检查**（每小时）：进程状态、端口监听
- **低频检查**（每天）：磁盘空间、内存使用

## 核心组件

### 1. 节点探测

每个节点通过 SSH 进行探测：

```bash
#!/bin/bash
# 节点健康检查脚本

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

### 2. 状态聚合

收集所有节点的状态并生成报告：

```python
import json
from datetime import datetime
from pathlib import Path

def aggregate_health(node_statuses):
    """聚合节点健康状态"""
    report = {
        "timestamp": datetime.now().isoformat(),
        "nodes": node_statuses,
        "overall": "healthy" if all(s["status"] == "up" for s in node_statuses) else "degraded",
    }
    
    # 检查是否有节点异常
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

### 3. 告警通知

当检测到异常时，发送告警通知：

```python
import requests

def send_alert(report):
    """发送告警通知"""
    if not report.get("alerts"):
        return
    
    for alert in report["alerts"]:
        message = f"🚨 Fleet 告警\\n\\n"
        message += f"类型：{alert[type]}\\n"
        message += f"节点：{, .join(alert[nodes])}\\n"
        message += f"严重程度：{alert[severity]}\\n"
        message += f"时间：{report[timestamp]}"
        
        # 发送到 Telegram
        telegram_url = f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage"
        requests.post(telegram_url, json={
            "chat_id": CHAT_ID,
            "text": message,
        })
```

## 实战经验

### 经验 1：SSH 超时设置

SSH 超时设置为 25 秒是经验值：
- 太短（5 秒）：容易误判
- 太长（60 秒）：检查周期过长

```bash
ssh -o ConnectTimeout=25 node-a "echo OK"
```

### 经验 2：重试机制

网络可能短暂中断，需要重试：

```bash
for retry in 1 2 3; do
    if ssh -o ConnectTimeout=25 node-a "echo OK" 2>/dev/null; then
        break
    fi
    sleep 2
done
```

### 经验 3：维护模式

节点维护时，需要跳过健康检查：

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

### 经验 4：历史数据追踪

保存历史数据，便于分析趋势：

```python
# 保存每日统计
daily_stats = {
    "date": "2026-11-10",
    "checks": 144,  # 24h * 6 checks/h
    "failures": 2,
    "uptime": "99.3%",
}
```

## 核心经验

### 1. 分层检查比单一检查更可靠

- 物理层：ping/SSH 可达性
- 网络层：端口监听
- 应用层：进程状态

### 2. 告警不宜过多

只有真正的问题才告警，避免告警疲劳。

### 3. 维护模式是必须的

节点维护时，应该能够跳过健康检查。

### 4. 历史数据很重要

历史数据可以帮助定位问题趋势，优化监控策略。

## 后续改进

1. **自动恢复**：检测到节点异常时自动重启服务
2. **性能监控**：跟踪 API 响应时间和错误率
3. **容量规划**：基于历史数据预测资源需求

---

*本文使用 AI 辅助起草，并经过独立模型审稿。数据来自实际的生产环境监控记录。*
