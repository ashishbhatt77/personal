import React from "react";
import LeftSideBar from "./Partials/LeftSideBar";
import SellerHeader from "./Partials/SellerHeader";
import SellerHead from "./Partials/SellerHead";

const DiscountAndOffres = ({ children }) => {
  return (
    <>
      <SellerHead />
      <SellerHeader />

      <section id="mid">
        <div className="container-fluid">
          <div className="row">
            <LeftSideBar />
            <div className="col-md-9">
              <h2 className="text-center">DISCOUNT & OFFERS</h2>
              
              {/* Discount Overview */}
              <div className="row text-center my-4">
                <div className="col-md-4">
                  <div className="card shadow p-3">
                    <h5>Active Discounts</h5>
                    <h3 className="text-success">5</h3>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card shadow p-3">
                    <h5>Upcoming Offers</h5>
                    <h3 className="text-warning">3</h3>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card shadow p-3">
                    <h5>Expired Offers</h5>
                    <h3 className="text-danger">2</h3>
                  </div>
                </div>
              </div>

              {/* Discount Table */}
              <div className="card shadow p-3">
                <h5 className="mb-3">Current Discounts & Offers</h5>
                <table className="table table-bordered table-striped">
                  <thead className="thead-dark">
                    <tr>
                      <th>#</th>
                      <th>Offer Name</th>
                      <th>Discount</th>
                      <th>Start Date</th>
                      <th>End Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Summer Sale</td>
                      <td>20% Off</td>
                      <td>2025-06-01</td>
                      <td>2025-06-30</td>
                      <td className="text-success">Active</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>New Year Deal</td>
                      <td>15% Off</td>
                      <td>2025-12-25</td>
                      <td>2026-01-05</td>
                      <td className="text-warning">Upcoming</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              {/* Add New Discount Button */}
              <div className="text-center mt-4">
                <button className="btn btn-primary btn-lg">Add New Discount</button>
              </div>

              {children}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DiscountAndOffres;
