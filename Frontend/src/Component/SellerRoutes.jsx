import React from "react";
import { Route, Routes } from "react-router-dom";

import BusinessRegister from "./Seller/BussinessRegister";
import ProductsManagement from "./Seller/ProductsManagement";
import OrderManage from "./Seller/OrderManage";
import ProfileManage from "./Seller/ProfileManage";
import SalesAndEarnings from "./Seller/SallesndEarning";
import CustomerInteraction from "./Seller/CustomerInteriction";
import DiscountAndOffers from "./Seller/DiscountAndOffres";
import WishlistManage from "./Seller/WishlistManage";
import Notifications from "./Seller/Notification&Alert";
import ReportAnalytics from "./Seller/Report&Anaylatic";
import ShippingDelivery from "./Seller/ShipingDelivery";
import InventoryManage from "./Seller/InventryManage";
import SellerDashBoard from "./Seller/SellerDashBoard";
import ProductsManagementTable from "./Seller/ProductsMnagemnetTable";
import EditProducts from "./Seller/EditProducts";

const SellerRoutes = () => {
  return (
    <Routes>
      <Route path="/BussinessRegister" element={<BusinessRegister/>} />
      <Route path="/ProductsManage" element={<ProductsManagement />} />
      <Route path="/OrderManage" element={<OrderManage />} />
      <Route path="/ProfileManage" element={<ProfileManage />} />
      <Route path="/SallesEarning" element={<SalesAndEarnings />} />
      <Route path="/CustomerInteristion" element={<CustomerInteraction />} />
      <Route path="/Discount&offers" element={<DiscountAndOffers />} />
      <Route path="/Cart&Wishlist" element={<WishlistManage />} />
      <Route path="/Notification&Alert" element={<Notifications />} />
      <Route path="/Report&Anayltic" element={<ReportAnalytics />} />
      <Route path="/ShipingDelivery" element={<ShippingDelivery />} />
      <Route path="/InventoryManage" element={<InventoryManage />} />
      <Route path="/SellerDashBoard" element={<SellerDashBoard/>} />
      <Route path="/ProductsManagementTable" element={<ProductsManagementTable/>} />
      <Route path="/EditProducts/:productId" element={<EditProducts/>} />
    </Routes>
  );
};

export default SellerRoutes;