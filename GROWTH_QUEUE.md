# GROWTH_QUEUE.md

Last updated: 2026-03-25 17:20
Owner: hub-growth-runner (sub-agent)
Manager: main session

## Rules
- One task = one measurable output + one commit.
- After each task: update this file (`Doing` -> `Done`) and include commit hash.
- Priority: high-impact, low-risk first.
- Focus scope: SEO/content/internal links/technical hygiene for openclaw-hub.

## Backlog

## Doing
- [ ] P1 Candidate A / EXP-057: 强化 2026-04-01 双语 AI/Tech Daily 的搜索摘要与转化内链（重写 EN/ZH description，并把 CTA 升级为指向 What Is OpenClaw / VPS guide / model fallback 的强相关内链），消费最近24小时内容建设任务新增的实验假设 | ICE 8x7x8=448
  - Hypothesis: 对最近24小时新发布但仍保留占位摘要/泛 CTA 的日报页，补强可检索摘要与强相关 CTA 内链，可提升日报页搜索匹配度、站内继续阅读率，以及向 OpenClaw 核心指南的导流效率。
  - Metrics: `pnpm build` 通过；EN/ZH 目标页均含具体 description 与 3 条强相关内链；后续观察日报页 CTR、站内下一跳与相关指南页导流点击。
  - Acceptance: 1) `/en/blog/openclaw-daily-2026-04-01/` 与 `/zh/blog/openclaw-daily-2026-04-01/` frontmatter description 去占位化；2) CTA 替换为 OpenClaw 核心指南/部署/模型回退相关内链；3) `pnpm build` 通过。

## Done
- [x] P1 Candidate A / EXP-056: 强化 2026-03-25 双语 AI/Tech Daily 的搜索摘要与转化内链（重写 EN/ZH description，并把 CTA 升级为指向 What Is OpenClaw / VPS guide / model fallback 的强相关内链），消费最近24小时内容建设任务新增的实验假设 | ICE 8x7x8=448 — commit `(this commit)`
  - Hypothesis: 对最近24小时新发布但仍保留占位摘要/泛 CTA 的日报页，补强可检索摘要与强相关 CTA 内链，可提升日报页搜索匹配度、站内继续阅读率，以及向 OpenClaw 核心指南的导流效率。
  - Metrics: `pnpm build` 通过；EN/ZH 目标页均含具体 description 与 3 条强相关内链；后续观察日报页 CTR、站内下一跳与相关指南页导流点击。
  - Acceptance: 1) `/en/blog/openclaw-daily-2026-03-25/` 与 `/zh/blog/openclaw-daily-2026-03-25/` frontmatter description 去占位化；2) CTA 替换为 OpenClaw 核心指南/部署/模型回退相关内链；3) `pnpm build` 通过。

- [x] P1 Candidate A / EXP-055: 强化 2026-03-21 双语 AI/Tech Daily 的搜索摘要与转化内链（重写 EN/ZH description，并把 CTA 升级为指向 What Is OpenClaw / VPS guide / model fallback 的强相关内链），消费最近24小时内容建设任务新增的实验假设 | ICE 8x7x8=448 — commit `(this commit)`
  - Hypothesis: 对最近24小时新发布但仍保留占位摘要/泛 CTA 的日报页，补强可检索摘要与强相关 CTA 内链，可提升日报页搜索匹配度、站内继续阅读率，以及向 OpenClaw 核心指南的导流效率。
  - Metrics: `pnpm build` 通过；EN/ZH 目标页均含具体 description 与 3 条强相关内链；后续观察日报页 CTR、站内下一跳与相关指南页导流点击。
  - Acceptance: 1) `/en/blog/openclaw-daily-2026-03-21/` 与 `/zh/blog/openclaw-daily-2026-03-21/` frontmatter description 去占位化；2) CTA 替换为 OpenClaw 核心指南/部署/模型回退相关内链；3) `pnpm build` 通过。

- [x] P1 Candidate A / EXP-054: 在 EN/ZH 首页 hero 下新增创作者 CTA（发布 Skill + 安全指南），并在全站 footer 增加发布入口，验证“内容读者→生态贡献者”转化链路 | ICE 8x6x6=288 — commit `84a458c`
  - Hypothesis: 仅靠页脚/导航很难激活创作者；把发布入口提升到首页 hero 下，可提升发布页点击率，并让内容型流量转化为 Skill 发布者。
  - Metrics (CFWA Events): `home_creator_cta_render`, `home_creator_cta_click`; 关键比率 creator_ctr=click/render，publish_share=publish_click/all_creator_click.
  - Acceptance: 1) `/en/` 与 `/zh/` hero 下可见 creator CTA；2) footer 出现 publish + guide 入口；3) growth 事件命名稳定且不上传敏感文本；4) `pnpm build` 通过。

