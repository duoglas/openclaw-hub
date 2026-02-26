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

