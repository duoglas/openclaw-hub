---
title: "Prompt Engineering for AI News Editorials: 6 Iterations from Template to Data-Driven"
description: "Documenting 6 iterations of WRITER and REVIEWER prompts in an AI daily news pipeline. From template outputs and date hallucinations to data-driven cross-validation, learn how to make AI generate high-quality, verifiable news content."
pubDate: 2026-11-10
updatedDate: 2026-11-10
tags: ["prompt-engineering", "ai-agents", "editorial-pipeline", "quality-control", "automated-content"]
category: "tutorial"
lang: "en"
---

## Background

In late October 2026, we began building an automated AI daily news editorial pipeline. The goal was clear: let AI automatically search, filter, draft, review, and publish 3-5 high-information-density AI news stories every day.

Reality quickly delivered a lesson -- **the quality of AI-generated content was far below expectations**.

## First Attempt: Template-Based Output

The initial WRITER prompt looked like this:

```
Please generate an AI daily news article based on the provided search results.
Requirements:
1. Include facts and general advice
2. Distinguish between verified and speculative content
3. Output 3-5 news items
```

**Problems:**
- AI output had highly template-like structure: "Editor judgment/suggestions" appeared after every news item
- Lacked specific data: no revenue figures, user counts, version numbers
- Generic advice dominated: "recommend paying attention to", "worth watching" filled 40% of the content

## Second Iteration: Deleting Template Instructions

We removed template instructions like "Separate reported facts..." and replaced them with:

```
Weave analysis directly into each section:
1. Each news item must include specific data (revenue, user count, date, version)
2. Cover multiple dimensions: AI products, market trends, policy/regulation
3. Each section contains facts/impact/industry background comparison
```

**Result:** Content depth improved, but new problems emerged -- **AI started fabricating dates and inferring unverified cause-and-effect relationships**.

## Third Iteration: Date Verification

The model began producing content like:

> "On Thursday 11/5, a company released a new model..."

The problem: "Thursday 11/5" was inferred by the model from context, not from raw data. We added strict date verification rules:

```
No relative date inference:
- If the original data doesn't contain an explicit date, do not infer
- Only use absolute dates that appear in the original data (e.g., "2026-11-05")
- All dates must be traceable to specific sources
```

**Effect:** Date hallucinations dropped by 80%, but the review stage (REVIEWER) started frequently rejecting drafts.

## Fourth Iteration: Independent Review Mechanism

We introduced an independent REVIEWER model (using gpt-6-luna) with these review rules:

```
Independent review rules:
1. Every claim must be supported by the original source
2. Reject unverified inferences (e.g., "Democrats control both houses")
3. Reject generic purchasing advice (lacking specific data)
4. Accept single well-supported event reports
```

**Key finding:** The REVIEWER rejection rate hit 60%. Primary reasons:
1. Market event date reference ambiguity
2. Political inferences not strictly verified by source text
3. Generic advice lacking specific data support

## Fifth Iteration: Selector Layer Degradation

We realized the problem wasn't in the WRITER -- it was in the SELECTOR layer being too conservative. The original prompt required:

> "Provide 3-5 news items from different industry angles"

But in reality, some days might only have 1-2 high-quality news items. We changed it to:

```
Minimum selection: 1 item
Diversity checks moved to the review stage
If evidence doesn't support multiple industry angles, accept single-event reports
```

**Effect:** Pipeline throughput increased by 40%, review rejection rate dropped to 15%.

## Sixth Iteration: Fuzzy Quote Verification

This was the most technical iteration. Quote verification is the core mechanism for ensuring content authenticity, but we encountered a problem:

**AI-generated quotes are truncated, while the original text is complete.**

For example, the original text says:
> "The Wall Street Journal reported that Nvidia fell 9.3% to $181.60..."

The AI-generated quote is:
> "Nvidia fell 9.3%..."

Standard string matching failed. We implemented the `_fuzzy_match()` function:

```python
def _fuzzy_match(quoted, original):
    # 1. Significant word 60% overlap threshold
    # 2. 6-character prefix matching
    # 3. Truncated word tolerance
    # 4. Quote verification logic tightening
    ...
```

**Effect:** Quote verification pass rate increased from 30% to 90%.

## Core Lessons

### 1. Prompts are iterated, not designed

Each iteration solved the previous iteration's problem, but there's no perfect prompt. The key is:
- **Keep failure records**: Every rejection has a `reason` field
- **Minimal changes**: Change only one variable per iteration
- **Data-driven**: Use pass rate, rejection rate, CTR metrics to measure progress

### 2. Independent review is necessary

WRITER and REVIEWER use different models (Astra + Luna) with different judgment criteria. Cross-validation catches 60% of low-quality outputs.

### 3. Don't over-constrain AI

The original prompts had too many requirements (3-5 items, multiple industries, data support), causing AI to either fabricate or skip. After degrading to a 1-item minimum, quality actually improved.

### 4. Technical verification is more effective than language constraints

Telling the prompt "don't fabricate" doesn't work, but technical verification like `_fuzzy_match()` can 100% intercept fabricated quotes.

## Future Directions

1. **Automated date verification**: Currently relies on manual rules, will integrate calendar verification
2. **Dynamic review standards**: Adjust rejection thresholds based on historical pass rates
3. **Bilingual consistency checks**: Ensure Chinese and English versions convey the same facts and limitations

---

*AI-assisted drafting with a separate model review. Data from actual production pipeline run records.*
