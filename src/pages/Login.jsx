import React, { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export default function Login() {
    const { loginWithGoogle, currentUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser) {
            navigate('/');
        }
    }, [currentUser, navigate]);

    async function handleLogin() {
        try {
            await loginWithGoogle();
            navigate('/');
        } catch (error) {
            console.error("Failed to log in", error);
            alert("SYSTEM ERROR: Authentication failed - " + error.message);
        }
    }

    return (
        <>
            {/* Scan lines overlay */}
            <div className="scan-lines"></div>

            {/* Main login container */}
            <div className="login-container">
                <div className="login-box">
                    {/* Logo with glitch effect */}
                    <h1
                        className="login-logo glitch"
                        data-text="▲ LISTY ▲"
                    >
                        ▲ LISTY ▲
                    </h1>

                    {/* Subtitle */}
                    <p className="login-subtitle">
                        YOUR FAMILY LIST SYSTEM
                    </p>

                    {/* Decorative separator */}
                    <div className="login-separator"></div>

                    {/* Sign in panel */}
                    <div className="login-panel">
                        <div className="login-panel-inner">
                            <p className="login-instruction">
                                Initialize system authentication
                            </p>

                            <button
                                onClick={handleLogin}
                                className="login-btn"
                            >
                                <span className="btn-icon">🔐</span>
                                SIGN IN WITH GOOGLE
                            </button>
                        </div>
                    </div>

                    {/* Version info */}
                    <div className="login-version">
                        SYSTEM VERSION 2.0 • RETRO-FUTURISM BUILD
                    </div>
                </div>
            </div>
        </>
    );
}
