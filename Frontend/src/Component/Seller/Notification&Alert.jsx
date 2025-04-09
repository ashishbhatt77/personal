import React from "react";
import LeftSideBar from "./Partials/LeftSideBar";
import SellerHeader from "./Partials/SellerHeader";
import SellerHead from "./Partials/SellerHead";

const Notifications = ({ children }) => {
  return (
    <>
      <SellerHead />
      <SellerHeader />

      <section id="mid">
        <div className="container-fluid">
          <div className="row">
            <LeftSideBar />
            <div className="col-md-9">
              <h2 className="text-center">NOTIFICATION & ALERT</h2>
              
              {/* Notification Summary */}
              <div className="row text-center my-4">
                <div className="col-md-4">
                  <div className="card shadow p-3">
                    <h5>New Notifications</h5>
                    <h3 className="text-danger">8</h3>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card shadow p-3">
                    <h5>Read Notifications</h5>
                    <h3 className="text-success">50</h3>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card shadow p-3">
                    <h5>Total Alerts</h5>
                    <h3 className="text-warning">15</h3>
                  </div>
                </div>
              </div>

              {/* Notification List */}
              <div className="card shadow p-3">
                <h5 className="mb-3">Recent Notifications</h5>
                <ul className="list-group">
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    New order received! <span className="badge bg-danger">New</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Your discount offer is expiring soon <span className="badge bg-warning">Alert</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Payment for Order #1234 has been processed <span className="badge bg-success">Read</span>
                  </li>
                </ul>
              </div>
              
              {/* Clear Notifications Button */}
              <div className="text-center mt-4">
                <button className="btn btn-primary btn-lg">Clear All Notifications</button>
              </div>

              {children}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Notifications;
