import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import DepositPage from "../../pages/Deposit";
import WithdrawPage from "../../pages/Withdraw";

import BlockchainProvider from "../../contexts/blockchain";

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <BlockchainProvider>
          <Route path="/" exact>
            <DepositPage />
          </Route>

          <Route path="/withdraw" exact>
            <WithdrawPage />
          </Route>
        </BlockchainProvider>

        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
