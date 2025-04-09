import React from "react";
import Slider from "./Slider";
import DealsOffers from "./DealsOffers";
import TrendingGadgets from "./TrendingGadgets";
import Productsgridmanagement from "./Productsgridmanagement";
import ProductsShowcase from "./ProductsShowcase";

function Home() {
  return (
    <>
      <Slider />
      <DealsOffers />
      <TrendingGadgets />
      <ProductsShowcase />
      <Productsgridmanagement />
    </>
  );
}

export default Home;
