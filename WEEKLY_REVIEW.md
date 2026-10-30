# WEEKLY_REVIEW.md

## Week Meta
- Week: 2026-10-26 to 2026-11-01
- Owner: site-editor
- Reviewed at: 2026-10-30 07:53 (Asia/Shanghai)
- Reviewer: maintenance assistant; not an independent human review
- Review type: evidence-informed editorial review, distinct from the generated SEO snapshot
- Observation cutoff: 2026-10-30 morning; the week is not complete

## Observe — what the evidence establishes

The public editorial receipt set records **four new bilingual editions and one bilingual revision** this week. Count by receipt creation time, not filename or article publication date; an EN/ZH pair is one edition.

| Work | Operation | Evidence |
|---|---|---|
| TanStack AI stable-release boundaries | New analysis | [Receipt](editorial/receipts/2026-10-29-analysis.json) |
| 26 October news briefing | Historical backfill, committed 29 October; not a fresh 29 October edition | [Receipt](editorial/receipts/2026-10-26-daily.json) |
| DeepSeek Harness architecture and safety | New document-based guide; no runtime isolation test | [Receipt](editorial/receipts/2026-10-29-guide-deepseek-harness-architecture-safety.json) |
| Qwen local-model selection | New document-based guide; no hardware/performance benchmark | [Receipt](editorial/receipts/2026-10-29-guide-qwen-local-model-selection.json) |
| Codex, Claude Code and Cursor instruction files | Revised the existing bilingual AGENTS guide; original URL and first publication date retained | [Receipt](editorial/receipts/2026-10-29-guide-agents-instructions-skills-review-2026-10.json) |

- The receipt-backed latest daily remains **26 October**. At the 30 October morning check, the native website task reached search, extraction and model selection, selected no sufficiently new verified event and skipped publication. Its summary was delivered by the scheduler. This does not validate a new article's drafting, review, publication or sustained schedule reliability.
- Current enabled guide topics have all been delivered. Two future topics remain disabled in [the public registry](editorial/topics.json); their planned dates are not publication quotas.
- The AGENTS guide's practical limits remain material: documentation analysis does not establish a three-client runtime comparison. DSH and Qwen guides have the same explicit distinction between documentation and experiments.
- Search performance, indexing and engagement lack complete, comparable current-week evidence in the public report. Missing values are **N/A**, not zero. Private rolling-window analytics are not copied into this repository or divided into invented weekly figures.
- Current-version privacy corrections are recorded separately in [the correction receipt](editorial/privacy-corrections/2026-10-29.json). They did not revalidate old news or rewrite Git history; this is not a complete privacy audit.

## Orient — what follows, and what does not

1. **The main constraint is evidence-qualified publication, not article count.** A successful collection/selection run that produces no qualifying event should skip. A transport failure must remain a failure. Neither justifies an empty page or a recycled event presented as new.
2. **The editorial queue needs source or experiment work before further activation.** Existing DSH, Qwen and AGENTS topics should be updated at their current URLs when substantive new evidence exists, not republished under their original planned dates.
3. **The previous weekly template mixed missing data and diagnosis.** Zero-filled KPIs, filename-based output counts and a low-CTR-to-bounce inference were not defensible. The replacement snapshot uses public receipts and explicit archive-bound daily evidence, preserves unknowns and does not overwrite this review.
4. **CI freshness and schedule health are different controls.** This review addresses the current week's evidence and decisions. The existing Monday Discord review remains read-only; it does not automatically commit a repository review. A durable reviewed-update workflow is still needed. Changing the date alone is not an acceptable substitute.

## Decide — next priorities, maximum three

1. Verify native website runs through their actual outcomes. Retain failed attempts and legitimate skips; require a real qualifying event, exact source support and independent review before claiming a fresh daily was published.
2. Repair and validate consistent analytics collection in private operations records. Use matched observation windows and enough observations before attributing changes to the redesign; obtain approval before publishing any new metric export.
3. Prepare public sources or a new publishable experiment for the next disabled topic. Prefer a useful update or comparison over adding another generic guide, and keep private notes and historical conversations out of public evidence.

## Act — completed work and remaining checks

- Completed and receipt-backed: the four new editions and one revision above, with independent article-review records; technical runtime and AGENTS changes are in `6b6caed35b87f1dfb293e69731b4cf85eff51993` and `b7f63dce02223f3c2257e9dfe8e5d0ff7bf000e6`.
- Observed, not repaired by this change: the previously failing publishing-host CPA connection passed this morning, followed by a real native selection run. No network configuration, model, gateway restart or Telegram task change was needed for that observation.
- This patch: correct the weekly snapshot's evidence model, distinguish it from the editorial review, test genuine zero versus missing data, and keep weight-file/repository-viewer URLs out of the news reading budget without removing guide document sources.
- Pending at review time: full checks and deployment for this patch; a later qualifying news article through the entire native publishing path; continued scheduled observations; a repository-update mechanism for future weekly reviews. A successful current build alone does not close those items.

## Postmortem

Stop treating generated templates, zero placeholders, filename dates or task success as evidence of growth or fresh publication. Retain the smaller evidence-backed inventory, exact revision history and explicit unknowns. The next useful work is better source readiness and repeatable verification, not more output to satisfy a calendar.
