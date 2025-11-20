# Google CTF Clone - HackWithIndia CTF
## Features

✅ **Multi-page navigation** (4 pages)
- Home page with pixel art animations
- FAQ page
- Hackceler8 (Advanced Challenges) page
- BeginnersQuest page with detailed walkthroughs

✅ **Retro/Pixel Art Design**
- Google CTF-inspired aesthetics
- Pixel fonts (Press Start 2P, VT323)
- Animated pixel blocks and flag
- Terminal-style header
- Sidebar navigation

✅ **Complete Challenge Information**
- All 13 challenges organized by layer
- Step-by-step walkthroughs for Layer 1
- Tools guide for beginners
- Hints and tips sections

✅ **Responsive Design**
- Works on desktop, tablet, and mobile
- Adaptive layouts

## How to Run

### Option 1: Using Docker Compose (Recommended)

```bash
cd "challenges/layer-1-ui/Layer 1 + UI/googlectf-clone"
docker-compose up -d
```

Visit: **http://localhost:8082**

### Option 2: Using Docker Build

```bash
cd "challenges/layer-1-ui/Layer 1 + UI/googlectf-clone"
docker build -t googlectf-clone .
docker run -d -p 8082:80 --name googlectf_clone googlectf-clone
```

Visit: **http://localhost:8082**

### Option 3: Direct File Access

Simply open `www/index.html` in your browser.

## Pages

1. **index.html** - Home page with hero section and action buttons
2. **faq.html** - Frequently asked questions
3. **challenges.html** - Hackceler8 (Layer 2 & 3 advanced challenges)
4. **beginners.html** - BeginnersQuest (Layer 1 with walkthroughs)

## Color Palette

- Background: `#f5f5f5` (light gray)
- Text: `#000` (black)
- Accent Green: `#9aff00` (neon green)
- Accent Gray: `#c0c0c0` (silver)
- Border: `#333` (dark gray)

## Fonts

- **Press Start 2P** - Pixel font for headings and buttons
- **VT323** - Retro monospace font for body text

## Features per Page

### Home (index.html)
- Terminal-style greeting header
- Pixel art decorations (animated blocks)
- Large "capture The Flag" title
- Action buttons (Register, Join, Scoreboard)
- Stats display (MODE, ACTIVE status, timestamp)
- Sidebar navigation

### FAQ (faq.html)
- Common questions and answers
- Flag format information
- Layer structure explanation
- Tool recommendations
- Getting started advice

### Challenges (challenges.html)
- Layer 2 (RE + Crypto) - 2 challenges
- Layer 3 (PWN) - 8 challenges
- Points, categories, descriptions
- Connection info for PWN challenges
- Total points: 460

### Beginners (beginners.html)
- Layer 1 challenges with full walkthroughs
- Step-by-step instructions for each challenge
- Tools guide section
- Tips for beginners
- Links to helpful resources

## Customization

### Change Port
Edit `docker-compose.yml`:
```yaml
ports:
  - "YOUR_PORT:80"
```

### Modify Colors
Edit `www/styles.css` - see `:root` variables at the top

### Add More Pages
1. Create new HTML file in `www/`
2. Add link to sidebar in all existing pages
3. Copy the structure from existing pages

## Hidden Flags

The clone preserves Layer 1 flags:
- **Flag 1**: Hidden in HTML comment (base64 encoded)
- **Flag 2**: Use original www for CSS hidden flag
- **Flag 3**: Use original www for robots.txt chain

## Differences from Original Google CTF

This is inspired by Google CTF's retro aesthetic but customized for HackWithIndia:
- Custom branding
- 3-layer progressive structure
- Beginner-friendly walkthroughs
- Links to HackWithIndia CTFd platform

## Development

To make changes:
1. Edit files in `www/` folder
2. Refresh browser (for file-based viewing)
3. Or rebuild Docker: `docker-compose down && docker-compose up -d --build`

## Troubleshooting

**Port already in use:**
```bash
docker stop googlectf_clone
docker rm googlectf_clone
```

**Changes not showing:**
- Hard refresh: `Ctrl+Shift+R`
- Or rebuild with no cache: `docker-compose build --no-cache`

## Credits

Inspired by Google CTF's retro pixel art design.
Created for HackWithIndia CTF 2025.
