---
title: "OpenClaw + Ollama 本地离线部署完整教程（2026）"
description: "零 API 成本，完全离线运行 AI 助手！详解如何在本地部署 Ollama，配置 LLaMA、Qwen、DeepSeek 等模型，并无缝对接 OpenClaw 实现完整的本地化 AI Agent 系统。"
pubDate: 2026-02-21
tags: ["openclaw", "ollama", "本地部署", "离线", "私有化部署", "教程", "免API"]
category: "guide"
lang: "zh"
---

想要一个**完全离线、不依赖任何外部 API** 的 AI 助手？OpenClaw + Ollama 方案能让你：

- ✅ **零月租成本** — 无需 Anthropic/OpenAI API key
- ✅ **数据完全私有** — 所有对话在本地处理，不经过第三方服务器
- ✅ **离线可用** — 断网也能跑，适合内网环境
- ✅ **模型自由切换** — LLaMA、Qwen、DeepSeek、Gemma 等随意换

本教程教你从零搭建这套系统，适合有一定 Linux 基础的用户。

---

## 一、环境准备

### 硬件要求

| 模型规模 | 最低显存 | 推荐显存 | 推荐 CPU | 内存 |
|---------|---------|---------|---------|------|
| 7B 模型（如 Qwen2.5:7b） | 8GB | 12GB+ | 8 核 | 16GB |
| 14B-34B 模型 | 16GB | 24GB+ | 16 核 | 32GB |
| 70B+ 模型 | 48GB | 80GB+ | 32 核 | 64GB+ |

> 💡 **没有 GPU？** 小模型（7B）可以 CPU 跑，但速度会慢 5-10 倍。

### 系统要求

- Ubuntu 22.04+ / Debian 12+ / macOS 12+
- Docker（可选，推荐用于隔离环境）
- 至少 50GB 可用磁盘空间（模型文件占空间）

---

## 二、安装 Ollama

### 方式一：一键安装脚本（推荐）

```bash
# Linux/macOS 通用
curl -fsSL https://ollama.com/install.sh | sh

# 验证安装
ollama --version
```

### 方式二：Docker 部署

```bash
# 创建数据目录
mkdir -p ~/.ollama

# 启动 Ollama 服务（GPU 版本）
docker run -d \
  --name ollama \
  --gpus all \
  -v ~/.ollama:/root/.ollama \
  -p 11434:11434 \
  ollama/ollama

# CPU 版本去掉 --gpus all
docker run -d \
  --name ollama \
  -v ~/.ollama:/root/.ollama \
  -p 11434:11434 \
  ollama/ollama
```

### 验证服务

```bash
curl http://localhost:11434/api/tags
```

正常返回 JSON 即安装成功。

---

## 三、下载并配置模型

### 推荐模型清单

| 模型 | 参数量 | 擅长领域 | 下载命令 |
|------|--------|---------|---------|
| **qwen2.5:7b** | 7B | 中文对话、代码 | `ollama pull qwen2.5:7b` |
| **llama3.3:70b** | 70B | 推理、长文本 | `ollama pull llama3.3:70b` |
| **deepseek-r1:7b** | 7B | 推理思维链 | `ollama pull deepseek-r1:7b` |
| **codellama:13b** | 13B | 代码生成 | `ollama pull codellama:13b` |
| **gemma2:9b** | 9B | 通用对话 | `ollama pull gemma2:9b` |

### 下载模型

```bash
# 示例：下载 Qwen2.5 7B（适合中文场景）
ollama pull qwen2.5:7b

# 多模型并存（根据需要选择）
ollama pull deepseek-r1:7b
ollama pull codellama:13b
```

首次下载需要时间（7B 模型约 4-5GB），耐心等待。

### 测试模型

```bash
# 交互式测试
ollama run qwen2.5:7b

# 提示符出现后输入：
你好，介绍一下你自己

# 退出：Ctrl+D 或输入 /bye
```

---

## 四、OpenClaw 对接配置

### 1. 编辑 OpenClaw 配置文件

```bash
vim ~/.openclaw/config.yaml
```

### 2. 添加 Ollama 作为 Provider

在 `providers` 部分添加：

```yaml
providers:
  # 保留原有的 providers（如 anthropic）...
  
  # 新增 Ollama
  - id: ollama
    kind: openai-compatible     # Ollama 兼容 OpenAI API
    baseUrl: http://localhost:11434/v1
    apiKey: ollama               # 任意字符串即可，Ollama 不校验
```

### 3. 配置默认模型

```yaml
models:
  default: ollama/qwen2.5:7b    # 使用本地模型作为默认
  fallbacks:
    - ollama/deepseek-r1:7b     # 降级备选
    - anthropic/claude-sonnet-4-5  # 如果还配置了 Anthropic 作为最终后备
```

### 4. 完整配置示例

```yaml
gateway:
  mode: local
  port: 18789

providers:
  - id: ollama
    kind: openai-compatible
    baseUrl: http://localhost:11434/v1
    apiKey: ollama

models:
  default: ollama/qwen2.5:7b
  fallbacks:
    - ollama/deepseek-r1:7b

plugins:
  allow:
    - web_search
    - web_fetch
    - exec

channels: []
```

### 5. 重启 OpenClaw

```bash
openclaw gateway restart

# 查看日志确认连接成功
openclaw gateway logs | grep ollama
```

---

## 五、验证与测试

### 命令行测试

