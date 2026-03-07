---
title: "OpenClaw `doctor --fix` 和 `--repair` 有什么区别？2026 安全修复教程（含可回滚步骤）"
description: "很多用户在故障时直接运行 `openclaw doctor --fix --force`，结果把自定义配置覆盖。本文给出 `--fix`/`--repair`/`--force` 的差异、可复制的安全修复流程与验证清单。"
pubDate: 2026-03-07
tags: ["openclaw", "doctor", "repair", "fix", "troubleshooting", "gateway"]
category: "tutorial"
lang: "zh"
---

当 OpenClaw 报错时，很多人第一反应是：

```bash
openclaw doctor --fix --force
```

问题是：`--force` 会进入“激进修复”，你可能修好了故障，也可能顺手把自定义 systemd 配置覆盖掉。

这篇只做一件事：**让你在不误伤现有配置的前提下，安全地完成修复。**

> 本文命令参数基于本机 `openclaw doctor --help`（OpenClaw 2026.3.3）可验证。

## 一句话结论

- `--fix` 与 `--repair`：等价（`--fix` 是 `--repair` 别名）
- `--repair`：推荐日常故障修复（尽量保守）
- `--force`：仅在你确认需要“覆盖式修复”时使用

---

## 1) 先确认参数语义（30 秒）

```bash
openclaw doctor --help
```

你应能看到（核心项）：

- `--fix`: Apply recommended repairs (alias for --repair)
- `--repair`: Apply recommended repairs without prompting
- `--force`: Apply aggressive repairs (overwrites custom service config)

这三行就是你是否该上 `--force` 的决策依据。

---

## 2) 安全修复 4 步法（可复制）

### 第一步：采样现状（先留证据）

```bash
openclaw status --all
openclaw gateway status --deep
openclaw logs --follow
```

> 建议先复制保存关键错误信息，再进入修复动作。

### 第二步：先做保守修复（默认路径）

```bash
openclaw doctor --repair
```

如果你希望无交互执行（CI/远程批处理）：

```bash
openclaw doctor --repair --non-interactive --yes
```

### 第三步：复检结果（必须）

```bash
openclaw gateway status --deep
openclaw channels status --probe
openclaw status --deep --timeout 10000
```

判断规则：
- Gateway 恢复 + 目标渠道 probe 通过：结束
- 仍失败：再看是否进入第四步

### 第四步：仅在“明确需要覆盖修复”时用 `--force`

```bash
openclaw doctor --repair --force
```

使用前请确认：
- 你知道会覆盖哪些服务配置
- 你有可回滚的配置备份（至少保留当前服务/配置快照）

---

## 3) 常见问答（FAQ）

### Q1：`--fix` 比 `--repair` 更“强力”吗？
不是。`--fix` 就是 `--repair` 的别名，修复级别一致。

### Q2：我应该一开始就加 `--force` 吗？
不应该。先跑保守修复，只有在重复失败且已确认服务配置损坏时，再上 `--force`。

### Q3：如何判断问题不在 doctor，而在渠道或模型层？
- 渠道层：`openclaw channels status --probe`
- 模型/API 层：`openclaw logs --follow` 看上游报错、超时、配额

---

## 4) 可验证完成清单（打勾即完成）

- [ ] `openclaw doctor --help` 已确认 `--fix`=`--repair`
- [ ] 已先执行 `openclaw doctor --repair`（非 `--force`）
- [ ] `openclaw gateway status --deep` 显示健康
- [ ] `openclaw channels status --probe` 对目标渠道通过
- [ ] 测试消息链路在 `openclaw logs --follow` 中完整可见

---

## 5) 一段可直接贴给同事的“最小排障包”

```bash
openclaw doctor --help
openclaw doctor --repair --non-interactive --yes
openclaw gateway status --deep
openclaw channels status --probe --json
openclaw status --all
```

---

## 延伸阅读（内链）

- [OpenClaw `status` 和 `gateway status` 有什么区别？5 分钟定位“在线但不回消息”问题（2026）](/zh/blog/openclaw-status-vs-gateway-status-difference-and-debug-flow-2026/)
- [OpenClaw `channels status --probe`：5 分钟定位“在线不回复”问题（2026）](/zh/blog/openclaw-channels-status-probe-no-reply-diagnosis-2026/)
- [OpenClaw Gateway 启动失败怎么修？2026 可执行排查清单](/zh/blog/openclaw-gateway-start-failed-fix-checklist-2026/)
- [OpenClaw 日志排查指南：从报错到根因定位](/zh/blog/openclaw-logs-debug-guide/)