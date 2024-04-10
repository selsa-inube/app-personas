import { IFeaturedFlag } from "src/model/entity/featuredFlag";

interface IAppContext {
  setFeaturedFlags: React.Dispatch<React.SetStateAction<IFeaturedFlag[]>>;
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
