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
