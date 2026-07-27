---
title: "Cursor IDE AGENTS.md Project Configuration: Format, Rules & Examples (2026)"
description: "Configure Cursor with AGENTS.md and .cursor/rules in 2026. Includes project-root format, nested AGENTS.md precedence, MDC rule examples, CLAUDE.md comparison, and team templates."
pubDate: 2026-02-11
updatedDate: 2026-07-27
tags: ["cursor", "cursor ide", "agentic-engineering", "guide", "agents-md", "claude-md", "cursor-rules", "team-workflow"]
category: "tutorial"
lang: "en"
faq:
  - question: "Does Cursor support AGENTS.md?"
    answer: "Yes. Cursor documents AGENTS.md as a Markdown-based alternative to .cursor/rules for Agent instructions. Put AGENTS.md in the project root and keep the instructions relevant to the repository."
  - question: "What is the correct Cursor project rules format in 2026?"
    answer: "Cursor project rules live under .cursor/rules and commonly use .mdc files with optional frontmatter such as description, globs, and alwaysApply. The older root .cursorrules file is legacy and should be migrated."
  - question: "Can a monorepo have more than one AGENTS.md file?"
    answer: "Yes. Put a root AGENTS.md at the repository level and nested AGENTS.md files inside packages or modules. The closest applicable file provides the more specific instructions."
  - question: "Should I use AGENTS.md or .cursor/rules?"
    answer: "Use AGENTS.md for portable repository instructions shared across coding agents. Add .cursor/rules when you need Cursor-specific scoping, globs, or always-on rule metadata. Many teams use both with AGENTS.md as the source of truth."
---

## 📋 Why Do You Need AI Configuration Files?

In Agentic Engineering, AI is your executor. But just like a new hire needs onboarding to learn team conventions, AI agents need their own "onboarding docs."

An AI without configuration files is like a project without a README — **it works, but it's unpredictable**.

Core problems AI config files solve:
- 🎯 **Consistency**: Every team member's AI behaves the same way
- 📏 **Quality**: Enforces coding standards automatically
- 🧠 **Context**: Gives AI knowledge of your architecture and conventions
- 🔒 **Safety**: Limits what the AI can do

## 🗂️ Current project instruction formats

The useful distinction in 2026 is between portable repository instructions and tool-specific rules:

| File | Tool | Scope | Best use |
|------|------|-------|----------|
| **AGENTS.md** | Cursor, Codex, Jules, and other coding agents | Repository or nested directory | Portable project context and commands |
| **.cursor/rules/*.mdc** | Cursor IDE | Project, file patterns, or always-on | Cursor-specific scoped rules |
| **CLAUDE.md** | Claude Code | User, project, or directory | Claude-specific instructions |
| **.cursorrules** | Older Cursor versions | Project root | Legacy format; migrate to `.cursor/rules` |

### AGENTS.md — portable project instructions

[AGENTS.md](https://agents.md/) is an open Markdown format for coding-agent instructions. Cursor officially supports it as a simpler alternative to `.cursor/rules`, and the same file can be reused by other compatible agents.

```
project-root/
├── AGENTS.md          ← Top-level: global rules
├── src/
│   ├── AGENTS.md      ← Subdirectory: module-specific rules
│   ├── frontend/
│   │   └── AGENTS.md  ← More specific frontend rules
│   └── backend/
│       └── AGENTS.md  ← More specific backend rules
└── tests/
    └── AGENTS.md      ← Testing-related rules
```

**Characteristics**:
- 📂 Supports hierarchical, directory-level configuration
- 🔓 Tool-agnostic — any AI assistant can read it
- 📖 Markdown format, easy for humans to read too

### CLAUDE.md — Claude Code Specific

CLAUDE.md is the configuration file that Anthropic's Claude Code reads. Similar to AGENTS.md but with some Claude-specific features.

```
project-root/
├── CLAUDE.md           ← Project-level config
├── ~/.claude/CLAUDE.md ← User-level global config
└── src/
    └── CLAUDE.md       ← Subdirectory-level config
```

**Characteristics**:
- 🧠 Automatically read by Claude Code
- 🔧 Supports global (user-level) + project-level + directory-level
- 📋 Can include bash commands (build, test commands)

### `.cursor/rules` — Cursor project rules

Current Cursor project rules are stored under `.cursor/rules` and are version-controlled with the repository:

```text
project-root/
├── AGENTS.md
└── .cursor/
    └── rules/
        ├── core.mdc
        ├── frontend.mdc
        └── tests.mdc
```

An `.mdc` rule can include metadata that controls when it applies:

```md
---
description: Frontend conventions
globs: ["src/**/*.tsx", "src/**/*.ts"]
alwaysApply: false
---

