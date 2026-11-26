# WEEKLY_REVIEW.md

## Week Meta
- Week: 2026-11-23 to 2026-11-29
- Owner: site-editor
- Reviewed at: 2026-11-26 17:47 (Asia/Shanghai)
- Reviewer: maintenance assistant; this is not independent article approval
- Review type: evidence-informed maintenance and editorial review
- Observation cutoff: 2026-11-26 afternoon; the week is incomplete

## Observe — what the evidence establishes

The repository contains one existing receipt-backed new bilingual edition created this week: [23 November daily](editorial/receipts/2026-11-23-daily.json), created at 2026-11-23T10:22:14+08:00. A receipt records source and review bindings; it does not establish production deployment, readership or uninterrupted scheduling.

The [24 November backfill commit](https://github.com/duoglas/openclaw-hub/commit/f8ce4aff43f4cff7f062acd1d71111f2026dc118) added five Chinese-only historical editions, for 15, 17, 18, 22 and 24 November. It included neither English counterparts nor website publication receipts. These pages cannot be counted as five reviewed bilingual editions merely because the commit succeeded.

The [25 November content commit](https://github.com/duoglas/openclaw-hub/commit/93a5b6984f0858afd76fec9e66be0530ded829c4) added three bilingual guide/comparison pairs with `date` instead of the collection's required `pubDate`. [Main Content Check 45585540435](https://github.com/duoglas/openclaw-hub/actions/runs/45585540435) failed during Astro content sync and skipped subsequent content checks. This was part of a sustained failing CI history, not an isolated network error.

The [repair PR](https://github.com/duoglas/openclaw-hub/pull/2) preserves the six articles' 2026-11-25 publication date. Its [first cloud run](https://github.com/duoglas/openclaw-hub/actions/runs/45784776077) passed the build, AdSense, site foundations and 115 editorial regression tests, then correctly failed because the five backfills lack publication receipts. Build recovery alone is not full Content Check recovery.

The same investigation verified that adding `noindex: true` to the existing TanStack analysis pair had broken its approved full-file hashes. Removing exactly that line reproduces both previous hashes. The [metadata correction](editorial/receipts/2026-10-29-analysis.json) retains those hashes and records that the body, article dates and factual review were unchanged.

Historical public source archives for the five backfills have been recovered and checked. An independent reviewer approved all five complete bilingual corrections on 26 November after requiring three fixes: the Qwen3.8-Max comparison baseline, the AURA project-article date, and the WALL technical-article date. The latter two remain distinct from unverified first weight availability. Current correction receipts bind the approved source packets, drafts and both article files; their actual creation and review times do not claim historical approval. Original edition dates remain unchanged, the correction date is explicit, and all five receipts use `operation: revise`. These are corrections of existing editions, not fresh 26 November news.

No validated public single-day GSC exports exist for the current week under `reports/seo/verified-daily/`. Search clicks, impressions, CTR, position, indexing and engagement remain **N/A**, not zero. Private analytics are not imported into this review.

## Orient — implications and limits

1. Content generation and Git publication bypassed existing data and editorial contracts. A successful push did not establish that required metadata, bilingual evidence or review bindings were present.
2. The current gates are exposing real defects. Missing receipts must be repaired with verified sources and actual independent review of the complete correction, not historical timestamps or approvals invented after the fact.
3. The original general-news backfills need a narrower AI/Agent scope. The proposed revisions retain every article URL and historical publication date while focusing each edition on three supported topics; they do not exclude pages from validation.
4. Local and cloud checks have different environments. macOS shell/tool limitations are recorded separately from content defects. Only a complete successful cloud Content Check can establish branch CI recovery.
5. Missing same-window analytics cannot establish growth, a redesign effect or return on investment. No title rewrite or traffic claim is justified by the current metric gap.

## Decide — next priorities

1. Retain the approved source and file bindings, the first-round rejections and their corrected versions. For future editions, check comparison baselines and distinguish article, event, archive and first-availability dates before publication.
2. Finish the existing Content Check without deleting checks, masking errors or changing publication dates. Keep PR #2 unmerged until the full branch run succeeds; main and production remain separate verification steps.
3. Before the next publication, run the existing build, date and editorial gates on the exact candidate. Obtain authorized, comparable analytics evidence before making search-performance claims.

## Act — completed and outstanding

- Completed at cutoff: reproduced the main failure; repaired the six publication-field names; proved and recorded the TanStack metadata-only correction; verified three HTTPS source destinations; corrected specific summaries and registered tag aliases; recovered public source archives; corrected the complete bilingual drafts after independent review; created actual current correction receipts. The local build produces 904 pages from 524 articles, up from 519 articles through five English counterparts, with no article deletion.
- Pending at cutoff: validation of the generated weekly snapshot, full cloud Content Check and human merge review. Local engineering checks alone do not establish that main or production has recovered.
- No production deployment, main-branch push, unrelated PR takeover or change to news-delivery automations is part of this repair.
- The generated SEO snapshot remains distinct from this editorial review. It must retain missing observations as unknown and count corrections as revisions, rather than converting them into new editions.

## Postmortem

Preserve the distinction between an article's historical date, a correction date, an actual review, a successful build and a deployed result. The recovery should make the existing evidence checks pass through real corrections; it must not make those distinctions disappear.
