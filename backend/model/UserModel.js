const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Your email address is required"],
    unique: true,
  },
  username: {
    type: String,
    required: [true, "Your username is required"],
  },
  password: {
    type: String,
    required: [true, "Your password is required"],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  // ── Email Verification ──────────────────────────────────────────
  isVerified: {
    type: Boolean,
    default: false,       // User must verify email before login
  },
  verificationToken: {
    type: String,
    default: null,
  },
  // ── Forgot Password ─────────────────────────────────────────────
  resetPasswordToken: {
    type: String,
    default: null,
  },
  resetPasswordExpiry: {
    type: Date,
    default: null,
  },
});

// Only hash password when it is new or was changed
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return; // skip if password unchanged
  this.password = await bcrypt.hash(this.password, 12);
});

module.exports = mongoose.model("User", userSchema);