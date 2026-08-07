import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Password strength rules (same as signup)
const passwordRules = [
  { id: "length",    label: "At least 8 characters",        test: (p) => p.length >= 8 },
  { id: "uppercase", label: "One uppercase letter (A-Z)",   test: (p) => /[A-Z]/.test(p) },
  { id: "lowercase", label: "One lowercase letter (a-z)",   test: (p) => /[a-z]/.test(p) },
  { id: "number",    label: "One number (0-9)",             test: (p) => /[0-9]/.test(p) },
  { id: "special",   label: "One special character (!@#$)", test: (p) => /[!@#$%^&*(),.?":{}|<>]/.test(p) },
];

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token"); // read ?token=xyz from URL

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const allPassed = passwordRules.every((r) => r.test(newPassword));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!allPassed) {
      toast.error("Password doesn't meet all requirements.", { position: "top-center" });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!", { position: "top-center" });
      return;
    }

    if (!token) {
      toast.error("Invalid reset link. Please request a new one.", { position: "top-center" });
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post(
        (process.env.REACT_APP_API_URL || "http://localhost:3005") + "/reset-password",
        { token, newPassword },
        { withCredentials: true }
      );
      if (data.success) {
        setDone(true);
        toast.success(data.message, { position: "top-center" });
        setTimeout(() => navigate("/login"), 2500);
      } else {
        toast.error(data.message, { position: "top-center" });
      }
    } catch (error) {
      toast.error("Cannot connect to server.", { position: "top-center" });
    }
    setLoading(false);
  };

  if (!token) {
    return (
      <div className="auth-overlay">
        <div className="auth-modal" style={{ fontFamily: "Lato, sans-serif", textAlign: "center" }}>
          <p style={{ color: "#e74c3c", fontSize: "1rem" }}>❌ Invalid reset link.<br />Please request a new one.</p>
          <Link to="/forgot-password" style={{ color: "#387ed1", fontWeight: 600 }}>Go to Forgot Password</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap');
        .auth-overlay { position:fixed; inset:0; background:rgba(0,0,0,0.55); backdrop-filter:blur(4px); display:flex; align-items:center; justify-content:center; z-index:1000; }
        .auth-modal { background:#fff; border-radius:4px; width:100%; max-width:420px; padding:40px 36px 32px; box-shadow:0 20px 60px rgba(0,0,0,0.2); position:relative; font-family:'Lato',sans-serif; max-height:90vh; overflow-y:auto; }
        .close-btn { position:absolute; top:14px; right:18px; background:none; border:none; font-size:22px; cursor:pointer; color:#999; }
        .auth-logo { display:flex; align-items:center; gap:8px; margin-bottom:24px; }
        .auth-logo-dot { width:28px; height:28px; background:#387ed1; border-radius:50%; }
        .auth-logo span { font-size:1.3rem; font-weight:700; color:#424242; }
        .auth-title { font-size:1.1rem; font-weight:600; color:#333; margin-bottom:6px; }
        .auth-subtitle { font-size:0.82rem; color:#888; margin-bottom:28px; }
        .auth-field { margin-bottom:18px; }
        .auth-field label { display:block; font-size:0.8rem; font-weight:600; color:#555; margin-bottom:6px; text-transform:uppercase; letter-spacing:0.5px; }
        .input-wrap { position:relative; }
        .input-wrap input { width:100%; padding:11px 40px 11px 14px; border:1.5px solid #e0e0e0; border-radius:4px; font-size:0.95rem; outline:none; transition:border 0.2s; box-sizing:border-box; font-family:'Lato',sans-serif; }
        .input-wrap input:focus { border-color:#387ed1; box-shadow:0 0 0 3px rgba(56,126,209,0.1); }
        .input-wrap input.valid { border-color:#27ae60; }
        .toggle-eye { position:absolute; right:12px; top:50%; transform:translateY(-50%); cursor:pointer; font-size:16px; color:#999; user-select:none; }
        .rules-box { background:#f8f9fa; border:1px solid #eee; border-radius:4px; padding:12px 14px; margin-top:10px; }
        .rules-box p { font-size:0.75rem; font-weight:700; color:#555; margin-bottom:8px; text-transform:uppercase; }
        .rule-item { display:flex; align-items:center; gap:8px; font-size:0.8rem; margin-bottom:5px; }
        .rule-item.passed { color:#27ae60; }
        .rule-item.failed { color:#aaa; }
        .rule-icon { width:16px; height:16px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:10px; font-weight:700; flex-shrink:0; }
        .rule-item.passed .rule-icon { background:#27ae60; color:#fff; }
        .rule-item.failed .rule-icon { background:#e0e0e0; color:#aaa; }
        .auth-submit { width:100%; padding:12px; background:#387ed1; color:#fff; border:none; border-radius:4px; font-size:0.95rem; font-weight:600; cursor:pointer; margin-top:8px; transition:background 0.2s; font-family:'Lato',sans-serif; }
        .auth-submit:hover { background:#2d6bb5; }
        .auth-submit:disabled { background:#a0bce0; cursor:not-allowed; }
        .auth-switch { text-align:center; font-size:0.85rem; color:#666; margin-top:20px; }
        .auth-switch a { color:#387ed1; text-decoration:none; font-weight:600; }
        .success-box { text-align:center; padding:16px; background:#f0fdf4; border:1px solid #bbf7d0; border-radius:4px; }
        .success-box p { color:#166534; font-size:0.9rem; line-height:1.6; }
      `}</style>

      <div className="auth-overlay">
        <div className="auth-modal">
          <button className="close-btn" onClick={() => navigate("/login")}>×</button>
          <div className="auth-logo">
            <div className="auth-logo-dot" />
            <span>Zerodha</span>
          </div>
          <p className="auth-title">Set new password</p>
          <p className="auth-subtitle">Enter your new password below.</p>

          {done ? (
            <div className="success-box">
              <p>✅ Password reset successfully!<br />Redirecting to login...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="auth-field">
                <label>New Password</label>
                <div className="input-wrap">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={newPassword}
                    placeholder="Create a strong password"
                    onChange={(e) => setNewPassword(e.target.value)}
                    className={allPassed ? "valid" : ""}
                    required
                  />
                  <span className="toggle-eye" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? "🙈" : "👁️"}
                  </span>
                </div>
                {newPassword.length > 0 && (
                  <div className="rules-box">
                    <p>Password must have:</p>
                    {passwordRules.map((rule) => {
                      const passed = rule.test(newPassword);
                      return (
                        <div key={rule.id} className={`rule-item ${passed ? "passed" : "failed"}`}>
                          <span className="rule-icon">{passed ? "✓" : "·"}</span>
                          {rule.label}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
              <div className="auth-field">
                <label>Confirm Password</label>
                <div className="input-wrap">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    placeholder="Re-enter your password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={confirmPassword && confirmPassword === newPassword ? "valid" : ""}
                    required
                  />
                </div>
                {confirmPassword && confirmPassword !== newPassword && (
                  <p style={{ color: "#e74c3c", fontSize: "0.78rem", marginTop: "4px" }}>
                    Passwords do not match
                  </p>
                )}
              </div>
              <button className="auth-submit" type="submit" disabled={loading || !allPassed}>
                {loading ? "Resetting..." : "Reset Password →"}
              </button>
            </form>
          )}

          <div className="auth-switch">
            <Link to="/login">Back to Login</Link>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default ResetPassword;
