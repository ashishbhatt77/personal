import React from "react";
import { Route, Routes } from "react-router-dom";
import Cart from "./Customer/Cart";
import Checkout from "./Customer/Checkout";

const CustomerRoutes = () => {
  return (
    <Routes>
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
    </Routes>
  );
};

export default CustomerRoutes;