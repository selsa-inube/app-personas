import { IFeaturedFlags } from "src/model/entity/featuredFlag";

interface IAppContext {
  featuredFlags: IFeaturedFlags | undefined;

  setFeaturedFlags: React.Dispatch<
    React.SetStateAction<IFeaturedFlags | undefined>
  >;
}

export type { IAppContext };
