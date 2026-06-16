import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import './ManageStock.css';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import axios from 'axios';
import { FaRegTrashAlt } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { ImLoop2 } from "react-icons/im";

export function ManageStock({ isAuthorized, setIsAuthorized }) {
  useEffect(() => {
    setIsAuthorized(true);
  }, []);

  // Mock data of 10 stock items conforming to the Figma mockup
  // const initialStock = Array.from({ length: 10 }, (_, i) => {
  //   const qty = [50, 15, 0, 8, 120, 2, 40, 90, 5, 200][i];
  //   let status = 'In Stock';
  //   if (qty === 0) {
  //     status = 'Out of Stock';
  //   } else if (qty <= 10) {
  //     status = 'Low Stock';
  //   }
  //   return {
  //     id: i + 1,
  //     name: `Item #${i + 1}`,
  //     quantity: qty,
  //     status: status,
  //   };
  // });

  const [stock, setStock] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const stockItems = async () => {
    try {
      const response = await axios.get('/api/products/get-items');
      const data = response.data;
      // console.log(data.products);
      setStock(data.products);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    stockItems();
  }, []);

  const handleDelete = async (id) => {
    //setStock(stock.filter(item => item.id !== id));
    try {
      const response = await axios.delete(`/api/products/delete-item/${id}`);
      const data = response.data;
      // console.log(data.products);
      // setStock(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="sales-page-container">
      {/* Header */}
      <Header isAuthorized={isAuthorized} />

      {/* Main Content Area */}
      <main className="sales-main">
        <div className="sales-title-bar">
          <div className="sales-title-text">
            <h1 className="sales-heading">Manage Stock</h1>
            <p className="sales-subheading">Manage Your Stock Here</p>
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

        <div className="sales-content-wrapper fade-in">
          {/* Stock Table */}
          <div className="table-responsive">
            <table className="sales-table">
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Quantity</th>
                  <th>Status</th>
                  <th className="actions-header-stock">Actions</th>
                </tr>
              </thead>
              <tbody>
                {stock.map((item) => (
                  <tr key={item._id} className="table-row-animate">
                    <td className="sale-name">{item.itemName}</td>
                    <td className="stock-qty">{item.quantity}</td>
                    <td className="stock-status">
                      <span className={`status-badge ${item.status.toLowerCase().replace(/ /g, '-')}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="stock-actions">
                      <Link to="/EditItem" className="btn-stock-action btn-edit">
                        <FaRegEdit /> Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="btn-stock-action btn-delete"
                      >
                        <FaRegTrashAlt /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="pagination-container">
            <button className="pagination-btn arrow" disabled>&lt;</button>
            {[1, 2, 3, 4, 5].map((page) => (
              <button
                key={page}
                className={`pagination-btn ${page === currentPage ? 'active' : ''}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
            <button className="pagination-btn arrow">&gt;</button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer isAuthorized={isAuthorized} />
    </div>
  );
}
