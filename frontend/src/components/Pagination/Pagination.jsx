import React, { useState } from 'react';
import './Pagination.css';

export function Pagination({ data, itemsPerPage, currentPage, setCurrentPage }) {
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const [startPage, setStartPage] = useState(1);
    const [endPage, setEndPage] = useState(5);

    const createPageList = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }
        return pages;
    };

    const handlePageLimitingAndRendering = () => {
        const showingPages = [];
        const availablePages = createPageList();
        if (availablePages.length > 5) {
            for (let i = startPage; i <= endPage; i++) {
                showingPages.push(
                    <button
                        key={i}
                        className={`pagination-btn ${currentPage === i ? "active" : ""}`}
                        onClick={() => handlePageClick(i)}
                    >
                        {i}
                    </button>
                );
            }
        } else {
            for (let i = 1; i <= totalPages; i++) {
                showingPages.push(
                    <button
                        key={i}
                        className={`pagination-btn ${currentPage === i ? "active" : ""}`}
                        onClick={() => handlePageClick(i)}
                    >
                        {i}
                    </button>
                );
            }
        }
        return showingPages;
    }

    const handlePageClick = (page) => {
        setCurrentPage(page);
    };

    const handlePrevious = () => {
        setCurrentPage(currentPage - 1);
        if (startPage > 1) {
            setStartPage(startPage - 1);
            setEndPage(endPage - 1);
        }

    };

    const handleNext = () => {
        setCurrentPage(currentPage + 1);
        if (endPage < totalPages && totalPages > 5) {
            setStartPage(startPage + 1);
            setEndPage(endPage + 1);
        }
    };

    // const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="pagination-container">
            <button
                className="pagination-btn arrow"
                disabled={currentPage === 1}
                onClick={handlePrevious}
            >
                &lt;
            </button>

            {/* Dynamic Page Number Buttons */}
            {/* {pages.map((page) => (
                <button
                    key={page}
                    className={`pagination-btn ${page === currentPage ? 'active' : ''}`}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </button>
            ))} */}

            {handlePageLimitingAndRendering()}

            <button
                className="pagination-btn arrow"
                disabled={currentPage === totalPages}
                onClick={handleNext}
            >
                &gt;
            </button>
        </div>
    );
}