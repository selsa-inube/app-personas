interface IContactDataEntry {
  id: string;
  country: string;
  countryName: string;
  department: string;
  departmentName: string;
  city: string;
  cityName: string;
  address: string;
  zipCode?: string;
  landlinePhone: number | "";
  cellPhone: number | "";
  email: string;
  currentData?: IContactDataEntry;
}

export type { IContactDataEntry };
