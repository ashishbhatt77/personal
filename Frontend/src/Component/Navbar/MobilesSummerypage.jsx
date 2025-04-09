import React, { useState, useEffect } from "react";

const MobilesSummaryPage = () => {
  const [mobiles, setMobiles] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [brands, setBrands] = useState(["All"]);

  useEffect(() => {
    fetch("https://api.example.com/mobiles") // Replace with actual API endpoint
      .then(response => response.json())
      .then(data => {
        setMobiles(data);
        setBrands(["All", ...new Set(data.map(mobile => mobile.brand))]);
      })
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  const filteredMobiles = selectedBrand === "All" ? mobiles : mobiles.filter(mobile => mobile.brand === selectedBrand);

  return (
    <div style={{ padding: "10px" }}>
      <div style={{ marginBottom: "10px" }}>
        {brands.map((brand, index) => (
          <button
            key={index}
            onClick={() => setSelectedBrand(brand)}
            style={{ marginRight: "5px", padding: "5px", border: "1px solid #ccc", cursor: "pointer" }}>
            {brand}
          </button>
        ))}
      </div>
      <div style={{ display: "grid", gap: "10px" }}>
        {filteredMobiles.map((mobile, index) => (
          <div key={index} style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "5px" }}>
            <h2>{mobile.name}</h2>
            <p>Brand: {mobile.brand}</p>
            <p>Price: {mobile.price}</p>
            <p>{mobile.specs}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobilesSummaryPage;