import React from "react";


import LeftSideBar from "./LeftSideBar";
import SellerHeader from "./SellerHeader";
import SellerHead from "./SellerHead";


const SellerAdminLayout = ({ children }) => {
  return (
    <>
      <SellerHead />
      <SellerHeader/>

      <section id="mid">
        <div className="container-fluid">
          <div className="row">
            <LeftSideBar/>
            <div className="col-md-9">
              {children}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SellerAdminLayout;
