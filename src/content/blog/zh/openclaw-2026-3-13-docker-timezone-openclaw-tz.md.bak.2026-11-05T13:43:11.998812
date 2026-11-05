---
title: "用 OPENCLAW_TZ 解决 OpenClaw Docker 部署的时区偏移（2026.3.13+）"
description: "OpenClaw 2026.3.13 在 docker-setup.sh 中加入 OPENCLAW_TZ，可显式指定 IANA 时区，解决容器部署下 Cron/日志/提醒时间线对不齐的问题，并给出验证方法。"
pubDate: 2026-03-17
tags: ["openclaw", "2026.3.13", "docker", "timezone", "cron", "部署"]
category: "guide"
lang: "zh"
---

“时区问题”是最难排的那类线上问题：程序没崩，但你对系统的信任开始动摇。

在容器部署的 OpenClaw 里，“现在到底是什么时间/什么时区”至少会影响三件事：

- 定时任务（cron / 提醒 / 例行维护）
- 日志时间戳与故障时间线对齐
- 跨地域协作（人读同一条时间线时不产生歧义）

OpenClaw **2026.3.13** 对这类问题给了一个可验证、可落地的解决开关。

## 2026.3.13 的可验证变化是什么？

在 `openclaw/openclaw` 的官方 Release Notes 中明确写到：

> Docker/timezone override: add `OPENCLAW_TZ` so `docker-setup.sh` can pin gateway and CLI containers to a chosen IANA timezone instead of inheriting the daemon default.

官方来源：
https://github.com/openclaw/openclaw/releases

这句话的含义很直接：以前你可能被动继承“Docker daemon 默认值 / 基础镜像行为 / 宿主机设置”，现在可以用 **显式变量**把时区钉死到一个确定的 IANA 时区。

## 时区偏移会在 OpenClaw 里表现成什么“假问题”？

你通常不会直接看到“timezone error”，而是这些二阶症状：

1) Cron/定时任务看起来“没按时触发”
- 实际上按另一个时区在跑。

2) 日志时间戳与宿主机/监控系统对不上
- 排查时需要反复换算，容易误判先后关系。

3) 日程/提醒类能力变得不可靠
- 尤其当 gateway 跑在一个环境、操作者在另一个环境读日志/看结果时。

即使你选择全链路 UTC，也没问题；但前提是“人 + 面板 + 运行环境”都必须对 UTC 形成一致预期。

## 如何使用 OPENCLAW_TZ

### 第一步：选择 IANA 时区名

使用完整 IANA 时区名，例如：

- `Asia/Shanghai`
- `Europe/Berlin`
- `America/Los_Angeles`

不要用 `CST`/`EST` 这类缩写（存在歧义，且受夏令时影响）。

### 第二步：把 OPENCLAW_TZ 传给 OpenClaw 容器

`OPENCLAW_TZ` 是为 `docker-setup.sh` 这条路径加入的，但核心做法很简单：**让 gateway/CLI 容器拿到这个环境变量**。

Compose 风格示例（示意）：

```yaml
services:
  openclaw-gateway:
    environment:
      - OPENCLAW_TZ=Asia/Shanghai
```

如果你用 `docker run`，等价形式是：

```bash
docker run -e OPENCLAW_TZ=Asia/Shanghai ...
```

（具体命令取决于你当前的 OpenClaw Docker 安装方式；release note 至少保证：docker-setup 相关链路已支持该变量。）

## 如何验证生效（别靠感觉）

建议用“证据链”验证：

- 对比设置 `OPENCLAW_TZ` 前后的 OpenClaw 日志时间戳。
- 触发一个可预测的 schedule（比如整点/每小时 cron），检查触发时间是否符合预期。
- 多容器部署时，确认 gateway 与可能存在的 companion CLI 容器在时区语义上是一致的。

如果你是在排查定时任务问题，额外做一件事会极大提升沟通效率：
把一段短时间线记成三列：**宿主机时间 / 容器时间 / OpenClaw 日志时间**。你在 GitHub issue 或团队群里贴出来，来回扯皮会少很多。

## 常见误区

- **误以为容器一定继承宿主机时区。** 现实中经常不稳定，而且跨机器更不可靠。
- **一部分链路按 UTC，另一部分按本地时区理解。** UTC 没错，错在“预期不一致”。
- **使用缩写时区。** 歧义与夏令时规则会让你迟早踩坑。

## 把它放进部署 checklist

如果你的 OpenClaw 要 24/7 跑，时区一致性属于第一层不变量，重要性接近：

- 网络/端口绑定稳定
- 持久化存储正确
- 重启策略可靠

`OPENCLAW_TZ` 看起来只是一个小变量，但它能显著减少“时间线不确定性”带来的运维成本。

---

### 站内推荐内链（internal）

建议从这些页面链接到本文：

- Docker/容器部署指南（docker-setup）
- Cron/定时任务与提醒
- Troubleshooting/排障索引（增加“时间/时区/触发偏移”分类）
