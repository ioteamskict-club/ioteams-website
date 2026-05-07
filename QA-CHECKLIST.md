# IoTeams IIUM — QA Checklist

Run through this checklist before every major deployment.
Tick off each item in VS Code or GitHub Issues.

---

## 🖥️ Desktop Testing

### Navigation
- [ ] Logo links back to homepage from every page
- [ ] All nav links go to the correct page
- [ ] Active nav link is highlighted on every page
- [ ] "Join Us" button goes to `apply.html`
- [ ] Nav shrinks on scroll (padding reduces)
- [ ] Dropdown menus work (if used)

### Homepage (`index.html`)
- [ ] Hero grid animation plays
- [ ] Scroll indicator animates
- [ ] Stats counter animates on scroll
- [ ] About section image loads
- [ ] Programme cards hover effect works
- [ ] Events cards display correctly
- [ ] Gallery grid shows (6 items)
- [ ] Blog cards display correctly
- [ ] CTA section buttons work

### Our Story (`pages/our-story.html`)
- [ ] Timeline renders correctly (alternating left/right)
- [ ] Values grid shows 6 cards
- [ ] Team leadership cards show 3 people
- [ ] Committee members show 4 people
- [ ] Social links on team cards work

### Events (`pages/events.html`)
- [ ] Filter buttons (All, Workshop, Hackathon, Talk, Showcase) work
- [ ] Featured event card displays correctly
- [ ] Event list cards show with left colour border
- [ ] Past events grid shows 6 cards
- [ ] "Propose an Event" section links work

### Gallery (`pages/gallery.html`)
- [ ] Filter buttons work
- [ ] Photo count updates when filtering
- [ ] GLightbox opens on image click
- [ ] GLightbox swipe/arrow navigation works
- [ ] Album cards display correctly
- [ ] Video cards display correctly

### Blog (`pages/blog.html`)
- [ ] Filter chips work (All, Tutorial, Project, Event, Insight)
- [ ] 6 blog cards display correctly
- [ ] Sidebar search input is functional
- [ ] Sidebar categories list shows
- [ ] Sidebar recent posts show
- [ ] Sidebar tags cloud shows
- [ ] Pagination shows
- [ ] Newsletter subscribe works (or shows correct state)

### Blog Details (`pages/blog-details.html`)
- [ ] Reading progress bar fills as you scroll
- [ ] Table of contents highlights active section
- [ ] Code copy buttons work
- [ ] Author bio shows at bottom
- [ ] Related posts show 2 cards
- [ ] Sidebar TOC links scroll to sections

### Programmes (`pages/programmes.html`)
- [ ] 3 track overview cards with hover effect
- [ ] Clicking track card scrolls to detail section
- [ ] All 3 track detail sections show modules
- [ ] Learning path 4-step flow shows
- [ ] Tech stack 4-column grid shows

### Apply (`pages/apply.html`)
- [ ] Step 1 — personal info validation works
- [ ] Step 2 — academic info validation works
- [ ] Step 3 — track selection works (radio buttons)
- [ ] Step 4 — review summary shows filled data
- [ ] Agreement checkbox required
- [ ] Submit shows success state
- [ ] Benefits grid shows 6 cards
- [ ] FAQ accordion opens/closes

### Contact (`pages/contact.html`)
- [ ] 4 info cards display correctly
- [ ] Office hours table shows
- [ ] Social links grid shows 4 platforms
- [ ] Contact form fields validate on submit
- [ ] Submit shows loading then success state
- [ ] Google Maps embed loads
- [ ] Directions list shows 4 steps
- [ ] Quick links below form work

### Footer (all pages)
- [ ] Logo links to homepage
- [ ] All footer nav links work
- [ ] Social icons show (Instagram, LinkedIn, GitHub, X)
- [ ] Email link opens mail client
- [ ] Copyright year is correct

### 404 Page
- [ ] Navigate to a non-existent URL (e.g. `/blah`)
- [ ] Custom 404 page appears (not browser default)
- [ ] All 6 quick nav links work
- [ ] "Back to Home" button works
- [ ] "Go Back" button works

---

## 📱 Mobile Testing

Test on: **iPhone Safari**, **Android Chrome**, **320px viewport minimum**

- [ ] Hamburger menu appears on mobile
- [ ] Hamburger opens/closes nav correctly
- [ ] Nav links close menu when clicked
- [ ] Escape key closes mobile menu
- [ ] Body scroll locked when menu open
- [ ] All sections stack to single column
- [ ] Text is readable (no overflow)
- [ ] Buttons are large enough to tap (44px minimum)
- [ ] Forms are usable on mobile keyboard
- [ ] GLightbox works with touch swipe
- [ ] Scroll-to-top button appears and works

