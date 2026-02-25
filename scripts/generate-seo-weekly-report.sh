#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

TZ="Asia/Shanghai"
TODAY=$(TZ="$TZ" date +%F)
WEEKDAY=$(TZ="$TZ" date +%u) # 1=Mon..7=Sun
MONDAY=$(TZ="$TZ" date -d "$TODAY -$((WEEKDAY-1)) days" +%F)
SUNDAY=$(TZ="$TZ" date -d "$MONDAY +6 days" +%F)
NOW=$(TZ="$TZ" date '+%F %H:%M')

OUT_DIR="reports/seo-weekly"
OUT_FILE="${OUT_DIR}/seo-weekly-${MONDAY}-to-${SUNDAY}.md"

mkdir -p "$OUT_DIR"

collect_new_posts() {
  local lang="$1"
  local out=""
  while IFS=$'\t' read -r d slug; do
    [ -n "$d" ] || continue
    if [[ "$d" < "$MONDAY" || "$d" > "$SUNDAY" ]]; then
      continue
    fi
    out+="- [ ] ${slug} (/${lang}/blog/${slug}/)\n"
  done < <(
    find "src/content/blog/${lang}" -maxdepth 1 -type f -name '*.md' -printf '%f\n' \
      | sed 's/\.md$//' \
      | awk -F'-' '{date=""; for(i=1;i<=NF;i++){if($i ~ /^[0-9]{4}$/ && (i+2)<=NF && $(i+1) ~ /^[0-9]{2}$/ && $(i+2) ~ /^[0-9]{2}$/){date=$i"-"$(i+1)"-"$(i+2); break}}; if(date!="") print date"\t"$0;}' \
      | sort
  )

  if [ -z "$out" ]; then
    out="- [ ] (no dated posts this week)\n"
  fi

  printf "%b" "$out"
}

collect_changed_posts() {
  local out=""
  while IFS= read -r f; do
    [ -n "$f" ] || continue
    local lang slug
    lang=$(echo "$f" | awk -F'/' '{print $(NF-1)}')
    slug=$(basename "$f" .md)
    out+="- [ ] ${slug} (/${lang}/blog/${slug}/)\n"
  done < <(git log --since="${MONDAY} 00:00" --until="${SUNDAY} 23:59" --name-only --pretty=format: \
    | grep '^src/content/blog/.*/.*\.md$' \
    | sort -u)

  if [ -z "$out" ]; then
    out="- [ ] (no post updates found in git log this week)\n"
  fi

  printf "%b" "$out"
}

collect_technical_changes() {
  local out=""
  while IFS= read -r line; do
    [ -n "$line" ] || continue
    out+="- [ ] ${line}\n"
  done < <(git log --since="${MONDAY} 00:00" --until="${SUNDAY} 23:59" --oneline -- \
    astro.config.mjs package.json scripts .github/workflows public src/components src/layouts src/pages \
    | sed 's/^[0-9a-f]\+ /`&` /')

  if [ -z "$out" ]; then
    out="- [ ] (no technical SEO related commits found this week)\n"
  fi

  printf "%b" "$out"
}

