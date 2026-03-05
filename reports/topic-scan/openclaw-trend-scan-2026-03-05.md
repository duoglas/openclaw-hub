# OpenClaw 话题趋势扫描（近 7 天）

- 扫描时间：2026-03-05（Asia/Shanghai）
- 时间窗口：2026-02-27 ~ 2026-03-05
- 证据口径：仅使用可验证公开来源（官方仓库提交、GitHub Issues/Discussions、已公开中文社区讨论）
- 数据获取说明：本轮运行环境未提供 `web_search` 能力，已按“可验证优先”改用 GitHub CLI + 本地官方仓库 commit 记录；未使用不可验证二手传闻。

---

## 一、近 7 天趋势结论（可验证）

### 趋势 1：**“上下文压缩（compaction）期的可靠性”成为新的高频痛点**
- 用户侧表现：卡顿、无反馈、偶发吞消息。
- 证据：
  - #35522 User message sent during compaction is silently dropped（竞态导致静默丢消息）  
    https://github.com/openclaw/openclaw/issues/35522
  - #35545 no feedback during context auto-compaction（10-30s“假死感”）  
    https://github.com/openclaw/openclaw/issues/35545
  - 相关修复方向（近 7 天提交）：`c8b45a4c5`、`de9031da2`

### 趋势 2：**v2026.3.2 升级后“工具调用/本地模型”兼容反馈密集**
- 用户侧表现：工具调用语法失败、行为回归、迁移预期不一致。
- 证据：
  - #35347 Invalid diff: now finding less tool calls（本地 llama/qwen 场景）  
    https://github.com/openclaw/openclaw/issues/35347
  - #35350 Built-in file read/execute tools missing in v3.2 compared to v3.1  
    https://github.com/openclaw/openclaw/issues/35350
  - #35436 Ollama bootstrap context/KvSize 固定导致低内存机器不可用  
    https://github.com/openclaw/openclaw/issues/35436

### 趋势 3：**会话状态一致性（模型切换/heartbeat/路由继承）持续暴露边界问题**
- 用户侧表现：切模型后上下文上限“卡死”、心跳消息投递到错误渠道。
- 证据：
  - #35372 Session contextTokens stuck after model switch  
    https://github.com/openclaw/openclaw/issues/35372
  - #35300 Webchat heartbeat delivered to Feishu（路由继承错误）  
    https://github.com/openclaw/openclaw/issues/35300
  - 相关修复提交：`627813aba`（heartbeat scope）、`b4e4e25e7` / `8a7d1aa97`（route inheritance）

### 趋势 4：**Telegram/Feishu 等渠道“配置 schema 与真实能力不一致”引发配置级报错**
- 用户侧表现：明明文档里有字段，配置却被 strict schema 拒绝。
- 证据：
  - #35497 Telegram actions schema missing editMessage/createForumTopic  
    https://github.com/openclaw/openclaw/issues/35497
  - #35560 doctor 注入 orphan keys 污染 telegram 多账号配置  
    https://github.com/openclaw/openclaw/issues/35560
  - #35556 Feishu 普通消息发送在卡片消息后失败  
    https://github.com/openclaw/openclaw/issues/35556

### 趋势 5：**部署趋势从“能跑”转向“可观测 + 可恢复 + 降级治理”**
- 证据（讨论热度 + 功能诉求）：
  - #1949 Burning through tokens（成本/配额治理）  
    https://github.com/openclaw/openclaw/discussions/1949
  - #32815 v2026.3.2 后权限/工具能力异常（升级后运维感知）  
    https://github.com/openclaw/openclaw/discussions/32815
  - #35069 请求“真实安全基线”文档（生产化诉求上升）  
    https://github.com/openclaw/openclaw/discussions/35069
  - docs/security 近 7 天持续修订（如 `2cd3be896`, `b1a735829`）

---

## 二、可写选题池（6 个）

