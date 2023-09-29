import { IThird } from "src/model/entity/user";
import { IPersonalInformationEntry } from "../forms/PersonalInformationForm/types";
import { IContactDataEntry } from "../forms/ContactDataForm/types";

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

const mapContactData = (contactInfoData: IThird): IContactDataEntry => {
  return {
    country: contactInfoData.contact.country,
    stateOrDepartment: contactInfoData.contact.department,
    city: contactInfoData.contact.city,
    address: contactInfoData.contact.address,
    postalCode: contactInfoData.contact.zipCode || "",
    landlinePhone: contactInfoData.contact.landlinePhone || "",
    cellPhone: contactInfoData.contact.cellPhone,
    email: contactInfoData.contact.email,
  };
};

export { mapPersonalInformation, mapContactData };
