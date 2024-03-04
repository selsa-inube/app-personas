import { IContactDataEntry } from "../forms/ContactDataForm/types";
import { IIdentificationDataEntry } from "../forms/IdentificationDataForm/types";
import { IInformationDataEntry } from "../forms/InformationDataForm/types";
import { IPersonalDataEntry } from "../forms/PersonalDataForm/types";

const identificationData: IIdentificationDataEntry = {
  identificationNumber: "",
};

const personalData: IPersonalDataEntry = {
  identificationNumber: "",
  type: "",
  firstName: "",
  secondName: "",
  firstLastName: "",
  secondLastName: "",
  relationship: "",
};

const contactData: IContactDataEntry = {
  cellPhone: "" || 0,
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

const initialValuesCreateFamilyMember = {
  identificationData,
  personalData,
  contactData,
  informationData,
};

export { initialValuesCreateFamilyMember };
