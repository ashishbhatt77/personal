import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
        
  function AllproductsList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products/active")
      .then(res => setProducts(res.data))
      .catch(err => console.error("Error fetching products", err));
  }, []);

  return (
    <div className="container mt-4">
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-md-3 mb-4">
            <Link to={`/product/${product.id}`} className="text-decoration-none text-dark">
              <div className="card h-100 shadow-sm">
                <img src={product.images[0]} className="card-img-top" alt={product.name} />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text text-success fw-bold">₹{product.price}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}


        
   

export default AllproductsList;