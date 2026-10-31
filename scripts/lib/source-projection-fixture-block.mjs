// Bound a fixture story by its own heading, not the next distant separator.
// Shared by the scope, metadata, quote and registry checks so they inspect the
// same evidence. This helper does not change published articles or invent facts.
export function storyBlockFor(fixtureText, title) {
  const lines = String(fixtureText || '').replace(/\r\n?/g, '\n').split('\n');
  let start = -1;
  let level = 0;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    const heading = line.match(/^(#{1,6})\s+(?:\d+[.、)）]\s*)?(.+)$/u);
    const numbered = line.match(/^\d+[.、)）]\s*(.+)$/u);
    if ((heading?.[2] || numbered?.[1]) === title) {
      start = i;
      level = heading?.[1].length || 0;
      break;
    }
  }
  if (start < 0) return '';
  let end = lines.length;
  for (let i = start + 1; i < lines.length; i++) {
    const line = lines[i].trim();
    const heading = line.match(/^(#{1,6})\s+/u);
    if (line === '---' || (heading && (!level || heading[1].length <= level))
        || /^(?:#{2,4}\s*)?\d+[.、)）]\s*/u.test(line)) {
      end = i;
      break;
    }
  }
  return lines.slice(start, end).join('\n');
}
