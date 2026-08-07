import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CookiesProvider } from "react-cookie"; // ✅ yeh import karo
import "./index.css";
import Home from "../../../Dashboard/src/components/Home";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <CookiesProvider> {/* ✅ yeh wrap karo */}
      <Routes>
        <Route path="/*" element={<Home />} />
      </Routes>
    </CookiesProvider>
  </BrowserRouter>
);