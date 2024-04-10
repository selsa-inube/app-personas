interface IFeaturedFlag {
  id: string;
  name: string;
  description: string;
  value: boolean;
}

interface IFeaturedFlags {
  [key: string]: IFeaturedFlag;
}

export type { IFeaturedFlag, IFeaturedFlags };
