---
title: "AI / 科技日报（2026-08-22）"
description: "DeepSeek 上线多模态视觉模型 V4-Flash-Vision-Exp 与免费 Files API；智谱 GLM-5.3 API 正式上线、权重待开源；NVIDIA×OpenAI 锁定俄亥俄 8GW 算力园区。"
pubDate: 2026-08-22
tags: ["ai", "tech", "daily", "news"]
category: "news"
lang: "zh"
---

《AI、科技日报》  
2026-08-22 早报

## 今日要闻（5条）

### 1. DeepSeek 上线多模态视觉模型 V4-Flash-Vision-Exp

发生了什么：8/21 DeepSeek API 平台新增实验模型 deepseek-v4-flash-vision-exp，支持图文混合输入，同步上线免费 Files API；配套 DeepSeek Harness 0.1.1 当天发布。

为什么重要：这是 V4 系列首次开放视觉能力，官方称多模态 Agent 性能接近 Opus-4.8，图片按 384 token/张计费、沿用 Flash 定价。

可能影响：截图理解、图表分析类 Agent 工作流成本大幅下降，国产模型在多模态 Agent 赛道再进一步。

### 2. 智谱 GLM-5.3 API 正式上线，权重待开源

发生了什么：8/14 发布、8/19 API 上线，8/20 国家超算互联网平台同步开放调用；官方文档确认编码性能较 GLM-5.2 提升 50%，1M 上下文 + 128K 输出。

为什么重要：官方称其达到开源模型 SOTA（Terminal Bench 3.0 等），且 CyberGym 漏洞发现基准史上最强、漏洞利用分数超 GLM-5.2 两倍，权重预告下周五开源。

可能影响：开源阵营首次在“攻防级”网络安全能力上逼近闭源旗舰，Coding Plan 用户已可直接切换。

### 3. NVIDIA × OpenAI 锁定俄亥俄 8GW 算力园区

发生了什么：NVIDIA 官方博客披露（8/17），与 SB Energy 合作锁定 PORTS-Pike 园区电力与土地，OpenAI 作为租户建设 4.25GW AI 工厂；OpenAI 对 NVIDIA 算力总承诺约 12GW（可扩至 16GW）。

为什么重要：官方口径“compute is revenue”——到 2030 年对应约 6000 亿美元 NVIDIA 算力收入，NVIDIA 为此提供 20 年期部分担保。

可能影响：算力基础设施正式金融资产化，训练算力向“电力+土地”瓶颈转移，行业资本开支竞赛继续加码。

### 4. Anthropic 暂停最新模型两周 RL 训练【待确认】

发生了什么：行业日报称（8/20）Anthropic 因 Astra 模型可能触及“关键网络安全能力阈值”，暂停最新模型两周强化学习训练。

为什么重要：若属实，这是头部实验室首次因网络安全阈值主动放缓训练节奏。

可能影响：模型发布时间线或推迟。目前仅有聚合媒体单一信源，未见 Anthropic 官方公告，待确认。

### 5. 腾讯 Q2 资本开支 528 亿元、自由现金流转负【待确认】

发生了什么：行业聚合页数据（8/14 更新）显示腾讯二季度资本开支 528 亿元，自由现金流转负。

为什么重要：头部大厂“以利润换 AI 空间”的信号，与 NVIDIA/OpenAI 万亿级算力布局互为印证。

可能影响：国内云厂商 AI 投入进入刚性阶段。此数据来自二级聚合页，未见财报原文直核，待确认。

## 实战案例

### 1. DeepSeek Files API + 视觉模型组合（开发者可直接上手）

上传图片一次、按 file_id 复用，省去重复传图带宽；模型名切到 deepseek-v4-flash-vision-exp 即可用，走 Chat Completions / Messages / Responses 三种协议都行。

可学的点：适合做“截图→结构化数据”类自动化。Files API 免费，开发者可以先跑通一个图文提取小工具再决定是否扩大生产使用。

### 2. GLM Coding Plan 用户升级路径

官方文档确认 GLM-5.3 已对全部 Coding Plan 用户开放（18 元/月起），建议在复杂编码任务把 reasoning_effort 设为 max。

可学的点：注意新模型不支持关闭思考，老代码里 thinking.type:"disabled" 要改成 enabled，否则请求会失败；切换前先在测试环境验证兼容性。

## 今日结论

- 最值得关注：国产开源双连发（DeepSeek 视觉模型 + GLM-5.3）正在把“旗舰能力”打到最低价档；同时 NVIDIA-OpenAI 把算力生意做成 6000 亿美元级金融资产，两头都在加速。
- 给普通用户建议：写代码选 GLM-5.3（Coding Plan 性价比高）；做图文自动化试 DeepSeek 视觉模型（按 Flash 价计费）。
- 给团队建议：先确认模型实验状态与权重开源时间，再决定是否切换；不要把聚合媒体单一信源的“待确认”信息当确定结论。

## 明日跟踪点

- 关注 DeepSeek V4-Flash-Vision-Exp 是否转正式版、Files API 配额与计费是否调整。
- 关注 GLM-5.3 权重是否如期开源、CyberGym 结果是否被独立复现。
- 关注 Anthropic 是否对“Astra 暂停 RL 训练”发布官方说明，以及腾讯财报原文对资本开支的确认。

## 证据矩阵

- 来源条目 1：DeepSeek 上线多模态视觉模型 V4-Flash-Vision-Exp —— 8/21 DeepSeek API 平台新增 deepseek-v4-flash-vision-exp 实验模型，支持图文混合输入，同步上线免费 Files API，图片按 384 token/张计费。
- 来源条目 2：智谱 GLM-5.3 API 正式上线，权重待开源 —— 8/14 发布、8/19 API 上线，官方确认编码性能较 GLM-5.2 提升 50%，1M 上下文 + 128K 输出，权重预告下周五开源。
- 来源条目 3：NVIDIA × OpenAI 锁定俄亥俄 8GW 算力园区 —— NVIDIA 与 SB Energy 合作锁定 PORTS-Pike 园区电力与土地，OpenAI 作为租户建设 4.25GW AI 工厂，算力总承诺约 12GW。
- 来源条目 4：Anthropic 暂停最新模型两周 RL 训练 —— 行业日报称 Anthropic 因 Astra 模型触及关键网络安全能力阈值，暂停两周强化学习训练，未见官方公告，待确认。
- 来源条目 5：腾讯 Q2 资本开支 528 亿元、自由现金流转负 —— 行业聚合页显示腾讯二季度资本开支 528 亿元、自由现金流转负，来自二级聚合页，待确认。

## 下一步行动（CTA）

- 先读核心定位：[什么是 OpenClaw](/zh/blog/what-is-openclaw/)
- 需要落地部署：[OpenClaw VPS 部署完整指南](/zh/blog/openclaw-vps-deployment-complete-guide/)
- 保障稳定性：[OpenClaw 模型回退策略](/zh/blog/openclaw-model-fallback-strategy/)
