import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import axios from 'axios';
import './SignUp.css';
import { Header } from '../../../components/Header/Header';
import { Footer } from '../../../components/Footer/Footer';

export function SignUp({ isAuthorized, setIsAuthorized, setPurpose }) {
  useEffect(() => {
    setIsAuthorized(false);
    setPurpose('signup');
  }, []);

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
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const result = await axios.post('/api/auth/signup', {
        email: email,
        password: password
      });

      const data = result.data;

      if (data.success) {
        navigate("/VerifyOTP");
      }

      // console.log(data);
    } catch (error) {
      console.log(error);
      alert(error.message || 'Something went wrong');
    }
  };

  return (
    <div className="signup-page-container">
      <Header isAuthorized={isAuthorized} />

      {/* Main Content */}
      <main className="signup-main-content">
        <div className="signup-form-card">

          <h2 className="signup-title">Sign Up</h2>

          <form onSubmit={handleSubmit} className="signup-form">
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
              <label htmlFor="password">Password</label>
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

            <div className="input-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <div className="signin-redirect">
              Already have an account? <Link to="/SignIn" className="signin-inline-link">Sign In</Link>
            </div>

            <button type="submit" className="btn-signup-submit" disabled={isLoading}>
              {isLoading ? 'Signing up...' : 'Sign Up'}
            </button>
          </form>
        </div>
      </main>

      <Footer isAuthorized={isAuthorized} />
    </div>
  );
}