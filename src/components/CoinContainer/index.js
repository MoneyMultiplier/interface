import style from "./CoinContainer.module.css";

export default function CoinContainer({coin, openModal}) {
  return (
    <div className={style.CoinContainer} onClick={() => openModal(coin)}>
      <div className={style.tokenContainer}>
        <img alt="asd" src={coin.image} width="36px" height="36px" />
        <div className={style.name}>{coin.name}</div>
      </div>

      <div className={style.yieldContainer}>
        <div>{coin.normalYield}%</div>
        <div>{coin.leveragedYield}%</div>
      </div>
    </div>
  )
}