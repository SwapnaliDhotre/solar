import React from 'react';
import './MarketplaceScreen.css';
import solarIcon from '../assets/logo.png';

const panels = [
    { id: 1, title: "1 KW Watt Solar Panel", price: "300 USDT", energy: "8.3", atmosphere: "4", sufficiency: "5.0", flexibility: "7.6" },
    { id: 2, title: "2 KW Watt Solar Panel", price: "530 USDT", energy: "4.3", atmosphere: "7.4", sufficiency: "3.0", flexibility: "8.4" },
    { id: 3, title: "1 KW Watt Solar Panel", price: "300 USDT", energy: "8.3", atmosphere: "7.8", sufficiency: "4.0", flexibility: "8.6" },
    { id: 4, title: "2 KW Watt Solar Panel", price: "500 USDT", energy: "4.3", atmosphere: "5.4", sufficiency: "5.0", flexibility: "3.4" },
    { id: 5, title: "1 KW Watt Solar Panel", price: "300 USDT", energy: "8.3", atmosphere: "4", sufficiency: "5.0", flexibility: "7.6" },
    { id: 6, title: "1 KW Watt Solar Panel", price: "300 USDT", energy: "8.3", atmosphere: "7.8", sufficiency: "4.0", flexibility: "8.6" },
];

const MarketplaceScreen = () => {
    return (
        <div className="marketplace-container">
            <div className="balance-section">
                <span className="back-arrow">{"<"}</span>
                <div>
                    <h2>Your Balance</h2>
                    <p className="balance-amount">6000 USDT</p>
                </div>
                <span className="menu-dots">•••</span>
            </div>
            <div className="panel-grid">
                {panels.map(panel => (
                    <div key={panel.id} className="panel-card">
                        <img src={solarIcon} alt="Solar Panel Icon" className="panel-icon" />
                        <h3>{panel.title}</h3>
                        <p>Price - {panel.price}</p>
                        <p>Energy - {panel.energy}</p>
                        <p>Atmosphere - {panel.atmosphere}</p>
                        <p>Sufficiency - {panel.sufficiency}</p>
                        <p>Flexibility - {panel.flexibility}</p>
                        <button className="buy-button">BUY</button>
                    </div>
                ))}
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

export default MarketplaceScreen;
