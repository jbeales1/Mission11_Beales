import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { CartItem } from "../types/CartItem";
import { Tooltip } from "bootstrap";

// Initialize tooltips on elements with the 'data-bs-toggle="tooltip"' attribute when the document is loaded.
document.addEventListener('DOMContentLoaded', function () {
    Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]')).forEach(el => new Tooltip(el));
});

function CartPage () {
    const navigate = useNavigate(); // Hook for navigating between pages.
    const {cart, removeFromCart} = useCart(); // Access the cart data and the method for removing items via the custom CartContext.

    // Calculate the total cost of items in the cart based on price and quantity.
    const totalAmount = cart.reduce((sum, item) => sum + (item.quantity * item.price), 0);

    return (
        <div>
            <h2>Your Cart</h2>
            <div> 
                {/* Conditional rendering: if the cart is empty, display a message; otherwise, show a list of cart items. */}
                {cart.length === 0 ? <p>Your cart is empty.</p> : <ul>
                    {cart.map((item: CartItem) => (
                        <li key={item.bookID}>
                            {/* Display the book title, quantity, and total price for each item in the cart. */}
                            {item.bookTitle} ({item.quantity}) : ${(item.price * item.quantity).toFixed(2)}
                            {/* Button to remove the item, with a tooltip for additional guidance. */}
                            <button onClick={() => removeFromCart(item.bookID)} data-bs-toggle="tooltip" data-bs-placement="top" title="Click to remove item">Remove</button>
                        </li>
                    ))}
                    </ul>}
            </div>
            {/* Display the total amount of the cart. */}
            <h3>Total: {totalAmount.toFixed(2)}</h3>
            {/* Button to proceed to checkout. */}
            <button>Checkout</button>
            {/* Button to return to the book list, with a tooltip for user guidance. */}
            <button onClick={() => navigate('/books')} data-bs-toggle="tooltip" data-bs-placement="top" title="Click to return to book list">Continue Browsing</button>
        </div>
    );
}

export default CartPage;