import React, { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

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
            alert("Failed to log in: " + error.message);
        }
    }

    return (
        <div className="container" style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>🎄 Christmas List App 🎄</h1>
            <p>Sign in to manage your lists and see what others want!</p>
            <button onClick={handleLogin} style={{ fontSize: '1.2rem', padding: '15px 30px' }}>
                Sign in with Google
            </button>
        </div>
    );
}
