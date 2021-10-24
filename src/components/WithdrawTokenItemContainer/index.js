import "./index.css";

export default function WithdrawTokenItemContainer({coin, openModal}) {
  return (
    <div className="CoinContainer" onClick={() => openModal(coin)}>
      <div className="tokenContainer">
        <img src={coin.image} width="36px" height="36px" />
        <div className="name">{coin.name}</div>
      </div>

      <div className="yieldContainer">
        <div>{coin.leveragedYield}%</div>
        <div>100.000</div>
        <div>WITHDRAW</div>
      </div>
    </div>
  )
}