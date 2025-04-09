import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";

const ProductsShowcase = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);
  const fetched = useRef(false);

  useEffect(() => {
    if (!fetched.current) {
      fetched.current = true;
      fetchProducts();
    }
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products/active");
      setProducts(response.data.products || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="container-fluid my-4">
      <h2 className="h4 mb-4 fw-bold text-center text-uppercase text-dark">🔥 Top Trending Products</h2>

      {loading ? (
        <div className="text-center my-4">
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      ) : products.length === 0 ? (
        <p className="text-center text-muted">No products available</p>
      ) : (
        <div className="position-relative">
          <div
            ref={scrollRef}
            className="d-flex flex-nowrap overflow-hidden"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {products.map((product, index) => (
              <div
                key={index}
                className="px-2 position-relative"
                style={{
                  minWidth: "200px",
                  maxWidth: "220px",
                  transition: "all 0.3s ease-in-out",
                }}
              >
                <span
                  className="badge bg-danger position-absolute top-0 start-0 m-2 px-3 py-1 rounded-pill shadow"
                  style={{ fontSize: "12px", fontWeight: "bold", letterSpacing: "0.5px" }}
                >
                  {product.brand || "Brand"}
                </span>

                <Link to={`/product/${product._id}`} className="text-decoration-none text-dark">
                  <div
                    className="card border-0 text-center shadow-sm rounded-3 p-2"
                    style={{
                      transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.05)";
                      e.currentTarget.style.boxShadow = "0px 10px 20px rgba(0, 0, 0, 0.15)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                      e.currentTarget.style.boxShadow = "0px 4px 10px rgba(0, 0, 0, 0.1)";
                    }}
                  >
                    <div className="mb-3">
                      <img
                        src={product.images?.[0] || "/default-product.jpg"}
                        className="img-fluid mx-auto d-block rounded"
                        alt={product.name}
                        style={{ height: "140px", objectFit: "contain", borderRadius: "8px" }}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/default-product.jpg";
                        }}
                      />
                    </div>
                    <div className="px-2">
                      <h6 className="text-truncate mb-1 text-secondary" style={{ fontSize: "13px", fontWeight: "500" }}>
                        {product.category || "Category"}
                      </h6>
                      <p className="fw-bold text-truncate mb-1 text-dark" style={{ fontSize: "14px" }}>
                        {product.name}
                      </p>
                      <p className="m-0 text-success fw-bold" style={{ fontSize: "14px" }}>
                        ₹{product.price}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          <button
            onClick={() => scroll("left")}
            className="position-absolute top-50 start-0 translate-middle-y btn btn-light rounded-circle shadow-sm border"
            style={{ zIndex: 2, marginLeft: "-10px", width: "35px", height: "35px" }}
          >
            <i className="bi bi-chevron-left"></i>
          </button>

          <button
            onClick={() => scroll("right")}
            className="position-absolute top-50 end-0 translate-middle-y btn btn-light rounded-circle shadow-sm border"
            style={{ zIndex: 2, marginRight: "-10px", width: "35px", height: "35px" }}
          >
            <i className="bi bi-chevron-right"></i>
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductsShowcase;