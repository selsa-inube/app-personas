import { ButtonAppearanceType } from "@design/input/Button/types";

interface IDecisionModalOptions {
  title: string;
  description: (value: string) => string;
  actionText: string;
  appearance: ButtonAppearanceType;
  portalId: string;
}

export type { IDecisionModalOptions };
