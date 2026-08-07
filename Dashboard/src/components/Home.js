import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Dashboard from "./Dashboard";
import TopBar from "./TopBar";

const Home = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [verified, setVerified] = useState(false); // ✅ verified hone tak wait karo

  useEffect(() => {
    const verifyCookie = async () => {
      // Cookie nahi → login pe bhejo
      if (!cookies.token) {
        window.location.href = "http://localhost:3000/login"; // ✅ go to frontend login
        return;
      }

      try {
        const { data } = await axios.post(
          (process.env.REACT_APP_API_URL || "http://localhost:3005") + "/",
          {},
          { withCredentials: true }
        );

        if (data.status) {
          // ✅ Valid user → dashboard dikhao
          setUsername(data.user);
          setUserEmail(data.email);
          setVerified(true);
          toast(`Welcome back, ${data.user}! 👋`, {
            position: "top-right",
            autoClose: 2000,
          });
        } else {
          // ❌ Invalid token → logout → login
          removeCookie("token");
          window.location.href = "http://localhost:3000/login"; // ✅
        }
      } catch (err) {
        removeCookie("token");
        window.location.href = "http://localhost:3000/login"; // ✅
      }
    };

    verifyCookie();
  }, [cookies, navigate, removeCookie]);

  const handleLogout = () => {
    removeCookie("token");
    window.location.href = "http://localhost:3000/login"; // ✅ frontend ka login
    toast("Logged out successfully!", { position: "top-right" });
  };

  // Verify hone tak loading dikhao
  if (!verified) {
    return (
      <div style={{
        display: "flex", justifyContent: "center",
        alignItems: "center", height: "100vh",
        fontFamily: "sans-serif", color: "#387ed1",
        fontSize: "1.1rem"
      }}>
        Loading your dashboard...
      </div>
    );
  }

  return (
    <>
      <TopBar username={username} email={userEmail} onLogout={handleLogout} />
      <Dashboard username={username} />
      <ToastContainer />
    </>
  );
};

export default Home;