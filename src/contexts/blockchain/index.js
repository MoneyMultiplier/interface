import React, {
    createContext,
    useState,
    useContext,
    useCallback,
    useEffect,
  } from "react";
  import Web3 from "web3";
  
  export const BlockchainContext = createContext();
  
  const networks = {
    polygon: {
      chainId: "0x89",
      rpcUrls: ["https://polygon-rpc.com"],
      chainName: "Polygon",
    }
  };
  
  const defaultNetwork = networks.polygon;
  
  const BlockchainProvider = ({ children }) => {
    const [wallet, setWallet] = useState("");
    const [isWalletConnected, setIsWalletConnected] = useState(false);
    const [isNetworkConnected, setIsNetworkConnected] = useState(false);
  
    const getCurrentNetwork = async () => {
      const chainId = await window.ethereum.request({ method: "eth_chainId" });
      if (
        chainId === networks.polygon.chainId
      ) {
        setIsNetworkConnected(true);
      } else {
        setIsNetworkConnected(false);
      }
    };
  
    window.ethereum.on("chainChanged", getCurrentNetwork);
  
    const connectNetwork = async () => {
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: defaultNetwork.chainId }],
        });
        setIsNetworkConnected(true);
      } catch (error) {
        // This error code indicates that the chain has not been added to MetaMask.
        if (error.code === 4902) {
          try {
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: defaultNetwork.chainId,
                  rpcUrls: defaultNetwork.rpcUrls,
                  chainName: defaultNetwork.chainName,
                },
              ],
            });
            setIsNetworkConnected(true);
          } catch (addError) {
            setIsNetworkConnected(false);
          }
        }
      }
    };
  
    const connectWallet = async () => {
      try {
        await window.ethereum.enable();
        setIsWalletConnected(true);
      } catch (error) {
        setIsWalletConnected(false);
      }
    };
  
    const getWallet = useCallback(async () => {
      const web3 = new Web3(window.ethereum || "http://localhost:8545");
      getCurrentNetwork();
      try {
        const accounts = await web3.eth.getAccounts();
        if (accounts.length) {
          setWallet(accounts[0]);
          setIsWalletConnected(true);
        } else {
          setIsWalletConnected(false);
        }
      } catch {
        setIsWalletConnected(false);
      }
    }, []);
  
    window.ethereum.on("accountsChanged", function () {
      getWallet();
    });
  
    useEffect(() => {
      getWallet();
    }, [getWallet]);
  
    const blockchainObject = {
      wallet,
      isWalletConnected,
      connectWallet,
      connectNetwork,
      isNetworkConnected,
    };
  
    return (
      <BlockchainContext.Provider value={blockchainObject}>
        {children}
      </BlockchainContext.Provider>
    );
  };
  
  export default BlockchainProvider;
  
  export const useBlockchain = () => {
    const context = useContext(BlockchainContext);
  
    if (!context) {
      throw new Error("useBlockchain must be used within BlockchainProvider");
    }
  
    return context;
  };