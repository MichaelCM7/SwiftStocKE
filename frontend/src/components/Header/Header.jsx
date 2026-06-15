import { Link } from 'react-router';
import { FiImage } from "react-icons/fi";
import './Header.css';

export function Header({ isAuthorized }) {
  function handleLogOut() {
    axios.post('/api/auth/signout');
  }

  return (
    <header className="header">
      <Link to={isAuthorized ? "/Analytics" : "/"} className="header-logo-container">
        <FiImage className="header-logo-icon" />
        <span className="project-name">SwiftStock</span>
      </Link>

      {isAuthorized && (
        <nav className="header-nav">
          <Link to="/Analytics" className="nav-item">Analytics</Link>
          <Link to="/Sales" className="nav-item">Sales</Link>
          <Link to="/ManageStock" className="nav-item">Manage Stock</Link>
          <Link to="/History" className="nav-item">History</Link>
        </nav>
      )}

      <div className="header-buttons">
        {isAuthorized && (
          <Link to="/SignIn" className="btn-logout" onClick={handleLogOut}>Log Out</Link>
        )}

        {!isAuthorized && (
          <>
            <Link to="/SignUp" className="btn-signup">Sign Up</Link>
            <Link to="/SignIn" className="btn-signin">Sign In</Link>
          </>
        )}
      </div>
    </header>
  );
}