import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { OrdersGraph } from "./OrdersGraph";

const Orders = () => {
  const [allOrders, setAllOrders] = useState([]);

  useEffect(() => {
    axios
      .get((process.env.REACT_APP_API_URL || "http://localhost:3005") + "/allOrders", { withCredentials: true })
      .then((res) => {
        setAllOrders(res.data);
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
      });
  }, []);

  if (allOrders.length === 0) {
    return (
      <div className="orders">
        <div className="no-orders">
          <p>You haven't placed any orders today</p>
          <Link to={"/"} className="btn">
            Get started
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="orders">
      <h3 className="title">Orders ({allOrders.length})</h3>
      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Price</th>
              <th>Mode</th>
            </tr>
          </thead>
          <tbody>
            {allOrders.map((order, index) => (
              <tr key={index}>
                <td>{order.name}</td>
                <td>{order.qty}</td>
                <td>{order.price}</td>
                <td
                  className={order.mode === "BUY" ? "profit" : "loss"}
                  style={{ fontWeight: "bold" }}
                >
                  {order.mode}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* ── ORDERS GRAPH ── */}
      <OrdersGraph data={allOrders} />
    </div>
  );
};

export default Orders;