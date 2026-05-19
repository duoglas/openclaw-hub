# GROWTH_QUEUE.md

Last updated: 2026-05-19 11:22
Owner: hub-growth-runner (sub-agent)
Manager: main session

## Rules
- One task = one measurable output + one commit.
- After each task: update this file (`Doing` -> `Done`) and include commit hash.
- Priority: high-impact, low-risk first.
- Focus scope: SEO/content/internal links/technical hygiene for openclaw-hub.

## Backlog
- [ ] N/A

## Doing
- [ ] N/A

## Done
- [x] P1 Candidate A / EXP-117: 回补 2026-05-19 双语日报质量缺口（EN 从中文正文改为完整英文实稿 + EN/ZH description 可检索化 + 结论/跟踪点 bullet 化 + 证据矩阵补全），优先消费最近24小时内容建设新增日报假设 | ICE 9x8x8=576 — commit `93d1ebd`
  - Hypothesis: 最近24小时新增日报若英文页仍为中文正文、EN description 仍为通用模板、ZH description 仍为正文截断摘要，且 EN/ZH 缺少证据矩阵并以省略号截断明日跟踪点，会削弱首日索引窗口期的语言匹配、摘要点击意图一致性、来源可核验性与读者完成率；当日回补为完整英文叙事、可检索摘要、完整行动段和证据矩阵，可提升搜索可见性与核心指南导流质量。
  - Metrics: `pnpm check:daily-template` 通过；`pnpm check:daily-heading-date` 通过；`pnpm check:daily-cta` 通过；`pnpm check:daily-fresh-completeness` 通过；`pnpm check:latest-daily-surface` 通过；`pnpm check:daily-related-posts` 通过；`pnpm check:daily-evidence-matrix` 通过；`pnpm check:daily-en-language` 通过；`pnpm check:daily-action-sections` 通过；`pnpm check:duplicate-slug-id` 通过；`pnpm build` 通过。
  - Acceptance: 1) EN `openclaw-daily-2026-05-19.md` 从中文正文回补为完整英文 Top 5、案例、结论、跟踪点与证据矩阵；2) EN/ZH description 升级为可检索摘要；3) EN/ZH 今日结论/明日跟踪点均至少 3 条 bullet 且无省略号截断；4) EN/ZH 证据矩阵补全为至少 5 条来源明细；5) 保持 3 条强相关 CTA 内链不回退；6) 本地九项日报闸门 + duplicate precheck + build 全部通过。
- [x] P1 Candidate A / EXP-116: 新增最新日报“今日结论/明日跟踪点”行动段完整性闸门（EN Bottom Line/Watch + ZH 今日结论/明日跟踪点均至少 3 条 bullet，禁止省略号截断），消费 EXP-115 后续“结论/跟踪点缺失纳入自动闸门”假设 | ICE 8x7x8=448 — commit `(this commit)`
  - Hypothesis: 最近24小时新增日报已多次需要人工回补“今日结论/明日跟踪点”；若这些行动段缺失、条数不足或以省略号截断，会削弱读者完成率、下一步判断和日报作为连续阅读入口的转化价值。把最新日报行动段完整性纳入 CI，可在发布阶段阻断结尾质量回归，稳定放大 EXP-115 的质量收益。
  - Metrics: `pnpm check:daily-action-sections` 通过；`pnpm check:daily-template` 通过；`pnpm check:daily-heading-date` 通过；`pnpm check:daily-cta` 通过；`pnpm check:daily-fresh-completeness` 通过；`pnpm check:latest-daily-surface` 通过；`pnpm check:daily-related-posts` 通过；`pnpm check:daily-evidence-matrix` 通过；`pnpm check:daily-en-language` 通过；`pnpm check:duplicate-slug-id` 通过；`pnpm build` 通过；content-check CI 新增 Daily action sections completeness check。
  - Acceptance: 1) 新增 `scripts/check-daily-action-sections.sh`，默认检查最新 EN/ZH 日报；2) EN 要求 `## Today’s Bottom Line` 与 `## What to Watch Tomorrow` 各至少 3 条 bullet；3) ZH 要求 `## 今日结论` 与 `## 明日跟踪点` 各至少 3 条 bullet；4) 禁止行动段 bullet 以 `...` 或 `…` 截断；5) `package.json` 与 content-check CI 接入；6) 本地专项检查 + 日报质量闸门 + duplicate precheck + build 全部通过。
- [x] P1 Candidate A / EXP-115: 回补 2026-05-18 双语日报质量缺口（EN 从中文正文改为完整英文实稿 + EN/ZH description 可检索化 + 正文截断补全 + 证据矩阵补全），优先消费最近24小时内容建设新增日报假设 | ICE 9x8x8=576 — commit `391c612`
  - Hypothesis: 最近24小时新增日报若英文页仍为中文正文、EN description 仍为通用模板、ZH description 仍为正文截断摘要，且 EN/ZH 在实战案例 2 处以省略号截断并缺少证据矩阵，会削弱首日索引窗口期的语言匹配、摘要点击意图一致性、来源可核验性与读者完成率；当日回补为完整英文叙事、可检索摘要、完整结论/跟踪点和证据矩阵，可提升搜索可见性与核心指南导流质量。
  - Metrics: `pnpm check:daily-template` 通过；`pnpm check:daily-heading-date` 通过；`pnpm check:daily-cta` 通过；`pnpm check:daily-fresh-completeness` 通过；`pnpm check:latest-daily-surface` 通过；`pnpm check:daily-related-posts` 通过；`pnpm check:daily-evidence-matrix` 通过；`pnpm check:daily-en-language` 通过；`pnpm check:duplicate-slug-id` 通过；`pnpm build` 通过；`/en|zh/blog/openclaw-daily-2026-05-18/` description 覆盖当日核心主题且正文/证据矩阵无省略号截断。
  - Acceptance: 1) EN `openclaw-daily-2026-05-18.md` 从中文混排回补为完整英文 Top 5、案例、结论与跟踪点；2) EN/ZH description 升级为可检索摘要；3) EN/ZH 实战案例 2、今日结论与明日跟踪点补全，无省略号截断；4) EN/ZH 证据矩阵补全为至少 5 条来源明细；5) 保持 3 条强相关 CTA 内链不回退；6) 本地八闸门 + duplicate precheck + build 全部通过。
- [x] P1 Candidate A / EXP-114: 新增最新英文日报语言一致性闸门（阻断中文正文/中文结构标签回归），消费 EXP-113 “英文正文中文残留纳入自动闸门”后续假设 | ICE 8x8x8=512 — commit `(this commit)`
  - Hypothesis: 最近24小时新增日报已多次出现 EN 页面中文混排/中文正文回归；若只依赖人工发布后回补，会错过首日索引窗口。新增最新英文日报语言一致性闸门，扫描中文结构标题、中文字段标签与异常 CJK 占比，可在 CI 阶段阻断英文页语言回归，稳定提升英文检索匹配、读者完成率与日报质量闭环效率。
  - Metrics: `pnpm check:daily-en-language` 通过；`pnpm check:daily-template` 通过；`pnpm check:daily-heading-date` 通过；`pnpm check:daily-cta` 通过；`pnpm check:daily-fresh-completeness` 通过；`pnpm check:latest-daily-surface` 通过；`pnpm check:daily-related-posts` 通过；`pnpm check:daily-evidence-matrix` 通过；`pnpm check:duplicate-slug-id` 通过；`pnpm build` 通过；content-check CI 新增 Daily English language consistency check。
  - Acceptance: 1) 新增 `scripts/check-daily-en-language-consistency.mjs`，默认检查最新 EN 日报；2) 阻断 `今日要闻`、`发生了什么：`、`为什么重要：`、`可能影响：`、`今日结论`、`证据矩阵` 等中文结构残留；3) 对异常 CJK 占比设置保护阈值，同时允许少量中文专名；4) `package.json` 与 content-check CI 接入；5) 本地专项检查 + 日报质量闸门 + duplicate precheck + build 全部通过。
