import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import axios from 'axios';
import './SignIn.css';
import { Header } from '../../../components/Header/Header';
import { Footer } from '../../../components/Footer/Footer';

export function SignIn({ isAuthorized, setIsAuthorized }) {
  useEffect(() => {
    setIsAuthorized(false);
  }, []);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
      const data = result.data;

      if (data.success) {
        setSuccess('Successfully signed in! Redirecting...');
        navigate('/Analytics');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Invalid email or password');
    }
  };

  return (
    <div className="signin-page-container">
      {/* Header */}
      <Header isAuthorized={isAuthorized} />

      {/* Main Content */}
      <main className="signin-main-content">
        <div className="signin-form-card">
          {/* Add Image Icon */}
          <h2 className="signin-title" data-testid="signin-title">Sign In</h2>

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
                data-testid="signin-email"
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
              <div className="password-input-wrapper">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  data-testid="signin-password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <FiEyeOff />
                  ) : (
                    <FiEye />
                  )}
                </button>
              </div>
            </div>

            <div className="signup-redirect">
              Don't have an account? <Link to="/SignUp" className="signup-inline-link">Sign Up</Link>
            </div>

            <button type="submit" className="btn-signin-submit" disabled={isLoading} data-testid="signin-submit">
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
        </div>
      </main>

      {/* Footer */}
      <Footer isAuthorized={isAuthorized} />
    </div>
  );
}