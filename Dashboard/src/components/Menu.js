import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ProfileModal, SettingsModal, HelpModal } from "./ProfileModals";

const Menu = ({ username, email, onLogout }) => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  // Modal states
  const [activeModal, setActiveModal] = useState(null); // "profile", "settings", "help", or null
  
  const profileRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMenuClick = (index) => setSelectedMenu(index);

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  // initials for avatar
  const initials = username
    ? username.slice(0, 2).toUpperCase()
    : "ZU";

  return (
    <div className="menu-container">
      <img src="/logo.svg" style={{ width: "130px", marginLeft: "15px" }} alt="logo" />
      <div className="menus">
        <ul>
          <li>
            <Link style={{ textDecoration: "none" }} to="/" onClick={() => handleMenuClick(0)}>
              <p className={selectedMenu === 0 ? activeMenuClass : menuClass}>Dashboard</p>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none" }} to="/orders" onClick={() => handleMenuClick(1)}>
              <p className={selectedMenu === 1 ? activeMenuClass : menuClass}>Orders</p>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none" }} to="/holdings" onClick={() => handleMenuClick(2)}>
              <p className={selectedMenu === 2 ? activeMenuClass : menuClass}>Holdings</p>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none" }} to="/positions" onClick={() => handleMenuClick(3)}>
              <p className={selectedMenu === 3 ? activeMenuClass : menuClass}>Positions</p>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none" }} to="/funds" onClick={() => handleMenuClick(4)}>
              <p className={selectedMenu === 4 ? activeMenuClass : menuClass}>Funds</p>
            </Link>
          </li>
        </ul>
        <hr />
        <div className="profile-wrapper" ref={profileRef}>
          <div className="profile" onClick={() => setIsProfileOpen(!isProfileOpen)}>
            <div className="avatar">{initials}</div>
            <p className="username">{username || "User"}</p>
          </div>
          
          {/* ── PROFILE DROPDOWN ── */}
          {isProfileOpen && (
            <div className="profile-dropdown">
              <div className="dropdown-header">
                <div className="dropdown-avatar">{initials}</div>
                <div className="dropdown-info">
                  <h4>{username || "User"}</h4>
                  <p>{email || "user@example.com"}</p>
                </div>
              </div>
              <div className="dropdown-body">
                <ul>
                  <li onClick={() => { setActiveModal("profile"); setIsProfileOpen(false); }}>
                    <i className="icon-user"></i> My Profile
                  </li>
                  <li onClick={() => { setActiveModal("help"); setIsProfileOpen(false); }}>
                    <i className="icon-help"></i> Help & Support
                  </li>
                </ul>
              </div>
              <div className="dropdown-footer">
                <button onClick={onLogout} className="logout-btn">
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── RENDER MODALS ── */}
      {activeModal === "profile" && <ProfileModal username={username} email={email} onClose={() => setActiveModal(null)} />}
      {activeModal === "help" && <HelpModal onClose={() => setActiveModal(null)} />}
    </div>
  );
};

export default Menu;