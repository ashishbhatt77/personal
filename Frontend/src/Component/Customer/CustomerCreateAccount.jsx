import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const UserCreateAccount = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    otp: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          mobile: formData.mobile,
          password: formData.password,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Registration failed");

      setStep(2);
    } catch (error) {
      setError(error.message || "Error during registration");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    if (!formData.otp) {
      setError("Please enter OTP");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await fetch("http://localhost:5000/api/users/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, otp: formData.otp }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "OTP verification failed");

      alert("Email verified successfully! You can now login.");
      navigate("/login");
    } catch (error) {
      setError(error.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow-lg p-4 rounded" style={{ width: "400px" }}>
        {step === 1 ? (
          <form onSubmit={handleRegister}>
            <h2 className="text-center mb-4">Customer Registration</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="mb-3">
              <label><strong>Name</strong></label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label><strong>Email</strong></label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label><strong>Mobile</strong></label>
              <input
                type="text"
                className="form-control"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label><strong>Password</strong></label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label><strong>Confirm Password</strong></label>
              <input
                type="password"
                className="form-control"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading ? "Processing..." : "Register"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOTP}>
            <h2 className="text-center mb-4">Verify OTP</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="mb-3">
              <label><strong>Enter OTP</strong></label>
              <input
                type="text"
                className="form-control"
                name="otp"
                value={formData.otp}
                onChange={handleChange}
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-success w-100"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>
        )}
        <hr />
        <Link to="/login">Already have an account? Login here</Link>
      </div>
    </div>
  );
};

export default UserCreateAccount;