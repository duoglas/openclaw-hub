# EXPERIMENT_LOG.md

## Experiment Template
- ID:
- Hypothesis:
- Scope (pages/queries):
- Change:
- Start date:
- End date:
- Success metric:
- Result:
- Decision (scale / iterate / stop):

---

## Active Experiments

### EXP-001
- Hypothesis: Question-first titles improve CTR on troubleshooting pages.
- Scope: 10 troubleshooting posts (EN/ZH)
- Change: Rewrite title + description with issue-first wording.
- Success metric: +15% CTR in 7 days vs baseline.
- Result: (pending)
- Decision: (pending)

### EXP-002
- Hypothesis: Enforcing WEEKLY_REVIEW freshness in CI will prevent weekly review drift and keep the review cadence stable.
- Scope: Repo-level CI + weekly review scaffold
- Change: Added `scripts/check-weekly-review-cadence.sh`, npm script `check:weekly-review`, and CI step to fail when current-week line is missing in `WEEKLY_REVIEW.md`.
- Start date: 2026-02-26
- End date: 2026-02-26
- Success metric: CI catches stale WEEKLY_REVIEW before merge; current week check passes after `pnpm weekly:seo`.
- Result: pass (local check verified on current week).
- Decision: scale

### EXP-003
- Hypothesis: Weekly stale-domain scanning on SEO-sensitive paths will prevent legacy-domain leakage into production metadata/pages.
- Scope: `src/`, `public/`, `astro.config.mjs`
- Change: Added `scripts/scan-stale-domain.sh`, npm script `check:stale-domain`, and weekly report integration to emit `reports/seo-weekly/stale-domain-alert-YYYY-MM-DD-to-YYYY-MM-DD.md`.
- Start date: 2026-02-26
- End date: 2026-02-26
- Success metric: `pnpm check:stale-domain` passes with only allowlisted redirect references; weekly alert file generated.
- Result: pass (local check + build passed).
- Decision: scale

### EXP-004
- Hypothesis: Parsing low-CTR query rows from daily snapshots into weekly report will shorten diagnosis time and increase likelihood of title/meta optimization actions.
- Scope: `reports/seo/daily/*.md` → `reports/seo-weekly/*.md`
- Change: Added low-CTR query parser to `scripts/generate-seo-weekly-report.sh` and standardized daily query row format hint in `scripts/generate-seo-daily-snapshot.sh`.
- Start date: 2026-02-26
- End date: 2026-02-26
- Success metric: `pnpm weekly:seo` renders low-CTR opportunity table (or explicit fallback row) with no script errors.
- Result: pass (table rendered; fallback row shown when no structured query metrics provided).
- Decision: iterate (collect 7 days of structured query rows, then tune thresholds).

### EXP-005
- Hypothesis: Enforcing industry/problem/actionability structure for weekly posts will prevent low-value progress logs and increase publish quality consistency.
- Scope: `scripts/generate-weekly-roundup.sh`, CI workflow, weekly post files
- Change: Added `scripts/check-weekly-content-quality.sh` + npm script `check:weekly-content`, wired into `content-check.yml`, and rewrote current EN weekly post to meet quality rubric.
- Start date: 2026-02-26
- End date: 2026-02-26
- Success metric: CI fails weekly posts missing required sections or containing banned progress-log wording; build passes after compliant rewrite.
- Result: pass (local quality check + build passed).
- Decision: scale

### EXP-006
- Hypothesis: Adding targeted internal links from high-traffic guides to new troubleshooting content will improve SEO authority flow and user discoverability.
- Scope: Gateway-start-failed and VPS deployment guides (EN/ZH) → allowedOrigins fix article
- Change: Added new section 3.5 (allowedOrigins error) to gateway-start-failed guides; added pre-exposure security checklist section to VPS deployment guides.
- Start date: 2026-02-26
- End date: 2026-02-26
- Success metric: Build passes with no errors; internal links properly formatted and pointing to existing content.
- Result: pass (build passed + 4 files updated + commit pushed).
- Decision: scale

### EXP-007
- Hypothesis: Adding stale-domain scan into CI quality gate will reduce regression risk of legacy domain references (`openhub.plzbite.top`) before merge.
- Scope: `.github/workflows/content-check.yml` + existing `pnpm check:stale-domain` script
- Change: Inserted dedicated CI step `Stale domain check` running `pnpm check:stale-domain` before taxonomy/frontmatter checks.
- Start date: 2026-02-27
- End date: 2026-02-27
- Success metric: Local build passes and CI workflow now enforces stale-domain scan on push/PR.
- Result: pass (local build passed; workflow includes stale-domain gate).
- Decision: scale

### EXP-008
- Hypothesis: Adding FAQPage schema + visible FAQ snippets on EN/ZH tag archive pages will improve long-tail query matching and rich-result eligibility for tag-intent searches.
- Scope: `src/pages/en/blog/tag/[tag].astro`, `src/pages/zh/blog/tag/[tag].astro`
- Change: Added JSON-LD `FAQPage` (3 Q&A each language) and matching on-page FAQ block to strengthen semantic coverage for each tag page.
- Start date: 2026-02-27
- End date: 2026-02-27
- Success metric: Build passes; tag pages emit valid FAQ JSON-LD and visible FAQ content.
- Result: pass (local `pnpm build` passed; routes generated for EN/ZH tag pages).
- Decision: iterate (track GSC CTR/impressions on tag pages for 7 days).


