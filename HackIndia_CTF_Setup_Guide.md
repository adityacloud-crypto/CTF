# HackWithIndia CTF - Complete Setup Guide

**Last Updated:** November 11, 2025  
**Author:** Aditya (HackWithIndia Club)  
**Purpose:** Deploy CTF with Google CTF-inspired UI/UX

---

## 🎯 Project Overview

This CTF has 3 progressive layers:
- **Layer 1** (30 pts): Web discovery - 3 flags
- **Layer 2** (60 pts): Reverse engineering & crypto - 2 challenges  
- **Layer 3** (400 pts): Binary exploitation - 8 pwn challenges

**Unlock system**: Complete Layer 1 → Unlock Layer 2 → Complete 2/2 → Unlock Layer 3

---

## 🚨 CRITICAL: Fix Layer 3 Slow Build Issue

### Problem
All Layer 3 Dockerfiles use `gcc:4.9` base image (3+ GB) causing **72+ minute builds**.

### Solution
Replace with Ubuntu base (200 MB) for **2-3 minute builds** instead.

### Quick Fix Script (PowerShell)

```powershell
# Run in: laver3_ctf directory
$challenges = @(
    "1_stack_overflow",
    "2_ret2libc", 
    "3_rop_chains",
    "4_heap_exploitation",
    "5_format_string",
    "6_integer_overflow",
    "7_off_by_one",
    "10_protocal_reverse"
)

foreach ($challenge in $challenges) {
    $dockerfilePath = "$challenge/Dockerfile"

    if (Test-Path $dockerfilePath) {
        $content = @"
FROM ubuntu:22.04

# Install dependencies
RUN apt-get update && \
    apt-get install -y gcc g++ make socat netcat && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy challenge files
COPY . /app/

# Compile vulnerable binary
RUN gcc -fno-stack-protector -z execstack -no-pie vuln.c -o vuln

# Expose port
EXPOSE 9000

# Run with socat
CMD ["socat", "TCP-LISTEN:9000,reuseaddr,fork", "EXEC:./vuln"]
"@

        Set-Content -Path $dockerfilePath -Value $content
        Write-Host "✓ Updated: $dockerfilePath" -ForegroundColor Green
    }
}

Write-Host "\n✅ All Dockerfiles updated! Rebuild will now take 2-3 min instead of 72+ min" -ForegroundColor Cyan
```

### Manual Fix (if script doesn't work)

**Edit each `Dockerfile` in Layer 3 challenges:**

**OLD (Slow - 3GB):**
```dockerfile
FROM gcc:4.9
```

**NEW (Fast - 200MB):**
```dockerfile
FROM ubuntu:22.04

RUN apt-get update && \
    apt-get install -y gcc g++ make socat netcat && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY . /app/
RUN gcc -fno-stack-protector -z execstack -no-pie vuln.c -o vuln

EXPOSE 9000
CMD ["socat", "TCP-LISTEN:9000,reuseaddr,fork", "EXEC:./vuln"]
```

---

## 🎨 Google CTF-Inspired UI/UX Design

### Design Elements from Google CTF

