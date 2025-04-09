import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotResetPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleForgotPassword = async () => {
    if (!email) {
      setMessage("Please enter a valid email address.");
      return;
    }
    try {
      setLoading(true);
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setMessage(data.message);
      setStep(2);
    } catch (error) {
      setMessage(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!otp) {
      setMessage("Please enter a valid OTP.");
      return;
    }
    if (!newPassword || newPassword.length < 6) {
      setMessage("Password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, newPassword, confirmPassword }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setMessage(data.message);
      navigate("/login");
    } catch (error) {
      setMessage(error.message || "Something went wrong.");
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
              <h2 className="text-center mb-4">
                {step === 1 ? "Forgot Password" : "Reset Password"}
              </h2>
              {message && <p className="text-center text-danger mb-2">{message}</p>}
              {step === 1 ? (
                <>
                  <div className="mb-3">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <button
                    onClick={handleForgotPassword}
                    className="btn btn-primary w-100"
                    disabled={loading}
                  >
                    {loading ? "Sending OTP..." : "Send OTP"}
                  </button>
                </>
              ) : (
                <>
                  <div className="mb-3">
                    <input
                      type="text"
                      placeholder="Enter OTP"
                      className="form-control"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="password"
                      placeholder="New Password"
                      className="form-control"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      className="form-control"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                  <button
                    onClick={handleResetPassword}
                    className="btn btn-success w-100"
                    disabled={loading}
                  >
                    {loading ? "Resetting..." : "Reset Password"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotResetPassword;