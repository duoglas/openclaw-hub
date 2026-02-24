---
title: "Build a Local AI Agent with OpenClaw on Raspberry Pi (2026 Guide)"
description: "Step-by-step guide to running OpenClaw on a Raspberry Pi 5 with Ollama for a private, always-on AI assistant. Covers hardware, installation, Home Assistant integration, and Tailscale remote access."
pubDate: 2026-02-24
tags: ["guide", "raspberry-pi", "local-ai", "ollama", "home-assistant", "deployment"]
category: "guide"
lang: "en"
---

# Build a Local AI Agent with OpenClaw on Raspberry Pi

Why rent a VPS when a $80 Raspberry Pi can run your AI agent 24/7 from home? With OpenClaw on a Raspberry Pi 5, you get a private, always-on assistant that keeps your data on your network — no cloud required.

This guide walks you through the complete setup: from choosing hardware to having a working AI agent on Telegram, with optional Home Assistant integration and remote access via Tailscale.

**What you'll have at the end:** A local AI agent running on your Raspberry Pi, accessible via Telegram from anywhere, with optional smart home control and fully local LLM inference via Ollama.

## Why Raspberry Pi?

| Factor | Raspberry Pi | VPS |
|--------|-------------|-----|
| Monthly cost | ~$3 electricity | $6–20/month |
| Data privacy | All local | Third-party server |
| Latency (local) | <10ms | 50–200ms |
| API dependency | Optional (Ollama) | Required |
| Always-on | Yes (low power ~5W) | Yes |
| Setup difficulty | Medium | Easy |

The Raspberry Pi approach shines when privacy matters and you want to minimize recurring costs. If you need cloud reliability, check our [VPS deployment guide](/en/blog/openclaw-vps-deployment-complete-guide) instead.

## Hardware Requirements

### Recommended: Raspberry Pi 5 (8GB)

- **Board:** Raspberry Pi 5, 8GB RAM — *essential* for running local LLMs
- **Storage:** 64GB+ microSD (A2 rated) or NVMe SSD via HAT (strongly recommended for Ollama model storage)
- **Power:** Official 27W USB-C power supply
- **Cooling:** Active cooler or case with fan (sustained AI workloads generate heat)
- **Network:** Ethernet recommended for stability; Wi-Fi works

### Minimum: Raspberry Pi 4 (8GB)

Works but noticeably slower for local LLM inference. The 4GB model is **not recommended** — Ollama alone needs 4GB+ for useful models.

### What Won't Work

