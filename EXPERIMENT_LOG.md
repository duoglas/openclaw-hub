# EXPERIMENT_LOG.md

## Experiment Template
- ID:
- Hypothesis:
- Scope (pages/queries):
- Change:
- Start date:
- End date:
- Success metric:
- Result:
- Decision (scale / iterate / stop):

---

## Active Experiments

### EXP-085
- Hypothesis: 对仍残留占位 description、旧 CTA 变体残留且正文日期错位的 `2026-04-05` 双语日报页执行一次性回补，可提升搜索摘要可检索性、恢复 CTA 导流一致性，并避免日更模板回归抵消内容增长收益。
- Scope: `/en/blog/openclaw-daily-2026-04-05/` + `/zh/blog/openclaw-daily-2026-04-05/`
- Change: 将 EN `openclaw-daily-2026-04-05` frontmatter description 从占位文案升级为覆盖“普惠算力、H100 租赁价格、北京生成式 AI 备案、晶圆厂设备投入、生成式 AI 安全风险”的可检索摘要；移除 EN 页面尾部残留 `CTA_VARIANT_B` 与订阅泛 CTA，统一保留 3 条强相关内链 CTA；将 ZH 正文抬头日期从 `2026年4月4日` 修正为 `《AI、科技日报》｜2026-04-05（周日）`，确保与 `pubDate` 对齐。
- Start date: 2026-04-15
- End date: 2026-04-15
- Success metric: `pnpm check:daily-template` 通过；`pnpm check:daily-heading-date` 通过；`pnpm check:daily-cta` 通过；`pnpm build` 通过；EN/ZH 目标页无占位摘要/CTA_VARIANT 残留且正文日期一致。
- Result: pass（`src/content/blog/en|zh/openclaw-daily-2026-04-05.md` 已完成 description 去占位化、CTA 变体残留清理与正文日期修正；本地 `pnpm check:daily-template`、`pnpm check:daily-heading-date`、`pnpm check:daily-cta` 与 `pnpm build` 全部通过。）
- Decision (scale / iterate / stop): iterate（继续优先消费最近24小时内容建设任务相关假设，沿用 daily-template + heading-date + daily-cta 三闸门追踪后续新增日报，阻断占位摘要/CTA 残留回归。）

### EXP-084
- Hypothesis: 对仍残留占位 description、正文日期错位与泛 CTA 的 `2026-04-10` 双语日报页进行二次回补，可恢复搜索摘要信号一致性并提升向核心指南页导流质量。
- Scope: `/en/blog/openclaw-daily-2026-04-10/` + `/zh/blog/openclaw-daily-2026-04-10/`
- Change: 将 EN `openclaw-daily-2026-04-10` description 从占位文案升级为覆盖 OpenAI-Microsoft 条款重谈、Gemini 融合、行业落地、算力供给与监管版权压力的可检索摘要；将 ZH description 升级为对应中文可检索摘要；将 EN/ZH 正文日期从 `2026-04-06` 修正为 `2026-04-10` 并与 `pubDate` 对齐；移除 CTA_VARIANT A/B 泛 CTA，统一替换为指向 `what-is-openclaw`、`openclaw-vps-deployment-complete-guide`、`openclaw-model-fallback-strategy` 的 3 条强相关内链。
- Start date: 2026-04-15
- End date: 2026-04-15
- Success metric: `pnpm check:daily-template` 通过；`pnpm check:daily-heading-date` 通过；`pnpm build` 通过；EN/ZH 目标页 description 去占位化、正文日期与 `pubDate` 对齐、CTA 为 3 条强相关内链。
- Result: pass（`src/content/blog/en|zh/openclaw-daily-2026-04-10.md` 已完成 description 去占位化、正文日期修正与 CTA 强相关内链替换；本地 `pnpm check:daily-template`、`pnpm check:daily-heading-date` 与 `pnpm build` 全部通过。）
- Decision (scale / iterate / stop): iterate（继续优先消费最近24小时内容建设任务产生的日报假设；下一步优先回补 `2026-04-05` EN 残留占位 description，并维持 daily-template + heading-date 双闸门防回归。）

### EXP-083
- Hypothesis: 若在 `openclaw-daily-*.md` 增加“正文抬头日期=pubDate”自动校验并纳入 CI，可在发布前拦截日期错位，减少搜索摘要与页面时效信号冲突，提升索引与读者信任稳定性。
- Scope: `scripts/check-daily-heading-date-consistency.sh`、`package.json`、`.github/workflows/content-check.yml`、`/en|zh/blog/openclaw-daily-2026-03-08/`、`/en|zh/blog/openclaw-daily-2026-04-14/`
- Change: 新增 `check-daily-heading-date-consistency.sh`，逐文件校验 `openclaw-daily-*.md` 的正文抬头 `《AI、科技日报》｜YYYY-MM-DD` 是否与 frontmatter `pubDate` 一致；将检查接入 `pnpm check:daily-heading-date` 与 content-check CI；同步修复 EN/ZH `openclaw-daily-2026-03-08`（03-07→03-08）与 `openclaw-daily-2026-04-14`（04-12→04-14）正文日期错位。
- Start date: 2026-04-14
- End date: 2026-04-14
- Success metric: `pnpm check:daily-heading-date` 通过；`pnpm build` 通过；CI 出现 Daily heading date consistency check；目标四个页面正文日期与 `pubDate` 对齐。
- Result: pass（新增 `scripts/check-daily-heading-date-consistency.sh` 并接入 `package.json` 与 `.github/workflows/content-check.yml`；本地 `pnpm check:daily-heading-date` 与 `pnpm build` 均通过；`2026-03-08`、`2026-04-14` EN/ZH 正文日期已与 `pubDate` 对齐；commit `8b209ba` 已推送至 `origin/growth-sync-queue`。）
- Decision (scale / iterate / stop): scale（保留为默认内容卫生闸门；后续可扩展为“正文星期与日期一致性”校验，进一步减少模板回归。）

### EXP-082
- Hypothesis: 若为 `openclaw-daily-2026-03-11` 增加“源文件唯一性 + 构建路由存在性 + RSS 唯一项”专项闸门并接入 CI，可提前阻断历史重复 source/slug 引发的索引卫生回归，避免内容收益被隐性冲突抵消。
- Scope: `scripts/check-daily-0311-integrity.sh`、`package.json`、`.github/workflows/content-check.yml`
- Change: 新增 `check-daily-0311-integrity.sh`，校验 EN/ZH 仅存在 `openclaw-daily-2026-03-11.md` 两个源文件、无同日命名冲突、`dist/en|zh/blog/openclaw-daily-2026-03-11/index.html` 路由存在、`dist/en|zh/daily/rss.xml` 各仅包含一条目标链接；并将检查接入 `pnpm check:daily-0311` 与 content-check CI。
- Start date: 2026-04-14
- End date: 2026-04-14
- Success metric: `pnpm check:daily-0311` 通过；`pnpm build` 通过；CI 出现 Daily 2026-03-11 duplicate/source integrity check。
- Result: pass（已新增 `scripts/check-daily-0311-integrity.sh` 并接入 `package.json` 与 `.github/workflows/content-check.yml`；本地 `pnpm check:daily-0311 && pnpm build` 通过，验证 EN/ZH 路由与 RSS 目标项均唯一存在。）
- Decision (scale / iterate / stop): iterate（将同类“历史高风险日报 slug”纳入按需专项闸门清单；下一步可泛化为参数化脚本，按日期批量验证 source/route/rss 唯一性。）

### EXP-081
- Hypothesis: 对仍保留占位摘要与泛 CTA 的 `2026-03-08` 双语日报页补强可检索摘要、行业动态/问题洞察/可执行建议与强相关 CTA 内链，可提升“AI 芯片出口管制、GitHub 替代、Gemini 端侧助手、MWC AI 出海、中国 AI 应用落地”主题检索覆盖，并向 OpenClaw 核心指南页导流。
- Scope: `/en/blog/openclaw-daily-2026-03-08/` + `/zh/blog/openclaw-daily-2026-03-08/`
- Change: 将 EN/ZH `openclaw-daily-2026-03-08` 的 frontmatter description 从同步占位文案升级为覆盖“美国 AI 芯片出口审批可能全球化、OpenAI 传闻中的 GitHub 替代产品、Google Pixel Drop 推进 Gemini 端侧助手、中国厂商借 MWC 推进 AI 出海、国内竞争从模型发布转向 ROI 落地”的可检索摘要；补全“今日结论”为行业动态/问题洞察/可执行建议，并将 CTA 从咨询/订阅泛文案替换为指向 `what-is-openclaw`、`openclaw-vps-deployment-complete-guide`、`openclaw-model-fallback-strategy` 的 3 条强相关内链。
- Start date: 2026-04-13
- End date: 2026-04-13
- Success metric: `pnpm check:daily-cta` 通过；`pnpm build` 通过；EN/ZH 目标页均含具体 description、行业洞察与 3 条强相关内链；`CONTENT_SCORECARD.md` 评分 >=20/30。
- Result: pass（`src/content/blog/en|zh/openclaw-daily-2026-03-08.md` 已完成 description 去占位化、结论段补全与 CTA 强相关内链替换；`CONTENT_SCORECARD.md` 评分 28/30，达到发布阈值；本地 `pnpm check:daily-cta` 与 `pnpm build` 均通过。）
- Decision (scale / iterate / stop): iterate（继续处理 `EXP-082`，清理 `openclaw-daily-2026-03-11` duplicate id/source 历史冲突，避免内容收益被索引卫生问题抵消。）

### EXP-080
- Hypothesis: 对仍保留占位摘要与泛 CTA 的 `2026-03-11` 双语日报页补强可检索摘要、行业洞察与强相关 CTA 内链，可提升搜索匹配度、模型升级/长期记忆/算力合作/微软生态绑定/中国 Agent 评测转向等主题检索覆盖，并向 OpenClaw 核心指南页导流。
- Scope: `/en/blog/openclaw-daily-2026-03-11/` + `/zh/blog/openclaw-daily-2026-03-11/`
- Change: 将 EN/ZH `openclaw-daily-2026-03-11` 的 frontmatter description 从同步占位文案升级为覆盖“GPT-5.4 模型替换、Claude 记忆导入、OpenAI 与 AMD/NVIDIA 算力合作、微软与 OpenAI 生态绑定、中国 AI 讨论转向 Agent 工作流与真实 ROI”的可检索摘要；补全“今日结论”为行业动态/问题洞察/可执行建议，并将 CTA 从咨询/订阅泛文案替换为指向 `what-is-openclaw`、`openclaw-vps-deployment-complete-guide`、`openclaw-model-fallback-strategy` 的 3 条强相关内链。
- Start date: 2026-04-13
- End date: 2026-04-13
- Success metric: `pnpm check:daily-cta` 通过；`pnpm build` 通过；EN/ZH 目标页均含具体 description、行业洞察与 3 条强相关内链；`CONTENT_SCORECARD.md` 评分 >=20/30。
- Result: pass（`src/content/blog/en|zh/openclaw-daily-2026-03-11.md` 已完成 description 去占位化、结论段补全与 CTA 强相关内链替换；`CONTENT_SCORECARD.md` 评分 28/30，达到发布阈值；本地 `pnpm check:daily-cta` 与 `pnpm build` 均通过。补充观察：build 仍报告 `openclaw-daily-2026-03-11` duplicate id warning，说明仓内存在历史重复 slug/loader 冲突，需后续专项清理，但不影响本次页面改造验收。）
- Decision (scale / iterate / stop): iterate（继续回补 `2026-03-08` 等仍保留旧模板的日报页，并优先单列一次技术卫生任务处理 `2026-03-11` duplicate id warning，避免历史索引冲突抵消内容收益。）

### EXP-079
- Hypothesis: 对仍保留占位摘要与泛 CTA 的 `2026-03-13` 双语日报页补强可检索摘要、行业洞察与强相关 CTA 内链，可提升搜索匹配度、基础设施/媒体生产/Agent 平台/机器人融资/微信入口等主题检索覆盖，并向 OpenClaw 核心指南页导流。
- Scope: `/en/blog/openclaw-daily-2026-03-13/` + `/zh/blog/openclaw-daily-2026-03-13/`
- Change: 将 EN/ZH `openclaw-daily-2026-03-13` 的 frontmatter description 从同步占位文案升级为覆盖“英伟达拟向 Nebius 投资 20 亿美元扩 AI 云、Canal+ 联合 Google Cloud/OpenAI 把生成式 AI 接入影视生产、Gumloop 5000 万美元融资验证 Agent 工作流需求、中国具身智能融资升温、微信可能成为中国 AI Agent 入口”的可检索摘要；补全“今日结论”为行业动态/问题洞察/可执行建议，并将 CTA 从咨询/订阅泛文案替换为指向 `what-is-openclaw`、`openclaw-vps-deployment-complete-guide`、`openclaw-model-fallback-strategy` 的 3 条强相关内链。
- Start date: 2026-04-13
- End date: 2026-04-13
- Success metric: `pnpm check:daily-cta` 通过；`pnpm build` 通过；EN/ZH 目标页均含具体 description、行业洞察与 3 条强相关内链；`CONTENT_SCORECARD.md` 评分 >=20/30。
- Result: pass（`src/content/blog/en|zh/openclaw-daily-2026-03-13.md` 已完成 description 去占位化、结论段补全与 CTA 强相关内链替换；`CONTENT_SCORECARD.md` 评分 28/30，达到发布阈值；本地 `pnpm check:daily-cta` 与 `pnpm build` 均通过。补充观察：build 仍报告 `openclaw-daily-2026-03-13` duplicate id warning，说明仓内存在历史重复 slug/loader 冲突，需后续专项清理，但不影响本次页面改造验收。）
- Decision (scale / iterate / stop): iterate（继续回补 `2026-03-11` 等仍保留旧模板的日报页，并单列一次技术卫生任务清理 `2026-03-13` duplicate id warning，避免内容收益被历史索引问题抵消。）

