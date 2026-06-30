import './Footer.css';
import { Link } from 'react-router';
import logo from '../../assets/logo.png';

export function Footer({ isAuthorized }) {
  return (
    <footer className="footer">
      <div className="footer-top">
        <Link to={isAuthorized ? "/Analytics" : "/"} className="footer-brand">
          <img className="logo-image" src={logo} alt="logo" />
          <span className="footer-website-name">SwiftStocKE</span>
        </Link>
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
            <Link to="/Cookies">Cookie Policy</Link>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 SwiftStocKE</p>
      </div>
    </footer>
  )
}