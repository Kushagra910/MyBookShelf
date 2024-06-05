import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../components/Card";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [apiData, setApiData] = useState([]);
  const [query, setQuery] = useState("");
  const [bookShelf, setBookShelf] = useState(() => {
    const saved = localStorage.getItem("bookShelf");
    return saved ? JSON.parse(saved) : [];
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.length > 2) {
      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await axios.get(
            `https://openlibrary.org/search.json?q=${query}&limit=10&page=1`
          );
          setApiData(response.data.docs);
        } catch (error) {
          console.error("Error fetching data", error);
          toast.error("Failed to fetch books");
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    } else {
      setApiData([]);
    }
  }, [query]);

  const addToBookshelf = (book) => {
    if (bookShelf.some((b) => b.key === book.key)) {
      toast.error("Book already in the bookshelf");
      return;
    }
    const newBookshelf = [...bookShelf, book];
    setBookShelf(newBookshelf);
    localStorage.setItem("bookShelf", JSON.stringify(newBookshelf));
    toast.success("Book added to bookshelf");
  };

  return (
    <div className="text-white flex flex-col justify-center pt-12 w-11/12 mx-auto font-serif">
      <div className="flex flex-col md:flex-row gap-5 md:gap-2 justify-between text-white mb-12">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">Search By Book Name</h1>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for books..."
            className="py-2 rounded-xl focus:outline-none text-black px-3 focus:border-gray-400 transition-all duration-100"
          />
        </div>
        <div className="text-lg font-semibold">
          <Link to="/bookShelf">
            <button className="border py-2 px-5 rounded-md hover:bg-blue-50 hover:text-black transition-all duration-200">
              Go To My BookShelf
            </button>
          </Link>
        </div>
      </div>

      <div className="w-11/12 mx-auto">
        {loading ? (
            <div className="w-full h-[400px] flex items-center justify-center">
            <div className="spinner">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
            </div>
        ) : query.length >= 2 ? (
          apiData.length > 0 ? (
            <div className="flex flex-wrap gap-4">
              {apiData.map((book) => (
                <Card key={book.key} book={book} handler={addToBookshelf} />
              ))}
            </div>
          ) : (
            <div className="h-[300px] flex items-center justify-center">
              No books found for this name
            </div>
          )
        ) : (
          <div className="h-[300px] flex items-center justify-center">
            Start typing to search for books
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
