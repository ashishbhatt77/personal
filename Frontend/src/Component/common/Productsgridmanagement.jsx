import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Productsgridmanagement = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    fetchAllCategories(isMounted);
    return () => {
      isMounted = false;
    };
  }, []);

  const fetchAllCategories = async (isMounted) => {
    setLoading(true);
    try {
      const categoryNames = [
        "Electronics",
        "Fashion",
        "Grocery",
        "Home-kitchen",
        "Beauty-personal-care",
        "Sports-fitness",
      ];

      const fetchedCategories = await Promise.all(
        categoryNames.map(fetchCategory)
      );

      if (isMounted) setCategories(fetchedCategories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      if (isMounted) setLoading(false);
    }
  };

  const fetchCategory = async (category) => {
    try {
      const encodedCategory = encodeURIComponent(category);
      const response = await axios.get(
        `http://localhost:5000/api/products/category/${encodedCategory}`
      );

      const formattedSlug =
        category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();

      return {
        name: category,
        slug: formattedSlug.replace(/ /g, "-"),
        products: Array.isArray(response.data.products)
          ? response.data.products
          : [],
      };
    } catch (error) {
      console.error(`Error fetching ${category} products:`, error);
      return {
        name: category,
        slug: category.charAt(0).toUpperCase() + category.slice(1).toLowerCase(),
        products: [],
      };
    }
  };

  return (
    <div className="container-fluid my-4">
      <h2 className="mb-4 text-center text-uppercase fw-bold text-dark">
        🛍️ Shop by Category
      </h2>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      ) : (
        <div className="row justify-content-center">
          {categories.map((category, index) => (
            <div key={index} className="col-lg-4 col-md-6 col-sm-12 mb-4">
              <div
                className="card border-0 shadow-sm p-3 h-100 rounded-4"
                style={{
                  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.02)";
                  e.currentTarget.style.boxShadow = "0px 10px 20px rgba(0, 0, 0, 0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "0px 4px 10px rgba(0, 0, 0, 0.1)";
                }}
              >
                <h5 className="fw-bold text-center text-primary">{category.name}</h5>
                <div className="row g-2">
                  {category.products.length > 0 ? (
                    category.products.slice(0, 4).map((product, idx) => (
                      <div key={idx} className="col-6 d-flex">
                        <Link
                          to={`/product/${product._id}`}
                          className="text-decoration-none text-dark w-100"
                        >
                          <div
                            className="card p-2 text-center w-100 border-0 shadow-sm rounded-3"
                            style={{ transition: "all 0.3s ease-in-out" }}
                            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                          >
                            <img
                              src={product.images?.[0] || "/default-product.jpg"}
                              alt={product.name || "Product Image"}
                              className="img-fluid rounded mx-auto"
                              style={{
                                height: "150px",
                                objectFit: "contain",
                                borderRadius: "8px",
                              }}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "/default-product.jpg";
                              }}
                            />
                            <p className="small text-center m-0 fw-semibold text-dark">
                              {product.name}
                            </p>
                            <p className="small text-center text-success fw-bold">
                              ₹{product.price}
                            </p>
                          </div>
                        </Link>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted text-center">No products available</p>
                  )}
                </div>
                {category.products.length > 4 && (
                  <Link
                    to={`/see-more/${category.slug}`}
                    className="btn btn-outline-primary small mt-3 d-block text-center fw-bold"
                    style={{
                      borderRadius: "25px",
                      padding: "6px 12px",
                      fontSize: "14px",
                      transition: "all 0.3s ease-in-out",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#0d6efd";
                      e.currentTarget.style.color = "#fff";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.color = "#0d6efd";
                    }}
                  >
                    See More
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Productsgridmanagement;