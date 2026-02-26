---
title: "OpenClaw Model Fallback Chain Guide: Rate Limits, Failover & Cost Optimization"
description: "How to configure cross-provider model fallback chains in OpenClaw to handle 429 rate limits, provider outages, and cost control. Full config examples included."
pubDate: 2026-02-10
updatedDate: 2026-02-16
tags: ["openclaw", "models", "guide", "fallback", "429", "rate-limit"]
category: "guide"
lang: "en"
faq:
  - question: "Why does OpenClaw need a fallback chain?"
    answer: "AI providers have rate limits, outages, and degraded service. A fallback chain keeps your agent operational automatically — users won't notice when one provider is down or rate-limited."
  - question: "Should I put two Claude models back-to-back in my fallback chain?"
    answer: "No. If Anthropic returns a 429 rate limit, a second Claude model will hit the same limit. Always interleave providers: Anthropic → OpenAI → Google → other providers."
  - question: "How do I configure model overrides for cron jobs?"
    answer: "Use the `model` parameter when spawning a sub-agent or cron session. Set cheaper models like `google/gemini-3-flash` or `minimax-portal/MiniMax-M2.1` for automation tasks that don't need top-tier reasoning."
  - question: "Can I mix paid and free models in the same fallback chain?"
    answer: "Yes. Many chains use a top-tier paid model first, then fall back to cost-effective or free models when needed. This gives you quality when you need it and availability when you don't."
  - question: "How do I know if a model switch happened?"
    answer: "Check OpenClaw logs for model selection events, or run `openclaw status` to see the current session's active model. Failed fallback attempts are logged with the provider error code."
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

