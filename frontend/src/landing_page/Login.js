import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { email, password } = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const handleError = (err) => toast.error(err, { position: "top-center" });
  const handleSuccess = (msg) => toast.success(msg, { position: "top-center" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        (process.env.REACT_APP_API_URL || "http://localhost:3005") + "/login",
        { ...inputValue },
        { withCredentials: true }
      );
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          window.location.href = "http://localhost:3001"; // ✅ redirect to Dashboard app
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      // Show the real error — not just a generic message
      const errMsg =
        error?.response?.data?.message ||
        error?.response?.data ||
        error?.message ||
        "Cannot connect to server. Is backend running on port 3005?";
      console.error("Login error:", error);
      handleError(errMsg);
    }
    setLoading(false);
    setInputValue({ email: "", password: "" });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap');
        .auth-overlay {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.55);
          backdrop-filter: blur(4px);
          display: flex; align-items: center; justify-content: center;
          z-index: 1000; animation: fadeIn 0.25s ease;
        }
        @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
        @keyframes slideUp { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }
        .auth-modal {
          background: #fff; border-radius: 4px; width: 100%; max-width: 400px;
          padding: 40px 36px 32px; box-shadow: 0 20px 60px rgba(0,0,0,0.2);
          position: relative; animation: slideUp 0.3s ease;
          font-family: 'Lato', sans-serif;
        }
        .auth-modal .close-btn {
          position: absolute; top: 14px; right: 18px;
          background: none; border: none; font-size: 22px;
          cursor: pointer; color: #999; line-height: 1;
        }
        .auth-modal .close-btn:hover { color: #333; }
        .auth-logo { display: flex; align-items: center; gap: 8px; margin-bottom: 24px; }
        .auth-logo-dot { width: 28px; height: 28px; background: #387ed1; border-radius: 50%; }
        .auth-logo span { font-size: 1.3rem; font-weight: 700; color: #424242; letter-spacing: -0.5px; }
        .auth-title { font-size: 1.1rem; font-weight: 600; color: #333; margin-bottom: 6px; }
        .auth-subtitle { font-size: 0.82rem; color: #888; margin-bottom: 28px; }
        .auth-field { margin-bottom: 18px; }
        .auth-field label { display: block; font-size: 0.8rem; font-weight: 600; color: #555; margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.5px; }
        .auth-field input { width: 100%; padding: 11px 14px; border: 1.5px solid #e0e0e0; border-radius: 4px; font-size: 0.95rem; color: #333; outline: none; transition: border 0.2s; box-sizing: border-box; font-family: 'Lato', sans-serif; }
        .auth-field input:focus { border-color: #387ed1; box-shadow: 0 0 0 3px rgba(56,126,209,0.1); }
        .auth-submit { width: 100%; padding: 12px; background: #387ed1; color: #fff; border: none; border-radius: 4px; font-size: 0.95rem; font-weight: 600; cursor: pointer; margin-top: 8px; transition: background 0.2s, transform 0.1s; font-family: 'Lato', sans-serif; letter-spacing: 0.3px; }
        .auth-submit:hover { background: #2d6bb5; }
        .auth-submit:active { transform: scale(0.99); }
        .auth-submit:disabled { background: #a0bce0; cursor: not-allowed; }
        .auth-divider { text-align: center; font-size: 0.78rem; color: #bbb; margin: 20px 0 16px; position: relative; }
        .auth-divider::before, .auth-divider::after { content: ''; position: absolute; top: 50%; width: 42%; height: 1px; background: #eee; }
        .auth-divider::before { left: 0; } .auth-divider::after { right: 0; }
        .auth-switch { text-align: center; font-size: 0.85rem; color: #666; }
        .auth-switch a { color: #387ed1; text-decoration: none; font-weight: 600; }
        .auth-switch a:hover { text-decoration: underline; }
        .auth-forgot { text-align: right; margin-top: -10px; margin-bottom: 16px; }
        .auth-forgot a { font-size: 0.78rem; color: #387ed1; text-decoration: none; }
        .auth-forgot a:hover { text-decoration: underline; }
      `}</style>

      <div className="auth-overlay">
        <div className="auth-modal">
          <button className="close-btn" onClick={() => navigate("/")}>×</button>
          <div className="auth-logo">
            <div className="auth-logo-dot" />
            <span>Zerodha</span>
          </div>
          <p className="auth-title">Welcome back</p>
          <p className="auth-subtitle">Login to your trading account</p>

          <form onSubmit={handleSubmit}>
            <div className="auth-field">
              <label>Email</label>
              <input type="email" name="email" value={email}
                placeholder="Enter your email" onChange={handleOnChange} required />
            </div>
            <div className="auth-field">
              <label>Password</label>
              <input type="password" name="password" value={password}
                placeholder="Enter your password" onChange={handleOnChange} required />
            </div>
            <div className="auth-forgot"><Link to="/forgot-password">Forgot password?</Link></div>
            <button className="auth-submit" type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login →"}
            </button>
          </form>

          <div className="auth-divider">or</div>
          <div className="auth-switch">
            Don't have an account? <Link to="/signup">Create account</Link>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;