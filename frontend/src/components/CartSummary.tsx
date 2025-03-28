import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Tooltip } from 'bootstrap';
document.addEventListener('DOMContentLoaded', function () {
    Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]')).forEach(el => new Tooltip(el));
});

const CartSummary = () => {
    // This component displays a cart summary at the top-right corner of the page.
    // It includes the total price and quantity of items in the cart

    const navigate = useNavigate(); // Hook to navigate to different routes within the app.
    const {cart} = useCart(); // Access the cart data using the custom CartContext.

    // Calculate the total amount based on the price and quantity of all items in the cart.
    const totalAmount = cart.reduce((sum, item) => sum + (item.quantity * item.price), 0);

    // Calculate the total quantity of items in the cart.
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div 
            style={{
                // Inline styles for the cart summary container: fixed position, styled box, and shadow effect.
                position: 'fixed',
                top: '10px',
                right: '20px',
                background: '#f8f9fa',
                padding: '10px 15px',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                fontSize: '16px'
            }}
            onClick={() => navigate('/cart')} // Navigates to the cart page when clicked.
            data-bs-toggle="tooltip" data-bs-placement="top" title="Click to go to cart" // Tooltip configuration for user guidance.
        >
            {/* Display the cart total amount */}
            🛒 <strong>{totalAmount.toFixed(2)}</strong>
            {/* Add a badge to show the total quantity of items in the cart */}
            <span className="badge bg-primary ms-2">{totalQuantity}</span>
        </div>
    );
}

export default CartSummary;