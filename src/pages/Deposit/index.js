import React, { useState } from "react";
import CoinContainer from '../../components/CoinContainer';
import DepositModal from "../../components/DepositModal";
import Header from "../../components/HeaderContainer";
import Menu from "../../components/MenuContainer";
import { PolygonTokens } from "../../tokens/polygon";
import "./index.css";

export default function DepositPage() {
  const emptyCoin = {
    name: null,
    normalYield: null,
    leveragedYield: null
  }

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState(emptyCoin);

  const openModal = (coin) => {
    setIsModalVisible(true);
    setSelectedCoin(coin);
  }

  const closeModal = () => setIsModalVisible(false);

  const renderPolygonTokens = () => {
    return PolygonTokens.map((token) => <CoinContainer key={token.name} coin={token} openModal={openModal}/>)
  }

  return (
    <div>
      <main>
        <Header />
        <Menu />
        <div className="ListContainer">
          { renderPolygonTokens() }
        </div>
        <DepositModal visible={isModalVisible} coin={selectedCoin} closeModal={closeModal} />
      </main>
    </div>
  )
}
