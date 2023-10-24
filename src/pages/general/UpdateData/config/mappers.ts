import { IEntry } from "@design/data/Table/types";
import { getValueOfDomain } from "@mocks/domains/domainService.mocks";
import { cityDM } from "src/model/domains/personalInformation/citydm";
import {
  IBankTransfersAccount,
  IContactData,
  IFinancialOperations,
  IResidence,
  IThird,
} from "src/model/entity/user";
import { currencyFormat } from "src/utils/formats";
import { IBankTransfersEntry } from "../forms/BankTransfersForm/types";
import { IContactDataEntry } from "../forms/ContactDataForm/types";
import { IFinancialOperationsEntry } from "../forms/FinancialOperationsForm/types";
import {
  IPersonalAssetEntries,
  IPersonalAssetEntry,
} from "../forms/PersonalAssetsForm/types";
import {
  IPersonalDebtEntries,
  IPersonalDebtEntry,
} from "../forms/PersonalDebtsForm/types";
import { IPersonalInformationEntry } from "../forms/PersonalInformationForm/types";
import {
  IPersonalReferenceEntries,
  IPersonalReferenceEntry,
} from "../forms/PersonalReferencesForm/types";
import { IPersonalResidenceEntry } from "../forms/PersonalResidenceForm/types";
import { ISocioeconomicInformationEntry } from "../forms/SocioeconomicInformationForm/types";

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
    bankEntity: bankTransfersAccount.bankEntity,
    accountType: bankTransfersAccount.accountType,
    accountNumber: bankTransfersAccount.accountNumber,
  };
};

const mapPersonalAsset = (
  personalAsset: IPersonalAssetEntry,
  index: number
): IEntry | IPersonalAssetEntry => {
  return {
    id: personalAsset.id || String(index),
    assetType: getValueOfDomain(personalAsset.assetType || "", "assetType")
      ?.value,
    commercialValue: currencyFormat(Number(personalAsset.commercialValue)),
    debtBalance: currencyFormat(Number(personalAsset.debtBalance)),
    financialEntity: personalAsset.financialEntity,
    observations: personalAsset.observations,
    quota: currencyFormat(Number(personalAsset.quota)),
  };
};

const mapPersonalAssets = (
  personalAssets: IPersonalAssetEntries["entries"]
): IEntry[] => {
  return personalAssets.map(
    (personalAsset, index) => mapPersonalAsset(personalAsset, index) as IEntry
  );
};

const mapPersonalDebt = (
  personalDebt: IPersonalDebtEntry,
  index: number
): IEntry | IPersonalDebtEntry => {
  return {
    id: personalDebt.id || String(index),
    liabilityType: getValueOfDomain(
      personalDebt.liabilityType || "",
      "liabilityType"
    )?.value,
    terminationDate: personalDebt.terminationDate,
    debtBalance: currencyFormat(Number(personalDebt.debtBalance)),
    financialEntity: personalDebt.financialEntity,
    quota: currencyFormat(Number(personalDebt.quota)),
    observations: personalDebt.observations,
  };
};

const mapPersonalDebts = (
  personalDebts: IPersonalDebtEntries["entries"]
): IEntry[] => {
  return personalDebts.map(
    (personalDebt, index) => mapPersonalDebt(personalDebt, index) as IEntry
  );
}

const mapPersonalReference = (
  personalAsset: IPersonalReferenceEntry,
  index: number
): IEntry | IPersonalReferenceEntry => {
  return {
    id: personalAsset.id || String(index),
    referenceType: getValueOfDomain(
      personalAsset.referenceType || "",
      "referenceType"
    )?.value,
    name: personalAsset.name,
    address: personalAsset.address,
    email: personalAsset.email,
    phone: personalAsset.phone,
    city: cityDM.valueOf(personalAsset.city || "")?.value,
    observations: personalAsset.observations,
  };
};

const mapPersonalReferences = (
  personalReferences: IPersonalReferenceEntries["entries"]
): IEntry[] => {
  return personalReferences.map(
    (personalReference, index) =>
      mapPersonalReference(personalReference, index) as IEntry
  );
};

const mapFinancialOperations = (
  financialOperationsData?: IFinancialOperations
): IFinancialOperationsEntry => {
  return {
    hasForeignCurrencyAccounts:
      financialOperationsData?.hasForeignCurrencyAccounts || "",
    hasForeignCurrencyTransactions:
      financialOperationsData?.hasForeignCurrencyAccounts || "",
    descriptionOperations: financialOperationsData?.descriptionOperations || "",
    country: financialOperationsData?.country || "",
    bankEntity: financialOperationsData?.bankEntity || "",
    currency: financialOperationsData?.currency || "",
    accountNumber: Number(financialOperationsData?.accountNumber),
  };
};

const mapPersonalResidence = (
  personalResidence: IResidence
): IPersonalResidenceEntry => {
  return {
    type: personalResidence.type,
    stratum: personalResidence.stratum,
    bankEntity: personalResidence.bankEntity,
    dueDate: personalResidence.dueDate,
    tenant: personalResidence.tenant,
    tenantCellPhone: personalResidence.tenantCellPhone,
    ownerName: personalResidence.ownerName,
    relationship: personalResidence.relationship,
    ownerCellPhone: personalResidence.ownerCellPhone,
  };
};

const mapSocioeconomicInformation = (
  socioeconomicData?: Record<string, string>
): ISocioeconomicInformationEntry => {
  return {
    educationLevel: socioeconomicData?.educationLevel || "",
    isResponsibleHome: socioeconomicData?.isResponsibleHome || "",
    isSingleMother: socioeconomicData?.isSingleMother || "",
    dependants: Number(socioeconomicData?.dependants) || 0,
    vulnerablePopulation: socioeconomicData?.vulnerablePopulation || "",
    isPublicExposed: socioeconomicData?.isPublicExposed || "",
    isDeclaredIncome: socioeconomicData?.isDeclaredIncome || "",
    isPublicOfficials: socioeconomicData?.isPublicOfficials || "",
  };
};

export {
  mapBankTransfers,
  mapContactData,
  mapFinancialOperations,
  mapPersonalAsset,
  mapPersonalAssets,
  mapPersonalDebt,
  mapPersonalDebts,
  mapPersonalInformation,
  mapPersonalReference,
  mapPersonalReferences,
  mapPersonalResidence,
  mapSocioeconomicInformation,
};
