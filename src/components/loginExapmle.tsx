import { useEffect, useState } from "react";
import { Web3Auth, Web3AuthOptions } from "@web3auth/modal";
import { CHAIN_NAMESPACES, IAdapter, WEB3AUTH_NETWORK, SafeEventEmitterProvider } from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { getDefaultExternalAdapters } from "@web3auth/default-evm-adapter";

const clientId = "BAajpmzVb8iWQQEoaf-zl2xxh8s0KNPbvYmazXXJCOz-3kPuKKNpFGtW_omPqX_J9paZzOunbG_wgHpZ4-ptmps";

const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0xaa36a7",
  rpcTarget: "https://rpc.ankr.com/eth_sepolia",
  displayName: "Ethereum Sepolia Testnet",
  blockExplorerUrl: "https://sepolia.etherscan.io",
  ticker: "ETH",
  tickerName: "Ethereum",
  logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
};

const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: { chainConfig },
});

const web3AuthOptions: Web3AuthOptions = {
  clientId,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
  privateKeyProvider,
};

const web3auth = new Web3Auth(web3AuthOptions);

const adapters = getDefaultExternalAdapters({ options: web3AuthOptions });
adapters.forEach((adapter: IAdapter<unknown>) => {
  web3auth.configureAdapter(adapter);
});

const LoginExample = () => {
  // Use SafeEventEmitterProvider for provider type
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        await web3auth.initModal();
        setProvider(web3auth.provider); // Now uses SafeEventEmitterProvider | null type
        if (web3auth.connected) {
          setLoggedIn(true);
        }
      } catch (error) {
        console.error("Initialization Error:", error);
      }
    };
    init();
  }, []);

  const login = async () => {
    const web3authProvider = await web3auth.connect();
    setProvider(web3authProvider); // Now uses SafeEventEmitterProvider | null type
    if (web3auth.connected) {
      setLoggedIn(true);
    }
  };

  const getUserInfo = async () => {
    const user = await web3auth.getUserInfo();
    console.log("User Info:", user);
    uiConsole(user);
  };

  const logout = async () => {
    await web3auth.logout();
    setProvider(null);
    setLoggedIn(false);
    uiConsole("logged out");
  };

  function uiConsole(...args: any[]): void {
    const el = document.querySelector("#console>p");
    if (el) {
      el.innerHTML = JSON.stringify(args || {}, null, 2);
      console.log(...args);
    }
  }

  return (
    <div>
      <button onClick={login}>Login</button>
      <button onClick={getUserInfo}>Get User Info</button>
      <button onClick={logout}>Logout</button>
      <div id="console"><p></p></div>
    </div>
  );
};

export default LoginExample;
