import { Link } from "react-router-dom";
import React from "react";
import { FaSlidersH, FaTags, FaMobileAlt, FaQuoteLeft, FaUser, FaStore } from "react-icons/fa";
import { RiFootprintLine } from "react-icons/ri"; 
import { MdProductionQuantityLimits } from "react-icons/md"; 
import { MdOutlineShoppingCart } from "react-icons/md";
import { MdPayment } from "react-icons/md";

const LeftSidebar = () => {
  return (
    <div className="col-md-3 mt-2">
      <ul className="list-unstyled">
        <li>
          <Link to="/admin/SliderTable" className="text-decoration-none">
            <button className="btn btn-dark form-control d-flex align-items-center text-start mb-2">
              <FaSlidersH className="me-2" /> <span>SLIDE MANAGEMENT</span>
            </button>
          </Link>
        </li>
        <li>
          <Link to="/admin/DealofferTable" className="text-decoration-none">
            <button className="btn btn-dark form-control d-flex align-items-center text-start mb-2">
              <FaTags className="me-2" /> <span>DEAL MANAGEMENT</span>
            </button>
          </Link>
        </li>
        <li>
          <Link to="/admin/GadgetsTable" className="text-decoration-none">
            <button className="btn btn-dark form-control d-flex align-items-center text-start mb-2">
              <FaMobileAlt className="me-2" /> <span>GADGETS MANAGEMENT</span>
            </button>
          </Link>
        </li>
        <li>
          <Link to="/admin/TestinominalTable" className="text-decoration-none">
            <button className="btn btn-dark form-control d-flex align-items-center text-start mb-2">
              <FaQuoteLeft className="me-2" /> <span>TESTIMONIAL MANAGEMENT</span>
            </button>
          </Link>
        </li>
        <li>
          <button className="btn btn-dark form-control d-flex align-items-center text-start mb-2">
            <RiFootprintLine className="me-2" /> <span>FOOTER MANAGEMENT</span>
          </button>
        </li>
        <li>
          <Link to="/admin/UserManage" className="text-decoration-none">
            <button className="btn btn-dark form-control d-flex align-items-center text-start mb-2">
              <FaUser className="me-2" /> <span>USER MANAGEMENT</span>
            </button>
          </Link>
        </li>
        <li>
          <Link to="/admin/BusinissManage" className="text-decoration-none">
            <button className="btn btn-dark form-control d-flex align-items-center text-start mb-2">
              <FaStore className="me-2" /> <span>BUSINESS SELLER MANAGEMENT</span>
            </button>
          </Link>
        </li>
        <li>
          <Link to="/admin/PaymentSettlemet" className="text-decoration-none">
            <button className="btn btn-dark form-control d-flex align-items-center text-start mb-2">
            <MdPayment className="me-2" /> <span>PAYMENT SETTLEMENT</span>
            </button>
          </Link>
        </li>
        <li>
  <Link to="/admin/AdminProductsManagement" className="text-decoration-none">
    <button className="btn btn-dark form-control d-flex align-items-center text-start mb-2">
      <MdProductionQuantityLimits className="me-2" /> <span>PRODUCTS MANAGEMENT</span>
    </button>
  </Link>
</li>
<li>
  <Link to="/admin/AdminOrderManagement" className="text-decoration-none">
    <button className="btn btn-dark form-control d-flex align-items-center text-start mb-2">
      <MdOutlineShoppingCart className="me-2" /> <span>ORDER MANAGEMENT</span>
    </button>
  </Link>
</li>
      
      </ul>
    </div>
  );
};

export default LeftSidebar;
