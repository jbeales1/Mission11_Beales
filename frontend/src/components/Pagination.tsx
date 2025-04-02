interface PaginationProps {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    onPageChange: (newPage: number) => void;
    onPageSizeChange: (newSize: number) => void;
}

const Pagination = ({currentPage, totalPages, pageSize, onPageChange, onPageSizeChange}: PaginationProps) => {
    return (

        <div className="flex item-center justify-center mt-4">
            {/* Pagination controls: Previous button */}
            <button 
            onClick={() => onPageChange(currentPage - 1)} 
            disabled={currentPage === 1}>
                Previous
            </button>

            {/* Render page number buttons dynamically */}
            {[...Array(totalPages)].map((_, index) => (
                <button 
                key={index + 1} 
                onClick={() => onPageChange(index + 1)} 
                disabled={currentPage === (index + 1)}>
                    {index + 1}
                </button>
            ))}

            {/* Pagination controls: Next button */}
            <button 
            onClick={() => onPageChange(currentPage + 1)} 
            disabled={currentPage === totalPages}>
                Next
            </button>

            <br />
            <label>
                {/* Dropdown for selecting results per page */}
                Results per Page:
                <select 
                    value={pageSize} 
                    onChange={(b) => {
                        onPageSizeChange(Number(b.target.value)); // Update page size
                        onPageChange(1); // Reset to the first page
                    }}
                >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                </select>
            </label>
        </div>
        
    );
}

export default Pagination;
