#!/usr/bin/env bash
set -euo pipefail
export PATH="$HOME/.local/node-v24.21.0-linux-x64/bin:$HOME/.local/share/pnpm:$HOME/.local/bin:$PATH"
cd "$(dirname "$0")/.."
case "${1:-}" in
  daily|analysis|refresh)
    [[ $# -eq 1 ]] || { echo 'Scheduled runner accepts one fixed content kind only' >&2; exit 2; }
    exec timeout 2100 python3 -B scripts/editorial_pipeline.py run "$1"
    ;;
  status)
    [[ $# -eq 1 ]] || exit 2
    exec timeout 30 python3 -B scripts/editorial_pipeline.py status
    ;;
  *) echo 'Usage: bash scripts/editorial-run.sh daily|analysis|refresh|status' >&2; exit 2 ;;
esac