- Raspberry Pi 3 and earlier: insufficient RAM and CPU
- Raspberry Pi 4 (2GB/4GB): too tight for Ollama + OpenClaw together
- Pi Zero 2W: great for a [voice-only client](https://www.reddit.com/r/raspberry_pi/comments/1rc3gj1/personal_assistant_device_using_openclaw_and_pi/) but can't run Ollama locally

## Step 1: OS Setup (15 minutes)

Flash **Raspberry Pi OS Lite (64-bit)** using Raspberry Pi Imager. The Lite (headless) variant saves RAM for AI workloads.

In Imager settings, pre-configure:
- Hostname: `openclaw` (or your preference)
- SSH: Enable with password or key
- Wi-Fi: Configure if not using Ethernet
- Locale/timezone

Boot the Pi, SSH in:

```bash
ssh pi@openclaw.local
```

Update the system:

```bash
sudo apt update && sudo apt upgrade -y
```

## Step 2: Install Node.js (5 minutes)

OpenClaw requires Node.js 22+:

```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
node --version  # Should show v22.x
```

## Step 3: Install OpenClaw (10 minutes)

```bash
sudo npm install -g openclaw
openclaw --version
```

Initialize OpenClaw:

```bash
openclaw init
```

This creates `~/.openclaw/` with your configuration files.

### Configure Your AI Provider

Edit `~/.openclaw/config.yaml`:

**Option A: Cloud API (simplest)**
```yaml
providers:
  anthropic:
    apiKey: "sk-ant-..."
  openai:
    apiKey: "sk-..."
```

**Option B: Local Ollama (fully private — see Step 5)**
```yaml
providers:
  ollama:
    baseUrl: "http://localhost:11434"
    defaultModel: "llama3.1:8b"
```

**Option C: Hybrid (recommended)**
Use Ollama for routine tasks, cloud APIs for complex reasoning:
```yaml
providers:
  ollama:
    baseUrl: "http://localhost:11434"
  anthropic:
    apiKey: "sk-ant-..."

models:
  default: "ollama/llama3.1:8b"
  thinking: "anthropic/claude-sonnet-4-6"
```

## Step 4: Connect Telegram (10 minutes)

1. Message [@BotFather](https://t.me/BotFather) on Telegram
2. `/newbot` → name it → get your token
3. Add to config:

```yaml
channels:
  telegram:
    token: "YOUR_BOT_TOKEN"
    allowedUsers:
      - your_telegram_id
```

Find your Telegram ID by messaging [@userinfobot](https://t.me/userinfobot).

Start the gateway:

```bash
openclaw gateway start
```

Message your bot — you should get a response!

## Step 5: Install Ollama for Local LLM (15 minutes)

This is what makes the Pi setup special: **fully local AI inference**.

```bash
curl -fsSL https://ollama.com/install.sh | sh
```

Pull a model that fits in 8GB RAM:

```bash
# Recommended: good balance of quality and speed on Pi 5
ollama pull llama3.1:8b

# Lighter alternative for faster responses
ollama pull phi3:mini

# For coding tasks
ollama pull codellama:7b
```

Test it:

```bash
ollama run llama3.1:8b "What is OpenClaw?"
```

**Performance expectations on Pi 5 (8GB):**
- `llama3.1:8b`: ~5-8 tokens/sec (usable for chat)
- `phi3:mini`: ~10-15 tokens/sec (snappier responses)
- First response has a cold-start delay of 5-10 seconds while the model loads

> **Tip:** If you have an NVMe SSD, store models there. Model loading from microSD is painfully slow.

## Step 6: Run as a System Service (5 minutes)

Create a systemd service so OpenClaw starts on boot:

```bash
sudo tee /etc/systemd/system/openclaw.service << 'EOF'
[Unit]
Description=OpenClaw AI Agent
After=network-online.target ollama.service
Wants=network-online.target

[Service]
Type=simple
User=pi
ExecStart=/usr/bin/openclaw gateway start --foreground
Restart=always
RestartSec=10
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl enable --now openclaw
sudo systemctl status openclaw
```

For more on service management and crash recovery, see our [systemd service guide](/en/blog/openclaw-systemd-service-crash-recovery-monitoring).

## Step 7: Remote Access with Tailscale (10 minutes)

Access your Pi from anywhere without port forwarding:

```bash
curl -fsSL https://tailscale.com/install.sh | sh
sudo tailscale up
```

Authenticate via the URL it prints. Now you can SSH into your Pi from any device on your Tailscale network:

```bash
ssh pi@openclaw  # Via Tailscale MagicDNS
```

The Telegram bot already works from anywhere (it connects outbound to Telegram's servers), so Tailscale is mainly for SSH management and accessing local services.

## Step 8: Home Assistant Integration (Optional, 20 minutes)

This is where the Raspberry Pi setup really shines. If you're running Home Assistant on the same network (or same Pi via Docker), OpenClaw can control your smart home.

### Install the Home Assistant Skill

```bash
openclaw skill install home-assistant
```

Configure in `config.yaml`:

```yaml
skills:
  home-assistant:
    url: "http://homeassistant.local:8123"
    token: "YOUR_LONG_LIVED_ACCESS_TOKEN"
```

Generate the token in Home Assistant: Profile → Long-Lived Access Tokens → Create.

### What You Can Do

Once connected, tell your agent things like:
- "Turn off the living room lights"
- "What's the temperature in the bedroom?"
- "Set the thermostat to 22°C when I say goodnight"
- "If the front door opens after midnight, send me a notification"

**Best practice:** Use Home Assistant's native automations (YAML/UI) for deterministic rules, and OpenClaw for natural-language control and AI-powered decisions. As [Markaicode's integration guide](https://markaicode.com/openclaw-home-assistant-integration-guide/) notes: "Hybrid approach works best."

## Security Considerations

Running OpenClaw locally doesn't mean you can skip security. Recent CVE disclosures (including [CVE-2026-25253](/en/blog/openclaw-cve-2026-25253-one-click-rce-explained) and the new Endor Labs batch) affect all deployments.

**Essential steps:**

1. **Keep OpenClaw updated**: `sudo npm update -g openclaw` — verify you're on ≥2026.2.21
2. **Run `openclaw security --audit`**: New in v2026.2.21, checks for common misconfigurations
3. **Restrict `allowedUsers`**: Only your Telegram ID, never leave it open
4. **Audit installed Skills**: Check our [ClawHub skill security guide](/en/blog/openclaw-clawhub-skill-security-guide) — 12% of marketplace skills were found to be malicious
5. **Firewall**: `sudo ufw enable && sudo ufw allow ssh` — don't expose unnecessary ports
6. **Use Docker sandboxing** for browser automation if enabled

See our [security hardening guide](/en/blog/openclaw-security-hardening-2026) for the full checklist.

## Troubleshooting

### "Out of memory" or agent crashes
- Check with `free -h` — Ollama + OpenClaw need ~6GB
- Use a smaller model (`phi3:mini`) or switch to cloud API for heavy tasks
- Add swap: `sudo fallocate -l 2G /swapfile && sudo chmod 600 /swapfile && sudo mkswap /swapfile && sudo swapon /swapfile`

### Slow first response
- Normal: Ollama loads the model into RAM on first request (~5-10s)
- Keep Ollama running as a service to avoid cold starts

### Can't connect to Telegram
- Check internet: `ping -c 3 api.telegram.org`
- Verify token in config
- Check logs: `openclaw gateway logs` or `journalctl -u openclaw -f`
- See our [Telegram troubleshooting guide](/en/blog/openclaw-telegram-troubleshooting-guide)

### NVMe SSD not detected
- Requires a compatible NVMe HAT for Pi 5
- Check `lsblk` and mount to `/mnt/ssd`, then symlink Ollama models: `ln -s /mnt/ssd/ollama /usr/share/ollama/.ollama`

## Cost Comparison (Annual)

| Setup | Hardware | Monthly | Annual Total |
|-------|----------|---------|-------------|
| Pi 5 + Ollama only | ~$100 | ~$3 (electricity) | ~$136 |
| Pi 5 + Cloud API | ~$100 | ~$5-15 (API) | ~$160-280 |
| VPS + Cloud API | $0 | ~$12-25 | ~$144-300 |

The Pi pays for itself in 6-12 months vs. a VPS, and you get to keep your data.

## What's Next?

- **Add more Skills:** Browse [ClawHub](https://clawhub.dev) (but [audit them first](/en/blog/openclaw-clawhub-skill-security-guide))
- **Set up monitoring:** [systemd crash recovery guide](/en/blog/openclaw-systemd-service-crash-recovery-monitoring)
- **Try the 1M context beta:** In v2026.2.17+, enable with `context: { maxTokens: 1000000 }` (cloud API only)
- **Build a voice assistant:** Pair a Pi Zero 2W as a voice input device that routes to your Pi 5 running OpenClaw

## References

- [Turn your Raspberry Pi into an AI agent with OpenClaw](https://www.raspberrypi.com/news/turn-your-raspberry-pi-into-an-ai-agent-with-openclaw/) — Raspberry Pi Official Blog
- [OpenClaw Raspberry Pi Setup for Always-On AI](https://zenvanriel.nl/ai-engineer-blog/openclaw-raspberry-pi-setup-hardware-guide/) — Zen van Riel
- [DIY Home Assistant with RPi 5, OpenClaw & Ollama](https://www.reddit.com/r/LocalLLM/comments/1r84jou/) — r/LocalLLM
- [Set Up OpenClaw with Home Assistant in 20 Minutes](https://markaicode.com/openclaw-home-assistant-integration-guide/) — Markaicode
- [OpenClaw v2026.2.21 Changelog](https://www.gradually.ai/en/changelogs/openclaw/) — Gradually.ai
