import React, { useEffect, useState } from "react";
import "bootstrap/dist/js/bootstrap.bundle.min";

function Slider() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSliders = async () => {
      try {
        const response = await fetch("https://ecommerce-backend-9lah.onrender.com/api/admin/sliders");
        const data = await response.json();

        if (response.ok && data.success && Array.isArray(data.data)) {
          const validImages = data.data
            .map((slider) => slider.imageUrl)
            .filter((url) => url && url.startsWith("http"));
          setImages(validImages);
        } else {
          console.error("Invalid API Response:", data);
        }
      } catch (error) {
        console.error("Error fetching sliders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSliders();
  }, []);

  return (
    <section id="slider">
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        {/* Indicators */}
        <div className="carousel-indicators">
          {images.map((_, index) => (
            <button
              key={index}
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to={index}
              className={index === 0 ? "active" : ""}
              aria-current={index === 0 ? "true" : "false"}
              aria-label={`Slide ${index + 1}`}
            ></button>
          ))}
        </div>

        {/* Carousel Inner */}
        <div className="carousel-inner">
          {loading ? (
            <div className="carousel-item active">
              <div
                style={{
                  height: "500px",
                  backgroundColor: "#f8f9fa",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "20px",
                  fontWeight: "bold",
                  color: "#888",
                }}
              >
                Loading...
              </div>
            </div>
          ) : images.length > 0 ? (
            images.map((img, index) => (
              <div
                key={index}
                className={`carousel-item ${index === 0 ? "active" : ""}`}
              >
                <img
                  src={img}
                  className="d-block w-100"
                  alt={`Slide ${index + 1}`}
                  style={{ height: "500px", objectFit: "cover" }}
                  loading="lazy"
                />
              </div>
            ))
          ) : (
            <div className="carousel-item active">
              <div
                style={{
                  height: "500px",
                  backgroundColor: "#eee",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "20px",
                  fontWeight: "bold",
                  color: "#999",
                }}
              >
                No Image Available
              </div>
            </div>
          )}
        </div>

        {/* Controls */}
        {images.length > 1 && (
          <>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </>
        )}
      </div>
    </section>
  );
}

export default Slider;