### EXP-077
- Hypothesis: 对仍保留占位摘要与泛 CTA 的 `2026-03-16` 双语日报页补强可检索摘要与强相关 CTA 内链，可提升搜索匹配度、组织效率/办公 AI/开源模型/具身智能/AI 法律风险等主题检索覆盖，并向 OpenClaw 核心指南页导流。
- Scope: `/en/blog/openclaw-daily-2026-03-16/` + `/zh/blog/openclaw-daily-2026-03-16/`
- Change: 将 EN/ZH `openclaw-daily-2026-03-16` 的 frontmatter description 从同步占位文案升级为覆盖“Meta 为应对 AI 基础设施成本酝酿裁员、Gemini 深入 Workspace、英伟达被曝追加开源模型投入、具身智能融资升温、马斯克起诉 OpenAI 所释放的法律风险信号”的可检索摘要；同步将正文标题日期从 `2026-03-15` 修正为 `2026-03-16`，删除交付式尾句；将 CTA 从咨询/订阅泛文案替换为指向 `what-is-openclaw`、`openclaw-vps-deployment-complete-guide`、`openclaw-model-fallback-strategy` 的 3 条强相关内链。
- Start date: 2026-04-13
- End date: 2026-04-13
- Success metric: `pnpm check:daily-cta` 通过；`pnpm build` 通过；EN/ZH 目标页均含具体 description 与 3 条强相关内链；`CONTENT_SCORECARD.md` 评分 >=20/30。
- Result: pass（`src/content/blog/en|zh/openclaw-daily-2026-03-16.md` 已完成 description 去占位化、正文日期修正、交付式尾句删除与 CTA 强相关内链替换；`CONTENT_SCORECARD.md` 评分 28/30，达到发布阈值；本地 `pnpm check:daily-cta` 与 `pnpm build` 均通过。）
- Decision (scale / iterate / stop): iterate（继续回补 3 月中旬仍保留旧模板的日报页，并优先排查历史日报中正文日期错位问题，减少内容卫生缺口对 SEO 收益的抵消。）

### EXP-076
- Hypothesis: 对仍保留占位摘要与泛 CTA 的 `2026-03-15` 双语日报页补强可检索摘要与强相关 CTA 内链，可提升搜索匹配度、组织效率/办公 AI/开源模型/具身智能/AI 法律风险等主题检索覆盖，并向 OpenClaw 核心指南页导流。
- Scope: `/en/blog/openclaw-daily-2026-03-15/` + `/zh/blog/openclaw-daily-2026-03-15/`
- Change: 将 EN/ZH `openclaw-daily-2026-03-15` 的 frontmatter description 从同步占位文案升级为覆盖“Meta 为 AI 成本收缩组织、Gemini 深入 Workspace、英伟达被曝加码开源模型、具身智能融资升温、马斯克起诉 OpenAI 带来的法律风险”的可检索摘要；删除正文中的交付式尾句；将 CTA 从咨询/订阅泛文案替换为指向 `what-is-openclaw`、`openclaw-vps-deployment-complete-guide`、`openclaw-model-fallback-strategy` 的 3 条强相关内链。
- Start date: 2026-04-13
- End date: 2026-04-13
- Success metric: `pnpm check:daily-cta` 通过；`pnpm build` 通过；EN/ZH 目标页均含具体 description 与 3 条强相关内链。
- Result: pass（`src/content/blog/en|zh/openclaw-daily-2026-03-15.md` 已完成 description 去占位化、交付式尾句删除与 CTA 强相关内链替换；`CONTENT_SCORECARD.md` 评分 27/30，达到发布阈值；本地 `pnpm check:daily-cta` 与 `pnpm build` 均通过。补充观察：build 仍报告 `openclaw-daily-2026-03-15` duplicate id warning，说明仓内内容索引存在历史重复项或 loader 冲突，需单独排查，但不影响本次页面改造验收。）
- Decision (scale / iterate / stop): iterate（继续回补 `2026-03-16` 等仍保留旧模板的日报页，并优先排查 `2026-03-15` duplicate id warning 的根因，避免内容卫生问题抵消本轮 SEO 收益。）

### EXP-078
- Hypothesis: 对仍保留占位摘要与泛 CTA 的 `2026-03-14` 双语日报页补强可检索摘要与强相关 CTA 内链，可提升搜索匹配度、GTC/模型平台/合规主题检索覆盖与向 OpenClaw 核心指南页导流效率。
- Scope: `/en/blog/openclaw-daily-2026-03-14/` + `/zh/blog/openclaw-daily-2026-03-14/`
- Change: 将 EN/ZH `openclaw-daily-2026-03-14` 的 frontmatter description 从同步占位文案升级为覆盖“NVIDIA GTC 2026 会前预热、阿里云百炼模型更新、中国拟人化互动服务监管、百度文心 5.0 上线、ChatGPT 版本快速更替”的可检索摘要；删除正文中的对话式尾句；将 CTA 从咨询/订阅泛文案替换为指向 `what-is-openclaw`、`openclaw-vps-deployment-complete-guide`、`openclaw-model-fallback-strategy` 的 3 条强相关内链。
- Start date: 2026-04-13
- End date: 2026-04-13
- Success metric: `pnpm check:daily-cta` 通过；`pnpm build` 通过；EN/ZH 目标页均含具体 description 与 3 条强相关内链。
- Result: pass（`src/content/blog/en|zh/openclaw-daily-2026-03-14.md` 已完成 description 去占位化、对话式尾句删除与 CTA 强相关内链替换；本地 `pnpm check:daily-cta` 与 `pnpm build` 均通过。补充观察：build 仍存在历史 `2026-03-14` duplicate id 警告，说明仓内可能有同 slug 旧文件需后续专项清理，但不影响本次页面改造验收。）
- Decision (scale / iterate / stop): iterate（继续回补 3 月中旬仍残留旧模板的日报页，优先处理 `2026-03-15`、`2026-03-16`，并排入一次历史重复 slug 清理任务，减少 build warning 对内容卫生信号的干扰。）

### EXP-074
- Hypothesis: 对仍保留占位摘要与泛 CTA 的 `2026-03-20` 双语日报页补强可检索摘要与强相关 CTA 内链，可提升搜索匹配度、站内继续阅读率与向核心指南页导流效率。
- Scope: `/en/blog/openclaw-daily-2026-03-20/` + `/zh/blog/openclaw-daily-2026-03-20/`
- Change: 将 EN/ZH `openclaw-daily-2026-03-20` 的 frontmatter description 从同步占位文案升级为覆盖“NVIDIA GTC 2026 基础设施升级、Google 测试 Gemini for macOS 抢占桌面入口、Anthropic 企业收入竞争、中国云算力涨价与阿里 AI 组织化推进”的可检索摘要；将 CTA 从咨询/订阅泛文案替换为指向 `what-is-openclaw`、`openclaw-vps-deployment-complete-guide`、`openclaw-model-fallback-strategy` 的 3 条强相关内链。
- Start date: 2026-04-13
- End date: 2026-04-13
- Success metric: `pnpm check:daily-cta` 通过；`pnpm build` 通过；EN/ZH 目标页均含具体 description 与 3 条强相关内链。
- Result: pass（`src/content/blog/en|zh/openclaw-daily-2026-03-20.md` 已完成 description 去占位化与 CTA 强相关内链替换；仓内检索未发现该目标页残留占位摘要或 CTA Variant 文案；本地 `pnpm check:daily-cta` 与 `pnpm build` 均通过。）
- Decision (scale / iterate / stop): iterate（继续回补仍保留旧模板的 3 月中下旬日报，优先处理仍具“基础设施升级 + 桌面入口 + 企业商业化”复合主题、且可向核心指南页导流的高 ICE 候选页。）

### EXP-075
- Hypothesis: 对仍保留占位摘要与泛 CTA 的 `2026-03-24` 双语日报页补强可检索摘要与强相关 CTA 内链，可提升搜索匹配度、主题检索覆盖与站内导流效率。
- Scope: `/en/blog/openclaw-daily-2026-03-24/` + `/zh/blog/openclaw-daily-2026-03-24/`
- Change: 将 EN/ZH `openclaw-daily-2026-03-24` 的 frontmatter description 从同步占位文案升级为覆盖“NVIDIA GTC 2026 基础设施与物理 AI、Meta 授权新闻接入 Meta AI、中国开源 AI 竞争压力、Gemini 深入营销 ROI 工作流、阿里 RISC-V 芯片信号”的可检索摘要；将 CTA 从咨询/订阅泛文案替换为指向 `what-is-openclaw`、`openclaw-vps-deployment-complete-guide`、`openclaw-model-fallback-strategy` 的 3 条强相关内链。
- Start date: 2026-04-13
- End date: 2026-04-13
- Success metric: `pnpm check:daily-cta` 通过；`pnpm build` 通过；EN/ZH 目标页均含具体 description 与 3 条强相关内链。
- Result: pass（`src/content/blog/en|zh/openclaw-daily-2026-03-24.md` 已完成 description 去占位化与 CTA 强相关内链替换；本地 `pnpm check:daily-cta` 与 `pnpm build` 均通过。）
- Decision (scale / iterate / stop): iterate（继续回补仍残留旧模板的相邻 3 月日报，优先处理 `2026-03-20` 这类仍保留占位摘要与泛 CTA 的高 ICE 候选页，扩大主题检索覆盖与核心指南导流。）

### EXP-073
- Hypothesis: 对仍保留占位摘要与泛 CTA 的 `2026-03-27` 双语日报页补强可检索摘要与强相关 CTA 内链，可提升搜索匹配度、主题检索覆盖与站内导流效率。
- Scope: `/en/blog/openclaw-daily-2026-03-27/` + `/zh/blog/openclaw-daily-2026-03-27/`
- Change: 将 EN/ZH `openclaw-daily-2026-03-27` 的 frontmatter description 从同步占位文案升级为覆盖“中国日均 Token 调用量突破 140 万亿、AI 基建拉动芯片扩产、Ai2 开源网页智能体 MolmoWeb、美国数据中心监管升温、英伟达政策影响力增强”的可检索摘要；将 CTA 从咨询/订阅泛文案替换为指向 `what-is-openclaw`、`openclaw-vps-deployment-complete-guide`、`openclaw-model-fallback-strategy` 的 3 条强相关内链。
- Start date: 2026-04-13
- End date: 2026-04-13
- Success metric: `pnpm check:daily-cta` 通过；`pnpm build` 通过；EN/ZH 目标页均含具体 description 与 3 条强相关内链。
- Result: pass（`src/content/blog/en|zh/openclaw-daily-2026-03-27.md` 已完成 description 去占位化与 CTA 强相关内链替换；本地 `pnpm check:daily-cta` 与 `pnpm build` 均通过。）
- Decision (scale / iterate / stop): iterate（继续回补仍残留旧模板的相邻 3 月日报，并优先处理仍可能含重复 slug/id 警告的历史内容，减少 build 警告与模板残留并行出现的风险。）

### EXP-072
- Hypothesis: 对仍保留占位摘要与泛 CTA 的 `2026-03-28` 双语日报页补强可检索摘要与强相关 CTA 内链，可提升搜索匹配度、站内继续阅读率与向核心指南页导流效率。
- Scope: `/en/blog/openclaw-daily-2026-03-28/` + `/zh/blog/openclaw-daily-2026-03-28/`
- Change: 将 EN/ZH `openclaw-daily-2026-03-28` 的 frontmatter description 从同步占位文案升级为覆盖 OpenAI 平台化 Agent、Google 多模态工作流、英伟达基础设施 ROI、中国大模型从参数竞赛转向合规交付，以及 AI 治理/版权成本抬升的可检索摘要；将 CTA 从咨询/订阅泛文案替换为指向 `what-is-openclaw`、`openclaw-vps-deployment-complete-guide`、`openclaw-model-fallback-strategy` 的 3 条强相关内链。
- Start date: 2026-04-13
- End date: 2026-04-13
- Success metric: `pnpm check:daily-cta` 通过；`pnpm build` 通过；EN/ZH 目标页均含具体 description 与 3 条强相关内链。
- Result: pass（`src/content/blog/en|zh/openclaw-daily-2026-03-28.md` 已完成 description 去占位化与 CTA 强相关内链替换；本地 `pnpm check:daily-cta` 与 `pnpm build` 均通过。）
- Decision (scale / iterate / stop): iterate（继续回补仍残留旧模板的相邻 3 月下旬日报，优先处理 `2026-03-27` 这类“Token 调用量放量 + 网页 Agent 开源化”主题页，扩大搜索摘要覆盖与核心指南导流。）

