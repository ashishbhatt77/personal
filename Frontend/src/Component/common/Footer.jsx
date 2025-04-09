import React from "react";
import { Link } from "react-router-dom";  // Import Link here
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faTwitter, faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <>
      <section id="Footer">
        <footer className="bg-cover bg-center bg-no-repeat text-white p-10" style={{ background: "url('/Public/FooterBaground_LE_upscale_balanced_x2.jpg') no-repeat center center/cover", width: "100%", height: "auto" }}>
          <div className="container mx-auto text-center">
            <div className="row">
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                <h5 className="text-uppercase fw-bold mt-5">Digital Store</h5>
                <p>
                  Your one-stop solution for all digital products. Get the best deals on software, tools, and services.
                </p>
              </div>
              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mt-5">Quick Links</h6>
                <ul className="list-unstyled">
                  <li><Link to="/" className="text-white text-decoration-none">Home</Link></li>
                  <li><Link to="/shop" className="text-white text-decoration-none">Shop</Link></li>
                  <li><Link to="/about" className="text-white text-decoration-none">About Us</Link></li>
                  <li><Link to="/contact" className="text-white text-decoration-none">Contact</Link></li>
                </ul>
              </div>
              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mt-5">Customer Support</h6>
                <ul className="list-unstyled">
                  <li><Link to="/faq" className="text-white text-decoration-none">FAQs</Link></li>
                  <li><Link to="/returns" className="text-white text-decoration-none">Return Policy</Link></li>
                  <li><Link to="/shipping" className="text-white text-decoration-none">Shipping Info</Link></li>
                  <li><Link to="/terms" className="text-white text-decoration-none">Terms & Conditions</Link></li>
                </ul>
              </div>
              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold mt-5">Contact</h6>
                <p><i className="fas fa-map-marker-alt me-2"></i> Jaipur, Rajasthan, India</p>
                <p><i className="fas fa-envelope me-2"></i> support@digitalstore.com</p>
                <p><i className="fas fa-phone me-2"></i> +91 98765 43210</p>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center mt-4 border-top pt-3">
              <p className="mb-5">© {new Date().getFullYear()} Digital Store. All rights reserved.</p>
              <div className="d-flex">
                <a href="#" className="text-white me-3">
                  <FontAwesomeIcon icon={faFacebookF} size="lg" />
                </a>
                <a href="#" className="text-white me-3">
                  <FontAwesomeIcon icon={faTwitter} size="lg" />  {/* Corrected the icon name here */}
                </a>
                <a href="#" className="text-white me-3">
                  <FontAwesomeIcon icon={faInstagram} size="lg" />
                </a>
                <a href="#" className="text-white me-3">
                  <FontAwesomeIcon icon={faLinkedin} size="lg" />
                </a>
              </div>
            </div>
          </div>
        </footer>
      </section>
    </>
  );
}

export default Footer;
