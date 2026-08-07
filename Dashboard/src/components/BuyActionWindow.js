import React, { useState, useContext } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid, mode, currentPrice }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(currentPrice || 0); // ✅ auto fill!

  const generalContext = useContext(GeneralContext);
  const isBuy = mode === "BUY";

  const handleOrderClick = () => {
    if (stockPrice <= 0 || stockQuantity <= 0) {
      alert("Please enter valid quantity and price!");
      return;
    }

    axios
      .post((process.env.REACT_APP_API_URL || "http://localhost:3005") + "/newOrder", {
        name: uid,
        qty: Number(stockQuantity),
        price: Number(stockPrice),
        mode: mode,
      })
      .then((res) => {
        alert(`${mode} order placed for ${uid}!\n${res.data}`);
        generalContext.closeBuyWindow();
      })
      .catch((err) => {
        const msg = err.response?.data || "Backend not running!";
        alert(`Failed: ${msg}`);
      });
  };

  const handleCancelClick = () => {
    generalContext.closeBuyWindow();
  };

  return (
    <div className="container" id="buy-window" draggable="true">

      {/* Header */}
      <div className="header" style={{ background: isBuy ? "#4184f3" : "#e74c3c" }}>
        <h3>{uid} <span>NSE</span></h3>
        <p style={{ color: "#fff", fontSize: "0.8rem", marginTop: "4px" }}>
          {isBuy ? "BUY Order" : "SELL Order"}
        </p>
      </div>

      {/* Inputs */}
      <div className="regular-order">
        <div className="inputs">

          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              min="1"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
            />
          </fieldset>

          <fieldset>
            <legend>Price (₹)</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              min="0"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice} // ✅ auto filled with watchlist price
            />
          </fieldset>

        </div>

        {/* Show current market price for reference */}
        <p style={{ fontSize: "0.75rem", color: "#888", marginTop: "4px" }}>
          Current Market Price: ₹{currentPrice}
        </p>

      </div>

      {/* Buttons */}
      <div className="buttons">
        <span>
          {isBuy ? "Margin required" : "You will receive"} ₹
          {(stockPrice * stockQuantity).toFixed(2)}
        </span>
        <div>
          <button
            className="btn"
            style={{
              background: isBuy ? "#4184f3" : "#e74c3c",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              padding: "10px 20px",
              borderRadius: "2px",
              marginRight: "4px",
            }}
            onClick={handleOrderClick}
          >
            {isBuy ? "Buy" : "Sell"}
          </button>
          <button
            className="btn btn-grey"
            style={{ border: "none", cursor: "pointer" }}
            onClick={handleCancelClick}
          >
            Cancel
          </button>
        </div>
      </div>

    </div>
  );
};

export default BuyActionWindow;