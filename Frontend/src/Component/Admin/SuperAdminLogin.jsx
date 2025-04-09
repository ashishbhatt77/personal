import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";

function SuperAdminLogin() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch("http://localhost:5000/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, pass }),
      });

      let data;
      try {
        data = await response.json();
      } catch (error) {
        console.error("Invalid JSON response");
        setMessage("Server error. Try again later.");
        return;
      }

      if (response.ok) {
        setMessage("✅ Login Successful! Redirecting...");
        setTimeout(() => navigate("/dashboard"), 1000);
      } else {
        setMessage(data.message || "❌ Invalid email or password.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      setMessage("❌ Server error. Please try again later.");
    }
  };

  return (
    <section id="login" className="d-flex align-items-center vh-100">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow p-4">
              <h2 className="text-center">Super Admin Login</h2>
              {message && <p className="text-center text-danger">{message}</p>}

              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label className="form-label" htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label" htmlFor="password">Password</label>
                  <input
                    id="password"
                    type="password"
                    className="form-control"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-success w-100">Login</button>

                <div className="mt-3">
                  <p><Link to="/AForgotpassword">Forgot Account?</Link></p>
                  <p><Link to="/OTP">Go to OTP</Link></p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SuperAdminLogin;