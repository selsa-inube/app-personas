import { enviroment } from "@config/enviroment";
import { useAuth } from "@inube/auth";
import { IUser } from "@inube/auth/dist/types/user";
import { developmentUsersMock } from "@mocks/users/users.mocks";
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { IFeatureFlag } from "src/model/entity/featureFlag";
import { saveTrafficTracking } from "src/services/analytics/saveTrafficTracking";
import { IAppContext } from "./types";
import { getAppFeatureFlags } from "./utils";

const AppContext = createContext<IAppContext>({} as IAppContext);

interface AppProviderProps {
  children: React.ReactNode;
}

function AppProvider(props: AppProviderProps) {
  const { children } = props;

  const [featureFlags, setFeatureFlags] = useState<IFeatureFlag[]>([]);

  const { user: authUser } = useAuth();

  const [user] = useState<IUser>({
    company: authUser?.company || "",
    email: authUser?.email || "",
    identification: enviroment.IS_PRODUCTION
      ? authUser?.identification || ""
      : developmentUsersMock[authUser?.identification || ""],
    phone: authUser?.phone || "",
    firstLastName: authUser?.firstLastName || "",
    secondLastName: authUser?.secondLastName || "",
    firstName: authUser?.firstName || "",
    secondName: authUser?.secondName || "",
    id: authUser?.id || "",
    type: authUser?.type || "",
  });

  useEffect(() => {
    getAppFeatureFlags().then((flags) => {
      setFeatureFlags(flags);
    });

    saveTrafficTracking(user?.identification);
  }, []);

  const getFlag = useCallback(
    (flagId: string) => {
      const [scope, category, product, flagCode] = flagId.split(".");

      const foundFlag = featureFlags.find((flag) => {
        return flag[scope]?.[category]?.[product]?.[flagCode];
      });

      if (!foundFlag) {
        return {
          id: flagCode,
          name: "",
          description: "",
          value: false,
        };
      }

      return foundFlag?.[scope][category][product][flagCode];
    },
    [featureFlags],
  );

  const appContext = useMemo(
    () => ({
      user,

      setFeatureFlags,
      getFlag,
    }),
    [user, setFeatureFlags, getFlag],
  );

  return (
    <AppContext.Provider value={appContext}>{children}</AppContext.Provider>
  );
}

export { AppContext, AppProvider };
export type { AppProviderProps };
