import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { IFeaturedFlag } from "src/model/entity/featuredFlag";
import { IAppContext } from "./types";
import { getAppFeaturedFlags } from "./utils";

const AppContext = createContext<IAppContext>({} as IAppContext);

interface AppProviderProps {
  children: React.ReactNode;
}

function AppProvider(props: AppProviderProps) {
  const { children } = props;

  const [featuredFlags, setFeaturedFlags] = useState<IFeaturedFlag[]>([]);

  useEffect(() => {
    getAppFeaturedFlags().then((flags) => {
      setFeaturedFlags(flags);
    });
  }, []);

  const getFlag = useCallback(
    (flagId: string) => {
      const [scope, category, product, flagCode] = flagId.split(".");

      const foundFlag = featuredFlags.find((flag) => {
        return flag[scope]?.[category]?.[product]?.[flagCode];
      });

      if (!foundFlag) return;

      return foundFlag?.[scope][category][product][flagCode];
    },
    [featuredFlags],
  );

  const appContext = useMemo(
    () => ({
      setFeaturedFlags,
      getFlag,
    }),
    [setFeaturedFlags, getFlag],
  );

  return (
    <AppContext.Provider value={appContext}>{children}</AppContext.Provider>
  );
}

export { AppContext, AppProvider };
export type { AppProviderProps };