### EXP-009
- Hypothesis: Weekly roundup templates with built-in FAQ snippets (EN/ZH) plus synchronized quality-check wording will improve rich-result readiness while preventing false-negative content quality failures.
- Scope: `scripts/generate-weekly-roundup.sh`, `scripts/check-weekly-content-quality.sh`, current week EN/ZH weekly pages
- Change: Added FAQ snippet generation in weekly scaffold for both languages; aligned ZH required heading in quality gate with generated template wording.
- Start date: 2026-02-27
- End date: 2026-02-27
- Success metric: `pnpm build` passes and generated weekly EN/ZH pages contain FAQ frontmatter + required sections.
- Result: pass (local build passed; weekly pages generated with FAQ items).
- Decision: scale

### EXP-010
- Hypothesis: Enforcing a numeric scorecard gate for weekly EN/ZH posts in CI (threshold >=20/30) will prevent low-value weekly content from being merged and keep quality aligned with monetization-oriented structure.
- Scope: `scripts/check-weekly-scorecard.sh`, `package.json`, `.github/workflows/content-check.yml`
- Change: Added weekly scorecard script that auto-scores latest EN/ZH weekly posts across six dimensions (intent/actionability/evidence/structure/internal links/differentiation), added `pnpm check:weekly-scorecard`, and wired it into CI.
- Start date: 2026-03-03
- End date: 2026-03-03
- Success metric: Local scorecard gate passes at >=20 for both EN/ZH weekly posts; `pnpm build` remains green after CI workflow update.
- Result: pass (EN=24, ZH=24; build passed).
- Decision: scale

### EXP-011
- Hypothesis: Enforcing frontmatter date consistency in CI (`updatedDate >= pubDate`) will block invalid chronology metadata before merge and reduce SEO trust-risk from incorrect article freshness signals.
- Scope: `scripts/check-frontmatter-dates.sh`, `package.json`, `.github/workflows/content-check.yml`, current EN/ZH weekly posts
- Change: Added date-consistency checker script, npm script `check:frontmatter-dates`, CI gate step, and fixed current weekly posts where `updatedDate` was earlier than `pubDate`.
- Start date: 2026-03-03
- End date: 2026-03-03
- Success metric: `pnpm check:frontmatter-dates` passes and `pnpm build` remains green after gate integration.
- Result: pass (invalid dates detected first, fixed to 2026-03-01 for EN/ZH weekly, then gate + build passed).
- Decision: scale

### EXP-012
- Hypothesis: Adding a CI precheck for duplicate slugs (route-level) and duplicate rendered HTML ids will catch SEO/crawl conflicts before merge with low maintenance overhead.
- Scope: `scripts/check-duplicate-slug-id.mjs`, `package.json`, `.github/workflows/content-check.yml`
- Change: Added `check:duplicate-slug-id` script. It enforces unique slugs per language in `src/content/blog/**` and scans `dist/**/*.html` for duplicate rendered `id` attributes. Wired it into Content Check workflow.
- Start date: 2026-03-03
- End date: 2026-03-03
- Success metric: `pnpm build` + `pnpm check:duplicate-slug-id` both pass; CI includes dedicated duplicate slug/id gate.
- Result: pass (initial source-heading-only approach caused false positives; switched to rendered HTML id scan; final gate passed).
- Decision: scale

### EXP-013
- Hypothesis: Enforcing a minimum of 2 external evidence links in latest EN/ZH weekly posts via CI will reduce unsupported claims and improve weekly content trustworthiness.
- Scope: `scripts/check-weekly-external-evidence.sh`, `package.json`, `.github/workflows/content-check.yml`, latest EN/ZH weekly posts
- Change: Added external evidence gate script (`check:weekly-external-evidence`), wired it into content-check CI, and inserted 3 authoritative external references into both EN/ZH weekly posts.
- Start date: 2026-03-03
- End date: 2026-03-03
- Success metric: `pnpm check:weekly-external-evidence` passes with EN/ZH >=2 external links and `pnpm build` remains green.
- Result: pass (EN=3, ZH=3; gate passed; build passed).
- Decision: scale

### EXP-014
- Hypothesis: Adding an EN/ZH post-level hreflang pair integrity gate in CI will prevent alternate-link drift and reduce cross-language indexing confusion.
- Scope: `scripts/check-hreflang-pairs.sh`, `package.json`, `.github/workflows/content-check.yml`, `dist/en/blog/*`, `dist/zh/blog/*`
- Change: Added `check:hreflang-pairs` script that validates reciprocal `hreflang` + expected alternate `href` + `x-default` for each EN/ZH blog pair after build; wired it into Content Check workflow.
- Start date: 2026-03-03
- End date: 2026-03-03
- Success metric: `pnpm build && pnpm check:hreflang-pairs` passes with all current EN/ZH post pairs validated.
- Result: pass (65 EN/ZH blog pairs validated).
- Decision: scale

