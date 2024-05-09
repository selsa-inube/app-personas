import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import { GlobalStyles } from "@design/styles";
import { useFonts } from "@hooks/useFonts";
import { ThemeProvider } from "styled-components";

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
import { CardsProvider } from "./context/cards";
import { CreditsProvider } from "./context/credits";

import { PageNotFound } from "@components/layout/PageNotFound";
import { AppProvider } from "./context/app";
import { SavingsProvider } from "./context/savings";
import { MyCardsRoutes } from "./routes/myCards";
import { PaymentsRoutes } from "./routes/payments";
import { AidRoutes } from "./routes/aid";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route errorElement={<PageNotFound nav={nav} />} />
      <Route path="/" element={<Page nav={nav} />}>
        <Route path="/" element={<Home />} />

        <Route path="my-credits/*" element={<MyCreditsRoutes />} />

        <Route path="my-savings/*" element={<MySavingsRoutes />} />

        <Route path="my-cards/*" element={<MyCardsRoutes />} />

        <Route path="payments/*" element={<PaymentsRoutes />} />

        <Route path="credit/*" element={<CreditRoutes />} />

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

  console.log(import.meta.env.VITE_AUTH0_REDIRECT_URI);

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
