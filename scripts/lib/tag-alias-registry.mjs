export const tagAliasRegistry = [
  {
    canonical: 'ai-agent',
    aliases: ['ai-agents'],
    reason: 'Keep singular/plural AI agent archive traffic on one canonical tag.',
  },
  {
    canonical: 'guide',
    aliases: ['tutorial'],
    reason: 'Keep how-to and tutorial search intent grouped under the broader guide archive.',
  },
  {
    canonical: 'delivery-reliability',
    aliases: ['silent-message-loss', 'message-loss'],
    reason: 'Keep silent message loss fixes under the durable delivery reliability archive.',
  },
];

export function normalizeTagAliasKey(tag) {
  return String(tag)
    .trim()
    .toLowerCase()
    .normalize('NFKC')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-');
}

export function tagAliasMap(registry = tagAliasRegistry) {
  const aliases = new Map();

  for (const entry of registry) {
    const canonical = normalizeTagAliasKey(entry.canonical);
    for (const alias of entry.aliases) {
      aliases.set(normalizeTagAliasKey(alias), canonical);
    }
  }

  return aliases;
}
