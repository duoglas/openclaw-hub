## EXP-251 — 2026-07-24 latest real cron fixture and Google/LongCat field-level projection recovery
- Hypothesis: 最近24小时新增日报（2026-07-24）暴露 NVIDIA post-training / intelligence-per-dollar、Google Gemini App / AI Overviews / AI Mode 高用量产品面、Claude Science research workbench、ChatGPT Instant/Medium/High model picker 与 Meituan LongCat / AIGC commerce AI 五条信号；若最新日报不进入 real cron fixture 且 EN 页面保留 WAIC token-cost 错配或 LongCat 泛化 fallback，首日索引会漏掉后训练评测闭环、嵌入式 Gemini 分发、科研 Agent、模型档位选择和中国本地生活 AI 商业化长尾入口。
- Scope: `scripts/fixtures/daily-real-cron-2026-07-24.mjs`, `scripts/fixtures/daily-real-cron-fixtures.mjs`, `scripts/lib/source-projection-rules.mjs`, `src/content/blog/en/openclaw-daily-2026-07-24.md`, `src/content/blog/zh/openclaw-daily-2026-07-24.md`, `GROWTH_QUEUE.md`, `EXPERIMENT_LOG.md`
- Change: 新增并注册 2026-07-24 real cron fixture；为 Google Gemini embedded product surface 与 Meituan LongCat AI commerce workflow 增加 fixture-backed display label / detailVariants；重写 2026-07-24 EN/ZH 页面，使双语 Top 5 对齐 NVIDIA post-training、Google Gemini、Claude Science、ChatGPT model picker 与 Meituan LongCat，并移除 WAIC 错配、LongCat 泛化 fallback 与 ZH 实战案例截断。
- ICE: 9x8x8=576
- Start date: 2026-07-24
- End date: 2026-07-24
- Success metric: `pnpm check:latest-daily-real-cron-fixture` 显示 latestDaily=2026-07-24 / latestFixture=2026-07-24 / expectedSignals=5；`pnpm check:daily-source-projection-labels` 覆盖 32 fixtures / 160 expectedSignals；daily EN/ZH generator、bilingual pair fixture、case-level FAQ、source projection registry health/taxonomy、duplicate slug 与 `pnpm build` 全部通过。
- Result: pass（2026-07-24 最新双语日报已由同日 real cron fixture 覆盖；Google Gemini product surface 与 Meituan LongCat commerce AI 输出字段级 projection；EN/ZH 页面已统一信号并移除 WAIC 错配、泛化 fallback 与 ZH 截断；commit `92e5623`；质量评分 28/30。）
- Decision: scale（保留 2026-07-24 fixture 作为后训练评测闭环、嵌入式 Gemini 产品面、科研 Agent、模型档位选择与中国本地生活 AI 商业化信号的首日索引基线；下一步可把 Google embedded product surfaces 或 China commerce AI 从复用规则拆成独立 split target，避免后续产品面信号继续挤占 governed-agent / commercialization ROI 容量。）

## EXP-250 — Governed agent deployment platform split target
- Hypothesis: EXP-249 已把 OpenAI Presence governed enterprise agent deployment 接入最新 fixture，但 `enterprise-agent-platforms` 仍同时承载通用企业平台、受治理运行时、团队协作 Agent 与部署生态；若不拆出 `governed-agent-deployment-platforms`，后续带权限、状态、后台执行、人类接管、审计与共享协作边界的 Agent runtime 信号会继续挤占通用企业 Agent 平台容量。
- Scope: `scripts/check-source-projection-rule-taxonomy.mjs`, `scripts/lib/source-projection-rules.mjs`, `GROWTH_QUEUE.md`, `EXPERIMENT_LOG.md`
- Change: enterprise-agents scaffold 新增 `governed-agent-deployment-platforms` split target、预算、migration hint 与 self-test 期望；将 OpenAI Partner Network / Presence、Google Gemini Interactions API 与 Anthropic Claude Tag 从 `enterprise-agent-platforms` 迁入新 governed deployment target；同步 capacityPlan 的 selectedSplitTarget、budgetImpact、whyNotAlternatives 与 rejectedAlternateTargets。
- ICE: 8x8x8=512
- Start date: 2026-07-23
- End date: 2026-07-23
- Success metric: `pnpm check:source-projection-rule-taxonomy` 显示 `enterprise-agent-platforms=3/6`、`governed-agent-deployment-platforms=3/4`、`split target categories: 48/48 used`、parentFallback=0、unmatched=0；source projection registry health、daily source projection labels 与 `pnpm build` 全部通过。
- Result: pass（OpenAI Presence/Partner Network、Gemini Interactions API 与 Claude Tag 已迁入 governed-agent-deployment-platforms；通用 enterprise-agent-platforms 从 6/6 回落到 3/6，新 target 为 3/4；taxonomy、registry health、daily source labels 与 build 通过；commit `691b40d`；质量评分 28/30。）
- Decision: scale（保留 governed-agent-deployment-platforms 作为后续权限、状态、后台执行、人类接管、审计与共享协作类企业 Agent runtime 的独立容量入口；下一步可继续拆分 robotics-open-model-research 或 cloud-agent-runtime-infrastructure 的满额容量。）

## EXP-249 — 2026-07-23 latest real cron fixture and field-level projection recovery
- Hypothesis: 最近24小时新增日报（2026-07-23）暴露 OpenAI Presence 企业 Agent 生产部署、OpenAI/Hugging Face 模型网络安全评测事件、NVIDIA Blackwell NVL72 每瓦性能、NVIDIA Nemotron 开放模型 ownership 与 WAIC 端侧 AI / 具身智能 / 国产算力五条信号；若最新日报不进入 real cron fixture 且 EN 页面保留 OpenAI/Nemotron 泛化 fallback，首日索引会漏掉可控企业 Agent、AI cyber-eval 沙箱治理、AI factory 能效、开放模型可控栈和中国端侧/具身/国产算力长尾入口。
- Scope: `scripts/fixtures/daily-real-cron-2026-07-23.mjs`, `scripts/fixtures/daily-real-cron-fixtures.mjs`, `scripts/lib/source-projection-rules.mjs`, `src/content/blog/en/openclaw-daily-2026-07-23.md`, `GROWTH_QUEUE.md`, `EXPERIMENT_LOG.md`
- Change: 新增并注册 2026-07-23 real cron fixture；为 OpenAI Presence governed enterprise agent deployment、OpenAI/Hugging Face model cyber-evaluation incident、Blackwell NVL72 performance-per-watt、Nemotron open model ownership 与 WAIC edge/embodied/domestic compute 增加 fixture-backed label/detailVariants；重写 EN 2026-07-23 页面，移除 OpenAI/Nemotron 泛化 fallback，并补齐 governed enterprise agent deployment 与 cyber-evaluation sandbox hardening Case-Level FAQ。
- ICE: 9x8x8=576
- Start date: 2026-07-23
- End date: 2026-07-23
- Success metric: `pnpm check:latest-daily-real-cron-fixture` 显示 latestDaily=2026-07-23 / latestFixture=2026-07-23 / expectedSignals=5；`pnpm check:daily-source-projection-labels` 覆盖 31 fixtures / 155 expectedSignals；daily EN/ZH generator、bilingual pair fixture、case-level FAQ、source projection registry health/taxonomy、duplicate slug 与 `pnpm build` 全部通过。
- Result: pass（2026-07-23 最新双语日报已由同日 real cron fixture 覆盖；OpenAI Presence、OpenAI/Hugging Face cyber-eval incident、Blackwell 每瓦性能、Nemotron ownership 与 WAIC 端侧/具身/国产算力均输出字段级 projection；EN 页面移除泛化 fallback 并补齐 Case-Level FAQ；commit `cfcfbec`；质量评分 28/30。）
- Decision: scale（保留 2026-07-23 fixture 作为企业 Agent 生产部署、AI cyber-eval 安全沙箱、AI factory 能效、开放模型 ownership 与中国端侧/具身/国产算力的首日索引基线；下一步可继续拆分 enterprise-agent-platforms 或 robotics-open-model-research 的满额容量，避免后续只能复用既有规则。）

## EXP-248 — Tag archive URL-safe slug guardrail
- Hypothesis: `fetch failed`、`409 conflict` 等 troubleshooting 标签当前会生成含空格 tag archive URL；若 tag archive 改为规范化 URL-safe slug，并在构建产物层增加检查，可提升站点地图、内链与长尾聚合页的索引稳定性。
- Scope: `src/pages/en/blog/tag/[tag].astro`, `src/pages/zh/blog/tag/[tag].astro`, `src/layouts/BlogPost.astro`, `scripts/check-tag-route-slugs.mjs`, `package.json`, `GROWTH_QUEUE.md`, `EXPERIMENT_LOG.md`
- Change: EN/ZH tag archive getStaticPaths 改为输出 normalized slug，页面保留原始标签展示；文章页 tag 内链改为 slugified URL；新增 `check:tag-route-slugs`，同时校验 frontmatter tag 到 URL-safe route 的映射和 dist 中对应 `index.html` 存在。
- ICE: 8x8x8=512
- Start date: 2026-07-22
- End date: 2026-07-22
- Success metric: `pnpm build` 成功；`pnpm check:tag-route-slugs` 输出 `390 files map to 299 URL-safe tag archive routes`；tag canonical aliases 与 duplicate slug/id checks 均通过；dist tag 目录无空格 / `%20` route。
- Result: pass（tag archive 不再用原始空格标签作为 URL；`fetch failed` / `409 conflict` 归档页收敛为 `fetch-failed` / `409-conflict`；构建与三项 tag/slug 闸门全部通过；commit `cfcfbec`；质量评分 28/30。）
- Decision: scale（将 `check:tag-route-slugs` 纳入后续 tag/SEO 质量检查，下一步可继续把 tag route slug helper 抽成共享模块，减少 Astro getStaticPaths 与页面运行时的重复实现。）

### EXP-247
- Hypothesis: 最近24小时新增日报（2026-07-22）暴露 OpenAI GPT-5.6 Sol/Terra/Luna on Bedrock、Claude Fable/Mythos export-control safety availability、Claude Fable on Amazon Bedrock、AWS FDE 10 亿美元部署组织与 NVIDIA GB300 performance-per-watt 五条信号；若最新日报不进入 real cron fixture 且 EN 页面保留 GPT-5.5 Bedrock、Claude/Fable 泛化和 AgentPerf fallback，首日索引会漏掉云上模型组合治理、模型安全访问恢复、Bedrock Claude 部署和 AI factory 能耗效率长尾入口。
- Scope: `scripts/fixtures/daily-real-cron-2026-07-22.mjs`, `scripts/fixtures/daily-real-cron-fixtures.mjs`, `scripts/lib/source-projection-rules.mjs`, `src/content/blog/en/openclaw-daily-2026-07-22.md`, `GROWTH_QUEUE.md`, `EXPERIMENT_LOG.md`
- Change: 新增并注册 2026-07-22 real cron fixture；为 Bedrock GPT-5.6、Claude Fable export-control safety、Claude Fable Bedrock 和 NVIDIA performance-per-watt 增加字段级 display label/detailVariants；重写 2026-07-22 EN 日报 Top 5 / Evidence Matrix，移除 GPT-5.5 Bedrock、Claude 泛化、AgentPerf fallback，并补齐 Bedrock model portfolio 与 Claude safety fallback Case-Level FAQ。
- ICE: 9x8x8=576
- Start date: 2026-07-22
- End date: 2026-07-22
- Success metric: `pnpm check:latest-daily-real-cron-fixture` 显示 latestDaily=2026-07-22 / latestFixture=2026-07-22 / expectedSignals=5；`pnpm check:daily-source-projection-labels` 覆盖 30 fixtures / 150 expectedSignals；daily EN/ZH generator、bilingual pair fixture、case-level FAQ、source projection registry health/taxonomy 与 `pnpm build` 全部通过。
- Result: pass（2026-07-22 最新双语日报已由同日 real cron fixture 覆盖；Bedrock GPT-5.6、Claude Fable safety availability、Claude Fable Bedrock、AWS FDE 与 NVIDIA performance-per-watt 均输出字段级 projection；EN 页面移除泛化 fallback 并补齐 Case-Level FAQ；commit `(this commit)`；质量评分 28/30。）
- Decision: scale（保留 2026-07-22 fixture 作为模型云分发治理、Claude 安全访问恢复、Bedrock fallback 与 AI factory 能效效率的首日索引基线；下一步可继续收敛 build 阶段 duplicate id warning，避免 daily collection 警告长期存在。）

### EXP-246
- Hypothesis: `ai-infrastructure-capacity` 已满额且混合了云端训练运行时、端侧/混合算力、芯片供应链、TOP500 与 AI for Science；若按采购意图拆成三个有效容量桶，可释放 headroom，并让后续基础设施日报获得稳定、可解释的字段归属。
- Scope: `scripts/lib/source-projection-rules.mjs`, `scripts/check-source-projection-rule-taxonomy.mjs`, `GROWTH_QUEUE.md`, `EXPERIMENT_LOG.md`
- Change: 将 9 条 `ai-infrastructure-capacity` 规则迁入 `cloud-training-runtime-infrastructure`（5）、`edge-hybrid-compute-infrastructure`（2）、`hpc-science-compute-infrastructure`（2）；替换旧 target 的 allowed list、budgets、recommendations、migration hints 与 self-test 期望。
- ICE: 8x8x8=512
- Start date: 2026-07-21
- End date: 2026-07-21
- Success metric: 三个新 target 分别保留至少 1 个 headroom；47/47 split targets used；taxonomy、registry health、daily labels、双语 fixtures、Case-Level FAQ 与 build 全部通过。
- Result: pass（九条基础设施规则已按采购意图迁入三个独立 target；`cloud-training-runtime-infrastructure=5/6`、`edge-hybrid-compute-infrastructure=2/3`、`hpc-science-compute-infrastructure=2/3`；47/47 split targets used，parentFallback=0、unmatched=0；taxonomy、registry health、daily labels、双语 fixtures、Case-Level FAQ 与 build 全部通过；commit `(this commit)`；质量评分 28/30。）
- Decision: scale（后续云端训练/运行时、端侧/混合算力和 HPC/AI for Science 信号分别进入独立容量，不再恢复宽泛 `ai-infrastructure-capacity`。）

### EXP-245
- Hypothesis: Qoder agentic coding 与 Kimi K3 百万 token 开放模型复用 `alibaba-qoder-agentic-coding-platform-2026`，使 developer-tools 保留 unmatched 且 Kimi 的模型归属失真；若拆成 China code-agent runtime 与 open-model long-context 独立规则，可降低 taxonomy 噪声并为后续中国代码 Agent / 长上下文开放模型信号预留容量。
- Scope: `scripts/lib/source-projection-rules.mjs`, `scripts/check-source-projection-rule-taxonomy.mjs`, `scripts/fixtures/daily-real-cron-2026-07-18.mjs`, `GROWTH_QUEUE.md`, `EXPERIMENT_LOG.md`
- Change: Qoder rule 收窄为代码库理解、Quest Mode 与异步任务委托，并迁入 `china-code-agent-runtime`；新增 `moonshot-kimi-k3-long-context-open-model-2026`，承载 Kimi K3 2.8T / 百万 token / Kimi Code 字段级 projection，并迁入 `open-model-long-context`；同步更新 split recommendations、budgets、migration hints 与 07-18 fixture。
- ICE: 8x8x8=512
- Start date: 2026-07-21
- End date: 2026-07-21
- Success metric: developer-tools unmatched=0；split target categories 45/45 used；registry health、daily source projection labels、taxonomy 与 `pnpm build` 全部通过。
- Result: pass（Qoder 与 Kimi K3 已拆成独立规则和 split targets；developer-tools unmatched 收敛为 0；45/45 split targets used；taxonomy、registry health、daily labels、双语生成、Case-Level FAQ 与 build 全部通过；commit `(this commit)`；质量评分 28/30。）
- Decision: scale（保留 China code-agent runtime 与 open-model long-context 作为后续 Qoder / Kimi / 国产代码 Agent / 百万 token 开放模型信号的独立容量入口。）

### EXP-244
- Hypothesis: EXP-243 已建议把 supply-chain-cost-pressure 与 high-sensitivity-ai-deployment 继续拆出 token-economics / agent-runtime-safety split target；若 WAIC token-cost optimization 继续占用硬件供应链成本桶、WAIC agent safety evaluation 继续占用高敏行业部署桶，后续模型路由、缓存计费、算电协同、运行期审计和风险监测信号会继续触发满额容量诊断而不是低风险分流。
- Scope: `scripts/check-source-projection-rule-taxonomy.mjs`, `scripts/lib/source-projection-rules.mjs`, `GROWTH_QUEUE.md`, `EXPERIMENT_LOG.md`
- Change: market-intelligence scaffold 新增 `token-economics-optimization` split target、预算与 migration hint；product-safety scaffold 新增 `agent-runtime-safety` split target、预算与 migration hint；将 `china-waic-token-cost-optimization-2026` 从 `supply-chain-cost-pressure` 迁入 token economics，将 `china-waic-agent-safety-evaluation-2026` 从 `high-sensitivity-ai-deployment` 迁入 runtime safety，并同步相关 capacityPlan headroom。
- ICE: 8x8x8=512
- Start date: 2026-07-21
- End date: 2026-07-21
- Success metric: `pnpm check:source-projection-rule-taxonomy` 输出 `split target categories: 43/43 used`，并显示 `supply-chain-cost-pressure=1/2`、`token-economics-optimization=1/2`、`high-sensitivity-ai-deployment=2/3`、`agent-runtime-safety=1/2`；`pnpm check:source-projection-rule-registry-health`、`pnpm check:daily-source-projection-labels` 与 `pnpm build` 全部通过。
- Result: pass（WAIC token-cost optimization 已迁入 token-economics-optimization；WAIC agent safety evaluation 已迁入 agent-runtime-safety；硬件供应链成本桶与高敏部署桶各释放 1 个 headroom；taxonomy、registry health、daily source labels 与 build 通过；commit `(this commit)`；质量评分 28/30。）
- Decision: scale（保留 token economics 与 agent runtime safety 作为后续模型路由、缓存计费、算电协同、运行期审计和风险监测信号的独立容量入口；下一步可把 developer-tools unmatched 的 Qoder / Kimi 复用规则拆成 China code-agent runtime / open-model long-context 子目标。）

### EXP-243
- Hypothesis: 最近24小时新增日报（2026-07-20/2026-07-21）暴露 WAICO governance coordination、WAIC agent governance boundaries、NVIDIA post-training、Gemini Interactions API、Apple/Broadcom US chip supply chain、NVIDIA LeRobot/Vera CPU/Claude Azure GB300、WAIC token-cost optimization 与 WAIC agent safety evaluation；若最新日报不进入 real cron fixture 且 EN 页面保留 WAIC/TPU/L2 泛化 fallback，首日索引会漏掉 agent runtime、token cost、runtime audit 与 chip supply-chain 长尾入口。
- Scope: `scripts/fixtures/daily-real-cron-2026-07-20.mjs`, `scripts/fixtures/daily-real-cron-2026-07-21.mjs`, `scripts/fixtures/daily-real-cron-fixtures.mjs`, `scripts/lib/source-projection-rules.mjs`, `scripts/check-source-projection-rule-taxonomy.mjs`, `src/content/blog/en/openclaw-daily-2026-07-20.md`, `src/content/blog/en/openclaw-daily-2026-07-21.md`, `GROWTH_QUEUE.md`, `EXPERIMENT_LOG.md`
- Change: 新增并注册 2026-07-20/07-21 real cron fixtures；补齐 WAIC agent governance boundaries、NVIDIA post-training infrastructure、Gemini Interactions API agent runtime、Apple/Broadcom US chip supply chain、WAIC token-cost optimization 与 WAIC agent safety evaluation 字段级 projection；将 07-21 token cost / safety 信号分流到 supply-chain-cost-pressure 与 high-sensitivity-ai-deployment，并更新 taxonomy budgets / migration hints；同步重写 07-20/07-21 EN 页面，移除 WAIC/TPU/L2 泛化 fallback 并补齐 Case-Level FAQ。
- ICE: 9x8x8=576
- Start date: 2026-07-21
- End date: 2026-07-21
- Success metric: `pnpm check:latest-daily-real-cron-fixture` 显示 latestDaily=2026-07-21 / latestFixture=2026-07-21 / expectedSignals=5；`pnpm check:daily-source-projection-labels` 覆盖 29 fixtures / 145 expectedSignals；source projection registry health/taxonomy、daily EN/ZH generator、bilingual pair fixture、case-level FAQ 与 `pnpm build` 全部通过。
- Result: pass（2026-07-20/07-21 最新双语日报已由同日 real cron fixtures 覆盖；WAIC governance/agent safety、Gemini agent runtime、NVIDIA post-training/Vera CPU、Claude Azure GB300、Apple/Broadcom 与 WAIC token-cost signals 均输出字段级 projection；EN 页面移除泛化 fallback；commit `(this commit)`；质量评分 28/30。）
- Decision: scale（保留 latest fixture freshness 与 token-cost / agent-safety projection 作为首日索引质量基线；下一步可把 supply-chain-cost-pressure 与 high-sensitivity-ai-deployment 继续拆出 token-economics / agent-runtime-safety split target，避免满额后继续临时扩容。）

### EXP-242
- Hypothesis: EXP-241 已建议继续把 `china-ai-industry-report-l3` 中 WAIC product launch pipeline 与 172 场会议 agenda 拆成独立 WAIC product-launch / WAIC agenda split target；若继续由 market-sizing-reports 复用承载，WAIC 大会期间产品首发、产业/人才/算力议程与 L3 规模报告会继续混在同一容量桶，增加 source projection 规则漂移和诊断噪声。
- Scope: `scripts/check-source-projection-rule-taxonomy.mjs`, `scripts/lib/source-projection-rules.mjs`, `scripts/fixtures/daily-real-cron-2026-07-14.mjs`, `scripts/fixtures/daily-real-cron-2026-07-18.mjs`, `GROWTH_QUEUE.md`, `EXPERIMENT_LOG.md`
- Change: market-intelligence scaffold 新增 `waic-product-launch-pipeline` 与 `waic-industry-agenda` split targets、预算与 migration hints；新增 `china-waic-product-launch-pipeline-2026` 与 `china-waic-industry-talent-compute-agenda-2026` 两条独立 source projection rules；从 `china-ai-industry-report-l3` 移除 300+ product launch 与 172 场会议 agenda label/terms/detailVariants，使其只保留 L3 market-sizing 与 WAIC official preview watchpoint。
- ICE: 8x8x8=512
- Start date: 2026-07-20
- End date: 2026-07-20
- Success metric: `pnpm check:source-projection-rule-registry-health` 显示 `waic-product-launch-pipeline=1`、`waic-industry-agenda=1`；`pnpm check:source-projection-rule-taxonomy` 显示 `split target categories: 40/40 used`；`pnpm check:daily-source-projection-labels` 保持 `fixtures=27, expectedSignals=135`；`pnpm build` 通过。
- Result: pass（WAIC product launch pipeline 与 industry/talent/compute agenda 已从 `china-ai-industry-report-l3` 拆出独立 split targets；07-14 / 07-18 fixtures 已改为独立规则；L3 规则回收为 market-sizing / official preview；commit `(this commit)`；质量评分 28/30。）
- Decision: scale（保留 WAIC product / agenda / governance 三轨 projection；下一步可为 market-intelligence 中仍 unmatched 的 memory price / consumer electronics cost 新增 supply-chain cost split target，进一步清理 market-intelligence taxonomy 诊断噪声。）

### EXP-241
- Hypothesis: EXP-240 已建议继续将 WAIC governance 与 WAIC industry/talent/compute agenda 拆成更细治理/产业双轨 projection；若 `china-world-ai-cooperation-organization-2026` 继续复用 `172 场会议` 产业议程 label/detail，WAIC 大会期间全球治理协调、世界人工智能合作组织与产业/人才/算力 market-intelligence 信号会在 source projection 层交叉污染。
- Scope: `scripts/lib/source-projection-rules.mjs`, `scripts/check-daily-source-projection-labels.mjs`, `GROWTH_QUEUE.md`, `EXPERIMENT_LOG.md`
- Change: 从 `china-world-ai-cooperation-organization-2026` 移除 `172 场会议` displayLabel、terms 与 detailVariant，让 governance rule 只承载 WAIC governance conference / WAICO 协调；保留 `china-ai-industry-report-l3` 中 WAIC product launch 与 industry talent compute agenda 的 market-intelligence detail；并在 daily source projection label check 增加 WAIC governance vs industry 双轨 synthetic regression。
- ICE: 8x8x8=512
- Start date: 2026-07-19
- End date: 2026-07-19
- Success metric: `pnpm check:daily-source-projection-labels` 输出 `fixtures=27, expectedSignals=135`，并验证 WAIC governance source 输出 `China / WAIC / AI governance conference`、WAIC 172 场会议 agenda source 输出 `China / WAIC / industry talent compute agenda`；`pnpm check:source-projection-rule-registry-health`、`pnpm check:source-projection-rule-taxonomy` 与 `pnpm build` 全部通过。
- Result: pass（WAIC governance rule 已不再匹配产业/人才/算力 agenda；WAIC 172 场会议 agenda 保留在 market-intelligence projection；新增 synthetic regression 阻断两条 WAIC projection 再次互相污染；commit `be7bc35`；质量评分 28/30。）
- Decision: scale（保留 WAIC governance / industry 双轨 label guardrail；下一步可把 `china-ai-industry-report-l3` 中 WAIC product launch pipeline 与 172 场会议 agenda 拆成独立 WAIC product-launch / WAIC agenda split target，减少 market-sizing-reports 内部复用。）

### EXP-240
- Hypothesis: 最近24小时新增日报（2026-07-19）暴露 WAIC 全球治理主席声明 / 世界人工智能合作组织、NVIDIA intelligence-per-dollar 后训练成本框架、Jetson / IGX T3000 与 Jetson T2000 端侧机器人模块、Claude Fable 5 访问恢复与 jailbreak severity framework、ChatGPT Instant/Medium/High 模型选择器；若最新日报不进入 real cron fixture 且 EN 页面保留 WAIC L3、Qoder/NemoClaw、Jetson/Claude 泛化 fallback，首日索引会漏掉 AI 治理协作、agent 后训练成本、端侧机器人算力、模型安全发布门禁和任务型模型选择长尾入口。
- Scope: `scripts/fixtures/daily-real-cron-2026-07-19.mjs`, `scripts/fixtures/daily-real-cron-fixtures.mjs`, `scripts/lib/source-projection-rules.mjs`, `src/content/blog/en/openclaw-daily-2026-07-19.md`, `src/content/blog/zh/openclaw-daily-2026-07-19.md`, `GROWTH_QUEUE.md`, `EXPERIMENT_LOG.md`
- Change: 新增并注册 2026-07-19 real cron fixture；让 WAIC governance story 命中 `china-world-ai-cooperation-organization-2026` 而非 `china-ai-industry-report-l3` 宽词 fallback；同步重写 EN/ZH 2026-07-19 页面，输出 WAIC governance、NVIDIA post-training、Jetson Thor edge modules、Claude Fable jailbreak severity 与 ChatGPT task-based picker 字段级详情；补齐 ChatGPT task-based model picker 与 Agent post-training cost loop Case-Level FAQ。
- ICE: 9x8x8=576
- Start date: 2026-07-19
- End date: 2026-07-19
- Success metric: `pnpm check:latest-daily-real-cron-fixture` 输出 `latestDaily=2026-07-19, latestFixture=2026-07-19, fixtureLagDays=0, expectedSignals=5`；`pnpm check:daily-source-projection-labels` 输出 `fixtures=27, expectedSignals=135`；daily EN/ZH generator、bilingual pair fixture、case FAQ、source projection registry health/taxonomy 与 `pnpm build` 全部通过。
- Result: pass（2026-07-19 最新双语日报已由同日 real cron fixture 覆盖；WAIC governance、NVIDIA post-training、Jetson Thor modules、Claude Fable safety framework 与 ChatGPT model picker 均输出字段级 projection；EN 页面移除泛化 fallback 并补齐 Case-Level FAQ；ZH 页面移除重复截断证据矩阵；commit `(this commit)`；质量评分 28/30。）
- Decision: scale（保留 2026-07-19 fixture 作为 AI governance coordination、agent 后训练成本、端侧机器人模块、模型安全发布门禁和任务型模型选择器的首日索引质量基线；下一步可继续将 WAIC governance 与 WAIC industry/talent/compute agenda 拆成更细治理/产业双轨 projection，避免大会期间宽词互相污染。）

### EXP-239
- Hypothesis: EXP-238 已建议优先补齐 2026-07-18 latest real cron fixture；若 07-18 最新日报不进入 real cron fixture 且 EN 页面保留 Kimi / NVIDIA / WAIC / MIIT 泛化 fallback，首日索引会漏掉 Kimi K3 长上下文开放模型、NVIDIA agentic AI 后训练基础设施、WAIC 产业/人才/算力议程和中小企业 AI 赋能长尾入口。
- Scope: `scripts/fixtures/daily-real-cron-2026-07-18.mjs`, `scripts/fixtures/daily-real-cron-fixtures.mjs`, `scripts/lib/source-projection-rules.mjs`, `src/content/blog/en/openclaw-daily-2026-07-18.md`, `GROWTH_QUEUE.md`, `EXPERIMENT_LOG.md`
- Change: 新增并注册 2026-07-18 real cron fixture；复用 existing source projection rules 增加 Kimi K3 long-context open model、NVIDIA post-training / NeMo RL / intelligence-per-dollar、WAIC 172 场会议产业/人才/算力议程、MIIT 中小企业“小快轻准”AI 赋能字段级 display label 与 detailVariants；同步重写 EN 2026-07-18 页面，移除 Kimi / MIIT 泛化 fallback，并新增 Kimi long-context research workflow 与 Agent post-training evaluation loop 的 Case-Level FAQ。
- ICE: 9x8x8=576
- Start date: 2026-07-18
- End date: 2026-07-18
- Success metric: `pnpm check:latest-daily-real-cron-fixture` 输出 `latestDaily=2026-07-18, latestFixture=2026-07-18, fixtureLagDays=0, expectedSignals=5`；`pnpm check:daily-source-projection-labels` 输出 `fixtures=26, expectedSignals=130`；daily EN/ZH generator、bilingual pair fixture、case FAQ、source projection registry health/taxonomy 与 `pnpm build` 全部通过。
- Result: pass（2026-07-18 最新双语日报已由同日 real cron fixture 覆盖；Kimi K3、NVIDIA post-training、WAIC industry/talent/compute agenda 与 MIIT SME AI enablement 均输出字段级 projection；EN 页面移除泛化 fallback 并补齐 Case-Level FAQ；commit `(this commit)`；质量评分 28/30。）
- Decision: scale（保留 2026-07-18 fixture 作为长上下文开放模型、agent 后训练基础设施、中国 AI 产业/人才/算力议程和中小企业 AI 赋能的首日索引质量基线；下一步可把 Kimi/K3 从 Qoder 复用 rule 拆成独立 China open-model long-context split target，降低 developer-tools unmatched 诊断噪声。）

### EXP-238
- Hypothesis: EXP-237 已把中国商业化 ROI 从 market-sizing-reports 拆出，但 regional-ai-ecosystems 仍同时承载 Anthropic Canada 研究资助、Anthropic Korea 办公室/客户生态、Amazon RAISE US 劳动力培训与上海硬科技；若不继续拆分，后续区域研究、办公室扩张、技能培训与城市硬科技信号会继续挤在同一 split target，增加容量诊断噪声和宽词误分流。
- Scope: `scripts/check-source-projection-rule-taxonomy.mjs`, `scripts/lib/source-projection-rules.mjs`, `scripts/fixtures/daily-real-cron-2026-07-17.mjs`, `GROWTH_QUEUE.md`, `EXPERIMENT_LOG.md`
- Change: market-intelligence scaffold 新增 `regional-research-ecosystems`、`regional-office-expansion`、`workforce-ai-enablement` 三个 split target、effective budget 与 migration hints；Anthropic Canada 从 Korea 复用 rule 拆出独立研究生态 projection；Anthropic Korea 迁入 office expansion；Amazon RAISE US 迁入 workforce enablement，并同步更新 structured capacityPlan 与 07-17 fixture 的 expected rule match。
- ICE: 8x8x8=512
- Start date: 2026-07-18
- End date: 2026-07-18
- Success metric: `pnpm check:source-projection-rule-taxonomy` 输出 `split target categories: 38/38 used`，并显示 `regional-ai-ecosystems=1/4`、`regional-research-ecosystems=1/2`、`regional-office-expansion=1/2`、`workforce-ai-enablement=1/2`；`pnpm check:source-projection-rule-registry-health`、`pnpm check:daily-source-projection-labels` 与 `pnpm build` 全部通过。
- Result: pass（regional-ai-ecosystems 已从 3/4 回落到 1/4；Anthropic Canada、Anthropic Korea 与 Amazon RAISE US 已分别迁入 research / office / workforce 三个子目标；taxonomy、registry health、daily source labels 与 build 通过；commit `(this commit)`；质量评分 28/30。）
- Decision: scale（保留 research / office / workforce 三个 regional 子目标作为后续区域 AI 生态信号的低风险容量入口；下一步优先补齐 2026-07-18 latest real cron fixture，恢复 latest fixture freshness 闸门。）

### EXP-237
- Hypothesis: EXP-236 已把 2026-07-17 WorkBuddy / 豆包商业化信号接入字段级 projection，但仍复用 `china-ai-industry-report-l3` 与 `market-sizing-reports`；若不拆出独立商业化 ROI split target，后续 paid-plan、ROI、企业采用类信号会继续和 WAIC / 产业规模报告混在同一规则，增加宽词污染与容量诊断噪声。
- Scope: `scripts/check-source-projection-rule-taxonomy.mjs`, `scripts/lib/source-projection-rules.mjs`, `GROWTH_QUEUE.md`, `EXPERIMENT_LOG.md`
- Change: market-intelligence 新增 `ai-commercialization-roi` split target、effective budget、migration hint 与 scaffold self-test；新增 `china-ai-commercialization-roi-2026` 独立 source projection rule；从 `china-ai-industry-report-l3` 移除 WorkBuddy / ROI label、terms 与 detailVariant，使 market-sizing-reports 回收为 WAIC / 产业规模报告；同时将商业化规则 terms 从 `ROI` 宽词收窄为 WorkBuddy / 豆包 / 付费计划 / 商业化测试，避免 06-08 AWS/OpenAI story label 漂移。
- ICE: 8x8x8=512
- Start date: 2026-07-17
- End date: 2026-07-17
- Success metric: `pnpm check:source-projection-rule-taxonomy` 输出 `split target categories: 35/35 used`、`ai-commercialization-roi=1/2`、`market-sizing-reports=2/3`；`pnpm check:source-projection-rule-registry-health`、`pnpm check:daily-source-projection-labels`、`pnpm check:latest-daily-real-cron-fixture`、`pnpm check:daily-generator-real-cron-fixture` 与 `pnpm build` 全部通过。
- Result: pass（WorkBuddy / 豆包商业化 ROI 已从 China market-sizing L3 规则拆出独立 ai-commercialization-roi split target；market-sizing-reports 回收为 WAIC / 产业规模报告；ROI 宽词误命中 06-08 AWS/OpenAI story 的 label 漂移已修复；commit `(this commit)`；质量评分 28/30。）
- Decision: scale（保留 ai-commercialization-roi 作为中国 AI 付费计划、企业 ROI 与商业化采用信号的独立容量入口；下一步可继续把 regional-ai-ecosystems 中 Anthropic Canada / Korea office / Raise workforce training 拆成 regional research、office expansion 与 workforce enablement 子目标。）

### EXP-236
- Hypothesis: 最近24小时新增日报（2026-07-17）暴露 Anthropic Canada 1000 万加元研究生态、Jetson Thor T3000/T2000 边缘机器人模块、AWS Compute and ML Services 负责人更替、Together AI 8 亿美元融资与中国 WorkBuddy / 豆包商业化信号；若最新日报不进入 real cron fixture 且 EN 页面保留 Anthropic/AWS/China L3 泛化 fallback，首日索引会漏掉加拿大 AI 研究生态、端侧机器人、云 AI 基础设施组织调整、开放模型推理基础设施融资和中国 AI ROI 长尾入口。
- Scope: `scripts/fixtures/daily-real-cron-2026-07-17.mjs`, `scripts/fixtures/daily-real-cron-fixtures.mjs`, `scripts/lib/source-projection-rules.mjs`, `src/content/blog/en/openclaw-daily-2026-07-17.md`, `GROWTH_QUEUE.md`, `EXPERIMENT_LOG.md`
- Change: 新增并注册 2026-07-17 real cron fixture；为 Anthropic Canada research ecosystem、AWS Compute and ML Services AI infrastructure leadership、Together AI open-model inference funding 与 China WorkBuddy AI commercialization ROI 增加字段级 display label 与 detailVariants；复用并收窄 Jetson Thor 条件 label；移除 `收费` 宽词造成的 07-15 Blackwell -> China L3 detail fallback 污染；同步重写 EN 2026-07-17 日报，补齐 Case-Level FAQ、Evidence Matrix 与 CTA。
- ICE: 9x8x8=576
- Start date: 2026-07-17
- End date: 2026-07-17
- Success metric: `pnpm check:latest-daily-real-cron-fixture` 输出 `latestDaily=2026-07-17, latestFixture=2026-07-17, fixtureLagDays=0, expectedSignals=5`；`pnpm check:daily-source-projection-labels` 输出 `fixtures=25, expectedSignals=125`；daily EN/ZH generator、bilingual pair fixture、case FAQ、registry health、taxonomy、duplicate slug precheck 与 `pnpm build` 全部通过。
- Result: pass（2026-07-17 最新双语日报已由同日 real cron fixture 覆盖；Anthropic Canada、Jetson Thor、AWS Compute/ML leadership、Together AI financing 与 WorkBuddy commercialization 均输出字段级 projection；EN 页面移除泛化 fallback 并补齐 Case-Level FAQ；commit `(this commit)`；质量评分 28/30。）
- Decision: scale（保留 2026-07-17 fixture 作为加拿大 AI 研究生态、端侧机器人模块、云 AI 基础设施组织变化、开放模型推理基础设施融资和中国 AI 商业化 ROI 的首日索引质量基线；下一步可把 regional-ai-ecosystems 与 market-sizing-reports 的宽词继续拆细，降低未来待确认媒体摘要污染风险。）

### EXP-235
- Hypothesis: 最近24小时新增日报（2026-07-16）暴露 NVIDIA Jetson Thor edge robotics modules、NVIDIA Japan healthcare AI deployment、Nemotron Labs open model ownership、Claude Science research workflow 与 ChatGPT task-based model picker；若最新日报不进入 real cron fixture 且 source projection 继续回落到 Jetson/Thor/AI hardware、BioNeMo/CT 或 Claude Fable 等泛化/错配标签，首日索引会漏掉边缘机器人模组、医疗 AI 部署、开放模型 ownership 与科研工作台长尾入口。
- Scope: `scripts/fixtures/daily-real-cron-2026-07-16.mjs`, `scripts/fixtures/daily-real-cron-fixtures.mjs`, `scripts/lib/source-projection-rules.mjs`, `src/content/blog/en/openclaw-daily-2026-07-16.md`, `src/content/blog/zh/openclaw-daily-2026-07-16.md`, `GROWTH_QUEUE.md`, `EXPERIMENT_LOG.md`
- Change: 新增并注册 2026-07-16 real cron fixture；为 Jetson Thor edge robotics modules 与 NVIDIA Japan healthcare AI / CT / robotics deployment 增加字段级 display label 与 detailVariants；收窄 BioNeMo、Claude Science 条件匹配，避免历史 ICML/BioNeMo 与 Fable jailbreak fixture 被 07-16 最新 story 污染；同步重写 EN/ZH 2026-07-16 日报，补齐 Top 5、Practical Cases、Case-Level FAQ、Evidence Matrix 与 CTA。
- ICE: 9x8x8=576
- Start date: 2026-07-16
- End date: 2026-07-16
- Success metric: `pnpm check:latest-daily-real-cron-fixture` 输出 `latestDaily=2026-07-16, latestFixture=2026-07-16, fixtureLagDays=0, expectedSignals=5`；`pnpm check:daily-source-projection-labels` 输出 `fixtures=24, expectedSignals=120`；daily EN/ZH generator、bilingual pair fixture、case FAQ、registry health、taxonomy、duplicate slug precheck 与 `pnpm build` 全部通过。
- Result: pass（2026-07-16 最新双语日报已由同日 real cron fixture 覆盖；Jetson Thor、NVIDIA Japan healthcare AI、Nemotron Labs、Claude Science 与 ChatGPT Instant 均输出字段级 projection；EN/ZH 页面移除泛化 fallback 并补齐 Case-Level FAQ；commit `(this commit)`；质量评分 28/30。）
- Decision: scale（保留 2026-07-16 fixture 作为边缘机器人模组、医疗 AI 产品化、开放模型 ownership、科研 agent workflow 与模型能力选择界面的首日索引质量基线；下一步可继续把医疗 AI deployment 与 edge robotics modules 拆出更细 capacity plan，降低已满额 physical-ai-robotics / enterprise-agents 分类压力。）

### EXP-234
- Hypothesis: EXP-233 已把 AWS Continuum / Context / Bedrock AgentCore 收敛为字段级详情，但仍占用 cloud-model-distribution；若不拆出 cloud-agent-runtime-infrastructure，后续 Bedrock AgentCore runtime isolation、AWS Context enterprise knowledge graph 与纯模型上架信号会继续挤在同一 split target，降低容量诊断清晰度。
- Scope: `scripts/check-source-projection-rule-taxonomy.mjs`, `scripts/lib/source-projection-rules.mjs`, `scripts/fixtures/daily-real-cron-2026-06-18.mjs`, `scripts/fixtures/daily-real-cron-2026-07-15.mjs`, `src/content/blog/en/openclaw-daily-2026-06-18.md`, `src/content/blog/en/openclaw-daily-2026-06-19.md`, `src/content/blog/en/openclaw-daily-2026-07-15.md`, `GROWTH_QUEUE.md`, `EXPERIMENT_LOG.md`
- Change: cloud-infrastructure 新增 `cloud-agent-runtime-infrastructure` split target、预算、migration hint 与 scaffold self-test；`aws-agent-continuum-enterprise-agentcore-2026` 从 `cloud-model-distribution` 迁入新 runtime split target，并把 AWS 历史/latest fixture 和 EN 页面 label 改为 `AWS / AgentCore / managed agent runtime`；同步为 NVIDIA TOP500、EC2 G7/OpenSearch、AI for Science 与 Vera CPU capacityPlan 补齐 `cloud-model-distribution` rejected alternate target。
- ICE: 8x8x8=512
- Start date: 2026-07-16
- End date: 2026-07-16
- Success metric: `pnpm check:source-projection-rule-taxonomy`、`pnpm check:source-projection-rule-registry-health`、`pnpm check:daily-source-projection-labels`、`pnpm check:daily-generator-real-cron-fixture` 与 `pnpm build` 全部通过；taxonomy 输出 `split target categories: 34/34 used`、`cloud-agent-runtime-infrastructure=1/1`、`cloud-model-distribution=2/4`。
- Result: pass（AWS Continuum / Context / Bedrock AgentCore 已从 cloud-model-distribution 分流到 cloud-agent-runtime-infrastructure，纯模型分发 split target 恢复 2 个 headroom；相关 taxonomy、registry、label、daily generator 与 build 通过；commit `(this commit)`；质量评分 27/30。注意：`pnpm check:latest-daily-real-cron-fixture` 当前因 2026-07-16 日报尚未注册 fixture 失败，非本轮 split target 变更引入。）
- Decision: scale（保留 cloud-agent-runtime-infrastructure 作为 AWS AgentCore runtime isolation、AWS Context enterprise knowledge graph、managed agent runtime 类信号的独立容量入口；下一步优先把 2026-07-16 最新日报接入 real cron fixture 并修复 Jetson Thor / NVIDIA Japan healthcare / Nemotron Labs 字段级 projection。）

### EXP-233
- Hypothesis: EXP-232 已把 2026-07-15 AWS 企业 Agent 栈接入 latest real cron fixture，但 AWS rule 仍使用泛化 New York summit agent-platform detail；若不按 `安全漏洞 / AWS Context / Bedrock AgentCore` 增加条件 detailVariant，最新 EN 页面会把 AWS Continuum 的漏洞闭环、AWS Context 的企业知识图谱和 Bedrock AgentCore 的受治理运行时落地价值压平为普通 agent 平台更新。
- Scope: `scripts/lib/source-projection-rules.mjs`, `scripts/fixtures/daily-real-cron-2026-07-15.mjs`, `src/content/blog/en/openclaw-daily-2026-07-15.md`, `GROWTH_QUEUE.md`, `EXPERIMENT_LOG.md`
- Change: 为 `aws-agent-continuum-enterprise-agentcore-2026` 增加 fixture-backed 条件 detailVariant，匹配 `安全漏洞 / AWS Context / Bedrock AgentCore` 的 07-15 story；将 07-15 EN story 1 与 Evidence Matrix 改写为 AWS Continuum vulnerability handling、AWS Context enterprise knowledge-graph retrieval、Bedrock AgentCore governed runtime deployment；同步 parser guardrail 保留中文源 token 锁定。
- ICE: 8x8x8=512
- Start date: 2026-07-15
- End date: 2026-07-15
- Success metric: `pnpm check:source-projection-rule-registry-health`、`pnpm check:daily-generator-real-cron-fixture`、`pnpm check:latest-daily-real-cron-fixture`、`pnpm check:daily-source-projection-labels` 与 `pnpm build` 全部通过。
- Result: pass（AWS Continuum / Context / Bedrock AgentCore 已从泛化 agent-platform detail 收敛为安全漏洞闭环、企业知识图谱检索与受治理 agent runtime 字段级详情；新增 detailVariant 被真实 cron fixture 覆盖；全部相关检查与 build 通过；commit `(this commit)`；质量评分 28/30。）
- Decision: scale（保留 AWS enterprise-agent 条件详情作为云上 Agent 平台首日索引质量基线；下一步可把 Bedrock AgentCore 的 runtime isolation / permission boundary 与 AWS Context 的 enterprise knowledge graph 拆成独立 source projection split target。）

### EXP-232
- Hypothesis: 最近24小时新增日报（2026-07-15）暴露 AWS Continuum / Context / Bedrock AgentCore 企业 Agent 栈、OpenAI GPT-5.6 Sol/Terra/Luna on Amazon Bedrock、NVIDIA Nemotron Labs 开放模型 ownership、Blackwell / GB300 / Vera Rubin 每瓦性能与 WAIC 看点速览五条信号；若最新日报不进入 real cron fixture 且 EN 页面保留 GPT-5.5 Bedrock、Nemotron 泛化 fallback、MLPerf 旧详情或 WAICO/L3 泛化详情，首日索引会漏掉企业 Agent 平台、云上 OpenAI 分发、开放模型私有评测、AI 工厂能效和 WAIC 官方预告长尾入口。
- Scope: `scripts/fixtures/daily-real-cron-2026-07-15.mjs`, `scripts/fixtures/daily-real-cron-fixtures.mjs`, `scripts/lib/source-projection-rules.mjs`, `src/content/blog/en/openclaw-daily-2026-07-15.md`, `src/content/blog/zh/openclaw-daily-2026-07-15.md`, `GROWTH_QUEUE.md`, `EXPERIMENT_LOG.md`
- Change: 新增并注册 2026-07-15 real cron fixture；为 Bedrock GPT-5.6 增加条件 label/detailVariants；复用 NVIDIA Nemotron / LangChain rule 扩展 Nemotron Labs open-model ownership 条件详情；为 Blackwell 每瓦性能和 WAIC 看点速览补齐字段级 projection；同步重写 EN/ZH 2026-07-15 页面，移除 GPT-5.5 Bedrock、Nemotron 泛化 fallback、MLPerf 旧详情、WAICO/L3 泛化详情与 ZH 实战案例截断。
- ICE: 9x8x8=576
- Start date: 2026-07-15
- End date: 2026-07-15
- Success metric: `pnpm check:latest-daily-real-cron-fixture` 输出 `latestDaily=2026-07-15, latestFixture=2026-07-15, fixtureLagDays=0, expectedSignals=5`；`pnpm check:daily-source-projection-labels` 输出 `fixtures=23, expectedSignals=115`；daily EN/ZH/pair、case FAQ、registry health、taxonomy 与 `pnpm build` 全部通过。
- Result: pass（2026-07-15 最新双语日报已由同日 real cron fixture 覆盖；AWS Continuum、Bedrock GPT-5.6、Nemotron Labs open-model ownership、Blackwell performance-per-watt 与 WAIC official preview 均输出字段级 projection；EN/ZH 页面移除泛化 fallback 并补齐 Case-Level FAQ；commit `(this commit)`；质量评分 28/30。）
- Decision: scale（保留 2026-07-15 fixture 作为企业 Agent 平台、云上 OpenAI 分发、开放模型私有评测、AI 工厂能效和 WAIC 官方看点的首日索引质量基线；下一步可继续把 AWS AgentCore / Context 的安全工作流拆成更细 agent runtime / enterprise knowledge projection。）

### EXP-231
- Hypothesis: 最近24小时新增日报（2026-07-14）暴露 OpenAI GPT‑5.6 Sol/Terra/Luna + ultra 工作模式、OpenAI GPT‑Live full-duplex 语音、2026 WAIC 全球治理会议、WAIC 300+ AI 产品首发与 NVIDIA Nemotron 3 Ultra + LangChain Deep Agents 五条信号；若最新日报不进入 real cron fixture 且 EN 页面保留 GPT-5.5 Instant、Xinhua 泛化 policy/hardware fallback 或旧 Cadence/Dassault/NemoClaw 详情，首日索引会漏掉模型 Agent 平台、实时语音 AI、AI 治理会议、中国 AI 应用规模和开放企业智能体栈长尾入口。
- Scope: `scripts/fixtures/daily-real-cron-2026-07-14.mjs`, `scripts/fixtures/daily-real-cron-fixtures.mjs`, `scripts/lib/source-projection-rules.mjs`, `src/content/blog/en/openclaw-daily-2026-07-14.md`, `GROWTH_QUEUE.md`, `EXPERIMENT_LOG.md`
- Change: 新增并注册 2026-07-14 real cron fixture；为 GPT‑5.6、GPT‑Live、WAIC governance conference、WAIC product launch pipeline 与 Nemotron 3 Ultra / Deep Agents harness 写入字段级 label/detailVariants；同步重写 2026-07-14 EN 页面，移除 GPT-5.5 Instant、Xinhua 泛化 fallback 与旧 NemoClaw 工业代理详情，并保留 Next-Step CTA。
- ICE: 9x8x8=576
- Start date: 2026-07-14
- End date: 2026-07-14
- Success metric: `pnpm check:latest-daily-real-cron-fixture` 输出 `latestDaily=2026-07-14, latestFixture=2026-07-14, fixtureLagDays=0, expectedSignals=5`；`pnpm check:daily-source-projection-labels` 输出 `fixtures=22, expectedSignals=110`；registry health、daily generator、duplicate slug 与 `pnpm build` 全部通过。
- Result: pass（2026-07-14 最新双语日报已由同日 real cron fixture 覆盖；GPT-5.6、GPT-Live、WAIC governance、WAIC product launch 与 Nemotron 3 Ultra 均输出字段级 projection；latest EN 页面移除泛化 fallback 与旧工业代理详情；commit `ab6dae0`；质量评分 28/30。）
- Decision: scale（保留 2026-07-14 fixture 作为模型 Agent 平台、full-duplex 语音、WAIC 治理与中国 AI 产品首发规模的首日索引质量基线；下一步可继续把 WAIC 后续大会发布拆成更细 AI hardware / embodied AI / policy governance projection。）

### EXP-230
- Hypothesis: EXP-229 已把 2026-07-13 Claude Science 与 Long March 10B 字段级 projection 接入 latest real cron fixture，但 `detailVariants` 仍缺少 registry 级完整性与 fixture 覆盖闸门；若 variant 缺少 what/why/impact 或没有任何真实 cron story block 命中，最新日报可能重新漂移到泛化科研 AI、旧 beta/HPC 详情或未覆盖的复用 rule。
- Scope: `scripts/check-source-projection-rule-registry-health.mjs`, `scripts/lib/source-projection-rules.mjs`, `scripts/fixtures/daily-real-cron-2026-07-13.mjs`, `src/content/blog/en/openclaw-daily-2026-07-13.md`, `GROWTH_QUEUE.md`, `EXPERIMENT_LOG.md`
- Change: source projection registry health 新增 detailVariant 完整性校验，要求每个 variant 有非空 terms 与 what/why/impact，并且至少被一个 real cron fixture story block 覆盖；新增 synthetic self-test 锁定缺 impact 与 unused variant；Claude Science 新增 2026-07-13 `Claude Science 已可用 / AI workbench / 可审计产物 / 计算资源` 条件详情，并同步 EN 页面和 fixture 必检输出。
- ICE: 8x8x8=512
- Start date: 2026-07-13
- End date: 2026-07-13
- Success metric: `pnpm check:source-projection-rule-registry-health` 通过并输出 `totalRules=76`、`parent category fallback rules: 0`；`pnpm check:daily-generator-real-cron-fixture`、`pnpm check:daily-source-projection-labels`、`pnpm check:latest-daily-real-cron-fixture`、`pnpm check:duplicate-slug-id` 与 `pnpm build` 全部通过。
- Result: pass（detailVariants 现在有 fixture-backed 完整性闸门；Claude Science 07-13 generator 输出已收敛为 AI workbench、auditable artifacts、compute resources 与 auditability / permissions / compute-access 字段级详情；latestDaily=2026-07-13、fixtures=21 / expectedSignals=105、duplicate slug precheck 与 build 均通过；commit `(this commit)`；质量评分 28/30。）
- Decision: scale（保留 detailVariant 完整性与 fixture 覆盖闸门作为复用 rule 的 registry 级防漂移机制；下一步可把 displayLabels 与 detailVariants 做可选联动校验，确保多标签 rule 的每个高价值 label 都有对应字段级 detail。）

### EXP-229
- Hypothesis: 最近24小时新增日报（2026-07-13）暴露 NVIDIA Nemotron 3 Ultra + LangChain Deep Agents、NVIDIA + Hugging Face LeRobot、Anthropic Claude Science、Claude Fable jailbreak severity 与长征十号乙可回收火箭五条信号；若最新日报不进入 real cron fixture 且 EN 页面保留 Claude Science / Xinhua 泛化 fallback，首日索引会漏掉科研 AI workbench、安全评分和可回收发射基础设施长尾入口。
- Scope: `scripts/fixtures/daily-real-cron-2026-07-13.mjs`, `scripts/fixtures/daily-real-cron-fixtures.mjs`, `scripts/lib/source-projection-rules.mjs`, `src/content/blog/en/openclaw-daily-2026-07-13.md`, `GROWTH_QUEUE.md`, `EXPERIMENT_LOG.md`
- Change: 新增并注册 2026-07-13 real cron fixture；为 Claude Science 扩展 `Claude Science 已可用 / AI workbench / 可审计产物 / 计算资源` 匹配词，避免 latest EN 生成器回退到泛化 Anthropic / Claude / Science 文案；为 Long March 10B projection 增加 `一子级垂直返回` 条件 label/detail 匹配；回写 2026-07-13 EN 页面 description、story 3/5、Evidence Matrix 与 Case-Level FAQ。
- ICE: 9x8x8=576
- Start date: 2026-07-13
- End date: 2026-07-13
- Success metric: `pnpm check:latest-daily-real-cron-fixture` 输出 `latestDaily=2026-07-13, latestFixture=2026-07-13, fixtureLagDays=0, expectedSignals=5`；`pnpm check:daily-source-projection-labels` 输出 `fixtures=21, expectedSignals=105`；daily EN/ZH/pair、case FAQ、source projection registry health/taxonomy/term narrowness、fixture dedup/parser guardrail、CTA/action sections、duplicate slug 与 `pnpm build` 全部通过。
- Result: pass（2026-07-13 最新双语日报已由同日 real cron fixture 覆盖；Claude Science 与 Long March 10B 字段级 projection 已阻断泛化 fallback；case-level FAQ 从 07-13 fixture 自动推断 ChatGPT task-based model picker 与 enterprise agent engineering harness 两个 signals；全部相关检查与 build 通过；commit `(this commit)`；质量评分 28/30。）
- Decision: scale（保留 2026-07-13 fixture 作为科研 AI workbench、agent engineering harness、模型安全 severity 与可回收发射基础设施的首日索引质量基线；下一步可继续把重复出现的 Claude Science / aerospace detailVariants 扩展为更细条件 projection，减少最新日报复用 rule 时的正文漂移。）

### EXP-228
- Hypothesis: EXP-227 已把 2026-07-12 AI 与太空计算挑战赛、长征十号乙可回收火箭接入 latest real cron fixture，但 `xinhua-space-computing-commercial-space-2026` 仍占用 `ai-industrial-policy` 最后 slot；若不拆出 `aerospace-compute-infrastructure`，后续商业航天、遥感 AI、卫星计算和可复用发射信号会继续挤占工业政策分类，新增 source projection 需要临时扩容或误投到 digital regulation。
- Scope: `scripts/check-source-projection-rule-taxonomy.mjs`, `scripts/lib/source-projection-rules.mjs`, `GROWTH_QUEUE.md`, `EXPERIMENT_LOG.md`
- Change: policy-governance 新增 `aerospace-compute-infrastructure` split target、effective budget 与 migration hint；将 `xinhua-space-computing-commercial-space-2026` 从 `ai-industrial-policy` 迁入新 split target；同步更新 MWC 6G 与工业 5G capacityPlan 的实时 headroom，使 `ai-industrial-policy` 从 7/7 回落到 6/7，新增 aerospace split 为 1/2。
- ICE: 8x8x8=512
- Start date: 2026-07-12
- End date: 2026-07-12
- Success metric: `pnpm check:source-projection-rule-taxonomy` 输出 `split target categories: 33/33 used`、`ai-industrial-policy=6/7 (1 headroom)`、`aerospace-compute-infrastructure=1/2 (1 headroom)`；`pnpm check:source-projection-rule-registry-health`、`pnpm check:daily-source-projection-labels`、`pnpm check:latest-daily-real-cron-fixture` 与 `pnpm build` 全部通过。
- Result: pass（policy-governance scaffold 已新增 aerospace-compute-infrastructure；2026-07-12 AI-space / Long March 10B rule 已从 ai-industrial-policy 分流；taxonomy 显示 split target categories 33/33 used、effective coverage 76/76 split-backed、ai-industrial-policy=6/7、aerospace-compute-infrastructure=1/2；全部相关检查与 build 通过；commit `(this commit)`；质量评分 28/30。）
- Decision: scale（保留 aerospace-compute-infrastructure 作为后续商业航天、卫星 AI、遥感计算、可复用发射类日报 projection 的低风险容量入口；下一步可继续把 market-intelligence / developer-tools 的 unmatched 规则迁入 split target，减少 taxonomy 诊断噪声。）

### EXP-227
- Hypothesis: 最近24小时新增日报（2026-07-12）暴露 NVIDIA Nemotron 3 Ultra + LangChain Deep Agents、NVIDIA + Hugging Face LeRobot、Vera CPU agentic infrastructure、中国 AI 与太空计算挑战赛、长征十号乙可回收火箭五条信号；若最新日报不进入 real cron fixture 且 EN 页面保留泛化 fallback，首日索引会漏掉开放机器人生态、Agent CPU 瓶颈、AI 太空计算和可回收发射基础设施四类长尾入口。
- Scope: `scripts/fixtures/daily-real-cron-2026-07-12.mjs`, `scripts/fixtures/daily-real-cron-fixtures.mjs`, `scripts/lib/source-projection-rules.mjs`, `scripts/check-source-projection-rule-taxonomy.mjs`, `src/content/blog/en/openclaw-daily-2026-07-12.md`, `GROWTH_QUEUE.md`, `EXPERIMENT_LOG.md`
- Change: 新增并注册 2026-07-12 real cron fixture；为 LeRobot / Isaac GR00T、Vera CPU、AI 与太空计算挑战赛、长征十号乙可回收火箭补齐字段级 source projection label/detail；将 NVIDIA physical AI agent skills 迁入 robotics-open-model-research，并同步 stale capacityPlan headroom；EN 最新日报移除 story 3/4/5 泛化 fallback，补齐 ChatGPT task-based model picker 与 enterprise agent engineering harness 两个 Case-Level FAQ 和 CTA。
- ICE: 9x8x8=576
- Start date: 2026-07-12
- End date: 2026-07-12
- Success metric: `pnpm check:latest-daily-real-cron-fixture`、`pnpm check:daily-generator-real-cron-fixture`、`pnpm check:daily-zh-generator-real-cron-fixture`、`pnpm check:daily-bilingual-generator-pair-fixture`、`pnpm check:daily-source-projection-labels`、`pnpm check:daily-case-signal-faq-links`、source projection scope/registry health/taxonomy/term narrowness、fixture dedup/parser guardrail、latest specificity、CTA/action sections、duplicate slug 与 `pnpm build` 全部通过。
- Result: pass（latestDaily=2026-07-12 已由同日 real cron fixture 覆盖，expectedSignals=5；daily source projection label check 自动扩展到 20 个 fixtures / 100 条 expectedSignals；case-level FAQ 从 07-12 fixture 自动推断 ChatGPT task-based model picker 与 enterprise agent engineering harness 两个 signals；全部相关检查与 build 通过；commit `(this commit)`；质量评分 28/30。）
- Decision: scale（保留 2026-07-12 fixture 作为开放机器人生态、Agent CPU 基础设施、AI 太空计算与可回收发射能力的首日索引质量基线；下一步可把 policy-governance 中 AI/space infrastructure 从 ai-industrial-policy 继续拆分为 aerospace-compute-infrastructure，避免 ai-industrial-policy 满额后继续临时扩容。）

### EXP-226
- Hypothesis: EXP-225 已把 2026-07-11 最新日报接入 real cron fixture，但 OpenAI GPT-5.6、Meta Muse Image 与 NVIDIA Nemotron + LangChain 仍复用旧 rule 的默认 details；若不增加条件 detail projection，最新 EN 页面会在首日索引中出现标题命中但正文细节漂移，尤其 Nemotron + LangChain 会误写 Cadence / Dassault / NemoClaw 工业代理内容。
- Scope: `scripts/lib/source-projection-rules.mjs`, `scripts/fixtures/daily-real-cron-2026-07-11.mjs`, `src/content/blog/en/openclaw-daily-2026-07-11.md`, `GROWTH_QUEUE.md`, `EXPERIMENT_LOG.md`
- Change: `projectEnglishSourceDetail` 增加 `detailVariants` 优先匹配逻辑；为 GPT-5.6 Sol/Terra/Luna、Muse Image Instagram reference rollback、Nemotron 3 Ultra + LangChain Deep Agents 写入字段级条件详情；同步修正 2026-07-11 EN 页面 story 3 和 Evidence Matrix，并在 07-11 fixture 中加入旧 NemoClaw / Cadence / CAD 详情泄漏禁用项与新 evidence 必检输出。
- ICE: 8x8x8=512
- Start date: 2026-07-11
- End date: 2026-07-11
- Success metric: `pnpm check:daily-generator-real-cron-fixture`、`pnpm check:daily-source-projection-labels`、`pnpm check:source-projection-rule-registry-health`、`pnpm check:source-projection-rule-taxonomy` 与 `pnpm build` 全部通过。
- Result: pass（07-11 generator 输出已使用 Nemotron 3 Ultra + LangChain Deep Agents harness 字段级详情，旧 Cadence / Dassault / NemoClaw / CAD 工业代理详情被 fixture banned phrase 阻断；source projection label、registry health、taxonomy 与 build 全部通过；commit `(this commit)`；质量评分 28/30。）
- Decision: scale（保留 `detailVariants` 作为复用 rule 的字段级详情收敛机制；下一步可把早期复用 rule 中仍依赖默认 detail 的 latest fixture 逐步迁移，尤其是同一 rule 同时承载 product update 与 policy / benchmark signal 的条目。）

### EXP-225
- Hypothesis: 最近24小时新增日报（2026-07-11）暴露 OpenAI GPT-5.6 Sol/Terra/Luna + ultra 多智能体模式、Meta Muse Image 隐私回滚、NVIDIA Nemotron + LangChain、阿里云 Qoder agentic coding 与 Qwen 中国 AI 硬件生态五条信号；若最新日报不进入 real cron fixture 且 EN 页面保留泛化 fallback，首日索引会漏掉模型/Agent、社交生成式 AI 隐私、代码 Agent 与 Physical AI 硬件生态长尾入口。
- Scope: `scripts/fixtures/daily-real-cron-2026-07-11.mjs`, `scripts/fixtures/daily-real-cron-fixtures.mjs`, `scripts/lib/source-projection-rules.mjs`, `src/content/blog/en/openclaw-daily-2026-07-11.md`, `src/content/blog/zh/openclaw-daily-2026-07-11.md`, `GROWTH_QUEUE.md`, `EXPERIMENT_LOG.md`
- Change: 新增并注册 2026-07-11 real cron fixture，覆盖 GPT-5.6、Muse Image、Nemotron + LangChain、Qoder、Qwen hardware ecosystem 五条信号；复用/扩展 OpenAI model picker、Meta creative AI、Qwen hardware 与 Qoder source projection metadata，避免新增 parent budget 压力；EN 最新日报改为字段级事实输出并补齐 Qoder / Qwen Case-Level FAQ；ZH 最新日报修复截断的实战案例；同时收窄 Qoder `长期记忆` 与 GPT-Live 宽词，避免历史 fixture scope 污染。
- ICE: 9x8x8=576
- Start date: 2026-07-11
- End date: 2026-07-11
- Success metric: `pnpm check:latest-daily-real-cron-fixture`、`pnpm check:daily-generator-real-cron-fixture`、`pnpm check:daily-zh-generator-real-cron-fixture`、`pnpm check:daily-bilingual-generator-pair-fixture`、`pnpm check:daily-source-projection-labels`、`pnpm check:daily-case-signal-faq-links`、source projection scope/registry health/taxonomy/term narrowness、fixture dedup/parser guardrail、latest specificity、CTA/action sections、duplicate slug 与 `pnpm build` 全部通过。
- Result: pass（latestDaily=2026-07-11 已由同日 real cron fixture 覆盖，expectedSignals=5；daily source projection label check 自动扩展到 19 个 fixtures / 95 条 expectedSignals；case-level FAQ 从 07-11 fixture 自动推断 Qoder agentic coding platform 与 Qwen AI hardware ecosystem 两个 signals；全部相关检查与 build 通过；commit `(this commit)`；质量评分 28/30。）
- Decision: scale（保留 2026-07-11 fixture 作为 GPT-5.6、Muse Image 隐私边界、Qoder 代码 Agent 与 Qwen 硬件生态的首日索引质量基线；下一步可将 OpenAI GPT-5.6 / Meta Muse 从复用 rule 升级为条件 detail projection，进一步减少字段级 detail 复用。）

### EXP-224
- Hypothesis: EXP-223 已把 2026-07-10 最新日报接入 real cron fixture，但 `pnpm check:daily-bilingual-generator-pair-fixture` 仍因 06-02/03/04/05/11/13/16 历史 cross-language token 使用英文转写而失败；若不把 token baseline 对齐到双语生成器实际保留的具体事实，全量双语质量闸门会持续失效，最新日报只能依赖局部 EN/ZH、label 与 specificity 检查。
- Scope: `scripts/fixtures/daily-real-cron-2026-06-02.mjs`, `scripts/fixtures/daily-real-cron-2026-06-03.mjs`, `scripts/fixtures/daily-real-cron-2026-06-04.mjs`, `scripts/fixtures/daily-real-cron-2026-06-05.mjs`, `scripts/fixtures/daily-real-cron-2026-06-11.mjs`, `scripts/fixtures/daily-real-cron-2026-06-13.mjs`, `scripts/fixtures/daily-real-cron-2026-06-16.mjs`, `GROWTH_QUEUE.md`, `EXPERIMENT_LOG.md`
- Change: 将历史 fixture 的 `requiredTokens` 从生成器不会稳定输出的英文转写，改为中英双语页面实际保留的同一具体事实：06-02 “六大洲”；06-03/06-05 “国家数据局/具身智能”；06-04 “青少年 AI 安全/家长控制/脑机接口/工业机器人/长三角”；06-11/06-13/06-16 “百个以上高价值/万台级/国资委/国务院国资委”；06-16 “AI 图片”。
- ICE: 8x8x8=512
- Start date: 2026-07-10
- End date: 2026-07-10
- Success metric: `pnpm check:daily-bilingual-generator-pair-fixture`、EN/ZH generator real cron fixture、case-level FAQ、daily source projection labels、latest daily real cron fixture 与 `pnpm build` 全部通过。
- Result: pass（daily bilingual pair fixture 已从 13 个历史 missing token 失败恢复为通过；daily EN/ZH generator、case FAQ、source projection labels、latest fixture 与 build 均通过；commit `(this commit)`；质量评分 28/30。）
- Decision: scale（恢复全量双语内容质量闸门，后续最新日报接入可重新把 bilingual pair fixture 作为必须通过项；下一步可把 requiredTokens 升级为显式 token alias groups，避免未来中英转写再次造成历史基线漂移。）

### EXP-223
- Hypothesis: 最近24小时新增日报（2026-07-10）暴露 NVIDIA Nemotron 3 Ultra + LangChain Deep Agents、Claude Fable jailbreak severity、China science self-reliance policy、AI memory pressure 与 Honor humanoid robotics landing window 五条信号；若最新日报不进入 real cron fixture 且 EN 页面保留泛化 fallback，首日索引会漏掉开放 Agent 栈、模型安全评分、科技自立政策、AI 存储成本和人形机器人落地窗口五类长尾入口。
- Scope: `scripts/fixtures/daily-real-cron-2026-07-10.mjs`, `scripts/fixtures/daily-real-cron-fixtures.mjs`, `scripts/lib/source-projection-rules.mjs`, `src/content/blog/en/openclaw-daily-2026-07-10.md`, `GROWTH_QUEUE.md`, `EXPERIMENT_LOG.md`
- Change: 新增并注册 2026-07-10 real cron fixture，覆盖五条最新信号；扩展 science self-reliance 与 humanoid robotics landing window 条件 display label / terms / detail，并补齐 Claude Fable 5 恢复全球访问匹配；EN 2026-07-10 日报移除 Anthropic / Xinhua / robotics 三处泛化 fallback，重写 description、Top 5 与 Evidence Matrix，并新增 enterprise Agent stack 与 humanoid robotics landing window Case-Level FAQ。
- ICE: 9x8x8=576
- Start date: 2026-07-10
- End date: 2026-07-10
- Success metric: `pnpm check:latest-daily-real-cron-fixture`、EN/ZH generator、daily source projection labels、case-level FAQ、source projection registry health/taxonomy、fixture dedup/parser guardrail、latest specificity、CTA/action sections、duplicate slug 与 `pnpm build` 通过；`pnpm check:daily-bilingual-generator-pair-fixture` 仍因 2026-06-02/03/04/05/11/13/16 历史 cross-language token 基线失败，非本轮新增回归。
- Result: pass（latestDaily=2026-07-10 已由同日 real cron fixture 覆盖，expectedSignals=5；daily source projection label check 自动扩展到 18 个 fixtures / 90 条 expectedSignals；case-level FAQ 从 07-10 fixture 自动推断 enterprise Agent stack 与 humanoid robotics landing window 两个 signals；registry health、taxonomy、fixture dedup、parser guardrail、latest specificity、CTA/action sections、duplicate slug 与 build 通过；commit `(this commit)`；质量评分 27/30。）
- Decision: scale（保留 2026-07-10 fixture 作为开放 Agent 栈、模型安全评分、科技自立政策、AI 存储成本和人形机器人落地窗口的首日索引质量基线；下一步优先修复 daily bilingual pair fixture 的历史 cross-language token 基线，恢复全量闸门。）

### EXP-222
- Hypothesis: EXP-221 已把 2026-07-09 最新日报接入 fixture，但 label check 仍手写 import 清单并漏掉 2026-07-07/07-08/06-28/06-29 等已注册 fixture；若不改为从 `realCronFixtures` 自动发现 label-ready 样本，新增日报可能通过 latest freshness 却绕过 headline label metadata 回归，导致首屏标签和 source projection metadata 静默漂移。
- Scope: `scripts/check-daily-source-projection-labels.mjs`, `scripts/lib/source-projection-rules.mjs`, `GROWTH_QUEUE.md`, `EXPERIMENT_LOG.md`
- Change: `check-daily-source-projection-labels` 改为从 `realCronFixtures` 自动筛选 2026-06-05 起 label-ready fixtures，覆盖 17 个 fixture / 85 条 expectedSignals，并显式保护 2026-07-07、2026-07-08、2026-07-09 不再被手工 import 清单漏掉；source projection display label 解析改为条件标签优先，补齐 07-09 GPT-Live full-duplex voice、07-09 SWE-Bench Pro benchmark reliability、07-07 Bedrock secure model release 三个条件标签；同时将 humanoid robotics impact 文案里的 smart-factory 改为 smart manufacturing，避免 taxonomy migration hint 被 `factory` 宽词误判到 commercial deployment。
- ICE: 8x8x8=512
- Start date: 2026-07-09
- End date: 2026-07-09
- Success metric: `pnpm check:daily-source-projection-labels` 输出 `fixtures=17, expectedSignals=85`，并且 source projection registry health/taxonomy、latest fixture freshness 与 `pnpm build` 通过。
- Result: pass（label check 已由 registry 自动发现 17 个 label-ready fixtures / 85 条 expectedSignals；补齐 GPT-Live、SWE-Bench Pro、Bedrock 三个条件标签；registry health、taxonomy、latest fixture freshness 与 build 全部通过；commit `(this commit)`；质量评分 28/30。）
- Decision: scale（保留 registry-driven label fixture coverage，下一步可把 2026-05-24 至 2026-06-04 的早期 fixture 也迁入 source projection metadata，最终移除日期 cutoff。）

### EXP-221
- Hypothesis: 最近24小时新增日报（2026-07-09）暴露 GPT-Live 全双工语音、GPT-Live System Card 实时语音安全、SWE-Bench Pro 质量审计、NVIDIA Nemotron 3 Ultra + LangChain Deep Agents 和工信部机器人产业营收五条信号；若最新日报不进入 real cron fixture 且 EN 页面继续保留泛化 fallback，首日索引会漏掉语音 AI、安全采购、代码 Agent 评测、开放 Agent 栈和中国机器人产业规模五类长尾入口。
- Scope: `scripts/fixtures/daily-real-cron-2026-07-09.mjs`, `scripts/fixtures/daily-real-cron-fixtures.mjs`, `scripts/lib/source-projection-rules.mjs`, `scripts/check-latest-daily-real-cron-fixture.mjs`, `scripts/check-daily-source-projection-labels.mjs`, `src/content/blog/en/openclaw-daily-2026-07-09.md`, `GROWTH_QUEUE.md`, `EXPERIMENT_LOG.md`
- Change: 新增并注册 2026-07-09 real cron fixture；source projection metadata 扩展 GPT-Live full-duplex voice、GPT-Live System Card safety、SWE-Bench Pro benchmark reliability、Nemotron 3 Ultra / LangChain Deep Agents 与 MIIT robot revenue；EN 最新日报从泛化 fallback 改为字段级事实输出，并新增 GPT-Live 与 SWE-Bench Pro Case-Level FAQ；latest fixture freshness 从允许 7 天 lag 收紧为必须覆盖最新双语日报，label check 自动覆盖 07-09 fixture。
- ICE: 9x8x8=576
- Start date: 2026-07-09
- End date: 2026-07-09
- Success metric: `pnpm check:latest-daily-real-cron-fixture`、`pnpm check:daily-source-projection-labels`、EN/ZH generator、case-level FAQ、latest specificity、source projection registry health/taxonomy 与 `pnpm build` 通过。
- Result: pass（latestDaily=2026-07-09 已由同日 real cron fixture 覆盖；EN 最新日报 story 1/2/3/5 已移除泛化 fallback 并补齐 GPT-Live / SWE-Bench Pro FAQ；latest fixture freshness 不再允许 stale lag；相关检查与 build 通过；commit `(this commit)`；质量评分 28/30。）
- Decision: scale（保留 2026-07-09 fixture 作为语音 AI、安全卡、代码 Agent 评测、开放 Agent 栈和机器人产业规模的首日索引质量基线；下一步可把 daily-source-projection-labels 改为读取所有 latest fixtures，减少手工 import 漂移。）

### EXP-220
- Hypothesis: 2026-07-08 最新日报已接入 real cron fixture，但第 5 条 Xinhua AI fiction 信号被临时挂到 Meta creative AI rule，且 `脑机接口` 宽词会让大湾区硬科技条目误投到上海上交会；若不拆出 Xinhua fiction 字段级 rule 并收窄 Shanghai rule，最新 EN 页面会出现 source-detail 漂移，Case-Level FAQ 与 specificity 闸门也无法锁住首日索引质量。
- Scope: `scripts/lib/source-projection-rules.mjs`, `scripts/check-source-projection-rule-taxonomy.mjs`, `scripts/check-daily-brief-specificity.mjs`, `src/content/blog/en/openclaw-daily-2026-07-08.md`, `GROWTH_QUEUE.md`, `EXPERIMENT_LOG.md`
- Change: 新增 `xinhua-ai-fiction-character-conservatism-2026` 字段级 source projection，并将 Meta creative AI rule 回收为 Meta 专用；上海上交会 rule 移除 `脑机接口` 宽词，避免大湾区硬科技 source 被旧上海 rule 抢先命中；2026-07-08 EN 日报修正 story 4/5 与 Evidence Matrix，补齐 robot training certification 与 Vera CPU Case-Level FAQ；taxonomy parent/effective budget、migration hint 与 latest specificity entity registry 同步更新。
- ICE: 8x8x8=512
- Start date: 2026-07-08
- End date: 2026-07-08
- Success metric: `pnpm check:latest-daily-real-cron-fixture`、EN/ZH generator、daily source projection labels、case-level FAQ、source projection scope/registry health/taxonomy/term narrowness、fixture dedup、parser guardrail、latest specificity、daily CTA/action sections、duplicate slug 与 `pnpm build` 通过；`pnpm check:daily-bilingual-generator-pair-fixture` 存在 2026-06-02/11/13/16 历史 cross-language token 基线失败，非本轮新增。
- Result: pass（2026-07-08 第 5 条已绑定独立 Xinhua fiction rule；Meta rule 不再承载 Xinhua fiction；大湾区硬科技 story 不再被上海上交会宽词污染；latest EN 页面补齐 2 个 Case-Level FAQ；taxonomy 显示 totalRules=74、effective category coverage=74/74 split-backed、parentFallback=0、overBudget=0、missingBudget=0；build 通过；commit `(this commit)`；质量评分 27/30。）
- Decision: scale（保留 Xinhua AI fiction 独立 rule 与收窄后的 Shanghai hard-tech rule；下一步优先修复 daily bilingual pair fixture 的历史 cross-language token 基线，恢复全量内容质量闸门。）

### EXP-219
- Hypothesis: EXP-218 已把 2026-07-07 NVIDIA ICML 开放模型与深圳消费机器人信号接入 source projection，但 physical-ai-robotics 的 effective split target 仍把开放模型研究、实景实训、商业部署和消费外骨骼挤在少数桶里；若不拆出 open-model research、humanoid field training 与 assistive exoskeleton 子目标，后续机器人日报 projection 会继续触发满额容量计划而不是低风险分流。
- Scope: `scripts/check-source-projection-rule-taxonomy.mjs`, `scripts/lib/source-projection-rules.mjs`, `GROWTH_QUEUE.md`, `EXPERIMENT_LOG.md`
- Change: 为 physical-ai-robotics 新增 `assistive-exoskeleton-robotics`、`humanoid-embodied-training`、`robotics-open-model-research` 三个 split target、有效预算与 migration hints；将 `china-humanoid-embodied-training-2026`、`nvidia-icml-open-models-robotics-research-2026`、`xinhua-shenzhen-robotics-consumer-deployment-2026` 分别迁入新 effective category，并更新 ICML rule 的 structured capacityPlan 快照与 rejected alternate targets。
- ICE: 8x8x8=512
- Start date: 2026-07-07
- End date: 2026-07-07
- Success metric: `pnpm check:source-projection-rule-taxonomy` 输出 `split target categories: 32/32 used`、`effective category coverage: 71/71 split-backed, parentFallback=0, overBudget=0, missingBudget=0`；`pnpm check:source-projection-rule-registry-health`、`pnpm check:daily-source-projection-labels`、`pnpm check:latest-daily-real-cron-fixture` 与 `pnpm build` 全部通过。
- Result: pass（physical-ai-robotics 已从 3 个 split target 扩展到 6 个，新增 assistive exoskeleton、humanoid embodied training、robotics open-model research 三条低风险分流入口；robotics-simulation-training 从 6/6 回落到 4/6，robotics-commercial-deployment 从 3/4 回落到 2/4；taxonomy、registry health、daily label、latest fixture 与 build 全部通过；commit `(this commit)`；质量评分 28/30。）
- Decision: scale（保留三条新机器人 split target 作为后续 ICML/GR00T/Cosmos、实景实训与消费外骨骼日报 projection 的容量治理入口；下一步可为 effective category capacity actions 增加 parent-level sub-split health score，优先提示仍只有 1 headroom 的新子目标。）

### EXP-218
- Hypothesis: 最近24小时新增日报（2026-07-07）暴露 NVIDIA ICML 开放模型研究基础设施、主权 AI / 国家 AI 基础设施、AWS Bedrock 安全发布、Anthropic Claude Fable 5 + jailbreak 严重度评分框架、深圳机器人消费级部署五条信号；若最新日报不进入 real cron fixture 且 EN 页面继续保留泛化 fallback，首日索引会漏掉开放模型科研栈、主权 AI、模型安全评分和消费机器人四类长尾入口。
- Scope: `scripts/fixtures/daily-real-cron-2026-07-07.mjs`, `scripts/fixtures/daily-real-cron-fixtures.mjs`, `scripts/lib/source-projection-rules.mjs`, `scripts/check-source-projection-rule-taxonomy.mjs`, `src/content/blog/en/openclaw-daily-2026-07-07.md`, `GROWTH_QUEUE.md`, `EXPERIMENT_LOG.md`
- Change: 新增并注册 2026-07-07 real cron fixture，覆盖 NVIDIA ICML / sovereign AI / AWS Bedrock / Anthropic jailbreak severity / Shenzhen robotics 五条信号；source projection registry 新增 NVIDIA ICML open models、Anthropic Fable jailbreak severity、Xinhua Shenzhen consumer robotics 三条字段级英文 projection，并为 sovereign AI 补充条件 label；EN 2026-07-07 日报改为字段级事实输出，新增 ChatGPT model selector 与 Shenzhen exoskeleton Case-Level FAQ。
- ICE: 9x8x8=576
- Start date: 2026-07-07
- End date: 2026-07-07
- Success metric: `pnpm check:latest-daily-real-cron-fixture`、`pnpm check:daily-generator-real-cron-fixture`、`pnpm check:daily-zh-generator-real-cron-fixture`、`pnpm check:daily-bilingual-generator-pair-fixture`、`pnpm check:daily-source-projection-labels`、`pnpm check:daily-case-signal-faq-links`、`pnpm check:source-projection-rule-scope`、`pnpm check:source-projection-rule-registry-health`、`pnpm check:source-projection-rule-taxonomy`、`pnpm check:daily-fixture-source-dedup`、`pnpm check:daily-parser-guardrail-coverage`、`pnpm check:daily-brief-specificity`、`pnpm check:daily-cta`、`pnpm check:daily-action-sections`、`pnpm check:duplicate-slug-id` 与 `pnpm build` 全部通过。
- Result: pass（latestDaily=2026-07-07 已由最新 real cron fixture 覆盖，expectedSignals=5；EN 最新日报 Top 5 与 Evidence Matrix 已命中字段级 projection，Case-Level FAQ 自动推断 ChatGPT model selector 与 Shenzhen consumer robotics 两个 signals；source projection taxonomy 显示 totalRules=71、effective category coverage=71/71 split-backed；全部相关检查与 build 通过；commit `(this commit)`；质量评分 28/30。）
- Decision: scale（保留 2026-07-07 fixture 作为开放模型研究基础设施、主权 AI、模型安全评分与消费级机器人部署的首日索引质量基线；下一步可将 physical-ai-robotics 已满额 split target 继续拆分为 exoskeleton / humanoid / simulation 子目标，降低后续机器人日报 projection 的容量压力。）

### EXP-217
- Hypothesis: 最近24小时 2026-07-06 日报发布链路曾把 `Apply Patch failed` / cron failure 摘要写入 ZH frontmatter description 和正文占位；若 publish 阶段继续允许失败 summary fallback，首日索引会收录错误日志而不是真实 AI/科技信号，损害 daily SEO 与内容可信度。
- Scope: `scripts/publish-daily.sh`, `scripts/lib/daily-zh-generator.mjs`, `src/content/blog/en/openclaw-daily-2026-07-06.md`, `src/content/blog/zh/openclaw-daily-2026-07-06.md`, `GROWTH_QUEUE.md`, `EXPERIMENT_LOG.md`
- Change: `publish-daily.sh` 过滤非 ok 或含 failure marker 的 cron summary，并在无可用摘要时退出失败；ZH description builder 拒绝失败日志输入并使用安全 fallback；2026-07-06 双语日报回写真实 NVIDIA 算力商业模式、美国 AI 供应链、AWS Bedrock/Claude Fable、安全评分框架与中国大模型安全测评信号。
- ICE: 8x8x8=512
- Start date: 2026-07-06
- End date: 2026-07-06
- Success metric: `pnpm check:latest-daily-real-cron-fixture`、`pnpm check:daily-zh-generator-real-cron-fixture` 与 `pnpm build` 通过；2026-07-06 ZH 页面不再包含 `Apply Patch failed` 或占位证据矩阵。
- Result: pass（publish 阶段已 fail fast，ZH description 不再吸收失败 cron 日志；2026-07-06 双语页面已替换为真实同日 AI/科技信号；latest fixture freshness、ZH generator fixture 与 build 全部通过；commit `(this commit)`；质量评分 27/30。）
- Decision: scale（保留失败摘要过滤作为日报发布底线；下一步可将最新 2026-07-06 日报接入 real cron fixture registry，并为 NVIDIA 算力商业模式 / AWS Claude Fable / LLM safety assessment 增加字段级 source projection。）

### EXP-216
- Hypothesis: EXP-215 已将 `budgetImpact` 升级为 `{capacityDelta, categoryBudget, categoryHeadroom, rationale}`，但 `categoryBudget/categoryHeadroom` 仍可能成为手写快照；若不与实时 effective category summary 比对，新增或迁移 source projection rule 后 stale budget/headroom 数字会继续误导容量治理。
- Scope: `scripts/check-source-projection-rule-taxonomy.mjs`, `GROWTH_QUEUE.md`, `EXPERIMENT_LOG.md`
- Change: `validateCapacityPlanBudgetImpactConsistency` 新增 structured `budgetImpact.categoryBudget` 与 `categoryHeadroom` 的实时比对，existing rule 与 proposed rule capacityPlan 共用；新增 stale snapshot synthetic self-test，分别锁定 stale budget 与 stale headroom 失败诊断。
- ICE: 8x8x8=512
- Start date: 2026-07-06
- End date: 2026-07-06
- Success metric: `pnpm check:source-projection-rule-taxonomy` 阻断 stale `categoryBudget/categoryHeadroom`；`pnpm build` 通过。
- Result: pass（structured budgetImpact 现在同时校验 capacity delta 与实时 effective category budget/headroom；stale budget/headroom self-test 已覆盖；当前 16 条历史 capacityPlan 快照均与实时 effective summary 一致；taxonomy check 与 build 全部通过；commit `ecfc171`；质量评分 28/30。）
- Decision: scale（保留 budget/headroom 实时一致性闸门；下一步可将 capacityPlan 的 rationale 增加 required evidence terms，减少“结构化字段正确但解释泛化”的治理盲区。）

### EXP-215
- Hypothesis: EXP-214 已把 `rejectedAlternateTargets` 结构化，但 `budgetImpact` 仍依赖自由文本里的 `capacity delta`、预算与 headroom 数字；若拆为 `{capacityDelta, categoryBudget, categoryHeadroom, rationale}`，source projection 容量治理可从正则解析升级为字段级审计，减少数字遗漏、文本误读和 stale 预算漂移。
- Scope: `scripts/check-source-projection-rule-taxonomy.mjs`, `scripts/lib/source-projection-rules.mjs`, `GROWTH_QUEUE.md`, `EXPERIMENT_LOG.md`
- Change: 新增 structured `budgetImpact` parser，要求 capacityPlan 的预算影响字段包含 `capacityDelta`、`categoryBudget`、`categoryHeadroom` 与 rationale；16 条历史 capacityPlan 已从文本迁移为结构化对象；taxonomy self-test 更新为覆盖缺数值字段、roomy capacity raise 与 proposed rule understated delta。
- ICE: 8x8x8=512
- Start date: 2026-07-05
- End date: 2026-07-05
- Success metric: `pnpm check:source-projection-rule-taxonomy` 阻断非结构化/缺数值 `budgetImpact`；`pnpm build` 通过。
- Result: pass（capacityPlan budgetImpact 已升级为 `{capacityDelta, categoryBudget, categoryHeadroom, rationale}`；16 条历史规则迁移完成；taxonomy check 与 build 全部通过；commit `(this commit)`；质量评分 28/30。）
- Decision: scale（保留 structured budgetImpact 作为 source projection 容量治理字段；下一步可校验 `categoryBudget/categoryHeadroom` 与实时 effective category summary 完全一致，阻断 stale capacity snapshot。）

### EXP-214
- Hypothesis: EXP-213 已要求 `whyNotAlternatives` 文本点名 effective alternate target ID，但文本包含式校验仍易受措辞、排序和 stale target 影响；若增加 `rejectedAlternateTargets` 数组并与实时 alternate target list 做缺失/过期比对，容量治理可从文本审计升级为结构化审计。
- Scope: `scripts/check-source-projection-rule-taxonomy.mjs`, `scripts/lib/source-projection-rules.mjs`, `GROWTH_QUEUE.md`, `EXPERIMENT_LOG.md`
- Change: structured capacityPlan 新增 `rejectedAlternateTargets` 数组解析，并在 shared template 中对存在 effective alternate target 的规则校验数组覆盖；缺数组、漏列可用 target、或包含非推荐/stale target 均失败。同步为 ai-industrial-policy、ai-policy-standards、chatgpt-control-surfaces、regional-ai-ecosystems 等历史 capacityPlan 写入结构化 rejected target IDs。
- ICE: 8x8x8=512
- Start date: 2026-07-05
- End date: 2026-07-05
- Success metric: `pnpm check:source-projection-rule-taxonomy` 阻断缺少 `rejectedAlternateTargets` 数组、漏列 `consumer-creative-ai`、或包含 `legacy-consumer-target` 的 capacityPlan；`pnpm build` 通过。
- Result: pass（capacityPlan rejected alternatives 已从自由文本升级为结构化 `rejectedAlternateTargets` 数组；synthetic self-test 锁定缺数组、漏列 current alternate target 与 stale target 三类失败；5 条历史 capacityPlan 已写入可机器比对的 rejected target IDs；taxonomy check 与 build 全部通过；commit `(this commit)`；质量评分 28/30。）
- Decision: scale（保留 rejectedAlternateTargets 作为 source projection 容量治理的结构化审计字段；下一步可把 `budgetImpact` 也拆为 `{capacityDelta, budget, headroom}` 结构，减少数字文本解析。）

### EXP-210
- Hypothesis: EXP-209 已把历史 capacityPlan 迁移成结构化字段，但 taxonomy 只检查 `selectedSplitTarget`、`whyNotAlternatives`、`budgetImpact` 是否存在；若 `selectedSplitTarget` 可与 `splitTargetCategory || category` 不一致，后续预算治理会在 rule 实际承载分类与计划声明之间漂移，降低 split target 审计可信度。
- Scope: `scripts/check-source-projection-rule-taxonomy.mjs`, `GROWTH_QUEUE.md`, `EXPERIMENT_LOG.md`
- Change: `validateCapacityPlanTemplate` 新增 selected target alignment 校验，要求 structured `capacityPlan.selectedSplitTarget` 必须等于 effective category；该模板由 proposed rule capacity guard 与 existing rule capacityPlan template guard 共用。新增 synthetic self-test，锁定 existing rule `splitTargetCategory=chatgpt-control-surfaces` 但 plan 选择 `consumer-creative-ai` 时会失败。
- ICE: 8x8x8=512
- Start date: 2026-07-03
- End date: 2026-07-03
- Success metric: `pnpm check:source-projection-rule-taxonomy` 阻断 mismatched selectedSplitTarget，并且 `pnpm build` 通过。
- Result: pass（capacityPlan 现在不仅要求结构化字段，还要求 selectedSplitTarget 与 rule 的 effective category 一致；synthetic self-test 锁定 mismatch 诊断；当前 16 条结构化 capacityPlan 全部与 splitTargetCategory 对齐；taxonomy check 与 build 全部通过；commit `5324150`；质量评分 28/30。）
- Decision: scale（保留 selectedSplitTarget alignment 作为 source projection 预算治理一致性闸门；下一步可要求 `budgetImpact` 明确包含 headroom / budget raise 数字，避免容量影响仍停留在自然语言描述。）

### EXP-209
- Hypothesis: EXP-208 已要求新增 proposed rule 使用结构化 capacityPlan，但 registry 中 16 条历史规则仍保留 string capacityPlan；若不迁移并加现有规则闸门，后续 enum / budget 审计仍会混用 legacy 文本，降低 selected split target、rejected alternatives 与 budget impact 的可机器检查性。
- Scope: `scripts/lib/source-projection-rules.mjs`, `scripts/check-source-projection-rule-taxonomy.mjs`, `GROWTH_QUEUE.md`, `EXPERIMENT_LOG.md`
- Change: 将 16 条历史 source projection rule 的 `capacityPlan` 从 legacy string 迁移为结构化对象，逐条声明 `selectedSplitTarget`、`whyNotAlternatives` 与 `budgetImpact`；taxonomy 校验新增 `validateExistingCapacityPlanTemplates`，让现有规则也复用 EXP-208 的结构化模板要求，并新增 synthetic self-test 锁定 existing rule legacy string plan 失败路径。
- ICE: 8x8x8=512
- Start date: 2026-07-03
- End date: 2026-07-03
- Success metric: `pnpm check:source-projection-rule-taxonomy` 阻断 existing rule unstructured capacityPlan；`grep -R "capacityPlan: '" scripts/lib/source-projection-rules.mjs` 无残留；`pnpm build` 通过。
- Result: pass（16 条历史 capacityPlan 已迁移为结构化字段；taxonomy check 新增 existing rule 模板闸门与 self-test，legacy string plan 会失败；source projection registry 无 `capacityPlan: '...'` 残留；taxonomy check 与 build 全部通过；commit `(this commit)`；质量评分 28/30。）
- Decision: scale（保留 structured capacityPlan 作为所有 source projection rule 的统一预算治理格式；下一步可把 `capacityPlan.selectedSplitTarget` 与 `splitTargetCategory` 做一致性校验，并要求 budgetImpact 明确 headroom / budget raise 数字。）

### EXP-208
- Hypothesis: EXP-207 已把 alternate split targets 接入 capacityPlan 失败诊断，但 proposed rule 仍可用一句纯文本 capacityPlan 通过；若不要求 selected split target、why not alternatives 与 budget impact 三个字段，维护者仍可能用模糊“raise budget”绕过低风险分流。
- Scope: `scripts/check-source-projection-rule-taxonomy.mjs`, `GROWTH_QUEUE.md`, `EXPERIMENT_LOG.md`
- Change: 新增 structured capacityPlan parser，并让 proposed rule capacity guard 在命中拥挤 effective category 时要求 `selectedSplitTarget`、`whyNotAlternatives`、`budgetImpact`；legacy string plan 会失败并提示结构化字段，同时保留 EXP-207 的 available alternate split targets 诊断；有 alternate targets 时，`whyNotAlternatives` 必须解释 rejected alternate split targets。
- ICE: 8x8x8=512
- Start date: 2026-07-02
- End date: 2026-07-02
- Success metric: `pnpm check:source-projection-rule-taxonomy` 的 capacity-plan template self-test 锁定 unstructured fail / structured pass，并且 `pnpm build` 通过。
- Result: pass（proposed rule capacityPlan 现在必须使用结构化字段 selectedSplitTarget、whyNotAlternatives、budgetImpact；self-test 锁定 unstructured string plan 失败并继续输出 consumer-productivity 的 alternate split targets，structured ChatGPT control-surface plan 通过；taxonomy check 与 build 全部通过；commit `(this commit)`；质量评分 28/30。）
- Decision: scale（保留 structured capacityPlan 作为新增 source projection rule 的预算治理入口；下一步可把实际 source projection rule registry 中的历史 string capacityPlan 分批迁移为结构化字段，降低未来 enum / budget 审计成本。）

### EXP-207
- Hypothesis: EXP-206 已在 taxonomy summary 输出 sibling alternate targets，但新增 proposed rule 缺 capacityPlan 时的失败文案仍只说选择低风险 split target 或 raise effective budget；若不把具体 sibling target 直接写进失败诊断，维护者仍需要手动回看 summary，容易继续临时扩容而不是把新增规则分流到 consumer-creative-ai、career-productivity-workflows 等低风险目标。
- Scope: `scripts/check-source-projection-rule-taxonomy.mjs`, `GROWTH_QUEUE.md`, `EXPERIMENT_LOG.md`
- Change: 新增 `formatAlternateTargetRecommendation`，并让 `validateSourceProjectionRuleCategoryCapacityPlan` 复用 EXP-206 的 `suggestSourceProjectionEffectiveCategoryAlternateTargets`；当 proposed rule 命中拥挤 effective category 且缺 capacityPlan 时，失败诊断追加 `available alternate split targets`，直接列出同 parent 下仍有 headroom 的 sibling target。
- ICE: 8x8x8=512
- Start date: 2026-07-02
- End date: 2026-07-02
- Success metric: `pnpm check:source-projection-rule-taxonomy` 的 capacity-plan self-test 锁定 alternate target 失败文案，并且 `pnpm build` 通过。
- Result: pass（proposed rule capacityPlan 失败诊断现在会在可分流时直接输出 sibling alternate targets；self-test 锁定 chatgpt-control-surfaces 缺 plan 时提示 `consumer-productivity -> consumer-creative-ai=0/4 (4 headroom) / career-productivity-workflows=0/3 (3 headroom)`；taxonomy check 与 build 全部通过；commit `(this commit)`；质量评分 28/30。）
- Decision: scale（保留 alternate target 失败文案作为新增 source projection rule 的执行入口；下一步可把 capacityPlan 模板从纯文本升级为结构化字段，要求声明 selected split target、why not alternatives 与预算影响。）

### EXP-206
- Hypothesis: EXP-205 后 latest fixture 已把 2026-07-01 科研 agent、AI for Science 与 AWS FDE/Secret Cloud 新信号接入 source projection，但 taxonomy 的 effective category capacity actions 仍只输出 “choose a lower-risk split target or raise effective budget”；若不把同 parent 下仍有余量的 sibling target 直接列出，维护者仍可能对 0/1 headroom effective category 继续临时 raise budget，而不是把新增规则分流到更低风险 split target。
- Scope: `scripts/check-source-projection-rule-taxonomy.mjs`, `GROWTH_QUEUE.md`, `EXPERIMENT_LOG.md`
- Change: 新增 `suggestSourceProjectionEffectiveCategoryAlternateTargets`，对命中 effective category capacity action 的 split target 查找同 parent sibling，并只推荐 headroom > 1 的 alternate target；taxonomy summary 新增 `effective category alternate targets` 行；self-test 锁定 chatgpt-control-surfaces 拥挤时可推荐 consumer-creative-ai 与 career-productivity-workflows。
- ICE: 8x8x8=512
- Start date: 2026-07-01
- End date: 2026-07-01
- Success metric: `pnpm check:source-projection-rule-taxonomy` 输出 `effective category alternate targets`，并且 `pnpm build` 通过。
- Result: pass（taxonomy 现在为拥挤 effective category 输出 sibling alternate target：如 ai-industrial-policy -> digital-regulation-compliance，robotics-simulation-training -> autonomous-mobility-systems / robotics-commercial-deployment，chatgpt-control-surfaces -> career-productivity-workflows / consumer-creative-ai，regional-ai-ecosystems -> content-licensing-markets / market-sizing-reports，developer-tools 下 desktop/domestic -> code-agent-runtime；taxonomy check 与 build 全部通过；commit `60c9ca7`；质量评分 28/30。）
- Decision: scale（保留 alternate target 诊断作为新增 source projection rule 的预算治理入口；下一步可把该建议接入 proposed rule capacityPlan failure 文案，让新增规则缺 plan 时直接显示可替代 split target。）

### EXP-205
- Hypothesis: 最近24小时新增日报（2026-07-01）暴露 Claude Science 科研工作台、NVIDIA BioNeMo Agent Toolkit、NVIDIA AI for Science HPC 软件栈、AWS Forward Deployed AI Engineering 与 AWS Summit D.C. 公共部门/机密云五条信号；若最新日报不进入 real cron fixture 且 EN 页面继续保留泛化 fallback，首日索引会漏掉科研 agent、科学计算工具链、企业 FDE 落地和高安全政企云四类长尾入口。
- Scope: `scripts/fixtures/daily-real-cron-2026-07-01.mjs`, `scripts/fixtures/daily-real-cron-fixtures.mjs`, `scripts/lib/source-projection-rules.mjs`, `scripts/check-daily-source-projection-labels.mjs`, `scripts/check-source-projection-rule-taxonomy.mjs`, `src/content/blog/en/openclaw-daily-2026-07-01.md`, `src/content/blog/zh/openclaw-daily-2026-07-01.md`, `GROWTH_QUEUE.md`, `EXPERIMENT_LOG.md`
- Change: 新增并注册 2026-07-01 real cron fixture，覆盖 Claude Science、BioNeMo Agent Toolkit、AI for Science、AWS FDE 与 AWS Summit D.C. Secret Cloud 五条信号；source projection registry 新增五条字段级英文 projection 与 display label，并为 enterprise/cloud/product-safety split target 同步容量预算、migration hints 与 capacityPlan；EN/ZH 最新日报升级为字段级事实描述，移除泛化 fallback；fixture 写入 caseLevelFaqSignals，使 latest case FAQ check 自动推断 Claude Science 与 AWS FDE 两个长尾入口。
- ICE: 9x8x8=576
- Start date: 2026-07-01
- End date: 2026-07-01
- Success metric: `pnpm check:latest-daily-real-cron-fixture`、`pnpm check:daily-generator-real-cron-fixture`、`pnpm check:daily-zh-generator-real-cron-fixture`、`pnpm check:daily-bilingual-generator-pair-fixture`、`pnpm check:daily-source-projection-labels`、`pnpm check:daily-case-signal-faq-links`、`pnpm check:source-projection-rule-scope`、`pnpm check:source-projection-rule-registry-health`、`pnpm check:source-projection-rule-taxonomy`、`pnpm check:daily-fixture-source-dedup`、`pnpm check:daily-parser-guardrail-coverage`、`pnpm check:daily-brief-specificity`、`pnpm check:daily-cta`、`pnpm check:daily-action-sections`、`pnpm check:duplicate-slug-id` 与 `pnpm build` 全部通过。
- Result: pass（latestDaily=2026-07-01 已由最新 real cron fixture 覆盖，expectedSignals=5；EN 最新日报 Top 5 与 Evidence Matrix 已命中字段级 projection，latest case FAQ 自动推断 Claude Science 与 AWS FDE 两个 signals；scope 检查经 story 分隔修复后通过，registry health 显示 totalRules=68、parent category fallback=0，taxonomy 显示 effective category coverage=68/68 split-backed；全部相关检查与 build 通过；commit `3b964fa`；质量评分 28/30。）
- Decision: scale（保留 2026-07-01 fixture 作为科研 agent、HPC 科学计算和政企高安全 AI 部署的首日索引质量基线；下一步优先把已满额 effective category 的新增容量从临时 budget raise 收敛为更细 split target 或预算治理实验。）

### EXP-203
- Hypothesis: EXP-202 已把 2026-06-30 最新日报接入 fixture，但 taxonomy 仍显示 frontier-models、product-safety、developer-tools 作为 parent fallback 进入 capacity actions；若不为这些满额/低余量父类建立 split target，后续 Claude/GPT、Palantir 安全部署、Codex/Yisuan Ark 类新增日报 projection 仍会依赖 parent budget raise。
- Scope: `scripts/check-source-projection-rule-taxonomy.mjs`, `scripts/lib/source-projection-rules.mjs`, `GROWTH_QUEUE.md`, `EXPERIMENT_LOG.md`
- Change: 为 frontier-models 增加 frontier-model-task-capability / frontier-model-cloud-distribution / frontier-model-inference-architecture，product-safety 增加 high-sensitivity-ai-deployment / model-account-security / youth-safety-controls，developer-tools 增加 code-agent-runtime / desktop-computer-use / domestic-compute-software；同步 allowlist、effective budgets、migration hints 与 self-test；为 13 条现有 parent fallback rules 写入 splitTargetCategory。
- ICE: 8x8x8=512
- Start date: 2026-06-30
- End date: 2026-06-30
- Success metric: `pnpm check:source-projection-rule-taxonomy` 输出 `split target categories: 26/26 used`、`existing rule split target coverage: 60/60 covered`、`effective category coverage: 60/63 split-backed, parentFallback=3`；`pnpm check:source-projection-rule-registry-health` 输出 `parent category fallback rules: 3`；`pnpm check:daily-source-projection-labels`、`pnpm check:latest-daily-real-cron-fixture` 与 `pnpm build` 全部通过。
- Result: pass（frontier-models/product-safety/developer-tools 三个高风险 parent category 已建立 9 个 split target；13 条现有规则已迁入 effective category；taxonomy 显示 26/26 split target used、60/60 covered、parentFallback=3；registry health、daily label、latest fixture 与 build 全部通过；commit `(this commit)`；质量评分 28/30。）
- Decision: scale（保留三组新增 split target 作为后续 Claude/GPT、AI 安全部署、Codex/国产计算软件 projection 的新增入口；下一步可为 company-finance 3 条 parent fallback 设计融资/IPO/收入质量 split target，把 effective parentFallback 降到 0。）

### EXP-202
- Hypothesis: 最近24小时新增日报（2026-06-30）暴露 NVIDIA+Palantir 安全政府 AI、Claude on Azure GB300、Claude Tag、ChatGPT 个人金融/听写/Codex Remote 与中国异算方舟五条信号；若最新日报不进入 real cron fixture 且 EN 页面继续保留 Palantir 泛化 fallback，首日索引会漏掉高敏行业安全部署、云原生 Claude 部署和国产计算软件迁移三类长尾入口。
- Scope: `scripts/fixtures/daily-real-cron-2026-06-30.mjs`, `scripts/fixtures/daily-real-cron-fixtures.mjs`, `scripts/lib/source-projection-rules.mjs`, `scripts/check-daily-source-projection-labels.mjs`, `src/content/blog/en/openclaw-daily-2026-06-30.md`, `src/content/blog/zh/openclaw-daily-2026-06-30.md`, `GROWTH_QUEUE.md`, `EXPERIMENT_LOG.md`
- Change: 新增并注册 2026-06-30 real cron fixture；source projection registry 新增 Palantir Nemotron secure government AI、Claude Azure GB300、Yisuan Ark 三条字段级英文 projection 与 display label，并收窄 NVIDIA/Microsoft 旧规则与 National Data Administration 旧规则 terms，避免 Foundry / AI for Science 误命中；EN 最新日报移除 Palantir 泛化 fallback，新增 5 条 Case-Level FAQ；ZH 最新日报补全异算方舟实践案例。
- ICE: 9x8x8=576
- Start date: 2026-06-30
- End date: 2026-06-30
- Success metric: `pnpm check:latest-daily-real-cron-fixture`、`pnpm check:daily-generator-real-cron-fixture`、`pnpm check:daily-zh-generator-real-cron-fixture`、`pnpm check:daily-bilingual-generator-pair-fixture`、`pnpm check:daily-source-projection-labels`、`pnpm check:daily-case-signal-faq-links`、source projection scope/registry health/taxonomy、fixture dedup/parser/publish、latest specificity、CTA/action sections、duplicate precheck 与 `pnpm build` 全部通过。
- Result: pass（latestDaily=2026-06-30 已由最新 real cron fixture 覆盖，expectedSignals=5；EN 最新日报 story 1/2/5 已升级为字段级 projection，Case-Level FAQ 从 latest fixture metadata 自动推断 5 个 signals；ZH 异算方舟实践案例已补全；相关检查与 build 全部通过；commit `(this commit)`；质量评分 28/30。）
- Decision: scale（保留 2026-06-30 fixture 作为最新内容建设首日索引质量基线；下一步应为已满额 frontier-models / product-safety / developer-tools 等 parent fallback 设计 split target 或预算迁移实验，降低后续新增日报 projection 的容量压力。）

### EXP-201
- Hypothesis: EXP-200 已把 case-level FAQ check 下沉到 fixture metadata，但 2026-06-29 最新日报只有泛化 Practical Cases，导致 ChatGPT personal finance / dictation 与 Claude Tag 这三条高价值长尾信号不会被 latest fixture 自动纳入 Case-Level FAQ。若不支持从 expectedSignals 推断 case-level FAQ metadata，低新增量日报会继续漏掉具体查询入口。
- Scope: `scripts/check-daily-case-signal-faq-links.mjs`, `scripts/fixtures/daily-real-cron-2026-06-29.mjs`, `src/content/blog/en/openclaw-daily-2026-06-29.md`, `GROWTH_QUEUE.md`, `EXPERIMENT_LOG.md`
- Change: `check-daily-case-signal-faq-links` 新增 expectedSignals 推断路径，支持 fixture metadata 使用 `sourceStoryMatchTerms` 从 latest fixture 的标题、enLabel 与 requiredTokens 识别 case-level FAQ signals；2026-06-29 fixture 写入 ChatGPT personal finance、ChatGPT dictation、Claude Tag 三条 metadata；EN 2026-06-29 日报新增 Case-Level FAQ，覆盖 Slack channel memory scope、dictation model/voice input、personal finance/data boundary 三类长尾问题与内部链接。
- ICE: 8x8x8=512
- Start date: 2026-06-29
- End date: 2026-06-29
- Success metric: `pnpm check:daily-case-signal-faq-links` 输出 `latestFixture=2026-06-29, autoSignals=3`，并且 `pnpm check:latest-daily-real-cron-fixture`、`pnpm check:daily-source-projection-labels` 与 `pnpm build` 全部通过。
- Result: pass（latest fixture 已从 expectedSignals 自动推断 3 个 case-level FAQ signals；2026-06-29 EN 日报新增 3 条 Case-Level FAQ，覆盖 Claude Tag、ChatGPT dictation、ChatGPT personal finance 的 required terms 与内部链接；相关检查与 build 全部通过；commit `(this commit)`；质量评分 28/30。）
- Decision: scale（保留 expectedSignals -> case-level FAQ metadata 推断作为低新增量日报的长尾入口闸门；下一步可把 `sourceStoryMatchTerms` 扩展到 Codex Remote 或 NVIDIA/AWS infrastructure 类可执行部署 FAQ。）

### EXP-200
- Hypothesis: 最近24小时新增日报（2026-06-29）复用了 ChatGPT finance/dictation、Claude Tag、NVIDIA/AWS、TOP500/Green500 与中国垂直 AI 五条高价值信号；若最新日报没有进入 real cron fixture registry，且 case-level FAQ check 继续依赖脚本内硬编码 catalog，首日索引质量会绕过最新 fixture，FAQ 长尾入口也会和内容 fixture 漂移。
- Scope: `scripts/fixtures/daily-real-cron-2026-06-29.mjs`, `scripts/fixtures/daily-real-cron-fixtures.mjs`, `scripts/fixtures/daily-real-cron-2026-06-28.mjs`, `scripts/check-daily-case-signal-faq-links.mjs`, `scripts/lib/source-projection-rules.mjs`, `scripts/lib/daily-generator.mjs`, `src/content/blog/en/openclaw-daily-2026-06-29.md`, `GROWTH_QUEUE.md`, `EXPERIMENT_LOG.md`
- Change: 新增并注册 2026-06-29 real cron fixture，覆盖 OpenAI ChatGPT/Codex Remote、Claude Tag、NVIDIA/AWS vector indexing、NVIDIA TOP500/Green500、中国垂直 AI 五条信号；EN 最新日报由字段级 projection 改写并移除泛化 fallback；source projection terms/details 扩展到 06-29 新文案；case-level FAQ link check 改为从 latest fixture `caseLevelFaqSignals` metadata 推断实践案例信号，并为 06-28 fixture 写入 Claude Tag / ChatGPT dictation metadata。
- ICE: 9x8x8=576
- Start date: 2026-06-29
- End date: 2026-06-29
- Success metric: `pnpm check:latest-daily-real-cron-fixture`、`pnpm check:daily-case-signal-faq-links`、`pnpm check:daily-source-projection-labels`、真实 cron EN/ZH/pair、source projection scope/registry health/taxonomy/metadata/term narrowness、fixture dedup/parser/publish、latest specificity、CTA/action sections、duplicate precheck 与 `pnpm build` 全部通过。
- Result: pass（latestDaily=2026-06-29 已由最新 real cron fixture 覆盖，expectedSignals=5；EN 最新日报 Top 5 已命中字段级 source projection 并移除 ChatGPT / China vertical AI 泛化 fallback；case-level FAQ check 已从 fixture metadata 读取 Claude Tag 与 ChatGPT dictation signals；全部相关检查与 build 通过；commit `5ad440f`；质量评分 28/30。）
- Decision: scale（保留 2026-06-29 fixture 作为最近 72 小时低新增量日报的首日索引质量基线；下一步可把 `caseLevelFaqSignals` metadata 迁移到 2026-06-29 或后续含 Practical Cases 的 latest fixture，并为缺 metadata 的 practical case 输出更细诊断。）

# EXPERIMENT_LOG.md

### EXP-213
- Hypothesis: EXP-212 已把 `budgetImpact` 的 capacity delta 与 effective headroom 自动比对，但 `whyNotAlternatives` 仍可能只写“creative AI / career workflows / digital compliance”这类自然语言；若不要求它点名当前可分流的 effective alternate target ID，维护者仍可能漏提真实可用 sibling split target，导致容量治理回到人工判断。
- Scope: `scripts/check-source-projection-rule-taxonomy.mjs`, `scripts/lib/source-projection-rules.mjs`, `GROWTH_QUEUE.md`, `EXPERIMENT_LOG.md`
- Change: 新增 `validateCapacityPlanRejectedAlternatives`，把 `suggestSourceProjectionEffectiveCategoryAlternateTargets` 的 sibling target 列表接入 shared capacityPlan template；existing rule 与 proposed rule 均会校验 `whyNotAlternatives` 是否显式包含可用 alternate target ID。同步修正 5 条历史 capacityPlan 文案，点名 `digital-regulation-compliance`、`consumer-creative-ai`、`career-productivity-workflows`、`content-licensing-markets`、`market-sizing-reports` 等真实可分流目标。
- ICE: 8x8x8=512
- Start date: 2026-07-05
- End date: 2026-07-05
- Success metric: `pnpm check:source-projection-rule-taxonomy` 阻断缺少 effective alternate target ID 的 rejected-alternatives 文案；`pnpm build` 通过。
- Result: pass（capacityPlan.whyNotAlternatives 现在必须和 effective alternate target list 自动对齐；synthetic self-test 锁定 ChatGPT control-surface plan 漏写 `career-productivity-workflows` / `consumer-creative-ai` 会失败；5 条历史 capacityPlan 已改为显式点名可分流 target ID；taxonomy check 与 build 通过；commit `(this commit)`；质量评分 28/30。）
- Decision: scale（保留 rejected-alternatives target ID 覆盖作为 source projection 容量治理闸门；下一步可把 capacityPlan 的 whyNotAlternatives 从自由文本进一步结构化为 rejectedAlternateTargets 数组，降低文本包含式校验的脆弱性。）

### EXP-212
- Hypothesis: EXP-211 已要求 budgetImpact 写入数值 capacity delta / budget / headroom，但数值仍可能与真实 effective category 使用率漂移；若 `capacity delta +1/0` 不和当前 headroom、满额新增规则所需扩容量比对，维护者仍能在有余量分类里声明扩容，或在满额分类新增规则时声明零扩容。
- Scope: `scripts/check-source-projection-rule-taxonomy.mjs`, `GROWTH_QUEUE.md`, `EXPERIMENT_LOG.md`
- Change: 新增 `parseCapacityDelta`、`budgetImpactClaimsRaise` 与 `validateCapacityPlanBudgetImpactConsistency`，让 shared capacityPlan template 校验同时读取 effective category budget/headroom；existing rule 阻断有 >1 headroom 仍声明 `capacity delta +N`，proposed rule 按当前 headroom 计算 required delta 并阻断满额新增规则声明 `capacity delta 0`。
- ICE: 8x8x8=512
- Start date: 2026-07-04
- End date: 2026-07-04
- Success metric: `pnpm check:source-projection-rule-taxonomy` 阻断 roomy category `capacity delta +1` 与 full proposed rule `capacity delta 0`；`pnpm build` 通过。
- Result: pass（capacityPlan.budgetImpact 现在会和 effective category headroom 自动比对；synthetic self-test 锁定 consumer-creative-ai 仍有 3 headroom 却声明 `+1` 会失败、chatgpt-control-surfaces 已满额却声明 proposed `0` 会失败；taxonomy check 与 build 通过；commit `(this commit)`；质量评分 28/30。）
- Decision: scale（保留 capacity delta/headroom 一致性作为 source projection 容量治理闸门；下一步可把 capacityPlan 的 rejected alternatives 与 effective alternate target 列表自动比对，避免 whyNotAlternatives 漏提可分流目标。）

### EXP-211
- Hypothesis: EXP-210 已校验 selectedSplitTarget 与 effective category 对齐，但 budgetImpact 仍可用纯自然语言描述“uses capacity / raises capacity”；若不要求数值容量 delta、预算或 headroom，后续预算治理仍难以区分真实扩容、消耗最后 slot 与无扩容复用。
- Scope: `scripts/check-source-projection-rule-taxonomy.mjs`, `scripts/lib/source-projection-rules.mjs`, `GROWTH_QUEUE.md`, `EXPERIMENT_LOG.md`
- Change: 新增 `hasQuantifiedBudgetImpact`，让 shared `validateCapacityPlanTemplate` 要求 `capacityPlan.budgetImpact` 包含数值 capacity delta、预算或 headroom；existing rule 与 proposed rule 共用该闸门。将 16 条历史 structured capacityPlan 的 budgetImpact 补为 `capacity delta +1` 或 `capacity delta 0`，并新增 synthetic self-test 锁定 unquantified existing budgetImpact 会失败。
- ICE: 8x8x8=512
- Start date: 2026-07-04
- End date: 2026-07-04
- Success metric: `pnpm check:source-projection-rule-taxonomy` 阻断 unquantified budgetImpact；`pnpm build` 通过。
- Result: pass（capacityPlan.budgetImpact 现在必须包含数值 capacity delta、预算或 headroom；16 条历史 structured capacityPlan 已补齐 `capacity delta +1/0`；synthetic self-test 锁定 `Uses remaining capacity after review.` 会失败；taxonomy check 与 build 通过；commit `(this commit)`；质量评分 28/30。）
- Decision: scale（保留 quantifiable budgetImpact 作为 source projection 容量治理闸门；下一步可把 capacity delta 与 effective category budget/headroom 自动比对，避免 `+1/0` 声明和实际预算变化漂移。）

### EXP-199
- Hypothesis: EXP-198 已为 2026-06-28 ChatGPT dictation 与 Claude Tag 写入 case-level FAQ 内链，但最新日报 case signal 仍手写日期清单；若下次内容建设新增实战案例后检查未自动读取 latest fixture，FAQ 长尾入口可能继续漏写或漂移到旧日期。
- Scope: `scripts/check-daily-case-signal-faq-links.mjs`, `GROWTH_QUEUE.md`, `EXPERIMENT_LOG.md`
- Change: `check-daily-case-signal-faq-links` 现在导入 `realCronFixtures`，自动选择最新 `fixtureDate`，解析最新 fixture 的 `## 实战案例` 标题，并通过 case signal catalog 推断 ChatGPT dictation、Claude Tag、ChatGPT personal finance 等需要 FAQ 文案和内链保护的长尾信号；2026-06-27/26 作为 historical baseline 保留。
- ICE: 8x8x8=512
- Start date: 2026-06-28
- End date: 2026-06-28
- Success metric: `pnpm check:daily-case-signal-faq-links` 输出 `latestFixture=2026-06-28, autoSignals=2`，并且 `pnpm build` 通过。
- Result: pass（最新 case-level FAQ link check 已由 latest real cron fixture 自动推断 2 个 signals：ChatGPT dictation 与 Claude Tag；总计 5 个 case-level signals 有 FAQ copy 与内部链接保护；未覆盖的非泛化 practical case 会输出失败诊断；`pnpm check:daily-case-signal-faq-links` 与 `pnpm build` 均通过；commit `(this commit)`；质量评分 28/30。）
- Decision: scale（保留 latest fixture practical case auto-discovery 作为后续内容建设的 FAQ 内链入口闸门；下一步可把 caseSignalCatalog 独立成 fixture metadata 或 source projection metadata，减少脚本内 catalog 维护。）

### EXP-198
- Hypothesis: 最近24小时新增日报（2026-06-28）复用了 ChatGPT finance/dictation、Claude Tag、NVIDIA/AWS 与中国垂直 AI 信号，并新增 NVIDIA TOP500/Green500 超算基础设施信号；若不把最新日报接入 fixture registry 且不锁定 case-level FAQ 内链，EN 页面会继续出现 TOP500/vertical AI 泛化 fallback，Claude Tag 与 ChatGPT dictation 长尾入口也会分散在正文外。
- Scope: `scripts/fixtures/daily-real-cron-2026-06-28.mjs`, `scripts/fixtures/daily-real-cron-fixtures.mjs`, `scripts/lib/source-projection-rules.mjs`, `scripts/check-source-projection-rule-taxonomy.mjs`, `scripts/check-daily-case-signal-faq-links.mjs`, `package.json`, `.github/workflows/content-check.yml`, `src/content/blog/en/openclaw-daily-2026-06-28.md`, `src/content/blog/en/openclaw-daily-2026-06-27.md`, `src/content/blog/en/openclaw-daily-2026-06-26.md`, `src/content/blog/zh/openclaw-daily-2026-06-28.md`, `GROWTH_QUEUE.md`, `EXPERIMENT_LOG.md`
- Change: 新增并注册 2026-06-28 真实 cron fixture；source projection registry 新增 NVIDIA TOP500/Green500 字段级英文 projection 与 display label，并同步 cloud-infrastructure budget / migration hint；EN 最新日报移除 TOP500 与 vertical AI 泛化 fallback；新增 daily case signal FAQ link 闸门并接入 CI，锁定最新 ChatGPT dictation、ChatGPT personal finance 与 Claude Tag 的 FAQ 内链入口；ZH 最新日报补全被截断的垂直行业 AI 内容。
- ICE: 9x8x8=576
- Start date: 2026-06-28
- End date: 2026-06-28
- Success metric: `pnpm check:latest-daily-real-cron-fixture`、`pnpm check:daily-case-signal-faq-links`、`pnpm check:daily-source-projection-labels`、真实 cron EN/ZH/pair、source projection scope/registry health/taxonomy、fixture dedup/parser/publish、latest specificity、CTA/action sections、duplicate precheck 与 `pnpm build` 全部通过。
- Result: pass（latestDaily=2026-06-28 已由最新 real cron fixture 覆盖，expectedSignals=5；新增 TOP500/Green500 source projection 命中字段级 EN 输出；case-level FAQ link check 覆盖 5 个 ChatGPT/Claude case signals；ZH 最新日报截断内容已补全；全部相关检查与 build 通过；commit `(this commit)`；质量评分 28/30。）
- Decision: scale（保留 2026-06-28 fixture 与 case-level FAQ 内链闸门作为周末低新增量日报的首日索引质量基线；下一步可把 case-level FAQ check 泛化为自动读取最新 fixture 的 practical cases，减少手写日期清单。）

### EXP-197
- Hypothesis: EXP-196 已把 2026-06-27 最新日报接入真实 cron fixture 与 50 条 label expectedSignals；若后续内容建设任务发布新双语日报但忘记同步注册最新 real cron fixture，EN/ZH 页面仍可能在首日索引窗口内绕过 source projection 与 headline label 回归检查。
- Scope: `scripts/check-latest-daily-real-cron-fixture.mjs`, `package.json`, `.github/workflows/content-check.yml`, `GROWTH_QUEUE.md`, `EXPERIMENT_LOG.md`
- Change: 新增最新日报 real cron fixture freshness 闸门，扫描 EN/ZH 最新双语日报日期，要求 `realCronFixtures` 最新 `fixtureDate` 与之相同，并要求最新 fixture 至少有 5 条 `expectedSignals`；package script 与 content-check CI 接入该检查。
- ICE: 8x8x8=512
- Start date: 2026-06-27
- End date: 2026-06-27
- Success metric: `pnpm check:latest-daily-real-cron-fixture`、`pnpm check:daily-source-projection-labels` 与 `pnpm build` 全部通过。
- Result: pass（新增 freshness check 已通过：latestDaily=2026-06-27、latest real cron fixture=2026-06-27、expectedSignals=5；daily source projection label metadata check 与 build 均通过；commit `(this commit)`；质量评分 28/30。）
- Decision: scale（保留最新日报 fixture freshness 闸门，后续每日内容建设若先发布日报但未补 fixture，会在 CI 中直接失败；下一步可把 Claude Tag / ChatGPT dictation 等 case-level signal 纳入 fixture case projection 或 FAQ 内链实验。）

### EXP-192
- Hypothesis: EXP-191 已把 2026-06-06 标签迁入 source projection metadata，但 2026-06-05 OpenAI Memory/Lockdown、NVIDIA Cosmos 3、NVIDIA Physical AI Agent Skills、中国高质量数据集与 Unitree IPO 仍未被 label metadata 闸门覆盖；若不继续迁移，最早 06 月 fixture 的首屏标签基线仍分散在 generator fallback 与 expectedSignals 中，且 NVIDIA Cosmos/CVPR 相邻 physical AI 信号容易发生 display label 污染。
- Scope: `scripts/lib/source-projection-rules.mjs`, `scripts/check-daily-source-projection-labels.mjs`, `GROWTH_QUEUE.md`, `EXPERIMENT_LOG.md`
- Change: 为 2026-06-05 NVIDIA Cosmos 3、NVIDIA Physical AI Agent Skills、中国高质量数据集与 Unitree IPO source projection rules 写入 display label metadata；标签检查扩展到 2026-06-05/06/08/11/13/16/18/21 共 40 条 expectedSignals；新增 NVIDIA Cosmos/CVPR synthetic pollution probe，确认 06-05 Cosmos compute label 不覆盖 06-06 CVPR research robotics label。
- ICE: 8x8x8=512
- Start date: 2026-06-25
- End date: 2026-06-25
- Success metric: `pnpm check:daily-source-projection-labels`、`pnpm check:daily-generator-real-cron-fixture`、`pnpm check:daily-bilingual-generator-pair-fixture`、`pnpm check:source-projection-rule-registry-health`、`pnpm check:source-projection-rule-taxonomy`、`pnpm check:duplicate-slug-id` 与 `pnpm build` 通过。
- Result: pass（2026-06-05 四条 headline label 已迁移到 source projection metadata，并复用 OpenAI Memory/Lockdown 条件 label；label check 现要求 2026-06-05/06/08/11/13/16/18/21 共 40 条 expectedSignals 全量由 metadata 命中；NVIDIA Cosmos/CVPR synthetic probe 确认 06-05 Cosmos label 未污染 06-06 CVPR physical AI label；相关 fixture、source projection health/taxonomy、duplicate precheck 与 build 全部通过；commit `1574094`；质量评分 28/30。）
- Decision: scale（继续保留 source projection display label metadata 作为日报首屏标签基线；下一步可继续向 2026-06-04 或更早 fixture 迁移 enLabel，并优先为共享 OpenAI/NVIDIA/China policy rule 增加 fixture-level 条件 label 防污染检查。）

### EXP-191
- Hypothesis: EXP-190 已把 2026-06-08 标签迁入 source projection metadata，但 2026-06-06 NVIDIA Korea、NVIDIA CVPR physical AI 与 6G 省部协同试点仍依赖 generator fallback 组合标签；若不继续迁移，旧 fixture 首屏标签基线仍分散在 generator fallback 与 expectedSignals 中，且 NVIDIA Korea/Doosan 相邻韩国基础设施信号容易发生 display label 污染。
- Scope: `scripts/lib/source-projection-rules.mjs`, `scripts/check-daily-source-projection-labels.mjs`, `GROWTH_QUEUE.md`, `EXPERIMENT_LOG.md`
- Change: 为 2026-06-06 NVIDIA Korea ecosystem、NVIDIA CVPR physical AI 与 China 6G province-ministry pilot source projection rules 写入 display label metadata；标签检查扩展到 2026-06-06/08/11/13/16/18/21 共 35 条 expectedSignals；新增 NVIDIA Korea/Doosan synthetic pollution probe，确认 06-06 CEO compute label 不覆盖 06-08 Doosan GPU compute label。
- ICE: 8x8x8=512
- Start date: 2026-06-25
- End date: 2026-06-25
- Success metric: `pnpm check:daily-source-projection-labels`、`pnpm check:daily-generator-real-cron-fixture`、`pnpm check:daily-bilingual-generator-pair-fixture`、`pnpm check:source-projection-rule-registry-health`、`pnpm check:source-projection-rule-taxonomy`、`pnpm check:duplicate-slug-id` 与 `pnpm build` 通过。
- Result: pass（2026-06-06 三条 headline label 已迁移到 source projection metadata；label check 现要求 2026-06-06/08/11/13/16/18/21 共 35 条 expectedSignals 全量由 metadata 命中；NVIDIA Korea/Doosan synthetic probe 确认 06-06 Korea CEO label 未污染 06-08 Doosan GPU compute label；相关 fixture、source projection health/taxonomy、duplicate precheck 与 build 全部通过；commit `(this commit)`；质量评分 28/30。）
- Decision: scale（继续保留 source projection display label metadata 作为日报首屏标签基线；下一步可继续向 2026-06-05 或更早 fixture 迁移 enLabel，并优先为共享 OpenAI/NVIDIA/China policy rule 增加 fixture-level 条件 label 防污染检查。）

### EXP-190
- Hypothesis: EXP-189 已把 2026-06-11 标签迁入 source projection metadata，但 2026-06-08 NVIDIA Doosan、OpenAI Memory/Lockdown、Anthropic Opus、AWS Quick/Bedrock 与 China provincial AI compute 仍依赖 generator fallback 组合标签；若不继续迁移，旧 fixture 首屏标签基线仍分散在 generator fallback 与 expectedSignals 中，且 OpenAI Lockdown / China provincial 共享 rule 容易污染 2026-06-05/06-06 标签。
- Scope: `scripts/lib/source-projection-rules.mjs`, `scripts/check-daily-source-projection-labels.mjs`, `GROWTH_QUEUE.md`, `EXPERIMENT_LOG.md`
- Change: 为 2026-06-08 NVIDIA Doosan、Anthropic Opus 与 AWS Quick/Bedrock source projection rules 写入 display label metadata；为 OpenAI Memory/Lockdown 与 China provincial AI compute 写入条件 display labels，分别保留 2026-06-05/06-06 既有标签并新增 2026-06-08 标签；标签检查扩展到 2026-06-08/11/13/16/18/21 共 30 条 expectedSignals。
- ICE: 8x8x8=512
- Start date: 2026-06-24
- End date: 2026-06-24
- Success metric: `pnpm check:daily-source-projection-labels`、`pnpm check:daily-generator-real-cron-fixture`、`pnpm check:daily-bilingual-generator-pair-fixture`、`pnpm check:source-projection-rule-registry-health`、`pnpm check:source-projection-rule-taxonomy`、`pnpm check:duplicate-slug-id` 与 `pnpm build` 通过。
- Result: pass（2026-06-08 五条 headline label 已迁移到 source projection metadata；OpenAI Memory/Lockdown 与 China provincial AI compute 使用条件 `displayLabels` 保留 2026-06-05/06-06 旧 fixture 标签，未污染既有真实 cron 输出；label check 现要求 2026-06-08/11/13/16/18/21 共 30 条 expectedSignals 全量由 metadata 命中；相关 fixture、source projection health/taxonomy、duplicate precheck 与 build 全部通过；commit `(this commit)`；质量评分 28/30。）
- Decision: scale（继续保留 source projection display label metadata 作为日报首屏标签基线；下一步可继续向 2026-06-06 或更早 fixture 迁移 enLabel，并优先为复用 rule 增加 fixture-level 条件 label 防污染检查。）

### EXP-189
- Hypothesis: EXP-188 已把 2026-06-13 标签迁入 source projection metadata，但 2026-06-11 DiffusionGemma、DRIVE Hyperion、ChatGPT model picker、China humanoid embodied training 与 App 跳转治理仍依赖 generator fallback 组合标签；若不继续迁移，最早真实 cron fixture 的 headline label 基线仍分散在 generator fallback 与 expectedSignals 中，且共享 China humanoid rule 容易污染 2026-06-13/16 条件 label。
- Scope: `scripts/lib/source-projection-rules.mjs`, `scripts/check-daily-source-projection-labels.mjs`, `GROWTH_QUEUE.md`, `EXPERIMENT_LOG.md`
- Change: 为 2026-06-11 Google DeepMind DiffusionGemma、NVIDIA DRIVE Hyperion、OpenAI ChatGPT model picker 与 China App popup jump regulation source projection rules 写入 display label metadata；为 China humanoid embodied training 写入 2026-06-11 条件 display label，并增加 synthetic pollution probe，确认旧 Xinhua/MIIT label 不覆盖后续 MIIT/SASAC 文本；标签检查扩展到 2026-06-11/13/16/18/21 共 25 条 expectedSignals。
- ICE: 8x8x8=512
- Start date: 2026-06-24
- End date: 2026-06-24
- Success metric: `pnpm check:daily-source-projection-labels`、`pnpm check:daily-generator-real-cron-fixture`、`pnpm check:daily-bilingual-generator-pair-fixture`、`pnpm check:source-projection-rule-registry-health`、`pnpm check:source-projection-rule-taxonomy`、`pnpm check:duplicate-slug-id` 与 `pnpm build` 通过。
- Result: pass（2026-06-11 五条 headline label 已迁移到 source projection metadata；其中 China humanoid embodied training 使用条件 `displayLabels` 锁定 2026-06-11 新华社文本，synthetic probe 确认未污染后续 MIIT/SASAC 文本；label check 现要求 2026-06-11/13/16/18/21 共 25 条 expectedSignals 全量由 metadata 命中；相关 fixture、source projection health/taxonomy、duplicate precheck 与 build 全部通过；commit `(this commit)`；质量评分 28/30。）
- Decision: scale（继续保留 source projection display label metadata 作为日报首屏标签基线；下一步可继续向 2026-06-08 或更早 fixture 迁移 enLabel，并为共享 rule 的条件 label 增加 fixture-level pollution probes。）

### EXP-196
- Hypothesis: 最近24小时新增日报（2026-06-27）暴露 ChatGPT 个人金融/听写/GPT-4.5 退场、Amazon RAISE US、NVIDIA/AWS 生产级基础设施、中国垂直行业 AI 规模化与 MWC 上海 6G/移动 AI 五条信号；若 EN 页面继续使用泛化 `The source tracks...` fallback，最新日报首日索引事实密度与可检索 headline label 会弱于 ZH 原文。
- Scope: `scripts/fixtures/daily-real-cron-2026-06-27.mjs`, `scripts/fixtures/daily-real-cron-fixtures.mjs`, `scripts/lib/source-projection-rules.mjs`, `scripts/check-daily-source-projection-labels.mjs`, `scripts/check-source-projection-rule-taxonomy.mjs`, `src/content/blog/en/openclaw-daily-2026-06-27.md`, `GROWTH_QUEUE.md`, `EXPERIMENT_LOG.md`
- Change: 新增并注册 2026-06-27 真实 cron fixture；source projection registry 新增 ChatGPT finance/dictation/GPT-4.5 retirement、China vertical industry AI scale deployment、China MWC Shanghai 6G/mobile AI 三条字段级英文 projection 与 display label；复用 Amazon RAISE US 与 NVIDIA/AWS projection；EN 2026-06-27 日报由字段级 projection 重写并保留 CTA；标签检查扩展到 50 条 expectedSignals；taxonomy 同步预算、capacityPlan 与 migration hint。
- ICE: 9x8x8=576
- Start date: 2026-06-27
- End date: 2026-06-27
- Success metric: `pnpm check:daily-source-projection-labels`、真实 cron EN/ZH/pair、source projection scope/registry health/taxonomy/metadata/term narrowness、daily dedup、parser guardrail、publish fixture、latest specificity、CTA/action sections、duplicate precheck 与 `pnpm build` 全部通过。
- Result: pass（2026-06-27 真实 cron fixture 已进入 registry；EN 最新日报 Top 5 已升级为 `OpenAI / ChatGPT / finance and dictation controls`、`Amazon / RAISE US / AI workforce training`、`NVIDIA / AWS / vector retrieval infrastructure`、`China / vertical AI / industrial deployment`、`China / 6G / mobile AI infrastructure`；新增三条 source projection rule 与 label metadata，并收窄 DiffusionGemma/6G 旧规则 terms 防止 RTX PRO 与低空经济误命中；全部检查与 build 通过；commit `24e8582`；质量评分 28/30。）
- Decision: scale（保留最新日报 fixture 作为首日索引质量基线；下一步优先把 2026-06-27 实战案例 Claude Tag / ChatGPT dictation 也纳入 case-level projection 或 FAQ 内链实验，提升日报长尾检索入口。）

### EXP-195
- Hypothesis: EXP-194 已证明 splitTargetCategory 能承载真实 effective category budget，但 proposed rule capacity plan 仍按 parent category 输出 `enterprise-agents/cloud-infrastructure/...` 满额动作；若新增日报规则已经声明或可推荐到有余量 split target，仍被 parent 满额要求 capacityPlan，会继续诱导临时 parent budget raise，而不是让维护者按真实 effective category 选低风险 split target。
- Scope: `scripts/check-source-projection-rule-taxonomy.mjs`, `GROWTH_QUEUE.md`, `EXPERIMENT_LOG.md`
- Change: 新增 effective category capacity action summary，并将 proposed rule capacityPlan guard 改为按 `splitTargetCategory || recommendedSplitTarget || category` 判定风险；保留 parent category capacity actions / split scaffold 只用于迁移提示，新增规则容量计划输出改为 effective category 清单。
- ICE: 8x8x8=512
- Start date: 2026-06-26
- End date: 2026-06-26
- Success metric: `pnpm check:source-projection-rule-taxonomy` 输出 `effective category capacity actions` 与 effective `new rule capacity plan required for`；`pnpm check:source-projection-rule-registry-health` 与 `pnpm build` 通过。
- Result: pass（taxonomy 现在同时输出 parent category 迁移提示与 effective category 容量动作；新增规则 capacityPlan guard 已按 declared/recommended split target 或低风险 parent fallback 判定，当前需计划的新增规则目标收敛为 `ai-industrial-policy / enterprise-agent-platforms / frontier-models / robotics-simulation-training / ai-policy-standards / cloud-model-distribution / regional-ai-ecosystems`，不再直接按满额 parent category 阻断；taxonomy、registry health 与 build 全部通过；commit `(this commit)`；质量评分 28/30。）
- Decision: scale（保留 effective capacity plan guard 作为新增 source projection rule 的入口；下一步可为 1-headroom effective categories 自动推荐 alternate split target，进一步降低新日报 projection 的临时预算调整。）

### EXP-194
- Hypothesis: EXP-193 为 2026-06-26 最新日报新增五条 projection 后，enterprise-agents/policy-governance/cloud-infrastructure/consumer-productivity/market-intelligence 等 parent category 仍显示 100% 满额；若 taxonomy 只看 parent budget，后续新增日报仍依赖临时 raise，而不能证明 splitTargetCategory 已经承担真实容量管理。
- Scope: `scripts/check-source-projection-rule-taxonomy.mjs`, `GROWTH_QUEUE.md`, `EXPERIMENT_LOG.md`
- Change: 新增 effective split category budget guard：按 `splitTargetCategory || category` 汇总 effective category budgets / coverage，并为 17 个 split target 与低风险 parent fallback 设置预算；taxonomy validator 阻断 effective category 缺预算或超预算，self-test 锁定 cloud-model-distribution over-budget 诊断。
- ICE: 8x8x8=512
- Start date: 2026-06-26
- End date: 2026-06-26
- Success metric: `pnpm check:source-projection-rule-taxonomy` 输出 `effective category budgets` 与 `effective category coverage: 43/56 split-backed, parentFallback=13, overBudget=0, missingBudget=0`；`pnpm check:source-projection-rule-registry-health` 与 `pnpm build` 通过。
- Result: pass（taxonomy 已按 split target 真实承载容量：当前 56 条 source projection rule 中 43 条 split-backed、13 条低风险 parent fallback；effective category budgets 覆盖 21 个有效分类，overBudget=0、missingBudget=0；synthetic self-test 阻断 `cloud-model-distribution=5/4` 超预算；taxonomy、registry health 与 build 全部通过；commit `(this commit)`；质量评分 28/30。）
- Decision: scale（保留 effective category budget guard 作为真实 category enum 迁移前的容量闸门；下一步可把新增 proposed rule capacity action 从 parent category 切换到 effective category，进一步减少 parent budget raise 依赖。）

### EXP-193
- Hypothesis: 最近24小时新增日报（2026-06-26）暴露 OpenAI GPT-5.5 Instant 决策/购物体验、Amazon RAISE US 劳动力培训、NVIDIA + AWS 生产级 AI 基础设施、Anthropic Claude Tag Slack 团队智能体与中国工业 5G 独立专网五条信号；若 EN 页面继续使用泛化 `The source tracks...` fallback，最新日报首日索引事实密度与可检索 headline label 会弱于 ZH 原文。
- Scope: `scripts/fixtures/daily-real-cron-2026-06-26.mjs`, `scripts/fixtures/daily-real-cron-fixtures.mjs`, `scripts/lib/source-projection-rules.mjs`, `scripts/check-daily-source-projection-labels.mjs`, `scripts/check-source-projection-rule-taxonomy.mjs`, `src/content/blog/en/openclaw-daily-2026-06-26.md`, `GROWTH_QUEUE.md`, `EXPERIMENT_LOG.md`
- Change: 新增并注册 2026-06-26 真实 cron fixture；source projection registry 新增 OpenAI GPT-5.5 Instant、Amazon RAISE US、NVIDIA/AWS EC2 G7 + OpenSearch、Anthropic Claude Tag、China industrial 5G private network 五条字段级英文 projection 与 display label；EN 2026-06-26 日报由字段级 projection 重写；标签检查扩展到 45 条 expectedSignals；taxonomy 为新增满额分类同步 budget、capacityPlan 与 migration hint。
- ICE: 9x8x8=576
- Start date: 2026-06-26
- End date: 2026-06-26
- Success metric: `pnpm check:daily-source-projection-labels`、真实 cron EN/ZH/pair、source projection scope/registry health/taxonomy/metadata/term narrowness、daily dedup、parser guardrail、publish fixture、latest specificity、CTA/action sections、duplicate precheck 与 `pnpm build` 全部通过。
- Result: pass（2026-06-26 真实 cron fixture 已进入 registry；EN 最新日报 Top 5 已升级为 `OpenAI / GPT-5.5 Instant / decision assistance`、`Amazon / RAISE US / AI workforce training`、`NVIDIA / AWS / vector retrieval infrastructure`、`Anthropic / Claude Tag / team agent workflow`、`China / industrial 5G / AI infrastructure pilot`；新增五条 source projection rule 与 label metadata，scope/registry/taxonomy/metadata/term narrowness、真实 cron EN/ZH/pair、dedup、parser guardrail、publish fixture、latest specificity、CTA/action sections、duplicate precheck 与 build 全部通过；commit `(this commit)`；质量评分 28/30。）
- Decision: scale（保留最新日报 fixture 作为首日索引质量基线；下一步优先把满额 parent category 的 budget raise 收敛为真实 split category enum 迁移，降低后续新增日报 source projection 对 parent budget 的依赖。）

### EXP-188
- Hypothesis: EXP-187 已把 2026-06-16 标签迁入 source projection metadata，但 2026-06-13 OpenAI Academy、NVIDIA AgentPerf Blackwell、Claude Corps、中国 AI+ICT 与中国人形机器人实景实训仍依赖 generator fallback 组合标签；若不继续迁移，旧 fixture 的 headline label 基线仍分散在 generator fallback 与 expectedSignals 中，且共享 China humanoid / AI+ICT / AgentPerf rule 容易污染 2026-06-16/18 条件 label。
- Scope: `scripts/lib/source-projection-rules.mjs`, `scripts/check-daily-source-projection-labels.mjs`, `GROWTH_QUEUE.md`, `EXPERIMENT_LOG.md`
- Change: 为 2026-06-13 OpenAI Academy 与 Claude Corps source projection rules 写入 display label metadata；为 NVIDIA AgentPerf、China AI+ICT 与 China humanoid embodied training 写入条件 display label，限定 2026-06-13 特定文本，避免污染 2026-06-16/18 fixture；标签检查扩展到 2026-06-13/16/18/21 共 20 条 expectedSignals。
- ICE: 8x8x8=512
- Start date: 2026-06-23
- End date: 2026-06-23
- Success metric: `pnpm check:daily-source-projection-labels`、`pnpm check:daily-generator-real-cron-fixture`、`pnpm check:daily-bilingual-generator-pair-fixture`、`pnpm check:source-projection-rule-registry-health`、`pnpm check:source-projection-rule-taxonomy`、`pnpm check:duplicate-slug-id` 与 `pnpm build` 通过。
- Result: pass（2026-06-13 五条 headline label 已迁移到 source projection metadata；其中 NVIDIA AgentPerf、China AI+ICT 与 China humanoid embodied training 使用条件 `displayLabels` 锁定 2026-06-13 文本，未污染 2026-06-16/18 fixture；label check 现要求 2026-06-13/16/18/21 共 20 条 expectedSignals 全量由 metadata 命中；相关 fixture、source projection health/taxonomy、duplicate precheck 与 build 全部通过；commit `2fbc63d`；质量评分 28/30。）
- Decision: scale（继续保留 source projection display label metadata 作为日报首屏标签基线；下一步可按日期批次继续迁移 2026-06-11 或更早 fixture 的 enLabel，并为共享 rule 的条件 label 增加更明确的 fixture-level pollution probes。）

### EXP-187
- Hypothesis: EXP-186 已把 2026-06-18/21 标签迁入 source projection metadata，但 2026-06-16 Meta Facebook AI tools、Amazon Content Partners、OpenAI Partner Network、China humanoid embodied training 与 NVIDIA AgentPerf Blackwell 仍依赖 generator fallback 组合标签；若不继续迁移，旧 fixture 的首屏标签仍会和 metadata 标签基线分裂，且共享 China humanoid / AgentPerf rule 可能污染 2026-06-11/13。
- Scope: `scripts/lib/source-projection-rules.mjs`, `scripts/check-daily-source-projection-labels.mjs`, `scripts/fixtures/daily-real-cron-2026-06-16.mjs`, `src/content/blog/en/openclaw-daily-2026-06-16.md`, `GROWTH_QUEUE.md`, `EXPERIMENT_LOG.md`
- Change: 为 2026-06-16 Meta Facebook AI tools、Amazon Content Partners、OpenAI Partner Network source projection rules 写入 display label metadata；为 China humanoid embodied training 与 NVIDIA AgentPerf 写入条件 display label，限定 2026-06-16 特定文本，避免污染 2026-06-11/13 fixture；标签检查扩展到 2026-06-16/18/21 共 15 条 expectedSignals；EN 2026-06-16 页面同步回写新 headline 与 evidence label。
- ICE: 8x8x8=512
- Start date: 2026-06-23
- End date: 2026-06-23
- Success metric: `pnpm check:daily-source-projection-labels`、`pnpm check:daily-generator-real-cron-fixture`、`pnpm check:daily-bilingual-generator-pair-fixture`、`pnpm check:source-projection-rule-registry-health`、`pnpm check:source-projection-rule-taxonomy`、`pnpm check:duplicate-slug-id` 与 `pnpm build` 通过。
- Result: pass（2026-06-16 五条 headline label 已迁移到 source projection metadata；其中 China humanoid embodied training 与 NVIDIA AgentPerf 使用条件 `displayLabels` 锁定 2026-06-16 文本，未污染 2026-06-11/13 fixture；label check 现要求 2026-06-16/18/21 共 15 条 expectedSignals 全量由 metadata 命中；EN 页面同步回写新 label；相关 fixture、source projection health/taxonomy、duplicate precheck 与 build 全部通过；commit `dfa5bb4`；质量评分 28/30。）
- Decision: scale（继续保留 source projection display label metadata 作为日报首屏标签基线；下一步可按日期批次继续迁移 2026-06-13 或更早 fixture 的 enLabel，并为共享 rule 的条件 label 增加 fixture-level pollution probes。）

### EXP-186
- Hypothesis: EXP-185 已把 2026-06-21 与 Anthropic Korea 标签迁入 source projection metadata，但 2026-06-18 AWS Agent Continuum、ChatGPT Scheduled Tasks、中国 AI+ICT 与 NVIDIA Blackwell MLPerf 仍依赖 generator fallback 组合标签；若不继续把最新旧 fixture 的 headline label 写入 rule metadata，首屏标签基线仍会分散在 fixture expectedSignals 与 generator fallback 之间，后续 label taxonomy 改动容易造成静默漂移。
- Scope: `scripts/lib/source-projection-rules.mjs`, `scripts/check-daily-source-projection-labels.mjs`, `GROWTH_QUEUE.md`, `EXPERIMENT_LOG.md`
- Change: 为 2026-06-18 AWS Agent Continuum、ChatGPT Scheduled Tasks、NVIDIA Blackwell MLPerf source projection rules 写入 display label metadata；为中国 AI+ICT 写入条件 display label，限定科技日报/新华社版本，避免污染 2026-06-13 MIIT label；标签检查从白名单基线改为 2026-06-18 与 2026-06-21 expectedSignals 全量 metadata 校验。
- ICE: 8x8x8=512
- Start date: 2026-06-22
- End date: 2026-06-22
- Success metric: `pnpm check:daily-source-projection-labels`、`pnpm check:daily-generator-real-cron-fixture`、`pnpm check:daily-bilingual-generator-pair-fixture` 与 `pnpm build` 通过。
- Result: pass（2026-06-18 剩余 4 条 headline label 已迁移到 source projection metadata；其中中国 AI+ICT 使用条件 `displayLabels` 锁定 2026-06-18 科技日报/新华社文本，未污染 2026-06-13 fixture；label check 现要求 2026-06-18/21 共 10 条 expectedSignals 全量由 metadata 命中；相关 fixture 与 build 全部通过；commit `3eea7ea`；质量评分 28/30。）
- Decision: scale（继续保留 source projection display label metadata 作为日报首屏标签基线；下一步可按日期批次继续迁移 2026-06-16 或更早 fixture 的 enLabel，并为条件 label 增加重叠污染 probe。）

### EXP-185
- Hypothesis: EXP-184 已为最新日报补齐 topic-specific label，但这些标签仍硬编码在 `daily-generator.mjs` 的 token 条件里；若后续新增日报 source projection rule 继续依赖 generator 内部条件，标签维护会和 registry metadata 漂移，最新日报首屏可检索标签容易回退为泛化实体拼接。
- Scope: `scripts/lib/source-projection-rules.mjs`, `scripts/lib/daily-generator.mjs`, `scripts/check-daily-source-projection-labels.mjs`, `package.json`, `.github/workflows/content-check.yml`, `GROWTH_QUEUE.md`, `EXPERIMENT_LOG.md`
- Change: 在 source projection registry 中新增 display label metadata，并导出 `projectEnglishSourceLabel`；daily generator 标题 label 优先读取 source projection metadata，而不是维护独立 token override；新增 label metadata 闸门并接入 CI。
- ICE: 8x8x8=512
- Start date: 2026-06-22
- End date: 2026-06-22
- Success metric: `pnpm check:daily-source-projection-labels`、`pnpm check:daily-generator-real-cron-fixture`、`pnpm check:daily-bilingual-generator-pair-fixture` 与 `pnpm build` 通过。
- Result: pass（source projection rules 已为 OpenAI Codex Record & Replay、Alexa+ Brazil、HPE AI Factory、Anthropic Korea、WAICO 写入 display label metadata；daily generator 已移除 token-level topic label override 并优先读取 `projectEnglishSourceLabel`；新闸门锁定 2026-06-21 五条 label、2026-06-18 Anthropic Korea label 和 HPE 条件 label 不污染宽泛 NVIDIA AI Cloud；相关 fixture 与 build 全部通过；commit `270435d`；质量评分 28/30。）
- Decision: scale（保留 source projection display label metadata 作为日报首屏标签基线；下一步可把更多旧 fixture 的 `enLabel` 逐步迁移到 rule metadata，并检查是否能由 `splitTargetCategory` 自动生成 fallback label。）

### EXP-184
- Hypothesis: EXP-183 已把 2026-06-21 source projection 做到字段级事实改写，但 generator headline label 仍出现 `model capability update`、`enterprise AI rollout` 等泛化标签；若最新日报的 Top 5 标题仍沿用实体拼接标签，首屏可检索性和用户理解会弱于 source projection detail。
- Scope: `scripts/lib/daily-generator.mjs`, `scripts/fixtures/daily-real-cron-2026-06-21.mjs`, `scripts/fixtures/daily-real-cron-2026-06-18.mjs`, `src/content/blog/en/openclaw-daily-2026-06-21.md`, `src/content/blog/en/openclaw-daily-2026-06-18.md`, `GROWTH_QUEUE.md`, `EXPERIMENT_LOG.md`
- Change: 在 English daily generator 中新增 topic-specific label override，优先把 2026-06-21 Codex Record & Replay、Alexa+ Brazil、HPE AI Factory、Anthropic Korea、WAICO 等 latest source projection 信号映射为更窄的可检索标签，并同步回收 2026-06-18 Anthropic Korea 的泛化 label。
- ICE: 8x7x8=448
- Start date: 2026-06-21
- End date: 2026-06-21
- Success metric: `pnpm check:daily-generator-real-cron-fixture`、`pnpm check:daily-bilingual-generator-pair-fixture` 与 `pnpm build` 通过。
- Result: pass（2026-06-21 EN Top 5 已升级为 `OpenAI / Codex / ChatGPT control surfaces`、`Amazon / Alexa+ / consumer AI localization`、`NVIDIA / HPE / AI infrastructure capacity`、`Anthropic / Korea / regional AI ecosystem`、`China / WAICO / AI governance coordination`；2026-06-18 Anthropic Korea 也回收为 regional AI ecosystem；真实 cron fixture、双语 pair fixture 与 build 全部通过；commit `(this commit)`；质量评分 27/30。）
- Decision: scale（保留 topic-specific label override 作为最新 source projection 信号的首屏可检索标签基线；下一步可把 override 从硬编码 token 迁移为由 source projection rule metadata / splitTargetCategory 自动生成。）

### EXP-183
- Hypothesis: 最近24小时新增日报（2026-06-21）暴露 OpenAI ChatGPT/Codex Record & Replay、Amazon Alexa+ Brazil、NVIDIA/HPE AI Factory、Anthropic Korea 与中国筹建世界人工智能合作组织五条信号；若这些信号只停留在 ZH 页面和泛化 EN 页面，EN generator 会继续输出 `The source tracks...` / `buyers must check...` 模板句，削弱最新日报首日索引事实密度。
- Scope: `scripts/fixtures/daily-real-cron-2026-06-21.mjs`, `scripts/fixtures/daily-real-cron-fixtures.mjs`, `scripts/lib/source-projection-rules.mjs`, `scripts/check-source-projection-rule-taxonomy.mjs`, `src/content/blog/en/openclaw-daily-2026-06-21.md`, `GROWTH_QUEUE.md`, `EXPERIMENT_LOG.md`
- Change: 新增并注册 2026-06-21 真实 cron fixture；source projection registry 新增 OpenAI Codex Record & Replay、Amazon Alexa+ Brazil localization、中国世界人工智能合作组织三条字段级英文规则，并让 NVIDIA AI cloud 规则命中 HPE AI Factory；EN 2026-06-21 日报由字段级 projection 重写 story 1/2/5 并保留 CTA；taxonomy migration hint 将 Alexa+ 分入 consumer-creative-ai。
- ICE: 9x8x8=576
- Start date: 2026-06-21
- End date: 2026-06-21
- Success metric: `pnpm check:source-projection-rule-scope`、`pnpm check:source-projection-rule-registry-health`、`pnpm check:source-projection-rule-taxonomy`、`pnpm check:source-projection-rule-metadata-coverage`、`pnpm check:source-projection-rule-term-narrowness`、真实 cron EN/ZH/pair、dedup、parser guardrail coverage、publish fixture、latest specificity、CTA/action sections、duplicate precheck 与 `pnpm build` 通过。
- Result: pass（2026-06-21 真实 cron fixture 已进入 registry；新增 OpenAI Codex Record & Replay、Amazon Alexa+ Brazil localization、中国世界人工智能合作组织三条字段级 projection，并复用 Anthropic Korea 与 NVIDIA AI cloud/HPE AI Factory；EN 最新日报 story 1/2/5 已从泛化 fallback 改为字段级事实改写；source projection totalRules=51，existing split target coverage=39/39；全部检查与 build 通过；commit `(this commit)`；质量评分 28/30。）
- Decision: scale（保留 2026-06-21 fixture 作为周末低新增量日报的首日索引质量基线；下一步优先把 generator label taxonomy 也升级到 split target / topic-specific label，减少 Alexa+、WAICO 这类新信号仍显示通用 label 的问题。）

### EXP-182
- Hypothesis: EXP-181 已为 37 条高风险 parent category rule 写入 `splitTargetCategory`，但 registry health 仍只输出 pass/fail，维护者看不到生成器/registry 真实会按哪些 split target 承载规则；若健康检查不优先读取 split target，parent category 满额后的迁移收益仍难以验证。
- Scope: `scripts/check-source-projection-rule-registry-health.mjs`, `GROWTH_QUEUE.md`, `EXPERIMENT_LOG.md`
- Change: registry health 新增 effective category summary，按 `splitTargetCategory || category` 聚合 source projection rules；成功路径输出 split target 优先后的有效分类分布与 parent category fallback 数量；self-test 锁定 split target 优先级、排序和 fallback 计数。
- ICE: 8x8x8=512
- Start date: 2026-06-20
- End date: 2026-06-20
- Success metric: `pnpm check:source-projection-rule-registry-health` 输出 `source projection registry effective category summary: totalRules=48`、`effective categories` 与 `parent category fallback rules: 11`；`pnpm check:source-projection-rule-taxonomy` 与 `pnpm build` 通过。
- Result: pass（registry health 已按 `splitTargetCategory || category` 输出 effective category summary；当前 48 条 rule 分布为 robotics-simulation-training=5、ai-industrial-policy=4、enterprise-agent-platforms=4 等，未迁移低风险 parent category fallback 为 11；self-test 锁定 split target 优先级、排序与 fallback 计数；registry health、taxonomy 与 build 全部通过；commit `(this commit)`；质量评分 27/30。）
- Decision: scale（保留 registry health effective category summary 作为 split target 迁移可视化基线；下一步可让生成器/展示层也读取 effective category，或为剩余 11 条低风险 parent fallback 设计是否需要 split 的专项实验。）

### EXP-181
- Hypothesis: EXP-180 已让 proposed rule 在新增前声明 splitTargetCategory，但 37 条已存在的高风险 category rule 仍只停留在 parent category；若不把现有 registry 显式迁移到 split target metadata，后续真实 category enum 迁移仍需要重新依赖 CLI migration details 手工对应，且可能出现漏填、填错或与 migration hint 漂移。
- Scope: `scripts/lib/source-projection-rules.mjs`, `scripts/check-source-projection-rule-taxonomy.mjs`, `GROWTH_QUEUE.md`, `EXPERIMENT_LOG.md`
- Change: 为 37 条命中 split recommendations 的现有 source projection rules 写入 `splitTargetCategory`；新增 existing rule split target coverage summary 与 validation，阻断缺失、非法 target、以及与 migration hint 不一致的 target；taxonomy summary 输出覆盖率并用 self-test 锁定 missing/invalid/mismatched 诊断。
- ICE: 8x8x8=512
- Start date: 2026-06-20
- End date: 2026-06-20
- Success metric: `pnpm check:source-projection-rule-taxonomy` 输出 `existing rule split target coverage: 37/37 covered, missing=0, invalid=0, mismatched=0`；`pnpm check:source-projection-rule-registry-health`、`pnpm check:source-projection-rule-scope` 与 `pnpm build` 通过。
- Result: pass（37 条现有 high-risk source projection rules 已写入 splitTargetCategory；taxonomy CLI 已输出 `existing rule split target coverage: 37/37 covered, missing=0, invalid=0, mismatched=0`；self-test 锁定 existing rule 缺 target、非法 target、与 migration hint 不一致三类失败诊断；taxonomy、registry health、scope 与 build 全部通过；commit `(this commit)`；质量评分 28/30。）
- Decision: scale（保留 existing rule split target coverage guard 作为真实 category enum 迁移前的 registry 基线；下一步可把 generator / registry health 迁移为优先读取 splitTargetCategory，逐步降低 parent category 满额对新增日报 source projection 的阻塞。）

### EXP-180
- Hypothesis: EXP-179 已锁定 17 个 split target enum 及 hint 覆盖，但新增 proposed rule 仍只能看到全局 split recommendations；若不在新增规则层面自动推荐/校验 `splitTargetCategory`，维护者仍可能把 OpenAI Partner Network、AWS AgentCore、ChatGPT Scheduled Tasks 等新日报规则继续写入满额 parent category，而没有声明应迁移到哪个 split target。
- Scope: `scripts/check-source-projection-rule-taxonomy.mjs`, `GROWTH_QUEUE.md`, `EXPERIMENT_LOG.md`
- Change: 新增 proposed rule split target scaffold helper 与 validator，复用既有 capacity action、split recommendations 与 migration hints；taxonomy summary 输出 6 个高风险 parent category 的 split target scaffold；self-test 锁定推荐 target、非法 target 诊断与合法 target 通过。
- ICE: 8x8x8=512
- Start date: 2026-06-19
- End date: 2026-06-19
- Success metric: `pnpm check:source-projection-rule-taxonomy` 输出 `proposed rule split target scaffold`；缺失/非法 `splitTargetCategory` 的 proposed rule self-test 失败文案包含推荐或可选 target；`pnpm build` 通过。
- Result: pass（taxonomy CLI 已输出 6 个高风险 parent category 的 proposed rule split target scaffold；self-test 锁定 OpenAI Partner Network 新规则缺 `splitTargetCategory` 时推荐 `enterprise-agent-platforms`，非法 `cloud-model-distribution` 用在 enterprise-agents 时失败并列出三个合法 target，合法 `enterprise-agent-platforms` 通过；taxonomy 与 build 全部通过；commit `(this commit)`；质量评分 28/30。）
- Decision: scale（保留 proposed rule split target scaffold 作为真实 category enum 迁移前的新增规则入口；下一步可把真实 rule registry 分阶段迁移到 split target enum 字段，并让 registry health 检查现有 rule 的 split target 覆盖。）

### EXP-179
- Hypothesis: EXP-178 已为 consumer-productivity 与 market-intelligence 补齐 split recommendations / migration details，但 split target 仍只是自由字符串；若后续迁移真实 category enum 前没有 allowlist、hint 覆盖、stale hint 与跨 parent 复用检查，拆分目标可能拼写漂移或出现无迁移 hint 的半成品 scaffold，导致新增日报 source projection rule 继续卡在高风险 category。
- Scope: `scripts/check-source-projection-rule-taxonomy.mjs`, `GROWTH_QUEUE.md`, `EXPERIMENT_LOG.md`
- Change: 新增 `ALLOWED_SOURCE_PROJECTION_SPLIT_TARGET_CATEGORIES` 作为 17 个 split target enum allowlist；新增 `summarizeSourceProjectionSplitTargetCategories` 与 `validateSourceProjectionSplitTargetCategories`，检查 unknown target、missing migration hint、stale hint、unused allowlist 与跨 parent target 复用；taxonomy summary 输出 split target coverage，并用 self-test 锁定异常诊断。
- ICE: 8x8x8=512
- Start date: 2026-06-19
- End date: 2026-06-19
- Success metric: `pnpm check:source-projection-rule-taxonomy` 输出 `split target categories: 17/17 used, missingHints=0, staleHints=0, unknown=0, unusedAllowed=0, duplicate=0`；`pnpm check:source-projection-rule-registry-health` 与 `pnpm build` 通过。
- Result: pass（taxonomy CLI 已输出 17/17 split target 全覆盖，missingHints/staleHints/unknown/unusedAllowed/duplicate 均为 0；synthetic self-test 锁定 unknown、missing hint、stale hint 与 duplicate target 诊断；source projection registry health 与 build 全部通过；commit `(this commit)`；质量评分 28/30。）
- Decision: scale（保留 split target enum coverage guard 作为真实 category enum 迁移前的 scaffold 闸门；下一步可将高风险 category 分阶段迁移到 split target enum，并为 proposed rule scaffold 自动推荐目标 split category。）

### EXP-178
- Hypothesis: EXP-177 后 taxonomy 已显示 consumer-productivity=4/5、market-intelligence=4/5，且两者进入 high utilization / low headroom；若 split recommendations 仍只覆盖 enterprise/cloud/policy/robotics，最近24小时新增的 ChatGPT Scheduled Tasks、Anthropic Korea 与 Amazon Content Partners 等消费/市场信号仍没有可直接执行的 category split migration 方向。
- Scope: `scripts/check-source-projection-rule-taxonomy.mjs`, `GROWTH_QUEUE.md`, `EXPERIMENT_LOG.md`
- Change: 为 consumer-productivity 新增 `career-productivity-workflows / chatgpt-control-surfaces / consumer-creative-ai` split recommendations 与 migration hints；为 market-intelligence 新增 `market-sizing-reports / content-licensing-markets / regional-ai-ecosystems` split recommendations 与 migration hints；补充 recent-signal self-test 锁定 8 条现有 consumer/market rules 的 batches 与 details 输出。
- ICE: 8x8x8=512
- Start date: 2026-06-18
- End date: 2026-06-18
- Success metric: `pnpm check:source-projection-rule-taxonomy` 输出 consumer-productivity 与 market-intelligence 的 split recommendations、migration batches、migration details；`pnpm build` 通过。
- Result: pass（taxonomy CLI 当前输出 consumer-productivity split 为 `career-productivity-workflows / chatgpt-control-surfaces / consumer-creative-ai`，并将 `chatgpt-jobs-resume-tools`、ChatGPT model picker / Scheduled Tasks、Meta Facebook AI tools 分桶；market-intelligence split 为 `market-sizing-reports / content-licensing-markets / regional-ai-ecosystems`，并将 China AI industry report、Amazon Content Partners、Shanghai Tech Fair / Anthropic Korea 分桶；recent-signal self-test、taxonomy 与 build 全部通过；commit `(this commit)`；质量评分 28/30。）
- Decision: scale（保留 consumer/market split migration details 作为新增日报 source projection rule 前的分桶基线；下一步可执行真实 category enum 迁移或把 split target 写入 proposed rule scaffold。）

### EXP-177
- Hypothesis: 最近24小时新增日报（2026-06-18）已暴露 AWS Continuum/Context/Bedrock AgentCore、Anthropic 首尔办公室与韩国生态、ChatGPT Scheduled Tasks/Pulse 迁移、中国 AI+ICT 实施意见、NVIDIA Blackwell MLPerf Training 6.0 五条信号；若这些信号只停留在 ZH 页面和泛化 EN 页面，EN generator 会继续输出 `The source tracks...` / `buyers must check...` 模板句，削弱首日索引事实密度。把 2026-06-18 样本纳入 fixture registry 并新增字段级 projection，可锁定当日 EN/ZH/pair 输出和 source projection 作用域。
- Scope: `scripts/fixtures/daily-real-cron-2026-06-18.mjs`, `scripts/fixtures/daily-real-cron-fixtures.mjs`, `scripts/lib/source-projection-rules.mjs`, `src/content/blog/en/openclaw-daily-2026-06-18.md`, `src/content/blog/zh/openclaw-daily-2026-06-18.md`, `GROWTH_QUEUE.md`, `EXPERIMENT_LOG.md`
- Change: 新增并注册 2026-06-18 真实 cron fixture；source projection registry 新增 AWS Agent Continuum/Context/Bedrock AgentCore、Anthropic Korea Seoul ecosystem、ChatGPT Scheduled Tasks/Pulse、NVIDIA Blackwell MLPerf Training 6.0 四条字段级英文规则，并复用中国 AI+ICT 规则；fixture 写入 `sourceProjectionRuleMatches`、required EN/ZH outputs、banned fallback 与 story 1/3/5 guardrail；EN/ZH 2026-06-18 日报用新 generator 重写并补齐 ZH 案例 2。
- ICE: 9x8x8=576
- Start date: 2026-06-18
- End date: 2026-06-18
- Success metric: `pnpm check:source-projection-rule-scope` 通过；`pnpm check:source-projection-rule-registry-health` 通过；`pnpm check:source-projection-rule-taxonomy` 通过；`pnpm check:source-projection-rule-metadata-coverage` 通过；`pnpm check:source-projection-rule-term-narrowness` 通过；`pnpm check:daily-generator-real-cron-fixture` 通过；`pnpm check:daily-zh-generator-real-cron-fixture` 通过；`pnpm check:daily-bilingual-generator-pair-fixture` 通过；`pnpm check:daily-fixture-source-dedup` 通过；`pnpm check:daily-parser-guardrail-coverage` 通过；`pnpm check:publish-daily-generator-fixture` 通过；`pnpm check:daily-brief-specificity` 通过；`pnpm check:daily-cta` 通过；`pnpm check:daily-action-sections` 通过；`pnpm check:duplicate-slug-id` 通过；`pnpm build` 通过。
- Result: pass（2026-06-18 真实 cron fixture 已进入 registry；EN/ZH/pair fixture 锁定 AWS Agent Continuum、Anthropic Korea、ChatGPT Scheduled Tasks、中国 AI+ICT 与 NVIDIA Blackwell MLPerf 五条输出；source projection scope/registry/taxonomy 覆盖新规则，taxonomy 当前显示 totalRules=48；EN 最新日报不再使用泛化 `The source tracks...` 模板，改为字段级事实改写；ZH 最新日报补齐第二个实战案例；专项 fixture、source projection、latest specificity 与 build 全部通过；commit `86a95ce`；质量评分 28/30。）
- Decision: scale（保留 2026-06-18 fixture 作为最新日报首日索引质量基线；下一步优先执行 cloud-infrastructure / consumer-productivity / market-intelligence category split migration，避免低 headroom 分类继续阻断新日报 source projection rule。）

### EXP-176
- Hypothesis: EXP-175 已输出高风险 category 的 split migration batch 计数；若 CLI 只显示每个目标细分类有几条 rule，而不列出具体 rule name，维护者仍要回到 registry 手动定位并复制迁移对象。新增 split migration details，可把批量迁移从“统计摘要”升级为可直接执行的 rule 清单，降低真实 category 枚举迁移成本。
- Scope: `scripts/check-source-projection-rule-taxonomy.mjs`, `GROWTH_QUEUE.md`, `EXPERIMENT_LOG.md`
- Change: 在 taxonomy summary 中新增 `category split migration details` 诊断，复用 EXP-175 migration batches 输出每个目标细分类对应的具体 rule name，并补齐 none 场景与 enterprise-agents 迁移清单 self-test。
- ICE: 8x8x8=512
- Start date: 2026-06-17
- End date: 2026-06-17
- Success metric: `pnpm check:source-projection-rule-taxonomy` 与 `pnpm build` 通过；CLI 输出四个高风险 category 的可复制迁移 rule 清单。
- Result: pass（taxonomy summary 已输出 `category split migration details`，覆盖 enterprise-agents、policy-governance、cloud-infrastructure、physical-ai-robotics 的目标细分类 rule 清单；taxonomy 检查与 build 通过）。
- Decision: scale

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

### EXP-175
- Hypothesis: EXP-174 已输出 enterprise-agents、policy-governance、cloud-infrastructure、physical-ai-robotics 的 split recommendations；若只给目标分类名，不给当前 rule 到目标分类的批量迁移建议，维护者仍需要逐条阅读 44 条 registry rule 才能执行 category 枚举迁移。新增 split migration batches，可把高风险 category 的现有 rules 自动分桶到候选细分类，降低下一步真实 category migration 的人工判断成本。
- Scope: `scripts/check-source-projection-rule-taxonomy.mjs`、`GROWTH_QUEUE.md`、`EXPERIMENT_LOG.md`
- Change: 新增 `SOURCE_PROJECTION_CATEGORY_SPLIT_MIGRATION_HINTS` 与 `suggestSourceProjectionCategorySplitMigrationBatches`；taxonomy summary 成功路径新增 `category split migration batches` 行；当前对 enterprise-agents、policy-governance、cloud-infrastructure、physical-ai-robotics 输出可执行迁移批次，并通过 rule name、terms 与 projection details 匹配目标细分类；summary self-test 锁定低风险样本输出 `none` 与 enterprise-agents 可诊断分桶。
- Start date: 2026-06-17
- End date: 2026-06-17
- Success metric: `pnpm check:source-projection-rule-taxonomy` 输出 `category split migration batches`；`pnpm build` 通过。
- Result: pass（taxonomy CLI 当前输出 `category split migration batches: enterprise-agents: enterprise-agent-platforms=4, vertical-workflow-agents=2, agent-enablement-programs=2; policy-governance: ai-policy-standards=2, ai-industrial-policy=4, digital-regulation-compliance=1; cloud-infrastructure: cloud-model-distribution=2, ai-infrastructure-capacity=3; physical-ai-robotics: robotics-simulation-training=5, robotics-commercial-deployment=2, autonomous-mobility-systems=1`；taxonomy 与 build 全部通过；commit `(this commit)`；质量评分 28/30。）
- Decision (scale / iterate / stop): scale（保留 split migration batches 作为 category enum 迁移前的准备层；下一步可新增真实 split category 枚举并分阶段迁移 enterprise-agents，避免 8/8 满额阻断后续日报 source projection rule。）

### EXP-174
- Hypothesis: EXP-173 后 enterprise-agents 已达到 8/8 满额，policy-governance 与 cloud-infrastructure 也只剩 1 条 headroom；若 taxonomy 只要求新增规则附带 capacityPlan，而不输出可执行拆分方向，维护者仍需要临场判断应该拆成哪些更细分类，新增日报 source projection 会继续卡在满额 category。新增 category split recommendations，可把高风险分类直接映射为下一步可落地的拆分候选。
- Scope: `scripts/check-source-projection-rule-taxonomy.mjs`、`GROWTH_QUEUE.md`、`EXPERIMENT_LOG.md`
- Change: 新增 `SOURCE_PROJECTION_CATEGORY_SPLIT_RECOMMENDATIONS` 与 `suggestSourceProjectionCategorySplitPlans`；taxonomy summary 成功路径新增 `category split recommendations` 行；当前对 enterprise-agents、policy-governance、cloud-infrastructure、physical-ai-robotics 输出具体拆分候选；self-test 锁定无风险样本输出 `none` 与 enterprise-agents 满额时的拆分文案。
- Start date: 2026-06-16
- End date: 2026-06-16
- Success metric: `pnpm check:source-projection-rule-taxonomy` 输出 `category split recommendations`；`pnpm build` 通过。
- Result: pass（taxonomy CLI 当前输出 enterprise-agents 拆分为 `enterprise-agent-platforms / vertical-workflow-agents / agent-enablement-programs`，policy-governance 拆分为 `ai-policy-standards / ai-industrial-policy / digital-regulation-compliance`，cloud-infrastructure 拆分为 `cloud-model-distribution / ai-infrastructure-capacity`，physical-ai-robotics 拆分为 `robotics-simulation-training / robotics-commercial-deployment / autonomous-mobility-systems`；无风险与 enterprise-agents 满额 self-test 已锁定；taxonomy 与 build 全部通过；commit `(this commit)`；质量评分 28/30。）
- Decision (scale / iterate / stop): scale（保留 split recommendations 作为新增 source projection rule 前的拆分提示；下一步可把推荐拆分升级为可选的新 category 枚举迁移实验，先迁移 enterprise-agents 中平台、垂直工作流、赋能计划三类规则。）

### EXP-173
- Hypothesis: 最近24小时新增日报（2026-06-16）已经暴露 Meta Facebook AI Mode/创作工具、Amazon Content Partners 内容授权预览、OpenAI Partner Network 企业落地生态、中国人形机器人实景实训与 NVIDIA AgentPerf Blackwell 五条信号；若这些信号只停留在 ZH/泛化 EN 页面，EN generator 会继续输出 `The source tracks...` / `buyers must check...` 模板句，削弱首日索引事实密度。把 2026-06-16 样本纳入 fixture registry 并新增字段级 projection，可锁定当日 EN/ZH/pair 输出和 source projection 作用域。
- Scope: `scripts/fixtures/daily-real-cron-2026-06-16.mjs`、`scripts/fixtures/daily-real-cron-fixtures.mjs`、`scripts/lib/source-projection-rules.mjs`、`src/content/blog/en/openclaw-daily-2026-06-16.md`、`src/content/blog/zh/openclaw-daily-2026-06-16.md`、`GROWTH_QUEUE.md`、`EXPERIMENT_LOG.md`
- Change: 新增 2026-06-16 真实 cron fixture 并注册到 registry；新增 `meta-facebook-ai-tools-2026`、`amazon-content-partners-ai-crawler-preview-2026`、`openai-partner-network-enterprise-ecosystem-2026` 三条字段级英文 source projection，复用中国人形机器人实景实训与 NVIDIA AgentPerf Blackwell 规则；OpenAI Partner Network 规则附带 enterprise-agents capacity plan；重写 2026-06-16 EN/ZH 日报，移除泛化 source fallback 并保留 CTA 内链。
- Start date: 2026-06-16
- End date: 2026-06-16
- Success metric: `pnpm check:source-projection-rule-scope` 通过；`pnpm check:source-projection-rule-registry-health` 通过；`pnpm check:source-projection-rule-taxonomy` 通过；`pnpm check:source-projection-rule-metadata-coverage` 通过；`pnpm check:source-projection-rule-term-narrowness` 通过；`pnpm check:daily-generator-real-cron-fixture` 通过；`pnpm check:daily-zh-generator-real-cron-fixture` 通过；`pnpm check:daily-bilingual-generator-pair-fixture` 通过；`pnpm check:daily-fixture-source-dedup` 通过；`pnpm check:daily-parser-guardrail-coverage` 通过；`pnpm check:publish-daily-generator-fixture` 通过；`pnpm check:daily-brief-specificity` 通过；`pnpm check:daily-cta` 通过；`pnpm check:daily-action-sections` 通过；`pnpm check:duplicate-slug-id` 通过；`pnpm build` 通过。
- Result: pass（2026-06-16 真实 cron fixture 已进入 registry；EN/ZH/pair fixture 已锁定 Meta Facebook AI tools、Amazon Content Partners、China humanoid embodied training、OpenAI Partner Network 与 NVIDIA AgentPerf Blackwell 五条输出；source projection scope/registry/taxonomy/metadata/term narrowness 全部通过；taxonomy 当前 totalRules=44，enterprise-agents=8/8 并由 OpenAI Partner Network 规则附带 capacity plan；EN 最新日报不再使用泛化 `The source tracks...` 模板，改为字段级事实改写；CTA/action sections、latest specificity、duplicate precheck 与 build 全部通过；commit `(this commit)`；质量评分 28/30。）
- Decision (scale / iterate / stop): scale（保留 2026-06-16 fixture 作为最新日报首日索引质量基线；下一步应优先为 enterprise-agents 满额后的新增 source projection 设计 category split / budget raise 专项实验，避免后续新增 enterprise rule 被预算闸门阻断。）

### EXP-172
- Hypothesis: EXP-171 已输出 category capacity actions；若新增 source projection rule 命中 enterprise-agents、policy-governance、cloud-infrastructure、physical-ai-robotics 等高风险 category 时仍不要求分流或提高预算理由，维护者可能看见 warning 但继续追加规则，导致 registry 在低 headroom / 高 utilization 分类里继续膨胀。新增 proposed rule capacity plan guard，可把 capacity action 从摘要提醒升级为新增规则前的可复用校验。
- Scope: `scripts/check-source-projection-rule-taxonomy.mjs`、`GROWTH_QUEUE.md`、`EXPERIMENT_LOG.md`
- Change: 新增 `categoriesRequiringSourceProjectionCapacityPlan` 与 `validateSourceProjectionRuleCategoryCapacityPlan`，自动读取当前 taxonomy capacity actions；proposed rule 若命中高风险 category 且缺少 `capacityPlan` / `capacityJustification`，会输出包含 category、utilization/headroom reason 与行动建议的失败诊断；taxonomy summary 新增 `new rule capacity plan required for` 行；self-test 锁定 developer-tools 100% synthetic 缺 plan 失败与带 plan 通过。
- Start date: 2026-06-16
- End date: 2026-06-16
- Success metric: `pnpm check:source-projection-rule-taxonomy` 输出 `new rule capacity plan required for`；`pnpm check:source-projection-rule-registry-health` 通过；`pnpm build` 通过。
- Result: pass（taxonomy CLI 当前输出 `new rule capacity plan required for: enterprise-agents, policy-governance, cloud-infrastructure, physical-ai-robotics`；capacity-plan self-test 已锁定高风险 proposed rule 缺 `capacityPlan` 时失败，并验证带 `capacityPlan` 可通过；taxonomy、registry health 与 build 全部通过；commit `(this commit)`；质量评分 28/30。）
- Decision (scale / iterate / stop): scale（保留 capacity plan guard 作为后续新增 source projection rule 前的维护基线；下一步可把 proposed rule plan guard 接入生成 fixture/rule 的专用脚本，新增规则时自动执行。）

### EXP-171
- Hypothesis: EXP-170 已输出高利用率 category，但维护者仍需要把 high utilization 与 low headroom 两行手动合并成新增 rule 前的行动判断。新增 category capacity actions 摘要，可把 enterprise-agents、policy-governance、cloud-infrastructure、physical-ai-robotics 这类高风险分类直接转成“拆分分类或提高预算”的下一步提示，降低 source projection registry 继续膨胀时的维护判断成本。
- Scope: `scripts/check-source-projection-rule-taxonomy.mjs`、`GROWTH_QUEUE.md`、`EXPERIMENT_LOG.md`
- Change: 新增 `suggestSourceProjectionCategoryCapacityActions`，合并 high utilization 与 low headroom category 并按 headroom、utilization、count、name 排序；taxonomy summary 成功路径新增 `category capacity actions` 行；summary self-test 锁定无 action 输出与 synthetic developer-tools/company-finance action 文案。
- Start date: 2026-06-15
- End date: 2026-06-15
- Success metric: `pnpm check:source-projection-rule-taxonomy` 输出 `category capacity actions`；`pnpm check:source-projection-rule-registry-health` 通过；`pnpm build` 通过。
- Result: pass（taxonomy CLI 当前输出 totalRules=41，`category capacity actions: enterprise-agents: split category or raise budget before adding new rules (88% used + 1 headroom); policy-governance: split category or raise budget before adding new rules (88% used + 1 headroom); cloud-infrastructure: split category or raise budget before adding new rules (83% used + 1 headroom); physical-ai-robotics: split category or raise budget before adding new rules (80% used)`；summary self-test 已锁定无 action 时输出 `none` 与 100%/80% synthetic action 排序/文案；taxonomy、registry health 与 build 全部通过；commit `(this commit)`；质量评分 28/30。）
- Decision (scale / iterate / stop): scale（保留 capacity action 作为新增 source projection rule 前的维护提醒；下一步可把新增 rule 的 category 与 capacity action 自动交叉检查，要求命中高风险 category 时附带分流或提高预算理由。）

### EXP-170
- Hypothesis: EXP-169 已输出低 headroom category，但只看剩余 1 条余量会漏掉 physical-ai-robotics=8/10 这类达到 80% 利用率、但尚未进入低 headroom 的高膨胀分类。新增高利用率 category 摘要，可在新增日报 rule 前同时暴露“绝对余量不足”和“预算利用率过高”两种分流信号，降低 source projection registry 后续膨胀维护成本。
- Scope: `scripts/check-source-projection-rule-taxonomy.mjs`、`GROWTH_QUEUE.md`、`EXPERIMENT_LOG.md`
- Change: 新增 `SOURCE_PROJECTION_CATEGORY_HIGH_UTILIZATION_THRESHOLD=0.8`；taxonomy summary 计算 `highUtilizationCategories` 并按 utilization desc、count desc、name asc 排序；成功输出新增 `high utilization categories` 行；summary self-test 锁定 `none` 输出，并用 synthetic developer-tools/company-finance 样本锁定 100%/80% 利用率排序和文案。
- Start date: 2026-06-15
- End date: 2026-06-15
- Success metric: `pnpm check:source-projection-rule-taxonomy` 输出 `high utilization categories`；`pnpm check:source-projection-rule-registry-health` 通过；`pnpm build` 通过。
- Result: pass（taxonomy CLI 当前输出 totalRules=41，`high utilization categories: enterprise-agents=7/8 (88% used, 1 headroom), policy-governance=7/8 (88% used, 1 headroom), cloud-infrastructure=5/6 (83% used, 1 headroom), physical-ai-robotics=8/10 (80% used, 2 headroom)`；taxonomy self-test 已锁定无高利用率时输出 `none` 与 100%/80% synthetic 排序；taxonomy、registry health 与 build 全部通过；commit `(this commit)`；质量评分 28/30。）
- Decision (scale / iterate / stop): scale（保留高利用率 warning 作为新增 source projection rule 前的维护提醒；下一步可在新增规则命中高利用率 category 时自动提示分流 category 或要求提高预算理由。）

### EXP-169
- Hypothesis: EXP-168 已为 source projection category 增加硬预算与 headroom；若维护者只能看到完整 budget 明细，enterprise-agents、policy-governance、cloud-infrastructure 这类只剩 1 条余量的分类仍容易在新增日报 rule 时被忽略，直到下一次超预算才失败。新增低 headroom category 摘要，可在不阻断当前构建的前提下提前提示新增 rule 应优先分流或拆分分类。
- Scope: `scripts/check-source-projection-rule-taxonomy.mjs`、`GROWTH_QUEUE.md`、`EXPERIMENT_LOG.md`
- Change: 新增 `SOURCE_PROJECTION_CATEGORY_LOW_HEADROOM_THRESHOLD=1`；taxonomy summary 计算 `lowHeadroomCategories` 并按 headroom asc、count desc、name asc 排序；成功输出新增 `low headroom categories` 行；summary self-test 锁定 `none` 输出，避免 warning 诊断被后续重构移除。
- Start date: 2026-06-14
- End date: 2026-06-14
- Success metric: `pnpm check:source-projection-rule-taxonomy` 输出 `low headroom categories`；`pnpm check:source-projection-rule-registry-health` 通过；`pnpm build` 通过。
- Result: pass（taxonomy CLI 当前输出 totalRules=41，`low headroom categories: enterprise-agents=7/8 (1 headroom), policy-governance=7/8 (1 headroom), cloud-infrastructure=5/6 (1 headroom)`；taxonomy self-test 已锁定无低余量时输出 `none`；taxonomy、registry health 与 build 全部通过；commit `(this commit)`；质量评分 28/30。）
- Decision (scale / iterate / stop): scale（保留低余量 warning 作为新增 source projection rule 前的维护提醒；下一步可把低 headroom category 与新增日报 rule category 自动建议分流或要求补充更细 category。）

### EXP-168
- Hypothesis: EXP-167 已输出 largest category share，当前 physical-ai-robotics=8/41、enterprise-agents=7/41、policy-governance=7/41 接近高膨胀区；若 taxonomy 只展示占比而没有每类 rule budget 与超额失败，后续日报新增字段级 projection 会继续挤压少数分类，维护者只能事后手工发现 registry 失衡。为每个 category 增加显式 rule budget、headroom 诊断与 over-budget self-test，可在新增真实 cron fixture 前阻断单类无节制膨胀。
- Scope: `scripts/check-source-projection-rule-taxonomy.mjs`、`GROWTH_QUEUE.md`、`EXPERIMENT_LOG.md`
- Change: 新增 `SOURCE_PROJECTION_CATEGORY_RULE_BUDGETS`，为 10 个 source projection category 配置显式 rule budget；taxonomy summary 增加 `category budgets` 行，按当前分布输出 `count/budget (headroom)`；taxonomy validation 在 category count 超预算时失败并输出 over-by 诊断；self-test 用 developer-tools synthetic rules 锁定 `developer-tools=5/4 (over by 1)` 失败文案。
- Start date: 2026-06-14
- End date: 2026-06-14
- Success metric: `pnpm check:source-projection-rule-taxonomy` 输出 `category budgets` 与 headroom；`pnpm check:source-projection-rule-registry-health` 通过；`pnpm build` 通过。
- Result: pass（taxonomy CLI 当前输出 totalRules=41，category budgets 显示 `physical-ai-robotics=8/10 (2 headroom)`、`enterprise-agents=7/8 (1 headroom)`、`policy-governance=7/8 (1 headroom)`；over-budget self-test 已锁定 developer-tools 超预算失败文案；taxonomy、registry health 与 build 全部通过；commit `(this commit)`；质量评分 28/30。）
- Decision (scale / iterate / stop): scale（保留 category budget 作为 source projection registry 膨胀闸门；下一步可把低 headroom category 输出为专门 warning 或把新增日报 rule 自动分流到更细 category。）

### EXP-167
- Hypothesis: EXP-166 已把 source projection rules 扩到 41 条，taxonomy summary 只输出分类数量仍需要维护者手算最大 owner/category 占比；若 CLI 直接输出 largest owner/category share，并用 self-test 锁定格式，可在新增日报规则后更快判断 enterprise-agents、policy-governance、physical-ai-robotics 等 rule family 是否过度集中，降低 registry 膨胀后的维护判断成本。
- Scope: `scripts/check-source-projection-rule-taxonomy.mjs`、`GROWTH_QUEUE.md`、`EXPERIMENT_LOG.md`
- Change: `summarizeSourceProjectionRuleTaxonomy` 为 owner/category summary 增加 share 与 largest owner/category 字段；`formatSourceProjectionRuleTaxonomySummary` 成功路径新增 `largest owner share` 与 `largest category share` 诊断；summary self-test 锁定 100% owner share 与 67% category share 格式，避免后续重构移除占比输出。
- Start date: 2026-06-13
- End date: 2026-06-13
- Success metric: `pnpm check:source-projection-rule-taxonomy` 输出 `largest owner share` 与 `largest category share`；`pnpm check:source-projection-rule-registry-health` 通过；`pnpm build` 通过。
- Result: pass（taxonomy CLI 当前输出 totalRules=41、`largest owner share: daily-source-projection=41/41 (100%)` 与 `largest category share: physical-ai-robotics=8/41 (20%)`；taxonomy self-test、registry health 与 build 全部通过；commit `(this commit)`；质量评分 27/30。）
- Decision (scale / iterate / stop): scale（保留占比诊断；下一步可在观察到单类占比继续升高时增加 category growth budget 或高膨胀分类提醒。）

### EXP-166
- Hypothesis: 最近24小时新增日报（2026-06-13）已经产出 OpenAI Academy 企业 AI 课程、NVIDIA AgentPerf Blackwell 智能体基础设施基准、Anthropic Claude Corps、中国“人工智能+信息通信”实施意见与人形机器人实景实训五条信号；若这些信号只停留在 ZH 页面和泛化 EN 页面，EN generator 会继续输出 `The source tracks...` / `buyers must check...` 模板句，削弱首日索引事实密度。把 2026-06-13 样本纳入 fixture registry 并新增字段级 projection，可锁定当日 EN/ZH/pair 输出和 source projection 作用域。
- Scope: `scripts/fixtures/daily-real-cron-2026-06-13.mjs`、`scripts/fixtures/daily-real-cron-fixtures.mjs`、`scripts/lib/source-projection-rules.mjs`、`src/content/blog/en/openclaw-daily-2026-06-13.md`、`GROWTH_QUEUE.md`、`EXPERIMENT_LOG.md`
- Change: 新增并注册 2026-06-13 真实 cron fixture；source projection registry 新增 OpenAI Academy 企业 AI 课程、NVIDIA AgentPerf Blackwell、Anthropic Claude Corps、中国 AI+ICT 实施意见四条字段级英文规则，并复用人形机器人实景实训规则；fixture 写入 `sourceProjectionRuleMatches`、required EN/ZH outputs、banned fallback 与 story 5 guardrail；EN 2026-06-13 日报用新 generator 重新生成并升级 description。
- Start date: 2026-06-13
- End date: 2026-06-13
- Success metric: `pnpm check:source-projection-rule-scope` 通过；`pnpm check:source-projection-rule-registry-health` 通过；`pnpm check:source-projection-rule-taxonomy` 通过；`pnpm check:daily-generator-real-cron-fixture` 通过；`pnpm check:daily-zh-generator-real-cron-fixture` 通过；`pnpm check:daily-bilingual-generator-pair-fixture` 通过；`pnpm check:daily-fixture-source-dedup` 通过；`pnpm check:daily-parser-guardrail-coverage` 通过；`pnpm check:publish-daily-generator-fixture` 通过；`pnpm check:daily-brief-specificity` 通过；`pnpm build` 通过。
- Result: pass（2026-06-13 真实 cron fixture 已进入 registry；EN/ZH/pair fixture 已锁定 OpenAI Academy、NVIDIA AgentPerf Blackwell、Claude Corps、中国 AI+ICT 实施意见与人形机器人实景实训五条输出；source projection scope/registry/taxonomy 已覆盖新规则，taxonomy 当前显示 totalRules=41；EN 最新日报不再使用泛化 `The source tracks...` 模板，改为字段级事实改写；专项 fixture、source projection scope/registry/taxonomy、latest specificity 与 build 全部通过；commit `de219f6`；质量评分 28/30。）
- Decision (scale / iterate / stop): scale（保留 2026-06-13 fixture 作为最新日报首日索引质量基线；下一步可增加 source projection category growth budget，避免 enterprise-agents / policy-governance 分类继续膨胀时缺少维护提醒。）

### EXP-165
- Hypothesis: EXP-164 已让 37 条 source projection rules 拥有 owner/category 元数据；若 taxonomy 闸门只在失败时输出缺失或未知枚举，维护者仍需要手动统计各 category 的规则数量，难以及早发现 physical-ai-robotics、policy-governance 等高膨胀 rule family 或低覆盖分类。让 taxonomy CLI 稳定输出 owner/category distribution 摘要，并用 self-test 锁定格式，可降低新增日报规则后的维护判断成本。
- Scope: `scripts/check-source-projection-rule-taxonomy.mjs`、`GROWTH_QUEUE.md`、`EXPERIMENT_LOG.md`
- Change: 新增 `summarizeSourceProjectionRuleTaxonomy` 与 `formatSourceProjectionRuleTaxonomySummary`，按 owner/category 聚合 rule 数量，并按 count desc/name asc 输出 category distribution；taxonomy CLI 成功时打印 `totalRules`、owner counts 与 category counts；self-test 锁定 summary 格式、owner 统计和 category 排序，避免后续重构移除诊断。
- Start date: 2026-06-12
- End date: 2026-06-12
- Success metric: `pnpm check:source-projection-rule-taxonomy` 输出 `source projection taxonomy summary: totalRules=37`、`owners: daily-source-projection=37` 与 category distribution；`pnpm check:source-projection-rule-registry-health` 通过；`pnpm build` 通过。
- Result: pass（taxonomy CLI 已输出稳定分布摘要；当前 37 条 rule 均归属 `daily-source-projection`，category 分布为 physical-ai-robotics 8、policy-governance 6、enterprise-agents 5、cloud-infrastructure 4、company-finance/frontier-models/product-safety 各 3、consumer-productivity/market-intelligence 各 2、developer-tools 1；summary self-test、taxonomy、registry health 与 build 全部通过；commit `(this commit)`；质量评分 28/30。）
- Decision (scale / iterate / stop): scale（保留 taxonomy summary 作为 source projection registry 维护诊断；下一步可增加 category growth budget 或高膨胀分类提醒，避免单一 rule family 长期吞噬新增日报维护精力。）

### EXP-164
- Hypothesis: EXP-163 已阻断 unused rule 与 duplicate detail；若 source projection registry 继续缺少 owner/category 元数据，37 条字段级 rule 会在 frontier model、physical AI、policy、enterprise agent、cloud infrastructure 等方向上混在一起，后续新增日报样本难以判断规则族、维护责任和分类覆盖缺口。新增显式 owner/category taxonomy 与 CI 闸门，可降低 registry 长期膨胀后的维护成本。
- Scope: `scripts/lib/source-projection-rules.mjs`、`scripts/check-source-projection-rule-taxonomy.mjs`、`package.json`、`.github/workflows/content-check.yml`、`GROWTH_QUEUE.md`、`EXPERIMENT_LOG.md`
- Change: 为全部 37 条 source projection rules 增加 `owner: daily-source-projection` 与分类元数据，覆盖 cloud infrastructure、company finance、consumer productivity、developer tools、enterprise agents、frontier models、market intelligence、physical AI / robotics、policy governance、product safety 等 10 个 rule family；新增 taxonomy 检查，校验 owner/category 必填、必须命中允许枚举，并要求每个允许 category 至少有规则承载；脚本内置 missing metadata 与 unknown metadata synthetic self-test；package script 与 content-check CI 接入该闸门。
- Start date: 2026-06-12
- End date: 2026-06-12
- Success metric: `pnpm check:source-projection-rule-taxonomy` 通过；`pnpm check:source-projection-rule-registry-health` 通过；`pnpm check:source-projection-rule-scope` 通过；`pnpm build` 通过。
- Result: pass（全部 37 条 source projection rules 已带 owner/category 元数据；taxonomy 闸门会阻断缺失 owner/category、未知 owner/category，以及空分类枚举；missing/unknown metadata self-test 可确认失败文案包含具体 rule name 与 metadata 缺口；taxonomy、registry health、scope 与 build 全部通过；commit `a81ab19`；质量评分 28/30。）
- Decision (scale / iterate / stop): scale（保留 taxonomy 作为 source projection registry 维护基线；下一步可把 category 分布输出为诊断摘要，帮助新增日报样本快速发现高膨胀 rule family 或空白主题。）

### EXP-163
- Hypothesis: EXP-162 已把 2026-06-11 最新日报信号接入 source projection registry；若 registry 后续允许字段级 rule 长期无人命中，或 what/why/impact 文案被复制粘贴到多条 rule，生成器会累积死规则和重复事实投影，增加新增日报首日索引回归定位成本。新增 registry health 闸门，可强制每条 rule 被真实 cron fixture story block 实际命中，并阻断重复 projection detail。
- Scope: `scripts/check-source-projection-rule-registry-health.mjs`、`package.json`、`.github/workflows/content-check.yml`、`GROWTH_QUEUE.md`、`EXPERIMENT_LOG.md`
- Change: 新增 source projection rule registry health 检查，遍历 `sourceProjectionRules()` 与全部真实 cron fixture story block，要求每条 rule 至少被一个 fixture 实际 term 命中；同时校验 rule name 唯一、terms 非空、what/why/impact 完整，并阻断跨 rule 复制粘贴的重复 projection detail；脚本内置 unused-rule 与 duplicate-detail synthetic self-test；package script 与 content-check CI 接入该闸门。
- Start date: 2026-06-11
- End date: 2026-06-11
- Success metric: `pnpm check:source-projection-rule-registry-health` 通过；`pnpm check:source-projection-rule-scope` 通过；`pnpm check:source-projection-rule-metadata-coverage` 通过；`pnpm check:source-projection-rule-term-narrowness` 通过；`pnpm build` 通过。
- Result: pass（source projection registry health 闸门已接入；当前 37 条 source projection rules 均被真实 cron fixture story block 实际命中；synthetic unused-rule 与 duplicate-detail self-test 可确认失败文案包含 unused 诊断和 duplicate what/why/impact owner；registry health、scope、metadata coverage、term narrowness 与 build 全部通过；commit `(this commit)`；质量评分 28/30。）
- Decision (scale / iterate / stop): scale（保留 registry health 作为 source projection rule 维护基线；下一步可把 source projection registry 分组增加 owner/category 元数据，区分 daily fixture、policy、robotics、product release 等 rule 族，降低长期维护成本。）

### EXP-162
- Hypothesis: 最近24小时新增日报（2026-06-11）已经产出 Google DeepMind DiffusionGemma、NVIDIA DRIVE Hyperion robotaxi、OpenAI ChatGPT 模型选择器、中国人形机器人实景实训专项行动与工信部 App 跳转治理五条新信号；若这些信号只停留在 ZH 页面和泛化 EN 页面，EN generator 会继续输出 `The source tracks...` / `buyers must check...` 模板句，削弱首日索引事实密度。把 2026-06-11 样本纳入 fixture registry 并新增字段级 projection，可锁定当日 EN/ZH/pair 输出和 source projection 作用域。
- Scope: `scripts/fixtures/daily-real-cron-2026-06-11.mjs`、`scripts/fixtures/daily-real-cron-fixtures.mjs`、`scripts/lib/source-projection-rules.mjs`、`src/content/blog/en/openclaw-daily-2026-06-11.md`、`scripts/fixtures/daily-real-cron-2026-06-05.mjs`、`GROWTH_QUEUE.md`、`EXPERIMENT_LOG.md`
- Change: 新增并注册 2026-06-11 真实 cron fixture；source projection registry 新增 DiffusionGemma、DRIVE Hyperion robotaxi、ChatGPT model picker、中国人形机器人实景实训、App 信息窗口跳转治理五条字段级英文规则；fixture 写入 `sourceProjectionRuleMatches`、required EN/ZH outputs、banned fallback 与 story 5 guardrail；EN 2026-06-11 日报用新 generator 重新生成并升级 description；同步修正 2026-06-05 Unitree fixture label drift 为当前 canonical label。
- Start date: 2026-06-11
- End date: 2026-06-11
- Success metric: `pnpm check:source-projection-rule-scope` 通过；`pnpm check:source-projection-rule-metadata-coverage` 通过；`pnpm check:daily-generator-real-cron-fixture` 通过；`pnpm check:daily-zh-generator-real-cron-fixture` 通过；`pnpm check:daily-bilingual-generator-pair-fixture` 通过；`pnpm check:daily-fixture-source-dedup` 通过；`pnpm check:daily-parser-guardrail-coverage` 通过；`pnpm check:publish-daily-generator-fixture` 通过；`pnpm check:daily-brief-specificity` 通过；`pnpm build` 通过。
- Result: pass（2026-06-11 真实 cron fixture 已进入 registry；EN/ZH/pair fixture 已锁定 DiffusionGemma、DRIVE Hyperion、ChatGPT model picker、中国人形机器人实景实训与 App 跳转治理五条输出；source projection scope/metadata 已覆盖新规则；EN 最新日报不再使用泛化 `The source tracks...` 模板，改为字段级事实改写；专项 fixture、source projection scope/metadata、latest specificity 与 build 全部通过；commit `a12c6b3`；质量评分 28/30。）
- Decision (scale / iterate / stop): scale（保留 2026-06-11 fixture 作为最新日报首日索引质量基线；下一步可为 source projection rule registry 增加“未使用 rule / duplicate detail”维护闸门，防止字段级规则长期膨胀后出现死规则或重复文案。）

### EXP-161
- Hypothesis: EXP-160 已阻断 separator/case 级 tag canonical collision；若 `ai agents` / `ai-agent`、`tutorial` / `guide`、`silent message loss` / `delivery-reliability` 这类语义同义标签仍靠人工记忆维护，tag archive 会继续分裂长尾入口，并让首页/文章 tag chip 承载重复意图。新增显式 semantic alias registry、CI 闸门并回收现有别名，可减少标签归档分裂。
- Scope: `scripts/lib/tag-alias-registry.mjs`、`scripts/check-tag-semantic-aliases.mjs`、`package.json`、`.github/workflows/content-check.yml`、`src/content/blog/en/*.md`、`src/content/blog/zh/*.md`、`GROWTH_QUEUE.md`、`EXPERIMENT_LOG.md`
- Change: 新增 tag semantic alias registry，声明 `ai-agents` -> `ai-agent`、`tutorial` -> `guide`、`silent-message-loss`/`message-loss` -> `delivery-reliability`；新增 semantic alias 检查，遍历 306 个 EN/ZH blog frontmatter tags，阻断 registry alias 继续出现，并要求 registry canonical tag 至少有内容承载；内置 synthetic `ai agents` -> `ai-agent` self-test；同步将现有 frontmatter 中的 `ai agents`、`tutorial`、`silent message loss`、`web_search`、`chrome relay`、`delivery reliability` 等标签回收到 canonical tag，避免正文代码示例被替换；package script 与 content-check CI 接入该闸门。
- Start date: 2026-06-10
- End date: 2026-06-10
- Success metric: `pnpm check:tag-semantic-aliases` 通过；`pnpm check:tag-canonical-aliases` 通过；`pnpm check:tag-case` 通过；`pnpm check:tag-surface-compactness` 通过；`pnpm build` 通过。
- Result: pass（semantic alias registry 已接入；306 个 blog 文件不再使用 registry alias；`ai agents`、`tutorial`、`silent message loss`、`web_search`、`chrome relay`、`delivery reliability` 等 frontmatter tag 已回收到 canonical 标签；synthetic alias self-test 可确认失败文案包含 alias、canonical 与样本文件；semantic aliases、canonical aliases、tag case、tag surface compactness 与 build 全部通过；commit `(this commit)`；质量评分 28/30。）
- Decision (scale / iterate / stop): scale（保留 semantic alias registry 作为 tag archive 基线；下一步可为 tag routes 增加 URL slug encoding/canonical path 闸门，处理空格标签如 `fetch failed` / `409 conflict` 的可抓取路径一致性。）

### EXP-160
- Hypothesis: EXP-159 已收紧首页与文章页 tag surface；若内容库仍允许 `agent runtime` / `agent-runtime` 这类空格、下划线、连字符归一后相同但展示不同的 tag，tag archive 会分裂可发现入口并让 compact tag chip 继续承载同义噪声。新增 canonical alias 闸门并修正现有 collision，可减少 tag 归档分裂和跨语言标签噪声。
- Scope: `scripts/check-tag-canonical-aliases.mjs`、`src/content/blog/en/openclaw-vs-hermes-vs-deerflow-2026.md`、`package.json`、`.github/workflows/content-check.yml`、`GROWTH_QUEUE.md`、`EXPERIMENT_LOG.md`
- Change: 新增 tag canonical alias 检查，遍历 EN/ZH blog frontmatter tags，并按 lowercase + NFKC + space/underscore/hyphen collapse 生成 normalized archive key；若同一 canonical key 下存在多个展示变体或同一文件内重复 normalized tag，则输出带样本文件的失败诊断；脚本内置 `agent runtime` vs `agent-runtime` synthetic collision 自测；将 EN OpenClaw vs Hermes vs DeerFlow 页 tag 从 `agent runtime` 统一为 `agent-runtime`，并接入 package script 与 content-check CI。
- Start date: 2026-06-10
- End date: 2026-06-10
- Success metric: `pnpm check:tag-canonical-aliases` 通过；`pnpm check:tag-case` 通过；`pnpm check:tag-surface-compactness` 通过；`pnpm build` 通过。
- Result: pass（tag canonical alias 闸门已接入；当前 306 个 blog 文件没有 normalized archive slug collision；EN/ZH `openclaw-vs-hermes-vs-deerflow-2026` 的 agent runtime tag 已统一为 `agent-runtime`；tag canonical aliases、tag case、tag surface compactness 与 build 全部通过；commit `(this commit)`；质量评分 28/30。）
- Decision (scale / iterate / stop): scale（保留 canonical alias 闸门作为 tag archive 基线；下一步可扩展一份显式 alias registry，处理 `ai agents` / `ai-agent` 这类单复数或同义词级别的标签合并。）

### EXP-159
- Hypothesis: 日报与指南的 tags 持续增长后，首页最新文章卡片和文章页头部会展示过多 chip，挤压标题/description 首屏空间，并让长标签或大小写碰撞在移动端形成视觉噪声。将首页可见 tags 限制为 3 个、文章页限制为 5 个，并用 `+N` 展示剩余数量，同时加上 tag surface compactness 闸门，可提升首屏可读性并防止后续回归。
- Scope: `src/layouts/BaseLayout.astro`、`src/layouts/BlogPost.astro`、`src/pages/en/index.astro`、`src/pages/zh/index.astro`、`scripts/check-tag-surface-compactness.mjs`、`package.json`、`.github/workflows/content-check.yml`、`GROWTH_QUEUE.md`、`EXPERIMENT_LOG.md`
- Change: 文章页 tags 改为只显示前 5 个并用 `+N` 收起剩余标签，首页 EN/ZH 最新文章卡片只显示前 3 个 tags；全局 tag chip 样式改为低噪声、最大宽度 180px、ellipsis 截断，并新增 `tag--more` overflow pill；新增 tag surface compactness 检查，断言 BlogPost / EN index / ZH index 的可见 tag 上限、overflow count、文章 tag 链接编码和全局 truncation 样式；package script 与 content-check CI 接入该闸门。
- Start date: 2026-06-09
- End date: 2026-06-09
- Success metric: `pnpm check:tag-surface-compactness` 通过；`pnpm build` 通过。
- Result: pass（文章页 tag surface 已限制为前 5 个，EN/ZH 首页最新文章卡片已限制为前 3 个，剩余标签以 `+N` 展示；全局 tag chip 已增加 max-width / ellipsis / 低噪声 hover；tag surface compactness 闸门已接入 package script 与 content-check CI；专项检查与 build 全部通过；commit `(this commit)`；质量评分 27/30。）
- Decision (scale / iterate / stop): scale（保留 compact tag surface 作为首页与文章页移动端可读性基线；下一步可继续为 tag archive 增加 normalized tag canonical / alias 检查，减少大小写或同义 tag 分裂。）

### EXP-158
- Hypothesis: EXP-157 已让 AWS Quick Connect / Bedrock OpenAI rule 的 quote term 与 2026-06-08 fixture 对齐；若 rule 继续保留 `Amazon Quick` 宽子串，包含 `Amazon QuickSight` 的无关 BI/analytics 来源会误触发 `aws-quick-connect-bedrock-openai-2026` 字段级 projection，导致非工作 AI 助手故事被改写成 AWS Quick / Bedrock Managed Agents 叙事。新增 off-topic probe 窄化闸门并移除宽 term，可阻断 Amazon QuickSight 子串污染。
- Scope: `scripts/check-source-projection-rule-term-narrowness.mjs`、`scripts/lib/source-projection-rules.mjs`、`package.json`、`.github/workflows/content-check.yml`、`GROWTH_QUEUE.md`、`EXPERIMENT_LOG.md`
- Change: 新增 source projection rule term narrowness 检查，使用 Amazon QuickSight off-topic probe 验证 `aws-quick-connect-bedrock-openai-2026` 不会被 `Amazon Quick` 子串误触发；脚本内置 synthetic broad matcher 自测，断言失败文案包含 probe、rule 和触发 term；移除 AWS Quick Connect rule 中的宽 term `Amazon Quick`，保留 `What's Next with AWS 2026` 与 `Managed Agents 进入 Amazon Bedrock` 作为更窄锚点；package script 与 content-check CI 接入该闸门。
- Start date: 2026-06-09
- End date: 2026-06-09
- Success metric: `pnpm check:source-projection-rule-term-narrowness` 通过；`pnpm check:source-projection-rule-quote-normalization` 通过；`pnpm check:source-projection-rule-scope` 通过；`pnpm check:source-projection-rule-metadata-coverage` 通过；`pnpm check:source-projection-rule-diagnostics` 通过；`pnpm check:publish-daily-generator-fixture` 通过；`pnpm check:daily-generator-real-cron-fixture` 通过；`pnpm check:daily-zh-generator-real-cron-fixture` 通过；`pnpm check:daily-bilingual-generator-pair-fixture` 通过；`pnpm check:daily-fixture-source-dedup` 通过；`pnpm check:daily-parser-guardrail-coverage` 通过；`pnpm check:daily-brief-specificity` 通过；`pnpm build` 通过。
- Result: pass（term narrowness 闸门已接入；Amazon QuickSight off-topic probe 不再命中 `aws-quick-connect-bedrock-openai-2026`；synthetic broad `Amazon Quick` matcher 会确认失败文案包含 `synthetic-amazon-quicksight-off-topic-substring`、`aws-quick-connect-bedrock-openai-2026 via "Amazon Quick"` 与 QuickSight collision reason；term narrowness、quote normalization、scope、metadata coverage、diagnostics、发布 generator fixture、真实 cron EN/ZH/pair、dedup、parser guardrail coverage、latest specificity 与 build 全部通过；commit `(this commit)`；质量评分 28/30。）
- Decision (scale / iterate / stop): scale（保留 term narrowness probe 作为 source projection registry 维护基线；下一步可把 probe registry 泛化到更多高风险品牌子串，例如 Amazon Quick / QuickSight、AI Cloud / generic cloud、Agent / agentic 等命名碰撞。）

### EXP-157
- Hypothesis: EXP-156 已在 2026-06-08 fixture 中发现 source projection rule term 与 fixture 文本存在中文智能引号 / ASCII 引号不一致风险；若 registry 只做 exact `includes`，`What’s Next` / `What's Next` 或 `“AI factory”` / `"AI factory"` 这类近似文本会静默漏匹配，直到 EN source projection 回退为泛化模板。新增 quote-normalized near-miss 闸门，可在 CI 中阻断跨文件引号字符漂移。
- Scope: `scripts/check-source-projection-rule-quote-normalization.mjs`、`scripts/lib/source-projection-rules.mjs`、`package.json`、`.github/workflows/content-check.yml`、`GROWTH_QUEUE.md`、`EXPERIMENT_LOG.md`
- Change: 新增 source projection rule quote normalization 检查，遍历真实 cron fixture story block 和 registry rule terms；当 term 含引号、原文 exact 不匹配但 quote-normalized 后可匹配时输出 near-miss 失败；内置 synthetic `“AI factory”` vs ASCII `"AI factory"` 自测；导出 `sourceProjectionRules()` 供检查脚本读取 registry；将 AWS Quick Connect rule term 的 `What's Next with AWS 2026` 与 fixture ASCII apostrophe 对齐；package script 与 content-check CI 接入该闸门。
- Start date: 2026-06-08
- End date: 2026-06-08
- Success metric: `pnpm check:source-projection-rule-quote-normalization` 通过；`pnpm check:source-projection-rule-scope` 通过；`pnpm check:source-projection-rule-metadata-coverage` 通过；`pnpm check:source-projection-rule-diagnostics` 通过；`pnpm check:publish-daily-generator-fixture` 通过；`pnpm check:daily-generator-real-cron-fixture` 通过；`pnpm check:daily-zh-generator-real-cron-fixture` 通过；`pnpm check:daily-bilingual-generator-pair-fixture` 通过；`pnpm check:daily-fixture-source-dedup` 通过；`pnpm check:daily-parser-guardrail-coverage` 通过；`pnpm check:daily-brief-specificity` 通过；`pnpm build` 通过。
- Result: pass（quote-normalized near-miss 闸门已接入；synthetic 引号不一致样本会确认失败文案包含 `synthetic-ai-factory-smart-quotes` 与原始 smart-quote term；真实 registry 中 AWS Quick Connect `What's Next with AWS 2026` term 已与 2026-06-08 fixture 对齐；quote normalization、scope、metadata coverage、diagnostics、发布 generator fixture、真实 cron EN/ZH/pair、dedup、parser guardrail coverage、latest specificity 与 build 全部通过；commit `(this commit)`；质量评分 28/30。）
- Decision (scale / iterate / stop): scale（保留 quote normalization 作为 source projection registry 维护基线；下一步可执行 EXP-158，为 AWS Quick Connect / Amazon Quick 增加 term 窄化检查，避免 Amazon QuickSight 等无关来源误命中。）

### EXP-156
- Hypothesis: 最近24小时新增日报（2026-06-08）已经产出 NVIDIA-Doosan 物理 AI 工厂、Anthropic Opus 级模型升级、AWS Quick Connect + Bedrock OpenAI 企业智能体三条新信号；若这些信号只停留在 EN/ZH 页面而不进入 source projection registry 与真实 cron fixture，后续 generator 可能回退到 Source N reports 模板，且新增 projection rule 的宽 term 会污染旧 fixture。把 2026-06-08 样本纳入 registry、新增字段级英文 projection、收窄 anthropic-opus-agent-coding-2026 term 防止污染 2026-05-29/30/31 Claude Opus 4.8 stories，可锁定最新日报首日索引事实密度和 source projection 作用域。
- Scope: `scripts/fixtures/daily-real-cron-2026-06-08.mjs`、`scripts/fixtures/daily-real-cron-fixtures.mjs`、`scripts/lib/source-projection-rules.mjs`、`GROWTH_QUEUE.md`、`EXPERIMENT_LOG.md`
- Change: 新增并注册 2026-06-08 真实 cron fixture；source projection registry 新增 NVIDIA-Doosan、Anthropic Opus 代理编码、AWS Quick Connect Bedrock 三条字段级英文规则；收窄 anthropic-opus-agent-coding-2026 term 从 "编码、智能体任务" 改为 "Anthropic 近期升级 Opus 级模型"+"长时间任务稳定性"，避免匹配 2026-05-29/30/31 Claude Opus 4.8 story；修复 fixture 中文引号从 ASCII 改为智能引号以正确匹配 projection rule terms；fixture 写入 sourceProjectionRuleMatches、EN/ZH required outputs、banned fallback 与 story 5 post-Top5 污染 guardrail。
- Start date: 2026-06-08
- End date: 2026-06-08
- Success metric: `pnpm check:source-projection-rule-metadata-coverage` 通过；`pnpm check:source-projection-rule-scope` 通过；`pnpm check:source-projection-rule-diagnostics` 通过；`pnpm check:publish-daily-generator-fixture` 通过；`pnpm check:daily-generator-real-cron-fixture` 通过；`pnpm check:daily-zh-generator-real-cron-fixture` 通过；`pnpm check:daily-bilingual-generator-pair-fixture` 通过；`pnpm check:daily-fixture-source-dedup` 通过；`pnpm check:daily-parser-guardrail-coverage` 通过；`pnpm check:daily-brief-specificity` 通过；`pnpm check:daily-template` 通过；`pnpm check:daily-heading-date` 通过；`pnpm check:daily-cta` 通过；`pnpm check:daily-fresh-completeness` 通过；`pnpm check:latest-daily-surface` 通过；`pnpm check:daily-related-posts` 通过；`pnpm check:daily-evidence-matrix` 通过；`pnpm check:daily-en-language` 通过；`pnpm check:daily-action-sections` 通过；`pnpm check:duplicate-slug-id` 通过；`pnpm build` 通过。
- Result: pass（2026-06-08 真实 cron fixture 已进入 registry；EN/ZH/pair fixture 已锁定 NVIDIA-Doosan、OpenAI Memory/Lockdown Mode、Anthropic Opus 级升级、AWS Quick Connect Bedrock、中国十五五五条输出；source projection scope 校验通过，anthropic-opus-agent-coding-2026 term 已收窄为特定短语组合，旧 fixture 不再被"编码、智能体任务"宽词污染；AWS Quick Connect story 4 同时声明 openai-amazon-bedrock-models 与 aws-quick-connect-bedrock-openai-2026 双规则命中；metadata coverage、scope、diagnostics、发布 generator fixture、真实 cron EN/ZH/pair、dedup、parser guardrail coverage、latest specificity、日报/索引卫生闸门与 build 全部通过；commit `f460c9b`；质量评分 28/30。）
- Decision (scale / iterate / stop): scale（保留 2026-06-08 fixture 作为最新日报首日索引质量基线；下一步可为 source projection rule terms 增加引号字符统一检查，防止中文智能引号与 ASCII 引号不一致导致的 term 匹配静默失败。）

### EXP-155
- Hypothesis: EXP-154 已用 synthetic collision fixture 锁定 source projection 失败诊断；若 projection-backed story 可以依赖 scope 闸门的隐式空数组默认值，新增真实 cron fixture 时仍可能漏写 `sourceProjectionRuleMatches`，直到失败信息被当作普通 unexpected match 处理。新增 metadata coverage 闸门，要求任一实际命中 projection rule 的 story 必须显式声明 sourceProjectionRuleMatches，可把 fixture metadata 缺口提前变成 CI 失败。
- Scope: `scripts/check-source-projection-rule-metadata-coverage.mjs`、`package.json`、`.github/workflows/content-check.yml`、`GROWTH_QUEUE.md`、`EXPERIMENT_LOG.md`
- Change: 新增 source projection rule metadata coverage 检查，遍历全部真实 cron fixture story block，使用 `sourceProjectionRuleMatches` 找出实际命中 projection rule 的 story，并强制这些 story 显式声明 `sourceProjectionRuleMatches` metadata；脚本内置 synthetic `AI Cloud` 缺 metadata 样本，断言诊断输出包含具体触发 term；package script 与 content-check CI 接入该闸门。
- Start date: 2026-06-07
- End date: 2026-06-07
- Success metric: `pnpm check:source-projection-rule-metadata-coverage` 通过；`pnpm check:source-projection-rule-scope` 通过；`pnpm check:source-projection-rule-diagnostics` 通过；`pnpm check:publish-daily-generator-fixture` 通过；`pnpm check:daily-generator-real-cron-fixture` 通过；`pnpm check:daily-zh-generator-real-cron-fixture` 通过；`pnpm check:daily-bilingual-generator-pair-fixture` 通过；`pnpm check:daily-fixture-source-dedup` 通过；`pnpm check:daily-parser-guardrail-coverage` 通过；`pnpm check:daily-brief-specificity` 通过；`pnpm build` 通过。
- Result: pass（source projection-backed story metadata coverage 已接入；synthetic `AI Cloud` 缺 metadata 样本会确认失败文案包含 `nvidia-ai-cloud-ecosystem via "AI Cloud"`；metadata coverage、scope、diagnostics、发布 generator fixture、真实 cron EN/ZH/pair、dedup、parser guardrail coverage、latest specificity 与 build 全部通过；commit `(this commit)`；质量评分 28/30。）
- Decision (scale / iterate / stop): scale（保留 metadata coverage 作为新增真实 cron fixture 的维护基线；下一步可把 projection rule registry 增加 term ownership / narrowness 分组检查，减少跨日期宽词污染。）

### EXP-154
- Hypothesis: EXP-153 已让 source projection rule scope 失败输出 matched terms；若没有一个故意失败的 synthetic collision fixture 断言失败文案，后续重构可能保留校验本身却移除 `matched terms` / `via "term"` 诊断，导致宽词污染定位成本回升。新增可控诊断 fixture，可锁定 source projection 失败输出的可调试性。
- Scope: `scripts/check-source-projection-rule-scope.mjs`、`scripts/check-source-projection-rule-diagnostics.mjs`、`package.json`、`.github/workflows/content-check.yml`、`GROWTH_QUEUE.md`、`EXPERIMENT_LOG.md`
- Change: 将 source projection scope 检查抽出为可复用 `validateSourceProjectionRuleScope`，并保留原 CLI；新增 synthetic `AI Cloud` collision fixture 检查，断言失败文案同时包含 fixture key、expected/got rule 与具体触发 term；package script 与 content-check CI 接入 diagnostics 闸门。
- Start date: 2026-06-07
- End date: 2026-06-07
- Success metric: `pnpm check:source-projection-rule-scope` 通过；`pnpm check:source-projection-rule-diagnostics` 通过；`pnpm check:publish-daily-generator-fixture` 通过；`pnpm check:daily-generator-real-cron-fixture` 通过；`pnpm check:daily-zh-generator-real-cron-fixture` 通过；`pnpm check:daily-bilingual-generator-pair-fixture` 通过；`pnpm check:daily-fixture-source-dedup` 通过；`pnpm check:daily-parser-guardrail-coverage` 通过；`pnpm check:daily-brief-specificity` 通过；`pnpm build` 通过。
- Result: pass（source projection scope 失败诊断已由 synthetic collision fixture 锁定；`AI Cloud` probe 会确认失败文案包含 `nvidia-ai-cloud-ecosystem via "AI Cloud"`；scope、diagnostics、发布 generator fixture、真实 cron EN/ZH/pair、dedup、parser guardrail coverage、latest specificity 与 build 全部通过；commit `4bd3312`；质量评分 28/30。）
- Decision (scale / iterate / stop): scale（保留 diagnostics fixture 作为 source projection registry 调试基线；下一步可为所有 projection-backed story 增加 metadata coverage 闸门，要求任一实际命中 rule 的 story 必须显式声明 sourceProjectionRuleMatches。）

### EXP-153
- Hypothesis: EXP-152 已收窄 2026-06-06 Korea / provincial planning 规则 term；若 source projection rule scope 闸门失败时只输出 expected/got rule name，新增宽词污染仍需要手动回查 registry terms 与 story block。让 match API 返回具体命中 term，并在失败信息中输出 `rule via "term"`，可缩短 projection 污染定位时间，降低最新日报 fixture 扩展成本。
- Scope: `scripts/lib/source-projection-rules.mjs`、`scripts/check-source-projection-rule-scope.mjs`、`GROWTH_QUEUE.md`、`EXPERIMENT_LOG.md`
- Change: 新增 `sourceProjectionRuleMatches(source)`，返回命中 rule name 与具体命中 terms；`sourceProjectionRuleMatchNames` 保持兼容 wrapper；scope 闸门改用 matches API，并在 unexpected/missing failure 中输出 `matched terms` 诊断，明确宽词污染由哪个 term 触发。
- Start date: 2026-06-06
- End date: 2026-06-06
- Success metric: `pnpm check:source-projection-rule-scope` 通过；`pnpm check:publish-daily-generator-fixture` 通过；`pnpm check:daily-generator-real-cron-fixture` 通过；`pnpm check:daily-zh-generator-real-cron-fixture` 通过；`pnpm check:daily-bilingual-generator-pair-fixture` 通过；`pnpm check:daily-fixture-source-dedup` 通过；`pnpm check:daily-parser-guardrail-coverage` 通过；`pnpm check:daily-brief-specificity` 通过；`pnpm build` 通过。
- Result: pass（scope 闸门现在能输出具体命中 term 诊断；规则名称兼容 API 保留；专项 scope、发布 generator fixture、真实 cron EN/ZH/pair、dedup、parser guardrail coverage、latest specificity 与 build 全部通过；commit `(this commit)`；质量评分 28/30。）
- Decision (scale / iterate / stop): scale（保留 matched terms 诊断作为 source projection registry 调试基线；下一步可增加可控的 synthetic collision fixture，直接断言失败文案包含污染 term，避免诊断输出被后续重构移除。）

### EXP-152
- Hypothesis: 最近24小时新增日报（2026-06-06）已经产出 OpenAI Memory/Lockdown、NVIDIA 韩国 AI 基建、NVIDIA CVPR 物理 AI、中国各省十五五 AI/算力规划与 6G 部省协同试点五条字段级信号；若这些信号只停留在页面与 source projection 规则中而不进入真实 cron fixture，后续 generator 可能回退到 `Source N reports...` / `This matters because ... links ...` 模板，且新增 `韩国` / `十五五` 宽 term 会污染旧 fixture。把 2026-06-06 样本纳入 EN/ZH/pair fixture，并收窄新增规则 term，可锁定最新日报首日索引事实密度和 source projection 作用域。
- Scope: `scripts/fixtures/daily-real-cron-2026-06-06.mjs`、`scripts/fixtures/daily-real-cron-fixtures.mjs`、`scripts/lib/source-projection-rules.mjs`、`GROWTH_QUEUE.md`、`EXPERIMENT_LOG.md`
- Change: 新增并注册 2026-06-06 真实 cron fixture，覆盖 OpenAI ChatGPT Memory / Lockdown Mode、NVIDIA Korea ecosystem、NVIDIA CVPR physical AI、Xinhua 中国省级 AI/算力规划与 MIIT 6G 部省协同试点；fixture 写入 `sourceProjectionRuleMatches`、EN/ZH required outputs、banned fallback 与 story 5 post-Top5 污染 guardrail；同时收窄 06-06 新增 Korea / provincial planning source projection term，避免旧 fixture 被宽词污染。
- Start date: 2026-06-06
- End date: 2026-06-06
- Success metric: `pnpm check:source-projection-rule-scope` 通过；`pnpm check:daily-generator-real-cron-fixture` 通过；`pnpm check:daily-zh-generator-real-cron-fixture` 通过；`pnpm check:daily-bilingual-generator-pair-fixture` 通过；`pnpm check:daily-fixture-source-dedup` 通过；`pnpm check:daily-parser-guardrail-coverage` 通过；`pnpm check:publish-daily-generator-fixture` 通过；`pnpm check:daily-brief-specificity` 通过；`pnpm build` 通过。
- Result: pass（2026-06-06 真实 cron fixture 已进入 registry；EN/ZH/pair fixture 已锁定 OpenAI Memory/Lockdown、NVIDIA Korea、NVIDIA CVPR physical AI、中国省级 AI/算力规划与 6G 试点五条输出；source projection scope 校验通过，并已收窄 Korea / provincial planning 规则 term，旧 fixture 不再被 `韩国` / `十五五` 宽词污染；专项 scope、真实 cron EN/ZH/pair、dedup、parser guardrail coverage、发布 generator fixture、latest specificity 与 build 全部通过；commit `8b9ffcd`；质量评分 28/30。）
- Decision (scale / iterate / stop): scale（保留 2026-06-06 fixture 作为最新日报首日索引质量基线；下一步可为 source projection registry 增加自动 term collision diagnostic，失败时输出具体命中 term，缩短宽词污染定位时间。）

### EXP-151
- Hypothesis: 最近24小时新增日报（2026-06-05）已经产出 OpenAI ChatGPT Memory / Lockdown Mode、NVIDIA Cosmos 3、NVIDIA Physical AI Agent Skills、中国高质量数据集与宇树科技 STAR Market IPO 五条字段级信号；若这些信号只停留在手工 EN/ZH 页面而不进入真实 cron fixture 与 source projection registry，后续发布仍可能回退到 `Source N reports...`、`This matters because ... links ...` 或 story 5 吸收 post-Top5 实战案例。把 2026-06-05 样本纳入 EN/ZH/pair fixture，并新增字段级 projection 与 story-level scope，可锁定首日索引页面的事实密度和规则作用域。
- Scope: `scripts/fixtures/daily-real-cron-2026-06-05.mjs`、`scripts/fixtures/daily-real-cron-fixtures.mjs`、`scripts/lib/source-projection-rules.mjs`、`GROWTH_QUEUE.md`、`EXPERIMENT_LOG.md`
- Change: 新增并注册 2026-06-05 真实 cron fixture，覆盖 OpenAI Memory / Lockdown Mode、NVIDIA Cosmos 3、NVIDIA Physical AI Agent Skills、国家数据局高质量数据集与宇树科技 STAR Market IPO；source projection registry 新增 4 条字段级英文规则并复用国家数据局 embodied AI 规则；fixture 写入 `sourceProjectionRuleMatches`、EN/ZH required outputs、banned fallback 与 story 5 post-Top5 污染 guardrail。
- Start date: 2026-06-05
- End date: 2026-06-05
- Success metric: `pnpm check:source-projection-rule-scope` 通过；`pnpm check:publish-daily-generator-fixture` 通过；`pnpm check:daily-generator-real-cron-fixture` 通过；`pnpm check:daily-zh-generator-real-cron-fixture` 通过；`pnpm check:daily-bilingual-generator-pair-fixture` 通过；`pnpm check:daily-fixture-source-dedup` 通过；`pnpm check:daily-parser-guardrail-coverage` 通过；`pnpm check:daily-brief-specificity` 通过；`pnpm check:daily-template` 通过；`pnpm check:daily-heading-date` 通过；`pnpm check:daily-cta` 通过；`pnpm check:daily-fresh-completeness` 通过；`pnpm check:latest-daily-surface` 通过；`pnpm check:daily-related-posts` 通过；`pnpm check:daily-evidence-matrix` 通过；`pnpm check:daily-en-language` 通过；`pnpm check:daily-action-sections` 通过；`pnpm check:duplicate-slug-id` 通过；`pnpm build` 通过。
- Result: pass（2026-06-05 真实 cron fixture 已进入 registry；EN/ZH/pair fixture 已锁定 OpenAI Memory / Lockdown Mode、NVIDIA Cosmos 3、Physical AI Agent Skills、中国高质量数据集与宇树 IPO 五条输出；source projection scope 由 fixture metadata 校验通过，story 5 已阻断 OpenAI/NVIDIA post-Top5 污染；专项 scope、发布 generator fixture、真实 cron EN/ZH/pair、dedup、parser guardrail coverage、latest specificity、日报/索引卫生闸门与 build 全部通过；commit `5be9586`；质量评分 28/30。）
- Decision (scale / iterate / stop): scale（保留 2026-06-05 fixture 作为最新日报首日索引质量基线；下一步可为 `source-projection-rules.mjs` 增加 rule term fixture collision sample 输出，缩短新增宽词污染时的定位时间。）

### EXP-150
- Hypothesis: EXP-149 已为 2026-06-04 新增真实 cron fixture 和 story-level source projection scope；若 allowed match map 继续集中硬编码在 `check-source-projection-rule-scope.mjs`，每次新增真实 cron 样本都要同步改脚本与 fixture，容易漏白名单或把检查逻辑变成日期清单维护。把期望 rule matches 写回各 fixture 的 `expectedSignals`，scope 闸门自动从 fixture metadata 读取并校验 rule name，可降低新增样本维护成本，同时继续阻断宽词跨日期/跨 story 污染。
- Scope: `scripts/check-source-projection-rule-scope.mjs`、`scripts/fixtures/daily-real-cron-2026-05-29.mjs`、`scripts/fixtures/daily-real-cron-2026-05-30.mjs`、`scripts/fixtures/daily-real-cron-2026-05-31.mjs`、`scripts/fixtures/daily-real-cron-2026-06-02.mjs`、`scripts/fixtures/daily-real-cron-2026-06-03.mjs`、`scripts/fixtures/daily-real-cron-2026-06-04.mjs`、`GROWTH_QUEUE.md`、`EXPERIMENT_LOG.md`
- Change: source projection rule scope check 移除集中硬编码 allowed match map，改为从 fixture `expectedSignals[].sourceProjectionRuleMatches` 读取期望命中；检查脚本同时校验 fixture 声明的 rule name 必须存在于 `sourceProjectionRuleNames()`，防止拼写错误；为 2026-05-29 至 2026-06-04 中所有 projection-backed stories 写回对应 rule match metadata。
- Start date: 2026-06-05
- End date: 2026-06-05
- Success metric: `pnpm check:source-projection-rule-scope` 通过；`pnpm check:publish-daily-generator-fixture` 通过；`pnpm check:daily-generator-real-cron-fixture` 通过；`pnpm check:daily-zh-generator-real-cron-fixture` 通过；`pnpm check:daily-bilingual-generator-pair-fixture` 通过；`pnpm check:daily-fixture-source-dedup` 通过；`pnpm check:daily-parser-guardrail-coverage` 通过；`pnpm check:daily-brief-specificity` 通过；`pnpm build` 通过。
- Result: pass（source projection rule scope 白名单已下沉到 fixture metadata；检查脚本不再维护集中日期清单，并会校验 fixture 声明 rule name 的存在性；2026-05-29、2026-05-30、2026-05-31、2026-06-02、2026-06-03、2026-06-04 projection-backed stories 已声明 sourceProjectionRuleMatches；专项 scope、发布 generator fixture、真实 cron EN/ZH/pair、dedup、parser guardrail coverage、latest specificity 与 build 全部通过；commit `745a0c2`；质量评分 28/30。）
- Decision (scale / iterate / stop): scale（保留 fixture-owned projection rule scope 作为新增真实 cron 样本维护基线；下一步可增加 fixture metadata coverage 闸门，要求任一匹配 projection rule 的 story 必须显式声明 sourceProjectionRuleMatches，进一步减少漏标。）

### EXP-149
- Hypothesis: 最近24小时新增日报（2026-06-04）已经产出 NVIDIA CVPR physical AI、Meta Business Agent、OpenAI youth safety、Microsoft enterprise agent system 与上海上交会 hard-tech 字段级英文 projection；若这些新规则只存在于 registry/页面而不进入真实 cron fixture 与 story-level scope 白名单，后续 generator 可能重新退回 `Source N reports...` 或让宽词污染旧样本。把 2026-06-04 样本纳入 EN/ZH/pair fixture 并扩展 source projection scope，可锁定首日索引页面的事实密度和规则作用域。
- Scope: `scripts/fixtures/daily-real-cron-2026-06-04.mjs`、`scripts/fixtures/daily-real-cron-fixtures.mjs`、`scripts/check-source-projection-rule-scope.mjs`、`GROWTH_QUEUE.md`、`EXPERIMENT_LOG.md`
- Change: 新增并注册 2026-06-04 真实 cron fixture，覆盖 NVIDIA CVPR physical AI、Meta Business Agent、OpenAI G7 youth safety、Microsoft enterprise agent system 与上海上交会 hard-tech；fixture 要求 EN/ZH/pair 输出保持 5 条 story、5 条 evidence、具体字段级英文 projection 和 story 5 guardrail；source projection scope 白名单新增 2026-06-04 五条允许命中，阻断新增规则跨 story/跨日期污染。
- Start date: 2026-06-04
- End date: 2026-06-04
- Success metric: `pnpm check:source-projection-rule-scope` 通过；`pnpm check:publish-daily-generator-fixture` 通过；`pnpm check:daily-generator-real-cron-fixture` 通过；`pnpm check:daily-zh-generator-real-cron-fixture` 通过；`pnpm check:daily-bilingual-generator-pair-fixture` 通过；`pnpm check:daily-fixture-source-dedup` 通过；`pnpm check:daily-parser-guardrail-coverage` 通过；`pnpm check:daily-brief-specificity` 通过；`pnpm check:daily-template` 通过；`pnpm check:daily-heading-date` 通过；`pnpm check:daily-cta` 通过；`pnpm check:daily-fresh-completeness` 通过；`pnpm check:latest-daily-surface` 通过；`pnpm check:daily-related-posts` 通过；`pnpm check:daily-evidence-matrix` 通过；`pnpm check:daily-en-language` 通过；`pnpm check:daily-action-sections` 通过；`pnpm check:duplicate-slug-id` 通过；`pnpm build` 通过。
- Result: pass（2026-06-04 真实 cron fixture 已进入 registry；EN/ZH/pair fixture 已锁定 NVIDIA CVPR、Meta Business Agent、OpenAI youth safety、Microsoft Agent system 与上海上交会 hard-tech 五条输出；source projection rule scope 已加入 2026-06-04 story-level 允许命中并阻断跨样本污染；专项 scope、发布 generator fixture、真实 cron EN/ZH/pair、dedup、parser guardrail coverage、latest specificity、日报/索引卫生闸门与 build 全部通过；commit `(this commit)`；质量评分 28/30。）
- Decision (scale / iterate / stop): scale（保留 2026-06-04 fixture 作为最新日报首日索引质量基线；下一步可自动从 fixture expected outputs / projection rule names 生成 allowed match map，减少新增真实 cron 样本时手工维护白名单的遗漏。）

### EXP-148
- Hypothesis: EXP-147 已收窄国家数据局 projection rule term，避免污染 2026-06-02 L3 中国 AI 产业报告；若 registry 只检查规则名称存在，而不检查每个真实 cron story 的允许命中规则，后续新增 `具身智能`、`AI Cloud`、`NVIDIA` 这类宽词仍可能把旧 fixture 投影成错误字段级英文文案。新增 source projection rule scope 闸门，可在 CI 中阻断跨日期、跨 story 的 projection 过宽污染。
- Scope: `scripts/lib/source-projection-rules.mjs`、`scripts/check-source-projection-rule-scope.mjs`、`package.json`、`.github/workflows/content-check.yml`、`GROWTH_QUEUE.md`、`EXPERIMENT_LOG.md`
- Change: `source-projection-rules.mjs` 新增 `sourceProjectionRuleMatchNames`；新增 source projection rule scope 检查，遍历全部真实 cron fixture story block，并按 date + title 白名单断言允许命中规则；package scripts 与 content-check CI 接入该闸门，明确防止 2026-06-03 国家数据局/具身智能 rule 污染 2026-06-02 L3 中国 AI 产业报告等旧样本。
- Start date: 2026-06-04
- End date: 2026-06-04
- Success metric: `pnpm check:source-projection-rule-scope` 通过；`pnpm check:publish-daily-generator-fixture` 通过；`pnpm check:daily-generator-real-cron-fixture` 通过；`pnpm check:daily-zh-generator-real-cron-fixture` 通过；`pnpm check:daily-bilingual-generator-pair-fixture` 通过；`pnpm check:daily-fixture-source-dedup` 通过；`pnpm check:daily-parser-guardrail-coverage` 通过；`pnpm check:daily-brief-specificity` 通过；`pnpm build` 通过。
- Result: pass（新增 source projection rule scope 闸门已遍历全部真实 cron fixtures，并对每条 story 的允许 rule 命中做白名单断言；2026-06-02 L3 中国 AI 产业报告只命中 `china-ai-industry-report-l3`，不会被 2026-06-03 国家数据局/具身智能 rule 污染；专项 scope 闸门、发布 generator fixture、真实 cron EN/ZH/pair fixture、dedup、parser guardrail coverage、latest specificity 与 build 全部通过；commit `(this commit)`；质量评分 28/30。）
- Decision (scale / iterate / stop): scale（保留 fixture story-level rule scope 作为 source projection registry 基线；下一步可自动从 fixture expected outputs 生成 allowed match map，减少新增真实 cron 样本时手工维护白名单的遗漏。）

### EXP-147
- Hypothesis: 最近24小时新增日报（2026-06-03）已经暴露 NVIDIA/Microsoft Windows-Azure agentic stack、NemoClaw 工业 Agent、OpenAI Active sessions 与国家数据局具身智能数据集信号；若这些字段级 projection 只停留在手工 EN 页面而不进入 source projection registry 与真实 cron fixture，后续发布仍可能回退到 Source reports / evaluation path 模板，且 ZH 证据矩阵会继续把长 NVIDIA OpenShell 明细截断成 `GitHub Copilot 中的 N。`。把 2026-06-03 样本纳入 registry、补齐字段级英文规则并修复 ZH 句尾截断，可减少最新日报首日索引窗口内的低事实密度与截断回归。
- Scope: `scripts/fixtures/daily-real-cron-2026-06-03.mjs`、`scripts/fixtures/daily-real-cron-fixtures.mjs`、`scripts/lib/source-projection-rules.mjs`、`scripts/lib/daily-zh-generator.mjs`、`scripts/check-publish-daily-generator-fixture.mjs`、`src/content/blog/zh/openclaw-daily-2026-06-03.md`、`GROWTH_QUEUE.md`、`EXPERIMENT_LOG.md`
- Change: 新增并注册 2026-06-03 真实 cron fixture；source projection registry 增加 NVIDIA/Microsoft Windows-Azure stack、NemoClaw industrial agents、ChatGPT Active sessions、国家数据局 embodied AI 四条字段级英文改写，并收窄国家数据局 rule term，避免覆盖 2026-06-02 L3 中国 AI 产业报告；ZH generator 证据矩阵 detail 截断改为更长句界截断；修复 2026-06-03 ZH 页面 OpenShell 句尾截断与宇树案例省略号。
- Start date: 2026-06-03
- End date: 2026-06-03
- Success metric: `pnpm check:daily-generator-real-cron-fixture` 通过；`pnpm check:daily-zh-generator-real-cron-fixture` 通过；`pnpm check:daily-bilingual-generator-pair-fixture` 通过；`pnpm check:daily-fixture-source-dedup` 通过；`pnpm check:daily-parser-guardrail-coverage` 通过；`pnpm check:publish-daily-generator-fixture` 通过；`pnpm check:daily-brief-specificity` 通过；`pnpm check:daily-template` 通过；`pnpm check:daily-heading-date` 通过；`pnpm check:daily-cta` 通过；`pnpm check:daily-fresh-completeness` 通过；`pnpm check:latest-daily-surface` 通过；`pnpm check:daily-related-posts` 通过；`pnpm check:daily-evidence-matrix` 通过；`pnpm check:daily-en-language` 通过；`pnpm check:daily-action-sections` 通过；`pnpm check:duplicate-slug-id` 通过；`pnpm build` 通过。
- Result: pass（2026-06-03 真实 cron fixture 已进入 registry；新增字段级英文 projection 已覆盖 NVIDIA/Microsoft Windows-Azure stack、NemoClaw、ChatGPT Active sessions 与国家数据局/具身智能/AI for Science；ZH 证据矩阵截断 guardrail 已修复，当前 2026-06-03 ZH 页面不再含 `GitHub Copilot 中的 N。` 或宇树案例省略号；本地专项检查、十一项日报/索引卫生闸门与 build 全部通过；commit `(this commit)`；质量评分 28/30。）
- Decision (scale / iterate / stop): scale（保留 2026-06-03 fixture 作为最新日报首日索引质量基线；下一步可为 source projection rule registry 增加“term 过宽污染旧 fixture”的专项检查，防止单词级 term 覆盖不相关中文样本。）

### EXP-146
- Hypothesis: EXP-145 已把 2026-06-02 的 `Source N reports...`、`This matters because ... links ...` 与 `more specific evaluation path` 回收为字段级事实改写；若 `check:daily-brief-specificity` 仍只看最新 1 篇，2026-05-29 这类近 7 篇日报残留的同类模板句会继续进入可发现页面，削弱首日索引后续长尾、摘要点击一致性和来源可核验性。把闸门扩展到最近 7 篇并补齐这些模板短语阻断，可把 EXP-145 从单日修补放大为短窗口质量基线。
- Scope: `scripts/check-daily-brief-specificity.mjs`、`src/content/blog/en/openclaw-daily-2026-05-29.md`、`GROWTH_QUEUE.md`、`EXPERIMENT_LOG.md`
- Change: `check:daily-brief-specificity` 默认覆盖最近 7 篇 EN 日报，并新增 `Source N reports ... signal involving`、`This matters because ... links ...`、`more specific evaluation path` / migration template 阻断；同步将 2026-05-29 EN 日报从泛化 Source 模板重写为具体事实稿，覆盖 OpenAI model retirement dates、Claude Opus 4.8、Anthropic Series H、NVIDIA ICRA sim-to-real 与中国法院 AI 生成物/数据权属规则。
- Start date: 2026-06-02
- End date: 2026-06-02
- Success metric: `pnpm check:daily-brief-specificity` 通过；最近 7 篇 EN 日报不再命中 `This matters because ... links ...`、`more specific evaluation path`、`Source N reports ... signal involving`；`pnpm build` 通过。
- Result: pass（最新 EN 日报具体度闸门已从默认 1 篇扩展为最近 7 篇；2026-05-29 残留泛化 Source/links/evaluation path 模板已重写为具体事实稿；专项 grep、`pnpm check:daily-brief-specificity` 与 `pnpm build` 全部通过；commit `(this commit)`；质量评分 28/30。）
- Decision (scale / iterate / stop): scale（保留最近 7 篇作为日报短窗口具体度基线；下一步可把字段级 source projection generator 中仍存在的 fallback 文案继续替换为规则化投影，避免未来新实体未命中时再生成模板句。）

### EXP-145
- Hypothesis: 最近24小时新增日报（2026-06-02）若 EN 页面继续保留 `Source N reports...`、`This matters because ... links ...` 与 `more specific evaluation path` 泛化模板，会削弱 Anthropic SEC IPO、OpenAI on Bedrock、NVIDIA AI Cloud、ChatGPT job tools 与中国 AI 产业报告这些首日索引信号的事实密度、摘要点击一致性和来源可核验性；把 2026-06-02 样本纳入 registry，并新增字段级 source projection，可减少后续发布回归。
- Scope: `scripts/fixtures/daily-real-cron-2026-06-02.mjs`、`scripts/fixtures/daily-real-cron-fixtures.mjs`、`scripts/lib/source-projection-rules.mjs`、`src/content/blog/en/openclaw-daily-2026-06-02.md`、`GROWTH_QUEUE.md`、`EXPERIMENT_LOG.md`
- Change: 新增并注册 2026-06-02 真实 cron fixture；source projection registry 增加 Anthropic SEC Form S-1、OpenAI/Amazon Bedrock、NVIDIA AI Cloud、ChatGPT 求职简历能力、中国 AI 产业规模 L3 待确认五条字段级英文改写；重写 2026-06-02 EN 日报正文与 description，移除通用 Source/links/evaluation path 模板句；fixture 增加 banned fallback 与 story 5 post-section 污染断言。
- Start date: 2026-06-02
- End date: 2026-06-02
- Success metric: `pnpm check:daily-generator-real-cron-fixture` 通过；`pnpm check:daily-zh-generator-real-cron-fixture` 通过；`pnpm check:daily-bilingual-generator-pair-fixture` 通过；`pnpm check:daily-fixture-source-dedup` 通过；`pnpm check:daily-parser-guardrail-coverage` 通过；`pnpm check:publish-daily-generator-fixture` 通过；`pnpm check:daily-brief-specificity` 通过；`pnpm check:daily-template` 通过；`pnpm check:daily-heading-date` 通过；`pnpm check:daily-cta` 通过；`pnpm check:daily-fresh-completeness` 通过；`pnpm check:latest-daily-surface` 通过；`pnpm check:daily-related-posts` 通过；`pnpm check:daily-evidence-matrix` 通过；`pnpm check:daily-en-language` 通过；`pnpm check:daily-action-sections` 通过；`pnpm check:duplicate-slug-id` 通过；`pnpm build` 通过。
- Result: pass（2026-06-02 真实 cron fixture 已进入 registry；EN generator 对 Anthropic SEC IPO、OpenAI Bedrock、NVIDIA AI Cloud、ChatGPT job tools、中国 AI 产业报告输出字段级英文事实改写；2026-06-02 EN 最新日报已重写为具体英文实稿并升级 description；本地专项检查、十一项日报/索引卫生闸门与 build 全部通过；commit `6270c42`；质量评分 28/30。）
- Decision (scale / iterate / stop): scale（保留 2026-06-02 fixture 作为最新日报首日索引质量基线；下一步可把 `This matters because ... links ...` / `evaluation path` 这类泛化句式抽成全局 EN specificity 闸门，减少新实体未命中 projection rule 时的低事实密度输出。）

### EXP-144
- Hypothesis: EXP-143 已把 2026-05-31 的 parserGuardrails 扩展到 parsed detail 与 EN/ZH evidence line；若 2026-05-27/28/29 这类同样含 Top 5 后实战案例的真实 cron fixture 不强制声明 story 5 forbidden detail/evidence token，后续新增样本可能再次只校验 label，漏掉 Top Story 5 吸收案例 section 的隐性串段。新增 coverage 闸门并补齐旧 fixture 的 post-section token 断言，可让 CI 阻断 guardrail 缺口。
- Scope: `scripts/check-daily-parser-guardrail-coverage.mjs`、`scripts/fixtures/daily-real-cron-2026-05-27.mjs`、`scripts/fixtures/daily-real-cron-2026-05-28.mjs`、`scripts/fixtures/daily-real-cron-2026-05-29.mjs`、`package.json`、`.github/workflows/content-check.yml`
- Change: 新增 Daily parser guardrail coverage 检查，对含 `## 实战案例` 的 post-Top5 真实 cron fixture 强制要求 `story5ForbiddenDetailTokens`、`story5ForbiddenEvidenceTokens`、`story5ForbiddenZhEvidenceTokens`，并要求 detail token 至少锚定 post-Top5 case section；为 2026-05-27/28/29 fixtures 补齐 story 5 post-section 污染 token 断言；同步接入 package script 与 content-check CI。
- Start date: 2026-06-01
- End date: 2026-06-01
- Success metric: `pnpm check:daily-parser-guardrail-coverage` 通过；`pnpm check:daily-generator-real-cron-fixture` 通过；`pnpm check:daily-zh-generator-real-cron-fixture` 通过；`pnpm check:daily-bilingual-generator-pair-fixture` 通过；`pnpm check:daily-fixture-source-dedup` 通过；`pnpm check:publish-daily-generator-fixture` 通过；`pnpm check:daily-brief-specificity` 通过；`pnpm check:daily-template` 通过；`pnpm check:daily-heading-date` 通过；`pnpm check:daily-cta` 通过；`pnpm check:daily-fresh-completeness` 通过；`pnpm check:latest-daily-surface` 通过；`pnpm check:daily-related-posts` 通过；`pnpm check:daily-evidence-matrix` 通过；`pnpm check:daily-en-language` 通过；`pnpm check:daily-action-sections` 通过；`pnpm check:duplicate-slug-id` 通过；`pnpm build` 通过。
- Result: pass（coverage 闸门已强制 post-Top5 case fixture 声明 detail 与 EN/ZH evidence forbidden token；2026-05-27/28/29 fixtures 已补齐 story 5 post-section 污染断言；本地专项检查、十一项日报/索引卫生闸门与 build 全部通过；commit `(this commit)`；质量评分 28/30。）
- Decision (scale / iterate / stop): scale（保留 parser guardrail coverage 作为真实 cron fixture 基线；下一步可把 coverage 闸门扩展为检查所有 fixture 文件自动注册进 registry，减少新增真实样本漏接 CI。）

### EXP-143
- Hypothesis: EXP-142 已修复 2026-05-31 NVIDIA story 5 吸收 post-Top5 实战案例与证据矩阵 Amazon 截断片段的问题；若 fixture 只检查 label 和少量 banned phrase，后续 parser 仍可能在 parsed story detail 或 EN/ZH Evidence Matrix 中重新混入 `Amazon 介绍`、`Agentic AI`、`90%+ 可靠性`、`gym` 等后续 section token。把 parserGuardrails 扩展到 parsed detail 与 evidence line 级断言，可在发布前阻断 section-boundary drift 回归。
- Scope: `scripts/check-daily-generator-real-cron-fixture.mjs`、`scripts/check-daily-zh-generator-real-cron-fixture.mjs`、`scripts/check-daily-bilingual-generator-pair-fixture.mjs`、`scripts/fixtures/daily-real-cron-2026-05-31.mjs`
- Change: 扩展 EN/ZH/pair fixture 检查的 parserGuardrails，使其不仅检查 story label，还检查 parsed story title/what/why/impact 与对应 EN/ZH evidence line；为 2026-05-31 NVIDIA story 5 增加 required NVIDIA detail token，并阻断 Amazon Agentic AI、90%+ reliability、gym、点击/滚动 UI 操作等 post-Top5 实战案例污染 token。
- Start date: 2026-06-01
- End date: 2026-06-01
- Success metric: `pnpm check:daily-generator-real-cron-fixture` 通过；`pnpm check:daily-zh-generator-real-cron-fixture` 通过；`pnpm check:daily-bilingual-generator-pair-fixture` 通过；`pnpm check:daily-fixture-source-dedup` 通过；`pnpm check:publish-daily-generator-fixture` 通过；`pnpm check:daily-brief-specificity` 通过；`pnpm check:daily-template` 通过；`pnpm check:daily-heading-date` 通过；`pnpm check:daily-cta` 通过；`pnpm check:daily-fresh-completeness` 通过；`pnpm check:latest-daily-surface` 通过；`pnpm check:daily-related-posts` 通过；`pnpm check:daily-evidence-matrix` 通过；`pnpm check:daily-en-language` 通过；`pnpm check:daily-action-sections` 通过；`pnpm check:duplicate-slug-id` 通过；`pnpm build` 通过。
- Result: pass（parserGuardrails 已扩展到 parsed story detail 与 EN/ZH evidence line；2026-05-31 NVIDIA story 5 已阻断 Amazon Agentic AI / 90%+ reliability / gym / 点击滚动 UI 操作等 post-section 污染 token；本地专项检查、十一项日报/索引卫生闸门与 build 全部通过；commit `(this commit)`；质量评分 28/30。）
- Decision (scale / iterate / stop): scale（保留 detail/evidence line 级 parserGuardrails 作为真实 cron fixture 基线；下一步可把同类 post-section 污染断言推广到所有含实战案例与证据矩阵尾部截断样本。）

### EXP-142
- Hypothesis: 最近24小时新增日报（2026-05-31）若 EN 页面继续对 OpenAI Codex Windows Computer Use 与中国—东盟 AI 产业创新中心输出 `Source N reports...` / `This matters because ... links ...` 模板句，且 ZH parser 在 Top 5 后继续吸收实战案例字段导致 NVIDIA 证据矩阵串入 Amazon case 截断片段，会削弱首日索引窗口的事实密度、摘要点击一致性和来源可核验性；把 2026-05-31 样本纳入 registry，并修复 section boundary parser 与字段级 projection，可减少后续日报发布回归。
- Scope: `scripts/fixtures/daily-real-cron-2026-05-31.mjs`、`scripts/fixtures/daily-real-cron-fixtures.mjs`、`scripts/lib/daily-generator.mjs`、`scripts/lib/daily-zh-generator.mjs`、`scripts/lib/source-projection-rules.mjs`、`src/content/blog/en/openclaw-daily-2026-05-31.md`、`src/content/blog/zh/openclaw-daily-2026-05-31.md`
- Change: 新增并注册 2026-05-31 真实 cron fixture；EN/ZH story parser 在非 story section heading 处关闭当前 Top Story，避免 `实战案例` 字段继续污染 story 5；source projection registry 新增 OpenAI Codex Windows Computer Use 与 China-ASEAN AI Innovation Center 两条字段级英文 projection；重写 2026-05-31 EN/ZH 最新日报，移除 Source 3/4 模板句、修复 ZH description 标点拼接与 NVIDIA 证据矩阵串入 Amazon case 截断。
- Start date: 2026-05-31
- End date: 2026-05-31
- Success metric: `pnpm check:daily-generator-real-cron-fixture` 通过；`pnpm check:daily-zh-generator-real-cron-fixture` 通过；`pnpm check:daily-bilingual-generator-pair-fixture` 通过；`pnpm check:daily-fixture-source-dedup` 通过；`pnpm check:publish-daily-generator-fixture` 通过；`pnpm check:daily-brief-specificity` 通过；`pnpm check:daily-template` 通过；`pnpm check:daily-heading-date` 通过；`pnpm check:daily-cta` 通过；`pnpm check:daily-fresh-completeness` 通过；`pnpm check:latest-daily-surface` 通过；`pnpm check:daily-related-posts` 通过；`pnpm check:daily-evidence-matrix` 通过；`pnpm check:daily-en-language` 通过；`pnpm check:daily-action-sections` 通过；`pnpm check:duplicate-slug-id` 通过；`pnpm build` 通过。
- Result: pass（2026-05-31 真实 cron fixture 已进入 registry；EN/ZH parser 已阻断 Top 5 后 section 污染；OpenAI Codex Windows Computer Use 与中国—东盟 AI 产业创新中心已输出字段级英文事实改写；2026-05-31 EN/ZH 最新日报已重写；本地专项检查、十一项日报/索引卫生闸门与 build 全部通过；commit `(this commit)`；质量评分 28/30。）
- Decision (scale / iterate / stop): scale（保留 2026-05-24/27/28/29/30/31 multi-fixture registry 作为日报 generator 回归基线；下一步可为 post-Top5 实战案例和 evidence section 增加专门污染断言，减少 parser 隐性串段。）

### EXP-141
- Hypothesis: EXP-140 已把字段级 source projection 抽成 registry；若 `KEYWORD_MAP` / `ZH_ENTITY_MAP` 继续内联在 `daily-generator.mjs`，后续新增中文实体、政策主题和行业词会继续扩大主生成器体积，并提高 parser/source projection 回归时误改核心生成逻辑的风险。抽成 `daily-signal-maps.mjs` registry，并让 fixture 闸门阻断 map 重新内联，可降低后续日报增长实验维护成本。
- Scope: `scripts/lib/daily-signal-maps.mjs`、`scripts/lib/daily-generator.mjs`、`scripts/check-publish-daily-generator-fixture.mjs`
- Change: 新增 daily signal map registry，集中维护 EN generator 的中文 topic keyword 与 entity projection map；EN generator 改为 import `KEYWORD_MAP` / `ZH_ENTITY_MAP`；发布 generator fixture 闸门新增 signal map registry required signals，并阻断 map 定义重新内联到 generator。
- Start date: 2026-05-31
- End date: 2026-05-31
- Success metric: `pnpm check:publish-daily-generator-fixture` 通过；`pnpm check:daily-generator-real-cron-fixture` 通过；`pnpm check:daily-zh-generator-real-cron-fixture` 通过；`pnpm check:daily-bilingual-generator-pair-fixture` 通过；`pnpm check:daily-fixture-source-dedup` 通过；`pnpm check:daily-brief-specificity` 通过；`pnpm check:daily-template` 通过；`pnpm check:daily-heading-date` 通过；`pnpm check:daily-cta` 通过；`pnpm check:daily-fresh-completeness` 通过；`pnpm check:latest-daily-surface` 通过；`pnpm check:daily-related-posts` 通过；`pnpm check:daily-evidence-matrix` 通过；`pnpm check:daily-en-language` 通过；`pnpm check:daily-action-sections` 通过；`pnpm check:duplicate-slug-id` 通过；`pnpm build` 通过。
- Result: pass（中文 topic keyword 与 entity projection map 已从 EN generator 内联定义迁移到 `daily-signal-maps.mjs`；fixture 闸门已检查 registry 完整性并阻断 map 重新内联；本地专项检查、十一项日报/索引卫生闸门与 build 全部通过；commit `(this commit)`；质量评分 28/30。）
- Decision (scale / iterate / stop): scale（保留 daily signal map registry 作为后续真实 cron fixture 扩展入口；下一步可为 signal map 增加重复英文 label / 过宽主题映射专项检查，减少新增词条导致的 label 噪声。）

### EXP-140
- Hypothesis: EXP-139 已为 2026-05-30 样本加入 Claude Opus 4.8、Series H、AI 计量、Amazon Nova Act 与 NVIDIA ICRA 的字段级英文改写；若这些长文案继续内联在 `daily-generator.mjs`，后续新增样本会让 generator 分支膨胀、fixture 维护成本升高，并增加回归时误改核心生成逻辑的风险。抽成 `source-projection-rules.mjs` registry，并让 fixture 闸门检查 registry 完整性和禁止内联，可降低后续日报增长实验维护成本。
- Scope: `scripts/lib/source-projection-rules.mjs`、`scripts/lib/daily-generator.mjs`、`scripts/check-publish-daily-generator-fixture.mjs`
- Change: 新增 source projection rule registry，集中维护 EXP-139 暴露的 5 条 fixture-backed 字段级英文 projection；EN generator 改为调用 `projectEnglishSourceDetail`；发布 generator fixture 闸门新增 registry required signals、内联长文案泄漏阻断与 5 条 rule name 完整性检查。
- Start date: 2026-05-30
- End date: 2026-05-30
- Success metric: `pnpm check:publish-daily-generator-fixture` 通过；`pnpm check:daily-generator-real-cron-fixture` 通过；`pnpm check:daily-zh-generator-real-cron-fixture` 通过；`pnpm check:daily-bilingual-generator-pair-fixture` 通过；`pnpm check:daily-fixture-source-dedup` 通过；`pnpm check:daily-brief-specificity` 通过；`pnpm check:daily-template` 通过；`pnpm check:daily-heading-date` 通过；`pnpm check:daily-cta` 通过；`pnpm check:daily-fresh-completeness` 通过；`pnpm check:latest-daily-surface` 通过；`pnpm check:daily-related-posts` 通过；`pnpm check:daily-evidence-matrix` 通过；`pnpm check:daily-en-language` 通过；`pnpm check:daily-action-sections` 通过；`pnpm check:duplicate-slug-id` 通过；`pnpm build` 通过。
- Result: pass（字段级英文 projection 已从 EN generator 内联分支迁移到 `source-projection-rules.mjs`；fixture 闸门已阻断长文案重新内联并检查 5 条规则完整性；本地专项检查、十一项日报/索引卫生闸门与 build 全部通过；commit `(this commit)`；质量评分 28/30。）
- Decision (scale / iterate / stop): scale（保留 source projection rule registry 作为后续真实 cron fixture 扩展入口；下一步可把 `KEYWORD_MAP` / `ZH_ENTITY_MAP` 也逐步抽成可测 mapping registry，减少 generator 主文件体积。）

### EXP-139
- Hypothesis: 最近24小时新增日报（2026-05-30）若 EN 页面继续保留 `Source N reports a ... signal`、`links ... to adoption timing` 等模板化 projection，且 ZH description 泄漏 `**发生了什么：**；` 或被截成 `特别。`，会削弱首日索引窗口内的事实密度、摘要点击一致性和来源可核验性；把 2026-05-30 样本纳入 registry，并让 generator 对 Claude Opus 4.8、Series H、AI 计量、Amazon Nova Act 与 NVIDIA ICRA 输出字段级英文改写，可减少当日回补和后续发布回归。
- Scope: `scripts/fixtures/daily-real-cron-2026-05-30.mjs`、`scripts/fixtures/daily-real-cron-fixtures.mjs`、`scripts/lib/daily-generator.mjs`、`scripts/lib/daily-zh-generator.mjs`、`src/content/blog/en/openclaw-daily-2026-05-30.md`、`src/content/blog/zh/openclaw-daily-2026-05-30.md`
- Change: 新增并注册 2026-05-30 真实 cron fixture；扩展 EN generator 的 2026-05-30 字段级英文 projection，覆盖 Claude Opus 4.8 effort control / Claude Code dynamic workflows / fast mode pricing、Anthropic Series H 65B/965B/47B、SAMR/NDRC AI metrology guide、Amazon Nova Act 与 3M/Accenture/Bandsintown 案例、NVIDIA eight ICRA robotics papers；修复 ZH description 粗体字段标签过滤和句号边界截断；用修复后的 generator 重写 2026-05-30 EN/ZH 最新日报。
- Start date: 2026-05-30
- End date: 2026-05-30
- Success metric: `pnpm check:daily-generator-real-cron-fixture` 通过；`pnpm check:daily-zh-generator-real-cron-fixture` 通过；`pnpm check:daily-bilingual-generator-pair-fixture` 通过；`pnpm check:daily-fixture-source-dedup` 通过；`pnpm check:publish-daily-generator-fixture` 通过；`pnpm check:daily-brief-specificity` 通过；`pnpm check:daily-template` 通过；`pnpm check:daily-heading-date` 通过；`pnpm check:daily-cta` 通过；`pnpm check:daily-fresh-completeness` 通过；`pnpm check:latest-daily-surface` 通过；`pnpm check:daily-related-posts` 通过；`pnpm check:daily-evidence-matrix` 通过；`pnpm check:daily-en-language` 通过；`pnpm check:daily-action-sections` 通过；`pnpm check:duplicate-slug-id` 通过；`pnpm build` 通过。
- Result: pass（2026-05-30 真实 cron fixture 已进入 registry；EN generator 已为 Claude Opus 4.8、Series H、AI 计量、Amazon Nova Act 与 NVIDIA ICRA 输出字段级英文事实改写；ZH description 已避免粗体字段标签泄漏和 `特别。` 句尾截断；2026-05-30 EN/ZH 最新日报已重写；本地专项检查、十一项日报/索引卫生闸门与 build 全部通过；commit `(this commit)`；质量评分 28/30。）
- Decision (scale / iterate / stop): scale（保留 2026-05-24/27/28/29/30 multi-fixture registry 作为日报 generator 回归基线；下一步可把字段级英文改写从 hard-coded source patterns 进一步抽成可维护的 phrase rule registry。）

### EXP-138
- Hypothesis: EXP-137 已用 generator 回收 2026-05-29 EN 日报，但若 2026-05-29 当日真实样本不进入 fixture registry，GPT-5.5 退役日期、Claude Opus 4.8、Anthropic 融资、NVIDIA sim-to-real 与中国 AI 权属裁判规则这类字段级事实信号仍可能在后续发布中被压扁成 `teams should verify workflow fit` 泛化句或 ZH `Claude Code 动。` 截断残句；把该样本纳入 EN/ZH/pair 回归并强化 generator/check，可减少最新日报首日索引窗口内低事实密度与截断回归。
- Scope: `scripts/fixtures/daily-real-cron-2026-05-29.mjs`、`scripts/fixtures/daily-real-cron-fixtures.mjs`、`scripts/lib/daily-generator.mjs`、`scripts/lib/daily-zh-generator.mjs`、`scripts/check-daily-generator-real-cron-fixture.mjs`、`scripts/check-daily-fixture-source-dedup.mjs`、`scripts/check-daily-brief-specificity.mjs`、`src/content/blog/en/openclaw-daily-2026-05-29.md`、`src/content/blog/zh/openclaw-daily-2026-05-29.md`
- Change: 新增并注册 2026-05-29 真实 cron fixture；扩展 EN generator 的品牌/版本/司法/融资/编码主题映射与 timing/scale fact extraction；将 EN source projection 从 `centers on ... teams should verify` 泛化句升级为 what/why/impact 差异化 source detail；放宽 ZH 生成器截断长度并对 `API 。` / `Claude Code 动。` 类半句做兜底；更新 latest specificity 与 fixture dedup 闸门；用修复后的 generator 重新生成 2026-05-29 EN/ZH 最新日报。
- Start date: 2026-05-29
- End date: 2026-05-29
- Success metric: `pnpm check:daily-generator-real-cron-fixture` 通过；`pnpm check:daily-zh-generator-real-cron-fixture` 通过；`pnpm check:daily-bilingual-generator-pair-fixture` 通过；`pnpm check:daily-fixture-source-dedup` 通过；`pnpm check:publish-daily-generator-fixture` 通过；`pnpm check:daily-brief-specificity` 通过；`pnpm check:daily-template` 通过；`pnpm check:daily-heading-date` 通过；`pnpm check:daily-cta` 通过；`pnpm check:daily-fresh-completeness` 通过；`pnpm check:latest-daily-surface` 通过；`pnpm check:daily-related-posts` 通过；`pnpm check:daily-evidence-matrix` 通过；`pnpm check:daily-en-language` 通过；`pnpm check:daily-action-sections` 通过；`pnpm check:duplicate-slug-id` 通过；`pnpm build` 通过。
- Result: pass（2026-05-29 真实 cron fixture 已进入 registry；EN generator 已输出包含 GPT-5.5/GPT-4.5 退役日期、ICRA/sim-to-real、AIGC 等字段级 fact 的英文 source detail；ZH generator 已避免 API/Claude Code 半句截断；latest specificity 和 dedup 闸门已覆盖新增回归；本地专项检查、十一项日报/索引卫生闸门与 build 全部通过；commit `(this commit)`；质量评分 28/30。）
- Decision (scale / iterate / stop): scale（保留 2026-05-24/27/28/29 multi-fixture registry 作为日报 generator 回归基线；下一步可把 EN source projection 继续升级为更自然的字段级英文改写，减少模板感。）

### EXP-137
- Hypothesis: EXP-136 已完成 2026-05-28 人工回补，但若真实内容建设样本不进入 fixture registry，`signal N gives the ... concrete source detail`、`Teams should validate ...` 与句尾截断仍可能在后续日报复发；把 2026-05-28 样本纳入 EN/ZH/pair 真实 cron 回归，并让 specificity 闸门直接阻断这些 fallback，可减少首日索引窗口内的低事实密度页面。
- Scope: `scripts/fixtures/daily-real-cron-2026-05-28.mjs`、`scripts/fixtures/daily-real-cron-fixtures.mjs`、`scripts/lib/daily-generator.mjs`、`scripts/check-daily-generator-real-cron-fixture.mjs`、`scripts/check-daily-zh-generator-real-cron-fixture.mjs`、`scripts/check-daily-bilingual-generator-pair-fixture.mjs`、`scripts/check-daily-brief-specificity.mjs`、`src/content/blog/en/openclaw-daily-2026-05-29.md`
- Change: 新增 2026-05-28 真实 cron fixture 并注册；扩展 EN/ZH/pair fixture 检查以支持 per-story parser guardrails 与 requiredTokens description 校验；EN generator 遇到中文 source detail 时优先生成实体/主题 projection 并放宽截断长度；specificity 闸门新增 `signal N gives the ... concrete source detail`、`Teams should validate ... through a small production-adjacent pilot` 与句尾截断阻断；用修复后的 generator 重写 2026-05-29 EN 最新日报，消除已暴露的占位输出。
- Start date: 2026-05-29
- End date: 2026-05-29
- Success metric: `pnpm check:daily-generator-real-cron-fixture` 通过；`pnpm check:daily-zh-generator-real-cron-fixture` 通过；`pnpm check:daily-bilingual-generator-pair-fixture` 通过；`pnpm check:daily-fixture-source-dedup` 通过；`pnpm check:publish-daily-generator-fixture` 通过；`pnpm check:daily-brief-specificity` 通过；`pnpm check:daily-template` 通过；`pnpm check:daily-heading-date` 通过；`pnpm check:daily-cta` 通过；`pnpm check:daily-fresh-completeness` 通过；`pnpm check:latest-daily-surface` 通过；`pnpm check:daily-related-posts` 通过；`pnpm check:daily-evidence-matrix` 通过；`pnpm check:daily-en-language` 通过；`pnpm check:daily-action-sections` 通过；`pnpm check:duplicate-slug-id` 通过；`pnpm build` 通过。
- Result: pass（2026-05-28 真实 cron fixture 已进入 registry；EN generator 与 specificity 闸门已阻断 EXP-136 暴露的泛化占位句和句尾截断；2026-05-29 EN 最新日报已用修复后的 generator 重写并通过 latest specificity；本地专项检查、十一项日报/索引卫生闸门与 build 全部通过；commit `(this commit)`；质量评分 28/30。）
- Decision (scale / iterate / stop): scale（保留 2026-05-24/27/28 multi-fixture registry 作为日报 generator 回归基线；下一步可把 2026-05-29 样本纳入 registry，并把 source projection 从实体/主题摘要继续升级为字段级英文改写。）

### EXP-136
- Hypothesis: 最近24小时新增日报（2026-05-28）若 EN 页面保留 `signal N gives the ... concrete source detail`、`Teams should validate ...` 等 generator 泛化占位句式且多处句尾截断，ZH description 仍为截断片段，会削弱首日索引窗口期的事实密度、摘要点击一致性、来源可核验性与读者完成率；当日回补完整英文实稿并优化 ZH 摘要，可提升搜索可见性与核心指南导流质量。
- Scope: `/en|zh/blog/openclaw-daily-2026-05-28/`
- Change: 将 EN `openclaw-daily-2026-05-28.md` 从 generator 泛化稿回补为完整英文日报，覆盖 AWS Agentic Shopping Assistant / Kate Spade AI Gift Concierge、NVIDIA AI factory 指标、Anthropic Korea / KiYoung Choi、China 5G infrastructure、Alipay/WeChat Pay/JD.com/UnionPay AI-agent payments；将 EN/ZH description 升级为可检索摘要；修复 ZH 证据矩阵与明日跟踪点 heading 间距。
- Start date: 2026-05-28
- End date: 2026-05-28
- Success metric: `pnpm check:daily-brief-specificity` 通过；`pnpm check:daily-template` 通过；`pnpm check:daily-heading-date` 通过；`pnpm check:daily-cta` 通过；`pnpm check:daily-fresh-completeness` 通过；`pnpm check:latest-daily-surface` 通过；`pnpm check:daily-related-posts` 通过；`pnpm check:daily-evidence-matrix` 通过；`pnpm check:daily-en-language` 通过；`pnpm check:daily-action-sections` 通过；`pnpm check:duplicate-slug-id` 通过；`pnpm build` 通过；EN 页面不再出现 generator 泛化占位句或截断句尾，ZH description 不再截断。
- Result: pass（`src/content/blog/en|zh/openclaw-daily-2026-05-28.md` 已完成 EN 完整英文实稿回补、EN/ZH description 可检索化与 ZH heading 间距修复；本地十一项日报/索引卫生闸门与 build 全部通过；commit `f175bb8`；质量评分 28/30。）
- Decision (scale / iterate / stop): iterate（下一步建议把 2026-05-28 真实内容建设样本加入 daily-real-cron fixture registry，并新增针对 `signal N gives the ... concrete source detail` 与句尾截断的 generator guardrail，避免回补型任务重复出现。）

### EXP-135
- Hypothesis: EXP-134 已把 EN generator 的 CJK fallback 升级为实体/主题 projection，但真实 cron fixture 仍只覆盖 2026-05-24；若 2026-05-27 这类含“实战案例 / 今日结论 / 证据矩阵”的完整日报源进入 generator，parser 可能把 Top Story 5 后面的 section 内容继续拼进 impact，导致 Huawei Tau Law 条目被 Tencent/Alibaba/Baidu 等后续证据污染。新增 2026-05-27 fixture registry 并让 EN/ZH/pair fixture 全量遍历，可在发布前阻断 section-boundary drift、description 标题/字段泄漏和跨语言证据漂移。
- Scope: `scripts/lib/daily-generator.mjs`、`scripts/lib/daily-zh-generator.mjs`、`scripts/fixtures/daily-real-cron-2026-05-27.mjs`、`scripts/fixtures/daily-real-cron-fixtures.mjs`、`scripts/check-daily-generator-real-cron-fixture.mjs`、`scripts/check-daily-zh-generator-real-cron-fixture.mjs`、`scripts/check-daily-bilingual-generator-pair-fixture.mjs`、`scripts/check-daily-fixture-source-dedup.mjs`
- Change: 新增 2026-05-27 真实 cron fixture 与 fixture registry；EN/ZH/pair 真实 cron fixture 检查改为遍历 registry；新增 story 5 guardrail，要求 Huawei Tau Law label 保持 Huawei/China/EDA/compute infrastructure，且不能泄漏 Tencent/Alibaba/Baidu/China Mobile/Marvis/MoMA；EN/ZH parser 在 section heading、分隔线和来源行处停止字段续写；ZH description 过滤日期、编号标题和字段标签，优先取具体字段明细。
- Start date: 2026-05-28
- End date: 2026-05-28
- Success metric: `pnpm check:daily-generator-real-cron-fixture` 通过；`pnpm check:daily-zh-generator-real-cron-fixture` 通过；`pnpm check:daily-bilingual-generator-pair-fixture` 通过；`pnpm check:daily-fixture-source-dedup` 通过；`pnpm check:publish-daily-generator-fixture` 通过；`pnpm check:daily-brief-specificity` 通过；`pnpm check:daily-template` 通过；`pnpm check:daily-heading-date` 通过；`pnpm check:daily-cta` 通过；`pnpm check:daily-fresh-completeness` 通过；`pnpm check:latest-daily-surface` 通过；`pnpm check:daily-related-posts` 通过；`pnpm check:daily-evidence-matrix` 通过；`pnpm check:daily-en-language` 通过；`pnpm check:daily-action-sections` 通过；`pnpm check:duplicate-slug-id` 通过；`pnpm build` 通过。
- Result: pass（2026-05-27 fixture 已接入 registry；parser section-boundary 污染已修复；story 5 不再泄漏 Tencent/Alibaba/Baidu 等后续 section token；ZH description 不再泄漏日期、编号标题或字段标签；本地专项检查、十一项日报/索引卫生闸门与 build 全部通过；commit `(this commit)`；质量评分 28/30。）
- Decision (scale / iterate / stop): scale（保留 multi-fixture registry 作为日报 generator 回归基线；下一步可把最新 2026-05-28 内容建设样本加入 fixture，并增加 URL/source 行截断专项断言，进一步覆盖来源行对英文 projection 的影响。）

### EXP-134
- Hypothesis: EXP-133 已通过 latest specificity 闸门发现并阻断 `daily story N`、`anchors story`、`source story behind`、`named source signal` 等低事实密度占位句；若 EN generator 在遇到中文 what/why/impact 时不再丢弃源信息，而是基于实体映射、英文 token 与主题词生成英文 source projection，并用真实 cron fixture 阻断 CJK 泄漏和占位短语回归，可减少最新日报发布后人工回补和首日索引窗口损耗。
- Scope: `scripts/lib/daily-generator.mjs`、`scripts/check-publish-daily-generator-fixture.mjs`、`scripts/check-daily-generator-real-cron-fixture.mjs`、`scripts/fixtures/daily-real-cron-2026-05-24.mjs`
- Change: 新增 EN generator 的 `englishSignalSummary`，把中文源字段投影为实体/主题驱动的英文 source detail；将 CJK title fallback 从 `daily story` 改为 neutral signal；移除 `source story behind`、`anchors story`、`named source signal` 等占位句；扩展 publish generator fixture 与 real cron fixture，阻断 EXP-133 暴露的 fallback 短语、EN 输出 CJK 泄漏，并要求 Xinhua/China fixture 项生成英文 source projection。
- Start date: 2026-05-27
- End date: 2026-05-27
- Success metric: `pnpm check:publish-daily-generator-fixture` 通过；`pnpm check:daily-generator-real-cron-fixture` 通过；`pnpm check:daily-bilingual-generator-pair-fixture` 通过；`pnpm check:daily-brief-specificity` 通过；`pnpm check:daily-template` 通过；`pnpm check:daily-heading-date` 通过；`pnpm check:daily-cta` 通过；`pnpm check:daily-fresh-completeness` 通过；`pnpm check:latest-daily-surface` 通过；`pnpm check:daily-related-posts` 通过；`pnpm check:daily-evidence-matrix` 通过；`pnpm check:daily-en-language` 通过；`pnpm check:daily-action-sections` 通过；`pnpm check:duplicate-slug-id` 通过；`pnpm check:daily-zh-generator-real-cron-fixture` 通过；`pnpm check:daily-fixture-source-dedup` 通过；`pnpm build` 通过。
- Result: pass（EN generator 已把 CJK fallback 改为实体/主题 projection，真实 cron fixture 已阻断 CJK 泄漏与 EXP-133 fallback 短语；本地专项检查、十一项日报/索引卫生闸门与 build 全部通过；commit `(this commit)`；质量评分 28/30。）
- Decision (scale / iterate / stop): scale（保留 CJK-to-English source projection 与 fixture 闸门作为日报发布生成基线；下一步可扩展到 2026-05-27 fixture，验证 Huawei/China Mobile/France 等最新样本的 projection 覆盖度。）

### EXP-133
- Hypothesis: 最近24小时新增日报（2026-05-27）若 EN 页面仍保留 `daily story N`、`anchors story`、`source story behind`、`named source signal` 等 generator 泛化占位句式，且 ZH 页面含实战案例省略号与证据矩阵截断，会削弱首日索引窗口期的事实密度、摘要点击一致性、来源可核验性与读者完成率；当日回补完整双语实稿并强化 specificity 闸门，可提升搜索可见性与核心指南导流质量，并减少同类低事实密度日报进入主分支。
- Scope: `/en|zh/blog/openclaw-daily-2026-05-27/`、`scripts/check-daily-brief-specificity.mjs`
- Change: 将 EN `openclaw-daily-2026-05-27.md` 从 generator 泛化稿回补为完整英文日报，覆盖 Anthropic Korea / KiYoung Choi、Amazon Alexa+ France、NVIDIA Vera CPU、Tencent/Alibaba/Baidu/China Mobile AI entry points、Huawei Tau Law；将 ZH description 升级为可检索摘要，补全 ZH 实战案例 2、今日结论、明日跟踪点与证据矩阵，移除省略号和截断句；扩展 latest EN specificity 闸门，阻断 `daily story N`、`anchors story`、`source story behind`、`named source signal` 等低事实密度 fallback，并补充 Huawei / China Mobile / France 实体识别。
- Start date: 2026-05-27
- End date: 2026-05-27
- Success metric: `pnpm check:daily-brief-specificity` 通过；`pnpm check:daily-template` 通过；`pnpm check:daily-heading-date` 通过；`pnpm check:daily-cta` 通过；`pnpm check:daily-fresh-completeness` 通过；`pnpm check:latest-daily-surface` 通过；`pnpm check:daily-related-posts` 通过；`pnpm check:daily-evidence-matrix` 通过；`pnpm check:daily-en-language` 通过；`pnpm check:daily-action-sections` 通过；`pnpm check:duplicate-slug-id` 通过；`pnpm build` 通过；EN 页面不再出现 generator fallback 句式，ZH 页面不再含实战案例省略号或证据矩阵截断。
- Result: pass（`src/content/blog/en|zh/openclaw-daily-2026-05-27.md` 已完成 EN 完整英文实稿回补、ZH description 可检索化、ZH 实战案例/证据矩阵补全；`check-daily-brief-specificity.mjs` 已阻断 EXP-133 暴露的 `daily story N` / `anchors story` / `named source signal` 泛化 fallback；本地十一项日报/索引卫生闸门与 build 全部通过；commit `(this commit)`；质量评分 28/30。）
- Decision (scale / iterate / stop): scale（保留 expanded specificity 闸门作为最新英文日报事实密度基线；下一步建议把发布脚本 EN generator 从 CJK 丢弃式 fallback 升级为结构化翻译/摘要 fixture，避免需要发布后人工回补。）

### EXP-132
- Hypothesis: EXP-131 已新增 EN/ZH pair fixture，但 EN、ZH、pair 三个检查脚本仍重复维护同一 2026-05-24 真实 cron 摘要、expected labels 与 banned fallback；若抽成共享 fixture module 并新增去重闸门，可减少 fixture 漂移、降低后续发布脚本质量检查维护成本，并让 CI 阻断重复 fixture 回归。
- Scope: `scripts/fixtures/daily-real-cron-2026-05-24.mjs`、`scripts/check-daily-generator-real-cron-fixture.mjs`、`scripts/check-daily-zh-generator-real-cron-fixture.mjs`、`scripts/check-daily-bilingual-generator-pair-fixture.mjs`、`scripts/check-daily-fixture-source-dedup.mjs`、`package.json`、`.github/workflows/content-check.yml`
- Change: 新增共享真实 cron fixture 模块，集中导出 fixture date、source summary、expectedSignals、banned fallback phrases 与 EN/ZH required outputs；三个真实 cron fixture 检查脚本改为统一 import 共享 source；新增 daily fixture source dedup 闸门，阻断检查脚本重新内联 2026-05-24 fixture；同步接入 package script 与 content-check CI。
- Start date: 2026-05-26
- End date: 2026-05-26
- Success metric: `pnpm check:daily-generator-real-cron-fixture` 通过；`pnpm check:daily-zh-generator-real-cron-fixture` 通过；`pnpm check:daily-bilingual-generator-pair-fixture` 通过；`pnpm check:daily-fixture-source-dedup` 通过；`bash -n scripts/publish-daily.sh` 通过；`pnpm check:publish-daily-generator-fixture` 通过；`pnpm check:daily-brief-specificity` 通过；`pnpm check:daily-template` 通过；`pnpm check:daily-heading-date` 通过；`pnpm check:daily-cta` 通过；`pnpm check:daily-fresh-completeness` 通过；`pnpm check:latest-daily-surface` 通过；`pnpm check:daily-related-posts` 通过；`pnpm check:daily-evidence-matrix` 通过；`pnpm check:daily-en-language` 通过；`pnpm check:daily-action-sections` 通过；`pnpm check:duplicate-slug-id` 通过；`pnpm build` 通过；CI 出现 Daily fixture source dedup check。
- Result: pass（已抽出共享真实 cron fixture module，三个 EN/ZH/pair fixture 检查脚本已统一 import；新增去重闸门并接入 package/CI；本地专项检查、十一项日报/索引卫生闸门与 build 全部通过；commit `(this commit)`；质量评分 28/30。）
- Decision (scale / iterate / stop): scale（保留共享 fixture source + dedup 闸门作为发布脚本生成质量检查的维护基线；下一步可把 fixture 覆盖扩展到最新 2026-05-26 日报，验证新增内容建设样本不会出现 description 或 evidence drift。）

### EXP-131
- Hypothesis: EXP-130 已把 ZH generator 抽成共享模块，但 EN/ZH 仍分别用独立 fixture 验证；若新增同一真实 cron 摘要的双语 pair fixture，并同时修复 ZH description 对 Markdown 标题和空字段标签的泄漏，可在 CI 中提前发现双语来源顺序、证据矩阵条数、description 具体度和泛化 fallback 回归，减少发布窗口人工返工。
- Scope: `scripts/check-daily-bilingual-generator-pair-fixture.mjs`、`scripts/lib/daily-zh-generator.mjs`、`package.json`、`.github/workflows/content-check.yml`
- Change: 新增 EN/ZH 双语 generator pair fixture，使用 2026-05-24 真实 cron 摘要同时调用 `generateEnglishDailyBody`、`generateZhDailyBody` 与 `buildZhDescription`；验证 5 条 story 顺序、EN label、EN/ZH Evidence Matrix 映射、行动段存在与 banned fallback；修复 ZH description 构建逻辑，过滤 Markdown heading、空字段标签和纯英文标题，避免 description 泄漏 `### 1.` 或 `发生了什么` 等结构噪声；新增 package script 并接入 content-check CI。
- Start date: 2026-05-26
- End date: 2026-05-26
- Success metric: `bash -n scripts/publish-daily.sh` 通过；`pnpm check:publish-daily-generator-fixture` 通过；`pnpm check:daily-generator-real-cron-fixture` 通过；`pnpm check:daily-zh-generator-real-cron-fixture` 通过；`pnpm check:daily-bilingual-generator-pair-fixture` 通过；`pnpm check:daily-brief-specificity` 通过；`pnpm check:daily-template` 通过；`pnpm check:daily-heading-date` 通过；`pnpm check:daily-cta` 通过；`pnpm check:daily-fresh-completeness` 通过；`pnpm check:latest-daily-surface` 通过；`pnpm check:daily-related-posts` 通过；`pnpm check:daily-evidence-matrix` 通过；`pnpm check:daily-en-language` 通过；`pnpm check:daily-action-sections` 通过；`pnpm check:duplicate-slug-id` 通过；`pnpm build` 通过；CI 出现 Daily bilingual generator pair fixture check。
- Result: pass（已新增双语 pair fixture 并接入 package/CI；ZH description 已过滤 Markdown 标题、字段标签和纯英文标题；本地专项检查、十一项日报/索引卫生闸门与 build 全部通过；commit `(this commit)`；质量评分 28/30。）
- Decision (scale / iterate / stop): scale（保留 EN/ZH pair fixture 作为发布脚本双语一致性基线；下一步可把 fixture source 抽成共享文件，避免 EN、ZH、pair 三个检查脚本重复维护同一真实 cron 摘要。）

### EXP-130
- Hypothesis: EXP-129 已把 EN generator 抽成共享模块，但 ZH description、行动段和证据矩阵补齐逻辑仍内嵌在 `publish-daily.sh` 的 Python heredoc 中；若抽成 `scripts/lib/daily-zh-generator.mjs` 并用真实 2026-05-24 cron 摘要做 fixture 闸门，可在 CI 中提前发现 ZH 空字段标签解析、description 具体度、行动段和证据矩阵回归，减少发布窗口人工返工。
- Scope: `scripts/lib/daily-zh-generator.mjs`、`scripts/publish-daily.sh`、`scripts/check-publish-daily-generator-fixture.mjs`、`scripts/check-daily-zh-generator-real-cron-fixture.mjs`、`package.json`、`.github/workflows/content-check.yml`
- Change: 将 ZH description、结构化 story extraction、今日结论/明日跟踪点补齐和证据矩阵生成从 `publish-daily.sh` heredoc 抽成共享 JS module；发布脚本改为调用 `buildZhDescription` 与 `generateZhDailyBody`；新增真实 cron 摘要 ZH fixture 闸门，覆盖 EXP-129 后续提出的 ZH 模块化、空字段标签、5 条来源条目、行动段与证据矩阵一致性；同步扩展静态 fixture 闸门并接入 package/CI。
- Start date: 2026-05-25
- End date: 2026-05-25
- Success metric: `bash -n scripts/publish-daily.sh` 通过；`pnpm check:publish-daily-generator-fixture` 通过；`pnpm check:daily-generator-real-cron-fixture` 通过；`pnpm check:daily-zh-generator-real-cron-fixture` 通过；`pnpm check:daily-brief-specificity` 通过；`pnpm check:daily-template` 通过；`pnpm check:daily-heading-date` 通过；`pnpm check:daily-cta` 通过；`pnpm check:daily-fresh-completeness` 通过；`pnpm check:latest-daily-surface` 通过；`pnpm check:daily-related-posts` 通过；`pnpm check:daily-evidence-matrix` 通过；`pnpm check:daily-en-language` 通过；`pnpm check:daily-action-sections` 通过；`pnpm check:duplicate-slug-id` 通过；`pnpm build` 通过；CI 出现 Daily ZH generator real cron fixture check。
- Result: pass（ZH generator 已抽成共享 JS 模块，发布脚本已改为调用该模块，真实 cron fixture 与静态 source-detail hook 闸门均已通过；本地专项检查、十一项日报/索引卫生闸门与 build 全部通过；commit `b8580ee`；质量评分 28/30。）
- Decision (scale / iterate / stop): scale（保留 ZH fixture 作为发布脚本中文生成质量基线；下一步可新增 EN/ZH pair fixture，对同一 cron 摘要的 description 实体、来源条目数量和 Evidence Matrix/证据矩阵一致性做跨语言比对。）

### EXP-129
- Hypothesis: EXP-128 已把 EN fallback 具体化，但核心生成逻辑仍内嵌在 `publish-daily.sh` heredoc 中，只能依赖静态短语扫描；若抽成 `scripts/lib/daily-generator.mjs` 并用真实 2026-05-24 cron 摘要 fixture 做快照闸门，可在 CI 中提前发现空字段标签解析、实体标签、Evidence Matrix 和行动段回归，减少低事实密度英文日报进入首日索引窗口。
- Scope: `scripts/lib/daily-generator.mjs`、`scripts/publish-daily.sh`、`scripts/check-publish-daily-generator-fixture.mjs`、`scripts/check-daily-generator-real-cron-fixture.mjs`、`package.json`、`.github/workflows/content-check.yml`
- Change: 将 EN 日报生成器从 shell heredoc 抽成共享 JS module；`publish-daily.sh` 改为通过 Node 调用 `generateEnglishDailyBody`；新增真实 cron 摘要 fixture 闸门，覆盖 EXP-127/128 暴露的空字段标签、命名实体标签、证据矩阵、行动段和 banned phrase 回归；更新静态 fixture 闸门以验证共享模块 source-detail hooks，并接入 package/CI。
- Start date: 2026-05-25
- End date: 2026-05-25
- Success metric: `bash -n scripts/publish-daily.sh` 通过；`pnpm check:publish-daily-generator-fixture` 通过；`pnpm check:daily-generator-real-cron-fixture` 通过；`pnpm check:daily-brief-specificity` 通过；`pnpm check:daily-template` 通过；`pnpm check:daily-heading-date` 通过；`pnpm check:daily-cta` 通过；`pnpm check:daily-fresh-completeness` 通过；`pnpm check:latest-daily-surface` 通过；`pnpm check:daily-related-posts` 通过；`pnpm check:daily-evidence-matrix` 通过；`pnpm check:daily-en-language` 通过；`pnpm check:daily-action-sections` 通过；`pnpm check:duplicate-slug-id` 通过；`pnpm build` 通过；CI 出现 Daily generator real cron fixture check。
- Result: pass（EN generator 已抽成共享 JS 模块，发布脚本已改为调用该模块，真实 cron fixture 快照闸门与静态 source-detail hook 闸门均已通过；本地专项检查、十一项日报/索引卫生闸门与 build 全部通过；commit `ab84b25`；质量评分 28/30。）
- Decision (scale / iterate / stop): scale（保留真实 cron fixture 作为发布脚本生成质量基线；下一步可把 ZH 补齐逻辑也抽成共享模块，并新增 EN/ZH 双语 fixture 以覆盖 description 与证据矩阵一致性。）

### EXP-128
- Hypothesis: EXP-127 已发现 `publish-daily.sh` 在空字段标签或字段缺失时会回退到 `primary named signal`、`The item affects workflow fit...`、`named signal for story` 等泛化句式；若把 fallback 改为引用 source title/label，并让 generator fixture 闸门直接阻断这些回归短语，可在发布前减少低事实密度英文日报进入首日索引窗口，降低后续人工回补频率。
- Scope: `scripts/publish-daily.sh`、`scripts/check-publish-daily-generator-fixture.mjs`
- Change: 为 EN generator 新增 `compact_title`，在 What/Why/Impact 与 Evidence Matrix fallback 中优先引用 source title 或 label；移除 generator 中 `primary named signal`、`The item affects workflow fit...`、`named signal for story` 等泛化句式；扩展 `check-publish-daily-generator-fixture.mjs` 的 banned phrases 与 required signals，静态要求 `compact_title` 与 `story.get('title')`。
- Start date: 2026-05-24
- End date: 2026-05-24
- Success metric: `pnpm check:publish-daily-generator-fixture` 通过；`bash -n scripts/publish-daily.sh` 通过；`pnpm check:daily-brief-specificity` 通过；`pnpm check:daily-template` 通过；`pnpm check:daily-heading-date` 通过；`pnpm check:daily-cta` 通过；`pnpm check:daily-fresh-completeness` 通过；`pnpm check:latest-daily-surface` 通过；`pnpm check:daily-related-posts` 通过；`pnpm check:daily-evidence-matrix` 通过；`pnpm check:daily-en-language` 通过；`pnpm check:daily-action-sections` 通过；`pnpm check:duplicate-slug-id` 通过；`pnpm build` 通过；generator fixture 能阻断 EXP-127 发现的 fallback 泛化句式。
- Result: pass（`publish-daily.sh` 已把 fallback 改为 source title/label 驱动，fixture 闸门已覆盖 EXP-127 发现的三类泛化短语与 title fallback required signals；本地专项检查、十一项日报/索引卫生闸门与 build 全部通过；commit `(this commit)`；质量评分 27/30。）
- Decision (scale / iterate / stop): scale（保留 generator fixture 作为发布脚本静态质量基线；下一步可把 EN generator 抽成独立 JS/Python 模块并用真实 cron 摘要做快照测试。）

### EXP-127
- Hypothesis: 最近24小时新增日报（2026-05-24）若 EN 页面因 `发生了什么：` / `为什么重要：` / `可能影响：` 采用空标签换行而未被 `publish-daily.sh` 解析，生成 `primary named signal`、`The item affects workflow fit...`、`named signal for story` 等低事实密度 fallback，且发布脚本未串行运行 `check:daily-brief-specificity`，会削弱首日索引窗口期的主题匹配、摘要点击意图一致性、来源可核验性与读者完成率；当日回补完整英文实稿、修复解析器并强化发布/CI 闸门，可提升搜索可见性并减少后续日报泛化回归。
- Scope: `/en|zh/blog/openclaw-daily-2026-05-24/`、`scripts/publish-daily.sh`、`scripts/check-daily-brief-specificity.mjs`
- Change: 将 EN `openclaw-daily-2026-05-24.md` 从 generator fallback 泛化稿回补为完整英文日报，覆盖 Anthropic Project Glasswing / Claude Mythos Preview、NVIDIA Vera Rubin NVL72 / Jetson Thor / COMPUTEX、Amazon Alexa+ on-demand podcasts、OpenAI Codex Appshots / Goal mode、Xinhua 中国 AI 教育文旅养老机器人落地；将 ZH description 从截断残句升级为可检索摘要；修复 `publish-daily.sh` 的 ZH/EN story extraction，使空字段标签可捕获下一行明细；EN generator 改为 `### N.` story heading；发布质量闸门加入 `check:daily-brief-specificity`；specificity 闸门新增 fallback 句式拦截。
- Start date: 2026-05-24
- End date: 2026-05-24
- Success metric: `bash -n scripts/publish-daily.sh` 通过；`pnpm check:daily-brief-specificity` 通过；`pnpm check:publish-daily-generator-fixture` 通过；`pnpm check:daily-template` 通过；`pnpm check:daily-heading-date` 通过；`pnpm check:daily-cta` 通过；`pnpm check:daily-fresh-completeness` 通过；`pnpm check:latest-daily-surface` 通过；`pnpm check:daily-related-posts` 通过；`pnpm check:daily-evidence-matrix` 通过；`pnpm check:daily-en-language` 通过；`pnpm check:daily-action-sections` 通过；`pnpm check:duplicate-slug-id` 通过；`pnpm build` 通过；EN 页面不再出现 generator fallback 句式，ZH description 不再截断。
- Result: pass（`src/content/blog/en|zh/openclaw-daily-2026-05-24.md` 已完成 EN 完整英文实稿回补与 ZH description 可检索化；`publish-daily.sh` 已修复空字段标签解析、输出 `### N.` story heading 并在发布前运行 `check:daily-brief-specificity`；specificity 闸门已阻断 fallback 泛化句式；本地专项检查、十一项日报/索引卫生闸门与 build 全部通过；commit `1841c1f` 已推送；质量评分 28/30。）
- Decision (scale / iterate / stop): scale（保留 specificity 闸门作为发布脚本强制闸门；下一步可把 `publish-daily.sh` 的 Python 生成器抽成独立模块并用真实 cron 摘要 fixture 做快照测试。）

### EXP-126
- Hypothesis: EXP-125 显示最新日报虽然已回补为完整英文实稿，但 `publish-daily.sh` EN 生成器仍含 `same-day brief section`、`concrete AI and technology development`、`mapped to the publish-ready story`、`Structured source section` 等会再次生成泛化结构稿的短语；若在生成器层改为引用结构化 story 的 `what/why/impact` source detail，并新增 fixture 闸门扫描生成器，可在 CI 阶段阻断低事实密度英文日报回归，减少首日索引窗口损耗与发布后人工回补。
- Scope: `scripts/publish-daily.sh`、`scripts/check-publish-daily-generator-fixture.mjs`、`package.json`、`.github/workflows/content-check.yml`
- Change: 将 EN generator 的 `sentence()` 从固定泛化句式改为通过 `detail_from()` 使用 story `what/why/impact` 明细；Evidence Matrix 从 `Structured source section ... mapped to the publish-ready story` 改为 `Evidence item ... source_detail`；新增 `check-publish-daily-generator-fixture.mjs`，扫描 EN generator 禁止泛化短语并要求 source-detail hooks；新增 `pnpm check:publish-daily-generator-fixture` 并接入 content-check CI。
- Start date: 2026-05-23
- End date: 2026-05-23
- Success metric: `pnpm check:publish-daily-generator-fixture` 通过；`bash -n scripts/publish-daily.sh` 通过；`pnpm check:daily-brief-specificity` 通过；`pnpm check:daily-template` 通过；`pnpm check:daily-heading-date` 通过；`pnpm check:daily-cta` 通过；`pnpm check:daily-fresh-completeness` 通过；`pnpm check:latest-daily-surface` 通过；`pnpm check:daily-related-posts` 通过；`pnpm check:daily-evidence-matrix` 通过；`pnpm check:daily-en-language` 通过；`pnpm check:daily-action-sections` 通过；`pnpm check:duplicate-slug-id` 通过；`pnpm build` 通过；CI 出现 Publish daily generator fixture check。
- Result: pass（已移除发布脚本 EN 生成器中的泛化结构稿短语，新增 fixture 闸门并接入 package/CI；本地专项检查、bash 语法检查、十一项日报/索引卫生闸门与 build 全部通过；commit `d83579a` 已推送；质量评分 27/30。）
- Decision (scale / iterate / stop): scale（保留该 fixture 闸门作为发布脚本生成质量基线；下一步可把生成器进一步抽成独立 JS 模块并用真实 cron 摘要 fixture 做快照测试。）

### EXP-125
- Hypothesis: 最近24小时新增日报（2026-05-23）若 EN 页面仍保留 `same-day brief section`、`concrete AI and technology development`、`mapped to the publish-ready story` 等泛化结构稿，ZH description 含 Markdown 标题残留且 ZH 案例 2 以省略号截断，会削弱首日索引窗口期的主题匹配、摘要点击意图一致性、来源可核验性与读者完成率；当日回补为完整英文叙事、可检索 ZH 摘要、完整风险提示和具体证据矩阵，可提升搜索可见性与核心指南导流质量。
- Scope: `/en|zh/blog/openclaw-daily-2026-05-23/`
- Change: 将 EN `openclaw-daily-2026-05-23.md` 从结构化泛化稿回补为完整英文日报，覆盖 Anthropic Project Glasswing 漏洞发现、NVIDIA COMPUTEX / GTC Taipei AI 工厂与机器人平台、TC260-005 AI 应用伦理安全指引、工信部工业知识智能计算标准征求意见、新华网九章四号光量子计算进展，并补充 OpenAI Codex 持续工作流案例；将 ZH description 从 Markdown 标题残留升级为可检索摘要；补全 ZH 案例 2 省略号截断、状态与来源；将 EN/ZH 证据矩阵扩展为 6 条具体来源明细，保持 What Is OpenClaw / VPS guide / model fallback 三条强相关 CTA 不回退。
- Start date: 2026-05-23
- End date: 2026-05-23
- Success metric: `pnpm check:daily-brief-specificity` 通过；`pnpm check:daily-template` 通过；`pnpm check:daily-heading-date` 通过；`pnpm check:daily-cta` 通过；`pnpm check:daily-fresh-completeness` 通过；`pnpm check:latest-daily-surface` 通过；`pnpm check:daily-related-posts` 通过；`pnpm check:daily-evidence-matrix` 通过；`pnpm check:daily-en-language` 通过；`pnpm check:daily-action-sections` 通过；`pnpm check:duplicate-slug-id` 通过；`pnpm build` 通过；EN 页面不再出现泛化结构稿句式，ZH description 不再含 Markdown 标题残留，ZH 正文不再含省略号截断。
- Result: pass（`src/content/blog/en|zh/openclaw-daily-2026-05-23.md` 已完成 EN 完整英文实稿回补、ZH description 可检索化、ZH 案例 2 截断补全与 EN/ZH 证据矩阵具体化；本地十一项日报/索引卫生闸门 + build 全部通过；commit `a0ecc42` 已推送；质量评分 27/30。）
- Decision (scale / iterate / stop): iterate（下一步建议为 `publish-daily.sh` 增加 fixture 单测，确保最新日报发布时不会再次生成泛化英文结构稿、Markdown 标题残留 description 或省略号截断正文。）

### EXP-124
- Hypothesis: EXP-123 显示最近24小时英文日报即使通过英文语言、一致性、行动段和证据矩阵闸门，仍可能保留 `same-day brief section`、`concrete AI and technology development`、`mapped to the publish-ready story` 等流畅但低事实密度的泛化句式；若新增最新英文日报事实具体度闸门，要求 Top 5 标题、Evidence Matrix 和正文具备足够命名实体与具体 source detail，可在 CI 阶段阻断“可读但不具体”的英文日报回归，减少首日索引窗口损耗与发布后人工回补。
- Scope: `scripts/check-daily-brief-specificity.mjs`、`package.json`、`.github/workflows/content-check.yml`，默认覆盖最新 EN `openclaw-daily-*`。
- Change: 新增 `check-daily-brief-specificity.mjs`，阻断 `same-day brief section`、`mapped to the publish-ready story`、`concrete AI and technology development`、`source brief` 等泛化句式；阻断 `### N. AI` / `Technology` / `Source brief` 等泛化 Top Stories 标题；要求最新 EN 日报 Top Stories 至少 5 条、多数标题含可识别实体，Evidence Matrix 至少 5 条带命名实体与 source detail 的 bullet；新增 `pnpm check:daily-brief-specificity` 并接入 content-check CI。
- Start date: 2026-05-22
- End date: 2026-05-22
- Success metric: `pnpm check:daily-brief-specificity` 通过；`pnpm check:daily-template` 通过；`pnpm check:daily-heading-date` 通过；`pnpm check:daily-cta` 通过；`pnpm check:daily-fresh-completeness` 通过；`pnpm check:latest-daily-surface` 通过；`pnpm check:daily-related-posts` 通过；`pnpm check:daily-evidence-matrix` 通过；`pnpm check:daily-en-language` 通过；`pnpm check:daily-action-sections` 通过；`pnpm check:duplicate-slug-id` 通过；`pnpm build` 通过；CI 出现 Daily brief specificity check。
- Result: pass（已新增最新英文日报事实具体度闸门并接入 package/CI；本地专项检查、十项日报/索引卫生闸门与 build 全部通过；commit `d83579a` 已推送；质量评分 27/30。）
- Decision (scale / iterate / stop): scale（保留该闸门作为最近24小时英文日报发布质量基线；下一步可为 `scripts/publish-daily.sh` 增加 fixture 单测，覆盖结构化 story extraction、泛化句式拦截与 Evidence Matrix 具体化。）

### EXP-123
- Hypothesis: 最近24小时新增日报（2026-05-22）若 EN 页面仍是 `same-day brief section` 结构化泛化稿、ZH description 含工具报错说明和 Markdown 标题残留，且 ZH 购物 Agent 注意事项以省略号截断，会削弱首日索引窗口期的主题匹配、摘要点击意图一致性、来源可核验性与读者完成率；当日回补为完整英文叙事、可检索 ZH 摘要、完整风险提示和具体证据矩阵，可提升搜索可见性与核心指南导流质量。
- Scope: `/en|zh/blog/openclaw-daily-2026-05-22/`
- Change: 将 EN `openclaw-daily-2026-05-22.md` 从结构化泛化稿回补为完整英文日报，覆盖 NVIDIA COMPUTEX / GTC Taipei 基础设施、OpenAI Codex 工作流升级、Anthropic + KPMG Claude 企业部署、Amazon AWS 数据中心社区治理、中国 AI 应用伦理安全指引；将 ZH description 从工具报错/标题残留升级为可检索摘要；补全 ZH 购物 Agent 注意事项，移除省略号截断；将 EN/ZH 证据矩阵改为 5 条具体来源明细，保持 What Is OpenClaw / VPS guide / model fallback 三条强相关 CTA 不回退。
- Start date: 2026-05-22
- End date: 2026-05-22
- Success metric: `pnpm check:daily-template` 通过；`pnpm check:daily-heading-date` 通过；`pnpm check:daily-cta` 通过；`pnpm check:daily-fresh-completeness` 通过；`pnpm check:latest-daily-surface` 通过；`pnpm check:daily-related-posts` 通过；`pnpm check:daily-evidence-matrix` 通过；`pnpm check:daily-en-language` 通过；`pnpm check:daily-action-sections` 通过；`pnpm check:duplicate-slug-id` 通过；`pnpm build` 通过；EN 页面不再出现 `same-day brief section` 泛化叙述，ZH description 不再含工具报错/标题残留，ZH 正文不再含省略号截断。
- Result: pass（`src/content/blog/en|zh/openclaw-daily-2026-05-22.md` 已完成 EN 完整英文实稿回补、ZH description 可检索化、ZH 案例 2 截断补全与 EN/ZH 证据矩阵具体化；本地十项日报/索引卫生闸门 + build 全部通过；commit `d83579a` 已推送；质量评分 27/30。）
- Decision (scale / iterate / stop): iterate（下一步建议在发布脚本中增加“泛化句式”闸门，阻断 `same-day brief section`、`concrete AI and technology development`、`mapped to the publish-ready story` 这类通过语言检查但缺少事实密度的英文日报。）

### EXP-122
- Hypothesis: EXP-121 显示最近24小时日报发布链路即使通过语言闸门，也可能因 `publish-daily.sh` 使用大写 token 启发式，把 EN Top 5 生成 `AI` 泛化标题、把 EN/ZH 证据矩阵写成泛化来源标签；若发布脚本改为解析 `### N.` / `发生了什么` / `为什么重要` / `可能影响` 的编号故事结构，并用品牌实体 + 中文主题词映射生成英文标签与双语具体证据矩阵，可减少发布后人工回补、提升首日索引窗口的主题匹配、摘要一致性与来源可核验性。
- Scope: `scripts/publish-daily.sh`
- Change: 为 ZH/EN 发布稿生成增加结构化故事解析器；ZH 证据矩阵从固定 `来源简报 1-5` 改为基于来源条目的标题与结构字段摘要；EN 生成从单纯扫描 `OpenAI/Anthropic/.../AI` 行与大写 token 改为解析编号 story、字段聚合、品牌实体提取与中文主题词映射，Top 5 与 Evidence Matrix 使用具体 source section 标签，避免单独 `AI` 泛化标题和泛化 evidence。
- Start date: 2026-05-21
- End date: 2026-05-21
- Success metric: `bash -n scripts/publish-daily.sh` 通过；`pnpm build` 通过；`pnpm check:daily-template` 通过；`pnpm check:daily-heading-date` 通过；`pnpm check:daily-cta` 通过；`pnpm check:daily-fresh-completeness` 通过；`pnpm check:latest-daily-surface` 通过；`pnpm check:daily-related-posts` 通过；`pnpm check:daily-evidence-matrix` 通过；`pnpm check:daily-en-language` 通过；`pnpm check:daily-action-sections` 通过；`pnpm check:duplicate-slug-id` 通过；脚本不再依赖单一 `AI` token 生成 story label。
- Result: pass（`scripts/publish-daily.sh` 已完成结构化 story extraction、EN label 主题映射和 EN/ZH 具体证据矩阵生成升级；本地语法检查、十项日报/索引卫生闸门 + build 全部通过；commit `(this commit)` 待提交推送。）
- Decision (scale / iterate / stop): iterate（下一步建议把结构化解析器抽成独立可单测脚本，并增加 fixture 覆盖“纯中文标题 + 品牌实体 + 无编号 fallback”三类摘要，进一步降低发布窗口回归风险。）

### EXP-121
- Hypothesis: 最近24小时新增日报（2026-05-21）若 EN 页面虽然通过语言闸门但 Top 5 仍为 `AI` 泛化占位、ZH description 仍含 Markdown 标题残留，且 EN/ZH 证据矩阵只写“来源简报”泛标签，会削弱首日索引窗口期的主题匹配、摘要点击意图一致性、来源可核验性与读者完成率；当日回补为完整英文实稿、可检索 ZH 摘要和具体证据矩阵，可提升搜索可见性与核心指南导流质量。
- Scope: `/en|zh/blog/openclaw-daily-2026-05-21/`
- Change: 将 EN `openclaw-daily-2026-05-21.md` 从启发式泛化故事块回补为完整英文日报，覆盖 Anthropic + KPMG 全球联盟、Anthropic 前沿 AI 价值观外部对话、NVIDIA + Google Cloud 开发者生态、Amazon Alexa+ 生成播客、中国 AI 相关硬件与终端收入增长，并补充电气装备垂类大模型与 ChatGPT 个人财务入口实战案例；将 ZH description 去除 Markdown 标题残留并升级为可检索摘要；将 EN/ZH 证据矩阵从泛化来源标签改为 5 条具体来源明细，保持 What Is OpenClaw / VPS guide / model fallback 三条强相关 CTA 不回退。
- Start date: 2026-05-21
- End date: 2026-05-21
- Success metric: `pnpm check:daily-template` 通过；`pnpm check:daily-heading-date` 通过；`pnpm check:daily-cta` 通过；`pnpm check:daily-fresh-completeness` 通过；`pnpm check:latest-daily-surface` 通过；`pnpm check:daily-related-posts` 通过；`pnpm check:daily-evidence-matrix` 通过；`pnpm check:daily-en-language` 通过；`pnpm check:daily-action-sections` 通过；`pnpm check:duplicate-slug-id` 通过；`pnpm build` 通过；EN 页面不再出现 `1. AI` 泛化故事块，ZH description 不再含 Markdown 标题残留，EN/ZH 证据矩阵均为具体来源明细。
- Result: pass（`src/content/blog/en|zh/openclaw-daily-2026-05-21.md` 已完成 EN 完整英文实稿回补、ZH description 可检索化与 EN/ZH 证据矩阵具体化；本地十项日报/索引卫生闸门 + build 全部通过；commit `bdb1a69` 已推送。）
- Decision (scale / iterate / stop): iterate（下一步建议把发布脚本的 story extraction 从大写 token 启发式升级为按 `### N.` / `发生了什么` / `为什么重要` / `可能影响` 结构解析，避免 EN 再生成 `AI` 泛化标题和泛化证据。）

### EXP-120
- Hypothesis: 当前 `publish-daily.sh` 虽已在 commit/push 前运行完整日报闸门，但 EN 页面仍直接写入 cron 中文摘要，导致发布阶段必然被英文语言、行动段或证据矩阵闸门拦截；若在脚本生成阶段直接产出英文结构化日报、可检索 EN description，并为 ZH 自动补齐今日结论、明日跟踪点和证据矩阵兜底，可减少发布后返工与首日索引窗口损耗。
- Scope: `scripts/publish-daily.sh`
- Change: 将日报发布脚本的内容生成逻辑升级为：ZH 保留 cron 源摘要并在缺少行动段/证据矩阵时自动补齐；EN 不再直写 `${SUMMARY}`，而是从同源摘要提取英文实体，生成 `Top 5 Stories`、`Practical Cases`、`Today’s Bottom Line`、`What to Watch Tomorrow` 与 `Evidence Matrix` 的英文结构化发布稿；EN description 从固定通用文案升级为包含源摘要英文实体的可检索摘要；保留 build + 十项日报/索引卫生闸门。
- Start date: 2026-05-20
- End date: 2026-05-20
- Success metric: `bash -n scripts/publish-daily.sh` 通过；`pnpm check:daily-template` 通过；`pnpm check:daily-heading-date` 通过；`pnpm check:daily-cta` 通过；`pnpm check:daily-fresh-completeness` 通过；`pnpm check:latest-daily-surface` 通过；`pnpm check:daily-related-posts` 通过；`pnpm check:daily-evidence-matrix` 通过；`pnpm check:daily-en-language` 通过；`pnpm check:daily-action-sections` 通过；`pnpm check:duplicate-slug-id` 通过；`pnpm build` 通过。
- Result: pass（`scripts/publish-daily.sh` 已从 EN 直写中文摘要升级为英文结构化发布稿生成，ZH 已增加行动段/证据矩阵缺失兜底；本地语法检查、十项日报/索引卫生闸门与 build 全部通过；commit `abb08f0` 已推送。）
- Decision (scale / iterate / stop): iterate（下一步建议把生成逻辑从启发式英文结构稿继续升级为“源摘要结构化 JSON + 可追踪 source label”，进一步提升英文正文具体度与事实可核验性。）

### EXP-119
- Hypothesis: 最近24小时新增日报（2026-05-20）若英文页仍为中文正文、EN description 仍为通用模板、ZH description 仍为正文截断摘要，且 EN/ZH 缺少完整明日跟踪点与证据矩阵，会削弱首日索引窗口期的语言匹配、摘要点击意图一致性、来源可核验性与读者完成率；当日回补为完整英文叙事、可检索摘要、完整行动段和证据矩阵，可提升搜索可见性与核心指南导流质量。
- Scope: `/en|zh/blog/openclaw-daily-2026-05-20/`
- Change: 将 EN `openclaw-daily-2026-05-20.md` 从中文正文回补为完整英文日报，覆盖 Anthropic + KPMG 全球联盟、NVIDIA + Google Cloud 开发者生态、Amazon Alexa+ 生成播客、NVIDIA Vera CPU 交付、上海太空算力布局；将 EN/ZH description 升级为可检索摘要；补全 EN/ZH 今日结论、明日跟踪点和证据矩阵，保持 What Is OpenClaw / VPS guide / model fallback 三条强相关 CTA 不回退。
- Start date: 2026-05-20
- End date: 2026-05-20
- Success metric: `pnpm check:daily-template` 通过；`pnpm check:daily-heading-date` 通过；`pnpm check:daily-cta` 通过；`pnpm check:daily-fresh-completeness` 通过；`pnpm check:latest-daily-surface` 通过；`pnpm check:daily-related-posts` 通过；`pnpm check:daily-evidence-matrix` 通过；`pnpm check:daily-en-language` 通过；`pnpm check:daily-action-sections` 通过；`pnpm check:duplicate-slug-id` 通过；`pnpm build` 通过；EN 页面正文为完整英文，EN/ZH description 均为具体可检索摘要，行动段与证据矩阵无省略号截断。
- Result: pass（`src/content/blog/en|zh/openclaw-daily-2026-05-20.md` 已完成语言一致性、description 可检索化、行动段补全与证据矩阵补全；本地十项日报/索引卫生闸门 + build 全部通过；commit `6669dea` 已推送。）
- Decision (scale / iterate / stop): iterate（继续优先消费最近24小时新增日报，固定执行“发布后 description 质量 + 英文语言一致性 + 行动段完整性 + 证据矩阵完整性 + 发现面/相关文章闸门 + build”闭环；下一步建议把发布脚本生成阶段进一步强化为默认产出完整英文实稿和证据矩阵，减少发布后回补。）

### EXP-118
- Hypothesis: 最近24小时新增日报连续出现英文页语言回归、description 泛化、行动段/证据矩阵截断等发布后返工；若 `publish-daily.sh` 在 commit/push 前强制运行完整日报质量闸门，可在源头阻断低质量日报进入主分支，减少首日索引窗口损耗与人工回补频率。
- Scope: `scripts/publish-daily.sh`
- Change: 将日报发布脚本从“只执行静默 build 后提交推送”升级为“先 build，再串行执行 daily template、heading date、CTA、fresh completeness、latest surface、related posts、evidence matrix、English language、action sections 与 duplicate slug/id 十项闸门，全部通过后才 commit/push”。
- Start date: 2026-05-19
- End date: 2026-05-19
- Success metric: `pnpm build` 通过；`pnpm check:daily-template`、`pnpm check:daily-heading-date`、`pnpm check:daily-cta`、`pnpm check:daily-fresh-completeness`、`pnpm check:latest-daily-surface`、`pnpm check:daily-related-posts`、`pnpm check:daily-evidence-matrix`、`pnpm check:daily-en-language`、`pnpm check:daily-action-sections`、`pnpm check:duplicate-slug-id` 全部通过；发布脚本在 commit/push 前执行完整闸门。
- Result: pass（`scripts/publish-daily.sh` 已接入完整日报质量闸门；本地 build + 十项日报/索引卫生闸门全部通过；commit `6669dea` 已提交，待推送。）
- Decision (scale / iterate / stop): iterate（下一步继续把发布脚本的 EN 生成从“中文摘要直写”升级为结构化英文实稿生成，同时默认输出 Evidence Matrix 与行动段，进一步减少被闸门阻断后的人工返工。）

### EXP-117
- Hypothesis: 最近24小时新增日报（2026-05-19）若英文页仍为中文正文、EN description 仍为通用模板、ZH description 仍为正文截断摘要，且 EN/ZH 缺少证据矩阵并以省略号截断明日跟踪点，会削弱首日索引窗口期的语言匹配、摘要点击意图一致性、来源可核验性与读者完成率；当日回补为完整英文叙事、可检索摘要、完整行动段和证据矩阵，可提升搜索可见性与核心指南导流质量。
- Scope: `/en|zh/blog/openclaw-daily-2026-05-19/`
- Change: 将 EN `openclaw-daily-2026-05-19.md` 从中文正文回补为完整英文日报，覆盖 Anthropic 收购 Stainless、NVIDIA Vera CPU 交付、Amazon Alexa+ 生成播客、中国实体产业 AI 落地与北斗时空产业扩张；将 EN/ZH description 升级为可检索摘要；补全 EN/ZH 今日结论、明日跟踪点和证据矩阵，保持 What Is OpenClaw / VPS guide / model fallback 三条强相关 CTA 不回退。
- Start date: 2026-05-19
- End date: 2026-05-19
- Success metric: `pnpm check:daily-template` 通过；`pnpm check:daily-heading-date` 通过；`pnpm check:daily-cta` 通过；`pnpm check:daily-fresh-completeness` 通过；`pnpm check:latest-daily-surface` 通过；`pnpm check:daily-related-posts` 通过；`pnpm check:daily-evidence-matrix` 通过；`pnpm check:daily-en-language` 通过；`pnpm check:daily-action-sections` 通过；`pnpm check:duplicate-slug-id` 通过；`pnpm build` 通过；EN 页面正文为完整英文，EN/ZH description 均为具体可检索摘要，行动段与证据矩阵无省略号截断。
- Result: pass（`src/content/blog/en|zh/openclaw-daily-2026-05-19.md` 已完成语言一致性、description 可检索化、行动段补全与证据矩阵补全；本地九项日报闸门 + duplicate precheck + build 全部通过；commit `93d1ebd` 已推送。）
- Decision (scale / iterate / stop): iterate（继续优先消费最近24小时新增日报，固定执行“发布后 description 质量 + 英文语言一致性 + 行动段完整性 + 证据矩阵完整性 + 发现面/相关文章闸门 + build”闭环；下一步建议扩展最新日报发布脚本，默认生成证据矩阵和英文实稿，减少发布后返工。）

### EXP-116
- Hypothesis: 最近24小时新增日报已多次需要人工回补“今日结论/明日跟踪点”；若这些行动段缺失、条数不足或以省略号截断，会削弱读者完成率、下一步判断和日报作为连续阅读入口的转化价值。把最新日报行动段完整性纳入 CI，可在发布阶段阻断结尾质量回归，稳定放大 EXP-115 的质量收益。
- Scope: `scripts/check-daily-action-sections.sh`、`package.json`、`.github/workflows/content-check.yml`，默认覆盖最新 EN/ZH `openclaw-daily-*`。
- Change: 新增 `check-daily-action-sections.sh`，自动识别最新 EN/ZH 日报，要求 EN `## Today’s Bottom Line` 与 `## What to Watch Tomorrow`、ZH `## 今日结论` 与 `## 明日跟踪点` 均存在且各至少 3 条 bullet，并阻断行动段 bullet 以 `...` 或 `…` 截断；新增 `pnpm check:daily-action-sections` 并接入 content-check CI。
- Start date: 2026-05-18
- End date: 2026-05-18
- Success metric: `pnpm check:daily-action-sections` 通过；`pnpm check:daily-template` 通过；`pnpm check:daily-heading-date` 通过；`pnpm check:daily-cta` 通过；`pnpm check:daily-fresh-completeness` 通过；`pnpm check:latest-daily-surface` 通过；`pnpm check:daily-related-posts` 通过；`pnpm check:daily-evidence-matrix` 通过；`pnpm check:daily-en-language` 通过；`pnpm check:duplicate-slug-id` 通过；`pnpm build` 通过；CI 出现 Daily action sections completeness check。
- Result: pass（已新增最新日报行动段完整性闸门并接入 package/CI；本地专项检查、日报质量闸门、发现面、相关文章、证据矩阵、英文语言、duplicate precheck 与 build 全部通过；commit `(this commit)` 待提交推送。）
- Decision (scale / iterate / stop): scale（保留该闸门作为最近24小时日报发布质量基线；下一步可按发布窗口把 `LATEST_COUNT` 扩展到最近 2 篇，或把行动段质量进一步纳入内容评分。）

### EXP-115
- Hypothesis: 最近24小时新增日报（2026-05-18）若英文页仍为中文正文、EN description 仍为通用模板、ZH description 仍为正文截断摘要，且 EN/ZH 在实战案例 2 处以省略号截断并缺少证据矩阵，会削弱首日索引窗口期的语言匹配、摘要点击意图一致性、来源可核验性与读者完成率；当日回补为完整英文叙事、可检索摘要、完整结论/跟踪点和证据矩阵，可提升搜索可见性与核心指南导流质量。
- Scope: `/en|zh/blog/openclaw-daily-2026-05-18/`
- Change: 将 EN `openclaw-daily-2026-05-18.md` 从中文混排回补为完整英文日报，覆盖 ChatGPT 个人财务、Anthropic + PwC 企业 Claude 部署、Anthropic + Gates Foundation 公益 AI、AWS Trainium 高校研究、中国 AI 终端智能化分级、SAP + NVIDIA OpenShell 安全运行时；将 EN/ZH description 升级为可检索摘要；补全 EN/ZH 实战案例 2、今日结论、明日跟踪点和证据矩阵，保持 What Is OpenClaw / VPS guide / model fallback 三条强相关 CTA 不回退。
- Start date: 2026-05-18
- End date: 2026-05-18
- Success metric: `pnpm check:daily-template` 通过；`pnpm check:daily-heading-date` 通过；`pnpm check:daily-cta` 通过；`pnpm check:daily-fresh-completeness` 通过；`pnpm check:latest-daily-surface` 通过；`pnpm check:daily-related-posts` 通过；`pnpm check:daily-evidence-matrix` 通过；`pnpm check:daily-en-language` 通过；`pnpm check:duplicate-slug-id` 通过；`pnpm build` 通过；EN 页面正文为完整英文，EN/ZH description 均为具体可检索摘要，正文和证据矩阵不再含省略号截断。
- Result: pass（`src/content/blog/en|zh/openclaw-daily-2026-05-18.md` 已完成语言一致性、description 可检索化、正文补全与证据矩阵补全；本地八项日报闸门 + duplicate precheck + build 全部通过；commit `391c612` 已推送。）
- Decision (scale / iterate / stop): iterate（继续优先消费最近24小时新增日报，固定执行“发布后 description 质量 + 语言一致性 + 正文完整性 + 证据矩阵完整性 + 发现面/相关文章闸门 + build”闭环；下一步建议把双语日报结论/跟踪点缺失也纳入自动闸门。）

### EXP-114
- Hypothesis: 最近24小时新增日报已多次出现 EN 页面中文混排/中文正文回归；若只依赖人工发布后回补，会错过首日索引窗口。新增最新英文日报语言一致性闸门，扫描中文结构标题、中文字段标签与异常 CJK 占比，可在 CI 阶段阻断英文页语言回归，稳定提升英文检索匹配、读者完成率与日报质量闭环效率。
- Scope: `scripts/check-daily-en-language-consistency.mjs`、`package.json`、`.github/workflows/content-check.yml`，默认覆盖最新 EN `openclaw-daily-*`。
- Change: 新增 `check-daily-en-language-consistency.mjs`，自动识别最新英文日报，阻断中文日报标题/章节、`发生了什么：`、`为什么重要：`、`可能影响：`、`普通用户建议：`、`明日跟踪点：`、`证据矩阵` 等中文结构残留，并通过 CJK 字符与英文词量比例捕捉大段未翻译正文；新增 `pnpm check:daily-en-language` 并接入 content-check CI。
- Start date: 2026-05-17
- End date: 2026-05-17
- Success metric: `pnpm check:daily-en-language` 通过；`pnpm check:daily-template` 通过；`pnpm check:daily-heading-date` 通过；`pnpm check:daily-cta` 通过；`pnpm check:daily-fresh-completeness` 通过；`pnpm check:latest-daily-surface` 通过；`pnpm check:daily-related-posts` 通过；`pnpm check:daily-evidence-matrix` 通过；`pnpm check:duplicate-slug-id` 通过；`pnpm build` 通过；CI 出现 Daily English language consistency check。
- Result: pass（已新增最新英文日报语言一致性闸门并接入 package/CI；本地专项检查、日报质量闸门、发现面、相关文章、证据矩阵、duplicate precheck 与 build 全部通过；commit `(this commit)` 待提交推送。）
- Decision (scale / iterate / stop): scale（保留该闸门作为最近24小时英文日报发布质量基线；下一步可根据误报情况扩展为最近 2 篇或加入更多中文模板标签。）

### EXP-113
- Hypothesis: 最近24小时新增日报（2026-05-17）若英文页仍为中文正文、EN description 仍为通用模板、ZH description 仍为标题/首条截断摘要，且 EN/ZH 缺少证据矩阵并在“短期内最实用的 AI 方向…”处截断，会削弱首日索引窗口期的语言匹配、摘要点击意图一致性、页面可信度与阅读完成率；当日回补为完整英文叙事、可检索摘要、完整结论和来源矩阵，可提升搜索可见性与核心指南导流质量。
- Scope: `/en|zh/blog/openclaw-daily-2026-05-17/`
- Change: 将 EN `openclaw-daily-2026-05-17.md` 从中文混排回补为完整英文日报，覆盖 Anthropic + PwC 企业 Claude 部署、Anthropic + Gates Foundation 公益 AI、NVIDIA + Ineffable Intelligence 强化学习基础设施、中国智能体规范应用意见、工信部/国家数据局“模数共振”行动；将 EN/ZH description 升级为可检索摘要；补全 EN/ZH 今日结论、明日跟踪点和证据矩阵，保持 What Is OpenClaw / VPS guide / model fallback 三条强相关 CTA 不回退。
- Start date: 2026-05-17
- End date: 2026-05-17
- Success metric: `pnpm check:daily-template` 通过；`pnpm check:daily-heading-date` 通过；`pnpm check:daily-cta` 通过；`pnpm check:daily-fresh-completeness` 通过；`pnpm check:latest-daily-surface` 通过；`pnpm check:daily-related-posts` 通过；`pnpm check:daily-evidence-matrix` 通过；`pnpm check:duplicate-slug-id` 通过；`pnpm build` 通过；EN 页面正文为完整英文，EN/ZH description 均为具体可检索摘要，正文和证据矩阵不再含省略号截断。
- Result: pass（`src/content/blog/en|zh/openclaw-daily-2026-05-17.md` 已完成语言一致性、description 可检索化、结论补全与证据矩阵补全；本地七项日报闸门 + duplicate precheck + build 全部通过；commit `830a424` 已推送。）
- Decision (scale / iterate / stop): iterate（继续优先消费最近24小时新增日报，固定执行“发布后 description 质量 + 语言一致性 + 正文完整性 + 证据矩阵完整性 + 发现面/相关文章闸门 + build”闭环；下一步建议把英文正文中文残留纳入自动闸门。）

### EXP-112
- Hypothesis: 最近24小时 2026-05-16 日报已把 EN/ZH 证据矩阵从 `-…` 截断回补为完整来源明细；但如果后续发布缺少 Evidence Matrix、来源条数不足或再次出现省略号截断，会削弱页面可信度、来源可核验性与读者完成率。把最新日报证据矩阵完整性固化为 CI 闸门，可稳定放大 EXP-111 的内容质量收益。
- Scope: `scripts/check-daily-evidence-matrix.mjs`、`package.json`、`.github/workflows/content-check.yml`，默认覆盖最新 EN/ZH `openclaw-daily-*`。
- Change: 新增 `check-daily-evidence-matrix.mjs`，自动识别最新 EN/ZH 日报，要求 EN 存在 `## Evidence Matrix`、ZH 存在 `## 证据矩阵`，矩阵区间内至少 5 条来源明细，且禁止 `-…`、`...`、行尾省略号等截断 bullet；新增 `pnpm check:daily-evidence-matrix` 并接入 content-check CI。
- Start date: 2026-05-16
- End date: 2026-05-16
- Success metric: `pnpm check:daily-evidence-matrix` 通过；`pnpm check:daily-template` 通过；`pnpm check:daily-heading-date` 通过；`pnpm check:daily-cta` 通过；`pnpm check:daily-fresh-completeness` 通过；`pnpm check:latest-daily-surface` 通过；`pnpm check:daily-related-posts` 通过；`pnpm check:duplicate-slug-id` 通过；`pnpm build` 通过；CI 出现 Daily evidence matrix completeness check。
- Result: pass（已新增最新日报 Evidence Matrix 完整性闸门并接入 package/CI；本地专项检查、日报质量闸门、最新日报发现面、相关文章闸门、duplicate precheck 与 build 全部通过；commit `2df2d14` 已推送。）
- Decision (scale / iterate / stop): scale（保留该闸门作为最近24小时日报发布质量基线；下一步可把 `LATEST_COUNT` 从 1 扩展到发布窗口配置，并观察是否需要扫描所有近 7 天日报。）

### EXP-111
- Hypothesis: 最近24小时新增日报（2026-05-16）若英文页仍为中文正文、中文 description 仍是标题/首条截断摘要，且 EN/ZH 证据矩阵只有省略号，会削弱首日索引窗口期的语言匹配、摘要点击意图一致性、页面可信度与阅读完成率；当日回补为完整英文叙事、可检索摘要和完整证据矩阵，可提升搜索可见性与核心指南导流质量。
- Scope: `/en|zh/blog/openclaw-daily-2026-05-16/`
- Change: 将 EN `openclaw-daily-2026-05-16.md` 从中文混排回补为完整英文日报，覆盖 ChatGPT 个人财务、Anthropic + PwC 企业 Claude 部署、AWS Trainium 高校研究生态、中国 AI 科技伦理审查先导计划、NVIDIA + Ineffable Intelligence 强化学习基础设施；将 EN/ZH description 升级为可检索摘要；补全 EN/ZH 证据矩阵，移除公开正文中的工具降级说明和 `-…` 截断；保持 What Is OpenClaw / VPS guide / model fallback 三条强相关 CTA 不回退。
- Start date: 2026-05-16
- End date: 2026-05-16
- Success metric: `pnpm check:daily-template` 通过；`pnpm check:daily-heading-date` 通过；`pnpm check:daily-cta` 通过；`pnpm check:daily-fresh-completeness` 通过；`pnpm check:latest-daily-surface` 通过；`pnpm check:daily-related-posts` 通过；`pnpm check:duplicate-slug-id` 通过；`pnpm build` 通过；EN 页面正文为完整英文，EN/ZH description 均为具体可检索摘要，证据矩阵不再含 `-…` 截断。
- Result: pass（`src/content/blog/en|zh/openclaw-daily-2026-05-16.md` 已完成语言一致性、description 可检索化与证据矩阵补全；本地六项日报闸门 + duplicate precheck + build 全部通过；commit `14582b8` 已推送。）
- Decision (scale / iterate / stop): iterate（继续优先消费最近24小时新增日报，固定执行“发布后 description 质量 + 语言一致性 + 证据矩阵完整性 + 发现面/相关文章闸门 + build”闭环；下一步可新增证据矩阵截断专项检查，避免 `-…` 类缺口再次漏过。）

### EXP-110
- Hypothesis: 最近24小时新增日报（2026-05-15）已经完成正文质量回补并出现在首页 Spotlight、日报归档、RSS 与 sitemap，但 EN/ZH blog detail 路由只计算 `relatedPosts`、没有传入 `BlogPost`，导致文章页“相关文章”模块不渲染；修复该转化断点并新增最新日报相关文章闸门，可提升日报读者站内下一跳、降低读后跳出，并把相关文章曝光变成可观测增长事件。
- Scope: `/en|zh/blog/openclaw-daily-2026-05-15/`，以及 `src/pages/en|zh/blog/[...slug].astro`、`src/layouts/BlogPost.astro`、`scripts/check-daily-related-posts.sh`、`package.json`、`.github/workflows/content-check.yml`
- Change: EN/ZH blog detail page 将已计算的 `relatedPosts` 传入 `BlogPost`；`BlogPost` 的相关文章模块增加 `data-growth-surface="related-posts"` 与 `blog_related_posts_render` 增长事件；新增 `check:daily-related-posts`，在构建产物中校验最新双语日报均渲染至少 3 条非自身相关文章链接，并接入 content-check CI。
- Start date: 2026-05-15
- End date: 2026-05-15
- Success metric: `pnpm build` 通过；`pnpm check:latest-daily-surface` 通过；`pnpm check:daily-related-posts` 通过；`pnpm check:daily-template` 通过；`pnpm check:daily-heading-date` 通过；`pnpm check:daily-cta` 通过；`pnpm check:daily-fresh-completeness` 通过；EN/ZH 最新日报构建页均含 `data-growth-surface="related-posts"`、`blog_related_posts_render` 与 3 条非自身相关文章链接。
- Result: pass（已修复 EN/ZH 文章页 relatedPosts 传参断点；最新双语日报构建页均渲染 3 条非自身相关文章链接与 `blog_related_posts_render`；本地 build、最新日报发现面、相关文章增长闸门与日报质量闸门全部通过；commit `(this commit)` 待提交推送。）
- Decision (scale / iterate / stop): scale（保留该闸门作为最新日报发布后的站内连续阅读基线；后续观察 `blog_related_posts_render` 与相关文章点击，若数据有效再加入点击事件分型。）

### EXP-109
- Hypothesis: 最近24小时新增日报（2026-05-15）若英文页仍为中文正文、英文 description 仍为通用模板、中文 description 为首条内容截断摘要且双语正文在第 5 条“可能影响”处截断，会削弱首日索引窗口期的语言匹配、摘要点击意图一致性与读者完成率；当日回补为完整英文叙事、可检索摘要和完整结论段，可提升搜索可见性与核心指南导流质量。
- Scope: `/en|zh/blog/openclaw-daily-2026-05-15/`
- Change: 将 EN `openclaw-daily-2026-05-15.md` 从中文混排回补为完整英文日报，覆盖 Anthropic + Gates Foundation AI 公益合作、OpenAI Codex 手机端远程访问、Amazon Alexa for Shopping 自动采购、NVIDIA + Ineffable Intelligence 强化学习基础设施、百度 Create2026 Agent/安全/多模态/国产 AI 基础设施；将 EN/ZH description 升级为可检索摘要；补全 EN/ZH 第 5 条“可能影响”、实战案例、今日结论与明日跟踪点，保持 What Is OpenClaw / VPS guide / model fallback 三条强相关 CTA 不回退。
- Start date: 2026-05-15
- End date: 2026-05-15
- Success metric: `pnpm check:daily-template` 通过；`pnpm check:daily-heading-date` 通过；`pnpm check:daily-cta` 通过；`pnpm check:daily-fresh-completeness` 通过；`pnpm check:latest-daily-surface` 通过；`pnpm build` 通过；EN 页面正文为完整英文，EN/ZH description 均为具体可检索摘要，正文不再含截断结尾。
- Result: pass（`src/content/blog/en|zh/openclaw-daily-2026-05-15.md` 已完成语言一致性、description 可检索化与正文补全；本地五项闸门 + build 全部通过；commit `(this commit)` 待提交推送。）
- Decision (scale / iterate / stop): iterate（继续优先消费最近24小时新增日报，固定执行“发布后 description 质量 + 语言一致性 + 正文完整性 + 发现面一致性 + build”闭环。）

### EXP-108
- Hypothesis: 最近24小时新增日报（2026-05-14）完成质量回补后，若首页 Spotlight、日报归档页 latest hero、RSS 首项或 sitemap 任一发现入口未同步到最新日报，会削弱首日索引窗口、RSS 订阅点击与站内连续阅读路径；将“最新日报发现面一致性”固化为 CI 闸门，可稳定放大当日内容建设收益。
- Scope: `/en/` + `/zh/` 首页、`/en|zh/daily/`、`/en|zh/daily/rss.xml`、`sitemap-0.xml`，以及 `scripts/check-latest-daily-surface.sh`、`package.json`、`.github/workflows/content-check.yml`
- Change: 新增 `scripts/check-latest-daily-surface.sh`，自动识别 EN/ZH 最新 `openclaw-daily-*`，验证构建产物中的首页 Spotlight、日报归档 latest hero、RSS 首项与 sitemap URL 全部对齐到最新日报，并验证 `home_latest_daily_click` / `daily_index_click` 增长事件仍存在；新增 `pnpm check:latest-daily-surface` 并接入 content-check CI。
- Start date: 2026-05-14
- End date: 2026-05-14
- Success metric: `pnpm build` 通过；`pnpm check:latest-daily-surface` 通过；EN/ZH 最新日报发现入口全部指向 `/en|zh/blog/openclaw-daily-2026-05-14/`；RSS 首项为最新日报；CI 出现 Latest daily surface alignment check。
- Result: pass（已新增最新日报发现面一致性闸门，并验证 EN/ZH 首页、日报归档页、RSS 首项与 sitemap 均对齐 2026-05-14 最新日报；本地 build + `pnpm check:latest-daily-surface` 通过；commit `(this commit)` 待提交推送。）
- Decision (scale / iterate / stop): scale（后续每次新增日报后自动阻断首页/RSS/sitemap 未同步最新日报的回归，继续观察 `home_latest_daily_click` 与 `daily_index_click` 对最新日报打开率的贡献。）

### EXP-107
- Hypothesis: 最近24小时新增日报（2026-05-14）若英文页仍为中文正文、英文 description 仍为通用模板、中文 description 为正文截断片段且双语结论以省略号截断，会削弱首日索引窗口期的语言匹配、摘要点击意图一致性与读者完成率；当日回补为完整英文叙事、可检索摘要和完整结论段，可提升搜索可见性与核心指南导流质量。
- Scope: `/en|zh/blog/openclaw-daily-2026-05-14/`
- Change: 将 EN `openclaw-daily-2026-05-14.md` 从中文混排回补为完整英文日报，覆盖 OpenAI Windows Codex 沙箱、Claude for Small Business、Amazon Alexa for Shopping、NVIDIA + Ineffable Intelligence 强化学习基础设施、中国“人工智能 + 能源”行动方案；将 EN/ZH description 升级为可检索摘要；补全 EN/ZH “今日结论 + 明日跟踪点”，保持 What Is OpenClaw / VPS guide / model fallback 三条强相关 CTA 不回退。
- Start date: 2026-05-14
- End date: 2026-05-14
- Success metric: `pnpm check:daily-template` 通过；`pnpm check:daily-heading-date` 通过；`pnpm check:daily-cta` 通过；`pnpm check:daily-fresh-completeness` 通过；`pnpm build` 通过；EN 页面正文为完整英文，EN/ZH description 均为具体可检索摘要，正文不再含截断结尾。
- Result: pass（`src/content/blog/en|zh/openclaw-daily-2026-05-14.md` 已完成语言一致性、description 可检索化与结论段补全；本地四项闸门 + build 全部通过；commit `(this commit)` 已推送。）
- Decision (scale / iterate / stop): iterate（继续优先消费最近24小时新增日报，固定执行“发布后 description 质量 + 语言一致性 + 正文完整性 + 四闸门+build”闭环。）

### EXP-106
- Hypothesis: 最近24小时新增日报（2026-05-13）完成质量回补后，若 `/en|zh/daily/` 仍只是平铺归档列表，读者从首页 Spotlight、RSS 或站内连续阅读入口进入时会先面对历史列表而不是最新日报；在日报归档页顶部新增最新日报 hero、RSS CTA、可观测点击事件与 ItemList JSON-LD，可提升最新日报打开率、RSS 订阅点击与搜索引擎对连续日报集合的理解。
- Scope: `/en/daily/` + `/zh/daily/`，以及 `scripts/check-daily-index-growth.sh`、`package.json`、`.github/workflows/content-check.yml`
- Change: 将 EN/ZH 日报归档页改为“最新日报 hero + RSS CTA + 历史归档”结构，自动指向最新 `openclaw-daily-2026-05-13`；新增 `daily_index_latest_render` 与 `daily_index_click`（latest/rss/archive kind）增长事件；输出前 20 篇日报的 ItemList JSON-LD；新增 `pnpm check:daily-index-growth` 并接入 content-check CI。
- Start date: 2026-05-13
- End date: 2026-05-13
- Success metric: `pnpm build` 通过；`pnpm check:daily-index-growth` 通过；`pnpm check:rss-autodiscovery` 通过；`pnpm check:website-schema` 通过；EN/ZH daily index 构建产物含 latest/RSS CTA、增长事件、ItemList JSON-LD，并链接最新 2026-05-13 日报。
- Result: pass（EN/ZH `/daily/` 已新增最新日报 hero、RSS CTA、`daily_index_latest_render`/`daily_index_click` 事件与 ItemList JSON-LD；新增专项检查并接入 CI；本地 build + daily-index-growth + RSS autodiscovery + Website schema 全部通过；commit `(this commit)` 已推送。）
- Decision (scale / iterate / stop): iterate（上线后观察 `daily_index_click` 的 latest/rss/archive 分布；若 latest 点击占比高，可把日报归档页进一步扩展为主题筛选与连续阅读漏斗。）

### EXP-105
- Hypothesis: 最近24小时新增日报（2026-05-13）若英文页仍为中文正文、中文 description 仍截取标题片段且双语正文存在“中…”截断，会削弱首日索引窗口期的语言匹配、摘要点击意图一致性与读者完成率；当日回补为完整英文叙事、可检索摘要和完整结论段，可提升搜索可见性与核心指南导流质量。
- Scope: `/en|zh/blog/openclaw-daily-2026-05-13/`
- Change: 将 EN `openclaw-daily-2026-05-13.md` 从中文混排回补为完整英文日报，覆盖 NVIDIA/SAP 可信智能体运行时、ChatGPT Free 网页图片、AI 终端分级、智能体规范应用意见、Amazon Trainium/Graviton/自研硅；将 EN/ZH description 升级为可检索摘要；补全 EN/ZH “今日结论 + 明日跟踪点”，保持 What Is OpenClaw / VPS guide / model fallback 三条强相关 CTA 不回退。
- Start date: 2026-05-13
- End date: 2026-05-13
- Success metric: `pnpm check:daily-template` 通过；`pnpm check:daily-heading-date` 通过；`pnpm check:daily-cta` 通过；`pnpm check:daily-fresh-completeness` 通过；`pnpm build` 通过；EN 页面正文为完整英文，EN/ZH description 均为具体可检索摘要，正文不再含截断结尾。
- Result: pass（`src/content/blog/en|zh/openclaw-daily-2026-05-13.md` 已完成语言一致性、description 可检索化与结论段补全；本地四项闸门 + build 全部通过；commit `(this commit)` 已推送。）
- Decision (scale / iterate / stop): iterate（继续优先消费最近24小时新增日报，固定执行“发布后 description 质量 + 语言一致性 + 正文完整性 + 四闸门+build”闭环。）

### EXP-104
- Hypothesis: 最近24小时新增日报（2026-05-12）已完成正文与摘要质量回补后，若首页仍只通过“最新文章”列表曝光，当日高时效内容的首屏后段可见性、RSS 订阅转化与连续阅读入口点击会被教程/安装 CTA 稀释；在 EN/ZH 首页新增最新日报 Spotlight，可提升当日日报点击率与日报读者留存。
- Scope: `/en/` + `/zh/` 首页，自动指向 `/en|zh/blog/openclaw-daily-2026-05-12/` 与 `/en|zh/daily/rss.xml`
- Change: 新增 `src/components/LatestDailySpotlight.astro`，在 EN/ZH 首页 HomeCreatorCTA 与 HomeQuickstartCTA 之后展示最新 `openclaw-daily-*` 的标题、可检索 description、日报详情按钮、RSS 订阅按钮与连续阅读入口；新增 `home_latest_daily_render` 与 `home_latest_daily_click` 事件，用 `daily-latest` / `daily-rss` / `daily-list` 区分点击路径。
- Start date: 2026-05-12
- End date: 2026-05-12
- Success metric: `pnpm build` 通过；`dist/en/index.html` 与 `dist/zh/index.html` 含 `home_latest_daily_render` / `home_latest_daily_click`；Spotlight 链接指向最新 2026-05-12 双语日报；四项日报闸门继续通过。
- Result: pass（已新增双语最新日报 Spotlight，并验证 EN/ZH 构建产物含最新日报链接、render/click 事件、RSS 与连续阅读入口；`pnpm check:daily-template`、`pnpm check:daily-heading-date`、`pnpm check:daily-cta`、`pnpm check:daily-fresh-completeness` 与 `pnpm build` 全部通过；commit `(this commit)` 已推送。）
- Decision (scale / iterate / stop): iterate（上线后观察 `home_latest_daily_click` 中 `daily-latest`、`daily-rss`、`daily-list` 分布；若点击集中在最新日报，可进一步把日报主题内链与首页推荐位联动。）

### EXP-103
- Hypothesis: 最近24小时新增日报（2026-05-12）若英文页仍保留通用模板正文，且中文页 description 携带 `###` 标题片段与正文截取，会削弱首日索引窗口期的主题匹配、摘要点击意图一致性与英文读者完成率；当日回补为完整英文叙事并同步清理双语摘要，可提升搜索可见性与核心指南导流质量。
- Scope: `/en|zh/blog/openclaw-daily-2026-05-12/`
- Change: 将 EN `openclaw-daily-2026-05-12.md` 从通用模板正文回补为覆盖中国智能体规范应用意见、AI 终端智能化分级标准、Anthropic + SpaceX Claude 算力扩容、NVIDIA + ServiceNow 企业级自主 Agent、ChatGPT 记忆来源/GPT-5.5 Instant/表格侧边栏的完整英文日报；将 EN/ZH description 升级为可检索摘要；保持 What Is OpenClaw / VPS guide / model fallback 三条强相关 CTA 不回退。
- Start date: 2026-05-12
- End date: 2026-05-12
- Success metric: `pnpm check:daily-template` 通过；`pnpm check:daily-heading-date` 通过；`pnpm check:daily-cta` 通过；`pnpm check:daily-fresh-completeness` 通过；`pnpm build` 通过；EN 页面不再含通用模板正文，EN/ZH description 均为具体可检索摘要。
- Result: pass（`src/content/blog/en/openclaw-daily-2026-05-12.md` 已完成完整英文实稿回补；`src/content/blog/en|zh/openclaw-daily-2026-05-12.md` description 已可检索化；本地四项闸门 + build 全部通过；commit `(this commit)` 已推送。）
- Decision (scale / iterate / stop): iterate（继续优先消费最近24小时新增日报，固定执行“发布后 description 质量 + 语言一致性 + 正文完整性 + 四闸门+build”闭环。）

### EXP-102
- Hypothesis: 最近24小时新增日报（2026-04-29）若英文页保留中文框架或混排，会削弱英文检索匹配与阅读完成率；当日回补为完整英文叙事可提升索引窗口期主题匹配与首日导流质量。
- Scope: `/en/blog/openclaw-daily-2026-04-29/`
- Change: 将 EN `openclaw-daily-2026-04-29.md` 的标题与正文框架统一为英文（Top 5 Stories、What happened/Why it matters/Potential impact、Practical Cases、Today’s Bottom Line、What to watch tomorrow），保持既有事实点与 3 条强相关 CTA（What Is OpenClaw / VPS guide / model fallback）不回退。
- Start date: 2026-04-29
- End date: 2026-04-29
- Success metric: `pnpm check:daily-template` 通过；`pnpm check:daily-heading-date` 通过；`pnpm check:daily-cta` 通过；`pnpm check:daily-fresh-completeness` 通过；`pnpm build` 通过；`/en/blog/openclaw-daily-2026-04-29/` 标题与结构为完整英文叙事。
- Result: pass（`src/content/blog/en/openclaw-daily-2026-04-29.md` 已完成英文结构化回补；本地四项闸门 + build 全部通过；commit `6ba6301` 已推送。）
- Decision (scale / iterate / stop): iterate（继续优先消费最近24小时新增日报，执行“发布后完整性扫描 + 当日语言一致性回补 + 四闸门+build”闭环。）

### EXP-101
- Hypothesis: 最近24小时新增日报（2026-04-29）若仍保留通用/截断 description 与正文尾段截断（如“Amaz…”），会削弱索引窗口期的主题匹配与页面完整度；当日完成 EN/ZH 双语回补（可检索摘要 + 案例2补全 + 今日结论/明日跟踪点）可提升首日导流质量并减少返工。
- Scope: `/en|zh/blog/openclaw-daily-2026-04-29/`
- Change: 将 EN `openclaw-daily-2026-04-29` description 从通用模板摘要升级为覆盖 Claude 创意连接器、AWS+OpenAI/Codex Bedrock 扩展、Amazon Quick、NVIDIA Nemotron 3 Nano Omni 与中国“磐石100+生成内容标识执法”的可检索摘要；将 ZH description 从截断文案升级为对应中文可检索摘要；补全 EN/ZH 正文案例2尾段截断（`Amaz…`），新增“现实建议 + 今日结论（3条）+ 明日跟踪点（3条）”，保持 3 条强相关 CTA 内链不回退。
- Start date: 2026-04-29
- End date: 2026-04-29
- Success metric: `pnpm check:daily-template` 通过；`pnpm check:daily-heading-date` 通过；`pnpm check:daily-cta` 通过；`pnpm check:daily-fresh-completeness` 通过；`pnpm build` 通过；`/en|zh/blog/openclaw-daily-2026-04-29/` 不再含通用/截断 description 与 `Amaz…` 截断尾句。
- Result: pass（`src/content/blog/en|zh/openclaw-daily-2026-04-29.md` 已完成 description 回补与正文补全；本地四项闸门 + build 全部通过；commit `2b73243` 已推送。）
- Decision (scale / iterate / stop): iterate（继续优先消费最近24小时内容建设新增日报，固定执行“发布后完整性扫描 + 当日回补 + 四闸门+build”闭环。）

### EXP-100
- Hypothesis: 仅靠模板/CTA/日期闸门仍会漏过“正文悬空字段（如 `可能影响：` 空值）与截断尾句”这类可读性缺陷；若对最近2天 EN/ZH 日报增加专用完整性闸门并接入 CI，可在发布窗口期更早拦截内容残缺，减少首日导流损耗与返工成本。
- Scope: `scripts/check-daily-fresh-completeness.sh`、`package.json`、`.github/workflows/content-check.yml`
- Change: 新增 `check-daily-fresh-completeness.sh`，默认仅扫描 EN/ZH 最新 2 篇 `openclaw-daily-*.md`，校验“悬空 `可能影响：` 条目”与常见截断尾句；将检查接入 `pnpm check:daily-fresh-completeness` 与 content-check CI；执行 `pnpm check:daily-fresh-completeness && pnpm build` 完整验证。
- Start date: 2026-04-28
- End date: 2026-04-28
- Success metric: `pnpm check:daily-fresh-completeness` 通过；`pnpm build` 通过；CI 出现 Fresh daily completeness check；最新 2 天 EN/ZH 日报无“悬空可能影响”与常见截断尾句。
- Result: pass（已新增 `scripts/check-daily-fresh-completeness.sh` 并接入 `package.json` 与 `.github/workflows/content-check.yml`；本地 `pnpm check:daily-fresh-completeness` 与 `pnpm build` 均通过。）
- Decision (scale / iterate / stop): iterate（下一步可将“最近2天”参数化为发布窗口配置，并逐步纳入更多截断模式，保持高灵敏且避免历史存量噪声。）

### EXP-099
- Hypothesis: 对最近24小时新增日报页中出现的 EN 通用 description 与 EN/ZH 正文“可能影…”截断做当日回补，可提升索引窗口期主题匹配和页面完整度，减少首日导流损耗。
- Scope: `/en|zh/blog/openclaw-daily-2026-04-28/`
- Change: 将 EN `openclaw-daily-2026-04-28` description 从通用模板摘要升级为覆盖 Claude Design、NVIDIA+Google Cloud agentic/physical AI、Adobe CX Enterprise Coworker、微软-OpenAI 条款调整与 DeepSeek 新模型市场反应的可检索摘要；补全 EN/ZH 正文被截断的“实战案例2”结尾，并新增“今日结论（3条可执行建议）+ 明日跟踪点”，保持 3 条强相关 CTA 内链（What Is OpenClaw / VPS guide / model fallback）不回退。
- Start date: 2026-04-28
- End date: 2026-04-28
- Success metric: `pnpm check:daily-template` 通过；`pnpm check:daily-heading-date` 通过；`pnpm check:daily-cta` 通过；`pnpm build` 通过；`/en|zh/blog/openclaw-daily-2026-04-28/` EN description 不再为通用模板，且 EN/ZH 正文不再含“可能影…”截断。
- Result: pass（`src/content/blog/en|zh/openclaw-daily-2026-04-28.md` 已完成 EN description 可检索化回补与 EN/ZH 正文补全；本地 `pnpm check:daily-template`、`pnpm check:daily-heading-date`、`pnpm check:daily-cta` 与 `pnpm build` 全部通过；commit `cc75fee` 已推送。）
- Decision (scale / iterate / stop): iterate（继续优先消费最近24小时新增日报，固定执行“发布后完整性扫描（description 通用占位 + 正文截断）+ 当日回补 + 三闸门+build”闭环。）

### EXP-098
- Hypothesis: 对历史日报中仍存在“今日结论”截断的双语页面做一次性补全，可恢复页面完整度与可读性，减少索引窗口中摘要/正文语义断裂导致的导流损耗。
- Scope: `/en|zh/blog/openclaw-daily-2026-03-30/`
- Change: 补全 EN/ZH `openclaw-daily-2026-03-30.md` 中被截断的“今日结论”（“最关键信…”）段落，统一新增“明日跟踪点”，并保持 3 条强相关 CTA 内链（What Is OpenClaw / VPS guide / model fallback）不回退。
- Start date: 2026-04-27
- End date: 2026-04-27
- Success metric: `pnpm check:daily-template` 通过；`pnpm check:daily-heading-date` 通过；`pnpm check:daily-cta` 通过；`pnpm build` 通过；`/en|zh/blog/openclaw-daily-2026-03-30/` 不再出现“最关键信…”截断。
- Result: pass（`src/content/blog/en|zh/openclaw-daily-2026-03-30.md` 已完成“今日结论”补全与“明日跟踪点”新增；本地 `pnpm check:daily-template`、`pnpm check:daily-heading-date`、`pnpm check:daily-cta` 与 `pnpm build` 全部通过；commit `(this commit)` 已推送。）
- Decision (scale / iterate / stop): iterate（继续优先消费最近24小时内容建设延续假设，固定执行“发布后完整性扫描（截断/缺段）+ 当日回补 + 三闸门+build”闭环。）

### EXP-097
- Hypothesis: 对最近24小时新增日报页中出现的 EN 通用 description、ZH 低可检索 description 与正文“实战案例”截断做当日回补，可显著提升索引窗口期主题匹配与页面完整性，避免首日流量转化损失。
- Scope: `/en|zh/blog/openclaw-daily-2026-04-27/`
- Change: 将 EN `openclaw-daily-2026-04-27` description 从通用模板文案升级为覆盖 OpenAI 免费层广告化、Anthropic Project Glasswing、NVIDIA+Google Cloud agentic/physical AI、Adobe CX Enterprise Coworker 与上海产业级 AI 推进的可检索摘要；将 ZH `openclaw-daily-2026-04-27` description 升级为对应中文可检索摘要；补全 EN/ZH 正文被截断的“实战案例 + 今日结论 + 明日跟踪点”，保持 3 条强相关 CTA 内链（What Is OpenClaw / VPS guide / model fallback）不回退。
- Start date: 2026-04-27
- End date: 2026-04-27
- Success metric: `pnpm check:daily-template` 通过；`pnpm check:daily-heading-date` 通过；`pnpm check:daily-cta` 通过；`pnpm build` 通过；EN/ZH 目标页不再含“ChatGPT 上车：CarPlay 已进…”截断且 description 去通用化。
- Result: pass（`src/content/blog/en|zh/openclaw-daily-2026-04-27.md` 已完成 description 可检索化回补与正文补全；本地 `pnpm check:daily-template`、`pnpm check:daily-heading-date`、`pnpm check:daily-cta` 与 `pnpm build` 全部通过；commit `d4e26fe` 已推送。）
- Decision (scale / iterate / stop): iterate（继续优先消费最近24小时内容建设新增日报，固定执行“发布后即扫 description 质量 + 正文截断 + 当日回补 + 三闸门+build”闭环。）

### EXP-096
- Hypothesis: 当前环境 `~/.local/bin/rg` 实为 grep 包装脚本而非 ripgrep，导致 `check-daily-template-regressions.sh` 误走 rg 分支并输出 `grep: ... No such file or directory` 假阳性噪声；若改为“仅识别真实 ripgrep 才走 rg 分支”，可恢复闸门可读性并降低误判风险。
- Scope: `scripts/check-daily-template-regressions.sh`（影响 `pnpm check:daily-template` 在多环境下的执行稳定性）
- Change: 将检查脚本的搜索后端识别从“存在 `rg` 命令”升级为“`rg --version` 首行包含 `ripgrep` 才使用 rg，否则强制回退 grep”；保留 `grep -RIn -E ... -e "$pattern"` 参数模式，避免 pattern 被误解析为文件；执行 `pnpm check:daily-template && pnpm check:daily-heading-date && pnpm check:daily-cta && pnpm build` 完整验证。
- Start date: 2026-04-26
- End date: 2026-04-26
- Success metric: `pnpm check:daily-template` 无 `No such file or directory` 噪声且通过；`pnpm check:daily-heading-date` 通过；`pnpm check:daily-cta` 通过；`pnpm build` 通过。
- Result: pass（已确认本机 `~/.local/bin/rg` 为 shell 包装脚本，完成脚本判定修复后本地四项检查全部通过，且 `pnpm check:daily-template` 输出恢复干净；commit `d4e26fe` 已推送。）
- Decision (scale / iterate / stop): scale（后续所有“可选依赖工具探测”统一采用“命令存在 + 版本签名匹配”双判定，避免同类假工具回归。）

### EXP-095
- Hypothesis: 对最近24小时新增日报页中出现的 EN 通用 description、ZH 非摘要化/截断 description，以及正文“案例2”截断做当日回补，可显著提升索引窗口期的主题可检索性与页面完整性，避免导流与转化信号衰减。
- Scope: `/en|zh/blog/openclaw-daily-2026-04-25/` + `/en|zh/blog/openclaw-daily-2026-04-26/`
- Change: 将 EN/ZH `openclaw-daily-2026-04-25` description 从通用模板/流程叙述改为覆盖 Meta 扩大 AWS Graviton、NVIDIA+Adobe/WPP 企业智能体、GPT-5.5 Codex 企业落地、DeepSeek 华为芯片预览与 OpenAI Codex 企业化推进的可检索摘要；将 EN/ZH `openclaw-daily-2026-04-26` description 从通用模板/截断文案改为覆盖 Amazon-Anthropic 长期算力绑定、Meta Graviton 扩容、NVIDIA+Google Cloud Agentic/Physical AI、Adobe CX Enterprise Coworker 与上海产业级 AI 进展的可检索摘要；补全 EN/ZH `openclaw-daily-2026-04-26.md` 被截断的“案例 2”段落，并新增“今日结论（3条可执行建议）+ 明日跟踪点”，保留 3 条强相关 CTA 内链（What Is OpenClaw / VPS guide / model fallback）不回退。
- Start date: 2026-04-26
- End date: 2026-04-26
- Success metric: `pnpm check:daily-template` 通过；`pnpm check:daily-heading-date` 通过；`pnpm check:daily-cta` 通过；`pnpm build` 通过；`/en|zh/blog/openclaw-daily-2026-04-25/` 与 `/en|zh/blog/openclaw-daily-2026-04-26/` description 不再为通用/截断文案，且 `2026-04-26` EN/ZH 正文不再含“案例 2：Adobe 把 AI 做成营销“同…”` 截断。
- Result: pass（四个目标文件 `src/content/blog/en|zh/openclaw-daily-2026-04-25.md`、`openclaw-daily-2026-04-26.md` 已完成 description 回补；`openclaw-daily-2026-04-26` EN/ZH 正文截断已补全并新增“今日结论 + 明日跟踪点”；本地 `pnpm check:daily-template`、`pnpm check:daily-heading-date`、`pnpm check:daily-cta` 与 `pnpm build` 全部通过；commit `d4e26fe` 已推送。）
- Decision (scale / iterate / stop): iterate（继续优先消费最近24小时内容建设新增日报，固定执行“发布后即扫 description + 正文截断 + 当日回补 + 三闸门+build”闭环，压缩低质量摘要进入索引窗口期。）


### EXP-094
- Hypothesis: 在部分环境缺少 `rg` 时，`check-daily-template-regressions.sh` 的 `grep -- "pattern"` 写法会把 pattern 误当文件并输出大量 `No such file or directory`，降低闸门可读性并掩盖真实异常；修复为 `grep -e "pattern"` 后可稳定输出“只在真失败时报错”，提高日更回归闸门可维护性。
- Scope: `scripts/check-daily-template-regressions.sh`（影响 `pnpm check:daily-template` 回退路径稳定性）
- Change: 将 grep 回退分支从 `grep -RIn -E --include='openclaw-daily-*.md' -- "$pattern" ...` 调整为 `grep -RIn -E --include='openclaw-daily-*.md' -e "$pattern" ...`，避免 pattern 被解析为文件参数导致误报；并执行 `pnpm check:daily-template && pnpm check:daily-heading-date && pnpm check:daily-cta && pnpm build` 完整验证。
- Start date: 2026-04-24
- End date: 2026-04-24
- Success metric: `pnpm check:daily-template` 输出无 grep 误报；`pnpm check:daily-heading-date` 通过；`pnpm check:daily-cta` 通过；`pnpm build` 通过。
- Result: pass（`scripts/check-daily-template-regressions.sh` 已修复 grep 回退参数；本地 daily 三闸门与 build 全部通过，且不再出现 `No such file or directory` 误报警噪声；commit `ff990c4` 已推送至 `origin/publish-daily-temp`。）
- Decision (scale / iterate / stop): scale（保留该修复为默认检查基线；后续新增检查脚本时统一使用 `grep -e` 模式，避免同类误报回归。）

### EXP-093
- Hypothesis: 对最近24小时新增日报中出现正文截断（“发生…”）与摘要退化（EN 通用 description、ZH 截断 description）的双语页面做当日回补，可恢复页面信息完整度、提高检索匹配，并避免导流与转化在索引窗口期受损。
- Scope: `/en|zh/blog/openclaw-daily-2026-04-24/`
- Change: 回补 EN `openclaw-daily-2026-04-24` description 为覆盖 GPT-5.5 Codex 企业落地、中美 AI 知识产权摩擦、联合国治理议程、Adobe CX Enterprise Coworker 与 Anthropic Claude Design 的可检索摘要；回补 ZH description 为对应中文可检索摘要；补全 EN/ZH 正文中被截断的“案例2：OpenAI 广告化试点”段落，并新增“今日结论（3条可执行建议）+ 明日跟踪点”；保留 3 条强相关 CTA 内链（What Is OpenClaw / VPS guide / model fallback）不回退。
- Start date: 2026-04-24
- End date: 2026-04-24
- Success metric: `pnpm check:daily-template` 通过；`pnpm check:daily-heading-date` 通过；`pnpm check:daily-cta` 通过；`pnpm build` 通过；EN/ZH 目标页不再含“发生…”截断句且 description 去通用/去截断。
- Result: pass（`src/content/blog/en|zh/openclaw-daily-2026-04-24.md` 已完成 description 回补与正文补全；本地 `pnpm check:daily-template`、`pnpm check:daily-heading-date`、`pnpm check:daily-cta` 与 `pnpm build` 全部通过；commit `d4e26fe` 已推送。）
- Decision (scale / iterate / stop): iterate（继续优先消费最近24小时新增日报，执行“发布后即扫 description 质量 + 正文截断扫描 + 当日回补”闭环，降低索引窗口期内容质量回归风险。）

### EXP-092
- Hypothesis: 对最近24小时新增日报中出现正文截断（“全能 …”）的双语页面做当日补全，可恢复页面信息完整度与可读性，避免摘要/正文语义断裂对检索匹配与导流转化造成损失。
- Scope: `/en|zh/blog/openclaw-daily-2026-04-23/`
- Change: 补全 EN/ZH `openclaw-daily-2026-04-23.md` 中被截断的“实战案例”与“今日结论/明日跟踪点”段落，新增案例2（Privacy Filter 脱敏管道）与可执行建议，保持既有可检索 description 与 3 条强相关 CTA 内链（What Is OpenClaw / VPS guide / model fallback）不回退。
- Start date: 2026-04-23
- End date: 2026-04-23
- Success metric: `pnpm check:daily-template` 通过；`pnpm check:daily-heading-date` 通过；`pnpm check:daily-cta` 通过；`pnpm build` 通过；EN/ZH 目标页不再含“全能 …”截断句且结构完整。
- Result: pass（`src/content/blog/en|zh/openclaw-daily-2026-04-23.md` 已完成截断补全并新增案例2与结论段；本地 `pnpm check:daily-template`、`pnpm check:daily-heading-date`、`pnpm check:daily-cta` 与 `pnpm build` 全部通过；commit `d4e26fe` 已推送。）
- Decision (scale / iterate / stop): iterate（继续优先消费最近24小时新增日报，执行“发布后完整性扫描（截断/缺段）+ 当日修补”闭环，降低内容完整性回归。）

### EXP-091
- Hypothesis: 对最近24小时新增且仍含通用或截断 description 的双语日报页（`2026-04-22`、`2026-04-23`）执行当日可检索摘要回补，可提升主题检索匹配、摘要点击意图一致性与核心指南导流质量。
- Scope: `/en|zh/blog/openclaw-daily-2026-04-22/` + `/en|zh/blog/openclaw-daily-2026-04-23/`
- Change: 将 EN `openclaw-daily-2026-04-22` 与 `openclaw-daily-2026-04-23` description 从通用摘要升级为覆盖当日核心主题的可检索摘要；将 ZH `openclaw-daily-2026-04-22` 与 `openclaw-daily-2026-04-23` description 从异常引导语/截断句升级为完整可检索摘要；保持 EN/ZH 页面既有 3 条强相关 CTA 内链（What Is OpenClaw / VPS guide / model fallback）不回退。
- Start date: 2026-04-23
- End date: 2026-04-23
- Success metric: `pnpm check:daily-template` 通过；`pnpm check:daily-heading-date` 通过；`pnpm check:daily-cta` 通过；`pnpm build` 通过；四个目标页 description 均去通用化且无截断。
- Result: pass（`src/content/blog/en|zh/openclaw-daily-2026-04-22.md` 与 `openclaw-daily-2026-04-23.md` 已完成 description 可检索化回补；本地 `pnpm check:daily-template`、`pnpm check:daily-heading-date`、`pnpm check:daily-cta` 与 `pnpm build` 全部通过；commit `d4e26fe` 已推送。）
- Decision (scale / iterate / stop): iterate（继续优先消费最近24小时新增日报，执行“发布后即扫 description 质量 + 当日回补”的闭环，避免通用/截断摘要进入索引窗口期。）

### EXP-090
- Hypothesis: 对最近24小时新发布且仍使用 ZH 通用摘要的 `2026-04-21` 双语日报页执行 description 可检索化回补，可提升主题检索匹配、摘要点击意图一致性与核心指南导流质量。
- Scope: `/zh/blog/openclaw-daily-2026-04-21/`（ZH description 回补）+ `/en/blog/openclaw-daily-2026-04-21/`（CTA 一致性复核）
- Change: 将 ZH `openclaw-daily-2026-04-21` description 从通用摘要升级为覆盖 OpenAI 1220 亿美元融资与 8520 亿美元估值、NVIDIA Ising 量子计算开源模型、中国《人工智能拟人化互动服务管理暂行办法》、工信部“人工智能+质量”路线图、微软 Copilot Agent 集成的可检索摘要；保持 EN/ZH 页面既有 3 条强相关 CTA 内链（What Is OpenClaw / VPS guide / model fallback）不回退。
- Start date: 2026-04-21
- End date: 2026-04-21
- Success metric: `pnpm check:daily-template` 通过；`pnpm check:daily-heading-date` 通过；`pnpm check:daily-cta` 通过；`pnpm build` 通过；ZH 目标页 description 去通用化并覆盖当日核心主题。
- Result: pass（`src/content/blog/zh/openclaw-daily-2026-04-21.md` 已完成 description 可检索化回补；本地 `pnpm check:daily-template`、`pnpm check:daily-heading-date`、`pnpm check:daily-cta` 与 `pnpm build` 全部通过；commit `(this commit)` 已推送至 `origin/publish-daily-2026-04-21`。）
- Decision (scale / iterate / stop): iterate（继续优先消费最近24小时新增日报内容，执行“发布后即扫通用摘要 + 当日可检索化修补”闭环，压缩通用摘要进入索引窗口期。）

### EXP-089
- Hypothesis: 对最近24小时新发布且仍使用 EN 通用摘要的 `2026-04-21` 双语日报页执行 description 可检索化回补，可提升主题检索匹配、摘要点击意图一致性与核心指南导流质量。
- Scope: `/en/blog/openclaw-daily-2026-04-21/`（EN description 回补）+ `/zh/blog/openclaw-daily-2026-04-21/`（CTA 一致性复核）
- Change: 将 EN `openclaw-daily-2026-04-21` description 从通用摘要升级为覆盖 OpenAI 1220 亿美元融资与 8520 亿美元估值、NVIDIA Ising 量子计算开源模型、中国《人工智能拟人化互动服务管理暂行办法》、工信部“人工智能+质量”路线图、微软 Copilot Agent 集成的可检索摘要；保持 EN/ZH 页面既有 3 条强相关 CTA 内链（What Is OpenClaw / VPS guide / model fallback）不回退。
- Start date: 2026-04-21
- End date: 2026-04-21
- Success metric: `pnpm check:daily-template` 通过；`pnpm check:daily-heading-date` 通过；`pnpm check:daily-cta` 通过；`pnpm build` 通过；EN 目标页 description 去通用化并覆盖当日核心主题。
- Result: pass（`src/content/blog/en/openclaw-daily-2026-04-21.md` 已完成 description 可检索化回补；本地 `pnpm check:daily-template`、`pnpm check:daily-heading-date`、`pnpm check:daily-cta` 与 `pnpm build` 全部通过；commit `(this commit)` 已推送至 `origin/publish-daily-2026-04-21`。）
- Decision (scale / iterate / stop): iterate（继续优先消费最近24小时新增日报内容，执行“发布后即扫通用摘要 + 当日可检索化修补”闭环，压缩通用摘要进入索引窗口期。）

### EXP-088
- Hypothesis: 对最近24小时新发布但仍使用通用摘要的 `2026-04-15` 双语日报页执行 description 可检索化回补，可提升主题检索匹配、摘要点击意图一致性与核心指南导流质量。
- Scope: `/en/blog/openclaw-daily-2026-04-15/` + `/zh/blog/openclaw-daily-2026-04-15/`
- Change: 将 EN `openclaw-daily-2026-04-15` description 从通用摘要升级为覆盖 OpenAI Trusted Access 与 GPT-5.4-Cyber、Anthropic Project Glasswing、Stanford AI Index 2026 信号、中国全球 AI 治理倡议及湖北“人工智能+制造”专项行动的可检索摘要；将 ZH description 升级为对应中文可检索摘要；保留 EN/ZH 页面既有 3 条强相关 CTA 内链（What Is OpenClaw / VPS guide / model fallback）不回退。
- Start date: 2026-04-18
- End date: 2026-04-18
- Success metric: `pnpm check:daily-template` 通过；`pnpm check:daily-heading-date` 通过；`pnpm check:daily-cta` 通过；`pnpm build` 通过；EN/ZH 目标页 description 去通用化并覆盖当日核心主题。
- Result: pass（`src/content/blog/en|zh/openclaw-daily-2026-04-15.md` 已完成 description 可检索化回补；本地 `pnpm check:daily-template`、`pnpm check:daily-heading-date`、`pnpm check:daily-cta` 与 `pnpm build` 全部通过；commit `(this commit)` 已推送至 `origin/growth-sync-queue`。）
- Decision (scale / iterate / stop): iterate（继续优先消费最近24小时内容建设新增日报，保持“发布后即做模板回归扫描 + 当日摘要可检索化修正”的闭环，减少通用摘要进入索引层窗口期。）

### EXP-087
- Hypothesis: 对最近24小时新发布但仍使用通用摘要的 `2026-04-17` 双语日报页执行 description 可检索化回补，可提升主题检索匹配、摘要点击意图一致性与核心指南导流质量。
- Scope: `/en/blog/openclaw-daily-2026-04-17/` + `/zh/blog/openclaw-daily-2026-04-17/`
- Change: 将 EN `openclaw-daily-2026-04-17` description 从通用摘要升级为覆盖 GPT‑Rosalind 生命科学模型预览、Codex 桌面多代理升级、Adobe Firefly Assistant 跨应用工作流、Uber+Nuro Robotaxi 试乘与 Stanford AI Index 2026 中美能力分化的可检索摘要；将 ZH description 升级为对应中文可检索摘要；保留 EN/ZH 页面既有 3 条强相关 CTA 内链（What Is OpenClaw / VPS guide / model fallback）不回退。
- Start date: 2026-04-18
- End date: 2026-04-18
- Success metric: `pnpm check:daily-template` 通过；`pnpm check:daily-heading-date` 通过；`pnpm check:daily-cta` 通过；`pnpm build` 通过；EN/ZH 目标页 description 去通用化并覆盖当日核心主题。
- Result: pass（`src/content/blog/en|zh/openclaw-daily-2026-04-17.md` 已完成 description 可检索化回补；本地 `pnpm check:daily-template`、`pnpm check:daily-heading-date`、`pnpm check:daily-cta` 与 `pnpm build` 全部通过；commit `42866b9` 已推送至 `origin/growth-sync-queue`。）
- Decision (scale / iterate / stop): iterate（继续优先消费最近24小时内容建设新增日报，保持“发布后即做模板回归扫描 + 当日摘要可检索化修正”的闭环，减少通用摘要进入索引层窗口期。）

### EXP-086
- Hypothesis: 对新发布但仍使用通用摘要的 `2026-04-16` 双语日报页执行 description 可检索化回补，可提升主题检索匹配与摘要点击意图一致性，并延续最近24小时内容建设“模板回归前置修复”收益。
- Scope: `/en/blog/openclaw-daily-2026-04-16/` + `/zh/blog/openclaw-daily-2026-04-16/`
- Change: 将 EN `openclaw-daily-2026-04-16` description 从通用摘要升级为覆盖 TAC 扩容/GPT-5.4-Cyber、Agents SDK 沙箱升级、MAI-Image-2-Efficient 降本提速、ASML 上调 2026 指引与中国 AI+教育行动计划的可检索摘要；将 ZH description 升级为对应中文可检索摘要；保留 EN/ZH 页面既有 3 条强相关 CTA 内链（What Is OpenClaw / VPS guide / model fallback）不回退。
- Start date: 2026-04-16
- End date: 2026-04-16
- Success metric: `pnpm check:daily-template` 通过；`pnpm check:daily-heading-date` 通过；`pnpm check:daily-cta` 通过；`pnpm build` 通过；EN/ZH 目标页 description 去通用化并覆盖当日核心主题。
- Result: pass（`src/content/blog/en|zh/openclaw-daily-2026-04-16.md` 已完成 description 可检索化回补；本地 `pnpm check:daily-template`、`pnpm check:daily-heading-date`、`pnpm check:daily-cta` 与 `pnpm build` 全部通过；commit `865e291` 已推送至 `origin/growth-sync-queue`。）
- Decision (scale / iterate / stop): iterate（继续优先消费最近24小时内容建设新增日报，保持“发布后即做模板回归扫描 + 当日摘要可检索化修正”的双步闭环，减少通用摘要进入索引层的窗口期。）

### EXP-085
- Hypothesis: 对仍残留占位 description、旧 CTA 变体残留且正文日期错位的 `2026-04-05` 双语日报页执行一次性回补，可提升搜索摘要可检索性、恢复 CTA 导流一致性，并避免日更模板回归抵消内容增长收益。
- Scope: `/en/blog/openclaw-daily-2026-04-05/` + `/zh/blog/openclaw-daily-2026-04-05/`
- Change: 将 EN `openclaw-daily-2026-04-05` frontmatter description 从占位文案升级为覆盖“普惠算力、H100 租赁价格、北京生成式 AI 备案、晶圆厂设备投入、生成式 AI 安全风险”的可检索摘要；移除 EN 页面尾部残留 `CTA_VARIANT_B` 与订阅泛 CTA，统一保留 3 条强相关内链 CTA；将 ZH 正文抬头日期从 `2026年4月4日` 修正为 `《AI、科技日报》｜2026-04-05（周日）`，确保与 `pubDate` 对齐。
- Start date: 2026-04-15
- End date: 2026-04-15
- Success metric: `pnpm check:daily-template` 通过；`pnpm check:daily-heading-date` 通过；`pnpm check:daily-cta` 通过；`pnpm build` 通过；EN/ZH 目标页无占位摘要/CTA_VARIANT 残留且正文日期一致。
- Result: pass（`src/content/blog/en|zh/openclaw-daily-2026-04-05.md` 已完成 description 去占位化、CTA 变体残留清理与正文日期修正；本地 `pnpm check:daily-template`、`pnpm check:daily-heading-date`、`pnpm check:daily-cta` 与 `pnpm build` 全部通过；commit `fc68f95` 已推送至 `origin/growth-sync-queue`。）
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

### EXP-204
- Hypothesis: EXP-203 已把 frontier-models / product-safety / developer-tools parent fallback 迁入 split target，但 company-finance 仍保留 3 条 parent fallback；若不为 AI lab 融资、公开市场准备、机器人资本市场建立 split target，后续融资/IPO 类日报 projection 仍会依赖 parent category，降低 taxonomy 容量管理的可解释性。
- Scope: `scripts/check-source-projection-rule-taxonomy.mjs`, `scripts/lib/source-projection-rules.mjs`, `GROWTH_QUEUE.md`, `EXPERIMENT_LOG.md`
- Change: 新增 company-finance split recommendations / migration hints / effective budgets：`ai-lab-private-financing`、`public-market-readiness`、`robotics-capital-markets`；并将 `anthropic-series-h`、`anthropic-sec-ipo-s1`、`unitree-star-market-ipo-2026` 迁入对应 `splitTargetCategory`。
- Start date: 2026-06-30
- End date: 2026-06-30
- Success metric: `pnpm check:source-projection-rule-taxonomy` 显示 `effective category coverage: 63/63 split-backed, parentFallback=0`、`split target categories: 29/29 used`、`existing rule split target coverage: 63/63 covered`，且 `pnpm check:source-projection-rule-registry-health && pnpm build` 通过。
- Result: pass（taxonomy / registry health / build 全部通过；company-finance parent fallback 从 3 收敛到 0）。
- Decision: scale

