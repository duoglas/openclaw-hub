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
DOMAIN_ALERT_FILE="${OUT_DIR}/stale-domain-alert-${MONDAY}-to-${SUNDAY}.md"

mkdir -p "$OUT_DIR"

DOMAIN_HYGIENE_STATUS="not-run"
if bash scripts/scan-stale-domain.sh >/tmp/stale_domain_weekly.log 2>&1; then
  DOMAIN_HYGIENE_STATUS="ok"
else
  DOMAIN_HYGIENE_STATUS="alert"
fi

collect_new_posts() {
  local lang="$1"
  local out=""
  local count=0
  while IFS=$'\t' read -r d slug; do
    [ -n "$d" ] || continue
    if [[ "$d" < "$MONDAY" || "$d" > "$SUNDAY" ]]; then
      continue
    fi
    out+="- [ ] ${slug} (/${lang}/blog/${slug}/)\n"
    count=$((count + 1))
  done < <(
    find "src/content/blog/${lang}" -maxdepth 1 -type f -name '*.md' -printf '%f\n' \
      | sed 's/\.md$//' \
      | awk -F'-' '{date=""; for(i=1;i<=NF;i++){if($i ~ /^[0-9]{4}$/ && (i+2)<=NF && $(i+1) ~ /^[0-9]{2}$/ && $(i+2) ~ /^[0-9]{2}$/){date=$i"-"$(i+1)"-"$(i+2); break}}; if(date!="") print date"\t"$0;}' \
      | sort
  )

  if [ -z "$out" ]; then
    out="- [ ] (no dated posts this week)\n"
  fi

  printf "%s|||%b" "$count" "$out"
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

collect_gsc_data_gap_alert() {
  local dir="reports/seo/daily"
  local max_streak=0
  local current_streak=0
  local missing_days=0
  local total_days=7

  for i in {0..6}; do
    local d f
    d=$(TZ="$TZ" date -d "$MONDAY +${i} days" +%F)
    f="$dir/$d.md"

    local day_missing=1
    if [ -f "$f" ]; then
      local clicks impr ctr pos
      clicks=$(awk -F': *' '/^- Clicks:/{print $2; exit}' "$f" | tr -d '[:space:]')
      impr=$(awk -F': *' '/^- Impressions:/{print $2; exit}' "$f" | tr -d '[:space:]')
      ctr=$(awk -F': *' '/^- CTR:/{print $2; exit}' "$f" | tr -d '[:space:]')
      pos=$(awk -F': *' '/^- Avg Position:/{print $2; exit}' "$f" | tr -d '[:space:]')

      if [ -n "$clicks" ] || [ -n "$impr" ] || [ -n "$ctr" ] || [ -n "$pos" ]; then
        day_missing=0
      fi
    fi

    if [ "$day_missing" -eq 1 ]; then
      missing_days=$((missing_days + 1))
      current_streak=$((current_streak + 1))
      if [ "$current_streak" -gt "$max_streak" ]; then
        max_streak=$current_streak
      fi
    else
      current_streak=0
    fi
  done

  local status level note
  if [ "$max_streak" -ge 3 ]; then
    status="🔴 RED"
    level="alert"
    note="连续 ${max_streak} 天 GSC 数据缺失（>=3 天触发标红）"
  elif [ "$max_streak" -gt 0 ]; then
    status="🟡 WARN"
    level="warn"
    note="最大连续缺失 ${max_streak} 天（未达标红阈值）"
  else
    status="🟢 OK"
    level="ok"
    note="本周无连续缺失"
  fi

  printf "%s|||%s|||%s|||%s|||%s" "$status" "$max_streak" "$missing_days/$total_days" "$note" "$level"
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

collect_low_ctr_opportunities() {
  local dir="reports/seo/daily"
  local files=()
  local f d

  if [ ! -d "$dir" ]; then
    echo "| - | 0 | 0 | 0.00% | 0.0 | - |"
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
    echo "| - | 0 | 0 | 0.00% | 0.0 | - |"
    return
  fi

  awk '
    function trim(s) { gsub(/^[[:space:]]+|[[:space:]]+$/, "", s); return s }
    function extract_num(s, r, tmp) {
      if (match(tolower(s), r)) {
        tmp = substr(tolower(s), RSTART, RLENGTH)
        gsub(/^[^:=]*[:=][[:space:]]*/, "", tmp)
        gsub(/%/, "", tmp)
        return tmp + 0
      }
      return ""
    }
    function extract_text(s, r, tmp) {
      if (match(tolower(s), r)) {
        tmp = substr(s, RSTART, RLENGTH)
        sub(/^[^:=]*[:=][[:space:]]*/, "", tmp)
        return trim(tmp)
      }
      return ""
    }
    {
      if ($0 !~ /^[[:space:]]*[0-9]+\.[[:space:]]*/) next
      raw = $0
      gsub(/^[[:space:]]*[0-9]+\.[[:space:]]*/, "", raw)
      n = split(raw, parts, "|")
      query = trim(parts[1])
      if (query == "" || query == "-") next

      clicks = extract_num(raw, /(clicks?|clk)[:=][[:space:]]*[0-9]+([.][0-9]+)?/)
      impr = extract_num(raw, /(impressions?|imp)[:=][[:space:]]*[0-9]+([.][0-9]+)?/)
      ctr = extract_num(raw, /ctr[:=][[:space:]]*[0-9]+([.][0-9]+)?%?/)
      pos = extract_num(raw, /(position|pos)[:=][[:space:]]*[0-9]+([.][0-9]+)?/)
      page = extract_text(raw, /(page|url|landing)[:=][[:space:]]*[^|]+/)

      key = tolower(query)
      q[key] = query
      if (clicks != "") clicks_sum[key] += clicks
      if (impr != "") impr_sum[key] += impr
      if (ctr != "") { ctr_sum[key] += ctr; ctr_cnt[key] += 1 }
      if (pos != "") { pos_sum[key] += pos; pos_cnt[key] += 1 }
      if (page != "" && !(key in page_map)) page_map[key] = page
    }
    END {
      for (k in q) {
        impr = (k in impr_sum) ? impr_sum[k] : 0
        if (impr < 50) continue
        avg_ctr = (k in ctr_cnt && ctr_cnt[k] > 0) ? ctr_sum[k] / ctr_cnt[k] : 0
        if (avg_ctr > 3.0) continue
        clicks = (k in clicks_sum) ? clicks_sum[k] : 0
        avg_pos = (k in pos_cnt && pos_cnt[k] > 0) ? pos_sum[k] / pos_cnt[k] : 0
        page = (k in page_map) ? page_map[k] : "-"
        printf "%010.2f\t| %s | %.0f | %.0f | %.2f%% | %.1f | %s |\n", impr, q[k], clicks, impr, avg_ctr, avg_pos, page
      }
    }
  ' "${files[@]}" | sort -r | cut -f2- | head -n 10
}

collect_low_ctr_by_language() {
  local lang="$1"
  local dir="reports/seo/daily"
  local files=()
  local f d

  if [ ! -d "$dir" ]; then
    echo "| - | 0 | 0 | 0.00% | 0.0 | - |"
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
    echo "| - | 0 | 0 | 0.00% | 0.0 | - |"
    return
  fi

  awk -v target_lang="$lang" '
    function trim(s) { gsub(/^[[:space:]]+|[[:space:]]+$/, "", s); return s }
    function extract_num(s, r, tmp) {
      if (match(tolower(s), r)) {
        tmp = substr(tolower(s), RSTART, RLENGTH)
        gsub(/^[^:=]*[:=][[:space:]]*/, "", tmp)
        gsub(/%/, "", tmp)
        return tmp + 0
      }
      return ""
    }
    function extract_text(s, r, tmp) {
      if (match(tolower(s), r)) {
        tmp = substr(s, RSTART, RLENGTH)
        sub(/^[^:=]*[:=][[:space:]]*/, "", tmp)
        return trim(tmp)
      }
      return ""
    }
    function row_lang(page) {
      p = tolower(page)
      if (p ~ /^\/?en\// || p ~ /\/en\//) return "en"
      if (p ~ /^\/?zh\// || p ~ /\/zh\//) return "zh"
      return "other"
    }
    {
      if ($0 !~ /^[[:space:]]*[0-9]+\.[[:space:]]*/) next
      raw = $0
      gsub(/^[[:space:]]*[0-9]+\.[[:space:]]*/, "", raw)
      n = split(raw, parts, "|")
      query = trim(parts[1])
      if (query == "" || query == "-") next

      clicks = extract_num(raw, /(clicks?|clk)[:=][[:space:]]*[0-9]+([.][0-9]+)?/)
      impr = extract_num(raw, /(impressions?|imp)[:=][[:space:]]*[0-9]+([.][0-9]+)?/)
      ctr = extract_num(raw, /ctr[:=][[:space:]]*[0-9]+([.][0-9]+)?%?/)
      pos = extract_num(raw, /(position|pos)[:=][[:space:]]*[0-9]+([.][0-9]+)?/)
      page = extract_text(raw, /(page|url|landing)[:=][[:space:]]*[^|]+/)

      if (row_lang(page) != target_lang) next

      key = tolower(query)
      q[key] = query
      if (clicks != "") clicks_sum[key] += clicks
      if (impr != "") impr_sum[key] += impr
      if (ctr != "") { ctr_sum[key] += ctr; ctr_cnt[key] += 1 }
      if (pos != "") { pos_sum[key] += pos; pos_cnt[key] += 1 }
      if (page != "" && !(key in page_map)) page_map[key] = page
    }
    END {
      for (k in q) {
        impr = (k in impr_sum) ? impr_sum[k] : 0
        if (impr < 50) continue
        avg_ctr = (k in ctr_cnt && ctr_cnt[k] > 0) ? ctr_sum[k] / ctr_cnt[k] : 0
        if (avg_ctr > 3.0) continue
        clicks = (k in clicks_sum) ? clicks_sum[k] : 0
        avg_pos = (k in pos_cnt && pos_cnt[k] > 0) ? pos_sum[k] / pos_cnt[k] : 0
        page = (k in page_map) ? page_map[k] : "-"
        printf "%010.2f\t| %s | %.0f | %.0f | %.2f%% | %.1f | %s |\n", impr, q[k], clicks, impr, avg_ctr, avg_pos, page
      }
    }
  ' "${files[@]}" | sort -r | cut -f2- | head -n 10
}

collect_title_rewrite_queue() {
  local dir="reports/seo/daily"
  local files=()
  local f d

  if [ ! -d "$dir" ]; then
    echo "| - | 0 | 0.00% | 0.0 | - | 0 | - |"
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
    echo "| - | 0 | 0.00% | 0.0 | - | 0 | - |"
    return
  fi

  awk '
    function trim(s) { gsub(/^[[:space:]]+|[[:space:]]+$/, "", s); return s }
    function extract_num(s, r, tmp) {
      if (match(tolower(s), r)) {
        tmp = substr(tolower(s), RSTART, RLENGTH)
        gsub(/^[^:=]*[:=][[:space:]]*/, "", tmp)
        gsub(/%/, "", tmp)
        return tmp + 0
      }
      return ""
    }
    function extract_text(s, r, tmp) {
      if (match(tolower(s), r)) {
        tmp = substr(s, RSTART, RLENGTH)
        sub(/^[^:=]*[:=][[:space:]]*/, "", tmp)
        return trim(tmp)
      }
      return ""
    }
    function focus(ctr, pos) {
      if (ctr < 1.0) return "问题导向标题+明确结果（优先）"
      if (pos <= 8) return "标题+描述同步改写，强化价值点"
      return "标题与查询意图对齐，并补充FAQ长尾"
    }
    {
      if ($0 !~ /^[[:space:]]*[0-9]+\.[[:space:]]*/) next
      raw = $0
      gsub(/^[[:space:]]*[0-9]+\.[[:space:]]*/, "", raw)
      n = split(raw, parts, "|")
      query = trim(parts[1])
      if (query == "" || query == "-") next

      impr = extract_num(raw, /(impressions?|imp)[:=][[:space:]]*[0-9]+([.][0-9]+)?/)
      ctr = extract_num(raw, /ctr[:=][[:space:]]*[0-9]+([.][0-9]+)?%?/)
      pos = extract_num(raw, /(position|pos)[:=][[:space:]]*[0-9]+([.][0-9]+)?/)
      page = extract_text(raw, /(page|url|landing)[:=][[:space:]]*[^|]+/)

      key = tolower(query)
      q[key] = query
      if (impr != "") impr_sum[key] += impr
      if (ctr != "") { ctr_sum[key] += ctr; ctr_cnt[key] += 1 }
      if (pos != "") { pos_sum[key] += pos; pos_cnt[key] += 1 }
      if (page != "" && !(key in page_map)) page_map[key] = page
    }
    END {
      for (k in q) {
        impr = (k in impr_sum) ? impr_sum[k] : 0
        if (impr < 100) continue

        avg_ctr = (k in ctr_cnt && ctr_cnt[k] > 0) ? ctr_sum[k] / ctr_cnt[k] : 0
        if (avg_ctr > 3.0) continue

        avg_pos = (k in pos_cnt && pos_cnt[k] > 0) ? pos_sum[k] / pos_cnt[k] : 0
        if (avg_pos <= 0) avg_pos = 30

        page = (k in page_map) ? page_map[k] : "-"
        ctr_gap = (3.5 - avg_ctr)
        if (ctr_gap < 0) ctr_gap = 0
        pos_bonus = (20 - avg_pos)
        if (pos_bonus < 0) pos_bonus = 0
        priority = int((impr * ctr_gap) / 100 + pos_bonus)

        printf "%010d\t| %s | %.0f | %.2f%% | %.1f | %s | %d | %s |\n", priority, q[k], impr, avg_ctr, avg_pos, page, priority, focus(avg_ctr, avg_pos)
      }
    }
  ' "${files[@]}" | sort -r | cut -f2- | head -n 8
}

build_title_rewrite_act_items() {
  local rows="$1"
  local out=""
  local rank=0

  while IFS= read -r line; do
    [ -n "$line" ] || continue
    if [[ "$line" =~ ^\|[[:space:]]-[[:space:]]\| ]]; then
      continue
    fi

    local query impressions ctr avg_pos page priority focus
    query=$(printf "%s" "$line" | awk -F'|' '{gsub(/^[ \t]+|[ \t]+$/, "", $2); print $2}')
    impressions=$(printf "%s" "$line" | awk -F'|' '{gsub(/^[ \t]+|[ \t]+$/, "", $3); print $3}')
    ctr=$(printf "%s" "$line" | awk -F'|' '{gsub(/^[ \t]+|[ \t]+$/, "", $4); print $4}')
    avg_pos=$(printf "%s" "$line" | awk -F'|' '{gsub(/^[ \t]+|[ \t]+$/, "", $5); print $5}')
    page=$(printf "%s" "$line" | awk -F'|' '{gsub(/^[ \t]+|[ \t]+$/, "", $6); print $6}')
    priority=$(printf "%s" "$line" | awk -F'|' '{gsub(/^[ \t]+|[ \t]+$/, "", $7); print $7}')
    focus=$(printf "%s" "$line" | awk -F'|' '{gsub(/^[ \t]+|[ \t]+$/, "", $8); print $8}')

    [ -n "$query" ] || continue
    rank=$((rank + 1))
    out+="- [ ] Top ${rank}: \\`${page}\\`（Query: ${query}）\\n"
    out+="  - priority: ${priority} | impressions: ${impressions} | ctr: ${ctr} | avg position: ${avg_pos}\\n"
    out+="  - rewrite focus: ${focus}\\n"
    out+="  - owner: hub-growth-worker | due: ${SUNDAY}\\n"

    if [ "$rank" -ge 3 ]; then
      break
    fi
  done <<< "$rows"

  if [ -z "$out" ]; then
    out+="- [ ] 当前缺少可计算的高展现低CTR query 数据，先完成 7 天 GSC query 回填后再生成标题改写清单。\\n"
    out+="  - owner: hub-growth-worker | due: ${SUNDAY}\\n"
  fi

  printf "%b" "$out"
}

NEW_EN_RAW=$(collect_new_posts en)
NEW_ZH_RAW=$(collect_new_posts zh)
NEW_EN_COUNT=${NEW_EN_RAW%%|||*}
NEW_ZH_COUNT=${NEW_ZH_RAW%%|||*}
NEW_EN=${NEW_EN_RAW#*|||}
NEW_ZH=${NEW_ZH_RAW#*|||}
PUBLISHED_POSTS=$((NEW_EN_COUNT + NEW_ZH_COUNT))
UPDATED=$(collect_changed_posts)
TECH=$(collect_technical_changes)
DAILY_SUMMARY=$(collect_daily_snapshot_summary)
GSC_GAP_RAW=$(collect_gsc_data_gap_alert)
GSC_GAP_STATUS=${GSC_GAP_RAW%%|||*}
GSC_GAP_RAW=${GSC_GAP_RAW#*|||}
GSC_GAP_STREAK=${GSC_GAP_RAW%%|||*}
GSC_GAP_RAW=${GSC_GAP_RAW#*|||}
GSC_GAP_MISSING_RATIO=${GSC_GAP_RAW%%|||*}
GSC_GAP_RAW=${GSC_GAP_RAW#*|||}
GSC_GAP_NOTE=${GSC_GAP_RAW%%|||*}
GSC_GAP_LEVEL=${GSC_GAP_RAW##*|||}
LOW_CTR_ROWS=$(collect_low_ctr_opportunities)
if [ -z "$LOW_CTR_ROWS" ]; then
  LOW_CTR_ROWS="| - | 0 | 0 | 0.00% | 0.0 | - |"
fi

LOW_CTR_ROWS_EN=$(collect_low_ctr_by_language en)
if [ -z "$LOW_CTR_ROWS_EN" ]; then
  LOW_CTR_ROWS_EN="| - | 0 | 0 | 0.00% | 0.0 | - |"
fi

LOW_CTR_ROWS_ZH=$(collect_low_ctr_by_language zh)
if [ -z "$LOW_CTR_ROWS_ZH" ]; then
  LOW_CTR_ROWS_ZH="| - | 0 | 0 | 0.00% | 0.0 | - |"
fi

TITLE_REWRITE_ROWS=$(collect_title_rewrite_queue)
if [ -z "$TITLE_REWRITE_ROWS" ]; then
  TITLE_REWRITE_ROWS="| - | 0 | 0.00% | 0.0 | - | 0 | - |"
fi
TITLE_REWRITE_ACT_ITEMS=$(build_title_rewrite_act_items "$TITLE_REWRITE_ROWS")

count_real_items() {
  printf "%s" "$1" | awk '/^- \[ \] / && $0 !~ /\(no .*\)/ {c++} END{print c+0}'
}

UPDATED_COUNT=$(count_real_items "$UPDATED")
TECH_COUNT=$(count_real_items "$TECH")

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
| Impressions | 0 | 0 | 0% | If GSC export is missing, keep 0 and mark data-gap in Section 10 |
| Clicks | 0 | 0 | 0% | If GSC export is missing, keep 0 and mark data-gap in Section 10 |
| CTR | 0.00% | 0.00% | 0.00pp | Use daily snapshots if available; otherwise keep 0.00% with data-gap note |
| Avg Position | 0.0 | 0.0 | 0.0 | Lower is better |
| Indexed Pages | 0 | 0 | 0 | Pull from GSC Indexing export in weekly ops; if absent, keep 0 and open follow-up task |
| Published Posts | 0 | ${PUBLISHED_POSTS} | n/a | Auto list below |

## 3) Top Pages (This Week)

| Page | Clicks | Impressions | CTR | Avg Position |
|---|---:|---:|---:|---:|
| /zh/daily/ | 0 | 0 | 0.00% | 0.0 |
| /en/daily/ | 0 | 0 | 0.00% | 0.0 |

## 4) Low-CTR Query Opportunities (auto, This Week)

| Query | Clicks | Impressions | CTR | Avg Position | Landing Page |
|---|---:|---:|---:|---:|---|
${LOW_CTR_ROWS}

## 5) High Impression Low-CTR Queries Top10 (auto, by language)

### EN Top10
| Query | Clicks | Impressions | CTR | Avg Position | Landing Page |
|---|---:|---:|---:|---:|---|
${LOW_CTR_ROWS_EN}

### ZH Top10
| Query | Clicks | Impressions | CTR | Avg Position | Landing Page |
|---|---:|---:|---:|---:|---|
${LOW_CTR_ROWS_ZH}

## 6) 标题改写优先级队列（auto, 高展现低CTR）

| Query | Impressions | CTR | Avg Position | Landing Page | Priority | Recommended Rewrite Focus |
|---|---:|---:|---:|---|---:|---|
${TITLE_REWRITE_ROWS}

## 7) Content Execution This Week

### New posts (EN)
${NEW_EN}

### New posts (ZH)
${NEW_ZH}

### Updated posts (git-tracked)
${UPDATED}

### Technical SEO changes (git-tracked)
${TECH}

## 8) Daily Snapshot Rollup (auto)

${DAILY_SUMMARY}

## 9) GSC Data Gap Alert (auto)

| Metric | Value |
|---|---|
| Alert Status | ${GSC_GAP_STATUS} |
| Max Consecutive Missing Days | ${GSC_GAP_STREAK} |
| Missing Days (week) | ${GSC_GAP_MISSING_RATIO} |
| Note | ${GSC_GAP_NOTE} |

## 10) Domain Hygiene Guardrail (auto)

- Stale domain scanner status: ${DOMAIN_HYGIENE_STATUS}
- Alert file: ${DOMAIN_ALERT_FILE}

## 11) Wins / Problems

### Wins
- Published ${PUBLISHED_POSTS} post(s) this week and merged ${TECH_COUNT} technical SEO change(s), keeping content + technical cadence synchronized.
- Weekly diagnostics now include low-CTR opportunities by language and title rewrite priority queue, shortening the path from signal to action.

### Problems / Blockers
- GSC completeness status this week: ${GSC_GAP_STATUS} — ${GSC_GAP_NOTE}.
- Several low-CTR opportunities are still in “detected” state and not yet converted into title/meta rewrite commits.

## 12) Action Plan (Next Week)

- [ ] P0: Backfill latest 7 daily snapshots with real GSC clicks/impressions/CTR/position data (priority raised if Section 9 is 🔴) | owner: hub-growth-worker | due: ${SUNDAY}
- [ ] P1: Execute title/meta rewrites for top 3 items from Section 6 and publish EN/ZH updates | owner: hub-growth-worker | due: ${SUNDAY}
- [ ] P2: Verify legacy URL redirects and canonical behavior in production, then document results in WEEKLY_REVIEW.md | owner: hub-growth-worker | due: ${SUNDAY}

## 13) Data Sources

- Google Search Console (Performance + Pages + Queries)
- Cloudflare Web Analytics (optional)
- Site content git log: \
  \
  git log --since='${MONDAY} 00:00' --until='${SUNDAY} 23:59' --oneline

EOF

echo "Generated: ${OUT_FILE}"

cat > "WEEKLY_REVIEW.md" <<EOF
# WEEKLY_REVIEW.md

## Week Meta
- Week: ${MONDAY} to ${SUNDAY}
- Owner: hub-growth-worker
- Reviewed at: ${NOW} (Asia/Shanghai)

## OODA / PDCA Review

### Observe (data)
- GSC data completeness alert: ${GSC_GAP_STATUS} (${GSC_GAP_NOTE}).
- Top gaining pages: Prioritize pages with rising impressions from latest daily snapshots; if missing GSC, use Section 6 top rewrite candidates as proxy.
- Top losing pages: Flag pages with sustained low CTR (<3%) and falling impressions from weekly snapshots.
- Top queries by impressions but low CTR: Source from weekly report Section 5/6 (auto-generated queue), execute top 3 rewrites.
- New pages indexed: Verify newly published URLs in Search Console; if data unavailable, create one indexing check task in Action Plan.
- Published posts (auto): ${PUBLISHED_POSTS}
- Updated posts (git-tracked): ${UPDATED_COUNT}
- Technical SEO commits (git-tracked): ${TECH_COUNT}

### Orient (diagnosis)
- Why did winners win?
- Why did losers lose?
- Bottlenecks (content quality / SEO tech / distribution):

### Decide (next-week priorities, max 3)
1. Improve CTR for high-impression low-CTR queries with title/meta rewrites on top 3 pages.
2. Strengthen internal links from newly published posts to pillar pages.
3. Close one technical SEO hygiene item (schema/canonical/redirect verification) and verify in production.

### Act (execution log)
- Task: 生成“标题改写执行清单”（来自周报 Section 6）并写入本节
  - commit:
  - expected impact: 将高展现低 CTR 机会直接转为下周可执行改写任务
  - status: done

${TITLE_REWRITE_ACT_ITEMS}

## Postmortem
- What was low-value busy work this week?
- What should stop next week?
- What should scale next week?
EOF

echo "Updated: WEEKLY_REVIEW.md"