import React, { useState } from "react";
import Header from "./partials/Header";
import LeftSidebar from "./partials/LeftSidebar";

const ProductCard = ({ image, title, discount }) => {
  return (
    <div className="border rounded-lg shadow-lg p-4 text-center w-64">
      {image && <img src={image} alt={title} className="w-full h-32 object-cover rounded-t-lg" />}
      <h3 className="text-lg font-semibold mt-2">{title}</h3>
      <p className="text-red-600 font-bold">{discount} OFF</p>
      <button className="bg-green-600 text-white px-4 py-2 rounded mt-2">Shop Now</button>
    </div>
  );
};

const ProductsForm = () => {
  const [image, setImage] = useState(null);
  const [desc, setDesc] = useState("");
  const [mdesc, setMdesc] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ image, desc, mdesc });
    alert("Product submitted successfully!");
  };

  return (
    <>
      <Header />

      <section id="mid">
        <div className="container">
          <div className="row">
            {/* Left Sidebar */}
            <LeftSidebar />

            {/* Main Content */}
            <div className="col-md-9 mt-5">
              <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg">
                <h2 className="text-xl font-bold mb-4 text-center">Deal & Offers Management</h2>
                <form onSubmit={handleSubmit} className="border p-4 rounded-lg shadow-md">
                  <div className="mb-4">
                    <label className="block font-semibold">Upload Image:</label>
                    <input type="file" accept="image/*" onChange={handleImageChange} className="w-full p-2 border rounded" />
                    {image && <img src={image} alt="Preview" className="w-full h-32 object-cover mt-2 border rounded" />}
                  </div>

                  <div className="mb-4">
                    <label className="block font-semibold form-control mb-2">Description:</label>
                    <textarea
                      className="w-full p-2 border rounded form-control"
                      value={desc}
                      onChange={(e) => setDesc(e.target.value)}
                      placeholder="Enter product description"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block font-semibold form-control mb-2"> More Description:</label>
                    <textarea
                      className="w-full p-2 border rounded form-control"
                      value={mdesc}
                      onChange={(e) => setMdesc(e.target.value)}
                      placeholder="Enter More description"
                    />
                  </div>

                  <button type="submit" className=" form-control  btn btn-dark w-full bg-blue-500 text-Black py-2 rounded hover:bg-blue-600">
                    ADD
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductsForm;
