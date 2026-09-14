#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

python3 - <<'PY'
from pathlib import Path
from urllib.parse import urlparse
import sys
import xml.etree.ElementTree as ET

root = Path('dist')
base = 'https://kuoo.uk'
feeds = {
    'en': {
        'path': root / 'en/daily/rss.xml',
        'channel_title': 'OpenClaw Hub - AI & Tech Daily',
        'channel_link': f'{base}/en/daily/',
        'language': 'en-us',
        'blog_prefix': '/en/blog/',
    },
    'zh': {
        'path': root / 'zh/daily/rss.xml',
        'channel_title': 'OpenClaw Hub - AI/科技日报',
        'channel_link': f'{base}/zh/daily/',
        'language': 'zh-cn',
        'blog_prefix': '/zh/blog/',
    },
}

errors = []

def text(parent, name):
    node = parent.find(name)
    return (node.text or '').strip() if node is not None else ''

for lang, expected in feeds.items():
    path = expected['path']
    if not path.is_file():
        errors.append(f'{lang}: missing {path}')
        continue

    try:
        channel = ET.parse(path).getroot().find('channel')
    except ET.ParseError as exc:
        errors.append(f'{lang}: invalid XML in {path}: {exc}')
        continue

    if channel is None:
        errors.append(f'{lang}: RSS channel missing in {path}')
        continue

    for field, want in (
        ('title', expected['channel_title']),
        ('link', expected['channel_link']),
        ('language', expected['language']),
    ):
        got = text(channel, field)
        if got != want:
            errors.append(f'{lang}: channel {field} expected {want!r}, got {got!r}')

    items = channel.findall('item')
    if not items:
        errors.append(f'{lang}: feed contains no items')
        continue

    seen = set()
    for index, item in enumerate(items, 1):
        link = text(item, 'link')
        guid = text(item, 'guid')
        pub_date = text(item, 'pubDate')
        title = text(item, 'title')
        if not title:
            errors.append(f'{lang}: item {index} has no title')
        if not link.startswith(base + expected['blog_prefix']) or not link.endswith('/'):
            errors.append(f'{lang}: item {index} link escapes language blog route: {link!r}')
            continue
        if link in seen:
            errors.append(f'{lang}: duplicate item link: {link}')
        seen.add(link)
        if guid != link:
            errors.append(f'{lang}: item {index} guid does not match link: {guid!r}')
        if not pub_date:
            errors.append(f'{lang}: item {index} has no pubDate')
        relative = urlparse(link).path.lstrip('/')
        html_path = root / relative / 'index.html'
        if not html_path.is_file():
            errors.append(f'{lang}: item {index} points to missing built page: {link}')

    print(f'RSS feed integrity passed for {lang}: {len(items)} items, {len(seen)} unique built-page links')

if errors:
    print('RSS feed integrity check failed:', file=sys.stderr)
    for error in errors:
        print(f'- {error}', file=sys.stderr)
    sys.exit(1)

print('RSS feed integrity check passed')
PY