### EXP-015
- Hypothesis: Enforcing canonical integrity in CI for all EN/ZH blog output pages will prevent stale-domain regression and URL mismatch (encoded path / wrong host) before merge.
- Scope: `scripts/check-canonical-integrity.sh`, `package.json`, `.github/workflows/content-check.yml`, `dist/en/blog/**/index.html`, `dist/zh/blog/**/index.html`
- Change: Added `check:canonical-integrity` script to validate canonical existence, domain (`kuoo.uk`), and expected encoded path; wired it into Content Check workflow.
- Start date: 2026-03-03
- End date: 2026-03-03
- Success metric: `pnpm build && pnpm check:canonical-integrity` passes with full EN/ZH blog coverage.
- Result: pass (371 blog pages validated).
- Decision: scale

### EXP-016
- Hypothesis: Weekly report中加入“标题改写优先级队列”（高展现低CTR）可缩短从发现问题到执行改写的路径，并提升下周CTR优化执行率。
- Scope: `scripts/generate-seo-weekly-report.sh`, `reports/seo-weekly/seo-weekly-2026-03-02-to-2026-03-08.md`, `WEEKLY_REVIEW.md`
- Change: 在 `weekly:seo` 增加 `collect_title_rewrite_queue`，按曝光/CTR/排名生成 Priority 分数与改写建议；输出新增专门章节并完成本周报告回填。
- Start date: 2026-03-03
- End date: 2026-03-03
- Success metric: `pnpm weekly:seo && pnpm build` 通过，周报中自动产出可执行标题改写队列。
- Result: pass（周报已生成改写优先级表，构建通过）。
- Decision: scale

### EXP-017
- Hypothesis: 在现有 canonical 校验基础上增加“唯一 canonical、绝对 https、无 query/hash、语言路径约束、重复 canonical 检测”可更早阻断跨页 canonical 污染和模板回归。
- Scope: `scripts/check-canonical-integrity.sh`, CI `pnpm check:canonical-integrity`, `dist/en/blog/**`, `dist/zh/blog/**`
- Change: 强化 canonical gate，新增 canonical 标签计数校验、host/协议约束、query/hash 禁止、EN/ZH 路径约束及 canonical 唯一性校验（基于 URL 去重）。
- Start date: 2026-03-03
- End date: 2026-03-03
- Success metric: `pnpm build && pnpm check:canonical-integrity` 通过，输出覆盖页数与唯一 canonical 数一致。
- Result: pass（371 pages validated / 371 unique canonicals）。
- Decision: scale

### EXP-018
- Hypothesis: 在每日文章模板内固定注入 CTA 变体 A/B，并用 CI 校验最新 EN/ZH 日报都包含 CTA 标记，可提升转化位点覆盖率并避免模板回归。
- Scope: `scripts/publish-daily.sh`, `scripts/check-daily-cta-variants.sh`, `package.json`, `.github/workflows/content-check.yml`, latest EN/ZH daily posts
- Change: 为 `publish-daily.sh` 增加 EN/ZH CTA A/B 区块（`CTA_VARIANT_A/B` 标记）；新增 `check:daily-cta` 脚本并接入 content-check CI gate。
- Start date: 2026-03-03
- End date: 2026-03-03
- Success metric: `pnpm check:daily-cta && pnpm build` 通过，最新 EN/ZH 日报均包含 CTA A/B。
- Result: pass（latest EN/ZH daily files validated，build passed）。
- Decision: scale

### EXP-019
- Hypothesis: 将 hreflang 配对校验从“存在性”升级为“绝对 URL 精确匹配（含 x-default）”并统一 BlogPost alternate 输出为绝对 URL，可提前阻断相对路径与跨域部署下的语言页索引漂移。
- Scope: `src/layouts/BlogPost.astro`, `scripts/check-hreflang-pairs.sh`, `dist/en/blog/*`, `dist/zh/blog/*`
- Change: 把 `BlogPost` 的 `alternateUrl` 改为 `${Astro.url.origin}/${otherLang}/blog/${slug}/` 绝对链接；重写 `check-hreflang-pairs.sh`，逐页校验 `hreflang` 对应 `href` 为 `https://kuoo.uk/...` 绝对 URL，并校验 EN/ZH 两侧 `x-default` 一致指向 EN canonical。
- Start date: 2026-03-03
- End date: 2026-03-03
- Success metric: `pnpm build && pnpm check:canonical-integrity && pnpm check:hreflang-pairs` 全通过；输出覆盖 EN/ZH 配对页数量。
- Result: pass（build 通过；canonical 371 页通过；hreflang 65 对通过，且为 absolute alternate URLs）。
- Decision: scale

### EXP-020
- Hypothesis: 在 CI 增加 EN/ZH description 质量闸门（长度区间 + 占位词拦截）可提前阻断低质量摘要回归，提升页面摘要稳定性与可点击性。
- Scope: `scripts/check-meta-description-quality.sh`, `package.json`, `.github/workflows/content-check.yml`, `src/content/blog/en/*.md`, `src/content/blog/zh/*.md`
- Change: 新增 `check:meta-description`（Python 实现）校验 description 字段存在、EN 长度 45-260、ZH 长度 25-130，并拦截 TODO/TBD/coming soon/待补充 等占位词；接入 content-check CI。
- Start date: 2026-03-03
- End date: 2026-03-03
- Success metric: `pnpm check:meta-description && pnpm build` 通过，且输出覆盖校验文件数。
- Result: pass（130 files validated，build passed）。
- Decision: scale

