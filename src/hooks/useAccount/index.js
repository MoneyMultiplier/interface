import { useState, useEffect, useCallback } from "react";
import Web3 from "web3";

export default function useAccount() {
  const [account, setAccount] = useState("");

  const setupWeb3 = useCallback(async () => {
    const web3 = new Web3(
      window.ethereum
    );
    const accounts = await web3.eth.getAccounts();

    setAccount(accounts[0]);
  }, []);

  useEffect(() => {
    setupWeb3();
  }, [setupWeb3]);

  return { account };
}