import { useState, useEffect, useCallback } from "react";
import Web3 from "web3";

const AaveMoneyMultiplier = require("../../contracts/AaveMoneyMultiplier.json");

export default function useContract(contractAddress) {
  const [contract, setContract] = useState();

  const setupWeb3 = useCallback(() => {
    const web3 = new Web3(window.ethereum || "http://localhost:8545");
    console.log("contract add:", contractAddress);
    setContract(new web3.eth.Contract(AaveMoneyMultiplier.abi, contractAddress));
  }, []);

  useEffect(() => {
    setupWeb3();
  }, [setupWeb3]);

  return {
    contract
  };
}