### Specific mobile checks
- [ ] Hero title doesn't overflow
- [ ] Marquee strip scrolls smoothly
- [ ] Timeline collapses to single column
- [ ] Stats grid stacks to single column
- [ ] Blog grid stacks to single column
- [ ] Map embed is full-width

---

## ♿ Accessibility Testing

- [ ] Tab through the page — focus ring visible (gold outline)
- [ ] Skip-to-content link appears on first Tab press
- [ ] All images have `alt` attributes
- [ ] All icon-only buttons have `aria-label`
- [ ] Hamburger button has `aria-expanded` attribute
- [ ] Form labels are associated with inputs
- [ ] Error messages are descriptive
- [ ] Colour contrast passes (dark bg + white/gold text)
- [ ] Page works with screen reader (VoiceOver / NVDA)
- [ ] Reduced motion setting disables animations

**Quick contrast check (approximate):**
- White text `#F9F7F2` on black `#0A0A0A` → ratio ~20:1 ✅
- Gold `#C9A84C` on black `#0A0A0A` → ratio ~8:1 ✅
- White-dim on black → ratio ~9:1 ✅

---

## 🚀 Performance Testing

Run at: **[pagespeed.web.dev](https://pagespeed.web.dev)**

Target scores:
| Metric | Target |
|--------|--------|
| Performance | > 85 |
| Accessibility | > 90 |
| Best Practices | > 90 |
| SEO | > 90 |

### Performance checklist
- [ ] All images compressed (< 300KB each)
- [ ] Images in WebP format where possible
- [ ] No unused CSS/JS loaded on page
- [ ] CDN links use integrity hashes (SRI)
- [ ] Google Fonts use `display=swap`
- [ ] AOS `once: true` set (no repeated animations)
- [ ] `loading="lazy"` on below-fold images

---

## 🔍 SEO Checklist

- [ ] Every page has unique `<title>` tag
- [ ] Every page has unique `<meta name="description">`
- [ ] Open Graph tags present on all pages
- [ ] Twitter Card tags present on all pages
- [ ] Canonical URL tags present on all pages
- [ ] `favicon.png` exists at `assets/img/icons/favicon.png`
- [ ] `og-image.png` exists at `assets/img/icons/og-image.png` (1200×630px)
- [ ] `robots.txt` is at root, allows all crawlers
- [ ] `sitemap.xml` is at root, lists all pages
- [ ] Sitemap submitted to Google Search Console
- [ ] No broken internal links
- [ ] Page titles follow format: `Page Name — IoTeams IIUM`

**Submit sitemap:**
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add property → URL prefix → `https://ioteams.iium.edu.my`
3. Verify via HTML meta tag or DNS TXT record
4. Sitemaps → Add sitemap → `sitemap.xml`

---

## 🌐 Cross-Browser Testing

| Browser | Version | Pass? |
|---------|---------|-------|
| Chrome | Latest | ☐ |
| Firefox | Latest | ☐ |
| Safari | Latest | ☐ |
| Edge | Latest | ☐ |
| Chrome Mobile | Latest | ☐ |
| Safari iOS | Latest | ☐ |

---

## 📧 Forms Testing

After adding Web3Forms key to `forms.js`:

- [ ] Contact form — fill all fields → submit → check `ioteams@iium.edu.my`
- [ ] Contact form — submit empty → validation errors appear
- [ ] Contact form — invalid email → error appears
- [ ] Apply form — complete all 4 steps → submit → check email
- [ ] Apply form — skip required fields → validation stops progress
- [ ] Newsletter — enter email → success message appears
- [ ] Check spam folder if emails don't arrive

---

## ✅ Pre-Launch Final Check

- [ ] All placeholder text (Lorem Ipsum) replaced with real content
- [ ] All placeholder images replaced with real photos
- [ ] Real team member names, roles, bios, and photos added
- [ ] Real social media links updated in nav and footer
- [ ] Real email address set in `forms.js` and `forms/contact.php`
- [ ] Web3Forms access key added to `forms.js`
- [ ] CNAME file has correct domain
- [ ] Sitemap URLs match actual domain
- [ ] robots.txt sitemap URL matches actual domain
- [ ] GitHub Pages deployment is working
- [ ] HTTPS is enforced (Settings → Pages → Enforce HTTPS)

---

*Last updated: July 2025 · IoTeams IIUM*
