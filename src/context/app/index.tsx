import { createContext, useEffect, useMemo, useState } from "react";
import { IFeaturedFlags } from "src/model/entity/featuredFlag";
import { IAppContext } from "./types";
import { getAppFeaturedFlags } from "./utils";

const AppContext = createContext<IAppContext>({} as IAppContext);

interface AppProviderProps {
  children: React.ReactNode;
}

function AppProvider(props: AppProviderProps) {
  const { children } = props;

  const [featuredFlags, setFeaturedFlags] = useState<IFeaturedFlags>();

  useEffect(() => {
    getAppFeaturedFlags().then((flags) => {
      setFeaturedFlags(flags);
    });
  }, []);

  const appContext = useMemo(
    () => ({
      featuredFlags,

      setFeaturedFlags,
    }),
    [featuredFlags, setFeaturedFlags],
  );

  return (
    <AppContext.Provider value={appContext}>{children}</AppContext.Provider>
  );
}

export { AppContext, AppProvider };
export type { AppProviderProps };