- [x] P1 Candidate A / EXP-113: 回补 2026-05-17 双语日报质量缺口（EN 从中文正文改为完整英文实稿 + EN/ZH description 可检索化 + 结论截断补全 + 证据矩阵补全），优先消费最近24小时内容建设新增日报假设 | ICE 9x8x8=576 — commit `830a424`
  - Hypothesis: 最近24小时新增日报若英文页仍为中文正文、EN description 仍为通用模板、ZH description 仍为标题/首条截断摘要，且 EN/ZH 缺少证据矩阵并在“短期内最实用的 AI 方向…”处截断，会削弱首日索引窗口期的语言匹配、摘要点击意图一致性、页面可信度与读者完成率；当日回补为完整英文叙事、可检索摘要、完整结论和来源矩阵，可提升搜索可见性与核心指南导流质量。
  - Metrics: `pnpm check:daily-template` 通过；`pnpm check:daily-heading-date` 通过；`pnpm check:daily-cta` 通过；`pnpm check:daily-fresh-completeness` 通过；`pnpm check:latest-daily-surface` 通过；`pnpm check:daily-related-posts` 通过；`pnpm check:daily-evidence-matrix` 通过；`pnpm check:duplicate-slug-id` 通过；`pnpm build` 通过；`/en|zh/blog/openclaw-daily-2026-05-17/` description 覆盖当日核心主题且正文/证据矩阵无省略号截断。
  - Acceptance: 1) EN `openclaw-daily-2026-05-17.md` 从中文混排回补为完整英文 Top 5、案例、结论与跟踪点；2) EN/ZH description 升级为可检索摘要；3) EN/ZH 今日结论补全，移除 `短期内最实用的 AI 方向…` 截断；4) EN/ZH 证据矩阵补全为至少 5 条来源明细；5) 保持 3 条强相关 CTA 内链不回退；6) 本地七闸门 + duplicate precheck + build 全部通过。
- [x] P1 Candidate A / EXP-112: 新增最新日报 Evidence Matrix 完整性闸门（要求 EN/ZH 最新日报包含证据矩阵、至少 5 条来源明细、禁止 `-…`/省略号截断），消费 EXP-111 最近24小时证据矩阵截断复盘假设 | ICE 8x7x8=448 — commit `2df2d14`
  - Hypothesis: 最近24小时 2026-05-16 日报已补全证据矩阵，但若后续发布再次出现 `-…` 截断或证据矩阵缺失，会削弱内容可信度、来源可核验性与读者完成率；将最新日报 Evidence Matrix 完整性纳入 CI，可在上线前阻断证据质量回归。
  - Metrics: `pnpm check:daily-evidence-matrix` 通过；`pnpm check:daily-template` 通过；`pnpm check:daily-heading-date` 通过；`pnpm check:daily-cta` 通过；`pnpm check:daily-fresh-completeness` 通过；`pnpm check:latest-daily-surface` 通过；`pnpm check:daily-related-posts` 通过；`pnpm check:duplicate-slug-id` 通过；`pnpm build` 通过；content-check CI 新增 Daily evidence matrix completeness check。
  - Acceptance: 1) 新增 `scripts/check-daily-evidence-matrix.mjs`，默认检查最新 EN/ZH 日报；2) EN 要求 `## Evidence Matrix`，ZH 要求 `## 证据矩阵`；3) 每个矩阵至少 5 条来源明细，且禁止省略号/截断 bullet；4) `package.json` 与 content-check CI 接入；5) 本地专项检查 + 日报闸门 + duplicate precheck + build 全部通过。
- [x] P1 Candidate A / EXP-111: 回补 2026-05-16 双语日报质量缺口（EN 从中文正文改为完整英文实稿 + EN/ZH description 可检索化 + 证据矩阵补全），优先消费最近24小时内容建设新增日报假设 | ICE 9x8x8=576 — commit `14582b8`
  - Hypothesis: 最近24小时新增日报若英文页仍为中文正文、中文 description 仍为标题截断片段且双语证据矩阵只有省略号，会削弱首日索引窗口期的语言匹配、摘要点击意图一致性与读者信任；当日回补为完整英文叙事、可检索摘要和完整证据矩阵，可提升搜索可见性、阅读完成率与核心指南导流质量。
  - Metrics: `pnpm check:daily-template` 通过；`pnpm check:daily-heading-date` 通过；`pnpm check:daily-cta` 通过；`pnpm check:daily-fresh-completeness` 通过；`pnpm check:latest-daily-surface` 通过；`pnpm check:daily-related-posts` 通过；`pnpm check:duplicate-slug-id` 通过；`pnpm build` 通过；`/en|zh/blog/openclaw-daily-2026-05-16/` description 覆盖当日核心主题且正文/证据矩阵无省略号截断。
  - Acceptance: 1) EN `openclaw-daily-2026-05-16.md` 从中文混排回补为完整英文 Top 5、案例、结论与跟踪点；2) EN/ZH description 升级为可检索摘要；3) EN/ZH 证据矩阵补全为来源类别清单，无 `-…` 截断；4) 保持 3 条强相关 CTA 内链不回退；5) 本地六闸门 + duplicate precheck + build 全部通过。
- [x] P1 Candidate A / EXP-110: 修复双语文章页 Related Posts 计算后未传入布局的转化断点，并新增最新日报相关文章增长闸门，消费最近24小时 2026-05-15 日报连续阅读假设 | ICE 8x7x8=448 — commit `(this commit)`
  - Hypothesis: 最近24小时新增日报已经通过首页 Spotlight、日报归档和 RSS 获得发现入口，但文章页静态路径虽然计算了 `relatedPosts` 却没有传入 `BlogPost`，导致“相关文章”模块不渲染；修复传参并把最新日报相关文章渲染纳入 CI，可提升日报读者站内下一跳、降低读后跳出，并让 `blog_related_posts_render` 成为可观测增长事件。
  - Metrics: `pnpm build` 通过；`pnpm check:latest-daily-surface` 通过；`pnpm check:daily-related-posts` 通过；`pnpm check:daily-template` 通过；`pnpm check:daily-heading-date` 通过；`pnpm check:daily-cta` 通过；`pnpm check:daily-fresh-completeness` 通过；EN/ZH 最新日报构建页均含 3 条非自身相关文章链接与 `blog_related_posts_render`。
  - Acceptance: 1) EN/ZH blog detail page 将 `relatedPosts` 传入 `BlogPost`；2) 相关文章模块增加稳定增长渲染事件与可检查标记；3) 新增 `scripts/check-daily-related-posts.sh`、`check:daily-related-posts` 并接入 content-check CI；4) build + 最新日报发现面 + 日报质量闸门全部通过。
- [x] P1 Candidate A / EXP-109: 回补 2026-05-15 双语日报质量缺口（EN 从中文正文改为完整英文实稿 + EN/ZH description 可检索化 + 正文截断补全），优先消费最近24小时内容建设新增日报假设 | ICE 9x8x8=576 — commit `(this commit)`
  - Hypothesis: 最近24小时新增日报若英文页仍为中文正文、英文 description 仍为通用模板、中文 description 为正文首条截断摘要且双语正文在第 5 条“可能影响”处截断，会削弱首日索引窗口期的语言匹配、摘要点击意图一致性与读者完成率；当日回补为完整英文叙事、可检索摘要和完整结论段，可提升搜索可见性与核心指南导流质量。
  - Metrics: `pnpm check:daily-template` 通过；`pnpm check:daily-heading-date` 通过；`pnpm check:daily-cta` 通过；`pnpm check:daily-fresh-completeness` 通过；`pnpm check:latest-daily-surface` 通过；`pnpm build` 通过；`/en|zh/blog/openclaw-daily-2026-05-15/` description 覆盖当日核心主题且正文无截断。
  - Acceptance: 1) EN `openclaw-daily-2026-05-15.md` 从中文混排回补为完整英文 Top 5、案例、结论与跟踪点；2) EN/ZH description 升级为可检索摘要；3) EN/ZH 第 5 条与今日结论/明日跟踪点补全，无省略号截断；4) 保持 3 条强相关 CTA 内链不回退；5) 本地五闸门 + build 全部通过。
