import React from 'react';
import './WelcomeScreen.css';
import solarLogo from '../assets/solar.png';

const WelcomeScreen = () => {
    return (
        <div className="welcome-container">
            <div className="logo-container">
                <img src={solarLogo} alt="Solar Logo" className="logo" />
            </div>
            <h1 className="welcome-text">Welcome, <br />Green Warrior</h1>
            <p className="subtitle">Create your new Wallet.</p>
            <button className="get-started-btn">Get Started</button>
            <p className="sign-in">
                Already have an account? <span className="sign-in-link">Sign in</span>
            </p>
        </div>
    );
};

export default WelcomeScreen;
