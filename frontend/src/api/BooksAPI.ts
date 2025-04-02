import { Book } from "../types/Book";

interface fetchBooksResponse {
    books: Book[];
    totalNumBooks: number;
}

const API_URL = `https://mission13beales-backend.azurewebsites.net/Book`;

// Fetch books with pagination and sorting
export const fetchBooks = async (
    pageSize: number,
    pageNum: number,
    selectedCategories: string[],
    sortOrder: string,
): Promise<fetchBooksResponse> => {

    try {
        const categoryParams = selectedCategories
            .map((cat) => `bookTypes=${encodeURIComponent(cat)}`)
            .join('&');

        const response = await fetch(
            `${API_URL}/AllBooks?pageSize=${pageSize}&pageNum=${pageNum}&sortBy=title&sortOrder=${sortOrder}${selectedCategories.length ? `&${categoryParams}` : ''}`
        );

        if (!response.ok) {
            throw new Error('Failed to fetch books');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching books:', error);
        throw error;
    }
};

// Add a new book
export const addBook = async (newBook: Book): Promise<Book> => {
    try {
        const response = await fetch(`${API_URL}/AddBook?`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newBook)
        });

        if (!response.ok) {
            throw new Error('Failed to add book');
        }

        return await response.json();
    } catch (error) {
        console.error('Error adding book', error);
        throw error;
    }
};

// Update an existing book
export const updateBook = async (bookID: number, updatedBook: Book): Promise<Book> => {
    try {
        const response = await fetch(`${API_URL}/UpdateBook/${bookID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedBook)
        });

        return await response.json();
    } catch (error) {
        console.error('Error updating project', error);
        throw error;
    }
};

// Delete a book
export const deleteBook = async (bookID: number): Promise<void> => {
    try {
        const response = await fetch(`${API_URL}/DeleteBook/${bookID}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Failed to delete book');
        }
    } catch (error) {
        console.error('Error deleting book:', error);
        throw error;
    }
};