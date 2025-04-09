import React from "react";
import LeftSideBar from "./Partials/LeftSideBar";
import SellerHeader from "./Partials/SellerHeader";
import SellerHead from "./Partials/SellerHead";

const CustomerInteriction = ({ children }) => {
  return (
    <>
      <SellerHead />
      <SellerHeader />

      <section id="mid">
        <div className="container-fluid">
          <div className="row">
            <LeftSideBar />
            <div className="col-md-9">
              <h2 className="text-center">CUSTOMER INTERACTION</h2>
              
              {/* Interaction Overview */}
              <div className="row text-center my-4">
                <div className="col-md-4">
                  <div className="card shadow p-3">
                    <h5>Total Messages</h5>
                    <h3 className="text-success">120</h3>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card shadow p-3">
                    <h5>New Inquiries</h5>
                    <h3 className="text-warning">15</h3>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card shadow p-3">
                    <h5>Resolved Queries</h5>
                    <h3 className="text-primary">90</h3>
                  </div>
                </div>
              </div>

              {/* Messages Table */}
              <div className="card shadow p-3">
                <h5 className="mb-3">Recent Messages</h5>
                <table className="table table-bordered table-striped">
                  <thead className="thead-dark">
                    <tr>
                      <th>#</th>
                      <th>Customer Name</th>
                      <th>Message</th>
                      <th>Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>John Doe</td>
                      <td>"When will my order arrive?"</td>
                      <td>2025-03-18</td>
                      <td className="text-warning">Pending</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Jane Smith</td>
                      <td>"Thanks for the quick response!"</td>
                      <td>2025-03-17</td>
                      <td className="text-success">Resolved</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              {/* Respond Button */}
              <div className="text-center mt-4">
                <button className="btn btn-primary btn-lg">Respond to Messages</button>
              </div>

              {children}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CustomerInteriction;
