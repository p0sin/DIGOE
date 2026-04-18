<?php
declare(strict_types=1);

// Simple contact form handler for static FTP deployments (Apache/PHP).
// Sends email via PHP's mail(). If mail() isn't configured on the host,
// use an SMTP-capable solution instead.

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
  http_response_code(405);
  header('Content-Type: text/plain; charset=UTF-8');
  echo "Method Not Allowed";
  exit;
}

// Honeypot (basic spam trap)
$honeypot = trim((string)($_POST['website'] ?? ''));
if ($honeypot !== '') {
  http_response_code(200);
  exit;
}

$redirect = (string)($_POST['redirect'] ?? '/?contact=ok#contact');
if ($redirect === '' || $redirect[0] !== '/') {
  $redirect = '/?contact=ok#contact';
}

$name = trim((string)($_POST['name'] ?? ''));
$company = trim((string)($_POST['company'] ?? ''));
$email = trim((string)($_POST['email'] ?? ''));
$message = trim((string)($_POST['message'] ?? ''));

if ($name === '' || $email === '' || $message === '') {
  header('Location: ' . $redirect);
  exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  header('Location: ' . $redirect);
  exit;
}

// Prevent header injection
$emailSafe = str_replace(["\r", "\n"], '', $email);
$nameSafe = str_replace(["\r", "\n"], '', $name);

$to = 'info@digoegf.com';
$subject = 'Nuevo contacto desde DIGOE';

$lines = [];
$lines[] = "Nombre: " . $name;
if ($company !== '') $lines[] = "Empresa: " . $company;
$lines[] = "Email: " . $email;
$lines[] = "";
$lines[] = "Mensaje:";
$lines[] = $message;
$body = implode("\n", $lines);

$headers = [];
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-Type: text/plain; charset=UTF-8';
$headers[] = 'From: ' . $nameSafe . ' <no-reply@' . ($_SERVER['HTTP_HOST'] ?? 'localhost') . '>';
$headers[] = 'Reply-To: ' . $emailSafe;

@mail($to, $subject, $body, implode("\r\n", $headers));

header('Location: ' . $redirect);
exit;

