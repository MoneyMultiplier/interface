import { useBlockchain } from "../../contexts/blockchain";
import './index.css';

export default function HeaderContainer() {
  const {
    isWalletConnected,
    connectWallet
  } = useBlockchain();

  const renderConnectWalletButton = () => {
    if (isWalletConnected) {
      return;
    }

    if (!isWalletConnected) {
      return (
          <div className="connectButton"
            onClick={() => connectWallet()}
          >Connect Wallet</div>
      );
    }
  };

  return (

    <div className="HeaderContainer">
      <h1>Money Multiplier!</h1>
      { renderConnectWalletButton() }
    </div>
  )
}