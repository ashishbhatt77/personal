import React, { useState } from "react";
import Head from "./partials/Head";
import Header from "./partials/Header";
import LeftSidebar from "./partials/LeftSidebar";

const ProductCard = ({ image, title, discount }) => {
  return (
    <div className="border rounded-lg shadow-lg p-4 text-center w-64">
      {image && <img src={URL.createObjectURL(image)} alt={title} className="w-full h-32 object-cover rounded-t-lg" />}
      <h3 className="text-lg font-semibold mt-2">{title}</h3>
      <p className="text-red-600 font-bold">{discount} OFF</p>
      <button className="bg-green-600 text-black px-4 py-2 rounded mt-2">Shop Now</button>
    </div>
  );
};

const ProductForm = ({ onSubmit }) => {
  const [product, setProduct] = useState({ image: null, name: "", price: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    setProduct({ ...product, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(product);
  };

  return (
    <form onSubmit={handleSubmit} className="border rounded-lg p-4 shadow-lg w-64 bg-white">
      <div className="mb-4">
        <label className="block font-semibold">Upload Image:</label>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold">Product Name:</label>
        <input
          type="text"
          name="name"
          placeholder="Enter product name"
          value={product.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold">Discount:</label>
        <input
          type="text"
          name="price"
          placeholder="Enter discount"
          value={product.price}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <button type="submit" className=" form-control btn btn-dark w-full bg-blue-500 text-Black py-2 rounded hover:bg-blue-600">
        Tranding Gadgets
      </button>
    </form>
  );
};

const TrandingGadgets = ({ children }) => {
  const [product, setProduct] = useState(null);

  return (
    <>
      <Head />
      <Header />

      <section id="mid">
        <div className="container">
          <div className="row">
            <LeftSidebar />
            <div className="col-md-9 mt-5">
              <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg">
                <h2 className="text-xl font-bold mb-4 text-center">Tranding Gadgets</h2>
                <ProductForm onSubmit={setProduct} />
              </div>
              {children}
            </div>
          </div>
        </div>
      </section>

      {product && (
        <div className="flex justify-center mt-4">
          <ProductCard image={product.image} title={product.name} discount={product.price} />
        </div>
      )}
    </>
  );
};

export default TrandingGadgets;