- [x] P1 Candidate A / EXP-108: 新增“最新日报发现面一致性”闸门（首页 Spotlight + 日报归档 latest hero + RSS 首项 + sitemap 全部指向最新双语日报），消费最近24小时 2026-05-14 日报曝光延续假设 | ICE 8x7x8=448 — commit `(this commit)`
  - Hypothesis: 最近24小时新增日报完成质量回补后，若首页 Spotlight、日报归档页、RSS 首项或 sitemap 任一发现入口未同步到最新 2026-05-14，会稀释首日索引窗口与读者连续阅读路径；把这些发现面纳入 CI 闸门，可提升最新日报曝光一致性、RSS 订阅入口质量与搜索抓取稳定性。
  - Metrics: `pnpm build` 通过；`pnpm check:latest-daily-surface` 通过；EN/ZH 首页、`/daily/`、RSS 首项与 sitemap 均包含 `/en|zh/blog/openclaw-daily-2026-05-14/`；CI 新增 Latest daily surface alignment check。
  - Acceptance: 1) 新增 `scripts/check-latest-daily-surface.sh`；2) `package.json` 增加 `check:latest-daily-surface`；3) content-check CI 接入该闸门；4) 本地 build + 专项检查通过。
- [x] P1 Candidate A / EXP-107: 回补 2026-05-14 双语日报质量缺口（EN 从中文正文改为完整英文实稿 + EN/ZH description 可检索化 + 正文截断补全），优先消费最近24小时内容建设新增日报假设 | ICE 9x8x8=576 — commit `(this commit)`
  - Hypothesis: 最近24小时新增日报若英文页仍为中文正文、英文 description 仍为通用模板、中文 description 为正文截断片段且双语结论以省略号截断，会削弱首日索引窗口期的语言匹配、摘要点击意图一致性与读者完成率；当日回补为完整英文叙事、可检索摘要和完整结论段，可提升搜索可见性与核心指南导流质量。
  - Metrics: `pnpm check:daily-template` 通过；`pnpm check:daily-heading-date` 通过；`pnpm check:daily-cta` 通过；`pnpm check:daily-fresh-completeness` 通过；`pnpm build` 通过；`/en|zh/blog/openclaw-daily-2026-05-14/` description 覆盖当日核心主题且正文无截断。
  - Acceptance: 1) EN `openclaw-daily-2026-05-14.md` 从中文混排回补为完整英文 Top 5、案例、结论与跟踪点；2) EN/ZH description 升级为可检索摘要；3) EN/ZH 今日结论与明日跟踪点补全，无省略号截断；4) 保持 3 条强相关 CTA 内链不回退；5) 本地四闸门 + build 全部通过。
- [x] P1 Candidate A / EXP-106: 强化 EN/ZH 日报归档页最新日报转化位（latest hero + RSS CTA + daily_index 增长事件 + ItemList JSON-LD），消费最近24小时 2026-05-13 日报曝光延续假设 | ICE 8x7x8=448 — commit `(this commit)`
  - Hypothesis: 最近24小时新增日报完成质量回补后，若 `/en|zh/daily/` 仍只是平铺列表，读者从首页 Spotlight 或 RSS 入口进入归档时容易被历史列表稀释；在日报归档页顶部突出最新 2026-05-13 日报、RSS 订阅与可观测点击事件，并补充 ItemList 结构化数据，可提升最新日报打开率、RSS 订阅点击与归档页索引理解。
  - Metrics: `pnpm build` 通过；`pnpm check:daily-index-growth` 通过；`pnpm check:rss-autodiscovery` 通过；`pnpm check:website-schema` 通过；`dist/en|zh/daily/index.html` 包含 `daily_index_latest_render`、`daily_index_click`、latest/RSS CTA 与 ItemList JSON-LD，且自动指向 `/en|zh/blog/openclaw-daily-2026-05-13/`。
  - Acceptance: 1) EN/ZH `/daily/` 顶部新增最新日报 hero；2) latest/RSS/archive 点击均有稳定增长事件且不上传用户文本；3) 归档页输出 ItemList JSON-LD；4) 新增 `check:daily-index-growth` 并接入 CI；5) build + 专项检查全部通过。
- [x] P1 Candidate A / EXP-105: 回补 2026-05-13 双语日报质量缺口（EN 从中文混排改为完整英文实稿 + EN/ZH description 可检索化 + 正文截断补全），优先消费最近24小时内容建设新增日报假设 | ICE 9x8x8=576 — commit `(this commit)`
  - Hypothesis: 最近24小时新增日报若英文页仍为中文正文、中文 description 仍截取标题片段且双语正文存在“中…”截断，会削弱首日索引窗口期的语言匹配、摘要点击意图一致性与读者完成率；当日回补为完整英文叙事、可检索摘要和完整结论段，可提升搜索可见性与核心指南导流质量。
  - Metrics: `pnpm check:daily-template` 通过；`pnpm check:daily-heading-date` 通过；`pnpm check:daily-cta` 通过；`pnpm check:daily-fresh-completeness` 通过；`pnpm build` 通过；`/en|zh/blog/openclaw-daily-2026-05-13/` description 覆盖当日核心主题且正文无截断。
  - Acceptance: 1) EN `openclaw-daily-2026-05-13.md` 从中文混排回补为完整英文 Top 5、案例、结论与跟踪点；2) EN/ZH description 升级为可检索摘要；3) EN/ZH 今日结论与明日跟踪点补全，无 `中…` 截断；4) 保持 3 条强相关 CTA 内链不回退；5) 本地四闸门 + build 全部通过。
- [x] P1 Candidate A / EXP-104: 在 EN/ZH 首页新增最新日报 Spotlight 模块（自动选取最新 `openclaw-daily-*`，展示可检索摘要、日报详情、RSS 与连续阅读入口，并记录 render/click 增长事件），优先消费最近24小时 2026-05-12 日报内容建设假设 | ICE 8x7x8=448 — commit `(this commit)`
  - Hypothesis: 最近24小时新增日报完成质量回补后，若只依赖文章列表自然曝光，首页读者容易先进入教程/安装 CTA 而跳过当日 AI Agent/算力/办公 AI 信号；在首页 CTA 后新增最新日报 Spotlight，可提升当日日报点击率、RSS 订阅点击与日报连续阅读入口使用率。
  - Metrics: `pnpm build` 通过；EN/ZH 首页构建产物包含 `home_latest_daily_render` 与 `home_latest_daily_click`；`/en|zh/` Spotlight 自动指向 `/en|zh/blog/openclaw-daily-2026-05-12/`；本地四项日报闸门通过。
  - Acceptance: 1) 新增 `LatestDailySpotlight.astro` 双语组件；2) `/en/` 与 `/zh/` 首页自动选取最新日报并展示标题、description、详情/RSS/列表入口；3) 增长事件命名稳定且不上传用户文本；4) `pnpm check:daily-template && pnpm check:daily-heading-date && pnpm check:daily-cta && pnpm check:daily-fresh-completeness && pnpm build` 通过。
