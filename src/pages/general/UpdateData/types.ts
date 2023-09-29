import { FormikProps } from "formik";
import { IPersonalInformationEntry } from "./forms/PersonalInformationForm/types";
import { IContactDataEntry } from "./forms/ContactDataForm/types";

interface IFormsUpdateData {
  personalInformation: IPersonalInformationEntry;
  contactData: IContactDataEntry;
}

interface IFormsUpdateDataRefs {
  personalInformation: React.RefObject<FormikProps<IPersonalInformationEntry>>;
  contactData: React.RefObject<FormikProps<IContactDataEntry>>;
}

export type { IFormsUpdateData, IFormsUpdateDataRefs };
