import { IThird } from "src/model/entity/user";
import { IPersonalInformationEntry } from "../forms/PersonalInformationForm/types";

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

export { mapPersonalInformation };
