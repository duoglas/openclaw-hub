#!/usr/bin/env python3
"""Analyze website data and generate optimization proposals.

Reads collect.json from state/website/{date}/, compares with history,
scores issues, and generates actionable proposals.

Output: state/website/{date}/proposals.json
"""
import datetime, json, os, sys, glob, statistics

os.chdir("/home/duoglas/projects/openclaw-hub")
STATE_DIR = "/home/duoglas/projects/openclaw-hub/state/website"

def load_collection(date_str):
    path = os.path.join(STATE_DIR, date_str, "collect.json")
    if os.path.exists(path):
        return json.load(open(path))
    return None

def load_all_collections():
    dirs = sorted(glob.glob(os.path.join(STATE_DIR, "*/")))
    results = []
    for d in dirs:
        f = os.path.join(d, "collect.json")
        if os.path.exists(f):
            results.append(json.load(open(f)))
    return results

def analyze_pages(pages):
    """Analyze page health and identify issues."""
    issues = []
    for p in pages:
        name = p.get("name", "?")
        code = p.get("code", 0)
        time_s = p.get("time", 0)
        
        # Check HTTP status
        if code != 200:
            issues.append({
                "type": "http_error",
                "page": name,
                "severity": "critical" if code >= 500 else "high",
                "detail": f"HTTP {code}",
            })
        
        # Check response time (>3s is slow)
        if time_s > 3:
            issues.append({
                "type": "slow_response",
                "page": name,
                "severity": "medium",
                "detail": f"{time_s:.1f}s response time",
            })
        elif time_s > 1.5:
            issues.append({
                "type": "slow_response",
                "page": name,
                "severity": "low",
                "detail": f"{time_s:.1f}s response time (acceptable but slow)",
            })
        
        # Check content type for HTML pages
        ct = p.get("content_type", "")
        if "html" in ct.lower() or name == "home":
            pass  # OK
        elif ct and not any(x in ct for x in ["html", "json"]):
            issues.append({
                "type": "wrong_content_type",
                "page": name,
                "severity": "high",
                "detail": f"Content-Type: {ct}",
            })
    
    return issues

def analyze_gsc(gsc_data, trend_data, date_str):
    """Analyze GSC data and generate SEO proposals."""
    if not gsc_data or gsc_data.get("impressions", 0) == 0:
        return [], None
    
    issues = []
    proposals = []
    
    ctr = gsc_data.get("ctr", 0)
    pos = gsc_data.get("position", 0)
    imp = gsc_data.get("impressions", 0)
    click = gsc_data.get("clicks", 0)
    
    # CTR analysis
    if ctr < 0.01:  # < 1%
        issues.append({
            "type": "low_ctr",
            "severity": "critical" if ctr < 0.005 else "high",
            "detail": f"CTR {ctr*100:.2f}% (benchmark 2-8%)",
        })
        proposals.append({
            "id": "fix-meta-tags",
            "title": "批量修复 meta title/description 提升 CTR",
            "type": "seo",
            "severity": "high",
            "description": f"CTR 仅 {ctr*100:.2f}%，远低于 2-8% 基准。需优化所有 top pages 的 title 和 description。",
            "action": "analyze_meta_and_rewrite",
            "priority": "P0",
            "requires_approval": True,
            "effort": "1-2h",
            "expected_impact": "CTR 提升 2-5x → 日均点击 +{int(click * 3)}",
        })
    
    # Position analysis
    if pos > 10:
        issues.append({
            "type": "low_position",
            "severity": "medium",
            "detail": f"平均排名 {pos:.1f}，约在第 1 页底部",
        })
        proposals.append({
            "id": "improve-ranking",
            "title": "提升平均排名从 {:.1f} 到 5-8".format(pos),
            "type": "seo",
            "severity": "medium",
            "description": "当前平均排名 {:.1f}，38%+ 查询在 21+ 位。需增强内容质量和内部链接。".format(pos),
            "action": "content_quality_improvement",
            "priority": "P2",
            "requires_approval": True,
            "effort": "1-2 周",
            "expected_impact": "排名提升 → 展示量 +30-50%",
        })
    
    # Trend analysis
    if trend_data:
        imp_growth = trend_data.get("imp_growth_pct", 0)
        click_growth = trend_data.get("click_growth_pct", 0)
        
        if imp_growth > 20:
            issues.append({
                "type": "growth_positive",
                "severity": "info",
                "detail": f"展示量增长 {imp_growth:+.1f}%",
            })
        
        if click_growth < imp_growth * 0.5 and imp_growth > 0:
            issues.append({
                "type": "click_underperforming",
                "severity": "medium",
                "detail": f"点击增长 ({click_growth:+.1f}%) 落后展示增长 ({imp_growth:+.1f}%)，CTR 在恶化",
            })
            proposals.append({
                "id": "click-gap",
                "title": "修复点击-展示增长差距",
                "type": "seo",
                "severity": "medium",
                "description": "展示增长 {}%，点击仅增长 {}%。CTR 在恶化，需紧急优化标题。".format(imp_growth, click_growth),
                "action": "priority_title_rewrite",
                "priority": "P0",
                "requires_approval": True,
                "effort": "半天",
                "expected_impact": "挽回流失的点击",
            })
    
    return issues, proposals

