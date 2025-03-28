import { useEffect, useState } from "react";
import './CategoryFilter.css'

function CategoryFilter ({
    selectedCategories,
    setSelectedCategories,
} : {
    selectedCategories: string[];
    setSelectedCategories: (categories: string[]) => void;
}) {
    const [categories, setCategories] = useState<string[]>([]); // State to store the list of book categories.

    useEffect(() => {
        const fetchCategories = async () => { // Function to fetch the categories from the server.

            try {
                // Fetch category data from the server.
                const response = await fetch('https://localhost:5000/Book/GetBookTypes');
                const data = await response.json();
                console.log('Fetched categories:', data); // Log the fetched data for debugging purposes.
                setCategories(data); // Update the local state with the fetched categories.
            }
            catch (error) {
                console.error("Error fetching categories", error); // Log an error message if the fetch fails.
            }

        }

        fetchCategories(); // Call the fetch function when the component mounts.

    }, []); // Dependency array ensures this effect runs only once, on mount.

    function handleCheckboxChange ({target}: {target: HTMLInputElement}) {
        // Update the selected categories based on checkbox interactions.
        // Add the category if it's not already selected; remove it otherwise.
        const updatedCategories = selectedCategories.includes(target.value)
            ? selectedCategories.filter(x => x !== target.value)
            : [...selectedCategories, target.value];

        setSelectedCategories(updatedCategories); // Update the parent component's state.
    }

    return (
        <div className="category-filter">
            <h5>Book Categories</h5>
            <div className="category-list">
                {/* Render the list of categories as a group of checkboxes. */}
                {categories.map((c) => (
                    <div key={c} className="category-item">
                        <input 
                            type="checkbox" 
                            id={c} value={c} 
                            className="category-checkbox"
                            onChange={handleCheckboxChange}
                        />
                        <label htmlFor={c}>{c}</label> {/* Display the category name alongside the checkbox. */}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CategoryFilter;