import React, { useState } from "react";
import style from "./DepositModal.module.css";

export default function DepositModal({visible, coin, closeModal}) {
  const [simulationNormalYield, setSimulationNormalYield] = useState(0);
  const [simulationLevaragedYield, setSimulationLevaragedYield] = useState(0);

  const simulate = (value) => {
    setSimulationNormalYield(value + (value * (coin.normalYield / 100)))
    setSimulationLevaragedYield(value + (value * (coin.leveragedYield / 100)))
  }

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
        
        <button className={style.button}>DEPOSIT</button>
      </div>
    </div>
  )

  const isHided = null;
  
  return visible ? isOpen : isHided;
}