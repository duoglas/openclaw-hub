---
title: "AGENTS.md Team Guide: Unifying AI Coding Tool Configuration"
description: "A deep dive into AGENTS.md, CLAUDE.md, and .cursorrules — the three key AI configuration files. Includes file structures, templates, team sharing strategies, and best practices for standardizing your team's AI coding workflow."
pubDate: 2026-02-11
tags: ["agentic-engineering", "tutorial", "agents-md", "claude-md", "cursorrules", "team-workflow"]
category: "tutorial"
lang: "en"
---

## 📋 Why Do You Need AI Configuration Files?

In Agentic Engineering, AI is your executor. But just like a new hire needs onboarding to learn team conventions, AI agents need their own "onboarding docs."

An AI without configuration files is like a project without a README — **it works, but it's unpredictable**.

Core problems AI config files solve:
- 🎯 **Consistency**: Every team member's AI behaves the same way
- 📏 **Quality**: Enforces coding standards automatically
- 🧠 **Context**: Gives AI knowledge of your architecture and conventions
- 🔒 **Safety**: Limits what the AI can do

## 🗂️ The Three Configuration Files

There are currently three mainstream AI configuration files:

| File | Tool | Scope | Standardization |
|------|------|-------|----------------|
| **AGENTS.md** | Universal (OpenAI Codex, etc.) | All AI tools | 🟢 Emerging standard |
| **CLAUDE.md** | Claude Code | Anthropic ecosystem | 🟡 Proprietary format |
| **.cursorrules** | Cursor | Cursor IDE | 🟡 Proprietary format |

### AGENTS.md — Universal AI Behavior Standard

AGENTS.md emerged in late 2025 as a **universal standard**. It's not tied to any specific tool — it provides project context and behavioral guidelines for all AI coding assistants.

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

### .cursorrules — Cursor IDE Specific

`.cursorrules` is Cursor's project-level configuration file, placed in the project root.

```
project-root/
└── .cursorrules        ← Cursor config
```

**Characteristics**:
- 🖥️ Only read by Cursor IDE
- 📄 Single file, no hierarchical support
- 🎨 Best for defining coding style and project conventions

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

### .cursorrules Template

```
You are a senior TypeScript developer working on a Next.js 15 project.

## Style
- Use functional components with hooks
- Prefer server components by default, add "use client" only when needed
- Use Tailwind CSS for styling, no CSS modules
- Write concise, readable code

## Patterns
- Error handling: use Result pattern (ok/err) instead of try/catch for business logic
- API responses: always return typed responses using the ApiResponse<T> type
- Database queries: always use prepared statements via Drizzle

## Testing
- Write tests for all new functions
- Use describe/it blocks with clear test names
- Mock external services, don't mock internal modules

## Don't
- Don't use default exports (except pages and layouts)
- Don't add console.log (use the logger utility)
- Don't use string concatenation for SQL
- Don't skip TypeScript types
```

## 🔄 Team Sharing Strategies

### Strategy 1: Commit Everything to Git (Recommended)

```bash
# Make sure these files are NOT in .gitignore
# The following files should be version-controlled:
AGENTS.md
CLAUDE.md
.cursorrules
```

**Pros**: Everyone auto-syncs, version history is tracked
**Cons**: Personal preferences need to go in global config

### Strategy 2: Layered Configuration

```
# Team-shared (committed to Git)
AGENTS.md          ← Team standards
.cursorrules       ← Team standards

# Personal config (not committed)
~/.claude/CLAUDE.md  ← Personal Claude global config
```

In `.gitignore`:
```
# Don't ignore team config files
!AGENTS.md
!CLAUDE.md
!.cursorrules
```

### Strategy 3: Monorepo Multi-Project

```
monorepo/
├── AGENTS.md              ← Global rules
├── .cursorrules           ← Global Cursor rules
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

### 4. Unify Core Content Across All Three Files 🤝

If your team uses both Cursor and Claude Code:
```markdown
# AGENTS.md — Contains full project standards (source of truth)

# CLAUDE.md — References AGENTS.md + Claude-specific additions
See AGENTS.md for project standards.
[Claude-specific additions here]

# .cursorrules — Condensed version in Cursor-friendly format
[Condensed version of AGENTS.md rules]
```

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
- [ ] If using Cursor: create `.cursorrules`
- [ ] If using Claude Code: create `CLAUDE.md`
- [ ] Commit to Git for team sync
- [ ] Schedule monthly reviews and updates

---

Configuration files are the "infrastructure" of agentic engineering. Spend 30 minutes setting them up, save your team hundreds of hours of rework. 🏗️

*Want to learn how to roll out agentic engineering across your team? Read our [Team Adoption Guide](/blog/en/agentic-engineering-team-adoption).*
