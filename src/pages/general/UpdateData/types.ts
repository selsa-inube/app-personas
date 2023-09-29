import { FormikProps } from "formik";
import { IPersonalAssetEntries } from "./forms/PersonalAssetsForm/types";
import { IPersonalInformationEntry } from "./forms/PersonalInformationForm/types";
import { IPersonalReferenceEntries } from "./forms/PersonalReferencesForm/types";

interface IFormsUpdateData {
  personalInformation: IPersonalInformationEntry;
  personalAssets: IPersonalAssetEntries;
  personalReferences: IPersonalReferenceEntries;
}

interface IFormsUpdateDataRefs {
  personalInformation: React.RefObject<FormikProps<IPersonalInformationEntry>>;
  personalAssets: React.RefObject<FormikProps<IPersonalAssetEntries>>;
  personalReferences: React.RefObject<FormikProps<IPersonalReferenceEntries>>;
}

export type { IFormsUpdateData, IFormsUpdateDataRefs };
