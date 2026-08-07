const {
  Signup,
  Login,
  ForgotPassword,
  ResetPassword,
  VerifyEmail,
} = require("../controllers/AuthController");
const { userVerification } = require("../middlewares/AuthMiddleware");
const router = require("express").Router();

router.post("/signup", Signup);
router.post("/login", Login);
router.post("/", userVerification);           // Token verify (used by Dashboard on load)
router.get("/verify-email/:token", VerifyEmail);  // Email verification link
router.post("/forgot-password", ForgotPassword);  // Send reset email
router.post("/reset-password", ResetPassword);    // Set new password

module.exports = router;