# OpenClaw Hub

OpenClaw Hub 是一个基于 **Astro** 的中英双语内容站点，聚焦：

- AI / 科技日报（持续更新）
- OpenClaw 实战教程与排障指南
- 自动化工作流与运维经验

## 🌐 线上地址

- 主域名：`https://kuoo.uk`
- 旧域名：`https://openhub.plzbite.top`（保留访问并逐步跳转）

## 📦 技术栈

- [Astro](https://astro.build)
- Markdown 内容驱动（`src/content/blog`）
- GitHub Actions（构建 + 内容检查 + 链接检查）
- Cloudflare Pages 部署

## 🚀 本地开发

```bash
pnpm install
pnpm dev
```

默认开发地址：`http://localhost:4321`

## 🛠 构建与预览

```bash
pnpm build
pnpm preview
```

## 📁 目录结构

```text
openclaw-hub/
├─ src/
│  ├─ content/blog/        # 中英文文章内容
│  ├─ pages/               # 页面与路由（含 /en /zh /daily）
│  ├─ layouts/             # 页面布局（含 BlogPost）
│  └─ components/          # 可复用组件
├─ public/                 # 静态资源（图片、重定向规则等）
├─ scripts/                # 发布与审计脚本
├─ .github/workflows/      # CI 工作流
├─ GROWTH_QUEUE.md         # 持续优化任务队列
└─ SEO_GROWTH_PLAN.md      # SEO 增长计划
```

## 📰 科技日报能力

已支持：

- 科技日报独立聚合页：
  - `https://kuoo.uk/zh/daily/`
  - `https://kuoo.uk/en/daily/`
- 连续阅读（上一篇 / 下一篇）
- RSS 订阅：
  - `https://kuoo.uk/zh/daily/rss.xml`
  - `https://kuoo.uk/en/daily/rss.xml`

## 🤖 持续优化机制

项目采用「调度层 + 执行层」模式持续优化：

- 主会话：目标管理、优先级、用户同步
- 执行 worker：按 `GROWTH_QUEUE.md` 持续完成任务并提交

### Weekly Roundup 自动化 Hook

```bash
pnpm weekly:roundup
```

效果：
- 自动生成当周（周一到周日）`en/zh` 双语 weekly roundup 草稿
- 自动索引本周 `openclaw-daily-*` 日报链接
- 若当周文件已存在则跳过，避免覆盖人工修改

### SEO Weekly Report 草稿自动生成

```bash
pnpm weekly:seo
```

效果：
- 在 `reports/seo-weekly/` 生成当周报告草稿
- 自动填充周区间、生成时间、并汇总 git 追踪到的内容/技术变更
- 预留 GSC KPI 与 Top Pages/Queries 待人工回填

## ✅ CI 说明

当前 CI 包含：

1. 构建检查（`pnpm build`）
2. Frontmatter 必填字段检查
3. Lychee 链接检查（基于 `dist/**/*.html`）

## 📄 内容写作约定（简版）

- 中英文内容分开维护（`zh/` 与 `en/`）
- 标题与描述必须具体、可读，避免模板化描述
- 科技日报优先保持结构化：要闻 / 案例 / 结论

## 🧭 维护建议

- 新增文章后先本地 `pnpm build`
- 提交前检查内部链接是否使用站内规范路径
- 对外链波动（403/429/timeout）在 CI 中按需做白名单或排除

---

如果你是协作者，建议先看：

- `GROWTH_QUEUE.md`
- `SEO_GROWTH_PLAN.md`
- `.github/workflows/content-check.yml`
