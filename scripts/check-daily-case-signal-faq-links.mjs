#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const requiredCaseSignals = [
  {
    date: '2026-06-28',
    file: 'src/content/blog/en/openclaw-daily-2026-06-28.md',
    signals: [
      {
        label: 'ChatGPT dictation',
        terms: ['ChatGPT dictation', 'dictation model', 'voice input'],
        links: ['/en/blog/openclaw-model-fallback-strategy/'],
      },
      {
        label: 'Claude Tag',
        terms: ['Claude Tag', 'Slack-based', 'channel memory scope'],
        links: ['/en/blog/openclaw-model-fallback-strategy/', '/en/blog/openclaw-vps-deployment-complete-guide/'],
      },
    ],
  },
  {
    date: '2026-06-27',
    file: 'src/content/blog/en/openclaw-daily-2026-06-27.md',
    signals: [
      {
        label: 'ChatGPT dictation',
        terms: ['ChatGPT dictation', 'dictation model', 'voice input'],
        links: ['/en/blog/openclaw-model-fallback-strategy/'],
      },
      {
        label: 'ChatGPT personal finance',
        terms: ['personal finance', 'US Plus users', 'data boundary'],
        links: ['/en/blog/what-is-openclaw/', '/en/blog/openclaw-vps-deployment-complete-guide/'],
      },
    ],
  },
  {
    date: '2026-06-26',
    file: 'src/content/blog/en/openclaw-daily-2026-06-26.md',
    signals: [
      {
        label: 'Claude Tag',
        terms: ['Claude Tag', 'Slack-based', 'channel memory scope'],
        links: ['/en/blog/openclaw-model-fallback-strategy/', '/en/blog/openclaw-vps-deployment-complete-guide/'],
      },
    ],
  },
];

const errors = [];
let checkedSignals = 0;

for (const spec of requiredCaseSignals) {
  const text = readFileSync(join(process.cwd(), spec.file), 'utf8');

  if (!text.includes('## Case-Level FAQ')) {
    errors.push(`${spec.file}: missing ## Case-Level FAQ section for case-level signal capture`);
    continue;
  }

  const section = text.split('## Case-Level FAQ', 2)[1]?.split(/\n##\s+/u, 1)[0] || '';
  const questionCount = (section.match(/^###\s+/gmu) || []).length;
  if (questionCount < spec.signals.length) {
    errors.push(`${spec.file}: Case-Level FAQ has ${questionCount} question(s), expected at least ${spec.signals.length}`);
  }

  for (const signal of spec.signals) {
    checkedSignals += 1;
    for (const term of signal.terms) {
      if (!section.includes(term)) {
        errors.push(`${spec.file}: ${signal.label} FAQ missing required term: ${term}`);
      }
    }
    for (const link of signal.links) {
      if (!section.includes(`](${link})`)) {
        errors.push(`${spec.file}: ${signal.label} FAQ missing required internal link: ${link}`);
      }
    }
  }
}

if (errors.length > 0) {
  console.error('Daily case signal FAQ link check failed:');
  for (const error of errors) {
    console.error(` - ${error}`);
  }
  process.exit(1);
}

console.log(`Daily case signal FAQ link check passed: ${checkedSignals} case-level signals have FAQ copy and internal links.`);
