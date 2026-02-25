---
title: "OpenClaw 日志排查全攻略：8 种常见报错与调试方法（2026）"
description: "教你看懂 OpenClaw 日志，快速定位 ECONNREFUSED、API 401/403、Telegram 冲突、Chrome Relay 断连等 8 种高频错误，附完整排查命令。"
pubDate: 2026-02-22
tags: ["openclaw", "日志", "调试", "排错", "教程"]
category: "guide"
lang: "zh"
---

OpenClaw 出问题时，日志会告诉你确切的原因——前提是你知道怎么看。本文教你读懂日志、识别常见错误模式、快速修复。

## 查看日志的方法

```bash
# 实时跟踪（调试首选）
openclaw logs --follow

# 查看最近 100 行
openclaw logs --lines 100

# 只看错误
openclaw logs --level error

# Gateway 专属日志
openclaw gateway logs

# systemd 服务日志
journalctl -u openclaw -n 50 --no-pager
```

> **技巧：** 开两个终端——一个 `openclaw logs --follow` 看日志，另一个操作复现问题。

## 日志级别说明

| 级别 | 含义 | 是否需要处理 |
|------|------|-------------|
| `DEBUG` | 内部状态，非常详细 | 否——深度排查时有用 |
| `INFO` | 正常运行信息 | 否——确认运行正常 |
| `WARN` | 非致命问题 | 可能——通常预示后续错误 |
| `ERROR` | 操作失败 | 是——需要排查 |
| `FATAL` | 进程即将退出 | 是——立即处理 |

## 8 种最常见的错误模式

### 1. ECONNREFUSED — 连不上服务

```
ERROR gateway: ECONNREFUSED 127.0.0.1:3000
```

**原因：** OpenClaw 尝试连接某个服务（API、本地服务器或自身 Gateway），但对方没有在监听。

**排查：**
```bash
openclaw gateway status
ss -tlnp | grep 3000
openclaw gateway restart
```

**常见原因：** Gateway 崩了没发现；端口改了没重启；防火墙阻挡了 localhost。

### 2. EADDRINUSE — 端口被占用

```
FATAL gateway: listen EADDRINUSE :::3000
```

**修复：**
```bash
# 找出谁占了端口
sudo lsof -i :3000

# 杀掉旧进程
kill <PID>

# 或者换个端口
openclaw config set gateway.port 3001
openclaw gateway restart
```

### 3. 401 / 403 API 认证错误

```
ERROR model: API returned 401 Unauthorized (provider=anthropic)
```

**排查：**
```bash
# 确认 key 已配置
openclaw config get providers

# 直接测试 key
curl -s https://api.anthropic.com/v1/messages \
  -H "x-api-key: YOUR_KEY" \
  -H "content-type: application/json" \
  -H "anthropic-version: 2023-06-01" \
  -d '{"model":"claude-sonnet-4-20250514","max_tokens":10,"messages":[{"role":"user","content":"hi"}]}'
```

**常见原因：** key 复制时多了空格或换行；免费 key 访问付费模型；key 已在 provider 后台吊销；把 Anthropic key 填到了 OpenAI 的位置。

### 4. 429 限速 / 过载

```
WARN model: 429 Too Many Requests (provider=anthropic, retry_after=30)
```

OpenClaw 会自动重试退避。如果持续出现，建议配置[模型降级策略](/blog/openclaw-model-fallback-strategy)把请求路由到备用 provider。

### 5. 超时错误

```
ERROR session: Request timed out after 120000ms (model=claude-opus-4-20250514)
```

**解决：**
```bash
# 增加超时
openclaw config set gateway.rpcTimeout 60000

# 检查到 API 的网络延迟
curl -o /dev/null -s -w "延迟: %{time_total}s\n" https://api.anthropic.com/v1/messages
```

