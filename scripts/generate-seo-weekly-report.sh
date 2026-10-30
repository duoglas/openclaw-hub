#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
# Generates a factual public snapshot only; never overwrites the editorial review.
exec python3 -B scripts/editorial_weekly.py
