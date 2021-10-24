import React, { useState } from "react";
import style from "./DepositModal.module.css";
import Web3 from "web3";
import useAccount from "../../hooks/useAccount";
const AaveMoneyMultiplier = require("../../contracts/AaveMoneyMultiplier.json");
const tokenABI = require("../../contracts/IERC20.json");

export default function DepositModal({visible, coin, closeModal}) {
  const [amount, setAmount] = useState("0");

  const { account } = useAccount();

  const simulate = (value) => {
    setAmount(value);
  }

  const web3 = new Web3(window.ethereum || "http://localhost:8545");
  const mmContract = new web3.eth.Contract(AaveMoneyMultiplier.abi, coin.mmAddress);
  const tokenContract = new web3.eth.Contract(tokenABI.abi, coin.tokenAddress);

  const deposit = async () => {
    await tokenContract?.methods
      .approve(coin.mmAddress, amount)
      .send({ from: account })
      .then(() => {
        mmContract?.methods
          .deposit(amount)
          .send({ from: account })
          .then(() => {
            closeModal();
          })
          .catch(() => {
            console.log("error");
          });
      })
      .catch(() => {
        console.log("error");
      });
  };


  const isOpen = (
    <div className={style.container}>
      <div className={style.card}>
        <div className={style.close} onClick={closeModal}>X</div>
        
        <div className={style.tokenContainer}>
          <img src={coin.image} width="36px" height="36px" />
          <div className={style.name}>{coin.name}</div>
        </div>

        <div className={style.yieldContainer}>
          <div className={style.name}>Normal Yield: {coin.normalYield}%</div>
          <div className={style.name}>Leveraged Yield: {coin.leveragedYield}%</div>
        </div>
        
        <div className={style.inputContainer}>
          <span>Amount:</span>
          <input className={style.input} type="text" onChange={(event) => simulate(parseInt(event.target.value))}/>
        </div>  
        <button className={style.button} onClick={() => deposit()}>DEPOSIT</button>
      </div>
    </div>
  )

  const isHided = null;
  
  return visible ? isOpen : isHided;
}