Based on `capturetheflag.withgoogle.com`:
- **Pixel art graphics** with animated elements
- **Green accent color** (#00FF00) for flags/buttons
- **Geometric patterns** in background
- **Clean white space** with centered layout
- **Retro gaming aesthetic** (8-bit style)
- **Minimal navigation**: Rules, FAQ, Challenges

### Layer 1 Landing Page (Google CTF Style)

**File: `challenge/www/index.html`**

Replace the current Metanova design with this:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HackWithIndia CTF</title>
    <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Roboto+Mono&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Roboto Mono', monospace;
            background: #ffffff;
            color: #000000;
            overflow-x: hidden;
        }

        /* Header Navigation */
        .navbar {
            position: fixed;
            top: 0;
            right: 0;
            padding: 30px 50px;
            z-index: 1000;
            display: flex;
            gap: 30px;
        }

        .navbar a {
            color: #000000;
            text-decoration: none;
            font-size: 14px;
            font-weight: 500;
            transition: color 0.3s;
        }

        .navbar a:hover {
            color: #00FF00;
        }

        /* Hero Section */
        .hero {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 100px 20px;
            position: relative;
        }

        /* Pixel Art Decorations */
        .pixel-decoration {
            position: absolute;
            width: 60px;
            height: 60px;
            background: #00FF00;
            clip-path: polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%);
            animation: float 3s ease-in-out infinite;
        }

        .pixel-decoration.top-left {
            top: 10%;
            left: 10%;
        }

        .pixel-decoration.top-right {
            top: 15%;
            right: 15%;
            animation-delay: 1s;
        }

        .pixel-decoration.bottom-left {
            bottom: 20%;
            left: 15%;
            animation-delay: 2s;
        }

        .pixel-decoration.bottom-right {
            bottom: 15%;
            right: 10%;
            animation-delay: 1.5s;
        }

        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
        }

        /* Flag Icon */
        .flag-icon {
            width: 80px;
            height: 80px;
            margin-bottom: 30px;
            animation: wave 2s ease-in-out infinite;
        }

        .flag-icon svg {
            width: 100%;
            height: 100%;
        }

        @keyframes wave {
            0%, 100% { transform: rotate(0deg); }
            25% { transform: rotate(-10deg); }
            75% { transform: rotate(10deg); }
        }

        /* Title */
        h1 {
            font-family: 'Press Start 2P', cursive;
            font-size: 3rem;
            margin-bottom: 20px;
            text-align: center;
            letter-spacing: 2px;
        }

        h1 .highlight {
            color: #00FF00;
        }

        .subtitle {
            font-size: 1.2rem;
            color: #666;
            margin-bottom: 50px;
            text-align: center;
        }

        /* CTF Info Box */
        .info-box {
            background: #f5f5f5;
            border: 3px solid #000;
            padding: 40px 60px;
            max-width: 800px;
            margin: 50px auto;
            text-align: center;
        }

        .info-box h2 {
            font-family: 'Press Start 2P', cursive;
            font-size: 1.5rem;
            margin-bottom: 30px;
        }

        .info-box p {
            font-size: 1rem;
            line-height: 1.8;
            margin-bottom: 20px;
        }

        /* Challenge Cards */
        .challenges {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
            max-width: 1200px;
            margin: 80px auto;
            padding: 0 20px;
        }

        .challenge-card {
            background: #fff;
            border: 3px solid #000;
            padding: 30px;
            transition: all 0.3s;
            position: relative;
        }

        .challenge-card:hover {
            transform: translateY(-5px);
            box-shadow: 10px 10px 0 #00FF00;
        }

        .challenge-card h3 {
            font-family: 'Press Start 2P', cursive;
            font-size: 1rem;
            margin-bottom: 20px;
            color: #00FF00;
        }

        .challenge-card p {
            font-size: 0.9rem;
            line-height: 1.6;
            margin-bottom: 15px;
        }

        .challenge-card .points {
            font-family: 'Press Start 2P', cursive;
            font-size: 0.8rem;
            color: #FF0000;
            margin-top: 20px;
        }

        /* Buttons */
        .cta-buttons {
            display: flex;
            gap: 20px;
            justify-content: center;
            margin-top: 40px;
        }

        .btn {
            font-family: 'Press Start 2P', cursive;
            padding: 15px 40px;
            font-size: 0.9rem;
            border: 3px solid #000;
            background: #fff;
            color: #000;
            text-decoration: none;
            transition: all 0.3s;
            cursor: pointer;
        }

        .btn:hover {
            background: #00FF00;
            transform: translateY(-3px);
            box-shadow: 5px 5px 0 #000;
        }

        .btn.primary {
            background: #00FF00;
        }

        /* Footer */
        footer {
            text-align: center;
            padding: 40px 20px;
            border-top: 3px solid #000;
            margin-top: 100px;
        }

        footer p {
            font-family: 'Press Start 2P', cursive;
            font-size: 0.7rem;
        }

        /* Responsive */
        @media (max-width: 768px) {
            h1 { font-size: 1.5rem; }
            .navbar { padding: 20px; }
            .info-box { padding: 30px 20px; }
            .cta-buttons { flex-direction: column; }
        }

        /* Hidden flags */
        .secret-flag {
            display: none;
        }
    </style>
