import React from "react";
import LeftSideBar from "./Partials/LeftSideBar";
import SellerHeader from "./Partials/SellerHeader";
import SellerHead from "./Partials/SellerHead";

const InventryManage = ({ children }) => {
  return (
    <>
      <SellerHead />
      <SellerHeader />

      <section id="mid">
        <div className="container-fluid">
          <div className="row">
            <LeftSideBar />
            <div className="col-md-9">
              <h2 className="text-center">INVENTORY MANAGEMENT</h2>
              
              {/* Inventory Summary */}
              <div className="row text-center my-4">
                <div className="col-md-4">
                  <div className="card shadow p-3">
                    <h5>Total Products</h5>
                    <h3 className="text-primary">250</h3>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card shadow p-3">
                    <h5>In Stock</h5>
                    <h3 className="text-success">180</h3>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card shadow p-3">
                    <h5>Out of Stock</h5>
                    <h3 className="text-danger">70</h3>
                  </div>
                </div>
              </div>

              {/* Product List Table */}
              <div className="card shadow p-3 mt-4">
                <h5 className="mb-3">Product Inventory</h5>
                <table className="table table-bordered table-striped">
                  <thead className="thead-dark">
                    <tr>
                      <th>#</th>
                      <th>Product Name</th>
                      <th>Category</th>
                      <th>Stock</th>
                      <th>Price</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Smartphone XYZ</td>
                      <td>Electronics</td>
                      <td>30</td>
                      <td>$500</td>
                      <td><span className="badge bg-success">In Stock</span></td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Wireless Headphones</td>
                      <td>Accessories</td>
                      <td>0</td>
                      <td>$150</td>
                      <td><span className="badge bg-danger">Out of Stock</span></td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Gaming Laptop</td>
                      <td>Computers</td>
                      <td>10</td>
                      <td>$1200</td>
                      <td><span className="badge bg-warning">Low Stock</span></td>
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

export default InventryManage;