### EXP-021
- Hypothesis: 在 `weekly:seo` 中按语言（EN/ZH）自动输出“高展现低CTR”Top10，可把诊断结果直接映射到语言页改写任务，提升下一步执行效率。
- Scope: `scripts/generate-seo-weekly-report.sh`, `reports/seo-weekly/seo-weekly-2026-03-02-to-2026-03-08.md`, `WEEKLY_REVIEW.md`, `GROWTH_QUEUE.md`
- Change: 新增 `collect_low_ctr_by_language(en|zh)`，在周报输出 EN/ZH Top10 双表；执行 `pnpm weekly:seo` 刷新周报与复盘；任务从 Backlog->Doing->Done 留痕。
- Start date: 2026-03-03
- End date: 2026-03-03
- Success metric: `pnpm weekly:seo && pnpm build` 通过，周报包含 EN/ZH Top10 章节。
- Result: pass（周报含按语言 Top10 输出；构建通过）。
- Decision: scale

### EXP-022
- Hypothesis: Enforcing a minimum FAQ quality gate for blog detail pages (FAQ-enabled posts must include >=2 Q&A with non-empty question/answer) will prevent thin FAQ schema regression and preserve rich-result eligibility quality.
- Scope: `scripts/check-blog-faq-quality.sh`, `package.json`, `.github/workflows/content-check.yml`, `src/content/blog/en/*.md`, `src/content/blog/zh/*.md`
- Change: Added `check:blog-faq` script to validate FAQ frontmatter quality (>=2 Q&A, non-empty question/answer) across EN/ZH blog content and wired it into Content Check CI.
- Start date: 2026-03-03
- End date: 2026-03-03
- Success metric: `pnpm check:blog-faq && pnpm build` passes; CI includes dedicated FAQ quality gate.
- Result: pass（130 files checked, FAQ-enabled posts=6; build passed）.
- Decision: scale


### EXP-023
- Hypothesis: Replacing placeholder text (`fill`) in weekly:seo generated sections (Wins/Problems/Action Plan) with default actionable statements will reduce empty weekly reviews and increase execution follow-through.
- Scope: `scripts/generate-seo-weekly-report.sh`, `reports/seo-weekly/seo-weekly-2026-03-02-to-2026-03-08.md`, `WEEKLY_REVIEW.md`
- Change: Updated weekly generator to emit non-placeholder default wins/problems/action plan items with owner+due placeholders tied to current week end date; regenerated weekly report and review scaffold.
- Start date: 2026-03-03
- End date: 2026-03-03
- Success metric: `pnpm weekly:seo && pnpm build` passes and generated report no longer contains `(fill)` in section 10/11.
- Result: pass (generation/build passed; weekly report and review refreshed with actionable defaults).
- Decision: scale

### EXP-024
- Hypothesis: Adding an automatic GSC data-gap alert (red when consecutive missing days >=3) into weekly SEO report + WEEKLY_REVIEW will surface measurement blind spots earlier and force higher-priority KPI backfill actions.
- Scope: `scripts/generate-seo-weekly-report.sh`, `reports/seo-weekly/seo-weekly-2026-03-02-to-2026-03-08.md`, `WEEKLY_REVIEW.md`, `GROWTH_QUEUE.md`
- Change: Added `collect_gsc_data_gap_alert` to compute max consecutive missing days and weekly missing ratio from `reports/seo/daily/*.md`; integrated alert block into weekly report Section 9 and linked action priority in next-week plan; refreshed WEEKLY_REVIEW observe block with completeness alert context.
- Start date: 2026-03-03
- End date: 2026-03-03
- Success metric: `pnpm weekly:seo && pnpm build` passes; weekly report shows RED/WARN/OK alert state with consecutive missing-day count.
- Result: pass (current week shows 🔴 RED, max consecutive missing days=7; build passed).
- Decision: scale

### EXP-025
- Hypothesis: Enforcing redirect-rule integrity in CI (`public/_redirects`) will prevent accidental SEO-critical redirect regressions (legacy domain mapping, blog canonical path normalization) before merge.
- Scope: `scripts/check-redirect-rules.sh`, `package.json`, `.github/workflows/content-check.yml`, `public/_redirects`
- Change: Added `check:redirect-rules` script to validate required 301/200 rules and block 302 temporary redirects; wired it into content-check CI after FAQ gate.
- Start date: 2026-03-04
- End date: 2026-03-04
- Success metric: `pnpm check:redirect-rules && pnpm build` passes; CI now includes dedicated redirect rules gate.
- Result: pass（redirect rules check + build passed）.
- Decision: scale

### EXP-026
- Hypothesis: Adding a noindex-leak gate for built EN/ZH blog pages will catch accidental `robots/x-robots` noindex regressions before merge and protect indexable article coverage.
- Scope: `scripts/check-noindex-leak.sh`, `package.json`, `.github/workflows/content-check.yml`, `dist/en/blog/**`, `dist/zh/blog/**`
- Change: Added `check:noindex-leak` script to scan built blog HTML pages and fail if any robots/x-robots meta includes `noindex`; integrated the gate into Content Check CI after redirect checks.
- Start date: 2026-03-04
- End date: 2026-03-04
- Success metric: `pnpm build && pnpm check:noindex-leak` passes with full EN/ZH blog coverage and zero noindex findings.
- Result: pass（369 blog pages scanned, 0 noindex leaks; build passed）.
- Decision: scale

