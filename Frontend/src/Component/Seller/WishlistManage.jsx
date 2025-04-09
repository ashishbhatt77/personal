import React from "react";
import LeftSideBar from "./Partials/LeftSideBar";
import SellerHeader from "./Partials/SellerHeader";
import SellerHead from "./Partials/SellerHead";

const WishlistManage = ({ children }) => {
  return (
    <>
      <SellerHead />
      <SellerHeader />

      <section id="mid">
        <div className="container-fluid">
          <div className="row">
            <LeftSideBar />
            <div className="col-md-9">
              <h2 className="text-center">CART & WISHLIST</h2>
              
              {/* Overview Section */}
              <div className="row text-center my-4">
                <div className="col-md-6">
                  <div className="card shadow p-3">
                    <h5>Total Wishlist Items</h5>
                    <h3 className="text-success">25</h3>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card shadow p-3">
                    <h5>Total Cart Items</h5>
                    <h3 className="text-warning">10</h3>
                  </div>
                </div>
              </div>

              {/* Wishlist Table */}
              <div className="card shadow p-3">
                <h5 className="mb-3">Wishlist Items</h5>
                <table className="table table-bordered table-striped">
                  <thead className="thead-dark">
                    <tr>
                      <th>#</th>
                      <th>Product Name</th>
                      <th>Price</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Smartphone XYZ</td>
                      <td>$500</td>
                      <td><button className="btn btn-primary btn-sm">Move to Cart</button></td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Wireless Headphones</td>
                      <td>$120</td>
                      <td><button className="btn btn-primary btn-sm">Move to Cart</button></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Cart Table */}
              <div className="card shadow p-3 mt-4">
                <h5 className="mb-3">Cart Items</h5>
                <table className="table table-bordered table-striped">
                  <thead className="thead-dark">
                    <tr>
                      <th>#</th>
                      <th>Product Name</th>
                      <th>Price</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Laptop ABC</td>
                      <td>$1200</td>
                      <td><button className="btn btn-danger btn-sm">Remove</button></td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Gaming Mouse</td>
                      <td>$80</td>
                      <td><button className="btn btn-danger btn-sm">Remove</button></td>
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

export default WishlistManage;
