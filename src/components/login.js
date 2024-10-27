import React, { useState, useEffect } from 'react';
import './login.css';
import logo from '../assets/solar.png';
import { CHAIN_NAMESPACES, IAdapter, IProvider, WEB3AUTH_NETWORK } from "@web3auth/base";
import { Web3Auth, Web3AuthOptions } from "@web3auth/modal";
import { getDefaultExternalAdapters } from "@web3auth/default-evm-adapter";
import { CommonPrivateKeyProvider } from "@web3auth/base-provider";

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
    config: { chainConfig: chainConfig },
});

const web3AuthOptions = {
    clientId,
    web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
    privateKeyProvider,
}

const web3auth = new Web3Auth(web3AuthOptions);

const adapters = await getDefaultExternalAdapters({ options: web3AuthOptions });
adapters.forEach((adapter) => {
  web3auth.configureAdapter(adapter);
});

const Login = () => {
    const [provider, setProvider] = useState<IProvider | null>(null);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const init = async () => {
          try {
            // IMP START - SDK Initialization
            await web3auth.initModal();
            // IMP END - SDK Initialization
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
        // IMP START - Login
        const web3authProvider = await web3auth.connect();
        // IMP END - Login
        setProvider(web3authProvider);
        if (web3auth.connected) {
          setLoggedIn(true);
        }
    };
    
    return (
        <div className='card'>
        <div className="card-container">
            <div className="left-section">
                <h1> Solar NFT </h1>
                {/* <h6>Tag lines .....</h6> */}
                <img src={logo} alt='logo' className='logo-image'></img>
            </div>
            <div className="right-section">
                <h1 style={{color: '#08d1c0da'}}>Welcome</h1>
                <form style={{paddingRight: 20}}>
                    <input type="email" placeholder="Username" required />
                    <input type="password" placeholder="Password" required />
                    <a href="/forgot-password">Forget password?</a>
                    <button style={{margin: 7}} type="submit" onClick={login}>Login</button>
                </form>
                <p style={{fontSize: 13}}>Don't have an account? <a href="/signup">Sign In</a></p>
            </div>
      </div>
      </div>
    )
};

export default Login;