import { FormikProps } from "formik";
import { IIdentificationDataEntry } from "./forms/IdentificationDataForm/types";
import { IPersonalDataEntry } from "./forms/PersonalDataForm/types";

interface IFormsAddFamilyMember {
  identificationData: { isValid: boolean; values: IIdentificationDataEntry };
  personalData: { isValid: boolean; values: IPersonalDataEntry };
}

interface IFormsAddFamilyMemberRefs {
  identificationData: React.RefObject<FormikProps<IIdentificationDataEntry>>;
  personalData: React.RefObject<FormikProps<IPersonalDataEntry>>;
}

export type { IFormsAddFamilyMember, IFormsAddFamilyMemberRefs };
