import { FormikProps } from "formik";
import { IFinancialOperationsEntry } from "./forms/FinancialOperationsForm/types";
import { IPersonalAssetEntries } from "./forms/PersonalAssetsForm/types";
import { IPersonalDebtEntries } from "./forms/PersonalDebtsForm/types";
import { IPersonalInformationEntry } from "./forms/PersonalInformationForm/types";
import { IContactDataEntry } from "./forms/ContactDataForm/types";
import { IPersonalReferenceEntries } from "./forms/PersonalReferencesForm/types";
import { IPersonalSocioEconomicInformationEntry } from "./forms/PersonalSocioEconomicInformation/types";

interface IFormsUpdateData {
  personalInformation: IPersonalInformationEntry;
  contactData: IContactDataEntry;
  personalAssets: IPersonalAssetEntries;
  personalDebts: IPersonalDebtEntries;
  personalReferences: IPersonalReferenceEntries;
  financialOperations: IFinancialOperationsEntry;
  personalSocioEconomicInformation: IPersonalSocioEconomicInformationEntry;
}

interface IFormsUpdateDataRefs {
  personalInformation: React.RefObject<FormikProps<IPersonalInformationEntry>>;
  contactData: React.RefObject<FormikProps<IContactDataEntry>>;
  personalAssets: React.RefObject<FormikProps<IPersonalAssetEntries>>;
  personalDebts: React.RefObject<FormikProps<IPersonalDebtEntries>>;
  personalReferences: React.RefObject<FormikProps<IPersonalReferenceEntries>>;
  financialOperations: React.RefObject<FormikProps<IFinancialOperationsEntry>>;
  personalSocioEconomicInformation: React.RefObject<FormikProps<IPersonalSocioEconomicInformationEntry>>;
}

export type { IFormsUpdateData, IFormsUpdateDataRefs };
