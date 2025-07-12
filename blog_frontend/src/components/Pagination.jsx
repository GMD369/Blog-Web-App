import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div className="flex justify-center items-center space-x-3">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-2 px-4 py-3 rounded-xl border-2 border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:border-indigo-500 hover:bg-indigo-50 transition-all duration-300 font-medium"
      >
        <ChevronLeft size={18} />
        Previous
      </button>
      
      {/* Page Numbers */}
      <div className="flex items-center space-x-2">
        {getPageNumbers().map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === 'number' && onPageChange(page)}
            disabled={page === '...'}
            className={`px-4 py-3 rounded-xl border-2 font-medium transition-all duration-300 ${
              page === currentPage
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-indigo-600 shadow-lg'
                : page === '...'
                ? 'border-transparent cursor-default'
                : 'border-gray-200 text-gray-700 hover:border-indigo-500 hover:bg-indigo-50 hover:shadow-md'
            }`}
          >
            {page}
          </button>
        ))}
      </div>
      
      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-2 px-4 py-3 rounded-xl border-2 border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:border-indigo-500 hover:bg-indigo-50 transition-all duration-300 font-medium"
      >
        Next
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

export default Pagination; 