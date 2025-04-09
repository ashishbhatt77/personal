import React, { useState } from "react";
import Head from "./partials/Head";
import Header from "./partials/Header";
import LeftSidebar from "./partials/LeftSidebar";

const TestimonialForm = ({ onSubmit }) => {
  const [testimonial, setTestimonial] = useState({ image: null, name: "", message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTestimonial({ ...testimonial, [name]: value });
  };

  const handleImageChange = (e) => {
    setTestimonial({ ...testimonial, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(testimonial);
  };

  return (
    <form onSubmit={handleSubmit} className="border p-4 rounded-lg shadow-md">
      <div className="mb-4">
        <label className="block font-semibold">Upload Image:</label>
        <input type="file" accept="image/*" onChange={handleImageChange} className="w-full p-2 border rounded" />
        {testimonial.image && <img src={URL.createObjectURL(testimonial.image)} alt="Preview" className="w-full h-32 object-cover mt-2 border rounded" />}
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-2">Name:</label>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={testimonial.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-2">Testimonial:</label>
        <textarea
          name="message"
          placeholder="Write your testimonial..."
          value={testimonial.message}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <button type="submit" className=" form-control btn btn-dark w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
        Submit Testimonial
      </button>
    </form>
  );
};

const Reviewform = ({ children }) => {
  const [testimonial, setTestimonial] = useState(null);

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
                <h2 className="text-xl font-bold mb-4 text-center">Submit Your Testimonial</h2>
                <TestimonialForm onSubmit={setTestimonial} />
              </div>
              {children}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Reviewform;
