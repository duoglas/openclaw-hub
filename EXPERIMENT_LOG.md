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
