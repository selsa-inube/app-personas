interface IIdentification {
  firstName: string;
  secondName?: string;
  firstLastName: string;
  secondLastName?: string;
  type: string;
  number: string;
  city: string;
  date?: string;
}

interface IPersonalData {
  identification: IIdentification;
  birthDate: string;
  birthCity: string;
  gender: string;
  maritalStatus: string;
  bloodType: string;
  residence: IResidence;
}

interface IContactData {
  id: string;
  country: string;
  address: string;
  department: string;
  city: string;
  zipCode?: string;
  landlinePhone?: string;
  cellPhone: string;
  email: string;
}

interface IFamilyThird {
  identification: IIdentification;
  contact: IContactData;
  information: {
    birthDate: string;
    gender: string;
    relationship: string;
    isDependent?: boolean;
    educationLevel?: string;
    businessActivity?: string;
    profession?: string;
  };
}

interface IBankTransfersAccount {
  bankingEntity: string;
  accountType: string;
  accountNumber: number;
}

interface IResidence {
  type: string;
  stratum: string;
  bankingEntity: string;
  dueDate: string;
  tenant: string;
  tenantCellPhone: string;
  ownerName: string;
  relationship: string;
  ownerCellPhone: string;
}

interface IFinancialOperations {
  hasForeignCurrencyTransactions: string;
  hasForeignCurrencyAccounts: string;
  descriptionOperationsForeignCurrency: string;
  country: string;
  bankingEntity: string;
  currency: string;
  accountNumber: number;
}
interface IThird {
  personalData: IPersonalData;
  contact: IContactData[];
  familyGroup?: IFamilyThird[];
  bankTransfersAccount: IBankTransfersAccount;
  financialOperations: IFinancialOperations;
}

export type {
  IContactData,
  IFamilyThird,
  IBankTransfersAccount,
  IIdentification,
  IPersonalData,
  IFinancialOperations,
  IResidence,
  IThird,
};
