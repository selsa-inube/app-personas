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

import { Credit } from "@pages/admin/credits/Credit";
import { MyCredits } from "@pages/admin/credits/MyCredits";
import { Home } from "@pages/admin/home";

function App() {
  useFonts(theme.typography.fonts);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Page header={header} nav={nav} />}>
        <Route path="/" element={<Home />} />
        <Route path="my-credits" element={<MyCredits />} />
        <Route path="my-credits/:credit_id" element={<Credit />} />
      </Route>
    )
  );

  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}

export default App;
