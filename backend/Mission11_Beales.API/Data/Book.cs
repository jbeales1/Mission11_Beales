// Represents the Book entity with properties and validation for database use

using System.ComponentModel.DataAnnotations;

namespace Mission11_Beales.API.Data
{
    public class Book
    {
        [Key]
        [Required]
        public int BookID { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public string Author { get; set; }
        [Required]
        public string Publisher { get; set; }
        [Required]
        public string ISBN { get; set; }
        [Required]
        public string Classification { get; set; }
        [Required]
        public string Category { get; set; }
        [Required]
        public int PageCount { get; set; }
        [Required]
        public decimal Price { get; set; }

    }
}
