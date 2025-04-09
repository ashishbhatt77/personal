import React from "react";
import LeftSideBar from "./Partials/LeftSideBar";
import SellerHeader from "./Partials/SellerHeader";
import SellerHead from "./Partials/SellerHead";

const ReportAnalytic = ({ children }) => {
  return (
    <>
      <SellerHead />
      <SellerHeader />

      <section id="mid">
        <div className="container-fluid">
          <div className="row">
            <LeftSideBar />
            <div className="col-md-9">
              <h2 className="text-center">REPORT ANALYTICS</h2>
              
              {/* Sales Summary */}
              <div className="row text-center my-4">
                <div className="col-md-4">
                  <div className="card shadow p-3">
                    <h5>Total Sales</h5>
                    <h3 className="text-success">$50,000</h3>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card shadow p-3">
                    <h5>Orders Processed</h5>
                    <h3 className="text-primary">320</h3>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card shadow p-3">
                    <h5>Pending Orders</h5>
                    <h3 className="text-warning">15</h3>
                  </div>
                </div>
              </div>

              {/* Revenue Chart Placeholder */}
              <div className="card shadow p-3 mt-4">
                <h5 className="mb-3">Revenue Chart</h5>
                <div className="chart-placeholder text-center p-5 border bg-light">
                  [Graph will be displayed here]
                </div>
              </div>

              {/* Orders Table */}
              <div className="card shadow p-3 mt-4">
                <h5 className="mb-3">Recent Orders</h5>
                <table className="table table-bordered table-striped">
                  <thead className="thead-dark">
                    <tr>
                      <th>#</th>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>#12345</td>
                      <td>John Doe</td>
                      <td>$250</td>
                      <td><span className="badge bg-success">Completed</span></td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>#12346</td>
                      <td>Jane Smith</td>
                      <td>$180</td>
                      <td><span className="badge bg-warning">Pending</span></td>
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

export default ReportAnalytic;
