import React, { useState, useCallback } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import SellerAdminLayout from "./Partials/SellerAdminLayout";

const ProductsManagement = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    compareAtPrice: "",
    images: [],
    stock: "",
    trackQuantity: true,
    status: "active",
    tags: "",
    seller: "",
    discount: "",
    primaryImageIndex: 0,
  });

  const [previewImages, setPreviewImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let updatedProduct = { ...newProduct, [name]: type === "checkbox" ? checked : value };

    if (name === "price" || name === "discount") {
      const price = name === "price" ? parseFloat(value) || 0 : parseFloat(newProduct.price) || 0;
      const discount = name === "discount" ? parseFloat(value) || 0 : parseFloat(newProduct.discount) || 0;
      updatedProduct.compareAtPrice = (price + (price * discount) / 100).toFixed(2);
    }

    setNewProduct(updatedProduct);
  };

  const onDrop = useCallback((acceptedFiles) => {
    const totalImages = [...newProduct.images, ...acceptedFiles];
    if (totalImages.length > 5) return alert("You can upload up to 5 images only.");

    const updatedPreviews = [
      ...previewImages,
      ...acceptedFiles.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      })),
    ];

    setPreviewImages(updatedPreviews);
    setNewProduct((prev) => ({ ...prev, images: totalImages }));
  }, [newProduct.images, previewImages]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true,
    maxFiles: 5,
  });

  const handleRemoveImage = (index) => {
    const updatedImages = [...newProduct.images];
    const updatedPreviews = [...previewImages];
    updatedImages.splice(index, 1);
    updatedPreviews.splice(index, 1);
    setNewProduct((prev) => ({ ...prev, images: updatedImages }));
    setPreviewImages(updatedPreviews);
  };

  const handleSetPrimary = (index) => {
    setNewProduct((prev) => ({ ...prev, primaryImageIndex: index }));
  };

  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.price || !newProduct.category) {
      alert("Please fill in all required fields.");
      return;
    }

    if (newProduct.stock <= 0) {
      alert("Stock must be greater than 0.");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      newProduct.images.forEach((file) => formData.append("images", file));
      Object.entries(newProduct).forEach(([key, value]) => {
        if (key !== "images") formData.append(key, value);
      });

      const token = localStorage.getItem("token");
      await axios.post("/api/products/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percent);
        },
      });

      alert("Product Added Successfully!");
      setNewProduct({
        name: "",
        description: "",
        category: "",
        price: "",
        compareAtPrice: "",
        images: [],
        stock: "",
        trackQuantity: true,
        status: "active",
        tags: "",
        seller: "",
        discount: "",
        primaryImageIndex: 0,
      });
      setPreviewImages([]);
      setUploadProgress(0);
    } catch (error) {
      alert(error.response?.data?.message || "Error adding product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SellerAdminLayout>
      <div className="container mt-4">
        <h2 className="mb-4">Add New Product</h2>

        {/* BASIC DETAILS */}
        <div className="card mb-3">
          <div className="card-header">Basic Details</div>
          <div className="card-body row g-3">
            <div className="col-md-6">
              <label>Product Name</label>
              <input type="text" className="form-control" name="name" value={newProduct.name} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <label>Category</label>
              <select className="form-control" name="category" value={newProduct.category} onChange={handleChange} required>
                <option value="">Select Category</option>
                <option value="Electronics">Electronics</option>
                <option value="Home-kitchen">Home & Kitchen</option>
                <option value="Grocery">Grocery</option>
                <option value="Fashion">Fashion</option>
                <option value="Beauty-personal-care">Beauty & Personal Care</option>
                <option value="Sports-fitness">Sports & Fitness</option>
              </select>
            </div>
            <div className="col-md-12">
              <label>Description</label>
              <textarea rows={3} className="form-control" name="description" value={newProduct.description} onChange={handleChange}></textarea>
            </div>
          </div>
        </div>

        {/* PRICING */}
        <div className="card mb-3">
          <div className="card-header">Pricing</div>
          <div className="card-body row g-3">
            <div className="col-md-4">
              <label>Price</label>
              <input type="number" className="form-control" name="price" value={newProduct.price} onChange={handleChange} required />
            </div>
            <div className="col-md-4">
              <label>Discount (%)</label>
              <input type="number" className="form-control" name="discount" value={newProduct.discount} onChange={handleChange} />
            </div>
            <div className="col-md-4">
              <label>Compare At Price</label>
              <input type="number" className="form-control" name="compareAtPrice" value={newProduct.compareAtPrice} readOnly />
            </div>
          </div>
        </div>

        {/* INVENTORY */}
        <div className="card mb-3">
          <div className="card-header">Inventory</div>
          <div className="card-body row g-3">
            <div className="col-md-4">
              <label>Stock</label>
              <input type="number" className="form-control" name="stock" value={newProduct.stock} onChange={handleChange} required />
            </div>
            <div className="col-md-4">
              <label>Status</label>
              <select className="form-control" name="status" value={newProduct.status} onChange={handleChange}>
                <option value="active">Publish</option>
                <option value="inactive">Unpublish</option>
              </select>
            </div>
          </div>
        </div>

        {/* ADDITIONAL */}
        <div className="card mb-3">
          <div className="card-header">Additional Information</div>
          <div className="card-body row g-3">
            <div className="col-md-6">
              <label>Tags (comma separated)</label>
              <textarea rows={3} className="form-control" name="tags" value={newProduct.tags} onChange={handleChange}></textarea>
            </div>
          </div>
        </div>

        {/* IMAGES */}
        <div className="card mb-3">
          <div className="card-header">Product Images (max 5)</div>
          <div className="card-body">
            <div {...getRootProps({ className: "dropzone border p-3 text-center" })}>
              <input {...getInputProps()} />
              {isDragActive ? <p>Drop the images here ...</p> : <p>Drag 'n' drop images here, or click to select</p>}
            </div>

            {previewImages.length > 0 && (
              <div className="mt-3 d-flex flex-wrap gap-3">
                {previewImages.map((img, index) => (
                  <div
                    key={index}
                    className="position-relative"
                    style={{
                      width: "100px",
                      height: "100px",
                      border: newProduct.primaryImageIndex === index ? "2px solid #007bff" : "1px solid #ddd",
                      borderRadius: "8px",
                      overflow: "hidden",
                      cursor: "pointer",
                    }}
                    onClick={() => handleSetPrimary(index)}
                    title="Click to set as primary"
                  >
                    <img
                      src={img.preview}
                      alt={`Preview ${index}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.3s",
                      }}
                      onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
                      onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                      loading="lazy"
                    />
                    <button
                      type="button"
                      className="btn btn-sm btn-danger position-absolute top-0 end-0 m-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveImage(index);
                      }}
                      style={{ padding: "0.2rem 0.4rem", fontSize: "0.7rem", borderRadius: "50%" }}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}

            {uploadProgress > 0 && loading && (
              <div className="progress mt-2">
                <div className="progress-bar" role="progressbar" style={{ width: `${uploadProgress}%` }}>
                  {uploadProgress}%
                </div>
              </div>
            )}
          </div>
        </div>

        <button className="btn btn-dark mt-3 mb-5" onClick={handleAddProduct} disabled={loading}>
          {loading ? "Adding..." : "Add Product"}
        </button>
      </div>
      </SellerAdminLayout>
  );
};

export default ProductsManagement;
