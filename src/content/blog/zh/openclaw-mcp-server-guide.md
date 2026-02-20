---
title: "OpenClaw MCP Server 配置与工具扩展完整教程（2026）"
description: "深入理解 Model Context Protocol (MCP)！从原理到实战，教你如何为 OpenClaw 添加 MCP Server、扩展工具能力、对接第三方服务、自定义工具，以及常见问题排查。"
pubDate: 2026-02-21
tags: ["openclaw", "mcp", "mcp-server", "工具扩展", "插件", "教程"]
category: "guide"
lang: "zh"
---

OpenClaw 的核心能力之一是**工具调用（Tool Use）**，而 **MCP (Model Context Protocol)** 是 Anthropic 推出的标准化工具协议，让 AI 能够对接数据库、文件系统、API、浏览器等外部工具。

本教程教你：

- ✅ 理解 MCP 是什么，为什么重要
- ✅ 安装和配置 MCP Server
- ✅ 将 MCP Server 集成到 OpenClaw
- ✅ 推荐的实用 MCP 工具清单
- ✅ 自定义开发 MCP Server
- ✅ 常见问题排查

适合想要**扩展 OpenClaw 能力**的进阶用户。

---

## 一、什么是 MCP？

### 核心概念

**MCP (Model Context Protocol)** 是 Anthropic 提出的开放标准，定义了 AI 模型如何：

1. **发现工具** — 查询可用的工具列表和参数定义
2. **调用工具** — 发送请求并接收结果
3. **管理上下文** — 处理会话状态和长期记忆

### 为什么需要 MCP？

传统方式每个工具需要单独集成，代码耦合严重。MCP 提供**标准接口**，让：

- ✅ AI 可以动态发现和调用任意符合 MCP 规范的工具
- ✅ 第三方开发者可以发布 MCP Server，无需修改 OpenClaw 核心代码
- ✅ 工具能力模块化、可组合、易维护

### MCP 架构

```
┌─────────────┐
│  OpenClaw   │ ← AI Agent
└──────┬──────┘
       │ MCP Protocol
       ├──────────────┬──────────────┬──────────────┐
       ▼              ▼              ▼              ▼
  ┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐
  │FS Server│   │DB Server│   │API Serve│   │Browser  │
  └─────────┘   └─────────┘   └─────────┘   └─────────┘
   文件系统      数据库         外部API       浏览器控制
```

---

## 二、安装 MCP Server

### 方式一：使用官方 MCP Servers

Anthropic 和社区提供了许多现成的 MCP Server。

#### 1. 安装 Node.js（如果未安装）

大部分 MCP Server 基于 Node.js：

```bash
# 使用 nvm 安装 Node.js
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 20
nvm use 20

# 验证安装
node --version
npm --version
```

#### 2. 安装示例 MCP Server：文件系统工具

```bash
# 安装官方文件系统 MCP Server
npm install -g @modelcontextprotocol/server-filesystem

# 验证安装
mcp-server-filesystem --version
```

#### 3. 测试 MCP Server

```bash
# 启动 MCP Server（指定工作目录）
mcp-server-filesystem ~/Documents &

# 测试是否响应（MCP 协议使用 JSON-RPC）
curl -X POST http://localhost:3000 \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"tools/list","id":1}'
```

正常返回工具列表即成功。

---

## 三、OpenClaw 集成 MCP Server

### 1. 配置文件格式

编辑 `~/.openclaw/config.yaml`：

```yaml
mcpServers:
  - id: filesystem
    kind: stdio                  # MCP 协议类型：stdio, http, websocket
    command: mcp-server-filesystem
    args:
      - /home/user/Documents     # 允许访问的目录
    env: {}                      # 环境变量（可选）
```

### 2. 完整配置示例

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

plugins:
  allow:
    - web_search
    - web_fetch
    - exec

# MCP Server 配置
mcpServers:
  # 文件系统工具
  - id: filesystem
    kind: stdio
    command: mcp-server-filesystem
    args:
      - ~/Documents
      - ~/projects
  
  # 数据库工具（示例）
  - id: postgres
    kind: stdio
    command: mcp-server-postgres
    env:
      PGHOST: localhost
      PGPORT: 5432
      PGUSER: myuser
      PGPASSWORD: mypassword
      PGDATABASE: mydb
  
  # GitHub 工具（示例）
  - id: github
    kind: http
    baseUrl: http://localhost:3100
    env:
      GITHUB_TOKEN: ghp_xxxxx

channels: []
```

### 3. 重启 OpenClaw

```bash
openclaw gateway restart

