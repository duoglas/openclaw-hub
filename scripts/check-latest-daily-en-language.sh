#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

ROLLING_LIMIT="${ROLLING_EN_DAILY_LIMIT:-7}"

mapfile -t target_files < <(python3 - "$ROLLING_LIMIT" <<'PY'
from pathlib import Path
import re
import sys

try:
    limit = int(sys.argv[1])
except Exception:
    limit = 7

items = []
for path in Path('src/content/blog/en').glob('openclaw-daily-*.md'):
    text = path.read_text(encoding='utf-8')
    match = re.search(r'^pubDate:\s*"?([0-9]{4}-[0-9]{2}-[0-9]{2})"?\s*$', text, re.M)
    if not match:
        continue
    items.append((match.group(1), str(path)))

for _, path in sorted(items, reverse=True)[:limit]:
    print(path)
PY
)

if [ "${#target_files[@]}" -eq 0 ]; then
  echo "Rolling EN daily language check failed: no EN daily posts with pubDate found"
  exit 1
fi

python3 - "${target_files[@]}" <<'PY'
from pathlib import Path
import re
import sys

paths = [Path(item) for item in sys.argv[1:]]
status = 0
checked = 0

for path in paths:
    text = path.read_text(encoding='utf-8')
    frontmatter = text.split('---', 2)[1] if text.startswith('---') and text.count('---') >= 2 else ''
    body = text.split('---', 2)[2] if text.startswith('---') and text.count('---') >= 2 else text
    checked += 1

    if not re.search(r'^lang:\s*["\']?en["\']?\s*$', frontmatter, re.M):
        print(f"Rolling EN daily language check failed: {path} missing lang: en")
        status = 1

    first_heading = next((line.strip() for line in body.splitlines() if line.startswith('# ')), '')
    if not re.match(r'^# AI & Tech Daily Brief', first_heading):
        print(f"Rolling EN daily language check failed: {path} has non-English daily H1")
        print(f"  H1: {first_heading or '(missing)'}")
        status = 1

    # Ignore URLs before counting CJK characters, so localized source links do not fail the page.
    text_without_urls = re.sub(r'https?://\S+', '', text)
    cjk_matches = list(re.finditer(r'[\u4e00-\u9fff]', text_without_urls))
    if len(cjk_matches) > 20:
        print(f"Rolling EN daily language check failed: {path} contains {len(cjk_matches)} CJK characters outside URLs")
        sample = ''.join(match.group(0) for match in cjk_matches[:60])
        print(f"  Sample: {sample}")
        status = 1

if status:
    sys.exit(status)

files = ', '.join(str(path) for path in paths)
print(f"Rolling EN daily language check passed: {checked} latest EN daily posts have English H1 and <=20 CJK chars outside URLs ({files})")
PY
