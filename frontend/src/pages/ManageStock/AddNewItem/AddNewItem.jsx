import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import axios from 'axios';
import './AddNewItem.css';
import { Header } from '../../../components/Header/Header';
import { Footer } from '../../../components/Footer/Footer';
import { IoMdArrowBack } from "react-icons/io";
import { FaPlus } from "react-icons/fa";

export function AddNewItem({ isAuthorized, setIsAuthorized }) {
  useEffect(() => {
    setIsAuthorized(true);
  }, []);

  const navigate = useNavigate();
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [threshold, setThreshold] = useState(1);

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

    navigate('/ManageStock');
  };

  return (
    <div className="sales-page-container">
      {/* Header */}
      <Header isAuthorized={isAuthorized} />

      {/* Main Content Area */}
      <main className="sales-main">
        <div className="sales-title-bar-id">
          <Link to="/ManageStock" className="btn-back-sales">
            <IoMdArrowBack /> Back To Manage Stock
          </Link>
        </div>

        <div className="centered-form-wrapper fade-in">
          <div className="form-card">
            <h1 className="form-title">Add New Item</h1>
            <form onSubmit={handleSubmit} className="add-item-form">
              <div className="form-group">
                <label htmlFor="itemName" className="form-label">Item Name*</label>
                <input
                  id='itemName'
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
                  id='quantity'
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
                  id='threshold'
                  type='number'
                  value={threshold}
                  onChange={(e) => setThreshold(e.target.value)}
                  placeholder='Low Stock Threshold'
                  className='form-select'
                  required
                />
              </div>

              <button type="submit" className="btn-submit-item">
                <FaPlus /> Add Item
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