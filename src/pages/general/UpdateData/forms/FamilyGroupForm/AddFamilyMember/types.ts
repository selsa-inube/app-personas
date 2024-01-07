import { FormikProps } from "formik";
import { IIdentificationDataEntry } from "./forms/IdentificationDataForm/types";
import { IPersonalDataEntry } from "./forms/PersonalDataForm/types";
import { IContactDataEntry } from "./forms/ContactDataForm/types";
import { IInformationDataEntry } from "./forms/InformationDataForm/types";

interface IFormsAddFamilyMember {
  identificationData: { isValid: boolean; values: IIdentificationDataEntry };
  personalData: { isValid: boolean; values: IPersonalDataEntry };
  contactData: { isValid: boolean; values: IContactDataEntry };
  informationData: { isValid: boolean; values: IInformationDataEntry };
}

interface IFormsAddFamilyMemberRefs {
  identificationData: React.RefObject<FormikProps<IIdentificationDataEntry>>;
  personalData: React.RefObject<FormikProps<IPersonalDataEntry>>;
  contactData: React.RefObject<FormikProps<IContactDataEntry>>;
  informationData: React.RefObject<FormikProps<IInformationDataEntry>>;
}

export type { IFormsAddFamilyMember, IFormsAddFamilyMemberRefs };