### EXP-071
- Hypothesis: 对仍保留占位摘要与泛 CTA 的 `2026-03-18` 双语日报页补强可检索摘要与强相关 CTA 内链，可提升搜索匹配度、站内继续阅读率与向核心指南页导流效率。
- Scope: `/en/blog/openclaw-daily-2026-03-18/` + `/zh/blog/openclaw-daily-2026-03-18/`
- Change: 将 EN/ZH `openclaw-daily-2026-03-18` 的 frontmatter description 从同步占位文案升级为覆盖 Nvidia GTC 2026、推理型基础设施、机器人落地、中国模型调用量领先与合规工作流优先级的可检索摘要；将 CTA 从咨询/订阅泛文案替换为指向 `what-is-openclaw`、`openclaw-vps-deployment-complete-guide`、`openclaw-model-fallback-strategy` 的 3 条强相关内链。
- Start date: 2026-04-13
- End date: 2026-04-13
- Success metric: `pnpm check:daily-cta` 通过；`pnpm build` 通过；EN/ZH 目标页均含具体 description 与 3 条强相关内链。
- Result: pass（`src/content/blog/en|zh/openclaw-daily-2026-03-18.md` 已完成 description 去占位化与 CTA 强相关内链替换；仓内检索未发现该目标页残留占位摘要或 CTA Variant 文案；本地 `pnpm check:daily-cta` 与 `pnpm build` 均通过。）
- Decision (scale / iterate / stop): iterate（继续回补仍保留旧模板的 3 月下旬日报，并优先处理“推理/机器人/合规”主题能否导流到 OpenClaw 部署与模型回退指南的相邻日期页。）

### EXP-070
- Hypothesis: 若在内容检查中自动扫描旧式占位 description 与 CTA 变体残留，可更早阻断历史模板回潮，减少人工抽检成本。
- Scope: `scripts/check-daily-template-regressions.sh`、`package.json`、`.github/workflows/content-check.yml`
- Change: 新增双语日报模板回归扫描脚本，针对 EN/ZH `openclaw-daily-*.md` 检测占位 description、旧版 CTA Variant 标记与咨询/订阅泛 CTA 残留；脚本内保留 `rg` 不可用时回退 `grep -RIn`；并将检查接入 `pnpm check:daily-template` 与 content-check CI。
- Start date: 2026-04-13
- End date: 2026-04-13
- Success metric: `pnpm check:daily-template` 通过；`pnpm build` 通过；CI 出现 Daily template regression check。
- Result: pass（已新增 `scripts/check-daily-template-regressions.sh` 并接入 `package.json` 与 `.github/workflows/content-check.yml`；本地 `pnpm check:daily-template` 与 `pnpm build` 均通过。）
- Decision (scale / iterate / stop): scale（保留为默认回归闸门；下一步可继续扩展到正文结论段是否仍含旧模板提示语，进一步减少历史模板残留。）

### EXP-069
- Hypothesis: 对仍保留占位摘要与泛 CTA 的 `2026-03-29` 双语日报页补强可检索摘要与强相关 CTA 内链，可提升搜索匹配度、站内继续阅读率与向核心指南页导流效率。
- Scope: `/en/blog/openclaw-daily-2026-03-29/` + `/zh/blog/openclaw-daily-2026-03-29/`
- Change: 将 EN/ZH `openclaw-daily-2026-03-29` 的 frontmatter description 从同步占位文案升级为覆盖中关村白皮书“AI 创业 12-24 个月收入验证窗口”、中国市场从参数竞赛转向垂直 ROI、Agent 推动云服务竞争升级与 AI 硬件回归真实工作流价值的可检索摘要；将“今日结论”补全为更具体的商业兑现建议；将 CTA 从咨询/订阅泛文案替换为指向 `what-is-openclaw`、`openclaw-vps-deployment-complete-guide`、`openclaw-model-fallback-strategy` 的 3 条强相关内链。
- Start date: 2026-04-13
- End date: 2026-04-13
- Success metric: `pnpm build` 通过；`pnpm check:daily-cta` 通过；EN/ZH 目标页均含具体 description 与 3 条强相关内链。
- Result: pass（`src/content/blog/en|zh/openclaw-daily-2026-03-29.md` 已完成 description 去占位化、结论段补全与 3 条强相关 CTA 内链替换；本地 `pnpm check:daily-cta` 与 `pnpm build` 均通过。）
- Decision (scale / iterate / stop): iterate（延续此模板继续回补旧日报；下一步优先处理 `EXP-070`，为双语日报增加“占位 description / 泛 CTA 残留扫描”脚本并接入 CI，减少旧模板回归。）

### EXP-068
- Hypothesis: 对仍保留占位摘要与泛 CTA 的 `2026-04-11` 双语日报页补强可检索摘要与强相关 CTA 内链，可提升搜索匹配度、站内继续阅读率与向核心指南页导流效率。
- Scope: `/en/blog/openclaw-daily-2026-04-11/` + `/zh/blog/openclaw-daily-2026-04-11/`
- Change: 将 EN/ZH `openclaw-daily-2026-04-11` 的 frontmatter description 从同步占位文案升级为覆盖 ChatGPT 套餐/回退分层、OpenAI 企业营收占比、Gemma 4、Anthropic Managed Agents 与中国云算力涨价信号的可检索摘要；将 CTA 从咨询/订阅泛文案替换为指向 `what-is-openclaw`、`openclaw-vps-deployment-complete-guide`、`openclaw-model-fallback-strategy` 的强相关内链；同步扩展 `scripts/check-daily-cta-variants.sh`，允许“3 条强相关内链”作为新模板通过条件，避免闸门误报。
- Start date: 2026-04-13
- End date: 2026-04-13
- Success metric: `pnpm build` 通过；`pnpm check:daily-cta` 通过；EN/ZH 目标页均含具体 description 与 3 条强相关内链。
- Result: pass（`src/content/blog/en|zh/openclaw-daily-2026-04-11.md` 已完成 description 去占位化与 3 条强相关 CTA 内链替换；`scripts/check-daily-cta-variants.sh` 已支持“CTA 变体注释或 3 条强相关内链”双判定；本地 `pnpm check:daily-cta` 与 `pnpm build` 均通过；变更已提交 `fd10022`。）
- Decision (scale / iterate / stop): scale（继续按该模板回补更早日报，并将新闸门作为默认回归保护；后续可加一条周检，专抓 description 仍为同步占位文案的旧日报。）

### EXP-067
- Hypothesis: 若在构建产物层对 `robots.txt`、`sitemap.xml`、`sitemap-index.xml` 做一致性校验，并把检查接入 CI，则可在上线前阻断 robots/sitemap 入口漂移、旧域名泄漏与兼容性回归，减少抓取失败和索引延迟风险。
- Scope: `public/robots.txt`、`scripts/check-robots-sitemap-integrity.sh`、`package.json`、`.github/workflows/content-check.yml`
- Change: 新增 robots/sitemap integrity gate，校验 `robots.txt` 含 `User-agent: *`、`Allow: /`、`sitemap-index.xml` 与兼容 `sitemap.xml` 双入口，拦截 `openhub.plzbite.top` 与 `http://kuoo.uk`；同时校验 `dist/sitemap.xml` 指向 `sitemap-index.xml`、`dist/sitemap-index.xml` 至少包含一个 `kuoo.uk` `<loc>`；并接入 content-check CI。
- Start date: 2026-04-13
- End date: 2026-04-13
- Success metric: `pnpm build` 通过；`pnpm check:robots-sitemap` 通过；CI 出现 robots/sitemap integrity check。
- Result: pass（`public/robots.txt` 已补充双 sitemap 入口，新增 `scripts/check-robots-sitemap-integrity.sh`，`package.json` 与 `content-check.yml` 已接入；本地 `pnpm build` 与 `pnpm check:robots-sitemap` 均通过。）
- Decision (scale / iterate / stop): scale（作为 crawl/index hygiene 默认闸门保留；后续若 sitemap 分片增多，再扩展校验 index 内部 child sitemap 数量与 lastmod 一致性。）

### EXP-066
- Hypothesis: 若把最近24小时内容建设任务连续验证有效的“description 去占位化 + 3 条强相关 CTA 内链”固化到 `publish-daily.sh`，则后续双语日报可默认具备搜索摘要质量与核心指南导流能力，减少人工返工与回归风险。
- Scope: `scripts/publish-daily.sh`（影响后续 EN/ZH daily posts 生成）。
- Change: 在发布脚本中移除占位 description 与咨询/订阅泛 CTA：新增基于日报正文生成 ZH 可检索摘要的逻辑、提供 EN 非占位摘要默认值，并将 EN/ZH CTA 模板统一替换为指向 `what-is-openclaw`、`openclaw-vps-deployment-complete-guide`、`openclaw-model-fallback-strategy` 的强相关内链。
- Start date: 2026-04-12
- End date: 2026-04-12
- Success metric: `pnpm build` 通过；脚本模板不再写入占位 description 与泛 CTA；后续日报默认包含 3 条强相关内链 CTA。
- Result: pass（`scripts/publish-daily.sh` 已完成模板固化，`pnpm build` 通过；仓内检索未发现“Synced with the daily Telegram AI/tech brief / 与 Telegram 当日推送同步”及 CTA Variant A/B 泛转化文案残留。）
- Decision (scale / iterate / stop): scale（将该模板作为默认发布基线，后续继续按周抽检新日报 description 质量与内链导流指标，防止模板回退。）

### EXP-065
- Hypothesis: 对最近24小时内容建设任务新增且仍保留同步占位摘要/泛 CTA 的日报页（2026-04-12），补强可检索摘要与强相关 CTA 内链，可提升搜索匹配度、站内继续阅读率与核心指南导流效率。
- Scope: `/en/blog/openclaw-daily-2026-04-12/` + `/zh/blog/openclaw-daily-2026-04-12/`
- Change: 将 EN/ZH `openclaw-daily-2026-04-12` 的 frontmatter description 从“同步推送占位文案”升级为包含 OpenAI 第三方工具安全事件、IPO 散户配售信号、Anthropic 自研芯片评估与工信部“人工智能+”场景发布的可检索摘要；将 CTA 从咨询/订阅泛文案替换为指向 `what-is-openclaw`、`openclaw-vps-deployment-complete-guide`、`openclaw-model-fallback-strategy` 的强相关内链。
- Start date: 2026-04-12
- End date: 2026-04-12
- Success metric: `pnpm build` 通过；EN/ZH 目标页均含具体 description 与 3 条强相关内链；后续观察日报页 CTR、站内下一跳与相关指南页导流点击。
- Result: pass（已优先消费最近24小时内容建设假设对应的 `2026-04-12` 日报；EN/ZH frontmatter description 已去占位化，CTA 已升级为 3 条强相关内链，`pnpm build` 通过并生成对应 EN/ZH 路由。）
- Decision (scale / iterate / stop): iterate（继续观察 7 天内目标页 CTR、站内下一跳与核心指南页导流点击；若持续有效，固化到 daily 发布模板，默认避免占位摘要与泛 CTA 回归。）

### EXP-064
- Hypothesis: 对最近24小时内容建设假设所覆盖、但仍保留同步占位摘要/泛 CTA 且存在正文日期错位的日报页，补强可检索摘要、日期一致性与强相关 CTA 内链，可同时提升搜索匹配度、站内继续阅读率与导流准确性。
- Scope: `/en/blog/openclaw-daily-2026-03-30/` + `/zh/blog/openclaw-daily-2026-03-30/`
- Change: 将 EN/ZH `openclaw-daily-2026-03-30` 的 frontmatter description 从同步占位文案升级为包含中关村白皮书“AI 创业 12-24 个月生死线”、中国 AI 叙事转向垂直 ROI、Agent 驱动云服务竞争、AI 硬件回归高频场景与政策外溢等关键信号的可检索摘要；将正文日期从 `2026-03-29` 修正为 `2026-03-30` 以与 `pubDate` 对齐；将 CTA 从泛咨询/泛订阅文案替换为指向 `what-is-openclaw`、`openclaw-vps-deployment-complete-guide`、`openclaw-model-fallback-strategy` 的强相关内链。
- Start date: 2026-04-11
- End date: 2026-04-11
- Success metric: `pnpm build` 通过；EN/ZH 目标页均含具体 description 与 3 条强相关内链；正文日期与 `pubDate` 一致；后续观察日报页 CTR、站内下一跳与相关指南页导流点击。
- Result: pass（已优先消费最近24小时内容建设假设覆盖的 `2026-03-30` 日报页；EN/ZH frontmatter description 已去占位化，正文日期已与 `pubDate` 对齐，CTA 已升级为 3 条强相关内链，`pnpm build` 通过并生成对应 EN/ZH 路由。）
- Decision (scale / iterate / stop): iterate（继续观察 7 天内目标页 CTR、站内下一跳与核心指南页导流点击；若持续有效，进一步固化到 daily 发布模板。）