- Prefer server components unless browser state is required.
- Run `pnpm lint` and `pnpm test` after changes.
```

Use Cursor rules when you need file-pattern scoping or Cursor-specific behavior. The root `.cursorrules` file is now a legacy format.

## 📝 Template Examples

### AGENTS.md Universal Template

```markdown
# AGENTS.md

## Project Overview
This is a Next.js 15 + TypeScript web application for [project description].

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4
- **Database**: PostgreSQL + Drizzle ORM
- **Testing**: Vitest + Playwright

## Coding Standards

### TypeScript
- Use `interface` over `type` for object shapes
- Always use explicit return types on exported functions
- Prefer `const` assertions where applicable
- No `any` — use `unknown` + type guards instead

### File Organization
- Components: `src/components/[feature]/[ComponentName].tsx`
- Hooks: `src/hooks/use[HookName].ts`
- Utils: `src/lib/[domain].ts`

### Naming Conventions
- Components: PascalCase
- Files: kebab-case (except components)
- Constants: UPPER_SNAKE_CASE
- Database tables: snake_case

## Build & Test Commands
- `pnpm dev` — Start development server
- `pnpm build` — Production build
- `pnpm test` — Run unit tests
- `pnpm test:e2e` — Run E2E tests
- `pnpm lint` — Lint check

## Important Rules
1. Never modify migration files directly
2. Always run `pnpm test` before committing
3. All API routes must have input validation (zod)
4. No secrets in code — use environment variables
5. All public functions must have JSDoc comments
```

### CLAUDE.md Template

```markdown
# CLAUDE.md

## Project Context
[Similar project description as AGENTS.md]

## Claude-Specific Instructions

### Thinking Style
- Think step-by-step before making changes
- Always explain WHY before making a change
- When unsure, ask rather than guess

### File Operations
- Read the full file before editing
- Make minimal, focused changes
- Always verify changes compile: `pnpm tsc --noEmit`

### Git Workflow
- Commit messages follow Conventional Commits
- One logical change per commit
- Run tests before suggesting commit

### Off Limits
- Do NOT modify: `.env`, `*.lock`, `migrations/`
- Do NOT run: `rm -rf`, `DROP TABLE`, `git push --force`

## Common Tasks
- "Add a new API endpoint": Create route in `src/app/api/`, add zod schema, add tests
- "Fix a bug": Read error, find root cause, write test first, then fix
- "Refactor": Ensure tests pass before AND after
```

### Cursor `.cursor/rules/core.mdc` template

```md
---
description: Core TypeScript and repository rules
alwaysApply: true
---

# Project standards

