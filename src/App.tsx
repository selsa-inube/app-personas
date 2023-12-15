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
import { useEffect } from "react";
import { CreditRoutes } from "./routes/credit";
import { SavingRoutes } from "./routes/saving";
import { MyCreditsRoutes } from "./routes/myCredits";
import { MySavingsRoutes } from "./routes/mySavings";

import { useAuth } from "@inube/auth";

const USER_ID = "1";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Page header={header} nav={nav} />}>
      <Route path="/" element={<Home />} />

      <Route path="my-credits/*" element={<MyCreditsRoutes />} />

      <Route path="my-savings/*" element={<MySavingsRoutes />} />

      <Route path="credit/*" element={<CreditRoutes />} />

      <Route path="savings/*" element={<SavingRoutes />} />

      <Route path="/update-data" element={<UpdateData />} />
    </Route>
  )
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
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}

export { USER_ID };
export default App;
