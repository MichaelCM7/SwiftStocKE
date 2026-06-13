import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import axios from 'axios';
import './SignUp.css';
import { Header } from '../../../components/Header/Header';
import { Footer } from '../../../components/Footer/Footer';

export function SignUp({ isAuthorized, setIsAuthorized }) {
  useEffect(() => {
    setIsAuthorized(false);
  }, []);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  console.log(email);
  console.log(password);
  console.log(confirmPassword);


  function handleEmailInput(event) {
    setEmail(event.target.value)
  }

  function handlePasswordInput(event) {
    setPassword(event.target.value);
  }

  function handleConfirmPasswordInput(event) {
    setConfirmPassword(event.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      return;
    }

    try {
      const result = await axios.post('/api/auth/signup', {
        email: email,
        password: password
      });
    } catch (error) {
      alert(error || 'Something went wrong');
    }
  };

  return (
    <div className="signup-page-container">
      <Header isAuthorized={isAuthorized} />

      {/* Main Content */}
      <main className="signup-main-content">
        <div className="signup-form-card">
          <div className="website-brand">
            {/* <ImageIcon className="website-logo-icon" /> */}
            <span className="website-name">Website Name</span>
          </div>

          <h2 className="signup-title">Sign Up</h2>

          <form onSubmit={handleSubmit} className="signup-form">
            {/* {error && <div className="alert-message error-message">{error}</div>} */}
            {/* {success && <div className="alert-message success-message">{success}</div>} */}

            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={handleEmailInput}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordInput}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={handleConfirmPasswordInput}
                required
              />
            </div>

            <div className="signin-redirect">
              Already have an account? <Link to="/SignIn" className="signin-inline-link">Sign In</Link>
            </div>

            <button type="submit" className="btn-signup-submit" >
              Sign Up
            </button>
          </form>
        </div>
      </main>

      <Footer isAuthorized={isAuthorized} />
    </div>
  );
}