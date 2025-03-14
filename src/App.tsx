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
import { useEffect } from "react";
import { CreditRoutes } from "./routes/credit";
import { MyCreditsRoutes } from "./routes/myCredits";
import { MySavingsRoutes } from "./routes/mySavings";
import { SavingRoutes } from "./routes/saving";

import { useAuth } from "@inube/auth";
import { CardsProvider } from "./context/cards";
import { CreditsProvider } from "./context/credits";

import { PageNotFound } from "@components/layout/PageNotFound";
import { FlagProvider } from "@inubekit/inubekit";
import { SwitchUser } from "@pages/admin/switchUser";
import { CertificationRequest } from "@pages/request/certifications";
import { AppProvider } from "./context/app";
import { RequestsProvider } from "./context/requests";
import { SavingsProvider } from "./context/savings";
import { AidRoutes } from "./routes/aid";
import { MyCardsRoutes } from "./routes/myCards";
import { MyPQRSRoutes } from "./routes/myPQRS";
import { MyRequestsRoutes } from "./routes/myRequests";
import { PaymentsRoutes } from "./routes/payments";
import { TransfersRoutes } from "./routes/transfers";
import { ExpiredSessionPage } from "@components/layout/ExpiredSessionPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route errorElement={<PageNotFound />} />
      <Route path="session-expired" element={<ExpiredSessionPage />} />
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

        <Route path="my-pqrs/*" element={<MyPQRSRoutes />} />

        <Route path="certifications" element={<CertificationRequest />} />

        <Route path="/update-data-assisted" element={<UpdateData />} />
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
        <FlagProvider>
          <AppProvider>
            <SavingsProvider>
              <CreditsProvider>
                <CardsProvider>
                  <RequestsProvider>
                    <RouterProvider router={router} />
                  </RequestsProvider>
                </CardsProvider>
              </CreditsProvider>
            </SavingsProvider>
          </AppProvider>
        </FlagProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
