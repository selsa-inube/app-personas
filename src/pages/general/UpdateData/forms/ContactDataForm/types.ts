interface IContactDataEntry {
  id: string;
  country: string;
  stateOrDepartment: string;
  city: string;
  address: string;
  zipCode: number | "";
  landlinePhone: number | "";
  cellPhone: number;
  email: string;
}

export type { IContactDataEntry };
