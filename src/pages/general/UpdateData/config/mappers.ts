import { IEntry } from "@design/data/Table/types";
import { getValueOfDomain } from "@mocks/domains/domainService.mocks";
import { IFullUser } from "src/context/app/types";
import { countryDM } from "src/model/domains/general/updateData/financialOperations/countrydm";
import { cityDM } from "src/model/domains/general/updateData/personalInformation/citydm";
import { departmentDM } from "src/model/domains/general/updateData/personalInformation/departamentdm";
import {
  IBankTransfersAccount,
  IEconomicActivity,
  IFamilyThird,
  IFinancialOperations,
  IRelationshipWithDirectors,
  IResidence,
} from "src/model/entity/user";
import { currencyFormat } from "src/utils/currency";
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

const mapPersonalInformation = (user: IFullUser): IPersonalInformationEntry => {
  const newData = {
    firstName: user.firstName,
    secondName: user.secondName || "",
    firstLastName: user.firstLastName,
    secondLastName: user.secondLastName || "",
    identificationType: user.data?.personalData.identification.type || {
      id: "",
      value: "",
    },
    identification: Number(user.identification),
    expeditionCountry: user.data?.personalData.identification.country || "",
    expeditionCity: user.data?.personalData.identification.city || "",
    expeditionDepartment:
      user.data?.personalData.identification.departament || "",
    expeditionDate: user.data?.personalData.identification.date || "",
    birthDate: user.data?.personalData.birthDate || "",
    city: user.data?.personalData.birthCity || "",
    country: user.data?.personalData.birthCountry || "",
    countryName: user.data?.personalData.birthCountry || "",
    gender: user.data?.personalData.gender || "",
    civilStatus: user.data?.personalData.civilStatus || "",
    rhFactor: user.data?.personalData.rhFactor || "",
  };

  return {
    ...newData,
    currentData: newData,
  };
};

const mapContactData = (user: IFullUser): IContactDataEntry => {
  const newData: IContactDataEntry = {
    id: user.data?.contact[0].id || "",
    country: user.data?.contact[0].country || "",
    department: user.data?.contact[0].department || "",
    city: user.data?.contact[0].city || "",
    address: user.data?.contact[0].address || "",
    zipCode: user.data?.contact[0].zipCode || "",
    landlinePhone: user.data?.contact[0].landlinePhone || "",
    cellPhone: user.data?.contact[0].cellPhone || 0,
    email: user.data?.contact[0].email || "",
  };

  return {
    ...newData,
    currentData: newData,
  };
};

const mapFamilyGroup = (
  familyGroupData: IFamilyThird,
  index: number,
): IFamilyGroupEntry => {
  return {
    firstName: familyGroupData.identification.firstName,
    secondName: familyGroupData.identification.secondName || "",
    firstLastName: familyGroupData.identification.firstLastName,
    secondLastName: familyGroupData.identification.secondLastName || "",
    type: familyGroupData.identification.type,
    identificationNumber: familyGroupData.identification.identificationNumber,
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
    isDependent: familyGroupData.information.isDependent || "",
    educationLevel: familyGroupData?.information.educationLevel || "",
    businessActivity: familyGroupData?.information.businessActivity || "",
    profession: familyGroupData?.information.profession || "",
  };
};

const mapFamilyGroups = (familyGroups: IFamilyThird[]): IFamilyGroupEntry[] => {
  return familyGroups.map((familyGroup, index) =>
    mapFamilyGroup(familyGroup, index),
  );
};

const mapBankTransfers = (
  bankTransfersAccount: IBankTransfersAccount,
): IBankTransfersEntry => {
  return {
    bankEntityCode: bankTransfersAccount.bankEntityCode,
    bankEntityName: bankTransfersAccount.bankEntityName,
    accountType: bankTransfersAccount.accountType,
    accountNumber: bankTransfersAccount.accountNumber,
  };
};

const mapPersonalAsset = (
  personalAsset: IPersonalAssetEntry,
  index: number,
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
  personalAssets: IPersonalAssetEntries["entries"],
): IEntry[] => {
  return personalAssets.map(
    (personalAsset, index) => mapPersonalAsset(personalAsset, index) as IEntry,
  );
};

const mapPersonalDebt = (
  personalDebt: IPersonalDebtEntry,
  index: number,
): IEntry | IPersonalDebtEntry => {
  return {
    id: personalDebt.id || String(index),
    liabilityType: getValueOfDomain(
      personalDebt.liabilityType || "",
      "liabilityType",
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
  personalDebts: IPersonalDebtEntries["entries"],
): IEntry[] => {
  return personalDebts.map(
    (personalDebt, index) => mapPersonalDebt(personalDebt, index) as IEntry,
  );
};

const mapPersonalReference = (
  personalReference: IPersonalReferenceEntry,
  index: number,
): IEntry | IPersonalReferenceEntry => {
  return {
    id: personalReference.id || String(index),
    referenceType: getValueOfDomain(
      personalReference.referenceType || "",
      "referenceType",
    )?.value,
    name: personalReference.name,
    address: personalReference.address,
    email: personalReference.email,
    phone: personalReference.phone,
    country: countryDM.valueOf(personalReference.country || "")?.value,
    department: departmentDM.valueOf(personalReference.department || "")?.value,
    city: cityDM.valueOf(personalReference.city || "")?.value,
  };
};

const mapPersonalReferences = (
  personalReferences: IPersonalReferenceEntries["entries"],
): IEntry[] => {
  return personalReferences.map(
    (personalReference, index) =>
      mapPersonalReference(personalReference, index) as IEntry,
  );
};

const mapFinancialOperations = (
  financialOperationsData?: IFinancialOperations,
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
  personalResidence?: IResidence,
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
  socioeconomicData?: Record<string, string>,
): ISocioeconomicInformationEntry => {
  return {
    educationLevel: socioeconomicData?.educationLevel || "",
    isResponsibleHome: socioeconomicData?.isResponsibleHome || "",
    isSingleMother: socioeconomicData?.isSingleMother || "",
    dependants: socioeconomicData?.dependants || "",
    vulnerablePopulation: socioeconomicData?.vulnerablePopulation || "",
    isPublicExposed: socioeconomicData?.isPublicExposed || "",
    isDeclaredIncomes: socioeconomicData?.isDeclaredIncomes || "",
    isPublicOfficials: socioeconomicData?.isPublicOfficials || "",
  };
};

const mapEconomicActivity = (
  economicActivityData?: IEconomicActivity,
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

const mapIncomes = (): IIncomesEntry => {
  return {
    basicSalary: "",
    bonds: "",
    commissions: "",
    overtime: "",
    transportationAssistance: "",
    foodAssistance: "",
    others: "",
    totalIncomes: 0,
  };
};

const mapExpenses = (): IExpensesEntry => {
  return {
    personalExpenses: "",
    familyExpenses: "",
    credits: "",
    creditCards: "",
    others: "",
    totalExpenses: 0,
  };
};

const mapRelationshipWithDirectors = (
  relationshipWithDirectorsData?: IRelationshipWithDirectors,
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
