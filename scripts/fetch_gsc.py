#!/usr/bin/env python3
"""Fetch GSC search analytics for kuoo.uk on M5 (via proxy 8016) and push to djvm.

djvm cannot reach Google; M5 can via http://127.0.0.1:8016.
Credentials are read live from djvm's .env so there is one source of truth.

Usage: fetch_gsc.py [YYYY-MM-DD]  (default: yesterday Asia/Shanghai)
Output on djvm: ~/projects/openclaw-hub/data/gsc/gsc-<date>.json
"""
import datetime, json, os, subprocess, sys, tempfile, time

PROXY = 'http://127.0.0.1:8016'
TOKEN_URL = 'https://oauth2.googleapis.com/token'
API_BASE = 'https://searchconsole.googleapis.com'

# M5 needs to reach djvm via bastion (djrmbp-2) over Tailscale
DJVM_SSH = ['ssh', '-J', 'djrmbp-2', '-o', 'ConnectTimeout=30', '-o', 'BatchMode=yes',
            '-o', 'ServerAliveInterval=15', '-o', 'ServerAliveCountMax=2',
            'duoglas@100.114.215.115']

def sh(cmd, **kw):
    return subprocess.run(cmd, capture_output=True, text=True, **kw)

def sh_retry(cmd, retries=4, delay=15, **kw):
    r = None
    for i in range(retries):
        r = sh(cmd, **kw)
        if r.returncode == 0:
            return r
        print(f'sh_retry {i+1}/{retries} failed rc={r.returncode}: {" ".join(cmd[:3])}')
        time.sleep(delay)
    return r

def sh_djvm(cmd):
    """Run a command on djvm via bastion, retry on SSH failure."""
    return sh_retry(DJVM_SSH + [cmd], retries=3, delay=10)

def read_env_from_djvm():
    r = sh_djvm('sed -n "s/^GSC_//p" /home/duoglas/projects/openclaw-hub/.env | head -4')
    env = {}
    for line in r.stdout.splitlines():
        line = line.strip()
        if line.startswith('CLIENT_ID='):
            env['client_id'] = line.split('=', 1)[1]
        elif line.startswith('CLIENT_SECRET='):
            env['client_secret'] = line.split('=', 1)[1]
        elif line.startswith('REFRESH_TOKEN='):
            env['refresh_token'] = line.split('=', 1)[1]
        elif line.startswith('SITE_URL='):
            env['site_url'] = line.split('=', 1)[1]
    if len(env) < 4:
        sys.exit(f'failed to read GSC env from djvm: stdout={r.stdout!r} stderr={r.stderr!r} rc={r.returncode}')
    return env

def get_access_token(env):
    r = sh(['curl', '-s', '-m', '30', '--proxy', PROXY, '-X', 'POST', TOKEN_URL, '-d',
            f"grant_type=refresh_token&refresh_token={env['refresh_token']}"
            f"&client_id={env['client_id']}&client_secret={env['client_secret']}"])
    if not r.stdout.strip():
        sys.exit(f'token endpoint returned empty response (rc={r.returncode})')
    try:
        d = json.loads(r.stdout)
    except json.JSONDecodeError as e:
        sys.exit(f'token endpoint returned non-JSON: {r.stdout[:200]!r} (error: {e})')
    if 'access_token' not in d:
        sys.exit(f'token refresh failed: {d}')
    return d['access_token']

def query(at, site, body):
    with tempfile.NamedTemporaryFile('w', suffix='.json', delete=False) as f:
        json.dump(body, f)
        path = f.name
    r = sh(['curl', '-s', '-m', '30', '--proxy', PROXY, '-X', 'POST',
            f'{API_BASE}/webmasters/v3/sites/{site}/searchAnalytics/query',
            '-H', f'Authorization: Bearer {at}', '-H', 'Content-Type: application/json',
            '--data-binary', f'@{path}'])
    os.unlink(path)
    d = json.loads(r.stdout)
    if 'error' in d:
        sys.exit(f'GSC query failed: {d}')
    return d

def main():
    tz = datetime.timezone(datetime.timedelta(hours=8))
    if len(sys.argv) > 1:
        date = datetime.date.fromisoformat(sys.argv[1])
    else:
        date = datetime.datetime.now(tz).date() - datetime.timedelta(days=1)
    dstr = date.isoformat()
    start = (date - datetime.timedelta(days=29)).isoformat()

    env = read_env_from_djvm()
    site = env['site_url'].replace('/', '%2F')
    at = get_access_token(env)

    overall = query(at, site, {'startDate': start, 'endDate': dstr})
    by_page = query(at, site, {'startDate': start, 'endDate': dstr,
                               'dimensions': ['page'], 'rowLimit': 50})
    by_query = query(at, site, {'startDate': start, 'endDate': dstr,
                                'dimensions': ['query'], 'rowLimit': 50})

    payload = {
        'date': dstr, 'site': env['site_url'],
        'window': {'start': start, 'end': dstr},
        'fetched_at': datetime.datetime.now(tz).isoformat(),
        'overall': overall.get('rows', [{}])[0],
        'top_pages': by_page.get('rows', []),
        'top_queries': by_query.get('rows', []),
    }

    with tempfile.NamedTemporaryFile('w', suffix='.json', delete=False) as f:
        json.dump(payload, f, ensure_ascii=False, indent=2)
        local = f.name
    remote_path = f'/home/duoglas/projects/openclaw-hub/data/gsc/gsc-{dstr}.json'
    sh_djvm('mkdir -p /home/duoglas/projects/openclaw-hub/data/gsc')
    remote_scp = f'{local} duoglas@100.114.215.115:{remote_path}'
    r = sh_retry(['scp', '-o', 'ConnectTimeout=30', '-o', 'ServerAliveInterval=15', '-J', 'djrmbp-2',
                  remote_scp])
    os.unlink(local)
    if r.returncode != 0:
        sys.exit(f'scp to djvm failed: {r.stderr}')

    ov = payload['overall']
    print(f"OK {dstr}: impressions={ov.get('impressions', 0)} clicks={ov.get('clicks', 0)} "
          f"ctr={ov.get('ctr', 0):.4f} pushed to {remote_path}")

if __name__ == '__main__':
    main()
