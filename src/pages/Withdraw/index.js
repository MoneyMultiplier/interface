import React, { useState } from "react";
import WithdrawTokenItemContainer from '../../components/WithdrawTokenItemContainer';
import DepositModal from "../../components/DepositModal";
import Header from "../../components/HeaderContainer";
import Menu from "../../components/MenuContainer";
import { PolygonTokens } from "../../tokens/polygon";
import "./index.css";

export default function WithdrawPage() {
  const emptyCoin = {
    name: null,
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
    return PolygonTokens.map((token) => <WithdrawTokenItemContainer key={token.name} coin={token} openModal={openModal}/>)
  }

  const renderDepositListHeader = () => {
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
