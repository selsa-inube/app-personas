interface IAddress {
  id: string;
  country: string;
  countryName: string;
  department: string;
  departmentName: string;
  city: string;
  cityName: string;
  address: string;
  zipCode?: string;
  landlinePhone: string;
}

interface IContactDataEntry {
  cellPhone: number | "";
  email: string;
  addresses: IAddress[];
  currentData?: IContactDataEntry;
}

export type { IAddress, IContactDataEntry };
