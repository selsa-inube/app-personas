import { IUser } from "@inube/auth/dist/types/user";
import { IOption } from "@inubekit/inubekit";
import { IFeatureFlag } from "src/model/entity/featureFlag";

interface IServiceDomains {
  integratedbanks: IOption[];
  identificationtype: IOption[];
  actionafterexpiration: IOption[];
}

interface IAppContext {
  user: IUser;
  serviceDomains: IServiceDomains;

  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  setFeatureFlags: React.Dispatch<React.SetStateAction<IFeatureFlag[]>>;
  getFlag: (flagId: string) => {
    id: string;
    name: string;
    description: string;
    value: boolean;
  };
  loadServiceDomains: (
    domainNames: string[],
    accessToken: string,
  ) => Promise<IServiceDomains>;
}

export type { IAppContext, IServiceDomains };
