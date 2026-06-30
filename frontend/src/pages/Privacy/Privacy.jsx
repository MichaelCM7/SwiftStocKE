import { useEffect } from 'react';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import './Privacy.css';

export function Privacy({ isAuthorized, setIsAuthorized }) {
    useEffect(() => {
        setIsAuthorized(false);
    }, [setIsAuthorized]);

    return (
        <div className="privacy-page-container">
            {/* Header */}
            <Header isAuthorized={isAuthorized} />

            {/* Main Content */}
            <main className="privacy-main-content">
                <div className="privacy-card">
                    <h1 className="privacy-title">Privacy Policy</h1>

                    <div className="privacy-section">
                        <p>This Privacy Policy outlines how we collect, process, and protect your information when utilizing SwiftStocKE.</p>
                    </div>

                    <div className="privacy-section">
                        <h2>1. Data We Collect</h2>
                        <p>We collect essential account details during registration (email and password) alongside user generated dashboard data, including stock items, restock logs, and sales transaction metrics.</p>
                    </div>

                    <div className="privacy-section">
                        <h2>2. How We Use Data</h2>
                        <p>Your inputs are processed to operate system features, such as generating real time analytics graphs, maintaining active stock counts, detailing transaction histories, and securing active sessions.</p>
                    </div>

                    <div className="privacy-section">
                        <h2>3. Data Security & Storage</h2>
                        <p>We employ standard database hashing and security practices to secure user accounts. However, we recommend that you do not input highly sensitive corporate financial details or active personal passwords.</p>
                    </div>

                    <div className="privacy-section">
                        <h2>4. Data Sharing & Third Parties</h2>
                        <p>We do not share, sell, or rent your database records to third parties. All registered information is kept confidential.</p>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <Footer isAuthorized={isAuthorized} />
        </div>
    );
}