</head>
<body>
    <!-- Navigation -->
    <nav class="navbar">
        <a href="#rules">Rules</a>
        <a href="#faq">FAQ</a>
        <a href="#challenges">Challenges</a>
        <a href="/robots.txt">Resources</a>
    </nav>

    <!-- Pixel Decorations -->
    <div class="pixel-decoration top-left"></div>
    <div class="pixel-decoration top-right"></div>
    <div class="pixel-decoration bottom-left"></div>
    <div class="pixel-decoration bottom-right"></div>

    <!-- FLAG 1: FLAG{html_c0mm3nts_ar3_n0t_s3cur3} -->
    <!-- Keep looking! More flags hidden on this page -->

    <!-- Hero Section -->
    <section class="hero">
        <div class="flag-icon">
            <svg viewBox="0 0 100 100">
                <rect x="10" y="10" width="10" height="80" fill="#000"/>
                <polygon points="20,10 80,30 20,50" fill="#00FF00"/>
            </svg>
        </div>

        <h1>Capture <span class="highlight">The Flag</span></h1>
        <p class="subtitle">HackWithIndia CTF Challenge</p>

        <div class="cta-buttons">
            <a href="#challenges" class="btn primary">Start Challenge</a>
            <a href="http://localhost:8000" class="btn">View Scoreboard</a>
        </div>
    </section>

    <!-- Info Box -->
    <div class="info-box">
        <h2>Your Mission</h2>
        <p>Find <strong>THREE FLAGS</strong> hidden on this page!</p>
        <p>Use your browser's developer tools, source code inspection, and web reconnaissance skills.</p>
        <p style="color: #00FF00; margin-top: 30px;">⚡ Total Points: 30 (10 per flag)</p>
    </div>

    <!-- Challenge Cards -->
    <section class="challenges" id="challenges">
        <div class="challenge-card">
            <h3>🔍 Flag 01</h3>
            <p>Developers often leave comments in their HTML source code. These comments might contain sensitive information...</p>
            <p><strong>Hint:</strong> Right-click → View Page Source</p>
            <div class="points">10 POINTS</div>
        </div>

        <div class="challenge-card">
            <h3>👁️ Flag 02</h3>
            <p>Not everything visible to the eye is truly visible. Some secrets hide using clever CSS styling tricks...</p>
            <p><strong>Hint:</strong> Open DevTools and inspect elements</p>
            <div class="points">10 POINTS</div>
        </div>

        <div class="challenge-card">
            <h3>🤖 Flag 03</h3>
            <p>Web crawlers use special files to understand which pages to index. These files are publicly accessible...</p>
            <p><strong>Hint:</strong> Visit /robots.txt</p>
            <div class="points">10 POINTS</div>
        </div>
    </section>

    <!-- Hidden Flag 2 -->
    <div class="secret-flag" style="color: white; background: white; font-size: 1px;">
        FLAG{wh1t3_t3xt_0n_wh1t3_backgr0und}
    </div>

    <!-- Footer -->
    <footer>
        <p>© 2025 HackWithIndia CTF</p>
        <p style="margin-top: 15px; color: #00FF00;">Good Luck, Hacker!</p>
    </footer>
</body>
</html>
```

---

## 🚀 Deployment Instructions

### Step 1: Fix Layer 3 Docker Images (CRITICAL)

```bash
cd "laver3_ctf"

# Run the PowerShell script above to update all Dockerfiles
# OR manually edit each Dockerfile with the Ubuntu base image
```

### Step 2: Deploy CTFd Platform

```bash
cd "New folder/CTFd"
docker-compose up -d

# Access at: http://localhost:8000
# Create admin account on first visit
```

### Step 3: Deploy Layer 1 (Web)

```bash
cd "challenge"

# Replace index.html with the Google CTF-style design above
docker-compose down
docker-compose up -d --build

# Test at: http://localhost:8080
```

### Step 4: Deploy Layer 3 (Binary Exploitation)

```bash
cd "laver3_ctf"

# Deploy each challenge (now fast with Ubuntu base!)
cd 1_stack_overflow
docker-compose up -d --build  # Takes 2-3 min instead of 72+ min

cd ../2_ret2libc
docker-compose up -d --build

cd ../3_rop_chains
docker-compose up -d --build

cd ../4_heap_exploitation
docker-compose up -d --build

cd ../5_format_string
docker-compose up -d --build

cd ../6_integer_overflow
docker-compose up -d --build

cd ../7_off_by_one
docker-compose up -d --build

cd ../10_protocal_reverse
docker-compose up -d --build
```

### Step 5: Configure CTFd Challenges

**In CTFd web interface (localhost:8000):**

#### Layer 1 Challenges (Web Discovery)

1. **Flag 1: HTML Comment**
   - Category: Web
   - Points: 10
   - Flag: `FLAG{html_c0mm3nts_ar3_n0t_s3cur3}`
   - Requirements: None

2. **Flag 2: Hidden CSS**
   - Category: Web
   - Points: 10
   - Flag: `FLAG{wh1t3_t3xt_0n_wh1t3_backgr0und}`
   - Requirements: None

3. **Flag 3: Robots.txt**
   - Category: Web
   - Points: 10
   - Flag: `FLAG{r0b0ts_txt_1s_publ1c}`
   - Requirements: None

#### Layer 2 Challenges (Reverse/Crypto)

4. **DeepCrack**
   - Category: Reverse Engineering
   - Points: 30
   - Flag: `flag{deep_reverse_layer2}`
   - Requirements: Solve ALL Layer 1 (Challenges 1, 2, 3)

5. **OnionKeys**
   - Category: Cryptography
   - Points: 30
   - Flag: `flag{onion_crypto_layer2}`
   - Requirements: Solve ALL Layer 1 (Challenges 1, 2, 3)

#### Layer 3 Challenges (Binary Exploitation)

6. **Stack Overflow**
   - Category: Pwn
   - Points: 50
   - Connection: `nc localhost 9001`
   - Requirements: Solve 2 of Layer 2

7. **Ret2libc**
   - Category: Pwn
   - Points: 50
   - Connection: `nc localhost 9002`
   - Requirements: Solve 2 of Layer 2

8. **ROP Chains**
   - Category: Pwn
   - Points: 50
   - Connection: `nc localhost 9003`
   - Requirements: Solve 2 of Layer 2

9. **Heap Exploitation**
   - Category: Pwn
   - Points: 50
   - Connection: `nc localhost 9004`
   - Requirements: Solve 2 of Layer 2

10. **Format String**
    - Category: Pwn
    - Points: 50
    - Connection: `nc localhost 9005`
    - Requirements: Solve 2 of Layer 2

11. **Integer Overflow**
    - Category: Pwn
    - Points: 50
    - Connection: `nc localhost 9006`
    - Requirements: Solve 2 of Layer 2

12. **Off-by-One**
    - Category: Pwn
    - Points: 50
    - Connection: `nc localhost 9007`
    - Requirements: Solve 2 of Layer 2

13. **Protocol Reverse**
    - Category: Pwn
    - Points: 50
    - Connection: `nc localhost 9010`
    - Requirements: Solve 2 of Layer 2

---

## 📁 Git Repository Setup

```bash
# In project root directory
git init
git add .
git commit -m "Initial CTF setup with Google-style UI"