### EXP-063
- Hypothesis: 对最近24小时内容建设假设所覆盖、但仍保留同步占位摘要与泛 CTA 的日报页，补强可检索摘要与强相关 CTA 内链，可提升搜索匹配度、站内继续阅读率与向核心指南页导流效率。
- Scope: `/en/blog/openclaw-daily-2026-04-02/` + `/zh/blog/openclaw-daily-2026-04-02/`
- Change: 将 EN/ZH `openclaw-daily-2026-04-02` 的 frontmatter description 从同步占位文案升级为包含 OpenAI GPT-4.1 发布、Gemini 深度集成 Workspace/Cloud、中国行业大模型落地提速、推理成本优化与监管合规压力等关键信号的可检索摘要；将 CTA 从泛咨询/泛订阅文案替换为指向 `what-is-openclaw`、`openclaw-vps-deployment-complete-guide`、`openclaw-model-fallback-strategy` 的强相关内链。
- Start date: 2026-04-11
- End date: 2026-04-11
- Success metric: `pnpm build` 通过；EN/ZH 目标页均含具体 description 与 3 条强相关内链；后续观察日报页 CTR、站内下一跳与相关指南页导流点击。
- Result: pass（已优先消费最近24小时内容建设假设覆盖的 `2026-04-02` 日报页；EN/ZH frontmatter description 已去占位化，CTA 已升级为 3 条强相关内链，`pnpm build` 通过并生成对应 EN/ZH 路由。）
- Decision (scale / iterate / stop): iterate（继续观察 7 天内目标页 CTR、站内下一跳与核心指南页导流点击；若持续有效，进一步固化到 daily 发布模板。）

### EXP-062
- Hypothesis: 对最近24小时新增内容建设假设所覆盖、但仍保留占位摘要/泛 CTA 的日报页，补强可检索摘要与强相关 CTA 内链，可提升搜索匹配度、站内继续阅读率与向核心指南页导流效率。
- Scope: `/en/blog/openclaw-daily-2026-04-03/` + `/zh/blog/openclaw-daily-2026-04-03/`
- Change: 将 EN/ZH `openclaw-daily-2026-04-03` 的 frontmatter description 从同步占位文案升级为包含 OpenAI 模型能力更新、Gemini 与 Workspace/Cloud 深度集成、中国大模型转向行业 ROI、算力供给与价格竞争、监管合规压力等关键信号的可检索摘要；将 CTA 从泛咨询/泛订阅文案替换为指向 `what-is-openclaw`、`openclaw-vps-deployment-complete-guide`、`openclaw-model-fallback-strategy` 的强相关内链。
- Start date: 2026-04-11
- End date: 2026-04-11
- Success metric: `pnpm build` 通过；EN/ZH 目标页均含具体 description 与 3 条强相关内链；后续观察日报页 CTR、站内下一跳与相关指南页导流点击。
- Result: pass（已完成 EN/ZH `openclaw-daily-2026-04-03` description 去占位化与 CTA 强相关内链替换；`pnpm build` 通过并生成对应 EN/ZH 路由。）
- Decision (scale / iterate / stop): iterate（继续观察 7 天内目标页 CTR、站内下一跳与核心指南页导流点击；若持续有效，进一步固化到 daily 发布模板。）


### EXP-061
- Hypothesis: 对最近24小时新发布但仍保留占位摘要/泛 CTA、且存在日期元信息错位的日报页，补强可检索摘要、日期一致性与强相关 CTA 内链，可同时提升搜索匹配度、站内继续阅读率与导流准确性。
- Scope: `/en/blog/openclaw-daily-2026-04-05/` + `/zh/blog/openclaw-daily-2026-04-05/`
- Change: 将 EN/ZH `openclaw-daily-2026-04-05` 的 frontmatter description 从同步占位文案升级为包含普惠算力行动、H100 租赁价格上行、北京新增生成式 AI 服务登记、12 吋晶圆厂设备支出增长、生成式 AI 网络安全风险等关键信号的可检索摘要；将正文日期从 `2026-04-04` 修正为 `2026-04-05` 以与 `pubDate` 对齐；将 CTA 从泛咨询/泛订阅文案替换为指向 `what-is-openclaw`、`openclaw-vps-deployment-complete-guide`、`openclaw-model-fallback-strategy` 的强相关内链。
- Start date: 2026-04-10
- End date: 2026-04-10
- Success metric: `pnpm build` 通过；EN/ZH 目标页均含具体 description 与 3 条强相关内链；正文日期与 `pubDate` 一致；后续观察日报页 CTR、站内下一跳与相关指南页导流点击。
- Result: pass（已优先消费最近24小时内容建设任务 `2026-04-05` 日报；EN/ZH frontmatter description 已去占位化，正文日期已与 `pubDate` 对齐，CTA 已升级为 3 条强相关内链，`pnpm build` 通过并生成对应 EN/ZH 路由。）
- Decision (scale / iterate / stop): iterate（继续观察 7 天内日报页 CTR、站内下一跳与核心指南页导流点击；若模式持续有效，则将 description+日期一致性+CTA 内链规则固化到 `publish-daily.sh`，默认避免占位摘要、错位日期与泛 CTA 回归。）


### EXP-060
- Hypothesis: 对最近24小时新发布但仍保留占位摘要/泛 CTA、且存在日期元信息错位的日报页，补强可检索摘要、日期一致性与强相关 CTA 内链，可同时提升搜索匹配度、站内继续阅读率与导流准确性。
- Scope: `/en/blog/openclaw-daily-2026-04-10/` + `/zh/blog/openclaw-daily-2026-04-10/`
- Change: 将 EN/ZH `openclaw-daily-2026-04-10` 的 frontmatter description 从同步占位文案升级为包含 OpenAI-Microsoft 合作条款重谈、Gemini 在 Search/Workspace 深度融合、中国行业大模型落地、算力供给约束与监管版权压力等关键信号的可检索摘要；将正文日期从 `2026-04-06` 修正为 `2026-04-10` 以与 `pubDate` 对齐；将 CTA 从泛咨询/泛订阅文案替换为指向 `what-is-openclaw`、`openclaw-vps-deployment-complete-guide`、`openclaw-model-fallback-strategy` 的强相关内链。
- Start date: 2026-04-10
- End date: 2026-04-10
- Success metric: `pnpm build` 通过；EN/ZH 目标页均含具体 description 与 3 条强相关内链；正文日期与 `pubDate` 一致；后续观察日报页 CTR、站内下一跳与相关指南页导流点击。
- Result: pass（已优先消费最近24小时内容建设任务 `2026-04-10` 日报；EN/ZH frontmatter description 已去占位化，正文日期已与 `pubDate` 对齐，CTA 已升级为 3 条强相关内链，`pnpm build` 通过并生成对应 EN/ZH 路由。）
- Decision (scale / iterate / stop): iterate（继续观察 7 天内日报页 CTR、站内下一跳与核心指南页导流点击；若模式持续有效，则将 description+日期一致性+CTA 内链规则固化到 `publish-daily.sh`，默认避免占位摘要、错位日期与泛 CTA 回归。）


### EXP-059
- Hypothesis: 对最新发布但仍保留占位摘要/泛 CTA 的日报页，补强可检索摘要与强相关 CTA 内链，可提升日报页搜索匹配度、站内继续阅读率，以及向 OpenClaw 核心指南的导流效率。
- Scope: `/en/blog/openclaw-daily-2026-04-06/` + `/zh/blog/openclaw-daily-2026-04-06/`
- Change: 将 EN/ZH `openclaw-daily-2026-04-06` 的 frontmatter description 从同步占位文案升级为包含 OpenAI-Microsoft 合作条款重谈、Gemini 在 Search/Workspace 深度融合、中国行业大模型落地、算力供给约束与监管版权压力等关键信号的可检索摘要；将 CTA 从泛咨询/泛订阅文案替换为指向 `what-is-openclaw`、`openclaw-vps-deployment-complete-guide`、`openclaw-model-fallback-strategy` 的强相关内链。
- Start date: 2026-04-10
- End date: 2026-04-10
- Success metric: `pnpm build` 通过；EN/ZH 目标页均含具体 description 与 3 条强相关内链；后续观察日报页 CTR、站内下一跳与相关指南页导流点击。
- Result: pass（已优先消费最新日报内容建设任务 `2026-04-06`；EN/ZH frontmatter description 已去占位化，CTA 已升级为 3 条强相关内链，`pnpm build` 通过并生成对应 EN/ZH 路由。）
- Decision (scale / iterate / stop): iterate（继续观察 7 天内日报页 CTR、站内下一跳与核心指南页导流点击；若模式持续有效，则将该规则固化到 `publish-daily.sh`，默认避免占位摘要/泛 CTA 回归。）


### EXP-058
- Hypothesis: 对最近24小时新发布但仍保留占位摘要/泛 CTA 的日报页，补强可检索摘要与强相关 CTA 内链，可提升日报页搜索匹配度、站内继续阅读率，以及向 OpenClaw 核心指南的导流效率。
- Scope: `/en/blog/openclaw-daily-2026-04-04/` + `/zh/blog/openclaw-daily-2026-04-04/`
- Change: 将 EN/ZH `openclaw-daily-2026-04-04` 的 frontmatter description 从同步占位文案升级为包含中国普惠算力行动、Nvidia H100 租赁涨价、北京新增 15 款生成式 AI 服务登记、全球 12 吋晶圆厂设备支出增长、生成式 AI 网络犯罪风险等关键信号的可检索摘要；将 CTA 从泛咨询/泛订阅文案替换为指向 `what-is-openclaw`、`openclaw-vps-deployment-complete-guide`、`openclaw-model-fallback-strategy` 的强相关内链。
- Start date: 2026-04-04
- End date: 2026-04-04
- Success metric: `pnpm build` 通过；EN/ZH 目标页均含具体 description 与 3 条强相关内链；后续观察日报页 CTR、站内下一跳与相关指南页导流点击。
- Result: pass（已消费最近24小时内容建设任务 `2026-04-04` 日报；EN/ZH frontmatter description 已去占位化，CTA 已升级为 3 条强相关内链，`pnpm build` 通过并生成对应 EN/ZH 路由。）
- Decision (scale / iterate / stop): iterate（先观察 7 天内日报页 CTR、站内下一跳与核心指南页导流点击；若该模式持续有效，下一轮把规则固化到 `publish-daily.sh` 模板，减少新日报回落到占位摘要/泛 CTA 的概率）


### EXP-057
- Hypothesis: 对最近24小时新发布但仍保留占位摘要/泛 CTA 的日报页，补强可检索摘要与强相关 CTA 内链，可提升日报页搜索匹配度、站内继续阅读率，以及向 OpenClaw 核心指南的导流效率。
- Scope: `/en/blog/openclaw-daily-2026-04-01/` + `/zh/blog/openclaw-daily-2026-04-01/`
- Change: 将 EN/ZH `openclaw-daily-2026-04-01` 的 frontmatter description 从同步占位文案升级为包含 OpenAI 代理能力讨论、Google Gemini/AI 搜索推进、中国行业大模型落地、英伟达算力成本与全球 AI 监管等关键信号的可检索摘要；将 CTA 从泛咨询/泛订阅文案替换为指向 `what-is-openclaw`、`openclaw-vps-deployment-complete-guide`、`openclaw-model-fallback-strategy` 的强相关内链。
- Start date: 2026-04-01
- End date: 2026-04-01
- Success metric: `pnpm build` 通过；EN/ZH 目标页均含具体 description 与 3 条强相关内链；后续观察日报页 CTR、站内下一跳与相关指南页导流点击。
- Result: pass（已消费最近24小时内容建设任务 `2026-04-01` 日报；EN/ZH frontmatter description 已去占位化，CTA 已升级为 3 条强相关内链，`pnpm build` 通过并生成对应 EN/ZH 路由。）
- Decision (scale / iterate / stop): iterate（先观察 7 天内日报页 CTR、站内下一跳与核心指南页导流点击；若该模式持续有效，下一轮把规则固化到 `publish-daily.sh` 模板，减少新日报回落到占位摘要/泛 CTA 的概率）

### EXP-056
- Hypothesis: 对最近24小时新发布但仍保留占位摘要/泛 CTA 的日报页，补强可检索摘要与强相关 CTA 内链，可提升日报页搜索匹配度、站内继续阅读率，以及向 OpenClaw 核心指南的导流效率。
- Scope: `/en/blog/openclaw-daily-2026-03-25/` + `/zh/blog/openclaw-daily-2026-03-25/`
- Change: 将 EN/ZH `openclaw-daily-2026-03-25` 的 frontmatter description 从同步占位文案升级为包含 OpenAI 企业融资与非营利治理、Claude Code auto mode、Nvidia GTC 2026 推理/物理 AI、Broadcom/TSMC 产能约束、中国开源 AI 优势等关键信号的可检索摘要；将 CTA 从泛咨询/泛订阅文案替换为指向 `what-is-openclaw`、`openclaw-vps-deployment-complete-guide`、`openclaw-model-fallback-strategy` 的强相关内链。
- Start date: 2026-03-25
- End date: 2026-03-25
- Success metric: `pnpm build` 通过；EN/ZH 目标页均含具体 description 与 3 条强相关内链；后续观察日报页 CTR、站内下一跳与相关指南页导流点击。
- Result: pass（已消费最近24小时内容建设任务 `2026-03-25` 日报；EN/ZH frontmatter description 已去占位化，CTA 已升级为 3 条强相关内链，`pnpm build` 通过并生成对应 EN/ZH 路由。）
- Decision (scale / iterate / stop): iterate（先观察 7 天内日报页 CTR、站内下一跳与核心指南页导流点击；若该模式持续有效，下一轮把规则固化到 `publish-daily.sh` 模板，减少新日报回落到占位摘要/泛 CTA 的概率）

