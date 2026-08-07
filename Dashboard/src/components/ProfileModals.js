import React, { useState } from "react";

// ── Generic Modal Overlay Wrapper ──
const ModalWrapper = ({ title, onClose, children }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
};

// ── 1. Profile Modal ──
export const ProfileModal = ({ username, email, onClose }) => {
  const initials = username ? username.slice(0, 2).toUpperCase() : "ZU";
  return (
    <ModalWrapper title="My Profile" onClose={onClose}>
      <div className="profile-modal-info">
        <div className="profile-modal-avatar">{initials}</div>
        <h2>{username || "User"}</h2>
        <p className="email">{email || "user@example.com"}</p>
        
        <div className="profile-details">
          <div className="detail-row">
            <span>Account Status</span>
            <span className="status-badge green">Verified & Active</span>
          </div>
          <div className="detail-row">
            <span>Phone Number</span>
            <span>+91 ••••• ••456</span>
          </div>
          <div className="detail-row">
            <span>PAN Number</span>
            <span>ABCDE1234F</span>
          </div>
          <div className="detail-row">
            <span>Demat Account</span>
            <span>1208160000000000</span>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};

// ── 2. Settings Modal ──
export const SettingsModal = ({ onClose }) => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [twoFactor, setTwoFactor] = useState(true);

  return (
    <ModalWrapper title="Account Settings" onClose={onClose}>
      <div className="settings-list">
        <div className="setting-item">
          <div className="setting-info">
            <h4>Order Notifications</h4>
            <p>Get email alerts when orders are executed.</p>
          </div>
          <label className="toggle-switch">
            <input type="checkbox" checked={notifications} onChange={() => setNotifications(!notifications)} />
            <span className="slider"></span>
          </label>
        </div>

        <div className="setting-item">
          <div className="setting-info">
            <h4>Dark Mode Theme</h4>
            <p>Switch dashboard to a darker aesthetic.</p>
          </div>
          <label className="toggle-switch">
            <input type="checkbox" checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
            <span className="slider"></span>
          </label>
        </div>

        <div className="setting-item">
          <div className="setting-info">
            <h4>Two-Factor Auth (2FA)</h4>
            <p>Require OTP when logging in.</p>
          </div>
          <label className="toggle-switch">
            <input type="checkbox" checked={twoFactor} onChange={() => setTwoFactor(!twoFactor)} />
            <span className="slider"></span>
          </label>
        </div>
      </div>
    </ModalWrapper>
  );
};

// ── 3. Help & Support Modal ──
export const HelpModal = ({ onClose }) => {
  return (
    <ModalWrapper title="Help & Support" onClose={onClose}>
      <div className="help-section">
        <h4>Frequently Asked Questions</h4>
        
        <div className="faq-item">
          <h5>How do I add funds?</h5>
          <p>Go to the Funds tab and click on the green 'Add Funds' button. You can use UPI or Netbanking.</p>
        </div>
        
        <div className="faq-item">
          <h5>When will my withdrawn funds reach my bank?</h5>
          <p>Withdrawal requests are processed at 8 PM everyday. Funds will reflect in your account the next working day.</p>
        </div>
        
        <div className="faq-item">
          <h5>How do I sell a stock?</h5>
          <p>Go to your Holdings or Positions tab, click the options menu (...), and select Exit/Sell.</p>
        </div>

        <hr style={{ margin: "20px 0", borderTop: "1px solid #eee" }} />
        
        <h4>Still need help?</h4>
        <div className="contact-box">
          <p>Email us at: <strong>support@zerodhaclone.com</strong></p>
          <p>Call us: <strong>+91 80 4718 1888</strong></p>
          <button className="support-btn" onClick={() => alert("Redirecting to Support Portal...")}>
            Open Support Ticket
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};