**国内用户注意：** 直连海外 API 延迟高，建议使用代理或把 OpenClaw 部署到海外 VPS。推荐：
- [腾讯云](https://curl.qcloud.com/1PS2iJEg) — 国内用户首选，轻量 VPS 性价比高，香港/新加坡节点延迟低
- [Vultr](https://www.vultr.com/?ref=7566454) — 东京/新加坡节点，按小时计费，可随时快照恢复
- [DigitalOcean](https://m.do.co/c/0090e7c2aec0) — 文档齐全，$4/月起步

### 6. Chrome Relay 连接错误

```
ERROR browser: Chrome relay handshake failed — no tab attached
WARN browser: WebSocket to relay closed unexpectedly (code=1006)
```

**排查清单：**
1. 打开 Chrome，点击 OpenClaw Browser Relay 扩展图标（徽章应显示 ON）
2. 检查扩展设置中的 WebSocket URL 是否与 Gateway 匹配
3. NAT/防火墙环境下确保 WebSocket 端口可达
4. 禁用其他可能干扰网络请求的扩展

详见 [Chrome Relay 排错指南](/blog/openclaw-chrome-relay-troubleshooting)。

### 7. Telegram 错误

```
ERROR telegram: 409 Conflict: terminated by other getUpdates
ERROR telegram: 401 Unauthorized — bot token invalid
```

**409 冲突：** 有另一个 bot 实例在运行。
```bash
openclaw gateway stop
ps aux | grep openclaw
pkill -f openclaw
openclaw gateway start
```

**401 未授权：** bot token 无效，去 [@BotFather](https://t.me/BotFather) 重新获取。

**SSL/webhook 错误：** VPS 部署建议直接用 polling 模式：
```bash
openclaw config set telegram.mode polling
openclaw gateway restart
```

### 8. Node.js 版本问题

```
FATAL Error: Cannot find module 'xyz'
SyntaxError: Unexpected token '??='
```

```bash
node --version  # 需要 18+

# 升级 Node
nvm install 22
nvm use 22

# 重装依赖
cd ~/.openclaw
rm -rf node_modules
npm install
```

更多安装问题参见 [安装排错指南](/blog/openclaw-install-first-run-error-troubleshooting)。

## 调试工作流

遇到未知错误时，按这个顺序操作：

```
1. openclaw logs --level error --lines 20    ← 看什么报错
2. openclaw doctor                            ← 自动健康检查
3. openclaw gateway status                    ← Gateway 是否存活
4. openclaw config validate                   ← 配置语法是否正确
5. openclaw logs --follow                     ← 实时观察复现
```

## 日志文件位置与轮转

```bash
ls ~/.openclaw/logs/
openclaw logs --rotate
```

VPS 上建议配置自动轮转防止磁盘写满：
```bash
cat > /etc/logrotate.d/openclaw << 'EOF'
/home/*/.openclaw/logs/*.log {
    daily
    rotate 7
    compress
    missingok
    notifempty
}
EOF
```

## 部署推荐

稳定的 VPS + 良好的网络连接 = 更少的网络类错误、更低的延迟、更可靠的运行。

- [腾讯云](https://curl.qcloud.com/1PS2iJEg) — 国内用户首选，香港节点兼顾国内访问和海外 API
- [Vultr](https://www.vultr.com/?ref=7566454) — 全球节点多，按小时计费灵活
- [DigitalOcean](https://m.do.co/c/0090e7c2aec0) — 社区文档丰富，新手友好

## 还是搞不定？

- 查看 [OpenClaw GitHub Issues](https://github.com/nicepkg/openclaw) 看有没有类似问题
- 加入 [Discord](https://discord.gg/openclaw) 或 [Telegram](https://t.me/openclaw) 社区提问
- 运行 `openclaw doctor --verbose` 并附上输出

## 延伸阅读（OpenClaw）

- [OpenClaw 是什么？一文看懂开源 AI Agent 平台（2026）](/zh/blog/what-is-openclaw/)
- [OpenClaw vs ChatGPT vs Claude：2026 年怎么选 AI 助手？](/zh/blog/openclaw-vs-chatgpt-vs-claude/)
- [OpenClaw 模型回退策略：稳定性、成本与质量如何平衡](/zh/blog/openclaw-model-fallback-strategy/)
- [OpenClaw Telegram 故障排查全指南](/zh/blog/openclaw-telegram-troubleshooting-guide/)
- [OpenClaw 日志排查指南：从报错到根因定位](/zh/blog/openclaw-logs-debug-guide/)

