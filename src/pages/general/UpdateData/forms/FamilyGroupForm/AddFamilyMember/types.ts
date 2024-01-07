import { FormikProps } from "formik";
import { IIdentificationDataEntry } from "./forms/IdentificationDataForm/types";
import { IPersonalDataEntry } from "./forms/PersonalDataForm/types";
import { IContactDataEntry } from "./forms/ContactDataForm/types";

interface IFormsAddFamilyMember {
  identificationData: { isValid: boolean; values: IIdentificationDataEntry };
  personalData: { isValid: boolean; values: IPersonalDataEntry };
  contactData: { isValid: boolean; values: IContactDataEntry };
}

interface IFormsAddFamilyMemberRefs {
  identificationData: React.RefObject<FormikProps<IIdentificationDataEntry>>;
  personalData: React.RefObject<FormikProps<IPersonalDataEntry>>;
  contactData: React.RefObject<FormikProps<IContactDataEntry>>;
}

export type { IFormsAddFamilyMember, IFormsAddFamilyMemberRefs };
