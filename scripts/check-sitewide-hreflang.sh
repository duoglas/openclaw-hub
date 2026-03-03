#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

if [ ! -d dist/en ] || [ ! -d dist/zh ]; then
  echo "Sitewide hreflang check failed: dist/en or dist/zh not found. Run pnpm build first."
  exit 1
fi

python3 - <<'PY'
from pathlib import Path
from urllib.parse import quote
import re

BASE = "https://kuoo.uk"
ROOT = Path("dist")

files = sorted([p for p in ROOT.joinpath("en").rglob("*.html") if p.is_file()]) + \
        sorted([p for p in ROOT.joinpath("zh").rglob("*.html") if p.is_file()])

if not files:
    raise SystemExit("Sitewide hreflang check failed: no html files found under dist/en or dist/zh")

errors = []
count = 0

link_re = re.compile(r"<link\b[^>]*>", re.IGNORECASE)
rel_re = re.compile(r"\brel\s*=\s*([\"'])(.*?)\1", re.IGNORECASE)
href_re = re.compile(r"\bhref\s*=\s*([\"'])(.*?)\1", re.IGNORECASE)
hreflang_re = re.compile(r"\bhreflang\s*=\s*([\"'])(.*?)\1", re.IGNORECASE)

for f in files:
    count += 1
    html = f.read_text(encoding="utf-8", errors="ignore")

    rel_path = "/" + f.relative_to(ROOT).as_posix()
    if rel_path.endswith("index.html"):
        rel_path = rel_path[:-10]

    encoded_self = quote(rel_path, safe="/")
    expected_self = f"{BASE}{encoded_self}"

    if rel_path.startswith("/en/"):
        lang = "en"
        other_lang = "zh"
        other_path = rel_path.replace("/en/", "/zh/", 1)
        xdefault_path = rel_path
    elif rel_path.startswith("/zh/"):
        lang = "zh"
        other_lang = "en"
        other_path = rel_path.replace("/zh/", "/en/", 1)
        xdefault_path = rel_path.replace("/zh/", "/en/", 1)
    else:
        errors.append(f"{f}: path is not under /en/ or /zh/ ({rel_path})")
        continue

    expected_other = f"{BASE}{quote(other_path, safe='/')}"
    expected_xdefault = f"{BASE}{quote(xdefault_path, safe='/')}"

    seen = {}
    duplicates = set()

    for tag in link_re.findall(html):
        rel_m = rel_re.search(tag)
        if not rel_m:
            continue
        rel_val = rel_m.group(2).lower().strip()
        if "alternate" not in rel_val.split():
            continue

        hreflang_m = hreflang_re.search(tag)
        href_m = href_re.search(tag)
        if not hreflang_m or not href_m:
            continue

        hlang = hreflang_m.group(2).strip()
        href = href_m.group(2).strip()

        if hlang in seen:
            duplicates.add(hlang)
        else:
            seen[hlang] = href

    if duplicates:
        errors.append(f"{f}: duplicate hreflang entries found: {', '.join(sorted(duplicates))}")

    required = [lang, other_lang, "x-default"]
    for key in required:
        if key not in seen:
            errors.append(f"{f}: missing hreflang='{key}' alternate link")

    for key, href in seen.items():
        if key in required and not href.startswith(f"{BASE}/"):
            errors.append(f"{f}: hreflang='{key}' must use absolute kuoo.uk URL, got: {href}")

    if seen.get(lang) and seen[lang] != expected_self:
        errors.append(f"{f}: hreflang='{lang}' mismatch\n  expected: {expected_self}\n  actual:   {seen[lang]}")

    if seen.get(other_lang) and seen[other_lang] != expected_other:
        errors.append(f"{f}: hreflang='{other_lang}' mismatch\n  expected: {expected_other}\n  actual:   {seen[other_lang]}")

    if seen.get("x-default") and seen["x-default"] != expected_xdefault:
        errors.append(f"{f}: hreflang='x-default' mismatch\n  expected: {expected_xdefault}\n  actual:   {seen['x-default']}")

if errors:
    print("Sitewide hreflang check failed:")
    for err in errors:
        print(f" - {err}")
    raise SystemExit(1)

print(f"Sitewide hreflang check passed: {count} pages validated")
PY
