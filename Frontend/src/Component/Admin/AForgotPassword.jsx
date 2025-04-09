import React, { useState } from "react";

function AForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://api.example.com/forgot-password", { // Replace with actual API URL
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      setMessage(data.message || "Password reset link sent successfully!");
    } catch (error) {
      console.error("Error sending forgot password request:", error);
      setMessage("Failed to send request. Please try again later.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
      <div className="card p-4 shadow" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-4">Forgot Password</h2>
        {message && <p className="text-success text-center">{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Enter your Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default AForgotPassword;