### EXP-055
- Hypothesis: 对最近24小时新发布但仍保留占位摘要/泛 CTA 的日报页，补强可检索摘要与强相关 CTA 内链，可提升日报页搜索匹配度、站内继续阅读率，以及向 OpenClaw 核心指南的导流效率。
- Scope: `/en/blog/openclaw-daily-2026-03-21/` + `/zh/blog/openclaw-daily-2026-03-21/`
- Change: 将 EN/ZH `openclaw-daily-2026-03-21` 的 frontmatter description 从占位同步文案升级为包含 GTC 2026、Gemini for macOS、Anthropic 企业收入竞争、中国云厂商 AI 算力涨价等关键信号的可检索摘要；将 CTA 从泛咨询/泛订阅文案替换为指向 `what-is-openclaw`、`openclaw-vps-deployment-complete-guide`、`openclaw-model-fallback-strategy` 的强相关内链。
- Start date: 2026-03-22
- End date: 2026-03-22
- Success metric: `pnpm build` 通过；EN/ZH 目标页均含具体 description 与 3 条强相关内链；后续观察日报页 CTR、站内下一跳与相关指南页导流点击。
- Result: pass（已消费最近24小时内容建设任务 `2026-03-21` 日报；EN/ZH frontmatter description 已去占位化，CTA 已升级为 3 条强相关内链，`pnpm build` 通过并生成对应 EN/ZH 路由。）
- Decision (scale / iterate / stop): iterate（先观察 7 天内日报页 CTR、站内下一跳与核心指南页导流点击；若该模式继续有效，下一轮将固化到 `publish-daily.sh` 模板，避免新日报再次回落到占位摘要/泛 CTA）

### EXP-054
- Hypothesis: 在首页 hero 下方新增面向创作者的“发布你的 Skill / Add your skill”CTA，比仅在页脚或导航暴露发布入口更能提高创作者侧点击率，并把内容消费者转化为生态贡献者。
- Scope: `/en/`, `/zh/` 首页 hero 下方；全站 footer 发布入口；相关引导页 `/en/blog/openclaw-clawhub-skill-security-guide/` 与 `/zh/blog/openclaw-clawhub-skill-security-guide/`。
- Change: 新增 `HomeCreatorCTA` 组件，在 EN/ZH 首页 hero 下插入双按钮（打开 `https://clawhub.com/publish` + Skill security guide）；新增 `home_creator_cta_render` / `home_creator_cta_click` growth 事件；在全站 footer 增加 publish + guide 常驻入口，缩短创作者转化路径。
- Start date: 2026-03-20
- End date: 2026-03-27
- Success metric: 24h 内 `home_creator_cta_render` 与 `home_creator_cta_click` 事件 >0；7 天内 creator CTA CTR（click/render）>= 1.5%；发布页点击率高于页脚基线入口。
- Result: shipped in repo (commit `84a458c`), local `pnpm build` pass.
- Decision (scale / iterate / stop): iterate（先观察 24h render/click 是否进 CFWA；若点击主要集中在 publish 按钮，下一轮把安全指南下沉为 hover/help 文案，减少 CTA 分流）

### EXP-053
- Hypothesis: 对第一次运行失败的用户，“加入社群 + 复制最小证据模板”比纯文档跳转更能降低放弃率，并提高后续求助消息质量，从而提升留存与二次访问。
- Scope: `/`, `/en/`, `/zh/` 首页 CTA（HomeQuickstartCTA）；新增 Telegram join + issue template copy。
- Change: 在首页 CTA 动作区新增 Telegram 按钮（新标签页打开社群入口）+ “Copy issue template” 按钮（复制最小证据模板到剪贴板）；为 Telegram click/open 与模板复制接入 CFWA 自定义事件 `home_cta_tg_click` / `home_cta_tg_open` / `home_cta_issue_template_copy`；继续确保不上传任何日志文本。
- Start date: 2026-03-17
- End date: 2026-03-24
- Success metric: 24h 内 CFWA 事件 >0；7 天内 template_copy_rate（copy/click）>= 15%；tg_click_rate（tg_click/pageview）>= 0.5%。
- Result: shipped in repo (commit `7499b13`), local `pnpm build` pass; awaiting CFWA events after deploy.
- Decision (scale / iterate / stop): iterate（先观察 24h/7d 事件；若 template_copy_rate < 15%，下一轮把模板按钮下沉到 verify 区或加入“复制后打开 Telegram”串联文案）


### EXP-052
- Hypothesis: 只有把首页 CTA 事件真正落到可观测平台（优先 Cloudflare Web Analytics，自定义事件）才能快速验证 EXP-050/051 的转化链路假设；最小事件闭环会显著降低后续实验测量成本。
- Scope: `/`, `/en/`, `/zh/` 首页 CTA（HomeQuickstartCTA）；事件：view/click/copy/verify。
- Change: 将目前“console + window.dispatchEvent”埋点升级为 Cloudflare Web Analytics 自定义事件（不上传命令输出文本），并在本日志补齐观测方法（从 CFWA 获取事件报表的路径/位点）。
- Start date: 2026-03-16
- End date: 2026-03-23
- Success metric: 24h 内 CFWA 面板可见事件（view & click >0）；7 天内可产出 CTA CTR、copy rate、verify rate。
- Result: shipped (commit `fb9bcf7`), awaiting CFWA data.
- Observability / How to measure (CFWA):
  - Prereq: set `CF_WEB_ANALYTICS_TOKEN` in Cloudflare Pages env vars (Production/Preview as needed).
  - Dashboard path: Cloudflare → your site → **Analytics & Logs** → **Web Analytics** → **Events**.
  - Filter/expect events (names): `home_cta_view`, `home_cta_click`, `home_cta_copy`, `home_cta_verify_start`, `home_cta_verify_echo` (plus optional `home_cta_test`).
  - Safe props forwarded: `lang`, `path`, `kind`, `href`, `label` (no command output text).
  - Quick manual test (after deploy): open homepage, run `openclawCfaTest()` in DevTools console; then check Events count in CFWA.
- Decision (scale / iterate / stop): (pending)


### EXP-051
- Hypothesis: “一键复制 + 可验证下一步”比纯按钮/列表更能降低行动摩擦，提升首页 CTA 点击后的真实执行率与回访率。
- Scope: `/`, `/en/`, `/zh/` 首页 CTA（HomeQuickstartCTA 组件）
- Change: 为第 2/3 步（`openclaw gateway status` / `openclaw doctor`）增加“验证”按钮：点击后自动复制命令 + 展开一个本地输入框；5 秒后读取用户粘贴的输出（仅本地判定，不上报文本），并触发 growth 事件 `home_cta_verify_start` / `home_cta_verify_echo(bytes)`。
- Start date: 2026-03-15
- End date: 2026-03-22
- Success metric: 7 天内 copy click rate >= 1.0%；copy-to-nextpage rate >= 25%；不引入构建错误且 LCP 不退化（本地 build + lighthouse 采样无明显回归）。
- Result: shipped in repo (commit `dedf78c`), local `pnpm build` pass.
- Decision (scale / iterate / stop): iterate（观察 7 天；若 verify echo rate 明显高于基线 copy，考虑把 verify 状态与下一跳 CTA 更紧密绑定，例如“已验证→推荐下一步链接”）

### EXP-050
- Hypothesis: 在首页与语言入口页（/、/en、/zh）首屏加入明确的“Get started / Install OpenClaw”CTA + 3-step quickstart（安装→首跑→验证），并在 CTA 上埋点事件，将提升“首页→核心指南页”点击率与站内下一跳率。
- Scope: `/`, `/en/`, `/zh/`（首页与语言入口页）；目标落地页：`/en/blog/what-is-openclaw/`、`/en/blog/openclaw-install-first-run-error-troubleshooting/`、`/en/blog/openclaw-telegram-troubleshooting-guide/`（ZH 对应页）
- Change: 在 `/en` 与 `/zh` 首页 hero 下插入 Quickstart CTA：2 个按钮（Install guide / What is OpenClaw）+ 3-step（Install/First run/Verify）+ 命令复制按钮；增加轻量事件 stub（console + `window.dispatchEvent('openclaw:growth')`）记录 view/click/copy。
- Start date: 2026-03-15
- End date: 2026-03-22
- Success metric: 7 天内首页 CTA CTR >= 2.5%；首页到核心指南页的点击占比提升 >= 20%；目标落地页平均参与时长 >= 90s。
- Result: shipped in repo (commit `6b4bf94`), local `pnpm build` pass; tracking pending (requires analytics bridge / console sampling).
- Decision (scale / iterate / stop): iterate（先观测 7 天；如 CTR 达标再把同模块复制到根首页 `/` 入口页，并把事件桥接到 CF Web Analytics / 自有 endpoint）


### EXP-001
- Hypothesis: Question-first titles improve CTR on troubleshooting pages.
- Scope: 10 troubleshooting posts (EN/ZH)
- Change: Rewrite title + description with issue-first wording.
- Success metric: +15% CTR in 7 days vs baseline.
- Result: (pending)
- Decision: (pending)

### EXP-002
- Hypothesis: Enforcing WEEKLY_REVIEW freshness in CI will prevent weekly review drift and keep the review cadence stable.
- Scope: Repo-level CI + weekly review scaffold
- Change: Added `scripts/check-weekly-review-cadence.sh`, npm script `check:weekly-review`, and CI step to fail when current-week line is missing in `WEEKLY_REVIEW.md`.
- Start date: 2026-02-26
- End date: 2026-02-26
- Success metric: CI catches stale WEEKLY_REVIEW before merge; current week check passes after `pnpm weekly:seo`.
- Result: pass (local check verified on current week).
- Decision: scale

### EXP-003
- Hypothesis: Weekly stale-domain scanning on SEO-sensitive paths will prevent legacy-domain leakage into production metadata/pages.
- Scope: `src/`, `public/`, `astro.config.mjs`
- Change: Added `scripts/scan-stale-domain.sh`, npm script `check:stale-domain`, and weekly report integration to emit `reports/seo-weekly/stale-domain-alert-YYYY-MM-DD-to-YYYY-MM-DD.md`.
- Start date: 2026-02-26
- End date: 2026-02-26
- Success metric: `pnpm check:stale-domain` passes with only allowlisted redirect references; weekly alert file generated.
- Result: pass (local check + build passed).
- Decision: scale

### EXP-004
- Hypothesis: Parsing low-CTR query rows from daily snapshots into weekly report will shorten diagnosis time and increase likelihood of title/meta optimization actions.
- Scope: `reports/seo/daily/*.md` → `reports/seo-weekly/*.md`
- Change: Added low-CTR query parser to `scripts/generate-seo-weekly-report.sh` and standardized daily query row format hint in `scripts/generate-seo-daily-snapshot.sh`.
- Start date: 2026-02-26
- End date: 2026-02-26
- Success metric: `pnpm weekly:seo` renders low-CTR opportunity table (or explicit fallback row) with no script errors.
- Result: pass (table rendered; fallback row shown when no structured query metrics provided).
- Decision: iterate (collect 7 days of structured query rows, then tune thresholds).

### EXP-005
- Hypothesis: Enforcing industry/problem/actionability structure for weekly posts will prevent low-value progress logs and increase publish quality consistency.
- Scope: `scripts/generate-weekly-roundup.sh`, CI workflow, weekly post files
- Change: Added `scripts/check-weekly-content-quality.sh` + npm script `check:weekly-content`, wired into `content-check.yml`, and rewrote current EN weekly post to meet quality rubric.
- Start date: 2026-02-26
- End date: 2026-02-26
- Success metric: CI fails weekly posts missing required sections or containing banned progress-log wording; build passes after compliant rewrite.
- Result: pass (local quality check + build passed).
- Decision: scale

### EXP-006
- Hypothesis: Adding targeted internal links from high-traffic guides to new troubleshooting content will improve SEO authority flow and user discoverability.
- Scope: Gateway-start-failed and VPS deployment guides (EN/ZH) → allowedOrigins fix article
- Change: Added new section 3.5 (allowedOrigins error) to gateway-start-failed guides; added pre-exposure security checklist section to VPS deployment guides.
- Start date: 2026-02-26
- End date: 2026-02-26
- Success metric: Build passes with no errors; internal links properly formatted and pointing to existing content.
- Result: pass (build passed + 4 files updated + commit pushed).
- Decision: scale

### EXP-007
- Hypothesis: Adding stale-domain scan into CI quality gate will reduce regression risk of legacy domain references (`openhub.plzbite.top`) before merge.
- Scope: `.github/workflows/content-check.yml` + existing `pnpm check:stale-domain` script
- Change: Inserted dedicated CI step `Stale domain check` running `pnpm check:stale-domain` before taxonomy/frontmatter checks.
- Start date: 2026-02-27
- End date: 2026-02-27
- Success metric: Local build passes and CI workflow now enforces stale-domain scan on push/PR.
- Result: pass (local build passed; workflow includes stale-domain gate).
- Decision: scale

