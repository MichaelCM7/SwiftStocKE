import { Link } from 'react-router';
import './Home.css';

export function Home() {
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
      <header className="home-header">
        <div className="header-logo-container">
          <ImageIcon className="header-logo-icon" />
          <span className="project-name">Project Name</span>
        </div>
        <div className="header-buttons">
          <Link to="/SignUp" className="btn-signup-link">Sign Up</Link>
          <Link to="/SignIn" className="btn-signin-nav">Sign In</Link>
        </div>
      </header>

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
        <h2 className="section-title">What is &lt;Website Name&gt;?</h2>
        <p className="section-description">
          Transform your daily operations with &lt;Website Name&gt;, a stock tracking system built specifically for the modern retailer. This platform empowers shop owners to move away from the guesswork of manual tracking that leads to capital wastage and business hindrances. By providing a centralized, web-based platform to monitor your goods, simplifies management and enhances your productivity, allowing you to focus on delivering better service to your customers. Experience the peace of mind that comes with total visibility over your stock.
        </p>

        {/* Feature Cards Grid */}
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <MonitoringIcon />
            </div>
            <h3 className="feature-card-title">Real-Time Monitoring</h3>
            <p className="feature-card-desc">Monitor exact quantities of goods to maintain total inventory visibility.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <AnalyticsIcon />
            </div>
            <h3 className="feature-card-title">Performance Analytics</h3>
            <p className="feature-card-desc">Identify high and low demand goods to prevent dead stock.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <NotificationsIcon />
            </div>
            <h3 className="feature-card-title">Restock Notifications</h3>
            <p className="feature-card-desc">Receive alerts when stock is low to ensure timely replenishment.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <HistoryIcon />
            </div>
            <h3 className="feature-card-title">Stock History</h3>
            <p className="feature-card-desc">Track all items sold or taken up throughout the day.</p>
          </div>
        </div>
      </section>

      {/* Track. Analyze. Replenish. Details Section */}
      <section className="home-details-section">
        <div className="details-container">
          <div className="details-image-placeholder">
            {/* Visual Grid Checkerboard matching mockup */}
            <div className="checkerboard-grid"></div>
          </div>
          <div className="details-text-content">
            <h2 className="details-title">Track. Analyze. Replenish.</h2>
            <p className="details-lead">Manage inventory that matches your demand</p>
            <p className="details-desc">
              Transform your daily operations with a stock tracking system built specifically for the modern retailer. Move away from the guesswork of manual tracking that leads to capital wastage and business hindrances. Whether you are monitoring stock levels or tracking costs, we make managing your retail business effortless.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Highlight Banner Card */}
      <section className="home-cta-banner-section">
        <div className="cta-banner-card">
          <h2 className="cta-banner-title">Your Optimized Stock Awaits</h2>
          <p className="cta-banner-subtitle">Track stock levels, gain demand insights, and simplify your business management</p>
          <Link to="/SignUp" className="btn-banner-get-started">Get Started</Link>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="home-how-it-works-section">
        <h2 className="section-title">How &lt;Website Name&gt; Works</h2>
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
            <h3 className="step-card-title">Monitor &amp;<br />Optimise</h3>
          </div>
        </div>
      </section>

      {/* Bottom CTA Hook */}
      <section className="home-bottom-cta-section">
        <h2 className="bottom-cta-title">Get Your Inventory on Point</h2>
        <p className="bottom-cta-desc">
          Stop wrestling with manual tracking. Monitor your stock, analyze demand, and optimize your replenishment in seconds.
        </p>
        <Link to="/SignUp" className="btn-bottom-track">Start Tracking Now</Link>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <div className="footer-top">
          <div className="footer-brand">
            <span className="footer-website-name">&lt;Website Name&gt;</span>
          </div>
          <div className="footer-links-container">
            <div className="footer-links-column">
              <Link to="/SignIn">Sign In</Link>
              <Link to="/SignUp">Sign Up</Link>
            </div>
            <div className="footer-links-column">
              <a href="#terms">Terms and Conditions</a>
              <a href="#privacy">Privacy Policy</a>
              <a href="#cookies">Manage Cookies</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>©2026 &lt;Website Name&gt;. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}