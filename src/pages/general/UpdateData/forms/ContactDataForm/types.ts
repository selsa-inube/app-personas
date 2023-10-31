interface IContactDataEntry {
  id: string;
  country: string;
  stateOrDepartment: string;
  city: string;
  address: string;
  postalCode: string;
  landlinePhone: string;
  cellPhone: string;
  email: string;
}

interface IRequiredFields {
  country: boolean;
  stateOrDepartment: boolean;
  city: boolean;
  address: boolean;
  postalCode: boolean;
  landlinePhone: boolean;
  cellPhone: boolean;
  email: boolean;
}

export type { IContactDataEntry, IRequiredFields };
