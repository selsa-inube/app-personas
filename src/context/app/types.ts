import { IFeatureFlag } from "src/model/entity/featureFlag";

interface IAppContext {
  setFeatureFlags: React.Dispatch<React.SetStateAction<IFeatureFlag[]>>;
  getFlag: (flagId: string) =>
    | {
        id: string;
        name: string;
        description: string;
        value: boolean;
      }
    | undefined;
}

export type { IAppContext };
