#!/usr/bin/env node
import { realCronFixtures } from './fixtures/daily-real-cron-fixtures.mjs';
import { sourceProjectionRuleMatchNames } from './lib/source-projection-rules.mjs';

const allowedRuleMatches = new Map([
  ['2026-05-29::Anthropic 发布 Claude Opus 4.8', ['claude-opus-4-8']],
  ['2026-05-29::NVIDIA 发布机器人 sim-to-real 研究进展', ['nvidia-icra-sim-to-real']],
  ['2026-05-30::Anthropic 发布 Claude Opus 4.8', ['claude-opus-4-8']],
  ['2026-05-30::Anthropic 宣布完成 650亿美元 H 轮融资，估值 9650亿美元', ['anthropic-series-h']],
  ['2026-05-30::中国两部门发文布局 AI 计量能力建设', ['china-ai-metrology-guide']],
  ['2026-05-30::Amazon 强调“可靠智能体”，披露多类真实业务案例', ['amazon-nova-act-agentic-ai']],
  ['2026-05-30::NVIDIA 发布 ICRA 机器人研究进展，重点推进 sim-to-real', ['nvidia-icra-sim-to-real']],
  ['2026-05-31::Anthropic 发布 Claude Opus 4.8', ['claude-opus-4-8']],
  ['2026-05-31::Anthropic 宣布 650亿美元 H 轮融资，估值 9650亿美元', ['anthropic-series-h']],
  ['2026-05-31::OpenAI 更新 Codex：Windows 端支持 Computer Use', ['openai-codex-windows-computer-use']],
  ['2026-05-31::中国—东盟人工智能产业创新中心成立', ['china-asean-ai-innovation-center']],
  ['2026-05-31::NVIDIA 机器人研究强调 sim-to-real，加速真实世界机器人落地', ['nvidia-icra-sim-to-real']],
  ['2026-06-02::Anthropic 已向 SEC 秘密提交 IPO 草案', ['anthropic-sec-ipo-s1']],
  ['2026-06-02::OpenAI 模型正式进入 Amazon Bedrock', ['openai-amazon-bedrock-models']],
  ['2026-06-02::NVIDIA 扩大全球 AI Cloud 生态', ['nvidia-ai-cloud-ecosystem']],
  ['2026-06-02::ChatGPT 增加求职与简历能力', ['chatgpt-jobs-resume-tools']],
  ['2026-06-02::中国 AI 产业报告称企业数超 6000 家、核心规模超 1.2 万亿元【待确认】', ['china-ai-industry-report-l3']],
  ['2026-06-03::NVIDIA 与 Microsoft 把“智能体 AI”推向 Windows、Azure 和本地部署', ['nvidia-microsoft-agentic-windows-azure']],
  ['2026-06-03::NVIDIA 推出 NemoClaw 路线，工业软件开始做“自主 AI 工程师”', ['nvidia-nemoclaw-industrial-agents']],
  ['2026-06-03::NVIDIA AI Cloud 生态扩张，AI 基建继续向“区域化/主权化”推进', ['nvidia-ai-cloud-ecosystem']],
  ['2026-06-03::OpenAI 给 ChatGPT 增加“活跃会话管理”', ['openai-chatgpt-active-sessions']],
  ['2026-06-03::国家数据局强调：高质量数据集是具身智能、AI for Science 的基础', ['china-national-data-administration-embodied-ai']],
  ['2026-06-04::NVIDIA 在 CVPR 发布物理 AI / 机器人研究进展', ['nvidia-cvpr-physical-ai-2026']],
  ['2026-06-04::Meta 推出 / 扩展 Meta Business Agent', ['meta-business-agent-2026']],
  ['2026-06-04::OpenAI 呼吁建立国际青少年 AI 安全机制', ['openai-youth-safety-g7-2026']],
  ['2026-06-04::Microsoft 强调企业 AI 的重点从模型转向“Agent 系统”', ['microsoft-enterprise-agent-system-2026']],
  ['2026-06-04::上海上交会聚焦脑机接口、大模型、智能网联等硬科技', ['shanghai-tech-fair-2026-hard-tech']],
]);

function storyBlockFor(fixtureText, title) {
  const titleIndex = fixtureText.indexOf(title);
  if (titleIndex === -1) return '';
  const rest = fixtureText.slice(titleIndex);
  const nextSeparator = rest.indexOf('\n---', title.length);
  if (nextSeparator !== -1) return rest.slice(0, nextSeparator);
  const nextMajorSection = rest.search(/\n##\s+/);
  if (nextMajorSection !== -1) return rest.slice(0, nextMajorSection);
  return rest;
}

const failures = [];

for (const fixture of realCronFixtures) {
  for (const signal of fixture.expectedSignals || []) {
    const key = `${fixture.fixtureDate}::${signal.title}`;
    const block = storyBlockFor(fixture.realCronFixture, signal.title);
    if (!block) {
      failures.push(`${key} — story block not found`);
      continue;
    }
    const expected = allowedRuleMatches.get(key) || [];
    const actual = sourceProjectionRuleMatchNames(block);
    const unexpected = actual.filter((name) => !expected.includes(name));
    const missing = expected.filter((name) => !actual.includes(name));
    if (unexpected.length > 0 || missing.length > 0) {
      failures.push(`${key} — expected [${expected.join(', ') || 'none'}], got [${actual.join(', ') || 'none'}]`);
    }
  }
}

if (failures.length > 0) {
  console.error('source projection rule scope check failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('source projection rule scope check passed');
