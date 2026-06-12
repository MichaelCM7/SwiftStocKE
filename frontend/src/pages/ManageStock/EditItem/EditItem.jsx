import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import './EditItem.css';
import { Header } from '../../../components/Header/Header';

export function EditItem({ isAuthorized, setIsAuthorized }) {
  setIsAuthorized(true);
  const navigate = useNavigate();

  // Mock initial values for edit state
  const [itemName, setItemName] = useState('Wireless Mouse');
  const [quantity, setQuantity] = useState('50');
  const [threshold, setThreshold] = useState('10');

  const handleSubmit = (e) => {
    e.preventDefault();
    // In real app, we would update the item stock
    navigate('/ManageStock');
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

  const ArrowLeftIcon = () => (
    <svg
      className="btn-icon-back"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );

  const SaveIcon = () => (
    <svg
      className="btn-icon-save"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
      <polyline points="17 21 17 13 7 13 7 21" />
      <polyline points="7 3 7 8 15 8" />
    </svg>
  );

  return (
    <div className="sales-page-container">
      {/* Header */}
      <Header isAuthorized={isAuthorized} />

      {/* Main Content Area */}
      <main className="sales-main">
        <div className="sales-title-bar-id">
          <Link to="/ManageStock" className="btn-back-sales">
            <ArrowLeftIcon /> Back To Manage Stock
          </Link>
        </div>

        <div className="centered-form-wrapper fade-in">
          <div className="form-card">
            <h1 className="form-title">Edit Item</h1>
            <form onSubmit={handleSubmit} className="edit-item-form">
              <div className="form-group">
                <label htmlFor="itemName" className="form-label">Item Name*</label>
                <div className="select-wrapper">
                  <select
                    id="itemName"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    className="form-select"
                    required
                  >
                    <option value="" disabled>Item Name</option>
                    <option value="Wireless Mouse">Wireless Mouse</option>
                    <option value="Mechanical Keyboard">Mechanical Keyboard</option>
                    <option value="USB-C Hub">USB-C Hub</option>
                    <option value='27" LED Monitor'>27" LED Monitor</option>
                    <option value="Noise Cancelling Headphones">Noise Cancelling Headphones</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="quantity" className="form-label">Quantity*</label>
                <div className="select-wrapper">
                  <select
                    id="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="form-select"
                    required
                  >
                    <option value="" disabled>Quantity</option>
                    {Array.from({ length: 200 }, (_, i) => i + 1).map((num) => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="threshold" className="form-label">Low Stock Threshold</label>
                <div className="select-wrapper">
                  <select
                    id="threshold"
                    value={threshold}
                    onChange={(e) => setThreshold(e.target.value)}
                    className="form-select"
                  >
                    <option value="" disabled>Quantity</option>
                    {Array.from({ length: 50 }, (_, i) => i + 1).map((num) => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button type="submit" className="btn-submit-item">
                <SaveIcon /> Save Changes
              </button>
            </form>
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