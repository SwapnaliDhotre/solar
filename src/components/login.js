import React, { useState, useEffect } from 'react';
import './login.css';
import logo from '../assets/solar.png';
import { WEB3AUTH_NETWORK } from "@web3auth/base";
import { Web3Auth } from "@web3auth/modal";
import { CommonPrivateKeyProvider } from "@web3auth/base-provider";
import { getDefaultExternalAdapters } from "@web3auth/default-evm-adapter"; // Import added

const clientId = "BPi5PB_UiIZ-cPz1GtV5i1I2iOSOHuimiXBI0e-Oe_u6X3oVAbCiAZOTEBtTXw4tsluTITPqA8zMsfxIKMjiqNQ";

const chainConfig = {
    chainNamespace: "other",
    chainId: "Algorand",
    rpcTarget: "https://api.algoexplorer.io",
    // Avoid using public rpcTarget in production.
    // Use services like PureStake, AlgoExplorer API, etc.
    displayName: "Algorand Mainnet",
    blockExplorerUrl: "https://algoexplorer.io",
    ticker: "ALGO",
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

const adapters = getDefaultExternalAdapters({ options: web3AuthOptions });
adapters.forEach((adapter) => {
  web3auth.configureAdapter(adapter);
});

const Login = () => {
    const [provider, setProvider] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);

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
        const web3authProvider = await web3auth.connect();
        setProvider(web3authProvider);
        if (web3auth.connected) {
          setLoggedIn(true);
        }
        const user = await web3auth.getUserInfo();
        console.log("user", user);
    };
    
    return (
        <div className='card'>
        <div className="card-container">
            <div className="left-section">
                <h1> Solar NFT </h1>
                <img src={logo} alt='logo' className='logo-image' />
            </div>
            <div className="right-section">
                <h1 style={{ color: '#08d1c0da' }}>Welcome</h1>
                <form style={{ paddingRight: 20 }}>
                    <input type="email" placeholder="Username" required />
                    <input type="password" placeholder="Password" required />
                    <a href="/forgot-password">Forget password?</a>
                    <button style={{ margin: 7 }} type="button" onClick={login}>Login</button>
                </form>
                <p style={{ fontSize: 13 }}>Don&apos;t have an account? <a href="/signup">Sign Up</a></p>
            </div>
      </div>
      </div>
    )
};

export default Login;
