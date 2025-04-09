import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Head from "../Admin/partials/Head";
import Header from "../Admin/partials/Header";
import LeftSidebar from "../Admin/partials/LeftSidebar";

const DealOffersTable = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch deals & offers from backend
    const fetchDeals = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/get-deals"); // API endpoint
        const data = await response.json();
        setDeals(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching deals:", error);
        setLoading(false);
      }
    };

    fetchDeals();
  }, []);

  return (
    <>
      <Head />
      <Header />

      <section id="mid">
        <div className="container-fluid">
          <div className="row">
            <LeftSidebar />

            <div className="col-md-9 p-4">
              {/* Add New Deal Button */}
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="mb-0">DEAL & OFFERS MANAGEMENT</h2>
                <Link to="/admin/DealOffers" className="btn btn-dark">
                  + Add New Deal&Offers
                </Link>
              </div>

              {loading ? (
                <p className="text-center">Loading deals...</p>
              ) : (
                <div className="table-responsive">
                  <table className="table table-bordered table-striped">
                    <thead className="bg-dark text-white">
                      <tr>
                        <th>ID</th>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Discount</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {deals.length > 0 ? (
                        deals.map((deal, index) => (
                          <tr key={deal._id}>
                            <td>{index + 1}</td>
                            <td>
                              <img
                                src={deal.imageUrl}
                                alt="Deal"
                                width="100"
                                height="60"
                                className="rounded"
                              />
                            </td>
                            <td>{deal.title}</td>
                            <td>{deal.description}</td>
                            <td>{deal.discount}%</td>
                            <td>
                              <button className="btn btn-sm btn-warning me-2">
                                Edit
                              </button>
                              <button className="btn btn-sm btn-danger">
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" className="text-center">
                            No deals found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DealOffersTable;
