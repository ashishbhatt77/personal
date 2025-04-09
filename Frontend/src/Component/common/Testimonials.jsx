import React from "react";

const testinominalData = [
  {
    img: "public/Images/us1.jpg",
    description: "Amazing product! Highly recommend.",
    title: "Ankoia soswaliya",
  },
  {
    img: "us2.jpg",
    description: "Great service and quick delivery!",
    title: "kiratea Goswami",
  },
  {
    img: "us5.jpg",
    description: "Excellent quality, very satisfied.",
    title: "ninthik jangid",
  },
  {
    img: "us6.jpg",
    description: "Will definitely shop here again!",
    title: "Whanky Shamra",
  },
];

const Testimonials = () => {
  return (
    <section id="testi" className="py-10 bg-light">
      <div className="container">
        <div className="row text-center">
          <h2 className="mb-5">Testinominal</h2>
          

          {testinominalData.map((val, index) => (
            <div className="col-md-3 mb-4" key={index}>
              <div className="card shadow-sm p-3">
                <img
                  src={`us3.jpg`}
                  alt={val.title}
                  className="card-img-top rounded-circle mx-auto d-block"
                  style={{ width: "90px", height: "90px" }}
                />
                <p className="text-muted mt-3">
                  <span>
                    <i className="bi bi-quote"></i> {val.description}{" "}
                    <i className="bi bi-quote"></i>
                  </span>
                </p>
                <div className="card-body">
                  <h5 className="card-title">{val.title}</h5>
                  <div className="text-warning">
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
