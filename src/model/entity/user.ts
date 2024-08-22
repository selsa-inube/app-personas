import { ISelectOption } from "@design/input/Select/types";
import { IDomainType } from "@ptypes/domain.types";

interface IIdentification {
  firstName: string;
  secondName?: string;
  firstLastName: string;
  secondLastName?: string;
  type: IDomainType;
  identificationNumber: number;
  country: string;
  departament: string;
  city: string;
  date?: string;
}

interface IPersonalData {
  identification: IIdentification;
  birthDate: string;
  birthCity: string;
  birthCountry: string;
  gender: string;
  maritalStatus: string;
  bloodType: string;
  residence?: IResidence;
}

interface IContactData {
  id: string;
  country: string;
  address: string;
  department: string;
  city: string;
  zipCode?: number;
  landlinePhone?: number;
  cellPhone: number;
  email: string;
}

interface IReferenceThird {
  identification: IIdentification;
  contact: IContactData;
  information: {
    birthDate: string;
    gender: string;
    relationship?: string;
    isDependent?: string;
    educationLevel?: string;
    businessActivity?: string;
    profession?: string;
  };
}

interface IFamilyThird {
  identification: IIdentification;
  contact: IContactData;
  information: {
    birthDate: string;
    gender: string;
    relationship: string;
    isDependent?: string;
    educationLevel?: string;
    businessActivity?: string;
    profession?: string;
  };
}

interface IBankTransfersAccount {
  bankEntity: string;
  accountType: string;
  accountNumber: string;
  description: string;
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
  paymentMethod?: ISelectOption;
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
interface IDirector {
  id: string;
  name: string;
}

interface IBeneficiary {
  name: string;
  identificationType: string;
  identificationNumber: string;
  relationship: IDomainType;
}

interface IConsultingUser {
  id: string;
  name: string;
  identificationType: string;
}

export type {
  IBankTransfersAccount,
  IBeneficiary,
  IConsultingUser,
  IContactData,
  IDirector,
  IEconomicActivity,
  IFamilyThird,
  IFinancialOperations,
  IIdentification,
  IPersonalData,
  IReferenceThird,
  IRelationshipWithDirectors,
  IResidence,
  IThird,
};
