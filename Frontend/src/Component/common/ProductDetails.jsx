import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";

function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState(null);

  useEffect(() => {
    fetchProduct();
    fetchCart();
  }, [productId]);

  const fetchProduct = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`/api/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      const fetchedProduct = res.data.product;
      setProduct(fetchedProduct);
      if (fetchedProduct.images?.length) {
        setMainImage(fetchedProduct.images[0]);
      }
    } catch (err) {
      console.error("Error fetching product:", err);
      alert(err.response?.data?.message || "Failed to fetch product.");
    }
  };

  const fetchCart = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    if (!token || !userId) return;

    try {
      const res = await axios.get(`/api/cart/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      setCart(res.data.cart);
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  const changeImage = (index) => {
    setMainImage(product.images[index]);
    setActiveIndex(index);
  };

  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first!");
      return;
    }

    console.log("Token:", token);
    console.log("Product ID:", product?._id);
    console.log("Quantity: 1");

    try {
      setLoading(true);

      const res = await axios.post(
        "/api/cart/add",
        {
          productId: product._id,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log("Response from /api/cart/add:", res.data);

      alert(res.data.message || "Product added to cart!");
      fetchCart();
    } catch (err) {
      console.error("Add to cart error:", err);
      console.log("Error response:", err.response?.data);
      alert(err.response?.data?.message || "Failed to add to cart.");
    } finally {
      setLoading(false);
    }
  };

  if (!product) {
    return <div className="text-center p-5">Loading product details...</div>;
  }

  return (
    <>
      <Header />

      <div className="container mt-5">
        <div className="row">
          {/* Thumbnails */}
          <div className="col-2 col-md-1">
            <div className="d-flex flex-md-column gap-2">
              {product.images?.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Thumb ${index}`}
                  className={`border ${activeIndex === index ? "border-primary" : "border-secondary"}`}
                  onClick={() => changeImage(index)}
                  style={{
                    cursor: "pointer",
                    width: "60px",
                    height: "60px",
                    objectFit: "cover",
                    borderRadius: "5px",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Main Image */}
          <div className="col-10 col-md-5 mb-3">
            <img
              src={mainImage || "/default-product.jpg"}
              alt="Main View"
              className="img-fluid rounded shadow"
              style={{ maxHeight: "400px", objectFit: "contain" }}
            />
          </div>

          {/* Product Details */}
          <div className="col-md-6 mt-3">
            <h1 className="h5">{product.name}</h1>

            <div className="mt-2">
              <span className="text-warning">★★★★☆</span>
              <span className="ms-2 text-muted">{product.ratingsCount || 0} ratings</span>
            </div>

            <div className="mt-3">
              <span className="text-danger fw-bold">{product.discount || 0}%</span>
              <span className="ms-2 text-success fw-bold">₹{product.price}</span>
              <span className="ms-2 text-muted text-decoration-line-through">₹{product.compareAtPrice}</span>
            </div>

            <div className="mt-3">
              <p className="mb-1"><strong>About this item:</strong></p>
              <p>{product.description || "No description available."}</p>
            </div>

            {product.colorOptions?.length > 0 && (
              <div className="mt-3">
                <p className="mb-1"><strong>Color:</strong> {product.selectedColor}</p>
                <div className="d-flex gap-2">
                  {product.colorOptions.map((color, i) => (
                    <div
                      key={i}
                      className={`p-3 border rounded-circle ${color === product.selectedColor ? "border-primary" : ""}`}
                      style={{ backgroundColor: color, cursor: "pointer" }}
                      title={color}
                    ></div>
                  ))}
                </div>
              </div>
            )}

            {product.storageOptions?.length > 0 && (
              <div className="mt-3">
                <p className="mb-1"><strong>Storage:</strong> {product.selectedStorage}</p>
                <div className="d-flex gap-2">
                  {product.storageOptions.map((option, i) => (
                    <button
                      key={i}
                      className={`btn ${option === product.selectedStorage ? "btn-outline-primary" : "btn-outline-secondary"}`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-3">
              <p><strong>Sold by:</strong> {product.seller?.businessName || "Unknown Seller"}</p>
            </div>

            <div className="mt-2">
              <div className="d-grid gap-2">
                <button className="btn btn-warning mb-4" onClick={handleAddToCart} disabled={loading}>
                  {loading ? "Adding..." : "Add to Cart"}
                </button>
                <button className="btn btn-success mb-4" disabled>
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ProductDetails;
