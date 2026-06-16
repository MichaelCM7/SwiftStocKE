import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import axios from 'axios';
import './Restock.css';
import { Header } from '../../../components/Header/Header';
import { Footer } from '../../../components/Footer/Footer';
import { ImLoop2 } from "react-icons/im";

export function Restock({ isAuthorized, setIsAuthorized }) {
  useEffect(() => {
    setIsAuthorized(true);
  }, []);

  const navigate = useNavigate();

  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [items, setItems] = useState([]);

  const getAllItems = async () => {
    try {
      const response = await axios.get("api/products/get-items");
      const data = response.data;
      setItems(data.products);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  useEffect(() => {
    getAllItems();
  }, []);


  console.log(items);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.put("api/products/restock-item", {
        itemName: itemName,
        quantity: quantity
      });
      const data = response.data;
      console.log(data);
    } catch (error) {
      console.error("Error restocking item:", error);
    }

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
                    <option value="" disabled>Select an Item</option>
                    {items.map((item) => {
                      console.log(item);
                      return <option key={item._id} value={item.itemName}>{item.itemName}</option>
                    })}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="quantity" className="form-label">Quantity*</label>
                <input
                  type='number'
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className='form-select'
                  required
                />
              </div>

              <button type="submit" className="btn-submit-item">
                <ImLoop2 /> Restock Item
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