import React, { useState, useEffect } from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import {
  FaTrash,
  FaShoppingCart,
  FaMapMarkerAlt,
  FaPlus,
  FaMinus,
  FaArrowLeft,
  FaShoppingBag,
  FaGift,
  FaTruck,
  FaMoneyBillWave,
} from "react-icons/fa";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingItemId, setUpdatingItemId] = useState(null);
  const [deliveryAddress] = useState("Harsh Nama, Jaipur, Rajasthan - 302001");
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [loadingRecommendations, setLoadingRecommendations] = useState(false);

  const getToken = () => localStorage.getItem("token");

  useEffect(() => {
    fetchCartData();
  }, []);

  useEffect(() => {
    if (!loading && cartItems.length === 0) {
      fetchRecommendedProducts();
    }
  }, [loading, cartItems.length]);

  const fetchCartData = async () => {
    const token = getToken();
    if (!token) {
      setTimeout(() => {
        setLoading(false);
      }, 800);
      return;
    }

    try {
      const res = await fetch("/api/cart", {
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok || !data.cart || !Array.isArray(data.cart.items)) {
        throw new Error(data.message || "Failed to fetch cart");
      }

      setCartItems(data.cart.items);
    } catch (error) {
      console.error("❌ Error fetching cart:", error);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecommendedProducts = async () => {
    setLoadingRecommendations(true);
    try {
      const res = await fetch("/api/products/active", {
        credentials: "include",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      const data = await res.json();
      if (res.ok && Array.isArray(data.products)) {
        setRecommendedProducts(data.products);
      } else {
        console.error("Failed to fetch recommended products:", data.message);
        setRecommendedProducts([]);
      }
    } catch (error) {
      console.error("Error fetching recommended products:", error);
      setRecommendedProducts([]);
    } finally {
      setLoadingRecommendations(false);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    const token = getToken();
    if (!token) return alert("Please login first!");

    try {
      setUpdatingItemId(productId);
      const res = await fetch("/api/cart/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, quantity: Number(quantity) }),
      });

      const data = await res.json();
      if (res.ok && data.cart?.items) {
        setCartItems(data.cart.items);
      } else {
        alert(data.message || "Failed to update quantity.");
      }
    } catch (error) {
      console.error("Update quantity error:", error);
    } finally {
      setUpdatingItemId(null);
    }
  };

  const increaseQuantity = (item) => {
    const productId = typeof item.product === "string" ? item.product : item.product._id;
    if (!productId) {
      console.warn("Missing product ID for increaseQuantity", item);
      return;
    }
    updateQuantity(productId, item.quantity + 1);
  };
  
  const decreaseQuantity = (item) => {
    const productId = typeof item.product === "string" ? item.product : item.product._id;
    if (!productId) {
      console.warn("Missing product ID for decreaseQuantity", item);
      return;
    }
    if (item.quantity > 1) {
      updateQuantity(productId, item.quantity - 1);
    } else {
      removeItem(productId);
    }
  };

  const removeItem = async (productId) => {
    if (!window.confirm("Are you sure you want to remove this item?")) return;

    const token = getToken();
    if (!token) return alert("Please login first!");

    try {
      setUpdatingItemId(productId);
      const res = await fetch("/api/cart/remove", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId }),
      });

      const data = await res.json();
      if (res.ok && data.cart?.items) {
        setCartItems(data.cart.items);
        
        if (data.cart.items.length === 0) {
          fetchRecommendedProducts();
        }
      } else {
        alert(data.message || "Failed to remove item.");
      }
    } catch (error) {
      console.error("❌ Remove item error:", error);
    } finally {
      setUpdatingItemId(null);
    }
  };

  const addToCart = async (product) => {
    const token = getToken();
    if (!token) return alert("Please login first!");

    try {
      const res = await fetch("/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId: product._id, quantity: 1 }),
      });

      const data = await res.json();
      if (res.ok && data.cart?.items) {
        setCartItems(data.cart.items);
        alert(`${product.name} added to cart!`);
      } else {
        alert(data.message || "Failed to add item to cart.");
      }
    } catch (error) {
      console.error("❌ Add to cart error:", error);
    }
  };

  const totalPrice = cartItems.reduce((acc, item) => {
    const price = item.product?.price || 0;
    return acc + price * item.quantity;
  }, 0);

  const deliveryFee = totalPrice > 1000 ? 0 : 50;
  const tax = Math.round(totalPrice * 0.18);
  const finalPrice = totalPrice + deliveryFee + tax;

  return (
    <>
      <Header />

      <div className="container mt-5 mb-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="d-flex align-items-center gap-2 mb-0">
            <FaShoppingCart className="text-primary" /> My Shopping Cart
          </h2>
          {cartItems.length > 0 && (
            <span className="badge bg-primary rounded-pill fs-6">{cartItems.length} Items</span>
          )}
        </div>

        {loading ? (
          <div className="text-center my-5 py-5">
            <div className="spinner-border text-primary" role="status" style={{ width: "3rem", height: "3rem" }}></div>
            <p className="mt-4 fs-5">Loading your cart...</p>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="bg-white rounded-3 shadow-sm p-4 text-center my-5">
            <div className="py-5">
              <div className="mb-4 text-muted">
                <FaShoppingBag size={80} className="text-secondary opacity-50" />
              </div>
              <h3 className="mb-3">Your cart is empty</h3>
              <p className="text-muted mb-4 col-md-8 mx-auto">
                Looks like you haven't added anything to your cart yet. Explore our products and find something you like!
              </p>
              <a href="/" className="btn btn-primary btn-lg px-4 d-inline-flex align-items-center gap-2">
                <FaArrowLeft /> Continue Shopping
              </a>
            </div>
            
            {/* Recommended Products - Only shown when cart is empty */}
            <div className="mt-5 pt-4 border-top">
              <h4 className="mb-4">Products You Might Like</h4>
              
              {loadingRecommendations ? (
                <div className="text-center py-4">
                  <div className="spinner-border text-primary" role="status"></div>
                  <p className="mt-3">Loading recommendations...</p>
                </div>
              ) : recommendedProducts.length > 0 ? (
                <div className="row row-cols-1 row-cols-md-4 g-4">
                  {recommendedProducts.map((product) => (
                    <div key={product._id} className="col">
                      <div className="card h-100 border-0 shadow-sm product-card">
                        <div className="position-relative">
                          <img 
                            src={product.images?.[0] || "/placeholder-image.jpg"} 
                            className="card-img-top" 
                            style={{
                              "height":"200px",
                              "width": "200px"  
                            }
                            } 
                            alt={product.name}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "/placeholder-image.jpg";
                            }}
                          />
                          {product.discount > 0 && (
                            <span className="position-absolute top-0 start-0 badge bg-danger m-2">
                              {product.discount}% OFF
                            </span>
                          )}
                        </div>
                        <div className="card-body">
                          <h6 className="card-title mb-1 text-truncate">{product.name}</h6>
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <div>
                              <span className="fw-bold text-primary">₹{product.price}</span>
                              {product.discount > 0 && (
                                <small className="text-muted text-decoration-line-through ms-2">
                                  ₹{Math.round(product.price * (1 + product.discount / 100))}
                                </small>
                              )}
                            </div>
                            <div className="text-warning">
                              {'★'.repeat(Math.floor(product.rating || 0))}
                              {'☆'.repeat(5 - Math.floor(product.rating || 0))}
                            </div>
                          </div>
                          <button 
                            className="btn btn-outline-primary btn-sm w-100"
                            onClick={() => addToCart(product)}
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted">No recommendations available at the moment.</p>
              )}
            </div>
          </div>
        ) : (
          <div className="row g-4">
            <div className="col-md-8">
              <div className="bg-white rounded-3 shadow-sm p-4 mb-4">
                <div className="d-flex align-items-center mb-3">
                  <FaMapMarkerAlt className="text-primary me-2" />
                  <span><strong>Deliver to:</strong> {deliveryAddress}</span>
                  <button className="btn btn-sm btn-link ms-auto">Change</button>
                </div>
                <div className="alert alert-success d-flex align-items-center p-2 mb-0">
                  <FaTruck className="me-2" />
                  <small>Free delivery on orders above ₹1000</small>
                </div>
              </div>

              {cartItems.map((item, index) => (
                <div key={index} className="card mb-3 shadow-sm border-0 rounded-3 overflow-hidden">
                  <div className="card-body p-0">
                    <div className="row g-0">
                      <div className="col-md-3 bg-light d-flex align-items-center justify-content-center p-3">
                        <img
                          src={item.product?.images?.[0] || "/placeholder-image.jpg"}
                          alt={item.product?.name}
                          className="img-fluid rounded"
                          style={{ maxHeight: "120px", objectFit: "contain" }}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/placeholder-image.jpg";
                          }}
                        />
                      </div>
                      <div className="col-md-9">
                        <div className="card-body">
                          <div className="row">
                            <div className="col-md-8">
                              <h5 className="card-title">{item.product?.name}</h5>
                              <p className="text-muted mb-1 small">
                                Added on: {new Date(item.addedAt || Date.now()).toLocaleDateString()}
                              </p>
                              <div className="d-flex align-items-center mt-3">
                                <button
                                  className="btn btn-outline-secondary btn-sm"
                                  onClick={() => decreaseQuantity(item)}
                                  disabled={updatingItemId === item.product._id}
                                >
                                  <FaMinus />
                                </button>
                                <span className="px-3 fw-bold">{item.quantity}</span>
                                <button
                                  className="btn btn-outline-secondary btn-sm"
                                  onClick={() => increaseQuantity(item)}
                                  disabled={updatingItemId === item.product._id}
                                >
                                  <FaPlus />
                                </button>
                                <button
                                  className="btn btn-outline-danger btn-sm ms-4"
                                  onClick={() => removeItem(item.product._id)}
                                  disabled={updatingItemId === item.product._id}
                                >
                                  <FaTrash className="me-1" /> Remove
                                </button>
                              </div>
                            </div>
                            <div className="col-md-4 text-end">
                              <h5 className="text-primary">₹{item.product?.price}</h5>
                              <span className="badge bg-success mb-2">In Stock</span>
                              <p className="text-muted small mb-0">
                                {updatingItemId === item.product._id ? (
                                  <small>Updating...</small>
                                ) : (
                                  <small>Unit Price: ₹{item.product?.price}</small>
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="col-md-4">
              <div className="card shadow-sm border-0 rounded-3 sticky-top" style={{ top: "1rem" }}>
                <div className="card-header bg-white py-3">
                  <h5 className="mb-0">Order Summary</h5>
                </div>
                <div className="card-body">
                  <div className="d-flex justify-content-between mb-2">
                    <span>Items ({cartItems.length})</span>
                    <span>₹{totalPrice}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Delivery</span>
                    {deliveryFee === 0 ? (
                      <span className="text-success">Free</span>
                    ) : (
                      <span>₹{deliveryFee}</span>
                    )}
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Tax (18%)</span>
                    <span>₹{tax}</span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between mb-3 fw-bold">
                    <span>Total Amount</span>
                    <span>₹{finalPrice}</span>
                  </div>
                  <a href="/Customer/Checkout">
                  <button
                    className="btn btn-primary w-100 py-2"
                    disabled={cartItems.length === 0}
                    onClick={() => alert("Proceeding to checkout...")}
                  >
                    <FaMoneyBillWave className="me-2" />Proceed to Checkout
                  </button>
                  </a>
                  <div className="mt-3 text-center">
                    <small className="text-muted">
                      <FaGift className="me-1" /> Congratulations! You'll earn <span className="text-success fw-bold">{Math.floor(finalPrice * 0.05)}</span> reward points with this purchase.
                    </small>
                  </div>
                </div>
              </div>
            </div>shippingCharge
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Cart;