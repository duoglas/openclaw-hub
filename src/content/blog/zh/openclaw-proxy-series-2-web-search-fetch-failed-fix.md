---
title: "OpenClaw 代理系列(2)：`web_search` 报 `fetch failed` 的排查与修复指南（2026）"
description: "面向用户的实战排查手册：当 OpenClaw 的 web_search/web_fetch 出现 fetch failed 时，如何快速定位、修复并配置稳定 fallback。"
pubDate: 2026-03-02
tags: ["openclaw", "proxy", "web_search", "fetch failed", "troubleshooting", "systemd"]
category: "guide"
lang: "zh"
---

> 适用场景：你已经给 OpenClaw 配了代理，但 `web_search` / `web_fetch` 仍频繁报 `fetch failed`。

这篇是**可直接照做**的排查文档，目标是：
- 先恢复可用（止血）
- 再定位根因
- 最后补上长期稳定策略

---

## 一、故障特征（先判断是否同类问题）

你如果遇到以下现象，基本可以按本文处理：

- `web_search` 偶发或持续 `fetch failed`
- `web_fetch` 也不稳定
- Telegram/QQ 等通道看起来在线，但联网检索能力异常
- 同机有些请求能通，有些请求不通（表现“玄学”）

---

## 二、5 分钟快速止血

先别深挖，先让检索恢复：

1) 保留主路径：`web_search`  
2) 增加兜底：失败后自动走浏览器搜索  
3) 对用户输出统一模板：
   - 原因
   - 已做恢复动作
   - 是否需要人工介入

这样可以避免用户直接看到 `fetch failed`。

---

## 三、标准排查路径（按顺序做）

### Step 1：确认服务在线与基础状态

```bash
openclaw status
openclaw gateway status
```

### Step 2：区分“API不可达”还是“运行时链路问题”

在同机做对照测试：

- Python `requests` 请求目标 API（如 Brave）
- OpenClaw `web_search` 请求同目标

如果 Python 可通但 `web_search` 失败，优先怀疑：
**Node fetch/undici + 代理链路**。

### Step 3：检查 systemd 服务代理环境

查看 gateway service 与 drop-in：

```bash
systemctl --user cat openclaw-gateway.service
```

确认至少存在：
- `HTTP_PROXY`
- `HTTPS_PROXY`
- `ALL_PROXY`
- `NO_PROXY`

### Step 4：关键修复项（高概率根因）

在 drop-in 增加：

```ini
Environment="NODE_USE_ENV_PROXY=1"
```

完整示例（`~/.config/systemd/user/openclaw-gateway.service.d/proxy.conf`）：

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

### Step 5：回归验证

```bash
openclaw status
# 再实际执行一次 web_search
```

通过标准：
- `web_search` 能稳定返回结果
- 不再出现连续 `fetch failed`

---

## 四、为什么会这样（根因解释）

该类问题常见根因不是 API Key，也不是 DNS，而是：

> OpenClaw 的联网工具走 Node `fetch`（undici），在某些运行方式下仅设置代理环境变量还不够，需要显式启用 `NODE_USE_ENV_PROXY=1`，否则会出现超时/重置并表现为 `fetch failed`。

---

## 五、长期稳态建议（避免复发）

1) **工具兜底**：`web_search` 失败自动降级浏览器搜索  
2) **错误规范**：禁止直接返回裸错误  
3) **健康巡检**：每天检查一次 gateway 状态与最近错误  
4) **变更留痕**：所有 proxy/systemd 改动写入变更日志

---

## 六、FAQ

### Q1：我已经配置了 HTTP_PROXY，为什么还是失败？
A：先检查是否启用了 `NODE_USE_ENV_PROXY=1`，并确认重载重启已生效。

### Q2：为什么 Telegram 在线但搜索失败？
A：消息通道在线 ≠ 联网检索链路健康。两条链路要分别验证。

### Q3：修复后还偶发失败怎么办？
A：先开 fallback（browser），再做重试+退避策略，不要把瞬时故障直接暴露给用户。

---

## 相关文章

- [OpenClaw Telegram 集成成功但不回复：Webhook / 409 / 权限完整排查（2026）](/zh/blog/openclaw-telegram-integration-no-reply-fix-checklist-2026/)
- [OpenClaw 日志排查指南：从报错到根因定位](/zh/blog/openclaw-logs-debug-guide/)
- [OpenClaw 模型回退链配置指南](/zh/blog/openclaw-model-fallback-strategy/)