- Use TypeScript strict mode; do not introduce `any`.
- Prefer server components unless browser state is required.
- Use prepared statements for database queries.
- Never commit `.env` files or credentials.
- Run `pnpm lint`, `pnpm test`, and `pnpm build` before finishing.
```

Keep the portable explanation of the project in `AGENTS.md`; keep Cursor-only scoping and editor behavior in `.cursor/rules`.

## 🔄 Team Sharing Strategies

### Strategy 1: Commit Everything to Git (Recommended)

```bash
# Make sure these files are NOT in .gitignore
# The following files should be version-controlled:
AGENTS.md
CLAUDE.md
.cursor/rules/*.mdc
```

**Pros**: Everyone auto-syncs, version history is tracked
**Cons**: Personal preferences need to go in global config

### Strategy 2: Layered Configuration

```
# Team-shared (committed to Git)
AGENTS.md                 ← Portable team standards
.cursor/rules/core.mdc    ← Cursor-specific rules

# Personal config (not committed)
~/.claude/CLAUDE.md  ← Personal Claude global config
```

In `.gitignore`:
```
# Don't ignore team config files
!AGENTS.md
!CLAUDE.md
!.cursor/
!.cursor/rules/
```

### Strategy 3: Monorepo Multi-Project

```
monorepo/
├── AGENTS.md              ← Global portable rules
├── .cursor/rules/         ← Cursor-specific project rules
├── packages/
│   ├── web/
│   │   ├── AGENTS.md      ← Web frontend-specific rules
│   │   └── CLAUDE.md
│   ├── api/
│   │   ├── AGENTS.md      ← API backend-specific rules
│   │   └── CLAUDE.md
│   └── shared/
│       └── AGENTS.md      ← Shared library rules
```

## ✅ Best Practices

### 1. Start Small, Grow Organically 📈

Don't write a 500-line config file on day one. Start with:
- Project tech stack description
- 3-5 most important coding rules
- Build and test commands

Then add rules based on issues you encounter in practice.

### 2. Use Concrete Examples, Not Abstract Descriptions 🎯

```markdown
# ❌ Bad
Write clean code.

# ✅ Good
## Error Handling
Use the Result pattern:
​```typescript
type Result<T> = { ok: true; data: T } | { ok: false; error: string };

// Good
function getUser(id: string): Result<User> { ... }

// Bad — don't throw for business logic errors
function getUser(id: string): User { throw new Error(...) }
​```
```

### 3. Keep It Up to Date 🔄

Config files aren't write-once-forget:
- 📅 Review monthly — remove outdated content
- 🐛 When AI repeatedly makes a mistake → add a rule
- 🆕 Tech stack changes → update immediately

### 4. Keep one source of truth 🤝

If your team uses both Cursor and Claude Code:

```markdown
# AGENTS.md — portable project standards and commands

# CLAUDE.md — Claude-specific additions; avoid copying the whole AGENTS.md

# .cursor/rules/*.mdc — Cursor-only scopes, globs, or editor behavior
```

Do not maintain three full copies of the same rules. Duplicated instructions drift and eventually conflict.

### 5. Add a "Forbidden" List 🚫

Explicitly tell AI what NOT to do:
```markdown
## Forbidden Actions
- Never delete or modify migration files
- Never commit .env files
- Never use `rm -rf` without explicit confirmation
- Never bypass TypeScript strict mode
- Never add dependencies without checking bundle size
```

### 6. Include Standard Workflow Recipes 📋

```markdown
## Standard Workflows

### Adding a New Feature
1. Create feature branch from `main`
2. Write failing tests first (TDD)
3. Implement the feature
4. Ensure all tests pass: `pnpm test`
5. Run linting: `pnpm lint`
6. Create PR with description template

### Database Changes
1. Create migration: `pnpm drizzle-kit generate`
2. Review generated SQL
3. Test migration: `pnpm drizzle-kit push`
4. Never modify existing migrations
```

## 🚀 Quick Start Checklist

- [ ] Create `AGENTS.md` in your project root
- [ ] Add project overview and tech stack
- [ ] Add 3-5 core coding rules
- [ ] Add build/test commands
- [ ] Add a "Forbidden" list
- [ ] If using Cursor-specific scopes: create `.cursor/rules/*.mdc`
- [ ] If using Claude Code-specific behavior: create `CLAUDE.md`
- [ ] Commit to Git for team sync
- [ ] Schedule monthly reviews and updates

---

Configuration files are the "infrastructure" of agentic engineering. Spend 30 minutes setting them up, save your team hundreds of hours of rework. 🏗️

## Official references

- [AGENTS.md open format](https://agents.md/)
- [Cursor Rules documentation](https://cursor.com/docs/rules)

*Want to learn how to roll out agentic engineering across your team? Read our [Team Adoption Guide](/blog/en/agentic-engineering-team-adoption).*
