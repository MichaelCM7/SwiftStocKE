import { useState } from 'react';
import { Link } from 'react-router';
import './History.css';

export function History() {
  // 10 mock history items conforming to the Figma mockup layout
  const mockHistoryData = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    itemName: `Item #${i + 1}`,
    changeType: i % 2 === 0 ? 'Stock Increased (+15)' : 'Stock Decreased (-5)',
    dateTime: new Date(Date.now() - i * 3600000).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }),
  }));

  const [historyItems, setHistoryItems] = useState(mockHistoryData);
  const [currentPage, setCurrentPage] = useState(1);

  // SVG Icons
  const ImageIcon = ({ className }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  );

  return (
    <div className="sales-page-container">
      {/* Header */}
      <header className="sales-header">
        <Link to="/" className="header-logo-container">
          <ImageIcon className="header-logo-icon" />
          <span className="project-name">Project Name</span>
        </Link>
        <nav className="sales-nav">
          <Link to="/Analytics" className="nav-item">Analytics</Link>
          <Link to="/Sales" className="nav-item">Sales</Link>
          <Link to="/ManageStock" className="nav-item">Manage Stock</Link>
          <Link to="/History" className="nav-item active">History</Link>
        </nav>
        <div className="header-buttons">
          <Link to="/SignIn" className="btn-logout">Log Out</Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="sales-main">
        <div className="sales-title-bar">
          <div className="sales-title-text">
            <h1 className="sales-heading">History</h1>
            <p className="sales-subheading">Keep Track of The Changes You Made</p>
          </div>
        </div>

        <div className="sales-content-wrapper fade-in">
          {/* History Table */}
          <div className="table-responsive">
            <table className="sales-table">
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Change</th>
                  <th>Date and Time</th>
                </tr>
              </thead>
              <tbody>
                {historyItems.map((item) => (
                  <tr key={item.id} className="table-row-animate">
                    <td className="sale-name">{item.itemName}</td>
                    <td className="change-type">{item.changeType}</td>
                    <td className="sale-time">{item.dateTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="pagination-container">
            <button className="pagination-btn arrow" disabled>&lt;</button>
            {[1, 2, 3, 4, 5].map((page) => (
              <button
                key={page}
                className={`pagination-btn ${page === currentPage ? 'active' : ''}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
            <button className="pagination-btn arrow">&gt;</button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="sales-footer">
        <div className="footer-top">
          <div className="footer-brand">
            <ImageIcon className="footer-logo-icon" />
            <span className="footer-website-name">&lt;Website Name&gt;</span>
          </div>
          <div className="footer-links-container">
            <div className="footer-links-column">
              <Link to="/Analytics">Analytics</Link>
              <Link to="/Sales">Sales</Link>
              <Link to="/ManageStock">Manage Stock</Link>
              <Link to="/History">History</Link>
              <Link to="/SignIn">Log Out</Link>
            </div>
            <div className="footer-links-column">
              <a href="#terms">Terms and Conditions</a>
              <a href="#privacy">Privacy Policy</a>
              <a href="#cookies">Manage Cookies</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>©2026 &lt;Website Name&gt;. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}