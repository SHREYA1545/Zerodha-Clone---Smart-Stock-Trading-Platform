import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import "./index.css";
import "./axiosConfig";
import Home from "./components/Home";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <CookiesProvider>
    <BrowserRouter>
      <Routes>
        {/* All routes handled inside Home (auth guard + dashboard) */}
        <Route path="/*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  </CookiesProvider>
);
