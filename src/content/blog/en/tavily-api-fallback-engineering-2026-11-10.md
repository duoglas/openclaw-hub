---
title: "Engineering Response to Tavily API Failure: From Proxy Degradation to Direct Connection Switching"
description: "Documenting the emergency response process when an API proxy token expires. From diagnosis, fallback strategies to direct connection switching, learn how to maintain search capability continuity in production environments."
pubDate: 2026-11-10
updatedDate: 2026-11-10
tags: ["api", "fallback", "tavily", "proxy", "engineering"]
category: "tutorial"
lang: "en"
---

## Background

In AI infrastructure, search capability is a core component of content production. We used Tavily API as our search engine, served through a proxy layer (Hikari).

On October 29, 2026, the proxy layer's token suddenly expired, rendering all search-dependent services completely unavailable. This incident exposed the risk of **single-point dependency** and prompted us to build an **emergency fallback process**.

## Problem Diagnosis

### Symptoms

```
Tavily search requests returned:
TLS UNEXPECTED_EOF_WHILE_READING
```

### Diagnosis Steps

**Step 1: Confirm Problem Scope**

```bash
# Test direct connection (bypass proxy)
curl -v https://api.tavily.com

# Test proxy connection
curl -x http://proxy:port https://api.tavily.com

# Check proxy logs
tail -f /var/log/hikari/hikari.log
```

**Step 2: Confirm Root Cause**

```bash
# Check token status
curl -s https://api.tavily.com/health --header "Authorization: Bearer <token>"

# Output:
# {"status": "expired", "message": "Token has expired"}
```

**Step 3: Confirm Impact Scope**

- **Affected services:** AI daily news, content analysis, trend research
- **Unaffected services:** Model conversations, code generation, document processing

## Emergency Fallback Strategies

### Strategy 1: Hardcode Path Bypassing Proxy

The fastest, most direct solution:

```bash
# Original config (via proxy)
export TAVILY_API_BASE_URL=https://hikari.example.com/tavily
export TAVILY_API_KEY=th-xxx

# New config (direct to official API)
export TAVILY_API_BASE_URL=https://api.tavily.com
export TAVILY_API_KEY=tvly-xxx
```

**Pros:**
- Immediate effect, no service restart needed
- Bypasses proxy layer, reduces failure points

**Cons:**
- Loses proxy layer security checks
- Requires management of official API keys

### Strategy 2: Add Alternative Search Engines

To reduce dependency on a single API, we added fallback options:

```python
# Search engine routing
async def search(query, max_results=10):
    # Try primary search engine
    try:
        results = await tavily_search(query, max_results)
        if results:
            return results
    except Exception as e:
        log_warning(f"Tavily search failed: {e}")
    
    # Fallback to alternative
    try:
        results = await ddgs_search(query, max_results)
        if results:
            return results
    except Exception as e:
        log_error(f"DDGS search also failed: {e}")
        raise
```

**Alternative search engine requirements:**
1. Free or low-cost
2. Has Python SDK
3. Supports English search

### Strategy 3: Cache Expired Content

During the search engine recovery period, use cached results:

```python
# Caching mechanism
import hashlib
from pathlib import Path

CACHE_DIR = Path("/tmp/tavily-cache")

def cached_search(query):
    query_hash = hashlib.md5(query.encode()).hexdigest()
    cache_file = CACHE_DIR / f"{query_hash}.json"
    
    if cache_file.exists():
        return json.loads(cache_file.read_text())
    
    # Cache not found, execute search
    results = await tavily_search(query)
    cache_file.write_text(json.dumps(results))
    return results
```

## Long-Term Improvement Plans

### 1. Multi-API Key Rotation

```bash
# Key rotation script
#!/bin/bash
KEYS=("tvly-key1" "tvly-key2" "tvly-key3")
INDEX=0

rotate_key() {
    INDEX=$(( (INDEX + 1) % ${#KEYS[@]} ))
    export TAVILY_API_KEY=${KEYS[$INDEX]}
    echo "Rotated to key $INDEX"
}

# Rotate every 24 hours
0 0 * * * /path/to/rotate_key.sh
```

### 2. Health Check and Alerts

```python
# Health check
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

# Check every 10 minutes
schedule.every(10).minutes.do(check_tavily_health)
```

### 3. Proxy Layer Redundancy

```
Primary Proxy (Hikari) -> Official API
Backup Proxy (Hikari-2) -> Official API
```

When the primary proxy is unavailable, automatically switch to the backup.

## Core Lessons

### 1. Single-point dependency is the archenemy of architecture

No critical service should depend on only one API or one proxy. There must be multiple backups.

### 2. Emergency plans must be designed in advance

Don't wait until something breaks to figure out what to do. Design fallback strategies in advance so you can execute them quickly when problems occur.

### 3. Caching is an effective temporary solution

During search engine recovery, caching can provide basic service continuity. But be mindful of cache expiration times.

### 4. Monitoring and alerts are non-negotiable

Without monitoring, you won't know when something breaks. With monitoring, you can respond quickly when problems occur.

## Future Improvements

1. **Automated key rotation**: Reduce manual intervention
2. **Multi-search engine support**: Don't rely on a single API
3. **Proxy layer redundancy**: Primary-backup switching mechanism
4. **Performance monitoring**: Track API response times and error rates

---

*AI-assisted drafting with a separate model review. Data from actual production environment incident records.*
