import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import axios from "axios";
import './Sales.css';
import { FaPlus } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { Pagination } from '../../components/Pagination/Pagination';

export function Sales({ isAuthorized, setIsAuthorized }) {
  useEffect(() => {
    setIsAuthorized(true);
  }, [setIsAuthorized]);

  const [sales, setSales] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  async function getSales() {
    try {
      const response = await axios.get(`/api/sales`);
      const data = await response.data.sales;
      // console.log(data);
      setSales(data);
    } catch (error) {
      console.error('Error fetching sales:', error);
    }
  }

  useEffect(() => {
    getSales();
  }, []);

  // Helper function to toggle empty state for design verification
  const toggleEmptyState = () => {
    if (sales.length === 0) {
      setSales(initialSales);
    } else {
      setSales([]);
    }
  };

  // SVG Icons
  const EyeIcon = () => (
    <svg
      className="btn-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );

  return (
    <div className="sales-page-container">
      {/* Header */}
      <Header isAuthorized={isAuthorized} />

      {/* Main Content Area */}
      <main className="sales-main">
        <div className="sales-title-bar">
          <div className="sales-title-text">
            <h1 className="sales-heading">Sales</h1>
          </div>
          <Link to="/RecordNewSale" className="btn-record-sale">
            <FaPlus /> Record New Sale
          </Link>
        </div>

        <div className="sales-content-wrapper">
          <div className="table-responsive">
            <table className="sales-table">
              <thead>
                <tr>
                  <th>Sale Name</th>
                  <th>Sale Date and Time</th>
                  <th className="actions-header">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sales.map((sale) => (
                  <tr key={sale._id}>
                    <td className="sale-name">{sale.saleName}</td>
                    <td className="sale-time">{sale.dateTime}</td>
                    <td className="sale-actions">
                      <Link to={`/Sales/${sale._id}`} className="btn-view-details">
                        <FiEye /> View Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={5}
            onPageChange={setCurrentPage}
          />
        </div>

      </main>

      {/* Footer */}
      <Footer isAuthorized={isAuthorized} />
    </div>
  );
}