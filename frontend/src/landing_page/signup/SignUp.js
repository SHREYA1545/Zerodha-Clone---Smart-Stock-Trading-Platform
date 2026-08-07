import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ── Password validation rules ──────────────────────────────────────
const passwordRules = [
  { id: "length",    label: "At least 8 characters",       test: (p) => p.length >= 8 },
  { id: "uppercase", label: "One uppercase letter (A-Z)",  test: (p) => /[A-Z]/.test(p) },
  { id: "lowercase", label: "One lowercase letter (a-z)",  test: (p) => /[a-z]/.test(p) },
  { id: "number",    label: "One number (0-9)",            test: (p) => /[0-9]/.test(p) },
  { id: "special",   label: "One special character (!@#$)", test: (p) => /[!@#$%^&*(),.?":{}|<>]/.test(p) },
];

const getStrength = (password) => {
  const passed = passwordRules.filter((r) => r.test(password)).length;
  if (passed <= 1) return { label: "Very Weak", color: "#e74c3c", width: "20%" };
  if (passed === 2) return { label: "Weak",      color: "#e67e22", width: "40%" };
  if (passed === 3) return { label: "Fair",      color: "#f1c40f", width: "60%" };
  if (passed === 4) return { label: "Strong",    color: "#2ecc71", width: "80%" };
  return              { label: "Very Strong", color: "#27ae60", width: "100%" };
};

const Signup = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "", password: "", username: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRules, setShowRules] = useState(false);
  const { email, password, username } = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const handleError = (err) => toast.error(err, { position: "top-center" });
  const handleSuccess = (msg) => toast.success(msg, { position: "top-center" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ── Validate password before submitting ──
    const failedRules = passwordRules.filter((r) => !r.test(password));
    if (failedRules.length > 0) {
      handleError(`Password too weak! Missing: ${failedRules[0].label}`);
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post(
        (process.env.REACT_APP_API_URL || "http://localhost:3005") + "/signup",
        { ...inputValue },
        { withCredentials: true }
      );
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/login"); // ✅ Redirect to login so they can verify their email
        }, 3000);
      } else {
        handleError(message);
      }
    } catch (error) {
      const errMsg =
        error?.response?.data?.message ||
        error?.response?.data ||
        error?.message ||
        "Cannot connect to server. Is backend running on port 3005?";
      console.error("Signup error:", error);
      handleError(errMsg);
    }
    setLoading(false);
    setInputValue({ email: "", password: "", username: "" });
  };

  const strength = password.length > 0 ? getStrength(password) : null;
  const allPassed = passwordRules.every((r) => r.test(password));

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap');

        .auth-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.55);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.25s ease;
        }

        @keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
        @keyframes slideUp {
          from { opacity:0; transform:translateY(30px) }
          to   { opacity:1; transform:translateY(0) }
        }

        .auth-modal {
          background: #fff;
          border-radius: 4px;
          width: 100%;
          max-width: 420px;
          padding: 40px 36px 32px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.2);
          position: relative;
          animation: slideUp 0.3s ease;
          font-family: 'Lato', sans-serif;
          max-height: 90vh;
          overflow-y: auto;
        }

        .close-btn {
          position: absolute;
          top: 14px; right: 18px;
          background: none; border: none;
          font-size: 22px; cursor: pointer;
          color: #999; line-height: 1;
        }
        .close-btn:hover { color: #333; }

        .auth-logo {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 24px;
        }
        .auth-logo-dot {
          width: 28px; height: 28px;
          background: #387ed1;
          border-radius: 50%;
        }
        .auth-logo span {
          font-size: 1.3rem;
          font-weight: 700;
          color: #424242;
          letter-spacing: -0.5px;
        }

        .auth-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: #333;
          margin-bottom: 6px;
        }
        .auth-subtitle {
          font-size: 0.82rem;
          color: #888;
          margin-bottom: 28px;
        }

        .auth-field { margin-bottom: 18px; }
        .auth-field label {
          display: block;
          font-size: 0.8rem;
          font-weight: 600;
          color: #555;
          margin-bottom: 6px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .input-wrap {
          position: relative;
        }
        .input-wrap input {
          width: 100%;
          padding: 11px 40px 11px 14px;
          border: 1.5px solid #e0e0e0;
          border-radius: 4px;
          font-size: 0.95rem;
          color: #333;
          outline: none;
          transition: border 0.2s;
          box-sizing: border-box;
          font-family: 'Lato', sans-serif;
        }
        .input-wrap input:focus {
          border-color: #387ed1;
          box-shadow: 0 0 0 3px rgba(56,126,209,0.1);
        }
        .input-wrap input.valid {
          border-color: #27ae60;
        }
        .toggle-eye {
          position: absolute;
          right: 12px; top: 50%;
          transform: translateY(-50%);
          cursor: pointer;
          font-size: 16px;
          color: #999;
          user-select: none;
        }
        .toggle-eye:hover { color: #387ed1; }

        /* ── Strength bar ── */
        .strength-wrap {
          margin-top: 8px;
        }
        .strength-track {
          height: 4px;
          background: #eee;
          border-radius: 2px;
          overflow: hidden;
        }
        .strength-fill {
          height: 100%;
          border-radius: 2px;
          transition: width 0.4s ease, background 0.4s ease;
        }
        .strength-label {
          font-size: 0.75rem;
          margin-top: 4px;
          font-weight: 600;
        }

        /* ── Rules checklist ── */
        .rules-box {
          background: #f8f9fa;
          border: 1px solid #eee;
          border-radius: 4px;
          padding: 12px 14px;
          margin-top: 10px;
        }
        .rules-box p {
          font-size: 0.75rem;
          font-weight: 700;
          color: #555;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .rule-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.8rem;
          margin-bottom: 5px;
          transition: color 0.2s;
        }
        .rule-item.passed { color: #27ae60; }
        .rule-item.failed { color: #aaa; }
        .rule-icon {
          width: 16px; height: 16px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          flex-shrink: 0;
          font-weight: 700;
        }
        .rule-item.passed .rule-icon {
          background: #27ae60;
          color: #fff;
        }
        .rule-item.failed .rule-icon {
          background: #e0e0e0;
          color: #aaa;
        }

        .auth-submit {
          width: 100%;
          padding: 12px;
          background: #387ed1;
          color: #fff;
          border: none;
          border-radius: 4px;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          margin-top: 8px;
          transition: background 0.2s, transform 0.1s;
          font-family: 'Lato', sans-serif;
        }
        .auth-submit:hover { background: #2d6bb5; }
        .auth-submit:active { transform: scale(0.99); }
        .auth-submit:disabled { background: #a0bce0; cursor: not-allowed; }

        .auth-terms {
          font-size: 0.76rem;
          color: #aaa;
          text-align: center;
          margin-top: 14px;
          line-height: 1.5;
        }
        .auth-terms a { color: #387ed1; text-decoration: none; }

        .auth-divider {
          text-align: center;
          font-size: 0.78rem;
          color: #bbb;
          margin: 20px 0 16px;
          position: relative;
        }
        .auth-divider::before, .auth-divider::after {
          content: '';
          position: absolute;
          top: 50%; width: 42%; height: 1px;
          background: #eee;
        }
        .auth-divider::before { left: 0; }
        .auth-divider::after  { right: 0; }

        .auth-switch {
          text-align: center;
          font-size: 0.85rem;
          color: #666;
        }
        .auth-switch a {
          color: #387ed1;
          text-decoration: none;
          font-weight: 600;
        }
        .auth-switch a:hover { text-decoration: underline; }
      `}</style>

      <div className="auth-overlay">
        <div className="auth-modal">
          <button className="close-btn" onClick={() => navigate(-1)}>×</button>

          <div className="auth-logo">
            <div className="auth-logo-dot" />
            <span>Zerodha</span>
          </div>

          <p className="auth-title">Create your account</p>
          <p className="auth-subtitle">Start your investment journey today</p>

          <form onSubmit={handleSubmit}>

            {/* Username */}
            <div className="auth-field">
              <label>Username</label>
              <div className="input-wrap">
                <input
                  type="text"
                  name="username"
                  value={username}
                  placeholder="Choose a username"
                  onChange={handleOnChange}
                  className={username.length > 2 ? "valid" : ""}
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="auth-field">
              <label>Email</label>
              <div className="input-wrap">
                <input
                  type="email"
                  name="email"
                  value={email}
                  placeholder="Enter your email"
                  onChange={handleOnChange}
                  className={email.includes("@") ? "valid" : ""}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="auth-field">
              <label>Password</label>
              <div className="input-wrap">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  placeholder="Create a strong password"
                  onChange={handleOnChange}
                  onFocus={() => setShowRules(true)}
                  className={allPassed ? "valid" : ""}
                  required
                />
                <span
                  className="toggle-eye"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "🙈" : "👁️"}
                </span>
              </div>

              {/* Strength bar */}
              {strength && (
                <div className="strength-wrap">
                  <div className="strength-track">
                    <div
                      className="strength-fill"
                      style={{ width: strength.width, background: strength.color }}
                    />
                  </div>
                  <p className="strength-label" style={{ color: strength.color }}>
                    {strength.label}
                  </p>
                </div>
              )}

              {/* Rules checklist */}
              {showRules && (
                <div className="rules-box">
                  <p>Password must have:</p>
                  {passwordRules.map((rule) => {
                    const passed = rule.test(password);
                    return (
                      <div
                        key={rule.id}
                        className={`rule-item ${passed ? "passed" : "failed"}`}
                      >
                        <span className="rule-icon">{passed ? "✓" : "·"}</span>
                        {rule.label}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <button
              className="auth-submit"
              type="submit"
              disabled={loading || !allPassed}
            >
              {loading ? "Creating account..." : "Create Account →"}
            </button>
          </form>

          <p className="auth-terms">
            By signing up, you agree to our{" "}
            <a href="#!">Terms of Service</a> and{" "}
            <a href="#!">Privacy Policy</a>
          </p>

          <div className="auth-divider">or</div>

          <div className="auth-switch">
            Already have an account?{" "}
            <Link to="/login">Login here</Link>
          </div>
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

export default Signup;