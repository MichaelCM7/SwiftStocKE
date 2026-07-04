import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import './History.css';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { Pagination } from '../../components/Pagination/Pagination';

export function History({ isAuthorized, setIsAuthorized }) {
  useEffect(() => {
    setIsAuthorized(true);
  }, [setIsAuthorized]);

  const [historyItems, setHistoryItems] = useState([]);
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

  const currentHistory = historyItems.slice(startIndex, endIndex);

  const getHistory = async () => {
    try {
      const response = await axios.get('/api/history/');
      const data = response.data.history;
      console.log(data);
      setHistoryItems(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getHistory();
  }, []);

  return (
    <div className="history-page-container">
      {/* Header */}
      <Header isAuthorized={isAuthorized} />

      {/* Main Content */}
      <main className="history-main">
        <div className="history-title-bar">
          <div className="history-title-text">
            <h1 className="history-heading" data-testid="history-title">History</h1>
          </div>
        </div>

        <div className="history-content-wrapper">
          {/* History Table */}
          <div className="table-responsive">
            <table className="history-table">
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Change</th>
                  <th>Date and Time</th>
                </tr>
              </thead>
              <tbody>
                {currentHistory.map((item) => (
                  <tr key={item._id}>
                    <td className="history-item-name">{item.itemName}</td>
                    <td className="history-change-type">{item.change}</td>
                    <td className="history-time">{item.dateTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Pagination
            data={historyItems}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </main>

      {/* Footer */}
      <Footer isAuthorized={isAuthorized} />
    </div>
  );
}