### EXP-008
- Hypothesis: Adding FAQPage schema + visible FAQ snippets on EN/ZH tag archive pages will improve long-tail query matching and rich-result eligibility for tag-intent searches.
- Scope: `src/pages/en/blog/tag/[tag].astro`, `src/pages/zh/blog/tag/[tag].astro`
- Change: Added JSON-LD `FAQPage` (3 Q&A each language) and matching on-page FAQ block to strengthen semantic coverage for each tag page.
- Start date: 2026-02-27
- End date: 2026-02-27
- Success metric: Build passes; tag pages emit valid FAQ JSON-LD and visible FAQ content.
- Result: pass (local `pnpm build` passed; routes generated for EN/ZH tag pages).
- Decision: iterate (track GSC CTR/impressions on tag pages for 7 days).


### EXP-009
- Hypothesis: Weekly roundup templates with built-in FAQ snippets (EN/ZH) plus synchronized quality-check wording will improve rich-result readiness while preventing false-negative content quality failures.
- Scope: `scripts/generate-weekly-roundup.sh`, `scripts/check-weekly-content-quality.sh`, current week EN/ZH weekly pages
- Change: Added FAQ snippet generation in weekly scaffold for both languages; aligned ZH required heading in quality gate with generated template wording.
- Start date: 2026-02-27
- End date: 2026-02-27
- Success metric: `pnpm build` passes and generated weekly EN/ZH pages contain FAQ frontmatter + required sections.
- Result: pass (local build passed; weekly pages generated with FAQ items).
- Decision: scale

### EXP-010
- Hypothesis: Enforcing a numeric scorecard gate for weekly EN/ZH posts in CI (threshold >=20/30) will prevent low-value weekly content from being merged and keep quality aligned with monetization-oriented structure.
- Scope: `scripts/check-weekly-scorecard.sh`, `package.json`, `.github/workflows/content-check.yml`
- Change: Added weekly scorecard script that auto-scores latest EN/ZH weekly posts across six dimensions (intent/actionability/evidence/structure/internal links/differentiation), added `pnpm check:weekly-scorecard`, and wired it into CI.
- Start date: 2026-03-03
- End date: 2026-03-03
- Success metric: Local scorecard gate passes at >=20 for both EN/ZH weekly posts; `pnpm build` remains green after CI workflow update.
- Result: pass (EN=24, ZH=24; build passed).
- Decision: scale

### EXP-011
- Hypothesis: Enforcing frontmatter date consistency in CI (`updatedDate >= pubDate`) will block invalid chronology metadata before merge and reduce SEO trust-risk from incorrect article freshness signals.
- Scope: `scripts/check-frontmatter-dates.sh`, `package.json`, `.github/workflows/content-check.yml`, current EN/ZH weekly posts
- Change: Added date-consistency checker script, npm script `check:frontmatter-dates`, CI gate step, and fixed current weekly posts where `updatedDate` was earlier than `pubDate`.
- Start date: 2026-03-03
- End date: 2026-03-03
- Success metric: `pnpm check:frontmatter-dates` passes and `pnpm build` remains green after gate integration.
- Result: pass (invalid dates detected first, fixed to 2026-03-01 for EN/ZH weekly, then gate + build passed).
- Decision: scale

### EXP-012
- Hypothesis: Adding a CI precheck for duplicate slugs (route-level) and duplicate rendered HTML ids will catch SEO/crawl conflicts before merge with low maintenance overhead.
- Scope: `scripts/check-duplicate-slug-id.mjs`, `package.json`, `.github/workflows/content-check.yml`
- Change: Added `check:duplicate-slug-id` script. It enforces unique slugs per language in `src/content/blog/**` and scans `dist/**/*.html` for duplicate rendered `id` attributes. Wired it into Content Check workflow.
- Start date: 2026-03-03
- End date: 2026-03-03
- Success metric: `pnpm build` + `pnpm check:duplicate-slug-id` both pass; CI includes dedicated duplicate slug/id gate.
- Result: pass (initial source-heading-only approach caused false positives; switched to rendered HTML id scan; final gate passed).
- Decision: scale

### EXP-013
- Hypothesis: Enforcing a minimum of 2 external evidence links in latest EN/ZH weekly posts via CI will reduce unsupported claims and improve weekly content trustworthiness.
- Scope: `scripts/check-weekly-external-evidence.sh`, `package.json`, `.github/workflows/content-check.yml`, latest EN/ZH weekly posts
- Change: Added external evidence gate script (`check:weekly-external-evidence`), wired it into content-check CI, and inserted 3 authoritative external references into both EN/ZH weekly posts.
- Start date: 2026-03-03
- End date: 2026-03-03
- Success metric: `pnpm check:weekly-external-evidence` passes with EN/ZH >=2 external links and `pnpm build` remains green.
- Result: pass (EN=3, ZH=3; gate passed; build passed).
- Decision: scale

### EXP-014
- Hypothesis: Adding an EN/ZH post-level hreflang pair integrity gate in CI will prevent alternate-link drift and reduce cross-language indexing confusion.
- Scope: `scripts/check-hreflang-pairs.sh`, `package.json`, `.github/workflows/content-check.yml`, `dist/en/blog/*`, `dist/zh/blog/*`
- Change: Added `check:hreflang-pairs` script that validates reciprocal `hreflang` + expected alternate `href` + `x-default` for each EN/ZH blog pair after build; wired it into Content Check workflow.
- Start date: 2026-03-03
- End date: 2026-03-03
- Success metric: `pnpm build && pnpm check:hreflang-pairs` passes with all current EN/ZH post pairs validated.
- Result: pass (65 EN/ZH blog pairs validated).
- Decision: scale

### EXP-015
- Hypothesis: Enforcing canonical integrity in CI for all EN/ZH blog output pages will prevent stale-domain regression and URL mismatch (encoded path / wrong host) before merge.
- Scope: `scripts/check-canonical-integrity.sh`, `package.json`, `.github/workflows/content-check.yml`, `dist/en/blog/**/index.html`, `dist/zh/blog/**/index.html`
- Change: Added `check:canonical-integrity` script to validate canonical existence, domain (`kuoo.uk`), and expected encoded path; wired it into Content Check workflow.
- Start date: 2026-03-03
- End date: 2026-03-03
- Success metric: `pnpm build && pnpm check:canonical-integrity` passes with full EN/ZH blog coverage.
- Result: pass (371 blog pages validated).
- Decision: scale

### EXP-016
- Hypothesis: Weekly report中加入“标题改写优先级队列”（高展现低CTR）可缩短从发现问题到执行改写的路径，并提升下周CTR优化执行率。
- Scope: `scripts/generate-seo-weekly-report.sh`, `reports/seo-weekly/seo-weekly-2026-03-02-to-2026-03-08.md`, `WEEKLY_REVIEW.md`
- Change: 在 `weekly:seo` 增加 `collect_title_rewrite_queue`，按曝光/CTR/排名生成 Priority 分数与改写建议；输出新增专门章节并完成本周报告回填。
- Start date: 2026-03-03
- End date: 2026-03-03
- Success metric: `pnpm weekly:seo && pnpm build` 通过，周报中自动产出可执行标题改写队列。
- Result: pass（周报已生成改写优先级表，构建通过）。
- Decision: scale

### EXP-017
- Hypothesis: 在现有 canonical 校验基础上增加“唯一 canonical、绝对 https、无 query/hash、语言路径约束、重复 canonical 检测”可更早阻断跨页 canonical 污染和模板回归。
- Scope: `scripts/check-canonical-integrity.sh`, CI `pnpm check:canonical-integrity`, `dist/en/blog/**`, `dist/zh/blog/**`
- Change: 强化 canonical gate，新增 canonical 标签计数校验、host/协议约束、query/hash 禁止、EN/ZH 路径约束及 canonical 唯一性校验（基于 URL 去重）。
- Start date: 2026-03-03
- End date: 2026-03-03
- Success metric: `pnpm build && pnpm check:canonical-integrity` 通过，输出覆盖页数与唯一 canonical 数一致。
- Result: pass（371 pages validated / 371 unique canonicals）。
- Decision: scale

### EXP-018
- Hypothesis: 在每日文章模板内固定注入 CTA 变体 A/B，并用 CI 校验最新 EN/ZH 日报都包含 CTA 标记，可提升转化位点覆盖率并避免模板回归。
- Scope: `scripts/publish-daily.sh`, `scripts/check-daily-cta-variants.sh`, `package.json`, `.github/workflows/content-check.yml`, latest EN/ZH daily posts
- Change: 为 `publish-daily.sh` 增加 EN/ZH CTA A/B 区块（`CTA_VARIANT_A/B` 标记）；新增 `check:daily-cta` 脚本并接入 content-check CI gate。
- Start date: 2026-03-03
- End date: 2026-03-03
- Success metric: `pnpm check:daily-cta && pnpm build` 通过，最新 EN/ZH 日报均包含 CTA A/B。
- Result: pass（latest EN/ZH daily files validated，build passed）。
- Decision: scale

### EXP-019
- Hypothesis: 将 hreflang 配对校验从“存在性”升级为“绝对 URL 精确匹配（含 x-default）”并统一 BlogPost alternate 输出为绝对 URL，可提前阻断相对路径与跨域部署下的语言页索引漂移。
- Scope: `src/layouts/BlogPost.astro`, `scripts/check-hreflang-pairs.sh`, `dist/en/blog/*`, `dist/zh/blog/*`
- Change: 把 `BlogPost` 的 `alternateUrl` 改为 `${Astro.url.origin}/${otherLang}/blog/${slug}/` 绝对链接；重写 `check-hreflang-pairs.sh`，逐页校验 `hreflang` 对应 `href` 为 `https://kuoo.uk/...` 绝对 URL，并校验 EN/ZH 两侧 `x-default` 一致指向 EN canonical。
- Start date: 2026-03-03
- End date: 2026-03-03
- Success metric: `pnpm build && pnpm check:canonical-integrity && pnpm check:hreflang-pairs` 全通过；输出覆盖 EN/ZH 配对页数量。
- Result: pass（build 通过；canonical 371 页通过；hreflang 65 对通过，且为 absolute alternate URLs）。
- Decision: scale

### EXP-020
- Hypothesis: 在 CI 增加 EN/ZH description 质量闸门（长度区间 + 占位词拦截）可提前阻断低质量摘要回归，提升页面摘要稳定性与可点击性。
- Scope: `scripts/check-meta-description-quality.sh`, `package.json`, `.github/workflows/content-check.yml`, `src/content/blog/en/*.md`, `src/content/blog/zh/*.md`
- Change: 新增 `check:meta-description`（Python 实现）校验 description 字段存在、EN 长度 45-260、ZH 长度 25-130，并拦截 TODO/TBD/coming soon/待补充 等占位词；接入 content-check CI。
- Start date: 2026-03-03
- End date: 2026-03-03
- Success metric: `pnpm check:meta-description && pnpm build` 通过，且输出覆盖校验文件数。
- Result: pass（130 files validated，build passed）。
- Decision: scale

### EXP-021
- Hypothesis: 在 `weekly:seo` 中按语言（EN/ZH）自动输出“高展现低CTR”Top10，可把诊断结果直接映射到语言页改写任务，提升下一步执行效率。
- Scope: `scripts/generate-seo-weekly-report.sh`, `reports/seo-weekly/seo-weekly-2026-03-02-to-2026-03-08.md`, `WEEKLY_REVIEW.md`, `GROWTH_QUEUE.md`
- Change: 新增 `collect_low_ctr_by_language(en|zh)`，在周报输出 EN/ZH Top10 双表；执行 `pnpm weekly:seo` 刷新周报与复盘；任务从 Backlog->Doing->Done 留痕。
- Start date: 2026-03-03
- End date: 2026-03-03
- Success metric: `pnpm weekly:seo && pnpm build` 通过，周报包含 EN/ZH Top10 章节。
- Result: pass（周报含按语言 Top10 输出；构建通过）。
- Decision: scale

### EXP-022
- Hypothesis: Enforcing a minimum FAQ quality gate for blog detail pages (FAQ-enabled posts must include >=2 Q&A with non-empty question/answer) will prevent thin FAQ schema regression and preserve rich-result eligibility quality.
- Scope: `scripts/check-blog-faq-quality.sh`, `package.json`, `.github/workflows/content-check.yml`, `src/content/blog/en/*.md`, `src/content/blog/zh/*.md`
- Change: Added `check:blog-faq` script to validate FAQ frontmatter quality (>=2 Q&A, non-empty question/answer) across EN/ZH blog content and wired it into Content Check CI.
- Start date: 2026-03-03
- End date: 2026-03-03
- Success metric: `pnpm check:blog-faq && pnpm build` passes; CI includes dedicated FAQ quality gate.
- Result: pass（130 files checked, FAQ-enabled posts=6; build passed）.
- Decision: scale


