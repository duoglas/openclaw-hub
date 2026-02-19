---
title: "OpenClaw config.yaml 配置详解与常见报错修复（2026）"
description: "系统讲解 OpenClaw config.yaml 的核心结构、必填字段、模型路由、插件白名单配置，并逐一排查 schema 校验失败、provider 连接超时、channel 启动报错等高频问题。"
pubDate: 2026-02-19
tags: ["openclaw", "config", "yaml", "troubleshooting", "guide", "模型配置", "教程"]
category: "guide"
lang: "zh"
---

OpenClaw 的一切行为都由一份 `config.yaml` 驱动。配错一个字段，gateway 直接起不来；漏掉一个 key，模型调用全部 timeout。这篇文章带你**从结构到排错**，把 config.yaml 彻底搞明白。

## config.yaml 在哪？

```bash
# 默认位置
~/.openclaw/config.yaml

# 查看当前加载的配置
openclaw gateway config
```

如果你用 systemd 管理 OpenClaw，配置路径取决于你 service 文件里的 `WorkingDirectory`。

## 核心结构一览

```yaml
# 最小可运行配置
gateway:
  mode: local          # local | remote
  port: 18789

providers:
  - id: anthropic
    kind: anthropic
    apiKey: sk-ant-xxx

models:
  default: anthropic/claude-sonnet-4-5
  fallbacks:
    - anthropic/claude-sonnet-4-5

plugins:
  allow: []            # 插件白名单

channels: []           # 消息渠道（Telegram、Discord 等）
```

下面逐块讲解。

---

## 一、gateway 配置

| 字段 | 必填 | 说明 |
|------|------|------|
| `mode` | ✅ | `local`（仅本机访问）或 `remote`（外部可达） |
| `port` | ❌ | 默认 `18789` |

**常见报错：**

```
Error: invalid gateway.mode "Local"
```

**原因：** mode 值区分大小写，必须是小写 `local` 或 `remote`。

```
Error: EADDRINUSE :::18789
```

**修复：**

```bash
# 查看谁占了端口
sudo lsof -i :18789
# 杀掉或换端口
kill -9 <PID>
```

---

## 二、providers — 模型提供商

每个 provider 需要 `id`、`kind` 和认证信息：

```yaml
providers:
  - id: anthropic
    kind: anthropic
    apiKey: sk-ant-api03-xxx

  - id: openai
    kind: openai
    apiKey: sk-xxx

  - id: google
    kind: google
    apiKey: AIzaSy-xxx

  - id: minimax
    kind: openai-compatible
    apiKey: your-key
    baseUrl: https://api.minimax.chat/v1
```

### 高频报错

**1. `Provider "anthropic" authentication failed`**

```bash
# 验证 key 是否有效
curl -s https://api.anthropic.com/v1/messages \
  -H "x-api-key: $YOUR_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -H "content-type: application/json" \
  -d '{"model":"claude-sonnet-4-5-20250514","max_tokens":10,"messages":[{"role":"user","content":"hi"}]}'
```

