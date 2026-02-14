---
title: "OpenClaw Daily: Security by Default, Permissions by Need (2026-02-13)"
description: "Reduce attack surface with least privilege, regular audits, and human gates for external actions."
pubDate: 2026-02-13
tags: ["openclaw", "daily", "automation"]
category: "guide"
lang: "en"
---

## Focus: Security is an operating model, not a one-time task

### 1) Start with minimum permissions
- Disable unused channels
- Disable unused plugins
- Keep sensitive workflows local where possible

### 2) Audit regularly
```bash
openclaw security audit
openclaw security audit --deep
```
Watch for:
- Dangerous execution patterns
- File-read + network-send combinations
- Proxy/trust misconfiguration

### 3) Keep human approval for outward actions
Emails, public posts, and user-facing outbound messages should still pass a human gate.

## Daily takeaway
- **Sustainable automation requires controllability.**
- Least privilege + rollback-friendly changes are the highest-leverage baseline.
- Tomorrow’s watchpoints: new plugin risk, exposure changes, audit trendline.
