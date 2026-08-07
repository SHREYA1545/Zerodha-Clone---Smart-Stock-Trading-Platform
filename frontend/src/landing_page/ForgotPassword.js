import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        (process.env.REACT_APP_API_URL || "http://localhost:3005") + "/forgot-password",
        { email },
        { withCredentials: true }
      );
      if (data.success) {
        setSent(true);
        toast.success(data.message, { position: "top-center" });
      } else {
        toast.error(data.message, { position: "top-center" });
      }
    } catch (error) {
      const errMsg =
        error?.response?.data?.message ||
        error?.message ||
        "Cannot connect to server. Is backend running on port 3005?";
      toast.error(errMsg, { position: "top-center" });
    }
    setLoading(false);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap');
        .auth-overlay { position:fixed; inset:0; background:rgba(0,0,0,0.55); backdrop-filter:blur(4px); display:flex; align-items:center; justify-content:center; z-index:1000; animation:fadeIn 0.25s ease; }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes slideUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        .auth-modal { background:#fff; border-radius:4px; width:100%; max-width:400px; padding:40px 36px 32px; box-shadow:0 20px 60px rgba(0,0,0,0.2); position:relative; animation:slideUp 0.3s ease; font-family:'Lato',sans-serif; }
        .close-btn { position:absolute; top:14px; right:18px; background:none; border:none; font-size:22px; cursor:pointer; color:#999; }
        .close-btn:hover { color:#333; }
        .auth-logo { display:flex; align-items:center; gap:8px; margin-bottom:24px; }
        .auth-logo-dot { width:28px; height:28px; background:#387ed1; border-radius:50%; }
        .auth-logo span { font-size:1.3rem; font-weight:700; color:#424242; }
        .auth-title { font-size:1.1rem; font-weight:600; color:#333; margin-bottom:6px; }
        .auth-subtitle { font-size:0.82rem; color:#888; margin-bottom:28px; line-height:1.5; }
        .auth-field { margin-bottom:18px; }
        .auth-field label { display:block; font-size:0.8rem; font-weight:600; color:#555; margin-bottom:6px; text-transform:uppercase; letter-spacing:0.5px; }
        .auth-field input { width:100%; padding:11px 14px; border:1.5px solid #e0e0e0; border-radius:4px; font-size:0.95rem; outline:none; transition:border 0.2s; box-sizing:border-box; font-family:'Lato',sans-serif; }
        .auth-field input:focus { border-color:#387ed1; box-shadow:0 0 0 3px rgba(56,126,209,0.1); }
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
          <p className="auth-title">Forgot your password?</p>
          <p className="auth-subtitle">
            Enter the email address associated with your account and we'll send you a reset link.
          </p>

          {sent ? (
            <div className="success-box">
              <p>✅ Reset link sent!<br/>Check your email inbox (and spam folder).<br/>The link expires in <strong>1 hour</strong>.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="auth-field">
                <label>Email Address</label>
                <input
                  type="email"
                  value={email}
                  placeholder="Enter your registered email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button className="auth-submit" type="submit" disabled={loading}>
                {loading ? "Sending..." : "Send Reset Link →"}
              </button>
            </form>
          )}

          <div className="auth-switch">
            Remember your password? <Link to="/login">Login</Link>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default ForgotPassword;
