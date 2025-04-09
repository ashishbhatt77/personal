import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import SellerAdminLayout from "./Partials/SellerAdminLayout";
import { useDropzone } from "react-dropzone";

const EditProducts = () => {
  const { productId } = useParams();
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
    discount: "",
    weight: "",
    primaryImageIndex: 0,
  });

  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewImages, setPreviewImages] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(`http://localhost:3000/api/products/${productId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setNewProduct((prev) => ({
          ...prev,
          name: data.product.name || "",
          description: data.product.description || "",
          category: data.product.category || "",
          price: data.product.price || "",
          compareAtPrice: data.product.compareAtPrice || "",
          images: Array.isArray(data.product.images) ? data.product.images : [],
          stock: data.product.stock || "",
          trackQuantity: data.product.trackQuantity || false,
          status: data.product.status === "true" ? "active" : "inactive",
          tags: Array.isArray(data.product.tags) ? data.product.tags.join(", ") : "",
          discount: data.product.discount || "",
          weight: data.product.weight || "",
        }));

        const previews = (Array.isArray(data.product.images) ? data.product.images : []).map((img) => ({
          preview: typeof img === "string" ? img : URL.createObjectURL(img),
        }));

        setPreviewImages(previews);
      } catch (error) {
        console.error("Error fetching product:", error.response?.data?.message || error.message);
      }
    };

    if (productId) fetchProduct();
  }, [productId]);

  // ✅ Auto update compareAtPrice when price or discount changes
  useEffect(() => {
    const price = parseFloat(newProduct.price);
    const discount = parseFloat(newProduct.discount);

    if (!isNaN(price) && !isNaN(discount)) {
      const comparePrice = price + (price * discount) / 100;
      setNewProduct((prev) => ({
        ...prev,
        compareAtPrice: comparePrice.toFixed(2),
      }));
    } else {
      setNewProduct((prev) => ({
        ...prev,
        compareAtPrice: "",
      }));
    }
  }, [newProduct.price, newProduct.discount]);

  const onDrop = useCallback((acceptedFiles) => {
    const validImages = acceptedFiles.slice(0, 5 - newProduct.images.length);
    const previews = validImages.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setNewProduct((prev) => ({
      ...prev,
      images: [...prev.images, ...validImages],
    }));

    setPreviewImages((prev) => [...prev, ...previews]);
  }, [newProduct.images]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    onDrop,
    multiple: true,
    maxFiles: 5,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleRemoveImage = (index) => {
    setNewProduct((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSetPrimary = (index) => {
    setNewProduct((prev) => ({
      ...prev,
      primaryImageIndex: index,
    }));
  };

  const handleUpdateProduct = async () => {
    if (!newProduct.name || !newProduct.price || !newProduct.category) {
      alert("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      Object.entries(newProduct).forEach(([key, value]) => {
        if (key === "images") {
          value.forEach((file) => {
            if (typeof file !== "string") formData.append("images", file);
          });
        } else if (key === "tags") {
          formData.append("tags", value.split(",").map((tag) => tag.trim()));
        } else {
          formData.append(key, value);
        }
      });
      formData.append("primaryImageIndex", newProduct.primaryImageIndex);

      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:3000/api/products/${productId}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percent);
        },
      });

      alert("Product Updated Successfully!");
    } catch (error) {
      alert(error.response?.data?.message || "Error updating product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SellerAdminLayout>
      <div className="container mt-4">
        <h2 className="mb-4">Edit Product</h2>

        {/* BASIC DETAILS */}
        <div className="card mb-3">
          <div className="card-header">Basic Details</div>
          <div className="card-body row g-3">
            <div className="col-md-6">
              <label>Product Name</label>
              <input type="text" className="form-control" name="name" value={newProduct.name} onChange={handleChange} />
            </div>
            <div className="col-md-6">
              <label>Category</label>
              <select className="form-control" name="category" value={newProduct.category} onChange={handleChange}>
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
              <input type="number" className="form-control" name="price" value={newProduct.price} onChange={handleChange} />
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
              <input type="number" className="form-control" name="stock" value={newProduct.stock} onChange={handleChange} />
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
              {isDragActive ? <p>Drop the images here ...</p> : <p>Drag & drop images here, or click to select</p>}
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
                      style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.3s" }}
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

        <button className="btn btn-primary mt-3 mb-5" onClick={handleUpdateProduct} disabled={loading}>
          {loading ? "Updating..." : "Update Product"}
        </button>
      </div>
    </SellerAdminLayout>
  );
};

export default EditProducts;