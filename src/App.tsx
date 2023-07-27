import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import { GlobalStyles } from "@design/styles";
import { ThemeProvider } from "styled-components";
import { useFonts } from "./hooks/useFonts";

import { header } from "./config/header";
import { nav } from "./config/nav";
import { theme } from "./config/theme";

import { Page } from "@design/layout/Page";

import { Home } from "@pages/home";

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