- [x] P1 Candidate A / EXP-103: 回补 2026-05-12 双语日报质量缺口（EN 通用正文升级为完整英文实稿 + EN/ZH description 可检索化），保持强相关 CTA 并完成四闸门+build+推送闭环，优先消费最近24小时内容建设新增日报假设 | ICE 9x8x8=576 — commit `(this commit)`
  - Hypothesis: 最近24小时新增日报若英文页仍保留通用模板正文、中文页 description 带正文片段/标题符号，会削弱首日索引窗口期的主题匹配、摘要点击意图一致性与英文读者完成率；当日回补为具体英文叙事并同步清理双语摘要，可提升搜索可见性与核心指南导流质量。
  - Metrics: `pnpm check:daily-template` 通过；`pnpm check:daily-heading-date` 通过；`pnpm check:daily-cta` 通过；`pnpm check:daily-fresh-completeness` 通过；`pnpm build` 通过；`/en|zh/blog/openclaw-daily-2026-05-12/` description 覆盖当日核心主题且 EN 正文不再为通用模板。
  - Acceptance: 1) EN `openclaw-daily-2026-05-12.md` 从通用占位叙事回补为完整英文 Top 5、案例、结论；2) EN/ZH description 升级为可检索摘要；3) 保持 3 条强相关 CTA 内链不回退；4) 本地四闸门 + build 全部通过。
- [x] P1 Candidate A / EXP-092: 修复 2026-04-23 双语日报正文截断（补全实战案例2 + 今日结论），保持可检索摘要与强相关 CTA，完成 build 闭环 | ICE 9x8x8=576 — commit `(this commit)`
  - Hypothesis: 对最近24小时新增日报中出现正文截断（“全能 …”）的双语页面做当日补全，可恢复页面信息完整度与可读性，避免摘要/正文语义断裂对检索匹配与导流转化造成损失。
  - Metrics: `pnpm check:daily-template` 通过；`pnpm check:daily-heading-date` 通过；`pnpm check:daily-cta` 通过；`pnpm build` 通过；`/en|zh/blog/openclaw-daily-2026-04-23/` 不再存在截断句，且补全“实战案例2+今日结论+跟踪点”。
  - Acceptance: 1) 补全 EN/ZH `openclaw-daily-2026-04-23.md` 截断正文；2) 保持既有 description 与 3 条强相关 CTA 不回退；3) 本地检查与构建全部通过。
- [x] P1 Candidate A / EXP-091: 回补 2026-04-22 与 2026-04-23 双语日报 description（优先消费最近24小时内容建设新增实验假设），去除通用/截断摘要并升级为可检索摘要，保持 CTA 强相关内链并完成 build 闭环 | ICE 9x8x8=576 — commit `(this commit)`
  - Hypothesis: 对最近24小时新增且仍含通用或截断 description 的双语日报页（2026-04-22、2026-04-23）做当日可检索摘要回补，可提升主题检索匹配、摘要点击意图一致性与核心指南导流质量。
  - Metrics: `pnpm check:daily-template` 通过；`pnpm check:daily-heading-date` 通过；`pnpm check:daily-cta` 通过；`pnpm build` 通过；`/en|zh/blog/openclaw-daily-2026-04-22/` 与 `/en|zh/blog/openclaw-daily-2026-04-23/` description 不再为通用或截断文案。
  - Acceptance: 1) 更新 EN/ZH `openclaw-daily-2026-04-22.md` description 为可检索摘要；2) 更新 EN/ZH `openclaw-daily-2026-04-23.md` description 为可检索摘要；3) 保持 3 条强相关 CTA 内链不回退；4) 本地检查与构建全部通过。
- [x] P1 Candidate A / EXP-090: 回补 2026-04-21 双语日报 ZH 通用 description（升级为可检索摘要，优先消费最近24小时内容建设新增实验假设），保持 CTA 强相关内链并完成 build 闭环 | ICE 9x8x8=576 — commit `(this commit)`
  - Hypothesis: 对最近24小时新发布且仍使用 ZH 通用摘要的双语日报页执行 description 可检索化回补，可提升主题检索匹配、摘要点击意图一致性与核心指南导流质量。
  - Metrics: `pnpm check:daily-template` 通过；`pnpm check:daily-heading-date` 通过；`pnpm check:daily-cta` 通过；`pnpm build` 通过；`/zh/blog/openclaw-daily-2026-04-21/` description 不再为通用文案且覆盖当日核心主题。
  - Acceptance: 1) 更新 ZH `openclaw-daily-2026-04-21.md` description 为可检索摘要；2) 保持 EN/ZH 页面 3 条强相关 CTA 内链不回退；3) 本地检查与构建全部通过。
- [x] P1 Candidate A / EXP-089: 回补 2026-04-21 双语日报 EN 通用 description（升级为可检索摘要，优先消费最近24小时内容建设新增实验假设），保持 CTA 强相关内链并完成 build 闭环 | ICE 9x8x8=576 — commit `(this commit)`
  - Hypothesis: 对最近24小时新发布且仍使用 EN 通用摘要的双语日报页执行 description 可检索化回补，可提升主题检索匹配、摘要点击意图一致性与核心指南导流质量。
  - Metrics: `pnpm check:daily-template` 通过；`pnpm check:daily-heading-date` 通过；`pnpm check:daily-cta` 通过；`pnpm build` 通过；`/en/blog/openclaw-daily-2026-04-21/` description 不再为通用文案且覆盖当日核心主题。
  - Acceptance: 1) 更新 EN `openclaw-daily-2026-04-21.md` description 为可检索摘要；2) 保持 EN/ZH 页面 3 条强相关 CTA 内链不回退；3) 本地检查与构建全部通过。
- [x] P1 Candidate A / EXP-088: 回补 2026-04-15 双语日报通用 description（升级为可检索摘要，优先消费最近24小时内容建设新增实验假设），保持 CTA 强相关内链并完成 build 闭环 | ICE 8x7x8=448 — commit `(this commit)`
  - Hypothesis: 对最近24小时新发布但仍使用通用摘要的双语日报页执行 description 可检索化回补，可提升主题检索匹配、摘要点击意图一致性与核心指南导流质量。
  - Metrics: `pnpm check:daily-template` 通过；`pnpm check:daily-heading-date` 通过；`pnpm check:daily-cta` 通过；`pnpm build` 通过；`/en|zh/blog/openclaw-daily-2026-04-15/` description 不再为通用文案且覆盖当日核心主题。
  - Acceptance: 1) 更新 EN/ZH `openclaw-daily-2026-04-15.md` description 为可检索摘要；2) 保持 3 条强相关 CTA 内链不回退；3) 本地检查与构建全部通过。
- [x] P1 Candidate A / EXP-087: 回补 2026-04-17 双语日报通用 description（升级为可检索摘要，优先消费最近24小时内容建设新增实验假设），保持 CTA 强相关内链并完成 build 闭环 | ICE 8x7x8=448 — commit `42866b9`
  - Hypothesis: 对最近24小时新发布但仍使用通用摘要的双语日报页执行 description 可检索化回补，可提升主题检索匹配、摘要点击意图一致性与核心指南导流质量。
  - Metrics: `pnpm check:daily-template` 通过；`pnpm check:daily-heading-date` 通过；`pnpm check:daily-cta` 通过；`pnpm build` 通过；`/en|zh/blog/openclaw-daily-2026-04-17/` description 不再为通用文案且覆盖当日核心主题。
  - Acceptance: 1) 更新 EN/ZH `openclaw-daily-2026-04-17.md` description 为可检索摘要；2) 保持 3 条强相关 CTA 内链不回退；3) 本地检查与构建全部通过。
