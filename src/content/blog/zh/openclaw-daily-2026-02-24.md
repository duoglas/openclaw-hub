---
title: "OpenClaw AI / 科技日报（2026-02-24）"
description: "OpenClaw AI / 科技日报 2026-02-24：当日关键更新、实操建议与次日观察点。"
pubDate: 2026-02-24
tags: ["ai", "tech", "daily", "news"]
category: "news"
lang: "zh"
---

📰 **OpenClaw 日报 · 2026.02.24 周二**

━━━━━━━━━━━━━━━━━━

**一、今日新鲜资讯**

**1️⃣ Bloomberg：OpenClaw 被称为 OpenAI 的"安全噩梦"**
· 发生了什么：Bloomberg 昨日发文称 OpenClaw 曾引发华尔街软件股 2 万亿美元抛售，现已归入 OpenAI 旗下，但安全挑战巨大
· 为什么重要：收购后 OpenAI 需要对所有用户的 agent 安全负责，而非仅开源社区自治
· 可能影响：预计 OpenAI 会强制推行更严格的 token/sandbox 策略，现有自建用户可能面临配置变更

**2️⃣ Infostealer 恶意软件已成功窃取 OpenClaw 配置**
· 发生了什么：Hudson Rock 披露 Vidar 变种通过文件抓取例程窃取了 openclaw.json（含 gateway token）、device.json（密钥对）、soul.md
· 为什么重要：攻击者拿到 token 可冒充你的 agent 执行任意操作
· 可能影响：所有自建部署用户应立即轮换 token 并检查文件权限

**3️⃣ OpenClaw Scanner 开源发布**
· 发生了什么：安全社区发布开源工具，可扫描企业内网中运行的 OpenClaw 实例
· 为什么重要：很多企业员工私自部署 agent（"shadow AI"），IT 部门完全不知情
· 可能影响：企业安全团队将开始主动检测并管控未授权 agent

**4️⃣ Peter Steinberger 正式加入 OpenAI**
· 发生了什么：OpenClaw 创始人已确认入职 OpenAI，Fortune/VentureBeat/Medium 多方报道
· 为什么重要：信号明确——AI 竞争从"模型更聪明"转向"agent 系统更完整"
· 可能影响：OpenClaw 开源版本的维护节奏和路线可能调整

━━━━━━━━━━━━━━━━━━

**二、实战案例**

**🔧 案例：Gateway Token 泄露后的紧急响应与加固**

背景：鉴于 Vidar 窃取 OpenClaw 配置的真实事件，以下为完整的自检加固流程。

做法：
```bash
# 1. 检查配置文件权限（应仅 owner 可读）
ls -la ~/.openclaw/openclaw.json
ls -la ~/.openclaw/device.json
chmod 600 ~/.openclaw/openclaw.json
chmod 600 ~/.openclaw/device.json

# 2. 轮换 gateway token
openclaw gateway stop
# 编辑 openclaw.json，替换 gateway.auth.token
# 用 openssl 生成强 token：
openssl rand -base64 32
# 将输出写入配置中的 auth.token 字段
openclaw gateway start

# 3. 限制网络暴露（仅本地监听）
# 确保 gateway 绑定 127.0.0.1 而非 0.0.0.0
# 远程访问走 Tailscale/WireGuard

# 4. 检查是否有异常 session
openclaw gateway status
```

结果：文件权限收紧 + token 轮换 + 网络隔离，三层防护到位。即使旧 token 泄露也已失效。

可复制命令：上方代码块可直接执行。

━━━━━━━━━━━━━━━━━━

**三、今日结论**

**A. 最值得关注：**
① Infostealer 窃取 agent 配置是真实威胁，不是假设——立即检查你的文件权限和 token
② OpenAI 收购后安全叙事升级，Bloomberg 定性为"噩梦"级别

**B. 对普通用户/创业者的建议：**
· 自建用户：今天花 10 分钟做上面的加固，比什么都值
· 创业者：如果你的产品依赖 OpenClaw，关注 OpenAI 接手后的 API/license 变化，做好 Plan B
· 企业 IT：用 OpenClaw Scanner 扫一遍内网，大概率有惊喜

**C. 明日跟踪点：**
1. OpenAI 是否发布 OpenClaw 安全公告或强制更新
2. 开源社区对创始人离开后的 fork/维护计划
3. Infostealer 攻击是否出现针对性升级版本
