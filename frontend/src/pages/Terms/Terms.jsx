import { useEffect } from 'react';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import './Terms.css';

export function Terms({ isAuthorized, setIsAuthorized }) {
    useEffect(() => {
        setIsAuthorized(false);
    }, [setIsAuthorized]);

    return (
        <div className="terms-page-container">
            {/* Header */}
            <Header isAuthorized={isAuthorized} />

            {/* Main Content */}
            <main className="terms-main-content">
                <div className="terms-card">
                    <h1 className="terms-title">Terms and Conditions</h1>

                    <div className="terms-section">
                        <p>Welcome to SwiftStock. By accessing or using our stock tracking application, you agree to be bound by these terms</p>
                    </div>

                    <div className="terms-section">
                        <h2>1. Purpose of Service</h2>
                        <p>SwiftStock provides inventory tracking, sales logging, and performance analytics tools. It is designed to emulate professional inventory management standards.</p>
                    </div>

                    <div className="terms-section">
                        <h2>2. Data Accuracy & Integrity</h2>
                        <p>Users are responsible for ensuring that all stock counts, item descriptions, and transaction values entered into the system are accurate. We strive to process and display analytics accurately, but do not guarantee 100% precision or database uptime.</p>
                    </div>

                    <div className="terms-section">
                        <h2>3. Account Security</h2>
                        <p>You are responsible for safeguarding your login credentials (email, password, and session tokens). We recommend using unique, strong passwords to secure your account data against unauthorized access.</p>
                    </div>

                    <div className="terms-section">
                        <h2>4. Acceptable Conduct</h2>
                        <p>You agree not to bypass security authentication systems, execute unauthorized script injections, or perform actions that disrupt database operations and overall application performance.</p>
                    </div>

                    <div className="terms-section">
                        <h2>5. Limitation of Liability</h2>
                        <p>To the maximum extent permitted by law, SwiftStock and its creators shall not be held liable for any data loss, inventory discrepancies, or business interruptions arising from the use or inability to use this system.</p>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <Footer isAuthorized={isAuthorized} />
        </div>
    );
}