```bash
# OpenClaw CLI 交互模式
openclaw chat

# 发送测试消息
你好，帮我生成一个 Python 脚本读取 CSV 文件
```

### API 测试

```bash
curl -X POST http://localhost:18789/v1/messages \
  -H "Content-Type: application/json" \
  -d '{
    "model": "ollama/qwen2.5:7b",
    "messages": [{"role": "user", "content": "你好"}],
    "max_tokens": 100
  }'
```

---

## 六、常见问题排查

### 1. `connect ECONNREFUSED 127.0.0.1:11434`

**原因：** Ollama 服务未启动。

**修复：**

```bash
# 检查 Ollama 是否运行
ps aux | grep ollama

# 手动启动（非 Docker 方式）
ollama serve &

# Docker 方式
docker start ollama
```

### 2. 推理速度很慢

**原因：** CPU 模式或显存不足。

**优化方案：**

```bash
# 查看 GPU 使用情况
nvidia-smi

# 切换到更小的模型
ollama pull qwen2.5:1.5b   # 仅 1.5B 参数，CPU 也能跑

# OpenClaw 配置改为小模型
models:
  default: ollama/qwen2.5:1.5b
```

### 3. 模型回答质量差

**原因：** 7B 以下模型能力有限。

**解决方案：**

- 使用 14B+ 模型（如 `qwen2.5:14b`）
- 配置 fallback 到云端模型作为补充：

```yaml
models:
  default: ollama/qwen2.5:7b
  fallbacks:
    - anthropic/claude-sonnet-4-5  # 复杂任务降级到云端
```

### 4. `model not found`

**原因：** 模型未下载或命名错误。

**修复：**

```bash
# 查看已下载模型
ollama list

# 确认模型名（区分大小写）
# 配置中的模型名必须和 ollama list 中显示的完全一致
```

---

## 七、进阶配置

### 多模型负载均衡

如果有多台服务器：

```yaml
providers:
  - id: ollama-gpu1
    kind: openai-compatible
    baseUrl: http://192.168.1.100:11434/v1
    apiKey: ollama

  - id: ollama-gpu2
    kind: openai-compatible
    baseUrl: http://192.168.1.101:11434/v1
    apiKey: ollama

models:
  default: ollama-gpu1/qwen2.5:7b
  fallbacks:
    - ollama-gpu2/qwen2.5:7b
```

### 自定义模型参数

创建 `Modelfile` 调整温度、top_p 等参数：

```bash
cat > ~/qwen-creative.Modelfile << 'EOF'
FROM qwen2.5:7b

PARAMETER temperature 0.9
PARAMETER top_p 0.95
PARAMETER num_ctx 8192
EOF

ollama create qwen-creative -f ~/qwen-creative.Modelfile
```

在 OpenClaw 中使用：

```yaml
models:
  default: ollama/qwen-creative
```

---

## 八、生产环境建议

### 1. Systemd 守护进程

```bash
# 创建 Ollama service
sudo tee /etc/systemd/system/ollama.service << 'EOF'
[Unit]
Description=Ollama Service
After=network.target

[Service]
Type=simple
ExecStart=/usr/local/bin/ollama serve
Restart=always
User=ollama
Environment="OLLAMA_HOST=0.0.0.0:11434"

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable ollama
sudo systemctl start ollama
```

### 2. 性能监控

```bash
# 实时监控 GPU
watch -n 1 nvidia-smi

# 查看 Ollama 日志
journalctl -u ollama -f
```

### 3. 备份与恢复

```bash
# 备份已下载模型
tar czf ollama-models-backup.tar.gz ~/.ollama/models

# 恢复
tar xzf ollama-models-backup.tar.gz -C ~/
```

---

## 九、云服务器部署建议

虽然是"本地"部署，但用云服务器可以获得更好的硬件和网络：

- 🔥 **[腾讯云 GPU 实例](https://curl.qcloud.com/1PS2iJEg)** — T4/V100 显卡，按量计费适合测试
- 🌍 **[Vultr 高频 CPU](https://www.vultr.com/?ref=7566454)** — 没 GPU 也能跑小模型，按小时计费灵活
- 💧 **[DigitalOcean](https://m.do.co/c/0090e7c2aec0)** — $200 免费额度，适合长期运行

> 💡 **提示：** GPU 实例成本高，如果只是个人使用，7B-14B 模型 + 高频 CPU 就够用。

---

## 总结

| 方案 | 成本 | 性能 | 隐私 | 适用场景 |
|------|------|------|------|---------|
| **OpenClaw + Ollama** | 一次性硬件投入 | 中-高（取决于硬件） | ⭐⭐⭐⭐⭐ | 内网部署、敏感数据处理 |
| **OpenClaw + Anthropic** | 按 token 计费 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | 高质量对话、复杂推理 |
| **混合方案** | 低+按需 | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | 本地优先，云端降级 |

本地部署适合**长期高频使用**或**数据敏感场景**。如果只是尝鲜，建议先用云端 API 体验，再决定是否投入硬件。

---

**相关教程：**
- [OpenClaw 配置详解](/zh/blog/openclaw-config-yaml-errors-and-fixes)
- [OpenClaw Discord 机器人配置](/zh/blog/openclaw-discord-bot-setup)
- [OpenClaw MCP Server 扩展](/zh/blog/openclaw-mcp-server-guide)

*本教程持续更新，遇到问题欢迎在 [OpenClaw 社区](https://discord.gg/clawd) 交流。*
