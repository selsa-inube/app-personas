interface IFamilyGroupEntry {
  firstName?: string;
  secondName?: string;
  firstLastName?: string;
  secondLastName?: string;
  type?: string;
  identificationNumber?: number;
  city?: string;
  date?: string;
  id?: string;
  country?: string;
  address?: string;
  department?: string;
  zipCode?: string;
  landlinePhone?: string;
  cellPhone?: string;
  email?: string;
  birthDate?: string;
  gender?: string;
  relationship?: string;
  isDependent?: boolean;
  educationLevel?: string;
  businessActivity?: string;
  profession?: string;
}

interface IFamilyGroupEntries extends IFamilyGroupEntry {
  entries: IFamilyGroupEntry[];
}

export type { IFamilyGroupEntry, IFamilyGroupEntries };
