#!/usr/bin/env node
import { generateEnglishDailyBody } from './lib/daily-generator.mjs';

const fixture = `《AI、科技日报》2026-05-24

## 今日要闻

### 1. Anthropic Project Glasswing / Claude Mythos Preview
发生了什么：
Anthropic 发布 Project Glasswing 漏洞发现计划，并展示 Claude Mythos Preview 如何帮助安全团队把漏洞报告、复现步骤和修复建议串起来。
为什么重要：
这说明大模型正在进入安全工作流，而不是只停留在聊天问答。
可能影响：
团队需要把权限边界、审计日志和人工复核写入 AI 安全助手上线标准。

### 2. NVIDIA Vera Rubin NVL72 / Jetson Thor / COMPUTEX
发生了什么：
NVIDIA 在 COMPUTEX 期间继续推进 Vera Rubin NVL72、Jetson Thor 和机器人开发栈，强化从数据中心到边缘机器人的算力路径。
为什么重要：
算力、服务器和机器人硬件被打包成完整基础设施叙事，影响企业采购节奏。
可能影响：
小团队应关注云端推理成本、边缘设备可用性和供应链交付窗口。

### 3. Amazon Alexa+ on-demand podcasts
发生了什么：
Amazon Alexa+ 增加按需播客和生成音频能力，强化家庭与移动场景中的 AI 内容入口。
为什么重要：
语音助手正在从命令入口变成可持续内容分发和摘要界面。
可能影响：
内容团队可把日报、FAQ 和产品更新转成可收听摘要，但要保留来源标注。

### 4. OpenAI Codex Appshots / Goal mode
发生了什么：
OpenAI Codex 围绕 Appshots 和 Goal mode 扩展编码 Agent 工作流，让任务拆解、状态回放和目标驱动执行更具体。
为什么重要：
编码 Agent 的竞争焦点正在从单次补全转向可审计的持续协作。
可能影响：
开发团队应先在低风险仓库测试代码审查、测试生成和变更摘要。

### 5. Xinhua 中国 AI 教育文旅养老机器人落地
发生了什么：
Xinhua 报道中国 AI 在教育、文旅、养老与机器人场景继续落地，强调真实业务中的服务效率。
为什么重要：
这类案例让 AI 从技术新闻进入地方产业和公共服务评估。
可能影响：
产品团队需要同时跟踪用户体验、责任边界、隐私和线下服务质量。`;

const body = generateEnglishDailyBody(fixture, '2026-05-24');
const banned = [
  'primary named signal',
  'The item affects workflow fit',
  'named signal for story',
  'same-day brief section',
  'concrete AI and technology development',
  'mapped to the publish-ready story',
];
const required = [
  '### 1. Anthropic / Project / Glasswing / model capability update',
  '### 2. NVIDIA / Vera / Rubin / compute infrastructure',
  '### 3. Amazon / Alexa / FAQ / generative audio product',
  '### 4. OpenAI / Codex / Appshots / agent platform',
  '### 5. Xinhua / robotics deployment / AI education deployment',
  'Evidence item 1: Anthropic / Project / Glasswing / model capability update',
  'Evidence item 5: Xinhua / robotics deployment / AI education deployment',
  '## Today’s Bottom Line',
  '## What to Watch Tomorrow',
  '## Evidence Matrix',
];

const failures = [];
for (const phrase of banned) {
  if (body.includes(phrase)) failures.push(`banned phrase leaked: ${phrase}`);
}
for (const phrase of required) {
  if (!body.includes(phrase)) failures.push(`missing fixture output: ${phrase}`);
}

const storyCount = (body.match(/^### \d+\./gm) || []).length;
const evidenceCount = (body.match(/^- Evidence item \d+:/gm) || []).length;
if (storyCount !== 5) failures.push(`expected 5 Top Stories, found ${storyCount}`);
if (evidenceCount !== 5) failures.push(`expected 5 Evidence Matrix items, found ${evidenceCount}`);

if (failures.length > 0) {
  console.error('Daily generator real cron fixture check failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('daily generator real cron fixture check passed');
