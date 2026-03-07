---
title: "OpenClaw `web_search` 500 报错排障：工具同名冲突与参数约束修复（2026）"
description: "针对 OpenClaw 高频报错“Parameters of tool web_search must only have these properties:query”，给出可验证根因、止血步骤、长期治理方案与回归检查清单。"
pubDate: 2026-03-07
updatedDate: 2026-03-07
tags: ["openclaw", "web_search", "troubleshooting", "tool-calling", "500"]
category: "guide"
lang: "zh"
---

如果你在 OpenClaw 里遇到这条报错：

```text
500: "Parameters of tool web_search must only have these properties:query"
```

这篇就是给你 10–30 分钟内恢复可用的实战排障文。

> 本文只基于可验证证据：GitHub issue 讨论与可复现行为，不做臆测。

---

## 一、先说结论（给值班同学）

这类 500 往往不是“网络挂了”，而是**工具名与 provider-native 能力发生同名/参数契约冲突**，导致上游只接受 `query`，而 OpenClaw 侧传了更丰富参数（如 `search_lang` 等）后被拒。

- 直接证据：[#38517](https://github.com/openclaw/openclaw/issues/38517)
- 同期相关现象：[#38569](https://github.com/openclaw/openclaw/issues/38569)

---

## 二、3 步止血（先恢复回复能力）

## 1）确认是该类错误，而不是 token/网络问题

```bash
openclaw logs --follow
```

复现一次搜索请求。如果日志核心报错包含：

- `Parameters of tool web_search must only have these properties:query`

基本可归类为“工具参数 schema 冲突”。

你也可以先跑通用体检，排除基础故障：

```bash
openclaw status
openclaw gateway status --deep
openclaw doctor --deep
```

如果这些都健康，而搜索仍稳定报该 500，继续下一步。

## 2）短期降级：先避免触发冲突路径

在问题修复前，建议将涉及搜索的流程临时降级为：

- 关闭自动触发搜索工具的高频入口（例如某些模板 prompt）
- 对关键任务改为“人工确认后再搜索”
- 避免并发触发同类工具（减少连锁失败）

目标不是“优雅”，而是先把主链路可用性拉回来。

## 3）验证修复是否生效（必须做）

每次调整后都做同一条回归：

1. 发起同一问题 3 次
2. 观察是否仍出现该 500
3. 检查是否返回稳定文本结果而非空回复

---

## 三、为什么会这样（技术解释，非猜测版）

从 #38517 可见，报错来自“参数只允许 `query`”的严格校验。该模式通常意味着：

1. 请求被路由到 provider-native 的 `web_search` 语义；
2. 该端 schema 比 OpenClaw 工具 schema 更窄；
3. 同名导致调用路径混淆，最终触发 500。

这和“API key 错误（401/403）”“网络超时（timeout）”是两类问题，排查路径不同。

如需先排除通用错误类型，可对照这篇基础文：
- [OpenClaw 日志排查全攻略](/zh/blog/openclaw-logs-debug-guide/)

---

## 四、长期治理（避免下次再炸）

## 1）避免自定义工具与 provider-native 工具同名

命名策略建议：

- 不使用通用名 `web_search`
- 采用带前缀命名（如 `oc_web_search` 风格）
- 在团队内形成“工具命名保留字清单”

> 注意：具体改名应以官方后续修复方案为准；不要在生产直接打未评审补丁。

## 2）建立“工具调用契约回归测试”

升级前后固定回归这三类 case：

- 基础参数（只有 `query`）
- 扩展参数（如语言/时段/来源限制）
- 失败回退（报错是否被正确总结给用户）

## 3）把“用户可见回执”作为底线

即使工具失败，也应返回：

- 失败原因摘要（可读）
- 下一步建议（重试/降级/人工接管）

而不是静默无回复。

可结合：
- [Telegram 在线不回复 10 分钟排查](/zh/blog/openclaw-telegram-bot-online-no-reply-fix/)
- [OpenClaw Telegram 故障排查全指南](/zh/blog/openclaw-telegram-troubleshooting-guide/)

---

## 五、升级窗口建议（7 天内可落地）

1. 把搜索相关流程分级：关键链路禁自动搜索，普通链路允许降级。  
2. 每次升级后执行“工具契约 smoke test”（至少 5 条）。  
3. 日志监控新增关键字告警：`must only have these properties:query`。  
4. 故障 runbook 固化到团队文档，避免重复踩坑。

---

## 六、证据与延伸阅读

- #38517: 500 参数约束报错与复现  
  https://github.com/openclaw/openclaw/issues/38517
- #38569: 工具调用差异相关报错  
  https://github.com/openclaw/openclaw/issues/38569

站内延伸：
- [OpenClaw 日志排查全攻略](/zh/blog/openclaw-logs-debug-guide/)
- [OpenClaw Telegram 机器人在线但不回复排障](/zh/blog/openclaw-telegram-bot-online-no-reply-fix/)
- [OpenClaw `doctor --fix` vs `--repair` 安全修复指南](/zh/blog/openclaw-doctor-fix-vs-repair-safe-recovery-2026/)

---

**一句话总结**：
遇到这类 `web_search` 500，优先按“同名冲突 + 参数契约”路线排查，比先查网络/重装更省时间。