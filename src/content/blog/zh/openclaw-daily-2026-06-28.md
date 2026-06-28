---
title: "AI / 科技日报（2026-06-28）"
description: "2026-06-28 早间版；OpenAI 6 月 26 日更新 ChatGPT 版本说明：。"
pubDate: 2026-06-28
tags: ["ai", "tech", "daily", "news"]
category: "news"
lang: "zh"
---

《AI、科技日报》  
2026-06-28 早间版

说明：今天是周日，近 24 小时硬新闻偏少。本期采用“过去 48 小时 + 本周仍在发酵”的已核实动态；未拿到原始证据的，不写成确定事实。

## 今日要闻（5条）

### 1. OpenAI 更新 ChatGPT：个人金融、听写、模型退役同步推进

发生了什么：  
OpenAI 6 月 26 日更新 ChatGPT 版本说明：  
- 美国 Plus 用户可使用个人金融体验，Android 端也扩大覆盖。  
- ChatGPT 听写换用新的语音转文字模型。  
- GPT-4.5 从 ChatGPT 中退役，旧对话转由 GPT-5.5 继续。

为什么重要：  
ChatGPT 正从“聊天工具”继续向个人事务入口扩展，金融、语音、多端体验都在变成默认能力。

可能影响：  
普通用户会更频繁把 ChatGPT 用在日常决策、财务查看、语音输入上；企业和开发者则要注意模型退役节奏，避免工作流依赖旧模型。

来源：OpenAI Help Center  
https://help.openai.com/zh-hans-cn/articles/6825453-chatgpt-%E5%8F%91%E5%B8%83%E8%AF%B4%E6%98%8E

---

### 2. Anthropic 推出 Claude Tag：AI 开始进入团队协作频道

发生了什么：  
Anthropic 6 月 23 日发布 Claude Tag，允许团队在 Slack 频道里 @Claude，让 Claude 基于频道上下文、授权工具和数据异步完成任务。当前面向 Claude Enterprise 和 Team 客户 beta。

为什么重要：  
这不是单人聊天助手，而是“团队频道里的 AI 同事”。Anthropic 还称，其内部版本已参与生成产品团队 65% 的代码。

可能影响：  
企业 AI 落地会从“个人提问”转向“团队协作流”。权限、日志、成本上限、频道级记忆会变成企业 AI 产品的关键竞争点。

来源：Anthropic News  
https://www.anthropic.com/news/introducing-claude-tag

---

### 3. NVIDIA：其技术驱动 TOP500 超算中超过 400 台

发生了什么：  
NVIDIA 6 月 23 日称，最新 TOP500 榜单中，超过 400 台、即 81% 的最快超级计算机使用 NVIDIA 技术；新入榜系统中近 90% 基于 NVIDIA 技术。Green500 能效榜前 8 名也运行在 NVIDIA GPU 上。

为什么重要：  
AI 算力竞争正在和超级计算、科学计算、能源效率高度绑定。GPU、网络、CPU 的全栈能力，正在成为大模型训练和科学 AI 的基础设施。

可能影响：  
AI 基建会继续向少数全栈平台集中。科研、气候、材料、6G、工业仿真等领域的 AI 能力，会越来越依赖高性能计算平台。

来源：NVIDIA Blog  
https://blogs.nvidia.com/blog/top500-green500-supercomputers-isc-2026/

---

### 4. NVIDIA 与 AWS 推进生产级 AI 基础设施

发生了什么：  
NVIDIA 6 月 23 日披露与 AWS 的最新合作：  
- Amazon EC2 G7 使用 NVIDIA RTX PRO 4500 Blackwell Server Edition GPU。  
- Amazon OpenSearch Serverless 默认采用 NVIDIA cuVS 做 GPU 加速向量索引。  
- AWS 获得 NVIDIA GB300 训练性能 Exemplar Cloud 状态。

为什么重要：  
企业 AI 的瓶颈正从“有没有模型”转向“检索、推理、训练、成本、运维能否规模化”。向量检索默认 GPU 化，是 RAG 和智能体应用的重要基础设施变化。

可能影响：  
构建 RAG、搜索、推荐、智能体系统的团队，可能获得更快索引、更低成本和更少运维负担。云厂商与芯片厂商绑定会进一步加深。

来源：NVIDIA Blog  
https://blogs.nvidia.com/blog/nvidia-aws-ai-production-scale/

