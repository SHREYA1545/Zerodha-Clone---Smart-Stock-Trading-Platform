const User = require("../model/UserModel");
const { createSecretToken } = require("../util/SecretToken");
const { sendForgotPasswordEmail, sendVerificationEmail } = require("../util/emailService");
const bcrypt = require("bcryptjs");
const crypto = require("crypto"); // built-in Node.js — no install needed

// ─── Helper: generate a random secure token ───────────────────────
const generateToken = () => crypto.randomBytes(32).toString("hex");

// ─── SIGNUP (with email verification) ────────────────────────────
module.exports.Signup = async (req, res, next) => {
  try {
    const { email, password, username, createdAt } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }

    // Generate email verification token
    const verificationToken = generateToken();

    // Create user (password auto-hashed by pre-save hook)
    const user = await User.create({
      email,
      password,
      username,
      createdAt,
      isVerified: false, 
      verificationToken,
    });

    // Send verification email
    await sendVerificationEmail(email, username, verificationToken);

    res.status(201).json({
      message: "Account created successfully! Please check your email to verify your account.",
      success: true,
      user,
    });
    next();
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: error.message || "Server error during signup" });
  }
};

// ─── LOGIN (checks isVerified) ────────────────────────────────────
module.exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "Incorrect password or email" });
    }

    // ── Email verification check ──
    if (user.isVerified === false) {
      return res.json({
        message: "Please verify your email first. Check your inbox.",
        verified: false,
      });
    }

    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.json({ message: "Incorrect password or email" });
    }

    const token = createSecretToken(user._id);
    res.cookie("token", token, { withCredentials: true, httpOnly: false });

    res.status(201).json({
      message: "User logged in successfully",
      success: true,
    });
    next();
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: error.message || "Server error during login" });
  }
};

// ─── VERIFY EMAIL ─────────────────────────────────────────────────
module.exports.VerifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(400).json({ message: "Invalid or expired verification link." });
    }

    // Mark as verified, clear the token
    user.isVerified = true;
    user.verificationToken = null;
    await user.save();

    res.json({ message: "Email verified successfully! You can now login.", success: true });
  } catch (error) {
    console.error("VerifyEmail error:", error);
    res.status(500).json({ message: "Server error during verification" });
  }
};

// ─── FORGOT PASSWORD ──────────────────────────────────────────────
module.exports.ForgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if email is configured in .env
    if (!process.env.EMAIL_USER || process.env.EMAIL_USER === "your_gmail@gmail.com") {
      return res.status(500).json({
        message: "Email service not configured. Please add EMAIL_USER and EMAIL_PASS to backend .env file.",
      });
    }

    const user = await User.findOne({ email });
    // Always respond same way — don't reveal if email exists (security)
    if (!user) {
      return res.json({
        message: "If this email exists, a reset link has been sent.",
        success: true,
      });
    }

    // Generate reset token valid for 1 hour
    const resetToken = generateToken();
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
    await user.save();

    await sendForgotPasswordEmail(email, resetToken);

    res.json({
      message: "Password reset link sent to your email!",
      success: true,
    });
  } catch (error) {
    console.error("ForgotPassword error:", error);
    res.status(500).json({ message: error.message || "Server error" });
  }
};

// ─── RESET PASSWORD ───────────────────────────────────────────────
module.exports.ResetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiry: { $gt: new Date() }, // token must not be expired
    });

    if (!user) {
      return res.status(400).json({ message: "Reset link is invalid or has expired." });
    }

    // Update password (pre-save hook will hash it)
    user.password = newPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpiry = null;
    await user.save();

    res.json({ message: "Password reset successfully! You can now login.", success: true });
  } catch (error) {
    console.error("ResetPassword error:", error);
    res.status(500).json({ message: error.message || "Server error" });
  }
};