/* ============================================================
   IoTeams IIUM — Forms JavaScript
   assets/js/forms.js

   Handles ALL form submissions across the site.
   Supports three backends:
   A. Web3Forms  — free, 250/month, no server (RECOMMENDED)
   B. EmailJS    — free, 200/month, no server
   C. PHP        — contact.php / apply.php (needs server)

   Include AFTER main.js on pages with forms:
   <script src="../assets/js/forms.js"></script>
============================================================ */

/* ── 1. CONFIGURATION ──────────────────────────────────────
   Fill in your keys. See BACKEND-SETUP.md for instructions.
──────────────────────────────────────────────────────────── */
const FORMS_CONFIG = {
  web3forms: {
    accessKey: 'YOUR_WEB3FORMS_ACCESS_KEY',
  },
  emailjs: {
    publicKey: 'YOUR_EMAILJS_PUBLIC_KEY',
    serviceId: 'YOUR_EMAILJS_SERVICE_ID',
    contactTemplate: 'YOUR_CONTACT_TEMPLATE_ID',
  },
  backend: {
    contact:    'web3forms',
    apply:      'web3forms',
    newsletter: 'web3forms',
  },
  php: {
    contact: '../forms/contact.php',
    apply:   '../forms/apply.php',
  },
};

/* ── 2. VALIDATOR ───────────────────────────────────────── */
const Validator = {
  isEmail:     (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
  isIIUMEmail: (v) => Validator.isEmail(v) && v.includes('iium.edu.my'),
  notEmpty:    (v) => v.trim().length > 0,
  minLen:      (v, n) => v.trim().length >= n,

  showError(fieldId, errorId, msg) {
    document.getElementById(fieldId)?.classList.add('error');
    const err = document.getElementById(errorId);
    if (err) { err.textContent = msg; err.classList.add('show'); }
  },

  clearError(fieldId, errorId) {
    document.getElementById(fieldId)?.classList.remove('error');
    document.getElementById(errorId)?.classList.remove('show');
  },

  liveValidate(fieldId, errorId, checkFn, msg) {
    const el = document.getElementById(fieldId);
    if (!el) return;
    el.addEventListener('blur',  () => !checkFn(el.value) ? this.showError(fieldId, errorId, msg) : this.clearError(fieldId, errorId));
    el.addEventListener('input', () => checkFn(el.value) && this.clearError(fieldId, errorId));
  },
};

/* ── 3. UI HELPERS ─────────────────────────────────────── */
const FormUI = {
  setLoading(btnId, text = 'Sending...') {
    const btn = document.getElementById(btnId);
    if (!btn) return;
    btn.disabled = true;
    btn._orig = btn.innerHTML;
    btn.innerHTML = `<span style="display:inline-flex;align-items:center;gap:.5rem"><span class="iot-spinner"></span>${text}</span>`;
  },
  resetBtn(btnId) {
    const btn = document.getElementById(btnId);
    if (!btn) return;
    btn.disabled = false;
    if (btn._orig) btn.innerHTML = btn._orig;
  },
  showStatus(type) {
    ['Loading','Success','Error'].forEach(t => {
      const el = document.getElementById('status' + t);
      if (el) el.style.display = 'none';
    });
    const cap = type.charAt(0).toUpperCase() + type.slice(1);
    const el = document.getElementById('status' + cap);
    if (el) el.style.display = 'flex';
  },
};

/* ── 4. SUBMIT ADAPTERS ────────────────────────────────── */
async function viaWeb3Forms(data) {
  const res = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ access_key: FORMS_CONFIG.web3forms.accessKey, ...data }),
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.message || 'Submission failed');
  return json;
}

async function viaEmailJS(templateId, params) {
  if (typeof emailjs === 'undefined') throw new Error('EmailJS not loaded');
  emailjs.init(FORMS_CONFIG.emailjs.publicKey);
  return emailjs.send(FORMS_CONFIG.emailjs.serviceId, templateId, params);
}

async function viaPHP(url, formData) {
  const res = await fetch(url, { method: 'POST', body: formData });
  const json = await res.json();
  if (!json.success) throw new Error(json.message || 'Submission failed');
  return json;
}

