import React, { useState } from "react";
import Header from "./partials/Header";
import LeftSidebar from "./partials/LeftSidebar";

const AdminSlider = () => {
  const [imageFile, setImageFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [preview, setPreview] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);

    // Preview Image
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!imageFile) {
      alert("Please select an image to upload!");
      return;
    }

    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("title", title);
    formData.append("description", description);

    try {
      const response = await fetch("http://localhost:5000/api/admin/sliders", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.message || "Failed to add slider");

      alert("Slider Added Successfully!");
      setImageFile(null);
      setTitle("");
      setDescription("");
      setPreview("");
      document.getElementById("fileInput").value = ""; // Reset file input
    } catch (error) {
      console.error("Error adding slider:", error);
      alert(error.message);
    }
  };

  return (
    <>
      <Header />
      <section id="mid">
        <div className="container">
          <div className="row">
            <LeftSidebar />

            <div className="col-md-9 mt-5">
              <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg">
                <h2 className="text-xl font-bold mb-4 text-center">Slider Management</h2>

                <form onSubmit={handleSubmit} className="border p-4 rounded-lg shadow-md">
                  <div className="mb-4">
                    <label className="block font-semibold">Upload Image:</label>
                    <input
                      type="file"
                      id="fileInput"
                      className="w-full p-2 border rounded mb-2"
                      onChange={handleFileChange}
                      accept="image/*"
                      required
                    />
                    {preview && (
                      <div className="mt-2 text-center">
                        <img src={preview} alt="Preview" className="rounded" width="200" />
                      </div>
                    )}
                  </div>

                  <div className="mb-4">
                    <label className="block font-semibold">Title:</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded mb-2"
                      placeholder="Enter Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block font-semibold">Description:</label>
                    <textarea
                      className="w-full p-2 border rounded mb-2"
                      placeholder="Enter Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                  </div>

                  <button type="submit" className="form-control btn btn-dark bg-blue-600 text-white px-4 py-2 rounded-lg w-full">
                    Add Slider
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

export default AdminSlider;