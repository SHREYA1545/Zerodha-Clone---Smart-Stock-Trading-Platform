const User = require("../model/UserModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");

// ── Token verify karo aur userId attach karo ──────────────────────
module.exports.userVerification = (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.json({ status: false });

  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) return res.json({ status: false });
    const user = await User.findById(data.id);
    if (user) return res.json({ status: true, user: user.username, email: user.email, userId: user._id });
    else return res.json({ status: false });
  });
};

// ── Protected routes ke liye middleware ───────────────────────────
module.exports.requireAuth = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Please login first!" });

  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) return res.status(401).json({ message: "Invalid token!" });
    req.userId = data.id; // ✅ userId har request mein available hoga
    next();
  });
};