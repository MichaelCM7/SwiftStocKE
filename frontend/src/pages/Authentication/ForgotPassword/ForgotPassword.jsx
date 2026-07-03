import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import axios from 'axios';
import './ForgotPassword.css';
import { Header } from '../../../components/Header/Header';
import { Footer } from '../../../components/Footer/Footer';

export function ForgotPassword({ isAuthorized, setIsAuthorized, setPurpose }) {
  useEffect(() => {
    setIsAuthorized(false);
    setPurpose('forgotpassword');
  }, []);

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

  return (
    <div className="forgotpassword-page-container">
      {/* Header */}
      <Header isAuthorized={isAuthorized} />

      {/* Main Content */}
      <main className="forgotpassword-main-content">
        <div className="forgotpassword-form-card">

          <h2 className="forgotpassword-title" data-testid="forgot-title">Forgot Password</h2>

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
                data-testid="forgot-email"
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <button type="submit" className="btn-forgot-submit" disabled={isLoading} data-testid="forgot-submit">
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