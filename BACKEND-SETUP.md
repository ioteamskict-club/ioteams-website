# IoTeams IIUM — Backend & Forms Setup Guide

## Overview

The website has **3 forms** that need a backend to actually send data:

| Form | File | Purpose |
|------|------|---------|
| Contact | `pages/contact.html` | General enquiries |
| Apply | `pages/apply.html` | Membership applications |
| Newsletter | `pages/blog.html` | Email subscriptions |

All three are handled by `assets/js/forms.js`. You configure **one backend** and all forms use it.

---

## Option A — Web3Forms (RECOMMENDED for GitHub Pages)

**Free tier:** 250 submissions/month · No server needed · 5 min setup

### Steps

1. Go to **[web3forms.com](https://web3forms.com)**
2. Enter `ioteams@iium.edu.my` in the email field
3. Click **Create Access Key**
4. Check your email — copy the Access Key
5. Open `assets/js/forms.js`
6. Replace `'YOUR_WEB3FORMS_ACCESS_KEY'` with your key:

```js
web3forms: {
  accessKey: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
},
```

7. Make sure `backend` is set to `'web3forms'`:

```js
backend: {
  contact:    'web3forms',
  apply:      'web3forms',
  newsletter: 'web3forms',
},
```

8. Push to GitHub. Done — forms are live.

### What happens when someone submits?
- Web3Forms receives the data and forwards it to `ioteams@iium.edu.my`
- No PHP, no server, no database needed
- Works perfectly on GitHub Pages

---

## Option B — EmailJS

**Free tier:** 200 emails/month · No server needed · 10 min setup

### Steps

1. Go to **[emailjs.com](https://emailjs.com)** and create a free account
2. **Add Email Service:**
   - Services → Add New Service → Gmail
   - Connect your `ioteams@iium.edu.my` Google account
   - Copy the **Service ID** (e.g. `service_abc123`)

3. **Create Email Template:**
   - Email Templates → Create New Template
   - Use these variables in the template body:
     ```
     From: {{from_name}} <{{from_email}}>
     Subject: {{subject}}
     
     {{message}}
     ```
   - Copy the **Template ID** (e.g. `template_xyz789`)

4. **Get Public Key:**
   - Account → API Keys → Copy Public Key

5. **Add EmailJS script** to `contact.html` and `apply.html` before `forms.js`:
   ```html
   <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>
   ```

6. **Update `forms.js` config:**
   ```js
   emailjs: {
     publicKey: 'YOUR_PUBLIC_KEY',
     serviceId: 'service_abc123',
     contactTemplate: 'template_xyz789',
   },
   backend: {
     contact:    'emailjs',
     apply:      'emailjs',
     newsletter: 'web3forms', // EmailJS doesn't suit newsletter
   },
   ```

---

## Option C — PHP Backend (requires server)

Use this if the site is hosted on **cPanel, Hostinger, Cloudflare Pages with Workers, or a VPS** — not GitHub Pages.

### Steps

1. Upload the entire project to your server's `public_html/`
2. Open `forms/contact.php`
3. Set your receiving email:
   ```php
   $to_email = 'ioteams@iium.edu.my';
   ```
4. Open `forms/apply.php` and do the same
5. Update `forms.js`:
   ```js
   backend: {
     contact: 'php',
     apply:   'php',
   },
   ```
6. Test by submitting the contact form and checking your inbox

### PHP requirements
- PHP 7.4+
- `mail()` function enabled (most shared hosting has this)
- For better deliverability, configure SMTP via PHPMailer (optional)

---

## reCAPTCHA (Optional — recommended for public sites)

To prevent spam on the contact form:

1. Go to **[google.com/recaptcha](https://www.google.com/recaptcha/admin)**
2. Register your domain — choose **reCAPTCHA v3**
3. Copy your **Site Key**
4. Add to `contact.html` head:
   ```html
   <script src="https://www.google.com/recaptcha/api.js?render=YOUR_SITE_KEY"></script>
   ```
5. In `forms.js` `sendMessage()`, add before the submit call:
   ```js
   const token = await grecaptcha.execute('YOUR_SITE_KEY', { action: 'contact' });
   payload.recaptcha_token = token;
   ```
6. Web3Forms and EmailJS verify the token automatically if passed

---

## Testing Checklist

After setup, test all three forms:

- [ ] Contact form — submit and check `ioteams@iium.edu.my` inbox
- [ ] Apply form — complete all 4 steps and submit
- [ ] Newsletter form — enter email and subscribe
- [ ] Check spam folder if emails don't arrive
- [ ] Test on mobile (forms should be fully usable)
- [ ] Test with invalid inputs — errors should appear correctly

---

## Current Status

| Item | Status |
|------|--------|
| `forms.js` | ✅ Ready — add your key |
| `contact.php` | ✅ Ready — PHP backup |
| `apply.php` | ✅ Ready — PHP backup |
| Web3Forms key | ⏳ Add your key to `forms.js` |
| EmailJS (optional) | ⏳ Configure if preferred |
| reCAPTCHA (optional) | ⏳ Add for spam protection |