- [x] P1 Candidate A / EXP-053: 在首页 CTA 增加“Telegram 一键加入 + 复制问题模板”转化位点（并用 CFWA 事件记录 click/join/issue_template_copy），提升 CTA 后续支持链路转化与问题收敛质量 | ICE 8x6x7=336 — commit `7499b13`
  - Hypothesis: 对第一次运行失败的用户，“加入社群 + 复制最小证据模板”比纯文档跳转更能降低放弃率，并提高后续求助消息质量，从而提升留存与二次访问。
  - Metrics (CFWA Events): `home_cta_tg_click`, `home_cta_tg_open`, `home_cta_issue_template_copy`; (Ratios) tg_click_rate=click/pageview, template_copy_rate=copy/click.
  - Acceptance: 1) `/`, `/en/`, `/zh/` 首屏 CTA 出现 Telegram 按钮 + “Copy issue template”; 2) CFWA Events 面板 24h 内可见事件 >0; 3) 不上传用户日志文本；4) `pnpm build` 通过。

- [x] P1 Candidate A / EXP-052: 将首页 CTA 埋点从“console + window.dispatchEvent”升级为“Cloudflare Web Analytics 自定义事件”最小闭环（view/click/copy/verify）并写入 EXPERIMENT_LOG 观测方法 | ICE 8x7x6=336 — commit `fb9bcf7`
  - Hypothesis: 只有把事件真正落到可观测平台（无需自建后端）才能快速验证 EXP-050/051 的转化链路假设；最小事件闭环会显著降低后续实验的测量成本。
  - Metrics: CF Web Analytics 中 event count（home_cta_view/click_install/click_what/copy_install/verify_start/verify_echo）；事件触发率（events/pageviews）。
  - Acceptance: 1）上线后 24h 内能在 CFWA 面板看到事件（至少 view + click 各>0）；2）不引入隐私风险（不上传命令输出文本）；3）pnpm build 通过。

- [x] P1 Candidate A / EXP-051: 在 /en /zh / 根首页首屏 CTA 增加“命令行复制按钮 + 5s 自回显验证”微交互（复制 install + `openclaw gateway status`/`openclaw doctor`），提升 CTA 点击后真实执行率与回访率 | ICE 7x6x6=252 — commit `dedf78c`
- [x] P1 Candidate A / EXP-050: 在首页与 /en /zh 增加“Get started / Install OpenClaw”首屏 CTA（含 3-step quickstart）并埋点（CTA 点击/滚动/下一跳），用于提升首页→核心指南转化 | ICE 9x8x7=504 — commit `6b4bf94`

- [x] P1 Candidate A / EXP-049: 发布“OpenClaw `web_search` 500：工具同名冲突与参数约束修复”中英双语教程，覆盖 web_search 500 / tool schema conflict 高意图检索，并补齐 3 条高相关内链 | ICE 8x7x8=448 — commit `8032e37`
- [x] P1 Candidate A / EXP-048: 强化 2026-03-12 双语 AI/Tech Daily 的搜索摘要与转化内链（重写 EN/ZH description，并把 CTA 升级为指向 What Is OpenClaw / VPS guide / model fallback 的强相关内链），消费最近24小时新增内容建设任务 | ICE 8x7x8=448 — commit `665f16f`
- [x] P2 Candidate B / EXP-047: 为“Skill 安装后不生效”双语教程补齐 FAQ schema（>=3 Q&A），提升富结果命中与高意图检索点击质量 | ICE 7x7x6=294 — commit `b4b401e`
- [x] P1 Candidate A / EXP-045: 发布中英双语 FAQ《`openclaw doctor --fix` vs `--repair` 安全修复》，覆盖 doctor/fix/repair/force 高意图检索并补齐4条高相关内链 | ICE 8x8x8=512 — commit `c8a07c6`
- [x] P1 Candidate A / EXP-044: 发布中英双语 FAQ《`openclaw channels status --probe` 5 分钟定位在线不回复》，覆盖渠道探针高意图检索并补齐3条高相关内链 | ICE 9x8x8=576 — commit `(this commit)`
- [x] P3 Candidate C / EXP-041: 在 weekly:seo 输出“schema 风险周均值/峰值/覆盖率”聚合列（基于已集成日快照字段）| ICE 6x7x6=252 — commit `240b179`
- [x] P1 Candidate A / EXP-042: 发布中英双语 FAQ《`openclaw status` vs `openclaw gateway status` 区分与5分钟排障流》，覆盖“在线不回复”高意图检索并补齐3条高相关内链 | ICE 8x8x8=512 — commit `2c330e1`
- [x] P2 Candidate B: 为 daily:seo 增加快照数据完整性提示（GSC + Schema 字段是否填写），减少无效周报输入 | ICE 7x7x8=392 — commit `7ffd09a`
- [x] P1 Candidate A: 在 daily:seo 集成 schema 风险自动采集（调用 website-schema 闸门并写入 Snapshot 字段），打通周报 Section 11 数据来源 | ICE 8x8x7=448 — commit `3d718dc`
- [x] P2 Candidate C: 在 weekly:seo 增加 schema 风险趋势统计占位（近7天）| ICE 5x6x5=150 — commit `351550a`
- [x] P2 Candidate B: 为 check:website-schema 增加失败样例 Top10 输出，缩短排障路径 | ICE 6x7x7=294 — commit `84c6485`
- [x] P1 Candidate A: 强化 WebSite JSON-LD 闸门（严格校验 publisher.logo 嵌套字段 + URL/语言一致性 + JSON 解析容错），并保留 rg 不可用时 grep -RIn 回退 | ICE 8x8x7=448 — commit `f4634a7`
- [x] (older history omitted)
