import React, { useState, useContext } from "react";
import GeneralContext from "./GeneralContext";
import { Tooltip, Grow } from "@mui/material";
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  BarChartOutlined,
  MoreHoriz,
} from "@mui/icons-material";
import { watchlist } from "../Data/data";
import { DoughnutChart } from "./DoughnutChart";

const WatchList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [displayLimit, setDisplayLimit] = useState(10); // Default to 10

  // Filter watchlist based on search input
  const searchFiltered = watchlist.filter((stock) =>
    stock.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Apply display limit
  const filteredWatchlist = searchFiltered.slice(0, displayLimit);

  return (
    <div className="watchlist-container">
      <div className="search-container" style={{ display: 'flex', gap: '15px', alignItems: 'center', paddingRight: '15px' }}>
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search eg: infy, bse, nifty"
          className="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ flex: 1 }}
        />
        <select 
          value={displayLimit} 
          onChange={(e) => setDisplayLimit(Number(e.target.value))}
          style={{ padding: '6px', borderRadius: '4px', border: '1px solid #ddd', outline: 'none', cursor: 'pointer', background: '#f8f9fa' }}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
          <option value={40}>40</option>
          <option value={50}>50</option>
        </select>
        <span className="counts">{filteredWatchlist.length} / {watchlist.length}</span>
      </div>

      <ul className="list">
        {filteredWatchlist.map((stock, index) => {
          return <WatchListItem stock={stock} key={index} />;
        })}
      </ul>

      {/* ── DOUGHNUT CHART ── */}
      <div id="doughnut-chart-container">
        <DoughnutChart data={filteredWatchlist} />
      </div>
    </div>
  );
};

export default WatchList;


const WatchListItem = ({ stock }) => {
  const [showWatchlistActions, setShowWatchlistActions] = useState(false);

  return (
    <li
      onMouseEnter={() => setShowWatchlistActions(true)}
      onMouseLeave={() => setShowWatchlistActions(false)}
    >
      <div className="item">
        <p className={stock.isDown ? "down" : "up"}>{stock.name}</p>
        <div className="itemInfo">
          <span className="percent">{stock.percent}</span>
          {stock.isDown ? (
            <KeyboardArrowDown className="down" />
          ) : (
            <KeyboardArrowUp className="up" />
          )}
          <span className="price">{stock.price}</span>
        </div>
      </div>
      {showWatchlistActions && (
        <WatchListActions uid={stock.name} price={stock.price} />
        // ✅ stock.price bhi bhej rahe hain
      )}
    </li>
  );
};


const WatchListActions = ({ uid, price }) => {
  const generalContext = useContext(GeneralContext);

  const handleBuyClick = () => {
    generalContext.openBuyWindow(uid, price); // ✅ price bhi bheja
  };

  const handleSellClick = () => {
    generalContext.openSellWindow(uid, price); // ✅ price bhi bheja
  };

  const handleAnalyticsClick = () => {
    const el = document.getElementById("doughnut-chart-container");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <span className="actions">
      <span>
        <Tooltip title="Buy (B)" placement="top" arrow TransitionComponent={Grow}>
          <button className="buy" onClick={handleBuyClick}>Buy</button>
        </Tooltip>
        <Tooltip title="Sell (S)" placement="top" arrow TransitionComponent={Grow}>
          <button className="sell" onClick={handleSellClick}>Sell</button>
        </Tooltip>
        <Tooltip title="Analytics (A)" placement="top" arrow TransitionComponent={Grow}>
          <button className="action" onClick={handleAnalyticsClick}>
            <BarChartOutlined className="icon" />
          </button>
        </Tooltip>
        <Tooltip title="More" placement="top" arrow TransitionComponent={Grow}>
          <button className="action">
            <MoreHoriz className="icon" />
          </button>
        </Tooltip>
      </span>
    </span>
  );
};