import React from "react";
import LeftSideBar from "./Partials/LeftSideBar";
import SellerHeader from "./Partials/SellerHeader";
import SellerHead from "./Partials/SellerHead";

const ShipingDelivery = ({ children }) => {
  return (
    <>
      <SellerHead />
      <SellerHeader />

      <section id="mid">
        <div className="container-fluid">
          <div className="row">
            <LeftSideBar />
            <div className="col-md-9">
              <h2 className="text-center">SHIPPING & DELIVERY</h2>
              
              {/* Delivery Summary */}
              <div className="row text-center my-4">
                <div className="col-md-4">
                  <div className="card shadow p-3">
                    <h5>Orders Shipped</h5>
                    <h3 className="text-success">120</h3>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card shadow p-3">
                    <h5>Orders In Transit</h5>
                    <h3 className="text-warning">15</h3>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card shadow p-3">
                    <h5>Orders Delivered</h5>
                    <h3 className="text-primary">105</h3>
                  </div>
                </div>
              </div>

              {/* Delivery Status Table */}
              <div className="card shadow p-3 mt-4">
                <h5 className="mb-3">Recent Shipments</h5>
                <table className="table table-bordered table-striped">
                  <thead className="thead-dark">
                    <tr>
                      <th>#</th>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Shipping Status</th>
                      <th>Expected Delivery</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>#78901</td>
                      <td>John Doe</td>
                      <td><span className="badge bg-success">Delivered</span></td>
                      <td>March 15, 2025</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>#78902</td>
                      <td>Jane Smith</td>
                      <td><span className="badge bg-warning">In Transit</span></td>
                      <td>March 18, 2025</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>#78903</td>
                      <td>Michael Johnson</td>
                      <td><span className="badge bg-danger">Pending</span></td>
                      <td>March 20, 2025</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {children}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ShipingDelivery;
