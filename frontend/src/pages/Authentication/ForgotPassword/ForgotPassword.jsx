import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import axios from 'axios';
import './ForgotPassword.css';
import { Header } from '../../../components/Header/Header';
import { Footer } from '../../../components/Footer/Footer';

export function ForgotPassword({ isAuthorized, setIsAuthorized }) {
  setIsAuthorized(false);

  const [email, setEmail] = useState('');
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
      const result = await axios.post('/api/auth/forgot-password', { email });
      const data = result.data;

      if (data.success) {
        setSuccess('Password reset link sent to your email. Redirecting...');
        navigate('/VerifyOTP');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Something went wrong. Please try again.');
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
    <div className="forgotpassword-page-container">
      {/* Header */}
      <Header isAuthorized={isAuthorized} />

      {/* Main Content */}
      <main className="forgotpassword-main-content">
        <div className="forgotpassword-form-card">
          <div className="website-brand">
            <span className="website-name">Website Name</span>
          </div>

          <h2 className="forgotpassword-title">Forgot Password</h2>

          <form onSubmit={handleSubmit} className="forgotpassword-form">
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

            <button type="submit" className="btn-forgot-submit" disabled={isLoading}>
              {isLoading ? 'Sending Request...' : 'Send Password Reset Request'}
            </button>

            <div className="redirect-group">
              <div className="redirect-item">
                Don't have an account? <Link to="/SignUp" className="inline-link">Sign Up</Link>
              </div>
              <div className="redirect-item">
                Already have an account? <Link to="/SignIn" className="inline-link">Sign In</Link>
              </div>
            </div>
          </form>
        </div>
      </main>

      {/* Footer */}
      <Footer isAuthorized={isAuthorized} />
    </div>
  );
}