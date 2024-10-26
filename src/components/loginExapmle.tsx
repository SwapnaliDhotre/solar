import { useEffect, useState } from "react";

// import { Web3Auth } from "@web3auth/web3auth";
import { CHAIN_NAMESPACE } from "@web3auth/base";
import { CHAIN_NAMESPACES, IAdapter, IProvider, WEB3AUTH_NETWORK } from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { Web3Auth, Web3AuthOptions } from "@web3auth/modal";
import { getDefaultExternalAdapters } from "@web3auth/default-evm-adapter";

import RCP from "./web3RPC";

const clientId = "BAajpmzVb8iWQQEoaf-zl2xxh8s0KNPbvYmazXXJCOz-3kPuKKNpFGtW_omPqX_J9paZzOunbG_wgHpZ4-ptmps"

const chainConfig = {
    chainNamespace: CHAIN_NAMESPACE.EIP155,
    chainId:"0xaa36a7",
    rpcTarget: "https://rpc.ankr.com/eth_sepolia",
    displayName: "Ethereum Sepolia Testnet",
    blockExplorerUrl: "https://sepolia.etherscan.io",
    ticker: "ETH",
    tickerName: "Ethereum",
    logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
}

const privateKeyProvider = new EthereumPrivateKeyProvider({
    config: { chainConfig },
  });

const web3AuthOptions: Web3AuthOptions = {
clientId,
web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
privateKeyProvider,
}

const web3auth = new Web3Auth(web3AuthOptions);

const adapters = await getDefaultExternalAdapters({ options: web3AuthOptions });
adapters.forEach((adapter: IAdapter<unknown>) => {
  web3auth.configureAdapter(adapter);
});
const loginExapmle = () => {
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
  }

  const getUserInfo = async () => {
    // IMP START - Get User Information
    const user = await web3auth.getUserInfo();
    // IMP END - Get User Information
    uiConsole(user);
  };

  const logout = async () => {
    // IMP START - Logout
    await web3auth.logout();
    // IMP END - Logout
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
};

export default loginExapmle;