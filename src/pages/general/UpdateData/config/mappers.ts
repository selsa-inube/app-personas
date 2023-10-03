import { IThird } from "src/model/entity/user";
import { IPersonalInformationEntry } from "../forms/PersonalInformationForm/types";
import { IPersonalResidence } from "src/model/entity/user";
import { IPersonalResidenceEntry } from "../forms/PersonalResidenceForm/types";

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

const mapPersonalResidence = (
  personalResidence: IPersonalResidence
): IPersonalResidenceEntry => {
  return {
    type: personalResidence.type,
    stratum: personalResidence.stratum,
    bankingEntity: personalResidence.bankingEntity,
    dueDate: personalResidence.dueDate,
    tenant: personalResidence.tenant,
    tenantCellPhone: personalResidence.tenantCellPhone,
    ownerName: personalResidence.ownerName,
    relationship: personalResidence.relationship,
    ownerCellPhone: personalResidence.ownerCellPhone,
  };
};

export { mapPersonalInformation, mapPersonalResidence };