---

### 5. 中国 AI 应用继续走向垂直行业规模化

发生了什么：  
新华社 6 月 26 日报道，夏季达沃斯论坛闭幕后，AI 在工业制造、医疗、能源等垂直领域规模化落地成为热点。报道提到，部分企业用智能体解析工艺图纸可从半天缩短至几分钟，材料研发周期也在缩短。

为什么重要：  
这说明中国 AI 应用主线正在从通用大模型热度，转向实体产业效率提升。

可能影响：  
真正有数据、场景和流程改造能力的企业会更受关注；单纯“套壳 AI”会更难讲故事。

来源：新华社

## 实战案例（2个）

1. Claude Tag：AI 进入 Slack，变成“团队成员”  
实战价值：适合产品、研发、客服、数据分析团队，把 AI 从单人问答变成团队协作节点。  
注意点：权限边界、频道记忆、私密信息访问必须提前设计清楚。

2. ChatGPT 听写升级：多语言、口音、噪声场景更强  
实战价值：会议纪要、口述写作、移动端输入会更可用。  
注意点：敏感会议仍建议先确认录音、转写和云端处理规则。

## 今日结论

- 最值得关注：企业级 AI 正在加速进入核心业务流程，AI 不再只是聊天工具，而是在进入税务、法务、制造、运维、推理服务等真实生产系统。
- 给普通用户建议：短期优先选择权限透明、可断开授权、有来源标注的 AI 产品，把它用于信息整理、学习复盘、日常文档和低风险决策辅助。
- 给团队建议：不要只比较模型榜单，先选一个高频流程做试点，并把权限、审计、成本和人工复核写进上线标准。

## 明日跟踪点

- 关注今日提到的模型、平台或硬件动态是否出现产品化细节。
- 关注企业案例是否披露真实使用场景、权限控制和成本变化。
- 关注政策、版权、数据安全或来源标注要求是否进一步收紧。

## 证据矩阵

- 来源条目 1：OpenAI 更新 ChatGPT：个人金融、听写、模型退役同步推进 —— OpenAI 6 月 26 日更新 ChatGPT 版本说明： 美国 Plus 用户可使用个人金融体验，Android 端也扩大覆盖。 ChatGPT 听写换用新的语音转文字模型。 GPT-4.5 从 ChatGPT 中退役，旧对话转由 GPT-5.5 继续。
- 来源条目 2：Anthropic 推出 Claude Tag：AI 开始进入团队协作频道 —— Anthropic 6 月 23 日发布 Claude Tag，允许团队在 Slack 频道里 @Claude，让 Claude 基于频道上下文、授权工具和数据异步完成任务。当前面向 Claude Enterprise 和 Team 客户 beta。
- 来源条目 3：NVIDIA：其技术驱动 TOP500 超算中超过 400 台 —— NVIDIA 6 月 23 日称，最新 TOP500 榜单中，超过 400 台、即 81% 的最快超级计算机使用 NVIDIA 技术；新入榜系统中近 90% 基于 NVIDIA 技术。Green500 能效榜前 8 名也运行在 NVIDIA GPU 上。
- 来源条目 4：NVIDIA 与 AWS 推进生产级 AI 基础设施 —— NVIDIA 6 月 23 日披露与 AWS 的最新合作： Amazon EC2 G7 使用 NVIDIA RTX PRO 4500 Blackwell Server Edition GPU。 Amazon OpenSearch Serverless 默认采用 NVIDIA cuVS 做 GPU 加速向量索引。 AWS 获得 NVIDIA GB300 训练性能 Exemplar Cloud 状态。
- 来源条目 5：中国 AI 应用继续走向垂直行业规模化 —— 新华社 6 月 26 日报道，夏季达沃斯论坛闭幕后，AI 在工业制造、医疗、能源等垂直领域规模化落地成为热点，部分企业用智能体解析工艺图纸可从半天缩短至几分钟。

## 下一步行动（CTA）

- 先读核心定位：[什么是 OpenClaw](/zh/blog/what-is-openclaw/)
- 需要落地部署：[OpenClaw VPS 部署完整指南](/zh/blog/openclaw-vps-deployment-complete-guide/)
- 保障稳定性：[OpenClaw 模型回退策略](/zh/blog/openclaw-model-fallback-strategy/)
