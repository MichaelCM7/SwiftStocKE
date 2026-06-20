import { useState, useEffect } from 'react';
import axios from "axios";
import { useParams, Link } from 'react-router';
import { IoMdArrowBack } from "react-icons/io";
import './SaleID.css';
import { Header } from '../../../components/Header/Header';
import { Footer } from '../../../components/Footer/Footer';

export function SaleID({ isAuthorized, setIsAuthorized }) {
  useEffect(() => {
    setIsAuthorized(true);
  }, []);

  const [saleItems, setSaleItems] = useState([]);
  const [dateTime, setDateTime] = useState('');
  const [saleName, setSaleName] = useState('');
  const { saleID } = useParams();

  async function getSaleItems() {
    try {
      const response = await axios.get(`/api/sales/${saleID}`);
      const data = response.data.sale.items;
      const saleName = response.data.sale.saleName;
      const dateTime = response.data.sale.dateTime;
      setSaleItems(data);
      setDateTime(dateTime);
      setSaleName(saleName);
      // console.log(data);
      // console.log(dateTime);
      // console.log(saleName);
    } catch (error) {
      console.error('Error fetching sale items:', error);
    }
  }

  useEffect(() => {
    getSaleItems();
  }, []);

  return (
    <div className="sales-page-container">
      {/* Header */}
      <Header isAuthorized={isAuthorized} />

      {/* Main Content Area */}
      <main className="sales-main">
        <div className="sales-title-bar-id">
          <Link to="/Sales" className="btn-back-sales">
            <IoMdArrowBack /> Back To Sales
          </Link>
          <div className="sales-id-header">
            <h1 className="sales-heading">Sale details: {saleName}</h1>
          </div>
        </div>

        <div className="sales-content-wrapper fade-in">
          {/* Items Table */}
          <div className="table-responsive">
            <table className="sales-table">
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Item Quantity</th>
                  <th>Date and Time</th>
                </tr>
              </thead>
              <tbody>
                {saleItems.map((item) => (
                  <tr key={item.itemId} className="table-row-animate">
                    <td className="sale-name">{item.itemName}</td>
                    <td className="sale-quantity">{item.quantity}</td>
                    <td className="sale-time">{dateTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer isAuthorized={isAuthorized} />
    </div>
  );
}