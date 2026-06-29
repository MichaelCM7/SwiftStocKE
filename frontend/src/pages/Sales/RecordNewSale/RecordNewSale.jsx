import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import axios from 'axios';
import './RecordNewSale.css';
import { Header } from '../../../components/Header/Header';
import { Footer } from '../../../components/Footer/Footer';
import { FaRegTrashAlt, FaPlus } from "react-icons/fa";
import { IoMdArrowBack } from "react-icons/io";

export function RecordNewSale({ isAuthorized, setIsAuthorized }) {
  useEffect(() => {
    setIsAuthorized(true);
  }, [setIsAuthorized]);

  const navigate = useNavigate();
  const [stockItems, setStockItems] = useState([]);
  const [selectedItemName, setSelectedItemName] = useState('');
  const [selectedItemID, setSelectedItemID] = useState('');
  const [selectedQuantity, setSelectedQuantity] = useState('1');
  const [soldItems, setSoldItems] = useState([]);

  async function getStockItems() {
    try {
      const response = await axios.get('/api/products/get-items');
      const data = await response.data.products;
      // console.log(data);
      setStockItems(data);
    } catch (error) {
      console.error('Error fetching stock items:', error);
    }
  }

  useEffect(() => {
    getStockItems();
  }, []);

  const handleAddItem = (event) => {
    event.preventDefault();

    if (!selectedItemName) {
      return;
    }

    const itemExists = soldItems.find((item) => item.itemId === selectedItemID);

    if (itemExists) {
      const newQuantity = parseInt(itemExists.quantity) + parseInt(selectedQuantity);

      setSoldItems(soldItems.map(item => item.itemId === selectedItemID ? { ...item, quantity: newQuantity } : item));

      return;
    }

    const newItem = {
      itemId: selectedItemID,
      itemName: selectedItemName,
      quantity: selectedQuantity,
    };

    setSoldItems([...soldItems, newItem]);

    setSelectedItemName('');
    setSelectedQuantity('1');
  };

  function getSelectedItem(event) {
    setSelectedItemName(event.target.value);
    const item = stockItems.find((item) => item.itemName === event.target.value);
    setSelectedItemID(item._id);
  }

  const handleRemoveItem = (itemId) => {
    setSoldItems(soldItems.filter(item => item.itemId !== itemId));
  };

  const handleFinishSale = async () => {
    try {
      const response = await axios.post('/api/sales/record', { items: soldItems });
      const data = response.data;
      if (data.success) {
        navigate('/Sales');
      } else {
        console.error('Error recording sale:', data.error);
      }
    } catch (error) {
      console.error('Error recording sale:', error);
    }

  };

  return (
    <div className="sales-page-container">
      <Header isAuthorized={isAuthorized} />

      <div className="sales-main-wrapper">
        <main className="sales-main">
          <div className="sales-title-bar-id">
            <Link to="/Sales" className="btn-back-sales">
              <IoMdArrowBack /> Back To Sales
            </Link>
          </div>

          <div className="record-sale-layout">
            {/* Left Form Panel */}
            <div className="record-panel">
              <h2 className="panel-title">Record New Sale</h2>
              <form onSubmit={handleAddItem} className="record-form">
                <div className="form-group">
                  <label htmlFor="itemName" className="form-label">Item</label>
                  <div className="select-wrapper">
                    <select
                      id="itemName"
                      value={selectedItemName}
                      onChange={getSelectedItem}
                      className="form-select"
                      required
                    >
                      <option value="" disabled>Select Item</option>
                      {stockItems.map((item) => (
                        <option key={item._id} value={item.itemName}>
                          {item.itemName} ({item.quantity})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="quantity" className="form-label">Quantity</label>
                  <input
                    type="number"
                    id="quantity"
                    value={selectedQuantity}
                    onChange={(event) => setSelectedQuantity(event.target.value)}
                    className="form-select"
                    required
                  />
                </div>

                <button type="submit" className="btn-add-item">
                  <FaPlus /> Add Item
                </button>
              </form>
            </div>

            {/* Right Items Panel */}
            <div className="record-panel">
              <h2 className="panel-title">Items Issued</h2>
              <div className="sold-items-list-container">
                {soldItems.length > 0 ? (
                  <div className="sold-items-list">
                    {soldItems.map((item) => (
                      <div key={item.itemId} className="sold-item-row">
                        <span className="sold-item-name">{item.itemName}</span>
                        <span className="sold-item-quantity">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(item.itemId)}
                          className="btn-delete-item"
                          title="Remove item"
                        >
                          <FaRegTrashAlt />
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
      </div>

      <Footer isAuthorized={isAuthorized} />
    </div>
  );
}