import React, { useState } from "react";
import SellerAdminLayout from "../Seller/Partials/SellerAdminLayout";

const OrderManage = () => {
  const [orders, setOrders] = useState([
    { id: 1, customer: "Ashish", amount: 120, status: "Pending", date: "2025-03-17" },
    { id: 2, customer: "Harsh", amount: 250, status: "Processing", date: "2025-03-16" },
  ]);

  const handleStatusChange = (id, newStatus) => {
    setOrders(orders.map(order => order.id === id ? { ...order, status: newStatus } : order));
  };

  return (
    <SellerAdminLayout>
      <div className="container-fluid mt-4">
        <h2 className="mb-4 text-center">Order Management</h2>
        
        <div className="table-responsive">
          <table className="table table-bordered w-100">
            <thead className="table-dark">
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.customer}</td>
                  <td>${order.amount}</td>
                  <td>
                    <select
                      className="form-select"
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Canceled">Canceled</option>
                    </select>
                  </td>
                  <td>{order.date}</td>
                  <td>
                    <button className="btn btn-info btn-sm me-2">Invoice</button>
                    <button className="btn btn-warning btn-sm">Print Label</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </SellerAdminLayout>
  );
};

export default OrderManage;
