import { FormikProps } from "formik";
import { IPersonalInformationEntry } from "./forms/PersonalInformationForm/types";
import { IContactDataEntry } from "./forms/ContactDataForm/types";
import { IPersonalAssetEntries } from "./forms/PersonalAssetsForm/types";

interface IFormsUpdateData {
  personalInformation: IPersonalInformationEntry;
  contactData: IContactDataEntry;
  personalAssets: IPersonalAssetEntries;
}

interface IFormsUpdateDataRefs {
  personalInformation: React.RefObject<FormikProps<IPersonalInformationEntry>>;
  contactData: React.RefObject<FormikProps<IContactDataEntry>>;
  personalAssets: React.RefObject<FormikProps<IPersonalAssetEntries>>;
}

export type { IFormsUpdateData, IFormsUpdateDataRefs };
