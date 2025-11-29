// src/services/emailService.js
// Simple pluggable email helper - use third-party provider in production.
async function sendEmail(to, subject, text) {
  // In production, integrate SendGrid / Mailgun / Nodemailer with SMTP.
  console.log('sendEmail -- simulated:', { to, subject, text });
  return true;
}

module.exports = { sendEmail };
