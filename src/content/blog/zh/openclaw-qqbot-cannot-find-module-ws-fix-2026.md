---
title: "OpenClaw QQ Bot：\"Cannot find module 'ws'\" 扩展加载失败修复指南（2026）"
description: "OpenClaw 的 QQ Bot 扩展加载失败，日志提示 Cannot find module 'ws'？本文给出可复制的定位与修复步骤：确认扩展路径、重新安装依赖（npm/pnpm）、重启并用 status/logs 验证修复。"
pubDate: 2026-03-14
tags: ["openclaw", "qqbot", "nodejs", "ws", "排障", "扩展"]
category: "guide"
lang: "zh"
---

如果你的 OpenClaw QQ Bot 扩展加载失败，日志里出现：

```text
Cannot find module 'ws'
```

基本可以确定：**QQ Bot 扩展的 Node.js 依赖没装好（或装在了不被运行时读取的位置）**。

这是近期很常见的一类问题，通常发生在：

- 只复制了扩展目录，但没执行 install
- `node_modules/` 被清理/被忽略
- Node/pnpm 版本升级后未重装依赖
- OpenClaw 网关是另一个用户在跑，导致你装的依赖不生效

## 一句话结论

**进入 QQ Bot 扩展目录重新安装依赖，然后重启 gateway，并用 status + logs 做可验证检查。**

---

## 你会看到的现象（症状）

- OpenClaw 本体正常，但 QQ Bot 扩展/渠道显示加载失败
- `openclaw logs` 中出现 Node 模块解析错误
- 常见错误行：

```text
Error: Cannot find module 'ws'
```

> 证据说明：不同版本/不同安装方式下，扩展名称与路径可能不同。本文步骤以“在你机器上可验证”为原则编写。

---

## 步骤 0）确认你在排查的“运行时用户”是否一致

依赖安装是按目录来的，但**关键是：OpenClaw gateway 到底用哪个用户在运行**。

```bash
whoami
openclaw status --deep
```

如果你是用 systemd/supervisor 等方式把 gateway 当服务跑，务必确认服务 user。建议：**用运行 gateway 的同一用户**去安装扩展依赖。

---

## 步骤 1）定位 QQ Bot 扩展目录

很多部署中，扩展在这里：

- `~/.openclaw/extensions/<extension-name>/`

如果你已经知道路径，直接 cd 进去即可。否则搜索：

```bash
ls -la ~/.openclaw/extensions || true
find ~/.openclaw -maxdepth 4 -type d -name '*qq*' -o -name '*qqbot*' 2>/dev/null
```

你要找的是一个 Node 项目目录，应该包含 `package.json`：

```bash
cd ~/.openclaw/extensions/qqbot
ls -la
cat package.json
```

如果找不到该目录（待确认）：你的扩展可能安装在其它位置（例如某个项目 checkout 目录）。这时需要扩大搜索范围到你的 OpenClaw 安装目录。

---

## 步骤 2）验证 ws 确实缺失

在扩展目录下运行：

```bash
node -p "require.resolve('ws')"
```

如果仍然报 `Cannot find module 'ws'`，继续下一步重装依赖。

---

## 步骤 3）重装依赖（优先安全、可复现）

### 方案 A（推荐）：按 lockfile 使用对应包管理器

如果目录里有 `pnpm-lock.yaml`，用 pnpm：

```bash
pnpm install
```

如果有 `package-lock.json`，用 npm：

```bash
npm ci
```

如果两者都没有，兜底：

```bash
npm install
```

### 方案 B：强制干净重装（目录状态混乱时）

```bash
rm -rf node_modules
npm install
```

> 生产环境建议：优先 `npm ci` / `pnpm install`。只有在确实不一致时才删除 `node_modules/`。

---

## 步骤 4）重启 gateway 并验证修复是否生效

重启网关：

```bash
openclaw gateway restart
```

然后检查状态：

```bash
openclaw status --deep
openclaw channels status --probe
```

最后打开日志，做一次真实消息/事件测试：

```bash
openclaw logs --follow
```

### 可验证的“完成标准”

- [ ] `openclaw logs` 不再出现 `Cannot find module 'ws'`
- [ ] `openclaw status --deep` 里 QQ Bot 扩展/渠道状态为 **OK**（或至少不再 load fail）
- [ ] 真实测试链路打通（inbound → agent → outbound）

---

## 常见根因（防止复发）

1. **只拷贝了扩展，没有装依赖**
   - 解决：每次拷贝后执行 `pnpm install`/`npm ci`。
2. **装依赖的用户不对**
   - 解决：用运行 gateway 的同一用户安装。
3. **Node 大版本升级后没重装**
   - 解决：升级后重装依赖。
4. **清理脚本误删 node_modules**
   - 解决：把扩展目录加入清理白名单。

---

## 相关内链（站内）

- [OpenClaw 安装与首次运行错误：全量排障地图](/zh/blog/openclaw-install-first-run-error-troubleshooting/)
- [OpenClaw `channels status --probe`：快速定位“在线但不回复”](/zh/blog/openclaw-channels-status-probe-no-reply-diagnosis-2026/)
