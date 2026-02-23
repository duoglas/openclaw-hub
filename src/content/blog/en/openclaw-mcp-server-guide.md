---
title: "OpenClaw MCP Server Configuration & Tool Extension Complete Guide (2026)"
description: "Deep dive into Model Context Protocol (MCP)! From principles to practice, learn how to add MCP Servers to OpenClaw, extend tool capabilities, integrate third-party services, build custom tools, and troubleshoot common issues."
pubDate: 2026-02-21
tags: ["openclaw", "mcp", "mcp-server", "tool-extension", "plugins", "guide"]
category: "guide"
lang: "en"
---

One of OpenClaw's core capabilities is **Tool Use**, and **MCP (Model Context Protocol)** is Anthropic's standardized tool protocol that lets AI interact with databases, file systems, APIs, browsers, and more.

This guide teaches you:

- ✅ Understanding what MCP is and why it matters
- ✅ Installing and configuring MCP Servers
- ✅ Integrating MCP Servers with OpenClaw
- ✅ Recommended practical MCP tools catalog
- ✅ Building custom MCP Servers
- ✅ Troubleshooting common issues

For advanced users wanting to **extend OpenClaw's capabilities**.

---

## I. What is MCP?

### Core Concepts

**MCP (Model Context Protocol)** is an open standard proposed by Anthropic that defines how AI models:

1. **Discover tools** — Query available tools and parameter definitions
2. **Invoke tools** — Send requests and receive results
3. **Manage context** — Handle session state and long-term memory

### Why MCP?

Traditional approaches require separate integration for each tool, leading to tight coupling. MCP provides a **standard interface** that allows:

- ✅ AI to dynamically discover and invoke any MCP-compliant tool
- ✅ Third-party developers to publish MCP Servers without modifying OpenClaw core
- ✅ Tool capabilities to be modular, composable, and maintainable

### MCP Architecture

```
┌─────────────┐
│  OpenClaw   │ ← AI Agent
└──────┬──────┘
       │ MCP Protocol
       ├──────────────┬──────────────┬──────────────┐
       ▼              ▼              ▼              ▼
  ┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐
  │FS Server│   │DB Server│   │API Server│  │Browser  │
  └─────────┘   └─────────┘   └─────────┘   └─────────┘
   Filesystem     Database      External API  Browser Control
```

---

## II. Installing MCP Servers

### Method 1: Using Official MCP Servers

Anthropic and the community provide many ready-to-use MCP Servers.

#### 1. Install Node.js (if not already installed)

Most MCP Servers are Node.js-based:

```bash
# Install Node.js using nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 20
nvm use 20

# Verify installation
node --version
npm --version
```

#### 2. Install Example MCP Server: Filesystem

```bash
# Install official filesystem MCP Server
npm install -g @modelcontextprotocol/server-filesystem

# Verify installation
mcp-server-filesystem --version
```

#### 3. Test MCP Server

```bash
# Start MCP Server (specify working directory)
mcp-server-filesystem ~/Documents &

# Test if responding (MCP uses JSON-RPC)
curl -X POST http://localhost:3000 \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"tools/list","id":1}'
```

Successful response = working.

---

## III. Integrating MCP Servers with OpenClaw

### 1. Configuration Format

Edit `~/.openclaw/openclaw.json`:

```yaml
mcpServers:
  - id: filesystem
    kind: stdio                  # MCP protocol type: stdio, http, websocket
    command: mcp-server-filesystem
    args:
      - /home/user/Documents     # Allowed directory
    env: {}                      # Environment variables (optional)
```

### 2. Complete Configuration Example

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

# MCP Server configuration
mcpServers:
  # Filesystem tools
  - id: filesystem
    kind: stdio
    command: mcp-server-filesystem
    args:
      - ~/Documents
      - ~/projects
  
  # Database tools (example)
  - id: postgres
    kind: stdio
    command: mcp-server-postgres
    env:
      PGHOST: localhost
      PGPORT: 5432
      PGUSER: myuser
      PGPASSWORD: mypassword
      PGDATABASE: mydb
  
  # GitHub tools (example)
  - id: github
    kind: http
    baseUrl: http://localhost:3100
    env:
      GITHUB_TOKEN: ghp_xxxxx

channels: []
```

### 3. Restart OpenClaw

```bash
openclaw gateway restart

