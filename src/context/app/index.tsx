import { enviroment } from "@config/enviroment";
import { useAuth } from "@inube/auth";
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { IFeatureFlag } from "src/model/entity/featureFlag";
import { saveTraffic } from "src/services/analytics/saveTraffic";
import { IAppContext } from "./types";
import { getAppFeatureFlags } from "./utils";

const AppContext = createContext<IAppContext>({} as IAppContext);

interface AppProviderProps {
  children: React.ReactNode;
}

function AppProvider(props: AppProviderProps) {
  const { children } = props;

  const [featureFlags, setFeatureFlags] = useState<IFeatureFlag[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    getAppFeatureFlags().then((flags) => {
      setFeatureFlags(flags);
    });

    if (user && enviroment.IS_PRODUCTION) {
      saveTraffic(user?.identification);
    }
  }, []);

  const getFlag = useCallback(
    (flagId: string) => {
      const [scope, category, product, flagCode] = flagId.split(".");

      const foundFlag = featureFlags.find((flag) => {
        return flag[scope]?.[category]?.[product]?.[flagCode];
      });

      if (!foundFlag) return;

      return foundFlag?.[scope][category][product][flagCode];
    },
    [featureFlags],
  );

  const appContext = useMemo(
    () => ({
      setFeatureFlags,
      getFlag,
    }),
    [setFeatureFlags, getFlag],
  );

  return (
    <AppContext.Provider value={appContext}>{children}</AppContext.Provider>
  );
}

export { AppContext, AppProvider };
export type { AppProviderProps };
