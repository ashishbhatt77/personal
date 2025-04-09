import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../common/Header";
import "bootstrap/dist/css/bootstrap.min.css";

const SeeMore = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const formattedCategory = category
    ? category.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())
    : "Products";

  useEffect(() => {
    if (category) {
      fetchProductsByCategory();
    }
  }, [category]);

  const fetchProductsByCategory = async () => {
    setLoading(true);
    try {
      const encodedCategory = encodeURIComponent(category);
      const response = await axios.get(`http://localhost:5000/api/products/category/${encodedCategory}`);

      setProducts(response.data.products || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />

      <div className="container my-5">
        <h2 className="text-center text-uppercase fw-bold text-primary mb-4">
          🛒 {formattedCategory} List
        </h2>

        {loading ? (
          <div className="text-center">
            <div className="spinner-border text-primary" role="status"></div>
          </div>
        ) : products.length === 0 ? (
          <p className="text-center text-muted">No products available in this category.</p>
        ) : (
          <div className="row">
            {products.map((product, index) => (
              <div key={product._id || index} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                <div
                  className="card p-3 border-0 shadow-sm text-center rounded-4"
                  style={{ transition: "transform 0.3s ease-in-out" }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  <img
                    src={product.images?.[0] || "/default-product.jpg"}
                    alt={product.name}
                    className="img-fluid rounded mb-2"
                    style={{ height: "200px", objectFit: "contain" }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/default-product.jpg"; 
                    }}
                  />
                  <h6 className="fw-bold text-dark">{product.name}</h6>
                  <p className="text-success fw-semibold mb-1">₹{product.price}</p>
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => navigate(`/product/${product._id}`)} 
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default SeeMore;
