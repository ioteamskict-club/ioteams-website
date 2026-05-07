# IoTeams IIUM — Deployment Guide

Complete step-by-step guide to deploy the IoTeams website
from zero to live on GitHub Pages.

---

## Prerequisites

- [ ] GitHub account (free)
- [ ] Git installed on your computer
- [ ] VS Code installed
- [ ] Web3Forms access key (from BACKEND-SETUP.md)

---

## Step 1 — Create GitHub Repository

1. Go to **[github.com/new](https://github.com/new)**
2. Repository name: `ioteams-website` (or `demo-ioteams`)
3. Visibility: **Public** (required for free GitHub Pages)
4. Do NOT initialise with README (we have our own)
5. Click **Create repository**

---

## Step 2 — Push Code to GitHub

Open your terminal in the project folder:

```bash
# Navigate to the project folder
cd path/to/ioteams-website

# Initialise Git (if not already done)
git init

# Add all files
git add .

# First commit
git commit -m "feat: initial IoTeams website launch"

# Connect to GitHub (replace with your repo URL)
git remote add origin https://github.com/YOUR-USERNAME/ioteams-website.git

# Push to main branch
git branch -M main
git push -u origin main
```

---

## Step 3 — Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** tab
3. Click **Pages** in the left sidebar
4. Under **Source**, select **GitHub Actions**
5. GitHub will automatically detect our `deploy.yml` workflow

> The first deployment triggers automatically when you push.
> Wait 1–2 minutes, then refresh the Settings → Pages page
> to see your live URL.

---

## Step 4 — Verify Deployment

1. Go to **Actions** tab in your repository
2. You should see "Deploy IoTeams Website" running or completed
3. Click on it to see the deployment log
4. Once complete, your site is live at:
   ```
   https://YOUR-USERNAME.github.io/ioteams-website/
   ```

---

## Step 5 — Configure Forms (Web3Forms)

Before the site is fully functional, set up the contact form:

1. Go to **[web3forms.com](https://web3forms.com)**
2. Enter `ioteams@iium.edu.my` → click **Create Access Key**
3. Check your email and copy the Access Key
4. Open `assets/js/forms.js` in VS Code
5. Replace the placeholder:
   ```js
   // Line 21 — replace this:
   accessKey: 'YOUR_WEB3FORMS_ACCESS_KEY',

   // With your real key:
   accessKey: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
   ```
6. Save, commit, and push:
   ```bash
   git add assets/js/forms.js
   git commit -m "feat: add Web3Forms access key for contact form"
   git push
   ```
7. Test the contact form on your live site

---

## Step 6 — Add Real Content (Images & Data)

Replace placeholder content:

### Images

Add your images to the correct folders:

```
assets/img/
├── icons/
│   ├── favicon.png          # 32×32px — browser tab icon
│   ├── apple-touch-icon.png # 180×180px — iOS home screen
│   └── og-image.png         # 1200×630px — social media preview
├── team/
│   └── [member]-photo.jpg   # 400×400px — profile photos
├── gallery/
│   └── gallery-1.jpg        # 1200×800px — gallery photos
├── blog/
│   └── blog-1.jpg           # 1200×630px — blog post covers
└── events/
    └── event-1.jpg          # 1200×800px — event photos
```

**Image tips:**
- Compress all images at [squoosh.app](https://squoosh.app/) before adding
- Use WebP format for 30-50% smaller file sizes
- Max recommended file size: 300KB per image
- Name files in lowercase with hyphens: `team-ahmad-faris.jpg`

### Update Social Links

In every HTML file, find the footer social links and update:

```html
<a href="https://instagram.com/ioteams_iium" aria-label="Instagram">
<a href="https://linkedin.com/company/ioteams-iium" aria-label="LinkedIn">
<a href="https://github.com/ioteams-iium" aria-label="GitHub">
<a href="https://twitter.com/ioteams_iium" aria-label="Twitter/X">
```

### Update Email Address

Search across all files for `ioteams@iium.edu.my` and replace with your real email if different.

---

## Step 7 — Custom Domain (Optional)

If IoTeams gets an official domain (e.g. `ioteams.iium.edu.my`):

### A. Update CNAME file

```bash
# Edit CNAME file in project root
echo "ioteams.iium.edu.my" > CNAME
git add CNAME
git commit -m "chore: set custom domain in CNAME"
git push
```

### B. Configure DNS

Go to your domain registrar / DNS provider and add:

**Option 1 — CNAME (recommended for subdomains):**
```
Type:  CNAME
Name:  ioteams (or www)
Value: YOUR-USERNAME.github.io
TTL:   3600
```

**Option 2 — A records (for apex domain):**
```
Type:  A
Name:  @ (or leave blank)
Value: 185.199.108.153
       185.199.109.153
       185.199.110.153
       185.199.111.153
TTL:   3600
```

### C. Enable in GitHub Settings

1. Repository → Settings → Pages
2. Custom domain: enter `ioteams.iium.edu.my`
3. Check **Enforce HTTPS**
4. Wait 24–48 hours for DNS propagation

### D. Update sitemap.xml

Update the domain in `sitemap.xml`:
```xml
<loc>https://ioteams.iium.edu.my/</loc>
```

---

## Step 8 — Update SEO Meta Tags

In `index.html` and each page, update:

```html
<!-- Open Graph — social media preview -->
<meta property="og:url" content="https://ioteams.iium.edu.my">
<meta property="og:image" content="https://ioteams.iium.edu.my/assets/img/icons/og-image.png">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@ioteams_iium">
<meta name="twitter:image" content="https://ioteams.iium.edu.my/assets/img/icons/og-image.png">
```

---

## Day-to-Day Workflow (for all team members)

```bash
# 1. Before starting any work — always pull latest
git pull origin main

# 2. Create a branch for your changes
git checkout -b content/add-july-events

# 3. Make changes in VS Code, test with Live Server

# 4. Commit your changes
git add .
git commit -m "content: add July 2025 events to events page"

# 5. Push your branch
git push origin content/add-july-events

# 6. Open a Pull Request on GitHub
# Go to: github.com/YOUR-ORG/ioteams-website → Pull Requests → New

# 7. Get approval from one other committee member

# 8. Merge to main — site auto-deploys in 1-2 minutes
```

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Site shows 404 | Check Settings → Pages is set to GitHub Actions |
| Workflow failing | Check Actions tab for error details |
| CSS not loading | Check file paths use correct `../assets/css/main.css` |
| Images not showing | Check file name matches exactly (case-sensitive on Linux) |
| Form not sending | Add Web3Forms access key to `forms.js` |
| Custom domain not working | Wait 24-48h for DNS, check CNAME file exists |
| Changes not appearing | Hard refresh (Ctrl+Shift+R) — CDN may cache |

---

## Useful Links

| Resource | URL |
|----------|-----|
| GitHub Pages docs | https://docs.github.com/en/pages |
| Web3Forms | https://web3forms.com |
| EmailJS | https://emailjs.com |
| Squoosh (image compress) | https://squoosh.app |
| Bootstrap 5 docs | https://getbootstrap.com/docs/5.3 |
| Bootstrap Icons | https://icons.getbootstrap.com |
| AOS docs | https://michalsnik.github.io/aos |
| Swiper docs | https://swiperjs.com |
| GLightbox docs | https://biati-digital.github.io/glightbox |

---

*Last updated: July 2025 · IoTeams IIUM*
