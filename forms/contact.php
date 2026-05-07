<?php
/**
 * IoTeams IIUM — Contact Form Handler
 * forms/contact.php
 *
 * USAGE:
 * This file handles the contact form POST from contact.html.
 * It requires a PHP-capable server (not GitHub Pages).
 *
 * For GitHub Pages deployment, use EmailJS instead (already
 * wired in contact.html). This file is a backup for when
 * the site is hosted on a real server (cPanel, VPS, etc).
 *
 * SETUP:
 * 1. Upload to your server's forms/ directory
 * 2. Set $to_email below to your real email
 * 3. Test with a form submission
 * 4. Check spam folder if emails don't arrive
 */

/* ── Configuration ───────────────────────────────────────── */
$to_email    = 'ioteams@iium.edu.my';
$from_name   = 'IoTeams IIUM Website';
$subject_pfx = '[IoTeams Contact]';

/* ── Security headers ────────────────────────────────────── */
header('Content-Type: application/json');
header('X-Content-Type-Options: nosniff');

/* ── Only accept POST ────────────────────────────────────── */
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['success' => false, 'message' => 'Method not allowed.']);
  exit;
}

/* ── CSRF / origin check ─────────────────────────────────── */
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$allowed_origins = [
  'https://ioteams.github.io',
  'https://ioteams.iium.edu.my',
  'http://localhost',
  'http://127.0.0.1',
];

// Uncomment in production:
// if (!in_array($origin, $allowed_origins)) {
//   http_response_code(403);
//   echo json_encode(['success' => false, 'message' => 'Forbidden.']);
//   exit;
// }

/* ── Honeypot check (spam trap) ──────────────────────────── */
if (!empty($_POST['_honey'])) {
  // Bot filled the hidden field — silently succeed
  echo json_encode(['success' => true, 'message' => 'Message sent.']);
  exit;
}

/* ── Rate limiting (basic — per IP) ─────────────────────── */
$ip         = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
$rate_file  = sys_get_temp_dir() . '/ioteams_rate_' . md5($ip) . '.json';
$rate_limit = 5;    // max submissions
$rate_window = 3600; // per hour (seconds)

if (file_exists($rate_file)) {
  $rate_data = json_decode(file_get_contents($rate_file), true);
  if ($rate_data && time() - $rate_data['first'] < $rate_window) {
    if ($rate_data['count'] >= $rate_limit) {
      http_response_code(429);
      echo json_encode(['success' => false, 'message' => 'Too many submissions. Please try again later.']);
      exit;
    }
    $rate_data['count']++;
  } else {
    $rate_data = ['first' => time(), 'count' => 1];
  }
} else {
  $rate_data = ['first' => time(), 'count' => 1];
}
file_put_contents($rate_file, json_encode($rate_data));

/* ── Sanitise & validate inputs ──────────────────────────── */
function sanitise(string $input): string {
  return htmlspecialchars(strip_tags(trim($input)), ENT_QUOTES, 'UTF-8');
}

$first_name = sanitise($_POST['firstName'] ?? '');
$last_name  = sanitise($_POST['lastName']  ?? '');
$email      = filter_var(trim($_POST['contactEmail'] ?? ''), FILTER_SANITIZE_EMAIL);
$subject    = sanitise($_POST['subject']   ?? '');
$message    = sanitise($_POST['message']   ?? '');

$errors = [];
if (empty($first_name))                         $errors[] = 'First name is required.';
if (empty($last_name))                          $errors[] = 'Last name is required.';
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'Valid email address is required.';
if (empty($subject))                            $errors[] = 'Subject is required.';
if (strlen($message) < 10)                      $errors[] = 'Message must be at least 10 characters.';
if (strlen($message) > 5000)                    $errors[] = 'Message is too long (max 5000 characters).';

if (!empty($errors)) {
  http_response_code(422);
  echo json_encode(['success' => false, 'message' => implode(' ', $errors)]);
  exit;
}

/* ── Build email ─────────────────────────────────────────── */
$full_name     = "$first_name $last_name";
$email_subject = "$subject_pfx $subject";

$email_body = "
IoTeams IIUM — New Contact Form Submission
==========================================

Name:    $full_name
Email:   $email
Subject: $subject
Date:    " . date('d M Y, H:i') . "

Message:
--------
$message

==========================================
Sent via IoTeams Website Contact Form
IP: $ip
";

$headers  = "From: $from_name <noreply@iium.edu.my>\r\n";
$headers .= "Reply-To: $full_name <$email>\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

/* ── Send email ──────────────────────────────────────────── */
$sent = mail($to_email, $email_subject, $email_body, $headers);

if ($sent) {
  // Send auto-reply to user
  $reply_subject = "We received your message — IoTeams IIUM";
  $reply_body = "
Hi $first_name,

Thank you for reaching out to IoTeams IIUM!

We've received your message and will get back to you within 48 hours.

Your message:
-------------
$message

---
IoTeams IIUM
ioteams@iium.edu.my
Kulliyyah of Engineering, IIUM Gombak
";

  $reply_headers  = "From: IoTeams IIUM <ioteams@iium.edu.my>\r\n";
  $reply_headers .= "MIME-Version: 1.0\r\n";
  $reply_headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

  mail($email, $reply_subject, $reply_body, $reply_headers);

  echo json_encode(['success' => true, 'message' => 'Message sent successfully.']);
} else {
  http_response_code(500);
  echo json_encode(['success' => false, 'message' => 'Failed to send email. Please try emailing us directly at ioteams@iium.edu.my']);
}
?>