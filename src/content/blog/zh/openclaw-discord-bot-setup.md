---
title: "OpenClaw Discord 机器人完整配置教程（2026）"
description: "从零搭建 Discord AI 机器人！详解如何创建 Discord Application、配置 Bot Token、OpenClaw 集成配置、权限设置、频道管理、以及多服务器使用技巧。"
pubDate: 2026-02-21
tags: ["openclaw", "discord", "bot", "AI机器人", "教程", "聊天机器人"]
category: "guide"
lang: "zh"
---

想让 OpenClaw 进驻你的 Discord 服务器，成为 24/7 在线的 AI 助手？本教程手把手教你：

- ✅ 创建 Discord 机器人应用
- ✅ 获取 Bot Token 并配置权限
- ✅ OpenClaw 集成与测试
- ✅ 多服务器管理与隐私控制
- ✅ 常见问题排查

适合 Discord 服务器管理员和开发者。

---

## 一、创建 Discord Application

### 1. 访问开发者平台

打开 [Discord Developer Portal](https://discord.com/developers/applications)，登录你的 Discord 账号。

### 2. 创建新应用

1. 点击右上角 **"New Application"**
2. 输入应用名称（例如 `OpenClaw Bot`）
3. 同意服务条款，点击 **"Create"**

![创建应用示意](https://i.imgur.com/example.png)

### 3. 配置基本信息

在 **General Information** 页面：

- **Name**: 机器人显示名称（可修改）
- **Description**: 描述机器人功能
- **Avatar**: 上传头像（可选）
- **Tags**: 添加标签便于搜索（可选）

保存更改。

---

## 二、创建 Bot 并获取 Token

### 1. 进入 Bot 设置

左侧菜单点击 **"Bot"** → 点击 **"Add Bot"** → 确认 **"Yes, do it!"**

### 2. 配置 Bot 权限

在 Bot 页面配置以下选项：

#### 必需设置

| 选项 | 推荐设置 | 说明 |
|------|---------|------|
| **PUBLIC BOT** | ❌ 关闭 | 防止他人未经授权添加到其他服务器 |
| **REQUIRES OAUTH2 CODE GRANT** | ❌ 关闭 | 不需要 OAuth2 流程 |
| **PRESENCE INTENT** | ✅ 开启 | 允许读取在线状态 |
| **SERVER MEMBERS INTENT** | ✅ 开启 | 允许读取成员列表 |
| **MESSAGE CONTENT INTENT** | ✅ 开启 | **必须开启**，否则无法读取消息内容 |

> ⚠️ **重要：** `MESSAGE CONTENT INTENT` 必须开启，否则 Bot 无法接收消息！

### 3. 获取 Bot Token

1. 在 Bot 页面找到 **"TOKEN"** 部分
2. 点击 **"Reset Token"**（首次使用）或 **"Copy"**（已生成）
3. 复制 Token（格式类似 `MTxxNDY4xxx.GxxxxQ.yyyzzz`）

> 🔐 **安全提示：** Token 等同于密码，**不要泄露**，不要提交到 Git 仓库！

---

## 三、生成邀请链接并添加到服务器

### 1. 进入 OAuth2 设置

左侧菜单点击 **"OAuth2"** → **"URL Generator"**

### 2. 选择 Scopes

勾选：

- ✅ `bot`
- ✅ `applications.commands`（如果需要 Slash Commands）

### 3. 选择 Bot 权限

在 **BOT PERMISSIONS** 部分，选择：

#### 最小权限（推荐）

- ✅ `Read Messages/View Channels` — 读取频道
- ✅ `Send Messages` — 发送消息
- ✅ `Send Messages in Threads` — 线程回复
- ✅ `Embed Links` — 发送嵌入链接
- ✅ `Attach Files` — 发送文件
- ✅ `Read Message History` — 读取历史消息
- ✅ `Add Reactions` — 添加表情反应

#### 可选权限

- `Manage Messages` — 删除消息（用于清理）
- `Manage Threads` — 管理线程
- `Use Slash Commands` — 使用斜杠命令

### 4. 复制邀请链接

底部 **GENERATED URL** 会自动生成链接，类似：

```
https://discord.com/api/oauth2/authorize?client_id=1234567890&permissions=274877958144&scope=bot%20applications.commands
```

复制该链接，在浏览器中打开，选择要添加的服务器，点击 **"授权"**。

---

## 四、OpenClaw 配置

### 1. 编辑配置文件

```bash
vim ~/.openclaw/config.yaml
```

### 2. 添加 Discord Channel

在 `channels` 部分添加：

```yaml
channels:
  - kind: discord
    token: "你的 Bot Token"         # 第二步获取的 Token
    allowedGuilds:                   # 允许的服务器 ID（可选）
      - "987654321098765432"         # 你的 Discord 服务器 ID
    allowedChannels: []              # 留空表示所有频道可用
    allowedUsers: []                 # 留空表示所有用户可用
```

### 3. 获取服务器 ID (Guild ID)

在 Discord 客户端：

1. 开启开发者模式：**用户设置** → **高级** → **开发者模式**
2. 右键点击服务器名称 → **复制 ID**
3. 粘贴到 `allowedGuilds` 列表中

### 4. 完整配置示例

```yaml
gateway:
  mode: local
  port: 18789

providers:
  - id: anthropic
    kind: anthropic
    apiKey: sk-ant-xxx

models:
  default: anthropic/claude-sonnet-4-5
  fallbacks:
    - anthropic/claude-opus-4-6

plugins:
  allow:
    - web_search
    - web_fetch
    - exec
    - browser

channels:
  - kind: discord
    token: "MTxxNDY4xxx.GxxxxQ.yyyzzz"
    allowedGuilds:
      - "123456789012345678"
```

### 5. 重启 OpenClaw

```bash
openclaw gateway restart

# 查看日志确认连接
openclaw gateway logs | grep discord
```

成功日志应显示类似：

```
[Discord] Connected as OpenClaw Bot#1234
[Discord] Serving 1 guild(s)
```

---

## 五、使用与测试

### 1. 基本对话

在 Discord 服务器的任意频道：

```
@OpenClaw Bot 你好，介绍一下你自己
```

Bot 应该会回复。

### 2. 线程模式（推荐）

为了避免刷屏，可以在线程中对话：

1. 发送消息提及 Bot
2. Bot 回复后，点击回复创建线程
3. 在线程中继续对话（无需每次 @Bot）

### 3. 私信模式

直接给 Bot 发送私信（DM）：

```
帮我写一个 Python 爬虫脚本
```

> ⚠️ 注意：私信模式需要用户和 Bot 在同一服务器，且 Bot 配置允许。

---

## 六、进阶配置

### 1. 限制特定频道

只允许在 #ai-chat 和 #dev-talk 使用：

```yaml
channels:
  - kind: discord
    token: "xxx"
    allowedGuilds:
      - "123456789012345678"
    allowedChannels:
      - "111111111111111111"  # #ai-chat 频道 ID
      - "222222222222222222"  # #dev-talk 频道 ID
```

获取频道 ID：开发者模式下右键频道 → 复制 ID

### 2. 限制特定用户

只允许管理员使用：

```yaml
channels:
  - kind: discord
    token: "xxx"
    allowedUsers:
      - "333333333333333333"  # 管理员 A
      - "444444444444444444"  # 管理员 B
```

### 3. 多服务器支持

同一个 Bot 服务多个 Discord 服务器：

```yaml
channels:
  - kind: discord
    token: "xxx"
    allowedGuilds:
      - "123456789012345678"  # 服务器 A
      - "987654321098765432"  # 服务器 B
```

### 4. 自定义触发词

默认需要 @Bot 才回复，可以配置关键词触发：

```yaml
channels:
  - kind: discord
    token: "xxx"
    triggerWords:
      - "ai"
      - "助手"
      - "openclaw"
```

现在发送包含这些词的消息会触发回复（无需 @）。

---

## 七、常见问题排查

### 1. `Error: Privileged intent provided is not enabled or whitelisted`

**原因：** 忘记开启 `MESSAGE CONTENT INTENT`。

**修复：**

1. 回到 [Discord Developer Portal](https://discord.com/developers/applications)
2. 进入你的应用 → Bot → **Privileged Gateway Intents**
3. 开启 **MESSAGE CONTENT INTENT**
4. 保存后重启 OpenClaw

### 2. Bot 在线但不回复消息

**排查步骤：**

```bash
# 查看日志
openclaw gateway logs | tail -50

# 确认配置加载
openclaw gateway config | grep discord
```

**可能原因：**

- `allowedGuilds` 或 `allowedChannels` 配置错误
- 没有 @Bot（且未配置触发词）
- Bot 权限不足（检查频道权限覆盖）

### 3. `Invalid Token`

**原因：** Token 错误或失效。

**修复：**

1. 回到开发者平台 → Bot → **Reset Token**
2. 复制新 Token 更新 `config.yaml`
3. 重启 OpenClaw

### 4. Bot 不在线

**排查：**

```bash
# 确认 OpenClaw 运行中
ps aux | grep openclaw

# 检查 Discord 连接状态
curl http://localhost:18789/api/health
```

### 5. 消息发送失败 `Missing Permissions`

**原因：** Bot 在该频道没有发送消息权限。

**修复：**

1. 进入 Discord 服务器设置 → 角色
2. 找到 Bot 角色，确保有 `Send Messages` 权限
3. 检查频道特定权限覆盖（右键频道 → 编辑频道 → 权限）

---

## 八、最佳实践

### 1. 安全建议

- ✅ 关闭 `PUBLIC BOT`，防止未授权添加
- ✅ 使用环境变量存储 Token，不要硬编码
- ✅ 定期 rotate Token
- ✅ 使用 `allowedGuilds` 限制服务器

### 2. 性能优化

如果 Bot 服务大型服务器（1000+ 成员）：

```yaml
channels:
  - kind: discord
    token: "xxx"
    rateLimit:
      messagesPerMinute: 20    # 限制每分钟消息数
    cacheSize: 1000             # 消息缓存大小
```

### 3. 日志与监控

```bash
# 实时查看 Discord 事件
openclaw gateway logs --follow | grep '\[Discord\]'

# 统计消息数
openclaw gateway logs | grep 'Message received' | wc -l
```

---

## 九、部署到云服务器

本地测试没问题后，推荐部署到云服务器保证 24/7 在线：

- 🔥 **[腾讯云轻量应用服务器](https://curl.qcloud.com/1PS2iJEg)** — 2核2G够用，香港节点延迟低
- 🌍 **[Vultr](https://www.vultr.com/?ref=7566454)** — 全球机房可选，按小时计费，随用随删
- 💧 **[DigitalOcean](https://m.do.co/c/0090e7c2aec0)** — $200 免费额度，稳定性好

部署步骤：

```bash
# SSH 登录服务器
ssh user@your-server-ip

# 安装 OpenClaw
curl -fsSL https://openclaw.com/install.sh | sh

# 配置 config.yaml（参考上文）
vim ~/.openclaw/config.yaml

# 使用 systemd 守护进程
sudo systemctl enable openclaw
sudo systemctl start openclaw

# 查看状态
sudo systemctl status openclaw
```

---

## 十、Slash Commands（可选）

Discord Slash Commands 提供更友好的交互方式。

### 注册命令

在开发者平台 → 你的应用 → Bot → **Slash Commands**：

1. 点击 **"Create Command"**
2. 配置命令：

| 字段 | 示例 |
|------|------|
| Name | `ask` |
| Description | `Ask OpenClaw AI a question` |
| Options | `question` (String, Required) |

### OpenClaw 配置

```yaml
channels:
  - kind: discord
    token: "xxx"
    slashCommands:
      - name: ask
        description: "Ask AI"
      - name: search
        description: "Web search"
```

### 使用

在 Discord 中输入 `/ask question: 什么是 AI？` 即可触发。

---

## 总结检查清单

部署前确认：

- ✅ Discord Application 已创建
- ✅ Bot Token 已获取并保密
- ✅ MESSAGE CONTENT INTENT 已开启
- ✅ Bot 已添加到服务器且有正确权限
- ✅ OpenClaw config.yaml 配置正确
- ✅ allowedGuilds 包含目标服务器 ID
- ✅ 日志显示 Discord 连接成功
- ✅ 测试消息能正常回复

---

**相关教程：**
- [OpenClaw + Ollama 本地部署](/zh/blog/openclaw-ollama-local-deployment)
- [OpenClaw MCP Server 配置](/zh/blog/openclaw-mcp-server-guide)
- [OpenClaw 配置文件详解](/zh/blog/openclaw-config-yaml-errors-and-fixes)

*有问题？加入 [OpenClaw Discord 社区](https://discord.gg/clawd) 获取帮助。*