### EXP-027
- Hypothesis: Adding an RSS autodiscovery integrity gate in CI for all built EN/ZH HTML pages will prevent feed-link regressions and improve subscription discoverability consistency.
- Scope: `scripts/check-rss-autodiscovery.sh`, `package.json`, `.github/workflows/content-check.yml`, `dist/en/**/*.html`, `dist/zh/**/*.html`
- Change: Added `check:rss-autodiscovery` script to validate each built EN/ZH page contains `rel=alternate` + `type=application/rss+xml` with language-correct RSS href/title; wired it into Content Check CI after noindex leak check.
- Start date: 2026-03-04
- End date: 2026-03-04
- Success metric: `pnpm build && pnpm check:rss-autodiscovery` passes with full EN/ZH page coverage.
- Result: pass（EN 183 pages + ZH 192 pages validated; build passed）.
- Decision: scale


### EXP-028
- Hypothesis: Expanding noindex-leak output with language-level breakdown and sample paths (plus `grep -RIn` fallback when `rg` is unavailable) will reduce triage time and improve diagnostic resilience across heterogeneous CI/dev environments.
- Scope: `scripts/check-noindex-leak.sh`, `GROWTH_QUEUE.md`
- Change: Upgraded noindex leak checker to emit EN/ZH scanned+leak counts and sample leaking files, and added automatic fallback path when `rg` is not installed.
- Start date: 2026-03-04
- End date: 2026-03-04
- Success metric: `pnpm check:noindex-leak && pnpm build` passes, and noindex report prints EN/ZH segmented summary.
- Result: pass（EN 180 scanned, ZH 189 scanned, leaks=0; build passed）.
- Decision: scale

### EXP-029
- Hypothesis: Adding a weekly high-bounce retro proxy queue (high-impression + low-CTR pages with actionable rewrite guidance) into `weekly:seo` will convert blind “复盘占位” into executable tasks and reduce no-op weekly reviews.
- Scope: `scripts/generate-seo-weekly-report.sh`, `reports/seo-weekly/seo-weekly-2026-03-02-to-2026-03-08.md`, `WEEKLY_REVIEW.md`, `GROWTH_QUEUE.md`
- Change: Implemented `collect_high_bounce_retro_queue` and injected Section 7 table with owner/due/action fields; updated weekly action plan to include top-2 retro execution task.
- Start date: 2026-03-04
- End date: 2026-03-04
- Success metric: `pnpm weekly:seo && pnpm build` passes, and weekly report includes non-placeholder high-bounce retro queue.
- Result: pass（Section 7 generated with actionable fallback row; build passed）.
- Decision: scale

### EXP-030
- Hypothesis: Enforcing a sitewide EN/ZH hreflang integrity gate (including x-default and absolute kuoo.uk URLs) will catch archive/home/daily alternate-link regressions before merge and reduce cross-language indexing drift.
- Scope: `scripts/check-sitewide-hreflang.sh`, `src/layouts/BaseLayout.astro`, `package.json`, `.github/workflows/content-check.yml`, `dist/en/**/*.html`, `dist/zh/**/*.html`, `GROWTH_QUEUE.md`
- Change: Added `check:sitewide-hreflang` script (Python-backed) to validate en/zh/x-default alternates on all built EN/ZH pages; integrated CI step; patched `BaseLayout` to always output opposite-language alternate link by default when page-level override is absent.
- Start date: 2026-03-04
- End date: 2026-03-04
- Success metric: `pnpm build && pnpm check:sitewide-hreflang` passes with full EN/ZH page coverage.
- Result: pass（sitewide hreflang check passed: 375 pages validated; build passed）.
- Decision: scale

