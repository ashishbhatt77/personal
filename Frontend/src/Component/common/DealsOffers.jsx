import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import axios from "axios";

const DealsOffers = () => {
  const [deals, setDeals] = useState([]);
  const sliderRef = useRef(null);

  useEffect(() => {
    fetchDeals();
  }, []);

  const fetchDeals = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found. Please log in.");
      return;
    }

    try {
      const response = await axios.get("http://localhost:5000/api/products/advertised", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setDeals(response.data.products || []);
    } catch (error) {
      console.error("Error fetching deals:", error.response?.data?.message || error.message);
    }
  };

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <section id="Dealsoffer" className="py-5 bg-white">
      <div className="container-fluid">
        <h2 className="text-center mb-3 text-primary">🔥 Latest Deals & Offers</h2>

        {deals.length === 0 ? (
          <p className="text-center">No deals available at the moment.</p>
        ) : (
          <div className="position-relative">
            {/* Left Scroll Button */}
            {deals.length > 1 && (
              <button
                className="btn btn-dark position-absolute top-50 start-0 translate-middle-y"
                onClick={scrollLeft}
                aria-label="Scroll Left"
                style={{ zIndex: 10 }}
              >
                <FaChevronLeft />
              </button>
            )}

            {/* Scrollable Deals Container */}
            <motion.div
              ref={sliderRef}
              className="d-flex gap-3 p-2"
              style={{
                overflowX: "auto",
                whiteSpace: "nowrap",
                scrollBehavior: "smooth",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {deals.map((deal) => {
                const originalPrice = deal.price || 0;
                const discountedPrice = (originalPrice * 0.9).toFixed(2); // 10% OFF Price

                return (
                  <Link
                    to={`/product/${deal._id}`}
                    key={deal._id}
                    className="text-decoration-none text-dark"
                    style={{ flexShrink: 0 }}
                  >
                    <motion.div
                      className="card shadow-sm position-relative"
                      style={{ width: "250px" }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <img
                        src={Array.isArray(deal.images) ? deal.images[0] : deal.images}
                        alt={deal.name}
                        className="card-img-top mt-2"
                        style={{ height: "180px", objectFit: "contain" }}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://via.placeholder.com/150";
                        }}
                      />

                      <span className="badge bg-danger position-absolute top-0 start-0 m-2">
                        10% OFF
                      </span>

                      <div className="card-body text-center">
                        <h6 className="card-title">{deal.name}</h6>
                        <p className="card-text">
                          <span className="text-muted text-decoration-line-through">
                            ₹{originalPrice}
                          </span>{" "}
                          <span className="text-success fw-bold">₹{discountedPrice}</span>
                        </p>
                        <button className="btn btn-success w-100">Shop Now</button>
                      </div>
                    </motion.div>
                  </Link>
                );
              })}
            </motion.div>

            {/* Right Scroll Button */}
            {deals.length > 1 && (
              <button
                className="btn btn-dark position-absolute top-50 end-0 translate-middle-y"
                onClick={scrollRight}
                aria-label="Scroll Right"
                style={{ zIndex: 10 }}
              >
                <FaChevronRight />
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default DealsOffers;