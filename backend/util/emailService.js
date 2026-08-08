const nodemailer = require("nodemailer");
require("dotenv").config();

// ── Gmail transporter setup (port 587 for Render compatibility) ────
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Gmail App Password (16 digits)
  },
  tls: {
    rejectUnauthorized: false,
  },
  // Force IPv4 — Render free tier doesn't support IPv6
  family: 4,
});

// ── Shared email styles ────────────────────────────────────────────
const emailWrapper = (content) => `
  <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 520px; margin: 0 auto; background: #f9f9f9; border-radius: 8px; overflow: hidden; border: 1px solid #eee;">
    <div style="background: #387ed1; padding: 28px 32px;">
      <div style="display:flex; align-items:center; gap:10px;">
        <div style="width:28px; height:28px; background:#fff; border-radius:50%; display:inline-block;"></div>
        <span style="color:#fff; font-size:1.4rem; font-weight:700; letter-spacing:-0.5px; margin-left:10px;">Zerodha</span>
      </div>
    </div>
    <div style="padding: 32px;">
      ${content}
    </div>
    <div style="background: #f1f1f1; padding: 16px 32px; text-align: center; font-size: 0.75rem; color: #999;">
      © 2025 Zerodha Clone. This is a student project.
    </div>
  </div>
`;

// ── FORGOT PASSWORD EMAIL ──────────────────────────────────────────
module.exports.sendForgotPasswordEmail = async (email, token) => {
  const baseUrl = process.env.FRONTEND_URL || "http://localhost:3000";
  const resetLink = `${baseUrl}/reset-password?token=${token}`;

  await transporter.sendMail({
    from: `"Zerodha Clone" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Reset your Zerodha password",
    html: emailWrapper(`
      <h2 style="color:#333; font-size:1.3rem; margin-bottom:8px;">Reset your password</h2>
      <p style="color:#666; font-size:0.95rem; line-height:1.6; margin-bottom:24px;">
        We received a request to reset the password for your account.<br/>
        Click the button below to set a new password. This link expires in <strong>1 hour</strong>.
      </p>
      <a href="${resetLink}" style="display:inline-block; background:#387ed1; color:#fff; text-decoration:none; padding:13px 28px; border-radius:4px; font-weight:600; font-size:0.95rem;">
        Reset Password →
      </a>
      <p style="color:#aaa; font-size:0.8rem; margin-top:24px;">
        If you didn't request this, you can safely ignore this email.<br/>
        Link: <a href="${resetLink}" style="color:#387ed1;">${resetLink}</a>
      </p>
    `),
  });
};

// ── EMAIL VERIFICATION EMAIL ───────────────────────────────────────
module.exports.sendVerificationEmail = async (email, username, token) => {
  const baseUrl = process.env.FRONTEND_URL || "http://localhost:3000";
  const verifyLink = `${baseUrl}/verify-email?token=${token}`;

  await transporter.sendMail({
    from: `"Zerodha Clone" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Verify your Zerodha account",
    html: emailWrapper(`
      <h2 style="color:#333; font-size:1.3rem; margin-bottom:8px;">Welcome, ${username}! 👋</h2>
      <p style="color:#666; font-size:0.95rem; line-height:1.6; margin-bottom:24px;">
        Thanks for signing up. Please verify your email address to activate your account.<br/>
        This link expires in <strong>24 hours</strong>.
      </p>
      <a href="${verifyLink}" style="display:inline-block; background:#27ae60; color:#fff; text-decoration:none; padding:13px 28px; border-radius:4px; font-weight:600; font-size:0.95rem;">
        Verify Email →
      </a>
      <p style="color:#aaa; font-size:0.8rem; margin-top:24px;">
        If you didn't create an account, ignore this email.<br/>
        Link: <a href="${verifyLink}" style="color:#387ed1;">${verifyLink}</a>
      </p>
    `),
  });
};
