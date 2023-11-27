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
  bankEntity: string;
  accountType: string;
  accountNumber: number;
}

interface IResidence {
  type: string;
  stratum: string;
  bankEntity: string;
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
  descriptionOperations: string;
  country: string;
  bankEntity: string;
  currency: string;
  accountNumber: number;
}

interface IEconomicActivity {
  economicActivity: string;
  profession: string;
  job: string;
  mainCiiuActivity: string;
  secondaryCiiuActivity: string;
  economicSector: string;
  company: string;
  contractType: string;
  admissionDate: string;
  contractExpiration: string;
  severanceRegime: string;
  workday: string;
  position: string;
  dependence: string;
  employeeCode: string;
  companyFormality: string;
  companyCountry: string;
  companyCity: string;
  companyPhone: string;
  companyAddress: string;
  companyEmail: string;
}

interface IRelationshipWithDirectors {
  hasRelationshipWithDirectors: string;
  directorName: string;
  directorRelationship: string;
}
interface IThird {
  personalData: IPersonalData;
  contact: IContactData[];
  familyGroup?: IFamilyThird[];
  bankTransfersAccount: IBankTransfersAccount;
  financialOperations: IFinancialOperations;
  economicActivity?: IEconomicActivity;
  relationshipWithDirectors?: IRelationshipWithDirectors;
}

export type {
  IBankTransfersAccount,
  IContactData,
  IFamilyThird,
  IFinancialOperations,
  IIdentification,
  IPersonalData,
  IResidence,
  IThird,
  IEconomicActivity,
  IRelationshipWithDirectors,
};
