import React, { useEffect, useState } from "react";
import axios from "axios";
import Head from "./partials/Head";
import Header from "./partials/Header";
import LeftSidebar from "./partials/LeftSidebar";
import "bootstrap/dist/css/bootstrap.min.css";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found. Please log in.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get("/api/products/active", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching products:", error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleAdvertisement = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found. Please log in.");
      return;
    }

    try {
      setLoading(true);
      await axios.put(
        `/api/products/advertise/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === id ? { ...product, isAdvertised: !product.isAdvertised } : product
        )
      );
    } catch (error) {
      console.error("Error updating advertisement status:", error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
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
              <h2 className="text-center mt-3">PRODUCT MANAGEMENT</h2>
              {loading && <p className="text-center">Loading...</p>}
              <table className="table table-bordered table-hover mt-4">
                <thead className="thead-dark">
                  <tr>
                    <th>ID</th>
                    <th>Product Name</th>
                    <th>Seller</th>
                    <th>Price</th>
                    <th className="text-center">Advertisement</th>
                  </tr>
                </thead>
                <tbody>
                  {products.length > 0 ? (
                    products.map((product) => (
                      <tr key={product._id}>
                        <td>{product._id}</td>
                        <td>{product.name}</td>
                        <td>{product.seller?.businessName ? product.seller.businessName : "No Seller Info"}</td>
                        <td>${product.price}</td>
                        <td className="text-center">
                          <button
                            className={`btn ${product.isAdvertised ? "btn-success" : "btn-secondary"} btn-sm`}
                            onClick={() => toggleAdvertisement(product._id)}
                            disabled={loading}
                          >
                            {product.isAdvertised ? "Advertised" : "Not Advertised"}
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center">
                        No products found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductManagement;
