#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

python3 - <<'PY'
import re
from pathlib import Path

root = Path('src/content/blog')
languages = ['en', 'zh']

frontmatter_re = re.compile(r'^---\n(.*?)\n---\n?', re.S)
inline_tags_re = re.compile(r'^tags:\s*\[(.*?)\]\s*$', re.M)


def parse_tags(frontmatter: str):
    m = inline_tags_re.search(frontmatter)
    if m:
        raw = m.group(1).strip()
        if not raw:
            return []
        return [x.strip().strip('"\'') for x in raw.split(',') if x.strip()]

    lines = frontmatter.splitlines()
    tags = []
    in_tags = False
    tag_indent = None

    for line in lines:
        if not in_tags:
            if re.match(r'^tags:\s*$', line):
                in_tags = True
            continue

        if not line.strip():
            continue

        m_item = re.match(r'^(\s*)-\s+(.*)$', line)
        if m_item:
            indent = len(m_item.group(1))
            if tag_indent is None:
                tag_indent = indent
            elif indent < tag_indent:
                break
            tags.append(m_item.group(2).strip().strip('"\''))
            continue

        if re.match(r'^\w+:', line):
            break

    return [t for t in tags if t]


failures = []
checked_files = 0

for lang in languages:
    lang_dir = root / lang
    if not lang_dir.exists():
        continue

    lower_to_variants = {}

    for file in sorted(lang_dir.glob('*.md')):
        checked_files += 1
        text = file.read_text(encoding='utf-8')
        m = frontmatter_re.match(text)
        if not m:
            continue

        frontmatter = m.group(1)
        tags = parse_tags(frontmatter)

        for tag in tags:
            key = tag.lower()
            variants = lower_to_variants.setdefault(key, {})
            locations = variants.setdefault(tag, [])
            locations.append(str(file))

    for lower, variants in sorted(lower_to_variants.items()):
        if len(variants) > 1:
            detail = []
            for variant, files in sorted(variants.items()):
                detail.append(f"{variant} ({len(files)})")
            failures.append((lang, lower, detail))

if failures:
    print('[tag-case] FAILED: found case-collision tags (same lowercase, different variants).')
    for lang, lower, detail in failures:
        print(f"[tag-case] lang={lang} key={lower} variants={', '.join(detail)}")
    raise SystemExit(1)

print(f"[tag-case] PASS: no tag case-collisions found across {checked_files} files.")
PY
