# GROWTH_QUEUE.md

Last updated: 2026-02-26 14:03
Owner: hub-growth-runner (sub-agent)
Manager: main session

## Rules
- One task = one measurable output + one commit.
- After each task: update this file (`Doing` -> `Done`) and include commit hash.
- Priority: high-impact, low-risk first.
- Focus scope: SEO/content/internal links/technical hygiene for openclaw-hub.

## Backlog



## Doing
- [ ] (empty)

## Done
- [x] Add internal links from gateway/VPS guides to allowedOrigins fix article (EN/ZH) | ICE 8x10x9=720 — commit `b14f4e2`
- [x] P2 Candidate C: 为周报新增"变现信号"字段（推荐点击/咨询线索）并回填模板 | ICE 8x6x6=288 — commit `a5521ac`
- [x] P1 Candidate B: 为 /zh 补齐当周 weekly（问题导向）并与 /en 对齐内链与订阅导流（ICE winner: 392） — commit `8ffbb09`
- [x] P1: 为 weekly 文章新增"行业动态/问题洞察/可执行建议"结构校验脚本并接入 CI，并重写当周 EN 周报为行业洞察结构（ICE winner: 576）
- [x] P1 Candidate A: 为 weekly 文章新增"行业动态/问题洞察/可执行建议"结构校验脚本并接入 CI（避免流水账）| ICE 9x8x8=576 — commit `5d66c6a` (duplicate, already done)
- [x] Add low-CTR query opportunity table parser from daily snapshots (ICE winner: 18) - commit `a7f160d`
- [x] Add stale-domain scanner (`openhub.plzbite.top`) with weekly alert output (ICE winner: 22) - commit `(this commit)`
- [x] Add auto-sync of `WEEKLY_REVIEW.md` from `weekly:seo` output to enforce review cadence - add CI freshness gate (`pnpm check:weekly-review`) to block stale week reviews - commit `(this commit)`
- [x] Add auto-sync of `WEEKLY_REVIEW.md` from `weekly:seo` output to enforce review cadence (ICE winner: 26) - commit `(this commit)`
- [x] Queue hygiene v2: backfill remaining `(this commit)` placeholders in Done with real hashes - commit `(this commit)`
- [x] Add `BreadcrumbList` JSON-LD on EN/ZH blog index pages to strengthen list-page hierarchy signals and crawler understanding - commit `edde579`
- [x] Add `BreadcrumbList` JSON-LD (+ `numberOfItems` in `ItemList`) on EN/ZH tag archive pages to strengthen tag-page hierarchy signals and SERP understanding - commit `835c204`
- [x] Add `CollectionPage` + `ItemList` JSON-LD on EN/ZH tag archive pages to improve tag-page crawl understanding and long-tail SEO signals - commit `d2037b3`
- [x] Add `ItemList` JSON-LD on EN/ZH blog index pages to improve list-page understanding by search engines - commit `6115b9d`
- [x] Add sitewide RSS autodiscovery `<link rel="alternate" type="application/rss+xml">` for EN/ZH daily feeds to improve feed discovery in browsers/readers/search bots - commit `0285dde`
- [x] Improve `weekly:seo` with auto rollup from `reports/seo/daily/*.md` (snapshot count + KPI aggregate when daily fields are filled) - commit `59ed405`
- [x] Add Organization `logo` metadata to sitewide `WebSite` + blog `Article` JSON-LD for richer brand entity signals in SERP/social parsers - commit `4f27bf1`
- [x] Add daily SEO snapshot generator (`pnpm daily:seo`) that outputs `reports/seo/daily/YYYY-MM-DD.md` with manual GSC KPI slots + auto content counts - commit `65fa99a`
- [x] Add default social share metadata (`og:image` + `twitter:image`) in `BaseLayout`, and wire blog `heroImage` fallback in `BlogPost` for richer link previews - commit `cef551c`
- [x] Set Open Graph type by page intent (`website` default in BaseLayout, `article` in BlogPost) to improve social/SEO metadata correctness - commit `870c476`
- [x] Add sitewide `WebSite` JSON-LD in BaseLayout (EN/ZH) to strengthen technical SEO baseline - commit `cc31e0d`
- [x] SEO hygiene: migrate static sitemap/robots domain references from `openhub.plzbite.top` to `kuoo.uk` - commit `50f9766`
- [x] Queue hygiene: backfill missing commit hashes for historical Done tasks and clear placeholder hashes - commit `4f629d3`
- [x] Fix root language gateway page canonical/hreflang URLs to `kuoo.uk` (remove stale `openhub.plzbite.top`) to prevent cross-domain SEO confusion - commit `e21cf69`
- [x] Enhance blog JSON-LD with `keywords` and `image` fields for richer SERP eligibility - commit `e2dbd76`
- [x] Add strategic "Further Reading" internal-link block to EN VPS deployment pillar (`/en/blog/openclaw-vps-deployment-complete-guide/`) - commit `e9c4d96`
- [x] Add sitewide "Core Guides" internal-link module on blog posts (EN/ZH), auto-excluding self-link by slug match - commit `b9f3ee1`
- [x] Add JSON-LD structured data (`Article` + `BreadcrumbList`) to blog post layout for richer SERP eligibility - commit `ce5cf8b`
- [x] Add weekly SEO report generator (`weekly:seo`) with auto-filled week range + git-tracked content/tech change sections - commit `a0a35c3`
- [x] Add sitewide pillar internal-links module on daily posts (EN/ZH) to strengthen SEO authority flow - commit `f97212f`
- [x] Create `SEO_WEEKLY_REPORT.md` template for KPI tracking - commit `508463d`
- [x] Add weekly roundup article template + automation hook - commit `d92e02d`
- [x] Fix duplicate content-id warnings surfaced during build - commit `0cc573e`
- [x] Add "related posts" component rules (manual or lightweight static) - commit `43fac36`
- [x] Normalize titles/meta for AI/Tech daily posts (last 14 days) - commit `efc3d13`
- [x] Add internal-link blocks to top 10 traffic pages (ZH) - commit `5ebf215`
- [x] Add internal-link blocks to top 10 traffic pages (EN) - commit `a7353a1`
- [x] ZH pillar refinement: `/zh/blog/openclaw-model-fallback-strategy/` - commit `3c03bf7`
- [x] Rewrite EN pillar: `/en/blog/openclaw-vs-chatgpt-vs-claude/` - commit `6a7ac8f`
- [x] Add internal links on EN pillars (`what-is-openclaw`, `openclaw-model-fallback-strategy`) - commit `62b1d4d`
- [x] ZH pillar rewrite: `/zh/blog/openclaw-vs-chatgpt-vs-claude/` - commit `9828027`
- [x] ZH pillar refinement: `/zh/blog/what-is-openclaw/` - commit `bca1994`
