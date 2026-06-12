import { useState } from 'react';
import { Link } from 'react-router';
import './ManageStock.css';
import { Header } from '../../components/Header/Header';

export function ManageStock({ isAuthorized, setIsAuthorized }) {
  setIsAuthorized(true);
  // Mock data of 10 stock items conforming to the Figma mockup
  const initialStock = Array.from({ length: 10 }, (_, i) => {
    const qty = [50, 15, 0, 8, 120, 2, 40, 90, 5, 200][i];
    let status = 'In Stock';
    if (qty === 0) {
      status = 'Out of Stock';
    } else if (qty <= 10) {
      status = 'Low Stock';
    }
    return {
      id: i + 1,
      name: `Item #${i + 1}`,
      quantity: qty,
      status: status,
    };
  });

  const [stock, setStock] = useState(initialStock);
  const [currentPage, setCurrentPage] = useState(1);

  const handleDelete = (id) => {
    setStock(stock.filter(item => item.id !== id));
  };

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

  const RestockIcon = () => (
    <svg
      className="btn-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
    </svg>
  );

  const PlusIcon = () => (
    <svg
      className="btn-icon"
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

  const EditIcon = () => (
    <svg
      className="btn-icon-action"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );

  const DeleteIcon = () => (
    <svg
      className="btn-icon-action"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <line x1="10" y1="11" x2="10" y2="17" />
      <line x1="14" y1="11" x2="14" y2="17" />
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
            <h1 className="sales-heading">Manage Stock</h1>
            <p className="sales-subheading">Manage Your Stock Here</p>
          </div>
          <div className="manage-stock-actions">
            <Link to="/Restock" className="btn-manage-stock-action btn-restock">
              <RestockIcon /> Restock
            </Link>
            <Link to="/AddNewItem" className="btn-manage-stock-action btn-add-new">
              <PlusIcon /> Add New Item
            </Link>
          </div>
        </div>

        <div className="sales-content-wrapper fade-in">
          {/* Stock Table */}
          <div className="table-responsive">
            <table className="sales-table">
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Quantity</th>
                  <th>Status</th>
                  <th className="actions-header-stock">Actions</th>
                </tr>
              </thead>
              <tbody>
                {stock.map((item) => (
                  <tr key={item.id} className="table-row-animate">
                    <td className="sale-name">{item.name}</td>
                    <td className="stock-qty">{item.quantity}</td>
                    <td className="stock-status">
                      <span className={`status-badge ${item.status.toLowerCase().replace(/ /g, '-')}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="stock-actions">
                      <Link to="/EditItem" className="btn-stock-action btn-edit">
                        <EditIcon /> Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="btn-stock-action btn-delete"
                      >
                        <DeleteIcon /> Delete
                      </button>
                    </td>
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
            <span className="footer-website-name">SwiftStock</span>
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
          <p>©2026 SwiftStock. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