# Check logs to confirm MCP Server connection
openclaw gateway logs | grep MCP
```

Success logs should show:

```
[MCP] Connected to filesystem server
[MCP] Loaded 5 tools from filesystem
[MCP] Connected to postgres server
[MCP] Loaded 3 tools from postgres
```

---

## IV. Using MCP Tools

### Test Filesystem Tools

Chat with OpenClaw:

```
List all PDF files in my Documents directory
```

OpenClaw calls MCP filesystem server's `list_files` tool and returns results.

```
Read the content of ~/Documents/report.txt and summarize it
```

Calls `read_file` tool.

### Test Database Tools

```
Query the 10 most recently registered users from the users table
```

OpenClaw calls `postgres/query` tool to execute SQL.

---

## V. Recommended MCP Servers

### 1. Official MCP Servers

| Name | Functionality | Install Command |
|------|--------------|----------------|
| **filesystem** | File read/write, directory traversal | `npm i -g @modelcontextprotocol/server-filesystem` |
| **postgres** | PostgreSQL database queries | `npm i -g @modelcontextprotocol/server-postgres` |
| **sqlite** | SQLite database operations | `npm i -g @modelcontextprotocol/server-sqlite` |
| **puppeteer** | Browser automation | `npm i -g @modelcontextprotocol/server-puppeteer` |
| **fetch** | HTTP request wrapper | `npm i -g @modelcontextprotocol/server-fetch` |

### 2. Community MCP Servers

| Name | Functionality | Repository |
|------|--------------|-----------|
| **Notion** | Read/write Notion databases | [mcp-server-notion](https://github.com/example/mcp-notion) |
| **Slack** | Send/read Slack messages | [mcp-server-slack](https://github.com/example/mcp-slack) |
| **Google Drive** | Manage Google Drive files | [mcp-server-gdrive](https://github.com/example/mcp-gdrive) |
| **Jira** | Create/query Jira issues | [mcp-server-jira](https://github.com/example/mcp-jira) |

### 3. Recommended Combinations

**Personal Knowledge Management:**

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

**Developer Toolchain:**

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

## VI. Building Custom MCP Servers

### Simplest MCP Server (Node.js)

Create `my-mcp-server.js`:

```javascript
#!/usr/bin/env node
const { Server } = require('@modelcontextprotocol/sdk/server');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio');

const server = new Server({
  name: 'my-custom-server',
  version: '1.0.0',
});

// Register tools
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

// Implement tool logic
server.setRequestHandler('tools/call', async (request) => {
  if (request.params.name === 'greet') {
    const { name } = request.params.arguments;
    return {
      content: [{ type: 'text', text: `Hello, ${name}! 👋` }],
    };
  }
  throw new Error(`Unknown tool: ${request.params.name}`);
});

// Start service
const transport = new StdioServerTransport();
server.connect(transport);
```

### Make it Executable

```bash
chmod +x my-mcp-server.js
```

### Use in OpenClaw

```yaml
mcpServers:
  - id: custom
    kind: stdio
    command: node
    args:
      - /path/to/my-mcp-server.js
```

Restart OpenClaw, now you can:

```
Use the greet tool to say hello to Alice
```

OpenClaw will call your custom MCP Server!

---

## VII. Troubleshooting

### 1. `MCP Server failed to start`

**Cause:** Command path incorrect or dependencies missing.

**Debug:**

```bash
# Test if command exists
which mcp-server-filesystem

# Run manually to see errors
mcp-server-filesystem ~/Documents
```

### 2. `Tool not found in MCP server`

**Cause:** MCP Server didn't register tools correctly.

**Debug:**

```bash
# View MCP Server logs
openclaw gateway logs | grep MCP

# Manually query tool list
curl -X POST http://localhost:3000 \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"tools/list","id":1}'
```

### 3. `Permission denied` Error

**Cause:** MCP Server doesn't have file/database access permissions.

**Fix:**

```yaml
mcpServers:
  - id: filesystem
    command: mcp-server-filesystem
    args:
      - ~/Documents          # Ensure path exists and is readable
    env:
      HOME: /home/user       # Sometimes needs explicit specification
```

### 4. MCP Server Process Leaks

**Symptom:** Old processes remain after restarting OpenClaw.

**Fix:**

```bash
# Find and kill stale processes
ps aux | grep mcp-server
kill <PID>

