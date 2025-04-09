import { useEffect, useState } from "react";


export default function FashionPage() {
  const [fashionItems, setFashionItems] = useState([]);

  useEffect(() => {
   
    fetch("http://localhost:5000/fashion")
      .then(response => setFashionItems(response.data))
      .catch(error => console.error("Error fetching fashion items:", error));
  }, []);

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Fashion Collection</h2>
      <div className="grid grid-cols-3 gap-4">
        {fashionItems.map((item) => (
          <div key={item.id} className="border p-4 rounded-lg shadow">
            <img src={item.image} alt={item.name} className="w-full h-40 object-cover" />
            <h3 className="text-lg font-semibold mt-2">{item.name}</h3>
            <p className="text-gray-600">{item.brand}</p>
            <p className="font-bold text-blue-600">₹{item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}