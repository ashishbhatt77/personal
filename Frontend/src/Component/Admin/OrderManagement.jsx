import React from "react";
import Head from "./partials/Head";
import Header from "./partials/Header";
import LeftSidebar from "./partials/LeftSidebar";
import "bootstrap/dist/css/bootstrap.min.css";

const orders = [
  { id: 101, customer: "John Doe", seller: "Seller A", amount: "$199.99", status: "Pending" },
  { id: 102, customer: "Jane Smith", seller: "Seller B", amount: "$299.99", status: "Shipped" },
  { id: 103, customer: "Mike Johnson", seller: "Seller C", amount: "$99.99", status: "Delivered" }
];

const OrderManagement = ({ children }) => {
  return (
    <>
      <Head />
      <Header />

      <section id="mid">
        <div className="container-fluid">
          <div className="row">
            <LeftSidebar />
            <div className="col-md-9">
              <h2 className="text-center">ORDER MANAGEMENT</h2>
              <table className="table table-bordered mt-4">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Seller</th>
                    <th>Total Amount</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.customer}</td>
                      <td>{order.seller}</td>
                      <td>{order.amount}</td>
                      <td>{order.status}</td>
                      <td>
                        <button className="btn btn-info btn-sm me-2">View</button>
                        <button className="btn btn-warning btn-sm">Update</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {children}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OrderManagement;
