interface IContactDataEntry {
  id: string;
  country: string;
  department: string;
  city: string;
  address: string;
  zipCode: string;
  landlinePhone: number | "";
  cellPhone: number;
  email: string;
  currentData?: IContactDataEntry;
}

export type { IContactDataEntry };
