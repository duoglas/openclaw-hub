# GROWTH_QUEUE.md

Last updated: 2026-04-15 17:24
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
