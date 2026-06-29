import { Link } from 'react-router';
import { Header } from '../../components/Header/Header';
import { IoMdNotificationsOutline } from "react-icons/io";
import { FiClock } from "react-icons/fi";
import { FiPieChart } from "react-icons/fi";
import { FiBarChart2 } from "react-icons/fi";
import { Footer } from '../../components/Footer/Footer';
import analyticsImg from '../../assets/graph.png';
import { useEffect } from 'react';
import './Home.css';

export function Home({ isAuthorized, setIsAuthorized }) {
  useEffect(() => {
    setIsAuthorized(false);
  }, []);

  return (
    <div className="home-page-container">
      {/* Header */}
      <Header isAuthorized={isAuthorized} />

      {/* Hero Section */}
      <section className="home-hero-section">
        <div className="hero-content">
          <h1 className="hero-title" data-testid="hero-title">Master Your Supply Chain</h1>

          <p className="hero-subtitle" data-testid="hero-subtitle">Because Precision Matters</p>
          <Link to="/SignUp" className="btn-get-started" data-testid="get-started-btn">Get Started</Link>
        </div>
      </section>

      {/* Intro Section */}
      <section className="home-intro-section">
        <h2 className="section-title" data-testid="intro">What is SwiftStock?</h2>
        <p className="section-description">
          Transform your daily operations with SwiftStock, a stock tracking system built specifically for the modern retailer. This platform empowers shop owners to move away from the guesswork of manual tracking that leads to capital wastage and business hindrances. By providing a centralised, web-based platform to monitor your goods, simplifies management and enhances your productivity, allowing you to focus on delivering better service to your customers. Experience the peace of mind that comes with total visibility over your stock
        </p>

        {/* Feature Cards Grid */}
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <FiPieChart size={40} />
            </div>
            <h3 className="feature-card-title" data-testid="feature-card">Real Time Monitoring</h3>
            <p className="feature-card-desc">Monitor exact quantities of goods to maintain total inventory visibility</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <FiBarChart2 size={40} />
            </div>
            <h3 className="feature-card-title">Performance Analytics</h3>
            <p className="feature-card-desc">Identify high and low demand goods to prevent dead stock</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <IoMdNotificationsOutline size={40} />
            </div>
            <h3 className="feature-card-title">Restock Notifications</h3>
            <p className="feature-card-desc">Receive alerts when stock is low to ensure timely replenishment</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <FiClock size={40} />
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
            <h2 className="details-title" data-testid="details-title">Track. Analyse. Replenish.</h2>
            <p className="details-lead">Manage inventory that matches your demand</p>
            <p className="details-desc">
              Transform your daily operations with a stock tracking system built specifically for the modern retailer. Move away from the guesswork of manual tracking that leads to capital wastage and business hindrances. Whether you are monitoring stock levels or tracking demand, we make managing your retail business effortless
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
        <h2 className="bottom-cta-title" data-testid="bottom-cta-title">Get Your Inventory on Point</h2>
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