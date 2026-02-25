# SEO Growth Plan (Execution Log)

## Goal
Increase Google Search clicks/impressions for openhub.plzbite.top with weekly execution.

## Baseline (2026-02-25)
- Clicks: 1
- Impressions: 118
- CTR: 0.8%
- Avg Position: 9.1
- Primary indexed query cluster: "openclaw vs chatgpt"

## Active Workstreams

### W1. Fix crawl/index hygiene
- [x] Add legacy URL redirects for `/blog/*.md` -> `/en/blog/*/` via `public/_redirects`.
- [ ] Verify 301 behavior in production after deploy.
- [ ] Submit revalidation for affected URLs in Search Console.

### W2. Content quality and intent matching
- [x] Bulk rewrite thin pages.
- [ ] Prioritize 3 pillar pages and refine title/meta/H1/intro for target query intent.
- [ ] Add internal links from daily posts to pillar pages.

### W3. Publishing discipline
- [x] Daily publish script now syncs Telegram AI/tech brief.
- [ ] Add weekly roundup article (higher search intent than daily brief).

### W4. Measurement cadence
- [x] Daily snapshot: clicks/impressions/top pages/top queries. (`pnpm daily:seo` scaffold added)
- [ ] Weekly trend summary + next actions.

## Pillar Pages (current candidates)
1. /en/blog/openclaw-vs-chatgpt-vs-claude/
2. /en/blog/what-is-openclaw/
3. /en/blog/openclaw-model-fallback-strategy/

## Risks / Needs user intervention
- Search Console property is URL-prefix, not domain-level; keep using correct property.
- Need user to confirm if we can also create Chinese root redirects (`/zh-cn` aliases) if discovered in logs.
