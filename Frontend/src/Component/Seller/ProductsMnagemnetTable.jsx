import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Table, Spinner } from "react-bootstrap";
import axios from "axios";

import LeftSideBar from "./Partials/LeftSideBar";
import SellerHeader from "./Partials/SellerHeader";
import SellerHead from "./Partials/SellerHead";

const API_URL = "/api/";

const ProductsManagementTable = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/products/seller/products`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`${API_URL}/products/${productId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(products.filter((product) => product._id !== productId));
        alert("Product deleted successfully!");
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const handleUpdate = (productId) => {
    navigate(`/seller/edit-product/${productId}`);
  };

  const toggleStatus = async (productId) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.put(
        `${API_URL}/products/publish/${productId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setProducts(products.map(product =>
        product._id === productId ? { ...product, status: response.data.product.status } : product
      ));
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <>
      <SellerHead />
      <SellerHeader />
      <section id="mid">
        <div className="container-fluid">
          <div className="row">
            <LeftSideBar />
            <div className="col-md-9">
              <div className="btn btn-dark mt-3 form-control">
                <Link to="/seller/ProductsManage">
                  <Button className="btn btn-dark">ADD PRODUCTS</Button>
                </Link>
              </div>

              <h2>Products Management</h2>

              {loading ? (
                <div className="text-center">
                  <Spinner animation="border" />
                </div>
              ) : (
                <Table striped bordered hover responsive className="mt-3">
                  <thead className="table-dark">
                    <tr>
                      <th>#</th>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Compare Price</th>
                      <th>Stock</th>
                      <th>Status</th>
                      <th>Tags</th>
                      <th>Discount</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.length > 0 ? (
                      products.map((product, index) => (
                        <tr key={product._id}>
                          <td>{index + 1}</td>
                          <td>
                            {product.images.length > 0 ? (
                              <img
                                src={product.images[0]}
                                alt={product.name}
                                width="50"
                                height="50"
                                style={{ objectFit: "cover", borderRadius: "5px" }}
                                onError={(e) => (e.target.src = "https://via.placeholder.com/50")}
                              />
                            ) : (
                              <span>No Image</span>
                            )}
                          </td>
                          <td>{product.name}</td>
                          <td>{product.description}</td>
                          <td>{product.category}</td>
                          <td>₹{product.price}</td>
                          <td>₹{product.compareAtPrice || "-"}</td>
                          <td>{product.stock}</td>
                          <td>
                            <Button
                              variant={product.status ? "success" : "secondary"}
                              size="sm"
                              onClick={() => toggleStatus(product._id)}
                            >
                              {product.status ? "Published" : "Unpublished"}
                            </Button>
                          </td>
                          <td>{product.tags.join(", ") || "-"}</td>
                          <td>{product.discount}%</td>
                          <td>
                            <Link to={`/seller/EditProducts/${product._id}`}>
                              <Button variant="warning" size="sm" className="me-2">
                                Edit
                              </Button>
                            </Link>
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => handleDelete(product._id)}
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="12" className="text-center">No products available</td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductsManagementTable;