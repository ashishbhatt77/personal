import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ContextApi } from "../../common/Context_Api"; // ✅ Correct path adjust karo

const SellerHeader = () => {
  const navigate = useNavigate();
  const { setToken, setLoginName } = useContext(ContextApi);

  const handleLogout = () => {
    setToken(null);
    setLoginName(null);
    localStorage.removeItem("token");
    localStorage.removeItem("loginname");

    navigate("/login");
  };

  return (
    <header className="bg-dark text-white py-3 shadow-lg">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="Business Admin Logo"
              className="me-3"
              style={{ width: "40px", height: "40px", borderRadius: "50%" }}
            />
            <h2 className="m-0">Business Admin</h2>
          </div>

          <button
            onClick={handleLogout}
            className="btn btn-outline-light px-4 py-2 fw-bold rounded-pill shadow-sm"
          >
            Logout <i className="ms-2 fas fa-sign-out-alt"></i>
          </button>
        </div>
      </div>
    </header>
  );
};

export default SellerHeader;
