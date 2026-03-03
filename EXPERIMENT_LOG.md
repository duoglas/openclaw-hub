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
