import {
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

import { Home } from "@pages/admin/home";
import { UpdateData } from "@pages/general/UpdateData";
import { UpdateDataUnassisted } from "@pages/general/UpdateDataUnassisted";
import { useEffect } from "react";
import { CreditRoutes } from "./routes/credit";
import { MyCreditsRoutes } from "./routes/myCredits";
import { MySavingsRoutes } from "./routes/mySavings";
import { SavingRoutes } from "./routes/saving";

import { useAuth } from "@inube/auth";
import { CreditsProvider } from "./context/credits";
import { CardsProvider } from "./context/cards";

import { SavingsProvider } from "./context/savings";
import { MyCardsRoutes } from "./routes/myCards";
import { PaymentsRoutes } from "./routes/payments";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Page header={header} nav={nav} />}>
      <Route path="/" element={<Home />} />

      <Route path="my-credits/*" element={<MyCreditsRoutes />} />

      <Route path="my-savings/*" element={<MySavingsRoutes />} />

      <Route path="my-cards/*" element={<MyCardsRoutes />} />

      <Route path="payments/*" element={<PaymentsRoutes />} />

      <Route path="credit/*" element={<CreditRoutes />} />

      <Route path="savings/*" element={<SavingRoutes />} />

      <Route path="/update-data-assisted" element={<UpdateData />} />
      <Route
        path="/update-data-no-assisted"
        element={<UpdateDataUnassisted />}
      />
    </Route>,
  ),
);

function App() {
  useFonts(theme.typography.fonts);
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth();

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
        <SavingsProvider>
          <CreditsProvider>
          <CardsProvider>
            <RouterProvider router={router} />
            </CardsProvider>
          </CreditsProvider>
        </SavingsProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
