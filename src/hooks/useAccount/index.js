import { useState, useEffect, useCallback } from "react";
import Web3 from "web3";

export default function useAccount() {
  const [account, setAccount] = useState("");

  const setupWeb3 = useCallback(async () => {
    const web3 = new Web3(
      window.web3.currentProvider || "http://localhost:8545"
    );
    const accounts = await web3.eth.getAccounts();

    setAccount(accounts[0]);
  }, []);

  useEffect(() => {
    setupWeb3();
  }, [setupWeb3]);

  return { account };
}