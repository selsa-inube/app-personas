import { FormikProps } from "formik";
import { IIdentificationDataEntry } from "./forms/IdentificationDataForm/types";

interface IFormsAddFamilyMember {
  identificationData: { isValid: boolean; values: IIdentificationDataEntry };
}

interface IFormsAddFamilyMemberRefs {
  identificationData: React.RefObject<FormikProps<IIdentificationDataEntry>>;
}

export type { IFormsAddFamilyMember, IFormsAddFamilyMemberRefs };
