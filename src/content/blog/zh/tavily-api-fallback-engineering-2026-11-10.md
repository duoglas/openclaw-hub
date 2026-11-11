---
title: "Tavily API 失效后的工程应对：从代理降级到直连切换"
description: "记录 API 代理 token 失效后的应急处理过程。从诊断问题、降级策略到直连切换，分享如何在生产环境中保持搜索能力的连续性。"
pubDate: 2026-11-10
updatedDate: 2026-11-10
tags: ["api", "fallback", "tavily", "proxy", "engineering"]
category: "tutorial"
lang: "zh"
---

## 背景

在 AI 基础设施中，搜索能力是内容生产的核心环节。我们使用 Tavily API 作为搜索引擎，通过代理层（Hikari）提供服务。

2026 年 10 月 29 日，代理层的 token 突然失效，导致所有依赖搜索的服务完全不可用。这次事件暴露了**单点依赖**的风险，也促使我们建立了一套**应急降级流程**。

## 问题诊断

### 症状

```
Tavily 搜索请求返回：
TLS UNEXPECTED_EOF_WHILE_READING
```

### 诊断步骤

**第 1 步：确认问题范围**

```bash
# 测试直连（绕过代理）
curl -v https://api.tavily.com

# 测试代理连接
curl -x http://proxy:port https://api.tavily.com

# 检查代理日志
tail -f /var/log/hikari/hikari.log
```

**第 2 步：确认根因**

```bash
# 检查 token 状态
curl -s https://api.tavily.com/health --header "Authorization: Bearer <token>"

# 输出：
# {"status": "expired", "message": "Token has expired"}
```

**第 3 步：确认影响范围**

- 影响服务：AI 日报、内容分析、趋势研究
- 不影响服务：模型对话、代码生成、文档处理

## 应急降级策略

### 策略 1：硬编码路径绕过代理

这是最快、最直接的解决方案：

```bash
# 原配置（通过代理）
export TAVILY_API_BASE_URL=https://hikari.example.com/tavily
export TAVILY_API_KEY=th-xxx

# 新配置（直连官方 API）
export TAVILY_API_BASE_URL=https://api.tavily.com
export TAVILY_API_KEY=tvly-xxx
```

**优点：**
- 立即生效，无需重启服务
- 绕过代理层，减少故障点

**缺点：**
- 失去了代理层的安全检查
- 需要管理官方 API 密钥

### 策略 2：添加备选搜索引擎

为降低对单一 API 的依赖，我们添加了备选方案：

```python
# 搜索引擎路由
async def search(query, max_results=10):
    # 尝试主搜索引擎
    try:
        results = await tavily_search(query, max_results)
        if results:
            return results
    except Exception as e:
        log_warning(f"Tavily search failed: {e}")
    
    # 回退到备选方案
    try:
        results = await ddgs_search(query, max_results)
        if results:
            return results
    except Exception as e:
        log_error(f"DDGS search also failed: {e}")
        raise
```

**备选搜索引擎要求：**
1. 免费或低成本
2. 有 Python SDK
3. 支持英文搜索

### 策略 3：缓存失效内容

在搜索引擎恢复期间，使用缓存的结果：

```python
# 缓存机制
import hashlib
from pathlib import Path

CACHE_DIR = Path("/tmp/tavily-cache")

def cached_search(query):
    query_hash = hashlib.md5(query.encode()).hexdigest()
    cache_file = CACHE_DIR / f"{query_hash}.json"
    
    if cache_file.exists():
        return json.loads(cache_file.read_text())
    
    # 缓存不存在，执行搜索
    results = await tavily_search(query)
    cache_file.write_text(json.dumps(results))
    return results
```

## 长期改进方案

### 1. 多 API 密钥轮换

```bash
# 密钥轮换脚本
#!/bin/bash
KEYS=("tvly-key1" "tvly-key2" "tvly-key3")
INDEX=0

rotate_key() {
    INDEX=$(( (INDEX + 1) % ${#KEYS[@]} ))
    export TAVILY_API_KEY=${KEYS[$INDEX]}
    echo "Rotated to key $INDEX"
}

# 每 24 小时轮换一次
0 0 * * * /path/to/rotate_key.sh
```

### 2. 健康检查与告警

```python
# 健康检查
import schedule
import requests

def check_tavily_health():
    try:
        response = requests.get(
            "https://api.tavily.com/health",
            headers={"Authorization": f"Bearer {TAVILY_API_KEY}"},
            timeout=5
        )
        if response.status_code != 200:
            send_alert("Tavily API health check failed")
    except Exception as e:
        send_alert(f"Tavily API health check error: {e}")

# 每 10 分钟检查一次
schedule.every(10).minutes.do(check_tavily_health)
```

### 3. 代理层冗余

```
主代理（Hikari）-> 官方 API
备代理（Hikari-2）-> 官方 API
```

当主代理不可用时，自动切换到备代理。

## 核心经验

### 1. 单点依赖是架构的大敌

任何关键服务都不应该只依赖一个 API 或一个代理。必须有多重备份。

### 2. 应急方案要提前设计

不要在出问题的时候才想怎么办。提前设计好降级策略，出问题时可以快速执行。

### 3. 缓存是有效的临时方案

在搜索引擎恢复期间，缓存可以提供基本的服务连续性。但要注意缓存失效时间。

### 4. 监控和告警不能少

没有监控，出问题的时候你根本不知道。有了监控，出问题的时候你可以快速响应。

## 后续改进

1. **自动化密钥轮换**：减少人为干预
2. **多搜索引擎支持**：不依赖单一 API
3. **代理层冗余**：主备切换机制
4. **性能监控**：跟踪 API 响应时间和错误率

---

*本文使用 AI 辅助起草，并经过独立模型审稿。数据来自实际的生产环境事件记录。*
