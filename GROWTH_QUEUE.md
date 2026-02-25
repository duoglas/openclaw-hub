# GROWTH_QUEUE.md

Last updated: 2026-02-26
Owner: hub-growth-runner (sub-agent)
Manager: main session

## Rules
- One task = one measurable output + one commit.
- After each task: update this file (`Doing` -> `Done`) and include commit hash.
- Priority: high-impact, low-risk first.
- Focus scope: SEO/content/internal links/technical hygiene for openclaw-hub.

## Backlog
- [ ] (empty)

## Doing
- [ ] (empty)

## Done
- [x] Improve `weekly:seo` with auto rollup from `reports/seo/daily/*.md` (snapshot count + KPI aggregate when daily fields are filled) — commit `(this commit)`
- [x] Add Organization `logo` metadata to sitewide `WebSite` + blog `Article` JSON-LD for richer brand entity signals in SERP/social parsers — commit `4f27bf1`
- [x] Add daily SEO snapshot generator (`pnpm daily:seo`) that outputs `reports/seo/daily/YYYY-MM-DD.md` with manual GSC KPI slots + auto content counts — commit `(this commit)`
- [x] Add default social share metadata (`og:image` + `twitter:image`) in `BaseLayout`, and wire blog `heroImage` fallback in `BlogPost` for richer link previews — commit `(this commit)`
- [x] Set Open Graph type by page intent (`website` default in BaseLayout, `article` in BlogPost) to improve social/SEO metadata correctness — commit `870c476`
- [x] Add sitewide `WebSite` JSON-LD in BaseLayout (EN/ZH) to strengthen technical SEO baseline — commit `(this commit)`
- [x] SEO hygiene: migrate static sitemap/robots domain references from `openhub.plzbite.top` to `kuoo.uk` — commit `(this commit)`
- [x] Queue hygiene: backfill missing commit hashes for historical Done tasks and clear placeholder hashes — commit `(this commit)`
- [x] Fix root language gateway page canonical/hreflang URLs to `kuoo.uk` (remove stale `openhub.plzbite.top`) to prevent cross-domain SEO confusion — commit `e21cf69`
- [x] Enhance blog JSON-LD with `keywords` and `image` fields for richer SERP eligibility — commit `e2dbd76`
- [x] Add strategic “Further Reading” internal-link block to EN VPS deployment pillar (`/en/blog/openclaw-vps-deployment-complete-guide/`) — commit `e9c4d96`
- [x] Add sitewide “Core Guides” internal-link module on blog posts (EN/ZH), auto-excluding self-link by slug match — commit `b9f3ee1`
- [x] Add JSON-LD structured data (`Article` + `BreadcrumbList`) to blog post layout for richer SERP eligibility — commit `ce5cf8b`
- [x] Add weekly SEO report generator (`weekly:seo`) with auto-filled week range + git-tracked content/tech change sections — commit `a0a35c3`
- [x] Add sitewide pillar internal-links module on daily posts (EN/ZH) to strengthen SEO authority flow — commit `f97212f`
- [x] Create `SEO_WEEKLY_REPORT.md` template for KPI tracking — commit `508463d`
- [x] Add weekly roundup article template + automation hook — commit `d92e02d`
- [x] Fix duplicate content-id warnings surfaced during build — commit `0cc573e`
- [x] Add “related posts” component rules (manual or lightweight static) — commit `43fac36`
- [x] Normalize titles/meta for AI/Tech daily posts (last 14 days) — commit `efc3d13`
- [x] Add internal-link blocks to top 10 traffic pages (ZH) — commit `5ebf215`
- [x] Add internal-link blocks to top 10 traffic pages (EN) — commit `a7353a1`
- [x] ZH pillar refinement: `/zh/blog/openclaw-model-fallback-strategy/` — commit `3c03bf7`
- [x] Rewrite EN pillar: `/en/blog/openclaw-vs-chatgpt-vs-claude/` — commit `6a7ac8f`
- [x] Add internal links on EN pillars (`what-is-openclaw`, `openclaw-model-fallback-strategy`) — commit `62b1d4d`
- [x] ZH pillar rewrite: `/zh/blog/openclaw-vs-chatgpt-vs-claude/` — commit `9828027`
- [x] ZH pillar refinement: `/zh/blog/what-is-openclaw/` — commit `bca1994`
