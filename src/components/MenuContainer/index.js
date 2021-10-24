import { useLocation } from "react-router-dom";
import useNavigation from "../../hooks/useNavigation";
import "./index.css"

export default function HeaderContainer() {
  const { navigateTo } = useNavigation();
  const location = useLocation();

  const navigateDeposit = () => navigateTo({pathname: "/"});
  const navigateWithdraw = () => navigateTo({pathname: "/withdraw"});

  const isInDepositPath = ["/", "/deposit"].includes(
    location.pathname,
  );
  const isInWithdrawPath = ["/withdraw"].includes(
    location.pathname,
  );

  const depositActiveItem = <div className="MenuItem -active">Deposit</div>
  const depositItem = <div className="MenuItem"  onClick={() => navigateDeposit()}>Deposit</div>

  const withdrawActiveItem = <div className="MenuItem -active">Withdraw</div>
  const withdrawItem = <div className="MenuItem" onClick={() => navigateWithdraw()}>Withdraw</div>
  
  return (
    <div className="MenuContainer">
      {isInDepositPath ? depositActiveItem : depositItem}
      {isInWithdrawPath ? withdrawActiveItem : withdrawItem}
    </div>
  )
}
