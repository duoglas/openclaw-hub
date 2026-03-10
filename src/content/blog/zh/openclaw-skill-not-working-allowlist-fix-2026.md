---
title: "OpenClaw Skill 安装后不生效？3 步定位白名单/配置/重启（2026）"
description: "技能已安装却无响应？用 3 步快速定位：确认安装 → 插件白名单 → 重启验证，避免误判。"
pubDate: 2026-03-10
tags: ["openclaw", "skills", "clawhub", "troubleshooting", "allowlist"]
category: "tutorial"
lang: "zh"
---

## 这篇文章讲什么

你已经执行了 `openclaw skill install xxx`，但对话里就是没有响应、也不触发？这通常不是“技能坏了”，而是**白名单没放行 / 配置没生效 / 服务没重启**。

本文给你一个 **3 步可验证流程**，每一步都有可复制命令和明确的验证信号。

## 3 步快速排障（可复制命令）

### 步骤 1：确认 Skill 已安装

```bash
ls ~/.openclaw/skills/
```

能看到你安装的技能目录（例如 `home-assistant`）就说明安装成功。看不到就重新安装：

```bash
openclaw skill install <skill-name>
```

> 如果提示找不到名称，先确认拼写是否正确；再参考 [ClawHub Skill 安全指南](/zh/blog/openclaw-clawhub-skill-security-guide) 里的命名规范。

### 步骤 2：检查插件白名单 `plugins.allow`

OpenClaw 默认**不会加载**未授权的 Skill。检查白名单：

```bash
openclaw config get plugins.allow
```

如果没看到你的 Skill 名称，打开配置文件加入它：

```bash
# 默认配置路径
~/.openclaw/openclaw.json
```

示例：

```json
{
  "plugins": {
    "allow": ["home-assistant", "github", "weather"]
  }
}
```

> 配置结构与常见错误可参考：[OpenClaw 配置文件详解与常见报错修复](/zh/blog/openclaw-config-yaml-errors-and-fixes)。

### 步骤 3：重启 Gateway 并验证

改完配置后必须重启：

```bash
openclaw gateway restart
openclaw gateway status
```

**验证方式：**
- 重新发起一次明确指令（例如“关掉客厅的灯”）
- 或在日志中看到 Skill 被加载的提示

> 如果仍无响应，继续检查频道状态：`openclaw channels status`（参考 [OpenClaw 渠道不回复排障](/zh/blog/openclaw-channels-status-probe-no-reply-diagnosis-2026/)）。

## 高频误区（1 分钟自查）

- **误区 1：只安装不白名单** → 结果：Skill 永远不加载
- **误区 2：只改配置不重启** → 结果：旧配置仍在运行
- **误区 3：装错名字** → 结果：安装失败却以为成功

## 最小证据包（可截图/记录）

- `ls ~/.openclaw/skills/` 输出包含目标 Skill
- `openclaw config get plugins.allow` 输出包含目标 Skill
- `openclaw gateway status` 显示运行中

## 结论

**只要按“安装确认 → 白名单 → 重启验证”顺序执行，90% 的 Skill 不生效问题都能在 5 分钟内解决。**

如果问题仍在，请带上上面的最小证据包去排查配置或通道层（见内链指引）。

---

### 进一步阅读

- [OpenClaw 配置文件详解与常见报错修复](/zh/blog/openclaw-config-yaml-errors-and-fixes)
- [ClawHub Skill 安全指南](/zh/blog/openclaw-clawhub-skill-security-guide)
- [树莓派本地部署指南（含 Skill 安装示例）](/zh/blog/openclaw-raspberry-pi-local-ai-agent-guide)
