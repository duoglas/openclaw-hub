#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

python3 - <<'PY'
from pathlib import Path
import re
import sys

RULES = {
    "en": {"min": 45, "max": 260},
    "zh": {"min": 25, "max": 130},
}

BANNED_PATTERNS = [
    r"\bTODO\b",
    r"\bTBD\b",
    r"coming soon",
    r"to be updated",
    r"lorem ipsum",
    r"待补充",
    r"稍后补充",
    r"敬请期待",
    r"这里填写",
]

frontmatter_re = re.compile(r"^---\n(.*?)\n---\n", re.S)
desc_re = re.compile(r"^description:\s*(.+)$", re.M)

errors = []
checked = 0

for lang, cfg in RULES.items():
    for file in sorted(Path(f"src/content/blog/{lang}").glob("*.md")):
        text = file.read_text(encoding="utf-8")
        m = frontmatter_re.search(text)
        if not m:
            errors.append(f"{file}: missing frontmatter block")
            continue

        fm = m.group(1)
        dm = desc_re.search(fm)
        if not dm:
            errors.append(f"{file}: missing description field")
            continue

        desc = dm.group(1).strip().strip('"\'')
        desc_len = len(desc)

        if desc_len < cfg["min"] or desc_len > cfg["max"]:
            errors.append(
                f"{file}: description length {desc_len} out of range [{cfg['min']}, {cfg['max']}]"
            )

        for pat in BANNED_PATTERNS:
            if re.search(pat, desc, flags=re.I):
                errors.append(f"{file}: description contains banned placeholder pattern '{pat}'")
                break

        checked += 1

if errors:
    print("Meta description quality check failed:")
    for e in errors:
        print(f"- {e}")
    sys.exit(1)

print(f"Meta description quality check passed ({checked} files validated)")
PY
