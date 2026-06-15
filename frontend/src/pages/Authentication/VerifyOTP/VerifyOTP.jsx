import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import axios from 'axios';
import './VerifyOTP.css';
import { Header } from '../../../components/Header/Header';
import { Footer } from '../../../components/Footer/Footer';

export function VerifyOTP({ isAuthorized, setIsAuthorized }) {
  setIsAuthorized(false);

  const [otp, setOtp] = useState('');
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
      const result = await axios.post('/api/auth/verify-otp', { otp });
      const data = result.data;

      if (data.success) {
        setSuccess('OTP verified successfully! Redirecting...');
        navigate('/Analytics');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Invalid OTP code. Please try again.');
    }
  };

  const handleResendOtp = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await axios.post('/api/auth/resend-otp');
      setSuccess('A new OTP has been sent to your email.');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to resend OTP. Please try again later.');
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
    <div className="verifyotp-page-container">
      {/* Header */}
      <Header isAuthorized={isAuthorized} />

      {/* Main Content */}
      <main className="verifyotp-main-content">
        <div className="verifyotp-form-card">
          <div className="website-brand">
            <span className="website-name">Website Name</span>
          </div>

          <h2 className="verifyotp-title">Verify OTP</h2>

          <p className="verifyotp-subtitle">A One Time Password has been sent to your email</p>

          <form onSubmit={handleSubmit} className="verifyotp-form">
            {error && <div className="alert-message error-message">{error}</div>}
            {success && <div className="alert-message success-message">{success}</div>}

            <div className="input-group">
              <label htmlFor="otp">Verify OTP</label>
              <input
                id="otp"
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <button type="submit" className="btn-verifyotp-submit" disabled={isLoading}>
              {isLoading ? 'Verifying...' : 'Verify OTP'}
            </button>

            <div className="resend-redirect">
              Didn't receive an email?{' '}
              <a href="#resend" onClick={handleResendOtp} className="resend-inline-link">
                Resend OTP
              </a>
            </div>
          </form>
        </div>
      </main>

      {/* Footer */}
      <Footer isAuthorized={isAuthorized} />
    </div>
  );
}