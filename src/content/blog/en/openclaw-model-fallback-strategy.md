---
title: "OpenClaw Model Fallback Chain Guide: Rate Limits, Failover & Cost Optimization"
description: "How to configure cross-provider model fallback chains in OpenClaw to handle 429 rate limits, provider outages, and cost control. Full config examples included."
pubDate: 2026-02-10
updatedDate: 2026-02-16
tags: ["openclaw", "models", "guide", "fallback", "429", "rate-limit"]
category: "guide"
lang: "en"
---

A well-designed fallback chain is OpenClaw's core availability architecture. It keeps your agent seamlessly operational when Anthropic rate-limits you or OpenAI goes down — users never notice the switch.

## The Core Principle

Fallback should optimize for **availability first**, then cost, then style consistency.

## Practical Chain Design

Use cross-provider interleaving:
1. Primary high-quality model (e.g., Claude Opus)
2. Different provider, similar quality (e.g., GPT Codex)
3. Cost-effective model (e.g., MiniMax M2.1)
4. Fast-response model (e.g., Gemini Flash)
5. Safety net (e.g., GLM)

This prevents provider-level incidents from taking down the whole chain.

### Full Configuration Example

In `~/.openclaw/openclaw.json`:

```json
{
  "agents": {
    "defaults": {
      "model": {
        "primary": "anthropic/claude-opus-4-6",
        "fallbacks": [
          "openai-codex/gpt-5.3-codex",
          "minimax-portal/MiniMax-M2.1",
          "google/gemini-3-pro-high",
          "google/gemini-3-flash",
          "zai/glm-4.7"
        ]
      }
    }
  }
}
```

**Why this order?** Opus → Codex switches providers to avoid rate-limit collision. MiniMax provides cost-effective fallback. Gemini ensures availability. GLM is the final safety net.

## Operational Rules

- **Never place two same-provider models back-to-back** (if Anthropic returns 429, two consecutive Claude models both fail)
- Probe all models periodically with a tiny health task
- Log model-level failures separately from prompt failures
- Keep one "boring but stable" fallback at the end

## Per-Task Model Overrides

OpenClaw supports model overrides per session or cron job:

- **Main chat**: Use top-tier models (Opus / GPT Codex)
- **Cron jobs**: Use Flash or cheaper models (automation doesn't need the strongest reasoning)
- **Group chats**: Use Sonnet-tier (fast response, controlled cost)

## Prompt Compatibility Tips

- Keep system prompts concise and provider-neutral
- Avoid provider-specific formats (e.g., Claude's `<thinking>` tags) unless necessary
- Validate tool-call behavior across all fallback models

## FAQ

**Q: How do I tell if it's a rate limit vs. a network issue?**
A: 429 returns a clear HTTP status code — logs show `429 Too Many Requests`. Network issues show `ETIMEOUT` or `ECONNREFUSED`.

**Q: Will falling back to weaker models hurt the experience?**
A: Brief fallbacks are usually invisible to users — most daily conversations work fine on Sonnet or Flash. Only complex reasoning and long tool-call chains show differences.

**Q: How do I know which model is currently active?**
A: Run `openclaw status` to see the current session's model, or check the logs for model selection events.

## Bottom Line

A fallback chain is not cost optimization — it's your **uptime architecture**. A well-configured chain is more reliable than any single top-tier model.

## Related Guides

To apply this in production, pair this guide with:

- [What is OpenClaw?](/en/blog/what-is-openclaw/)
- [OpenClaw vs ChatGPT vs Claude (2026)](/en/blog/openclaw-vs-chatgpt-vs-claude/)
- [OpenClaw Logs & Debug Guide](/en/blog/openclaw-logs-debug-guide/)

