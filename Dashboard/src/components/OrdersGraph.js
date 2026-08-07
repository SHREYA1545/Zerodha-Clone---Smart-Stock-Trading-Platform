import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const OrdersGraph = ({ data }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Buy vs Sell Traded Value (₹)",
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        beginAtZero: true,
      },
    },
  };

  // Group by stock name
  const stockMap = {};
  data.forEach((order) => {
    if (!stockMap[order.name]) {
      stockMap[order.name] = { buy: 0, sell: 0 };
    }
    const value = order.qty * order.price;
    if (order.mode === "BUY") {
      stockMap[order.name].buy += value;
    } else {
      stockMap[order.name].sell += value;
    }
  });

  const labels = Object.keys(stockMap);
  const buyData = labels.map((label) => stockMap[label].buy);
  const sellData = labels.map((label) => stockMap[label].sell);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Buy Value (₹)",
        data: buyData,
        backgroundColor: "rgba(39, 174, 96, 0.7)", // Green
      },
      {
        label: "Sell Value (₹)",
        data: sellData,
        backgroundColor: "rgba(231, 76, 60, 0.7)", // Red
      },
    ],
  };

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <div style={{ width: "100%", height: "350px", marginTop: "40px", padding: "20px", background: "#fff", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
      <Bar options={options} data={chartData} />
    </div>
  );
};
