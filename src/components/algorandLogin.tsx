import { Web3Auth } from "@web3auth/modal";
import { CommonPrivateKeyProvider } from "@web3auth/base-provider";
import { WEB3AUTH_NETWORK, CHAIN_NAMESPACES } from "@web3auth/base";
import algosdk from "algosdk";

const clientId = "BAajpmzVb8iWQQEoaf-zl2xxh8s0KNPbvYmazXXJCOz-3kPuKKNpFGtW_omPqX_J9paZzOunbG_wgHpZ4-ptmps";

const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.OTHER,
  chainId: "Algorand",
  rpcTarget: "https://api.algoexplorer.io",
  displayName: "Algorand Mainnet",
  blockExplorerUrl: "https://algoexplorer.io",
  ticker: "ALGO",
  tickerName: "Algorand",
};

const privateKeyProvider = new CommonPrivateKeyProvider({
  config: { chainConfig },
});

const web3auth = new Web3Auth({
  clientId,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
  privateKeyProvider,
});

export async function initWeb3Auth() {
  await web3auth.initModal();
  await web3auth.connect();
  const provider = web3auth.provider;
  const user = await web3auth.getUserInfo();
  console.log("User Info:", user);
  return { provider, user };
}
