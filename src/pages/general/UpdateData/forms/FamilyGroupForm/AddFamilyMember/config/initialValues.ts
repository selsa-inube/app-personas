import { IIdentificationDataEntry } from "../forms/IdentificationDataForm/types";
import { IPersonalDataEntry } from "../forms/PersonalDataForm/types";
import { IContactDataEntry } from "../forms/ContactDataForm/types";

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
  isDependent: true,
};

const contactData: IContactDataEntry = {
  cellPhone: "",
  email: "",
};

const initalValuesAddFamilyMember = {
  identificationData,
  personalData,
  contactData,
};


export { initalValuesAddFamilyMember };
