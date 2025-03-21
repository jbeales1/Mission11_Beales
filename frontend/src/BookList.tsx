import { useEffect, useState } from "react"; // Import hooks for state and side-effects
import { Book } from "./types/Book"; // Import the Book type definition

function BookList() {
    // States for managing book data and pagination
    const [books, setBooks] = useState<Book[]>([]); // List of books
    const [pageSize, setPageSize] = useState<number>(5); // Number of books per page
    const [pageNum, setPageNum] = useState<number>(1); // Current page number
    const [totalItems, setTotalItems] = useState<number>(0); // Total number of books
    const [totalPages, setTotalPages] = useState<number>(0); // Total number of pages
    const [sortOrder, setSortOrder] = useState<string>("asc"); // Sorting order for book titles

    useEffect(() => {
        // Fetches books from the server whenever relevant state changes
        const fetchBooks = async () => {
            const response = await fetch(`https://localhost:5000/Book/AllBooks?pageSize=${pageSize}&pageNum=${pageNum}&sortBy=title&sortOrder=${sortOrder}`);
            const data = await response.json(); // Parse the JSON response
            setBooks(data.books); // Update the books state
            setTotalItems(data.totalNumBooks); // Update total item count
            setTotalPages(Math.ceil(data.totalNumBooks / pageSize)); // Calculate total pages
        };

        fetchBooks(); // Call the async function to fetch books
    }, [pageSize, pageNum, sortOrder]); // Dependencies for useEffect

    return (
        <>
            <h1>Professor Hilton's Book Collection</h1> {/* Header for the book list */}
            <br />
            
            {/* Button for toggling sorting order */}
            <button onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
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
                    </div>
                </div>
            ))}

            {/* Pagination controls: Previous button */}
            <button onClick={() => setPageNum(pageNum - 1)} disabled={pageNum === 1}>Previous</button>

            {/* Render page number buttons dynamically */}
            {[...Array(totalPages)].map((_, index) => (
                <button key={index + 1} onClick={() => setPageNum(index + 1)} disabled={pageNum === (index + 1)}>
                    {index + 1}
                </button>
            ))}

            {/* Pagination controls: Next button */}
            <button onClick={() => setPageNum(pageNum + 1)} disabled={pageNum === totalPages}>Next</button>

            <br />
            <label>
                {/* Dropdown for selecting results per page */}
                Results per Page:
                <select 
                    value={pageSize} 
                    onChange={(b) => {
                        setPageSize(Number(b.target.value)); // Update page size
                        setPageNum(1); // Reset to the first page
                    }}
                >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                </select>
            </label>
        </>
    );
}

export default BookList; // Export the component as default
