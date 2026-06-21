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
  const itemsPerPage = 10;
  const [startIndex, setStartIndex] = useState(itemsPerPage * (currentPage - 1));
  const [endIndex, setEndIndex] = useState(itemsPerPage * currentPage);

  useEffect(() => {
    const newStartIndex = itemsPerPage * (currentPage - 1);
    const newEndIndex = itemsPerPage * currentPage;
    setStartIndex(newStartIndex);
    setEndIndex(newEndIndex);
  }, [currentPage]);

  const currentStock = stock.slice(startIndex, endIndex);

  const fetchStockItems = async () => {
    try {
      const response = await axios.get('/api/products/get-items');
      if (response.data?.products) {
        setStock(response.data.products);
      }
    } catch (error) {
      console.error("Error loading stock registry database records:", error);
    }
  };

  useEffect(() => {
    fetchStockItems();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/products/delete-items/${id}`);
      setStock(prevStock => prevStock.filter(item => item._id !== id));
    } catch (error) {
      console.error("Error purging selected stock tracking node:", error);
    }
  };

  const getBadgeModifier = (status) => {
    const cleanStatus = (status || '').toLowerCase().trim();
    if (cleanStatus.includes('low')) return 'analytics-status-badge--low';
    if (cleanStatus.includes('out')) return 'analytics-status-badge--out';
    if (cleanStatus.includes('moderate')) return 'analytics-status-badge--moderate';
    return 'analytics-status-badge--good';
  };

  return (
    <div className="manage-stock-page-container">
      <Header isAuthorized={isAuthorized} />

      <div className="manage-stock-main-wrapper">
        <main className="manage-stock-main">
          <div className="manage-stock-title-bar">
            <div className="manage-stock-title-text">
              <h1 className="manage-stock-heading">Manage Stock</h1>
            </div>
            <div className="manage-stock-actions">
              <Link to="/Restock" className="btn-manage-stock-action">
                <ImLoop2 size={13} /> Restock
              </Link>
              <Link to="/AddNewItem" className="btn-manage-stock-action">
                <FaPlus size={12} /> Add New Item
              </Link>
            </div>
          </div>

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
                    currentStock.map((item) => (
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
                              <FaRegEdit size={14} /> Edit
                            </Link>
                            <button
                              type="button"
                              onClick={() => handleDelete(item._id)}
                              className="btn-stock-action btn-delete"
                            >
                              <FaRegTrashAlt size={13} /> Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" style={{ textAlign: 'center', padding: '32px', color: '#666666', fontWeight: 500 }}>
                        No stock items found in database registry.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <Pagination
              data={stock}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </main>
      </div>

      <Footer isAuthorized={isAuthorized} />
    </div>
  );
}