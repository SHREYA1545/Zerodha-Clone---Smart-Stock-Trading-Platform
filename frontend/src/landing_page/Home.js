import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./Dashboard";
import TopBar from "./TopBar";

const Home = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const verifyCookie = async () => {
      // Cookie nahi → same port ka /login
      if (!cookies.token) {
        navigate("/login");
        return;
      }

      try {
        const { data } = await axios.post(
          (process.env.REACT_APP_API_URL || "http://localhost:3005") + "/",
          {},
          { withCredentials: true }
        );

        if (data.status) {
          setUsername(data.user);
          setVerified(true);
          toast(`Hello ${data.user}! Welcome back 👋`, {
            position: "top-right",
            autoClose: 2000,
          });
        } else {
          removeCookie("token");
          navigate("/login"); // ✅ same port
        }
      } catch (err) {
        removeCookie("token");
        navigate("/login"); // ✅ same port
      }
    };

    verifyCookie();
  }, []); // sirf ek baar

  const handleLogout = () => {
    removeCookie("token");
    navigate("/login"); // ✅ same port
  };

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
      <TopBar username={username} onLogout={handleLogout} />
      <Dashboard />
      <ToastContainer />
    </>
  );
};

export default Home;