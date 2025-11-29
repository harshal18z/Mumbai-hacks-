import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendEmail({ to, subject, text, attachments = [] }) {
  try {
    await transporter.sendMail({
      from: `"PaisaPath 💚" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      attachments,
    });
    console.log(`✅ Email sent to ${to}`);
  } catch (err) {
    console.error("❌ Email Error:", err);
  }
}
