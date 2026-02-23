---
title: "OpenClaw 配置文件详解与常见报错修复（2026）"
description: "系统讲解 OpenClaw openclaw.json 配置文件的核心结构、必填字段、模型路由、插件白名单配置，并逐一排查 schema 校验失败、provider 连接超时、channel 启动报错等高频问题。"
pubDate: 2026-02-19
updatedDate: 2026-02-23
tags: ["openclaw", "config", "配置", "troubleshooting", "guide", "模型配置", "教程"]
category: "guide"
lang: "zh"
---

OpenClaw 的一切行为都由一份 `openclaw.json` 驱动。配错一个字段，gateway 直接起不来；漏掉一个 key，模型调用全部 timeout。这篇文章带你**从结构到排错**，把配置文件彻底搞明白。

## 配置文件在哪？

```bash
# 默认位置
~/.openclaw/openclaw.json

# 查看当前配置的某个值
openclaw config get gateway
openclaw config get providers
```

如果你用 systemd 管理 OpenClaw，配置路径取决于运行用户的 `$HOME` 目录。

> **注意：** OpenClaw 使用 JSON 格式的配置文件，不是 YAML。JSON 不允许注释和尾逗号。

## 核心结构一览

```json
{
  "gateway": {
    "mode": "local",
    "port": 18789
  },
  "providers": {
    "anthropic": {
      "apiKey": "sk-ant-api03-xxx"
    }
  },
  "models": {
    "default": "anthropic/claude-sonnet-4-5",
    "fallbacks": ["anthropic/claude-sonnet-4-5"]
  },
  "plugins": {
    "allow": []
  },
  "channels": {}
}
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

每个 provider 需要对应的认证信息：

```json
{
  "providers": {
    "anthropic": {
      "apiKey": "sk-ant-api03-xxx"
    },
    "openai": {
      "apiKey": "sk-xxx"
    },
    "google": {
      "apiKey": "AIzaSy-xxx"
    }
  }
}
```

对于 OpenAI 兼容的自定义 provider，可指定 `baseUrl`。

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

# 方式二：proxychains
proxychains openclaw gateway start
```

> 💡 **部署建议：** 海外 VPS 不需要代理，直连速度最快。推荐 [Vultr](https://www.vultr.com/?ref=7566454)（按小时计费、机房多）或 [DigitalOcean](https://m.do.co/c/0090e7c2aec0)（$200 免费额度）。国内云推荐 [腾讯云轻量](https://curl.qcloud.com/1PS2iJEg)，香港/新加坡节点可直连 API。

**3. `429 Too Many Requests`**

Anthropic 有严格的速率限制（RPM / TPM）。配置 fallback 模型自动降级：

```json
{
  "models": {
    "default": "anthropic/claude-opus-4-6",
    "fallbacks": [
      "openai/gpt-5.3-codex",
      "google/gemini-3-pro"
    ]
  }
}
```

当主模型限流时，OpenClaw 自动切换到下一个可用模型。

---

## 三、models — 模型路由

```json
{
  "models": {
    "default": "anthropic/claude-sonnet-4-5",
    "fallbacks": [
      "openai/gpt-5.3-codex",
      "google/gemini-3-flash"
    ]
  }
}
```

**格式：** `provider-id/model-name`

**常见错误：**

```
Error: model "claude-sonnet-4-5" not found — did you mean "anthropic/claude-sonnet-4-5"?
```

必须带 provider 前缀。provider id 是你在 `providers` 里定义的键名。

---

## 四、plugins — 插件与安全

```json
{
  "plugins": {
    "allow": [
      "web_search",
      "web_fetch",
      "exec",
      "browser"
    ]
  }
}
```

`plugins.allow` 是**白名单**机制：只有列出的插件才能被 agent 调用。留空 `[]` 表示禁用所有插件。

**排查：**

如果 agent 说"我没有权限使用 xxx 工具"：

```bash
openclaw config get plugins
```

确认目标工具在 `allow` 列表里。

---

## 五、channels — 消息渠道

### Telegram

```json
{
  "channels": {
    "telegram": {
      "token": "123456:ABC-xxx",
      "allowedUsers": ["your_telegram_user_id"]
    }
  }
}
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

### Discord

配置方式类似，通过 `openclaw configure` 交互式设置最简单。

---

## 六、完整配置校验

OpenClaw 启动时会自动校验配置。手动诊断：

```bash
# 自动诊断
openclaw doctor

# 验证 JSON 格式
python3 -m json.tool ~/.openclaw/openclaw.json
```

常见 JSON 错误：

**1. 尾逗号**

```
SyntaxError: Unexpected token } in JSON at position 423
```

JSON 不允许尾逗号：

```json
{
  "gateway": {
    "mode": "local",
    "port": 18789
  }
}
```

最后一个属性后面**不能有逗号**。

**2. 字段拼写错误**

```
Error: unknown field "chanels" in config
```

拼错了。`channels` 不是 `chanels`。

**3. 类型错误**

```
Error: "port" must be a number, got string
```

```json
// ❌ 错误
"port": "18789"

// ✅ 正确
"port": 18789
```

---

## 七、调试技巧

### 查看完整运行日志

```bash
# 实时查看日志
openclaw logs --follow

# 如果用 systemd
journalctl -u openclaw -f --no-pager
```

### 只测试某个 provider

```bash
curl -s https://api.anthropic.com/v1/messages \
  -H "x-api-key: YOUR_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -H "content-type: application/json" \
  -d '{"model":"claude-sonnet-4-5-20250514","max_tokens":10,"messages":[{"role":"user","content":"ping"}]}'
```

### 重载配置

```bash
openclaw gateway restart
```

改完配置后 restart 即可，不会丢失当前会话。

---

## 总结清单

开始排错前，先过一遍：

- ✅ JSON 格式正确（无尾逗号、无注释）
- ✅ 所有 provider 的 apiKey 有效且未过期
- ✅ 模型名格式为 `provider-id/model-name`
- ✅ `plugins.allow` 包含需要的工具
- ✅ channel token 正确且没有重复轮询
- ✅ 海外 API 的网络连通性（代理或海外 VPS）

> 📖 **更多 OpenClaw 教程：** 查看本站 [OpenClaw 部署指南](/zh/blog/openclaw-vps-deployment-complete-guide) 和 [Telegram 集成教程](/zh/blog/openclaw-telegram-troubleshooting-guide)。

---

*遇到本文没覆盖的问题？来 [OpenClaw Discord 社区](https://discord.com/invite/clawd) 提问，或在 [GitHub](https://github.com/openclaw/openclaw) 提 Issue。*
