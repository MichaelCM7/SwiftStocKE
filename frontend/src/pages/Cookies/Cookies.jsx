import { useEffect } from 'react';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import './Cookies.css';

export function Cookies({ isAuthorized, setIsAuthorized }) {
    useEffect(() => {
        setIsAuthorized(false);
    }, [setIsAuthorized]);

    return (
        <div className="cookies-page-container">
            {/* Header */}
            <Header isAuthorized={isAuthorized} />

            {/* Main Content */}
            <main className="cookies-main-content">
                <div className="cookies-card">
                    <h1 className="cookies-title">Cookie Policy</h1>

                    <div className="cookies-section">
                        <p>
                            This Cookie Policy explains how SwiftStock uses cookies, why they are
                            necessary, and how they help keep your account secure and the application
                            functioning properly.
                        </p>
                    </div>

                    <div className="cookies-section">
                        <h2>1. What Are Cookies?</h2>
                        <p>
                            Cookies are small text files stored by your web browser when you visit a
                            website or web application. They allow the server to recognize your browser
                            during your session, enabling essential features such as secure authentication
                            and maintaining your login status.
                        </p>
                    </div>

                    <div className="cookies-section">
                        <h2>2. Cookies We Use</h2>
                        <p>
                            SwiftStock uses only essential cookies that are required for the application
                            to function correctly. These include:
                        </p>

                        <ul>
                            <li>
                                <strong>Session Cookies:</strong> Maintain your authenticated session
                                while you are signed in, allowing you to navigate the application
                                without having to log in repeatedly.
                            </li>

                            <li>
                                <strong>Security Cookies and Tokens:</strong> Help verify your identity
                                during authentication, including One-Time Password (OTP) verification,
                                password resets, and other security-related actions.
                            </li>
                        </ul>
                    </div>

                    <div className="cookies-section">
                        <h2>3. Cookies We Do Not Use</h2>

                        <p>
                            SwiftStock respects your privacy and does not use cookies for advertising,
                            analytics, or tracking purposes.
                        </p>

                        <p>Specifically, we do not use cookies to:</p>

                        <ul>
                            <li>Track your browsing activity across websites.</li>
                            <li>Collect analytics or usage data for marketing purposes.</li>
                            <li>Deliver personalized advertisements.</li>
                            <li>Store your geographic location or GPS information.</li>
                            <li>Build advertising or behavioral profiles.</li>
                        </ul>
                    </div>

                    <div className="cookies-section">
                        <h2>4. Cookie Duration</h2>

                        <p>
                            SwiftStock uses session cookies only. These cookies are temporary and are
                            automatically removed when you sign out or close your browser.
                        </p>

                        <p>
                            We do not use persistent cookies that remain on your device after your
                            session has ended.
                        </p>
                    </div>

                    <div className="cookies-section">
                        <h2>5. Managing Cookies</h2>

                        <p>
                            Because SwiftStock relies only on essential cookies, they cannot be
                            disabled within the application.
                        </p>

                        <p>
                            You may choose to disable cookies through your browser settings. However,
                            doing so may prevent you from signing in or using certain features of
                            SwiftStock.
                        </p>
                    </div>

                    <div className="cookies-section">
                        <h2>6. Changes to This Cookie Policy</h2>

                        <p>
                            We may update this Cookie Policy from time to time to reflect changes to
                            our services or to comply with legal requirements. Any updates will be
                            published on this page with a revised effective date.
                        </p>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <Footer isAuthorized={isAuthorized} />
        </div>
    );
}
