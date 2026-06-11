import { useParams, Link } from 'react-router';
import './SaleID.css';

export function SaleID() {
  const { saleID } = useParams();

  // Mock items for the sale conforming to the Figma mockup
  const saleItems = Array.from({ length: 5 }, (_, i) => ({
    id: i + 1,
    name: `Item #${i + 1}`,
    quantity: `Quantity ${i + 1}`,
    dateTime: new Date().toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }),
  }));

  // SVG Icons
  const ImageIcon = ({ className }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  );

  const ArrowLeftIcon = () => (
    <svg
      className="btn-icon-back"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );

  return (
    <div className="sales-page-container">
      {/* Header */}
      <header className="sales-header">
        <Link to="/" className="header-logo-container">
          <ImageIcon className="header-logo-icon" />
          <span className="project-name">Project Name</span>
        </Link>
        <nav className="sales-nav">
          <Link to="/Analytics" className="nav-item">Analytics</Link>
          <Link to="/Sales" className="nav-item active">Sales</Link>
          <Link to="/ManageStock" className="nav-item">Manage Stock</Link>
          <Link to="/History" className="nav-item">History</Link>
        </nav>
        <div className="header-buttons">
          <Link to="/SignIn" className="btn-logout">Log Out</Link>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="sales-main">
        <div className="sales-title-bar-id">
          <Link to="/Sales" className="btn-back-sales">
            <ArrowLeftIcon /> Back To Sales
          </Link>
          <div className="sales-id-header">
            <h1 className="sales-heading">Sale details: #{saleID}</h1>
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
                  <tr key={item.id} className="table-row-animate">
                    <td className="sale-name">{item.name}</td>
                    <td className="sale-quantity">{item.quantity}</td>
                    <td className="sale-time">{item.dateTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="sales-footer">
        <div className="footer-top">
          <div className="footer-brand">
            <ImageIcon className="footer-logo-icon" />
            <span className="footer-website-name">&lt;Website Name&gt;</span>
          </div>
          <div className="footer-links-container">
            <div className="footer-links-column">
              <Link to="/Analytics">Analytics</Link>
              <Link to="/Sales">Sales</Link>
              <Link to="/ManageStock">Manage Stock</Link>
              <Link to="/History">History</Link>
              <Link to="/SignIn">Log Out</Link>
            </div>
            <div className="footer-links-column">
              <a href="#terms">Terms and Conditions</a>
              <a href="#privacy">Privacy Policy</a>
              <a href="#cookies">Manage Cookies</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>©2026 &lt;Website Name&gt;. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}