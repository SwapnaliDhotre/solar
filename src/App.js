import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import WelcomeScreen from './components/WelcomeScreen';
import MarketplaceScreen from './components/MarketplaceScreen';
import PowerScreen from './components/PowerScreen';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<WelcomeScreen />} />
                    <Route path="/MarketplaceScreen" element={<MarketplaceScreen />} />
                    <Route path="/PowerScreen" element={<PowerScreen />} /> 
                </Routes>
            </div>
        </Router>
    );
}

export default App;
