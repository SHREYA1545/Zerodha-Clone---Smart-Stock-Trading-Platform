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

export const VerticalGraph = ({ data }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Investment vs Current Value",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const labels = data.map((stock) => stock.name);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Total Investment (₹)",
        data: data.map((stock) => stock.avg * stock.qty),
        backgroundColor: "rgba(56, 126, 209, 0.7)", // blue
      },
      {
        label: "Current Value (₹)",
        data: data.map((stock) => stock.price * stock.qty),
        backgroundColor: "rgba(39, 174, 96, 0.7)", // green
      },
    ],
  };

  if (!data || data.length === 0) {
    return <div style={{ textAlign: "center", padding: "20px", color: "#888", marginTop: "20px" }}>No holdings data to display on chart.</div>;
  }

  return (
    <div style={{ width: "100%", height: "350px", marginTop: "40px", padding: "20px", background: "#fff", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
      <Bar options={options} data={chartData} />
    </div>
  );
};
