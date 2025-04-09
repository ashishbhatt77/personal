import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Head from "./partials/Head";
import Header from "./partials/Header";
import LeftSidebar from "./partials/LeftSidebar";

const ASliderTable = () => {
  const [sliders, setSliders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingSlide, setEditingSlide] = useState(null);
  const [formData, setFormData] = useState({ title: "", description: "", imageUrl: "" });

  useEffect(() => {
    fetchSliders();
  }, []);

  const fetchSliders = async () => {
    try {
      const token = localStorage.getItem("token"); // ✅ Get token from localStorage
      const response = await fetch("/api/admin/sliders", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ Include token
        },
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      setSliders(data.data || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this slide?")) return;
    try {
      const token = localStorage.getItem("token"); // ✅ Get token
      const response = await fetch(`/api/admin/sliders/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`, // ✅ Include token
        },
      });

      if (!response.ok) throw new Error("Failed to delete slider");

      setSliders(sliders.filter((slider) => slider._id !== id));
    } catch (error) {
      console.error("Error deleting slider:", error);
    }
  };

  const handleEdit = (slide) => {
    setEditingSlide(slide._id);
    setFormData({ title: slide.title, description: slide.description, imageUrl: slide.imageUrl });
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token"); // ✅ Get token
      const response = await fetch(`/api/admin/sliders/${editingSlide}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ Include token
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to update slider");

      setSliders(sliders.map((s) => (s._id === editingSlide ? { ...s, ...formData } : s)));
      setEditingSlide(null);
      setFormData({ title: "", description: "", imageUrl: "" });
    } catch (error) {
      console.error("Error updating slider:", error);
    }
  };

  return (
    <>
      <Head />
      <Header />
      <section id="mid">
        <div className="container-fluid">
          <div className="row">
            <LeftSidebar />
            <div className="col-md-9 p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="mb-0">SLIDER MANAGEMENT</h2>
                <Link to="/admin/AdminSlider" className="btn btn-dark">
                  + Add New Slide
                </Link>
              </div>

              {loading ? (
                <p className="text-center">Loading sliders...</p>
              ) : error ? (
                <p className="text-danger text-center">{error}</p>
              ) : (
                <div className="table-responsive">
                  <table className="table table-bordered table-striped">
                    <thead className="bg-dark text-white">
                      <tr>
                        <th>ID</th>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sliders.length > 0 ? (
                        sliders.map((slider, index) => (
                          <tr key={slider._id}>
                            <td>{index + 1}</td>
                            <td>
                              <img
                                src={slider.imageUrl || "/default-image.jpg"}
                                alt="Slider"
                                width="100"
                                height="60"
                                className="rounded"
                              />
                            </td>
                            <td>{slider.title || "No Title"}</td>
                            <td>{slider.description || "No Description"}</td>
                            <td>
                              <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(slider)}>
                                Edit
                              </button>
                              <button className="btn btn-sm btn-danger" onClick={() => handleDelete(slider._id)}>
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="text-center">
                            No sliders found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              {editingSlide && (
                <div className="card p-3 mt-4">
                  <h3>Edit Slide</h3>
                  <div className="mb-2">
                    <label className="form-label">Title</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Description</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Image URL</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.imageUrl}
                      onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    />
                  </div>
                  <button className="btn btn-success me-2" onClick={handleUpdate}>
                    Save Changes
                  </button>
                  <button className="btn btn-secondary" onClick={() => setEditingSlide(null)}>
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ASliderTable;
