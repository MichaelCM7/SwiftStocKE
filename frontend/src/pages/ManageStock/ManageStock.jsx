import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import './ManageStock.css';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { Pagination } from '../../components/Pagination/Pagination';
import axios from 'axios';
import { FaRegTrashAlt, FaRegEdit, FaPlus } from "react-icons/fa";
import { ImLoop2 } from "react-icons/im";

export function ManageStock({ isAuthorized, setIsAuthorized }) {
  useEffect(() => {
    setIsAuthorized(true);
  }, [setIsAuthorized]);

  const [stock, setStock] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const stockItems = async () => {
    try {
      const response = await axios.get('/api/products/get-items');
      const data = response.data;
      setStock(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    stockItems();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/products/delete-items/${id}`);
      setStock(stock.filter(item => item._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const getBadgeModifier = (status) => {
    const cleanStatus = status.toLowerCase().trim();
    if (cleanStatus.includes('low')) return 'analytics-status-badge--low';
    if (cleanStatus.includes('out')) return 'analytics-status-badge--out';
    if (cleanStatus.includes('moderate')) return 'analytics-status-badge--moderate';
    return 'analytics-status-badge--good';
  };

  return (
    <div className="manage-stock-page-container">
      {/* Header */}
      <Header isAuthorized={isAuthorized} />

      {/* Main Content Area */}
      <main className="manage-stock-main">
        <div className="manage-stock-title-bar">
          <div className="manage-stock-title-text">
            <h1 className="manage-stock-heading">Manage Stock</h1>
          </div>
          <div className="manage-stock-actions">
            <Link to="/Restock" className="btn-manage-stock-action btn-restock">
              <ImLoop2 /> Restock
            </Link>
            <Link to="/AddNewItem" className="btn-manage-stock-action btn-add-new">
              <FaPlus /> Add New Item
            </Link>
          </div>
        </div>

        {/* ONE SINGLE WRAPPER FOR THE WHOLE TABLE BLOCK */}
        <div className="analytics-table-wrapper">
          <div className="table-responsive">
            <table className="analytics-table">
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Quantity</th>
                  <th>Status</th>
                  <th className="actions-header-stock">Actions</th>
                </tr>
              </thead>
              <tbody>
                {stock.length > 0 ? (
                  stock.map((item) => (
                    <tr key={item._id}>
                      <td className="manage-stock-item-name">{item.itemName}</td>
                      <td className="manage-stock-qty">{item.quantity}</td>
                      <td>
                        <span className={`analytics-status-badge ${getBadgeModifier(item.status)}`}>
                          {item.status}
                        </span>
                      </td>
                      <td>
                        <div className="stock-actions">
                          <Link to={`/EditItem/${item._id}`} className="btn-stock-action btn-edit">
                            <FaRegEdit /> Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(item._id)}
                            className="btn-stock-action btn-delete"
                          >
                            <FaRegTrashAlt /> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" style={{ textAlign: 'center', padding: '24px', color: '#666' }}>
                      No stock items found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={5}
            onPageChange={setCurrentPage}
          />
        </div>
      </main>

      {/* Footer */}
      <Footer isAuthorized={isAuthorized} />
    </div>
  );
}