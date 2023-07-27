import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import { useFonts } from "./hooks/useFonts";
import { GlobalStyles } from "./design/styles";
import { ThemeProvider } from "styled-components";

import { theme } from "@config/theme";
import { header } from "@config/header";
import { nav } from "@config/nav";

import { Page } from "./design/layout/Page";

import { Home } from "./pages/home";

function App() {
  useFonts(theme.typography.fonts);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Page header={header} nav={nav} />}>
        <Route path="/" element={<Home />} />
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
