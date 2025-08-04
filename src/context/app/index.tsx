import { enviroment } from "@config/enviroment";
import { useAuth } from "@inube/auth";
import { superUsers } from "@pages/admin/switchUser/config/users";
import { identifyLog, initLogRocket } from "@utils/logrocket";
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Helmet } from "react-helmet-async";
import { IFeatureFlag } from "src/model/entity/featureFlag";
import { saveTrafficTracking } from "src/services/analytics/saveTrafficTracking";
import { getCustomer } from "src/services/iclient/customers/getCustomer";
import { getDomains } from "src/services/iclient/domains/getDomains";
import { getCities } from "src/services/iclient/general/getCities";
import { getCountries } from "src/services/iclient/general/getCountries";
import { getDepartments } from "src/services/iclient/general/getDepartments";
import { IAppContext, IFullUser, IServiceDomains } from "./types";
import { getAppFeatureFlags, initialServiceDomains } from "./utils";

const AppContext = createContext<IAppContext>({} as IAppContext);

interface AppProviderProps {
  children: React.ReactNode;
}

function AppProvider(props: AppProviderProps) {
  const { children } = props;

  const [featureFlags, setFeatureFlags] = useState<IFeatureFlag[]>([]);

  const createServiceDomains = (
    domains: Omit<IServiceDomains, "valueOf">,
  ): IServiceDomains => ({
    ...domains,
    valueOf(id, domain) {
      const domainValues = this[domain];
      return Array.isArray(domainValues)
        ? domainValues.find((item) => item.id === id)
        : undefined;
    },
  });

  const [serviceDomains, setServiceDomains] = useState<IServiceDomains>(
    createServiceDomains(initialServiceDomains),
  );

  const { user: authUser, accessToken } = useAuth();

  const [user, setUser] = useState<IFullUser>({
    company: authUser?.company || "",
    email: authUser?.email || "",
    identification: superUsers.includes(authUser?.identification || "")
      ? ""
      : authUser?.identification || "",
    phone: authUser?.phone || "",
    firstLastName: authUser?.firstLastName || "",
    secondLastName: authUser?.secondLastName || "",
    firstName: authUser?.firstName || "",
    secondName: authUser?.secondName || "",
    id: authUser?.id || "",
    type: authUser?.type || "",
  });

  const getUserInformation = useCallback(() => {
    if (!user.identification || !accessToken) return;

    getCustomer(user.identification, accessToken).then((customer) => {
      setUser((prev) => ({
        ...prev,
        data: customer,
      }));

      if (!superUsers.includes(authUser?.identification || "")) {
        initLogRocket();
        identifyLog(user);
      }
    });
  }, [user.identification]);

  useEffect(() => {
    getAppFeatureFlags().then((flags) => {
      setFeatureFlags(flags);
    });
  }, []);

  useEffect(() => {
    if (!user.identification) return;

    getUserInformation();

    saveTrafficTracking(user.identification);
  }, [user.identification]);

  useEffect(() => {
    const consultingUser = sessionStorage.getItem("consultingUser");

    if (consultingUser) {
      const consultingUserJson = JSON.parse(consultingUser);

      const splitName = consultingUserJson.name.split(" ");

      setUser((prev) => ({
        ...prev,
        firstLastName: splitName[0] || "",
        secondLastName: splitName[1] || "",
        firstName: splitName[2] || splitName[1] || "",
        secondName: splitName[3] || splitName[2] || "",
        identification: consultingUserJson.id,
      }));

      return;
    }

    const location = window.location;
    if (location.href.includes("switch-user")) return;

    if (superUsers.includes(authUser?.identification || "")) {
      window.history.pushState(
        {},
        "",
        `/switch-user?redirect_to=${location.pathname}`,
      );
      window.dispatchEvent(new PopStateEvent("popstate"));
    }
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

  const loadServiceDomains = useCallback(
    async (domainNames: (keyof IServiceDomains)[], accessToken: string) => {
      let newServiceDomains = { ...serviceDomains };

      if (domainNames.includes("countries")) {
        const countries = await getCountries(accessToken);

        newServiceDomains = {
          ...newServiceDomains,
          countries: countries || [],
        };
      }
      if (domainNames.includes("departments")) {
        const departments = await getDepartments(accessToken);

        newServiceDomains = {
          ...newServiceDomains,
          departments: departments || [],
        };
      }

      if (domainNames.includes("cities")) {
        const cities = await getCities(accessToken);

        newServiceDomains = {
          ...newServiceDomains,
          cities: cities || [],
        };
      }

      const newDomains = await getDomains(domainNames, accessToken);
      if (!newDomains) return serviceDomains;

      const valueOf = (id: string, domain: keyof IServiceDomains) => {
        const combinedDomains = {
          ...newServiceDomains,
          ...newDomains,
        };

        const domainValues = combinedDomains[domain];

        return Array.isArray(domainValues)
          ? domainValues.find((item) => item.value === id)
          : undefined;
      };

      setServiceDomains((prev) => ({
        ...prev,
        ...newServiceDomains,
        ...newDomains,
        valueOf,
      }));

      return newDomains;
    },
    [],
  );

  const appContext = useMemo(
    () => ({
      user,
      serviceDomains,

      setUser,
      setFeatureFlags,
      getFlag,
      loadServiceDomains,
    }),
    [
      user,
      serviceDomains,
      setUser,
      setFeatureFlags,
      getFlag,
      loadServiceDomains,
    ],
  );

  return (
    <AppContext.Provider value={appContext}>
      <Helmet>
        <title>{enviroment.CLIENT_NAME} - Personas</title>
        <link
          rel="icon"
          type="image/png"
          href={`https://storage.googleapis.com/assets-clients/inube/${enviroment.BUSINESS_UNIT}/icons/${enviroment.BUSINESS_UNIT}-16x16_transparent.png`}
        />
      </Helmet>
      {children}
    </AppContext.Provider>
  );
}

export { AppContext, AppProvider };
export type { AppProviderProps };
