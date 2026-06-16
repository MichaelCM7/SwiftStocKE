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
      const response = await axios.get(`api/products/get-items-by-id/${id}`);
      const data = response.data;
      setItemName(data.products.itemName);
      setQuantity(data.products.quantity);
      setThreshold(data.products.threshold);
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