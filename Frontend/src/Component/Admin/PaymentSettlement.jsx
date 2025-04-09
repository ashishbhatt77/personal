import React from "react";
import Head from "./partials/Head";
import Header from "./partials/Header";
import LeftSidebar from "./partials/LeftSidebar";
import SettlementPanel from "./SettlementPanel"; // Import SettlementPanel

const PaymentSettlement = ({ children }) => {
  return (
    <>
      <Head />
      <Header />

      <section id="mid">
        <div className="container-fluid">
          <div className="row">
            <LeftSidebar />

            <div className="col-md-9">
              <h2 className="text-center">PAYMENT SETTLEMENT</h2>

              {/* Settlement Panel (Main Component) */}
              <SettlementPanel />

              {children}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PaymentSettlement;
