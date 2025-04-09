import React, { useEffect, useState } from "react";
import "bootstrap/dist/js/bootstrap.bundle.min";

function Slider() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchSliders = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/admin/sliders");
        const data = await response.json();
        console.log("API Response:", data);

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
      }
    };

    fetchSliders();
  }, []);

  return (
    <section id="slider">
      <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
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

        <div className="carousel-inner">
          {images.length > 0 ? (
            images.map((img, index) => (
              <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                <img src={img} className="d-block w-100" alt={`Slide ${index + 1}`} />
              </div>
            ))
          ) : (
            <div className="carousel-item active">
              <div
                style={{
                  height: "500px",
                  backgroundColor: "#ddd",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "20px",
                  fontWeight: "bold",
                  color: "#666",
                }}
              >
                No Image Available
              </div>
            </div>
          )}
        </div>

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
      </div>
    </section>
  );
}

export default Slider;