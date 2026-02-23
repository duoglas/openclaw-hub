---
title: "OpenClaw systemd 服务管理：开机自启、崩溃自动恢复与健康监控（2026）"
description: "手把手教你将 OpenClaw 配置为 systemd 服务，实现开机自启、进程崩溃自动重启、日志管理与健康检查。全部命令可直接复制使用。"
pubDate: 2026-02-23
tags: ["openclaw", "systemd", "部署", "监控", "VPS", "教程"]
category: "guide"
lang: "zh"
---

# OpenClaw systemd 服务管理：开机自启、崩溃自动恢复与健康监控

OpenClaw 部署到 VPS 后，最常见的问题是：**进程半夜崩了怎么办？服务器重启后 OpenClaw 没跟着起来怎么办？**

如果你还在用 `tmux` 或 `screen` 跑 OpenClaw，是时候升级了。本文教你用 systemd 实现：

- ✅ 开机自动启动
- ✅ 崩溃后 5 秒自动重启
- ✅ 内存超限自动杀掉防止 OOM
- ✅ 日志自动轮转不占满磁盘
- ✅ 健康检查脚本 + 告警

全程约 10 分钟。

## 前置条件

- Linux VPS（Ubuntu 22.04/24.04、Debian 12 等）——推荐 [Vultr](https://www.vultr.com/?ref=7566454) 或 [DigitalOcean](https://m.do.co/c/0090e7c2aec0)，国内用户推荐[腾讯云轻量应用服务器](https://curl.qcloud.com/1PS2iJEg)
- OpenClaw 已安装且能手动运行
- root 或 sudo 权限

## 第一步：创建 systemd 服务文件

```bash
sudo nano /etc/systemd/system/openclaw.service
```

粘贴以下内容（修改 `User` 和路径为你的实际用户名）：

```ini
[Unit]
Description=OpenClaw AI Agent Gateway
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
User=你的用户名
Group=你的用户名
WorkingDirectory=/home/你的用户名
ExecStart=/usr/local/bin/openclaw gateway start --foreground
Restart=always
RestartSec=5
StartLimitIntervalSec=300
StartLimitBurst=10

# 环境变量
Environment=NODE_ENV=production
Environment=HOME=/home/你的用户名

# 安全加固
NoNewPrivileges=true
ProtectSystem=strict
ReadWritePaths=/home/你的用户名

# 资源限制
MemoryMax=2G
TasksMax=100

# 日志
StandardOutput=journal
StandardError=journal
SyslogIdentifier=openclaw

[Install]
WantedBy=multi-user.target
```

### 关键参数说明

| 参数 | 作用 |
|------|------|
| `Restart=always` | 无论什么原因退出都自动重启 |
| `RestartSec=5` | 重启前等 5 秒，防止 CPU 空转 |
| `StartLimitBurst=10` | 5 分钟内最多重启 10 次，防止死循环 |
| `MemoryMax=2G` | 内存超 2GB 自动杀掉，防止拖垮整台机器 |
| `After=network-online.target` | 等网络就绪再启动（API 连接必须） |

## 第二步：启用并启动

```bash
# 重载 systemd 配置
sudo systemctl daemon-reload

# 设置开机自启
sudo systemctl enable openclaw

# 立即启动
sudo systemctl start openclaw

# 检查状态
sudo systemctl status openclaw
```

看到 `Active: active (running)` 就成功了。如果启动失败，查看日志：

```bash
journalctl -u openclaw -n 50 --no-pager
```

## 第三步：常用管理命令

```bash
# 停止服务
sudo systemctl stop openclaw

# 重启（改完配置后用）
sudo systemctl restart openclaw

# 实时查看日志
journalctl -u openclaw -f

# 查看最近 1 小时日志
journalctl -u openclaw --since "1 hour ago"

# 查看本次开机以来的日志
journalctl -u openclaw -b

# 检查是否已设为开机自启
systemctl is-enabled openclaw
```

## 第四步：健康检查脚本

创建简单的健康检查，OpenClaw 挂了就记录日志（可选发告警）：

```bash
nano ~/openclaw-health-check.sh
```

```bash
#!/bin/bash
# OpenClaw 健康检查
# 加入 crontab: */5 * * * * /home/你的用户名/openclaw-health-check.sh

SERVICE="openclaw"
LOG_FILE="/home/你的用户名/openclaw-health.log"

if ! systemctl is-active --quiet "$SERVICE"; then
    TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
    echo "[$TIMESTAMP] OpenClaw 服务已停止 — systemd 将自动重启" >> "$LOG_FILE"
    
    # 可选：通过 webhook 发送告警
    # curl -s -X POST "https://your-webhook-url" \
    #   -H "Content-Type: application/json" \
    #   -d "{\"text\": \"⚠️ OpenClaw 在 $(hostname) 上挂了，已触发自动重启\"}"
fi
```

```bash
chmod +x ~/openclaw-health-check.sh

# 每 5 分钟检查一次
(crontab -l 2>/dev/null; echo "*/5 * * * * /home/你的用户名/openclaw-health-check.sh") | crontab -
```

## 第五步：日志轮转

防止日志把磁盘撑爆：

```bash
# 立即清理，只保留 500MB
sudo journalctl --vacuum-size=500M

# 永久限制日志大小
sudo nano /etc/systemd/journald.conf
# 找到或添加：
# SystemMaxUse=500M
sudo systemctl restart systemd-journald
```

## 第六步：自动更新（可选）

```bash
nano ~/openclaw-update.sh
```

```bash
#!/bin/bash
# 每周自动更新 OpenClaw
LOG="/home/你的用户名/openclaw-update.log"
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

echo "[$TIMESTAMP] 开始更新..." >> "$LOG"
npm update -g openclaw 2>&1 >> "$LOG"
sudo systemctl restart openclaw
echo "[$TIMESTAMP] 更新完成" >> "$LOG"
```

```bash
chmod +x ~/openclaw-update.sh
# 每周日凌晨 4 点执行
(crontab -l 2>/dev/null; echo "0 4 * * 0 /home/你的用户名/openclaw-update.sh") | crontab -
```

## 常见问题排查

### 服务启动就失败

```bash
journalctl -u openclaw -n 30 --no-pager

# 常见原因：
# - User/Group 写错了
# - ExecStart 路径不对
# - 端口被占用（还有另一个 OpenClaw 进程在跑）
```

端口被占用时：

```bash
sudo lsof -i :3000
sudo kill -9 <PID>
sudo systemctl restart openclaw
```

### 不停重启（crash loop）

```bash
# 查看重启次数
systemctl show openclaw --property=NRestarts

# 重置计数器
sudo systemctl reset-failed openclaw
sudo systemctl start openclaw
```

### 权限错误

```bash
sudo chown -R 你的用户名:你的用户名 /home/你的用户名/.openclaw
```

## 推荐 VPS

跑 OpenClaw 24/7 需要稳定的 VPS：

- **[腾讯云](https://curl.qcloud.com/1PS2iJEg)** — 国内访问速度最快，轻量应用服务器性价比高，适合大陆用户
- **[Vultr](https://www.vultr.com/?ref=7566454)** — $6/月起，17 个机房，SSD 性能好
- **[DigitalOcean](https://m.do.co/c/0090e7c2aec0)** — $6/月起，监控面板好用，快照备份方便

1 核 1GB 内存足够单用户 OpenClaw。如果跑多个 Agent 或大量浏览器自动化，建议升级到 2GB。

## 总结

| 功能 | 方法 |
|------|------|
| 开机自启 | `systemctl enable openclaw` |
| 崩溃自动重启 | 服务文件中 `Restart=always` |
| 查看日志 | `journalctl -u openclaw -f` |
| 健康监控 | cron 脚本 + 可选 webhook 告警 |
| 日志轮转 | journald 大小限制 |

配置完成后，你的 OpenClaw 能自动应对崩溃、重启和更新，不用再盯着 tmux 了。

---

*从零开始部署？请看 [VPS 完整部署指南](/blog/openclaw-vps-deployment-complete-guide)。*
