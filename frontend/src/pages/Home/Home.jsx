import { Link } from 'react-router';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import analyticsImg from '../../assets/graph.png';
import './Home.css';

export function Home({ isAuthorized, setIsAuthorized }) {
  setIsAuthorized(false);

  // SVG Icons for Feature Cards
  const MonitoringIcon = () => (
    <svg className="feature-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
      <path d="M22 12A10 10 0 0 0 12 2v10z" />
    </svg>
  );

  const AnalyticsIcon = () => (
    <svg className="feature-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );

  const NotificationsIcon = () => (
    <svg className="feature-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );

  const HistoryIcon = () => (
    <svg className="feature-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );

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
    <div className="home-page-container">
      {/* Header */}
      <Header isAuthorized={isAuthorized} />

      {/* Hero Section */}
      <section className="home-hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Master Your Supply Chain</h1>

          <p className="hero-subtitle">Because Precision Matters</p>
          <Link to="/SignUp" className="btn-get-started">Get Started</Link>
        </div>
      </section>

      {/* Intro Section */}
      <section className="home-intro-section">
        <h2 className="section-title">What is SwiftStock?</h2>
        <p className="section-description">
          Transform your daily operations with SwiftStock, a stock tracking system built specifically for the modern retailer. This platform empowers shop owners to move away from the guesswork of manual tracking that leads to capital wastage and business hindrances. By providing a centralised, web-based platform to monitor your goods, simplifies management and enhances your productivity, allowing you to focus on delivering better service to your customers. Experience the peace of mind that comes with total visibility over your stock
        </p>

        {/* Feature Cards Grid */}
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <MonitoringIcon />
            </div>
            <h3 className="feature-card-title">Real Time Monitoring</h3>
            <p className="feature-card-desc">Monitor exact quantities of goods to maintain total inventory visibility</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <AnalyticsIcon />
            </div>
            <h3 className="feature-card-title">Performance Analytics</h3>
            <p className="feature-card-desc">Identify high and low demand goods to prevent dead stock</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <NotificationsIcon />
            </div>
            <h3 className="feature-card-title">Restock Notifications</h3>
            <p className="feature-card-desc">Receive alerts when stock is low to ensure timely replenishment</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <HistoryIcon />
            </div>
            <h3 className="feature-card-title">Stock History</h3>
            <p className="feature-card-desc">Track all items sold or taken up throughout the day</p>
          </div>
        </div>
      </section>

      {/* Track. Analyze. Replenish. Details Section */}
      <section className="home-details-section">
        <div className="details-container">
          <img
            className="details-image"
            src={analyticsImg}
            alt="Analytics Image"
          />
          <div className="details-text-content">
            <h2 className="details-title">Track. Analyse. Replenish.</h2>
            <p className="details-lead">Manage inventory that matches your demand</p>
            <p className="details-desc">
              Transform your daily operations with a stock tracking system built specifically for the modern retailer. Move away from the guesswork of manual tracking that leads to capital wastage and business hindrances. Whether you are monitoring stock levels or tracking costs, we make managing your retail business effortless
            </p>
          </div>
        </div>
      </section>

      {/* CTA Highlight Banner Card */}
      <section className="home-cta-banner-section">
        <div className="cta-banner-card">
          <h2 className="cta-banner-title">Your Optimised Stock Awaits</h2>
          <p className="cta-banner-subtitle">Track stock levels, gain demand insights, and simplify your business management</p>
          <Link to="/SignUp" className="btn-banner-get-started">Get Started</Link>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="home-how-it-works-section">
        <h2 className="section-title">How SwiftStock Works</h2>
        <p className="section-subtitle-small">Experience Total Control in 3 Simple Steps</p>

        <div className="steps-container">
          <div className="step-card">
            <div className="step-number">1</div>
            <h3 className="step-card-title">Sign Up</h3>
          </div>

          <div className="step-card">
            <div className="step-number">2</div>
            <h3 className="step-card-title">Enter<br />Stock Data</h3>
          </div>

          <div className="step-card">
            <div className="step-number">3</div>
            <h3 className="step-card-title">Monitor and <br />Optimise</h3>
          </div>
        </div>
      </section>

      {/* Bottom CTA Hook */}
      <section className="home-bottom-cta-section">
        <h2 className="bottom-cta-title">Get Your Inventory on Point</h2>
        <p className="bottom-cta-desc">
          Stop wrestling with manual tracking. Monitor your stock, analyse demand, and optimise your replenishment in seconds
        </p>
        <Link to="/SignUp" className="btn-bottom-track">Start Tracking Now</Link>
      </section>

      {/* Footer */}
      <Footer isAuthorized={isAuthorized} />
    </div>
  );
}