### EXP-023
- Hypothesis: Replacing placeholder text (`fill`) in weekly:seo generated sections (Wins/Problems/Action Plan) with default actionable statements will reduce empty weekly reviews and increase execution follow-through.
- Scope: `scripts/generate-seo-weekly-report.sh`, `reports/seo-weekly/seo-weekly-2026-03-02-to-2026-03-08.md`, `WEEKLY_REVIEW.md`
- Change: Updated weekly generator to emit non-placeholder default wins/problems/action plan items with owner+due placeholders tied to current week end date; regenerated weekly report and review scaffold.
- Start date: 2026-03-03
- End date: 2026-03-03
- Success metric: `pnpm weekly:seo && pnpm build` passes and generated report no longer contains `(fill)` in section 10/11.
- Result: pass (generation/build passed; weekly report and review refreshed with actionable defaults).
- Decision: scale

### EXP-024
- Hypothesis: Adding an automatic GSC data-gap alert (red when consecutive missing days >=3) into weekly SEO report + WEEKLY_REVIEW will surface measurement blind spots earlier and force higher-priority KPI backfill actions.
- Scope: `scripts/generate-seo-weekly-report.sh`, `reports/seo-weekly/seo-weekly-2026-03-02-to-2026-03-08.md`, `WEEKLY_REVIEW.md`, `GROWTH_QUEUE.md`
- Change: Added `collect_gsc_data_gap_alert` to compute max consecutive missing days and weekly missing ratio from `reports/seo/daily/*.md`; integrated alert block into weekly report Section 9 and linked action priority in next-week plan; refreshed WEEKLY_REVIEW observe block with completeness alert context.
- Start date: 2026-03-03
- End date: 2026-03-03
- Success metric: `pnpm weekly:seo && pnpm build` passes; weekly report shows RED/WARN/OK alert state with consecutive missing-day count.
- Result: pass (current week shows 🔴 RED, max consecutive missing days=7; build passed).
- Decision: scale

### EXP-025
- Hypothesis: Enforcing redirect-rule integrity in CI (`public/_redirects`) will prevent accidental SEO-critical redirect regressions (legacy domain mapping, blog canonical path normalization) before merge.
- Scope: `scripts/check-redirect-rules.sh`, `package.json`, `.github/workflows/content-check.yml`, `public/_redirects`
- Change: Added `check:redirect-rules` script to validate required 301/200 rules and block 302 temporary redirects; wired it into content-check CI after FAQ gate.
- Start date: 2026-03-04
- End date: 2026-03-04
- Success metric: `pnpm check:redirect-rules && pnpm build` passes; CI now includes dedicated redirect rules gate.
- Result: pass（redirect rules check + build passed）.
- Decision: scale

### EXP-026
- Hypothesis: Adding a noindex-leak gate for built EN/ZH blog pages will catch accidental `robots/x-robots` noindex regressions before merge and protect indexable article coverage.
- Scope: `scripts/check-noindex-leak.sh`, `package.json`, `.github/workflows/content-check.yml`, `dist/en/blog/**`, `dist/zh/blog/**`
- Change: Added `check:noindex-leak` script to scan built blog HTML pages and fail if any robots/x-robots meta includes `noindex`; integrated the gate into Content Check CI after redirect checks.
- Start date: 2026-03-04
- End date: 2026-03-04
- Success metric: `pnpm build && pnpm check:noindex-leak` passes with full EN/ZH blog coverage and zero noindex findings.
- Result: pass（369 blog pages scanned, 0 noindex leaks; build passed）.
- Decision: scale

### EXP-027
- Hypothesis: Adding an RSS autodiscovery integrity gate in CI for all built EN/ZH HTML pages will prevent feed-link regressions and improve subscription discoverability consistency.
- Scope: `scripts/check-rss-autodiscovery.sh`, `package.json`, `.github/workflows/content-check.yml`, `dist/en/**/*.html`, `dist/zh/**/*.html`
- Change: Added `check:rss-autodiscovery` script to validate each built EN/ZH page contains `rel=alternate` + `type=application/rss+xml` with language-correct RSS href/title; wired it into Content Check CI after noindex leak check.
- Start date: 2026-03-04
- End date: 2026-03-04
- Success metric: `pnpm build && pnpm check:rss-autodiscovery` passes with full EN/ZH page coverage.
- Result: pass（EN 183 pages + ZH 192 pages validated; build passed）.
- Decision: scale


### EXP-028
- Hypothesis: Expanding noindex-leak output with language-level breakdown and sample paths (plus `grep -RIn` fallback when `rg` is unavailable) will reduce triage time and improve diagnostic resilience across heterogeneous CI/dev environments.
- Scope: `scripts/check-noindex-leak.sh`, `GROWTH_QUEUE.md`
- Change: Upgraded noindex leak checker to emit EN/ZH scanned+leak counts and sample leaking files, and added automatic fallback path when `rg` is not installed.
- Start date: 2026-03-04
- End date: 2026-03-04
- Success metric: `pnpm check:noindex-leak && pnpm build` passes, and noindex report prints EN/ZH segmented summary.
- Result: pass（EN 180 scanned, ZH 189 scanned, leaks=0; build passed）.
- Decision: scale

### EXP-029
- Hypothesis: Adding a weekly high-bounce retro proxy queue (high-impression + low-CTR pages with actionable rewrite guidance) into `weekly:seo` will convert blind “复盘占位” into executable tasks and reduce no-op weekly reviews.
- Hypothesis: Shipping bilingual “single-error troubleshooting” posts (e.g., `Cannot find module 'ws'`) with a 4-step copy/paste fix + verifiable done criteria will win long-tail queries and increase organic clicks to /en/blog/* and /zh/blog/*.
  - Target channel: Google organic (long-tail error keyword searches), plus GitHub Issues/Discussions referrals when users paste the link.
  - Expected metric: +20 impressions/day within 14 days on the new slug, CTR >= 2.5%.
  - Observation window: 14 days (check Search Console query rows + internal weekly SEO report).
- Scope: `scripts/generate-seo-weekly-report.sh`, `reports/seo-weekly/seo-weekly-2026-03-02-to-2026-03-08.md`, `WEEKLY_REVIEW.md`, `GROWTH_QUEUE.md`
- Change: Implemented `collect_high_bounce_retro_queue` and injected Section 7 table with owner/due/action fields; updated weekly action plan to include top-2 retro execution task.
- Start date: 2026-03-04
- End date: 2026-03-04
- Success metric: `pnpm weekly:seo && pnpm build` passes, and weekly report includes non-placeholder high-bounce retro queue.
- Result: pass（Section 7 generated with actionable fallback row; build passed）.
- Decision: scale

### EXP-030
- Hypothesis: Enforcing a sitewide EN/ZH hreflang integrity gate (including x-default and absolute kuoo.uk URLs) will catch archive/home/daily alternate-link regressions before merge and reduce cross-language indexing drift.
- Scope: `scripts/check-sitewide-hreflang.sh`, `src/layouts/BaseLayout.astro`, `package.json`, `.github/workflows/content-check.yml`, `dist/en/**/*.html`, `dist/zh/**/*.html`, `GROWTH_QUEUE.md`
- Change: Added `check:sitewide-hreflang` script (Python-backed) to validate en/zh/x-default alternates on all built EN/ZH pages; integrated CI step; patched `BaseLayout` to always output opposite-language alternate link by default when page-level override is absent.
- Start date: 2026-03-04
- End date: 2026-03-04
- Success metric: `pnpm build && pnpm check:sitewide-hreflang` passes with full EN/ZH page coverage.
- Result: pass（sitewide hreflang check passed: 375 pages validated; build passed）.
- Decision: scale

### EXP-031
- Hypothesis: Enforcing absolute `og:image` / `twitter:image` URLs (https://kuoo.uk/...) in CI will prevent social crawler fallback issues caused by relative paths and keep cross-platform preview rendering stable.
- Scope: `scripts/check-social-image-absolute.sh`, `package.json`, `.github/workflows/content-check.yml`, `dist/en/**/*.html`, `dist/zh/**/*.html`, `GROWTH_QUEUE.md`
- Change: Added `check:social-image-absolute` gate to scan built EN/ZH HTML for `og:image` and `twitter:image` meta tags and require absolute `https://kuoo.uk/` URLs; integrated gate into Content Check CI; added `rg` unavailable fallback to `grep` in checker.
- Start date: 2026-03-04
- End date: 2026-03-04
- Success metric: `pnpm build && pnpm check:social-image-absolute` passes with full EN/ZH page coverage and zero relative social-image URLs.
- Result: pass（EN 183 pages + ZH 192 pages validated; build passed）.
- Decision: scale

### EXP-032
- Hypothesis: Enforcing WebSite JSON-LD field integrity (`name/url/inLanguage/publisher/logo`) on all built EN/ZH pages in CI will prevent schema-field regression and keep site-level entity signals stable for crawlers.
- Scope: `scripts/check-website-schema-integrity.sh`, `package.json`, `.github/workflows/content-check.yml`, `dist/en/**/*.html`, `dist/zh/**/*.html`, `GROWTH_QUEUE.md`
- Change: Added `check:website-schema` gate to validate WebSite JSON-LD presence and required fields across built EN/ZH HTML; integrated gate into Content Check CI; implemented `rg` unavailable fallback to `grep -RIn`.
- Start date: 2026-03-04
- End date: 2026-03-04
- Success metric: `pnpm build && pnpm check:website-schema` passes with zero missing required fields.
- Result: pass（全站 EN/ZH 页面校验通过；build passed）.
- Decision: scale

### EXP-033
- Hypothesis: Enforcing tag case-collision checks in CI (same lowercase key with different case variants, e.g. `VPS` vs `vps`) will prevent duplicate/fragmented tag archive routes and keep taxonomy stable.
- Scope: `scripts/check-tag-case-collision.sh`, `package.json`, `.github/workflows/content-check.yml`, `src/content/blog/en/*.md`, `src/content/blog/zh/*.md`
- Change: Added `check:tag-case` gate with frontmatter parser (inline + block list tags), scanned EN/ZH posts for case-collision variants, normalized existing `VPS` tag in one ZH post to `vps`, and integrated the gate into Content Check CI.
- Start date: 2026-03-04
- End date: 2026-03-04
- Success metric: `pnpm check:tag-case && pnpm build` passes with zero case-collision tags.
- Result: pass（130 files scanned, 0 collisions; build passed）.
- Decision: scale

### EXP-034
- Hypothesis: Showing Top10 collision examples (variant + sample file paths) in `check:tag-case` failure output will shorten diagnosis time and reduce fix turnaround when collisions reappear.
- Scope: `scripts/check-tag-case-collision.sh`, `GROWTH_QUEUE.md`
- Change: Upgraded case-collision checker to rank collision keys by reference volume and print Top10 actionable samples per variant; keeps pass behavior unchanged when no collisions exist.
- Start date: 2026-03-04
- End date: 2026-03-04
- Success metric: `pnpm build && pnpm check:tag-case` passes; when collisions exist, output includes ranked Top10 examples for direct repair.
- Result: pass（build passed; tag-case gate passed with 130 files scanned）.
- Decision: scale

### EXP-035
- Hypothesis: Extending stale-domain weekly diagnostics with directory-grouped counts and top samples will reduce triage time and make old-domain cleanup execution-ready instead of raw line dumps.
- Scope: `scripts/scan-stale-domain.sh`, `scripts/generate-seo-weekly-report.sh`, `reports/seo-weekly/stale-domain-alert-2026-03-02-to-2026-03-08.md`, `reports/seo-weekly/seo-weekly-2026-03-02-to-2026-03-08.md`, `WEEKLY_REVIEW.md`, `GROWTH_QUEUE.md`
- Change: Added grouped output (violations/allowed by directory + Top3 samples) in stale-domain scanner and synced weekly report Section 11 to embed grouped table snapshot for faster review.
- Start date: 2026-03-04
- End date: 2026-03-04
- Success metric: `pnpm check:stale-domain && pnpm weekly:seo && pnpm build` passes; weekly report contains directory-grouped stale-domain summary.
- Result: pass（stale-domain check/weekly generation/build passed; grouped tables rendered in alert + weekly report）.
- Decision: scale

### EXP-036
- Hypothesis: Upgrading `check:website-schema` from string-presence checks to strict JSON-LD semantic validation (with language/path consistency and nested `publisher.logo` enforcement) will catch silent schema regressions earlier and reduce production SEO metadata drift.
- Scope: `scripts/check-website-schema-integrity.sh`, `GROWTH_QUEUE.md`, `EXPERIMENT_LOG.md`
- Change: Rewrote schema checker to parse JSON-LD blocks (`@graph` aware), enforce exactly one `WebSite` node per page, validate `name/url/inLanguage/publisher.{name,url,logo}` semantics, require `https://kuoo.uk` host and EN/ZH path-language consistency, and kept `rg` unavailable fallback to `grep -RIn`.
- Start date: 2026-03-04
- End date: 2026-03-04
- Success metric: `pnpm check:website-schema && pnpm build` passes; checker validates all EN/ZH built pages with strict rules.
- Result: pass（strict schema gate passed on 374 EN/ZH HTML pages；build passed）.
- Decision: scale

### EXP-037
- Hypothesis: Printing a ranked Top10 failure sample list in `check:website-schema` output will shorten triage time when schema checks fail, turning noisy logs into immediate fix targets.
- Scope: `scripts/check-website-schema-integrity.sh`, `GROWTH_QUEUE.md`, `EXPERIMENT_LOG.md`
- Change: Added explicit `Top10 failure samples` section in failure path, preserving full issue dump while surfacing first 10 actionable examples; retained existing `rg` -> `grep -RIn` fallback behavior.
- Start date: 2026-03-04
- End date: 2026-03-04
- Success metric: `pnpm check:website-schema && pnpm build` passes, and failure path includes Top10 sample block for faster debugging.
- Result: pass（schema gate + build passed; Top10 block now emitted on failure path）.
- Decision: scale

