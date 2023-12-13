interface IFamilyGroupEntry {
  firstName?: string;
  secondName?: string;
  firstLastName?: string;
  secondLastName?: string;
  type?: string;
  number?: string;
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
  isDependent?: string;
  educationLevel?: string;
  businessActivity?: string;
  profession?: string;
}

interface IFamilyGroupEntries extends IFamilyGroupEntry {
  entries: IFamilyGroupEntry[];
}

export type { IFamilyGroupEntry, IFamilyGroupEntries };