# Create .gitignore
cat > .gitignore << EOF
*.log
node_modules/
__pycache__/
*.pyc
.DS_Store
.env
docker-compose.override.yml
*.swp
*.swo
.vscode/
.idea/
EOF

git add .gitignore
git commit -m "Add gitignore"

# Push to GitHub
git remote add origin https://github.com/YOUR_USERNAME/hackindia-ctf.git
git branch -M main
git push -u origin main
```

---

## ✅ Testing Checklist

- [ ] CTFd platform accessible at localhost:8000
- [ ] Admin account created
- [ ] Layer 1 web page loads with Google CTF style
- [ ] All 3 Layer 1 flags are findable
- [ ] All 13 challenges created in CTFd
- [ ] Progressive unlock requirements configured
- [ ] Layer 3 services run on ports 9001-9010
- [ ] Scoreboard shows live updates
- [ ] Team registration works

---

## 🎯 Participant Instructions

**Share this with teams on event day:**

```
Welcome to HackWithIndia CTF!

🌐 CTF Platform: http://[YOUR-IP]:8000
📝 Register your team to start

📍 Challenge URLs:
- Layer 1: http://[YOUR-IP]:8080
- Layer 2: Download files from CTFd
- Layer 3: Connect with netcat after unlocking
  Example: nc [YOUR-IP] 9001

🏆 Top 15 teams advance to next round!

Good luck, hackers! 🚩
```

---

## 🐛 Troubleshooting

### Layer 3 still slow?
```bash
# Check Dockerfiles are updated to Ubuntu base
cat laver3_ctf/1_stack_overflow/Dockerfile | head -n 1
# Should show: FROM ubuntu:22.04

# Clear Docker cache
docker system prune -a
```

### CTFd not starting?
```bash
# Check required ports are free
netstat -ano | findstr "8000"
netstat -ano | findstr "3306"
netstat -ano | findstr "6379"

# View logs
cd "New folder/CTFd"
docker-compose logs -f
```

### Challenges not unlocking?
- Verify requirements in CTFd Admin → Challenges → [Challenge] → Requirements
- Test with dummy account by solving challenges in order

### Port conflicts?
```yaml
# Edit docker-compose.yml to change ports
services:
  web:
    ports:
      - "8081:80"  # Change 8080 to 8081
```

---

## 📊 Expected Build & Deploy Times

**After fixing Dockerfiles:**
- CTFd Platform: 3-5 minutes
- Layer 1 Web: 30 seconds
- Layer 3 (each): 2-3 minutes
- **Total setup time: ~25-30 minutes** (vs. 10+ hours before!)

---

## 🔧 Quick Commands Reference

```bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs -f

# Rebuild after code changes
docker-compose up -d --build

# Check running containers
docker ps

# Restart a specific service
docker-compose restart [service-name]

# Clean up everything
docker-compose down
docker system prune -a
```

---

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section above
2. View Docker logs: `docker-compose logs -f`
3. Verify all services are running: `docker ps`
4. Contact: [Your contact info]

---

## 🎉 Final Notes

- **Build times fixed**: 2-3 min per challenge (not 72 min!)
- **Google CTF UI**: Clean, modern, pixel-art style
- **Progressive system**: Auto-unlocking works via CTFd
- **Ready to deploy**: Just run the commands above
- **Git-ready**: Push to GitHub and hand off to teammate

**Good luck with the CTF! 🚩**

---

**END OF SETUP GUIDE**

Generated: November 11, 2025, 9:39 PM IST
