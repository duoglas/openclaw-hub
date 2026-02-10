---
title: "OpenClaw Hub Launch Postmortem: Cloudflare Pages + Search Console Pitfalls"
description: "A practical postmortem of deployment and indexing issues: Pages vs Workers, noindex root pages, sitemap routing, and OAuth errors."
pubDate: 2026-02-10
tags: ["openclaw", "cloudflare", "search-console", "seo", "guide"]
category: "guide"
lang: "en"
---

## Key Pitfalls We Hit

### 1) Deploying Pages like a Worker
Wrong: `wrangler deploy`  
Correct: Pages Git deployment, or `wrangler pages deploy dist`.

### 2) Root `/` marked as noindex
If `/` is only a redirect page, Google may treat it as noindex.  
Fix: convert `/` into an indexable language selector page.

### 3) Sitemap entry mismatch
Many tools expect `/sitemap.xml`, while Astro defaults to `sitemap-index.xml`.  
Fix: keep `sitemap-index.xml` and add a compatibility alias at `/sitemap.xml`.

### 4) OpenClaw-to-Claude instability on mainland networks
Symptom: intermittent failures/timeouts when OpenClaw calls Claude APIs.  
Fix strategy:
- Keep proxying at the gateway layer
- Set browser proxy explicitly via `--proxy-server=http://<proxy-host>:<port>`
- Exclude loopback (`127.0.0.1` / `localhost`) from proxy paths so local RPC stays local

This setup significantly improves OpenClaw-to-Claude reliability in mainland network conditions.

### 5) Browser control optimization (critical)
Root cause: Chrome inherited `LD_PRELOAD`, causing GPU-process crashes and browser control timeouts.  
We fixed it with three changes:
1. Add a Chrome wrapper script that runs `unset LD_PRELOAD`
2. Inject proxy args in the wrapper (`--proxy-server=...`)
3. Point OpenClaw `browser.executablePath` to the wrapper and set `browser.noSandbox=true`

After this, browser control became stable enough to continue Search Console automation.

### 6) Search Console API OAuth 403
Unverified app + missing test user leads to hard denial.  
Fix: add test users in OAuth consent screen and complete consent flow.

## Recommended Rollout Order

1. Make the site reachable (custom domain + HTTPS)
2. Submit both sitemap endpoints
3. Request indexing for core URLs
4. Then scale content automation

## Bottom Line

Technical SEO is mostly systems reliability.  
Once the pipeline is clean, growth execution becomes much easier.