- [x] P1 Candidate A / EXP-086: 回补 2026-04-16 双语日报通用 description（升级为可检索摘要，消费最近24小时内容建设延续假设），保持 CTA 强相关内链并完成质量闭环 | ICE 8x7x8=448 — commit `865e291`
  - Hypothesis: 对新发布但仍使用通用摘要的双语日报页进行 description 可检索化回补，可提升主题检索匹配与摘要点击意图一致性，并延续最近24小时内容建设“模板回归前置修复”收益。
  - Metrics: `pnpm check:daily-template` 通过；`pnpm check:daily-heading-date` 通过；`pnpm check:daily-cta` 通过；`pnpm build` 通过；`/en|zh/blog/openclaw-daily-2026-04-16/` description 不再为通用文案且覆盖当日核心主题。
  - Acceptance: 1) 更新 EN/ZH `openclaw-daily-2026-04-16.md` description 为可检索摘要；2) 保持 3 条强相关 CTA 内链不回退；3) 本地检查与构建全部通过。
- [x] P1 Candidate A / EXP-085: 回补 2026-04-05 EN 占位 description 与残留 CTA_VARIANT_B，并修正 ZH 正文抬头日期（2026-04-04→2026-04-05）以恢复模板与日期一致性，优先消费最近24小时内容建设延续假设 | ICE 8x7x8=448 — commit `fc68f95`
  - Hypothesis: 对仍残留占位 description/旧 CTA 变体且存在正文日期错位的双语日报页执行一次性回补，可提升搜索摘要可检索性、恢复 CTA 导流一致性，并避免日更模板回归抵消内容增长收益。
  - Metrics: `pnpm check:daily-template` 通过；`pnpm check:daily-heading-date` 通过；`pnpm check:daily-cta` 通过；`pnpm build` 通过；`/en|zh/blog/openclaw-daily-2026-04-05/` 不再含占位摘要/CTA_VARIANT 残留且正文日期与 `pubDate` 对齐。
  - Acceptance: 1) EN `openclaw-daily-2026-04-05.md` description 去占位化；2) 移除 EN 目标页 `CTA_VARIANT_B` 残留并保留 3 条强相关 CTA 内链；3) ZH 目标页正文抬头日期改为 `2026-04-05` 并与 `pubDate` 对齐；4) 本地检查与构建全部通过。
- [x] P1 Candidate A / EXP-084: 回补 2026-04-10 双语日报残留占位摘要与泛 CTA（description 去占位化 + 正文日期与 pubDate 对齐 + CTA 升级为强相关内链），消费最近24小时内容建设实验假设并完成二次验证闭环 | ICE 8x7x8=448 — commit `(this commit)`
  - Hypothesis: 对仍残留占位 description、正文日期错位与泛 CTA 的双语日报页进行二次回补，可恢复搜索摘要信号一致性并提升向核心指南页导流质量。
  - Metrics: `pnpm check:daily-template` 通过；`pnpm check:daily-heading-date` 通过；`pnpm build` 通过；`/en|zh/blog/openclaw-daily-2026-04-10/` description 去占位化、正文日期与 `pubDate` 对齐、CTA 为 3 条强相关内链。
  - Acceptance: 1) 更新 EN/ZH `openclaw-daily-2026-04-10.md` description；2) 修正正文日期为 2026-04-10；3) 移除 CTA_VARIANT_A/B 泛 CTA，替换为 3 条强相关内链；4) 本地检查与构建全部通过。
- [x] P1 Candidate A / EXP-083: 为双语日报新增“正文抬头日期与 frontmatter pubDate 一致性”闸门并接入 CI，修复近期日期错位页（2026-04-14 与 2026-03-08）以阻断发布日期回归风险 | ICE 9x7x8=504 — commit `8b209ba`
  - Hypothesis: 若在 `openclaw-daily-*.md` 增加“正文抬头日期=pubDate”自动校验并纳入 CI，可在发布前拦截日期错位，减少搜索摘要与页面时效信号冲突，提升索引与读者信任稳定性。
  - Metrics: `pnpm check:daily-heading-date` 通过；`pnpm build` 通过；CI 新增 Daily heading date consistency check；`2026-03-08` 与 `2026-04-14` EN/ZH 正文日期与 `pubDate` 全部对齐。
  - Acceptance: 1) 新增 `scripts/check-daily-heading-date-consistency.sh`；2) `package.json` 增加 `check:daily-heading-date`；3) `.github/workflows/content-check.yml` 接入该检查；4) 修复 EN/ZH `openclaw-daily-2026-03-08` 与 `openclaw-daily-2026-04-14` 正文日期；5) 本地 `pnpm check:daily-heading-date && pnpm build` 通过。
- [x] P1 Candidate A / EXP-082: 清理 `openclaw-daily-2026-03-11` 历史 duplicate id/source 冲突，增加专项完整性闸门并接入 CI，锁定路由与 RSS 唯一性 | ICE 8x6x5=240 — commit `32a721c`
  - Hypothesis: 若为 `openclaw-daily-2026-03-11` 增加“源文件唯一性 + 构建路由存在性 + RSS 唯一项”专项闸门并接入 CI，可提前阻断历史重复 source/slug 引发的索引卫生回归，避免内容收益被隐性冲突抵消。
  - Metrics: `pnpm check:daily-0311` 通过；`pnpm build` 通过；CI 新增 Daily 2026-03-11 duplicate/source integrity check；EN/ZH route 与 RSS 各存在且唯一。
  - Acceptance: 1) 新增 `scripts/check-daily-0311-integrity.sh`；2) `package.json` 增加 `check:daily-0311`；3) `.github/workflows/content-check.yml` 接入该检查；4) 本地 `pnpm check:daily-0311 && pnpm build` 通过。
- [x] P2 Candidate C / EXP-081: 强化 2026-03-08 双语 AI/Tech Daily 的搜索摘要与转化内链（description 去占位化 + CTA 升级） | ICE 7x7x8=392 — commit `0646272`
  - Hypothesis: 对仍保留占位摘要与泛 CTA 的 `2026-03-08` 双语日报页补强可检索摘要、行业动态/问题洞察/可执行建议与强相关 CTA 内链，可提升“AI 芯片出口管制、GitHub 替代、Gemini 端侧助手、MWC AI 出海、中国 AI 应用落地”主题检索覆盖，并向 OpenClaw 核心指南页导流。
  - Metrics: `pnpm check:daily-cta` 通过；`pnpm build` 通过；EN/ZH 目标页均含具体 description、行业洞察与 3 条强相关内链；`CONTENT_SCORECARD.md` 评分 >=20/30。
  - Acceptance: 1) `/en/blog/openclaw-daily-2026-03-08/` 与 `/zh/blog/openclaw-daily-2026-03-08/` frontmatter description 去占位化；2) 删除咨询/订阅泛 CTA，替换为 3 条强相关内链；3) 将结论段改为行业动态/问题洞察/可执行建议；4) `CONTENT_SCORECARD.md` 评分 >=20/30；5) `pnpm build` 与 `pnpm check:daily-cta` 通过。
- [x] P2 Candidate B / EXP-080: 强化 2026-03-11 双语 AI/Tech Daily 的搜索摘要、结论洞察与转化内链（description 去占位化 + 补全“模型升级/记忆能力/算力合作/微软生态绑定/中国 Agent 评测转向”主题结论 + CTA 升级为强相关内链） | ICE 7x8x8=448 — commit `769dfdc`
  - Hypothesis: 对仍保留占位摘要与泛 CTA 的 `2026-03-11` 双语日报页补强可检索摘要、行业洞察与强相关 CTA 内链，可提升搜索匹配度、模型升级/长期记忆/算力合作/微软生态绑定/中国 Agent 评测转向等主题检索覆盖，并向 OpenClaw 核心指南页导流。
  - Metrics: `pnpm check:daily-cta` 通过；`pnpm build` 通过；EN/ZH 目标页均含具体 description、行业洞察与 3 条强相关内链；`CONTENT_SCORECARD.md` 评分 >=20/30。
  - Acceptance: 1) `/en/blog/openclaw-daily-2026-03-11/` 与 `/zh/blog/openclaw-daily-2026-03-11/` frontmatter description 去占位化；2) 删除咨询/订阅泛 CTA，替换为 3 条强相关内链；3) 将结论段改为行业动态/问题洞察/可执行建议；4) `CONTENT_SCORECARD.md` 评分 >=20/30；5) `pnpm build` 与 `pnpm check:daily-cta` 通过。
