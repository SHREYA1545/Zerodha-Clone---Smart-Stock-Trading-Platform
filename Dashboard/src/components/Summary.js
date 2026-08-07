import React, { useState, useEffect } from "react";
import axios from "axios";

const Summary = ({ username }) => {
  const [allHoldings, setAllHoldings] = useState([]);

  useEffect(() => {
    axios.get((process.env.REACT_APP_API_URL || "http://localhost:3005") + "/allHoldings", { withCredentials: true }).then((res) => {
      setAllHoldings(res.data);
    });
  }, []);

  // Calculate totals
  let totalInvestment = 0;
  let currentValue = 0;
  
  allHoldings.forEach((stock) => {
    totalInvestment += stock.avg * stock.qty;
    currentValue += stock.price * stock.qty;
  });
  
  let pnl = currentValue - totalInvestment;
  let pnlPercent = totalInvestment > 0 ? (pnl / totalInvestment) * 100 : 0;

  return (
    <>
      <div className="username">
        <h6>Hi, {username || "User"}!</h6>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Equity</p>
        </span>

        <div className="data">
          <div className="first">
            <h3>3.74k</h3>
            <p>Margin available</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Margins used <span>0</span>{" "}
            </p>
            <p>
              Opening balance <span>3.74k</span>{" "}
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Holdings ({allHoldings.length})</p>
        </span>

        <div className="data">
          <div className="first">
            <h3 className={pnl >= 0 ? "profit" : "loss"}>
              {pnl.toLocaleString("en-IN", { style: "currency", currency: "INR" })} <small className={pnl >= 0 ? "profit" : "loss"}>{pnlPercent >= 0 ? "+" : ""}{pnlPercent.toFixed(2)}%</small>{" "}
            </h3>
            <p>P&L</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Current Value <span>{currentValue.toLocaleString("en-IN", { style: "currency", currency: "INR" })}</span>{" "}
            </p>
            <p>
              Investment <span>{totalInvestment.toLocaleString("en-IN", { style: "currency", currency: "INR" })}</span>{" "}
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>
    </>
  );
};

export default Summary;
