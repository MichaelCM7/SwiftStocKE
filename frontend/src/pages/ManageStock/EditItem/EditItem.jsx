import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import axios from 'axios';
import './EditItem.css';
import { Header } from '../../../components/Header/Header';
import { Footer } from '../../../components/Footer/Footer';
import { IoMdArrowBack } from "react-icons/io";
import { IoSaveOutline } from "react-icons/io5";

export function EditItem({ isAuthorized, setIsAuthorized }) {
  useEffect(() => {
    setIsAuthorized(true);
  }, []);

  const navigate = useNavigate();
  const { id } = useParams();
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [threshold, setThreshold] = useState(0);

  const fetchItemById = async () => {
    try {
      const response = await axios.get(`/api/products/get-item/${id}`);
      const data = response.data.product;
      setItemName(data.itemName);
      setQuantity(data.quantity);
      setThreshold(data.lowStockThreshold);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchItemById();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.put(`api/products/edit-items/${id}`);
      const data = response.data;
      console.log(data);
    } catch (error) {
      console.error(error);
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
            <h1 className="form-title">Edit Item</h1>
            <form onSubmit={handleSubmit} className="edit-item-form">
              <div className="form-group">
                <label htmlFor="itemName" className="form-label">Item Name*</label>
                <input
                  id="itemName"
                  type="text"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  className="form-select"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="quantity" className="form-label">Quantity*</label>
                <input
                  id="quantity"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="form-select"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="threshold" className="form-label">Low Stock Threshold</label>
                <input
                  id="threshold"
                  type="number"
                  value={threshold}
                  onChange={(e) => setThreshold(e.target.value)}
                  className="form-select"
                  required
                />
              </div>

              <button type="submit" className="btn-submit-item">
                <IoSaveOutline /> Save Changes
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