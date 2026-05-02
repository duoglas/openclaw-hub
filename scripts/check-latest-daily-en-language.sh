#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

latest_file=$(python3 - <<'PY'
from pathlib import Path
import re

files = sorted(Path('src/content/blog/en').glob('openclaw-daily-*.md'))
latest = None
for path in files:
    text = path.read_text(encoding='utf-8')
    match = re.search(r'^pubDate:\s*"?([0-9]{4}-[0-9]{2}-[0-9]{2})"?\s*$', text, re.M)
    if not match:
        continue
    item = (match.group(1), str(path))
    if latest is None or item > latest:
        latest = item

if latest:
    print(latest[1])
PY
)

if [ -z "${latest_file:-}" ]; then
  echo "Latest EN daily language check failed: no EN daily post with pubDate found"
  exit 1
fi

python3 - "$latest_file" <<'PY'
from pathlib import Path
import re
import sys

path = Path(sys.argv[1])
text = path.read_text(encoding='utf-8')
status = 0

frontmatter = text.split('---', 2)[1] if text.startswith('---') and text.count('---') >= 2 else ''
body = text.split('---', 2)[2] if text.startswith('---') and text.count('---') >= 2 else text

if not re.search(r'^lang:\s*["\']?en["\']?\s*$', frontmatter, re.M):
    print(f"Latest EN daily language check failed: {path} missing lang: en")
    status = 1

first_heading = next((line.strip() for line in body.splitlines() if line.startswith('# ')), '')
if not re.match(r'^# AI & Tech Daily Brief', first_heading):
    print(f"Latest EN daily language check failed: {path} has non-English daily H1")
    print(f"  H1: {first_heading or '(missing)'}")
    status = 1

# Ignore URLs before counting CJK characters, so localized source links do not fail the page.
text_without_urls = re.sub(r'https?://\S+', '', text)
cjk_matches = list(re.finditer(r'[\u4e00-\u9fff]', text_without_urls))
if len(cjk_matches) > 20:
    print(f"Latest EN daily language check failed: {path} contains {len(cjk_matches)} CJK characters outside URLs")
    sample = ''.join(match.group(0) for match in cjk_matches[:60])
    print(f"  Sample: {sample}")
    status = 1

if status:
    sys.exit(status)

print(f"Latest EN daily language check passed: {path} has English H1 and <=20 CJK chars outside URLs")
PY
