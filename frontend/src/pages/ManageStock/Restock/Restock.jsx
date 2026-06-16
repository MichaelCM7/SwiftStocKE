import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import axios from 'axios';
import './Restock.css';
import { Header } from '../../../components/Header/Header';
import { Footer } from '../../../components/Footer/Footer';
import { ImLoop2 } from "react-icons/im";
import { IoMdArrowBack } from "react-icons/io";

export function Restock({ isAuthorized, setIsAuthorized }) {
  useEffect(() => {
    setIsAuthorized(true);
  }, []);

  const navigate = useNavigate();

  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState(1);
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
                  id="quantity"
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