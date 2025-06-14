import React from "react";

export default function Pagination({ currentPage, paginate, filteredItems, itemsPerPage }) {
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  return (
      <div className="pagination">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}>
          <i className="fas fa-chevron-left"></i>
        </button>
        {currentPage > 1 && (
          <>
            <button onClick={() => paginate(1)}>1</button>
            <span>...</span>
          </>
        )}
        <button
          className={currentPage === currentPage ? "active" : ""}
          onClick={() => paginate(currentPage)}>
          {currentPage}
        </button>
        {currentPage < Math.ceil(filteredItems.length / itemsPerPage) - 0 && (
          <>
            <span>...</span>
            <button onClick={() => paginate(Math.ceil(filteredItems.length / itemsPerPage))}>{Math.ceil(filteredItems.length / itemsPerPage)}</button>
          </>
        )}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === Math.ceil(filteredItems.length / itemsPerPage)}>
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
  );
}
