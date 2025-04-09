import { useEffect, useState } from "react";


export default function BooksPage() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
   
   fetch("http://localhost:5000/books")
      .then(response => setBooks(response.data))
      .catch(error => console.error("Error fetching books:", error));
  }, []);

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">All Books</h2>
      <div className="grid grid-cols-3 gap-4">
        {books.map((book) => (
          <div key={book.id} className="border p-4 rounded-lg shadow">
            <img src={book.image} alt={book.title} className="w-full h-40 object-cover" />
            <h3 className="text-lg font-semibold mt-2">{book.title}</h3>
            <p className="text-gray-600">{book.author}</p>
            <p className="font-bold text-blue-600">₹{book.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}