interface IValidation {
  id: string;
  label: string;
  failDetails?: string;
  value?: "fail" | "success" | "pending";
  isRequired?: boolean;
}

interface IValidations {
  requiredDocuments: IValidation[];
  regulations: IValidation[];
}

interface IAid {
  id: string;
  title: string;
  description: string;
  validations: IValidations;
}

export type { IAid, IValidation };
