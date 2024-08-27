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

interface ISelectedDocument {
  file: File;
  id: string;
}

interface IAid {
  id: string;
  title: string;
  description: string;
  validations: IValidations;
}

export type { IAid, ISelectedDocument, IValidation, ValidationValueType };
