---
title: "OpenClaw 代理系列(2)：`web_search` 一直 fetch failed？我把锅从 API Key 甩到了 Node（并修好了）"
description: "真实故障复盘：为什么同机 Python 能通、OpenClaw 的 web_search 却一直 fetch failed。包含现象、排查路径、根因定位、最终修复（NODE_USE_ENV_PROXY=1）和浏览器 fallback 方案。"
pubDate: 2026-03-02
tags: ["openclaw", "proxy", "web_search", "fetch failed", "troubleshooting", "systemd"]
category: "guide"
lang: "zh"
---

> 系列说明：
> - 第 1 篇讲的是：在 systemd 服务里配置代理，让 OpenClaw 能访问 Claude / OpenAI / Google。
> - 这篇第 2 篇讲的是：**明明代理配了，为什么 `web_search` 还是 `fetch failed`**。

今天这个问题很“阴间”：

- 你看到的报错：`fetch failed`
- 体感：像是 API 挂了 / key 失效
- 实际：都不是

最后根因是：**Gateway 进程里的 Node fetch（undici）默认没按你想象那样吃系统代理环境变量**。

一句话结论：

✅ 在 systemd 的 OpenClaw 服务环境里加 `NODE_USE_ENV_PROXY=1`，重启后恢复。  
✅ 同时给搜索链路加 fallback：`web_search` 失败就走浏览器搜索，不再裸报错。

---

## 1) 故障现象（用户视角）

- 多个任务连续出现 `fetch failed`
- `web_search` / `web_fetch` 都失败
- 但 Telegram/QQ 等消息通道多数还在线
- cron 任务偶发成功、偶发失败，导致看起来“玄学”

这类问题最容易误判成：

1. Brave key 过期
2. DNS 挂了
3. 外网断了

结果都不是。

---

## 2) 我怎么排查的（按真实顺序）

### Step A：先验证“是不是 API 本身坏了”

同机做两组请求：

- Python `requests` 请求 Brave API：**200 OK**
- OpenClaw 内 `web_search`：**fetch failed**

这一步已经很关键：

> API 和网络并非完全不可达，问题更像是“**不同 HTTP 客户端路径行为不一致**”。

### Step B：做最小复现（Node fetch）

我用 Node 直接 `fetch` 测了多个域名（Brave/Telegram/Google），出现：

- `ETIMEDOUT`
- `ECONNRESET`
- `UND_ERR_CONNECT_TIMEOUT`

这时怀疑点收敛到：**Node fetch / undici + 代理链路**。

### Step C：验证 systemd 环境

`openclaw-gateway.service` 的 drop-in 里确实有：

- `HTTP_PROXY`
- `HTTPS_PROXY`
- `ALL_PROXY`

看起来“都配了”，但还不够。

### Step D：关键实验

临时加环境变量后再测：

```bash
NODE_USE_ENV_PROXY=1 node -e 'fetch("https://api.search.brave.com/res/v1/web/search?q=OpenClaw&count=1", {headers:{"X-Subscription-Token":"..."}}).then(r=>console.log(r.status)).catch(console.error)'
```

结果：**200**。

根因坐实。

---

## 3) 根因（Root Cause）

不是 key，不是 DNS，不是目标网站挂了。

是这条：

> OpenClaw Gateway 运行在 Node 环境中，工具层 `web_search/web_fetch` 走 `fetch(undici)`。在当前运行方式下，仅设置 `HTTP_PROXY/HTTPS_PROXY` 还不够，必须显式启用 `NODE_USE_ENV_PROXY=1`，否则 Node fetch 不稳定/不走代理，最终表现为 `fetch failed`。

---

## 4) 修复方案（可直接抄）

编辑 systemd drop-in：

`~/.config/systemd/user/openclaw-gateway.service.d/proxy.conf`

```ini
[Service]
Environment="HTTP_PROXY=http://192.168.136.1:8016"
Environment="HTTPS_PROXY=http://192.168.136.1:8016"
Environment="ALL_PROXY=http://192.168.136.1:8016"
Environment="NO_PROXY=127.0.0.1,localhost,::1"
Environment="NODE_USE_ENV_PROXY=1"
```

重载并重启：

```bash
systemctl --user daemon-reload
systemctl --user restart openclaw-gateway.service
```

验证：

```bash
openclaw status
# 然后实际触发一次 web_search
```

恢复标准：`web_search` 能稳定返回结果，不再出现连续 `fetch failed`。

---

## 5) 兜底策略：web_search 失败时自动 fallback

修复后仍建议做兜底，不要让用户看到生硬错误。

推荐策略：

1. 先走 `web_search`
2. 失败时自动切 browser 搜索
3. 返回结构化结果（标题 / 链接 / 摘要）
4. 仅在两条链路都失败时才提示人工介入

也就是说：

❌ 别直接回 `fetch failed`  
✅ 回「已自动重试 + 原因 + 现在可用的替代结果 + 是否需你介入」

---

## 6) 这次复盘的 3 个工程教训

### 1) “同机能通”不等于“同进程能通”

Python 通，不代表 Node 通；Shell 通，不代表 systemd 服务通。

### 2) 先做最小复现，比盲猜快十倍

先把问题压缩到一个 `node fetch` 命令，再讨论配置，效率最高。

### 3) 永远给关键能力做 fallback

搜索、发布、通知这些链路，必须“主路失败可切旁路”。

---

## 7) 给你的快速检查清单（30 秒版）

- [ ] `web_search` 是否最近频繁 `fetch failed`
- [ ] systemd drop-in 是否有 `NODE_USE_ENV_PROXY=1`
- [ ] `systemctl --user daemon-reload && restart` 是否执行
- [ ] 是否有 fallback（browser 或其他检索渠道）

---

如果你刚好也在做“代理 + OpenClaw + 多模型 + 多渠道”这套组合，这篇能帮你省至少半天。

下一篇（系列 3）我准备写：

**为什么“消息通道在线”≠“模型链路可用”，以及怎么做质量优先的任务调度（GLM 保活，高模型执行，失败延后不降级）。**
