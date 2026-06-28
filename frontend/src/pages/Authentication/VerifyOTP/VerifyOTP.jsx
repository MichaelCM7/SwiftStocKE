import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import './VerifyOTP.css';
import { Header } from '../../../components/Header/Header';
import { Footer } from '../../../components/Footer/Footer';

export function VerifyOTP({ isAuthorized, setIsAuthorized, purpose }) {
  // Lock authorization boundaries safely on initial execution
  useEffect(() => {
    setIsAuthorized(false);
  }, [setIsAuthorized]);

  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otp.trim()) return;

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const targetPurpose = purpose === 'forgotpassword' ? 'forgotpassword' : 'signup';
      const result = await axios.post('/api/auth/verify-otp', {
        otp: otp.trim(),
        purpose: targetPurpose
      });
      const data = result.data

      if (data.success) {
        setSuccess('OTP verified successfully! Redirecting...');

        if (data.purpose === 'signup') {
          navigate('/Analytics');
        } else {
          navigate('/ResetPassword');
        }
      }

    } catch (err) {
      setError(err.response?.data?.message || 'Invalid OTP code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('/api/auth/resend-otp');
      if (response.status === 200) {
        setSuccess('A new OTP has been sent to your email.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to resend OTP. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="verifyotp-page-container">
      <Header isAuthorized={isAuthorized} />

      <div className="verifyotp-main-wrapper">
        <main className="verifyotp-main-content">
          <div className="verifyotp-form-card">
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
                  autoComplete="one-time-code"
                />
              </div>

              <button type="submit" className="btn-verifyotp-submit" disabled={isLoading}>
                {isLoading ? 'Verifying...' : 'Verify OTP'}
              </button>

              <div className="resend-redirect">
                Didn't receive an email?{' '}
                <a href="" onClick={handleResendOtp} className="resend-inline-link">
                  Resend OTP
                </a>
              </div>
            </form>
          </div>
        </main>
      </div>

      <Footer isAuthorized={isAuthorized} />
    </div>
  );
}