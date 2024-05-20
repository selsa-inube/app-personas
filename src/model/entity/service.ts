interface IValidation {
  requiredDocuments: string[];
  regulations: string[];
}

interface IAid {
  id: string;
  title: string;
  description: string;
  validations: IValidation;
}

export type { IAid };
