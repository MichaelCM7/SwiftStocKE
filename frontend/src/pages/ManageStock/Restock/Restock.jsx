import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import './Restock.css';

export function Restock() {
  const navigate = useNavigate();

  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('1');

  const handleSubmit = (e) => {
    e.preventDefault();
    // In real app, we would perform stock restock
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
      <header className="sales-header">
        <Link to="/" className="header-logo-container">
          <ImageIcon className="header-logo-icon" />
          <span className="project-name">Project Name</span>
        </Link>
        <nav className="sales-nav">
          <Link to="/Analytics" className="nav-item">Analytics</Link>
          <Link to="/Sales" className="nav-item">Sales</Link>
          <Link to="/ManageStock" className="nav-item active">Manage Stock</Link>
          <Link to="/History" className="nav-item">History</Link>
        </nav>
        <div className="header-buttons">
          <Link to="/SignIn" className="btn-logout">Log Out</Link>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="sales-main">
        <div className="sales-title-bar-id">
          <Link to="/ManageStock" className="btn-back-sales">
            <ArrowLeftIcon /> Back To Manage Stock
          </Link>
        </div>

        <div className="centered-form-wrapper fade-in">
          <div className="form-card">
            <h1 className="form-title">Restock Item</h1>
            <form onSubmit={handleSubmit} className="restock-item-form">
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

              <button type="submit" className="btn-submit-item">
                <PlusIcon /> Add Item
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