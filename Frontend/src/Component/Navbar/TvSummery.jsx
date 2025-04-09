import React, { useState, useEffect } from "react";


const TvSummery = () => {
  const [tvs, setTvs] = useState([]);
  const [brands, setBrands] = useState(["All"]);
  const [selectedBrand, setSelectedBrand] = useState("All");

  useEffect(() => {
    fetch.get("https://api.example.com/tvs") // Replace with actual API URL
      .then(response => {
        setTvs(response.data);
        setBrands(["All", ...new Set(response.data.map(tv => tv.brand))]);
      })
      .catch(error => console.error("Error fetching TV data:", error));
  }, []);

  const filteredTvs = selectedBrand === "All" ? tvs : tvs.filter(tv => tv.brand === selectedBrand);

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
        {filteredTvs.map((tv, index) => (
          <div key={index} style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "5px" }}>
            <h2>{tv.name}</h2>
            <p>Brand: {tv.brand}</p>
            <p>Price: {tv.price}</p>
            <p>{tv.specs}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TvSummery;