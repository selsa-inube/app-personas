import { IIdentificationDataEntry } from "../forms/IdentificationDataForm/types";
import { IPersonalDataEntry } from "../forms/PersonalDataForm/types";
import { IContactDataEntry } from "../forms/ContactDataForm/types";
import { IInformationDataEntry } from "../forms/InformationDataForm/types";

const identificationData: IIdentificationDataEntry = {
  identificationNumber: 0,
};

const personalData: IPersonalDataEntry = {
  identificationNumber: 0,
  type: "",
  firstName: "",
  secondName: "",
  firstLastName: "",
  secondLastName: "",
  relationship: "",
};

const contactData: IContactDataEntry = {
  cellPhone: "",
  email: "",
};

const informationData: IInformationDataEntry = {
  relationship: "",
  educationLevel: "",
  profession: "",
  gender: "",
  birthDate: "",
  businessActivity: "",
};

const initalValuesAddFamilyMember = {
  identificationData,
  personalData,
  contactData,
  informationData,
};

export { initalValuesAddFamilyMember };
