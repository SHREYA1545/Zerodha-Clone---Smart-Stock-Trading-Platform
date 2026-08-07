import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const PortfolioAllocationChart = ({ data }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
      },
      title: {
        display: true,
        text: "Portfolio Allocation by Investment",
      },
    },
  };

  const labels = data.map((stock) => stock.name);
  const investmentData = data.map((stock) => stock.avg * stock.qty);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Investment (₹)",
        data: investmentData,
        backgroundColor: [
          "rgba(56, 126, 209, 0.7)",   // blue
          "rgba(255, 159, 64, 0.7)",   // orange
          "rgba(39, 174, 96, 0.7)",    // green
          "rgba(153, 102, 255, 0.7)",  // purple
          "rgba(255, 205, 86, 0.7)",   // yellow
          "rgba(231, 76, 60, 0.7)",    // red
          "rgba(0, 184, 148, 0.7)",    // mint
          "rgba(9, 132, 227, 0.7)",    // bright blue
          "rgba(108, 92, 231, 0.7)",   // violet
          "rgba(253, 121, 168, 0.7)",  // pink
        ],
        borderWidth: 1,
      },
    ],
  };

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <div style={{ width: "100%", height: "350px", marginTop: "40px", padding: "20px", background: "#fff", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
      <Pie options={options} data={chartData} />
    </div>
  );
};