如果返回 `authentication_error`，key 已失效，去 [Anthropic Console](https://console.anthropic.com/) 重新生成。

**2. `connect ETIMEDOUT` / `fetch failed`**

国内服务器访问 Anthropic/OpenAI 需要代理：

```bash
# 方式一：环境变量
export HTTPS_PROXY=http://127.0.0.1:7890

# 方式二：proxychains（参考本站代理配置教程）
proxychains openclaw gateway start
```

> 💡 **部署建议：** 海外 VPS 不需要代理，直连速度最快。推荐 [Vultr](https://www.vultr.com/?ref=7566454)（按小时计费、机房多）或 [DigitalOcean](https://m.do.co/c/0090e7c2aec0)（$200 免费额度）。国内云推荐 [腾讯云轻量](https://curl.qcloud.com/1PS2iJEg)，香港/新加坡节点可直连 API。

**3. `429 Too Many Requests`**

Anthropic 有严格的速率限制（RPM / TPM）。配置 fallback 模型自动降级：

```yaml
models:
  default: anthropic/claude-opus-4-6
  fallbacks:
    - openai/gpt-5.3-codex
    - minimax/MiniMax-M2.1
    - google/gemini-3-pro
```

当主模型限流时，OpenClaw 自动切换到下一个可用模型。

---

## 三、models — 模型路由

```yaml
models:
  default: anthropic/claude-sonnet-4-5    # 默认模型
  fallbacks:                                # 降级链
    - openai/gpt-5.3-codex
    - google/gemini-3-flash
```

**格式：** `provider-id/model-name`

**常见错误：**

```
Error: model "claude-sonnet-4-5" not found — did you mean "anthropic/claude-sonnet-4-5"?
```

必须带 provider 前缀。provider id 是你在 `providers` 里定义的 `id` 字段。

---

## 四、plugins — 插件与安全

```yaml
plugins:
  allow:
    - web_search
    - web_fetch
    - exec
    - browser
```

`plugins.allow` 是**白名单**机制：只有列出的插件才能被 agent 调用。留空 `[]` 表示禁用所有插件。

**排查：**

如果 agent 说"我没有权限使用 xxx 工具"：

```bash
# 查看当前生效配置
openclaw gateway config | grep -A 20 plugins
```

确认目标工具在 `allow` 列表里。

---

## 五、channels — 消息渠道

### Telegram

```yaml
channels:
  - kind: telegram
    token: "123456:ABC-xxx"
    allowedUsers:
      - "your_telegram_user_id"
```

**常见问题：**

```
Error: 409 Conflict: terminated by other getUpdates request
```

**原因：** 有另一个进程（或另一个 OpenClaw 实例）在用同一个 bot token 轮询。

**修复：**

```bash
# 确认只有一个 gateway 在运行
ps aux | grep openclaw
# 杀掉多余的
kill <多余的PID>
```

```
Error: 401 Unauthorized
```

Token 无效。去 [@BotFather](https://t.me/BotFather) 重新 `/token`。

### 企业微信 (WeCom)

```yaml
channels:
  - kind: wecom
    corpId: "ww-xxx"
    agentId: 1000002
    secret: "xxx"
    token: "xxx"
    encodingAESKey: "xxx"
```

**常见问题：** 回调 URL 验证失败 — 确认服务器能被企业微信回调（需公网 IP 或内网穿透）。

### Discord

```yaml
channels:
  - kind: discord
    token: "MTxx.xxx"
    allowedGuilds:
      - "guild-id"
```

---

## 六、完整配置校验

OpenClaw 启动时会自动校验 config.yaml。手动校验：

```bash
openclaw gateway start --dry-run 2>&1 | head -20
```

常见 schema 错误：

**1. YAML 缩进错误**

```
YAMLException: bad indentation of a mapping entry
```

YAML 只接受空格缩进，**不能用 Tab**。用编辑器显示不可见字符排查：

```bash
cat -A ~/.openclaw/config.yaml | grep -n $'\t'
```

**2. 字段拼写错误**

```
Error: unknown field "chanels" in config
```

拼错了。`channels` 不是 `chanels`。schema 校验会告诉你哪行出了问题。

**3. 类型错误**

```
Error: "port" must be a number, got string
```

```yaml
# ❌ 错误
port: "18789"

# ✅ 正确
port: 18789
```

---

## 七、调试技巧

### 查看完整运行日志

```bash
# 前台运行，实时看日志
openclaw gateway start --foreground

# 如果用 systemd
journalctl -u openclaw -f --no-pager
```

### 只测试某个 provider

```bash
# 用 curl 直接测 API
curl -s https://api.anthropic.com/v1/messages \
  -H "x-api-key: YOUR_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -H "content-type: application/json" \
  -d '{"model":"claude-sonnet-4-5-20250514","max_tokens":10,"messages":[{"role":"user","content":"ping"}]}'
```

### 重载配置（不重启）

```bash
openclaw gateway restart
```

OpenClaw 支持热重载，改完配置后 restart 即可，不会丢失当前会话。

---

## 总结清单

开始排错前，先过一遍：

- ✅ YAML 格式正确（空格缩进，无 Tab）
- ✅ 所有 provider 的 apiKey 有效且未过期
- ✅ 模型名格式为 `provider-id/model-name`
- ✅ `plugins.allow` 包含需要的工具
- ✅ channel token 正确且没有重复轮询
- ✅ 海外 API 的网络连通性（代理或海外 VPS）

> 📖 **更多 OpenClaw 教程：** 查看本站 [OpenClaw 部署指南](/zh/blog/openclaw-vps-deployment-complete-guide) 和 [Telegram 集成教程](/zh/blog/openclaw-telegram-troubleshooting-guide)。

---

*遇到本文没覆盖的问题？来 [OpenClaw Discord 社区](https://discord.com/invite/clawd) 提问，或在 [GitHub](https://github.com/openclaw/openclaw) 提 Issue。*
