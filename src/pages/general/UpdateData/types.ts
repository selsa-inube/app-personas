import { FormikProps } from "formik";
import { IPersonalInformationEntry } from "./forms/PersonalInformationForm/types";

interface IFormsUpdateData {
  personalInformation: IPersonalInformationEntry;
}

interface IFormsUpdateDataRefs {
  personalInformation: React.RefObject<FormikProps<IPersonalInformationEntry>>;
}

export type { IFormsUpdateData, IFormsUpdateDataRefs };
