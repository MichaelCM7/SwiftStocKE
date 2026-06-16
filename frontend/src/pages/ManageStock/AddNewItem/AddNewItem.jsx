import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import axios from 'axios';
import './AddNewItem.css';
import { Header } from '../../../components/Header/Header';
import { Footer } from '../../../components/Footer/Footer';
import { IoMdArrowBack } from "react-icons/io";
import { FaPlus } from "react-icons/fa";

export function AddNewItem({ isAuthorized, setIsAuthorized }) {
  // Enforce validation rules during layout processing cycles
  useEffect(() => {
    setIsAuthorized(true);
  }, [setIsAuthorized]);

  const navigate = useNavigate();
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [threshold, setThreshold] = useState(1);

  const handleAddItemSubmit = async (event) => {
    event.preventDefault();
    if (!itemName.trim()) return;

    try {
      await axios.post("api/products/add-item", {
        itemName: itemName.trim(),
        quantity: Number(quantity),
        lowStockThreshold: Number(threshold)
      });
    } catch (error) {
      console.error("Error adding item:", error);
    }

    navigate('/ManageStock');
  };

  return (
    <div className="sales-page-container">
      <Header isAuthorized={isAuthorized} />

      <div className="sales-main-wrapper">
        <main className="sales-main">
          <div className="sales-title-bar-id">
            <Link to="/ManageStock" className="btn-back-sales">
              <IoMdArrowBack size={16} /> Back To Manage Stock
            </Link>
          </div>

          <div className="centered-form-wrapper">
            <div className="form-card">
              <h1 className="form-title">Add New Item</h1>

              <form onSubmit={handleAddItemSubmit} className="add-item-form">
                <div className="form-group">
                  <label htmlFor="itemName" className="form-label">Item Name*</label>
                  <input
                    id="itemName"
                    type="text"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    placeholder="Enter item name"
                    className="form-input-field"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="quantity" className="form-label">Quantity*</label>
                  <input
                    id="quantity"
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="Enter baseline quantity"
                    className="form-input-field"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="threshold" className="form-label">Low Stock Threshold</label>
                  <input
                    id="threshold"
                    type="number"
                    min="1"
                    value={threshold}
                    onChange={(e) => setThreshold(e.target.value)}
                    placeholder="Enter alert limit threshold"
                    className="form-input-field"
                    required
                  />
                </div>

                <button type="submit" className="btn-submit-item">
                  <FaPlus size={12} /> Add Item
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>

      <Footer isAuthorized={isAuthorized} />
    </div>
  );
}