import React, { useState, useEffect } from "react";
import axios from "axios";
import { VerticalGraph } from "./VerticalGraph";
import { PortfolioAllocationChart } from "./PortfolioAllocationChart";

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);

  useEffect(() => {
    axios.get((process.env.REACT_APP_API_URL || "http://localhost:3005") + "/allHoldings", { withCredentials: true }).then((res) => {
      setAllHoldings(res.data);
    });
  }, []);

  // ← return must be INSIDE the function
  return (
    <>
      <h3 className="title">Holdings ({allHoldings.length})</h3>
      <div className="order-table">
        <table>
          <tr>
            <th>Instrument</th>
            <th>Qty.</th>
            <th>Avg. cost</th>
            <th>LTP</th>
            <th>Cur. val</th>
            <th>P&L</th>
            <th>Net chg.</th>
            <th>Day chg.</th>
          </tr>
          {allHoldings.map((stock, index) => {
            const curValue = stock.price * stock.qty;
            const isProfit = curValue - stock.avg * stock.qty >= 0.0;
            const profClass = isProfit ? "profit" : "loss";
            const dayClass = stock.isLoss ? "loss" : "profit";
            return (
              <tr key={index}>
                <td>{stock.name}</td>
                <td>{stock.qty}</td>
                <td>{stock.avg.toFixed(2)}</td>
                <td>{stock.price.toFixed(2)}</td>
                <td>{curValue.toFixed(2)}</td>
                <td className={profClass}>
                  {(curValue - stock.avg * stock.qty).toFixed(2)}
                </td>
                <td className={profClass}>{stock.net}</td>
                <td className={dayClass}>{stock.day}</td>
              </tr>
            );
          })}
        </table>
      </div>

      {(() => {
        let totalInvestment = 0;
        let currentValue = 0;
        
        allHoldings.forEach((stock) => {
          totalInvestment += stock.avg * stock.qty;
          currentValue += stock.price * stock.qty;
        });
        
        let pnl = currentValue - totalInvestment;
        let pnlPercent = totalInvestment > 0 ? (pnl / totalInvestment) * 100 : 0;
        
        return (
          <div className="row">
            <div className="col">
              <h5>
                {totalInvestment.toLocaleString("en-IN", { style: "currency", currency: "INR" })}
              </h5>
              <p>Total investment</p>
            </div>
            <div className="col">
              <h5>
                {currentValue.toLocaleString("en-IN", { style: "currency", currency: "INR" })}
              </h5>
              <p>Current value</p>
            </div>
            <div className="col">
              <h5 className={pnl >= 0 ? "profit" : "loss"}>
                {pnl.toLocaleString("en-IN", { style: "currency", currency: "INR" })} ({pnlPercent >= 0 ? "+" : ""}{pnlPercent.toFixed(2)}%)
              </h5>
              <p>P&L</p>
            </div>
          </div>
        );
      })()}
      
      {/* ── VERTICAL BAR CHART ── */}
      <VerticalGraph data={allHoldings} />

      {/* ── PORTFOLIO ALLOCATION PIE CHART ── */}
      <PortfolioAllocationChart data={allHoldings} />
    </>
  );  // ← close return here, inside function
};   // ← close function here

export default Holdings;