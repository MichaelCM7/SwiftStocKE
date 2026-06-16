import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import './Sales.css';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { Pagination } from '../../components/Pagination/Pagination';

export function Sales({ isAuthorized, setIsAuthorized }) {
  useEffect(() => {
    setIsAuthorized(true);
  }, [setIsAuthorized]);

  // Sample data conforming to the Figma mockup (10 sales)
  const initialSales = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    name: `Sale #${i + 1}`,
    dateTime: 'Sale Date and Time',
  }));

  const [sales, setSales] = useState(initialSales);
  const [currentPage, setCurrentPage] = useState(1);

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

  const PlusIcon = () => (
    <svg
      className="btn-icon-plus"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
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
            <PlusIcon /> Record New Sale
          </Link>
        </div>

        {sales.length > 0 ? (
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
                    <tr key={sale.id}> {/* <-- Confirmed no row animation classes here */}
                      <td className="sale-name">{sale.name}</td>
                      <td className="sale-time">{sale.dateTime}</td>
                      <td className="sale-actions">
                        <Link to={`/SaleID/${sale.id}`} className="btn-view-details">
                          <EyeIcon /> View Details
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
        ) : (
          /* Empty State */
          <div className="sales-empty-state">
            <h2 className="empty-state-title">No Sales Yet</h2>
            <p className="empty-state-subtitle">
              Create A Sale to See The Power of &lt;WebsiteName&gt;
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer isAuthorized={isAuthorized} />
    </div>
  );
}