# Or batch cleanup
pkill -f mcp-server
```

### 5. Tool Call Timeout

**Cause:** MCP Server processing slowly or hanging.

**Optimize:**

```yaml
mcpServers:
  - id: slow-server
    command: mcp-server-example
    timeout: 30000           # Timeout in milliseconds
```

---

## VIII. Advanced Usage

### 1. Dynamic Tool Discovery

OpenClaw periodically re-queries MCP Server's tool list, supporting hot-loading of new tools:

```yaml
mcpServers:
  - id: dynamic
    command: mcp-server-dynamic
    refreshInterval: 300     # Reload tool list every 5 minutes
```

### 2. Tool Allowlist

Restrict AI to only use specific tools:

```yaml
mcpServers:
  - id: filesystem
    command: mcp-server-filesystem
    args: [~/Documents]
    allowedTools:
      - read_file
      - list_directory
      # Disallow write_file, delete_file
```

### 3. Multi-Instance Deployment

Same MCP Server can have multiple instances:

```yaml
mcpServers:
  - id: fs-documents
    command: mcp-server-filesystem
    args: [~/Documents]
  
  - id: fs-projects
    command: mcp-server-filesystem
    args: [~/projects]
```

AI chooses appropriate instance based on context.

---

## IX. Deployment Best Practices

### 1. Containerized Deployment

Package MCP Server as Docker image:

```dockerfile
FROM node:20-slim
RUN npm install -g @modelcontextprotocol/server-filesystem
ENTRYPOINT ["mcp-server-filesystem"]
CMD ["/data"]
```

Build and run:

```bash
docker build -t my-mcp-fs .
docker run -d --name mcp-fs -v ~/Documents:/data my-mcp-fs
```

### 2. Monitoring & Logging

```bash
# Real-time MCP call logs
openclaw gateway logs --follow | grep '\[MCP\]'

# Count tool invocations
openclaw gateway logs | grep 'MCP tool called' | \
  awk '{print $NF}' | sort | uniq -c | sort -nr
```

### 3. Security Isolation

Production environments should isolate MCP Servers using systemd or containers:

```yaml
mcpServers:
  - id: filesystem
    kind: http                # Use HTTP instead of stdio
    baseUrl: http://localhost:3100
    env:
      API_KEY: secure-random-key
```

This allows MCP Server to run in separate containers/VMs for better security.

---

## X. Cloud Deployment Recommendations

If MCP Server needs continuous operation or cloud service integration (databases, APIs), recommend deploying to cloud:

- 🔥 **[Tencent Cloud](https://curl.qcloud.com/1PS2iJEg)** — Fast access in China, good for Chinese APIs
- 🌍 **[Vultr](https://www.vultr.com/?ref=7566454)** — Global datacenters, ideal for international apps
- 💧 **[DigitalOcean](https://m.do.co/c/0090e7c2aec0)** — $200 free credit, great for testing and small production

Deployment steps:

```bash
# SSH to server
ssh user@your-server

# Install Node.js
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | sh
source ~/.bashrc
nvm install 20

# Install MCP Server
npm install -g @modelcontextprotocol/server-filesystem

# Use PM2 for daemon process
npm install -g pm2
pm2 start mcp-server-filesystem -- ~/data
pm2 save
pm2 startup

# Verify running
pm2 status
```

---

## Summary

| Scenario | Recommended Solution |
|----------|---------------------|
| **Personal Use** | Local stdio MCP Server, simple and fast |
| **Team Collaboration** | HTTP/WebSocket MCP Server, unified service |
| **Production** | Containerized + cloud deployment, secure isolation |
| **Development/Debug** | Custom MCP Server, flexible extension |

MCP allows OpenClaw's capabilities to **extend infinitely**. From filesystems and databases to third-party APIs, just add the corresponding MCP Server and AI automatically learns to use it.

---

**Related Guides:**
- [OpenClaw + Ollama Local Deployment](/en/blog/openclaw-ollama-local-deployment)
- [OpenClaw Discord Bot Setup](/en/blog/openclaw-discord-bot-setup)
- [OpenClaw Config Explained](/en/blog/openclaw-config-yaml-errors-and-fixes)

*Want to develop your own MCP Server? Check [MCP SDK docs](https://modelcontextprotocol.io/docs) or join the [OpenClaw community](https://discord.gg/clawd).*
