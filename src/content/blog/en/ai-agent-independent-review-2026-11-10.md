---
title: "Independent Review Mechanism for AI Agents: Cross-Validation in Practice"
description: "Documenting the design and practice of independent review mechanisms in AI content production. From dual-model cross-validation, rejection strategies to quality control, learn how to make AI generate high-quality, verifiable content."
pubDate: 2026-11-10
updatedDate: 2026-11-10
tags: ["ai-agent", "review", "cross-validation", "quality-control", "prompt-engineering"]
category: "tutorial"
lang: "en"
---

## Background

In AI content production, quality is a critical issue. Single-model generated content tends to have problems like template-like output, lack of data support, and over-inference.

We designed an **independent review mechanism**: two different models are responsible for drafting and reviewing respectively, improving content quality through cross-validation.

## Architecture Design

```
WRITER (Astra) -> Draft -> REVIEWER (Luna) -> Pass/Reject -> Modify/Publish
```

### Model Selection

| Role | Model | Characteristics |
|---|---|---|
| WRITER | gpt-6-astra | Strong generation capability, suitable for drafting |
| REVIEWER | gpt-6-luna | Rigorous judgment, suitable for review |

### Review Flow

1. WRITER generates draft
2. REVIEWER independently reviews
3. If rejected, WRITER modifies based on feedback
4. Max 3 rounds of iteration

## Review Prompts

### REVIEWER Prompt

```
You are an independent reviewer, responsible for reviewing AI-generated news content.

Review criteria:
1. Every claim must be supported by the original source
2. Reject unverified inferences
3. Reject generic advice (lacking specific data)
4. Accept single well-supported event reports

Rejection reasons must be specific, pointing out the issues.
```

### WRITER Prompt

```
You are an AI news editor, responsible for generating daily news based on provided search results.

Writing requirements:
1. Each news item must include specific data (revenue, user count, date, version)
2. Cover multiple dimensions (products, markets, policies)
3. Each section contains facts/impact/industry background comparison
4. No generic advice, every suggestion must be supported by the original source
```

## Rejection Rate Analysis

### Rejection Reasons Distribution

| Reason | Percentage | Description |
|---|---|---|
| Date hallucination | 35% | Model-inferred dates without source support |
| Unverified inference | 30% | Causal inferences lacking source support |
| Generic advice | 25% | Advice lacking specific data support |
| Structure issues | 10% | Content structure doesn't meet requirements |

### Iteration Rounds Distribution

| Round | Percentage | Description |
|---|---|---|
| 1 round pass | 40% | Draft passes on first attempt |
| 2 rounds pass | 35% | Pass after 1 modification |
| 3 rounds pass | 20% | Pass after 2 modifications |
| 3 rounds fail | 5% | Fails after multiple modifications |

## Core Lessons

### Lesson 1: Dual-model cross-validation is effective

Astra generates, Luna reviews, different models have different judgment criteria. Cross-validation catches 60% of low-quality outputs.

### Lesson 2: Rejection reasons must be specific

The more specific the REVIEWER's rejection reasons, the more effective the WRITER's modifications. Generic rejection reasons (like "quality not good enough") are not valuable.

### Lesson 3: Limit iteration rounds

Max 3 rounds of iteration to avoid infinite loops. If it still doesn't pass after 3 rounds, consider degradation or direct publication.

### Lesson 4: Keep rejection records

Every rejection has a reason field. These records help optimize prompts and detect systemic issues.

## Quality Control Metrics

### Quality Scoring

| Metric | Scoring Criteria |
|---|---|
| Data density | Each news item has at least 1 specific data point |
| Source diversity | At least 2 different sources |
| Date accuracy | All dates have source support |
| Advice合理性 | Every suggestion is supported by source |

### Pass Criteria

- Data density >= 1
- Source diversity >= 2
- Date accuracy = 100%
- Advice rationality = 100%

## Future Improvements

1. **Dynamic rejection thresholds**: Adjust rejection standards based on historical pass rates
2. **Automatic rejection classification**: Automatically classify rejection reasons for analysis
3. **Quality trend tracking**: Track changes in quality metrics

---

*AI-assisted drafting with a separate model review. Data from actual production environment run records.*
