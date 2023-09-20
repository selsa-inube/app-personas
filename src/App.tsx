import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import { GlobalStyles } from "@design/styles";
import { useFonts } from "@hooks/useFonts";
import { ThemeProvider } from "styled-components";

import { header } from "@config/header";
import { nav } from "@config/nav";
import { theme } from "@config/theme";

import { Page } from "@design/layout/Page";

import { useAuth0 } from "@auth0/auth0-react";
import { Credit } from "@pages/admin/credits/Credit";
import { CreditAmortization } from "@pages/admin/credits/CreditAmortization";
import { CreditMovements } from "@pages/admin/credits/CreditMovements";
import { MyCredits } from "@pages/admin/credits/MyCredits";
import { Home } from "@pages/admin/home";
import { Investment } from "@pages/admin/investments/Investment";
import { InvestmentMovements } from "@pages/admin/investments/InvestmentMovements";
import { MyInvestments } from "@pages/admin/investments/MyInvestments";
import { MySavings } from "@pages/admin/savings/MySavings";
import { SavingsAccount } from "@pages/admin/savings/SavingsAccount";
import { SavingsAccountMovements } from "@pages/admin/savings/SavingsAccountMovements";
import { SavingsCommitments } from "@pages/admin/savings/SavingsCommitments";
import { useEffect } from "react";

const USER_ID = "1";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Page header={header} nav={nav} />}>
      <Route path="/" element={<Home />} />
      <Route path="my-credits" element={<MyCredits />} />
      <Route path="my-credits/:credit_id" element={<Credit />} />
      <Route
        path="my-credits/:credit_id/credit-movements"
        element={<CreditMovements />}
      />
      <Route
        path="my-credits/:credit_id/credit-amortization"
        element={<CreditAmortization />}
      />
      <Route path="my-investments" element={<MyInvestments />} />
      <Route path="my-investments/:product_id" element={<Investment />} />
      <Route
        path="my-investments/:product_id/movements"
        element={<InvestmentMovements />}
      />
      <Route path="my-savings" element={<MySavings />} />
      <Route
        path="my-savings/account/:product_id"
        element={<SavingsAccount />}
      />
      <Route
        path="my-savings/account"
        element={<Navigate to="/my-savings" replace />}
      />
      <Route
        path="my-savings/account/:product_id/movements"
        element={<SavingsAccountMovements />}
      />
        <Route
          path="my-savings/commitment/:commitment_id"
          element={<SavingsCommitments />}
        />
      <Route path="/update-data" />
    </Route>
  )
);

function App() {
  useFonts(theme.typography.fonts);
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect();
    }
  }, [isLoading, isAuthenticated]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}

export { USER_ID };
export default App;
