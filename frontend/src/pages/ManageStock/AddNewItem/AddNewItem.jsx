import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import axios from 'axios';
import './AddNewItem.css';
import { Header } from '../../../components/Header/Header';
import { Footer } from '../../../components/Footer/Footer';

export function AddNewItem({ isAuthorized, setIsAuthorized }) {
  setIsAuthorized(true);
  const navigate = useNavigate();

  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [threshold, setThreshold] = useState('1');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("api/products/add-item", {
        itemName: itemName,
        quantity: quantity,
        lowStockThreshold: threshold
      });


    } catch (error) {
      console.error("Error adding item:", error);
    }

    // In real app, we would dispatch API call or save stock
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
            <h1 className="form-title">Add New Item</h1>
            <form onSubmit={handleSubmit} className="add-item-form">
              <div className="form-group">
                <label htmlFor="itemName" className="form-label">Item Name*</label>
                <input
                  type='text'
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  placeholder='Item Name'
                  className='form-select'
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="quantity" className="form-label">Quantity*</label>
                <input
                  type='number'
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder='Quantity'
                  className='form-select'
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="threshold" className="form-label">Low Stock Threshold</label>
                <input
                  type='number'
                  value={threshold}
                  onChange={(e) => setThreshold(e.target.value)}
                  placeholder='Low Stock Threshold'
                  className='form-select'
                  required
                />
              </div>

              <button type="submit" className="btn-submit-item">
                <PlusIcon /> Add Item
              </button>
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer isAuthorized={isAuthorized} />
    </div>
  );
}