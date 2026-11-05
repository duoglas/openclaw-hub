#!/usr/bin/env python3
"""Scan for trending frameworks/tools (runs via proxy on M5)."""
import json, os, glob, datetime, subprocess, re

os.chdir("/home/duoglas/projects/openclaw-hub")
STATE_DIR = "/home/duoglas/projects/openclaw-hub/state/website"
PROXY = "--proxy http://127.0.0.1:8016"

def sh_proxy(urls):
    if isinstance(urls, str):
        urls = ["https://" + urls] if not urls.startswith("http") else [urls]
    cmd = ["curl", "-s", "-L", "-m", "15", PROXY] + urls
    r = subprocess.run(cmd, capture_output=True, text=True, timeout=20)
    return r.stdout if r.returncode == 0 else ""

def scan_github_trending():
    html = sh_proxy("https://github.com/trending?since=daily")
    repos = []
    for m in re.finditer(r'href="/([^/]+)/([^"]+)"', html):
        owner, repo = m.group(1), m.group(2)
        if repo and "/" not in repo and "." not in repo:
            repos.append({"owner": owner, "repo": repo, "url": "https://github.com/" + owner + "/" + repo})
    return repos[:20]

def scan_hackernews():
    ids = json.loads(sh_proxy("https://hacker-news.firebaseio.com/v0/topstories.json"))[:20]
    stories = []
    for id in ids:
        d = json.loads(sh_proxy("https://hacker-news.firebaseio.com/v0/item/" + str(id) + ".json"))
        if d and d.get("score", 0) > 50:
            stories.append({"title": d.get("title", ""), "url": d.get("url", ""), "score": d.get("score", 0)})
    return stories

def scan_producthunt():
    html = sh_proxy("https://www.producthunt.com/")
    products = []
    for m in re.finditer(r'<h2[^>]*>([^<]+)</h2>', html):
        products.append({"name": m.group(1).strip()})
    return products[:10]

def main():
    date_str = datetime.datetime.now().strftime("%Y-%m-%d")
    out_dir = os.path.join(STATE_DIR, date_str)
    os.makedirs(out_dir, exist_ok=True)
    
    gh = scan_github_trending()
    hn = scan_hackernews()
    ph = scan_producthunt()
    
    out = {"date": date_str, "scanned_at": datetime.datetime.now().isoformat(),
           "github": gh, "hackernews": hn, "producthunt": ph}
    
    out_file = os.path.join(out_dir, "trends.json")
    with open(out_file, "w") as f:
        json.dump(out, f, ensure_ascii=False, indent=2)
    print("OK: " + str(len(gh)) + " gh, " + str(len(hn)) + " hn, " + str(len(ph)) + " ph -> " + out_file)

if __name__ == "__main__":
    main()
