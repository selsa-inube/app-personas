import { IThird, IContactData } from "src/model/entity/user";
import { IFinancialOperationsEntry } from "../forms/FinancialOperationsForm/types";
import { IPersonalInformationEntry } from "../forms/PersonalInformationForm/types";
import { IContactDataEntry } from "../forms/ContactDataForm/types";
import { IBankTransfersAccount } from "src/model/entity/user";
import { IBankTransfersEntry } from "../forms/BankTransfersForm/types";

const mapPersonalInformation = (
  personalInfoData: IThird
): IPersonalInformationEntry => {
  return {
    firstName: personalInfoData.personalData.identification.firstName,
    secondName: personalInfoData.personalData.identification.secondName || "",
    firstLastName: personalInfoData.personalData.identification.firstLastName,
    secondLastName:
      personalInfoData.personalData.identification.secondLastName || "",
    identificationType: personalInfoData.personalData.identification.type,
    identification: Number(personalInfoData.personalData.identification.number),
    expeditionPlace: personalInfoData.personalData.identification.city,
    expeditionDate: personalInfoData.personalData.identification.date || "",
    birthDate: personalInfoData.personalData.birthDate,
    city: personalInfoData.personalData.birthCity,
    gender: personalInfoData.personalData.gender,
    maritalStatus: personalInfoData.personalData.maritalStatus,
    bloodType: personalInfoData.personalData.bloodType,
  };
};

const mapContactData = (contactInfoData: IContactData): IContactDataEntry => {
  return {
    id: contactInfoData.id,
    country: contactInfoData.country,
    stateOrDepartment: contactInfoData.department,
    city: contactInfoData.city,
    address: contactInfoData.address,
    postalCode: contactInfoData.zipCode || "",
    landlinePhone: contactInfoData.landlinePhone || "",
    cellPhone: contactInfoData.cellPhone,
    email: contactInfoData.email,
  };
};

const mapBankTransfers = (
  bankTransfersAccount: IBankTransfersAccount
): IBankTransfersEntry => {
  return {
    bankingEntity: bankTransfersAccount.bankingEntity,
    accountType: bankTransfersAccount.accountType,
    accountNumber: bankTransfersAccount.accountNumber,
  };
};

const mapFinancialOperations = (
  financialOperationsData?: Record<string, string>
): IFinancialOperationsEntry => {
  return {
    hasForeignCurrencyAccounts: financialOperationsData?.financialOperations,
    hasForeignCurrencyTransactions:
      financialOperationsData?.financialOperations,
  };
};

export {
  mapFinancialOperations,
  mapPersonalInformation,
  mapContactData,
  mapBankTransfers,
};
