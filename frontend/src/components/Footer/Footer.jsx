import './Footer.css';
import { Link } from 'react-router';

export function Footer({ isAuthorized }) {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <span className="footer-website-name">SwiftStock</span>
        </div>
        <div className="footer-links-container">
          <div className="footer-links-column">
            {!isAuthorized && (
              <>
                <Link to="/SignIn">Sign In</Link>
                <Link to="/SignUp">Sign Up</Link>
              </>
            )}
            {isAuthorized && (
              <>
                <Link to="/Analytics">Analytics</Link>
                <Link to="/Sales">Sales</Link>
                <Link to="/ManageStock">Manage Stock</Link>
                <Link to="/History">History</Link>
              </>
            )}
          </div>
          <div className="footer-links-column">
            <Link to="/Terms">Terms and Conditions</Link>
            <Link to="/Privacy">Privacy Policy</Link>
            <a href="#cookies">Manage Cookies</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 SwiftStock</p>
      </div>
    </footer>
  )
}