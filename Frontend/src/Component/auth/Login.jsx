import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [loginData, setLoginData] = useState({ emailOrMobile: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); 
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!loginData.emailOrMobile || !loginData.password) {
      return setError("Please enter email/phone and password.");
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await res.json();
      if (res.ok) {
      
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        localStorage.setItem("user", JSON.stringify(data.user));

        if (data.role === "admin") navigate("/admin/dashboard");
        else if (data.role === "seller") navigate("/seller/SellerDashBoard");
        else if (data.role === "customer") navigate("/");
        else navigate("/");
      } else {
        setError(data.message || "Login failed.");
      }
    } catch (err) {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h2 className="text-center mb-4">Login</h2>
              {error && <p className="text-danger">{error}</p>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="text"
                    name="emailOrMobile"
                    className="form-control"
                    placeholder="Email or Phone"
                    onChange={handleChange}
                    value={loginData.emailOrMobile}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Password"
                    onChange={handleChange}
                    value={loginData.password}
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                  {loading ? "Logging in..." : "Login"}
                </button>
              </form>
              <p className="text-center mt-3">
                <a href="#" onClick={() => navigate("/ForgotPassword")}>
                  Forgot Password?
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
