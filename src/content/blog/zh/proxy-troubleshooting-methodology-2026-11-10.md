---
title: "代理路径排查方法论：从 SSH 断连到根因定位的实战记录"
description: "记录一次 AI 基础设施中代理路径排查的完整过程。Tailscale 断连、SSH 超时、SOCKS5 代理 vs 直连的区分，以及如何用分层方法定位根因。"
pubDate: 2026-11-10
updatedDate: 2026-11-10
tags: ["networking", "proxy", "troubleshooting", "infrastructure", "ssh"]
category: "tutorial"
lang: "zh"
---

## 背景

维护一套多节点的 AI 基础设施时，网络问题是最常见的阻塞项。我们有三台服务器分布在不同的网络环境中，通过 Tailscale 组网，对外提供 AI API 代理服务。

2026 年 9 月的一天，其中一台服务器**断连 4.5 小时**，期间所有依赖该机器的服务全部不可用。排查过程花了大量时间，最终发现是网卡驱动问题，但更重要的是我们总结出了一套**可复用的分层排查方法论**。

## 分层排查框架

我们总结出 4 层排查框架，从物理层到应用层逐层隔离：

```
物理层 → 网络层 → 代理层 → 应用层
   ↓        ↓        ↓        ↓
 硬件     路由     配置     服务
```

### 第 1 层：物理层

**症状：** 完全无法 ping 通

**排查步骤：**
1. `ping` 测试（基本连通性）
2. `ifconfig` / `ip addr`（网卡状态）
3. 查看系统日志 `dmesg | grep -i error`（硬件错误）

**实际案例：** 我们的问题出在网卡驱动上。服务器使用的是 E1000 网卡，`Tx Unit Hang` 是已知问题。解决方法是关闭 TSO/GSO 功能：

```bash
# 永久关闭
sudo ip link set eth0 tx off
sudo ip link set eth0 gro off
sudo ip link set eth0 gso off

# 配置 systemd service 自动应用
sudo tee /etc/systemd/system/nic-offload.service << EOF
[Unit]
Description=Disable NIC offloading
After=network.target

[Service]
Type=oneshot
ExecStart=/sbin/ethtool -K eth0 tso off gso off gro off

[Install]
WantedBy=multi-user.target
EOF
```

### 第 2 层：网络层

**症状：** ping 可达但 SSH 超时

**排查步骤：**
1. `ping -c 10`（丢包率）
2. `traceroute`（路由路径）
3. `tailscale status`（Tailscale 状态）

**实际案例：** 我们的三台服务器通过 Tailscale 组网，但 Tailscale 默认使用 DERP 中继。当直连路径断开时，DERP 延迟极高（300+ ms）。

**解决方案：**
- SSH 连接时设置超时：`ssh -o ConnectTimeout=25`
- 失败重试：`ssh -o ConnectTimeout=25 -o StrictHostKeyChecking=no`
- 如果连续失败，检查 Tailscale 对端状态：`ssh peer 'tailscale status'`

### 第 3 层：代理层

**症状：** 服务可达但 API 请求失败

**排查步骤：**
1. `curl -v https://api.example.com`（测试直连）
2. 检查环境变量 `echo $HTTP_PROXY $HTTPS_PROXY`
3. 检查 hosts 文件 `cat /etc/hosts`

**实际案例：** 这是最复杂的一层。我们同时使用多种代理策略：

```bash
# 场景 1：AI API 请求走 SOCKS5 代理
export HTTP_PROXY=http://127.0.0.1:8016
export HTTPS_PROXY=http://127.0.0.1:8016

# 场景 2：某些服务需要直连（不走代理）
export NO_PROXY="localhost,127.0.0.1,10.0.0.0/8,172.16.0.0/12,192.168.0.0/16"

# 场景 3：Tavily API 直连（绕过失效的 Hikari 代理）
export TAVILY_API_BASE_URL=https://api.tavily.com
export TAVILY_API_KEY=tvly-xxx
```

**关键发现：** 
- **代理配置不能一刀切**：不同服务需要不同的代理策略
- **NO_PROXY 边界**：AI API 域名不能加入 NO_PROXY，否则请求会超时
- **HOSTS 文件**：某些域名需要固定 IP（如 `ai.google.dev`），但要注意隐私

### 第 4 层：应用层

**症状：** 网络正常但服务不可用

**排查步骤：**
1. 检查进程状态 `systemctl status service-name`
2. 查看日志 `journalctl -u service-name`
3. 检查端口监听 `netstat -tlnp | grep port`

## 实用排查命令速查

```bash
# 1. 分层测试
ping -c 3 target            # 物理层
curl -o /dev/null -s -w "%{http_code}" https://api.example.com  # 代理层
ss -tlnp | grep :8016      # 端口监听

# 2. 代理测试
curl -x http://127.0.0.1:8016 https://api.example.com
curl -x socks5h://127.0.0.1:8016 https://api.example.com

# 3. 延迟测试
time curl -o /dev/null -s https://api.example.com

# 4. TLS 测试
openssl s_client -connect api.example.com:443 -servername api.example.com
```

## 核心经验

### 1. 分层排查比盲目试错高效 10 倍

每次出问题，先确定是哪一层的问题，再针对性排查。不要从应用层一路下到物理层。

### 2. 代理配置是"最小权限"原则

每个服务只给它需要的代理配置。全局设置 `HTTP_PROXY` 会导致所有请求都走代理，包括本不该走的。

### 3. 超时设置是必须的

`ConnectTimeout=25` 是经验值。太短（5 秒）会导致误判，太长（60 秒）会让用户等待太久。

### 4. 文档化所有配置

代理配置、HOSTS 条目、超时参数都应该有文档。否则三个月后你就不记得为什么这样配置了。

## 后续改进

1. **自动健康检查**：每 10 分钟检查一次各节点网络状态
2. **告警集成**：网络故障自动通知
3. **回退机制**：代理失效时的自动降级

---

*本文使用 AI 辅助起草，并经过独立模型审稿。数据来自实际的生产环境排查记录。*
