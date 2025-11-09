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
  landlinePhone: string;
  cellPhone: string;
  email: string;
  currentData?: IContactDataEntry;
}

enum EModalActiveState {
  IDLE = 'idle',
  CREATE = 'create',
  EDIT = 'edit',
  DELETE = 'delete'
}

export type { IContactDataEntry };
export { EModalActiveState };
