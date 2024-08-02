type ValidationValueType = "fail" | "success" | "pending";

interface IValidation {
  id: string;
  label: string;
  failDetails?: string;
  value?: ValidationValueType;
  isRequired?: boolean;
  pending?: boolean;
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

export type { IAid, IValidation, ValidationValueType };
