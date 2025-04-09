import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";

const TrendingGadgets = () => {
  const [gadgets, setGadgets] = useState([]);

  useEffect(() => {
    fetchTrendingGadgets();
  }, []);

  const fetchTrendingGadgets = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products/active");
      setGadgets(response.data.products || []);
    } catch (error) {
      console.error("Error fetching trending gadgets:", error.response?.data?.message || error.message);
    }
  };

  return (
    <section id="Trending" className="py-5 bg-light">
      <div className="container-fluid">
        <h2 className="text-center mb-4 text-primary">🔥 Trending Gadgets</h2>

        {gadgets.length === 0 ? (
          <p className="text-center">No trending gadgets available at the moment.</p>
        ) : (
          <div className="d-flex gap-3 p-2" style={{ overflowX: "auto", whiteSpace: "nowrap", scrollBehavior: "smooth", scrollbarWidth: "none" }}>
            {gadgets.map((gadget) => {
              const originalPrice = gadget.price || 0;
              const discountedPrice = (originalPrice * 0.9).toFixed(2); // 10% OFF

              return (
                <motion.div key={gadget._id} className="card shadow-sm p-2 flex-shrink-0 position-relative" style={{ width: "250px" }} whileHover={{ scale: 1.05 }}>
                  
                  {/* Product Image */}
                  <img
                    src={Array.isArray(gadget.images) ? gadget.images[0] : gadget.images}
                    alt={gadget.name}
                    className="card-img-top"
                    style={{ height: "180px", objectFit: "contain" }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/150";
                    }}
                  />

                  {/* 10% OFF Badge */}
                  <span className="badge bg-danger position-absolute top-0 start-0 m-2">
                    10% OFF
                  </span>

                  <div className="card-body text-center">
                    {/* Product Name */}
                    <h6 className="card-title">{gadget.name}</h6>

                    {/* Product Price with Discount */}
                    <p className="card-text">
                      <span className="text-muted text-decoration-line-through">
                        ₹{originalPrice}
                      </span>{" "}
                      <span className="text-success fw-bold">₹{discountedPrice}</span>
                    </p>

                    {/* Buy Now Button */}
                    <Link to={`/product/${gadget._id}`}>
                      <button className="btn btn-success w-100">Buy Now</button>
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default TrendingGadgets;