### EXP-031
- Hypothesis: Enforcing absolute `og:image` / `twitter:image` URLs (https://kuoo.uk/...) in CI will prevent social crawler fallback issues caused by relative paths and keep cross-platform preview rendering stable.
- Scope: `scripts/check-social-image-absolute.sh`, `package.json`, `.github/workflows/content-check.yml`, `dist/en/**/*.html`, `dist/zh/**/*.html`, `GROWTH_QUEUE.md`
- Change: Added `check:social-image-absolute` gate to scan built EN/ZH HTML for `og:image` and `twitter:image` meta tags and require absolute `https://kuoo.uk/` URLs; integrated gate into Content Check CI; added `rg` unavailable fallback to `grep` in checker.
- Start date: 2026-03-04
- End date: 2026-03-04
- Success metric: `pnpm build && pnpm check:social-image-absolute` passes with full EN/ZH page coverage and zero relative social-image URLs.
- Result: pass（EN 183 pages + ZH 192 pages validated; build passed）.
- Decision: scale

### EXP-032
- Hypothesis: Enforcing WebSite JSON-LD field integrity (`name/url/inLanguage/publisher/logo`) on all built EN/ZH pages in CI will prevent schema-field regression and keep site-level entity signals stable for crawlers.
- Scope: `scripts/check-website-schema-integrity.sh`, `package.json`, `.github/workflows/content-check.yml`, `dist/en/**/*.html`, `dist/zh/**/*.html`, `GROWTH_QUEUE.md`
- Change: Added `check:website-schema` gate to validate WebSite JSON-LD presence and required fields across built EN/ZH HTML; integrated gate into Content Check CI; implemented `rg` unavailable fallback to `grep -RIn`.
- Start date: 2026-03-04
- End date: 2026-03-04
- Success metric: `pnpm build && pnpm check:website-schema` passes with zero missing required fields.
- Result: pass（全站 EN/ZH 页面校验通过；build passed）.
- Decision: scale

### EXP-033
- Hypothesis: Enforcing tag case-collision checks in CI (same lowercase key with different case variants, e.g. `VPS` vs `vps`) will prevent duplicate/fragmented tag archive routes and keep taxonomy stable.
- Scope: `scripts/check-tag-case-collision.sh`, `package.json`, `.github/workflows/content-check.yml`, `src/content/blog/en/*.md`, `src/content/blog/zh/*.md`
- Change: Added `check:tag-case` gate with frontmatter parser (inline + block list tags), scanned EN/ZH posts for case-collision variants, normalized existing `VPS` tag in one ZH post to `vps`, and integrated the gate into Content Check CI.
- Start date: 2026-03-04
- End date: 2026-03-04
- Success metric: `pnpm check:tag-case && pnpm build` passes with zero case-collision tags.
- Result: pass（130 files scanned, 0 collisions; build passed）.
- Decision: scale

### EXP-034
- Hypothesis: Showing Top10 collision examples (variant + sample file paths) in `check:tag-case` failure output will shorten diagnosis time and reduce fix turnaround when collisions reappear.
- Scope: `scripts/check-tag-case-collision.sh`, `GROWTH_QUEUE.md`
- Change: Upgraded case-collision checker to rank collision keys by reference volume and print Top10 actionable samples per variant; keeps pass behavior unchanged when no collisions exist.
- Start date: 2026-03-04
- End date: 2026-03-04
- Success metric: `pnpm build && pnpm check:tag-case` passes; when collisions exist, output includes ranked Top10 examples for direct repair.
- Result: pass（build passed; tag-case gate passed with 130 files scanned）.
- Decision: scale

### EXP-035
- Hypothesis: Extending stale-domain weekly diagnostics with directory-grouped counts and top samples will reduce triage time and make old-domain cleanup execution-ready instead of raw line dumps.
- Scope: `scripts/scan-stale-domain.sh`, `scripts/generate-seo-weekly-report.sh`, `reports/seo-weekly/stale-domain-alert-2026-03-02-to-2026-03-08.md`, `reports/seo-weekly/seo-weekly-2026-03-02-to-2026-03-08.md`, `WEEKLY_REVIEW.md`, `GROWTH_QUEUE.md`
- Change: Added grouped output (violations/allowed by directory + Top3 samples) in stale-domain scanner and synced weekly report Section 11 to embed grouped table snapshot for faster review.
- Start date: 2026-03-04
- End date: 2026-03-04
- Success metric: `pnpm check:stale-domain && pnpm weekly:seo && pnpm build` passes; weekly report contains directory-grouped stale-domain summary.
- Result: pass（stale-domain check/weekly generation/build passed; grouped tables rendered in alert + weekly report）.
- Decision: scale

### EXP-036
- Hypothesis: Upgrading `check:website-schema` from string-presence checks to strict JSON-LD semantic validation (with language/path consistency and nested `publisher.logo` enforcement) will catch silent schema regressions earlier and reduce production SEO metadata drift.
- Scope: `scripts/check-website-schema-integrity.sh`, `GROWTH_QUEUE.md`, `EXPERIMENT_LOG.md`
- Change: Rewrote schema checker to parse JSON-LD blocks (`@graph` aware), enforce exactly one `WebSite` node per page, validate `name/url/inLanguage/publisher.{name,url,logo}` semantics, require `https://kuoo.uk` host and EN/ZH path-language consistency, and kept `rg` unavailable fallback to `grep -RIn`.
- Start date: 2026-03-04
- End date: 2026-03-04
- Success metric: `pnpm check:website-schema && pnpm build` passes; checker validates all EN/ZH built pages with strict rules.
- Result: pass（strict schema gate passed on 374 EN/ZH HTML pages；build passed）.
- Decision: scale

### EXP-037
- Hypothesis: Printing a ranked Top10 failure sample list in `check:website-schema` output will shorten triage time when schema checks fail, turning noisy logs into immediate fix targets.
- Scope: `scripts/check-website-schema-integrity.sh`, `GROWTH_QUEUE.md`, `EXPERIMENT_LOG.md`
- Change: Added explicit `Top10 failure samples` section in failure path, preserving full issue dump while surfacing first 10 actionable examples; retained existing `rg` -> `grep -RIn` fallback behavior.
- Start date: 2026-03-04
- End date: 2026-03-04
- Success metric: `pnpm check:website-schema && pnpm build` passes, and failure path includes Top10 sample block for faster debugging.
- Result: pass（schema gate + build passed; Top10 block now emitted on failure path）.
- Decision: scale

### EXP-038
- Hypothesis: Adding a 7-day schema-risk trend placeholder to `weekly:seo` will expose observability gaps early and create a direct execution path to integrate schema risk metrics into daily snapshots.
- Scope: `scripts/generate-seo-weekly-report.sh`, `reports/seo-weekly/seo-weekly-2026-03-02-to-2026-03-08.md`, `WEEKLY_REVIEW.md`, `GROWTH_QUEUE.md`
- Change: Added `collect_schema_risk_trend_placeholder` (7-day table), inserted Section 11 schema trend block in weekly report, shifted downstream section numbering, and added explicit action item to integrate `Schema Risk Status/Issues` into `daily:seo` output.
- Start date: 2026-03-04
- End date: 2026-03-04
- Success metric: `pnpm weekly:seo && pnpm build` passes and weekly report includes Section 11 schema-risk trend placeholder with actionable follow-up.
- Result: pass（weekly report + weekly review updated; build passed）.
- Decision: iterate

### EXP-039
- Hypothesis: Auto-collecting schema risk fields in `daily:seo` from `check:website-schema` output will turn weekly Section 11 from placeholder-heavy reporting into measurable daily trend data and reduce blind spots in schema hygiene.
- Scope: `scripts/generate-seo-daily-snapshot.sh`, `reports/seo/daily/2026-03-04.md`, `GROWTH_QUEUE.md`, `EXPERIMENT_LOG.md`
- Change: Extended daily snapshot generator to run schema gate when `dist/en`+`dist/zh` are present, then write `Schema Risk Status/Issues/Source` fields into snapshot output; fixed snapshot template escaping to avoid shell interpolation issues.
- Start date: 2026-03-04
- End date: 2026-03-04
- Success metric: `bash scripts/generate-seo-daily-snapshot.sh 2026-03-04 && pnpm build` passes, and daily snapshot contains non-empty schema risk fields.
- Result: pass（daily snapshot generated with `pass/0/website-schema-gate`; build passed）.
- Decision: scale

### EXP-040
- Hypothesis: Adding explicit daily snapshot input-completeness signals (GSC fields filled + schema readiness + weekly input quality flag) will reduce invalid weekly-report inputs and shorten diagnosis loops.
- Scope: `scripts/generate-seo-daily-snapshot.sh`, `reports/seo/daily/2026-03-04.md`, `GROWTH_QUEUE.md`, `EXPERIMENT_LOG.md`
- Change: Upgraded `daily:seo` to preserve existing manual GSC values, auto-calculate `GSC Required Fields Filled` / `Missing GSC Fields`, compute `Schema Data Readiness`, and emit `Weekly Input Quality Flag` in a new completeness block.
- Start date: 2026-03-04
- End date: 2026-03-04
- Success metric: `pnpm daily:seo && pnpm build` passes, and daily snapshot includes machine-readable completeness hints for weekly generation.
- Result: pass（snapshot now outputs completeness block; build passed）.
- Decision: scale

### EXP-041
- Hypothesis: Surfacing schema-risk weekly aggregates (avg/peak/coverage) directly in weekly report output will improve decision quality versus row-only daily snapshots and reduce false confidence when data coverage is low.
- Scope: `scripts/generate-seo-weekly-report.sh`, `reports/seo-weekly/seo-weekly-2026-03-02-to-2026-03-08.md`, `WEEKLY_REVIEW.md`, `GROWTH_QUEUE.md`
- Change: Added computed `SCHEMA_WEEK_COVERAGE_PCT`, replaced free-text schema aggregate lines with a structured aggregate table (avg/peak/coverage), and updated WEEKLY_REVIEW observe text to include numeric coverage signal.
- Start date: 2026-03-04
- End date: 2026-03-04
- Success metric: `pnpm weekly:seo && pnpm build` passes, and weekly report Section 11 includes explicit aggregate metrics table.
- Result: pending (execution environment currently blocks `exec`, so build/regeneration/verification and git steps are waiting).
- Decision: iterate

### EXP-042
- Hypothesis: 发布“`openclaw status` vs `openclaw gateway status` 区分与5分钟排障流”的中英双语 FAQ，可显著降低“在线不回复”类问题的误判率，并提升该类检索意图的着陆点击与停留质量。
- Scope: `/zh/blog/openclaw-status-vs-gateway-status-difference-and-debug-flow-2026/` + `/en/blog/openclaw-status-vs-gateway-status-difference-and-debug-flow-2026/`
- Change: 新增中英双语教程，提供命令级分层解释、可复制决策流、最小证据包，并加入3篇高相关内链。
- Target channel: Google Search（故障排查长尾词）+ Telegram 社群问题答复引用
- Expected metrics: 7天内目标页 CTR 提升 >=12%，平均参与时长 >=90s，相关问题工单首轮误判率下降 >=20%
- Observation cycle: 7 天（D+1~D+7）
- Start date: 2026-03-05
- End date: 2026-03-12
- Success metric: GSC query CTR/点击、页面参与时长、社群答复一次命中率
- Result: pass（中英双语文章已发布到仓库，`pnpm build` 通过并生成对应 EN/ZH 路由；进入 7 天观测期，待回填 CTR/参与时长/社群一次命中率）
- Decision: iterate（保留页面结构，7 天后按 GSC 与社群数据决定是否扩写 FAQ 与内链锚文本）

### EXP-044
- Hypothesis: 发布“`openclaw channels status --probe` 5分钟定位在线不回复”的中英双语教程，可提升高意图排障词点击质量，并减少社群中错误排障路径（只查 gateway 不查 channel）。
- Scope: `/zh/blog/openclaw-channels-status-probe-no-reply-diagnosis-2026/` + `/en/blog/openclaw-channels-status-probe-no-reply-diagnosis-2026/`
- Change: 新增中英双语 FAQ/教程，加入可复制命令、症状→动作映射、可验证完成清单；各文内加入 3 条高相关内链。
- Target channel: Google Search（OpenClaw Telegram/online-no-reply 长尾词）+ Telegram 社群答疑引用
- Expected metrics: 7 天内目标页 CTR 提升 >=10%，平均参与时长 >=100s，社群同类问题首轮定位成功率提升 >=20%
- Observation cycle: 7 天（D+1~D+7）
- Start date: 2026-03-06
- End date: 2026-03-13
- Success metric: GSC 查询 CTR/点击、GA4 参与时长、社群问题一次定位率
- Result: pass（中英双语内容已落库并完成本轮增长执行，`pnpm build` 通过；生成 EN/ZH 路由并进入 7 天观测期）
- Decision: iterate（保留命令级排障结构；D+7 回填 CTR/参与时长/社群一次定位率后决定是否扩展 FAQ 与内链锚文本）

### EXP-045
- Hypothesis: 发布“`openclaw doctor --fix` vs `--repair` 安全修复”中英双语教程，可降低用户误用 `--force` 导致配置覆盖的风险，并提升 doctor 相关高意图检索点击质量。
- Scope: `/zh/blog/openclaw-doctor-fix-vs-repair-safe-recovery-2026/` + `/en/blog/openclaw-doctor-fix-vs-repair-safe-recovery-2026/`
- Change: 新增中英双语 FAQ/教程，明确 `--fix`=`--repair`、`--force` 风险边界，提供可复制的安全修复流程、验证清单与最小证据包，并加入 4 条高相关内链。
- Target channel: Google Search（doctor/fix/repair/force 长尾检索）+ Telegram 社群排障答疑引用
- Expected metrics: 7 天内目标页 CTR 提升 >=10%，平均参与时长 >=100s，社群中“误用 --force”类问题占比下降 >=20%
- Observation cycle: 7 天（D+1~D+7）
- Start date: 2026-03-07
- End date: 2026-03-14
- Success metric: GSC 查询 CTR/点击、GA4 参与时长、社群问题类型占比
- Result: pass（中英双语文章已落库，`pnpm build` 通过并生成 EN/ZH 路由；进入 7 天观测期）
- Decision: iterate（保留“先 repair 后 force”结构，D+7 回填指标后决定是否扩展对比表与 FAQ）

### EXP-046
- Hypothesis: 发布“OpenClaw Skill 安装后不生效”中英双语教程，可提升技能类高意图检索的点击质量，并降低社群中“装了没反应”的重复排障成本。
- Scope: `/zh/blog/openclaw-skill-not-working-allowlist-fix-2026/` + `/en/blog/openclaw-skill-not-working-allowlist-fix-2026/`
- Change: 新增中英双语 FAQ/教程，提供可复制命令的 3 步排障流程（安装确认/白名单/重启验证），并加入 3 条高相关内链。
- Target channel: Google Search（skills/allowlist/skill not working 长尾词）+ Telegram 社群答疑引用
- Expected metrics: 7 天内目标页 CTR 提升 >=10%，平均参与时长 >=90s，社群同类问题首轮定位成功率提升 >=20%
- Observation cycle: 7 天（D+1~D+7）
- Start date: 2026-03-10
- End date: 2026-03-17
- Success metric: GSC 查询 CTR/点击、GA4 参与时长、社群一次定位率
- Result: pass（2026-03-11 复核 build 通过；EN/ZH 路由生成完毕，进入 7 天观测期）
- Decision: iterate（先观察 7 天检索与社群反馈，再决定是否扩展 FAQ 与内链锚文本）

### EXP-047
- Hypothesis: 为“Skill 安装后不生效”双语教程补齐 FAQ schema（>=3 Q&A）可提升富结果命中率与高意图检索点击质量。
- Scope: `/zh/blog/openclaw-skill-not-working-allowlist-fix-2026/` + `/en/blog/openclaw-skill-not-working-allowlist-fix-2026/`
- Change: 在 EN/ZH 文章 frontmatter 增加 3 条 FAQ（常见原因/白名单位置/是否需要重启），供 FAQPage schema 输出。
- Start date: 2026-03-11
- End date: 2026-03-11
- Success metric: `pnpm build` 通过且 EN/ZH 页面生成 FAQ schema（>=3 条 Q&A）。
- Result: pass（FAQ frontmatter 已添加；build 通过并生成 EN/ZH 路由）。
- Decision: iterate（D+7 回填 CTR/参与时长与 FAQ rich result 覆盖率）。
