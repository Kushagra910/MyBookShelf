import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const MyBookShelf = () => {
  const [bookshelf, setBookshelf] = useState(() => {
    const saved = localStorage.getItem("bookShelf");
    return saved ? JSON.parse(saved) : [];
  });

  const removeFromBookshelf = (bookKey) => {
    const updatedBookshelf = bookshelf.filter((book) => book.key !== bookKey);
    setBookshelf(updatedBookshelf);
    localStorage.setItem("bookShelf", JSON.stringify(updatedBookshelf));
    toast.success("Book removed from bookshelf");
  };

  return (
    <div className="text-white  font-serif w-11/12 mx-auto pt-12  ">
      <div className="flex justify-between flex-col md:flex-row gap-4" >
        <h1 className="text-3xl font-extrabold">My Bookshelf</h1>
        <Link
          to="/"
          className="md:text-lg w-fit border rounded-lg py-2 px-2 md:px-5 hover:bg-white hover:text-black mb-6 transition-all divide-fuchsia-200"
        >
          Back to Search
        </Link>
      </div>

      <div className="flex flex-wrap gap-3 w-11/12 mx-auto">
        {bookshelf.length === 0 ? (
          <p className="text-lg mt-10">No books in your bookshelf.</p>
        ) : (
          bookshelf?.map((book) => (
            <div
              key={book.cover_i}
              className="border px-7 py-5 flex flex-col gap-3 items-center w-[250px] "
            >
              <h3>Title : {book.title}</h3>
              <p>Author :{book.author_name?.join(", ")}</p>
              <button
                onClick={() => removeFromBookshelf(book.key)}
                className="border  px-4 py-2 rounded-md hover:bg-white hover:text-black transition-all duration-200"
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyBookShelf;
