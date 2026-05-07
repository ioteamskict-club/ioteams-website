# IoTeams IIUM — Official Website

[![Live Site](https://img.shields.io/badge/Live%20Site-ioteams.github.io-gold?style=flat-square)](https://endmcst.github.io/demo-ioteams/)
[![GitHub Pages](https://img.shields.io/badge/Hosted%20on-GitHub%20Pages-222?style=flat-square&logo=github)](https://pages.github.com/)
[![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?style=flat-square&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)

> **IoTeams** is the Internet of Things Society at the International Islamic University Malaysia (IIUM). We bring together students passionate about IoT, embedded systems, cloud integration, and AI at the edge.

---

## 🌐 Live Website

👉 **[Visit IoTeams IIUM](https://endmcst.github.io/demo-ioteams/)**

---

## 📁 Project Structure

```
ioteams-website/
├── index.html                  # Homepage
├── 404.html                    # Custom not-found page
├── .gitignore
├── README.md
│
├── pages/
│   ├── our-story.html          # About & team
│   ├── programmes.html         # 3 IoT learning tracks
│   ├── events.html             # Upcoming & past events
│   ├── gallery.html            # Photo & video gallery
│   ├── blog.html               # Blog listing
│   ├── blog-details.html       # Single blog post
│   ├── apply.html              # Membership application
│   └── contact.html            # Contact page
│
├── assets/
│   ├── css/
│   │   └── main.css            # All custom styles
│   ├── js/
│   │   ├── main.js             # Shared JS (nav, scroll, AOS)
│   │   └── forms.js            # Form handlers (contact, apply)
│   └── img/
│       ├── hero/               # Hero / banner images
│       ├── gallery/            # Gallery photos
│       ├── blog/               # Blog post images
│       ├── team/               # Member profile photos
│       ├── events/             # Event photos
│       └── icons/              # Logo, favicon, og-image
│
├── forms/
│   ├── contact.php             # PHP contact handler (server only)
│   └── apply.php               # PHP application handler (server only)
│
├── vendor/
│   └── VENDOR-LINKS.md         # CDN links reference
│
├── BACKEND-SETUP.md            # Form backend setup guide
└── STRUCTURE.md                # Folder structure explanation
```

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Markup | HTML5 |
| Styling | CSS3 + CSS Custom Properties |
| Scripting | Vanilla JavaScript (ES6+) |
| UI Framework | Bootstrap 5.3.3 |
| Icons | Bootstrap Icons 1.11 |
| Animations | AOS (Animate on Scroll) |
| Slider | Swiper.js 11 |
| Lightbox | GLightbox |
| Fonts | Playfair Display, DM Sans, Space Mono |
| Forms | Web3Forms (free, no server) |
| Hosting | GitHub Pages |

---

## 🚀 Getting Started

### View Locally

```bash
# Clone the repository
git clone https://github.com/YOUR-ORG/ioteams-website.git
cd ioteams-website

# Open with VS Code Live Server (recommended)
code .
# Then: Right-click index.html → Open with Live Server

# OR just open directly in browser
open index.html
```

> **Note:** Some CDN resources require an internet connection. The site works best with Live Server rather than opening files directly.

### Making Changes

```bash
# 1. Always pull latest first
git pull origin main

# 2. Make your changes in VS Code

# 3. Test locally with Live Server

# 4. Commit and push
git add .
git commit -m "Description of your changes"
git push origin main

# GitHub Pages auto-deploys within 1-2 minutes
```

---

## 📝 Adding Content

### Adding a Team Member (`pages/our-story.html`)

Find the `.team-leadership` or `.team-members` section and copy a `.team-card` block:

```html
<div class="team-card">
  <div class="team-card-img">
    <img src="../assets/img/team/your-photo.jpg" alt="Member Name">
  </div>
  <div class="team-card-body">
    <h4>Full Name</h4>
    <span class="role">Role / Position</span>
    <p>Short bio here.</p>
    <div class="team-social">
      <a href="https://linkedin.com/in/..." aria-label="LinkedIn"><i class="bi bi-linkedin"></i></a>
      <a href="https://github.com/..." aria-label="GitHub"><i class="bi bi-github"></i></a>
    </div>
  </div>
</div>
```

### Adding an Event (`pages/events.html`)

Copy an `.event-list-card` block and update the content:

```html
<div class="event-list-card" data-category="workshop">
  <div class="event-list-date">
    <span class="day">15</span>
    <span class="month-year">Jun 2025</span>
  </div>
  <div class="event-list-info">
    <h4>Your Event Title</h4>
    <div class="event-list-meta">
      <span><i class="bi bi-clock"></i> 9:00 AM — 12:00 PM</span>
      <span><i class="bi bi-geo-alt"></i> Location</span>
    </div>
  </div>
  <div class="event-list-action">
    <span class="badge badge-teal">Workshop</span>
  </div>
</div>
```

**Categories:** `workshop` | `hackathon` | `talk` | `showcase`

### Adding a Gallery Photo (`pages/gallery.html`)

Add an item inside `.gallery-masonry`:

```html
<a href="../assets/img/gallery/your-photo.jpg"
   class="gallery-item glightbox"
   data-gallery="ioteams"
   data-category="workshop"
   data-title="Photo caption here">
  <img src="../assets/img/gallery/your-photo.jpg" alt="Description">
  <div class="gallery-overlay">
    <i class="bi bi-arrows-angle-expand"></i>
  </div>
</a>
```

### Adding a Blog Post (`pages/blog.html`)

Copy a `.blog-card` block in `#blogGrid` and update all fields. Then create a copy of `blog-details.html` for the full post content.

### Adding Images

Place images in the correct subfolder under `assets/img/`:

| Type | Folder | Recommended Size |
|------|--------|-----------------|
| Team photos | `assets/img/team/` | 400×400px |
| Gallery photos | `assets/img/gallery/` | 1200×800px |
| Blog covers | `assets/img/blog/` | 1200×630px |
| Event photos | `assets/img/events/` | 1200×800px |
| Hero images | `assets/img/hero/` | 1920×1080px |
| Favicon | `assets/img/icons/favicon.png` | 32×32px |
| OG Image | `assets/img/icons/og-image.png` | 1200×630px |

---

## 🎨 Design System

All design tokens are in `assets/css/main.css` under `:root {}`:

```css
/* Change brand colors here */
--gold:   #C9A84C;   /* Primary accent */
--teal:   #1ABCB0;   /* Secondary accent */
--black:  #0A0A0A;   /* Background */
--white:  #F9F7F2;   /* Text */

/* Change fonts here */
--font-heading: 'Playfair Display', serif;
--font-body:    'DM Sans', sans-serif;
--font-mono:    'Space Mono', monospace;
```

---

## 📧 Forms Setup

Forms use **Web3Forms** (free, no server required for GitHub Pages).

**Quick setup (5 minutes):**
1. Go to [web3forms.com](https://web3forms.com)
2. Enter `ioteams@iium.edu.my` → get Access Key
3. Open `assets/js/forms.js`
4. Replace `'YOUR_WEB3FORMS_ACCESS_KEY'` with your key

See [BACKEND-SETUP.md](./BACKEND-SETUP.md) for full instructions including EmailJS and PHP alternatives.

---

## 🌍 Deployment (GitHub Pages)

### First Time Setup

1. Push the project to a GitHub repository
2. Go to **Repository → Settings → Pages**
3. Source: **Deploy from a branch**
4. Branch: **`main`** / **`/ (root)`**
5. Click **Save**
6. Wait 1–2 minutes → site is live at `https://YOUR-ORG.github.io/REPO-NAME/`

### Custom Domain (Optional)

1. In repository **Settings → Pages → Custom domain**
2. Enter your domain (e.g. `ioteams.iium.edu.my`)
3. Add a `CNAME` file to the repo root:
   ```
   ioteams.iium.edu.my
   ```
4. Update your domain's DNS:
   - Add a `CNAME` record pointing to `YOUR-ORG.github.io`
   - Or 4 `A` records pointing to GitHub's IPs:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
5. Check **Enforce HTTPS** in GitHub Pages settings
6. Wait 24–48 hours for DNS propagation

---

## 👥 Contribution Guidelines

### Branches

| Branch | Purpose |
|--------|---------|
| `main` | Live site — only merge tested PRs here |
| `develop` | Integration branch — merge feature branches here first |
| `feature/xxx` | New features (e.g. `feature/dark-mode-toggle`) |
| `fix/xxx` | Bug fixes (e.g. `fix/mobile-nav-overlap`) |
| `content/xxx` | Content updates (e.g. `content/add-june-events`) |

### Workflow

```bash
# Start a new feature
git checkout -b feature/your-feature-name

# Work, commit often
git add .
git commit -m "feat: add alumni section to our-story page"

# Push your branch
git push origin feature/your-feature-name

# Open a Pull Request on GitHub → merge to develop → test → merge to main
```

### Commit Message Format

```
type: short description (max 72 chars)

Optional longer explanation if needed.
```

**Types:** `feat` `fix` `content` `style` `docs` `refactor` `chore`

**Examples:**
```
feat: add hackathon registration countdown timer
fix: correct mobile nav overlap on iOS Safari
content: add Semester 2 2025 events
style: adjust hero font size on small screens
docs: update BACKEND-SETUP with EmailJS steps
```

### Rules

- ✅ Always `git pull origin main` before starting work
- ✅ Test locally with Live Server before pushing
- ✅ Use descriptive commit messages
- ✅ Images must be compressed (use [Squoosh](https://squoosh.app/))
- ❌ Never push directly to `main` (use PRs)
- ❌ Never commit API keys or secrets
- ❌ Never push broken or untested code to `main`

---

## 🐛 Reporting Issues

Open a **GitHub Issue** with:
- What page / feature is affected
- What you expected to happen
- What actually happened
- Screenshots if relevant
- Browser and device used

---

## 👥 Contributors

| Role | Name |
|------|------|
| President & Lead Dev | Ahmad Faris |
| Vice President | Nurul Izzati |
| Technical Director | Muhammad Syafiq |
| Events Director | Amirah Zahra |
| Media & Design | Irfan Hakimi |

---

## 📜 License

This project is maintained for **IoTeams IIUM internal use**.
External use or reproduction requires permission from the committee.

---

<div align="center">
  <sub>Built with ❤️ by IoTeams IIUM · Kulliyyah of Engineering · IIUM Gombak</sub>
</div>
#   I O T E A M S - W E B S I T E  
 