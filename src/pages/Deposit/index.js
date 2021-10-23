import React, { useState } from "react";
import CoinContainer from '../../components/CoinContainer';
import DepositModal from "../../components/DepositModal";
import { useBlockchain } from "../../contexts/blockchain";
import { PolygonTokens } from "../../tokens/polygon";

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

  const {
    isWalletConnected,
    connectWallet,
    connectNetwork,
    isNetworkConnected,
  } = useBlockchain();

  const renderConnectButton = () => {
    if (isWalletConnected && isNetworkConnected) {
      return;
    }

    if (!isWalletConnected) {
      return (
          <button
            onClick={() => connectWallet()}
          >Connect Wallet</button>
      );
    }

    if (!isNetworkConnected) {
      return (
          <button
            onClick={() => connectNetwork()}
          >Connect Network</button>
      );
    }
  };

  const renderPolygonTokens = () => {
    return PolygonTokens.map((token) => <CoinContainer key={token.name} coin={token} openModal={openModal}/>)
  }

  return (
    <div className="container">
      <main className="styles.main">
        <div>
          <h1 className="title">Money Multiplier!</h1>
          { renderConnectButton() }
        </div>
        
        { renderPolygonTokens() }
      </main>
      <DepositModal visible={isModalVisible} coin={selectedCoin} closeModal={closeModal} />
    </div>
  )
}
