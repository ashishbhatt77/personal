import React, { useState, useEffect } from "react";

const Order = () => {
  const [order, setOrder] = useState({
    user: "",
    products: [{ product: "", quantity: 1 }],
    totalPrice: 0,
    status: "Pending",
  });

  useEffect(() => {
    fetch("https://api.example.com/order") // Replace with actual API endpoint
      .then(response => response.json())
      .then(data => setOrder(data))
      .catch(error => console.error("Error fetching order data:", error));
  }, []);

  const handleChange = (e) => {
    setOrder({ ...order, [e.target.name]: e.target.value });
  };

  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...order.products];
    updatedProducts[index][field] = value;
    setOrder({ ...order, products: updatedProducts });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("https://api.example.com/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    })
      .then(response => response.json())
      .then(data => console.log("Order Submitted:", data))
      .catch(error => console.error("Error submitting order:", error));
  };

  return (
    <div className="p-4 border rounded-lg shadow-md w-96">
      <h2 className="text-xl font-bold">Order</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-2">
        <input
          type="text"
          name="user"
          value={order.user}
          onChange={handleChange}
          placeholder="User ID"
          className="p-2 border rounded"
          required
        />
        {order.products.map((item, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="text"
              placeholder="Product ID"
              value={item.product}
              onChange={(e) => handleProductChange(index, "product", e.target.value)}
              className="p-2 border rounded"
              required
            />
            <input
              type="number"
              placeholder="Quantity"
              value={item.quantity}
              min="1"
              onChange={(e) => handleProductChange(index, "quantity", e.target.value)}
              className="p-2 border rounded"
              required
            />
          </div>
        ))}
        <input
          type="number"
          name="totalPrice"
          value={order.totalPrice}
          onChange={handleChange}
          placeholder="Total Price"
          min="0"
          className="p-2 border rounded"
          required
        />
        <select
          name="status"
          value={order.status}
          onChange={handleChange}
          className="p-2 border rounded"
        >
          <option value="Pending">Pending</option>
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
          Submit Order
        </button>
      </form>
    </div>
  );
};

export default Order;