import { Link, NavLink } from 'react-router'; // Ensure this is imported
import { FiImage } from "react-icons/fi";
import './Header.css';
import logo from '../../assets/logo.png';

export function Header({ isAuthorized }) {
  function handleLogOut() {
    axios.post('/api/auth/signout');
  }

  return (
    <header className="header">
      <Link to={isAuthorized ? "/Analytics" : "/"} className="header-logo-container">
        <img
          className="logo-image"
          src={logo}
          alt="logo"
        />
        <span className="project-name">SwiftStock</span>
      </Link>

      {isAuthorized && (
        <nav className="header-nav">
          {/* React Router automatically turns this into class="nav-item active" when active */}
          <NavLink to="/Analytics" className="nav-item">Analytics</NavLink>
          <NavLink to="/Sales" className="nav-item">Sales</NavLink>
          <NavLink to="/ManageStock" className="nav-item">Manage Stock</NavLink>
          <NavLink to="/History" className="nav-item">History</NavLink>
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