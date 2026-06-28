import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import './ResetPassword.css';
import { Header } from '../../../components/Header/Header';
import { Footer } from '../../../components/Footer/Footer';

export function ResetPassword({ isAuthorized, setIsAuthorized }) {
  // Lock authorization boundaries safely on initial execution
  useEffect(() => {
    setIsAuthorized(false);
  }, [setIsAuthorized]);

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
      const result = await axios.post('/api/auth/reset-password', { password });
      const data = result.data;

      if (data.success) {
        setSuccess('Password reset successfully! Redirecting to sign in...');
        navigate('/SignIn');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="resetpassword-page-container">
      <Header isAuthorized={isAuthorized} />

      <div className="resetpassword-main-wrapper">
        <main className="resetpassword-main-content">
          <div className="resetpassword-form-card">
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
      </div>

      <Footer isAuthorized={isAuthorized} />
    </div>
  );
}