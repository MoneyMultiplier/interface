import React, { useState } from "react";
import style from "./DepositModal.module.css";
import Web3 from "web3";
import useContract from "../../hooks/useContract";
import useAccount from "../../hooks/useAccount";
const AaveMoneyMultiplier = require("../../contracts/AaveMoneyMultiplier.json");
const tokenABI = require("../../contracts/IERC20.json");

export default function DepositModal({visible, coin, closeModal}) {
  const [isWaitingForConfirmation, setIsWaitingForConfirmation] = useState(false);
  const [isThanksModalVisible, setIsThanksModalVisible] = useState(false);
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);

  const [simulationNormalYield, setSimulationNormalYield] = useState(0);
  const [simulationLevaragedYield, setSimulationLevaragedYield] = useState(0);
  const [amount, setAmount] = useState(0);

  const { account } = useAccount();

  const simulate = (value) => {
    setSimulationNormalYield(value + (value * (coin.normalYield / 100)));
    setSimulationLevaragedYield(value + (value * (coin.leveragedYield / 100)));
    setAmount(value);
  }

  const web3 = new Web3(window.ethereum || "http://localhost:8545");
  const mmContract = new web3.eth.Contract(AaveMoneyMultiplier.abi, coin.mmAddress);
  const tokenContract = new web3.eth.Contract(tokenABI.abi, coin.tokenAddress);

  const deposit = async () => {
    setIsWaitingForConfirmation(true);
    await tokenContract?.methods
      .approve(coin.mmAddress, Web3.utils.toWei(amount.toString(), "ether"))
      .send({ from: account })
      .then(() => {
        mmContract?.methods
          .deposit(Web3.utils.toWei(amount.toString(), "ether"))
          .send({ from: account })
          .then(() => {
            setIsWaitingForConfirmation(false);
            setIsThanksModalVisible(true);
            closeModal();
          })
          .catch(() => {
            setIsWaitingForConfirmation(false);
            setIsErrorModalVisible(true);
          });
      })
      .catch(() => {
        console.log("falhou");
        setIsWaitingForConfirmation(false);
        setIsErrorModalVisible(true);
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
          <input className={style.input} type="number" onChange={(event) => simulate(parseInt(event.target.value))}/>
        </div>
        
        <div className={style.simulationContainer}>
          <div>Simulation:</div>
          <div className={style.simulationTypes}>
            <div>Normal Yield: {simulationNormalYield}</div>
            <div>Leveraged Yield: {simulationLevaragedYield}</div>
          </div>
        </div>
        
        <button className={style.button} onClick={() => deposit()}>DEPOSIT</button>
      </div>
    </div>
  )

  const isHided = null;
  
  return visible ? isOpen : isHided;
}