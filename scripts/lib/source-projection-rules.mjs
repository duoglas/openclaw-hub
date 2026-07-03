export const FIELD_PROJECTION_RULES = [
  {
    name: 'claude-opus-4-8',
    owner: 'daily-source-projection',
    category: 'frontier-models',
    splitTargetCategory: 'frontier-model-task-capability',
    terms: ['Claude Opus 4.8'],
    details: {
      what: 'Anthropic released Claude Opus 4.8 on May 28, positioning it as stronger than Opus 4.7 for coding, agent tasks, and professional workflows while adding effort control, Claude Code dynamic workflows, and fast mode pricing changes.',
      why: 'The release shows frontier model competition shifting from chat quality toward long-running tasks, codebase-level work, and enterprise agents that expose more explicit effort and cost controls.',
      impact: 'Developers and enterprise teams can evaluate Claude on code migration, legal review, financial analysis, and complex document workflows where uncertainty handling, review trails, and human approval matter.',
    },
  },
  {
    name: 'anthropic-series-h',
    owner: 'daily-source-projection',
    category: 'company-finance',
    splitTargetCategory: 'ai-lab-private-financing',
    terms: ['Series H', 'H 轮融资'],
    details: {
      what: 'Anthropic announced a Series H round described in the source as 65 billion USD with a 965 billion USD post-money valuation, with annualized revenue cited above 47 billion USD earlier in the month.',
      why: 'The funding signal keeps the AI race centered on capital-intensive model training, compute access, safety research, interpretability, and distribution through enterprise partners.',
      impact: 'Infrastructure suppliers, memory vendors, cloud platforms, and enterprise AI application partners may see stronger demand, while smaller model providers face higher financing and differentiation pressure.',
    },
  },
  {
    name: 'china-ai-metrology-guide',
    owner: 'daily-source-projection',
    category: 'policy-governance',
    splitTargetCategory: 'ai-policy-standards',
    terms: ['计量体系', '计量能力', '测不准'],
    details: {
      what: 'China’s SAMR and NDRC issued an AI metrology and capability-building guide that targets measurement gaps, data scarcity, AI standards, test datasets, and metrology service infrastructure.',
      why: 'The policy moves AI deployment toward measurable, comparable, and traceable evaluation, which is necessary before high-stakes systems enter healthcare, transport, manufacturing, and public services.',
      impact: 'AI vendors in China should expect more testing, certification, data-quality, reliability, and explainability requirements instead of relying only on parameter counts or benchmark claims.',
    },
  },
  {
    name: 'amazon-nova-act-agentic-ai',
    owner: 'daily-source-projection',
    category: 'enterprise-agents',
    splitTargetCategory: 'vertical-workflow-agents',
    terms: ['Nova Act', '3M', 'Accenture', 'Bandsintown'],
    details: {
      what: 'Amazon described its agentic AI approach around Amazon Nova Act, AWS AI infrastructure, simulation training environments, and real business examples from 3M, Accenture, Bandsintown, and Amazon compliance teams.',
      why: 'The agent narrative is moving from demos to dependable execution: planning, tool use, workflow completion, infrastructure reliability, security controls, and operating cost are now evaluated together.',
      impact: 'Enterprises can start with bounded workflows such as compliance checks, customer support, shopping assistance, code delivery, and information retrieval where success criteria and escalation paths are clear.',
    },
  },
  {
    name: 'nvidia-icra-sim-to-real',
    owner: 'daily-source-projection',
    category: 'physical-ai-robotics',
    splitTargetCategory: 'robotics-simulation-training',
    terms: ['ICRA', 'sim-to-real'],
    details: {
      what: 'NVIDIA highlighted eight ICRA robotics papers focused on sim-to-real transfer, including multi-arm scheduling, navigation across robot forms, complex grasping, precision assembly, and vision-language-action models.',
      why: 'Robotics deployment is constrained by expensive real-world data, reliability, and generalization, so simulation training plus real-world correction is becoming a core path to physical AI.',
      impact: 'Manufacturing, warehousing, medical labs, agriculture, and inspection teams can watch for robotics stacks that combine simulation, validation data, and task-specific deployment guardrails.',
    },
  },
  {
    name: 'openai-codex-windows-computer-use',
    owner: 'daily-source-projection',
    category: 'developer-tools',
    splitTargetCategory: 'desktop-computer-use',
    terms: ['Windows 版 Codex', 'Computer Use', 'Codex app'],
    details: {
      what: 'OpenAI release notes say the Codex Windows app now supports Computer Use, allowing the agent to see, click, and type in Windows applications while adding remote-control, profile, performance, and stability updates.',
      why: 'Coding assistants are moving beyond editor completions into desktop-level execution, where testing, debugging, local application control, remote monitoring, permissions, and security boundaries all become product requirements.',
      impact: 'Developer teams can pilot Codex on bounded Windows workflows such as test reproduction, local app debugging, cross-device task handoff, and supervised automation while tracking permission scope and regional availability.',
    },
  },
  {
    name: 'anthropic-sec-ipo-s1',
    owner: 'daily-source-projection',
    category: 'company-finance',
    splitTargetCategory: 'public-market-readiness',
    terms: ['Form S-1', '潜在 IPO', 'SEC 秘密提交'],
    details: {
      what: 'Anthropic said on June 1 that it confidentially submitted a draft Form S-1 registration statement to the US SEC for a potential IPO, with share count and pricing still undecided.',
      why: 'The filing moves a leading AI lab closer to public-market scrutiny, where revenue quality, losses, compute commitments, governance controls, and regulatory exposure become part of the adoption signal.',
      impact: 'Enterprise buyers and infrastructure partners should watch whether Anthropic discloses revenue mix, cloud commitments, model-margin pressure, safety spending, and IPO timing before treating the signal as a capacity or procurement catalyst.',
    },
  },
  {
    name: 'openai-amazon-bedrock-models',
    owner: 'daily-source-projection',
    category: 'cloud-infrastructure',
    splitTargetCategory: 'cloud-model-distribution',
    terms: ['Amazon Bedrock', 'AWS 身份', '网络隔离'],
    details: {
      what: 'AWS made GPT-5.5, GPT-5.4, and Codex available in Amazon Bedrock with OpenAI-matched pricing and enterprise access through AWS identity, network isolation, audit, and encryption controls.',
      why: 'OpenAI distribution is moving deeper into cloud procurement channels, turning model choice into a managed-cloud governance decision rather than a standalone API integration.',
      impact: 'AI teams can compare OpenAI, Anthropic, Meta, Mistral, and other models inside one cloud control plane while measuring permissions, audit logs, latency, data boundaries, and unit economics.'
    },
  },
  {
    name: 'nvidia-microsoft-agentic-windows-azure',
    owner: 'daily-source-projection',
    category: 'cloud-infrastructure',
    splitTargetCategory: 'ai-infrastructure-capacity',
    terms: ['RTX Spark', 'DGX Station', 'Microsoft Fabric', 'NVIDIA OpenShell'],
    details: {
      what: 'NVIDIA said its Microsoft Build / GTC Taipei updates expand the joint AI stack across RTX Spark, DGX Station for Windows, Microsoft Fabric GPU acceleration, NVIDIA open models on Foundry, and NVIDIA OpenShell security runtime support in GitHub Copilot.',
      why: 'The update turns agentic AI into a deployment stack across local Windows PCs, Azure services, Fabric data workflows, and private or hybrid enterprise environments rather than a standalone model release.',
      impact: 'Developers can evaluate Windows-local agent workflows, while enterprises compare hybrid patterns around local data, cloud compute, security sandboxes, governance controls, and rollout economics.',
    },
  },
  {
    name: 'nvidia-palantir-nemotron-secure-government-2026',
    owner: 'daily-source-projection',
    category: 'product-safety',
    splitTargetCategory: 'high-sensitivity-ai-deployment',
    displayLabel: 'NVIDIA / Palantir / secure government AI',
    terms: ['Palantir 新智能引擎', 'NVIDIA Nemotron 开放模型', '关键基础设施运营方'],
    details: {
      what: 'NVIDIA said Palantir’s new intelligence engine will use NVIDIA Nemotron open models for US government agencies and critical-infrastructure operators, supporting deployment in isolated, auditable, customer-owned infrastructure.',
      why: 'The signal turns open models into a secure-sovereign deployment pattern for agencies and regulated industries that cannot send sensitive workflows into generic closed cloud endpoints.',
      impact: 'Government, energy, transport, healthcare, and defense-adjacent teams should compare open-model control, audit logs, data residency, access boundaries, and on-premise operations before adopting AI in high-sensitivity workflows.',
    },
  },
  {
    name: 'anthropic-claude-azure-gb300-foundry-2026',
    owner: 'daily-source-projection',
    category: 'frontier-models',
    splitTargetCategory: 'frontier-model-cloud-distribution',
    displayLabel: 'Anthropic / Claude / Azure GB300 deployment',
    terms: ['Claude 模型在 Azure', 'Microsoft Foundry', 'GB300 Blackwell Ultra'],
    details: {
      what: 'NVIDIA said Anthropic Claude models are now available in Microsoft Foundry on Azure infrastructure powered by NVIDIA GB300 Blackwell Ultra GPUs.',
      why: 'Frontier models are moving deeper into cloud-native enterprise procurement, where model access, GPU capacity, governance, latency, and agent platform integration are bundled into the same deployment decision.',
      impact: 'Enterprise AI teams can evaluate Claude as an Azure-native agent foundation while watching infrastructure availability, procurement terms, data-control boundaries, and competitive pressure on smaller model providers.',
    },
  },
  {
    name: 'china-yisuan-ark-domestic-compute-software-2026',
    owner: 'daily-source-projection',
    category: 'developer-tools',
    splitTargetCategory: 'domestic-compute-software',
    displayLabel: 'China / Xinhua / AI for Science software stack',
    terms: ['异算方舟', '国产异构算力', '代码转换大模型'],
    details: {
      what: 'Xinhua reported that Chinese research institutes and Sugon released Yisuan Ark, a full-stack software platform for domestic heterogeneous compute environments with algorithm libraries, a code-conversion large model, and automated simulation-agent capabilities.',
      why: 'China’s AI-for-Science and engineering-compute bottleneck is not only chips; software migration, scientific toolchains, workload adaptation, and reproducible validation decide whether domestic GPUs can run production workloads.',
      impact: 'Research, simulation, and engineering teams can test one reproducible library or workflow first, then measure conversion quality, dependency compatibility, runtime performance, and result consistency before scaling migration.',
    },
  },
  {
    name: 'nvidia-nemoclaw-industrial-agents',
    owner: 'daily-source-projection',
    category: 'enterprise-agents',
    splitTargetCategory: 'vertical-workflow-agents',
    terms: ['NemoClaw', 'Cadence', 'Dassault', 'Siemens', 'Synopsys'],
    details: {
      what: 'NVIDIA said Cadence, Dassault Systèmes, Siemens, Synopsys, and other industrial software vendors are using NVIDIA NemoClaw / OpenShell to build long-task agents for design, simulation, EDA, manufacturing, and engineering workflows.',
      why: 'AI agents are moving beyond chat, writing, and coding into CAD operations, mesh generation, simulation setup, debugging, and report production.',
      impact: 'Industrial AI adoption may depend less on raw model capability and more on safe runtimes, tool permissions, deterministic workflow integration, audit logs, and domain-specific validation.',
    },
  },
  {
    name: 'nvidia-ai-cloud-ecosystem',
    owner: 'daily-source-projection',
    category: 'cloud-infrastructure',
    splitTargetCategory: 'ai-infrastructure-capacity',
    displayLabels: [
      {
        label: 'NVIDIA / HPE / AI infrastructure capacity',
        terms: ['HPE AI Factory with NVIDIA', 'NVIDIA Agent Toolkit'],
      },
    ],
    terms: ['AI Cloud', 'AI factory', '六大洲', 'HPE AI Factory with NVIDIA'],
    details: {
      what: 'NVIDIA said partners are expanding AI factories and AI clouds across six continents for training, inference, agents, physical AI, and sovereign AI workloads.',
      why: 'The competitive bottleneck is shifting from model announcements toward reliable token production, regional cloud capacity, sovereign AI infrastructure, and end-to-end inference economics.',
      impact: 'Enterprises may increasingly buy AI capacity as a managed production layer rather than raw GPUs, making partner geography, data residency, cost per token, and service reliability key selection criteria.',
    },
  },
  {
    name: 'openai-chatgpt-active-sessions',
    owner: 'daily-source-projection',
    category: 'product-safety',
    splitTargetCategory: 'model-account-security',
    terms: ['Active sessions', '活跃会话', 'Settings > Security'],
    details: {
      what: 'OpenAI said on June 2 that ChatGPT now includes Active sessions under Settings > Security > Active sessions, allowing users to review signed-in sessions and log out individual or unknown devices.',
      why: 'AI accounts increasingly contain files, code, API-related workflows, business drafts, and personal context, so session control is becoming a core AI product safety feature rather than a minor account setting.',
      impact: 'Individual users should periodically review ChatGPT login sessions, while enterprise users will likely demand stronger session controls, permission visibility, auditability, and incident response features from AI tools.',
    },
  },
  {
    name: 'xinhua-china-ai-education-service-robotics',
    owner: 'daily-source-projection',
    category: 'physical-ai-robotics',
    splitTargetCategory: 'robotics-commercial-deployment',
    terms: ['教育、文旅、养老', '服务效率'],
    details: {
      what: 'Source 5 reports a robotics deployment, AI education deployment signal involving China, Xinhua, education, culture and tourism, elderly care, and service-efficiency scenarios.',
      why: 'The item shows AI adoption expanding from model and platform news into public-service and local-industry use cases where deployment quality, responsibility boundaries, and offline service outcomes matter.',
      impact: 'Product and operations teams should evaluate user experience, privacy protection, human handoff, service accountability, and measurable efficiency before scaling similar AI deployments.',
    },
  },
  {
    name: 'china-national-data-administration-embodied-ai',
    owner: 'daily-source-projection',
    category: 'policy-governance',
    splitTargetCategory: 'ai-industrial-policy',
    displayLabel: 'Xinhua / China / Science / embodied AI',
    terms: ['国家数据局', '刘烈宏', 'National Data Administration'],
    details: {
      what: 'Xinhua reported that Liu Liehong, head of China’s National Data Administration, said high-quality datasets are a critical foundation for embodied intelligence’s perception-decision-action loop and for data engineering in AI for Science.',
      why: 'China’s AI policy focus continues to broaden from large models toward datasets, sector-specific scenarios, embodied intelligence, and scientific research infrastructure.',
      impact: 'Industrial manufacturing, transportation, culture and tourism, and research organizations may invest more in dataset construction, data governance, annotation, synthetic data, and privacy-preserving data platforms.',
    },
  },
  {
    name: 'chatgpt-jobs-resume-tools',
    owner: 'daily-source-projection',
    category: 'consumer-productivity',
    splitTargetCategory: 'career-productivity-workflows',
    terms: ['实时职位', '自由职业机会', '简历格式化'],
    details: {
      what: 'OpenAI release notes say ChatGPT can help US users find real-time jobs and freelance opportunities, and can format and download English resumes for users globally.',
      why: 'Consumer AI is moving from general Q&A into concrete career workflows where search, matching, rewriting, formatting, and decision support happen inside one assistant experience.',
      impact: 'Users can test ChatGPT on bounded job-search steps such as role filtering, JD-specific resume rewrites, project-description cleanup, and English resume export while checking regional availability and source quality.',
    },
  },
  {
    name: 'china-ai-industry-report-l3',
    owner: 'daily-source-projection',
    category: 'market-intelligence',
    splitTargetCategory: 'market-sizing-reports',
    terms: ['6000 家', '1.2 万亿元', '待确认'],
    details: {
      what: 'A secondary L3 source says China has more than 6,000 AI companies and a core AI industry scale above 1.2 trillion yuan, while the original official report link was not captured in this brief.',
      why: 'The signal is useful for tracking China AI industrial scale, regional clusters, embodied AI, compute policy, and industrial-park momentum, but it needs source confirmation before being treated as a hard benchmark.',
      impact: 'Teams should mark the item as unconfirmed, monitor official report publication, and use it only as a directional watchpoint for policy, infrastructure, robotics, and intelligent manufacturing demand.',
    },
  },
  {
    name: 'china-asean-ai-innovation-center',
    owner: 'daily-source-projection',
    category: 'policy-governance',
    splitTargetCategory: 'ai-policy-standards',
    terms: ['中国—东盟人工智能产业创新中心', '东盟', '多边合作平台'],
    details: {
      what: 'China’s MIIT said the China-ASEAN AI Industry Innovation Center was established in Beijing on May 24 as a multilateral platform for technology R&D, industrial ecosystems, governance practice, and regional capability building.',
      why: 'The signal shifts China’s AI export and regional cooperation from individual product rollout toward shared industry platforms, standards governance, infrastructure coordination, and capability-building mechanisms.',
      impact: 'ASEAN markets may become important deployment sites for Chinese foundation models, industrial AI, and intelligent infrastructure, while governance alignment and standards cooperation become part of market entry planning.',
    },
  },
  {
    name: 'nvidia-cvpr-physical-ai-2026',
    owner: 'daily-source-projection',
    category: 'physical-ai-robotics',
    splitTargetCategory: 'robotics-simulation-training',
    displayLabel: 'NVIDIA / CVPR / Research / robotics deployment',
    terms: ['GraspGen-X', 'LCDrive', 'NitroGen', 'CVPR 论文'],
    details: {
      what: 'NVIDIA Research highlighted three CVPR papers: GraspGen-X for zero-shot robotic grasping, LCDrive for lower-token autonomous-driving inference, and NitroGen for training embodied agents in virtual environments.',
      why: 'The update shows physical AI moving from isolated perception models toward full robotics and autonomous-driving pipelines that combine simulation, data generation, inference efficiency, and deployment validation.',
      impact: 'Robotics and autonomous-driving teams can watch whether these methods reduce retraining cost for new grippers, improve decision latency, and make simulation-to-real-world training easier to operationalize.',
    },
  },
  {
    name: 'meta-business-agent-2026',
    owner: 'daily-source-projection',
    category: 'enterprise-agents',
    splitTargetCategory: 'enterprise-agent-platforms',
    terms: ['Meta Business Agent', 'WhatsApp、Messenger、Instagram', 'Shopify、Zendesk、Shopee'],
    details: {
      what: 'Meta said it is expanding Meta Business Agent globally across WhatsApp, Messenger, Instagram, and partner systems including Shopify, Zendesk, and Shopee for Q&A, product recommendations, bookings, and lead qualification.',
      why: 'The announcement moves customer-service agents closer to daily commerce channels, with Meta citing more than 1 billion business conversations each day across WhatsApp, Messenger, and Instagram.',
      impact: 'Small businesses, support teams, and cross-border commerce sellers may gain faster automated sales assistance, while vendors will compete on channel coverage, handoff quality, pricing, and customer-data controls.',
    },
  },
  {
    name: 'openai-youth-safety-g7-2026',
    owner: 'daily-source-projection',
    category: 'product-safety',
    splitTargetCategory: 'youth-safety-controls',
    terms: ['国际青少年 AI 安全', '年龄识别', '年度风险评估', '家长控制'],
    details: {
      what: 'OpenAI published a pre-G7 proposal for international youth AI safety collaboration, emphasizing age identification, default protections, annual risk assessment, parental controls, and shared research mechanisms.',
      why: 'AI safety scrutiny is expanding from model capability and misuse toward who uses the product, how minors are protected, and which responsibilities belong to providers, schools, parents, and regulators.',
      impact: 'Education, companion, and social AI products should expect stronger requirements around age assurance, teen defaults, parental controls, risk reporting, and child-safety evaluation before broad rollout.',
    },
  },
  {
    name: 'microsoft-enterprise-agent-system-2026',
    owner: 'daily-source-projection',
    category: 'enterprise-agents',
    splitTargetCategory: 'enterprise-agent-platforms',
    terms: ['AI alone won’t change your business', 'Agent 系统', 'Azure、GitHub、Microsoft 365'],
    details: {
      what: 'Microsoft argued that enterprise AI value depends on governable agent systems rather than standalone models, tying Azure, GitHub, Microsoft 365, Security, Fabric, identity, permissions, data, audit, and human oversight into one operating layer.',
      why: 'The enterprise AI budget is shifting from model trials to production-system redesign, where observability, governance, identity, permissions, and workflow integration decide whether agents can be trusted at scale.',
      impact: 'Enterprise buyers may weigh platform governance and workflow integration more heavily than model benchmark scores, strengthening bundled stacks that connect developer tools, office workflows, data platforms, and security controls.',
    },
  },
  {
    name: 'shanghai-tech-fair-2026-hard-tech',
    owner: 'daily-source-projection',
    category: 'market-intelligence',
    splitTargetCategory: 'regional-ai-ecosystems',
    terms: ['第十二届上交会', '脑机接口', '长三角协同创新专区'],
    details: {
      what: 'Shanghai’s government press briefing said the 12th China Shanghai International Technology Fair will feature brain-computer interfaces, biomedicine, industrial robots, large models, new displays, intelligent connected vehicles, and Yangtze River Delta innovation zones.',
      why: 'The fair is a useful China hard-tech signal because it connects AI, robotics, brain-computer interfaces, technology transfer, regional industrial policy, and commercialization channels rather than only model releases.',
      impact: 'Brain-computer interface vendors, industrial robotics teams, AI technology-transfer services, and Yangtze River Delta innovation programs may receive more policy, capital, and partnership attention.',
    },
  },
  {
    name: 'nvidia-doosan-physical-ai-factory-2026',
    owner: 'daily-source-projection',
    category: 'physical-ai-robotics',
    splitTargetCategory: 'robotics-commercial-deployment',
    displayLabel: 'Korea / NVIDIA / GPU / compute infrastructure',
    terms: ['斗山', 'Doosan', '电力方案和数据中心材料'],
    details: {
      what: 'NVIDIA said it is expanding cooperation with South Korea’s Doosan Group across robotics, industrial automation, AI factory infrastructure, power systems, and data-center materials.',
      why: 'The partnership frames physical AI as a full industrial stack that combines robots, simulation, edge inference, data-center power, cooling, materials, and high-performance compute instead of a standalone GPU sale.',
      impact: 'Manufacturing and robotics teams should watch whether Doosan and NVIDIA turn the alliance into reference deployments for robot control, factory automation, AI data centers, and power-constrained infrastructure buildouts.',
    },
  },
  {
    name: 'anthropic-opus-agent-coding-2026',
    owner: 'daily-source-projection',
    category: 'frontier-models',
    splitTargetCategory: 'frontier-model-task-capability',
    displayLabel: 'Anthropic / Opus / OpenAI / agent platform',
    terms: ['Anthropic 近期升级 Opus 级模型', '长时间任务稳定性'],
    details: {
      what: 'Anthropic’s news page describes a late-May Opus-level upgrade focused on coding, agent tasks, professional work, and more stable long-running execution.',
      why: 'The update keeps frontier model competition centered on durable task execution: code changes, multi-step debugging, professional review workflows, planning, and agentic tool use rather than only single-turn answer quality.',
      impact: 'Developer and enterprise teams can benchmark Anthropic models on supervised coding agents, long-context reviews, workflow handoffs, approval points, and failure recovery before expanding production use.',
    },
  },
  {
    name: 'aws-quick-connect-bedrock-openai-2026',
    owner: 'daily-source-projection',
    category: 'enterprise-agents',
    splitTargetCategory: 'enterprise-agent-platforms',
    displayLabel: 'AWS / OpenAI / News / robotics deployment',
    terms: ["What's Next with AWS 2026", 'Managed Agents 进入 Amazon Bedrock'],
    details: {
      what: 'AWS News Blog says What’s Next with AWS 2026 introduced Amazon Quick as a work AI assistant, expanded Amazon Connect agentic AI solutions, and put OpenAI models, Codex, and Managed Agents into limited preview on Amazon Bedrock.',
      why: 'AWS is turning enterprise AI from a chat layer into governed workflow agents for customer service, hiring, healthcare, operations, software development, and internal knowledge work.',
      impact: 'Enterprise teams can test OpenAI and AWS agent capabilities inside existing identity, network, logging, encryption, and cost-management controls while comparing Bedrock against direct model APIs.',
    },
  },
  {
    name: 'openai-chatgpt-memory-lockdown-2026',
    owner: 'daily-source-projection',
    category: 'product-safety',
    splitTargetCategory: 'model-account-security',
    displayLabels: [
      {
        label: 'OpenAI / Lockdown / Mode / enterprise AI rollout',
        terms: ['OpenAI 帮助中心版本说明显示', 'Lockdown Mode 面向所有登录用户开放'],
      },
      {
        label: 'OpenAI / ChatGPT / Lockdown / agent platform',
        terms: ['OpenAI 6月4日发布说明', 'Lockdown Mode 向所有登录用户开放'],
      },
      {
        label: 'US / OpenAI / ChatGPT / agent platform',
        terms: ['OpenAI 6月4日更新 ChatGPT 版本说明', 'Plus/Pro 美国用户先用'],
      },
    ],
    terms: ['Lockdown Mode', 'Memory 会自动保持更新', '文件下载等高风险外部能力'],
    details: {
      what: 'OpenAI’s June 4 ChatGPT release notes say Memory can stay more up to date and reduce outdated or contradictory memories, while Lockdown Mode is now available to all logged-in users to limit browsing, deep research, agents, and file downloads.',
      why: 'The update ties personalization to isolation controls: a more persistent assistant is more useful only if users and teams can reduce prompt-injection risk, external-content exposure, and accidental data leakage.',
      impact: 'Individual users may get more reliable ChatGPT context, while teams handling contracts, financial files, code, or customer data should test Lockdown Mode before allowing AI tools to read external pages or uploaded files.',
    },
  },
  {
    name: 'nvidia-korea-ecosystem-2026',
    owner: 'daily-source-projection',
    category: 'cloud-infrastructure',
    splitTargetCategory: 'ai-infrastructure-capacity',
    displayLabel: 'Korea / NVIDIA / CEO / compute infrastructure',
    terms: ['黄仁勋到访首尔', '韩国在机器人、物理 AI、存储制造', 'Korea ecosystem 2026'], 
    details: {
      what: 'NVIDIA CEO Jensen Huang visited Seoul and said Grace Blackwell is performing well, Vera Rubin has entered full production, and the second half of the year will be busy for AI infrastructure buildout, with Korea highlighted for robotics, physical AI, memory, and manufacturing.',
      why: 'The signal shows AI competition shifting from model releases alone toward compute supply chains, sovereign AI capacity, robotics deployment, and local industrial ecosystems.',
      impact: 'Korean memory, semiconductor, manufacturing, and robotics companies could become more central to NVIDIA’s next-stage AI infrastructure and physical AI partnerships.',
    },
  },
  {
    name: 'china-provincial-ai-compute-plans-2026',
    owner: 'daily-source-projection',
    category: 'policy-governance',
    splitTargetCategory: 'ai-industrial-policy',
    displayLabels: [
      {
        label: 'China / compute infrastructure / AI chip supply / model capability update',
        terms: ['31份规划', '1370次'],
      },
      {
        label: 'Xinhua / China / compute infrastructure / AI chip supply',
        terms: ['30个省市提及“大模型”', '北京、浙江、上海、广东被描述为第一梯队'],
      },
    ],
    terms: ['各省级“十五五”规划纲要密集发布', '30个省市提及“大模型”', '所有省市均提及“人工智能”和“算力”', '北京、浙江、上海、广东被描述为第一梯队'],
    details: {
      what: 'Xinhua reported that provincial 15th Five-Year Plan outlines are being published, with all provinces and municipalities mentioning artificial intelligence and compute power, 30 mentioning large models, and Beijing, Zhejiang, Shanghai, and Guangdong described as leading clusters.',
      why: 'China’s AI industry is entering a regional specialization phase instead of relying only on single-model competition.',
      impact: 'Beijing may focus more on model and original innovation, the Yangtze River Delta on compute, chips, and supply chains, the Pearl River Delta on application deployment, and central or western regions on compute support.',
    },
  },
  {
    name: 'china-mwc-shanghai-6g-mobile-ai-satellite-2026',
    owner: 'daily-source-projection',
    category: 'policy-governance',
    splitTargetCategory: 'ai-industrial-policy',
    displayLabel: 'China / 6G / mobile AI infrastructure',
    capacityPlan: {
      selectedSplitTarget: 'ai-industrial-policy',
      whyNotAlternatives: 'Rejected alternate split targets because this story is specifically about China 6G, satellite, non-terrestrial network, and mobile-AI infrastructure policy rather than AI standards or digital compliance.',
      budgetImpact: 'Raises the ai-industrial-policy effective budget by one for a latest-fixture 6G/mobile-AI infrastructure signal while keeping parent policy-governance matching narrow.',
    },
    terms: ['2026 MWC 上海', '6G 产业生态展区', '未来星座', '非地面网络通信'],
    details: {
      what: 'Xinhua reported that MWC Shanghai 2026 is focusing on 6G, mobile AI, embodied intelligence, satellite and non-terrestrial network communications, with first-time 6G industry ecosystem and Future Constellation satellite areas.',
      why: 'Large-scale AI deployment increasingly depends on next-generation connectivity across edge devices, satellite links, sensing, low-altitude mobility, industrial manufacturing, and remote-service scenarios.',
      impact: 'Telecom operators, device makers, chip vendors, satellite-network companies, and industrial AI teams may see earlier pilot windows where compute, network, terminal, and edge coordination become bundled infrastructure decisions.',
    },
  },
  {
    name: 'china-6g-province-ministry-pilot-2026',
    owner: 'daily-source-projection',
    category: 'policy-governance',
    splitTargetCategory: 'ai-industrial-policy',
    displayLabel: 'Xinhua / MIIT / China / AI chip supply',
    terms: ['6G 创新发展部省协同试点', '2029年', '业务场景和终端产品'],
    details: {
      what: 'Xinhua reported that China’s Ministry of Industry and Information Technology is organizing province-ministry coordinated 6G innovation pilots, aiming to form independent 6G technical solutions, business scenarios, and terminal products by 2029.',
      why: '6G is being positioned alongside AI, satellite internet, wireless sensing, embodied intelligence, and the low-altitude economy rather than as a standalone telecom upgrade.',
      impact: 'Communications equipment, chip components, operating systems, new terminals, industrial manufacturing, and low-altitude-economy applications may enter earlier pilot windows.',
    },
  },
  {
    name: 'nvidia-cosmos-3-physical-ai-2026',
    owner: 'daily-source-projection',
    category: 'physical-ai-robotics',
    splitTargetCategory: 'robotics-simulation-training',
    displayLabel: 'NVIDIA / Cosmos / GTC / compute infrastructure',
    terms: ['Cosmos 3', '开放的物理 AI 世界基础模型', 'world foundation model'],
    details: {
      what: 'NVIDIA announced Cosmos 3 at GTC Taipei as an open physical AI world foundation model for visual reasoning, world generation, and action prediction across robotics, autonomous driving, and visual AI workflows.',
      why: 'The AI race is extending from chat and coding into systems that understand and simulate the physical world, making synthetic data, simulation, and policy training core infrastructure for robotics and autonomous systems.',
      impact: 'Robotics and autonomous-driving teams may rely more heavily on world models and simulation data, lowering experimentation costs while increasing dependence on NVIDIA’s compute and software stack.',
    },
  },
  {
    name: 'nvidia-physical-ai-agent-skills-2026',
    owner: 'daily-source-projection',
    category: 'physical-ai-robotics',
    splitTargetCategory: 'robotics-simulation-training',
    displayLabel: 'NVIDIA / Physical / Agent / robotics deployment',
    terms: ['Physical AI Agent Skills', 'Omniverse', 'Alpamayo'],
    details: {
      what: 'NVIDIA published open-source Physical AI Agent tools and skills for Omniverse, Cosmos, Isaac, Metropolis, Alpamayo, Jetson, and related workflows covering data generation, simulation, training, evaluation, and deployment.',
      why: 'The update expands coding-agent patterns into real-world engineering loops where robotics, autonomous vehicles, and industrial digital twins need repeatable agent workflows instead of one-off scripts.',
      impact: 'Industrial software and robotics teams can package complex procedures as reusable agent skills, shifting differentiation from owning a model toward owning verifiable, reproducible engineering workflows.',
    },
  },
  {
    name: 'unitree-star-market-ipo-2026',
    owner: 'daily-source-projection',
    category: 'company-finance',
    splitTargetCategory: 'robotics-capital-markets',
    displayLabel: 'China / Xinhua / IPO / compute infrastructure',
    terms: ['宇树科技', '科创板 IPO', '42.02亿元'],
    details: {
      what: 'Xinhua reported that Unitree Robotics’ STAR Market IPO application passed review by the Shanghai Stock Exchange listing committee, with planned fundraising of 4.202 billion yuan for robot models, robot hardware R&D, new products, and manufacturing capacity.',
      why: 'Humanoid robots, quadruped robots, and embodied intelligence are moving from technical demos into financing, manufacturing, and commercialization tests.',
      impact: 'China’s robotics supply chain may receive more attention across joint modules, sensors, control systems, edge compute, embodied models, and manufacturing capacity.',
    },
  },
  {
    name: 'china-vertical-industry-ai-scale-deployment-2026',
    owner: 'daily-source-projection',
    category: 'enterprise-agents',
    splitTargetCategory: 'vertical-workflow-agents',
    displayLabel: 'China / vertical AI / industrial deployment',
    capacityPlan: {
      selectedSplitTarget: 'vertical-workflow-agents',
      whyNotAlternatives: 'Rejected alternate split targets because the signal is about manufacturing, healthcare, energy, and materials workflows rather than enterprise agent platforms or enablement programs.',
      budgetImpact: 'Raises vertical-workflow-agents capacity for a latest-fixture vertical workflow deployment signal without widening generic enterprise-agents matching.',
    },
    terms: ['夏季达沃斯论坛', '工艺图纸解析从半天缩短至几分钟', '材料研发周期缩短', '工厂读图和工艺制定从半天缩短到几分钟'],
    details: {
      what: 'Xinhua reported that AI is moving faster into vertical industries such as manufacturing, healthcare, energy, and new materials, including examples where process-drawing analysis fell from half a day to minutes and materials R&D cycles shortened.',
      why: 'China’s AI application agenda is shifting from general model excitement toward measurable productivity gains inside physical industries and domain workflows.',
      impact: 'Companies with proprietary data, process redesign capability, and deployment discipline may gain more attention, while superficial AI wrappers will face a higher bar for proving operational value.',
    },
  },
  {
    name: 'google-deepmind-diffusiongemma-2026',
    owner: 'daily-source-projection',
    category: 'frontier-models',
    splitTargetCategory: 'frontier-model-inference-architecture',
    displayLabel: 'Google / DeepMind / DiffusionGemma / AI hardware',
    terms: ['DiffusionGemma', '扩散式文本生成'],
    details: {
      what: 'Google DeepMind released the experimental open DiffusionGemma model, using diffusion-style text generation to create text blocks in parallel, while NVIDIA announced optimizations across RTX, RTX PRO, DGX Spark, and H100 hardware.',
      why: 'The release tests whether language-model inference can move beyond token-by-token generation toward lower-latency local interaction, while still requiring quality checks before production use.',
      impact: 'Local AI assistants, code completion, interactive editing, and personal agent loops can benchmark DiffusionGemma for speed, but production systems should keep mature autoregressive models as the quality baseline.',
    },
  },
  {
    name: 'nvidia-drive-hyperion-robotaxi-2026',
    owner: 'daily-source-projection',
    category: 'physical-ai-robotics',
    splitTargetCategory: 'autonomous-mobility-systems',
    displayLabel: 'NVIDIA / DRIVE / Hyperion / compute infrastructure',
    terms: ['DRIVE Hyperion', 'Uber/Autobrains', 'HUMAIN'],
    details: {
      what: 'NVIDIA expanded the DRIVE Hyperion robotaxi ecosystem with Uber/Autobrains in Munich, Foxconn L4-ready fleets in Taiwan, VinFast in Southeast Asia, and HUMAIN in Saudi Arabia and the Middle East.',
      why: 'Autonomous driving is moving from single-vehicle demos toward platformized deployment stacks that combine vehicle compute, sensors, safety operating systems, simulation validation, and mobility-network partners.',
      impact: 'Robotaxi competition may increasingly depend on automaker, compute-platform, ride-hailing, and safety-certification partnerships rather than only the onboard driving algorithm.',
    },
  },
  {
    name: 'openai-chatgpt-model-picker-2026',
    owner: 'daily-source-projection',
    category: 'consumer-productivity',
    splitTargetCategory: 'chatgpt-control-surfaces',
    displayLabel: 'OpenAI / ChatGPT / Instant / model capability update',
    terms: ['Instant、Medium、High', 'Pro Extended', 'Thinking Light'],
    details: {
      what: 'OpenAI simplified ChatGPT model selection into task-oriented options such as Instant, Medium, High, Extra High, Pro Standard, and Pro Extended across Plus and Pro users on web, iOS, and Android.',
      why: 'The product shift hides complex model names behind speed and reasoning-strength choices, showing AI interfaces moving from model branding toward task-experience tiers.',
      impact: 'Casual users get lower selection friction, while power users should re-map workflows after Thinking Light removal and validate which tier balances latency, cost, and reasoning depth.',
    },
  },
  {
    name: 'openai-codex-record-replay-2026',
    owner: 'daily-source-projection',
    category: 'developer-tools',
    splitTargetCategory: 'code-agent-runtime',
    displayLabel: 'OpenAI / Codex / ChatGPT control surfaces',
    terms: ['Record & Replay', '应用权限控制', 'Codex 新增'],
    details: {
      what: 'OpenAI updated ChatGPT Scheduled tasks, app permission controls, voice pronunciation help, chat organization, iOS upload flow, and Codex Record & Replay, which can turn a demonstrated workflow into a reusable skill.',
      why: 'The update shows AI products moving from chat responses toward scheduled execution, permissioned app access, reusable workflows, and supervised desktop or browser automation.',
      impact: 'Users can test Codex on repeatable low-risk tasks such as issue creation, report downloads, publishing checklists, or admin-console setup while teams define permission scope, audit logs, and rollback paths.',
    },
  },
  {
    name: 'meta-facebook-ai-tools-2026',
    owner: 'daily-source-projection',
    category: 'consumer-productivity',
    splitTargetCategory: 'consumer-creative-ai',
    displayLabel: 'Meta / Facebook / consumer creative AI',
    terms: ['AI Mode 搜索', 'AI 图片/视频编辑', 'AI 换装'],
    details: {
      what: 'Meta added AI Mode search, AI image and video editing, AI outfit try-on, and avatar restyling features inside Facebook, moving generative tools directly into social search and creation flows.',
      why: 'The update shows consumer AI shifting from standalone chat apps into default social-product surfaces, where search, posting, editing, and identity tools can all invoke AI in the same user journey.',
      impact: 'Creators and everyday users may create more visual content with lower friction, while teams should watch privacy controls, provenance labeling, and platform-search behavior as AI answers enter Facebook workflows.',
    },
  },
  {
    name: 'amazon-alexa-plus-brazil-localization-2026',
    owner: 'daily-source-projection',
    category: 'consumer-productivity',
    splitTargetCategory: 'consumer-creative-ai',
    displayLabel: 'Amazon / Alexa+ / consumer AI localization',
    capacityPlan: {
      selectedSplitTarget: 'consumer-creative-ai',
      whyNotAlternatives: 'Rejected alternate split targets because Alexa+ Brazil is a localized consumer assistant and household creative surface, not a ChatGPT control surface or career productivity workflow.',
      budgetImpact: 'Uses the consumer-creative-ai split target for a fixture-backed consumer AI assistant localization signal and avoids adding another parent consumer-productivity fallback.',
    },
    terms: ['Alexa+ 已在巴西 Early Access 上线', '本地语言与文化理解', 'Prime 会员体系'],
    details: {
      what: 'Amazon moved Alexa+ into Brazil Early Access, emphasizing generative AI, natural conversation, cross-device continuity, local language and cultural understanding, and expansion to additional countries.',
      why: 'The rollout shows consumer AI assistant competition shifting from model quality alone toward localization, device integration, household services, and everyday execution surfaces.',
      impact: 'Smart speakers, TVs, home devices, and Prime membership bundles may regain importance as AI entry points, while teams should compare language quality, local service coverage, privacy controls, and subscription economics.',
    },
  },
  {
    name: 'amazon-content-partners-ai-crawler-preview-2026',
    owner: 'daily-source-projection',
    category: 'market-intelligence',
    splitTargetCategory: 'content-licensing-markets',
    displayLabel: 'Amazon / Content Partners / content licensing market',
    terms: ['Amazon Content Partners', 'gated preview', 'AWS 托管额度'],
    details: {
      what: 'Amazon launched Amazon Content Partners in gated preview for independent content creators, combining AI crawler traffic management, affiliate commission boosts, advertising access, and AWS hosting credits.',
      why: 'The preview turns the AI-search content compensation problem into a commercial exchange: publishers grant structured access while platforms offer traffic controls, monetization paths, and infrastructure support.',
      impact: 'Independent publishers, niche media, and blogs may get another lever against AI traffic erosion, while AI platforms will face more explicit licensing, crawler policy, and revenue-sharing expectations.',
    },
  },
  {
    name: 'openai-partner-network-enterprise-ecosystem-2026',
    owner: 'daily-source-projection',
    category: 'enterprise-agents',
    splitTargetCategory: 'enterprise-agent-platforms',
    displayLabel: 'OpenAI / Partner Network / AI adoption ecosystem',
    capacityPlan: {
      selectedSplitTarget: 'enterprise-agent-platforms',
      whyNotAlternatives: 'Rejected alternate split targets because OpenAI Partner Network is an enterprise deployment ecosystem and platform channel, not a vertical workflow or training-only enablement program.',
      budgetImpact: 'Consumes the enterprise-agent-platforms capacity slot for the 2026-06-16 real cron deployment-ecosystem signal and requires split migration before another platform rule is added.',
    },
    terms: ['Partner Network', '支持合作伙伴生态', '30 万名认证顾问'],
    details: {
      what: 'OpenAI introduced Partner Network with a planned 150 million USD investment in the partner ecosystem and a goal of training 300,000 certified consultants by the end of 2026.',
      why: 'The move shows enterprise AI adoption depending on workflow redesign, systems integration, governance, and organization change rather than model access alone.',
      impact: 'Consulting firms, systems integrators, and industry software vendors may bind more closely to OpenAI, while enterprise buyers should evaluate implementation partners as carefully as model capability.',
    },
  },
  {
    name: 'china-humanoid-embodied-training-2026',
    owner: 'daily-source-projection',
    category: 'physical-ai-robotics',
    splitTargetCategory: 'robotics-simulation-training',
    displayLabels: [
      {
        label: 'Xinhua / MIIT / China / robotics deployment',
        terms: ['据新华社报道', '工信部、国务院国资委联合启动 2026 年度人形机器人与具身智能实景实训专项行动'],
      },
      {
        label: 'MIIT / China / L2 / robotics deployment',
        terms: ['据新华网报道', '国资委启动 2026 年度人形机器人与具身智能实景实训专项行动'],
      },
      {
        label: 'MIIT / SASAC / China humanoid robotics training',
        terms: ['工信部办公厅、国务院国资委办公厅发布通知', '真实场景训练'],
      },
    ],
    terms: ['实景实训专项行动', '百个以上高价值应用场景', '万台级规模落地能力'],
    details: {
      what: 'Xinhua reported that China’s MIIT and SASAC launched a 2026 humanoid robotics and embodied-intelligence real-world training initiative, targeting more than 100 high-value application scenarios and 10,000-unit deployment capability by year end.',
      why: 'China’s humanoid robotics push is shifting from demonstration videos toward real production and service environments, where scenario data, standardized training spaces, and engineering validation determine commercialization.',
      impact: 'Industrial, warehousing, healthcare, emergency-response, catering, retail, inspection, and elder-care pilots may become earlier deployment grounds for humanoid and embodied-intelligence systems.',
    },
  },
  {
    name: 'china-app-popup-jump-regulation-2026',
    owner: 'daily-source-projection',
    category: 'policy-governance',
    splitTargetCategory: 'digital-regulation-compliance',
    displayLabel: 'China / Xinhua / MIIT / enterprise AI rollout',
    terms: ['信息窗口跳转', '摇一摇', '常态化检测监测'],
    details: {
      what: 'Xinhua reported that China’s MIIT required internet platforms and smart-terminal companies to standardize app information-window behavior and crack down on illegal pop-ups, induced clicks, and high-sensitivity shake-to-jump redirects.',
      why: 'The regulatory signal turns intrusive app advertising, accidental jumps, and dark-pattern traffic acquisition into an ongoing compliance and user-experience issue rather than a seasonal campaign nuisance.',
      impact: 'App platforms should review splash screens, pop-ups, redirect chains, ad SDKs, and shake-trigger sensitivity before recurring monitoring leads to interviews, public notices, or removal actions.',
    },
  },

  {
    name: 'openai-academy-enterprise-ai-foundations-2026',
    owner: 'daily-source-projection',
    category: 'enterprise-agents',
    splitTargetCategory: 'agent-enablement-programs',
    displayLabel: 'OpenAI / Academy / Foundations / agent platform',
    terms: ['AI Foundations', 'Applied AI Foundations', 'Agents and Workflows'],
    details: {
      what: 'OpenAI Academy added three enterprise AI courses — AI Foundations, Applied AI Foundations, and Agents and Workflows — to train employees on prompting, workflow design, and agent collaboration.',
      why: 'The signal shifts AI competition from model access alone toward organizational enablement: training, repeatable workflows, and supervised agent use become part of enterprise adoption.',
      impact: 'Enterprises can turn the curriculum into role-based AI training paths, while smaller teams can start by converting recurring reports, meeting notes, and customer replies into governed AI workflows.',
    },
  },
  {
    name: 'nvidia-agentperf-blackwell-2026',
    owner: 'daily-source-projection',
    category: 'cloud-infrastructure',
    splitTargetCategory: 'cloud-model-distribution',
    displayLabels: [
      {
        label: 'NVIDIA / Blackwell / Artificial / compute infrastructure',
        terms: ['Artificial Analysis', 'H200 高最多 20 倍'],
      },
      {
        label: 'NVIDIA / AgentPerf / agent infrastructure capacity',
        terms: ['每兆瓦可运行的智能体数量显著高于上一代系统'],
      },
    ],
    terms: ['AgentPerf', 'GB300 NVL72', '每兆瓦并发智能体'],
    details: {
      what: 'NVIDIA said Artificial Analysis AgentPerf results show GB300 NVL72 leading agentic AI infrastructure, with up to 20x the concurrent agents per megawatt versus H200 in the cited workload.',
      why: 'Agent infrastructure is being evaluated on multi-step concurrency, tool-use chains, latency, and power efficiency rather than only single-request inference speed.',
      impact: 'Teams deploying coding, customer-support, and operations agents should compare accelerator choices by concurrent-agent capacity, energy budget, latency, and reliability under long-running workflows.',
    },
  },
  {
    name: 'anthropic-claude-corps-nonprofit-2026',
    owner: 'daily-source-projection',
    category: 'enterprise-agents',
    splitTargetCategory: 'agent-enablement-programs',
    displayLabel: 'US / Anthropic / Claude / model capability update',
    terms: ['Claude Corps', '1000 名早期职业人员', '2026 年 10 月'],
    details: {
      what: 'Anthropic launched Claude Corps as a 150 million USD program to train 1,000 early-career workers and place them full-time for one year with US nonprofits, with the first 100 participants planned for October 2026.',
      why: 'The program shows frontier AI companies moving beyond API sales into workforce transition, AI-skill diffusion, and hands-on workflow implementation for lower-resourced organizations.',
      impact: 'Nonprofits and public-interest organizations may get faster Claude workflow adoption, while enterprises can watch the program as a template for AI change-management, training, and deployment support.',
    },
  },
  {
    name: 'china-ai-ict-innovation-plan-2026',
    owner: 'daily-source-projection',
    category: 'policy-governance',
    splitTargetCategory: 'ai-industrial-policy',
    displayLabels: [
      {
        label: 'MIIT / China / A/6G / compute infrastructure',
        terms: ['据新华网报道', '城域算力 1 毫秒时延圈覆盖率不低于 75%'],
      },
      {
        label: 'Science and Technology Daily / Xinhua / MIIT / compute infrastructure',
        terms: ['据新华社转载科技日报', '到 2030 年'],
      },
    ],
    terms: ['人工智能+信息通信', '1 毫秒时延圈', '2026—2028年'],
    details: {
      what: 'China’s MIIT issued an AI + information and communications implementation plan for 2026–2028, targeting more than 30 high-value scenarios and at least 75% coverage for a 1-millisecond metropolitan compute latency circle by 2028.',
      why: 'The plan connects AI, communications networks, edge inference, compute scheduling, 5G-A/6G, and industry applications into one infrastructure policy rather than treating AI as standalone software.',
      impact: 'Telecom operators, equipment vendors, cloud providers, and industry-model builders may accelerate network agents, edge AI services, and low-latency smart-device deployments under clearer policy targets.',
    },
  },
  {
    name: 'china-world-ai-cooperation-organization-2026',
    owner: 'daily-source-projection',
    category: 'policy-governance',
    splitTargetCategory: 'ai-policy-standards',
    displayLabel: 'China / WAICO / AI governance coordination',
    capacityPlan: {
      selectedSplitTarget: 'ai-policy-standards',
      whyNotAlternatives: 'Rejected alternate split targets because WAICO is an international governance and standards-coordination signal, not industrial infrastructure policy or app-level digital compliance.',
      budgetImpact: 'Uses ai-policy-standards capacity for a fixture-backed international AI governance mechanism and avoids adding another broad policy-governance fallback.',
    },
    terms: ['世界人工智能合作组织', '上海世界人工智能大会', '全球 AI 治理合作'],
    details: {
      what: 'Chinese state media said China is preparing a World AI Cooperation Organization and plans to advance global AI governance cooperation around the July World AI Conference in Shanghai.',
      why: 'AI governance is moving from company pledges and national regulation toward international institution-building, standards competition, and cross-border coordination mechanisms.',
      impact: 'Chinese AI exporters, open-source model ecosystems, and standards participants should watch the organization charter, membership, projects, and links to international governance forums before treating it as an operational channel.',
    },
  },

  {
    name: 'aws-agent-continuum-enterprise-agentcore-2026',
    owner: 'daily-source-projection',
    category: 'cloud-infrastructure',
    splitTargetCategory: 'cloud-model-distribution',
    displayLabel: 'AWS / Agent / Continuum / agent platform',
    capacityPlan: {
      selectedSplitTarget: 'cloud-model-distribution',
      whyNotAlternatives: 'Rejected alternate split targets because AWS Continuum and Bedrock AgentCore are cloud model and agent distribution infrastructure, not raw AI infrastructure capacity.',
      budgetImpact: 'Uses cloud-model-distribution capacity for a fixture-backed AWS agent infrastructure launch and keeps future AWS/cloud additions behind split-target review.',
    },
    terms: ['AWS Continuum', 'AWS Context', 'Bedrock AgentCore'],
    details: {
      what: 'AWS introduced AWS Continuum, AWS Context, Amazon Quick, Kiro, AWS DevOps Agent, AWS Transform, and Bedrock AgentCore at its New York summit for enterprise agents across security, data retrieval, development, and workflow automation.',
      why: 'The update shows cloud competition moving from model APIs toward enterprise agent infrastructure where knowledge access, secure execution, DevOps automation, auditability, and rollback become platform features.',
      impact: 'Enterprises can pilot agents in code, security, data, and operations workflows, but should require scoped permissions, review logs, rollback paths, and measurable reliability before allowing autonomous execution.',
    },
  },
  {
    name: 'anthropic-korea-seoul-office-ecosystem-2026',
    owner: 'daily-source-projection',
    category: 'market-intelligence',
    splitTargetCategory: 'regional-ai-ecosystems',
    displayLabel: 'Anthropic / Korea / regional AI ecosystem',
    terms: ['首尔办公室正式开放', 'NAVER、Nexon、LG CNS', 'Samsung SDS、Channel Corp'],
    details: {
      what: 'Anthropic opened its Seoul office and named NAVER, Nexon, LG CNS, Hanwha Solutions, Samsung SDS, Channel Corp, and Korean university research groups as users or ecosystem partners.',
      why: 'The move frames Korea as a strategic enterprise AI market across semiconductors, cloud, gaming, consumer electronics, IT services, and AI safety research.',
      impact: 'Asian enterprise AI competition may intensify as Claude adoption expands into software development, customer support, knowledge work, and regional partner ecosystems.',
    },
  },
  {
    name: 'openai-chatgpt-scheduled-tasks-pulse-2026',
    owner: 'daily-source-projection',
    category: 'consumer-productivity',
    splitTargetCategory: 'chatgpt-control-surfaces',
    displayLabel: 'OpenAI / ChatGPT / Scheduled / enterprise AI rollout',
    terms: ['Scheduled Tasks', 'Scheduled tasks', '统一 Scheduled 页面', 'Pulse 将逐步退出'],
    details: {
      what: 'OpenAI updated ChatGPT Scheduled Tasks with a unified Scheduled page for viewing, pausing, resuming, editing, and deleting tasks, faster and more reliable execution, web search, connected apps, and a gradual migration away from Pulse.',
      why: 'The product direction moves ChatGPT from passive chat toward scheduled execution, ongoing monitoring, and proactive reminders where reliability, limits, and privacy boundaries become adoption criteria.',
      impact: 'Users can start with low-risk reminders, daily digests, price checks, and webpage monitoring, while teams should add frequency limits, permission review, logs, and human confirmation before connecting higher-risk workflows.',
    },
  },
  {
    name: 'nvidia-blackwell-mlperf-training-6-2026',
    owner: 'daily-source-projection',
    category: 'frontier-models',
    splitTargetCategory: 'frontier-model-inference-architecture',
    displayLabel: 'NVIDIA / Blackwell / MLPerf / model capability update',
    terms: ['MLPerf Training 6.0', '8192 GPU', 'Blackwell NVL72'],
    details: {
      what: 'NVIDIA said Blackwell delivered the fastest training time across all seven MLPerf Training 6.0 benchmarks and completed an 8192-GPU Blackwell NVL72 large-scale training submission.',
      why: 'Frontier model progress still depends on training infrastructure, where MoE workloads, low-precision training, and large-scale interconnect reliability shape model iteration speed and training economics.',
      impact: 'Cloud providers and model labs may keep prioritizing Blackwell and GB-series clusters, making training cost, cluster stability, and network topology key constraints for next-generation model roadmaps.',
    },
  },

  {
    name: 'openai-chatgpt-finance-dictation-gpt45-retirement-2026',
    owner: 'daily-source-projection',
    category: 'consumer-productivity',
    splitTargetCategory: 'chatgpt-control-surfaces',
    displayLabel: 'OpenAI / ChatGPT / finance and dictation controls',
    capacityPlan: {
      selectedSplitTarget: 'chatgpt-control-surfaces',
      whyNotAlternatives: 'Rejected alternate split targets because the rule covers ChatGPT finance, dictation, Codex Remote, and model-retirement controls rather than creative AI or career workflows.',
      budgetImpact: 'Raises chatgpt-control-surfaces capacity by one for a latest-fixture ChatGPT control-surface update and prevents broad GPT-5.5 matching from swallowing field-level details.',
    },
    terms: ['个人金融体验', '新版听写模型', 'GPT-4.5 从 ChatGPT 下线', '个人财务体验', '听写模型升级', 'GPT-4.5 在 ChatGPT 中退役', 'Codex Remote'],
    details: {
      what: 'OpenAI updated ChatGPT on June 26 with a personal finance experience for US Plus users, a new dictation model, and GPT-4.5 retirement from ChatGPT while older conversations can move to GPT-5.5; Codex Remote is now available across ChatGPT plans.',
      why: 'ChatGPT is becoming a personal task surface that touches sensitive finance, voice input, and model migration workflows rather than staying only a general chat tool.',
      impact: 'Users may rely more on AI for personal information organization and spoken input, while product teams should make authorization, privacy controls, data boundaries, and model-transition notices explicit.',
    },
  },
  {
    name: 'openai-gpt55-instant-decision-shopping-2026',
    owner: 'daily-source-projection',
    category: 'frontier-models',
    splitTargetCategory: 'frontier-model-task-capability',
    displayLabel: 'OpenAI / GPT-5.5 Instant / decision assistance',
    terms: ['6月24日更新 GPT-5.5 Instant', '复杂约束', '本地/购物类问题'],
    details: {
      what: 'OpenAI updated GPT-5.5 Instant on June 24 to better understand real user goals, multi-turn context, complex constraints, and local or shopping-style queries.',
      why: 'The model competition signal is shifting from larger parameters alone toward assistants that can help users make decisions under constraints, compare options, and plan practical next steps.',
      impact: 'Consumer products and assistant builders should test shopping, travel, local-life, and research-filtering workflows for recommendation stability, source grounding, and constraint handling before expanding high-stakes use.',
    },
  },
  {
    name: 'amazon-raise-us-ai-workforce-training-2026',
    owner: 'daily-source-projection',
    category: 'market-intelligence',
    splitTargetCategory: 'regional-ai-ecosystems',
    displayLabel: 'Amazon / RAISE US / AI workforce training',
    capacityPlan: {
      selectedSplitTarget: 'regional-ai-ecosystems',
      whyNotAlternatives: 'Rejected alternate split targets because RAISE US is a workforce and education ecosystem signal, not a market-sizing report or content-licensing market signal.',
      budgetImpact: 'Uses regional-ai-ecosystems capacity for a fixture-backed workforce and education ecosystem signal while avoiding another parent market-intelligence fallback.',
    },
    terms: ['RAISE US', 'Future Ready 2030', 'AI 时代技能'],
    details: {
      what: 'Amazon joined RAISE US as a founding member on June 25, linking its AI workforce-skilling push with Future Ready 2030 and broader community training commitments.',
      why: 'AI adoption is moving into workforce transition, where large companies, education programs, and policy-adjacent initiatives coordinate reskilling rather than treating AI as only a product rollout.',
      impact: 'Employers, schools, and workers should expect faster demand for practical AI collaboration skills, internal training paths, and credential-like programs tied to enterprise AI deployment.',
    },
  },
  {
    name: 'nvidia-top500-green500-supercomputing-2026',
    owner: 'daily-source-projection',
    category: 'cloud-infrastructure',
    splitTargetCategory: 'ai-infrastructure-capacity',
    displayLabel: 'NVIDIA / TOP500 / Green500 / compute infrastructure',
    capacityPlan: {
      selectedSplitTarget: 'ai-infrastructure-capacity',
      whyNotAlternatives: 'Rejected alternate split targets because TOP500 and Green500 are supercomputing capacity and energy-efficiency signals, not cloud model distribution.',
      budgetImpact: 'Raises ai-infrastructure-capacity by one for a latest-fixture supercomputing infrastructure signal and keeps TOP500/Green500 details out of generic NVIDIA compute copy.',
    },
    terms: ['TOP500 榜单', '超过 400 台', 'Green500 能效榜前 8 名'],
    details: {
      what: 'NVIDIA said more than 400 systems, or 81% of the latest TOP500 supercomputers, use NVIDIA technologies, while almost 90% of new entries are NVIDIA-based and the top eight Green500 systems run on NVIDIA GPUs.',
      why: 'AI infrastructure competition is becoming tightly linked with supercomputing, scientific computing, and energy efficiency rather than only model endpoints or cloud access.',
      impact: 'Research, climate, materials, 6G, industrial simulation, and frontier-model teams may see more dependency on full-stack GPU, networking, CPU, and energy-efficient HPC platforms.',
    },
  },
  {
    name: 'nvidia-aws-ec2-g7-opensearch-vector-2026',
    owner: 'daily-source-projection',
    category: 'cloud-infrastructure',
    splitTargetCategory: 'ai-infrastructure-capacity',
    displayLabel: 'NVIDIA / AWS / vector retrieval infrastructure',
    capacityPlan: {
      selectedSplitTarget: 'ai-infrastructure-capacity',
      whyNotAlternatives: 'Rejected alternate split targets because EC2 G7, OpenSearch Serverless vector search, and cuVS are production AI infrastructure capacity signals rather than cloud model distribution.',
      budgetImpact: 'Raises ai-infrastructure-capacity by one for a latest-fixture NVIDIA/AWS production infrastructure signal and keeps parent cloud-infrastructure matching narrow.',
    },
    terms: ['EC2 G7', 'OpenSearch Serverless', 'NVIDIA cuVS'],
    details: {
      what: 'NVIDIA described deeper AWS production AI deployment work across EC2 G7, OpenSearch Serverless vector search accelerated by NVIDIA cuVS, and GB300 training performance; NVIDIA said vector indexing can be up to 10 times faster and cost one quarter of a CPU-only path.',
      why: 'Enterprise AI bottlenecks are shifting from model access toward scalable inference, retrieval speed, operating cost, and cloud infrastructure reliability for RAG and agent systems.',
      impact: 'RAG, enterprise search, and agent-platform teams should benchmark retrieval latency, GPU utilization, managed-service cost, and operational complexity before moving workloads to newer AWS and NVIDIA stacks.',
    },
  },
  {
    name: 'anthropic-claude-tag-slack-collaboration-2026',
    owner: 'daily-source-projection',
    category: 'enterprise-agents',
    splitTargetCategory: 'enterprise-agent-platforms',
    displayLabel: 'Anthropic / Claude Tag / team agent workflow',
    capacityPlan: {
      selectedSplitTarget: 'enterprise-agent-platforms',
      whyNotAlternatives: 'Rejected alternate split targets because Claude Tag is a shared team-collaboration agent platform surface, not a vertical workflow or enablement program.',
      budgetImpact: 'Raises enterprise-agent-platforms capacity by one for a latest-fixture team-collaboration agent surface while keeping parent enterprise-agents matching narrow.',
    },
    terms: ['Claude Tag', '@Claude', 'Claude Enterprise', 'Slack'],
    details: {
      what: 'Anthropic launched Claude Tag as a Slack-based @Claude collaboration surface for Claude Enterprise and Team beta users, with channel context, asynchronous task handling, and authorized tool or codebase connections.',
      why: 'AI assistants are moving from private chat boxes into shared team workflows, where permissions, memory boundaries, asynchronous execution, and auditability determine whether agents can be trusted.',
      impact: 'Enterprises using Slack, Teams, or Feishu-style collaboration should define channel memory scope, tool permissions, data-isolation rules, and human review points before allowing AI agents to operate in shared workspaces.',
    },
  },
  {
    name: 'china-industrial-5g-private-network-pilot-2026',
    owner: 'daily-source-projection',
    category: 'policy-governance',
    splitTargetCategory: 'ai-industrial-policy',
    displayLabel: 'China / industrial 5G / AI infrastructure pilot',
    capacityPlan: {
      selectedSplitTarget: 'ai-industrial-policy',
      whyNotAlternatives: 'Rejected alternate split targets because industrial 5G private networks are industrial AI infrastructure policy, not standards coordination or app-level digital compliance.',
      budgetImpact: 'Raises ai-industrial-policy capacity by one for a latest-fixture industrial AI infrastructure policy signal while keeping parent policy-governance matching narrow.',
    },
    terms: ['工业 5G 独立专网试点', '原材料', '能源交通'],
    details: {
      what: 'China is piloting industrial 5G private networks across raw materials, equipment manufacturing, electronic information, energy, and transportation, with multiple ministries supporting enterprise-dedicated 5G networks.',
      why: 'Industrial AI, robotics, and smart manufacturing need low-latency, reliable, and controllable network infrastructure before deployment can move from demos to production environments.',
      impact: 'Manufacturers, telecom operators, equipment vendors, module makers, and system integrators may see faster pilots around 5G-A, industrial internet, edge AI, robotics, and factory data governance.',
    },
  },

  {
    name: 'anthropic-claude-science-research-workbench-2026',
    owner: 'daily-source-projection',
    category: 'enterprise-agents',
    splitTargetCategory: 'vertical-workflow-agents',
    displayLabel: 'Anthropic / Claude Science / research agent workflow',
    capacityPlan: {
      selectedSplitTarget: 'vertical-workflow-agents',
      whyNotAlternatives: 'Rejected alternate split targets because Claude Science is a research workflow workbench, not a generic enterprise agent platform or enablement program.',
      budgetImpact: 'Raises vertical-workflow-agents capacity for the 2026-07-01 latest-fixture research-workflow signal and prevents generic latest daily fallback.',
    },
    terms: ['Claude Science beta', 'Jupyter/R/HPC/SSH', '可审计科研产物'],
    details: {
      what: 'Anthropic released Claude Science beta for Pro, Max, Team, and Enterprise users, with macOS/Linux support, research databases, Jupyter/R/HPC/SSH access, GPU compute, and auditable research artifacts.',
      why: 'The signal moves AI from chat and coding assistance into the scientific workflow itself, where literature review, data analysis, charts, manuscripts, compute scheduling, and reproducibility all need governed agent support.',
      impact: 'Life-science, drug-discovery, omics, and research teams can pilot AI agents on evidence organization and draft generation while requiring expert review, citation checks, reproducible outputs, and audit trails.',
    },
  },
  {
    name: 'nvidia-bionemo-agent-toolkit-claude-science-2026',
    owner: 'daily-source-projection',
    category: 'enterprise-agents',
    splitTargetCategory: 'agent-enablement-programs',
    displayLabel: 'NVIDIA / BioNeMo / scientific agent toolkit',
    terms: ['BioNeMo Agent Toolkit', 'Evo 2', 'BioNeMo NIM'],
    details: {
      what: 'NVIDIA said BioNeMo Agent Toolkit is available as a Claude Science resource, exposing Evo 2, Boltz-2, OpenFold3, Parabricks, RAPIDS-singlecell, nvMolKit, BioNeMo NIM, and related scientific tools.',
      why: 'Scientific agents are becoming tool-using systems that combine frontier models with domain models, GPU libraries, and validated workflows rather than relying only on general-purpose language reasoning.',
      impact: 'Pharma, biotech, and research organizations should evaluate the combined stack of model access, domain tools, GPU acceleration, workflow validation, and result reproducibility before production use.',
    },
  },
  {
    name: 'nvidia-ai-for-science-isc-software-stack-2026',
    owner: 'daily-source-projection',
    category: 'cloud-infrastructure',
    splitTargetCategory: 'ai-infrastructure-capacity',
    displayLabel: 'NVIDIA / AI for Science / HPC software stack',
    capacityPlan: {
      selectedSplitTarget: 'ai-infrastructure-capacity',
      whyNotAlternatives: 'Rejected alternate split targets because AI for Science HPC software is GPU-native infrastructure capacity, not cloud model distribution.',
      budgetImpact: 'Raises ai-infrastructure-capacity for a 2026-07-01 AI-for-Science HPC software-stack signal that extends GPU-native infrastructure beyond model serving.',
    },
    terms: ['ISC', 'DAQIRI', 'ALCHEMI NIM', 'cuPhoton'],
    details: {
      what: 'NVIDIA described an AI for Science software stack around DAQIRI, ALCHEMI NIM, cuPhoton, materials simulation, chemistry, astronomy data processing, and dark-matter research workloads.',
      why: 'AI infrastructure is expanding from training and inference into experimental data acquisition, simulation, and analysis pipelines where HPC, AI, and instruments converge.',
      impact: 'Research institutions and industrial R&D teams should plan for GPU-native workflows, data pipelines, validation metrics, and infrastructure budgets that connect simulation, experiments, and AI analysis.',
    },
  },
  {
    name: 'aws-forward-deployed-ai-engineering-2026',
    owner: 'daily-source-projection',
    category: 'enterprise-agents',
    splitTargetCategory: 'vertical-workflow-agents',
    displayLabel: 'AWS / FDE / enterprise agent deployment',
    capacityPlan: {
      selectedSplitTarget: 'vertical-workflow-agents',
      whyNotAlternatives: 'Rejected alternate split targets because AWS FDE embeds engineers into customer production workflows, not a generic enterprise agent platform or enablement-only program.',
      budgetImpact: 'Raises vertical-workflow-agents for the 2026-07-01 AWS FDE production-agent deployment signal and keeps the latest daily in field-level projection.',
    },
    terms: ['10 亿美元', 'Forward Deployed Engineering', 'agentic AI 系统'],
    details: {
      what: 'AWS committed 1 billion USD to a Forward Deployed Engineering organization that embeds AI engineers with customer teams to co-build and deploy agentic AI systems in days.',
      why: 'Cloud competition is shifting from selling models and compute toward helping customers turn AI into governed production workflows with knowledge graphs, runbooks, architecture documents, and internal champions.',
      impact: 'Enterprises beyond proof-of-concept should select a concrete workflow, define business metrics, permissions, security controls, reusable process assets, and human escalation paths before scaling agentic AI.',
    },
  },
  {
    name: 'aws-summit-dc-public-sector-secret-cloud-2026',
    owner: 'daily-source-projection',
    category: 'product-safety',
    splitTargetCategory: 'high-sensitivity-ai-deployment',
    displayLabel: 'AWS / public sector / secret cloud AI',
    capacityPlan: {
      selectedSplitTarget: 'high-sensitivity-ai-deployment',
      whyNotAlternatives: 'Rejected alternate split targets because AWS Secret Cloud and public-sector AI are high-sensitivity deployment signals, not model account security or youth safety controls.',
      budgetImpact: 'Raises high-sensitivity-ai-deployment for a 2026-07-01 public-sector and secret-cloud AI deployment signal with compliance, isolation, and sovereignty requirements.',
    },
    terms: ['Secret Cloud for Industry', '情报机构云迁移激励', '公共部门'],
    details: {
      what: 'AWS Summit D.C. highlighted public-sector AI and cloud investments, including Secret Cloud for Industry, intelligence-community cloud migration incentives, FDE, energy research, and UK government AI scaling.',
      why: 'AI is moving into government, defense, energy, intelligence, and other high-security environments where compliance, isolation, sovereignty, and classified-data handling determine adoption.',
      impact: 'Public-sector and regulated-industry teams should compare AI infrastructure on accreditation, data boundaries, audit logs, incident response, sovereign operations, and mission-specific deployment support.',
    },
  },

];

