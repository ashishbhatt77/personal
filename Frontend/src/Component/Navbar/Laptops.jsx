import { useEffect, useState } from "react";


export default function LaptopsPage() {
  const [laptops, setLaptops] = useState([]);

  useEffect(() => {
   
    fetch("http://localhost:5000/laptops")
      .then(response => setLaptops(response.data))
      .catch(error => console.error("Error fetching laptops:", error));
  }, []);

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">All Laptops</h2>
      <div className="grid grid-cols-3 gap-4">
        {laptops.map((laptop) => (
          <div key={laptop.id} className="border p-4 rounded-lg shadow">
            <img src={laptop.image} alt={laptop.name} className="w-full h-40 object-cover" />
            <h3 className="text-lg font-semibold mt-2">{laptop.name}</h3>
            <p className="text-gray-600">{laptop.brand}</p>
            <p className="font-bold text-blue-600">₹{laptop.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}