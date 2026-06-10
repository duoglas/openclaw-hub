---
title: "AGENTS.md 团队规范指南：统一 AI 编程工具的配置"
description: "详解 AGENTS.md、CLAUDE.md 和 .cursorrules 三大 AI 配置文件的关系与用法。包含文件结构、模板示例、团队共享方案和最佳实践，助你统一团队的 AI 编程规范。"
pubDate: 2026-02-11
tags: ["agentic-engineering", "guide", "agents-md", "claude-md", "cursorrules", "team-workflow"]
category: "tutorial"
lang: "zh"
---

## 📋 为什么需要 AI 配置文件？

在智能体工程（Agentic Engineering）中，AI 是你的执行者。但就像新员工入职需要了解团队规范一样，AI 智能体也需要"入职培训"。

没有配置文件的 AI 就像没有 README 的项目——**能跑，但不可控**。

AI 配置文件解决的核心问题：
- 🎯 **一致性**：团队所有人的 AI 行为一致
- 📏 **质量**：强制执行编码标准
- 🧠 **上下文**：让 AI 了解项目的架构和约定
- 🔒 **安全**：限制 AI 的操作范围

## 🗂️ 三大配置文件的关系

目前主流的 AI 配置文件有三种：

| 文件 | 所属工具 | 作用范围 | 标准化程度 |
|------|---------|---------|-----------|
| **AGENTS.md** | 通用（OpenAI Codex 等） | 所有 AI 工具 | 🟢 新兴标准 |
| **CLAUDE.md** | Claude Code | Anthropic 生态 | 🟡 专属格式 |
| **.cursorrules** | Cursor | Cursor IDE | 🟡 专属格式 |

### AGENTS.md — 通用 AI 行为规范

AGENTS.md 是 2025 年下半年兴起的**通用标准**。它不绑定任何特定工具，而是为所有 AI 编程助手提供项目上下文和行为指南。

```
项目根目录/
├── AGENTS.md          ← 顶层：全局规范
├── src/
│   ├── AGENTS.md      ← 子目录：特定模块规范
│   ├── frontend/
│   │   └── AGENTS.md  ← 更具体的前端规范
│   └── backend/
│       └── AGENTS.md  ← 更具体的后端规范
└── tests/
    └── AGENTS.md      ← 测试相关规范
```

**特点**：
- 📂 支持目录级别的层次化配置
- 🔓 工具无关，任何 AI 助手都可以读取
- 📖 Markdown 格式，人类也很容易阅读

### CLAUDE.md — Claude Code 专属

CLAUDE.md 是 Anthropic 的 Claude Code 读取的配置文件。与 AGENTS.md 类似，但有一些 Claude 特有的特性。

```
项目根目录/
├── CLAUDE.md           ← 项目级配置
├── ~/.claude/CLAUDE.md ← 用户级全局配置
└── src/
    └── CLAUDE.md       ← 子目录级配置
```

**特点**：
- 🧠 Claude Code 自动读取
- 🔧 支持全局（用户级）+ 项目级 + 目录级
- 📋 可包含 bash 命令（如构建、测试命令）

### .cursorrules — Cursor IDE 专属

`.cursorrules` 是 Cursor 读取的项目级配置文件，放在项目根目录。

```
项目根目录/
└── .cursorrules        ← Cursor 配置
```

**特点**：
- 🖥️ 仅 Cursor IDE 读取
- 📄 单文件，不支持层次化
- 🎨 适合定义编码风格和项目约定

## 📝 模板示例

### AGENTS.md 通用模板

```markdown
# AGENTS.md

## Project Overview
This is a Next.js 15 + TypeScript web application for [项目描述].

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

### CLAUDE.md 模板

```markdown
# CLAUDE.md

## Project Context
[与 AGENTS.md 类似的项目描述]

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

### .cursorrules 模板

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

## 🔄 团队共享方案

### 方案 1：全部提交到 Git（推荐）

```bash
# .gitignore 中确保这些文件 NOT 被忽略
# 以下文件应该被版本控制：
AGENTS.md
CLAUDE.md
.cursorrules
```

**优点**：所有人自动同步，版本可追踪
**缺点**：个人偏好需要放在全局配置中

### 方案 2：分层配置

```
# 团队共享（提交到 Git）
AGENTS.md          ← 团队标准
.cursorrules       ← 团队标准

# 个人配置（不提交）
~/.claude/CLAUDE.md  ← 个人的 Claude 全局配置
```

在 `.gitignore` 中：
```
# 不忽略团队配置
!AGENTS.md
!CLAUDE.md
!.cursorrules
```

### 方案 3：Monorepo 多项目

```
monorepo/
├── AGENTS.md              ← 全局规范
├── .cursorrules           ← 全局 Cursor 规范
├── packages/
│   ├── web/
│   │   ├── AGENTS.md      ← Web 前端特定规范
│   │   └── CLAUDE.md
│   ├── api/
│   │   ├── AGENTS.md      ← API 后端特定规范
│   │   └── CLAUDE.md
│   └── shared/
│       └── AGENTS.md      ← 共享库规范
```

## ✅ 最佳实践

### 1. 从小开始，逐步丰富 📈

不要一开始就写一个 500 行的配置文件。从这些开始：
- 项目技术栈描述
- 3-5 条最重要的编码规范
- 构建和测试命令

然后根据实际使用中发现的问题逐步添加。

### 2. 用具体例子，不要抽象描述 🎯

```markdown
# ❌ 不好
Write clean code.

# ✅ 好
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

### 3. 保持同步更新 🔄

配置文件不是写了就完了，需要：
- 📅 每月 review 一次，删除过时内容
- 🐛 发现 AI 反复犯某个错误 → 添加相应规则
- 🆕 技术栈变化 → 及时更新

### 4. 统一三个文件的核心内容 🤝

如果团队同时使用 Cursor 和 Claude Code：
```markdown
# AGENTS.md — 包含完整的项目规范（这是主文件 source of truth）

# CLAUDE.md — 引用 AGENTS.md + 添加 Claude 特有配置
See AGENTS.md for project standards.
[Claude-specific additions here]

# .cursorrules — 摘要版本，适合 Cursor 的格式
[Condensed version of AGENTS.md rules]
```

### 5. 添加"禁止"清单 🚫

明确告诉 AI 什么不能做：
```markdown
## Forbidden Actions
- Never delete or modify migration files
- Never commit .env files
- Never use `rm -rf` without explicit confirmation
- Never bypass TypeScript strict mode
- Never add dependencies without checking bundle size
```

### 6. 包含常见任务的流程 📋

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

## 🚀 快速上手清单

- [ ] 在项目根目录创建 `AGENTS.md`
- [ ] 添加项目概述和技术栈
- [ ] 添加 3-5 条核心编码规范
- [ ] 添加构建/测试命令
- [ ] 添加"禁止"清单
- [ ] 如果用 Cursor：创建 `.cursorrules`
- [ ] 如果用 Claude Code：创建 `CLAUDE.md`
- [ ] 提交到 Git，团队同步
- [ ] 每月 review 并更新

---

配置文件是智能体工程的"基础设施"。花 30 分钟建好它，能省下团队几百小时的返工时间。🏗️

*想了解如何在团队中推广智能体工程？请阅读 [团队落地智能体工程：四步走实战指南](/blog/zh/agentic-engineering-team-adoption)。*
