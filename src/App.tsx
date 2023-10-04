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

import { useAuth0 } from "@auth0/auth0-react";
import { Home } from "@pages/admin/home";
import { useEffect } from "react";
import { AdminRoutes } from "./routes/admin";
import { UpdateData } from "@pages/general/UpdateData";
import { RequestRoutes } from "./routes/request";

const USER_ID = "1";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Page header={header} nav={nav} />}>
      <Route path="/" element={<Home />} />
      <AdminRoutes />

      <Route path="request/*" element={<RequestRoutes />} />
      <Route path="/update-data" element={<UpdateData />} />
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