- [x] P1 Candidate A / EXP-079: 强化 2026-03-13 双语 AI/Tech Daily 的搜索摘要与转化内链（description 去占位化 + 补全“基础设施/媒体生产/Agent 平台/机器人融资/微信入口”主题结论 + CTA 升级为强相关内链） | ICE 8x8x8=512 — commit `64462a3`
  - Hypothesis: 对仍保留占位摘要与泛 CTA 的 `2026-03-13` 双语日报页补强可检索摘要、行业洞察与强相关 CTA 内链，可提升搜索匹配度、基础设施/媒体生产/Agent 平台/机器人融资/微信入口等主题检索覆盖，并向 OpenClaw 核心指南页导流。
  - Metrics: `pnpm check:daily-cta` 通过；`pnpm build` 通过；EN/ZH 目标页均含具体 description、行业洞察与 3 条强相关内链；`CONTENT_SCORECARD.md` 评分 >=20/30。
  - Acceptance: 1) `/en/blog/openclaw-daily-2026-03-13/` 与 `/zh/blog/openclaw-daily-2026-03-13/` frontmatter description 去占位化；2) 删除咨询/订阅泛 CTA，替换为 3 条强相关内链；3) 将结论段改为行业动态/问题洞察/可执行建议；4) `CONTENT_SCORECARD.md` 评分 >=20/30；5) `pnpm build` 与 `pnpm check:daily-cta` 通过。
- [x] P2 Candidate C / EXP-077: 强化 2026-03-16 双语 AI/Tech Daily 的搜索摘要与转化内链（重写 EN/ZH description，并把 CTA 升级为指向 What Is OpenClaw / VPS guide / model fallback 的强相关内链），补齐“Meta 裁员传闻 + Gemini 深入 Workspace + 英伟达开源模型投入 + 具身智能融资 + OpenAI 诉讼风险”主题页的可检索摘要与行动路径 | ICE 7x8x8=448 — commit `4ce3ac3`
  - Hypothesis: 对仍保留占位摘要与泛 CTA 的 `2026-03-16` 双语日报页补强可检索摘要与强相关 CTA 内链，可提升搜索匹配度、组织效率/办公 AI/开源模型/具身智能/AI 法律风险等主题检索覆盖，并向 OpenClaw 核心指南页导流。
  - Metrics: `pnpm check:daily-cta` 通过；`pnpm build` 通过；EN/ZH 目标页均含具体 description 且 CTA 替换为 3 条强相关内链。
  - Acceptance: 1) `/en/blog/openclaw-daily-2026-03-16/` 与 `/zh/blog/openclaw-daily-2026-03-16/` frontmatter description 去占位化；2) 删除正文中的交付式尾句；3) CTA 替换为 OpenClaw 核心指南/部署/模型回退相关内链；4) `CONTENT_SCORECARD.md` 评分 >=20/30；5) `pnpm build` 与 `pnpm check:daily-cta` 通过。
- [x] P2 Candidate B / EXP-076: 强化 2026-03-15 双语 AI/Tech Daily 的搜索摘要与转化内链（重写 EN/ZH description，并把 CTA 升级为指向 What Is OpenClaw / VPS guide / model fallback 的强相关内链），补齐“Meta AI 成本驱动组织收缩 + Gemini 深入 Workspace + 英伟达开源模型 + 具身智能融资 + OpenAI 法律风险”主题页的可检索摘要与行动路径 | ICE 7x8x8=448 — commit `347620b`
  - Hypothesis: 对仍保留占位摘要与泛 CTA 的 `2026-03-15` 双语日报页补强可检索摘要与强相关 CTA 内链，可提升搜索匹配度、组织效率/办公 AI/开源模型/具身智能/AI 法律风险等主题检索覆盖，并向 OpenClaw 核心指南页导流。
  - Metrics: `pnpm check:daily-cta` 通过；`pnpm build` 通过；EN/ZH 目标页均含具体 description 且 CTA 替换为 3 条强相关内链。
  - Acceptance: 1) `/en/blog/openclaw-daily-2026-03-15/` 与 `/zh/blog/openclaw-daily-2026-03-15/` frontmatter description 去占位化；2) 删除正文中的对话式尾句；3) CTA 替换为 OpenClaw 核心指南/部署/模型回退相关内链；4) `pnpm build` 与 `pnpm check:daily-cta` 通过。
- [x] P1 Candidate A / EXP-078: 强化 2026-03-14 双语 AI/Tech Daily 的搜索摘要与转化内链（重写 EN/ZH description，并把 CTA 升级为指向 What Is OpenClaw / VPS guide / model fallback 的强相关内链），补齐“GTC 2026 会前预热 + 阿里云百炼模型更新 + 中国拟人化互动服务监管 + 百度文心 5.0 + ChatGPT 版本更替”主题页的可检索摘要与行动路径 | ICE 8x8x8=512 — commit `ccdb6f3`
  - Hypothesis: 对仍保留占位摘要与泛 CTA 的 `2026-03-14` 双语日报页补强可检索摘要与强相关 CTA 内链，可提升搜索匹配度、GTC/模型平台/合规主题检索覆盖与向 OpenClaw 核心指南页导流效率。
  - Metrics: `pnpm check:daily-cta` 通过；`pnpm build` 通过；EN/ZH 目标页均含具体 description 且 CTA 替换为 3 条强相关内链。
  - Acceptance: 1) `/en/blog/openclaw-daily-2026-03-14/` 与 `/zh/blog/openclaw-daily-2026-03-14/` frontmatter description 去占位化；2) 删除正文中的对话式尾句；3) CTA 替换为 OpenClaw 核心指南/部署/模型回退相关内链；4) `pnpm build` 与 `pnpm check:daily-cta` 通过。

- [x] P1 Candidate A / EXP-074: 强化 2026-03-20 双语 AI/Tech Daily 的搜索摘要与转化内链（重写 EN/ZH description，并把 CTA 升级为指向 What Is OpenClaw / VPS guide / model fallback 的强相关内链），补齐“AI 基础设施全面升级 + 桌面入口竞争 + 企业收入与算力涨价”主题页的可检索摘要与行动路径 | ICE 8x7x8=448 — commit `bce980c`
  - Hypothesis: 对仍保留占位摘要与泛 CTA 的 `2026-03-20` 双语日报页补强可检索摘要与强相关 CTA 内链，可提升搜索匹配度、站内继续阅读率与向核心指南页导流效率。
  - Metrics: `pnpm check:daily-cta` 通过；`pnpm build` 通过；EN/ZH 目标页均含具体 description 与 3 条强相关内链。
  - Acceptance: 1) `/en/blog/openclaw-daily-2026-03-20/` 与 `/zh/blog/openclaw-daily-2026-03-20/` frontmatter description 去占位化；2) CTA 替换为 OpenClaw 核心指南/部署/模型回退相关内链；3) `pnpm build` 与 `pnpm check:daily-cta` 通过。

