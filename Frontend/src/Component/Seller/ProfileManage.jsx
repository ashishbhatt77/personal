import React, { useState } from "react";
import LeftSideBar from "./Partials/LeftSideBar";
import SellerHeader from "./Partials/SellerHeader";
import SellerHead from "./Partials/SellerHead";

const ProfileManage = () => {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "1234567890",
    address: "123, Street Name, City",
    storeName: "John's Store",
    storeLogo: "",
    bankAccount: "",
    upiId: "",
    paypalId: "",
    socialLinks: { facebook: "", instagram: "", twitter: "" },
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  return (
    <>
      <SellerHead />
      <SellerHeader />
      <section id="mid">
        <div className="container-fluid">
          <div className="row">
            <LeftSideBar />
            <div className="col-md-9 p-4 ">
              <h2 className="mb-4">PROFILE MANAGEMENT</h2>
              <div className="card p-4 w-100">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" name="name" value={profile.name} onChange={handleChange} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" name="email" value={profile.email} disabled />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Phone</label>
                    <input type="text" className="form-control" name="phone" value={profile.phone} onChange={handleChange} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Address</label>
                    <input type="text" className="form-control" name="address" value={profile.address} onChange={handleChange} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Store Name</label>
                    <input type="text" className="form-control" name="storeName" value={profile.storeName} onChange={handleChange} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Store Logo</label>
                    <input type="file" className="form-control" name="storeLogo" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Bank Account</label>
                    <input type="text" className="form-control" name="bankAccount" value={profile.bankAccount} onChange={handleChange} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">UPI ID</label>
                    <input type="text" className="form-control" name="upiId" value={profile.upiId} onChange={handleChange} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">PayPal ID</label>
                    <input type="text" className="form-control" name="paypalId" value={profile.paypalId} onChange={handleChange} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Facebook</label>
                    <input type="text" className="form-control" name="facebook" value={profile.socialLinks.facebook} onChange={handleChange} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Instagram</label>
                    <input type="text" className="form-control" name="instagram" value={profile.socialLinks.instagram} onChange={handleChange} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Twitter</label>
                    <input type="text" className="form-control" name="twitter" value={profile.socialLinks.twitter} onChange={handleChange} />
                  </div>
                </div>
                <div className="d-flex justify-content-center mt-3">
                  <button className="btn btn-primary">Update Profile</button>
                  <button className="btn btn-danger ms-3">Delete Account</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProfileManage;
