// Jonathan Beales
// App that displays Professor Hilton's favorite books. Alows the user to filter by book category and add books to a cart. Also has an admin view that lets one Create, Read, Update, and Delete books.

import './App.css';
import BooksPage from './pages/BooksPage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PurchasePage from './pages/PurchasePage';
import CartPage from './pages/CartPage';
import { CartProvider } from './context/CartContext';
import AdminBooksPage from './pages/AdminBooksPage';

function App() {

  return (
    <>
      {/* Wrap the application in the CartProvider to provide cart context to all components. */}
      <CartProvider>
        {/* Set up routing for the application using React Router. */}
        <Router>
          <Routes>
            {/* Define the route for the main BooksPage, accessible at both '/' and '/books'. */}
            <Route path='/' element={<BooksPage />} />
            <Route path='/books' element={<BooksPage />} />
            
            {/* Define the route for the PurchasePage with dynamic URL parameters for bookTitle, price, and bookID. */}
            <Route path='/purchase/:bookTitle/:price/:bookID' element={<PurchasePage />} />
            
            {/* Define the route for the CartPage, where users can view and manage their cart items. */}
            <Route path='/cart' element={<CartPage />} />
            <Route path='/adminbooks' element={<AdminBooksPage />} />
          </Routes>
        </Router>
      </CartProvider>
    </>
  );
}

export default App;
