import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import { GlobalStyles } from "@design/styles";
import { useFonts } from "@hooks/useFonts";
import { ThemeProvider } from "styled-components";

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
import { CardsProvider } from "./context/cards";
import { CreditsProvider } from "./context/credits";

import { PageNotFound } from "@components/layout/PageNotFound";
import { SwitchUser } from "@pages/admin/switchUser";
import { AppProvider } from "./context/app";
import { SavingsProvider } from "./context/savings";
import { AidRoutes } from "./routes/aid";
import { MyCardsRoutes } from "./routes/myCards";
import { MyRequestsRoutes } from "./routes/myRequests";
import { PaymentsRoutes } from "./routes/payments";
import { TransfersRoutes } from "./routes/transfers";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route errorElement={<PageNotFound />} />
      <Route path="switch-user" element={<Page withNav={false} />}>
        <Route index element={<SwitchUser />} />
      </Route>
      <Route path="/" element={<Page />}>
        <Route path="/" element={<Home />} />

        <Route path="my-credits/*" element={<MyCreditsRoutes />} />

        <Route path="my-savings/*" element={<MySavingsRoutes />} />

        <Route path="my-cards/*" element={<MyCardsRoutes />} />

        <Route path="my-requests/*" element={<MyRequestsRoutes />} />

        <Route path="payments/*" element={<PaymentsRoutes />} />

        <Route path="transfers/*" element={<TransfersRoutes />} />

        <Route path="credits/*" element={<CreditRoutes />} />

        <Route path="savings/*" element={<SavingRoutes />} />

        <Route path="aids/*" element={<AidRoutes />} />

        <Route path="/update-data-assisted" element={<UpdateData />} />
        <Route
          path="/update-data-unassisted"
          element={<UpdateDataUnassisted />}
        />
      </Route>
      ,
    </>,
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
        <AppProvider>
          <SavingsProvider>
            <CreditsProvider>
              <CardsProvider>
                <RouterProvider router={router} />
              </CardsProvider>
            </CreditsProvider>
          </SavingsProvider>
        </AppProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
