interface IValidation {
  requiredDocuments: string[];
  notes: string;
}

interface IAid {
  id: string;
  title: string;
  description: string;
  validation: IValidation;
}

export type { IAid };
