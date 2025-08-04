import { IUser } from "@inube/auth/dist/types/user";
import { IOption } from "@inubekit/inubekit";
import { IFeatureFlag } from "src/model/entity/featureFlag";
import { IThird } from "src/model/entity/user";

interface IFullUser extends IUser {
  data?: IThird;
}

interface IServiceDomains {
  integratedbanks: IOption[];
  identificationtype: IOption[];
  actionafterexpiration: IOption[];
  countries: IOption[];
  departments: IOption[];
  cities: IOption[];
  gender: IOption[];
  civilstatus: IOption[];
  rhfactor: IOption[];
  relationshiptheowner: IOption[];
  schoolinglevel: IOption[];
  vulnerableprotectiongroup: IOption[];
  valueOf: (id: string, domain: keyof IServiceDomains) => IOption | undefined;
}

interface IAppContext {
  user: IFullUser;
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
    domainNames: (keyof IServiceDomains)[],
    accessToken: string,
  ) => Promise<IServiceDomains>;
}

export type { IAppContext, IFullUser, IServiceDomains };
