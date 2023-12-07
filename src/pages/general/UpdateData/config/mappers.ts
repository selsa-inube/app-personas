import { IEntry } from "@design/data/Table/types";
import { getValueOfDomain } from "@mocks/domains/domainService.mocks";
import { cityDM } from "src/model/domains/personalInformation/citydm";
import {
  IBankTransfersAccount,
  IContactData,
  IEconomicActivity,
  IFamilyThird,
  IFinancialOperations,
  IRelationshipWithDirectors,
  IResidence,
  IThird,
} from "src/model/entity/user";
import { currencyFormat } from "src/utils/formats";
import { IBankTransfersEntry } from "../forms/BankTransfersForm/types";
import { IContactDataEntry } from "../forms/ContactDataForm/types";
import { IEconomicActivityEntry } from "../forms/EconomicActivityForm/types";
import { IExpensesEntry } from "../forms/ExpensesForm/types";
import { IFamilyGroupEntry } from "../forms/FamilyGroupForm/types";
import { IFinancialOperationsEntry } from "../forms/FinancialOperationsForm/types";
import { IIncomesEntry } from "../forms/IncomesForm/types";
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
import { IRelationshipWithDirectorsEntry } from "../forms/RelationshipWithDirectorsForm/types";
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

const mapFamilyGroup = (
  familyGroupData: IFamilyThird,
  index: number
): IFamilyGroupEntry => {
  return {
    firstName: familyGroupData.identification.firstName,
    secondName: familyGroupData.identification.secondName || "",
    firstLastName: familyGroupData.identification.firstLastName,
    secondLastName: familyGroupData.identification.secondLastName || "",
    type: familyGroupData.identification.type,
    number: familyGroupData.identification.number,
    city: familyGroupData.identification.city,
    date: familyGroupData.identification.date || "",
    id: String(index),
    country: familyGroupData.contact.country,
    address: familyGroupData.contact.address,
    department: familyGroupData.contact.department,
    zipCode: familyGroupData.contact.zipCode || "",
    landlinePhone: familyGroupData.contact.landlinePhone || "",
    cellPhone: familyGroupData.contact.cellPhone,
    email: familyGroupData.contact.email,
    birthDate: familyGroupData.information.birthDate || "",
    gender: familyGroupData.information.gender,
    relationship: familyGroupData.information.relationship,
    isDependent: familyGroupData.information.isDependent,
    educationLevel: familyGroupData?.information.educationLevel || "",
    businessActivity: familyGroupData?.information.businessActivity || "",
    profession: familyGroupData?.information.profession || "",
  };
};

const mapFamilyGroups = (familyGroups: IFamilyThird[]): IFamilyGroupEntry[] => {
  return familyGroups.map((familyGroup, index) =>
    mapFamilyGroup(familyGroup, index)
  );
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
    assetName: personalAsset.assetName,
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
    debtName: personalDebt.debtName,
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
};

const mapPersonalReference = (
  personalReference: IPersonalReferenceEntry,
  index: number
): IEntry | IPersonalReferenceEntry => {
  return {
    id: personalReference.id || String(index),
    referenceType: getValueOfDomain(
      personalReference.referenceType || "",
      "referenceType"
    )?.value,
    name: personalReference.name,
    address: personalReference.address,
    email: personalReference.email,
    phone: personalReference.phone,
    city: cityDM.valueOf(personalReference.city || "")?.value,
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
  personalResidence?: IResidence
): IPersonalResidenceEntry => {
  return {
    type: personalResidence?.type || "",
    stratum: personalResidence?.stratum || "",
    bankEntity: personalResidence?.bankEntity || "",
    dueDate: personalResidence?.dueDate || "",
    tenant: personalResidence?.tenant || "",
    tenantCellPhone: personalResidence?.tenantCellPhone || "",
    ownerName: personalResidence?.ownerName || "",
    relationship: personalResidence?.relationship || "",
    ownerCellPhone: personalResidence?.ownerCellPhone || "",
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
    isDeclaredIncomes: socioeconomicData?.isDeclaredIncomes || "",
    isPublicOfficials: socioeconomicData?.isPublicOfficials || "",
  };
};

const mapEconomicActivity = (
  economicActivityData?: IEconomicActivity
): IEconomicActivityEntry => {
  return {
    economicActivity: economicActivityData?.economicActivity || "",
    profession: economicActivityData?.profession || "",
    job: economicActivityData?.job || "",
    mainCiiuActivity: economicActivityData?.mainCiiuActivity || "",
    secondaryCiiuActivity: economicActivityData?.secondaryCiiuActivity || "",
    economicSector: economicActivityData?.economicSector || "",
    company: economicActivityData?.company || "",
    contractType: economicActivityData?.contractType || "",
    admissionDate: economicActivityData?.admissionDate || "",
    contractExpiration: economicActivityData?.contractExpiration || "",
    severanceRegime: economicActivityData?.severanceRegime || "",
    workday: economicActivityData?.workday || "",
    position: economicActivityData?.position || "",
    dependence: economicActivityData?.dependence || "",
    employeeCode: economicActivityData?.employeeCode || "",
    companyFormality: economicActivityData?.companyFormality || "",
    companyCountry: economicActivityData?.companyCountry || "",
    companyCity: economicActivityData?.companyCity || "",
    companyPhone: economicActivityData?.companyPhone || "",
    companyAddress: economicActivityData?.companyAddress || "",
    companyEmail: economicActivityData?.companyEmail || "",
  };
};

const mapIncomes = (incomeData?: Record<string, string>): IIncomesEntry => {
  return {
    basicSalary: "",
    bonds: "",
    commissions: "",
    overtime: "",
    transportationAssistance: "",
    foodAssistance: "",
    others: "",
    totalIncomes: "",
  };
};

const mapExpenses = (expensesData?: Record<string, string>): IExpensesEntry => {
  return {
    personalExpenses: "",
    familyExpenses: "",
    credits: "",
    creditCards: "",
    health: "",
    pension: "",
    others: "",
  };
};

const mapRelationshipWithDirectors = (
  relationshipWithDirectorsData?: IRelationshipWithDirectors
): IRelationshipWithDirectorsEntry => {
  return {
    hasRelationshipWithDirectors:
      relationshipWithDirectorsData?.hasRelationshipWithDirectors || "",
    directorName: relationshipWithDirectorsData?.directorName || "",
    directorRelationship:
      relationshipWithDirectorsData?.directorRelationship || "",
  };
};

export {
  mapBankTransfers,
  mapContactData,
  mapEconomicActivity,
  mapExpenses,
  mapFamilyGroup,
  mapFamilyGroups,
  mapFinancialOperations,
  mapIncomes,
  mapPersonalAsset,
  mapPersonalAssets,
  mapPersonalDebt,
  mapPersonalDebts,
  mapPersonalInformation,
  mapPersonalReference,
  mapPersonalReferences,
  mapPersonalResidence,
  mapRelationshipWithDirectors,
  mapSocioeconomicInformation,
};
