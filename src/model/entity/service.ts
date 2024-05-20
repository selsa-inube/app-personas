interface IRequiredDocument {
  id: string;
  label: string;
  failDetails?: string;
  value: "fail" | "success" | "pending";
  isRequired?: boolean;
}

interface IRegulation {
  id: string;
  label: string;
  failDetails?: string;
  value: "fail" | "success" | "pending";
  isRequired?: boolean;
}

interface IValidations {
  requiredDocuments: IRequiredDocument[];
  regulations: IRegulation[];
}

interface IAid {
  id: string;
  title: string;
  description: string;
  validations: IValidations;
}

export type { IAid };
