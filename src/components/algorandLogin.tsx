import { Web3Auth } from "@web3auth/modal";
import { CommonPrivateKeyProvider } from "@web3auth/base-provider";
import { WEB3AUTH_NETWORK, CHAIN_NAMESPACES } from "@web3auth/base";
import { IProvider } from "@web3auth/base";
import algosdk from "algosdk";


const clientId = "BAajpmzVb8iWQQEoaf-zl2xxh8s0KNPbvYmazXXJCOz-3kPuKKNpFGtW_omPqX_J9paZzOunbG_wgHpZ4-ptmps"

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

const web3auth = new Web3Auth({
  // Get it from Web3Auth Dashboard
  clientId,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
  privateKeyProvider: privateKeyProvider,
});

// Initialize for PnP Modal SDK
await web3auth.initModal();

// Trigger the login
await web3auth.connect();

// Get the provider
const provider = web3auth.provider;

const user = await web3auth.getUserInfo();