import { IButtonAppearance } from "@inubekit/button";

interface IDecisionModalOptions {
  title: string;
  description: (value: string) => string;
  actionText: string;
  appearance: IButtonAppearance;
  portalId: string;
}

export type { IDecisionModalOptions };