- [x] P1 Candidate A / EXP-075: 强化 2026-03-24 双语 AI/Tech Daily 的搜索摘要与转化内链（重写 EN/ZH description，并把 CTA 升级为指向 What Is OpenClaw / VPS guide / model fallback 的强相关内链），补齐“GTC 基建升级 + Meta 新闻授权 + 中国开源 AI 压力 + Gemini 营销平台化 + RISC-V 芯片信号”主题页的可检索摘要与行动路径 | ICE 8x8x8=512 — commit `44a0972`
  - Hypothesis: 对仍保留占位摘要与泛 CTA 的 `2026-03-24` 双语日报页补强可检索摘要与强相关 CTA 内链，可提升搜索匹配度、主题检索覆盖与站内导流效率。
  - Metrics: `pnpm check:daily-cta` 通过；`pnpm build` 通过；EN/ZH 目标页均含具体 description 与 3 条强相关内链。
  - Acceptance: 1) `/en/blog/openclaw-daily-2026-03-24/` 与 `/zh/blog/openclaw-daily-2026-03-24/` frontmatter description 去占位化；2) CTA 替换为 OpenClaw 核心指南/部署/模型回退相关内链；3) `pnpm build` 与 `pnpm check:daily-cta` 通过。

- [x] P2 Candidate B / EXP-073: 强化 2026-03-27 双语 AI/Tech Daily 的搜索摘要与转化内链（重写 EN/ZH description，并把 CTA 升级为强相关内链），补齐“中国 Token 调用量放量 + 网页 Agent 开源化”主题页的可检索摘要与行动路径 | ICE 8x7x7=392 — commit `e804557`
  - Hypothesis: 对仍保留占位摘要与泛 CTA 的 `2026-03-27` 双语日报页补强可检索摘要与强相关 CTA 内链，可提升搜索匹配度、主题检索覆盖与站内导流效率。
  - Metrics: `pnpm check:daily-cta` 通过；`pnpm build` 通过；EN/ZH 目标页均含具体 description 与 3 条强相关内链。
  - Acceptance: 1) `/en/blog/openclaw-daily-2026-03-27/` 与 `/zh/blog/openclaw-daily-2026-03-27/` frontmatter description 去占位化；2) CTA 替换为 OpenClaw 核心指南/部署/模型回退相关内链；3) `pnpm build` 与 `pnpm check:daily-cta` 通过。

- [x] P1 Candidate A / EXP-072: 强化 2026-03-28 双语 AI/Tech Daily 的搜索摘要与转化内链（重写 EN/ZH description，并把 CTA 升级为指向 What Is OpenClaw / VPS guide / model fallback 的强相关内链），补齐“Agent 平台化竞争 + 合规交付”主题页的可检索摘要与行动路径 | ICE 8x8x8=512 — commit `68c3097`
  - Hypothesis: 对仍保留占位摘要与泛 CTA 的 `2026-03-28` 双语日报页补强可检索摘要与强相关 CTA 内链，可提升搜索匹配度、站内继续阅读率与向核心指南页导流效率。
  - Metrics: `pnpm check:daily-cta` 通过；`pnpm build` 通过；EN/ZH 目标页均含具体 description 与 3 条强相关内链。
  - Acceptance: 1) `/en/blog/openclaw-daily-2026-03-28/` 与 `/zh/blog/openclaw-daily-2026-03-28/` frontmatter description 去占位化；2) CTA 替换为 OpenClaw 核心指南/部署/模型回退相关内链；3) `pnpm build` 与 `pnpm check:daily-cta` 通过。

- [x] P1 Candidate A / EXP-071: 强化 2026-03-18 双语 AI/Tech Daily 的搜索摘要与转化内链（重写 EN/ZH description，并把 CTA 升级为指向 What Is OpenClaw / VPS guide / model fallback 的强相关内链），补齐“推理需求成为新增量”主题页的可检索摘要与行动路径 | ICE 8x8x8=512 — commit `14402af`
  - Hypothesis: 对仍保留占位摘要与泛 CTA 的 `2026-03-18` 双语日报页补强可检索摘要与强相关 CTA 内链，可提升搜索匹配度、站内继续阅读率与向核心指南页导流效率。
  - Metrics: `pnpm build` 通过；`pnpm check:daily-cta` 通过；EN/ZH 目标页均含具体 description 与 3 条强相关内链。
  - Acceptance: 1) `/en/blog/openclaw-daily-2026-03-18/` 与 `/zh/blog/openclaw-daily-2026-03-18/` frontmatter description 去占位化；2) CTA 替换为 OpenClaw 核心指南/部署/模型回退相关内链；3) `pnpm build` 与 `pnpm check:daily-cta` 通过。

- [x] P2 Candidate B / EXP-070: 为双语日报增加“占位 description / 泛 CTA 残留扫描”脚本并接入 CI，阻断旧模板内容回归 | ICE 8x8x7=448 — commit `2c874e2`
  - Hypothesis: 若在内容检查中自动扫描旧式占位 description 与 CTA 变体残留，可更早阻断历史模板回潮，减少人工抽检成本。
  - Metrics: 新检查脚本可在本地发现占位文案残留；`pnpm build` 与新增检查通过。
  - Acceptance: 1) 新增扫描脚本；2) package.json/CI 接入；3) 本地检查与 build 通过。

- [x] P1 Candidate A / EXP-069: 强化 2026-03-29 双语 AI/Tech Daily 的搜索摘要与转化内链（重写 EN/ZH description，并把 CTA 升级为指向 What Is OpenClaw / VPS guide / model fallback 的强相关内链），补齐“AI 商业兑现期”主题页的可检索摘要与行动路径 | ICE 8x8x8=512 — commit `46d5d59`
  - Hypothesis: 对仍保留占位摘要与泛 CTA 的 `2026-04-11` 双语日报页补强可检索摘要与强相关 CTA 内链，可提升搜索匹配度、站内继续阅读率与向 OpenClaw 核心指南页导流效率。
  - Metrics: `pnpm build` 通过；`pnpm check:daily-cta` 通过；EN/ZH 目标页均含具体 description 与 3 条强相关内链。
  - Acceptance: 1) `/en/blog/openclaw-daily-2026-04-11/` 与 `/zh/blog/openclaw-daily-2026-04-11/` frontmatter description 去占位化；2) CTA 替换为 OpenClaw 核心指南/部署/模型回退相关内链；3) `pnpm build` 与 `pnpm check:daily-cta` 通过。

- [x] P1 Candidate A / EXP-067: 增加 robots/sitemap 完整性闸门（校验 `robots.txt` 同时声明 `sitemap-index.xml` 与兼容 `sitemap.xml`、禁止非 https/旧域名泄漏），并接入 content-check CI，降低抓取入口回归风险 | ICE 8x8x7=448 — commit `(this commit)`
  - Hypothesis: 若在构建产物层对 `robots.txt`、`sitemap.xml`、`sitemap-index.xml` 做一致性校验，并把检查接入 CI，则可在上线前阻断 robots/sitemap 入口漂移、旧域名泄漏与兼容性回归，减少抓取失败和索引延迟风险。
  - Metrics: `pnpm build` 通过；`pnpm check:robots-sitemap` 通过；CI 新增 robots/sitemap integrity check；`public/robots.txt` 同时声明 `sitemap-index.xml` 与 `sitemap.xml`。
  - Acceptance: 1) 新增 robots/sitemap 校验脚本；2) package.json 与 content-check workflow 接入；3) `public/robots.txt` 同时声明两个 sitemap 入口；4) `pnpm build` 与 `pnpm check:robots-sitemap` 通过。

