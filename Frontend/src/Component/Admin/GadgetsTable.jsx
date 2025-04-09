import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Head from "./partials/Head";
import Header from "./partials/Header";
import LeftSidebar from "./partials/LeftSidebar";

const GadgetsTable = () => {
  const [gadgets, setGadgets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch gadgets from backend
    const fetchGadgets = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/get-gadgets"); // API endpoint
        const data = await response.json();
        setGadgets(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching gadgets:", error);
        setLoading(false);
      }
    };

    fetchGadgets();
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
              {/* Add New Gadget Button */}
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="mb-0"> TRANDING GADGETS </h2>
                <Link to="/admin/TrandingGadgets" className="btn btn-dark">
                  + Add New Gadget
                </Link>
              </div>

              {loading ? (
                <p className="text-center">Loading gadgets...</p>
              ) : (
                <div className="table-responsive">
                  <table className="table table-bordered table-striped">
                    <thead className="bg-dark text-white">
                      <tr>
                        <th>ID</th>
                        <th>Image</th>
                        <th>Name</th>
                     
                        <th>Price</th>
                       
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {gadgets.length > 0 ? (
                        gadgets.map((gadget, index) => (
                          <tr key={gadget._id}>
                            <td>{index + 1}</td>
                            <td>
                              <img
                                src={gadget.imageUrl}
                                alt="Gadget"
                                width="100"
                                height="60"
                                className="rounded"
                              />
                            </td>
                            <td>{gadget.name}</td>
                            <td>{gadget.category}</td>
                            <td>${gadget.price}</td>
                            <td>{gadget.stock}</td>
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
                          <td colSpan="7" className="text-center">
                            No gadgets found.
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

export default GadgetsTable;
