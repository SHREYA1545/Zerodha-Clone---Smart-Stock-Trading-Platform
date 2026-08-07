import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const DoughnutChart = ({ data }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 12,
        },
      },
      title: {
        display: true,
        text: "Watchlist Distribution",
      },
    },
    cutout: "70%",
  };

  // We only show top 5-6 stocks so the legend doesn't get crazy
  const displayData = data.slice(0, 6);
  const labels = displayData.map((stock) => stock.name);

  // Parse price strings to numbers (e.g. "1,234.50" to 1234.50)
  const parsePrice = (priceStr) => {
    if (typeof priceStr === "number") return priceStr;
    return parseFloat(priceStr.replace(/,/g, ""));
  };

  const chartData = {
    labels,
    datasets: [
      {
        label: "Stock Price (₹)",
        data: displayData.map((stock) => parsePrice(stock.price)),
        backgroundColor: [
          "rgba(56, 126, 209, 0.7)",  // blue
          "rgba(255, 159, 64, 0.7)",  // orange
          "rgba(255, 205, 86, 0.7)",  // yellow
          "rgba(75, 192, 192, 0.7)",  // teal
          "rgba(153, 102, 255, 0.7)", // purple
          "rgba(255, 99, 132, 0.7)",  // pink
        ],
        borderWidth: 1,
      },
    ],
  };

  if (!data || data.length === 0) {
    return <div style={{ textAlign: "center", padding: "10px", color: "#888" }}>No data.</div>;
  }

  return (
    <div style={{ width: "100%", height: "250px", marginTop: "20px", padding: "15px", background: "#fff", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
      <Doughnut options={options} data={chartData} />
    </div>
  );
};
