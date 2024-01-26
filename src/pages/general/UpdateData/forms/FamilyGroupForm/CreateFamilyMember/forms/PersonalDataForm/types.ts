interface IPersonalDataEntry {
  identificationNumber?: string;
  type?: string;
  firstName?: string;
  secondName?: string;
  firstLastName?: string;
  secondLastName?: string;
  relationship?: string;
  isDependent?: boolean;
}

export type { IPersonalDataEntry };
