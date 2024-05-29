import { IUser } from "@inube/auth/dist/types/user";
import { IFeatureFlag } from "src/model/entity/featureFlag";

interface IAppContext {
  user: IUser;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  setFeatureFlags: React.Dispatch<React.SetStateAction<IFeatureFlag[]>>;
  getFlag: (flagId: string) => {
    id: string;
    name: string;
    description: string;
    value: boolean;
  };
}

export type { IAppContext };