function displayLabelForRule(rule, text) {
  if (typeof rule.displayLabel === 'string' && rule.displayLabel.trim()) return rule.displayLabel.trim();
  for (const candidate of rule.displayLabels || []) {
    const label = String(candidate?.label || '').trim();
    const terms = Array.isArray(candidate?.terms) ? candidate.terms : [];
    if (label && terms.length > 0 && terms.every((term) => text.includes(term))) return label;
  }
  return '';
}

export function projectEnglishSourceDetail(source, key) {
  const text = String(source || '');
  const normalizedKey = key === 'why' || key === 'impact' ? key : 'what';
  const rule = FIELD_PROJECTION_RULES.find(({ terms }) => terms.some((term) => text.includes(term)));
  return rule?.details?.[normalizedKey] || '';
}

export function projectEnglishSourceLabel(source) {
  const text = String(source || '');
  for (const rule of FIELD_PROJECTION_RULES) {
    if (!rule.terms.some((term) => text.includes(term))) continue;
    const label = displayLabelForRule(rule, text);
    if (label) return label;
  }
  return '';
}

export function sourceProjectionRules() {
  return FIELD_PROJECTION_RULES.map((rule) => ({ ...rule, terms: [...rule.terms], details: { ...rule.details } }));
}

export function sourceProjectionRuleNames() {
  return FIELD_PROJECTION_RULES.map((rule) => rule.name);
}

export function sourceProjectionRuleMatches(source) {
  const text = String(source || '');
  return FIELD_PROJECTION_RULES
    .map((rule) => ({
      name: rule.name,
      terms: rule.terms.filter((term) => text.includes(term)),
    }))
    .filter((match) => match.terms.length > 0);
}

export function sourceProjectionRuleMatchNames(source) {
  return sourceProjectionRuleMatches(source).map((match) => match.name);
}