# 查看日志确认 MCP Server 连接
openclaw gateway logs | grep MCP
```

成功日志应显示：

```
[MCP] Connected to filesystem server
[MCP] Loaded 5 tools from filesystem
[MCP] Connected to postgres server
[MCP] Loaded 3 tools from postgres
```

---

## 四、使用 MCP 工具

### 测试文件系统工具

与 OpenClaw 对话：

```
列出我的 Documents 目录下所有 PDF 文件
```

OpenClaw 会调用 MCP filesystem server 的 `list_files` 工具，返回结果。

```
读取 ~/Documents/report.txt 的内容并总结
```

调用 `read_file` 工具。

### 测试数据库工具

```
查询 users 表中最近注册的 10 个用户
```

OpenClaw 会调用 `postgres/query` 工具执行 SQL。

---

## 五、常用 MCP Server 推荐

### 1. 官方 MCP Servers

| 名称 | 功能 | 安装命令 |
|------|------|---------|
| **filesystem** | 文件读写、目录遍历 | `npm i -g @modelcontextprotocol/server-filesystem` |
| **postgres** | PostgreSQL 数据库查询 | `npm i -g @modelcontextprotocol/server-postgres` |
| **sqlite** | SQLite 数据库操作 | `npm i -g @modelcontextprotocol/server-sqlite` |
| **puppeteer** | 浏览器自动化 | `npm i -g @modelcontextprotocol/server-puppeteer` |
| **fetch** | HTTP 请求封装 | `npm i -g @modelcontextprotocol/server-fetch` |

### 2. 社区 MCP Servers

| 名称 | 功能 | 仓库 |
|------|------|------|
| **Notion** | 读写 Notion 数据库 | [mcp-server-notion](https://github.com/example/mcp-notion) |
| **Slack** | 发送/读取 Slack 消息 | [mcp-server-slack](https://github.com/example/mcp-slack) |
| **Google Drive** | 管理 Google Drive 文件 | [mcp-server-gdrive](https://github.com/example/mcp-gdrive) |
| **Jira** | 创建/查询 Jira issue | [mcp-server-jira](https://github.com/example/mcp-jira) |

### 3. 推荐组合

**个人知识管理：**

```yaml
mcpServers:
  - id: filesystem
    command: mcp-server-filesystem
    args: [~/notes]
  
  - id: notion
    command: mcp-server-notion
    env:
      NOTION_TOKEN: secret_xxx
```

**开发者工具链：**

```yaml
mcpServers:
  - id: github
    command: mcp-server-github
    env:
      GITHUB_TOKEN: ghp_xxx
  
  - id: postgres
    command: mcp-server-postgres
    env:
      PGDATABASE: dev_db
  
  - id: browser
    command: mcp-server-puppeteer
```

---

## 六、自定义 MCP Server

### 最简单的 MCP Server（Node.js）

创建 `my-mcp-server.js`：

```javascript
#!/usr/bin/env node
const { Server } = require('@modelcontextprotocol/sdk/server');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio');

const server = new Server({
  name: 'my-custom-server',
  version: '1.0.0',
});

// 注册工具
server.setRequestHandler('tools/list', async () => {
  return {
    tools: [
      {
        name: 'greet',
        description: 'Greet someone by name',
        inputSchema: {
          type: 'object',
          properties: {
            name: { type: 'string', description: 'Name to greet' },
          },
          required: ['name'],
        },
      },
    ],
  };
});

// 实现工具逻辑
server.setRequestHandler('tools/call', async (request) => {
  if (request.params.name === 'greet') {
    const { name } = request.params.arguments;
    return {
      content: [{ type: 'text', text: `Hello, ${name}! 👋` }],
    };
  }
  throw new Error(`Unknown tool: ${request.params.name}`);
});

// 启动服务
const transport = new StdioServerTransport();
server.connect(transport);
```

### 使其可执行

```bash
chmod +x my-mcp-server.js
```

### 在 OpenClaw 中使用

```yaml
mcpServers:
  - id: custom
    kind: stdio
    command: node
    args:
      - /path/to/my-mcp-server.js
```

重启 OpenClaw，现在可以这样用：

```
使用 greet 工具向 Alice 问好
```

OpenClaw 会调用你的自定义 MCP Server！

---

## 七、常见问题排查

### 1. `MCP Server failed to start`

**原因：** 命令路径错误或依赖未安装。

**排查：**

```bash
# 测试命令是否存在
which mcp-server-filesystem

# 手动运行看报错
mcp-server-filesystem ~/Documents
```

### 2. `Tool not found in MCP server`

**原因：** MCP Server 未正确注册工具。

**排查：**

```bash
# 查看 MCP Server 日志
openclaw gateway logs | grep MCP

# 手动查询工具列表
curl -X POST http://localhost:3000 \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"tools/list","id":1}'
```

### 3. `Permission denied` 错误

**原因：** MCP Server 没有访问文件/数据库的权限。

**修复：**

```yaml
mcpServers:
  - id: filesystem
    command: mcp-server-filesystem
    args:
      - ~/Documents          # 确保路径存在且可读
    env:
      HOME: /home/user       # 有时需要显式指定
