# GROWTH_QUEUE.md

Last updated: 2026-03-04 05:07
Owner: hub-growth-runner (sub-agent)
Manager: main session

## Rules
- One task = one measurable output + one commit.
- After each task: update this file (`Doing` -> `Done`) and include commit hash.
- Priority: high-impact, low-risk first.
- Focus scope: SEO/content/internal links/technical hygiene for openclaw-hub.

## Backlog
- [ ] P3 Candidate H: weekly:seo 增加“旧域名残留按目录分组”报告 | ICE 4x7x6=168

## Doing
- [ ] (empty)

## Done
- [x] P2 Candidate G: 为 check:tag-case 输出冲突样例 Top10，缩短修复路径（失败时给出变体+样例文件，便于快速修复）| ICE 5x7x6=210 — commit `64d57b6`
- [x] P1 Candidate E: 新增标签大小写碰撞闸门（Tag case-collision）并接入 CI，阻断 `VPS/vps` 这类重复标签页风险（修复 1 处 ZH 标签大小写）| ICE 7x8x8=448 — commit `8c7c5f0`
- [x] P3 Candidate D: 新增 WebSite JSON-LD 字段完整性闸门（name/url/inLanguage/publisher/logo）并接入 CI（含 rg→grep -RIn 回退）| ICE 6x7x6=252 — commit `33d7e7b`
- [x] P2 Candidate C: 新增 Open Graph/Twitter image 绝对 URL 闸门（防止相对路径导致抓取器回退），新增构建后绝对 URL 校验脚本并接入 CI（含 rg→grep 回退）| ICE 7x7x7=343 — commit `(this commit)`
- [x] P2 Candidate B: 新增站点级 hreflang 完整性闸门（覆盖 dist/en|zh 全站 HTML 的 en/zh/x-default 绝对 URL 与互链一致性）并接入 CI；补齐 BaseLayout 全站 alternate 对向链接默认值 | ICE 9x8x8=576 — commit `98d1e80`
- [x] P2 Candidate B: 为 weekly:seo 增加“高跳出率内容复盘占位”输出（基于已有数据做可执行改写队列）| ICE 5x6x5=150 — commit `aadfcff`
- [x] P2 Candidate C: 扩展 noindex-leak 报告格式（按语言输出样例文件）并增加 rg 缺失时 grep 回退 | ICE 4x8x7=224 — commit `e738d7f`
- [x] P1 Candidate A: 新增 RSS 自动发现完整性闸门（构建后校验 EN/ZH 全站 HTML 均包含正确 `rel=alternate` RSS 链接）并接入 CI | ICE 7x8x8=448 — commit `10997ec`
- [x] P1 Candidate: 新增博客详情页 noindex 泄漏闸门（扫描 dist/en|zh/blog 禁止 robots/x-robots noindex）并接入 CI | ICE 9x8x8=576 — commit `908dd6c`
- [x] P1 Candidate: 新增 redirect 规则完整性闸门（校验 _redirects 关键 301/200 规则 + 禁止 302）并接入 CI | ICE 8x8x9=576 — commit `14688d5`
- [x] P2 Candidate: 生成“标题改写执行清单”并自动写入 WEEKLY_REVIEW.md 的 Act 区块 | ICE 7x7x6=294 — commit `4216349`
- [x] P1 Candidate: daily:seo 增加 GSC 数据缺失告警（连续 3 天空值则标红）并接入周报 | ICE 9x7x6=378 — commit `d84169e`
- [x] P1 Candidate: 在 weekly:seo 模板中把 Wins/Problems/Action Plan 从占位符升级为可执行默认项（禁止“fill”占位） | ICE 8x9x8=576 — commit `(this commit)`
- [x] P1 Candidate: weekly:seo 去占位符化（Wins/Problems/Action Plan 默认输出可执行内容），并同步刷新 WEEKLY_REVIEW.md | ICE 8x9x8=576 — commit `(this commit)`
- [x] P2 Candidate C: 为博客详情页增加 FAQPage schema 最低质量检查（问答数>=2）并接入 CI | ICE 7x6x6=252 — commit `730bff7`
- [x] P2 Candidate B: weekly:seo 自动输出“高 impression 低点击”问题查询 Top10（按语言）| ICE 8x6x6=288 — commit `(this commit)`
- [x] P1 Candidate A: 新增 EN/ZH meta description 质量闸门（长度区间 + 占位词拦截）并接入 CI | ICE 9x8x9=648 — commit `45d6a2f`
- [x] P1 Candidate: 将文章页 hreflang alternate 升级为绝对 URL + 强化配对闸门（校验 EN↔ZH 与 x-default 的绝对链接一致性，阻断相对链接回归）| ICE 8x8x7=448 — commit `c14f6c4`
- [x] P2 Candidate: 为每日文章模板增加“转化 CTA 变体 A/B”占位并校验（publish-daily 注入 EN/ZH CTA A/B + 新增 check:daily-cta + CI 接入）| ICE 8x5x6=240 — commit `ff10724`
- [x] P1 Candidate: 新增文章页 canonical 完整性闸门增强版（唯一 canonical / 绝对 https / 无 query/hash / 语言路径约束 / 重复 canonical 检测）并接入现有 CI | ICE 8x8x8=512 — commit `cb49dc0`
- [x] P2 Candidate: weekly:seo 输出补充“标题改写优先级队列”（高展现低 CTR）| ICE 7x6x7=294 — commit `8eed301`
- [x] P1 Candidate: 新增文章页 canonical 完整性闸门（校验 dist/en/blog + dist/zh/blog canonical 域名与路径一致，阻断旧域名/错配）| ICE 9x8x8=576 — commit `2f6143d`
- [x] P1 Candidate: 新增 EN/ZH 文章级 hreflang 配对完整性闸门并接入 CI（ICE 8x8x8=512）— commit `408e19f`
- [x] P2 Candidate: 为 weekly 文章新增“外链证据至少 2 条”质量闸门并接入 CI（ICE 7x6x6=252）— commit `8c3f8a3`
- [x] P2 Candidate: 新增“重复 slug / duplicate id”预检脚本并接入 CI（ICE 8x7x7=392）— commit `8fc1a86`
- [x] P1 Candidate: 新增 frontmatter 日期一致性闸门（updatedDate 不得早于 pubDate）并接入 CI；修复当周 weekly 日期异常（ICE 8x8x8=512）— commit `572d115`
- [x] P1 Candidate: 为 weekly 内容新增评分卡阈值闸门（EN/ZH >=20/30）并接入 CI，低于阈值阻断合并（ICE 9x9x8=648）— commit `371f397`
- [x] Candidate C: 为 weekly report 增加 FAQ 片段输出（ICE 4x4x5=80）— commit `5d05f8b` (push pending: network to github.com:443 failed)
- [x] Candidate B: 为 EN/ZH tag 页面补充 FAQ schema（ICE 6x5x4=120）— commit `HEAD`
- [x] Candidate A: 在 content-check CI 中新增 stale-domain 强制检查，阻断旧域名回流 | ICE 9x9x9=729 — commit `bae8b4c`
- [x] Add FAQ schema to 3 pillar pages (EN/ZH) to enhance SERP rich snippets and user engagement | ICE 7x8x6=336 — commit `5ab9c44`
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
