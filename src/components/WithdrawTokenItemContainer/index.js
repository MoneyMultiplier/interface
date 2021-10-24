
import { useEffect, useCallback, useState } from "react";
import Web3 from "web3";
import useAccount from "../../hooks/useAccount";
import "./index.css";
const AaveMoneyMultiplier = require("../../contracts/AaveMoneyMultiplier.json");


export default function WithdrawTokenItemContainer({coin}) {
  const [scaledBalance, setScaledBalance] = useState("0");
  const { account } = useAccount();

  const web3 = new Web3(window.ethereum);
  const mmContract = new web3.eth.Contract(AaveMoneyMultiplier.abi, coin.mmAddress);

  const getScaledBalance = useCallback(async () => {
    try {
      const accounts = await web3.eth.getAccounts();
      const total = await mmContract?.methods.scaledBalanceOf(accounts[0]).call();
      setScaledBalance(total.toString());
    } catch (error) {
      console.log(error);
    }
  }, [account, mmContract]);

  useEffect(() => {
    getScaledBalance();
  }, [getScaledBalance]);


  const withdraw = () => {
    mmContract?.methods
      .withdraw(10000)
      .send({ from: account })
  }

  return (
    <div className="CoinContainer">
      <div className="tokenContainer">
        <img alt="asd" src={coin.image} width="36px" height="36px" />
        <div className="name">{coin.name}</div>
      </div>

      <div className="yieldContainer">
        <div>{coin.leveragedYield}%</div>
        <div>{scaledBalance}</div>
        <div onClick={() => withdraw()}>WITHDRAW</div>
      </div>
    </div>
  )
}