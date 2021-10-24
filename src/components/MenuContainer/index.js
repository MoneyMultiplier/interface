import { useBlockchain } from "../../contexts/blockchain";
import useNavigation from "../../hooks/useNavigation";
import "./index.css"

export default function HeaderContainer() {
  const { navigateTo } = useNavigation();

  const navigateDeposit = () => navigateTo({pathname: "/"});
  const navigateWithdraw = () => navigateTo({pathname: "/withdraw"});

  return (
    <div className="MenuContainer">
      <div className="MenuItem" onClick={() => navigateDeposit()}>Deposit</div>
      <div className="MenuItem" onClick={() => navigateWithdraw()}>Withdraw</div>
    </div>
  )
}
