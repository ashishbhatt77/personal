import React, { useEffect, useState } from "react";
import axios from "axios";
import Head from "./partials/Head";
import Header from "./partials/Header";
import LeftSidebar from "./partials/LeftSidebar";

const BusinessManage = ({ children }) => {
  const [sellers, setSellers] = useState([]); // ✅ sellers को useState से डिफाइन किया

  // ✅ API से Business Sellers डेटा लाना
  useEffect(() => {
    axios.get("http://localhost:5000/api/sellers")
      .then((response) => {
        setSellers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching sellers:", error);
      });
  }, []);

  // ✅ Block/Unblock Status बदलने का फंक्शन
  const toggleStatus = (id, currentStatus) => {
    const newStatus = currentStatus === "Blocked" ? "Active" : "Blocked";

    axios.patch(`http://localhost:5000/api/sellers/${id}`, { status: newStatus })
      .then(() => {
        setSellers(sellers.map(seller =>
          seller.id === id ? { ...seller, status: newStatus } : seller
        ));
      })
      .catch((error) => {
        console.error("Error updating status:", error);
      });
  };

  return (
    <>
      <Head />
      <Header />

      <section id="mid">
        <div className="container-fluid">
          <div className="row">
            <LeftSidebar />
            <div className="col-md-9">
              <h2 className="text-center">BUSINESS SELLER MANAGEMENT</h2>

              <table className="table table-bordered mt-3">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Business Seller</th>
                    <th>Email</th>
                    <th>Action</th> 
                  </tr>
                </thead>
                <tbody>
                  {sellers.length > 0 ? (
                    sellers.map((seller) => (
                      <tr key={seller.id}>
                        <td>{seller.id}</td>
                        <td>{seller.name}</td>
                        <td>{seller.email}</td>
                        <td>
                          <button 
                            className={`btn ${seller.status === "Blocked" ? "btn-success" : "btn-danger"}`} 
                            onClick={() => toggleStatus(seller.id, seller.status)}
                          >
                            {seller.status === "Blocked" ? "Unblock" : "Block"}
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center">No Sellers Found</td>
                    </tr>
                  )}
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

export default BusinessManage;
