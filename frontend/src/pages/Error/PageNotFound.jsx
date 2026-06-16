import { Link } from 'react-router';
import './PageNotFound.css';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';

export function PageNotFound({ isAuthorized = true }) {
  return (
    <div className="not-found-page-container">
      {/* Global Header */}
      <Header isAuthorized={isAuthorized} />

      {/* Main Content Layout Canvas */}
      <main className="not-found-main">
        <div className="not-found-content-card">
          <h1 className="not-found-code">404</h1>
          <h2 className="not-found-title">Page Not Found</h2>
          <p className="not-found-subtitle">
            The page you are looking for doesn't exist or has been moved
          </p>

          {/* Consistent Action Button Blueprint */}
          <Link to="/" className="btn-not-found-home">
            Go Back Home
          </Link>
        </div>
      </main>

      {/* Global Footer */}
      <Footer isAuthorized={isAuthorized} />
    </div>
  );
}