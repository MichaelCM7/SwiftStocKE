import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import './History.css';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { Pagination } from '../../components/Pagination/Pagination';

export function History({ isAuthorized, setIsAuthorized }) {
  // Wrapped in a useEffect hook to cleanly manage status authorization state modifications safely
  useEffect(() => {
    setIsAuthorized(true);
  }, [setIsAuthorized]);

  // 10 mock history items conforming to the mockup layout
  const mockHistoryData = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    itemName: `Item #${i + 1}`,
    changeType: i % 2 === 0 ? 'Stock Increased (+15)' : 'Stock Decreased (-5)',
    dateTime: new Date(Date.now() - i * 3600000).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }),
  }));

  const [historyItems, setHistoryItems] = useState(mockHistoryData);
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="history-page-container">
      {/* Header */}
      <Header isAuthorized={isAuthorized} />

      {/* Main Content */}
      <main className="history-main">
        <div className="history-title-bar">
          <div className="history-title-text">
            <h1 className="history-heading">History</h1>
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
                {historyItems.map((item) => (
                  <tr key={item.id}> {/* <-- Completely removed 'table-row-animate' */}
                    <td className="history-item-name">{item.itemName}</td>
                    <td className="history-change-type">{item.changeType}</td>
                    <td className="history-time">{item.dateTime}</td>
                  </tr>
                ))}
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