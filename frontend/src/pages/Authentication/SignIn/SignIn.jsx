import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import axios from 'axios';
import './SignIn.css';

export function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const result = await axios.post('/api/auth/signin', { email, password });

      if (result.data.success) {
        setSuccess('Successfully signed in! Redirecting...');
        setTimeout(() => {
          navigate('/Home'); // Or whichever default page is appropriate
        }, 1500);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  // Modern mountain-image SVG Icon matching Figma placeholders
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

  return (
    <div className="signin-page-container">
      {/* Header */}
      <header className="signin-header">
        <div className="header-logo-container">
          <ImageIcon className="header-logo-icon" />
          <span className="project-name">Project Name</span>
        </div>
        <div className="header-buttons">
          <Link to="/SignUp" className="btn-signup-link">Sign Up</Link>
          <Link to="/SignIn" className="btn-signin-nav">Sign In</Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="signin-main-content">
        <div className="signin-form-card">
          <div className="website-brand">
            <span className="website-name">Website Name</span>
          </div>

          <h2 className="signin-title">Sign In</h2>

          <form onSubmit={handleSubmit} className="signin-form">
            {error && <div className="alert-message error-message">{error}</div>}
            {success && <div className="alert-message success-message">{success}</div>}

            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <div className="input-group">
              <div className="password-label-row">
                <label htmlFor="password">Password</label>
                <Link to="/ForgotPassword" className="forgot-password-link">Forgot Password?</Link>
              </div>
              <input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <div className="signup-redirect">
              Don't have an account? <Link to="/SignUp" className="signup-inline-link">Sign Up</Link>
            </div>

            <button type="submit" className="btn-signin-submit" disabled={isLoading}>
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="signin-footer">
        <div className="footer-top">
          <div className="footer-brand">
            <span className="footer-website-name">&lt;Website Name&gt;</span>
          </div>
          <div className="footer-links-container">
            <div className="footer-links-column">
              <Link to="/SignIn">Sign In</Link>
              <Link to="/SignUp">Sign Up</Link>
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