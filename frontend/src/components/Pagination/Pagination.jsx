// components/Pagination/Pagination.jsx
import React from 'react';
import './Pagination.css';

export function Pagination({ currentPage, totalPages = 5, onPageChange }) {
    // Generates an array of page numbers [1, 2, 3, 4, 5] dynamically based on totalPages
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="pagination-container">
            {/* Previous Arrow Button */}
            <button
                className="pagination-btn arrow"
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            >
                &lt;
            </button>

            {/* Dynamic Page Number Buttons */}
            {pages.map((page) => (
                <button
                    key={page}
                    className={`pagination-btn ${page === currentPage ? 'active' : ''}`}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </button>
            ))}

            {/* Next Arrow Button */}
            <button
                className="pagination-btn arrow"
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
            >
                &gt;
            </button>
        </div>
    );
}