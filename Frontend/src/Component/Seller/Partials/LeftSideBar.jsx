import { Link } from "react-router-dom";
import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";


const menuItems = [
  { path: "/seller/ProfileManage", label: "Profile Management", icon: "fa-user" },
  { path: "/seller/ProductsManagementTable", label: "Products Management", icon: "fa-box" },
  { path: "/seller/OrderManage", label: "Order Management", icon: "fa-shopping-cart" },
  { path: "/seller/InventoryManage", label: "Inventory Management", icon: "fa-warehouse" },
  { path: "/seller/SallesEarning", label: "Sales & Earnings Tracking", icon: "fa-chart-line" },
  { path: "/seller/CustomerInteristion", label: "Customer Interaction", icon: "fa-comments" },
  { path: "/seller/Discount&offers", label: "Offers & Discounts", icon: "fa-tags" },
  { path: "/seller/Cart&Wishlist", label: "Cart & Wishlist Management", icon: "fa-heart" },
  { path: "/seller/Notification&Alert", label: "Notifications & Alerts", icon: "fa-bell" },
  { path: "/seller/Report&Anayltic", label: "Reports & Analytics", icon: "fa-file-alt" },
  { path: "/seller/ShipingDelivery", label: "Shipping & Delivery Settings", icon: "fa-truck" },
];

const LeftSideBar = () => {
  return (
    <div className="col-md-3 mt-3">
      <ul className="list-unstyled">
        {menuItems.map((item, index) => (
          <li key={index}>
            <Link to={item.path}>
              <button className="btn btn-dark form-control mb-2 text-start">
                <i className={`fa ${item.icon} fa-fw`}></i> {item.label}
              </button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeftSideBar;
