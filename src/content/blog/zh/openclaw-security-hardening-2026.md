---
title: "OpenClaw 安全加固指南：2026 年保护你的 AI Agent"
description: "超过 4 万个 OpenClaw 实例暴露在公网。本文基于 CrowdStrike、SecurityScorecard 等安全研究，教你如何通过认证、防火墙、插件白名单等措施加固部署。"
pubDate: 2026-02-19
tags: ["openclaw", "安全", "加固", "教程"]
category: "guide"
lang: "zh"
---

## 为什么现在要关注

过去一周，多份安全报告将 OpenClaw 部署推上了风口浪尖：

- **CrowdStrike** 发布了"[安全团队需要了解的 OpenClaw 知识](https://www.crowdstrike.com/en-us/blog/what-security-teams-need-to-know-about-openclaw-ai-super-agent/)"，重点分析了 prompt 注入和数据泄露风险
- **SecurityScorecard** 发现公网上有 **超过 4 万个暴露的 OpenClaw 实例**（[Infosecurity Magazine](https://www.infosecurity-magazine.com/news/researchers-40000-exposed-openclaw/)）
- **WIRED** 报道 Meta 等科技公司已因安全顾虑限制内部使用 OpenClaw
- **Fortune** 详述了权限配置错误可能导致 Agent 获得超出预期权限的风险

如果你自托管 OpenClaw，这篇指南就是写给你的。

## 核心风险

| 风险 | 后果 |
|------|------|
| **Gateway 暴露** | 任何人都能和你的 Agent 对话 |
| **无认证/弱认证** | 攻击者发送命令、窃取 API 密钥 |
| **插件权限过宽** | Agent 能访问不该访问的工具 |
| **Prompt 注入** | 恶意输入诱导 Agent 泄露数据 |
| **版本过旧** | 已知 bug（如 v2026.2.15 的 `device token mismatch`）未修复 |

## 逐步加固

### 1. 绝不将 Gateway 暴露到公网

OpenClaw 的 gateway 应 **只监听** `localhost` 或内网。

```bash
# 检查监听状态
ss -tlnp | grep 18789
```

需要远程访问时用 SSH 隧道或 VPN，绝不直接开放 18789 端口。

在 `openclaw.json` 中确保：
```json
{
  "gateway": {
    "host": "127.0.0.1"
  }
}
```

### 2. 启用防火墙

```bash
# UFW 示例
sudo ufw default deny incoming
sudo ufw allow ssh
sudo ufw enable

# 确认 OpenClaw 端口未开放
sudo ufw status | grep 18789
```

### 3. 使用插件白名单

`plugins.allow` 配置限制哪些插件可以运行，这很关键——不受限的 Agent 可以访问一切。

```json
{
  "plugins": {
    "allow": ["telegram", "exec", "browser"]
  }
}
```

只列出你实际使用的插件，定期审查。

### 4. 限制 Exec 和文件访问

`exec` 工具权限很大，建议：
- 将 exec 策略设为 `security: "allowlist"`
- 使用工作空间边界限制文件访问
- 非必要不使用 `elevated: true`

### 5. 保持更新

近期 GitHub 上的真实 bug：
- **v2026.2.15**：`device token mismatch` 认证错误（[#18590](https://github.com/openclaw/openclaw/issues/18590)）
- **v2026.2.12**：废弃配置键导致静默失败（[#19992](https://github.com/openclaw/openclaw/issues/19992)）
- **reasoning 项目 bug**：`rs_[...]` 导致 400 错误（[#17019](https://github.com/openclaw/openclaw/issues/17019)）

```bash
openclaw update
openclaw doctor  # 检查配置问题
```

### 6. 审计你的配置

每次更新后运行 `openclaw doctor`。[#19992](https://github.com/openclaw/openclaw/issues/19992) 提议在重启前自动执行此检查——在该功能上线之前，请手动操作。

### 7. 审查 Agent 权限

你的 `AGENTS.md` 和工作空间文件定义了 Agent 能做什么。确保：
- 外部操作（发邮件、发消息）需要确认
- 破坏性命令需要审批
- 敏感数据路径被排除

## 云端部署注意事项（Kimi Claw、VPS）

如果你使用 **Kimi Claw**（Moonshot AI 托管的 OpenClaw）或 VPS：

- Kimi Claw 处理基础设施安全，但你仍需控制技能权限和数据访问
- VPS 上以上所有措施均适用，加上标准服务器加固（SSH 密钥、fail2ban、自动更新）
- 参见我们的 [VPS 部署指南](/zh/blog/openclaw-vps-deployment-complete-guide)

## 快速检查清单

- [ ] Gateway 只绑定 `127.0.0.1`
- [ ] 防火墙已启用，18789 端口未暴露
- [ ] `plugins.allow` 白名单已配置
- [ ] Exec 安全设为 `allowlist`
- [ ] 运行最新稳定版
- [ ] `openclaw doctor` 检查通过
- [ ] Agent 工作空间有明确的权限边界
- [ ] SSH 使用密钥认证（非密码）

## 延伸阅读

- [什么是 OpenClaw？](/zh/blog/what-is-openclaw) — 平台概览
- [VPS 部署指南](/zh/blog/openclaw-vps-deployment-complete-guide) — 从零搭建
- [OpenClaw 官方文档](https://docs.openclaw.ai) — 配置参考
- [CrowdStrike 报告](https://www.crowdstrike.com/en-us/blog/what-security-teams-need-to-know-about-openclaw-ai-super-agent/) — 安全分析

---

*保护好自己。一个能访问你生活的 AI Agent，值得你像对待任何公网服务器一样重视安全。*
