import { IThird } from "src/model/entity/user";
import { IFinancialOperationsEntry } from "../forms/FinancialOperationsForm/types";
import { IPersonalInformationEntry } from "../forms/PersonalInformationForm/types";
import { IPersonalSocioEconomicInformationEntry } from "../forms/PersonalSocioEconomicInformation/types";

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

const mapFinancialOperations = (
  financialOperationsData?: Record<string, string>
): IFinancialOperationsEntry => {
  return {
    hasForeignCurrencyAccounts: financialOperationsData?.financialOperations,
    hasForeignCurrencyTransactions:
      financialOperationsData?.financialOperations,
  };
};

const mapPersonalSocioeconomicInformation = (
  personalSocioeconomicInformationData?: Record<string, string>
): IPersonalSocioEconomicInformationEntry => {
  return {
    educationLevel: personalSocioeconomicInformationData?.educationLevel || "",
    isResponsibleHome: personalSocioeconomicInformationData?.isResponsibleHome || "",
    isSingleMother: personalSocioeconomicInformationData?.isSingleMother || "",
    dependants: Number(personalSocioeconomicInformationData?.dependants) || 0,
    vulnerablePopulation:
      personalSocioeconomicInformationData?.vulnerablePopulation || "",
    isPublicExposed: personalSocioeconomicInformationData?.isPublicExposed || "",
    isDeclaredIncome: personalSocioeconomicInformationData?.isDeclaredIncome || "",
    isPublicOfficials: personalSocioeconomicInformationData?.isPublicOfficials || "",
  };
};

export {
  mapFinancialOperations,
  mapPersonalInformation,
  mapPersonalSocioeconomicInformation,
};
