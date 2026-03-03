#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

python3 - <<'PY'
from pathlib import Path
import re

ROOT = Path('src/content/blog')
files = sorted(ROOT.glob('en/*.md')) + sorted(ROOT.glob('zh/*.md'))

if not files:
    raise SystemExit('Blog FAQ quality check failed: no blog markdown files found.')

errors = []
checked = 0
faq_posts = 0

for file in files:
    checked += 1
    text = file.read_text(encoding='utf-8')
    if not text.startswith('---\n'):
        errors.append(f'{file}: missing frontmatter header')
        continue

    parts = text.split('---', 2)
    if len(parts) < 3:
        errors.append(f'{file}: malformed frontmatter block')
        continue

    fm = parts[1]
    if not re.search(r'(?m)^faq\s*:\s*$', fm):
        continue

    faq_posts += 1

    qas = re.findall(
        r'(?ms)^\s*-\s*question\s*:\s*(["\']?.+?["\']?)\s*$\n\s*answer\s*:\s*(["\']?.+?["\']?)\s*$',
        fm,
    )

    if len(qas) < 2:
        errors.append(f'{file}: faq has {len(qas)} Q&A item(s), require >=2')
        continue

    for idx, (question, answer) in enumerate(qas, start=1):
        if not question.strip('"\' ').strip():
            errors.append(f'{file}: faq item #{idx} has empty question')
        if not answer.strip('"\' ').strip():
            errors.append(f'{file}: faq item #{idx} has empty answer')

if errors:
    print('Blog FAQ quality check failed:')
    for e in errors:
        print(f' - {e}')
    raise SystemExit(1)

print(f'Blog FAQ quality check passed: checked {checked} files, FAQ-enabled posts={faq_posts}.')
PY
