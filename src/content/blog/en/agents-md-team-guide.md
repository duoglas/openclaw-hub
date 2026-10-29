---
title: "Codex, Claude Code and Cursor: Instruction Files, Rules, Skills and Verification"
description: "Share project conventions across Codex, Claude Code and Cursor while checking each tool’s loading rules, skill permissions and CI boundaries separately."
pubDate: 2026-02-11
updatedDate: "2026-10-29"
tags: ["cursor", "cursor ide", "agentic-engineering", "guide", "agents-md", "claude-md", "cursor-rules", "team-workflow"]
category: "tutorial"
lang: "en"
faq: []
reviewedAt: "2026-10-29"
editorialVersion: 2
pillar: "agents"
---

> Revision: Removed guarantees of consistent behavior, enforced quality and safety, universal automatic support, and hundreds of hours saved. Retained concise instructions, version control and avoiding duplicate sources. Rewrote loading behavior for each client, clarified explicit imports and skill permissions, and updated new-project Cursor guidance to AGENTS.md or .cursor/rules/*.mdc. This is a documentation-based revision, not a client retest.

> Documentation checked: 2026-10-29. Public-source analysis, not an installation or performance test.

## 1. Separate shared conventions, conditional context, procedures and enforcement

**Documented facts:** Claude Code explicitly treats `CLAUDE.md` as context rather than enforced configuration. Cursor describes Rules as persistent prompt-level context and warns against using AI guidance as the only security control. A readable file does not guarantee compliance or automatic discovery by every tool.

**Proposed team practice, not tested here:** Assign content by its lifecycle instead of maintaining a complete copy for every client.

| Mechanism | Recommended responsibility | Selection criteria and trade-offs |
| --- | --- | --- |
| `AGENTS.md` | Repository layout, actual build and test entry points, a small shared set of conventions | Useful for shared content; verify discovery separately in each client |
| `CLAUDE.md` | Stable Claude session context, explicit imports and Claude-specific additions | Keep it short and avoid duplicating or contradicting shared instructions |
| Path-scoped rules and Cursor `.mdc` Rules | Conventions relevant only to particular files, directories or tasks | Reduce irrelevant context, but require trigger checks |
| Skills | Reusable checklists and multi-step procedures | Detailed evidence here covers Claude Skills only; other hosts require separate field and execution checks |
| Permission settings, execution interception and CI | Approvals, blocked actions and artifact checks | Configure and verify separately from written guidance |

This guide concerns coding-agent clients and their context-loading and tool-execution layers, not model weights or inference servers. Pilot shared content plus client-specific adapters in one repository, then expand only after loading records, permission checks and CI meet your requirements. No quality, safety or time-saving outcome is guaranteed.

[Source S01](<https://developers.openai.com/codex/agent-configuration/agents-md>) · [Source S02](<https://code.claude.com/docs/en/memory>) · [Source S03](<https://code.claude.com/docs/en/skills>) · [Source S04](<https://cursor.com/docs/context/rules>)

## 2. Codex: the launch directory determines the discovery chain

**Documented facts:** Codex builds its instruction chain at the start of each run, usually each launched TUI session.

1. At global scope, it checks its Codex home for `AGENTS.override.md`, then `AGENTS.md`, using only the first non-empty file at that level. `CODEX_HOME` can change the home location.
2. The documentation states: “Starting at the project root (typically the Git root), Codex walks down to your current working directory.” This describes the bounded project-guidance path, not a search of every ancestor outside the project. Without a detected project root, it checks only the current directory.
3. Within each directory, it checks `AGENTS.override.md`, `AGENTS.md`, then names configured in `project_doc_fallback_filenames`, including at most one file per directory.
4. Files are concatenated from the root downward. The documentation says guidance closer to the working directory overrides earlier guidance because it appears later.

Empty files are skipped. Discovery stops adding files when the combined size reaches `project_doc_max_bytes`, which defaults to 32 KiB. Adding nested files therefore does not bypass the combined limit, and launching at the repository root does not establish that every descendant instruction file will load.

**Suggested verification:** Record the working directory, detected project root, Codex home, fallback names and size limit. Launch fresh sessions at the root and target subdirectory and request the instruction sources. For an audit, cross-check the TUI or session logs described in the official documentation, with access controls and redaction. Restart after changes. There is no need to disable approvals or broaden tool permissions.

[Source S01](<https://developers.openai.com/codex/agent-configuration/agents-md>)

## 3. Claude Code: concatenated context and explicit imports

**Documented facts:** Claude’s scope order runs from broad to specific, including managed, user and project guidance. Within the directory tree, `CLAUDE.md` and `CLAUDE.local.md` from the working directory and its ancestors are concatenated from the filesystem root downward. Within each directory, the local file follows `CLAUDE.md`. Discovered files coexist in context; Codex’s override rule does not apply. The documentation warns that Claude may choose arbitrarily between contradictory instructions.

Deeper instruction files below the working directory do not all load at startup. They load when Claude reads, writes or edits another file in the relevant subdirectory. Verification must therefore account for both the launch directory and subsequent file access.

The documented `@path/to/import` syntax in `CLAUDE.md` explicitly expands another file into context. Relative paths resolve from the importing file, with recursive imports limited to four hops. Inline code and fenced code blocks are excluded from import parsing. External imports in project memory files require approval when first encountered; declined imports remain disabled.

Plain prose such as `See AGENTS.md` has no equivalent documented import semantics. It may prompt the model to read the file, but does not establish automatic startup loading; nor should it be described as universally ineffective. The current documentation also says Claude can use `AGENTS.md` in place of `CLAUDE.md`. The supplied excerpts do not explain the full selection behavior when both coexist, so they do not establish that every version automatically loads both.

**Suggested verification:** Inspect **Memory files** in `/context`, then inspect again after accessing a file in the target subdirectory. If using an explicit import from `CLAUDE.md`, check parsing, approval status and duplication. Resolve contradictory entries directly rather than assuming the last instruction always wins.

[Source S02](<https://code.claude.com/docs/en/memory>)

## 4. Cursor: choose Rules or AGENTS.md by trigger requirements

**Documented facts:** Structured project rules for new projects live in `.cursor/rules` and must use the `.mdc` extension. Plain `.md` files in that directory are ignored by the rules system.

| Condition | Behavior described in the current documentation |
| --- | --- |
| `alwaysApply: true` | Always included; description and globs are ignored |
| `alwaysApply: false`, with globs | Auto-attached when a matching file is in context |
| `alwaysApply: false`, description only | Agent decides relevance from the description |
| `alwaysApply: false`, neither field | Included only when the rule is @-mentioned in chat |

For simple Markdown instructions, Cursor supports `AGENTS.md` at the project root and in subdirectories. Nested files apply when working on files in that directory or its descendants. They are combined with parent instructions, with more specific guidance taking precedence.

A separate hierarchy covers Team, Project and User Rules: **Team → Project → User**. Applicable rules are merged, and earlier sources take precedence on conflicts. Do not extend this into an undocumented total ordering across every mechanism. Rules do not affect Cursor Tab; User Rules apply to Agent Chat, not Inline Edit.

**Selection advice:** Prefer `AGENTS.md` for simple shared directory conventions. Use `.mdc` for file matching, relevance-based selection or manual invocation. Verify triggering explicitly when an important step depends on relevance selection. The current page’s omission of `.cursorrules` does not prove that the older format fails in every version. Existing projects should record client versions and observed behavior before deciding to migrate, rather than immediately deleting old files.

[Source S04](<https://cursor.com/docs/context/rules>)

## 5. Skills: the body is a procedure; the host interprets frontmatter

**Documented facts, scoped to Claude Code:** A skill’s body loads when used, making it suitable for moving longer procedures out of persistent guidance. Once loaded, its instructions can remain across turns, while permission grants follow a different lifecycle. The host parses YAML frontmatter at the top of `SKILL.md`; the opening delimiter must be on the first line. Invalid YAML can leave the skill loaded with no fields set, so visible body content does not prove that configuration took effect.

`disable-model-invocation: true` prevents Claude from automatically loading the skill and suits workflows that should be initiated manually. It does not provide tool isolation.

**`allowed-tools` grants pre-approval for the turn that invokes the skill.** Listed tools can be used without per-use approval during that turn. The next user message clears the grant even if the skill body remains in context. This field does not itself reduce the callable tool set; permission settings still govern unlisted tools. It is neither an exclusive tool allowlist nor a sandbox. The documentation also warns that project skills can carry broad grants: workspace trust alone does not establish that the field will be inactive. Managed settings may constrain or ignore such grants.

Claude Code supports extensions beyond the standard fields. The documentation says claude.ai uploads and associated packaging paths accept only specified standard fields, and extra fields can cause a hard error. Neither Claude’s field support nor its turn-scoped permission semantics should be generalized to Codex, Cursor or other hosts.

**Review advice:** Inspect the skill body, frontmatter, bundled scripts and effective permission settings separately. Start without additional pre-approvals; review a narrowly scoped grant only when the task requires it. Manual invocation may suit deployment and other side-effecting workflows, but retain execution approvals and external controls.

[Source S03](<https://code.claude.com/docs/en/skills>)

## 6. Before rollout: record sources and evidence, not just assurances

**The following is a proposed verification plan; these tests were not run for this guide.** Prerequisites are a reviewable repository copy, existing approval policies, readable client configuration and test tasks without secrets or production side effects.

- **Version and entry point:** Record each client’s actual version, execution mode, repository commit and launch directory. This guide uses current documents retrieved on 2026-10-29; that is not a release date or a guarantee for older versions. Claude’s documented `/doctor prompt-audit` requires v2.1.283 or later and the relevant bundled skill to be available.
- **Actual loading sources:** For Codex, inspect home, overrides, fallback names, project root and size limits, and cross-check available logs. For Claude, inspect `/context` Memory files, import approvals and changes after subdirectory access. For Cursor, inspect rules in Customize, trigger types and whether matching files enter context; also verify manual mentions. Treat model self-reports as supplementary evidence.
- **Conflicts:** Inventory the same convention across global, organizational, project, personal and nested sources. In a test copy, use harmless formatting differences to examine conflict behavior, interpreting each client separately. Remove contradictory Claude entries directly. Pause expansion if sources or outcomes remain unclear.
- **Tool permissions:** Review skill frontmatter, permission settings and organizational controls statically. If checking the turn-scoped grant lifecycle, use only already-approved, side-effect-free operations and observe approval behavior during invocation and after the next user message. Do not broaden grants, disable sandboxes or bypass approval to reproduce behavior.
- **CI:** Map conventions that require enforcement to actual lint, type checks, tests or other repository checks. Use a harmless deliberately failing case to confirm CI failure, and verify that merge policy requires success. An agent saying it tested something is not a substitute for logs.
- **Maintenance:** Version shared files and manage personal files separately through each tool’s mechanisms. Repeat relevant checks after client upgrades, working-directory changes or rule migrations. Keep conventions concise and concrete; remove duplicate copies and obsolete entry points.

**Bounded decision:** A simple repository can start with a short shared `AGENTS.md`, adding Claude imports or dedicated guidance based on verification. Add Cursor Rules only when conditional triggering is needed, and Skills when procedures recur. Visible loading, resolved conflicts and understood permissions are prerequisites for expansion, not a security certification.

[Source S01](<https://developers.openai.com/codex/agent-configuration/agents-md>) · [Source S02](<https://code.claude.com/docs/en/memory>) · [Source S03](<https://code.claude.com/docs/en/skills>) · [Source S04](<https://cursor.com/docs/context/rules>)

## Evidence and limits

This guide uses the supplied excerpts from four current official documents, retrieved on 2026-10-29. No additional pages were browsed and no comparative client experiments were run with Codex, Claude Code or Cursor. The excerpts do not establish a common client-version baseline, Claude’s full selection rules when both project instruction formats coexist, or detailed Codex/Cursor Skills semantics; no conclusions are inferred for those gaps. Some extracted code is damaged, and no executable commands were reconstructed. The verification and CI plans are untested recommendations, not performance, time-saving or security guarantees.

AI-assisted drafting with a separate model review. This is source-based analysis, not independent performance testing.
