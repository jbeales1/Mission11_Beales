using Microsoft.AspNetCore.Http; // Import namespace for handling HTTP features
using Microsoft.AspNetCore.Mvc; // Import namespace for building API controllers
using Mission11_Beales.API.Data; // Import namespace for accessing the BookDbContext

namespace Mission11_Beales.API.Controllers
{
    [Route("[controller]")] // Define the route to access this controller (e.g., /Book)
    [ApiController] // Designates this class as an API controller, enabling features like model binding
    public class BookController : ControllerBase // Inherit from ControllerBase for API-specific functionality
    {
        private BookDbContext _bookContext; // Field to store the database context

        // Constructor for dependency injection of the database context
        public BookController(BookDbContext temp) 
        { 
            _bookContext = temp; // Assign the injected context to the private field
        }

        // API endpoint for retrieving books with pagination, sorting, and optional filtering
        [HttpGet("AllBooks")] // HTTP GET method at the "AllBooks" endpoint
        public IActionResult GetBooks(int pageSize = 5, int pageNum = 1, string sortBy = "title", string sortOrder = "asc")
        {
            var query = _bookContext.Books.AsQueryable(); // Convert DbSet to IQueryable for LINQ operations

            // Apply sorting based on the requested field and order
            if (sortBy.ToLower() == "title") // Check if sorting is by "title"
            {
                // Sort in descending or ascending order based on sortOrder
                query = sortOrder.ToLower() == "desc" ? query.OrderByDescending(b => b.Title) : query.OrderBy(b => b.Title);
            }

            var totalNumBooks = query.Count(); // Count the total number of books after applying sorting

            var someVariable = query // Apply pagination to the sorted query
                .Skip((pageNum - 1) * pageSize) // Skip records to reach the requested page
                .Take(pageSize) // Take the requested number of records (page size)
                .ToList(); // Convert the paginated result to a list

            var someObject = new // Create an anonymous object to return as the response
            {
                Books = someVariable, // Include the paginated list of books
                TotalNumBooks = totalNumBooks // Include the total number of books
            };

            return Ok(someObject); // Return the data wrapped in an HTTP 200 OK response
        }
    }
}
