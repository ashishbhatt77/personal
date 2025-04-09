import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const SellerRegistration = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: "",
    businessType: "",
    registrationNumber: "",
    businessEmail: "",
    businessPhone: "",
    alternatePhone: "",
    businessWebsite: "",
    gstNumber: "",
    panCardNumber: "",
    bankDetails: { bankName: "", accountNumber: "", ifscCode: "" },
    address: { registeredAddress: "", city: "", district: "", state: "", pinCode: "", country: "India" },
    productCategories: [],
    shippingMethod: "",
    termsConditions: false,
    sellerAgreement: false,
    dataPrivacyConsent: false,
    password: "",
    confirmPassword: "",
    otp: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const categories = ["Grocery", "Electronics", "Fashion", "Books", "Others"];
  const shippingMethods = ["Self", "Third Party", "Both"];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      if (name === "productCategories") {
        setFormData((prev) => ({
          ...prev,
          productCategories: checked
            ? [...prev.productCategories, value]
            : prev.productCategories.filter((cat) => cat !== value),
        }));
      } else {
        setFormData((prev) => ({ ...prev, [name]: checked }));
      }
    } else if (["bankName", "accountNumber", "ifscCode"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        bankDetails: { ...prev.bankDetails, [name]: value },
      }));
    } else if (["registeredAddress", "city", "district", "state", "pinCode"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, [name]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post("/api/seller/register", formData);
      alert(response.data.message);
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!formData.otp) {
      setError("Please enter OTP");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post("/api/seller/verify-otp", formData);
      alert(response.data.message);
      setStep(3);
    } catch (err) {
      setError(err.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      {step === 1 && (
        <form onSubmit={handleRegister}>
          <h3>Business Details</h3>
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Business Name</label>
              <input className="form-control" name="businessName" value={formData.businessName} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <label className="form-label">Business Type</label>
              <select className="form-select" name="businessType" value={formData.businessType} onChange={handleChange} required>
                <option value="">Select Business Type</option>
                <option value="sole_proprietorship">Sole Proprietorship</option>
                <option value="partnership">Partnership</option>
                <option value="pvt_ltd">Private Limited</option>
              </select>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Registration Number</label>
              <input className="form-control" name="registrationNumber" value={formData.registrationNumber} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <label className="form-label">Business Email</label>
              <input className="form-control" type="email" name="businessEmail" value={formData.businessEmail} onChange={handleChange} required />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Business Phone</label>
              <input className="form-control" name="businessPhone" value={formData.businessPhone} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <label className="form-label">Alternate Phone</label>
              <input className="form-control" name="alternatePhone" value={formData.alternatePhone} onChange={handleChange} />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Business Website</label>
              <input className="form-control" name="businessWebsite" value={formData.businessWebsite} onChange={handleChange} />
            </div>
            <div className="col-md-6">
              <label className="form-label">GST Number</label>
              <input className="form-control" name="gstNumber" value={formData.gstNumber} onChange={handleChange} required />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">PAN Card Number</label>
              <input className="form-control" name="panCardNumber" value={formData.panCardNumber} onChange={handleChange} required />
            </div>
          </div>

          <h3>Bank Details</h3>
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Bank Name</label>
              <input className="form-control" name="bankName" value={formData.bankDetails.bankName} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <label className="form-label">Account Number</label>
              <input className="form-control" name="accountNumber" value={formData.bankDetails.accountNumber} onChange={handleChange} required />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">IFSC Code</label>
            <input className="form-control" name="ifscCode" value={formData.bankDetails.ifscCode} onChange={handleChange} required />
          </div>

          <h3>Address</h3>
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Registered Address</label>
              <input className="form-control" name="registeredAddress" value={formData.address.registeredAddress} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <label className="form-label">City</label>
              <input className="form-control" name="city" value={formData.address.city} onChange={handleChange} required />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">District</label>
              <input className="form-control" name="district" value={formData.address.district} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <label className="form-label">State</label>
              <input className="form-control" name="state" value={formData.address.state} onChange={handleChange} required />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Pin Code</label>
              <input className="form-control" name="pinCode" value={formData.address.pinCode} onChange={handleChange} required />
            </div>
          </div>

          <h3>Product Categories</h3>
          <div className="mb-3">
            {categories.map((category) => (
              <div key={category} className="form-check">
                <input className="form-check-input" type="checkbox" name="productCategories" value={category} checked={formData.productCategories.includes(category)} onChange={handleChange} />
                <label className="form-check-label">{category}</label>
              </div>
            ))}
          </div>

          <h3>Shipping Method</h3>
          <div className="mb-3">
            {shippingMethods.map((method) => (
              <div key={method} className="form-check">
                <input className="form-check-input" type="radio" name="shippingMethod" value={method} checked={formData.shippingMethod === method} onChange={handleChange} required />
                <label className="form-check-label">{method}</label>
              </div>
            ))}
          </div>

          <h3>Agreements</h3>
          <div className="mb-3 form-check">
            <input className="form-check-input" type="checkbox" name="termsConditions" checked={formData.termsConditions} onChange={handleChange} required />
            <label className="form-check-label">Accept Terms & Conditions</label>
          </div>
          <div className="mb-3 form-check">
            <input className="form-check-input" type="checkbox" name="sellerAgreement" checked={formData.sellerAgreement} onChange={handleChange} required />
            <label className="form-check-label">Agree to Seller Agreement</label>
          </div>
          <div className="mb-3 form-check">
            <input className="form-check-input" type="checkbox" name="dataPrivacyConsent" checked={formData.dataPrivacyConsent} onChange={handleChange} required />
            <label className="form-check-label">Consent to Data Privacy Policy</label>
          </div>

          <h3>Set Your Password</h3>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input className="form-control" type="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input className="form-control" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <button className="btn btn-primary" type="submit" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </button>
          </div>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleVerifyOtp}>
          <div className="mb-3">
            <label className="form-label">Enter OTP</label>
            <input className="form-control" type="text" name="otp" value={formData.otp} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <button className="btn btn-success" type="submit" disabled={loading}>
              {loading ? "Verifying OTP..." : "Verify OTP"}
            </button>
          </div>
        </form>
      )}

      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default SellerRegistration;
