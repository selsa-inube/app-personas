import { IButtonAppearance } from "@inubekit/inubekit";

interface IDecisionModalOptions {
  title: string;
  description: (value: string) => string;
  actionText: string;
  appearance: IButtonAppearance;
  portalId: string;
}

export type { IDecisionModalOptions };
