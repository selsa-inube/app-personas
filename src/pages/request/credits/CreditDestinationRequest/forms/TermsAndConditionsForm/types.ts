interface ITermsAndConditionsEntry {
  productId: string;
  termsConditions: string[];
  ids: string;
  dataPolicyUrl: string;
  accept: boolean;
  acceptDataPolicy: boolean;
}

export type { ITermsAndConditionsEntry };