- [x] P1 Candidate A / EXP-066: 将最近24小时内容建设实验沉淀为 `publish-daily.sh` 默认模板规则（自动生成可检索摘要 + 强相关 CTA 内链），阻断占位 description/泛 CTA 回归 | ICE 9x8x8=576 — commit `(this commit)`
  - Hypothesis: 若把 EXP-058~EXP-065 连续验证有效的“description 去占位化 + 3 条强相关内链 CTA”固化到日报发布脚本，则后续双语日报可默认具备搜索摘要质量与导流能力，减少人工返工并提高执行一致性。
  - Metrics: `pnpm build` 通过；`scripts/publish-daily.sh` 不再写入占位 description 与咨询/订阅泛 CTA；脚本输出默认包含 OpenClaw 核心指南/部署/模型回退 3 条强相关内链。
  - Acceptance: 1) `publish-daily.sh` 生成 EN/ZH description 时不使用占位文案；2) CTA 模板默认替换为 3 条强相关内链；3) `pnpm build` 通过。

- [x] P1 Candidate A / EXP-060: 强化 2026-04-10 双语 AI/Tech Daily 的搜索摘要与转化内链（重写 EN/ZH description，修正正文日期，并把 CTA 升级为指向 What Is OpenClaw / VPS guide / model fallback 的强相关内链），优先消费最近24小时内容建设任务新增实验假设 | ICE 8x7x8=448 — commit `(this commit)`
  - Hypothesis: 对最近24小时新发布但仍保留占位摘要/泛 CTA、且存在日期元信息错位的日报页，补强可检索摘要、日期一致性与强相关 CTA 内链，可同时提升搜索匹配度、站内继续阅读率与导流准确性。
  - Metrics: `pnpm build` 通过；EN/ZH 目标页均含具体 description 与 3 条强相关内链；正文日期与 `pubDate` 一致；后续观察日报页 CTR、站内下一跳与相关指南页导流点击。
  - Acceptance: 1) `/en/blog/openclaw-daily-2026-04-10/` 与 `/zh/blog/openclaw-daily-2026-04-10/` frontmatter description 去占位化；2) 正文日期修正为 2026-04-10 并与 frontmatter 对齐；3) CTA 替换为 OpenClaw 核心指南/部署/模型回退相关内链；4) `pnpm build` 通过。

- [x] P1 Candidate A / EXP-059: 强化 2026-04-06 双语 AI/Tech Daily 的搜索摘要与转化内链（重写 EN/ZH description，并把 CTA 升级为指向 What Is OpenClaw / VPS guide / model fallback 的强相关内链），优先消费最近24小时内容建设任务新增实验假设 | ICE 8x7x8=448 — commit `(this commit)`
  - Hypothesis: 对最新发布但仍保留占位摘要/泛 CTA 的日报页，补强可检索摘要与强相关 CTA 内链，可提升日报页搜索匹配度、站内继续阅读率，以及向 OpenClaw 核心指南的导流效率。
  - Metrics: `pnpm build` 通过；EN/ZH 目标页均含具体 description 与 3 条强相关内链；后续观察日报页 CTR、站内下一跳与相关指南页导流点击。
  - Acceptance: 1) `/en/blog/openclaw-daily-2026-04-06/` 与 `/zh/blog/openclaw-daily-2026-04-06/` frontmatter description 去占位化；2) CTA 替换为 OpenClaw 核心指南/部署/模型回退相关内链；3) `pnpm build` 通过。

- [x] P1 Candidate A / EXP-058: 强化 2026-04-04 双语 AI/Tech Daily 的搜索摘要与转化内链（重写 EN/ZH description，并把 CTA 升级为指向 What Is OpenClaw / VPS guide / model fallback 的强相关内链），消费最近24小时内容建设任务新增的实验假设 | ICE 8x7x8=448 — commit `e6469fb`
  - Hypothesis: 对最近24小时新发布但仍保留占位摘要/泛 CTA 的日报页，补强可检索摘要与强相关 CTA 内链，可提升日报页搜索匹配度、站内继续阅读率，以及向 OpenClaw 核心指南的导流效率。
  - Metrics: `pnpm build` 通过；EN/ZH 目标页均含具体 description 与 3 条强相关内链；后续观察日报页 CTR、站内下一跳与相关指南页导流点击。
  - Acceptance: 1) `/en/blog/openclaw-daily-2026-04-04/` 与 `/zh/blog/openclaw-daily-2026-04-04/` frontmatter description 去占位化；2) CTA 替换为 OpenClaw 核心指南/部署/模型回退相关内链；3) `pnpm build` 通过。

## Done
- [x] P1 Candidate A / EXP-102: 将 2026-04-29 英文日报正文从中英混排回补为完整英文版本（含 Top 5、2个案例、结论与次日跟踪）并保持强相关 CTA，完成四闸门+build+推送闭环，优先消费最近24小时内容建设延续假设 | ICE 9x8x8=576 — commit `6ba6301`
  - Hypothesis: 最近24小时新增日报若英文页仍保留中文框架或混排，会削弱英文检索匹配与可读性；当日回补为完整英文叙事可提升索引窗口期覆盖与首日导流质量。
  - Metrics: `pnpm check:daily-template` 通过；`pnpm check:daily-heading-date` 通过；`pnpm check:daily-cta` 通过；`pnpm check:daily-fresh-completeness` 通过；`pnpm build` 通过；`/en/blog/openclaw-daily-2026-04-29/` 标题与正文结构为完整英文且 CTA 保持 3 条强相关内链。
  - Acceptance: 1) EN `openclaw-daily-2026-04-29.md` 标题、正文结构与分段文案统一为英文；2) 保留既有核心事实与“2案例+结论+明日跟踪点”；3) CTA 维持 3 条强相关内链不回退；4) 本地四闸门 + build 全部通过。
- [x] P1 Candidate A / EXP-092: 修复 2026-04-23 双语日报正文截断（补全实战案例2 + 今日结论），保持可检索摘要与强相关 CTA，完成 build 闭环 | ICE 9x8x8=576 — commit `(this commit)`
  - Hypothesis: 对最近24小时新增日报中出现正文截断（“全能 …”）的双语页面做当日补全，可恢复页面信息完整度与可读性，避免摘要/正文语义断裂对检索匹配与导流转化造成损失。
  - Metrics: `pnpm check:daily-template` 通过；`pnpm check:daily-heading-date` 通过；`pnpm check:daily-cta` 通过；`pnpm build` 通过；`/en|zh/blog/openclaw-daily-2026-04-23/` 不再存在截断句，且补全“实战案例2+今日结论+跟踪点”。
  - Acceptance: 1) 补全 EN/ZH `openclaw-daily-2026-04-23.md` 截断正文；2) 保持既有 description 与 3 条强相关 CTA 不回退；3) 本地检查与构建全部通过。
- [x] P1 Candidate A / EXP-057: 强化 2026-04-01 双语 AI/Tech Daily 的搜索摘要与转化内链（重写 EN/ZH description，并把 CTA 升级为指向 What Is OpenClaw / VPS guide / model fallback 的强相关内链），消费最近24小时内容建设任务新增的实验假设 | ICE 8x7x8=448 — commit `79140a4`
  - Hypothesis: 对最近24小时新发布但仍保留占位摘要/泛 CTA 的日报页，补强可检索摘要与强相关 CTA 内链，可提升日报页搜索匹配度、站内继续阅读率，以及向 OpenClaw 核心指南的导流效率。
  - Metrics: `pnpm build` 通过；EN/ZH 目标页均含具体 description 与 3 条强相关内链；后续观察日报页 CTR、站内下一跳与相关指南页导流点击。
  - Acceptance: 1) `/en/blog/openclaw-daily-2026-04-01/` 与 `/zh/blog/openclaw-daily-2026-04-01/` frontmatter description 去占位化；2) CTA 替换为 OpenClaw 核心指南/部署/模型回退相关内链；3) `pnpm build` 通过。

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
