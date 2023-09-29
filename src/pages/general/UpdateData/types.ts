import { FormikProps } from "formik";
import { IPersonalAssetEntries } from "./forms/PersonalAssetsForm/types";
import { IPersonalDebtEntries } from "./forms/PersonalDebtsForm/types";
import { IPersonalInformationEntry } from "./forms/PersonalInformationForm/types";

interface IFormsUpdateData {
  personalInformation: IPersonalInformationEntry;
  personalAssets: IPersonalAssetEntries;
  personalDebts: IPersonalDebtEntries;
}

interface IFormsUpdateDataRefs {
  personalInformation: React.RefObject<FormikProps<IPersonalInformationEntry>>;
  personalAssets: React.RefObject<FormikProps<IPersonalAssetEntries>>;
  personalDebts: React.RefObject<FormikProps<IPersonalDebtEntries>>;
}

export type { IFormsUpdateData, IFormsUpdateDataRefs };
