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
}

interface IContactData {
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

interface IThird {
  personalData: IPersonalData;
  contact: IContactData;
  familyGroup?: IFamilyThird[];
  bankTransfersAccount: IBankTransfersAccount;
}

export type {
  IContactData,
  IFamilyThird,
  IBankTransfersAccount,
  IIdentification,
  IPersonalData,
  IThird,
};
