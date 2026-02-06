import { Navigate, createBrowserRouter } from "react-router";

import { RouterProvider } from "react-router";

import { GlobalStyles } from "@design/styles";
import { useFonts } from "@hooks/useFonts";
import { ThemeProvider } from "styled-components";

import { Page } from "@design/layout/Page";

import { Home } from "@pages/admin/home";
import { UpdateData } from "@pages/general/UpdateData";
import { useEffect, useState } from "react";
import { CreditRoutes } from "./routes/credit";
import { MyCreditsRoutes } from "./routes/myCredits";
import { MySavingsRoutes } from "./routes/mySavings";
import { SavingRoutes } from "./routes/saving";

import { useAuth } from "@inube/auth";
import { CardsProvider } from "./context/cards";
import { CreditsProvider } from "./context/credits";

import { ExpiredSessionPage } from "@components/layout/ExpiredSessionPage";
import { PageNotFound } from "@components/layout/PageNotFound";
import { FlagProvider } from "@inubekit/inubekit";
import { SwitchUser } from "@pages/admin/switchUser";
import { CertificationRequest } from "@pages/request/certifications";
import { IThemeData } from "@utils/themes";
import { AppProvider } from "./context/app";
import { RequestsProvider } from "./context/requests";
import { SavingsProvider } from "./context/savings";
import { AidRoutes } from "./routes/aid";
import { EventRoutes } from "./routes/event";
import { MyCardsRoutes } from "./routes/myCards";
import { MyEntriesRoutes } from "./routes/myEntries";
import { MyPQRSRoutes } from "./routes/myPQRS";
import { MyRequestsRoutes } from "./routes/myRequests";
import { PaymentsRoutes } from "./routes/payments";
import { TicketRoutes } from "./routes/ticket";
import { TransfersRoutes } from "./routes/transfers";
import { getTokens } from "./services/tokens/getTokens";

const getRouter = (sessionExpired?: boolean) => {
  return createBrowserRouter([
    {
      errorElement: <PageNotFound />,
      children: [
        {
          path: "session-expired",
          element: <ExpiredSessionPage />,
        },
        {
          path: "switch-user",
          element: sessionExpired ? (
            <Navigate to="session-expired" />
          ) : (
            <Page withNav={false} />
          ),
          children: [{ index: true, element: <SwitchUser /> }],
        },
        {
          path: "/",
          element: sessionExpired ? (
            <Navigate to="session-expired" />
          ) : (
            <Page />
          ),
          children: [
            {
              index: true,
              element: <Home />
            },
            {
              path: "my-credits/*",
              element: <MyCreditsRoutes />,
            },
            {
              path: "my-savings/*",
              element: <MySavingsRoutes />,
            },
            {
              path: "my-cards/*",
              element: <MyCardsRoutes />,
            },
            {
              path: "my-requests/*",
              element: <MyRequestsRoutes />,
            },
            {
              path: "my-entries/*",
              element: <MyEntriesRoutes />,
            },
            {
              path: "payments/*",
              element: <PaymentsRoutes />,
            },
            {
              path: "transfers/*",
              element: <TransfersRoutes />,
            },
            {
              path: "credits/*",
              element: <CreditRoutes />,
            },
            {
              path: "savings/*",
              element: <SavingRoutes />,
            },
            {
              path: "events/*",
              element: <EventRoutes />,
            },
            {
              path: "tickets/*",
              element: <TicketRoutes />,
            },
            {
              path: "aids/*",
              element: <AidRoutes />,
            },
            {
              path: "my-pqrs/*",
              element: <MyPQRSRoutes />,
            },
            {
              path: "certifications",
              element: <CertificationRequest />,
            },
            {
              path: "update-data-assisted",
              element: <UpdateData />,
            },
          ],
        },
      ],
    },
  ]);
};

function App() {
  const { loginWithRedirect, isAuthenticated, isLoading, isSessionExpired } =
    useAuth();

  const [theme, setTheme] = useState<IThemeData>();

  useEffect(() => {
    if (!isAuthenticated && !isSessionExpired) return;

    const controller = new AbortController();

    getTokens(controller.signal)
      .then((tokens) => {
        if (tokens) {
          setTheme(tokens);
        }
      })
      .catch((error) => {
        if (controller.signal.aborted) return;
        console.error(error);
      });

    return () => {
      controller.abort();
    };
  }, [isAuthenticated, isSessionExpired]);

  useFonts(theme?.typography.fonts);

  useEffect(() => {
    if (!isLoading && !isAuthenticated && !isSessionExpired) {
      loginWithRedirect();
    }
  }, [isLoading, isAuthenticated, isSessionExpired]);

  if (!isAuthenticated && !isSessionExpired) {
    return null;
  }

  if (!theme) {
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
                    <RouterProvider router={getRouter(isSessionExpired)} />
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