/* ── 5. CONTACT FORM ───────────────────────────────────── */
async function sendMessage() {
  const get  = (id) => document.getElementById(id)?.value.trim() || '';
  const firstName = get('firstName');
  const lastName  = get('lastName');
  const email     = get('contactEmail');
  const subject   = get('subject');
  const message   = get('message');

  let ok = true;
  const v = (fid, eid, check, msg) => {
    if (!check) { Validator.showError(fid, eid, msg); ok = false; }
    else          Validator.clearError(fid, eid);
  };

  v('firstName',    'firstNameError',  Validator.notEmpty(firstName), 'First name is required.');
  v('lastName',     'lastNameError',   Validator.notEmpty(lastName),  'Last name is required.');
  v('contactEmail', 'emailError',      Validator.isEmail(email),      'Enter a valid email address.');
  v('subject',      'subjectError',    Validator.notEmpty(subject),   'Please select a subject.');
  v('message',      'messageError',    Validator.minLen(message, 10), 'Message must be at least 10 characters.');

  if (!ok) return;

  FormUI.setLoading('sendBtn');
  FormUI.showStatus('loading');

  const payload = {
    name:    `${firstName} ${lastName}`,
    email,
    replyto: email,
    subject: `[IoTeams Contact] ${subject}`,
    message: `From: ${firstName} ${lastName} <${email}>\nSubject: ${subject}\n\n${message}`,
  };

  try {
    const b = FORMS_CONFIG.backend.contact;
    if (b === 'web3forms')  await viaWeb3Forms(payload);
    else if (b === 'emailjs') await viaEmailJS(FORMS_CONFIG.emailjs.contactTemplate, payload);
    else if (b === 'php') {
      const fd = new FormData();
      Object.entries({ firstName, lastName, contactEmail: email, subject, message }).forEach(([k,v]) => fd.append(k,v));
      await viaPHP(FORMS_CONFIG.php.contact, fd);
    }

    FormUI.showStatus('success');
    FormUI.resetBtn('sendBtn');
    ['firstName','lastName','contactEmail','message'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });
    const sel = document.getElementById('subject');
    if (sel) sel.selectedIndex = 0;

  } catch (err) {
    console.error('[IoTeams] Contact error:', err);
    FormUI.showStatus('error');
    FormUI.resetBtn('sendBtn');
  }
}

/* ── 6. APPLY FORM ─────────────────────────────────────── */
async function submitApplication(formData) {
  const trackNames = {
    hardware: 'Hardware & Embedded Systems',
    cloud:    'Cloud & Connectivity',
    ai:       'AI & Smart Systems',
    all:      'All Three Tracks',
  };
  const track = document.querySelector('input[name="track"]:checked')?.value || '';

  const payload = {
    name:    formData.fullName,
    email:   formData.email,
    replyto: formData.email,
    subject: `[IoTeams Application] ${formData.fullName} — ${formData.studentId}`,
    message: `
NEW MEMBERSHIP APPLICATION
Name:       ${formData.fullName}
Email:      ${formData.email}
Phone:      ${formData.phone}
Student ID: ${formData.studentId}
Faculty:    ${formData.faculty}
Programme:  ${formData.programme}
Year:       ${formData.year}
Track:      ${trackNames[track] || track}
Experience: ${formData.experience}
Motivation: ${formData.motivation}
    `.trim(),
  };

  const b = FORMS_CONFIG.backend.apply;
  if (b === 'web3forms')  return viaWeb3Forms(payload);
  if (b === 'emailjs')    return viaEmailJS(FORMS_CONFIG.emailjs.contactTemplate, payload);
  if (b === 'php') {
    const fd = new FormData();
    Object.entries({ ...formData, track }).forEach(([k,v]) => fd.append(k,v));
    return viaPHP(FORMS_CONFIG.php.apply, fd);
  }
}

/* ── 7. NEWSLETTER ─────────────────────────────────────── */
async function subscribeNewsletter(email, btn, input) {
  if (!Validator.isEmail(email)) {
    if (input) { input.style.borderColor = '#dc3545'; input.placeholder = 'Enter a valid email'; }
    return;
  }
  if (btn) { btn.disabled = true; btn.innerHTML = '<i class="bi bi-hourglass-split"></i> Subscribing...'; }
  try {
    await viaWeb3Forms({
      name:    email,
      email,
      subject: '[IoTeams] Newsletter Subscription',
      message: `New subscription: ${email}`,
    });
    if (input) { input.value = ''; input.placeholder = '✅ Subscribed! Check your inbox.'; input.style.borderColor = 'var(--teal, #1ABCB0)'; }
    if (btn)   btn.innerHTML = '<i class="bi bi-check-circle"></i> Done!';
  } catch {
    if (input) input.placeholder = 'Error — please try again';
    if (btn)   { btn.disabled = false; btn.innerHTML = '<i class="bi bi-send"></i> Subscribe'; }
  }
}

/* ── Wire newsletter on DOM ready ─────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  const btn   = document.querySelector('.newsletter-form button');
  const input = document.querySelector('.newsletter-input');
  if (btn && input) {
    btn.addEventListener('click', () => subscribeNewsletter(input.value.trim(), btn, input));
    input.addEventListener('keydown', (e) => e.key === 'Enter' && subscribeNewsletter(input.value.trim(), btn, input));
  }
});

/* ── Inject spinner CSS ────────────────────────────────── */
if (!document.getElementById('iot-forms-css')) {
  const s = document.createElement('style');
  s.id = 'iot-forms-css';
  s.textContent = `
    @keyframes iot-spin { to { transform: rotate(360deg); } }
    .iot-spinner { display:inline-block; width:14px; height:14px; border:2px solid rgba(0,0,0,.25); border-top-color:#000; border-radius:50%; animation:iot-spin .8s linear infinite; }
    .form-error { display:none; font-size:.72rem; color:#ea868f; margin-top:.3rem; font-family:var(--font-mono,'monospace'); }
    .form-error.show { display:block; }
    .form-control.error { border-color:#dc3545 !important; }
  `;
  document.head.appendChild(s);
}