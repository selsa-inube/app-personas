import { IDomainType } from "@ptypes/domain.types";

interface IPersonalDataEntry {
  identificationNumber?: string;
  type?: IDomainType;
  firstName?: string;
  secondName?: string;
  firstLastName?: string;
  secondLastName?: string;
  relationship?: string;
  isDependent?: string;
}

export type { IPersonalDataEntry };
