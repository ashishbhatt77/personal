import React from "react";
import { Route, Routes } from "react-router-dom";

import ProductForm from "./Admin/ProductsForm";
import TrendingGadgets from "./Admin/TrandingGadgets";
import ReviewForm from "./Admin/Reviewform";
import AdminSlider from "./Admin/AdminSlider";
import DealOffersTable from "./Admin/Deal&OffersTable";
import GadgetsTable from "./Admin/GadgetsTable";
import TestimonialTable from "./Admin/TestinominlTable";
import UserManage from "./Admin/UserManage";
import BusinessManage from "./Admin/BusinissManage";
import PaymentSettlement from "./Admin/PaymentSettlement";
import ProductManagement from "./Admin/ProductManagement";
import OrderManagement from "./Admin/OrderManagement";
import ASliderTable from "./Admin/ASliderTable";
import Dashboard from "./Admin/Dashboard";

const AdminRoutes = () => {
  return (
    <Routes>
     
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/DealOffers" element={<ProductForm />} />
      <Route path="/TrandingGadgets" element={<TrendingGadgets />} />
      <Route path="/review-form" element={<ReviewForm />} />
      <Route path="/AdminSlider" element={<AdminSlider />} />
      <Route path="/SliderTable" element={<ASliderTable />} />
      <Route path="/DealofferTable" element={<DealOffersTable />} />
      <Route path="/GadgetsTable" element={<GadgetsTable />} />
      <Route path="/TestinominalTable" element={<TestimonialTable />} />
      <Route path="/UserManage" element={<UserManage />} />
      <Route path="/BusinissManage" element={<BusinessManage />} />
      <Route path="/PaymentSettlemet" element={<PaymentSettlement />} />
      <Route path="/AdminProductsManagement" element={<ProductManagement />} />
      <Route path="/AdminOrderManagement" element={<OrderManagement />} />
    </Routes>
  );
};

export default AdminRoutes;
