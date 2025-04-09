import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faStore,
  faUser,
  faSearch,
  faBars,
  faShoppingCart,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";

function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isCategoryNavOpen, setIsCategoryNavOpen] = useState(false);

  return (
    <>
      <style>
        {`
          body {
            padding-top: 120px;
          }
          .icon-hover {
            display: inline-block;
            padding: 8px;
            border-radius: 5px;
            transition: background-color 0.3s ease-in-out;
          }
          .icon-hover:hover {
            background-color: black;
          }
          .search-container {
            position: relative;
          }
          .search-icon {
            position: absolute;
            right: 15px;
            top: 50%;
            transform: translateY(-50%);
            color: #fff;
            cursor: pointer;
          }
        `}
      </style>

      {/* Top Navbar */}
      <nav
        className="navbar navbar-expand-lg"
        style={{
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 1000,
          backgroundImage:
            "linear-gradient(to right, rgb(85, 82, 82), black, rgb(206, 200, 200), black)",
          padding: "15px",
        }}
      >
        <div className="container-fluid d-flex align-items-center justify-content-between">
          <img
            src="https://digitalstore.blr1.cdn.digitaloceanspaces.com/main.png"
            alt="Logo"
            style={{ height: "52px" }}
          />

          {/* Search */}
          <div className="d-flex align-items-center ms-4 search-container flex-grow-1">
            <input
              className="form-control rounded-pill ps-4 pe-5"
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FontAwesomeIcon icon={faSearch} className="search-icon fa-lg" />
          </div>

          {/* Nav Icons */}
          <ul className="navbar-nav ms-auto">
            {[
              { to: "/customer/cart", icon: faShoppingCart },
              { to: "/customer/myorders", icon: faTruck },
              { to: "/", icon: faHouse },
              { to: "/seller/BussinessRegister", icon: faStore },
              { to: "/customer/create-account", icon: faUser },
            ].map(({ to, icon }, index) => (
              <li key={index} className="nav-item">
                <Link to={to} className="nav-link text-white icon-hover">
                  <FontAwesomeIcon icon={icon} className="fa-lg" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Category Navbar */}
      <nav
        className="navbar navbar-expand-lg"
        style={{
          position: "fixed",
          top: "70px",
          width: "100%",
          zIndex: 900,
          backgroundColor: "rgb(71, 114, 199)",
          padding: "10px",
        }}
      >
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setIsCategoryNavOpen(!isCategoryNavOpen)}
            style={{ border: "none", background: "transparent" }}
          >
            <FontAwesomeIcon icon={faBars} className="text-white fa-lg" />
          </button>

          <div className={`collapse navbar-collapse ${isCategoryNavOpen ? "show" : ""}`}>
            <ul className="navbar-nav ms-3">
              {[
                { to: "/Mobile", label: "Mobile" },
                { to: "/Tv", label: "TV" },
                { to: "/Laptop", label: "Laptops" },
                { to: "/Books", label: "Books" },
                { to: "/Fashion", label: "Fashion" },
                { to: "/Computer", label: "Computer" },
                { to: "/Electronic", label: "Electronic" },
                { to: "/sell", label: "Sell" },
              ].map(({ to, label }, index) => (
                <li key={index} className="nav-item">
                  <Link to={to} className="nav-link text-white">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;