import { FormikProps } from "formik";
import { IPersonalAssetEntries } from "./forms/PersonalAssetsForm/types";
import { IPersonalDebtEntries } from "./forms/PersonalDebtsForm/types";
import { IPersonalInformationEntry } from "./forms/PersonalInformationForm/types";
import { IPersonalReferenceEntries } from "./forms/PersonalReferencesForm/types";
import { IPersonalResidenceEntry } from "./forms/PersonalResidenceForm/types";

interface IFormsUpdateData {
  personalInformation: IPersonalInformationEntry;
  personalAssets: IPersonalAssetEntries;
  personalDebts: IPersonalDebtEntries;
  personalReferences: IPersonalReferenceEntries;
  personalResidence: IPersonalResidenceEntry;
}

interface IFormsUpdateDataRefs {
  personalInformation: React.RefObject<FormikProps<IPersonalInformationEntry>>;
  personalAssets: React.RefObject<FormikProps<IPersonalAssetEntries>>;
  personalDebts: React.RefObject<FormikProps<IPersonalDebtEntries>>;
  personalReferences: React.RefObject<FormikProps<IPersonalReferenceEntries>>;
  personalResidence: React.RefObject<FormikProps<IPersonalResidenceEntry>>;
}

export type { IFormsUpdateData, IFormsUpdateDataRefs };
