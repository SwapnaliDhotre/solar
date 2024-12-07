import React from 'react';
import './PowerScreen.css';
import { useNavigate } from 'react-router-dom';

const PowerScreen = () => {
    const navigate = useNavigate();
    return (
        <div className="power-screen-container">
            <div className="header">
                <span className="back-arrow">{"<"}</span>
                <h2>Hi <strong>Dharam</strong>,</h2>
                <span onClick={() => { navigate('/marketplaceScreen'); }}>Marketplace</span>
            </div>
            
            <div className="power-info">
                <div className="power-card">
                    <h3>10 WATT</h3>
                    <p>DAILY POWER</p>
                </div>
                <div className="power-card">
                    <h3>300 WATT</h3>
                    <p>TOTAL POWER</p>
                </div>
            </div>
            
            <div className="menu">
                <div className="menu-item">
                    <span>Transactions</span>
                    <span className="arrow">▼</span>
                </div>
                <div className="menu-item">
                    <span>My <strong>NFT</strong></span>
                    <span className="arrow">▼</span>
                </div>
            </div>
            
            <div className="footer">
                <span className="footer-icon">🏠</span>
                <span className="footer-icon">👤</span>
                <span className="footer-icon">✉️</span>
                <span className="footer-icon">💲</span>
            </div>
        </div>
    );
};

export default PowerScreen;
