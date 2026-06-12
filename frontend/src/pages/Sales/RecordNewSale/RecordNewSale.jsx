import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import './RecordNewSale.css';
import { Header } from '../../../components/Header/Header';

export function RecordNewSale({ isAuthorized, setIsAuthorized }) {
  setIsAuthorized(true);
  const navigate = useNavigate();

  // Stock items dropdown list
  const stockItems = [
    { id: 'item-1', name: 'Wireless Mouse', price: 25 },
    { id: 'item-2', name: 'Mechanical Keyboard', price: 75 },
    { id: 'item-3', name: 'USB-C Hub', price: 40 },
    { id: 'item-4', name: '27" LED Monitor', price: 250 },
    { id: 'item-5', name: 'Noise Cancelling Headphones', price: 150 },
  ];

  // State
  const [selectedItemName, setSelectedItemName] = useState('');
  const [selectedQuantity, setSelectedQuantity] = useState('1');
  const [soldItems, setSoldItems] = useState([
    { id: 'init-1', name: 'Item #1', quantity: 'Quantity' },
    { id: 'init-2', name: 'Item #2', quantity: 'Quantity' },
  ]);

  // Handlers
  const handleAddItem = (e) => {
    e.preventDefault();
    if (!selectedItemName) return;

    const newItem = {
      id: Date.now().toString(),
      name: selectedItemName,
      quantity: `${selectedQuantity}`,
    };

    setSoldItems([...soldItems, newItem]);
    // Reset selection inputs
    setSelectedItemName('');
    setSelectedQuantity('1');
  };

  const handleRemoveItem = (id) => {
    setSoldItems(soldItems.filter(item => item.id !== id));
  };

  const handleFinishSale = () => {
    // Navigate back to sales dashboard
    navigate('/Sales');
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

  const TrashIcon = () => (
    <svg
      className="btn-icon-trash"
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
        <div className="sales-title-bar-id">
          <Link to="/Sales" className="btn-back-sales">
            <ArrowLeftIcon /> Back To Sales
          </Link>
        </div>

        <div className="record-sale-layout fade-in">
          {/* Left Panel: Record New Sale Form */}
          <div className="record-panel form-panel">
            <h2 className="panel-title">Record New Sale</h2>
            <form onSubmit={handleAddItem} className="record-form">
              <div className="form-group">
                <label htmlFor="itemName" className="form-label">Item Name</label>
                <div className="select-wrapper">
                  <select
                    id="itemName"
                    value={selectedItemName}
                    onChange={(e) => setSelectedItemName(e.target.value)}
                    className="form-select"
                    required
                  >
                    <option value="" disabled>Item Name</option>
                    {stockItems.map((item) => (
                      <option key={item.id} value={item.name}>
                        {item.name} (${item.price})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="quantity" className="form-label">Quantity</label>
                <div className="select-wrapper">
                  <select
                    id="quantity"
                    value={selectedQuantity}
                    onChange={(e) => setSelectedQuantity(e.target.value)}
                    className="form-select"
                    required
                  >
                    <option value="" disabled>Quantity</option>
                    {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button type="submit" className="btn-add-item">
                <PlusIcon /> Add Item
              </button>
            </form>
          </div>

          {/* Right Panel: Sold Items List */}
          <div className="record-panel items-panel">
            <h2 className="panel-title">Sold Items</h2>
            <div className="sold-items-list-container">
              {soldItems.length > 0 ? (
                <div className="sold-items-list">
                  {soldItems.map((item) => (
                    <div key={item.id} className="sold-item-row table-row-animate">
                      <span className="sold-item-name">{item.name}</span>
                      <span className="sold-item-quantity">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(item.id)}
                        className="btn-delete-item"
                        title="Remove item"
                      >
                        <TrashIcon />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-sold-items">
                  <p>No items added yet</p>
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={handleFinishSale}
              className="btn-finish-sale"
              disabled={soldItems.length === 0}
            >
              Finish
            </button>
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