```

### 4. MCP Server 进程泄漏

**现象：** 重启 OpenClaw 后残留旧进程。

**修复：**

```bash
# 查找并杀掉残留进程
ps aux | grep mcp-server
kill <PID>

# 或者批量清理
pkill -f mcp-server
```

### 5. 工具调用超时

**原因：** MCP Server 处理慢或挂起。

**优化：**

```yaml
mcpServers:
  - id: slow-server
    command: mcp-server-example
    timeout: 30000           # 超时时间（毫秒）
```

---

## 八、进阶使用

### 1. 动态工具发现

OpenClaw 会定期重新查询 MCP Server 的工具列表，支持热加载新工具：

```yaml
mcpServers:
  - id: dynamic
    command: mcp-server-dynamic
    refreshInterval: 300     # 每 5 分钟重新加载工具列表
```

### 2. 工具白名单

限制 AI 只能使用特定工具：

```yaml
mcpServers:
  - id: filesystem
    command: mcp-server-filesystem
    args: [~/Documents]
    allowedTools:
      - read_file
      - list_directory
      # 不允许 write_file、delete_file
```

### 3. 多实例部署

同一个 MCP Server 可以配置多个实例：

```yaml
mcpServers:
  - id: fs-documents
    command: mcp-server-filesystem
    args: [~/Documents]
  
  - id: fs-projects
    command: mcp-server-filesystem
    args: [~/projects]
```

AI 会根据上下文选择合适的实例。

---

## 九、部署最佳实践

### 1. 容器化部署

将 MCP Server 打包为 Docker 镜像：

```dockerfile
FROM node:20-slim
RUN npm install -g @modelcontextprotocol/server-filesystem
ENTRYPOINT ["mcp-server-filesystem"]
CMD ["/data"]
```

构建并运行：

```bash
docker build -t my-mcp-fs .
docker run -d --name mcp-fs -v ~/Documents:/data my-mcp-fs
```

### 2. 监控与日志

```bash
# 实时查看 MCP 调用日志
openclaw gateway logs --follow | grep '\[MCP\]'

# 统计工具调用次数
openclaw gateway logs | grep 'MCP tool called' | \
  awk '{print $NF}' | sort | uniq -c | sort -nr
```

### 3. 安全隔离

生产环境建议用 systemd 或容器隔离 MCP Server：

```yaml
mcpServers:
  - id: filesystem
    kind: http                # 通过 HTTP 而非 stdio
    baseUrl: http://localhost:3100
    env:
      API_KEY: secure-random-key
```

这样 MCP Server 可以部署在独立的容器/虚拟机中，提高安全性。

---

## 十、云部署建议

如果 MCP Server 需要持续运行或对接云服务（如数据库、API），推荐部署到云服务器：

- 🔥 **[腾讯云轻量应用服务器](https://curl.qcloud.com/1PS2iJEg)** — 国内访问快，适合对接国内 API
- 🌍 **[Vultr](https://www.vultr.com/?ref=7566454)** — 全球机房，适合国际化应用
- 💧 **[DigitalOcean](https://m.do.co/c/0090e7c2aec0)** — $200 免费额度，适合测试和小规模生产

部署步骤：

```bash
# SSH 到服务器
ssh user@your-server

# 安装 Node.js
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | sh
source ~/.bashrc
nvm install 20

# 安装 MCP Server
npm install -g @modelcontextprotocol/server-filesystem

# 使用 PM2 守护进程
npm install -g pm2
pm2 start mcp-server-filesystem -- ~/data
pm2 save
pm2 startup

# 验证运行
pm2 status
```

---

## 总结

| 场景 | 推荐方案 |
|------|---------|
| **个人使用** | 本地 stdio MCP Server，简单快速 |
| **团队协作** | HTTP/WebSocket MCP Server，统一服务 |
| **生产环境** | 容器化 + 云部署，安全隔离 |
| **开发调试** | 自定义 MCP Server，灵活扩展 |

MCP 让 OpenClaw 的能力**无限扩展**。从文件系统、数据库到第三方 API，只需添加对应的 MCP Server，AI 就能自动学会使用。

---

**相关教程：**
- [OpenClaw + Ollama 本地部署](/zh/blog/openclaw-ollama-local-deployment)
- [OpenClaw Discord 机器人配置](/zh/blog/openclaw-discord-bot-setup)
- [OpenClaw 配置文件详解](/zh/blog/openclaw-config-yaml-errors-and-fixes)

*想开发自己的 MCP Server？查看 [MCP SDK 文档](https://modelcontextprotocol.io/docs) 或加入 [OpenClaw 社区](https://discord.gg/clawd) 交流。*
