import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Head from "./partials/Head";
import Header from "./partials/Header";
import LeftSidebar from "./partials/LeftSidebar";

const TestinominlTable = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch testimonials from backend
    const fetchTestimonials = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/get-testimonials"); // API endpoint
        
        if (!response.ok) {
          throw new Error("Failed to fetch testimonials");
        }

        const data = await response.json();
        setTestimonials(data);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
        setError("Error loading testimonials. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
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
              {/* Add New Testimonial Button */}
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="mb-0">Testimonial Management</h2>
                <Link to="/Reviewform" className="btn btn-dark">
                  + Add New Testimonial
                </Link>
              </div>

              {loading ? (
                <p className="text-center">Loading testimonials...</p>
              ) : error ? (
                <p className="text-danger text-center">{error}</p>
              ) : (
                <div className="table-responsive">
                  <table className="table table-bordered table-striped">
                    <thead className="bg-dark text-white">
                      <tr>
                        <th>ID</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Review</th>
                        <th>Rating</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {testimonials.length > 0 ? (
                        testimonials.map((testimonial, index) => (
                          <tr key={testimonial._id}>
                            <td>{index + 1}</td>
                            <td>
                              <img
                                src={testimonial.imageUrl}
                                alt="User"
                                width="60"
                                height="60"
                                className="rounded-circle"
                              />
                            </td>
                            <td>{testimonial.name}</td>
                            <td>{testimonial.review}</td>
                            <td>⭐ {testimonial.rating}</td>
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
                            No testimonials found.
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

export default TestinominlTable;
