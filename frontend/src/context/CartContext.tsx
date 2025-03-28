import { createContext, ReactNode, useContext, useState } from "react";
import { CartItem } from "../types/CartItem";

// Define the structure of the cart context, including methods to manage the cart.
interface CartContextType {
    cart: CartItem[]; // Holds the array of items in the cart.
    addToCart: (item: CartItem) => void; // Function to add an item to the cart.
    removeFromCart: (bookId: number) => void; // Function to remove an item from the cart by its ID.
    clearCart: () => void; // Function to clear the entire cart.
}

const CartContext = createContext<CartContextType | undefined>(undefined); // Create a context with default undefined value.

export const CartProvider = ({children} : {children : ReactNode}) => {
    const [cart, setCart] = useState<CartItem[]>([]); // State to store the cart items.

    // Function to add an item to the cart.
    // If the item already exists, update its quantity; otherwise, add it as a new item.
    const addToCart = (item: CartItem) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((c) => c.bookID === item.bookID); // Check if the item already exists.
            const updatedCart = prevCart.map((c) => 
                c.bookID === item.bookID ? {...c, quantity: c.quantity + item.quantity} : c // Update quantity if item exists.
            );

            return existingItem ? updatedCart : [...prevCart, item]; // Return updated cart.
        });
    };

    // Function to remove an item from the cart by its book ID.
    const removeFromCart = (bookID: number) => {
        setCart((prevCart) => prevCart.filter((c) => c.bookID !== bookID)); // Filter out the item with the given ID.
    };

    // Function to clear all items in the cart.
    const clearCart = () => {
        setCart(() => []); // Reset the cart state to an empty array.
    };

    // Provide the cart and its related methods to children components.
    return (
        <CartContext.Provider value={{cart, addToCart, removeFromCart, clearCart}}>
            {children}
        </CartContext.Provider>
    );
};

// Hook to access the cart context.
export const useCart = () => {
    const context = useContext(CartContext); // Retrieve the context value.
    if (!context) {
        throw new Error("useCart must be used within a CartProvider"); // Error handling if used outside the provider.
    }
    return context;
};