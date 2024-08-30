interface ITermsAndConditionsEntry {
  productId: string;
  termsConditions: string[];
  ids: string[];
  accept: boolean;
  acceptDataPolicy: boolean;
}

export type { ITermsAndConditionsEntry };
