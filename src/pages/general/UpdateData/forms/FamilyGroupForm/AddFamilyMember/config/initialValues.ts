import { IIdentificationDataEntry } from "../forms/IdentificationDataForm/types";
import { IPersonalDataEntry } from "../forms/PersonalDataForm/types";

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

const initalValuesAddFamilyMember = {
  identificationData,
  personalData
};

export { initalValuesAddFamilyMember };
