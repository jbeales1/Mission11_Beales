import { useState } from "react";
import BookList from "../components/BookList";
import CategoryFilter from "../components/CategoryFilter";
import WelcomeBand from "../components/WelcomeBand";
import CartSummary from "../components/CartSummary";

function BookPage () {
    // State to track the currently selected book categories for filtering the book list.
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    return (
        <div className='container mt-4'>
            {/* Fixed cart summary component positioned at the top-right corner. */}
            <CartSummary />

            {/* Welcome band component for displaying a welcome message or branding. */}
            <WelcomeBand />

            <div className='row'>
                {/* Sidebar for the category filter, displayed in a Bootstrap column layout. */}
                <div className='col-md-3'>
                    <CategoryFilter 
                        selectedCategories={selectedCategories} 
                        setSelectedCategories={setSelectedCategories}
                    />
                </div>
                {/* Main content area for displaying the filtered list of books. */}
                <div className='col-md-9'>
                    <BookList selectedCategories={selectedCategories} />
                </div>
            </div>
        </div>
    )
}

export default BookPage;