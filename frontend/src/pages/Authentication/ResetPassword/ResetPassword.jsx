import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import axios from 'axios';
import './ResetPassword.css';
import { Header } from '../../../components/Header/Header';
import { Footer } from '../../../components/Footer/Footer';

export function ResetPassword({ isAuthorized, setIsAuthorized }) {
  setIsAuthorized(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setIsLoading(false);
      return;
    }

    try {
      const result = await axios.post('/api/auth/reset-password', { email, password });
      const data = result.data;

      if (data.success) {
        setSuccess('Password reset successfully! Redirecting to sign in...');
        navigate('/SignIn');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Something went wrong. Please try again.');
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
    <div className="resetpassword-page-container">
      {/* Header */}
      <Header isAuthorized={isAuthorized} />

      {/* Main Content */}
      <main className="resetpassword-main-content">
        <div className="resetpassword-form-card">
          <div className="website-brand">
            <span className="website-name">Website Name</span>
          </div>

          <h2 className="resetpassword-title">Reset Password</h2>

          <form onSubmit={handleSubmit} className="resetpassword-form">
            {error && <div className="alert-message error-message">{error}</div>}
            {success && <div className="alert-message success-message">{success}</div>}

            <div className="input-group">
              <label htmlFor="password">New Password</label>
              <input
                id="password"
                type="password"
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <div className="input-group">
              <label htmlFor="confirmPassword">Verify Password</label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Verify Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <button type="submit" className="btn-reset-submit" disabled={isLoading}>
              {isLoading ? 'Resetting Password...' : 'Reset Password'}
            </button>
          </form>
        </div>
      </main>

      {/* Footer */}
      <Footer isAuthorized={isAuthorized} />
    </div>
  );
}