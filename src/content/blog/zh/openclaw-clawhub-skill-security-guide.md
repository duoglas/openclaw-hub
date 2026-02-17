---
title: "OpenClaw ClawHub 安全指南：恶意 Skill 识别与防护实战"
description: "ClawHub 出现 230+ 恶意 Skill，涉及凭据窃取和供应链攻击。本文解析风险来源，并给出可落地的白名单配置、审计方法和升级建议。"
pubDate: 2026-02-17
tags: ["openclaw", "security", "clawhub", "skills", "supply-chain"]
category: "guide"
lang: "zh"
---

2026 年 2 月，OpenClaw 生态经历了一场严峻的安全考验：安全研究人员在 ClawHub（OpenClaw 官方 Skill 市场）上发现了 **230 至 341 个恶意 Skill**，涉及凭据窃取、加密货币钱包盗取和 macOS/Windows 恶意软件部署。多家安全公司（Bitdefender、Cisco、NordVPN）发布了技术报告，Reddit 上的独立研究也扫描了约 18,000 个暴露的 OpenClaw 实例。

这不是恐慌——这是所有 OpenClaw 用户必须正视的现实。好消息是：防护手段是现成的，只要你动手配置。

## 到底发生了什么

### 攻击方式

恶意 Skill 的攻击链主要有三种模式：

1. **凭据窃取**：Skill 内嵌脚本读取环境变量（API Key、Token）或浏览器凭据文件，悄悄外传
2. **Prompt 注入**：SKILL.md 中嵌入隐蔽指令，操纵智能体执行非预期操作（如发送邮件、访问内网 URL）
3. **恶意软件投递**：install 脚本下载并执行 Atomic Stealer（macOS）或类似载荷

### 谁在攻击

Bitdefender 报告指出，攻击者使用自动化脚本每隔几分钟提交一个新恶意 Skill，并通过 **typosquatting**（拼写相似的用户名）伪装成可信发布者。部分账号甚至是被盗的合法 GitHub 账号。

### 官方响应

OpenClaw 已与 VirusTotal 合作，对 ClawHub 上传的 Skill 进行自动扫描：
- ✅ "良性"判定 → 自动通过
- ⚠️ "可疑"判定 → 显示警告
- 🚫 "恶意"判定 → 阻止下载

同时 v2026.2.12 版本包含 40+ 安全补丁（详见下文）。

## 你现在该做什么

### 第 1 步：升级到 v2026.2.12+

这个版本是安全分水岭。关键修复包括：

- **SSRF 防护**：Gateway 和 OpenResponses 默认启用 deny 策略 + 主机名白名单
- **浏览器控制强制认证**：阻止未授权 loopback RCE
- **Prompt 注入缓解**：浏览器和 Web 工具的输出自动标记为不可信并清洗
- **Webhook 安全**：constant-time secret 校验 + 速率限制

升级方法：

```bash
# 标准安装
openclaw update

# Docker
docker pull openclaw/openclaw:latest
docker restart openclaw-2026
```

### 第 2 步：启用 Skill 白名单

这是**最重要的单一防护措施**。在 `openclaw.json` 中：

```json
{
  "plugins": {
    "allow": [
      "github",
      "weather",
      "gog",
      "himalaya"
    ]
  }
}
```

只有列入白名单的 Skill 才会被加载。**如果你不用某个 Skill，就不要允许它。**

### 第 3 步：审计已安装的 Skill

```bash
# 列出所有已安装 Skill
ls ~/.openclaw/skills/

# 检查每个 Skill 的 SKILL.md 和脚本
# 重点关注：
# - 有无 curl/wget 外部请求
# - 有无读取 ~/.ssh、~/.aws、环境变量的操作
# - install.sh 中是否有可疑下载
```

如果你从 ClawHub 安装过不熟悉的 Skill，**立即删除并轮换你的 API Key**。

### 第 4 步：配置 URL 白名单

v2026.2.12 新增了 URL 白名单功能，防止智能体被诱导访问内网地址：

```json
{
  "files": {
    "urlAllowlist": ["https://*.github.com", "https://*.googleapis.com"]
  },
  "images": {
    "urlAllowlist": ["https://*.githubusercontent.com"]
  }
}
```

### 第 5 步：定期安全快检

建议每周执行一次：

```bash
openclaw doctor security
```

重点检查项：
- 是否暴露了 18789/18790 端口到公网
- 是否配置了 `plugins.allow`
- 是否启用了 Gateway 认证 Token
- 是否开启了审计日志

## 哪些 Skill 是安全的

判断标准：

| 信号 | 安全 ✅ | 可疑 ⚠️ |
|------|---------|---------|
| 来源 | 官方内置或知名开发者 | 新账号、无历史 |
| 代码 | 纯 SKILL.md + 简单 CLI 调用 | 含 install 脚本、二进制文件 |
| 权限 | 只读文件、网络查询 | 要求 exec、文件写入、凭据访问 |
| 更新 | 稳定版本历史 | 突然大量代码变更 |

**经验法则**：如果一个 Skill 需要的权限超出它声称的功能，不要安装。

## 给开发者的建议

如果你在开发 Skill 并发布到 ClawHub：

1. **最小权限**：只申请必要的权限
2. **透明代码**：不要混淆脚本，保持可审计
3. **签名发布**：使用你的长期 GitHub 账号，保持发布历史一致
4. **文档清晰**：在 SKILL.md 中说明 Skill 会执行什么操作、访问什么数据

## 总结

ClawHub 的安全问题是整个 AI Agent 生态的缩影——当智能体拥有执行权限时，供应链安全变得格外关键。OpenClaw 团队已经在快速响应（VirusTotal 集成、v2026.2.12 安全补丁），但最终的防线在你自己手上：

1. **升级** → v2026.2.12+
2. **白名单** → `plugins.allow` 只放你用的
3. **审计** → 检查已装 Skill 的代码
4. **最小暴露** → 别把端口开到公网
5. **轮换凭据** → 如果曾装过可疑 Skill

安全不是一次性配置，是持续习惯。

---

📎 **相关阅读**：
- [OpenClaw 首次安装报错排查](/zh/blog/openclaw-install-first-run-error-troubleshooting)
- [OpenClaw VPS 部署完全指南](/zh/blog/openclaw-vps-deployment-complete-guide)
- [OpenClaw 模型回退链配置指南](/zh/blog/openclaw-model-fallback-strategy)
