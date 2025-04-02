import { useEffect, useState } from "react"; // Import hooks for state and side-effects
import { Book } from "../types/Book"; // Import the Book type definition
import { useNavigate } from "react-router-dom";
import { Tooltip } from 'bootstrap';
import { fetchBooks } from "../api/BooksAPI";
import Pagination from "./Pagination";
document.addEventListener('DOMContentLoaded', function () {
    Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]')).forEach(el => new Tooltip(el));
});

function BookList({selectedCategories}: {selectedCategories: string[]}) {
    // States for managing book data
    const [books, setBooks] = useState<Book[]>([]); // List of books
    const [pageSize, setPageSize] = useState<number>(5); // Number of books per page
    const [pageNum, setPageNum] = useState<number>(1); // Current page number
    const [totalPages, setTotalPages] = useState<number>(0); // Total number of pages
    const [sortOrder, setSortOrder] = useState<string>("asc"); // Sorting order for book titles
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetches books from the server whenever relevant state changes
        const loadBooks = async () => {

            try {
                setLoading(true);
                const data = await fetchBooks(pageSize, pageNum, selectedCategories, sortOrder)

                setBooks(data.books); // Update the books state
                setTotalPages(Math.ceil(data.totalNumBooks / pageSize)); // Calculate total pages
                } catch (error) {
                    setError((error as Error).message);
                } finally {
                    setLoading(false);
                }
            };


        loadBooks(); // Call the async function to fetch books
    }, [pageSize, pageNum, sortOrder, selectedCategories]); // Dependencies for useEffect

    if (loading) return <p>Loading books...</p>
    if (error) return <p className="text-red-500">Error: (error)</p>;

    return (
        <>
            {/* Button for toggling sorting order */}
            <button onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")} data-bs-toggle="tooltip" data-bs-placement="top" title="Click to sort books by title">
                Sort by Title ({sortOrder === "asc" ? "Ascending" : "Descending"})
            </button>

            {books.map((b) => (
                // Display individual book details inside a card
                <div id="bookCard" className="card" key={b.bookID}>
                    <h3 className="card-title">{b.title}</h3>
                    <div className="card-body">
                        <ul className="list-unstyled">
                            <li><strong>Author: </strong>{b.author}</li>
                            <li><strong>Publisher: </strong>{b.publisher}</li>
                            <li><strong>ISBN: </strong>{b.isbn}</li>
                            <li><strong>Classification/Category: </strong>{b.classification}/{b.category}</li>
                            <li><strong>Number of Pages: </strong>{b.pageCount}</li>
                            <li><strong>Price: </strong>{b.price}</li>
                        </ul>

                        <button 
                        className="btn btn-success" 
                        onClick={() => navigate(`/purchase/${b.title}/${b.price}/${b.bookID}`)} 
                        data-bs-toggle="tooltip" data-bs-placement="top" title="Click to add book to cart"
                        >
                            Add To Cart</button>

                    </div>
                </div>
            ))}

            <Pagination 
                currentPage={pageNum}
                totalPages={totalPages}
                pageSize={pageSize}
                onPageChange={setPageNum}
                onPageSizeChange={(newSize) => {
                    setPageSize(newSize);
                    setPageNum(1);
            }}
            />
        </>
    );
}

export default BookList; // Export the component as default
