---
title: "OpenClaw Hub 上线复盘：Cloudflare Pages + Search Console 常见坑"
description: "从部署失败、sitemap、noindex 到 API 授权，这篇复盘总结了 OpenClaw Hub 实战中的关键坑位与修复方案。"
pubDate: 2026-02-10
tags: ["openclaw", "cloudflare", "search-console", "seo", "guide"]
category: "guide"
lang: "zh"
---

## 这次踩到的关键坑

### 1）把 Pages 当成 Worker 部署
错误做法：`wrangler deploy`  
正确做法：Pages 走 Git 自动部署，或 `wrangler pages deploy dist`。

### 2）根路径 `/` 被 noindex
如果 `/` 只是重定向页，Google 可能标记 noindex。  
修复：把 `/` 改成可索引的语言选择页（EN / 中文）。

### 3）sitemap 入口不统一
有些工具默认找 `/sitemap.xml`，而 Astro 默认是 `sitemap-index.xml`。  
修复：保留 `sitemap-index.xml`，再新增一个 `sitemap.xml` 兼容入口。

### 4）浏览器自动化在 proxychains 环境崩溃
根因是 Chrome 继承 `LD_PRELOAD`。  
修复：用 wrapper 启动 Chrome，`unset LD_PRELOAD`，并显式加 `--proxy-server`。

### 5）Search Console API OAuth 403
应用未验证+测试用户未加入会直接被拒绝。  
修复：在 OAuth consent screen 添加测试用户，并完成授权同意。

## 上线后的建议流程

1. 先保证页面可访问（自定义域名 + HTTPS）  
2. 再提 `sitemap-index.xml` 和 `sitemap.xml`  
3. 然后请求核心页面编入索引（首页/分类/核心文章）  
4. 最后再做内容自动化，不要反过来

## 总结

技术 SEO 的本质不是“玄学优化”，而是把每个链路错误都显式修好。  
站点一旦跑通，后面的增长效率会高很多。
