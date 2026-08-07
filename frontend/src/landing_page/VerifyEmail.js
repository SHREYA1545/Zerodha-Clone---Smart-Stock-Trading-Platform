import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState("loading"); // "loading" | "success" | "error"
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Invalid verification link.");
      return;
    }

    // Call backend as soon as page loads
    axios
      .get(`${process.env.REACT_APP_API_URL || "http://localhost:3005"}/verify-email/${token}`)
      .then(({ data }) => {
        if (data.success) {
          setStatus("success");
          setMessage(data.message);
        } else {
          setStatus("error");
          setMessage(data.message || "Verification failed.");
        }
      })
      .catch(() => {
        setStatus("error");
        setMessage("Cannot connect to server.");
      });
  }, [token]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap');
        .verify-wrapper { min-height:100vh; display:flex; align-items:center; justify-content:center; background:#f5f7fa; font-family:'Lato',sans-serif; }
        .verify-card { background:#fff; border-radius:8px; padding:48px 40px; max-width:420px; width:100%; text-align:center; box-shadow:0 8px 40px rgba(0,0,0,0.1); }
        .verify-icon { font-size:3rem; margin-bottom:16px; }
        .verify-title { font-size:1.3rem; font-weight:700; color:#333; margin-bottom:12px; }
        .verify-msg { font-size:0.9rem; color:#666; line-height:1.6; margin-bottom:28px; }
        .verify-btn { display:inline-block; background:#387ed1; color:#fff; text-decoration:none; padding:12px 28px; border-radius:4px; font-weight:600; font-size:0.95rem; transition:background 0.2s; }
        .verify-btn:hover { background:#2d6bb5; }
        .verify-btn.green { background:#27ae60; }
        .verify-btn.green:hover { background:#229954; }
        .spinner { width:40px; height:40px; border:4px solid #e0e0e0; border-top-color:#387ed1; border-radius:50%; animation:spin 0.8s linear infinite; margin:0 auto 20px; }
        @keyframes spin { to { transform:rotate(360deg); } }
      `}</style>

      <div className="verify-wrapper">
        <div className="verify-card">
          {status === "loading" && (
            <>
              <div className="spinner" />
              <p className="verify-title">Verifying your email...</p>
              <p className="verify-msg">Please wait a moment.</p>
            </>
          )}

          {status === "success" && (
            <>
              <div className="verify-icon">✅</div>
              <p className="verify-title">Email Verified!</p>
              <p className="verify-msg">{message}</p>
              <Link to="/login" className="verify-btn green">Login to your account →</Link>
            </>
          )}

          {status === "error" && (
            <>
              <div className="verify-icon">❌</div>
              <p className="verify-title">Verification Failed</p>
              <p className="verify-msg">{message}</p>
              <Link to="/signup" className="verify-btn">Try Signing Up Again</Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default VerifyEmail;
