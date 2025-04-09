import React, { useState } from "react";

function AResetPassword() {
  const [formData, setFormData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.newPassword.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    
    if (formData.newPassword !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    
    fetch("https://api.example.com/reset-password", { // Replace with actual API endpoint
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: formData.email, newPassword: formData.newPassword }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setSuccess("Password reset successful!");
        } else {
          setError(data.message || "Failed to reset password.");
        }
      })
      .catch(error => setError("Error resetting password."));
  };

  return (
    <div className="container mt-5">
      <h2>Password Reset</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">New Password</label>
          <input
            type="password"
            name="newPassword"
            className="form-control"
            value={formData.newPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            className="form-control"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        {error && <p className="text-danger">{error}</p>}
        {success && <p className="text-success">{success}</p>}
        <button type="submit" className="btn btn-primary">Reset Password</button>
      </form>
    </div>
  );
}

export default AResetPassword;