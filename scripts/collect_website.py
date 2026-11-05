#!/usr/bin/env python3
"""Collect website health and SEO data for kuoo.uk.

Phase 1: Daily data collection
- GSC analytics (via existing fetch_gsc.py)
- Site health checks (HTTP, pages, performance)
- Output: state/website/{date}/collect.json

Usage: collect_website.py [YYYY-MM-DD]
"""
import datetime, json, os, sys, subprocess, glob, statistics

os.chdir("/home/duoglas/projects/openclaw-hub")

TZ = datetime.timezone(datetime.timedelta(hours=8))
STATE_DIR = "/home/duoglas/projects/openclaw-hub/state/website"

def sh(cmd, **kw):
    return subprocess.run(cmd, capture_output=True, text=True, timeout=30, **kw)

def curl(url, timeout=15):
    r = sh(["curl", "-s", "-o", "/dev/null", "-w",
            "%{http_code}|%{size_download}|%{time_total}|%{content_type}",
            "--max-time", str(timeout), url])
    if r.returncode != 0:
        return {"status": "error", "code": str(r.returncode), "error": r.stderr[:200]}
    parts = r.stdout.strip().split("|")
    return {
        "status": "ok",
        "code": int(parts[0]) if parts[0].isdigit() else 0,
        "size": int(parts[1]) if parts[1].isdigit() else 0,
        "time": float(parts[2]) if parts[2].replace('.','',1).isdigit() else 0,
        "content_type": parts[3] if len(parts) > 3 else "",
    }

def check_pages():
    pages = [
        {"url": "https://kuoo.uk/", "name": "home"},
        {"url": "https://kuoo.uk/zh/", "name": "zh_home"},
        {"url": "https://kuoo.uk/en/", "name": "en_home"},
        {"url": "https://kuoo.uk/zh/daily/", "name": "zh_daily"},
        {"url": "https://kuoo.uk/en/daily/", "name": "en_daily"},
        {"url": "https://kuoo.uk/zh/blog/", "name": "zh_blog"},
        {"url": "https://kuoo.uk/en/blog/", "name": "en_blog"},
        {"url": "https://kuoo.uk/en/about/", "name": "about"},
        {"url": "https://kuoo.uk/zh/about/", "name": "about_zh"},
        {"url": "https://kuoo.uk/ads.txt", "name": "ads_txt"},
        {"url": "https://kuoo.uk/robots.txt", "name": "robots"},
        {"url": "https://kuoo.uk/sitemap.xml", "name": "sitemap"},
    ]
    results = []
    for p in pages:
        r = curl(p["url"])
        r["name"] = p["name"]
        r["url"] = p["url"]
        results.append(r)
    return results

def check_sitemap():
    counts = {}
    for i in range(5):
        r = curl(f"https://kuoo.uk/sitemap-{i}.xml")
        if r["status"] == "ok" and r["code"] == 200:
            r2 = sh(["curl", "-s", "--max-time", "15", f"https://kuoo.uk/sitemap-{i}.xml"])
            content = r2.stdout
            count = content.count("<loc>")
            counts[f"sitemap-{i}.xml"] = {"status": r["code"], "pages": count, "size": r["size"]}
        else:
            counts[f"sitemap-{i}.xml"] = {"status": r["code"], "pages": 0, "error": r.get("error", "fail")}
        if count == 0 and i > 0:
            break
    return counts

def count_articles():
    zh_count = len(glob.glob("src/content/blog/zh/*.md"))
    en_count = len(glob.glob("src/content/blog/en/*.md"))
    return {"zh": zh_count, "en": en_count, "total": zh_count + en_count}

def get_latest_gsc():
    files = sorted(glob.glob("data/gsc/gsc-*.json"))
    if not files:
        return None
    latest = files[-1]
    d = json.load(open(latest))
    ov = d.get("overall", {})
    return {
        "file": os.path.basename(latest),
        "date": d.get("date", ""),
        "impressions": ov.get("impressions", 0),
        "clicks": ov.get("clicks", 0),
        "ctr": ov.get("ctr", 0),
        "position": ov.get("position", 0),
        "top_pages_count": len(d.get("top_pages", [])),
        "top_queries_count": len(d.get("top_queries", [])),
    }

def get_gsc_trend():
    files = sorted(glob.glob("data/gsc/gsc-*.json"))
    if len(files) < 2:
        return None
    recent = []
    for f in files:
        d = json.load(open(f))
        ov = d.get("overall", {})
        recent.append({"impressions": ov.get("impressions", 0), "clicks": ov.get("clicks", 0)})
    recent = [r for r in recent if r["impressions"] > 0]
    if len(recent) < 2:
        return None
    n = len(recent)
    h1 = statistics.mean([r["impressions"] for r in recent[:n//2]])
    h2 = statistics.mean([r["impressions"] for r in recent[n//2:]])
    h1c = statistics.mean([r["clicks"] for r in recent[:n//2]])
    h2c = statistics.mean([r["clicks"] for r in recent[n//2:]])
    return {
        "days": len(recent),
        "h1_avg_imp": round(h1),
        "h2_avg_imp": round(h2),
        "imp_growth_pct": round((h2/h1 - 1) * 100, 1) if h1 > 0 else 0,
        "h1_avg_click": round(h1c),
        "h2_avg_click": round(h2c),
        "click_growth_pct": round((h2c/h1c - 1) * 100, 1) if h1c > 0 else 0,
    }

def main():
    tz = TZ
    date = datetime.datetime.now(tz).date()
    date_str = date.isoformat()
    out_dir = os.path.join(STATE_DIR, date_str)
    os.makedirs(out_dir, exist_ok=True)

    print(f"Collecting data for {date_str}...")

    pages = check_pages()
    sitemap = check_sitemap()
    articles = count_articles()
    latest_gsc = get_latest_gsc()
    gsc_trend = get_gsc_trend()

    errors = sum(1 for p in pages if p.get("code", 0) != 200 and p.get("status") != "ok")
    avg_time = statistics.mean([p["time"] for p in pages if p["time"] > 0]) if pages else 0
    ok_pages = sum(1 for p in pages if p.get("code", 0) == 200 and p.get("status") == "ok")

    result = {
        "date": date_str,
        "collected_at": datetime.datetime.now(tz).isoformat(),
        "summary": {"pages_ok": ok_pages, "pages_total": len(pages), "pages_errors": errors, "avg_response_time_s": round(avg_time, 2)},
        "pages": pages,
        "sitemap": sitemap,
        "articles": articles,
        "gsc": latest_gsc,
        "gsc_trend": gsc_trend,
    }

    out_file = os.path.join(out_dir, "collect.json")
    with open(out_file, "w") as f:
        json.dump(result, f, ensure_ascii=False, indent=2)
    print(f"OK -> {out_file}")
    return result

if __name__ == "__main__":
    result = main()
    s = result.get("summary", {})
    gsc = result.get("gsc", {})
    print(f"  Pages: {s.get('pages_ok',0)}/{s.get('pages_total',0)} OK, avg {s.get('avg_response_time_s',0)}s")
    if gsc:
        print(f"  GSC: {gsc.get('impressions',0):,} imp, {gsc.get('clicks',0)} click, CTR {gsc.get('ctr',0)*100:.2f}%")
    trend = result.get("gsc_trend")
    if trend:
        print(f"  Trend: {trend.get('imp_growth_pct',0):+.1f}% imp, {trend.get('click_growth_pct',0):+.1f}% click")
