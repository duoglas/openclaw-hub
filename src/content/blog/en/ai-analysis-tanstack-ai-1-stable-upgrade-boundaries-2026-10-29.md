---
title: "TanStack AI 1.0: upgrade the stable core, evaluate the experimental agent harness separately"
description: "TanStack AI 1.0 stabilizes 76 packages but leaves its agent harness experimental. Assess coordinated upgrades, adoption boundaries and checks before rollout."
pubDate: "2026-10-29"
tags: ["ai", "analysis"]
category: "analysis"
lang: "en"
editorialVersion: 2
---

## 1. Release scope: the stability commitment has an explicit exception

**Reported facts:** On October 23, 2026, TanStack announced AI 1.0, moving 76 packages to stable across chat, tools, media, MCP, persistence and sandboxes. The project describes 1.0 as a formal API commitment and calls the stable packages production-ready. The same announcement explicitly excludes the new agent harness: its APIs remain experimental.

**Analysis:** Teams building AI applications should treat upgrading the core and adopting the experimental runtime as separate approval decisions. The project's production-readiness statement is a maintenance signal, not a substitute for application acceptance testing or a stability guarantee for the harness.

[Source S01](<https://tanstack.com/blog/tanstack-ai-1-0>) · [Source S02](<https://tanstack.com/ai/latest/docs/blog>)

## 2. Available capabilities: map requirements to the stable scope first

**Reported facts:** The project lists 23 provider adapters for 1.0. Additions since the RC include subagents in `chat()` and `useChat`, `decide()` for typed choices or scores, on-demand Agent Skills, and long-conversation compaction. The new harness is separately designated experimental.

**Analysis:** Teams needing tool calls, delegated subtasks or long-conversation management can first assess whether the listed 1.0 capabilities are sufficient. Building an agent product does not by itself require adopting the harness. If long-running task lifecycles are central to the requirement, evaluate the runtime separately: a stable core does not establish that recovery semantics meet business needs.

**Trade-off:** Using sufficient stable capabilities first limits exposure to experimental APIs. Adopting the harness requires an engineering allowance for interface changes and task-state validation.

[Source S01](<https://tanstack.com/blog/tanstack-ai-1-0>)

## 3. Upgrade risks: removed APIs and coordinated client-server deployment

**Reported facts:** Version 1.0 removes every API marked deprecated in 0.x; the project says all replacements had already shipped in 0.x. It also requires upgrading the installed `@tanstack/ai*` packages together and explicitly states that a 1.0 client needs a 1.0 server.

**Analysis:** Migration effort depends on two conditions: whether deprecated calls have been eliminated, and whether deployment can keep client and server versions aligned. The first concerns code changes; the second concerns release and rollback planning. Applications whose frontend and backend ship through different teams should resolve coordination before choosing a rollout window.

**Untested recommendation:** Inventory dependencies and deprecated calls, run staging regressions with an aligned version set, and prepare a paired rollback. Where browsers may retain older clients, define how those sessions will be handled. The supplied evidence contains no complete mixed-version compatibility matrix, so compatibility should not be assumed.

[Source S01](<https://tanstack.com/blog/tanstack-ai-1-0>)

## 4. Who should adopt it: set boundaries by dependency risk

**Editorial assessment:** Existing TanStack AI users who have kept up with deprecations and can coordinate client-server releases can prioritize validating a stable-core upgrade. New projects needing the announced chat, tool or sandbox capabilities can include 1.0 in their evaluation. The evidence does not establish superiority over alternatives.

Teams depending on long-running agents should place the harness in an isolated pilot and define an acceptable budget for API changes. If a business cannot tolerate unverified recovery behavior and has no alternative execution path, defer making critical tasks depend on it.

**Bounded decision:** A core migration can proceed independently once it passes acceptance checks; it need not wait for the harness to mature. Harness adoption should have its own acceptance gates and disablement plan. This adds a separate integration evaluation but avoids combining a stable-release migration with experimental-feature risk.

[Source S01](<https://tanstack.com/blog/tanstack-ai-1-0>) · [Source S02](<https://tanstack.com/ai/latest/docs/blog>)

## 5. Verification checklist before rollout

**These are proposed checks, not tests we have performed:**

- **Dependencies and builds:** Confirm that all installed related packages are upgraded together as instructed. Remove deprecated API references, then run type checks and builds.
- **Real application paths:** For the providers, UI, tools and MCP paths the application uses, verify requests, streamed responses, tool results and error handling. Test the combinations you actually depend on rather than treating the stable label as coverage.
- **Deployment and rollback:** Rehearse coordinated client-server switching, handling of older client sessions and paired rollback. Pause rollout if version alignment cannot be maintained.
- **Separate harness acceptance:** If piloting long-running tasks, check state after mid-task instructions and recovery after task interruption or process restart. For tools with external side effects, check for duplicate or omitted execution during recovery. These are risks to investigate, not reported defects.

**Suggested acceptance gates:** Require application regressions to pass and deployment and rollback to be controlled for the stable core. For the harness, also require inspectable records of task state and external side effects. If critical behavior remains unconfirmed, restrict the pilot to disposable tasks.

[Source S01](<https://tanstack.com/blog/tanstack-ai-1-0>) · [Source S02](<https://tanstack.com/ai/latest/docs/blog>)

## Evidence and limits

This analysis uses only the supplied official release excerpts, official blog index and event summary. We did not inspect package registries or complete migration documentation, run code, or test compatibility, performance or failure recovery. Persistent sessions, mid-task instructions, restart recovery and the harness's 0.x status are described in the event summary; the supplied article excerpts do not expose implementation details, so no recovery guarantees are inferred. Stability and production readiness are project claims, and the two sources do not constitute independent verification.

AI-assisted drafting with a separate model review. This is source-based analysis, not independent performance testing.
