import React, { useState, useEffect } from 'react';
import './WelcomeScreen.css';
import solarLogo from '../assets/logo.png';
import { WEB3AUTH_NETWORK } from "@web3auth/base";
import { Web3Auth } from "@web3auth/modal";
import { CommonPrivateKeyProvider } from "@web3auth/base-provider";
import { useNavigate } from 'react-router-dom';


const clientId = "BPi5PB_UiIZ-cPz1GtV5i1I2iOSOHuimiXBI0e-Oe_u6X3oVAbCiAZOTEBtTXw4tsluTITPqA8zMsfxIKMjiqNQ";

const chainConfig = {
    chainNamespace: "other",
    chainId: "0x3E9", //
    rpcTarget: "https://api.algoexplorer.io",
    // Avoid using public rpcTarget in production.
    // Use services like PureStake, AlgoExplorer API, etc.
    displayName: "Algorand Testnet",
    blockExplorerUrl: "https://testnet.algoexplorer.io",
    ticker: "tALGO",
    tickerName: "Algorand",
  };

const privateKeyProvider = new CommonPrivateKeyProvider({
    config: { chainConfig },
});

const web3AuthOptions = {
    clientId,
    web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
    privateKeyProvider,
}

const web3auth = new Web3Auth(web3AuthOptions);

(async () => {
    await web3auth.initModal();
    // You can proceed with the login and further functionalities for Algorand.
})();

const WelcomeScreen = () => {
    const [provider, setProvider] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        const init = async () => {
          try {
            await web3auth.initModal();
            setProvider(web3auth.provider);
    
            if (web3auth.connected) {
              setLoggedIn(true);
            }
          } catch (error) {
            console.error(error);
          }
        };
    
        init();
      }, []);

    const login = async () => {
        try{
          const web3authProvider = await web3auth.connect();
          setProvider(web3authProvider);
          if (web3auth.connected) {
            setLoggedIn(true);
            const user = await web3auth.getUserInfo();
            console.log("user", user);
            navigate('/PowerScreen');
          }
          
        } catch(error){
          if (error.message === "User closed the modal") {
            console.warn("User closed the login modal.");
          } else {
              console.error("Login error:", error);
          }
        }
    };

    return (
        <div className="welcome-container">
            <div className="logo-container">
                <img src={solarLogo} alt="Solar Logo" className="logo" />
            </div>
            <h1 className="welcome-text">Welcome, <br />Green Warrior</h1>
            <p className="subtitle">Create your new Wallet.</p>
            <button className="get-started-btn" onClick={login}>Get Started</button>
            <p className="sign-in">
                Already have an account? <span className="sign-in-link">Sign in</span>
            </p>
        </div>
    );
};

export default WelcomeScreen;