### EXP-038
- Hypothesis: Adding a 7-day schema-risk trend placeholder to `weekly:seo` will expose observability gaps early and create a direct execution path to integrate schema risk metrics into daily snapshots.
- Scope: `scripts/generate-seo-weekly-report.sh`, `reports/seo-weekly/seo-weekly-2026-03-02-to-2026-03-08.md`, `WEEKLY_REVIEW.md`, `GROWTH_QUEUE.md`
- Change: Added `collect_schema_risk_trend_placeholder` (7-day table), inserted Section 11 schema trend block in weekly report, shifted downstream section numbering, and added explicit action item to integrate `Schema Risk Status/Issues` into `daily:seo` output.
- Start date: 2026-03-04
- End date: 2026-03-04
- Success metric: `pnpm weekly:seo && pnpm build` passes and weekly report includes Section 11 schema-risk trend placeholder with actionable follow-up.
- Result: pass（weekly report + weekly review updated; build passed）.
- Decision: iterate

### EXP-039
- Hypothesis: Auto-collecting schema risk fields in `daily:seo` from `check:website-schema` output will turn weekly Section 11 from placeholder-heavy reporting into measurable daily trend data and reduce blind spots in schema hygiene.
- Scope: `scripts/generate-seo-daily-snapshot.sh`, `reports/seo/daily/2026-03-04.md`, `GROWTH_QUEUE.md`, `EXPERIMENT_LOG.md`
- Change: Extended daily snapshot generator to run schema gate when `dist/en`+`dist/zh` are present, then write `Schema Risk Status/Issues/Source` fields into snapshot output; fixed snapshot template escaping to avoid shell interpolation issues.
- Start date: 2026-03-04
- End date: 2026-03-04
- Success metric: `bash scripts/generate-seo-daily-snapshot.sh 2026-03-04 && pnpm build` passes, and daily snapshot contains non-empty schema risk fields.
- Result: pass（daily snapshot generated with `pass/0/website-schema-gate`; build passed）.
- Decision: scale

### EXP-040
- Hypothesis: Adding explicit daily snapshot input-completeness signals (GSC fields filled + schema readiness + weekly input quality flag) will reduce invalid weekly-report inputs and shorten diagnosis loops.
- Scope: `scripts/generate-seo-daily-snapshot.sh`, `reports/seo/daily/2026-03-04.md`, `GROWTH_QUEUE.md`, `EXPERIMENT_LOG.md`
- Change: Upgraded `daily:seo` to preserve existing manual GSC values, auto-calculate `GSC Required Fields Filled` / `Missing GSC Fields`, compute `Schema Data Readiness`, and emit `Weekly Input Quality Flag` in a new completeness block.
- Start date: 2026-03-04
- End date: 2026-03-04
- Success metric: `pnpm daily:seo && pnpm build` passes, and daily snapshot includes machine-readable completeness hints for weekly generation.
- Result: pass（snapshot now outputs completeness block; build passed）.
- Decision: scale

### EXP-041
- Hypothesis: Surfacing schema-risk weekly aggregates (avg/peak/coverage) directly in weekly report output will improve decision quality versus row-only daily snapshots and reduce false confidence when data coverage is low.
- Scope: `scripts/generate-seo-weekly-report.sh`, `reports/seo-weekly/seo-weekly-2026-03-02-to-2026-03-08.md`, `WEEKLY_REVIEW.md`, `GROWTH_QUEUE.md`
- Change: Added computed `SCHEMA_WEEK_COVERAGE_PCT`, replaced free-text schema aggregate lines with a structured aggregate table (avg/peak/coverage), and updated WEEKLY_REVIEW observe text to include numeric coverage signal.
- Start date: 2026-03-04
- End date: 2026-03-04
- Success metric: `pnpm weekly:seo && pnpm build` passes, and weekly report Section 11 includes explicit aggregate metrics table.
- Result: pending (execution environment currently blocks `exec`, so build/regeneration/verification and git steps are waiting).
- Decision: iterate

### EXP-042
- Hypothesis: 发布“`openclaw status` vs `openclaw gateway status` 区分与5分钟排障流”的中英双语 FAQ，可显著降低“在线不回复”类问题的误判率，并提升该类检索意图的着陆点击与停留质量。
- Scope: `/zh/blog/openclaw-status-vs-gateway-status-difference-and-debug-flow-2026/` + `/en/blog/openclaw-status-vs-gateway-status-difference-and-debug-flow-2026/`
- Change: 新增中英双语教程，提供命令级分层解释、可复制决策流、最小证据包，并加入3篇高相关内链。
- Target channel: Google Search（故障排查长尾词）+ Telegram 社群问题答复引用
- Expected metrics: 7天内目标页 CTR 提升 >=12%，平均参与时长 >=90s，相关问题工单首轮误判率下降 >=20%
- Observation cycle: 7 天（D+1~D+7）
- Start date: 2026-03-05
- End date: 2026-03-12
- Success metric: GSC query CTR/点击、页面参与时长、社群答复一次命中率
- Result: pass（中英双语文章已发布到仓库，`pnpm build` 通过并生成对应 EN/ZH 路由；进入 7 天观测期，待回填 CTR/参与时长/社群一次命中率）
- Decision: iterate（保留页面结构，7 天后按 GSC 与社群数据决定是否扩写 FAQ 与内链锚文本）

### EXP-044
- Hypothesis: 发布“`openclaw channels status --probe` 5分钟定位在线不回复”的中英双语教程，可提升高意图排障词点击质量，并减少社群中错误排障路径（只查 gateway 不查 channel）。
- Scope: `/zh/blog/openclaw-channels-status-probe-no-reply-diagnosis-2026/` + `/en/blog/openclaw-channels-status-probe-no-reply-diagnosis-2026/`
- Change: 新增中英双语 FAQ/教程，加入可复制命令、症状→动作映射、可验证完成清单；各文内加入 3 条高相关内链。
- Target channel: Google Search（OpenClaw Telegram/online-no-reply 长尾词）+ Telegram 社群答疑引用
- Expected metrics: 7 天内目标页 CTR 提升 >=10%，平均参与时长 >=100s，社群同类问题首轮定位成功率提升 >=20%
- Observation cycle: 7 天（D+1~D+7）
- Start date: 2026-03-06
- End date: 2026-03-13
- Success metric: GSC 查询 CTR/点击、GA4 参与时长、社群问题一次定位率
- Result: pass（中英双语内容已落库并完成本轮增长执行，`pnpm build` 通过；生成 EN/ZH 路由并进入 7 天观测期）
- Decision: iterate（保留命令级排障结构；D+7 回填 CTR/参与时长/社群一次定位率后决定是否扩展 FAQ 与内链锚文本）

### EXP-045
- Hypothesis: 发布“`openclaw doctor --fix` vs `--repair` 安全修复”中英双语教程，可降低用户误用 `--force` 导致配置覆盖的风险，并提升 doctor 相关高意图检索点击质量。
- Scope: `/zh/blog/openclaw-doctor-fix-vs-repair-safe-recovery-2026/` + `/en/blog/openclaw-doctor-fix-vs-repair-safe-recovery-2026/`
- Change: 新增中英双语 FAQ/教程，明确 `--fix`=`--repair`、`--force` 风险边界，提供可复制的安全修复流程、验证清单与最小证据包，并加入 4 条高相关内链。
- Target channel: Google Search（doctor/fix/repair/force 长尾检索）+ Telegram 社群排障答疑引用
- Expected metrics: 7 天内目标页 CTR 提升 >=10%，平均参与时长 >=100s，社群中“误用 --force”类问题占比下降 >=20%
- Observation cycle: 7 天（D+1~D+7）
- Start date: 2026-03-07
- End date: 2026-03-14
- Success metric: GSC 查询 CTR/点击、GA4 参与时长、社群问题类型占比
- Result: pass（中英双语文章已落库，`pnpm build` 通过并生成 EN/ZH 路由；进入 7 天观测期）
- Decision: iterate（保留“先 repair 后 force”结构，D+7 回填指标后决定是否扩展对比表与 FAQ）

### EXP-046
- Hypothesis: 发布“OpenClaw Skill 安装后不生效”中英双语教程，可提升技能类高意图检索的点击质量，并降低社群中“装了没反应”的重复排障成本。
- Scope: `/zh/blog/openclaw-skill-not-working-allowlist-fix-2026/` + `/en/blog/openclaw-skill-not-working-allowlist-fix-2026/`
- Change: 新增中英双语 FAQ/教程，提供可复制命令的 3 步排障流程（安装确认/白名单/重启验证），并加入 3 条高相关内链。
- Target channel: Google Search（skills/allowlist/skill not working 长尾词）+ Telegram 社群答疑引用
- Expected metrics: 7 天内目标页 CTR 提升 >=10%，平均参与时长 >=90s，社群同类问题首轮定位成功率提升 >=20%
- Observation cycle: 7 天（D+1~D+7）
- Start date: 2026-03-10
- End date: 2026-03-17
- Success metric: GSC 查询 CTR/点击、GA4 参与时长、社群一次定位率
- Result: pass（2026-03-11 复核 build 通过；EN/ZH 路由生成完毕，进入 7 天观测期）
- Decision: iterate（先观察 7 天检索与社群反馈，再决定是否扩展 FAQ 与内链锚文本）

### EXP-047
- Hypothesis: 为“Skill 安装后不生效”双语教程补齐 FAQ schema（>=3 Q&A）可提升富结果命中率与高意图检索点击质量。
- Scope: `/zh/blog/openclaw-skill-not-working-allowlist-fix-2026/` + `/en/blog/openclaw-skill-not-working-allowlist-fix-2026/`
- Change: 在 EN/ZH 文章 frontmatter 增加 3 条 FAQ（常见原因/白名单位置/是否需要重启），供 FAQPage schema 输出。
- Start date: 2026-03-11
- End date: 2026-03-11
- Success metric: `pnpm build` 通过且 EN/ZH 页面生成 FAQ schema（>=3 条 Q&A）。
- Result: pass（FAQ frontmatter 已添加；build 通过并生成 EN/ZH 路由）。
- Decision: iterate（D+7 回填 CTR/参与时长与 FAQ rich result 覆盖率）。

### EXP-048
- Hypothesis: 对最近24小时新发布的双语 AI/Tech Daily 补强搜索摘要与 CTA 内链，可提升日报页的搜索匹配度、站内继续阅读率和向 OpenClaw 核心指南的导流效率。
- Scope: `/en/blog/openclaw-daily-2026-03-12/` + `/zh/blog/openclaw-daily-2026-03-12/`
- Change: 将 EN/ZH description 从通用“Synced”文案重写为包含当日关键信号（AI+政策/制造业AI/AMD Ryzen AI 400）的可检索摘要；把 CTA 从泛化订阅/咨询文案升级为指向 `what-is-openclaw`、`openclaw-vps-deployment-complete-guide`、`openclaw-model-fallback-strategy` 的强相关内链。
- Start date: 2026-03-12
- End date: 2026-03-12
- Success metric: `pnpm build` 通过；EN/ZH 日报生成成功；两页均含更具体 description 与 3 条高相关转化/延伸内链。
- Result: pass（EN/ZH 日报 description 与 CTA 已升级，`pnpm build` 通过并生成对应路由）。
- Decision: iterate（D+7 回看目标页 CTR、站内下一跳与 OpenClaw 指南页导流点击，决定是否把该模式沉淀到 daily 模板）。

### EXP-049
- Hypothesis: 发布“OpenClaw `web_search` 500：工具同名冲突与参数约束修复”中英双语教程，可提升工具调用故障类高意图检索的点击质量，并减少社群中把 schema 冲突误判为网络/代理问题的排障成本。
- Scope: `/zh/blog/openclaw-web-search-500-tool-conflict-fix-2026/` + `/en/blog/openclaw-web-search-500-tool-conflict-fix-2026/`
- Change: 新增中英双语 FAQ/教程，聚焦 `Parameters of tool web_search must only have these properties:query` 报错，提供可复制命令、3 步止血流程、长期治理建议与 3 条高相关内链。
- Target channel: Google Search（web_search 500 / tool schema conflict 长尾词）+ Telegram/Discord 社群排障答疑引用
- Expected metrics: 7 天内目标页 CTR 提升 >=10%，平均参与时长 >=90s，社群同类问题首轮误判率下降 >=20%
- Observation cycle: 7 天（D+1~D+7）
- Start date: 2026-03-13
- End date: 2026-03-20
- Success metric: GSC 查询 CTR/点击、GA4 参与时长、社群问题一次定位准确率
- Result: pass（中英双语教程已落库；本轮执行完成 `pnpm build` 验证并生成 EN/ZH 路由，覆盖可复制命令、3 步止血流程、长期治理建议与 3 条高相关内链。）
- Decision: iterate（进入 7 天观测期；D+7 回填 CTR / 参与时长 / 社群一次定位准确率，再决定是否扩写 FAQ 与追加锚文本内链。）
