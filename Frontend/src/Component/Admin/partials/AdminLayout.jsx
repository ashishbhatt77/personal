import React from "react";
import Head from "../partials/Head";
import Header from "../partials/Header";
import LeftSidebar from "../partials/LeftSidebar";


const AdminLayout = ({ children }) => {
  return (
    <>
      <Head />
      <Header />

      <section id="mid">
        <div className="container-fluid">
          <div className="row">
      
            <LeftSidebar />

          
            <div className="col-md-9">
              
           
           
              {children}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminLayout;
