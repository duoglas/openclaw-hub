#!/bin/bash
cd /home/duoglas/projects/openclaw-hub
export PATH="/home/duoglas/.local/node-v24.21.0-linux-x64/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin"
python3 -B scripts/analyze_website.py 2>&1
