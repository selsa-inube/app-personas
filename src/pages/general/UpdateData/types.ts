import { FormikProps } from "formik";
import { IFinancialOperationsEntry } from "./forms/FinancialOperationsForm/types";
import { IPersonalAssetEntries } from "./forms/PersonalAssetsForm/types";
import { IPersonalDebtEntries } from "./forms/PersonalDebtsForm/types";
import { IPersonalInformationEntry } from "./forms/PersonalInformationForm/types";
import { IPersonalReferenceEntries } from "./forms/PersonalReferencesForm/types";
import { IBankTransfersEntry } from "./forms/BankTransfersForm/types";

interface IFormsUpdateData {
  personalInformation: IPersonalInformationEntry;
  bankTransfers: IBankTransfersEntry;
  personalAssets: IPersonalAssetEntries;
  personalDebts: IPersonalDebtEntries;
  personalReferences: IPersonalReferenceEntries;
  financialOperations: IFinancialOperationsEntry;
}

interface IFormsUpdateDataRefs {
  personalInformation: React.RefObject<FormikProps<IPersonalInformationEntry>>;
  bankTransfers: React.RefObject<FormikProps<IBankTransfersEntry>>;
  personalAssets: React.RefObject<FormikProps<IPersonalAssetEntries>>;
  personalDebts: React.RefObject<FormikProps<IPersonalDebtEntries>>;
  personalReferences: React.RefObject<FormikProps<IPersonalReferenceEntries>>;
  financialOperations: React.RefObject<FormikProps<IFinancialOperationsEntry>>;
}

export type { IFormsUpdateData, IFormsUpdateDataRefs };