def analyze_content(articles, gsc_data):
    """Analyze content structure and ratios."""
    issues = []
    proposals = []
    
    if gsc_data:
        imp = gsc_data.get("impressions", 0)
        total = articles.get("total", 0)
        
        if imp > 0 and total > 0:
            ratio = imp / total
            if ratio < 50:
                issues.append({
                    "type": "low_traffic_per_article",
                    "severity": "low",
                    "detail": f"每篇文章平均 {ratio:.0f} 展示，内容利用率低",
                })
    
    # Check if guide content is growing
    return issues, proposals

def build_proposal_package(date_str, collection, gsc_issues, gsc_proposals):
    """Build a complete proposal package."""
    if not collection:
        return None
    
    summary = collection.get("summary", {})
    pages = collection.get("pages", [])
    
    # Calculate health score
    total_pages = summary.get("pages_total", 0)
    errors = summary.get("pages_errors", 0)
    health_score = max(0, 100 - errors * 20 - (total_pages - summary.get("pages_ok", 0)) * 5)
    
    # Combine all issues
    page_issues = analyze_pages(pages)
    all_issues = gsc_issues + page_issues + [{"type": "health_score", "severity": "info", "detail": f"健康分 {health_score}/100"}]
    
    # Categorize by severity
    critical = [i for i in all_issues if i.get("severity") == "critical"]
    high = [i for i in all_issues if i.get("severity") == "high"]
    medium = [i for i in all_issues if i.get("severity") == "medium"]
    low = [i for i in all_issues if i.get("severity") == "low"]
    info = [i for i in all_issues if i.get("severity") == "info"]
    
    return {
        "date": date_str,
        "generated_at": datetime.datetime.now(datetime.timezone(datetime.timedelta(hours=8))).isoformat(),
        "health_score": health_score,
        "summary": {
            "pages_ok": summary.get("pages_ok", 0),
            "pages_total": total_pages,
            "gsc_impressions": collection.get("gsc", {}).get("impressions", 0),
            "gsc_clicks": collection.get("gsc", {}).get("clicks", 0),
            "gsc_ctr": collection.get("gsc", {}).get("ctr", 0) * 100 if collection.get("gsc") else 0,
            "gsc_position": collection.get("gsc", {}).get("position", 0),
        },
        "issues": {
            "critical": critical,
            "high": high,
            "medium": medium,
            "low": low,
            "info": info,
            "total": len(all_issues),
        },
        "proposals": gsc_proposals or [],
    }

def main():
    # Use latest available data
    dirs = sorted(glob.glob(os.path.join(STATE_DIR, "*/")))
    if not dirs:
        print("No collection data found")
        sys.exit(1)
    
    latest_dir = dirs[-1]
    date_str = os.path.basename(latest_dir)
    collection = load_collection(date_str)
    
    if not collection:
        print(f"No collect.json in {date_str}")
        sys.exit(1)
    
    gsc_data = collection.get("gsc")
    trend_data = collection.get("gsc_trend")
    
    print(f"Analyzing data for {date_str}...")
    print(f"  GSC: {gsc_data.get('impressions', 0):,} imp, {gsc_data.get('clicks', 0)} click, CTR {gsc_data.get('ctr', 0)*100:.2f}%")
    
    gsc_issues, gsc_proposals = analyze_gsc(gsc_data, trend_data, date_str)
    content_issues, content_proposals = analyze_content(collection.get("articles", {}), gsc_data)
    
    # Merge proposals
    all_proposals = (gsc_proposals or []) + (content_proposals or [])
    
    result = build_proposal_package(date_str, collection, gsc_issues, all_proposals)
    
    out_file = os.path.join(STATE_DIR, date_str, "proposals.json")
    with open(out_file, "w") as f:
        json.dump(result, f, ensure_ascii=False, indent=2)
    print(f"Proposals -> {out_file}")
    
    # Summary
    issues = result.get("issues", {})
    print(f"\n  Health score: {result.get('health_score', 0)}/100")
    print(f"  Issues: {issues.get('critical',[])} critical, {len(issues.get('high',[]))} high, {len(issues.get('medium',[]))} medium")
    print(f"  Proposals: {len(result.get('proposals', []))}")
    
    for p in result.get("proposals", []):
        print(f"    [{p.get('priority','?')}] {p.get('id','?')}: {p.get('title','')}")
        print(f"      Action: {p.get('action','?')} | Approval: {p.get('requires_approval')} | Impact: {p.get('expected_impact','')}")
    
    return result

if __name__ == "__main__":
    main()
