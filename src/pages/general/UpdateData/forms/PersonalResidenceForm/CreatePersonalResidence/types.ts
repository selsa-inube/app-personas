import { FormikProps } from "formik";
import { IResidenceTypeEntry } from "./forms/ResidenceTypeForm/types";
import { IResidenceDetailsEntry } from "./forms/ResidenceDetailsForm/types";

interface IFormsCreatePersonalResidence {
  residenceType: { isValid: boolean; values: IResidenceTypeEntry };
  residenceDetails: { isValid: boolean; values: IResidenceDetailsEntry };
}

interface IFormsCreatePersonalResidenceRefs {
  residenceType: React.RefObject<FormikProps<IResidenceTypeEntry> | null>;
  residenceDetails: React.RefObject<FormikProps<IResidenceDetailsEntry> | null>;
}

export type { IFormsCreatePersonalResidence, IFormsCreatePersonalResidenceRefs };