collect_daily_snapshot_summary() {
  local dir="reports/seo/daily"
  local files=()
  local f d
  local sum_clicks=0
  local sum_impr=0
  local cnt_clicks=0
  local cnt_impr=0
  local sum_ctr=0
  local cnt_ctr=0
  local sum_pos=0
  local cnt_pos=0
  local out=""

  if [ ! -d "$dir" ]; then
    echo "- Daily snapshots: none"
    echo "- KPI auto-sum: unavailable"
    return
  fi

  while IFS= read -r f; do
    d=$(basename "$f" .md)
    if [[ "$d" < "$MONDAY" || "$d" > "$SUNDAY" ]]; then
      continue
    fi
    files+=("$f")
  done < <(find "$dir" -maxdepth 1 -type f -name '*.md' | sort)

  if [ ${#files[@]} -eq 0 ]; then
    echo "- Daily snapshots: none (${MONDAY} ~ ${SUNDAY})"
    echo "- KPI auto-sum: unavailable"
    return
  fi

  for f in "${files[@]}"; do
    local clicks impr ctr pos
    clicks=$(awk -F': *' '/^- Clicks:/{gsub(/[^0-9]/,"",$2); print $2; exit}' "$f")
    impr=$(awk -F': *' '/^- Impressions:/{gsub(/[^0-9]/,"",$2); print $2; exit}' "$f")
    ctr=$(awk -F': *' '/^- CTR:/{gsub(/[% ]/,"",$2); print $2; exit}' "$f")
    pos=$(awk -F': *' '/^- Avg Position:/{gsub(/[^0-9.]/,"",$2); print $2; exit}' "$f")

    if [[ "$clicks" =~ ^[0-9]+$ ]]; then
      sum_clicks=$((sum_clicks + clicks))
      cnt_clicks=$((cnt_clicks + 1))
    fi
    if [[ "$impr" =~ ^[0-9]+$ ]]; then
      sum_impr=$((sum_impr + impr))
      cnt_impr=$((cnt_impr + 1))
    fi
    if [[ "$ctr" =~ ^[0-9]+([.][0-9]+)?$ ]]; then
      sum_ctr=$(awk -v a="$sum_ctr" -v b="$ctr" 'BEGIN{printf "%.4f", a+b}')
      cnt_ctr=$((cnt_ctr + 1))
    fi
    if [[ "$pos" =~ ^[0-9]+([.][0-9]+)?$ ]]; then
      sum_pos=$(awk -v a="$sum_pos" -v b="$pos" 'BEGIN{printf "%.4f", a+b}')
      cnt_pos=$((cnt_pos + 1))
    fi
  done

  local avg_ctr="N/A"
  local avg_pos="N/A"
  if [ "$cnt_ctr" -gt 0 ]; then
    avg_ctr=$(awk -v s="$sum_ctr" -v c="$cnt_ctr" 'BEGIN{printf "%.2f%%", s/c}')
  fi
  if [ "$cnt_pos" -gt 0 ]; then
    avg_pos=$(awk -v s="$sum_pos" -v c="$cnt_pos" 'BEGIN{printf "%.2f", s/c}')
  fi

  echo "- Daily snapshots: ${#files[@]} file(s)"
  echo "- Auto-aggregated KPIs (from filled daily files): Clicks=${sum_clicks}, Impressions=${sum_impr}, Avg CTR=${avg_ctr}, Avg Position=${avg_pos}"
}

NEW_EN=$(collect_new_posts en)
NEW_ZH=$(collect_new_posts zh)
UPDATED=$(collect_changed_posts)
TECH=$(collect_technical_changes)
DAILY_SUMMARY=$(collect_daily_snapshot_summary)

cat > "$OUT_FILE" <<EOF
# SEO Weekly Report

> Project: OpenClaw Hub (https://kuoo.uk)
>
> Cadence: Weekly (Mon-Sun)
>
> Owner: hub-growth-worker

---

## 1) Week Meta

- Report Week: \
  ${MONDAY} ~ ${SUNDAY}
- Prepared At: ${NOW} (Asia/Shanghai)
- Prepared By: hub-growth-worker

## 2) KPI Snapshot (WoW)

| KPI | Last Week | This Week | WoW | Notes |
|---|---:|---:|---:|---|
| Impressions | 0 | 0 | 0% | Fill from GSC |
| Clicks | 0 | 0 | 0% | Fill from GSC |
| CTR | 0.00% | 0.00% | 0.00pp | Fill from GSC |
| Avg Position | 0.0 | 0.0 | 0.0 | Lower is better |
| Indexed Pages | 0 | 0 | 0 | Fill from GSC Indexing |
| Published Posts | 0 | 0 | 0 | Auto list below |

## 3) Top Pages (This Week)

| Page | Clicks | Impressions | CTR | Avg Position |
|---|---:|---:|---:|---:|
| /zh/daily/ | 0 | 0 | 0.00% | 0.0 |
| /en/daily/ | 0 | 0 | 0.00% | 0.0 |

## 4) Top Queries (This Week)

| Query | Clicks | Impressions | CTR | Avg Position | Landing Page |
|---|---:|---:|---:|---:|---|
| - | 0 | 0 | 0.00% | 0.0 | - |

## 5) Content Execution This Week

### New posts (EN)
${NEW_EN}

### New posts (ZH)
${NEW_ZH}

### Updated posts (git-tracked)
${UPDATED}

### Technical SEO changes (git-tracked)
${TECH}

## 6) Daily Snapshot Rollup (auto)

${DAILY_SUMMARY}

## 7) Wins / Problems

### Wins
- (fill)

### Problems / Blockers
- (fill)

## 8) Action Plan (Next Week)

- [ ] P0: (task / owner / due)
- [ ] P1: (task / owner / due)
- [ ] P2: (task / owner / due)

## 9) Data Sources

- Google Search Console (Performance + Pages + Queries)
- Cloudflare Web Analytics (optional)
- Site content git log: \
  \
  git log --since='${MONDAY} 00:00' --until='${SUNDAY} 23:59' --oneline

EOF

echo "Generated: ${OUT_FILE}"