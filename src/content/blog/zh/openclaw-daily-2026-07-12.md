---
title: "AI / 科技日报（2026-07-12）"
description: "NVIDIA 称 Nemotron 3 Ultra 在 LangChain Deep Agents harness 中达到开放模型领先表现，并可用更低推理成本完成企业任务。"
pubDate: 2026-07-12
tags: ["ai", "tech", "daily", "news"]
category: "news"
lang: "zh"
---

《AI、科技日报》

说明：本次搜索接口异常，已改用官方/原始页面与新华网直抓。以下按“截至今早可确认的最新动态”出稿；没有足够证据的我不写成确定事实。

## 今日要闻（5条）

1. NVIDIA：开放式企业 Agent 栈继续成型  
发生了什么：NVIDIA 称 Nemotron 3 Ultra 在 LangChain Deep Agents harness 中达到开放模型领先表现，并可用更低推理成本完成企业任务。  
为什么重要：企业 Agent 的竞争点正在从“只拼模型”转向“模型 + harness + 工具 + 安全运行时”。  
可能影响：更多企业会优先考虑可控、可私有部署、可治理的开放 Agent 栈，而不是完全依赖闭源模型 API。  
来源：NVIDIA Blog，L1，已确认。

2. NVIDIA + Hugging Face：开放机器人生态加速  
发生了什么：NVIDIA 将 Isaac GR00T 1.7、Isaac Teleop 接入 Hugging Face LeRobot，并计划把 Cosmos 3 接入该生态。  
为什么重要：机器人开发正在复用开源 AI 的路径：共享模型、数据、仿真、训练与部署流程。  
可能影响：中小团队做机器人原型的门槛下降，具身智能竞争会更快从论文走向工程验证。  
来源：NVIDIA Blog，L1，已确认。

3. NVIDIA：AI Agent 让数据中心 CPU 重新变重要  
发生了什么：NVIDIA 强调 Vera 这类“高单线程性能、可规模化”的 CPU，面向 Agent 循环中的工具调用、代码执行、数据处理和结果分析。  
为什么重要：过去 AI 基础设施关注 GPU；Agent 工作流会把 CPU 延迟也变成瓶颈。  
可能影响：AI 数据中心采购会更重视 GPU 之外的整机架构，CPU、内存带宽、低延迟互连会重新进入核心指标。  
来源：NVIDIA Blog，L1，已确认。

4. 中国团队包揽“AI 与太空计算挑战赛”三项金奖  
发生了什么：新华社报道，全球首个太空计算主题国际赛事“AI 与太空计算挑战赛”在日内瓦公布结果，中国科研团队获得三个赛道金奖。  
为什么重要：AI 正在从地面算力扩展到太空计算、遥感分析、粮食、水质、城市热岛等场景。  
可能影响：中国在“AI + 空天基础设施 + 可持续发展”方向的话语权和工程验证机会增加。  
来源：新华网，L2，已确认。

5. 中国长征十号乙首飞并实现一级可控回收  
发生了什么：新华社报道，长征十号乙运载火箭在海南商业航天发射场发射升空，一子级垂直返回并在海上平台成功回收。  
为什么重要：可回收火箭是降低航天发射成本、提升发射频次的关键技术。  
可能影响：中国商业航天和低轨卫星网络建设有望获得更低成本、更高频次的发射能力。  
来源：新华网，L2，已确认。

## 实战案例（2个）

1. 普通用户：ChatGPT 模型选择更“任务导向”  
OpenAI 中文帮助中心显示，ChatGPT 模型选择器更新为 Instant、Medium、High、Extra High、Pro Standard、Pro Extended 等选项。  
怎么用：  
- 日常问答、改写：先用 Instant。  
- 复杂分析、代码、长文：切 Medium / High。  
- 不要默认开最高档，先按任务难度升档，省时间也省额度。  
来源：OpenAI Help Center，L1，已确认。

2. 企业团队：先优化 Agent 工程，不急着微调模型  
NVIDIA / LangChain 案例显示，提升 Agent 表现不一定要重训模型，也可以通过 prompt、工具描述、中间件、运行时和评测 harness 优化。  
怎么用：  
- 先建立任务评测集。  
- 记录 Agent 执行轨迹。  
- 优先改工具说明、权限边界、失败重试逻辑。  
- 最后再考虑微调模型。  
来源：NVIDIA Blog，L1，已确认。

## 今日结论

- 最值得关注：企业级 AI 正在加速进入核心业务流程，AI 不再只是聊天工具，而是在进入税务、法务、制造、运维、推理服务等真实生产系统。
- 给普通用户建议：短期优先选择权限透明、可断开授权、有来源标注的 AI 产品，把它用于信息整理、学习复盘、日常文档和低风险决策辅助。
- 给团队建议：不要只比较模型榜单，先选一个高频流程做试点，并把权限、审计、成本和人工复核写进上线标准。

## 明日跟踪点

- 关注今日提到的模型、平台或硬件动态是否出现产品化细节。
- 关注企业案例是否披露真实使用场景、权限控制和成本变化。
- 关注政策、版权、数据安全或来源标注要求是否进一步收紧。

## 证据矩阵

- 来源条目 1：NVIDIA：开放式企业 Agent 栈继续成型 —— NVIDIA 称 Nemotron 3 Ultra 在 LangChain Deep Agents harness 中达到开放模型领先表现，并可用更低推理成本完成企业任务。
- 来源条目 2：NVIDIA + Hugging Face：开放机器人生态加速 —— NVIDIA 将 Isaac GR00T 1.7、Isaac Teleop 接入 Hugging Face LeRobot，并计划把 Cosmos 3 接入该生态。
- 来源条目 3：NVIDIA：AI Agent 让数据中心 CPU 重新变重要 —— NVIDIA 强调 Vera 这类“高单线程性能、可规模化”的 CPU，面向 Agent 循环中的工具调用、代码执行、数据处理和结果分析。
- 来源条目 4：中国团队包揽“AI 与太空计算挑战赛”三项金奖 —— 新华社报道，全球首个太空计算主题国际赛事“AI 与太空计算挑战赛”在日内瓦公布结果，中国科研团队获得三个赛道金奖。
- 来源条目 5：中国长征十号乙首飞并实现一级可控回收 —— 新华社报道，长征十号乙运载火箭在海南商业航天发射场发射升空，一子级垂直返回并在海上平台成功回收。

## 下一步行动（CTA）

- 先读核心定位：[什么是 OpenClaw](/zh/blog/what-is-openclaw/)
- 需要落地部署：[OpenClaw VPS 部署完整指南](/zh/blog/openclaw-vps-deployment-complete-guide/)
- 保障稳定性：[OpenClaw 模型回退策略](/zh/blog/openclaw-model-fallback-strategy/)
