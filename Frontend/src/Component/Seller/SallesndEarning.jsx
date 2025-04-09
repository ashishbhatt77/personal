import React from "react";
import LeftSideBar from "./Partials/LeftSideBar";
import SellerHeader from "./Partials/SellerHeader";
import SellerHead from "./Partials/SellerHead";

const  SallesndEarning = ({ children }) => {
  return (
    <>
      <SellerHead />
      <SellerHeader />

      <section id="mid">
        <div className="container-fluid">
          <div className="row">
            <LeftSideBar />
            <div className="col-md-9">
              <h2 className="text-center">SALES AND EARNINGS</h2>
              
              {/* Earnings Overview */}
              <div className="row text-center my-4">
                <div className="col-md-4">
                  <div className="card shadow p-3">
                    <h5>Total Earnings</h5>
                    <h3 className="text-success">$12,500</h3>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card shadow p-3">
                    <h5>Pending Balance</h5>
                    <h3 className="text-warning">$3,200</h3>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card shadow p-3">
                    <h5>Withdrawable Amount</h5>
                    <h3 className="text-primary">$9,300</h3>
                  </div>
                </div>
              </div>

              {/* Transactions Table */}
              <div className="card shadow p-3">
                <h5 className="mb-3">Recent Sales & Transactions</h5>
                <table className="table table-bordered table-striped">
                  <thead className="thead-dark">
                    <tr>
                      <th>#</th>
                      <th>Order ID</th>
                      <th>Date</th>
                      <th>Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>#12345</td>
                      <td>2025-03-18</td>
                      <td>$500</td>
                      <td className="text-success">Completed</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>#12346</td>
                      <td>2025-03-17</td>
                      <td>$300</td>
                      <td className="text-warning">Pending</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              {/* Withdrawal Button */}
              <div className="text-center mt-4">
                <button className="btn btn-primary btn-lg">Request Withdrawal</button>
              </div>

              {children}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SallesndEarning;
