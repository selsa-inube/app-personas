import { IDomainType } from "@ptypes/domain.types";

interface IFamilyGroupEntry {
  firstName?: string;
  secondName?: string;
  firstLastName?: string;
  secondLastName?: string;
  type?: IDomainType;
  identificationNumber?: number;
  expeditionCountry?: string;
  city?: string;
  date?: string;
  id?: string;
  country?: string;
  address?: string;
  department?: string;
  zipCode?: number | "";
  landlinePhone?: number | "";
  cellPhone?: number;
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

export type { IFamilyGroupEntries, IFamilyGroupEntry };