### 选题 A
- 题目：OpenClaw v2026.3.2 升级后 7 大回归与修复清单（含可执行命令）
- 关键词：openclaw 2026.3.2 regression, invalid diff tool calls, contextTokens stuck
- 用户意图：升级后“配置没变但行为变了”，要快速恢复服务
- 目标读者：自托管用户、DevOps、技术运营
- 证据锚点：#35347 #35372 #35350 #35497 #35300

### 选题 B
- 题目：Compaction 不是黑盒：如何避免上下文压缩窗口吞消息
- 关键词：openclaw compaction race condition, silent drop, compaction observability
- 用户意图：解释“偶发不回”的系统根因并给出止血手段
- 目标读者：机器人管理员、SRE
- 证据锚点：#35522 #35545 + `c8b45a4c5`

### 选题 C
- 题目：OpenClaw 渠道路由边界指南：heartbeat、binding、session key 一次讲透
- 关键词：openclaw heartbeat routing, session key inheritance, feishu webchat
- 用户意图：避免跨渠道误投和重试队列污染
- 目标读者：多渠道部署团队
- 证据锚点：#35300 + `627813aba` `b4e4e25e7`

### 选题 D
- 题目：Telegram 论坛话题（topic）配置实战：从 schema 报错到稳定路由
- 关键词：openclaw telegram createForumTopic editMessage schema strict
- 用户意图：修正 forum/topic 相关配置后让机器人稳定可用
- 目标读者：Telegram 社群运营者
- 证据锚点：#35497 #35399 #35466

### 选题 E
- 题目：OpenClaw 本地模型（Ollama/llama.cpp）稳态运行手册：内存、工具、降级
- 关键词：openclaw ollama num_ctx, llama.cpp grammar, local model reliability
- 用户意图：在低成本本地部署下提高成功率
- 目标读者：本地模型玩家、个人开发者
- 证据锚点：#35436 #35347 #35398

### 选题 F
- 题目：从“日志可见”到“用户可见”：给 OpenClaw 建立交付结果回执机制
- 关键词：openclaw delivery receipt, fallback message, observability checklist
- 用户意图：减少“后台失败但用户无感知”场景
- 目标读者：产品/运维一体团队
- 证据锚点：#35557 #35545 #35522

---

## 三、本轮落地选题（已写入仓库）

已选：**选题 A**

发布文件：
- 中文：`src/content/blog/zh/openclaw-2026-3-2-upgrade-regressions-and-fixes.md`
- 英文：`src/content/blog/en/openclaw-2026-3-2-upgrade-regressions-and-fixes.md`

文章定位：
- 强证据（issue/commit）
- 强动作（按“先止血、再定位、再修复”给命令）
- 不做未证实结论

---

## 四、站内内链更新建议（已更新建议）

### 建议新增入口页（高优先）
1. `/zh/blog/openclaw-logs-debug-guide/` → 新文（升级后回归总表）
2. `/en/blog/openclaw-logs-debug-guide/` → 新文
3. `/zh/blog/openclaw-telegram-troubleshooting-guide/` → 新文
4. `/en/blog/openclaw-telegram-troubleshooting-guide/` → 新文
5. `/zh/blog/openclaw-delivery-reliability-silent-loss-replay-fix-2026/` → 新文
6. `/en/blog/openclaw-delivery-reliability-silent-loss-replay-fix-2026/` → 新文

### 锚文本建议
- 中文：
  - “v2026.3.2 升级后 7 大回归修复清单”
  - “升级后常见报错与回退策略”
- 英文：
  - “v2026.3.2 regression checklist and fixes”
  - “post-upgrade troubleshooting playbook”

### 内链结构建议
- 旧文向新文导流（故障入口）
- 新文反链回“日志排查 / Telegram 排障 / 交付可靠性”三篇基础文，形成闭环
- 每页至少 1 条正文内链接，不仅页尾“相关阅读”
