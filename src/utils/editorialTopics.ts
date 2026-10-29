export type TopicId = 'agents' | 'models' | 'workflows';
export type SiteLanguage = 'en' | 'zh';
export const topics = [
  { id: 'agents' as TopicId, label: { zh: 'AI 编程与 Harness', en: 'Coding & Harnesses' },
    description: { zh: '比较 Agent 工具的工作流、插件、上下文与权限，分清现成功能和需要自行建设的部分。', en: 'Compare coding agents, plugins, context and permissions. Separate ready-to-use features from the infrastructure you must build.' },
    seeds: ['agents-md-team-guide', 'agentic-engineering-tools-comparison', 'claude-code-cursor-plugin-broken-fix-2026', 'deerflow-2-superagent-harness-deep-dive-2026', 'ai-analysis-tanstack-ai-1-stable-upgrade-boundaries-2026-10-29'] },
  { id: 'models' as TopicId, label: { zh: '模型与本地部署', en: 'Models & Local AI' },
    description: { zh: '从任务和硬件出发选择模型，核对权重、许可、量化、上下文与推理接口。', en: 'Choose models for your tasks and hardware. Check weights, licensing, quantization, context and inference interfaces.' },
    seeds: ['openclaw-ollama-local-deployment', 'best-ai-models-for-openclaw', 'enterprise-llm-selection-openai-anthropic-google-microsoft-2026', 'openclaw-raspberry-pi-local-ai-agent-guide', 'openclaw-model-fallback-strategy'] },
  { id: 'workflows' as TopicId, label: { zh: '自动化与工程方法', en: 'Automation & Engineering' },
    description: { zh: '检查任务执行、消息投递与恢复过程，用测试和证据验证结果，保留适用条件。', en: 'Check execution, delivery and recovery. Verify outcomes with tests and evidence, including the conditions and limits.' },
    seeds: ['agentic-engineering-guide', 'agentic-engineering-team-adoption', 'openclaw-telegram-409-conflict-getupdates-fix-2026', 'openclaw-delivery-reliability-silent-loss-replay-fix-2026', 'openclaw-systemd-service-crash-recovery-monitoring', 'openclaw-clawhub-skill-security-guide', 'telegram-ai-automation-for-business-playbook', 'openclaw-vps-deployment-complete-guide'] },
];
export function articleSlug(id: string) { return id.replace(/^(zh|en)\//, '').replace(/\.md$/, ''); }
export function belongsToTopic(post: { id: string; data: { pillar?: string } }, id: TopicId) {
  return post.data.pillar === id || topics.find(topic => topic.id === id)!.seeds.includes(articleSlug(post.id));
}
