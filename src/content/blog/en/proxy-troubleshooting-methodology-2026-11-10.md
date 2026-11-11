---
title: "Proxy Path Troubleshooting Methodology: From SSH Disconnection to Root Cause Analysis"
description: "Documenting the complete proxy path troubleshooting process in an AI infrastructure. Tailscale disconnections, SSH timeouts, SOCKS5 proxy vs direct connection differentiation, and how to use layered methods to locate root causes."
pubDate: 2026-11-10
updatedDate: 2026-11-10
tags: ["networking", "proxy", "troubleshooting", "infrastructure", "ssh"]
category: "tutorial"
lang: "en"
---

## Background

When maintaining a multi-node AI infrastructure, network issues are the most common blockers. We have three servers distributed across different network environments, meshed via Tailscale, providing AI API proxy services.

In September 2026, one server was **disconnected for 4.5 hours**, during which all services depending on it were unavailable. The troubleshooting process took significant time, and we ultimately developed a **reusable layered troubleshooting methodology**.

## Layered Troubleshooting Framework

We developed a 4-layer framework, isolating from physical to application layer:

```
Physical -> Network -> Proxy -> Application
   ->        ->        ->        ->
Hardware  Routing  Config   Services
```

### Layer 1: Physical Layer

**Symptoms:** Completely unreachable via ping

**Troubleshooting steps:**
1. `ping` test (basic connectivity)
2. `ifconfig` / `ip addr` (network card status)
3. System logs: `dmesg | grep -i error` (hardware errors)

**Real case:** Our issue was with the network card driver. The server used an E1000 network card, and `Tx Unit Hang` is a known problem. The solution was disabling TSO/GSO features:

```bash
# Permanent disable
sudo ip link set eth0 tx off
sudo ip link set eth0 gro off
sudo ip link set eth0 gso off

# Configure systemd service for automatic application
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

### Layer 2: Network Layer

**Symptoms:** Ping reachable but SSH timeouts

**Troubleshooting steps:**
1. `ping -c 10` (packet loss rate)
2. `traceroute` (routing path)
3. `tailscale status` (Tailscale status)

**Real case:** Our three servers are meshed via Tailscale, but Tailscale defaults to DERP relay. When the direct path is broken, DERP latency is extremely high (300+ ms).

**Solution:**
- Set timeout on SSH connections: `ssh -o ConnectTimeout=25`
- Retry on failure: `ssh -o ConnectTimeout=25 -o StrictHostKeyChecking=no`
- If consecutive failures, check Tailscale peer status: `ssh peer 'tailscale status'`

### Layer 3: Proxy Layer

**Symptoms:** Service reachable but API requests fail

**Troubleshooting steps:**
1. `curl -v https://api.example.com` (test direct connection)
2. Check environment variables: `echo $HTTP_PROXY $HTTPS_PROXY`
3. Check hosts file: `cat /etc/hosts`

**Real case:** This is the most complex layer. We use multiple proxy strategies simultaneously:

```bash
# Scenario 1: AI API requests via SOCKS5 proxy
export HTTP_PROXY=http://127.0.0.1:8016
export HTTPS_PROXY=http://127.0.0.1:8016

# Scenario 2: Some services need direct connection (no proxy)
export NO_PROXY="localhost,127.0.0.1,10.0.0.0/8,172.16.0.0/12,192.168.0.0/16"

# Scenario 3: Tavily API direct (bypassing failed Hikari proxy)
export TAVILY_API_BASE_URL=https://api.tavily.com
export TAVILY_API_KEY=tvly-xxx
```

**Key findings:**
- **Proxy configuration can\'t be one-size-fits-all**: Different services need different proxy strategies
- **NO_PROXY boundaries**: AI API domains must NOT be added to NO_PROXY, otherwise requests will timeout
- **HOSTS file**: Some domains need fixed IPs (like `ai.google.dev`), but be careful with privacy

### Layer 4: Application Layer

**Symptoms:** Network normal but services unavailable

**Troubleshooting steps:**
1. Check process status: `systemctl status service-name`
2. Check logs: `journalctl -u service-name`
3. Check port listening: `netstat -tlnp | grep port`

## Practical Troubleshooting Command Cheat Sheet

```bash
# 1. Layered testing
ping -c 3 target
curl -o /dev/null -s -w "%{http_code}" https://api.example.com
ss -tlnp | grep :8016

# 2. Proxy testing
curl -x http://127.0.0.1:8016 https://api.example.com
curl -x socks5h://127.0.0.1:8016 https://api.example.com

# 3. Latency testing
time curl -o /dev/null -s https://api.example.com

# 4. TLS testing
openssl s_client -connect api.example.com:443 -servername api.example.com
```

## Core Lessons

### 1. Layered troubleshooting is 10x more efficient than blind trial-and-error

Each time something breaks, first determine which layer has the problem, then troubleshoot specifically. Don\'t go from application layer all the way down to physical layer.

### 2. Proxy configuration follows the "least privilege" principle

Give each service only the proxy configuration it needs. Global `HTTP_PROXY` settings cause all requests to go through proxy, including those that shouldn\'t.

### 3. Timeout settings are mandatory

`ConnectTimeout=25` is an empirical value. Too short (5 seconds) causes false judgments, too long (60 seconds) makes users wait too long.

### 4. Document all configurations

Proxy settings, HOSTS entries, timeout parameters should all have documentation. Otherwise three months later you won\'t remember why it was configured this way.

## Future Improvements

1. **Automated health checks**: Check network status for each node every 10 minutes
2. **Alert integration**: Automatic notification on network failures
3. **Fallback mechanisms**: Automatic degradation when proxy fails

---

*AI-assisted drafting with a separate model review. Data from actual production environment troubleshooting records.*
