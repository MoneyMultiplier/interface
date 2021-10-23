import { useState, useEffect, useCallback } from "react";
import Web3 from "web3";

const ContractXXX = require("../../contracts/ContractXXX.json");

export default function useContract(contractAddress) {
  const [contract, setContract] = useState();

  const setupWeb3 = useCallback(async () => {
    const web3 = new Web3(window.ethereum || "http://localhost:8545");

    setContract(new web3.eth.Contract(ContractXXX.abi, contractAddress));
  }, []);

  useEffect(() => {
    setupWeb3();
  }, [setupWeb3]);

  return {
    contract,
    CONTRACT_ADDRESS,
  };
}