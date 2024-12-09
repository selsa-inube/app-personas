import { ISelectOption } from "@design/input/Select/types";
import { IUser } from "@inube/auth/dist/types/user";
import { IFeatureFlag } from "src/model/entity/featureFlag";

interface IServiceDomains {
  integratedbanks: ISelectOption[];
  identificationtype: ISelectOption[];
  actionafterexpiration: ISelectOption[];
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
