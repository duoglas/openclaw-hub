const FIELD_PROJECTION_RULES = [
  {
    name: 'claude-opus-4-8',
    terms: ['Claude Opus 4.8'],
    details: {
      what: 'Anthropic released Claude Opus 4.8 on May 28, positioning it as stronger than Opus 4.7 for coding, agent tasks, and professional workflows while adding effort control, Claude Code dynamic workflows, and fast mode pricing changes.',
      why: 'The release shows frontier model competition shifting from chat quality toward long-running tasks, codebase-level work, and enterprise agents that expose more explicit effort and cost controls.',
      impact: 'Developers and enterprise teams can evaluate Claude on code migration, legal review, financial analysis, and complex document workflows where uncertainty handling, review trails, and human approval matter.',
    },
  },
  {
    name: 'anthropic-series-h',
    terms: ['Series H', 'H 轮融资'],
    details: {
      what: 'Anthropic announced a Series H round described in the source as 65 billion USD with a 965 billion USD post-money valuation, with annualized revenue cited above 47 billion USD earlier in the month.',
      why: 'The funding signal keeps the AI race centered on capital-intensive model training, compute access, safety research, interpretability, and distribution through enterprise partners.',
      impact: 'Infrastructure suppliers, memory vendors, cloud platforms, and enterprise AI application partners may see stronger demand, while smaller model providers face higher financing and differentiation pressure.',
    },
  },
  {
    name: 'china-ai-metrology-guide',
    terms: ['计量体系', '计量能力', '测不准'],
    details: {
      what: 'China’s SAMR and NDRC issued an AI metrology and capability-building guide that targets measurement gaps, data scarcity, AI standards, test datasets, and metrology service infrastructure.',
      why: 'The policy moves AI deployment toward measurable, comparable, and traceable evaluation, which is necessary before high-stakes systems enter healthcare, transport, manufacturing, and public services.',
      impact: 'AI vendors in China should expect more testing, certification, data-quality, reliability, and explainability requirements instead of relying only on parameter counts or benchmark claims.',
    },
  },
  {
    name: 'amazon-nova-act-agentic-ai',
    terms: ['Nova Act', '3M', 'Accenture', 'Bandsintown'],
    details: {
      what: 'Amazon described its agentic AI approach around Amazon Nova Act, AWS AI infrastructure, simulation training environments, and real business examples from 3M, Accenture, Bandsintown, and Amazon compliance teams.',
      why: 'The agent narrative is moving from demos to dependable execution: planning, tool use, workflow completion, infrastructure reliability, security controls, and operating cost are now evaluated together.',
      impact: 'Enterprises can start with bounded workflows such as compliance checks, customer support, shopping assistance, code delivery, and information retrieval where success criteria and escalation paths are clear.',
    },
  },
  {
    name: 'nvidia-icra-sim-to-real',
    terms: ['ICRA', 'sim-to-real'],
    details: {
      what: 'NVIDIA highlighted eight ICRA robotics papers focused on sim-to-real transfer, including multi-arm scheduling, navigation across robot forms, complex grasping, precision assembly, and vision-language-action models.',
      why: 'Robotics deployment is constrained by expensive real-world data, reliability, and generalization, so simulation training plus real-world correction is becoming a core path to physical AI.',
      impact: 'Manufacturing, warehousing, medical labs, agriculture, and inspection teams can watch for robotics stacks that combine simulation, validation data, and task-specific deployment guardrails.',
    },
  },
  {
    name: 'openai-codex-windows-computer-use',
    terms: ['Windows 版 Codex', 'Computer Use', 'Codex app'],
    details: {
      what: 'OpenAI release notes say the Codex Windows app now supports Computer Use, allowing the agent to see, click, and type in Windows applications while adding remote-control, profile, performance, and stability updates.',
      why: 'Coding assistants are moving beyond editor completions into desktop-level execution, where testing, debugging, local application control, remote monitoring, permissions, and security boundaries all become product requirements.',
      impact: 'Developer teams can pilot Codex on bounded Windows workflows such as test reproduction, local app debugging, cross-device task handoff, and supervised automation while tracking permission scope and regional availability.',
    },
  },
  {
    name: 'anthropic-sec-ipo-s1',
    terms: ['Form S-1', '潜在 IPO', 'SEC 秘密提交'],
    details: {
      what: 'Anthropic said on June 1 that it confidentially submitted a draft Form S-1 registration statement to the US SEC for a potential IPO, with share count and pricing still undecided.',
      why: 'The filing moves a leading AI lab closer to public-market scrutiny, where revenue quality, losses, compute commitments, governance controls, and regulatory exposure become part of the adoption signal.',
      impact: 'Enterprise buyers and infrastructure partners should watch whether Anthropic discloses revenue mix, cloud commitments, model-margin pressure, safety spending, and IPO timing before treating the signal as a capacity or procurement catalyst.',
    },
  },
  {
    name: 'openai-amazon-bedrock-models',
    terms: ['Amazon Bedrock', 'AWS 身份', '网络隔离'],
    details: {
      what: 'AWS made GPT-5.5, GPT-5.4, and Codex available in Amazon Bedrock with OpenAI-matched pricing and enterprise access through AWS identity, network isolation, audit, and encryption controls.',
      why: 'OpenAI distribution is moving deeper into cloud procurement channels, turning model choice into a managed-cloud governance decision rather than a standalone API integration.',
      impact: 'AI teams can compare OpenAI, Anthropic, Meta, Mistral, and other models inside one cloud control plane while measuring permissions, audit logs, latency, data boundaries, and unit economics.'
    },
  },
  {
    name: 'nvidia-microsoft-agentic-windows-azure',
    terms: ['RTX Spark', 'DGX Station', 'Microsoft Fabric', 'Foundry'],
    details: {
      what: 'NVIDIA said its Microsoft Build / GTC Taipei updates expand the joint AI stack across RTX Spark, DGX Station for Windows, Microsoft Fabric GPU acceleration, NVIDIA open models on Foundry, and NVIDIA OpenShell security runtime support in GitHub Copilot.',
      why: 'The update turns agentic AI into a deployment stack across local Windows PCs, Azure services, Fabric data workflows, and private or hybrid enterprise environments rather than a standalone model release.',
      impact: 'Developers can evaluate Windows-local agent workflows, while enterprises compare hybrid patterns around local data, cloud compute, security sandboxes, governance controls, and rollout economics.',
    },
  },
  {
    name: 'nvidia-nemoclaw-industrial-agents',
    terms: ['NemoClaw', 'Cadence', 'Dassault', 'Siemens', 'Synopsys'],
    details: {
      what: 'NVIDIA said Cadence, Dassault Systèmes, Siemens, Synopsys, and other industrial software vendors are using NVIDIA NemoClaw / OpenShell to build long-task agents for design, simulation, EDA, manufacturing, and engineering workflows.',
      why: 'AI agents are moving beyond chat, writing, and coding into CAD operations, mesh generation, simulation setup, debugging, and report production.',
      impact: 'Industrial AI adoption may depend less on raw model capability and more on safe runtimes, tool permissions, deterministic workflow integration, audit logs, and domain-specific validation.',
    },
  },
  {
    name: 'nvidia-ai-cloud-ecosystem',
    terms: ['AI Cloud', 'AI factory', '六大洲'],
    details: {
      what: 'NVIDIA said partners are expanding AI factories and AI clouds across six continents for training, inference, agents, physical AI, and sovereign AI workloads.',
      why: 'The competitive bottleneck is shifting from model announcements toward reliable token production, regional cloud capacity, sovereign AI infrastructure, and end-to-end inference economics.',
      impact: 'Enterprises may increasingly buy AI capacity as a managed production layer rather than raw GPUs, making partner geography, data residency, cost per token, and service reliability key selection criteria.',
    },
  },
  {
    name: 'openai-chatgpt-active-sessions',
    terms: ['Active sessions', '活跃会话', 'Settings > Security'],
    details: {
      what: 'OpenAI said on June 2 that ChatGPT now includes Active sessions under Settings > Security > Active sessions, allowing users to review signed-in sessions and log out individual or unknown devices.',
      why: 'AI accounts increasingly contain files, code, API-related workflows, business drafts, and personal context, so session control is becoming a core AI product safety feature rather than a minor account setting.',
      impact: 'Individual users should periodically review ChatGPT login sessions, while enterprise users will likely demand stronger session controls, permission visibility, auditability, and incident response features from AI tools.',
    },
  },
  {
    name: 'china-national-data-administration-embodied-ai',
    terms: ['国家数据局', '刘烈宏', 'National Data Administration', 'AI for Science'],
    details: {
      what: 'Xinhua reported that Liu Liehong, head of China’s National Data Administration, said high-quality datasets are a critical foundation for embodied intelligence’s perception-decision-action loop and for data engineering in AI for Science.',
      why: 'China’s AI policy focus continues to broaden from large models toward datasets, sector-specific scenarios, embodied intelligence, and scientific research infrastructure.',
      impact: 'Industrial manufacturing, transportation, culture and tourism, and research organizations may invest more in dataset construction, data governance, annotation, synthetic data, and privacy-preserving data platforms.',
    },
  },
  {
    name: 'chatgpt-jobs-resume-tools',
    terms: ['实时职位', '自由职业机会', '简历格式化'],
    details: {
      what: 'OpenAI release notes say ChatGPT can help US users find real-time jobs and freelance opportunities, and can format and download English resumes for users globally.',
      why: 'Consumer AI is moving from general Q&A into concrete career workflows where search, matching, rewriting, formatting, and decision support happen inside one assistant experience.',
      impact: 'Users can test ChatGPT on bounded job-search steps such as role filtering, JD-specific resume rewrites, project-description cleanup, and English resume export while checking regional availability and source quality.',
    },
  },
  {
    name: 'china-ai-industry-report-l3',
    terms: ['6000 家', '1.2 万亿元', '待确认'],
    details: {
      what: 'A secondary L3 source says China has more than 6,000 AI companies and a core AI industry scale above 1.2 trillion yuan, while the original official report link was not captured in this brief.',
      why: 'The signal is useful for tracking China AI industrial scale, regional clusters, embodied AI, compute policy, and industrial-park momentum, but it needs source confirmation before being treated as a hard benchmark.',
      impact: 'Teams should mark the item as unconfirmed, monitor official report publication, and use it only as a directional watchpoint for policy, infrastructure, robotics, and intelligent manufacturing demand.',
    },
  },
  {
    name: 'china-asean-ai-innovation-center',
    terms: ['中国—东盟人工智能产业创新中心', '东盟', '多边合作平台'],
    details: {
      what: 'China’s MIIT said the China-ASEAN AI Industry Innovation Center was established in Beijing on May 24 as a multilateral platform for technology R&D, industrial ecosystems, governance practice, and regional capability building.',
      why: 'The signal shifts China’s AI export and regional cooperation from individual product rollout toward shared industry platforms, standards governance, infrastructure coordination, and capability-building mechanisms.',
      impact: 'ASEAN markets may become important deployment sites for Chinese foundation models, industrial AI, and intelligent infrastructure, while governance alignment and standards cooperation become part of market entry planning.',
    },
  },
  {
    name: 'nvidia-cvpr-physical-ai-2026',
    terms: ['GraspGen-X', 'LCDrive', 'NitroGen', 'CVPR 论文'],
    details: {
      what: 'NVIDIA Research highlighted three CVPR papers: GraspGen-X for zero-shot robotic grasping, LCDrive for lower-token autonomous-driving inference, and NitroGen for training embodied agents in virtual environments.',
      why: 'The update shows physical AI moving from isolated perception models toward full robotics and autonomous-driving pipelines that combine simulation, data generation, inference efficiency, and deployment validation.',
      impact: 'Robotics and autonomous-driving teams can watch whether these methods reduce retraining cost for new grippers, improve decision latency, and make simulation-to-real-world training easier to operationalize.',
    },
  },
  {
    name: 'meta-business-agent-2026',
    terms: ['Meta Business Agent', 'WhatsApp、Messenger、Instagram', 'Shopify、Zendesk、Shopee'],
    details: {
      what: 'Meta said it is expanding Meta Business Agent globally across WhatsApp, Messenger, Instagram, and partner systems including Shopify, Zendesk, and Shopee for Q&A, product recommendations, bookings, and lead qualification.',
      why: 'The announcement moves customer-service agents closer to daily commerce channels, with Meta citing more than 1 billion business conversations each day across WhatsApp, Messenger, and Instagram.',
      impact: 'Small businesses, support teams, and cross-border commerce sellers may gain faster automated sales assistance, while vendors will compete on channel coverage, handoff quality, pricing, and customer-data controls.',
    },
  },
  {
    name: 'openai-youth-safety-g7-2026',
    terms: ['国际青少年 AI 安全', '年龄识别', '年度风险评估', '家长控制'],
    details: {
      what: 'OpenAI published a pre-G7 proposal for international youth AI safety collaboration, emphasizing age identification, default protections, annual risk assessment, parental controls, and shared research mechanisms.',
      why: 'AI safety scrutiny is expanding from model capability and misuse toward who uses the product, how minors are protected, and which responsibilities belong to providers, schools, parents, and regulators.',
      impact: 'Education, companion, and social AI products should expect stronger requirements around age assurance, teen defaults, parental controls, risk reporting, and child-safety evaluation before broad rollout.',
    },
  },
  {
    name: 'microsoft-enterprise-agent-system-2026',
    terms: ['AI alone won’t change your business', 'Agent 系统', 'Azure、GitHub、Microsoft 365'],
    details: {
      what: 'Microsoft argued that enterprise AI value depends on governable agent systems rather than standalone models, tying Azure, GitHub, Microsoft 365, Security, Fabric, identity, permissions, data, audit, and human oversight into one operating layer.',
      why: 'The enterprise AI budget is shifting from model trials to production-system redesign, where observability, governance, identity, permissions, and workflow integration decide whether agents can be trusted at scale.',
      impact: 'Enterprise buyers may weigh platform governance and workflow integration more heavily than model benchmark scores, strengthening bundled stacks that connect developer tools, office workflows, data platforms, and security controls.',
    },
  },
  {
    name: 'shanghai-tech-fair-2026-hard-tech',
    terms: ['第十二届上交会', '脑机接口', '长三角协同创新专区'],
    details: {
      what: 'Shanghai’s government press briefing said the 12th China Shanghai International Technology Fair will feature brain-computer interfaces, biomedicine, industrial robots, large models, new displays, intelligent connected vehicles, and Yangtze River Delta innovation zones.',
      why: 'The fair is a useful China hard-tech signal because it connects AI, robotics, brain-computer interfaces, technology transfer, regional industrial policy, and commercialization channels rather than only model releases.',
      impact: 'Brain-computer interface vendors, industrial robotics teams, AI technology-transfer services, and Yangtze River Delta innovation programs may receive more policy, capital, and partnership attention.',
    },
  },
];

export function projectEnglishSourceDetail(source, key) {
  const text = String(source || '');
  const normalizedKey = key === 'why' || key === 'impact' ? key : 'what';
  const rule = FIELD_PROJECTION_RULES.find(({ terms }) => terms.some((term) => text.includes(term)));
  return rule?.details?.[normalizedKey] || '';
}

export function sourceProjectionRuleNames() {
  return FIELD_PROJECTION_RULES.map((rule) => rule.name);
}
