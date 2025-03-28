import { useNavigate, useParams } from "react-router-dom";
import WelcomeBand from "../components/WelcomeBand";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { CartItem } from "../types/CartItem";
import { Tooltip } from 'bootstrap';

// Initialize tooltips for elements with the 'data-bs-toggle="tooltip"' attribute when the document is loaded.
document.addEventListener('DOMContentLoaded', function () {
    Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]')).forEach(el => new Tooltip(el));
});

function PurchasePage () {
    const navigate = useNavigate(); // Hook for navigation between routes.
    const {bookTitle, bookID, price} = useParams(); // Retrieve parameters passed via the URL.
    const {addToCart} = useCart(); // Access the context method to add items to the cart.
    const [quantity, setQuantity] = useState<number>(0); // State for tracking the quantity of the book to be added to the cart.

    const handleAddToCart = () => {
        // Create a new CartItem object based on the user input and URL parameters.
        const newItem: CartItem = {
            bookID: Number(bookID), // Convert the book ID from string to number.
            bookTitle: bookTitle || "No Project Found", // Use a fallback title if no bookTitle is provided.
            quantity, // User-specified quantity for the item.
            price: Number(price) // Convert the price from string to number.
        };
        addToCart(newItem); // Add the item to the cart using the context method.
        navigate('/cart'); // Redirect the user to the cart page.
    };

    return (
        <>
            {/* Component to display the welcome banner or branding. */}
            <WelcomeBand />
            {/* Display the title and price of the selected book. */}
            <h2>{bookTitle} </h2>
            <h5>${price}</h5>

            <div>
                {/* Input field to specify the quantity of the book to add to the cart. */}
                <input type="number" placeholder="Enter Quantity" value={quantity} onChange={(x) => setQuantity(Number(x.target.value))}/>
                {/* Button to add the selected book to the cart, with tooltip for guidance. */}
                <button onClick={handleAddToCart} data-bs-toggle="tooltip" data-bs-placement="top" title="Click to add to cart">Add to Cart</button>
            </div>

            {/* Button to navigate back to the previous page, with tooltip for guidance. */}
            <button onClick={() => navigate(-1)} data-bs-toggle="tooltip" data-bs-placement="top" title="Click to return to book list page">Go Back</button>
        </>
    );
};

export default PurchasePage;