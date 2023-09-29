import { FormikProps } from "formik";
import { IPersonalInformationEntry } from "./forms/PersonalInformationForm/types";
import { IPersonalAssetEntries } from "./forms/PersonalAssetsForm/types";

interface IFormsUpdateData {
  personalInformation: IPersonalInformationEntry;
  personalAssets: IPersonalAssetEntries;
}

interface IFormsUpdateDataRefs {
  personalInformation: React.RefObject<FormikProps<IPersonalInformationEntry>>;
  personalAssets: React.RefObject<FormikProps<IPersonalAssetEntries>>;
}

export type { IFormsUpdateData, IFormsUpdateDataRefs };
