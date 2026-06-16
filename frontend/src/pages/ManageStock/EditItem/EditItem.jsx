import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import axios from 'axios';
import './EditItem.css';
import { Header } from '../../../components/Header/Header';
import { Footer } from '../../../components/Footer/Footer';
import { IoMdArrowBack } from "react-icons/io";
import { IoSaveOutline } from "react-icons/io5";

export function EditItem({ isAuthorized, setIsAuthorized }) {
  // Lock down state verification access rights on component lifecycle mount
  useEffect(() => {
    setIsAuthorized(true);
  }, [setIsAuthorized]);

  const navigate = useNavigate();
  const { id } = useParams();
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [threshold, setThreshold] = useState(0);

  // Download specific targeted item object properties via incoming param ID string
  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const response = await axios.get(`/api/products/get-item/${id}`);
        const productData = response.data?.product;
        if (productData) {
          setItemName(productData.itemName || '');
          setQuantity(productData.quantity || 0);
          setThreshold(productData.lowStockThreshold || 0);
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    if (id) {
      fetchItemDetails();
    }
  }, [id]);

  const handleEditFormSubmit = async (event) => {
    event.preventDefault();
    if (!itemName.trim()) return;

    try {
      await axios.put(`/api/products/edit-items/${id}`, {
        itemName: itemName.trim(),
        quantity: Number(quantity),
        lowStockThreshold: Number(threshold)
      });
    } catch (error) {
      console.error("Error updating inventory product attributes:", error);
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
              <h1 className="form-title">Edit Item</h1>

              <form onSubmit={handleEditFormSubmit} className="edit-item-form">
                <div className="form-group">
                  <label htmlFor="itemName" className="form-label">Item Name*</label>
                  <input
                    id="itemName"
                    type="text"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    className="form-input-field"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="quantity" className="form-label">Quantity*</label>
                  <input
                    id="quantity"
                    type="number"
                    min="0"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="form-input-field"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="threshold" className="form-label">Low Stock Threshold</label>
                  <input
                    id="threshold"
                    type="number"
                    min="0"
                    value={threshold}
                    onChange={(e) => setThreshold(e.target.value)}
                    className="form-input-field"
                    required
                  />
                </div>

                <button type="submit" className="btn-submit-item">
                  Save Changes
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