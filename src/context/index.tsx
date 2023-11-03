import { authConfig } from "@config/auth";
import { theme } from "@config/theme";
import { createContext, useEffect, useMemo } from "react";
import useAuth from "src/services/identidad/hooks/useAuth";
import { ThemeProvider } from "styled-components";
import { IAppContext } from "./types";

export const AppContext = createContext<IAppContext>({} as IAppContext);

interface AppContextProviderProps {
  children: React.ReactNode;
}

function AppContextProvider(props: AppContextProviderProps) {
  const { children } = props;
  const { user, isLoading, loginWithRedirect, isAuthenticated, logout } =
    useAuth(authConfig);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect();
    }
  }, [isLoading, isAuthenticated]);

  const handleLogout = () => {
    logout();
  };

  const appContext = useMemo(
    () => ({
      user,

      handleLogout,
    }),
    [user, handleLogout]
  );

  return (
    <AppContext.Provider value={appContext}>
      <ThemeProvider theme={theme}>{isAuthenticated && children}</ThemeProvider>
    </AppContext.Provider>
  );
}

export { AppContextProvider };
