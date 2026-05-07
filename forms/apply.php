<?php
/**
 * IoTeams IIUM — Membership Application Handler
 * forms/apply.php
 *
 * Receives multi-step application form data from apply.html.
 * Sends notification to IoTeams committee + confirmation to applicant.
 *
 * Same server requirements as contact.php.
 * For GitHub Pages, Web3Forms handles this (wired in apply.html).
 */

/* ── Configuration ───────────────────────────────────────── */
$to_email    = 'ioteams@iium.edu.my';
$from_name   = 'IoTeams IIUM Applications';
$subject_pfx = '[IoTeams Application]';

/* ── Security headers ────────────────────────────────────── */
header('Content-Type: application/json');
header('X-Content-Type-Options: nosniff');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['success' => false, 'message' => 'Method not allowed.']);
  exit;
}

/* ── Honeypot ─────────────────────────────────────────────── */
if (!empty($_POST['_honey'])) {
  echo json_encode(['success' => true]);
  exit;
}

/* ── Sanitise ─────────────────────────────────────────────── */
function clean(string $v): string {
  return htmlspecialchars(strip_tags(trim($v)), ENT_QUOTES, 'UTF-8');
}

$full_name  = clean($_POST['fullName']   ?? '');
$email      = filter_var(trim($_POST['email'] ?? ''), FILTER_SANITIZE_EMAIL);
$phone      = clean($_POST['phone']      ?? '');
$gender     = clean($_POST['gender']     ?? '');
$student_id = clean($_POST['studentId']  ?? '');
$faculty    = clean($_POST['faculty']    ?? '');
$programme  = clean($_POST['programme']  ?? '');
$year       = clean($_POST['year']       ?? '');
$track      = clean($_POST['track']      ?? '');
$experience = clean($_POST['experience'] ?? '');
$motivation = clean($_POST['motivation'] ?? '');

/* ── Validate ─────────────────────────────────────────────── */
$errors = [];
if (empty($full_name))                          $errors[] = 'Full name required.';
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'Valid IIUM email required.';
if (empty($student_id))                         $errors[] = 'Student ID required.';
if (empty($faculty))                            $errors[] = 'Faculty required.';
if (empty($track))                              $errors[] = 'Track selection required.';

// Must be IIUM email
if (!str_contains($email, 'iium.edu.my')) {
  $errors[] = 'Must use your official IIUM email address.';
}

if (!empty($errors)) {
  http_response_code(422);
  echo json_encode(['success' => false, 'message' => implode(' ', $errors)]);
  exit;
}

/* ── Track label map ─────────────────────────────────────── */
$track_labels = [
  'hardware' => 'Hardware & Embedded Systems',
  'cloud'    => 'Cloud & Connectivity',
  'ai'       => 'AI & Smart Systems',
  'all'      => 'All Three Tracks',
];
$track_label = $track_labels[$track] ?? $track;

/* ── Application ID ──────────────────────────────────────── */
$app_id = 'IOTAPP-' . strtoupper(substr(md5($email . time()), 0, 8));
$date   = date('d M Y, H:i');

/* ── Committee notification email ────────────────────────── */
$subject = "$subject_pfx New Application from $full_name [$student_id]";
$body    = "
IoTeams IIUM — New Membership Application
==========================================
Application ID: $app_id
Received:       $date

PERSONAL INFORMATION
--------------------
Full Name:   $full_name
Email:       $email
Phone:       $phone
Gender:      $gender

ACADEMIC INFORMATION
--------------------
Student ID:  $student_id
Faculty:     $faculty
Programme:   $programme
Year:        $year

PROGRAMME SELECTION
-------------------
Track:       $track_label
Experience:  $experience

WHY DO THEY WANT TO JOIN?
--------------------------
$motivation

==========================================
Action Required: Review and send confirmation to $email
==========================================
";

$headers  = "From: $from_name <noreply@iium.edu.my>\r\n";
$headers .= "Reply-To: $full_name <$email>\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

$sent = mail($to_email, $subject, $body, $headers);

/* ── Applicant confirmation email ────────────────────────── */
$confirm_subject = "Application Received — IoTeams IIUM [$app_id]";
$confirm_body    = "
Assalamualaikum / Hi $full_name,

Thank you for applying to IoTeams IIUM!

We've received your application and will review it within 3–5 working days.
You'll receive a follow-up email with your member ID and orientation details.

YOUR APPLICATION SUMMARY
------------------------
Application ID: $app_id
Track:          $track_label
Faculty:        $faculty
Programme:      $programme

WHAT HAPPENS NEXT?
------------------
1. We review your application (3–5 working days)
2. You receive a confirmation email with your Member ID
3. Attend our next orientation session
4. Pick up your starter kit and begin your first module!

If you have any questions, reply to this email or WhatsApp us.

---
IoTeams IIUM
ioteams@iium.edu.my
@ioteams_iium
Kulliyyah of Engineering, IIUM Gombak Campus
";

$confirm_headers  = "From: IoTeams IIUM <ioteams@iium.edu.my>\r\n";
$confirm_headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

mail($email, $confirm_subject, $confirm_body, $confirm_headers);

if ($sent) {
  echo json_encode([
    'success'    => true,
    'message'    => 'Application submitted successfully.',
    'app_id'     => $app_id,
  ]);
} else {
  http_response_code(500);
  echo json_encode([
    'success' => false,
    'message' => 'Failed to send. Please email us directly at ioteams@iium.edu.my',
  ]);
}
?>